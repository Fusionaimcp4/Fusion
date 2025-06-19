import React from 'react';
import Link from 'next/link';
import { Shield, Database, Eye, Layers, Lock, Server, CheckCircle, ArrowRight, Globe, Settings, BarChart3, Zap } from 'lucide-react';

export default function PrinciplesPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Principles</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The foundational principles that guide every decision in Fusion AI's design and development.
        </p>
      </div>

      {/* Principles Overview */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
          <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
          <p className="text-sm text-gray-600">Your data stays private and secure</p>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Model Agnostic</h3>
          <p className="text-sm text-gray-600">Works with any AI provider</p>
        </div>
        
        <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
          <Eye className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Transparent Routing</h3>
          <p className="text-sm text-gray-600">Clear, auditable decisions</p>
        </div>
        
        <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
          <Layers className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Future-Ready</h3>
          <p className="text-sm text-gray-600">Extensible and adaptable</p>
        </div>
      </section>

      {/* Privacy First */}
      <section id="privacy" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
        <div className="flex items-center mb-6">
          <Shield className="w-8 h-8 text-blue-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Privacy First</h2>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Your privacy is not negotiable. Fusion AI is built with privacy-by-design principles that protect your data at every step.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Data Protection</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">User data and conversation history are <strong>never used for model training</strong> or third-party analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Personally identifiable information is <strong>not shared</strong> with any AI provider unless explicitly required</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">All logs and analytics can be <strong>self-hosted or disabled</strong> entirely</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Encryption & Security</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">BYOAPI keys remain <strong>encrypted at rest and in transit</strong></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">All communication uses <strong>end-to-end encryption</strong></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Zero-knowledge architecture where possible</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 mt-6 border border-blue-300">
          <div className="flex items-center mb-3">
            <Server className="w-6 h-6 text-blue-700 mr-3" />
            <h3 className="font-semibold text-gray-900">Local Classification</h3>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            <strong>Query Never Leaves the Server for Classification:</strong> All prompt classification and model routing decisions are performed locally—no user queries are ever sent to any external API or third-party service for intent detection, topic analysis, or model selection.
          </p>
          <p className="text-gray-700 text-sm">
            Classification is handled internally using on-premises AI (e.g., BART or similar), guaranteeing privacy and eliminating exposure to outside data processors.
          </p>
        </div>
      </section>

      {/* Model Agnostic */}
      <section id="agnostic" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <Globe className="w-8 h-8 text-green-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Model Agnostic</h2>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Fusion AI doesn't play favorites. Our platform is designed to work seamlessly with any AI provider, giving you true flexibility and choice.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-4">Universal Compatibility</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>OpenAI (GPT-4, GPT-3.5)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Anthropic (Claude)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Google (Gemini)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Local/hosted models</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Custom AI endpoints</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-4">Abstracted Integration</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Routing logic doesn't assume provider-specific behaviors</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Model metadata and costs fully abstracted</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Unified response format across all providers</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-4">Seamless Addition</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">New providers with zero code changes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Custom models integrate immediately</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Future AI models automatically supported</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Transparent Routing */}
      <section id="transparent" className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <div className="flex items-center mb-6">
          <Eye className="w-8 h-8 text-purple-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Transparent Routing</h2>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Every routing decision is explainable, auditable, and configurable. You always know exactly why your request went where it did.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Decision Visibility</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Clear, auditable decision path for every request</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Exposes which provider/model was chosen and why</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Shows any fallback triggers or alternatives considered</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Real-time routing confidence scores</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Full Control</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Routing policies editable via admin UI</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Every AI call logged with provider selection</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Token usage and cost tracking per model</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Custom routing rules and overrides</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mt-6 border border-purple-300">
          <h3 className="font-semibold text-gray-900 mb-3">Complete Audit Trail</h3>
          <p className="text-gray-700 text-sm">
            Admins and end users can always see exactly how their request was handled, including routing reasoning, model performance metrics, fallback decisions, and cost implications. This transparency builds trust and enables optimization of your AI workflows.
          </p>
        </div>
      </section>

      {/* Extensible & Future-Ready */}
      <section id="extensible" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <Layers className="w-8 h-8 text-orange-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Extensible & Future-Ready</h2>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Built for the long term. Fusion AI's modular architecture adapts to new technologies, providers, and requirements without breaking existing integrations.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Modular Design</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">API-first platform architecture</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Plugin system for new capabilities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Microservices architecture</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Containerized deployment</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Configuration-Driven</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">All settings stored in database tables</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Admin UI for all configuration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">API-based configuration management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Version-controlled configurations</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Future Compatibility</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">New AI capabilities (vision, code, audio)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Evolving compliance requirements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">New workflow paradigms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Emerging AI model architectures</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6 mt-8 border border-orange-300">
          <h3 className="font-semibold text-gray-900 mb-3">Extensibility in Practice</h3>
          <p className="text-gray-700 text-sm mb-3">
            New providers, tools, or workflow modules can be added without core changes. Whether it's integrating a new AI model, adding custom business logic, or supporting new compliance requirements, Fusion AI adapts without disrupting existing operations.
          </p>
          <p className="text-gray-700 text-sm">
            This future-ready approach protects your investment and ensures that your AI infrastructure can evolve with the rapidly changing landscape of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Why These Principles Matter */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why These Principles Matter</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">For Organizations</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Compliance:</strong> Meet data protection and security requirements</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Flexibility:</strong> Avoid vendor lock-in and adapt to changing needs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Transparency:</strong> Maintain audit trails and operational visibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Future-proofing:</strong> Protect technology investments long-term</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">For Developers</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Reliability:</strong> Consistent behavior across all AI providers</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Simplicity:</strong> One API instead of managing multiple integrations</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Debuggability:</strong> Clear routing decisions and comprehensive logs</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">•</span>
                <span className="text-sm"><strong>Extensibility:</strong> Easy integration of new capabilities and models</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience These Principles</h2>
        <p className="text-gray-600 mb-6">
          See how our principles translate into a superior AI experience. Try Fusion AI today.
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
            href="/docs/overview/benefits" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            View Benefits
          </Link>
        </div>
      </section>
    </div>
  );
} 