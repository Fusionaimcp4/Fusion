import React from 'react';
import Link from 'next/link';
import { Wrench, Code, Globe, FileText, Image, Settings, CheckCircle, ArrowRight, Zap, Shield, Cog, Terminal } from 'lucide-react';

export default function ToolCallingPage() {
  const builtInTools = [
    {
      name: 'File Creator',
      id: 'filecreatortool',
      description: 'Generate and save files with AI-generated content',
      icon: <FileText className="w-6 h-6" />,
      capabilities: ['Create text files', 'Generate code files', 'Save content to disk'],
      example: 'Create a Python script for data analysis',
      status: 'Available'
    },
    {
      name: 'Code Interpreter',
      id: 'e2bcodetool',
      description: 'Execute Python code in a secure sandboxed environment',
      icon: <Terminal className="w-6 h-6" />,
      capabilities: ['Run Python code', 'Install packages', 'Generate plots', 'Data analysis'],
      example: 'Execute data visualization scripts',
      status: 'Available'
    },
    {
      name: 'Web Scraper',
      id: 'webscrapertool',
      description: 'Extract and clean content from web pages',
      icon: <Globe className="w-6 h-6" />,
      capabilities: ['Extract text content', 'Parse HTML', 'Clean formatting'],
      example: 'Scrape article content for analysis',
      status: 'Available'
    },
    {
      name: 'Browser Tool',
      id: 'browsertool',
      description: 'Automate web browser interactions and navigation',
      icon: <Globe className="w-6 h-6" />,
      capabilities: ['Navigate websites', 'Fill forms', 'Click elements'],
      example: 'Automate web form submissions',
      status: 'Available'
    },
    {
      name: 'Screenshot Tool',
      id: 'screenshottool',
      description: 'Capture screenshots for visual analysis',
      icon: <Image className="w-6 h-6" />,
      capabilities: ['Capture screen', 'Save images', 'Visual documentation'],
      example: 'Document UI for bug reports',
      status: 'Available'
    },
    {
      name: 'DuckDuckGo Search',
      id: 'duckduckgotool',
      description: 'Search the web for current information',
      icon: <Globe className="w-6 h-6" />,
      capabilities: ['Web search', 'Current information', 'Real-time data'],
      example: 'Find latest news on specific topics',
      status: 'Available'
    },
    {
      name: 'Package Manager',
      id: 'uvpackagemanager',
      description: 'Install and manage Python packages dynamically',
      icon: <Settings className="w-6 h-6" />,
      capabilities: ['Install packages', 'Manage dependencies', 'Environment setup'],
      example: 'Install required libraries for analysis',
      status: 'Available'
    },
    {
      name: 'Linting Tool',
      id: 'lintingtool',
      description: 'Check code quality and style compliance',
      icon: <Code className="w-6 h-6" />,
      capabilities: ['Code analysis', 'Style checking', 'Error detection'],
      example: 'Validate Python code quality',
      status: 'Available'
    }
  ];

  const toolArchitecture = [
    {
      step: '1',
      title: 'Tool Request',
      description: 'AI model identifies need for external functionality',
      details: 'LLM analyzes the user request and determines which tool is needed'
    },
    {
      step: '2',
      title: 'Parameter Extraction',
      description: 'Model specifies tool name and required parameters',
      details: 'AI formats the tool call with proper input parameters'
    },
    {
      step: '3',
      title: 'Tool Execution',
      description: 'Fusion backend validates and executes the tool',
      details: 'System runs the tool with provided parameters in secure environment'
    },
    {
      step: '4',
      title: 'Result Integration',
      description: 'Tool output is returned to the model for final response',
      details: 'AI incorporates tool results into comprehensive user response'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tool Calling Framework</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Extend AI capabilities beyond text generation with a powerful, extensible tool system 
          that enables real-world interactions and complex task execution.
        </p>
      </div>

      {/* Key Benefits */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Extended Capabilities</h3>
          <p className="text-gray-600 text-sm">
            Enable AI models to perform actions beyond text generation - file creation, code execution, web interactions, and more.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Secure Execution</h3>
          <p className="text-gray-600 text-sm">
            All tools run in controlled environments with proper validation and security measures to ensure safe operation.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Cog className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Fully Extensible</h3>
          <p className="text-gray-600 text-sm">
            Build custom tools for your specific needs using our standardized framework and integration patterns.
          </p>
        </div>
      </section>

      {/* How Tool Calling Works */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Tool Calling Works</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolArchitecture.map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-purple-600">{step.step}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{step.description}</p>
              <p className="text-gray-500 text-xs">{step.details}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-3">Example Tool Call Flow</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>User:</strong> "Create a Python script that analyzes this CSV data"</p>
            <p><strong>AI:</strong> Identifies need for file creation and code generation</p>
            <p><strong>Tool Call:</strong> <code className="bg-gray-200 px-1 rounded">filecreatortool</code> with Python code content</p>
            <p><strong>Result:</strong> File created successfully with data analysis script</p>
            <p><strong>Response:</strong> "I've created a Python script for your CSV analysis..."</p>
          </div>
        </div>
      </section>

      {/* Built-in Tools */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Built-in Tools Library</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {builtInTools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    {React.cloneElement(tool.icon, { className: 'w-5 h-5 text-purple-600' })}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                    <code className="text-xs text-gray-500">{tool.id}</code>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {tool.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Capabilities</h4>
                <div className="space-y-1">
                  {tool.capabilities.map((capability) => (
                    <div key={capability} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {capability}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-1">Example Use Case</h4>
                <p className="text-gray-600 text-sm">{tool.example}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Implementation Example</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Request with Tools</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    message: "Create a Python script to analyze sales data",
    model: "claude",
    enable_tools: true,
    tools: [
      "filecreatortool",
      "e2bcodetool"
    ]
  })
});`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Call Response</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`{
  "response": "I'll create a Python script for sales analysis...",
  "tool_calls": [
    {
      "tool_name": "filecreatortool",
      "parameters": {
        "filename": "sales_analysis.py",
        "content": "import pandas as pd\\n..."
      },
      "result": "File created successfully"
    }
  ],
  "model": "claude"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Tools */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Building Custom Tools</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Structure</h3>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  Inherit from <code className="bg-gray-100 px-1 rounded">BaseTool</code> class
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  Define tool name and description
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  Specify input parameters schema
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  Implement execution logic
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  Handle errors and validation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  Return structured results
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Practices</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-medium text-gray-900 mb-2">🔒 Security</h4>
                <p className="text-gray-600 text-sm">
                  Always validate inputs, use secure execution environments, and limit access to sensitive resources.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-medium text-gray-900 mb-2">⚡ Performance</h4>
                <p className="text-gray-600 text-sm">
                  Keep tools lightweight, implement timeouts, and provide clear error messages for better UX.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-medium text-gray-900 mb-2">📖 Documentation</h4>
                <p className="text-gray-600 text-sm">
                  Document parameters clearly, provide usage examples, and specify expected output formats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Features</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/features/streaming" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Streaming Support</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">See tool execution results in real-time with streaming responses</p>
          </Link>
          
          <Link 
            href="/docs/features/web-search" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Web Search Integration</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Access real-time information through integrated search tools</p>
          </Link>
          
          <Link 
            href="/docs/features/multimedia" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Image & PDF Input</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Process visual content with specialized analysis tools</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Using Tools Today</h2>
        <p className="text-gray-600 mb-6">
          Enable powerful tool calling in your AI applications with just a single parameter. 
          Extend capabilities beyond text generation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/api/endpoints" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            API Documentation
          </Link>
        </div>
      </section>
    </div>
  );
} 