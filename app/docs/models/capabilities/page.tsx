import React from 'react';
import Link from 'next/link';
import { Eye, Code, Zap, MessageSquare, FileText, Image, Music, Video, CheckCircle, X, ArrowRight, Brain } from 'lucide-react';

export default function ModelCapabilitiesPage() {
  const capabilities = [
    {
      category: 'Text Generation',
      icon: <FileText className="w-6 h-6" />,
      description: 'Generate high-quality text content for various purposes',
      models: {
        'GPT-4 Turbo': { supported: true, quality: 5, notes: 'Excellent for complex writing tasks' },
        'Claude 3 Opus': { supported: true, quality: 5, notes: 'Superior for creative and analytical writing' },
        'Claude 3 Sonnet': { supported: true, quality: 4, notes: 'Balanced performance for most text tasks' },
        'Claude 3 Haiku': { supported: true, quality: 3, notes: 'Good for simple text generation' },
        'Gemini 1.5 Pro': { supported: true, quality: 4, notes: 'Strong multilingual text generation' },
        'GPT-3.5 Turbo': { supported: true, quality: 4, notes: 'Fast and reliable for most text tasks' }
      }
    },
    {
      category: 'Code Generation',
      icon: <Code className="w-6 h-6" />,
      description: 'Write, debug, and explain code in multiple programming languages',
      models: {
        'GPT-4 Turbo': { supported: true, quality: 5, notes: 'Excellent across all programming languages' },
        'Claude 3 Opus': { supported: true, quality: 5, notes: 'Superior code analysis and generation' },
        'Claude 3 Sonnet': { supported: true, quality: 5, notes: 'Optimized for code tasks' },
        'Claude 3 Haiku': { supported: true, quality: 3, notes: 'Basic code assistance' },
        'Gemini 1.5 Pro': { supported: true, quality: 4, notes: 'Strong in Python and JavaScript' },
        'GPT-3.5 Turbo': { supported: true, quality: 4, notes: 'Good for common programming tasks' }
      }
    },
    {
      category: 'Vision & Image Analysis',
      icon: <Eye className="w-6 h-6" />,
      description: 'Analyze, describe, and understand images and visual content',
      models: {
        'GPT-4 Turbo': { supported: true, quality: 4, notes: 'Good image understanding and OCR' },
        'Claude 3 Opus': { supported: true, quality: 5, notes: 'Excellent detailed image analysis' },
        'Claude 3 Sonnet': { supported: true, quality: 4, notes: 'Solid image understanding' },
        'Claude 3 Haiku': { supported: true, quality: 3, notes: 'Basic image description' },
        'Gemini 1.5 Pro': { supported: true, quality: 4, notes: 'Strong multimodal understanding' },
        'GPT-3.5 Turbo': { supported: false, quality: 0, notes: 'No vision capabilities' }
      }
    },
    {
      category: 'Function Calling',
      icon: <Zap className="w-6 h-6" />,
      description: 'Call external functions and APIs with structured parameters',
      models: {
        'GPT-4 Turbo': { supported: true, quality: 5, notes: 'Excellent function calling with complex parameters' },
        'Claude 3 Opus': { supported: true, quality: 4, notes: 'Good function calling capabilities' },
        'Claude 3 Sonnet': { supported: true, quality: 4, notes: 'Reliable function calling' },
        'Claude 3 Haiku': { supported: false, quality: 0, notes: 'No function calling support' },
        'Gemini 1.5 Pro': { supported: false, quality: 0, notes: 'Limited function calling' },
        'GPT-3.5 Turbo': { supported: true, quality: 4, notes: 'Good function calling for simple tasks' }
      }
    },
    {
      category: 'Reasoning & Analysis',
      icon: <Brain className="w-6 h-6" />,
      description: 'Complex logical reasoning, problem-solving, and analytical thinking',
      models: {
        'GPT-4 Turbo': { supported: true, quality: 5, notes: 'Excellent complex reasoning' },
        'Claude 3 Opus': { supported: true, quality: 5, notes: 'Superior analytical capabilities' },
        'Claude 3 Sonnet': { supported: true, quality: 4, notes: 'Strong reasoning for most tasks' },
        'Claude 3 Haiku': { supported: true, quality: 3, notes: 'Basic reasoning capabilities' },
        'Gemini 1.5 Pro': { supported: true, quality: 4, notes: 'Strong mathematical reasoning' },
        'GPT-3.5 Turbo': { supported: true, quality: 3, notes: 'Good for simple reasoning tasks' }
      }
    },
    {
      category: 'Conversational AI',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Natural, engaging conversations with context awareness',
      models: {
        'GPT-4 Turbo': { supported: true, quality: 5, notes: 'Excellent conversational abilities' },
        'Claude 3 Opus': { supported: true, quality: 5, notes: 'Natural and thoughtful conversations' },
        'Claude 3 Sonnet': { supported: true, quality: 4, notes: 'Good conversational flow' },
        'Claude 3 Haiku': { supported: true, quality: 4, notes: 'Fast, responsive conversations' },
        'Gemini 1.5 Pro': { supported: true, quality: 4, notes: 'Good conversation with long context' },
        'GPT-3.5 Turbo': { supported: true, quality: 4, notes: 'Reliable conversational partner' }
      }
    }
  ];

  const specialFeatures = [
    {
      feature: 'JSON Mode',
      description: 'Force structured JSON output for API responses',
      supportedModels: ['GPT-4 Turbo', 'GPT-3.5 Turbo'],
      details: 'Ensures valid JSON output format, perfect for API integrations and structured data extraction.'
    },
    {
      feature: 'Streaming',
      description: 'Real-time token streaming for faster user experience',
      supportedModels: ['GPT-4 Turbo', 'Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku', 'Gemini 1.5 Pro', 'GPT-3.5 Turbo'],
      details: 'All models support streaming responses for improved perceived performance in chat applications.'
    },
    {
      feature: 'Large Context Windows',
      description: 'Handle very long inputs and maintain context',
      supportedModels: ['Gemini 1.5 Pro (1M tokens)', 'Claude 3 Opus (200K)', 'Claude 3 Sonnet (200K)', 'Claude 3 Haiku (200K)', 'GPT-4 Turbo (128K)'],
      details: 'Process entire documents, codebases, or long conversations without losing context.'
    },
    {
      feature: 'Multimodal Input',
      description: 'Process multiple types of media in a single request',
      supportedModels: ['Gemini 1.5 Pro', 'Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku'],
      details: 'Combine text, images, and other media types for rich, contextual understanding.'
    }
  ];

  const renderQualityStars = (quality: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full mr-1 ${
              i < quality ? 'bg-yellow-400' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Capabilities</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Detailed breakdown of what each AI model can do. Understand strengths, limitations, and the best use cases for every capability.
        </p>
      </div>

      {/* Capabilities Grid */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Core Capabilities</h2>
        
        {capabilities.map((capability) => (
          <div key={capability.category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="text-purple-600 mr-3">
                  {capability.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{capability.category}</h3>
                  <p className="text-gray-600 text-sm">{capability.description}</p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Model</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Supported</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Quality</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Object.entries(capability.models).map(([modelName, modelData]) => (
                    <tr key={modelName} className="hover:bg-gray-50">
                      <td className="py-3 px-6">
                        <span className="font-medium text-gray-900">{modelName}</span>
                      </td>
                      <td className="py-3 px-4">
                        {modelData.supported ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {modelData.quality > 0 ? (
                          renderQualityStars(modelData.quality)
                        ) : (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600 text-sm">{modelData.notes}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      {/* Special Features */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Special Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {specialFeatures.map((feature) => (
            <div key={feature.feature} className="bg-white rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.feature}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Supported Models:</h4>
                <div className="flex flex-wrap gap-2">
                  {feature.supportedModels.map((model) => (
                    <span key={model} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      {model}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm">{feature.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Context Window Comparison */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Context Window Comparison</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div>
              <h3 className="font-semibold text-gray-900">Gemini 1.5 Pro</h3>
              <p className="text-gray-600 text-sm">Up to 1 million tokens (~750,000 words)</p>
            </div>
            <div className="text-right">
              <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500"></div>
              </div>
              <span className="text-sm text-gray-600 mt-1">1M tokens</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div>
              <h3 className="font-semibold text-gray-900">Claude 3 Models</h3>
              <p className="text-gray-600 text-sm">Up to 200,000 tokens (~150,000 words)</p>
            </div>
            <div className="text-right">
              <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/5 h-full bg-purple-500"></div>
              </div>
              <span className="text-sm text-gray-600 mt-1">200K tokens</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <h3 className="font-semibold text-gray-900">GPT-4 Turbo</h3>
              <p className="text-gray-600 text-sm">Up to 128,000 tokens (~96,000 words)</p>
            </div>
            <div className="text-right">
              <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/8 h-full bg-blue-500"></div>
              </div>
              <span className="text-sm text-gray-600 mt-1">128K tokens</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">GPT-3.5 Turbo</h3>
              <p className="text-gray-600 text-sm">Up to 16,000 tokens (~12,000 words)</p>
            </div>
            <div className="text-right">
              <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/32 h-full bg-gray-500"></div>
              </div>
              <span className="text-sm text-gray-600 mt-1">16K tokens</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-gray-900 mb-2">What does this mean?</h4>
          <p className="text-gray-600 text-sm">
            Context window determines how much text the model can process at once. Larger context windows allow for:
            processing entire documents, maintaining longer conversations, analyzing large codebases, and handling complex multi-step tasks.
          </p>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Capability Best Practices</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <Code className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Code Generation</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Be specific about language and requirements</li>
              <li>• Include context about the project structure</li>
              <li>• Ask for explanations of complex logic</li>
              <li>• Request error handling and edge cases</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <Eye className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Vision Tasks</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Use high-quality, clear images</li>
              <li>• Be specific about what to analyze</li>
              <li>• Consider image resolution and format</li>
              <li>• Combine with text for better context</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <Zap className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Function Calling</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Define clear function schemas</li>
              <li>• Include parameter descriptions</li>
              <li>• Handle errors gracefully</li>
              <li>• Validate function outputs</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <Brain className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Complex Reasoning</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Break down complex problems</li>
              <li>• Ask for step-by-step solutions</li>
              <li>• Provide relevant context and constraints</li>
              <li>• Request explanations of reasoning</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <FileText className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Long Context</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Structure long inputs clearly</li>
              <li>• Use headers and sections</li>
              <li>• Be specific about what to focus on</li>
              <li>• Consider chunking very large texts</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <MessageSquare className="w-8 h-8 text-pink-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Conversations</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Maintain consistent context</li>
              <li>• Set clear expectations upfront</li>
              <li>• Use system messages effectively</li>
              <li>• Handle conversation turns naturally</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore These Capabilities?</h2>
        <p className="text-gray-600 mb-6">
          Start using these powerful AI capabilities through our unified API. NeuroSwitch will route to the best model for each task.
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
            href="/docs/models/comparison" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Compare Models
          </Link>
        </div>
      </section>
    </div>
  );
} 