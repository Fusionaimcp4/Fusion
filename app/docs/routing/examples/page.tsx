import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Target, Code } from 'lucide-react';

export const metadata = {
  title: 'Routing Examples - Fusion AI Documentation',
  description: 'Real-world examples of how NeuroSwitch™ automatically routes requests to the optimal AI model based on task type, complexity, and requirements.',
};

export default function RoutingExamplesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Routing Examples</h1>
        <p className="text-lg text-gray-600">
          See how NeuroSwitch™ intelligently routes different types of requests to the optimal AI model for cost and performance.
        </p>
      </div>

      {/* Quick Tasks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Tasks → Claude 3 Haiku</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">Fast & Cost-Effective</span>
          </div>
          
          <p className="text-gray-600 mb-6">
            Simple queries that need quick responses are automatically routed to Claude 3 Haiku for optimal speed and cost.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: Quick Translation</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Translate 'Hello world' to Spanish"
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    Claude 3 Haiku
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.0001 cost, 200ms response</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: Simple Classification</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Is this email spam: 'Limited time offer...'"
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    Claude 3 Haiku
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.0002 cost, 150ms response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complex Analysis */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complex Analysis → GPT-4</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Deep Reasoning Required</span>
          </div>
          
          <p className="text-gray-600 mb-6">
            Complex reasoning tasks that require advanced capabilities are routed to GPT-4 for the best results.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: Strategic Analysis</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Analyze the competitive landscape for SaaS companies in 2024 and provide strategic recommendations..."
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    GPT-4 Turbo
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.03 cost, 3s response</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: Code Architecture</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Design a microservices architecture for a social media platform with 10M users..."
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    GPT-4 Turbo
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.05 cost, 4s response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Tasks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Creative Writing → Claude 3 Sonnet</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Balanced Creativity & Safety</span>
          </div>
          
          <p className="text-gray-600 mb-6">
            Creative writing and content generation tasks are routed to Claude 3 Sonnet for excellent balance of creativity and safety.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: Blog Post</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Write a 1000-word blog post about sustainable farming practices..."
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    Claude 3 Sonnet
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.015 cost, 2s response</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: Marketing Copy</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Create compelling email subject lines for a product launch campaign..."
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    Claude 3 Sonnet
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.005 cost, 1s response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Generation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Generation → Gemini Pro</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-gray-900">Optimized for Code</span>
          </div>
          
          <p className="text-gray-600 mb-6">
            Code generation and programming tasks often route to Gemini Pro for excellent coding capabilities.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: Function Implementation</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Write a Python function to validate email addresses with regex..."
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                    Gemini Pro
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.002 cost, 800ms response</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example: API Documentation</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Request:</p>
                  <code className="text-sm bg-white p-2 rounded border block">
                    "Generate OpenAPI spec for a user management REST API..."
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">NeuroSwitch™ Route:</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                    Gemini Pro
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~$0.008 cost, 1.5s response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routing Logic */}
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">How NeuroSwitch™ Decides</h3>
          <div className="space-y-3 text-blue-800">
            <p><strong>Task Complexity:</strong> Simple queries → Haiku, Complex reasoning → GPT-4</p>
            <p><strong>Content Type:</strong> Creative writing → Sonnet, Code → Gemini Pro</p>
            <p><strong>Speed Requirements:</strong> Real-time needs → Faster models</p>
            <p><strong>Cost Optimization:</strong> Balances performance with cost efficiency</p>
            <p><strong>Safety Requirements:</strong> High-risk content → Claude models</p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Learn More</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/docs/overview/neuroswitch" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">How NeuroSwitch™ Works</h3>
            </div>
            <p className="text-gray-600 text-sm">Deep dive into the technology behind intelligent routing.</p>
          </Link>

          <Link href="/docs/quickstart/first-call" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <ArrowRight className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Try It Yourself</h3>
            </div>
            <p className="text-gray-600 text-sm">Make your first API call and see routing in action.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 