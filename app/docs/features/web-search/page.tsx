import React from 'react';
import Link from 'next/link';
import { Search, Globe, Zap, CheckCircle, ArrowRight, Copy, Clock, Shield, TrendingUp } from 'lucide-react';

export default function WebSearchPage() {
  const searchCapabilities = [
    {
      title: 'Real-time Information',
      description: 'Access current data, news, and information from across the web',
      icon: <Clock className="w-6 h-6" />,
      color: 'blue',
      features: [
        'Current events and news',
        'Stock prices and financial data',
        'Weather and traffic updates',
        'Product information and reviews'
      ]
    },
    {
      title: 'Enhanced Accuracy',
      description: 'Combine AI knowledge with verified web sources',
      icon: <Shield className="w-6 h-6" />,
      color: 'green',
      features: [
        'Fact-checking and verification',
        'Source attribution and citations',
        'Multi-source validation',
        'Credibility scoring'
      ]
    },
    {
      title: 'Comprehensive Research',
      description: 'Perform deep research across multiple sources and topics',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      features: [
        'Academic and scholarly sources',
        'Industry reports and analysis',
        'Comparative research',
        'Trend analysis and insights'
      ]
    }
  ];

  const searchTypes = [
    {
      name: 'General Web Search',
      description: 'Broad search across popular web sources',
      useCase: 'Current events, general information',
      sources: 'News sites, Wikipedia, official websites',
      speed: 'Fast (1-2 seconds)'
    },
    {
      name: 'Academic Search',
      description: 'Focused search on scholarly and research content',
      useCase: 'Research papers, scientific data',
      sources: 'PubMed, arXiv, Google Scholar',
      speed: 'Medium (2-3 seconds)'
    },
    {
      name: 'News Search',
      description: 'Latest news and current events',
      useCase: 'Breaking news, recent developments',
      sources: 'Reuters, AP, BBC, major news outlets',
      speed: 'Fast (1-2 seconds)'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Web Search Integration</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enhance AI responses with real-time web search capabilities. Access current information, 
          verify facts, and provide comprehensive research-backed answers.
        </p>
      </div>

      {/* Key Capabilities */}
      <section className="grid md:grid-cols-3 gap-6">
        {searchCapabilities.map((capability, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${getColorClasses(capability.color)}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${getColorClasses(capability.color).split(' ')[1]}`}>
              {React.cloneElement(capability.icon, { 
                className: `w-8 h-8 ${getColorClasses(capability.color).split(' ')[0]}` 
              })}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{capability.title}</h3>
            <p className="text-gray-600 mb-4">{capability.description}</p>
            
            <div className="space-y-2">
              {capability.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Web Search Works</h2>
        
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Query Analysis</h3>
            <p className="text-sm text-gray-600">
              AI analyzes your prompt to identify search-worthy queries and information needs
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Web Search</h3>
            <p className="text-sm text-gray-600">
              Performs targeted searches across relevant web sources and databases
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Content Synthesis</h3>
            <p className="text-sm text-gray-600">
              Combines search results with AI knowledge to create comprehensive answers
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-orange-600">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Source Citation</h3>
            <p className="text-sm text-gray-600">
              Provides attributed sources and citations for transparency and verification
            </p>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enable Web Search</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "prompt": "What are the latest developments in AI safety research?",
  "provider": "neuroswitch",
  "web_search": {
    "enabled": true,
    "max_results": 5,
    "recency": "1week"
  }
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specific Search Types</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "prompt": "Compare the latest iPhone and Samsung Galaxy models",
  "provider": "neuroswitch",
  "web_search": {
    "enabled": true,
    "type": "general",
    "sources": ["reviews", "official"],
    "include_prices": true
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Search Types */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Search Types</h2>
        
        <div className="space-y-6">
          {searchTypes.map((searchType, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{searchType.name}</h3>
                  <p className="text-sm text-gray-600">{searchType.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Best For</h4>
                  <p className="text-sm text-gray-600">{searchType.useCase}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Sources</h4>
                  <p className="text-sm text-gray-600">{searchType.sources}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Speed</h4>
                  <p className="text-sm text-gray-600">{searchType.speed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Response Format */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Response Format with Sources</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <pre className="text-sm text-gray-700 overflow-x-auto">
{`{
  "response": "Based on recent AI safety research, three major developments stand out: Constitutional AI methods showing 40% reduction in harmful outputs, new interpretability techniques revealing hidden model behaviors, and alignment research focusing on value learning from human feedback...",
  "provider_used": "claude-3-opus",
  "web_search": {
    "enabled": true,
    "queries_performed": ["AI safety research 2024", "constitutional AI developments"],
    "sources_found": 8,
    "search_time_ms": 1850
  },
  "sources": [
    {
      "title": "Constitutional AI: Harmlessness from AI Feedback",
      "url": "https://arxiv.org/abs/2212.08073",
      "snippet": "We propose Constitutional AI (CAI), a method for training a harmless AI assistant...",
      "relevance": 0.95,
      "date": "2024-01-15"
    },
    {
      "title": "Advances in AI Alignment Research",
      "url": "https://openai.com/research/alignment-advances", 
      "snippet": "Recent breakthroughs in interpretability and value learning...",
      "relevance": 0.88,
      "date": "2024-01-10"
    }
  ],
  "tokens_used": 547,
  "cost": 0.00298
}`}
          </pre>
        </div>
      </section>

      {/* Configuration Options */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Configuration Options</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Parameters</h3>
            <div className="space-y-3">
              <div>
                <code className="bg-white px-2 py-1 rounded text-sm border">enabled</code>
                <p className="text-sm text-gray-600 mt-1">Enable/disable web search (default: false)</p>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded text-sm border">max_results</code>
                <p className="text-sm text-gray-600 mt-1">Maximum search results to consider (1-10)</p>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded text-sm border">recency</code>
                <p className="text-sm text-gray-600 mt-1">Time filter: "1day", "1week", "1month", "1year"</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>
            <div className="space-y-3">
              <div>
                <code className="bg-white px-2 py-1 rounded text-sm border">type</code>
                <p className="text-sm text-gray-600 mt-1">"general", "academic", "news"</p>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded text-sm border">sources</code>
                <p className="text-sm text-gray-600 mt-1">Preferred source types: ["news", "academic", "official"]</p>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded text-sm border">include_citations</code>
                <p className="text-sm text-gray-600 mt-1">Include source citations in response (default: true)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Perfect For</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Current Events Research</h4>
                  <p className="text-sm text-gray-600">Breaking news, recent developments, trending topics</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Fact Verification</h4>
                  <p className="text-sm text-gray-600">Cross-checking information, source validation</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Market Research</h4>
                  <p className="text-sm text-gray-600">Product comparisons, pricing, reviews</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Academic Research</h4>
                  <p className="text-sm text-gray-600">Recent papers, scholarly articles, citations</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Considerations</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Response Time</h4>
                  <p className="text-sm text-gray-600">Adds 1-3 seconds to processing time</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Cost Impact</h4>
                  <p className="text-sm text-gray-600">Increases token usage for source processing</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Source Quality</h4>
                  <p className="text-sm text-gray-600">Quality depends on available web sources</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Rate Limits</h4>
                  <p className="text-sm text-gray-600">Subject to search API rate limits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Search Optimization</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Be specific about time requirements (recent vs historical)
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Specify preferred source types for better results
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Use clear, searchable keywords in prompts
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Performance Tips</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Limit max_results for faster responses
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Cache results for repeated similar queries
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Consider search type based on your use case
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Integration Examples</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/quickstart/first-call" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Quick Start</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Add web search to your first API call</p>
          </Link>
          
          <Link 
            href="/docs/features/tools" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Tool Calling</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Combine search with function calling</p>
          </Link>
          
          <Link 
            href="/docs/features/streaming" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Streaming</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Stream search-enhanced responses</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Enhance Your AI with Web Search</h2>
        <p className="text-gray-600 mb-6">
          Access real-time information and provide more accurate, up-to-date responses. 
          Start using web search integration today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart/first-call" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Try Web Search
            <Search className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/api/parameters" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            API Reference
          </Link>
        </div>
      </section>
    </div>
  );
} 