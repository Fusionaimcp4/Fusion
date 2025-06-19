import { NextRequest, NextResponse } from 'next/server';
import { aggregateModelData, getDataSourceStatus } from '@/lib/data-sources';
import { ModelRanking, RankingsFilters, RankingsSortOption } from '@/types/rankings';

// Enable edge runtime for better performance
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function applyFilters(models: ModelRanking[], filters: RankingsFilters): ModelRanking[] {
  return models.filter(model => {
    // Provider filter
    if (filters.providers.length > 0 && !filters.providers.includes(model.provider)) {
      return false;
    }

    // Modality filter
    if (filters.modalities.length > 0 && !filters.modalities.includes(model.metadata.modality)) {
      return false;
    }

    // Availability filter
    if (filters.availability.length > 0 && !filters.availability.includes(model.metadata.availability)) {
      return false;
    }

    // Score range filter
    if (filters.min_score !== undefined && model.composite_score < filters.min_score) {
      return false;
    }
    if (filters.max_score !== undefined && model.composite_score > filters.max_score) {
      return false;
    }

    // Pricing filter
    if (filters.min_prompt_cost !== undefined && model.pricing.prompt_cost < filters.min_prompt_cost) {
      return false;
    }
    if (filters.max_prompt_cost !== undefined && model.pricing.prompt_cost > filters.max_prompt_cost) {
      return false;
    }

    // Featured only filter
    if (filters.featured_only && !model.metadata.featured) {
      return false;
    }

    return true;
  });
}

function applySorting(models: ModelRanking[], sort: RankingsSortOption): ModelRanking[] {
  return [...models].sort((a, b) => {
    let aVal: any;
    let bVal: any;

    // Handle nested fields
    if (sort.field.includes('.')) {
      const [parent, child] = sort.field.split('.');
      aVal = (a as any)[parent]?.[child];
      bVal = (b as any)[parent]?.[child];
    } else {
      aVal = (a as any)[sort.field];
      bVal = (b as any)[sort.field];
    }

    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return sort.direction === 'asc' ? -1 : 1;
    if (bVal == null) return sort.direction === 'asc' ? 1 : -1;

    // Compare values
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.localeCompare(bVal);
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      const comparison = aVal - bVal;
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    // Fallback to string comparison
    const comparison = String(aVal).localeCompare(String(bVal));
    return sort.direction === 'asc' ? comparison : -comparison;
  });
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Max 100 items per page
    const search = searchParams.get('search') || '';
    
    // Parse filters
    const filters: RankingsFilters = {
      providers: searchParams.get('providers')?.split(',').filter(Boolean) || [],
      modalities: searchParams.get('modalities')?.split(',').filter(Boolean) || [],
      availability: searchParams.get('availability')?.split(',').filter(Boolean) || [],
      min_score: searchParams.get('min_score') ? parseFloat(searchParams.get('min_score')!) : undefined,
      max_score: searchParams.get('max_score') ? parseFloat(searchParams.get('max_score')!) : undefined,
      min_prompt_cost: searchParams.get('min_prompt_cost') ? parseFloat(searchParams.get('min_prompt_cost')!) : undefined,
      max_prompt_cost: searchParams.get('max_prompt_cost') ? parseFloat(searchParams.get('max_prompt_cost')!) : undefined,
      featured_only: searchParams.get('featured_only') === 'true',
    };

    // Parse sorting
    const sortField = searchParams.get('sort') || 'composite_rank';
    const sortDirection = (searchParams.get('order') || 'asc') as 'asc' | 'desc';
    const sort: RankingsSortOption = {
      field: sortField,
      direction: sortDirection,
    };

    // Fetch and process data
    console.log('Fetching model rankings data...');
    let models = await aggregateModelData();

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      models = models.filter(model => 
        model.name.toLowerCase().includes(searchLower) ||
        model.provider.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    models = applyFilters(models, filters);

    // Apply sorting
    models = applySorting(models, sort);

    // Calculate pagination
    const total = models.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedModels = models.slice(startIndex, endIndex);

    // Prepare response
    const response = {
      models: paginatedModels,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      last_sync: new Date().toISOString(),
      sources_status: getDataSourceStatus(),
      processing_time: Date.now() - startTime,
    };

    // Set cache headers
    const headers = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800', // 1 hour cache, 30 min stale
      'Content-Type': 'application/json',
    };

    return NextResponse.json(response, { headers });

  } catch (error) {
    console.error('Rankings API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch rankings data',
        message: error instanceof Error ? error.message : 'Unknown error',
        processing_time: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// POST endpoint for admin operations (refresh data, etc.)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, force } = body;

    // Basic auth check (in production, use proper authentication)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    switch (action) {
      case 'refresh':
        await aggregateModelData();
        return NextResponse.json({ 
          success: true, 
          message: 'Data refresh initiated',
          timestamp: new Date().toISOString(),
        });

      case 'clear_cache':
        // Clear cache logic would go here
        return NextResponse.json({ 
          success: true, 
          message: 'Cache cleared',
          timestamp: new Date().toISOString(),
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Rankings POST API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 