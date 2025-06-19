import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Model Rankings - Fusion',
  description: 'Comprehensive rankings of AI models with real-time pricing, benchmarks, and performance data from leading providers.',
  keywords: ['AI models', 'model rankings', 'AI benchmarks', 'model pricing', 'LLM comparison'],
  openGraph: {
    title: 'AI Model Rankings - Fusion',
    description: 'Compare AI models with real-time pricing and comprehensive benchmarks',
    type: 'website',
  },
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 