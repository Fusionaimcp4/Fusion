import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, AlertTriangle, CheckCircle, X, Code, Users, Building, Database } from 'lucide-react';

export const metadata = {
  title: 'No-Logging Mode - Fusion AI Documentation',
  description: 'Learn about Fusion AI\'s no-logging endpoints and zero-log account options for maximum privacy and confidentiality.',
};

export default function NoLoggingPage() {
  const noLogEndpoints = [
    {
      endpoint: '/v1/chat/no-log',
      description: 'Zero-log chat completions',
      features: [
        'No request metadata logging',
        'No usage analytics tracking',
        'Temporary session identifiers only',
        'Automatic data purging'
      ],
      limitations: [
        'No debugging support',
        'Limited error diagnostics',
        'No usage analytics',
        'Higher latency possible'
      ]
    },
    {
      endpoint: '/v1/completions/private',
      description: 'Private text completions',
      features: [
        'Ephemeral processing only',
        'No provider logging requests',
        'Memory-only operations',
        'Immediate cleanup'
      ],
      limitations: [
        'No request replay',
        'Limited support options',
        'No caching benefits',
        'Reduced redundancy'
      ]
    },
    {
      endpoint: '/v1/embeddings/anonymous',
      description: 'Anonymous embedding generation',
      features: [
        'No input text retention',
        'Randomized processing IDs',
        'No vector storage',
        'Zero telemetry'
      ],
      limitations: [
        'No result caching',
        'No batch optimization',
        'Single-use sessions',
        'Limited error tracking'
      ]
    }
  ];

  const accountTiers = [
    {
      tier: 'Enterprise No-Log',
      icon: <Building className="w-6 h-6" />,
      features: [
        'Account-wide no-logging policy',
        'Custom data processing agreements',
        'Dedicated infrastructure',
        'BYOAPI key enforcement',
        'Zero-knowledge architecture',
        'Custom retention policies'
      ],
      useCases: [
        'Healthcare and HIPAA compliance',
        'Legal document processing',
        'Financial services',
        'Government contractors'
      ],
      price: 'Custom pricing'
    },
    {
      tier: 'Professional Privacy',
      icon: <Users className="w-6 h-6" />,
      features: [
        'Selective endpoint no-logging',
        'Enhanced privacy controls',
        'Audit trail opt-out',
        'Regional data processing',
        'Extended deletion options',
        'Privacy-first defaults'
      ],
      useCases: [
        'Research institutions',
        'Privacy-conscious startups',
        'Content creators',
        'Educational organizations'
      ],
      price: 'Starting at $299/month'
    },
    {
      tier: 'Standard (with Privacy Options)',
      icon: <Users className="w-6 h-6" />,
      features: [
        'No-log endpoint access',
        'Request-level privacy flags',
        'Basic deletion controls',
        'Standard compliance',
        'Community support',
        'Usage tracking opt-out'
      ],
      useCases: [
        'Individual developers',
        'Small applications',
        'Testing and development',
        'Personal projects'
      ],
      price: 'Pay-per-use pricing'
    }
  ];

  const complianceStandards = [
    {
      standard: 'HIPAA',
      description: 'Healthcare Information Portability and Accountability Act',
      requirements: [
        'No PHI logging or storage',
        'Encrypted processing pipelines',
        'Business Associate Agreements',
        'Audit trail controls'
      ]
    },
    {
      standard: 'GDPR',
      description: 'General Data Protection Regulation',
      requirements: [
        'Right to be forgotten compliance',
        'Data minimization principles',
        'Consent management',
        'Data Protection Impact Assessments'
      ]
    },
    {
      standard: 'SOX',
      description: 'Sarbanes-Oxley Act',
      requirements: [
        'Financial data protection',
        'Audit trail preservation',
        'Internal controls',
        'Data integrity assurance'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">No-Logging Mode</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          For maximum privacy and confidentiality, Fusion AI offers specialized no-logging endpoints and account modes 
          that eliminate data retention and tracking.
        </p>
      </div>

      {/* Summary */}
      <section className="bg-green-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Zero-Log Guarantee</h2>
            <p className="text-gray-700">
              When using no-logging endpoints or accounts, Fusion AI operates in a zero-knowledge mode where no request data, 
              responses, or metadata are stored. Processing occurs entirely in memory with immediate cleanup after completion.
            </p>
          </div>
        </div>
      </section>

      {/* No-Log Endpoints */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">No-Logging Endpoints</h2>
        <div className="space-y-6">
          {noLogEndpoints.map((endpoint, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{endpoint.endpoint}</code>
                  </h3>
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {endpoint.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <Lock className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {endpoint.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-center text-sm text-gray-600">
                            <X className="w-3 h-3 text-orange-500 mr-2 flex-shrink-0" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account Tiers */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">No-Log Account Options</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {accountTiers.map((tier, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  {React.cloneElement(tier.icon, { className: 'w-6 h-6 text-blue-600' })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tier.tier}</h3>
                  <p className="text-sm font-medium text-blue-600">{tier.price}</p>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-medium text-gray-900 mb-3">Ideal For</h4>
                <ul className="space-y-1 mb-6">
                  {tier.useCases.map((useCase, useCaseIndex) => (
                    <li key={useCaseIndex} className="text-sm text-gray-600">
                      • {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto">
                <Link 
                  href="/dashboard/billing" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center block"
                >
                  {tier.price === 'Custom pricing' ? 'Contact Sales' : 'Upgrade Now'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Guide</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Using No-Log Endpoints</h3>
            <div className="bg-gray-900 rounded-lg p-4 text-white mb-4">
              <pre className="text-sm text-green-400 overflow-x-auto">
{`# Standard logging endpoint
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -d '{"prompt": "Sensitive query"}'

# No-logging endpoint
curl -X POST https://api.mcp4.ai/v1/chat/no-log \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Privacy-Mode: strict" \\
  -d '{"prompt": "Sensitive query"}'`}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy Headers</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">X-Privacy-Mode</code>
                </h4>
                <p className="text-sm text-gray-600">
                  Values: <code>strict</code>, <code>standard</code>, <code>minimal</code>
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">X-No-Telemetry</code>
                </h4>
                <p className="text-sm text-gray-600">
                  Values: <code>true</code>, <code>false</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Standards</h2>
        <div className="space-y-4">
          {complianceStandards.map((standard, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{standard.standard}</h3>
                  <p className="text-sm text-gray-600 mb-3">{standard.description}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {standard.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {requirement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use No-Logging</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended For</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Processing sensitive personal data</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Compliance with strict privacy regulations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Healthcare and medical applications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Legal document analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Financial services and banking</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Consider Alternatives For</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Development and testing workflows</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Applications requiring detailed analytics</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">High-volume production workloads</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Scenarios requiring debugging support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Privacy Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link 
            href="/docs/privacy/logging" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Database className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">What We Log</h3>
              <p className="text-sm text-gray-600">Standard logging policies and practices</p>
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
            <Building className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Data Residency</h3>
              <p className="text-sm text-gray-600">Regional data processing options</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/api/parameters" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Code className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">API Parameters</h3>
              <p className="text-sm text-gray-600">Privacy-related API options</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
} 