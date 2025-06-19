import React from 'react';
import Link from 'next/link';
import { Globe, MapPin, Shield, Server, CheckCircle, Flag, Building, Lock, Clock, Zap } from 'lucide-react';

export const metadata = {
  title: 'Data Residency Regions - Fusion AI Documentation',
  description: 'Explore Fusion AI\'s supported data residency regions and learn how your data is routed and stored by geographic location for compliance.',
};

export default function RegionsPage() {
  const regions = [
    {
      region: 'United States',
      code: 'US',
      flag: '🇺🇸',
      locations: [
        { city: 'Virginia', datacenter: 'us-east-1', latency: '< 50ms', capacity: 'Primary' },
        { city: 'Oregon', datacenter: 'us-west-2', latency: '< 60ms', capacity: 'Primary' },
        { city: 'California', datacenter: 'us-west-1', latency: '< 55ms', capacity: 'Secondary' }
      ],
      compliance: ['SOC 2 Type II', 'HIPAA', 'FedRAMP Ready', 'CCPA'],
      providers: ['OpenAI', 'Anthropic', 'Google', 'Azure OpenAI'],
      dataTypes: ['All request metadata', 'Usage analytics', 'Security logs', 'Billing data']
    },
    {
      region: 'European Union',
      code: 'EU',
      flag: '🇪🇺',
      locations: [
        { city: 'Frankfurt', datacenter: 'eu-central-1', latency: '< 40ms', capacity: 'Primary' },
        { city: 'Ireland', datacenter: 'eu-west-1', latency: '< 45ms', capacity: 'Primary' },
        { city: 'Stockholm', datacenter: 'eu-north-1', latency: '< 50ms', capacity: 'Secondary' }
      ],
      compliance: ['GDPR', 'SOC 2 Type II', 'ISO 27001', 'EU-US DPF'],
      providers: ['OpenAI (EU)', 'Anthropic Claude (EU)', 'Azure OpenAI EU'],
      dataTypes: ['GDPR-compliant logging only', 'Anonymized analytics', 'Security events', 'EU billing data']
    },
    {
      region: 'Asia Pacific',
      code: 'APAC',
      flag: '🌏',
      locations: [
        { city: 'Singapore', datacenter: 'ap-southeast-1', latency: '< 60ms', capacity: 'Primary' },
        { city: 'Tokyo', datacenter: 'ap-northeast-1', latency: '< 45ms', capacity: 'Primary' },
        { city: 'Sydney', datacenter: 'ap-southeast-2', latency: '< 70ms', capacity: 'Secondary' }
      ],
      compliance: ['PDPA (Singapore)', 'APPI (Japan)', 'Privacy Act (Australia)', 'SOC 2'],
      providers: ['Azure OpenAI APAC', 'Google Vertex AI', 'Anthropic (Limited)'],
      dataTypes: ['Regional metadata', 'Localized analytics', 'Security monitoring', 'APAC billing']
    },
    {
      region: 'United Kingdom',
      code: 'UK',
      flag: '🇬🇧',
      locations: [
        { city: 'London', datacenter: 'eu-west-2', latency: '< 35ms', capacity: 'Primary' }
      ],
      compliance: ['UK GDPR', 'Data Protection Act 2018', 'ISO 27001', 'Cyber Essentials Plus'],
      providers: ['Azure OpenAI UK', 'Anthropic Claude UK'],
      dataTypes: ['UK-specific logging', 'Brexit-compliant storage', 'Local security logs', 'GBP billing']
    },
    {
      region: 'Canada',
      code: 'CA',
      flag: '🇨🇦',
      locations: [
        { city: 'Central Canada', datacenter: 'ca-central-1', latency: '< 50ms', capacity: 'Primary' }
      ],
      compliance: ['PIPEDA', 'Provincial Privacy Acts', 'SOC 2 Type II', 'ISO 27001'],
      providers: ['Azure OpenAI Canada', 'Anthropic Claude (US-routed)'],
      dataTypes: ['Canadian metadata', 'Provincial compliance logs', 'CAD billing data']
    }
  ];

  const routingRules = [
    {
      rule: 'Automatic Geographic Routing',
      description: 'Requests are automatically routed to the nearest compliant data center',
      implementation: 'Based on IP geolocation and compliance requirements',
      icon: <Globe className="w-5 h-5" />
    },
    {
      rule: 'Compliance-First Routing',
      description: 'Data residency requirements override performance optimizations',
      implementation: 'GDPR, HIPAA, and sector-specific rules take precedence',
      icon: <Shield className="w-5 h-5" />
    },
    {
      rule: 'Provider-Aware Routing',
      description: 'AI model requests route to providers available in your region',
      implementation: 'Fallback to compliant providers when primary is unavailable',
      icon: <Server className="w-5 h-5" />
    },
    {
      rule: 'Cross-Border Data Transfer',
      description: 'Explicit controls for data that needs to cross regional boundaries',
      implementation: 'Requires explicit consent or adequacy decisions',
      icon: <Lock className="w-5 h-5" />
    }
  ];

  const complianceFrameworks = [
    {
      framework: 'GDPR (EU)',
      requirements: [
        'Data minimization and purpose limitation',
        'Right to erasure and portability',
        'Consent management for analytics',
        'Data Processing Impact Assessments'
      ],
      implementation: 'EU-only data storage with encryption at rest and in transit'
    },
    {
      framework: 'HIPAA (US Healthcare)',
      requirements: [
        'Business Associate Agreements',
        'Minimum necessary standard',
        'Administrative, physical, and technical safeguards',
        'Audit controls and data integrity'
      ],
      implementation: 'Dedicated healthcare-compliant infrastructure with enhanced encryption'
    },
    {
      framework: 'PIPEDA (Canada)',
      requirements: [
        'Consent for collection and use',
        'Limiting collection to business purposes',
        'Accuracy and retention limits',
        'Safeguards and breach notification'
      ],
      implementation: 'Canadian data centers with provincial compliance overlays'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Residency Regions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fusion AI operates in multiple regions worldwide to ensure data sovereignty, compliance, and optimal performance. 
          Choose where your data is processed and stored.
        </p>
      </div>

      {/* Summary */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Global Infrastructure</h2>
            <p className="text-gray-700">
              Our distributed infrastructure ensures your data stays within your chosen geographic boundaries while maintaining 
              high availability and low latency. All regions operate under strict compliance and security standards.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Regions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Regions</h2>
        <div className="space-y-8">
          {regions.map((region, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{region.flag}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{region.region}</h3>
                  <p className="text-gray-600 mb-4">Region Code: <code className="bg-gray-100 px-2 py-1 rounded">{region.code}</code></p>
                  
                  {/* Data Centers */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Data Centers</h4>
                    <div className="grid lg:grid-cols-3 gap-4">
                      {region.locations.map((location, locIndex) => (
                        <div key={locIndex} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{location.city}</h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              location.capacity === 'Primary' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {location.capacity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <code className="text-xs">{location.datacenter}</code>
                          </p>
                          <div className="flex items-center">
                            <Zap className="w-3 h-3 text-green-500 mr-1" />
                            <span className="text-sm text-gray-600">{location.latency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Compliance */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Shield className="w-4 h-4 text-green-600 mr-2" />
                        Compliance
                      </h4>
                      <ul className="space-y-1">
                        {region.compliance.map((standard, stdIndex) => (
                          <li key={stdIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {standard}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Providers */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Server className="w-4 h-4 text-blue-600 mr-2" />
                        AI Providers
                      </h4>
                      <ul className="space-y-1">
                        {region.providers.map((provider, provIndex) => (
                          <li key={provIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
                            {provider}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Data Types */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Building className="w-4 h-4 text-purple-600 mr-2" />
                        Data Storage
                      </h4>
                      <ul className="space-y-1">
                        {region.dataTypes.map((dataType, dataIndex) => (
                          <li key={dataIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-purple-500 mr-2 flex-shrink-0" />
                            {dataType}
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

      {/* Data Routing Rules */}
      <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Routing Rules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {routingRules.map((rule, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(rule.icon, { className: 'w-4 h-4 text-blue-600' })}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{rule.rule}</h3>
                  <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
                  <p className="text-xs text-gray-500">{rule.implementation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Configuration */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Specify Your Region</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Via API Headers</h3>
            <div className="bg-gray-900 rounded-lg p-4 text-white">
              <pre className="text-sm text-green-400 overflow-x-auto">
{`# Force EU data residency
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Data-Region: EU" \\
  -H "X-Compliance-Mode: GDPR" \\
  -d '{"prompt": "Hello world", "provider": "neuroswitch"}'

# Specify US healthcare compliance
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Data-Region: US" \\
  -H "X-Compliance-Mode: HIPAA" \\
  -d '{"prompt": "Medical query", "provider": "neuroswitch"}'

# APAC region with local providers only
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -H "X-Data-Region: APAC" \\
  -H "X-Provider-Scope: regional" \\
  -d '{"prompt": "Regional query", "provider": "neuroswitch"}'`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Account-Level Settings</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Dashboard Configuration</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Set your default data residency region in account settings.
                </p>
                <Link 
                  href="/dashboard/compliance" 
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  Configure Data Residency →
                </Link>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">API Key Binding</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Create region-specific API keys that enforce data residency.
                </p>
                <Link 
                  href="/dashboard/keys" 
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  Manage API Keys →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Regional Compliance</h2>
        <div className="space-y-6">
          {complianceFrameworks.map((framework, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{framework.framework}</h3>
              <p className="text-gray-600 mb-4">{framework.implementation}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Key Requirements</h4>
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
          ))}
        </div>
      </section>

      {/* Migration Guide */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Changing Regions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Before You Switch</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                Allow 24-48 hours for full migration
              </li>
              <li className="flex items-start">
                <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                Verify compliance requirements in new region
              </li>
              <li className="flex items-start">
                <Server className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                Check AI provider availability
              </li>
              <li className="flex items-start">
                <Building className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                Review data transfer implications
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration Process</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">1</span>
                Submit region change request
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">2</span>
                Data export and validation
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">3</span>
                Regional infrastructure setup
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">4</span>
                Data migration and verification
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">5</span>
                Cutover and confirmation
              </li>
            </ol>
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
            <Shield className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">What We Log</h3>
              <p className="text-sm text-gray-600">Regional logging policies and practices</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/privacy/no-logging" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Lock className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">No-Logging Mode</h3>
              <p className="text-sm text-gray-600">Zero-log options in all regions</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/privacy/opt-out" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Flag className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Opt-Out Options</h3>
              <p className="text-sm text-gray-600">Regional privacy controls</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/overview/data-flow" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Globe className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Data Flow Overview</h3>
              <p className="text-sm text-gray-600">Global data routing architecture</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
} 