import React from 'react';
import Link from 'next/link';
import { Settings, Hash, Type, CheckCircle, Copy, Info, AlertCircle, ArrowRight } from 'lucide-react';

export default function ParametersPage() {
  const coreParameters = [
    {
      name: 'prompt',
      type: 'string',
      required: true,
      description: 'The input text/message to send to the AI model',
      example: '"Explain quantum computing"',
      constraints: 'Max 100,000 characters'
    },
    {
      name: 'provider',
      type: 'string',
      required: false,
      description: 'AI provider to use for the request',
      example: '"neuroswitch", "openai", "claude"',
      constraints: 'Default: "neuroswitch"'
    },
    {
      name: 'max_tokens',
      type: 'integer',
      required: false,
      description: 'Maximum number of tokens in the response',
      example: '500, 1000, 4000',
      constraints: 'Min: 1, Max: varies by model'
    },
    {
      name: 'temperature',
      type: 'float',
      required: false,
      description: 'Controls randomness in the response',
      example: '0.0, 0.7, 1.0',
      constraints: 'Range: 0.0 to 2.0'
    },
    {
      name: 'stream',
      type: 'boolean',
      required: false,
      description: 'Enable streaming response',
      example: 'true, false',
      constraints: 'Default: false'
    }
  ];

  const advancedParameters = [
    {
      name: 'top_p',
      type: 'float',
      required: false,
      description: 'Nucleus sampling parameter',
      example: '0.1, 0.9, 1.0',
      constraints: 'Range: 0.0 to 1.0'
    },
    {
      name: 'frequency_penalty',
      type: 'float',
      required: false,
      description: 'Penalty for frequent tokens',
      example: '0.0, 0.5, 2.0',
      constraints: 'Range: -2.0 to 2.0'
    },
    {
      name: 'presence_penalty',
      type: 'float',
      required: false,
      description: 'Penalty for new tokens',
      example: '0.0, 0.6, 2.0',
      constraints: 'Range: -2.0 to 2.0'
    },
    {
      name: 'stop',
      type: 'array',
      required: false,
      description: 'Sequences where API stops generating',
      example: '["\\n", "END", "###"]',
      constraints: 'Max 4 sequences'
    },
    {
      name: 'seed',
      type: 'integer',
      required: false,
      description: 'Random seed for reproducible results',
      example: '12345, 0, 999999',
      constraints: 'Any positive integer'
    }
  ];

  const fileParameters = [
    {
      name: 'files',
      type: 'array',
      required: false,
      description: 'Array of files to process (images, PDFs)',
      example: '[{"type": "image", "data": "base64..."}]',
      constraints: 'Max 10 files, 20MB each'
    },
    {
      name: 'files[].type',
      type: 'string',
      required: true,
      description: 'File type specification',
      example: '"image", "pdf", "text"',
      constraints: 'Supported formats only'
    },
    {
      name: 'files[].data',
      type: 'string',
      required: false,
      description: 'Base64 encoded file content',
      example: '"data:image/jpeg;base64,/9j/4AAQ..."',
      constraints: 'Base64 with data URI scheme'
    },
    {
      name: 'files[].url',
      type: 'string',
      required: false,
      description: 'URL to file (alternative to data)',
      example: '"https://example.com/image.jpg"',
      constraints: 'Publicly accessible URL'
    }
  ];

  const neuroswitchParameters = [
    {
      name: 'preferences',
      type: 'object',
      required: false,
      description: 'NeuroSwitch routing preferences',
      example: '{"priority": "quality", "domain_hint": "code"}',
      constraints: 'Custom routing hints'
    },
    {
      name: 'preferences.priority',
      type: 'string',
      required: false,
      description: 'Optimization priority',
      example: '"speed", "quality", "cost"',
      constraints: 'Default: "balanced"'
    },
    {
      name: 'preferences.domain_hint',
      type: 'string',
      required: false,
      description: 'Domain classification hint',
      example: '"code", "creative", "analysis"',
      constraints: 'Helps routing decisions'
    },
    {
      name: 'cache',
      type: 'boolean',
      required: false,
      description: 'Enable response caching',
      example: 'true, false',
      constraints: 'Default: true'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Parameters</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete reference for all API parameters, types, constraints, and usage examples. 
          Fine-tune your AI requests for optimal results.
        </p>
      </div>

      {/* Parameter Categories */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="#core" className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
          <Hash className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-blue-900 mb-2">Core Parameters</h3>
          <p className="text-blue-700 text-sm">Essential parameters for all requests</p>
        </Link>
        
        <Link href="#advanced" className="bg-purple-50 border border-purple-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
          <Settings className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-purple-900 mb-2">Advanced Options</h3>
          <p className="text-purple-700 text-sm">Fine-tuning and control parameters</p>
        </Link>
        
        <Link href="#files" className="bg-green-50 border border-green-200 rounded-lg p-6 hover:border-green-300 transition-colors">
          <Type className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-green-900 mb-2">File Parameters</h3>
          <p className="text-green-700 text-sm">Image and document processing</p>
        </Link>
        
        <Link href="#neuroswitch" className="bg-orange-50 border border-orange-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
          <Settings className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-orange-900 mb-2">NeuroSwitch</h3>
          <p className="text-orange-700 text-sm">Intelligent routing options</p>
        </Link>
      </section>

      {/* Core Parameters */}
      <section id="core" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Parameters</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Parameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Required</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Example</th>
              </tr>
            </thead>
            <tbody>
              {coreParameters.map((param, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      param.type === 'string' ? 'bg-blue-100 text-blue-800' :
                      param.type === 'integer' ? 'bg-green-100 text-green-800' :
                      param.type === 'float' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {param.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {param.required ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{param.description}</td>
                  <td className="py-3 px-4">
                    <code className="text-xs text-gray-600">{param.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Example Request */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Request</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Request</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "prompt": "Explain machine learning",
  "provider": "neuroswitch",
  "max_tokens": 500,
  "temperature": 0.7
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Request</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "prompt": "Write a creative story",
  "provider": "neuroswitch",
  "max_tokens": 1000,
  "temperature": 0.9,
  "top_p": 0.95,
  "frequency_penalty": 0.5,
  "stop": ["THE END"],
  "preferences": {
    "priority": "quality",
    "domain_hint": "creative"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Parameters */}
      <section id="advanced" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Parameters</h2>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Parameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Constraints</th>
              </tr>
            </thead>
            <tbody>
              {advancedParameters.map((param, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      param.type === 'string' ? 'bg-blue-100 text-blue-800' :
                      param.type === 'integer' ? 'bg-green-100 text-green-800' :
                      param.type === 'float' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {param.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{param.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{param.constraints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Parameter Interaction</h3>
              <p className="text-blue-800 text-sm">
                Temperature and top_p both control randomness. Use one or the other, not both. 
                Higher values increase creativity but may reduce coherence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* File Parameters */}
      <section id="files" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">File Upload Parameters</h2>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Parameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Constraints</th>
              </tr>
            </thead>
            <tbody>
              {fileParameters.map((param, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      param.type === 'string' ? 'bg-blue-100 text-blue-800' :
                      param.type === 'array' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {param.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{param.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{param.constraints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">File Upload Example</h3>
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
              <Copy className="w-4 h-4" />
            </button>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "prompt": "Analyze this chart and summarize the trends",
  "provider": "neuroswitch",
  "files": [
    {
      "type": "image",
      "data": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
      "filename": "sales_chart.jpg"
    }
  ],
  "max_tokens": 1000
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* NeuroSwitch Parameters */}
      <section id="neuroswitch" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">NeuroSwitch Parameters</h2>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Parameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Example</th>
              </tr>
            </thead>
            <tbody>
              {neuroswitchParameters.map((param, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      param.type === 'string' ? 'bg-blue-100 text-blue-800' :
                      param.type === 'object' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {param.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{param.description}</td>
                  <td className="py-3 px-4">
                    <code className="text-xs text-gray-600">{param.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-orange-900 mb-2">NeuroSwitch Optimization</h3>
              <p className="text-orange-800 text-sm">
                NeuroSwitch analyzes your prompt and automatically selects the best model. 
                Use preferences to guide routing decisions for specialized use cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parameter Validation */}
      <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
          Parameter Validation
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Common Validation Errors</h3>
            <div className="space-y-2">
              <div className="bg-white rounded p-3 border border-yellow-200">
                <h4 className="font-medium text-gray-900 text-sm">400: Missing Required Parameter</h4>
                <p className="text-gray-600 text-xs">The 'prompt' parameter is required for all requests</p>
              </div>
              <div className="bg-white rounded p-3 border border-yellow-200">
                <h4 className="font-medium text-gray-900 text-sm">422: Invalid Parameter Value</h4>
                <p className="text-gray-600 text-xs">Parameter value is outside acceptable range</p>
              </div>
              <div className="bg-white rounded p-3 border border-yellow-200">
                <h4 className="font-medium text-gray-900 text-sm">413: Request Too Large</h4>
                <p className="text-gray-600 text-xs">Prompt or files exceed maximum size limits</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Validation Tips</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Validate parameter types before sending</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Check constraints for numeric parameters</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Use JSON schema validation in your code</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">Test with edge cases and boundary values</span>
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
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Learn how to authenticate your API requests</p>
          </Link>
          
          <Link 
            href="/docs/api/errors" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Error Handling</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Handle validation errors and edge cases</p>
          </Link>
          
          <Link 
            href="/docs/features/streaming" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Streaming</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Real-time response streaming</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 