import React from 'react';
import Link from 'next/link';
import { Key, Shield, Zap, ArrowRight, CheckCircle, AlertTriangle, Code, Settings, Globe, RefreshCcw } from 'lucide-react';

export const metadata = {
  title: 'Provider Routing - Fusion AI Documentation',
  description: 'Learn how to configure provider routing, bring your own API keys, set up fallback rules, and implement multi-provider logic in Fusion AI.',
};

export default function ProvidersPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Provider Routing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Take control of your AI provider strategy with flexible routing options, 
          BYOAPI key support, and intelligent fallback mechanisms.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Provider Management</h2>
            <p className="text-gray-700">
              Fusion AI gives you complete flexibility in how you route requests to AI providers. 
              Whether you want to use your own API keys, set up complex fallback chains, or implement 
              sophisticated multi-provider logic, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* BYOAPI Section */}
      <section id="byoapi" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Bring Your Own API Key</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Use your own API keys for direct billing, enhanced privacy, and full control over your AI provider relationships. 
          Fusion AI acts as an intelligent router while your costs go directly to your chosen providers.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of BYOAPI</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Direct Billing:</span>
                    <span className="text-gray-600"> Pay providers directly at their rates</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Enhanced Privacy:</span>
                    <span className="text-gray-600"> Your keys, your data relationships</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Rate Limit Control:</span>
                    <span className="text-gray-600"> Use your provider's full rate limits</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Model Access:</span>
                    <span className="text-gray-600"> Access your provider's latest models</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Supported Providers</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <span className="font-medium text-gray-900">OpenAI</span>
                  <p className="text-sm text-gray-600">GPT-4, GPT-3.5</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <span className="font-medium text-gray-900">Anthropic</span>
                  <p className="text-sm text-gray-600">Claude 3.5</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <span className="font-medium text-gray-900">Google</span>
                  <p className="text-sm text-gray-600">Gemini Pro</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <span className="font-medium text-gray-900">Azure</span>
                  <p className="text-sm text-gray-600">OpenAI Models</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Setup Example</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# 1. Add your API keys to Fusion
curl -X POST https://api.mcp4.ai/v1/keys \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -d '{
    "provider": "openai",
    "api_key": "sk-your-openai-key...",
    "name": "Primary OpenAI"
  }'

# 2. Use BYOAPI in requests
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Use-BYOAPI: true" \\
  -d '{
    "prompt": "Hello world",
    "provider": "openai"
  }'`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              Your OpenAI key is used directly, costs appear on your OpenAI bill.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Security Best Practices</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Store API keys securely in your Fusion dashboard</li>
                <li>• Use environment-specific keys (dev, staging, prod)</li>
                <li>• Regularly rotate your API keys</li>
                <li>• Monitor usage and set up billing alerts</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link 
            href="/docs/api/auth" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Key className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900">API Key Management</h4>
              <p className="text-sm text-gray-600">How to securely store and manage your keys</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/features/caching" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Zap className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900">Caching & Performance</h4>
              <p className="text-sm text-gray-600">Optimize costs with intelligent caching</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Fallback Rules Section */}
      <section id="fallback" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <RefreshCcw className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Fallback Rules</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Ensure 99.9% uptime with intelligent fallback mechanisms. When your primary provider is unavailable, 
          Fusion AI automatically routes to backup providers based on your configured rules.
        </p>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Primary Attempt</h3>
            <p className="text-gray-600 text-sm">
              Request goes to your preferred provider first (fastest, cheapest, or highest quality).
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-orange-600 font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Detect Failure</h3>
            <p className="text-gray-600 text-sm">
              Monitor for rate limits, outages, errors, or timeout conditions automatically.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Auto Fallback</h3>
            <p className="text-gray-600 text-sm">
              Instantly route to your next available provider with zero downtime.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fallback Triggers</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900">Rate Limits:</span>
                  <span className="text-gray-600"> When provider limits are exceeded</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900">Service Outages:</span>
                  <span className="text-gray-600"> Provider API unavailable</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900">Timeout Errors:</span>
                  <span className="text-gray-600"> Requests taking too long</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900">Model Unavailable:</span>
                  <span className="text-gray-600"> Specific model temporarily offline</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Fallback Configuration</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Configure fallback chain
curl -X POST https://api.mcp4.ai/v1/fallbacks \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -d '{
    "primary": "openai",
    "fallbacks": [
      {
        "provider": "anthropic",
        "priority": 1,
        "conditions": ["rate_limit", "outage"]
      },
      {
        "provider": "google",
        "priority": 2,
        "conditions": ["all"]
      }
    ]
  }'`}
            </pre>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-3">Smart Fallback Features</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-medium text-gray-900">Context Preservation:</span>
                <span className="text-gray-700"> Full conversation history maintained</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-medium text-gray-900">Format Translation:</span>
                <span className="text-gray-700"> Automatic API format conversion</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-medium text-gray-900">Retry Logic:</span>
                <span className="text-gray-700"> Intelligent backoff and retry attempts</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-medium text-gray-900">Health Monitoring:</span>
                <span className="text-gray-700"> Real-time provider status tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-provider Logic Section */}
      <section id="multi-provider" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Multi-provider Logic</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Implement sophisticated routing strategies that leverage multiple providers simultaneously. 
          Optimize for cost, performance, quality, or any combination based on your specific needs.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Routing Strategies</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">💰 Cost Optimization</h4>
                  <p className="text-sm text-gray-600">
                    Route to the cheapest provider that meets quality thresholds for your prompt type.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">⚡ Performance First</h4>
                  <p className="text-sm text-gray-600">
                    Prioritize speed and low latency, perfect for real-time applications.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🎯 Quality Focused</h4>
                  <p className="text-sm text-gray-600">
                    Route to providers with the highest accuracy for specific domains or tasks.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">⚖️ Load Balancing</h4>
                  <p className="text-sm text-gray-600">
                    Distribute requests across providers to maximize throughput and reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Advanced Routing</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Multi-provider strategy
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -d '{
    "prompt": "Analyze this complex data",
    "strategy": {
      "type": "weighted",
      "providers": {
        "openai": {"weight": 60, "max_cost": 0.01},
        "anthropic": {"weight": 30, "quality_min": 0.9},
        "google": {"weight": 10, "fallback_only": true}
      },
      "optimization": "cost_quality_balance"
    }
  }'`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              Intelligent routing based on cost, quality, and availability.
            </p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">NeuroSwitch Integration</h4>
          <p className="text-gray-700 mb-4">
            Multi-provider logic works seamlessly with NeuroSwitch to provide the most intelligent routing possible:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Analyze:</span> NeuroSwitch categorizes your prompt
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Match:</span> Apply your multi-provider rules
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Route:</span> Select optimal provider dynamically
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">A/B Testing</h4>
            <p className="text-sm text-gray-600 mb-4">
              Split traffic between providers to compare quality, cost, and performance metrics.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Split traffic percentages</li>
              <li>• Quality score tracking</li>
              <li>• Cost comparison reports</li>
              <li>• Statistical significance</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Canary Deployments</h4>
            <p className="text-sm text-gray-600 mb-4">
              Gradually roll out new providers or models to minimize risk and validate performance.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Gradual traffic increases</li>
              <li>• Error rate monitoring</li>
              <li>• Automatic rollback</li>
              <li>• Success criteria tracking</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Consensus Routing</h4>
            <p className="text-sm text-gray-600 mb-4">
              Send requests to multiple providers and use consensus or best-response selection.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Multiple provider calls</li>
              <li>• Response quality scoring</li>
              <li>• Consensus algorithms</li>
              <li>• Confidence intervals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/docs/overview/neuroswitch" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Globe className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">NeuroSwitch Technology</h3>
              <p className="text-sm text-gray-600">How intelligent routing works</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/api/parameters" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Code className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">API Parameters</h3>
              <p className="text-sm text-gray-600">Complete parameter reference</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/routing/examples" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Settings className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Routing Examples</h3>
              <p className="text-sm text-gray-600">Real-world configuration examples</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/features/streaming" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Zap className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Streaming Support</h3>
              <p className="text-sm text-gray-600">Real-time response streaming</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/privacy/logging" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Shield className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Privacy & Logging</h3>
              <p className="text-sm text-gray-600">Data handling with BYOAPI</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/use-cases/enterprises" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Enterprise Use Cases</h3>
              <p className="text-sm text-gray-600">Advanced routing strategies</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
} 