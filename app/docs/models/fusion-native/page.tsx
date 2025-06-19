import React from 'react';
import Link from 'next/link';
import { Brain, Zap, Shield, Target, Layers, ArrowRight, CheckCircle, Star, Clock, TrendingUp, Cpu, Network } from 'lucide-react';

export default function FusionNativeModelsPage() {
  const fusionModels = [
    {
      name: 'NeuroSwitch™ Mix',
      id: 'neuroswitch/mix',
      status: 'available',
      description: 'Intelligent meta-model that dynamically routes to the optimal AI provider based on request analysis',
      type: 'Smart Routing Engine',
      contextWindow: 'Variable (up to 1M tokens)',
      pricing: 'Pay per use (varies by routed model)',
      capabilities: ['Dynamic Model Selection', 'Automatic Failover', 'Cost Optimization', 'Quality Maximization'],
      features: {
        routing: 'Advanced AI-powered prompt classification',
        fallback: 'Automatic provider failover with zero downtime',
        optimization: 'Real-time cost vs quality optimization',
        analytics: 'Detailed routing decision explanations'
      },
      useCases: ['General AI tasks', 'Production applications', 'Cost-sensitive workloads', 'High-availability systems'],
      badge: 'Recommended',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Fusion Classifier',
      id: 'fusion/classifier',
      status: 'available',
      description: 'Specialized model for prompt analysis and optimal model selection',
      type: 'Classification Engine',
      contextWindow: '32K tokens',
      pricing: 'Included with NeuroSwitch',
      capabilities: ['Intent Detection', 'Complexity Analysis', 'Provider Matching', 'Confidence Scoring'],
      features: {
        speed: 'Sub-100ms classification time',
        accuracy: '95%+ routing accuracy',
        privacy: 'On-premises classification (queries never leave server)',
        learning: 'Continuous improvement from routing outcomes'
      },
      useCases: ['Request routing', 'Model selection', 'Quality assurance', 'Performance optimization'],
      badge: 'Core Technology',
      badgeColor: 'bg-blue-100 text-blue-800'
    }
  ];

  const upcomingModels = [
    {
      name: 'Fusion Ensemble',
      description: 'Multi-model responses with consensus scoring and quality validation',
      expectedRelease: 'Q2 2024',
      features: ['Multiple model responses', 'Consensus scoring', 'Quality validation', 'Confidence intervals'],
      use_case: 'High-stakes decisions requiring maximum accuracy'
    },
    {
      name: 'Fusion Fine-tune',
      description: 'Custom model training on your data while maintaining privacy',
      expectedRelease: 'Q3 2024',
      features: ['Private training', 'Domain specialization', 'Performance optimization', 'Data retention control'],
      use_case: 'Enterprise-specific tasks and domain expertise'
    },
    {
      name: 'Fusion Vision+',
      description: 'Enhanced multimodal capabilities with document understanding',
      expectedRelease: 'Q4 2024',
      features: ['Advanced OCR', 'Document parsing', 'Chart understanding', 'Video analysis'],
      use_case: 'Complex document processing and multimedia analysis'
    }
  ];

  const neuroswitchFeatures = [
    {
      title: 'Intelligent Classification',
      description: 'Analyzes prompts in real-time to determine optimal model routing',
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      details: [
        'Intent detection (creative, analytical, code, etc.)',
        'Complexity assessment (simple vs. complex reasoning)',
        'Language and domain identification',
        'Output format requirements analysis'
      ]
    },
    {
      title: 'Automatic Failover',
      description: 'Seamlessly switches providers if primary model is unavailable',
      icon: <Shield className="w-8 h-8 text-green-600" />,
      details: [
        'Real-time provider health monitoring',
        'Instant failover to backup models',
        'Zero-downtime error handling',
        'Transparent error recovery'
      ]
    },
    {
      title: 'Cost Optimization',
      description: 'Balances quality requirements with cost efficiency',
      icon: <Target className="w-8 h-8 text-blue-600" />,
      details: [
        'Dynamic pricing awareness',
        'Quality vs. cost trade-off analysis',
        'Usage pattern optimization',
        'Budget-conscious routing decisions'
      ]
    },
    {
      title: 'Performance Analytics',
      description: 'Provides detailed insights into routing decisions and outcomes',
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      details: [
        'Response quality metrics',
        'Routing decision explanations',
        'Cost and performance tracking',
        'Continuous improvement feedback'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fusion-Native Models</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Proprietary AI models and routing technologies built exclusively for the Fusion AI platform. 
          Experience the next generation of intelligent AI orchestration.
        </p>
      </div>

      {/* NeuroSwitch Highlight */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">NeuroSwitch™ Technology</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our flagship intelligent routing system that acts as a meta-AI, analyzing your requests and automatically 
            selecting the best AI model for optimal results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neuroswitchFeatures.map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg p-6 border border-purple-200">
              <div className="flex flex-col items-center text-center mb-4">
                {feature.icon}
                <h3 className="font-semibold text-gray-900 mt-2">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-1">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-start text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/docs/overview/neuroswitch" 
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Learn How NeuroSwitch Works
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Available Fusion Models */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Available Fusion Models</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {fusionModels.map((model) => (
            <div key={model.name} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                  <p className="text-gray-600 text-sm">{model.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${model.badgeColor}`}>
                  {model.badge}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{model.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Context Window</p>
                  <p className="font-medium text-gray-900">{model.contextWindow}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Pricing</p>
                  <p className="font-medium text-gray-900">{model.pricing}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Core Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {model.capabilities.map((capability) => (
                    <span key={capability} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                <div className="space-y-2">
                  {Object.entries(model.features).map(([key, value]) => (
                    <div key={key} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Best Use Cases</h4>
                <div className="flex flex-wrap gap-1">
                  {model.useCases.map((useCase, index) => (
                    <span key={useCase} className="text-gray-600 text-sm">
                      {useCase}{index < model.useCases.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How NeuroSwitch Works */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How NeuroSwitch Makes Decisions</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analyze Request</h3>
            <p className="text-gray-600 text-sm">
              Our classifier analyzes your prompt for intent, complexity, domain, and output requirements.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Score Models</h3>
            <p className="text-gray-600 text-sm">
              Each available model is scored based on capability match, current load, and cost efficiency.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Route & Execute</h3>
            <p className="text-gray-600 text-sm">
              The optimal model is selected and your request is processed with full transparency.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className="font-medium text-gray-900 mb-2">Real-time Decision Factors</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <ul className="space-y-1">
                <li>• Request complexity and domain</li>
                <li>• Model capability requirements</li>
                <li>• Current provider availability</li>
                <li>• Response time expectations</li>
              </ul>
            </div>
            <div>
              <ul className="space-y-1">
                <li>• Cost optimization preferences</li>
                <li>• Quality requirements</li>
                <li>• Fallback model availability</li>
                <li>• Historical performance data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Models */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Coming Soon</h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {upcomingModels.map((model) => (
            <div key={model.name} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                  {model.expectedRelease}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{model.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                <ul className="space-y-1">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-gray-600">
                      <Clock className="w-3 h-3 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-1">Primary Use Case</h4>
                <p className="text-gray-600 text-sm">{model.use_case}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Want early access to upcoming models? Join our beta program.
          </p>
          <Link 
            href="/docs/community/features" 
            className="inline-flex items-center border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Request Beta Access
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Architecture</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Cpu className="w-5 h-5 text-blue-600 mr-2" />
              Edge Computing
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Local prompt classification for privacy</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Sub-100ms routing decisions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Distributed inference for resilience</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Automatic load balancing</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Network className="w-5 h-5 text-purple-600 mr-2" />
              Intelligent Orchestration
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Multi-provider API management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Real-time health monitoring</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Adaptive routing algorithms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Continuous learning and optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience Fusion-Native Intelligence</h2>
        <p className="text-gray-600 mb-6">
          Try NeuroSwitch and our Fusion-native models today. See how intelligent routing can transform your AI workflows.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Try NeuroSwitch Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/overview/neuroswitch" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
} 