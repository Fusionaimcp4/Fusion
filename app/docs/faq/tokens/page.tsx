import React from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, AlertCircle, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Token Usage FAQ - Fusion AI Documentation',
  description: 'Everything you need to know about tokens, pricing, and usage tracking in Fusion AI.',
};

export default function TokensFAQPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Token Usage FAQ</h1>
        <p className="text-lg text-gray-600">
          Common questions about tokens, pricing, and usage tracking in Fusion AI.
        </p>
      </div>

      {/* Token Basics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Token Basics</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What are tokens?</h3>
                <p className="text-gray-600 mb-3">
                  Tokens are the units that AI models use to process text. Generally, 1 token ≈ 4 characters in English, 
                  or about 3/4 of a word. For example, "Hello world!" is approximately 3 tokens.
                </p>
                <div className="bg-gray-50 rounded p-3 text-sm">
                  <strong>Examples:</strong><br/>
                  • "Hello" = 1 token<br/>
                  • "Hello world!" = 3 tokens<br/>
                  • "The quick brown fox" = 4 tokens
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Calculator className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How are tokens counted?</h3>
                <p className="text-gray-600 mb-3">
                  Token usage includes both input (prompt) and output (completion) tokens:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-50 rounded p-2 text-sm">
                    <span><strong>Input tokens:</strong> Your prompt/message</span>
                    <span className="text-blue-600">Cheaper rate</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 rounded p-2 text-sm">
                    <span><strong>Output tokens:</strong> AI's response</span>
                    <span className="text-orange-600">Higher rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do different models have different token costs?</h3>
                <p className="text-gray-600 mb-3">
                  Yes! Token costs vary significantly between models:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Model</th>
                        <th className="text-right py-2">Input Cost</th>
                        <th className="text-right py-2">Output Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Claude 3 Haiku</td>
                        <td className="text-right py-2">$0.25/1M tokens</td>
                        <td className="text-right py-2">$1.25/1M tokens</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">GPT-4 Turbo</td>
                        <td className="text-right py-2">$10.00/1M tokens</td>
                        <td className="text-right py-2">$30.00/1M tokens</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Claude 3 Sonnet</td>
                        <td className="text-right py-2">$3.00/1M tokens</td>
                        <td className="text-right py-2">$15.00/1M tokens</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NeuroSwitch & Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">NeuroSwitch™ & Token Optimization</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">How does NeuroSwitch™ help with token costs?</h3>
                <p className="text-blue-800 mb-3">
                  NeuroSwitch™ automatically routes requests to the most cost-effective model for each task:
                </p>
                <ul className="space-y-1 text-blue-800">
                  <li>• Simple questions → Cheaper models (Claude 3 Haiku)</li>
                  <li>• Complex reasoning → Premium models only when needed</li>
                  <li>• Automatic fallback if preferred model is unavailable</li>
                  <li>• Real-time cost optimization based on task complexity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Calculator className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Example: Cost savings with NeuroSwitch™</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm text-gray-600 mb-2"><strong>Scenario:</strong> 1000 mixed requests per day</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-red-600">Without NeuroSwitch™:</p>
                        <p>All requests to GPT-4: ~$45/day</p>
                      </div>
                      <div>
                        <p className="font-semibold text-green-600">With NeuroSwitch™:</p>
                        <p>Mixed routing: ~$18/day (60% savings)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Tracking */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Tracking & Monitoring</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">How can I track my token usage?</h3>
            <p className="text-gray-600 mb-3">Fusion AI provides detailed usage analytics:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Real-time dashboard with current usage</li>
              <li>• Daily, weekly, and monthly usage reports</li>
              <li>• Cost breakdown by model and provider</li>
              <li>• Usage alerts and budget limits</li>
              <li>• Export usage data as CSV</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Can I set usage limits?</h3>
            <p className="text-gray-600 mb-3">Yes! You can set various limits:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Soft Limits (Alerts)</h4>
                <ul className="text-sm text-gray-600">
                  <li>• Daily/monthly spend alerts</li>
                  <li>• Token usage warnings</li>
                  <li>• Email notifications</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Hard Limits (Stop)</h4>
                <ul className="text-sm text-gray-600">
                  <li>• Maximum daily spend</li>
                  <li>• Request rate limits</li>
                  <li>• Auto-pause on budget</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Issues</h2>
        
        <div className="space-y-4">
          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Why is my token count higher than expected?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="mb-2">Several factors can increase token usage:</p>
              <ul className="space-y-1">
                <li>• System messages and conversation history count as tokens</li>
                <li>• Special characters and formatting may increase token count</li>
                <li>• Different languages have different token densities</li>
                <li>• Model-specific tokenization can vary slightly</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              How can I reduce token usage?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="space-y-1">
                <li>• Use NeuroSwitch™ for automatic cost optimization</li>
                <li>• Keep prompts concise and clear</li>
                <li>• Use prompt caching for repeated requests</li>
                <li>• Choose appropriate models for your use case</li>
                <li>• Limit conversation history in chat applications</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Do failed requests still consume tokens?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>Generally no, but it depends on when the failure occurs:</p>
              <ul className="space-y-1 mt-2">
                <li>• Authentication errors: No tokens consumed</li>
                <li>• Rate limit errors: No tokens consumed</li>
                <li>• Model errors after processing: Tokens may be consumed</li>
                <li>• Partial responses: Only consumed tokens are charged</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* Next Steps */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Learn More</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/docs/overview/neuroswitch" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">NeuroSwitch™ Technology</h3>
            </div>
            <p className="text-gray-600 text-sm">Learn how intelligent routing saves you money.</p>
          </Link>

          <Link href="/docs/models/comparison" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <Calculator className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Model Pricing</h3>
            </div>
            <p className="text-gray-600 text-sm">Compare costs across different AI models.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 