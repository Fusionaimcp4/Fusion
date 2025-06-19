import React from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, ArrowRight, Code, Clock, Shield, Zap, Info } from 'lucide-react';

export default function TroubleshootingFAQPage() {
  const commonIssues = [
    {
      category: "Authentication",
      icon: <Shield className="w-5 h-5" />,
      color: "red",
      issues: [
        {
          problem: "401 Unauthorized Error",
          cause: "Invalid or missing API key",
          solution: "Verify your API key starts with 'sk-fusion-' and is correctly set in Authorization header"
        },
        {
          problem: "403 Forbidden Error", 
          cause: "API key doesn't have required permissions",
          solution: "Check your account permissions or upgrade your plan"
        }
      ]
    },
    {
      category: "Rate Limits",
      icon: <Clock className="w-5 h-5" />,
      color: "yellow",
      issues: [
        {
          problem: "429 Too Many Requests",
          cause: "Exceeded rate limits for your plan",
          solution: "Implement exponential backoff or upgrade your plan for higher limits"
        },
        {
          problem: "Slow Response Times",
          cause: "High load or complex requests",
          solution: "Use caching, optimize prompts, or distribute requests over time"
        }
      ]
    },
    {
      category: "Request Format",
      icon: <Code className="w-5 h-5" />,
      color: "blue",
      issues: [
        {
          problem: "400 Bad Request",
          cause: "Invalid JSON or missing required parameters",
          solution: "Validate JSON format and ensure 'prompt' or 'messages' parameter is included"
        },
        {
          problem: "422 Validation Error",
          cause: "Parameter values outside acceptable ranges",
          solution: "Check max_tokens, temperature, and other parameter limits"
        }
      ]
    }
  ];

  const errorCodes = [
    { code: "400", name: "Bad Request", description: "Invalid request format or parameters", action: "Check JSON syntax and required fields" },
    { code: "401", name: "Unauthorized", description: "Missing or invalid API key", action: "Verify API key in Authorization header" },
    { code: "403", name: "Forbidden", description: "Insufficient permissions", action: "Check account permissions or upgrade plan" },
    { code: "404", name: "Not Found", description: "Invalid endpoint or route", action: "Verify API endpoint URL" },
    { code: "429", name: "Rate Limited", description: "Too many requests", action: "Implement rate limiting and retry logic" },
    { code: "500", name: "Internal Error", description: "Server-side issue", action: "Retry request or contact support" },
    { code: "503", name: "Service Unavailable", description: "Temporary service outage", action: "Wait and retry, check status page" }
  ];

  const debuggingTips = [
    {
      title: "Check API Response Details",
      description: "Every response includes metadata about the request processing",
      example: `{
  "response": "...",
  "provider_used": "claude-3-opus",
  "routing_reason": "Complex reasoning task",
  "tokens_used": 234,
  "cost": 0.00456,
  "request_id": "req_abc123"
}`
    },
    {
      title: "Use Request IDs for Support",
      description: "Include request_id when contacting support for faster resolution",
      example: `// Save request ID for troubleshooting
const response = await fusion.chat({...});
console.log('Request ID:', response.request_id);`
    },
    {
      title: "Monitor Token Usage",
      description: "Track token consumption to optimize costs and avoid limits",
      example: `{
  "tokens_used": 234,
  "cost": 0.00456,
  "cached": false,
  "max_tokens_reached": false
}`
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'text-red-600 bg-red-50 border-red-200',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Troubleshooting Guide</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Quick solutions for common issues, error codes, and debugging tips to help you 
          resolve problems and optimize your Fusion AI integration.
        </p>
      </div>

      {/* Quick Fixes */}
      <section className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-6 h-6 text-green-600 mr-2" />
          Quick Fixes (Try These First)
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Check API Key Format</h3>
                <p className="text-sm text-gray-600">Must start with 'sk-fusion-' and be included in Authorization header</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Validate JSON Format</h3>
                <p className="text-sm text-gray-600">Use JSON validator to check request body syntax</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Check Required Parameters</h3>
                <p className="text-sm text-gray-600">Include either 'prompt' or 'messages' in your request</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Verify Endpoint URL</h3>
                <p className="text-sm text-gray-600">Use https://api.mcp4.ai/chat for chat completions</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Check Content-Type Header</h3>
                <p className="text-sm text-gray-600">Set to 'application/json' for JSON requests</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Test with Simple Request</h3>
                <p className="text-sm text-gray-600">Start with minimal request to isolate the issue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues by Category */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Issues by Category</h2>
        
        <div className="space-y-8">
          {commonIssues.map((category, index) => (
            <div key={index} className={`rounded-lg border p-6 ${getColorClasses(category.color)}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                {React.cloneElement(category.icon, { 
                  className: `w-6 h-6 mr-2 ${getColorClasses(category.color).split(' ')[0]}` 
                })}
                {category.category} Issues
              </h3>
              
              <div className="space-y-4">
                {category.issues.map((issue, issueIndex) => (
                  <div key={issueIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">❌ {issue.problem}</h4>
                    <p className="text-sm text-gray-600 mb-2"><strong>Cause:</strong> {issue.cause}</p>
                    <p className="text-sm text-gray-700"><strong>Solution:</strong> {issue.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Error Codes Reference */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">HTTP Error Codes Reference</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900">Code</th>
                <th className="text-left p-4 font-semibold text-gray-900">Error</th>
                <th className="text-left p-4 font-semibold text-gray-900">Description</th>
                <th className="text-left p-4 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {errorCodes.map((error, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm bg-gray-100 rounded">{error.code}</td>
                  <td className="p-4 font-medium text-gray-900">{error.name}</td>
                  <td className="p-4 text-gray-600">{error.description}</td>
                  <td className="p-4 text-sm text-gray-600">{error.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Debugging Tips */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Debugging Tips</h2>
        
        <div className="space-y-8">
          {debuggingTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h3>
              <p className="text-gray-600 mb-4">{tip.description}</p>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-gray-300 text-sm overflow-x-auto whitespace-pre-wrap">
                  {tip.example}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Issues */}
      <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
          Performance Troubleshooting
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Slow Response Times</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">First request to a model may take 2-3 seconds (cold start)</span>
              </div>
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Enable caching for repeated similar requests</span>
              </div>
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Use NeuroSwitch for optimal model selection</span>
              </div>
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Reduce max_tokens for faster responses</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">High Token Usage</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Check if conversation history is growing too large</span>
              </div>
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Use concise, specific prompts</span>
              </div>
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Set appropriate max_tokens limits</span>
              </div>
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">Monitor cached vs non-cached usage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Tools */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing & Validation Tools</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">🔧 API Testing</h3>
            <p className="text-gray-600 text-sm mb-4">
              Use tools like Postman, curl, or HTTPie to test API requests independently
            </p>
            <div className="bg-gray-50 rounded p-2">
              <code className="text-xs">curl -X POST https://api.mcp4.ai/chat</code>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">📊 Response Validation</h3>
            <p className="text-gray-600 text-sm mb-4">
              Check response format, tokens_used, cost, and routing_reason fields
            </p>
            <div className="bg-gray-50 rounded p-2">
              <code className="text-xs">response.provider_used</code>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">🔍 JSON Validation</h3>
            <p className="text-gray-600 text-sm mb-4">
              Use online JSON validators to check request body syntax
            </p>
            <div className="bg-gray-50 rounded p-2">
              <code className="text-xs">jsonlint.com</code>
            </div>
          </div>
        </div>
      </section>

      {/* When to Contact Support */}
      <section className="bg-purple-50 rounded-lg p-6 border border-purple-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">When to Contact Support</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="font-medium text-gray-900 mb-2">🆘 Immediate Support Needed</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Persistent 500 or 503 errors across multiple requests</li>
              <li>• Billing or account access issues</li>
              <li>• Suspected security or data privacy concerns</li>
              <li>• Service outages affecting production systems</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="font-medium text-gray-900 mb-2">📝 Include in Support Requests</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Request ID from the problematic API call</li>
              <li>• Timestamp when the issue occurred</li>
              <li>• Complete error message and HTTP status code</li>
              <li>• Sample request (remove sensitive data)</li>
              <li>• Expected vs actual behavior</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/quickstart/first-call" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">First API Call</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Test with working examples</p>
          </Link>
          
          <Link 
            href="/docs/api/parameters" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">API Reference</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Complete parameter documentation</p>
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
        </div>
      </section>
    </div>
  );
} 