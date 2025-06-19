import React from 'react';
import Link from 'next/link';
import { CheckCircle, X, Star, Zap, Brain, Eye, ArrowRight, Clock, DollarSign } from 'lucide-react';

export default function ModelComparisonPage() {
  const models = [
    {
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      pricing: '$10/1M',
      contextWindow: '128K',
      speed: 4,
      reasoning: 5,
      code: 5,
      creative: 5,
      vision: true,
      functionCalling: true,
      jsonMode: true,
      streaming: true,
      multimodal: false,
      strengths: ['Complex reasoning', 'Code generation', 'Creative writing'],
      weaknesses: ['Higher cost', 'Slower than GPT-3.5'],
      bestFor: 'Complex analysis, high-quality content creation'
    },
    {
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      pricing: '$15/1M',
      contextWindow: '200K',
      speed: 3,
      reasoning: 5,
      code: 5,
      creative: 5,
      vision: true,
      functionCalling: true,
      jsonMode: false,
      streaming: true,
      multimodal: true,
      strengths: ['Advanced reasoning', 'Safety', 'Long context'],
      weaknesses: ['Most expensive', 'Slower responses'],
      bestFor: 'Complex research, code analysis, safety-critical applications'
    },
    {
      name: 'Gemini 1.5 Pro',
      provider: 'Google',
      pricing: '$3.50/1M',
      contextWindow: '1M',
      speed: 4,
      reasoning: 4,
      code: 4,
      creative: 4,
      vision: true,
      functionCalling: false,
      jsonMode: false,
      streaming: true,
      multimodal: true,
      strengths: ['Massive context', 'Multimodal', 'Math reasoning'],
      weaknesses: ['Limited function calling', 'Newer model'],
      bestFor: 'Long document analysis, multimodal tasks'
    },
    {
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      pricing: '$0.50/1M',
      contextWindow: '16K',
      speed: 5,
      reasoning: 3,
      code: 4,
      creative: 4,
      vision: false,
      functionCalling: true,
      jsonMode: true,
      streaming: true,
      multimodal: false,
      strengths: ['Very fast', 'Cost-effective', 'Reliable'],
      weaknesses: ['Limited reasoning', 'No vision'],
      bestFor: 'Simple tasks, high-volume applications, prototyping'
    },
    {
      name: 'Claude 3 Haiku',
      provider: 'Anthropic',
      pricing: '$0.25/1M',
      contextWindow: '200K',
      speed: 5,
      reasoning: 3,
      code: 3,
      creative: 3,
      vision: true,
      functionCalling: false,
      jsonMode: false,
      streaming: true,
      multimodal: true,
      strengths: ['Fastest', 'Cheapest', 'Good vision'],
      weaknesses: ['Limited reasoning', 'No function calling'],
      bestFor: 'Quick responses, cost-sensitive applications'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Comparison</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Compare capabilities, performance, and pricing across all supported AI models to choose the perfect fit for your use case.
        </p>
      </div>

      {/* Quick Comparison Grid */}
      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Quick Comparison</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Model</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Pricing</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Context</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Speed</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Reasoning</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Vision</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Functions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {models.map((model) => (
                <tr key={model.name} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{model.name}</p>
                      <p className="text-sm text-gray-600">{model.provider}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{model.pricing}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700">{model.contextWindow}</span>
                  </td>
                  <td className="py-4 px-4">
                    {renderStars(model.speed)}
                  </td>
                  <td className="py-4 px-4">
                    {renderStars(model.reasoning)}
                  </td>
                  <td className="py-4 px-4">
                    {model.vision ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400" />
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {model.functionCalling ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Capabilities */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Detailed Capabilities</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {models.map((model) => (
            <div key={model.name} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
                  <p className="text-gray-600">{model.provider}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{model.pricing}</p>
                  <p className="text-sm text-gray-600">{model.contextWindow} context</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Speed</p>
                  {renderStars(model.speed)}
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Reasoning</p>
                  {renderStars(model.reasoning)}
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Code</p>
                  {renderStars(model.code)}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    {model.vision ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400 mr-2" />
                    )}
                    <span className={model.vision ? 'text-gray-700' : 'text-gray-400'}>Vision</span>
                  </div>
                  
                  <div className="flex items-center">
                    {model.functionCalling ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400 mr-2" />
                    )}
                    <span className={model.functionCalling ? 'text-gray-700' : 'text-gray-400'}>Function Calling</span>
                  </div>
                  
                  <div className="flex items-center">
                    {model.jsonMode ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400 mr-2" />
                    )}
                    <span className={model.jsonMode ? 'text-gray-700' : 'text-gray-400'}>JSON Mode</span>
                  </div>
                  
                  <div className="flex items-center">
                    {model.multimodal ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400 mr-2" />
                    )}
                    <span className={model.multimodal ? 'text-gray-700' : 'text-gray-400'}>Multimodal</span>
                  </div>
                </div>
              </div>

              {/* Strengths & Best For */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.strengths.map((strength) => (
                      <span key={strength} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Best For</h4>
                  <p className="text-gray-600 text-sm">{model.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Performance Benchmarks</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              Speed (Tokens/Second)
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Claude 3 Haiku</span>
                <span className="font-medium">~120</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-3.5 Turbo</span>
                <span className="font-medium">~100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gemini 1.5 Pro</span>
                <span className="font-medium">~80</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-4 Turbo</span>
                <span className="font-medium">~60</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Claude 3 Opus</span>
                <span className="font-medium">~40</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-5 h-5 text-purple-600 mr-2" />
              Reasoning (MMLU Score)
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Claude 3 Opus</span>
                <span className="font-medium">86.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-4 Turbo</span>
                <span className="font-medium">86.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gemini 1.5 Pro</span>
                <span className="font-medium">81.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-3.5 Turbo</span>
                <span className="font-medium">70.0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Claude 3 Haiku</span>
                <span className="font-medium">75.2%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-2" />
              Cost per 1M Tokens
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Claude 3 Haiku</span>
                <span className="font-medium text-green-600">$0.25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-3.5 Turbo</span>
                <span className="font-medium text-green-600">$0.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gemini 1.5 Pro</span>
                <span className="font-medium text-yellow-600">$3.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">GPT-4 Turbo</span>
                <span className="font-medium text-orange-600">$10.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Claude 3 Opus</span>
                <span className="font-medium text-red-600">$15.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Recommendations */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Model Recommendations by Use Case</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">💼 Business Applications</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Customer Support:</strong> GPT-3.5 Turbo, Claude 3 Haiku</div>
              <div><strong>Content Generation:</strong> GPT-4 Turbo, Claude 3 Opus</div>
              <div><strong>Data Analysis:</strong> Claude 3 Sonnet, Gemini 1.5 Pro</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">🔬 Research & Analysis</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Academic Research:</strong> Claude 3 Opus, GPT-4 Turbo</div>
              <div><strong>Long Documents:</strong> Gemini 1.5 Pro, Claude 3 Sonnet</div>
              <div><strong>Mathematical Problems:</strong> Gemini 1.5 Pro, GPT-4 Turbo</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">💻 Development</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Code Generation:</strong> Claude 3 Sonnet, GPT-4 Turbo</div>
              <div><strong>Code Review:</strong> Claude 3 Opus, GPT-4 Turbo</div>
              <div><strong>Quick Debugging:</strong> GPT-3.5 Turbo, Claude 3 Haiku</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">🎨 Creative Work</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Creative Writing:</strong> Claude 3 Opus, GPT-4 Turbo</div>
              <div><strong>Brainstorming:</strong> GPT-4 Turbo, Claude 3 Sonnet</div>
              <div><strong>Social Media:</strong> GPT-3.5 Turbo, Claude 3 Haiku</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">⚡ High-Volume Tasks</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Batch Processing:</strong> GPT-3.5 Turbo, Claude 3 Haiku</div>
              <div><strong>Real-time Chat:</strong> Claude 3 Haiku, GPT-3.5 Turbo</div>
              <div><strong>API Integration:</strong> GPT-3.5 Turbo, Gemini Pro</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">🔍 Specialized Tasks</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Image Analysis:</strong> Claude 3 Opus, Gemini 1.5 Pro</div>
              <div><strong>Safety-Critical:</strong> Claude 3 Opus, Claude 3 Sonnet</div>
              <div><strong>Multilingual:</strong> Mixtral 8x7B, Gemini 1.5 Pro</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Choose Your Model?</h2>
        <p className="text-gray-600 mb-6">
          Use NeuroSwitch for automatic routing, or specify your preferred model for specialized use cases.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Try NeuroSwitch
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/models/capabilities" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            View Capabilities
          </Link>
        </div>
      </section>
    </div>
  );
} 