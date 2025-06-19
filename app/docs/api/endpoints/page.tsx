import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Send, Key, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'API Endpoints - Fusion AI Documentation',
  description: 'Complete reference for all Fusion AI API endpoints including chat completion, model selection, and authentication.',
};

export default function APIEndpointsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h1>
        <p className="text-lg text-gray-600">
          Complete reference for all Fusion AI API endpoints. Our API follows REST principles and OpenAI compatibility standards.
        </p>
      </div>

      {/* Base URL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Base URL</h2>
        <code className="text-blue-800 font-mono">https://api.fusionai.com/v1</code>
      </div>

      {/* Chat Completions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat Completions</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded">POST</span>
            <code className="font-mono text-gray-800">/chat/completions</code>
          </div>
          
          <p className="text-gray-600 mb-4">
            Create a chat completion with automatic model routing via NeuroSwitch™ or specify your preferred provider.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Example Request</h4>
            <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.fusionai.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"role": "user", "content": "Explain quantum computing"}
    ],
    "provider": "neuroswitch",
    "stream": false
  }'`}
            </pre>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Models</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded">GET</span>
            <code className="font-mono text-gray-800">/models</code>
          </div>
          
          <p className="text-gray-600 mb-4">
            List all available models and their capabilities.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Example Request</h4>
            <pre className="text-sm overflow-x-auto">
{`curl -X GET https://api.fusionai.com/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded">GET</span>
            <code className="font-mono text-gray-800">/models/&#123;model_id&#125;</code>
          </div>
          
          <p className="text-gray-600 mb-4">
            Get details about a specific model including pricing and capabilities.
          </p>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded">POST</span>
            <code className="font-mono text-gray-800">/auth/verify</code>
          </div>
          
          <p className="text-gray-600 mb-4">
            Verify your API key and get account information.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Example Request</h4>
            <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.fusionai.com/v1/auth/verify \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>
        </div>
      </section>

      {/* Usage Stats */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage & Billing</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded">GET</span>
              <code className="font-mono text-gray-800">/usage</code>
            </div>
            <p className="text-gray-600">Get current period usage statistics and costs.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded">GET</span>
              <code className="font-mono text-gray-800">/credits</code>
            </div>
            <p className="text-gray-600">Check your current credit balance and transaction history.</p>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-amber-900">Error Responses</h3>
          </div>
          <p className="text-amber-800 mb-4">
            All endpoints return standard HTTP status codes. Error responses include detailed messages and error codes.
          </p>
          <Link href="/docs/api/errors" className="text-amber-700 hover:text-amber-800 font-medium">
            View Error Reference →
          </Link>
        </div>
      </section>

      {/* Next Steps */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/docs/api/parameters" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <Code className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Parameters Reference</h3>
            </div>
            <p className="text-gray-600 text-sm">Detailed documentation for all API parameters and options.</p>
          </Link>

          <Link href="/docs/quickstart/first-call" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <Send className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Make Your First Call</h3>
            </div>
            <p className="text-gray-600 text-sm">Quick start guide to making your first API request.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 