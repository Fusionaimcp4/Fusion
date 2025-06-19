import React from 'react';
import Link from 'next/link';
import { Archive, Clock, DollarSign, Zap, CheckCircle, ArrowRight, TrendingUp, Shield, RefreshCw } from 'lucide-react';

export default function PromptCachingPage() {
  const cachingBenefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Faster Response Times',
      description: 'Cached responses return in milliseconds instead of seconds',
      color: 'blue',
      stat: '95% faster',
      details: ['Sub-100ms cache hits', 'Instant repeated queries', 'Reduced latency spikes']
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Significant Cost Savings',
      description: 'Avoid paying for the same computation multiple times',
      color: 'green',
      stat: 'Up to 80% savings',
      details: ['No tokens charged for cache hits', 'Reduced API costs', 'Predictable pricing']
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Improved User Experience',
      description: 'Consistent, fast responses enhance application performance',
      color: 'purple',
      stat: '10x better UX',
      details: ['Immediate feedback', 'Smooth interactions', 'Reduced waiting time']
    }
  ];

  const cacheStrategies = [
    {
      name: 'Exact Match Caching',
      description: 'Identical prompts return cached responses instantly',
      useCase: 'Repeated identical queries',
      duration: '24 hours default',
      accuracy: '100%'
    },
    {
      name: 'Semantic Similarity',
      description: 'Similar prompts may use cached responses',
      useCase: 'Variations of the same question',
      duration: '12 hours default',
      accuracy: '95%+ similarity'
    },
    {
      name: 'Contextual Caching',
      description: 'Cache considers conversation context',
      useCase: 'Chat sessions with history',
      duration: '6 hours default',
      accuracy: 'Context-aware'
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Prompt Caching</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Intelligent caching system that dramatically improves response times and reduces costs 
          by storing and reusing AI responses for similar prompts.
        </p>
      </div>

      {/* Key Benefits */}
      <section className="grid md:grid-cols-3 gap-6">
        {cachingBenefits.map((benefit, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${getColorClasses(benefit.color)}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${getColorClasses(benefit.color).split(' ')[1]}`}>
              {React.cloneElement(benefit.icon, { 
                className: `w-8 h-8 ${getColorClasses(benefit.color).split(' ')[0]}` 
              })}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
            <p className="text-gray-600 mb-4">{benefit.description}</p>
            
            <div className={`text-2xl font-bold mb-4 ${getColorClasses(benefit.color).split(' ')[0]}`}>
              {benefit.stat}
            </div>
            
            <div className="space-y-2">
              {benefit.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {detail}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Prompt Caching Works</h2>
        
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Prompt Analysis</h3>
            <p className="text-sm text-gray-600">
              System analyzes incoming prompt for similarity to cached responses
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Cache Lookup</h3>
            <p className="text-sm text-gray-600">
              Searches cache for exact matches or semantically similar prompts
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Decision</h3>
            <p className="text-sm text-gray-600">
              Decides whether to return cached response or process new request
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-orange-600">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Response Delivery</h3>
            <p className="text-sm text-gray-600">
              Returns cached response instantly or processes and caches new response
            </p>
          </div>
        </div>
      </section>

      {/* Cache Strategies */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Caching Strategies</h2>
        
        <div className="space-y-6">
          {cacheStrategies.map((strategy, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{strategy.name}</h3>
                  <p className="text-sm text-gray-600">{strategy.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Best For</h4>
                  <p className="text-sm text-gray-600">{strategy.useCase}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Duration</h4>
                  <p className="text-sm text-gray-600">{strategy.duration}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Accuracy</h4>
                  <p className="text-sm text-gray-600">{strategy.accuracy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Configuration */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cache Configuration</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enable Caching</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "prompt": "Explain machine learning",
  "provider": "neuroswitch",
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "similarity_threshold": 0.9
  }
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cache Parameters</h3>
            <div className="space-y-3">
              <div>
                <code className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm">enabled</code>
                <p className="text-sm text-gray-600 mt-1">Enable/disable caching (default: true)</p>
              </div>
              <div>
                <code className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm">ttl</code>
                <p className="text-sm text-gray-600 mt-1">Cache time-to-live in seconds (default: 3600)</p>
              </div>
              <div>
                <code className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm">similarity_threshold</code>
                <p className="text-sm text-gray-600 mt-1">Minimum similarity for cache hits (0.0-1.0)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cache Analytics */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cache Analytics</h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg border border-purple-200">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">85%</h3>
            <p className="text-sm text-gray-600">Average cache hit rate</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg border border-purple-200">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50ms</h3>
            <p className="text-sm text-gray-600">Average cache response time</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg border border-purple-200">
            <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">$0.00</h3>
            <p className="text-sm text-gray-600">Cost per cache hit</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg border border-purple-200">
            <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24h</h3>
            <p className="text-sm text-gray-600">Default cache duration</p>
          </div>
        </div>
      </section>

      {/* Cache Response Format */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cache Response Indicators</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cache Hit Response</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-sm text-gray-700">
{`{
  "response": "Machine learning is a subset of AI...",
  "provider_used": "claude-3-opus",
  "cached": true,
  "cache_hit_time": "2024-01-15T10:30:00Z",
  "response_time_ms": 45,
  "cost": 0.0,
  "cache_similarity": 0.98
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fresh Response</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-sm text-gray-700">
{`{
  "response": "Machine learning is a subset of AI...",
  "provider_used": "claude-3-opus",
  "cached": false,
  "response_time_ms": 1250,
  "cost": 0.00234,
  "tokens_used": 156,
  "cached_until": "2024-01-16T10:30:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cache Optimization Tips</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">✅ Best Practices</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Use consistent prompt formatting</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Enable caching for repeated queries</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Monitor cache hit rates in analytics</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Adjust similarity thresholds based on use case</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">⚠️ Considerations</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Time-sensitive data may need fresh responses</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Creative tasks benefit less from caching</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">User-specific context may not cache well</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Balance freshness vs. performance needs</span>
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
            href="/docs/features/streaming" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Streaming + Caching</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Combine caching with real-time streaming responses</p>
          </Link>
          
          <Link 
            href="/docs/quickstart/chat-setup" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Chat Sessions</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Optimize conversation caching strategies</p>
          </Link>
          
          <Link 
            href="/docs/api/parameters" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Advanced Config</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Fine-tune caching parameters for your use case</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Optimize Your AI Performance</h2>
        <p className="text-gray-600 mb-6">
          Start using prompt caching today to improve response times and reduce costs. 
          Caching is enabled by default for all Fusion AI requests.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart/first-call" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Try Caching Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/api/parameters" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Configuration Guide
          </Link>
        </div>
      </section>
    </div>
  );
} 