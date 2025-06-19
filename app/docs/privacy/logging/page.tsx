import React from 'react';
import Link from 'next/link';
import { Database, Shield, Clock, Eye, FileText, Lock, AlertTriangle, CheckCircle, Server, Activity } from 'lucide-react';
import { CodeBlock } from '../../../components/CopyButton';

export const metadata = {
  title: 'Logging Policy - Fusion AI Documentation',
  description: 'Understand what data Fusion AI logs during API usage, retention policies, and how logging affects your privacy.',
};

export default function LoggingPage() {
  const loggedData = [
    {
      category: 'Request Metadata',
      icon: <FileText className="w-5 h-5" />,
      items: [
        'API endpoint accessed',
        'Request timestamp',
        'HTTP method and status codes',
        'Request/response size',
        'User agent and IP address',
        'Authentication method used'
      ],
      retention: '90 days',
      purpose: 'Debugging, performance monitoring, and security analysis'
    },
    {
      category: 'Usage Analytics',
      icon: <Activity className="w-5 h-5" />,
      items: [
        'Token usage counts',
        'Model selection frequency',
        'Provider routing decisions',
        'Response time metrics',
        'Feature utilization',
        'Error rate tracking'
      ],
      retention: '1 year',
      purpose: 'Service optimization, billing, and feature development'
    },
    {
      category: 'Security Events',
      icon: <Shield className="w-5 h-5" />,
      items: [
        'Failed authentication attempts',
        'Rate limit violations',
        'Suspicious access patterns',
        'API key usage anomalies',
        'Unusual request frequencies',
        'Security alert triggers'
      ],
      retention: '2 years',
      purpose: 'Threat detection, fraud prevention, and compliance auditing'
    },
    {
      category: 'Quality Metrics',
      icon: <CheckCircle className="w-5 h-5" />,
      items: [
        'Provider response times',
        'Model accuracy scores',
        'User satisfaction ratings',
        'Error classification',
        'Performance benchmarks',
        'Routing effectiveness'
      ],
      retention: '6 months',
      purpose: 'Service quality assurance and model optimization'
    }
  ];

  const notLogged = [
    {
      category: 'Prompt Content',
      description: 'Your actual prompts and questions are not stored in our logs',
      icon: <Lock className="w-5 h-5 text-green-600" />
    },
    {
      category: 'Response Content',
      description: 'AI-generated responses are not retained after delivery',
      icon: <Eye className="w-5 h-5 text-green-600" />
    },
    {
      category: 'Personal Data',
      description: 'No personal information from prompts is extracted or stored',
      icon: <Shield className="w-5 h-5 text-green-600" />
    },
    {
      category: 'File Contents',
      description: 'Uploaded images and documents are processed but not stored',
      icon: <FileText className="w-5 h-5 text-green-600" />
    }
  ];

  const retentionPolicies = [
    {
      period: 'Real-time',
      description: 'Active request processing',
      data: ['Current API requests', 'Active sessions', 'In-flight responses'],
      action: 'Immediate processing and forwarding'
    },
    {
      period: '24 hours',
      description: 'Short-term operational data',
      data: ['Recent error logs', 'Performance metrics', 'Cache entries'],
      action: 'Automated analysis and optimization'
    },
    {
      period: '30 days',
      description: 'Monthly operational insights',
      data: ['Usage patterns', 'Billing calculations', 'Performance trends'],
      action: 'Regular reporting and account management'
    },
    {
      period: '90 days',
      description: 'Quarterly analysis and debugging',
      data: ['Request metadata', 'Error diagnostics', 'Performance history'],
      action: 'Deep analysis and service improvements'
    },
    {
      period: '1 year',
      description: 'Annual compliance and auditing',
      data: ['Security logs', 'Compliance records', 'Audit trails'],
      action: 'Regulatory compliance and security reviews'
    }
  ];

  const complianceFrameworks = [
    {
      standard: 'SOC 2 Type II',
      requirements: [
        'Secure logging infrastructure',
        'Access control and audit trails',
        'Data integrity verification',
        'Regular compliance assessments'
      ]
    },
    {
      standard: 'GDPR',
      requirements: [
        'Lawful basis for data processing',
        'Data minimization principles',
        'Right to erasure compliance',
        'Privacy by design implementation'
      ]
    },
    {
      standard: 'HIPAA (Healthcare)',
      requirements: [
        'Business Associate Agreements',
        'Minimum necessary standard',
        'Administrative safeguards',
        'Audit controls implementation'
      ]
    }
  ];

  const codeExamples = {
    standard: `# Standard API request with default logging
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain machine learning",
    "provider": "neuroswitch"
  }'`,
    minimal: `# Request with minimal logging
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Privacy-Mode: minimal" \\
  -d '{
    "prompt": "Sensitive query",
    "provider": "neuroswitch"
  }'`,
    noLogging: `# No-logging endpoint
curl -X POST https://api.mcp4.ai/v1/chat/no-log \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Privacy-Mode: strict" \\
  -d '{
    "prompt": "Confidential query",
    "provider": "neuroswitch"
  }'`
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">What We Log</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transparency is core to our privacy-first approach. Understand exactly what data 
          Fusion AI collects, how long we retain it, and why it's necessary for providing our service.
        </p>
      </div>

      {/* Summary */}
      <section className="bg-green-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Privacy-First Logging</h2>
            <p className="text-gray-700">
              We only log what's essential for service operation, security, and compliance. 
              Your actual prompts and AI responses are never stored. All logging can be customized or disabled based on your privacy needs.
            </p>
          </div>
        </div>
      </section>

      {/* What We Log */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data We Collect</h2>
        <div className="space-y-6">
          {loggedData.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(category.icon, { className: 'w-5 h-5 text-blue-600' })}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.category}</h3>
                  <p className="text-gray-600 mb-4">{category.purpose}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Database className="w-4 h-4 text-blue-600 mr-2" />
                        Data Points
                      </h4>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Clock className="w-4 h-4 text-orange-600 mr-2" />
                        Retention Period
                      </h4>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <span className="text-orange-700 font-medium">{category.retention}</span>
                        <p className="text-orange-600 text-sm mt-1">
                          Automatically deleted after this period
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Don't Log */}
      <section className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Don't Log</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {notLogged.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(item.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.category}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Retention Timeline */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention Timeline</h2>
        <div className="space-y-4">
          {retentionPolicies.map((policy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{policy.period}</h3>
                    <span className="text-sm text-gray-500">{policy.description}</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Data Types</h4>
                      <ul className="space-y-1">
                        {policy.data.map((dataType, dataIndex) => (
                          <li key={dataIndex} className="text-sm text-gray-600">
                            • {dataType}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Purpose</h4>
                      <p className="text-sm text-gray-600">{policy.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logging Control Examples */}
      <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Control Your Logging</h2>
        <p className="text-gray-600 mb-6">
          Use these API configurations to control what gets logged for your requests:
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard Logging</h3>
            <p className="text-gray-600 mb-3">Default behavior with all standard logging enabled</p>
            <CodeBlock language="bash">
              {codeExamples.standard}
            </CodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Minimal Logging</h3>
            <p className="text-gray-600 mb-3">Essential logging only for debugging and security</p>
            <CodeBlock language="bash">
              {codeExamples.minimal}
            </CodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">No Logging</h3>
            <p className="text-gray-600 mb-3">Zero-log endpoint for maximum privacy</p>
            <CodeBlock language="bash">
              {codeExamples.noLogging}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance & Security</h2>
        <div className="space-y-6">
          {complianceFrameworks.map((framework, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3">{framework.standard}</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {framework.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Access and Control */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Data Rights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Access Your Data</h3>
            <p className="text-sm text-gray-600 mb-3">
              Request a copy of all data we have about you
            </p>
            <Link href="/dashboard/privacy" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Access Dashboard →
            </Link>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Control Logging</h3>
            <p className="text-sm text-gray-600 mb-3">
              Customize or disable logging for your account
            </p>
            <Link href="/docs/privacy/opt-out" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Opt-Out Guide →
            </Link>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Server className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Zero-Log Mode</h3>
            <p className="text-sm text-gray-600 mb-3">
              Use endpoints with no data retention
            </p>
            <Link href="/docs/privacy/no-logging" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Privacy Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link 
            href="/docs/privacy/no-logging" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Lock className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">No-Logging Mode</h3>
              <p className="text-sm text-gray-600">Zero-log endpoints and accounts</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/privacy/opt-out" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Opt-Out Options</h3>
              <p className="text-sm text-gray-600">How to disable specific logging features</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/privacy/regions" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Database className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Data Residency</h3>
              <p className="text-sm text-gray-600">Regional data processing options</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/overview/data-flow" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Activity className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Data Flow</h3>
              <p className="text-sm text-gray-600">How data moves through our system</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
} 