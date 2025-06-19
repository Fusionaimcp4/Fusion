import React from 'react';
import Link from 'next/link';
import { Key, Shield, Zap, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Bring Your Own API Key (BYOAPI) - Fusion AI Documentation',
  description: 'Use your own API keys from OpenAI, Anthropic, and Google while still benefiting from NeuroSwitch™ routing and Fusion AI features.',
};

export default function BYOAPIPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bring Your Own API Key (BYOAPI)</h1>
        <p className="text-lg text-gray-600">
          Use your own API keys from OpenAI, Anthropic, and Google while still benefiting from NeuroSwitch™ routing, caching, and advanced features.
        </p>
      </div>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use BYOAPI?</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Complete Control</h3>
            </div>
            <p className="text-gray-600">
              Keep your API keys and billing relationship directly with AI providers. Your keys never leave your control.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Still Get NeuroSwitch™</h3>
            </div>
            <p className="text-gray-600">
              Benefit from intelligent routing, caching, and all Fusion AI features while using your own keys.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Enterprise Ready</h3>
            </div>
            <p className="text-gray-600">
              Perfect for organizations with existing AI provider relationships and compliance requirements.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Key className="w-6 h-6 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Transparent Pricing</h3>
            </div>
            <p className="text-gray-600">
              Pay provider rates directly. Fusion AI charges only a small platform fee for routing and features.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How BYOAPI Works</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-4">Simple 3-Step Process</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold text-blue-900">Add Your API Keys</h4>
                <p className="text-blue-800">Securely store your OpenAI, Anthropic, and Google API keys in your Fusion AI dashboard.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold text-blue-900">Configure Routing</h4>
                <p className="text-blue-800">Set preferences for which providers to use and let NeuroSwitch™ route optimally.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold text-blue-900">Make Requests</h4>
                <p className="text-blue-800">Use the same Fusion AI API - we handle routing to your keys automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Setting Up BYOAPI</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Get Your API Keys</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700"><strong>OpenAI:</strong> Get your key at <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">platform.openai.com</code></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700"><strong>Anthropic:</strong> Get your key at <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">console.anthropic.com</code></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-gray-700"><strong>Google:</strong> Get your key at <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">aistudio.google.com</code></span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Add Keys to Fusion AI</h3>
            <p className="text-gray-600 mb-4">Navigate to your dashboard settings and add your API keys:</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm">
{`1. Go to Dashboard → Settings → API Keys
2. Click "Add Provider Key"
3. Select provider (OpenAI, Anthropic, Google)
4. Paste your API key
5. Test connection
6. Save securely`}
              </pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Configure Routing Preferences</h3>
            <p className="text-gray-600 mb-4">Set up how NeuroSwitch™ should route with your keys:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-700">Enable automatic routing across all providers</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-700">Prefer cost-efficient models when possible</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-700">Only use specific providers for sensitive content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security & Privacy</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-green-900">Enterprise-Grade Security</h3>
          </div>
          <div className="space-y-3 text-green-800">
            <p><strong>🔐 Encryption:</strong> All API keys encrypted at rest using AES-256</p>
            <p><strong>🔑 Access Control:</strong> Keys accessible only to your account</p>
            <p><strong>🚫 No Storage:</strong> Your requests and responses aren't stored when using BYOAPI</p>
            <p><strong>📊 Audit Trail:</strong> Complete logging of key usage and access</p>
            <p><strong>🌍 Regional Compliance:</strong> Keys stored in your preferred region</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">BYOAPI Pricing</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What You Pay</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider Costs:</span>
                  <span className="font-semibold">Direct billing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fusion AI Platform Fee:</span>
                  <span className="font-semibold">$0.002/request</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NeuroSwitch™ Routing:</span>
                  <span className="font-semibold text-green-600">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Caching & Features:</span>
                  <span className="font-semibold text-green-600">Included</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Savings</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">For 10,000 requests using GPT-4:</p>
                <div className="flex justify-between">
                  <span>OpenAI Direct:</span>
                  <span>$30.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Fusion BYOAPI:</span>
                  <span>$30.00 + $20.00</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                  <span>You Save:</span>
                  <span>Plus routing intelligence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-12">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <h3 className="font-semibold text-amber-900">BYOAPI Limitations</h3>
          </div>
          <div className="space-y-2 text-amber-800">
            <p>• Rate limits depend on your individual provider accounts</p>
            <p>• Some advanced features may be limited by provider API capabilities</p>
            <p>• Billing and usage tracking happens at the provider level</p>
            <p>• Setup requires active accounts with each AI provider</p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Get Started with BYOAPI</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/dashboard/settings" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <Key className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Configure Your Keys</h3>
            </div>
            <p className="text-gray-600 text-sm">Add your API keys in the dashboard settings.</p>
          </Link>

          <Link href="/docs/quickstart/first-call" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <ArrowRight className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Make Your First Call</h3>
            </div>
            <p className="text-gray-600 text-sm">Start making requests with your own API keys.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 