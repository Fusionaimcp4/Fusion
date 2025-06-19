import React from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Globe, 
  Key, 
  DollarSign, 
  MessageCircle, 
  BarChart3, 
  Users, 
  Code, 
  Zap, 
  Settings,
  CheckCircle,
  ArrowRight,
  Shield,
  Target,
  Layers,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function KeyBenefitsPage() {
  const benefits = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Universal Model Access',
      description: 'Access all leading AI models through a single, unified API',
      color: 'blue',
      details: [
        'GPT-4 Turbo, Claude 3 Opus, Gemini 1.5 Pro, and more',
        'No need to manage multiple API integrations',
        'Consistent interface across all providers',
        'Automatic model updates and new releases'
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Intelligent Routing',
      description: 'NeuroSwitch automatically selects the best model for each request',
      color: 'purple',
      details: [
        'AI-powered prompt analysis and classification',
        'Optimal model selection based on task requirements',
        'Real-time performance and cost optimization',
        'Transparent routing decisions with explanations'
      ]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Simple Integration',
      description: 'Drop-in replacement for OpenAI API with enhanced features',
      color: 'green',
      details: [
        'Compatible with existing OpenAI SDK implementations',
        'Migrate existing applications in minutes',
        'Enhanced features like streaming and tool calling',
        'Comprehensive SDKs for popular languages'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacy & Security',
      description: 'Enterprise-grade security with privacy-first design',
      color: 'red',
      details: [
        'End-to-end encryption for all communications',
        'BYOAPI support for direct provider billing',
        'No data retention on Fusion servers',
        'SOC 2 Type II compliant infrastructure'
      ]
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Cost Optimization',
      description: 'Reduce AI costs through intelligent routing and caching',
      color: 'yellow',
      details: [
        'Automatic selection of cost-effective models',
        'Prompt caching for repeated queries',
        'Real-time cost monitoring and alerts',
        'Volume discounts and enterprise pricing'
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Enhanced Performance',
      description: 'Faster responses with failover and optimization',
      color: 'orange',
      details: [
        'Sub-second routing decisions',
        'Automatic failover between providers',
        'Global edge infrastructure',
        'Real-time streaming support'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      red: 'text-red-600 bg-red-50 border-red-200',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Key Benefits</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover why leading developers and enterprises choose Fusion AI for their AI integration needs. 
          From cost savings to enhanced performance, see what sets us apart.
        </p>
      </div>

      {/* Benefits Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className={`p-6 rounded-lg border ${getColorClasses(benefit.color)}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${getColorClasses(benefit.color).split(' ')[1]}`}>
              {React.cloneElement(benefit.icon, { className: `w-8 h-8 ${getColorClasses(benefit.color).split(' ')[0]}` })}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
            <p className="text-gray-600 mb-4">{benefit.description}</p>
            
            <div className="space-y-2">
              {benefit.details.map((detail, index) => (
                <div key={index} className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {detail}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ROI Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Return on Investment</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">30-50%</h3>
            <p className="text-gray-600">Cost reduction through intelligent routing and caching</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">10x</h3>
            <p className="text-gray-600">Faster integration compared to multi-provider setup</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
            <p className="text-gray-600">Uptime with automatic failover and redundancy</p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Fusion AI vs. Traditional Approach</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">❌ Traditional Multi-Provider Setup</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 text-sm">Separate integrations for each AI provider</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 text-sm">Manual model selection and fallback logic</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 text-sm">Complex billing and cost tracking</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 text-sm">Inconsistent API formats and responses</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 text-sm">No intelligent optimization</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-green-600">✅ Fusion AI Platform</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-600 text-sm">Single API for all AI providers</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-600 text-sm">Automatic NeuroSwitch routing and optimization</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-600 text-sm">Unified billing and transparent cost tracking</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-600 text-sm">Consistent OpenAI-compatible API format</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-600 text-sm">AI-powered performance and cost optimization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Benefits */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Benefits by Use Case</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔬 Researchers & Academics</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Access to cutting-edge models for experiments</li>
              <li>• Cost-effective research with intelligent routing</li>
              <li>• Reproducible results with consistent APIs</li>
              <li>• Academic discounts and research credits</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Startups</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Fast time-to-market with simple integration</li>
              <li>• Scale without vendor lock-in</li>
              <li>• Optimize costs as you grow</li>
              <li>• Access to enterprise features from day one</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏢 Enterprises</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Enterprise-grade security and compliance</li>
              <li>• Predictable costs and volume discounts</li>
              <li>• 24/7 support and SLA guarantees</li>
              <li>• Custom routing rules and policies</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Developers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Focus on building, not infrastructure</li>
              <li>• Advanced features like tool calling</li>
              <li>• Real-time streaming and caching</li>
              <li>• Comprehensive analytics and monitoring</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Customer Success */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Customer Success Stories</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">TechCorp AI</h3>
            <p className="text-sm text-gray-600 mb-4">
              "Fusion AI reduced our AI infrastructure costs by 40% while improving response quality. 
              The seamless integration saved us months of development time."
            </p>
            <div className="text-xs text-gray-500">Enterprise Customer</div>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">DataScience Labs</h3>
            <p className="text-sm text-gray-600 mb-4">
              "NeuroSwitch automatically selects the best model for each research task. 
              We've seen 60% better results compared to manual model selection."
            </p>
            <div className="text-xs text-gray-500">Research Institution</div>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">InnovateLab</h3>
            <p className="text-sm text-gray-600 mb-4">
              "Migrating to Fusion AI took just 2 hours. The performance improvements 
              and cost savings were immediate and significant."
            </p>
            <div className="text-xs text-gray-500">AI Startup</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience the Benefits</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of developers and enterprises who have transformed their AI workflows with Fusion AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/use-cases" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            View Use Cases
          </Link>
        </div>
      </section>
    </div>
  );
} 