import React from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Globe, Shield, Zap, Code, CheckCircle, Database, Lock, Activity } from 'lucide-react';

export default function DataFlowPage() {
  const flowSteps = [
    {
      number: '1',
      title: 'Request Received',
      description: 'Your application sends a request to Fusion AI API',
      icon: <Code className="w-6 h-6" />,
      color: 'blue',
      details: [
        'HTTPS/TLS 1.3 encrypted connection',
        'API key authentication',
        'Request validation and sanitization',
        'Rate limiting checks'
      ]
    },
    {
      number: '2',
      title: 'NeuroSwitch Analysis',
      description: 'AI-powered prompt classification and routing decision',
      icon: <Brain className="w-6 h-6" />,
      color: 'purple',
      details: [
        'Prompt complexity analysis',
        'Domain classification (code, text, creative, etc.)',
        'Cost-performance optimization',
        'Provider availability check'
      ]
    },
    {
      number: '3',
      title: 'Provider Routing',
      description: 'Request is routed to the optimal AI provider',
      icon: <Globe className="w-6 h-6" />,
      color: 'green',
      details: [
        'Secure provider API call',
        'Request format transformation',
        'Context preservation',
        'Failover handling'
      ]
    },
    {
      number: '4',
      title: 'Response Processing',
      description: 'Provider response is processed and returned',
      icon: <Zap className="w-6 h-6" />,
      color: 'orange',
      details: [
        'Response normalization',
        'Quality validation',
        'Cost calculation',
        'Usage logging'
      ]
    }
  ];

  const securityMeasures = [
    {
      title: 'End-to-End Encryption',
      description: 'All data in transit uses TLS 1.3 encryption',
      icon: <Lock className="w-5 h-5" />
    },
    {
      title: 'Zero Data Retention',
      description: 'Prompts and responses are not stored on Fusion servers',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Secure Processing',
      description: 'All routing decisions happen in secure, isolated environments',
      icon: <Database className="w-5 h-5" />
    },
    {
      title: 'Audit Trails',
      description: 'Complete logging for transparency and debugging',
      icon: <Activity className="w-5 h-5" />
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Flow</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Understand how your data moves through the Fusion AI system, from request to response, 
          with complete transparency and security at every step.
        </p>
      </div>

      {/* Visual Data Flow Diagram */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Interactive Data Flow Diagram</h2>
        
        <div className="max-w-6xl mx-auto">
          <svg viewBox="0 0 1200 400" className="w-full h-auto">
            {/* Background gradient */}
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#eff6ff" />
                <stop offset="100%" stopColor="#f3e8ff" />
              </linearGradient>
              
              {/* Arrow marker */}
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
              
              {/* Data flow animation */}
              <circle id="dataPoint" r="3" fill="#8b5cf6">
                <animateMotion dur="4s" repeatCount="indefinite">
                  <mpath xlinkHref="#dataPath"/>
                </animateMotion>
              </circle>
              
              {/* Path for animation */}
              <path id="dataPath" d="M 150 200 L 350 200 L 550 200 L 750 200 L 950 200" 
                    fill="none" stroke="none"/>
            </defs>
            
            {/* Background */}
            <rect width="1200" height="400" fill="url(#bgGradient)" rx="8"/>
            
            {/* Connection lines */}
            <line x1="150" y1="200" x2="350" y2="200" stroke="#6366f1" strokeWidth="3" 
                  markerEnd="url(#arrowhead)" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="350" y1="200" x2="550" y2="200" stroke="#8b5cf6" strokeWidth="3" 
                  markerEnd="url(#arrowhead)" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="550" y1="200" x2="750" y2="200" stroke="#10b981" strokeWidth="3" 
                  markerEnd="url(#arrowhead)" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="750" y1="200" x2="950" y2="200" stroke="#f59e0b" strokeWidth="3" 
                  markerEnd="url(#arrowhead)" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite"/>
            </line>
            
            {/* Step 1: User Application */}
            <g transform="translate(50, 150)">
              <rect width="100" height="100" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <rect x="20" y="20" width="60" height="8" rx="4" fill="#3b82f6"/>
              <rect x="20" y="35" width="40" height="8" rx="4" fill="#60a5fa"/>
              <rect x="20" y="50" width="50" height="8" rx="4" fill="#93c5fd"/>
              <text x="50" y="80" textAnchor="middle" className="text-xs font-medium" fill="#1e40af">
                Your App
              </text>
            </g>
            
            {/* Step 2: Fusion AI Gateway */}
            <g transform="translate(250, 150)">
              <rect width="100" height="100" rx="12" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2"/>
              <circle cx="30" cy="35" r="8" fill="#8b5cf6"/>
              <circle cx="50" cy="35" r="8" fill="#a78bfa"/>
              <circle cx="70" cy="35" r="8" fill="#c4b5fd"/>
              <rect x="20" y="50" width="60" height="4" rx="2" fill="#8b5cf6"/>
              <rect x="25" y="60" width="50" height="4" rx="2" fill="#a78bfa"/>
              <text x="50" y="80" textAnchor="middle" className="text-xs font-medium" fill="#6d28d9">
                Fusion AI
              </text>
            </g>
            
            {/* Step 3: NeuroSwitch Engine */}
            <g transform="translate(450, 150)">
              <rect width="100" height="100" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2"/>
              <path d="M30,30 Q50,20 70,30 Q50,40 30,30" fill="#10b981"/>
              <circle cx="40" cy="30" r="3" fill="#ffffff"/>
              <circle cx="60" cy="30" r="3" fill="#ffffff"/>
              <path d="M35,45 Q50,35 65,45" stroke="#10b981" strokeWidth="2" fill="none"/>
              <text x="50" y="75" textAnchor="middle" className="text-xs font-medium" fill="#047857">
                NeuroSwitch
              </text>
            </g>
            
            {/* Step 4: AI Provider */}
            <g transform="translate(650, 150)">
              <rect width="100" height="100" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <rect x="25" y="25" width="50" height="30" rx="6" fill="#f59e0b"/>
              <rect x="30" y="30" width="8" height="20" rx="2" fill="#ffffff"/>
              <rect x="42" y="30" width="8" height="20" rx="2" fill="#ffffff"/>
              <rect x="54" y="30" width="8" height="20" rx="2" fill="#ffffff"/>
              <text x="50" y="75" textAnchor="middle" className="text-xs font-medium" fill="#d97706">
                AI Provider
              </text>
            </g>
            
            {/* Step 5: Response */}
            <g transform="translate(850, 150)">
              <rect width="100" height="100" rx="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/>
              <path d="M30,35 L70,35 M30,45 L60,45 M30,55 L65,55" stroke="#22c55e" strokeWidth="3"/>
              <circle cx="75" cy="30" r="4" fill="#22c55e"/>
              <text x="50" y="75" textAnchor="middle" className="text-xs font-medium" fill="#16a34a">
                Response
              </text>
            </g>
            
            {/* Labels */}
            <text x="100" y="130" textAnchor="middle" className="text-sm font-semibold" fill="#374151">
              1. Request
            </text>
            <text x="300" y="130" textAnchor="middle" className="text-sm font-semibold" fill="#374151">
              2. Authentication
            </text>
            <text x="500" y="130" textAnchor="middle" className="text-sm font-semibold" fill="#374151">
              3. Route Analysis
            </text>
            <text x="700" y="130" textAnchor="middle" className="text-sm font-semibold" fill="#374151">
              4. AI Processing
            </text>
            <text x="900" y="130" textAnchor="middle" className="text-sm font-semibold" fill="#374151">
              5. Response
            </text>
            
            {/* Security indicators */}
            <g transform="translate(100, 300)">
              <rect width="80" height="20" rx="10" fill="#10b981" opacity="0.1"/>
              <text x="40" y="15" textAnchor="middle" className="text-xs font-medium" fill="#059669">
                🔒 TLS 1.3
              </text>
            </g>
            <g transform="translate(300, 300)">
              <rect width="80" height="20" rx="10" fill="#8b5cf6" opacity="0.1"/>
              <text x="40" y="15" textAnchor="middle" className="text-xs font-medium" fill="#7c3aed">
                🛡️ Validated
              </text>
            </g>
            <g transform="translate(500, 300)">
              <rect width="80" height="20" rx="10" fill="#f59e0b" opacity="0.1"/>
              <text x="40" y="15" textAnchor="middle" className="text-xs font-medium" fill="#d97706">
                🧠 Optimized
              </text>
            </g>
            <g transform="translate(700, 300)">
              <rect width="80" height="20" rx="10" fill="#22c55e" opacity="0.1"/>
              <text x="40" y="15" textAnchor="middle" className="text-xs font-medium" fill="#16a34a">
                ⚡ Fast
              </text>
            </g>
            
            {/* Animated data point */}
            <use xlinkHref="#dataPoint"/>
          </svg>
        </div>
        
        <p className="text-center text-gray-600 mt-6">
          Watch data flow through our secure, intelligent routing system in real-time
        </p>
      </section>

      {/* Visual Flow Diagram */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Request Flow Overview</h2>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {flowSteps.map((step, index) => (
            <div key={step.number} className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(step.color).split(' ')[1]} border-2 ${getColorClasses(step.color).split(' ')[2]}`}>
                <span className={`font-bold text-lg ${getColorClasses(step.color).split(' ')[0]}`}>
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{step.description}</p>
              
              <div className={`p-3 rounded-lg ${getColorClasses(step.color).split(' ')[1]} border ${getColorClasses(step.color).split(' ')[2]}`}>
                {React.cloneElement(step.icon, { 
                  className: `w-6 h-6 mx-auto mb-2 ${getColorClasses(step.color).split(' ')[0]}` 
                })}
              </div>
              
              {index < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Step-by-Step Breakdown</h2>
        
        {flowSteps.map((step, index) => (
          <div key={step.number} className={`p-6 rounded-lg border ${getColorClasses(step.color)}`}>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getColorClasses(step.color).split(' ')[1]} border-2 ${getColorClasses(step.color).split(' ')[2]}`}>
                {React.cloneElement(step.icon, { 
                  className: `w-6 h-6 ${getColorClasses(step.color).split(' ')[0]}` 
                })}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Step {step.number}: {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Security & Privacy */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Security & Privacy</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {securityMeasures.map((measure, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(measure.icon, { className: 'w-5 h-5 text-green-600' })}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{measure.title}</h3>
                  <p className="text-sm text-gray-600">{measure.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BYOAPI Flow */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">BYOAPI Data Flow</h2>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-center">
            When using Bring Your Own API (BYOAPI), your data flows directly to your chosen provider 
            while still benefiting from NeuroSwitch routing intelligence.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-purple-200 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-purple-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Route Decision</h3>
              <p className="text-sm text-gray-600">
                NeuroSwitch analyzes your prompt and selects the optimal provider from your configured API keys
              </p>
            </div>
            
            <div className="text-center p-6 border border-blue-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Direct Connection</h3>
              <p className="text-sm text-gray-600">
                Your request goes directly to the provider using your API key, with no intermediate storage
              </p>
            </div>
            
            <div className="text-center p-6 border border-green-200 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Direct Billing</h3>
              <p className="text-sm text-gray-600">
                Costs are billed directly to your provider account, with transparent usage tracking in Fusion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Implementation</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Processing</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Sub-100ms routing decisions</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Async processing for optimal performance</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Intelligent caching and deduplication</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Real-time streaming support</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Global edge network for low latency</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Auto-scaling based on demand</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">99.9% uptime SLA with redundancy</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">SOC 2 Type II compliant data centers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring & Analytics */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Monitoring & Analytics</h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <Activity className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Metrics</h3>
            <p className="text-sm text-gray-600">
              Monitor request latency, success rates, and provider performance in real-time
            </p>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <Database className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Usage Analytics</h3>
            <p className="text-sm text-gray-600">
              Detailed breakdown of token usage, costs, and routing decisions
            </p>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Audit Logs</h3>
            <p className="text-sm text-gray-600">
              Complete audit trail for compliance and debugging purposes
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">See Data Flow in Action</h2>
        <p className="text-gray-600 mb-6">
          Experience the seamless data flow and intelligent routing of Fusion AI. 
          Try it today and see the transparency for yourself.
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
            href="/docs/overview/neuroswitch" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Learn About NeuroSwitch
          </Link>
        </div>
      </section>
    </div>
  );
} 