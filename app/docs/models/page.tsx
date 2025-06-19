import React from 'react';
import Link from 'next/link';
import { Brain, Zap, Eye, Code, MessageSquare, ArrowRight, CheckCircle, Star, DollarSign } from 'lucide-react';

export default function SupportedModelsPage() {
  const models = [
    {
      provider: 'OpenAI',
      models: [
        {
          name: 'GPT-4 Turbo',
          id: 'gpt-4-turbo-preview',
          description: 'Most capable GPT-4 model with improved performance and lower cost',
          capabilities: ['Text', 'Function Calling', 'JSON Mode'],
          contextWindow: '128K tokens',
          pricing: '$10 / 1M input tokens',
          strengths: ['Complex reasoning', 'Code generation', 'Creative writing'],
          featured: true
        },
        {
          name: 'GPT-4',
          id: 'gpt-4',
          description: 'High-intelligence flagship model for complex, multi-step tasks',
          capabilities: ['Text', 'Function Calling'],
          contextWindow: '8K tokens',
          pricing: '$30 / 1M input tokens',
          strengths: ['Complex reasoning', 'Factual accuracy', 'Problem solving']
        },
        {
          name: 'GPT-3.5 Turbo',
          id: 'gpt-3.5-turbo',
          description: 'Fast, inexpensive model for simple tasks',
          capabilities: ['Text', 'Function Calling', 'JSON Mode'],
          contextWindow: '16K tokens',
          pricing: '$0.50 / 1M input tokens',
          strengths: ['Speed', 'Cost-effective', 'General purpose']
        }
      ]
    },
    {
      provider: 'Anthropic',
      models: [
        {
          name: 'Claude 3 Opus',
          id: 'claude-3-opus-20240229',
          description: 'Most powerful model for highly complex tasks',
          capabilities: ['Text', 'Vision', 'Function Calling'],
          contextWindow: '200K tokens',
          pricing: '$15 / 1M input tokens',
          strengths: ['Advanced reasoning', 'Creative writing', 'Code analysis'],
          featured: true
        },
        {
          name: 'Claude 3 Sonnet',
          id: 'claude-3-sonnet-20240229',
          description: 'Balanced performance and speed for scaled deployments',
          capabilities: ['Text', 'Vision', 'Function Calling'],
          contextWindow: '200K tokens',
          pricing: '$3 / 1M input tokens',
          strengths: ['Code generation', 'Data analysis', 'Balanced performance']
        },
        {
          name: 'Claude 3 Haiku',
          id: 'claude-3-haiku-20240307',
          description: 'Fastest model for near-instant responsiveness',
          capabilities: ['Text', 'Vision'],
          contextWindow: '200K tokens',
          pricing: '$0.25 / 1M input tokens',
          strengths: ['Speed', 'Cost-effective', 'Quick responses']
        }
      ]
    },
    {
      provider: 'Google',
      models: [
        {
          name: 'Gemini 1.5 Pro',
          id: 'gemini-1.5-pro',
          description: 'Mid-size multimodal model that supports up to 1 million tokens',
          capabilities: ['Text', 'Vision', 'Audio', 'Code'],
          contextWindow: '1M tokens',
          pricing: '$3.50 / 1M input tokens',
          strengths: ['Long context', 'Multimodal', 'Mathematical reasoning'],
          featured: true
        },
        {
          name: 'Gemini Pro',
          id: 'gemini-pro',
          description: 'Best model for scaling across a wide range of tasks',
          capabilities: ['Text', 'Function Calling'],
          contextWindow: '30K tokens',
          pricing: '$0.50 / 1M input tokens',
          strengths: ['Versatile', 'Cost-effective', 'General purpose']
        }
      ]
    },
    {
      provider: 'Meta',
      models: [
        {
          name: 'Llama 2 70B',
          id: 'meta-llama/llama-2-70b-chat',
          description: 'Open-source large language model fine-tuned for chat',
          capabilities: ['Text', 'Code'],
          contextWindow: '4K tokens',
          pricing: '$0.70 / 1M input tokens',
          strengths: ['Open source', 'Code generation', 'Cost-effective']
        }
      ]
    },
    {
      provider: 'Mistral AI',
      models: [
        {
          name: 'Mixtral 8x7B',
          id: 'mistralai/mixtral-8x7b-instruct',
          description: 'High-quality sparse mixture of experts model',
          capabilities: ['Text', 'Code', 'Multilingual'],
          contextWindow: '32K tokens',
          pricing: '$0.27 / 1M input tokens',
          strengths: ['Multilingual', 'Code generation', 'Efficient']
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Supported Models</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access the best AI models from leading providers through a single unified API. Choose the perfect model for your use case.
        </p>
      </div>

      {/* Quick Stats */}
      <section className="grid md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
          <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">15+ Models</h3>
          <p className="text-sm text-gray-600">Latest AI models available</p>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <Zap className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Auto-Routing</h3>
          <p className="text-sm text-gray-600">Intelligent model selection</p>
        </div>
        
        <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
          <Eye className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Unified API</h3>
          <p className="text-sm text-gray-600">One interface for all models</p>
        </div>
        
        <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
          <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Best Pricing</h3>
          <p className="text-sm text-gray-600">Competitive rates across providers</p>
        </div>
      </section>

      {/* Featured Models */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Models</h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {models.flatMap(provider => 
            provider.models.filter(model => model.featured).map(model => (
              <div key={model.id} className="bg-white rounded-lg p-6 border border-gray-200 relative">
                <div className="absolute top-4 right-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{model.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {models.find(p => p.models.includes(model))?.provider}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {model.capabilities.map(cap => (
                      <span key={cap} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {cap}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Context: <span className="font-medium">{model.contextWindow}</span></div>
                    <div>Pricing: <span className="font-medium">{model.pricing}</span></div>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500 mb-2">Best for:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-gray-600">{model.strengths.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* All Models by Provider */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">All Supported Models</h2>
        
        {models.map(provider => (
          <div key={provider.provider} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{provider.provider}</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {provider.models.map(model => (
                <div key={model.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        {model.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{model.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {model.capabilities.map(cap => (
                          <span key={cap} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {cap}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>Context: <strong>{model.contextWindow}</strong></span>
                        <span>Pricing: <strong>{model.pricing}</strong></span>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="text-sm text-gray-500 mb-2">Best for:</div>
                      <div className="space-y-1">
                        {model.strengths.map(strength => (
                          <div key={strength} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {strength}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Model Selection Guide */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Choose the Right Model</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <Code className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">For Code Generation</h3>
            <p className="text-gray-600 text-sm mb-3">Complex programming tasks, debugging, and code analysis</p>
            <div className="space-y-1 text-sm">
              <div className="font-medium text-purple-700">Recommended:</div>
              <div className="text-gray-600">• Claude 3 Sonnet</div>
              <div className="text-gray-600">• GPT-4 Turbo</div>
              <div className="text-gray-600">• Mixtral 8x7B</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <MessageSquare className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">For Conversational AI</h3>
            <p className="text-gray-600 text-sm mb-3">Chatbots, customer service, and interactive applications</p>
            <div className="space-y-1 text-sm">
              <div className="font-medium text-purple-700">Recommended:</div>
              <div className="text-gray-600">• GPT-3.5 Turbo</div>
              <div className="text-gray-600">• Claude 3 Haiku</div>
              <div className="text-gray-600">• Gemini Pro</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <Brain className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">For Complex Reasoning</h3>
            <p className="text-gray-600 text-sm mb-3">Research, analysis, and multi-step problem solving</p>
            <div className="space-y-1 text-sm">
              <div className="font-medium text-purple-700">Recommended:</div>
              <div className="text-gray-600">• Claude 3 Opus</div>
              <div className="text-gray-600">• GPT-4 Turbo</div>
              <div className="text-gray-600">• Gemini 1.5 Pro</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/models/comparison" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Model Comparison</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Side-by-side comparison of capabilities, pricing, and performance</p>
          </Link>
          
          <Link 
            href="/docs/models/capabilities" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Model Capabilities</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Detailed breakdown of what each model can do</p>
          </Link>
          
          <Link 
            href="/docs/models/fusion-native" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Fusion-Native Models</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Custom models optimized specifically for Fusion AI</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Using These Models</h2>
        <p className="text-gray-600 mb-6">
          Try any of these models through our unified API. NeuroSwitch will automatically route to the best model for your needs.
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