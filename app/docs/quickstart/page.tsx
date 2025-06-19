import React from 'react';
import Link from 'next/link';
import { Copy, Key, Terminal, CheckCircle, ArrowRight } from 'lucide-react';

export default function QuickstartPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Quickstart Guide</h1>
        <p className="text-xl text-gray-600">
          Get up and running with Fusion AI in under 5 minutes. From API key to first response.
        </p>
      </div>

      {/* Step 1: Get Your API Key */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
          <h2 className="text-2xl font-bold text-gray-900">Get Your API Key</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            First, you'll need to get an API key from your Fusion AI dashboard. This key will authenticate your requests.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Key className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Free Tier Included</h3>
                <p className="text-blue-800 text-sm">
                  New accounts come with free credits to test the platform. No credit card required to get started.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Go to your <Link href="/dashboard/api-keys" className="text-blue-600 hover:text-blue-700 underline">API Keys dashboard</Link></span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Click "Create New Key" and give it a name</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Copy and securely store your API key (starts with <code className="bg-gray-100 px-2 py-1 rounded text-sm">sk-fusion-</code>)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: Test Your First Call */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
          <h2 className="text-2xl font-bold text-gray-900">Test Your First Call</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Let's make your first request to the Fusion AI API using cURL. Replace <code className="bg-gray-100 px-2 py-1 rounded">YOUR_API_KEY</code> with your actual key.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Basic Chat Request</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative group">
              <button 
                className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain machine learning in simple terms",
    "provider": "neuroswitch"
  }'`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Expected Response</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 overflow-x-auto">
{`{
  "prompt": "Explain machine learning in simple terms",
  "response": {
    "text": "Machine learning is like teaching a computer to recognize patterns and make predictions..."
  },
  "provider": "openai",
  "model": "gpt-4",
  "tokens": {
    "total_tokens": 156,
    "input_tokens": 12,
    "output_tokens": 144
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Understanding NeuroSwitch */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
          <h2 className="text-2xl font-bold text-gray-900">Understanding NeuroSwitch</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Notice how you sent the request to "neuroswitch" but got a response from "openai"? That's NeuroSwitch in action!
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">What Happened?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                NeuroSwitch analyzed your prompt
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Determined GPT-4 was optimal for this request
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Routed automatically to OpenAI
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Returned the result with transparency
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Try Different Prompts</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-white rounded p-3 border">
                <strong>Code question:</strong> May route to Claude
              </div>
              <div className="bg-white rounded p-3 border">
                <strong>Creative writing:</strong> May route to GPT-4
              </div>
              <div className="bg-white rounded p-3 border">
                <strong>Math problem:</strong> May route to Gemini
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: Choose Your Provider */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Provider (Optional)</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Want to target a specific provider? Just change the provider parameter:
        </p>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">OpenAI Direct</h3>
            <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "prompt": "Your question",
  "provider": "openai",
  "model": "gpt-4"
}`}
            </pre>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Claude Direct</h3>
            <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "prompt": "Your question",
  "provider": "claude",
  "model": "claude-3-sonnet"
}`}
            </pre>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">NeuroSwitch (Smart)</h3>
            <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "prompt": "Your question",
  "provider": "neuroswitch"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/docs/quickstart/sdks" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <Terminal className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">SDKs & Libraries</h3>
            <p className="text-gray-600 text-sm mb-3">
              Use our official SDKs for Python, JavaScript, and more.
            </p>
            <div className="text-blue-600 font-medium text-sm flex items-center">
              Explore SDKs <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </Link>

          <Link href="/docs/features/streaming" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-green-600">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Streaming Responses</h3>
            <p className="text-gray-600 text-sm mb-3">
              Get real-time responses as they're generated.
            </p>
            <div className="text-blue-600 font-medium text-sm flex items-center">
              Learn streaming <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </Link>

          <Link href="/docs/providers/byoapi" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Key className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">BYOAPI Keys</h3>
            <p className="text-gray-600 text-sm mb-3">
              Use your own API keys for maximum privacy and control.
            </p>
            <div className="text-blue-600 font-medium text-sm flex items-center">
              Setup BYOAPI <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </Link>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-blue-800 mb-4">
          Having trouble getting started? We're here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/docs/faq" className="text-blue-600 hover:text-blue-700 font-medium">
            Check the FAQ →
          </Link>
          <Link href="/docs/community/discord" className="text-blue-600 hover:text-blue-700 font-medium">
            Join our Discord →
          </Link>
          <Link href="/docs/api/errors" className="text-blue-600 hover:text-blue-700 font-medium">
            Common errors →
          </Link>
        </div>
      </section>
    </div>
  );
} 