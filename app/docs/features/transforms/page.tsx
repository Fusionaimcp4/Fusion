import React from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Code, Globe, Zap, CheckCircle, ArrowRight, Copy, Settings, RefreshCw } from 'lucide-react';

export default function TransformsPage() {
  const transformTypes = [
    {
      title: 'Provider Format Conversion',
      description: 'Automatically converts between different AI provider message formats',
      icon: <Globe className="w-6 h-6" />,
      color: 'blue',
      features: [
        'OpenAI ↔ Claude format conversion',
        'Gemini ↔ GPT message mapping',
        'Anthropic ↔ OpenAI compatibility',
        'Universal message standardization'
      ]
    },
    {
      title: 'Parameter Normalization',
      description: 'Standardizes parameters across different AI models and providers',
      icon: <Settings className="w-6 h-6" />,
      color: 'green',
      features: [
        'Temperature scaling adjustment',
        'Token limit normalization',
        'Stop sequence optimization',
        'Model-specific parameter tuning'
      ]
    },
    {
      title: 'Context Optimization',
      description: 'Optimizes conversation context for each AI provider',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'purple',
      features: [
        'Context window management',
        'Message history compression',
        'Role mapping optimization',
        'Provider-specific formatting'
      ]
    }
  ];

  const beforeAfterExamples = [
    {
      title: 'OpenAI to Claude Format',
      before: {
        title: 'OpenAI Format',
        code: `{
  "model": "gpt-4",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "temperature": 0.7
}`
      },
      after: {
        title: 'Claude Format (Internal)',
        code: `{
  "model": "claude-3-opus-20240229",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "temperature": 0.7,
  "max_tokens": 4096
}`
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Message Transforms</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Seamless message transformation system that automatically converts between different AI provider 
          formats, ensuring compatibility and optimal performance across all supported models.
        </p>
      </div>

      {/* Key Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {transformTypes.map((transform, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${getColorClasses(transform.color)}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${getColorClasses(transform.color).split(' ')[1]}`}>
              {React.cloneElement(transform.icon, { 
                className: `w-8 h-8 ${getColorClasses(transform.color).split(' ')[0]}` 
              })}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{transform.title}</h3>
            <p className="text-gray-600 mb-4">{transform.description}</p>
            
            <div className="space-y-2">
              {transform.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Message Transforms Work</h2>
        
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Request Analysis</h3>
            <p className="text-sm text-gray-600">
              System analyzes incoming request format and target provider requirements
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Format Mapping</h3>
            <p className="text-sm text-gray-600">
              Messages and parameters are mapped to target provider's expected format
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Optimization</h3>
            <p className="text-sm text-gray-600">
              Parameters are optimized for the specific model's capabilities and limits
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-orange-600">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Response Normalization</h3>
            <p className="text-sm text-gray-600">
              Provider response is normalized back to consistent Fusion AI format
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Transformation Examples</h2>
        
        {beforeAfterExamples.map((example, index) => (
          <div key={index} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 text-center">{example.title}</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Code className="w-5 h-5 text-red-600 mr-2" />
                  {example.before.title}
                </h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    {example.before.code}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <ArrowLeftRight className="w-5 h-5 text-green-600 mr-2" />
                  {example.after.title}
                </h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    {example.after.code}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Transform Features */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Transform Features</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Automatic Conversions</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Message Role Mapping</h4>
                  <p className="text-sm text-gray-600">Converts between different role naming conventions</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Parameter Translation</h4>
                  <p className="text-sm text-gray-600">Maps equivalent parameters across providers</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Token Limit Handling</h4>
                  <p className="text-sm text-gray-600">Automatically adjusts for provider-specific limits</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Optimizations</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Context Compression</h4>
                  <p className="text-sm text-gray-600">Optimizes message history for better performance</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Format Validation</h4>
                  <p className="text-sm text-gray-600">Ensures compatibility before sending to providers</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Error Translation</h4>
                  <p className="text-sm text-gray-600">Normalizes error responses across providers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Compatibility */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Provider Compatibility Matrix</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-purple-200">
            <thead>
              <tr className="bg-purple-100 border-b border-purple-200">
                <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                <th className="text-center p-4 font-semibold text-gray-900">OpenAI</th>
                <th className="text-center p-4 font-semibold text-gray-900">Claude</th>
                <th className="text-center p-4 font-semibold text-gray-900">Gemini</th>
                <th className="text-center p-4 font-semibold text-gray-900">Others</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple-100">
                <td className="p-4 font-medium text-gray-900">Message Format</td>
                <td className="p-4 text-center">✅ Native</td>
                <td className="p-4 text-center">🔄 Transformed</td>
                <td className="p-4 text-center">🔄 Transformed</td>
                <td className="p-4 text-center">🔄 Transformed</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-4 font-medium text-gray-900">Function Calling</td>
                <td className="p-4 text-center">✅ Direct</td>
                <td className="p-4 text-center">🔄 Mapped</td>
                <td className="p-4 text-center">🔄 Mapped</td>
                <td className="p-4 text-center">⚠️ Limited</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-4 font-medium text-gray-900">Streaming</td>
                <td className="p-4 text-center">✅ Native</td>
                <td className="p-4 text-center">✅ Native</td>
                <td className="p-4 text-center">🔄 Adapted</td>
                <td className="p-4 text-center">🔄 Adapted</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900">System Messages</td>
                <td className="p-4 text-center">✅ Native</td>
                <td className="p-4 text-center">🔄 Converted</td>
                <td className="p-4 text-center">🔄 Converted</td>
                <td className="p-4 text-center">🔄 Converted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Configuration */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transform Configuration</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Default Behavior</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Automatic format detection and conversion
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Parameter optimization for target provider
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Response normalization to OpenAI format
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Custom Options</h3>
            <div className="bg-gray-50 rounded p-3 border">
              <pre className="text-xs text-gray-700">
{`{
  "transform": {
    "preserve_original": false,
    "optimize_tokens": true,
    "normalize_response": true
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Use Transforms?</h2>
        <p className="text-gray-600 mb-6">
          Message transforms work automatically behind the scenes. Focus on building your application 
          while Fusion AI handles all the compatibility complexity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart/first-call" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Try It Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/api/parameters" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            API Reference
          </Link>
        </div>
      </section>
    </div>
  );
} 