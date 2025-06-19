import React from 'react';
import Link from 'next/link';
import { AlertTriangle, XCircle, Info, CheckCircle, Copy, ArrowRight, Shield, Clock } from 'lucide-react';

export default function ErrorsPage() {
  const errorCategories = [
    {
      category: 'Client Errors (4xx)',
      description: 'Errors caused by invalid requests or authentication issues',
      color: 'red',
      icon: <XCircle className="w-5 h-5" />
    },
    {
      category: 'Server Errors (5xx)', 
      description: 'Temporary server-side issues and service unavailability',
      color: 'orange',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      category: 'Rate Limit Errors',
      description: 'Usage limits exceeded, requires backoff and retry',
      color: 'yellow',
      icon: <Clock className="w-5 h-5" />
    }
  ];

  const commonErrors = [
    {
      code: '400',
      name: 'Bad Request',
      description: 'Invalid request format, missing parameters, or malformed JSON',
      category: 'client',
      examples: [
        'Missing required "prompt" parameter',
        'Invalid JSON syntax in request body',
        'Parameter value outside acceptable range'
      ],
      solutions: [
        'Validate JSON format before sending',
        'Check all required parameters are included',
        'Verify parameter types match API specification'
      ]
    },
    {
      code: '401',
      name: 'Unauthorized',
      description: 'Missing, invalid, or expired authentication credentials',
      category: 'client',
      examples: [
        'No Authorization header provided',
        'Invalid API key format',
        'Expired JWT token'
      ],
      solutions: [
        'Include valid Authorization header',
        'Check API key starts with "sk-fusion-"',
        'Refresh expired JWT tokens'
      ]
    },
    {
      code: '403',
      name: 'Forbidden',
      description: 'Valid authentication but insufficient permissions',
      category: 'client',
      examples: [
        'API key lacks required permissions',
        'Account suspended or deactivated',
        'Feature not available on current plan'
      ],
      solutions: [
        'Upgrade account plan if needed',
        'Contact support for permission issues',
        'Check account status in dashboard'
      ]
    },
    {
      code: '404',
      name: 'Not Found',
      description: 'Requested endpoint or resource does not exist',
      category: 'client',
      examples: [
        'Incorrect API endpoint URL',
        'Typo in endpoint path',
        'Deprecated endpoint version'
      ],
      solutions: [
        'Verify endpoint URL matches documentation',
        'Check for typos in the request path',
        'Use current API version endpoints'
      ]
    },
    {
      code: '413',
      name: 'Payload Too Large',
      description: 'Request body exceeds maximum allowed size',
      category: 'client',
      examples: [
        'Prompt text exceeds 100,000 characters',
        'Uploaded file larger than 20MB',
        'Too many files in single request'
      ],
      solutions: [
        'Reduce prompt length or split into chunks',
        'Compress or resize large files',
        'Send files in separate requests'
      ]
    },
    {
      code: '422',
      name: 'Unprocessable Entity',
      description: 'Request is valid but contains semantic errors',
      category: 'client',
      examples: [
        'Parameter values outside valid ranges',
        'Conflicting parameter combinations',
        'Invalid file format or encoding'
      ],
      solutions: [
        'Check parameter constraints in documentation',
        'Validate parameter combinations',
        'Use supported file formats only'
      ]
    },
    {
      code: '429',
      name: 'Too Many Requests',
      description: 'Rate limit exceeded, requests are being throttled',
      category: 'rate_limit',
      examples: [
        'Exceeded requests per minute limit',
        'Concurrent request limit reached',
        'Token usage rate limit hit'
      ],
      solutions: [
        'Implement exponential backoff',
        'Check rate limit headers',
        'Upgrade plan for higher limits'
      ]
    },
    {
      code: '500',
      name: 'Internal Server Error',
      description: 'Unexpected server-side error occurred',
      category: 'server',
      examples: [
        'Database connection failure',
        'Model processing error',
        'Unexpected system exception'
      ],
      solutions: [
        'Retry request after brief delay',
        'Check service status page',
        'Contact support with request ID'
      ]
    },
    {
      code: '502',
      name: 'Bad Gateway',
      description: 'Error from upstream AI provider service',
      category: 'server',
      examples: [
        'AI provider service unavailable',
        'Timeout from provider API',
        'Provider API rate limit reached'
      ],
      solutions: [
        'Retry with different provider',
        'Use NeuroSwitch for automatic failover',
        'Check provider status pages'
      ]
    },
    {
      code: '503',
      name: 'Service Unavailable',
      description: 'Service temporarily unavailable or under maintenance',
      category: 'server',
      examples: [
        'Scheduled maintenance window',
        'Service overload or capacity issues',
        'Database maintenance'
      ],
      solutions: [
        'Wait and retry after delay',
        'Check service announcements',
        'Implement retry with backoff'
      ]
    }
  ];

  const getColorClasses = (category: string) => {
    const colors = {
      client: 'bg-red-50 border-red-200 text-red-900',
      server: 'bg-orange-50 border-orange-200 text-orange-900',
      rate_limit: 'bg-yellow-50 border-yellow-200 text-yellow-900'
    };
    return colors[category as keyof typeof colors] || colors.client;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Handling</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive guide to API error codes, common issues, and troubleshooting strategies. 
          Build robust applications with proper error handling.
        </p>
      </div>

      {/* Error Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Error Categories</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {errorCategories.map((category, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border ${
                category.color === 'red' ? 'bg-red-50 border-red-200' :
                category.color === 'orange' ? 'bg-orange-50 border-orange-200' :
                'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                category.color === 'red' ? 'bg-red-100' :
                category.color === 'orange' ? 'bg-orange-100' :
                'bg-yellow-100'
              }`}>
                {React.cloneElement(category.icon, { 
                  className: `w-6 h-6 ${
                    category.color === 'red' ? 'text-red-600' :
                    category.color === 'orange' ? 'text-orange-600' :
                    'text-yellow-600'
                  }` 
                })}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.category}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Error Codes */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Error Codes</h2>
        
        <div className="space-y-8">
          {commonErrors.map((error, index) => (
            <div
              key={index}
              className={`rounded-lg border p-6 ${getColorClasses(error.category)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl font-bold font-mono">{error.code}</span>
                    <h3 className="text-xl font-semibold">{error.name}</h3>
                  </div>
                  <p className="text-gray-700">{error.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Common Causes</h4>
                  <div className="space-y-2">
                    {error.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Solutions</h4>
                  <div className="space-y-2">
                    {error.solutions.map((solution, solutionIndex) => (
                      <div key={solutionIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Error Response Format */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Response Format</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Error Response</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-red-400 text-sm overflow-x-auto">
{`{
  "error": {
    "type": "invalid_request",
    "message": "The prompt parameter is required",
    "code": 400
  },
  "request_id": "req_abc123def456",
  "timestamp": "2024-01-01T12:00:00Z"
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Error Response</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-red-400 text-sm overflow-x-auto">
{`{
  "error": {
    "type": "validation_error",
    "message": "Parameter validation failed",
    "code": 422,
    "details": {
      "field": "temperature",
      "issue": "Value 3.5 exceeds maximum of 2.0"
    }
  },
  "request_id": "req_def456ghi789",
  "timestamp": "2024-01-01T12:00:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Limiting */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limiting & Retry Logic</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limit Headers</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-sm text-gray-700">
{`X-RateLimit-Limit: 1000          // Requests per hour
X-RateLimit-Remaining: 842        // Remaining requests
X-RateLimit-Reset: 1704063600     // Reset timestamp
X-RateLimit-Retry-After: 3600     // Seconds until reset`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exponential Backoff Implementation</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">JavaScript Example</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`async function makeRequestWithRetry(data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-fusion-...',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? 
          parseInt(retryAfter) * 1000 : 
          Math.pow(2, i) * 1000;
        
        await new Promise(resolve => 
          setTimeout(resolve, delay)
        );
        continue;
      }

      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Python Example</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`import time
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_session_with_retries():
    session = requests.Session()
    
    retry_strategy = Retry(
        total=3,
        status_forcelist=[429, 500, 502, 503, 504],
        backoff_factor=1
    )
    
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    return session

# Usage
session = create_session_with_retries()
response = session.post(
    'https://api.mcp4.ai/chat',
    headers={'Authorization': 'Bearer sk-fusion-...'},
    json={'prompt': 'Hello world'}
)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Handling Best Practices */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Info className="w-6 h-6 text-blue-600 mr-2" />
          Error Handling Best Practices
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">✅ Recommended Approaches</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Log request_id for all errors</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Implement exponential backoff for retries</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Parse error details for specific handling</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Monitor rate limit headers</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Provide meaningful error messages to users</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">❌ Common Mistakes</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <XCircle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Retrying immediately without delay</span>
              </div>
              <div className="flex items-start">
                <XCircle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Ignoring HTTP status codes</span>
              </div>
              <div className="flex items-start">
                <XCircle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Not handling rate limits properly</span>
              </div>
              <div className="flex items-start">
                <XCircle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Exposing sensitive error details to users</span>
              </div>
              <div className="flex items-start">
                <XCircle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Infinite retry loops</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Debugging Tips */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Debugging & Troubleshooting</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Request Debugging</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Log full request and response</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Validate JSON syntax</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Check Content-Type headers</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Authentication Issues</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Verify API key format</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Check Authorization header</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Test with cURL first</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Performance Issues</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Monitor response times</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Check rate limit headers</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Use request_id for support</span>
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
            href="/docs/api/auth" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Authentication</h3>
              <Shield className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Fix authentication and authorization errors</p>
          </Link>
          
          <Link 
            href="/docs/api/limits" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Rate Limits</h3>
              <Clock className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Understand rate limiting and usage tiers</p>
          </Link>
          
          <Link 
            href="/docs/faq/troubleshooting" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Troubleshooting</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Comprehensive troubleshooting guide</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 