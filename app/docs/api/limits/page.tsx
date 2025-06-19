import React from 'react';
import Link from 'next/link';
import { Clock, BarChart3, Zap, CheckCircle, AlertCircle, ArrowRight, Crown, Users, Building } from 'lucide-react';

export default function LimitsPage() {
  const limitTypes = [
    {
      title: 'Request Rate Limits',
      description: 'Maximum number of API requests per time period',
      icon: <Clock className="w-6 h-6" />,
      color: 'blue',
      details: [
        'Requests per minute/hour limits',
        'Burst capacity allowances',
        'Geographic region variations',
        'Endpoint-specific limits'
      ]
    },
    {
      title: 'Token Usage Limits',
      description: 'Maximum tokens consumed per time period',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'green',
      details: [
        'Input + output token counting',
        'Model-specific token costs',
        'Daily and monthly quotas',
        'Rollover and reset policies'
      ]
    },
    {
      title: 'Concurrent Request Limits',
      description: 'Maximum simultaneous API connections',
      icon: <Zap className="w-6 h-6" />,
      color: 'purple',
      details: [
        'Parallel request handling',
        'Connection pooling limits',
        'Streaming connection caps',
        'Queue depth restrictions'
      ]
    }
  ];

  const planTiers = [
    {
      name: 'Free Tier',
      icon: <Users className="w-6 h-6" />,
      color: 'gray',
      price: '$0/month',
      limits: {
        requests_per_hour: '1,000',
        requests_per_minute: '100',
        concurrent_requests: '5',
        tokens_per_month: '100K',
        max_tokens_per_request: '4,000',
        file_uploads: '10 per day',
        max_file_size: '5MB'
      },
      features: [
        'Basic rate limiting',
        'Standard response times',
        'Community support',
        'Basic analytics'
      ],
      limitations: [
        'No guaranteed uptime SLA',
        'Limited model access',
        'Basic error reporting'
      ]
    },
    {
      name: 'Pro Tier',
      icon: <Crown className="w-6 h-6" />,
      color: 'blue',
      price: '$29/month',
      limits: {
        requests_per_hour: '10,000',
        requests_per_minute: '500',
        concurrent_requests: '20',
        tokens_per_month: '1M',
        max_tokens_per_request: '8,000',
        file_uploads: '100 per day',
        max_file_size: '20MB'
      },
      features: [
        'Priority request routing',
        'Faster response times',
        'Email support',
        'Advanced analytics',
        'Custom rate limits'
      ],
      limitations: [
        '99.5% uptime SLA',
        'All model access included'
      ]
    },
    {
      name: 'Enterprise',
      icon: <Building className="w-6 h-6" />,
      color: 'purple',
      price: 'Custom pricing',
      limits: {
        requests_per_hour: 'Custom',
        requests_per_minute: 'Custom',
        concurrent_requests: 'Custom',
        tokens_per_month: 'Unlimited',
        max_tokens_per_request: 'Custom',
        file_uploads: 'Unlimited',
        max_file_size: '100MB'
      },
      features: [
        'Dedicated infrastructure',
        'Custom SLA agreements',
        'Priority support',
        'White-label options',
        'Custom integrations',
        'Dedicated account manager'
      ],
      limitations: []
    }
  ];

  const rateLimitHeaders = [
    {
      header: 'X-RateLimit-Limit',
      description: 'Maximum requests allowed in the current time window',
      example: '1000'
    },
    {
      header: 'X-RateLimit-Remaining',
      description: 'Number of requests remaining in current window',
      example: '847'
    },
    {
      header: 'X-RateLimit-Reset',
      description: 'Unix timestamp when the rate limit resets',
      example: '1704063600'
    },
    {
      header: 'X-RateLimit-Retry-After',
      description: 'Seconds to wait before making another request',
      example: '60'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      gray: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTierColorClasses = (color: string) => {
    const colors = {
      gray: 'border-gray-200 bg-gray-50',
      blue: 'border-blue-200 bg-blue-50',
      purple: 'border-purple-200 bg-purple-50 ring-2 ring-purple-500 ring-offset-2'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Rate Limits</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Understand usage limits, pricing tiers, and optimization strategies. Scale your AI applications 
          with transparent and flexible rate limiting.
        </p>
      </div>

      {/* Limit Types */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Types of Limits</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {limitTypes.map((limit, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border ${getColorClasses(limit.color)}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                limit.color === 'blue' ? 'bg-blue-100' :
                limit.color === 'green' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                {React.cloneElement(limit.icon, { 
                  className: `w-6 h-6 ${
                    limit.color === 'blue' ? 'text-blue-600' :
                    limit.color === 'green' ? 'text-green-600' :
                    'text-purple-600'
                  }` 
                })}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{limit.title}</h3>
              <p className="text-gray-600 mb-4">{limit.description}</p>
              
              <div className="space-y-2">
                {limit.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pricing Tiers & Limits</h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {planTiers.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border p-6 ${getTierColorClasses(plan.color)} relative`}
            >
              {plan.name === 'Pro Tier' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  plan.color === 'gray' ? 'bg-gray-100' :
                  plan.color === 'blue' ? 'bg-blue-100' :
                  'bg-purple-100'
                }`}>
                  {React.cloneElement(plan.icon, { 
                    className: `w-8 h-8 ${
                      plan.color === 'gray' ? 'text-gray-600' :
                      plan.color === 'blue' ? 'text-blue-600' :
                      'text-purple-600'
                    }` 
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">Rate Limits</h4>
                <div className="space-y-2">
                  {Object.entries(plan.limits).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">Features</h4>
                <div className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {plan.limitations.length > 0 && (
                <div className="space-y-2">
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                      {limitation}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <Link 
                  href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                  className={`w-full inline-flex justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.color === 'blue' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : plan.color === 'purple'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  {plan.name === 'Free Tier' ? 'Get Started' : 
                   plan.name === 'Pro Tier' ? 'Upgrade to Pro' : 
                   'Contact Sales'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rate Limit Headers */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limit Headers</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-blue-200">
            <thead>
              <tr className="bg-blue-100 border-b border-blue-200">
                <th className="text-left p-4 font-semibold text-gray-900">Header</th>
                <th className="text-left p-4 font-semibold text-gray-900">Description</th>
                <th className="text-left p-4 font-semibold text-gray-900">Example</th>
              </tr>
            </thead>
            <tbody>
              {rateLimitHeaders.map((header, index) => (
                <tr key={index} className="border-b border-blue-100">
                  <td className="p-4">
                    <code className="text-sm font-mono bg-blue-50 px-2 py-1 rounded">{header.header}</code>
                  </td>
                  <td className="p-4 text-gray-700">{header.description}</td>
                  <td className="p-4">
                    <code className="text-sm text-gray-600">{header.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Optimization Strategies */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Optimization Strategies</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Optimization</h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Batching Requests</h4>
                <p className="text-green-800 text-sm">
                  Combine multiple operations into single requests when possible to reduce API calls.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Caching Responses</h4>
                <p className="text-blue-800 text-sm">
                  Cache frequently requested data to avoid repeated API calls for the same content.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">Async Processing</h4>
                <p className="text-purple-800 text-sm">
                  Use asynchronous requests and proper concurrency control to maximize throughput.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Optimization</h3>
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">Prompt Engineering</h4>
                <p className="text-orange-800 text-sm">
                  Write concise, effective prompts to minimize input token usage while maintaining quality.
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">Response Limits</h4>
                <p className="text-yellow-800 text-sm">
                  Set appropriate max_tokens limits to control output length and costs.
                </p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">Model Selection</h4>
                <p className="text-red-800 text-sm">
                  Use NeuroSwitch or choose appropriate models based on task complexity vs cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring & Alerts */}
      <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-6 h-6 text-yellow-600 mr-2" />
          Monitoring & Alerts
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Usage Monitoring</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Track daily and monthly token usage</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Monitor request patterns and peak times</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Analyze cost per request and optimization opportunities</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Review rate limit hit frequency</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Alert Configuration</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Set alerts at 80% of monthly limits</span>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Monitor for unusual usage spikes</span>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Track error rate increases</span>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Get notified before hitting limits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limit Increases */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Requesting Limit Increases</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">When to Request Increases</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded p-3 border border-blue-200">
                <h4 className="font-medium text-blue-900 text-sm">Consistent High Usage</h4>
                <p className="text-blue-800 text-xs mt-1">
                  Regularly hitting 80%+ of your current limits
                </p>
              </div>
              <div className="bg-green-50 rounded p-3 border border-green-200">
                <h4 className="font-medium text-green-900 text-sm">Production Requirements</h4>
                <p className="text-green-800 text-xs mt-1">
                  Deploying to production with higher expected traffic
                </p>
              </div>
              <div className="bg-purple-50 rounded p-3 border border-purple-200">
                <h4 className="font-medium text-purple-900 text-sm">Batch Processing</h4>
                <p className="text-purple-800 text-xs mt-1">
                  Large data processing jobs requiring burst capacity
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Process</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Submit Request</h4>
                  <p className="text-gray-600 text-sm">Contact support with usage details and requirements</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-sm font-bold text-green-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Review Process</h4>
                  <p className="text-gray-600 text-sm">Our team reviews your usage patterns and business needs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-sm font-bold text-purple-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Approval & Implementation</h4>
                  <p className="text-gray-600 text-sm">Approved increases are applied within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/api/errors" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Error Handling</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Handle rate limit errors properly</p>
          </Link>
          
          <Link 
            href="/docs/faq/tokens" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Token Usage</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Optimize token consumption</p>
          </Link>
          
          <Link 
            href="/docs/features/caching" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Caching</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Reduce API calls with caching</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 