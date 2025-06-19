import React from 'react';
import Link from 'next/link';
import { Terminal, Key, Shield, Zap, Clock, AlertTriangle, Settings, BarChart3, ExternalLink } from 'lucide-react';

export default function APIReferencePage() {
  const apiSections = [
    {
      title: 'Authentication',
      href: '/docs/api/auth',
      icon: <Shield className="w-6 h-6" />,
      color: 'green',
      description: 'API key setup, JWT tokens, and security best practices'
    },
    {
      title: 'Parameters',
      href: '/docs/api/parameters',
      icon: <Settings className="w-6 h-6" />,
      color: 'blue',
      description: 'Complete parameter reference with types and validation'
    },
    {
      title: 'Error Handling',
      href: '/docs/api/errors',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'red',
      description: 'HTTP status codes, error messages, and troubleshooting'
    },
    {
      title: 'Rate Limits',
      href: '/docs/api/limits',
      icon: <Clock className="w-6 h-6" />,
      color: 'yellow',
      description: 'Usage limits, tier comparisons, and optimization strategies'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200 text-green-900 hover:border-green-300',
      blue: 'bg-blue-50 border-blue-200 text-blue-900 hover:border-blue-300',
      red: 'bg-red-50 border-red-200 text-red-900 hover:border-red-300',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900 hover:border-yellow-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete documentation for the Fusion AI API. Build powerful applications with our unified interface 
          to multiple AI providers, intelligent routing, and advanced features.
        </p>
      </div>

      {/* Interactive API Explorer */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive API Explorer</h2>
          <p className="text-gray-600 mb-6">
            Test API endpoints interactively with our Swagger documentation
          </p>
          <Link 
            href="https://api.mcp4.ai/api-docs" 
            target="_blank"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Open Swagger UI
            <ExternalLink className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* API Sections Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">API Documentation Sections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apiSections.map((section, index) => (
            <Link 
              key={index}
              href={section.href} 
              className={`border rounded-lg p-6 transition-all duration-200 hover:shadow-md ${getColorClasses(section.color)}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${section.color === 'green' ? 'bg-green-100' : section.color === 'blue' ? 'bg-blue-100' : section.color === 'red' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                {React.cloneElement(section.icon, { 
                  className: `w-6 h-6 ${section.color === 'green' ? 'text-green-600' : section.color === 'blue' ? 'text-blue-600' : section.color === 'red' ? 'text-red-600' : 'text-yellow-600'}` 
                })}
              </div>
              <h3 className="font-semibold mb-2">{section.title}</h3>
              <p className="text-sm opacity-75">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Base URL</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <code className="text-blue-600 font-mono text-sm">https://api.mcp4.ai</code>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
{`Authorization: Bearer sk-fusion-your-api-key`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Request</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
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

      {/* Core Endpoints Overview */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Endpoints</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Chat Completion</h3>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">POST</span>
                <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">/chat</code>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              Send messages to AI models with intelligent routing, streaming support, and multimedia processing.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">NeuroSwitch Routing</span>
              <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">Streaming</span>
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">Function Calling</span>
              <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">File Upload</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">List Models</h3>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">GET</span>
                <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">/models</code>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              Retrieve available AI models, their capabilities, and pricing information.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">Model Metadata</span>
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">Capabilities</span>
              <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">Pricing Info</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">GET</span>
                <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">/account</code>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              Check your account balance, usage statistics, and plan details.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">Balance</span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">Usage Stats</span>
              <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">Plan Info</span>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs and Libraries */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SDKs & Libraries</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Node.js / JavaScript</h3>
            <div className="bg-gray-900 rounded p-3 mb-3">
              <code className="text-green-400 text-sm">npm install fusion-ai-sdk</code>
            </div>
            <p className="text-gray-600 text-sm">Official SDK with TypeScript support</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Python</h3>
            <div className="bg-gray-900 rounded p-3 mb-3">
              <code className="text-green-400 text-sm">pip install fusion-ai</code>
            </div>
            <p className="text-gray-600 text-sm">Python client with async support</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">OpenAI Compatible</h3>
            <div className="bg-gray-900 rounded p-3 mb-3">
              <code className="text-green-400 text-sm">base_url="api.mcp4.ai"</code>
            </div>
            <p className="text-gray-600 text-sm">Use existing OpenAI SDKs</p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Explore our comprehensive API documentation and start building with Fusion AI today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart/first-call" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Terminal className="mr-2 w-4 h-4" />
            Make Your First Call
          </Link>
          <Link 
            href="/docs/api/auth" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Key className="mr-2 w-4 h-4" />
            Authentication Guide
          </Link>
        </div>
      </section>
    </div>
  );
} 