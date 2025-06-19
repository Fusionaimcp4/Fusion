import React from 'react';
import Link from 'next/link';
import { UserX, Settings, Mail, Shield, CheckCircle, AlertTriangle, Eye, Database, Clock, FileText } from 'lucide-react';
import { CodeBlock } from '../../../components/CopyButton';

export const metadata = {
  title: 'Opt-Out Policies - Fusion AI Documentation',
  description: 'Learn how to opt out of data logging and tracking in Fusion AI, including step-by-step instructions and account settings.',
};

export default function OptOutPage() {
  const optOutMethods = [
    {
      method: 'Account Settings',
      icon: <Settings className="w-6 h-6" />,
      description: 'Disable logging through your dashboard preferences',
      steps: [
        'Log in to your Fusion AI dashboard',
        'Navigate to Settings > Privacy & Data',
        'Toggle "Disable Request Logging"',
        'Save changes and confirm via email'
      ],
      timeToEffect: 'Immediate',
      scope: 'All future requests'
    },
    {
      method: 'API Headers',
      icon: <FileText className="w-6 h-6" />,
      description: 'Control logging on a per-request basis',
      steps: [
        'Add X-Privacy-Mode: strict header',
        'Include X-No-Analytics: true header',
        'Optionally set X-No-Telemetry: true',
        'Use no-logging endpoints when available'
      ],
      timeToEffect: 'Immediate',
      scope: 'Per request'
    },
    {
      method: 'Email Request',
      icon: <Mail className="w-6 h-6" />,
      description: 'Submit a formal opt-out request via support',
      steps: [
        'Email privacy@fusionai.com',
        'Include your account ID and API key prefix',
        'Specify opt-out preferences and scope',
        'Await confirmation within 48 hours'
      ],
      timeToEffect: '24-48 hours',
      scope: 'Account-wide or specific features'
    }
  ];

  const optOutTypes = [
    {
      type: 'Usage Analytics',
      description: 'Stop collection of usage patterns and statistics',
      dataAffected: [
        'Request frequency tracking',
        'Feature usage analytics',
        'Performance metrics',
        'Geographic distribution data'
      ],
      impact: [
        'No personalized recommendations',
        'Reduced optimization insights',
        'Limited usage reports',
        'No trend analysis'
      ]
    },
    {
      type: 'Request Metadata',
      description: 'Disable logging of request information',
      dataAffected: [
        'API endpoint access logs',
        'Request timestamps',
        'Response time metrics',
        'Error rate tracking'
      ],
      impact: [
        'Limited debugging support',
        'No request replay capability',
        'Reduced error diagnostics',
        'No performance monitoring'
      ]
    },
    {
      type: 'Security Monitoring',
      description: 'Opt out of non-essential security logging',
      dataAffected: [
        'IP address geolocation',
        'User agent analysis',
        'Access pattern monitoring',
        'Behavioral analytics'
      ],
      impact: [
        'Reduced fraud protection',
        'Limited anomaly detection',
        'Basic security monitoring only',
        'Manual verification may be required'
      ]
    }
  ];

  const gdprRights = [
    {
      right: 'Right to Access',
      description: 'Request a copy of all personal data we process',
      howTo: 'Submit access request via privacy@fusionai.com',
      timeline: '30 days'
    },
    {
      right: 'Right to Rectification',
      description: 'Correct inaccurate or incomplete personal data',
      howTo: 'Contact support with corrections needed',
      timeline: '30 days'
    },
    {
      right: 'Right to Erasure',
      description: 'Request deletion of your personal data',
      howTo: 'Submit deletion request with account verification',
      timeline: '30 days'
    },
    {
      right: 'Right to Portability',
      description: 'Receive your data in a structured, machine-readable format',
      howTo: 'Request data export through dashboard or email',
      timeline: '30 days'
    }
  ];

  const codeExamples = {
    disableAll: `# Disable all logging for this request
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Privacy-Mode: strict" \\
  -H "X-No-Analytics: true" \\
  -H "X-No-Telemetry: true" \\
  -d '{"prompt": "Sensitive query", "provider": "neuroswitch"}'`,
    minimal: `# Minimal logging only
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Privacy-Mode: minimal" \\
  -H "X-No-Analytics: true" \\
  -d '{"prompt": "Semi-sensitive query"}'`,
    analyticsOnly: `# Standard logging with analytics disabled
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-No-Analytics: true" \\
  -d '{"prompt": "Regular query"}'`
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Opt-Out Policies</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Take control of your data with comprehensive opt-out options. Disable logging and tracking features 
          to ensure maximum privacy for your sensitive use cases.
        </p>
      </div>

      {/* Summary */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <UserX className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Privacy Rights</h2>
            <p className="text-gray-700">
              Fusion AI respects your privacy and provides multiple ways to opt out of data collection. 
              You can disable logging globally, selectively, or on a per-request basis while maintaining full API functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Opt-Out Methods */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Opt Out</h2>
        <div className="space-y-6">
          {optOutMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(method.icon, { className: 'w-6 h-6 text-blue-600' })}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.method}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Steps</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start text-sm text-gray-600">
                            <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Time to Effect</h4>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-600">{method.timeToEffect}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Scope</h4>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-600">{method.scope}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Header Examples</h2>
        <p className="text-gray-600 mb-6">
          Use these headers to control logging on individual requests:
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Complete Opt-Out</h3>
            <CodeBlock language="bash">
              {codeExamples.disableAll}
            </CodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Minimal Logging</h3>
            <CodeBlock language="bash">
              {codeExamples.minimal}
            </CodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics Disabled</h3>
            <CodeBlock language="bash">
              {codeExamples.analyticsOnly}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Types of Opt-Out */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Data Opt-Out</h2>
        <div className="space-y-6">
          {optOutTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{type.type}</h3>
              <p className="text-gray-600 mb-4">{type.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Database className="w-4 h-4 text-blue-600 mr-2" />
                    Data Affected
                  </h4>
                  <ul className="space-y-2">
                    {type.dataAffected.map((data, dataIndex) => (
                      <li key={dataIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {data}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
                    Service Impact
                  </h4>
                  <ul className="space-y-2">
                    {type.impact.map((impact, impactIndex) => (
                      <li key={impactIndex} className="flex items-center text-sm text-gray-600">
                        <AlertTriangle className="w-3 h-3 text-orange-500 mr-2 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GDPR Rights */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your GDPR Rights</h2>
        <p className="text-gray-600 mb-6">
          As a data subject under GDPR, you have the following rights regarding your personal data:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {gdprRights.map((right, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{right.right}</h3>
              <p className="text-sm text-gray-600 mb-3">{right.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Settings className="w-3 h-3 text-blue-500 mr-2" />
                  <span className="text-gray-600">{right.howTo}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-3 h-3 text-green-500 mr-2" />
                  <span className="text-gray-600">Response within {right.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verification Process */}
      <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Required</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">For Security</h3>
            <p className="text-gray-700 mb-3">
              To protect your account and prevent unauthorized changes, we require verification for opt-out requests:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                Email confirmation from registered account
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                API key verification (prefix only)
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                Two-factor authentication if enabled
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Account email address</li>
              <li>• Account ID or API key prefix</li>
              <li>• Specific opt-out preferences</li>
              <li>• Effective date preference</li>
              <li>• Reason for opt-out (optional)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-2">privacy@fusionai.com</p>
            <p className="text-xs text-gray-500">Response within 24 hours</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dashboard Settings</h3>
            <Link href="/dashboard/privacy" className="text-sm text-blue-600 hover:text-blue-700">
              Manage Privacy Settings
            </Link>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
            <Link href="/docs/api/parameters" className="text-sm text-blue-600 hover:text-blue-700">
              API Privacy Parameters
            </Link>
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
            <Eye className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">What We Log</h3>
              <p className="text-sm text-gray-600">Understand our standard logging practices</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/privacy/no-logging" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Shield className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">No-Logging Mode</h3>
              <p className="text-sm text-gray-600">Zero-log endpoints and accounts</p>
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
            <FileText className="w-5 h-5 text-blue-600 mr-3" />
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