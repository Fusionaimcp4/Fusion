import React from 'react';
import Link from 'next/link';
import { Copy, Download, ExternalLink, Code, Terminal, Zap } from 'lucide-react';

export default function SDKsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SDKs & Libraries</h1>
        <p className="text-xl text-gray-600">
          Use our official SDKs to integrate Fusion AI into your applications with just a few lines of code.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-4 gap-4">
        <a href="#python" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
          <Code className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="font-semibold text-blue-900">Python SDK</h3>
          <p className="text-blue-700 text-sm">pip install fusion-ai</p>
        </a>
        
        <a href="#javascript" className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:border-yellow-300 transition-colors">
          <Code className="w-6 h-6 text-yellow-600 mb-2" />
          <h3 className="font-semibold text-yellow-900">JavaScript SDK</h3>
          <p className="text-yellow-700 text-sm">npm install @fusion-ai/sdk</p>
        </a>
        
        <a href="#postman" className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
          <ExternalLink className="w-6 h-6 text-orange-600 mb-2" />
          <h3 className="font-semibold text-orange-900">Postman Collection</h3>
          <p className="text-orange-700 text-sm">Import & test instantly</p>
        </a>

        <a href="#curl" className="bg-green-50 border border-green-200 rounded-lg p-4 hover:border-green-300 transition-colors">
          <Terminal className="w-6 h-6 text-green-600 mb-2" />
          <h3 className="font-semibold text-green-900">cURL Examples</h3>
          <p className="text-green-700 text-sm">Command line testing</p>
        </a>
      </div>

      {/* Python SDK */}
      <section id="python" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <Code className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Python SDK</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Installation</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative group">
              <button className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm">
{`pip install fusion-ai`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Basic Usage</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative group">
              <button className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`from fusion_ai import FusionAI

# Initialize the client
client = FusionAI(api_key="sk-fusion-your-key-here")

# Simple chat completion
response = client.chat(
    prompt="Explain machine learning in simple terms",
    provider="neuroswitch"  # Let NeuroSwitch choose the best model
)

print(response.text)
print(f"Used: {response.provider}/{response.model}")
print(f"Tokens: {response.tokens.total_tokens}")`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Advanced Examples</h3>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Streaming Response</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`for chunk in client.chat_stream(
    prompt="Write a story about AI",
    provider="neuroswitch"
):
    print(chunk.text, end="", flush=True)`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Specific Provider</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`response = client.chat(
    prompt="Code review this function",
    provider="claude",
    model="claude-3-sonnet"
)`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">With BYOAPI Key</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`response = client.chat(
    prompt="Hello world",
    provider="openai",
    byoapi_key="your-openai-key"
)`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Error Handling</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`try:
    response = client.chat(prompt="Hello")
except FusionAIError as e:
    print(f"Error: {e.message}")
    print(f"Code: {e.status_code}")`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JavaScript SDK */}
      <section id="javascript" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <Code className="w-6 h-6 text-yellow-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">JavaScript SDK</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Installation</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative group">
              <button className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm">
{`npm install @fusion-ai/sdk`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Basic Usage</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative group">
              <button className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`import FusionAI from '@fusion-ai/sdk';

// Initialize the client
const client = new FusionAI({
  apiKey: 'sk-fusion-your-key-here'
});

// Simple chat completion
const response = await client.chat({
  prompt: 'Explain machine learning in simple terms',
  provider: 'neuroswitch'
});

console.log(response.text);
console.log(\`Used: \${response.provider}/\${response.model}\`);
console.log(\`Tokens: \${response.tokens.total_tokens}\`);`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Advanced Examples</h3>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Streaming Response</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`for await (const chunk of client.chatStream({
  prompt: 'Write a story about AI',
  provider: 'neuroswitch'
})) {
  process.stdout.write(chunk.text);
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">React Hook</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`import { useFusionAI } from '@fusion-ai/react';

const { chat, loading, error } = useFusionAI();

const handleSubmit = async () => {
  const response = await chat({
    prompt: userInput,
    provider: 'neuroswitch'
  });
};`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Express.js Route</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`app.post('/api/chat', async (req, res) => {
  try {
    const response = await client.chat({
      prompt: req.body.prompt,
      provider: 'neuroswitch'
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">TypeScript Types</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`interface ChatRequest {
  prompt: string;
  provider?: Provider;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Postman Collection */}
      <section id="postman" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <ExternalLink className="w-6 h-6 text-orange-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Postman Collection</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Import our pre-configured Postman collection to start testing the Fusion AI API immediately.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Import</h3>
            <p className="text-gray-600 text-sm mb-4">
              Click the button below to import our collection directly into Postman:
            </p>
            <a 
              href="https://api.mcp4.ai/postman-collection" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Import Collection
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Chat completion examples
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                All provider options (NeuroSwitch, OpenAI, Claude, Gemini)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Streaming requests
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                BYOAPI examples
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Error handling scenarios
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Environment variables setup
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* cURL Examples */}
      <section id="curl" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <Terminal className="w-6 h-6 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">cURL Examples</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Basic Chat Request</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative group">
              <button className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-your-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Hello, how are you?",
    "provider": "neuroswitch"
  }'`}
              </pre>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Streaming Request</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-xs overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write a story",
    "provider": "neuroswitch",
    "stream": true
  }'`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Specific Provider</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-xs overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain quantum physics",
    "provider": "claude",
    "model": "claude-3-sonnet"
  }'`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">With Parameters</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-xs overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Be creative",
    "provider": "neuroswitch",
    "temperature": 0.9,
    "max_tokens": 500
  }'`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Check Credits</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-xs overflow-x-auto">
{`curl -H "Authorization: Bearer sk-fusion-..." \\
  https://api.mcp4.ai/credits`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/docs/features/streaming" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <Zap className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Enable Streaming</h3>
            <p className="text-gray-600 text-sm mb-3">
              Get real-time responses as they're generated.
            </p>
            <div className="text-blue-600 font-medium text-sm">
              Learn streaming →
            </div>
          </Link>

          <Link href="/docs/providers/byoapi" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-purple-600">🔑</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Setup BYOAPI</h3>
            <p className="text-gray-600 text-sm mb-3">
              Use your own API keys for maximum privacy.
            </p>
            <div className="text-blue-600 font-medium text-sm">
              Configure BYOAPI →
            </div>
          </Link>

          <Link href="/docs/api" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-green-600">📤</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Full API Reference</h3>
            <p className="text-gray-600 text-sm mb-3">
              Explore all endpoints and parameters.
            </p>
            <div className="text-blue-600 font-medium text-sm">
              Browse docs →
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
} 