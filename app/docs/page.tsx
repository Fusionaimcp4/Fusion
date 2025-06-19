import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Brain, Code, Globe, Users } from 'lucide-react';

export default function DocsHomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Fusion AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          The unified AI orchestration platform that intelligently routes your requests 
          to the best AI models using our proprietary <Link href="/docs/overview/neuroswitch" className="text-blue-600 hover:text-blue-700 font-semibold">NeuroSwitch™</Link> technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/api" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            View API Reference
          </Link>
        </div>
      </div>

      {/* What is Fusion AI */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Fusion AI?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Fusion AI is a next-generation AI orchestration platform that provides a unified interface 
          to the world's leading AI models. Instead of being locked into a single provider, 
          Fusion AI intelligently routes your requests to the optimal model based on your specific needs.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">NeuroSwitch™ Technology</h3>
            <p className="text-gray-600 mb-4">
              Our proprietary routing engine analyzes your prompt and automatically selects the best model for optimal results.
            </p>
            <Link href="/docs/overview/neuroswitch" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Learn more →
            </Link>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
            <p className="text-gray-600 mb-4">
              Your data stays secure with enterprise-grade encryption and optional BYOAPI key integration.
            </p>
            <Link href="/docs/privacy/logging" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Privacy details →
            </Link>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 mb-4">
              Optimized routing, caching, and failover mechanisms ensure consistent, low-latency responses.
            </p>
            <Link href="/docs/features/caching" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View features →
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Benefits</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Globe className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Universal Model Access</h3>
                <p className="text-gray-600 mb-2">
                  Access GPT-4, Claude, Gemini, and more through a single API. No need to manage multiple integrations.
                </p>
                <Link href="/docs/models" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  See supported models →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Code className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple Integration</h3>
                <p className="text-gray-600 mb-2">
                  Drop-in replacement for OpenAI API with enhanced features. Migrate in minutes, not hours.
                </p>
                <Link href="/docs/quickstart/first-call" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Make your first call →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">BYOAPI Support</h3>
                <p className="text-gray-600 mb-2">
                  Bring your own API keys for direct billing and maximum privacy, with intelligent fallbacks.
                </p>
                <Link href="/docs/providers/byoapi" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Setup BYOAPI →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Quick Example</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain quantum computing",
    "provider": "neuroswitch"
  }'`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              NeuroSwitch automatically selects the best model for your prompt, ensuring optimal results every time.
            </p>
            <div className="mt-4">
              <Link href="/docs/api/parameters" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Explore all parameters →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How NeuroSwitch Works */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How NeuroSwitch™ Works</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyze</h3>
            <p className="text-gray-600">
              NeuroSwitch analyzes your prompt for complexity, domain, and requirements.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Route</h3>
            <p className="text-gray-600">
              Intelligently routes to the optimal model based on performance metrics and capabilities.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Deliver</h3>
            <p className="text-gray-600">
              Returns the best possible response with transparent provider information.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/docs/overview/neuroswitch" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Learn more about NeuroSwitch Technology →
          </Link>
        </div>
      </section>

      {/* Quick Data Flow */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Flow Overview</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Your Application</h3>
              <p className="text-sm text-gray-600 mt-1">Send request via API</p>
            </div>
            
            <ArrowRight className="text-gray-400 w-6 h-6 transform lg:transform-none rotate-90 lg:rotate-0" />
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">NeuroSwitch™</h3>
              <p className="text-sm text-gray-600 mt-1">Analyze & route</p>
            </div>
            
            <ArrowRight className="text-gray-400 w-6 h-6 transform lg:transform-none rotate-90 lg:rotate-0" />
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">AI Provider</h3>
              <p className="text-sm text-gray-600 mt-1">Process request</p>
            </div>
            
            <ArrowRight className="text-gray-400 w-6 h-6 transform lg:transform-none rotate-90 lg:rotate-0" />
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Response</h3>
              <p className="text-sm text-gray-600 mt-1">Optimized output</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              href="/docs/overview/data-flow" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View detailed data flow diagram →
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Features */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/docs/features/streaming" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Streaming</h3>
            <p className="text-gray-600 text-sm">
              Real-time token-by-token responses
            </p>
            <div className="text-blue-600 font-medium text-sm mt-3 group-hover:text-blue-700">
              Learn more →
            </div>
          </Link>

          <Link href="/docs/features/tools" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <Code className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Tool Calling</h3>
            <p className="text-gray-600 text-sm">
              Let AI use functions and external tools
            </p>
            <div className="text-blue-600 font-medium text-sm mt-3 group-hover:text-blue-700">
              Learn more →
            </div>
          </Link>

          <Link href="/docs/features/multimedia" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-purple-600 text-lg">📷</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multimedia</h3>
            <p className="text-gray-600 text-sm">
              Process images and PDFs with AI
            </p>
            <div className="text-blue-600 font-medium text-sm mt-3 group-hover:text-blue-700">
              Learn more →
            </div>
          </Link>

          <Link href="/docs/features/web-search" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Globe className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Web Search</h3>
            <p className="text-gray-600 text-sm">
              Access real-time web information
            </p>
            <div className="text-blue-600 font-medium text-sm mt-3 group-hover:text-blue-700">
              Learn more →
            </div>
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            href="/docs/features" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all features →
          </Link>
        </div>
      </section>

      {/* Ready to Get Started */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/docs/quickstart" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Quickstart Guide</h3>
            <p className="text-gray-600">
              Get your API key and make your first request in under 5 minutes.
            </p>
            <div className="mt-4 text-blue-600 font-medium">
              Start building →
            </div>
          </Link>
          
          <Link href="/docs/api" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📤 API Reference</h3>
            <p className="text-gray-600">
              Complete documentation of all endpoints, parameters, and responses.
            </p>
            <div className="mt-4 text-blue-600 font-medium">
              Explore API →
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
} 