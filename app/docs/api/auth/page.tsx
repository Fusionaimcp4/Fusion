import React from 'react';
import Link from 'next/link';
import { Shield, Key, Eye, EyeOff, CheckCircle, Copy, AlertTriangle, Info, ExternalLink } from 'lucide-react';

export default function AuthPage() {
  const authMethods = [
    {
      title: 'API Key Authentication',
      description: 'Simple and secure API key-based authentication for most use cases',
      icon: <Key className="w-6 h-6" />,
      color: 'green',
      recommended: true,
      features: [
        'Quick setup and immediate use',
        'No token expiration management',
        'Perfect for server-side applications',
        'Rate limiting and usage tracking'
      ]
    },
    {
      title: 'JWT Token Authentication',
      description: 'JSON Web Token authentication for advanced security requirements',
      icon: <Shield className="w-6 h-6" />,
      color: 'blue',
      recommended: false,
      features: [
        'Enhanced security with expiration',
        'Stateless authentication',
        'Perfect for client-side applications',
        'Custom claims and permissions'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'text-green-600 bg-green-50 border-green-200',
      blue: 'text-blue-600 bg-blue-50 border-blue-200'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Authentication</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Secure your Fusion AI API requests with our flexible authentication system. 
          Choose between API keys for simplicity or JWT tokens for enhanced security.
        </p>
      </div>

      {/* Authentication Methods */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Authentication Methods</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {authMethods.map((method, index) => (
            <div
              key={index}
              className={`relative rounded-lg border p-6 ${getColorClasses(method.color)}`}
            >
              {method.recommended && (
                <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Recommended
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${method.color === 'green' ? 'bg-green-100' : 'bg-blue-100'}`}>
                {React.cloneElement(method.icon, { 
                  className: `w-6 h-6 ${method.color === 'green' ? 'text-green-600' : 'text-blue-600'}` 
                })}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              
              <div className="space-y-2">
                {method.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Key Authentication */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">API Key Authentication</h2>
        
        <div className="space-y-8">
          {/* Getting Your API Key */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Your API Key</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-4">
                  Get your API key from the Fusion AI dashboard. All API keys start with <code className="bg-gray-100 px-2 py-1 rounded">sk-fusion-</code>.
                </p>
                <Link 
                  href="https://fusion.mcp4.ai/dashboard/api-keys"
                  target="_blank"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Get API Key
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">API Key Format</h4>
                <div className="bg-white rounded p-3 border border-green-200">
                  <code className="text-sm text-gray-700">sk-fusion-1234567890abcdef...</code>
                </div>
                <p className="text-green-800 text-sm mt-2">
                  56 characters total, always starts with "sk-fusion-"
                </p>
              </div>
            </div>
          </div>

          {/* Using API Keys */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Using API Keys in Requests</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Authorization Header (Recommended)</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-your-api-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Hello, world!",
    "provider": "neuroswitch"
  }'`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">JavaScript Example</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`const response = await fetch('https://api.mcp4.ai/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk-fusion-your-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Hello, world!',
    provider: 'neuroswitch'
  })
});

const data = await response.json();`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Python Example</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'Bearer sk-fusion-your-api-key-here',
    'Content-Type': 'application/json'
}

data = {
    'prompt': 'Hello, world!',
    'provider': 'neuroswitch'
}

response = requests.post(
    'https://api.mcp4.ai/chat',
    headers=headers,
    json=data
)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JWT Authentication */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">JWT Token Authentication</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Advanced Feature</h3>
                <p className="text-blue-800 text-sm">
                  JWT authentication is available for enterprise customers who need enhanced security, 
                  custom permissions, or client-side authentication flows.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">JWT Token Structure</h3>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <pre className="text-sm text-gray-700 overflow-x-auto">
{`{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_12345",
    "iss": "fusion-ai",
    "aud": "api.mcp4.ai",
    "exp": 1704067200,
    "iat": 1704063600,
    "scope": ["chat", "models", "account"]
  }
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Using JWT Tokens</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Hello, world!",
    "provider": "neuroswitch"
  }'`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
          Security Best Practices
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">✅ Do This</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Store API keys in environment variables</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Use HTTPS for all API requests</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Rotate API keys regularly</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Monitor API key usage in dashboard</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Use separate keys for different environments</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">❌ Avoid This</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Never expose API keys in client-side code</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Don't commit API keys to version control</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Avoid sharing API keys via email or chat</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Don't use the same key across multiple projects</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Never log API keys in application logs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Variables */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Environment Variables Setup</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Node.js / JavaScript</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">.env file</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`FUSION_AI_API_KEY=sk-fusion-your-api-key-here
FUSION_AI_BASE_URL=https://api.mcp4.ai`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Usage in code</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`const apiKey = process.env.FUSION_AI_API_KEY;
const baseUrl = process.env.FUSION_AI_BASE_URL;`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Python</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">.env file</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`FUSION_AI_API_KEY=sk-fusion-your-api-key-here
FUSION_AI_BASE_URL=https://api.mcp4.ai`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Usage in code</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('FUSION_AI_API_KEY')
base_url = os.getenv('FUSION_AI_BASE_URL')`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Testing */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Test Your Authentication</h2>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Use our interactive Swagger UI to test your API key authentication immediately
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://api.mcp4.ai/api-docs"
              target="_blank"
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <Shield className="mr-2 w-4 h-4" />
              Test in Swagger UI
              <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
            
            <Link 
              href="/docs/quickstart/first-call"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Key className="mr-2 w-4 h-4" />
              First API Call Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">401 Unauthorized Error</h3>
            <p className="text-gray-600 text-sm mb-2">Your API key is missing, invalid, or incorrectly formatted.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Verify your API key starts with "sk-fusion-"</li>
              <li>• Check the Authorization header format: "Bearer sk-fusion-..."</li>
              <li>• Ensure no extra spaces or characters in the key</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">403 Forbidden Error</h3>
            <p className="text-gray-600 text-sm mb-2">Your API key is valid but doesn't have required permissions.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your account plan and limits</li>
              <li>• Verify the endpoint is included in your plan</li>
              <li>• Contact support if you believe this is an error</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/api/parameters" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">API Parameters</h3>
              <Shield className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Complete parameter reference and validation</p>
          </Link>
          
          <Link 
            href="/docs/api/errors" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Error Handling</h3>
              <AlertTriangle className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">HTTP status codes and troubleshooting</p>
          </Link>
          
          <Link 
            href="/docs/quickstart/first-call" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Quick Start</h3>
              <Key className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Make your first authenticated API call</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 