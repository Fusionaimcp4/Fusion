import React from 'react';
import Link from 'next/link';
import { Code, Copy, CheckCircle, ArrowRight, Terminal, Zap, Globe, Brain } from 'lucide-react';

export default function FirstCallPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Your First Call</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Make your first API request to Fusion AI and see NeuroSwitch intelligent routing in action. 
          Get up and running in under 2 minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h2>
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-700">
              You have your Fusion AI API key from the{' '}
              <Link href="/docs/quickstart" className="text-blue-600 hover:text-blue-700 underline">
                quickstart guide
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* cURL Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Option 1: cURL (Quick Test)</h2>
        
        <div className="bg-gray-900 rounded-lg p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-mono text-sm">Terminal</span>
            </div>
            <button className="text-gray-400 hover:text-white p-1">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          
          <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/api/chat \
  -H "Authorization: ApiKey sk-fusion-your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing in simple terms",
    "provider": "neuroswitch",
    "max_tokens": 150
  }'`}
          </pre>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Replace <code className="bg-yellow-100 px-1 rounded">sk-fusion-your-api-key-here</code> with your actual API key.
          </p>
        </div>
      </section>

      {/* Expected Response */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Response</h3>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <pre className="text-sm text-gray-700 overflow-x-auto">
{`{
  "response": "Quantum computing is like having a super-powered calculator that can explore many solutions simultaneously...",
  "provider_used": "claude-3-opus",
  "routing_reason": "Educational content - Claude excels at clear explanations",
  "tokens_used": 142,
  "cost": 0.00213,
  "request_id": "req_abc123",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
          </pre>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <Brain className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">NeuroSwitch Decision</h4>
              <p className="text-sm text-gray-600">See exactly why this model was chosen</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <Zap className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Real-time Costs</h4>
              <p className="text-sm text-gray-600">Transparent token and cost tracking</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Provider Info</h4>
              <p className="text-sm text-gray-600">Know which model handled your request</p>
            </div>
          </div>
        </div>
      </section>

      {/* JavaScript Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Option 2: JavaScript/Node.js</h2>
        
        <div className="bg-gray-900 rounded-lg p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-mono text-sm">JavaScript</span>
            </div>
            <button className="text-gray-400 hover:text-white p-1">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          
          <pre className="text-gray-300 text-sm overflow-x-auto">
{`const response = await fetch('https://api.mcp4.ai/api/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'ApiKey sk-fusion-your-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Write a Python function to calculate fibonacci numbers',
    provider: 'neuroswitch',
    max_tokens: 200
  })
});

const data = await response.json();
console.log('AI Response:', data.response);
console.log('Model Used:', data.provider_used);
console.log('Cost:', data.cost);`}
          </pre>
        </div>
      </section>

      {/* Python Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Option 3: Python</h2>
        
        <div className="bg-gray-900 rounded-lg p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-mono text-sm">Python</span>
            </div>
            <button className="text-gray-400 hover:text-white p-1">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          
          <pre className="text-gray-300 text-sm overflow-x-auto">
{`import requests

response = requests.post(
    'https://api.mcp4.ai/api/chat',
    headers={
        'Authorization': 'ApiKey sk-fusion-your-api-key-here',
        'Content-Type': 'application/json'
    },
    json={
        'prompt': 'Analyze this data and provide insights',
        'provider': 'neuroswitch',
        'max_tokens': 300
    }
)

data = response.json()
print(f"AI Response: {data['response']}")
print(f"Model Used: {data['provider_used']}")
print(f"Tokens Used: {data['tokens_used']}")
print(f"Cost: $\\{data['cost']}")`}
          </pre>
        </div>
      </section>

      {/* Different Providers */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Try Different Providers</h2>
        
        <p className="text-gray-600 mb-6">
          Test how different providers handle the same prompt. Change the <code className="bg-gray-100 px-1 rounded">provider</code> parameter:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Let NeuroSwitch Choose</h3>
            <div className="bg-gray-50 rounded p-3 border">
              <code className="text-sm">"provider": "neuroswitch"</code>
            </div>
            <p className="text-sm text-gray-600 mt-2">Automatically selects the best model for your prompt</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Specific Providers</h3>
            <div className="space-y-2">
              <div className="bg-gray-50 rounded p-2 border">
                <code className="text-sm">"provider": "openai"</code>
              </div>
              <div className="bg-gray-50 rounded p-2 border">
                <code className="text-sm">"provider": "claude"</code>
              </div>
              <div className="bg-gray-50 rounded p-2 border">
                <code className="text-sm">"provider": "gemini"</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Parameters */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Parameters</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Required Parameters</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <code className="bg-white px-2 py-1 rounded border text-sm">prompt</code>
                  <p className="text-sm text-gray-600 mt-1">Your message or question to the AI</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <code className="bg-white px-2 py-1 rounded border text-sm">provider</code>
                  <p className="text-sm text-gray-600 mt-1">Which AI provider to use (or "neuroswitch")</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Optional Parameters</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 border border-gray-300 rounded mt-1 flex-shrink-0"></div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border text-sm">max_tokens</code>
                  <p className="text-sm text-gray-600 mt-1">Maximum response length (default: 1000)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 border border-gray-300 rounded mt-1 flex-shrink-0"></div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border text-sm">temperature</code>
                  <p className="text-sm text-gray-600 mt-1">Response creativity (0.0-1.0, default: 0.7)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 border border-gray-300 rounded mt-1 flex-shrink-0"></div>
                <div>
                  <code className="bg-white px-2 py-1 rounded border text-sm">stream</code>
                  <p className="text-sm text-gray-600 mt-1">Enable streaming responses (true/false)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="bg-red-50 rounded-lg p-6 border border-red-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Issues</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">❌ "Unauthorized" Error</h3>
            <p className="text-sm text-gray-600 mt-1">
              Check that your API key is correct and includes the <code className="bg-red-100 px-1 rounded">sk-fusion-</code> prefix.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">❌ "Invalid JSON" Error</h3>
            <p className="text-sm text-gray-600 mt-1">
              Ensure your request body is valid JSON and includes the <code className="bg-red-100 px-1 rounded">Content-Type: application/json</code> header.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">❌ Slow Response</h3>
            <p className="text-sm text-gray-600 mt-1">
              First requests may take 2-3 seconds as models "warm up." Subsequent requests are typically sub-second.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Great! What's Next?</h2>
        <p className="text-gray-600 mb-6">
          You've successfully made your first API call. Now explore more advanced features and integrations.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Link 
            href="/docs/quickstart/chat-setup" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Set Up Chat Sessions</h3>
            <p className="text-gray-600 text-sm mb-3">Learn how to maintain conversation context</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors mx-auto" />
          </Link>
          
          <Link 
            href="/docs/features/streaming" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Enable Streaming</h3>
            <p className="text-gray-600 text-sm mb-3">Get real-time token-by-token responses</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors mx-auto" />
          </Link>
          
          <Link 
            href="/docs/quickstart/sdks" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Use SDKs</h3>
            <p className="text-gray-600 text-sm mb-3">Integrate with official libraries and tools</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors mx-auto" />
          </Link>
        </div>
      </section>
    </div>
  );
} 