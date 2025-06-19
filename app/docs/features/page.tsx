import React from 'react';
import Link from 'next/link';
import { Zap, Archive, Wrench, ArrowRight, Eye, FileText, Search, MessageSquare, CheckCircle, Code, Clock, DollarSign, Shield } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Archive className="w-8 h-8" />,
      title: 'Prompt Caching',
      description: 'Intelligent caching system that stores and reuses responses to optimize performance and reduce costs',
      href: '/docs/features/caching',
      color: 'blue',
      benefits: ['Faster response times', 'Reduced API costs', 'Improved efficiency'],
      status: 'Available'
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Tool Calling',
      description: 'Extensible framework allowing AI models to interact with external systems and execute functions',
      href: '/docs/features/tools',
      color: 'purple',
      benefits: ['Extended capabilities', 'Real-time data access', 'Custom integrations'],
      status: 'Available'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Message Transforms',
      description: 'Advanced preprocessing and context management for optimized AI interactions',
      href: '/docs/features/transforms',
      color: 'green',
      benefits: ['Enhanced privacy', 'Better context', 'Cleaner interactions'],
      status: 'Available'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Streaming Support',
      description: 'Real-time token streaming for immediate response display and improved user experience',
      href: '/docs/features/streaming',
      color: 'yellow',
      benefits: ['Real-time responses', 'Better UX', 'Reduced latency'],
      status: 'Available'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Image & PDF Input',
      description: 'Multimodal capabilities supporting image analysis and document processing',
      href: '/docs/features/multimedia',
      color: 'pink',
      benefits: ['Multimodal AI', 'Visual analysis', 'Document understanding'],
      status: 'Available'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Web Search Integration',
      description: 'Real-time web search capabilities providing AI models with current information',
      href: '/docs/features/web-search',
      color: 'indigo',
      benefits: ['Current information', 'Expanded knowledge', 'Real-time data'],
      status: 'Available'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200 hover:border-blue-300',
      purple: 'text-purple-600 bg-purple-50 border-purple-200 hover:border-purple-300',
      green: 'text-green-600 bg-green-50 border-green-200 hover:border-green-300',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200 hover:border-yellow-300',
      pink: 'text-pink-600 bg-pink-50 border-pink-200 hover:border-pink-300',
      indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:border-indigo-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fusion AI provides advanced capabilities that enhance AI interactions, improve performance, 
          and extend functionality beyond traditional language models.
        </p>
      </div>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className={`block p-6 rounded-lg border transition-all hover:shadow-lg group ${getColorClasses(feature.color)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(feature.color).split(' ')[1]}`}>
                {React.cloneElement(feature.icon, { className: `w-6 h-6 ${getColorClasses(feature.color).split(' ')[0]}` })}
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {feature.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
            
            <div className="space-y-2 mb-4">
              {feature.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
            
            <div className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Learn more
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </section>

      {/* Performance Benefits */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Performance Benefits</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Faster Responses</h3>
            <p className="text-gray-600 text-sm">
              Caching and streaming combine to deliver responses up to 10x faster for repeated queries.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Cost Optimization</h3>
            <p className="text-gray-600 text-sm">
              Intelligent caching and efficient context management reduce API costs by 30-50%.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enhanced Security</h3>
            <p className="text-gray-600 text-sm">
              Message transforms and sanitization protect sensitive data while maintaining functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Feature Integration Examples</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 Research Assistant Workflow</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Web Search</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Tool Calling</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Streaming</span>
            </div>
            <p className="text-gray-600 text-sm">
              User asks about recent developments → Web search tool gathers current information → 
              Streaming displays results in real-time → Tools synthesize and format final report.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Document Analysis Pipeline</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">PDF Input</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Message Transforms</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Caching</span>
            </div>
            <p className="text-gray-600 text-sm">
              PDF uploaded and processed → Content extracted and sanitized → Analysis results cached → 
              Subsequent questions about the same document use cached context for instant responses.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🛠️ Development Assistant</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Code Tools</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Streaming</span>
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Image Analysis</span>
            </div>
            <p className="text-gray-600 text-sm">
              Developer uploads screenshot of error → Visual analysis identifies issue → 
              Code generation tools create fix → Streaming shows solution being built in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Available Tools Preview */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Built-in Tools Library</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'File Creator', desc: 'Generate and save files' },
            { name: 'Code Interpreter', desc: 'Execute Python code safely' },
            { name: 'Web Scraper', desc: 'Extract web page content' },
            { name: 'Browser Tool', desc: 'Automate web interactions' },
            { name: 'Package Manager', desc: 'Install Python packages' },
            { name: 'Screenshot Tool', desc: 'Capture screen images' },
            { name: 'Linting Tool', desc: 'Check code quality' },
            { name: 'DuckDuckGo Search', desc: 'Search the web' }
          ].map((tool) => (
            <div key={tool.name} className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-1">{tool.name}</h4>
              <p className="text-gray-600 text-xs">{tool.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            href="/docs/features/tools" 
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Explore All Tools
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Code Example */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Start Example</h2>
        
        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            <code>{`// Enable streaming with tool calling and caching
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    message: "Search for recent AI news and create a summary",
    model: "NeuroSwitch",
    stream: true,
    enable_tools: true,
    use_cache: true,
    image: base64ImageData // Optional: include image
  })
});

// Handle streaming response
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      console.log('Token:', data.token);
      console.log('Tool used:', data.tool_name);
    }
  }
}`}</code>
          </pre>
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            href="/docs/quickstart" 
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View complete quickstart guide →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore These Features?</h2>
        <p className="text-gray-600 mb-6">
          Start using Fusion AI's powerful features today. Each capability is designed to work together 
          seamlessly for the best AI experience.
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
            href="/docs/api" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            API Reference
          </Link>
        </div>
      </section>
    </div>
  );
} 