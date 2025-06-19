'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Brain, Shield, Zap, Clock, DollarSign, Key } from 'lucide-react';

export default function FAQPage() {
  const faqSections = [
    {
      title: "Getting Started",
      icon: Zap,
      color: "blue",
      faqs: [
        {
          question: "What is Fusion AI?",
          answer: "Fusion AI is a unified AI orchestration platform that provides access to multiple AI providers (OpenAI, Claude, Gemini) through a single API. Our NeuroSwitch™ technology intelligently routes your requests to the optimal model based on your specific needs."
        },
        {
          question: "How do I get started?",
          answer: "Getting started is simple: 1) Sign up for an account, 2) Get your API key from the dashboard, 3) Make your first API call. New accounts come with free credits to test the platform."
        },
        {
          question: "Do I need a credit card to get started?",
          answer: "No! New accounts receive free credits to test the platform. You only need to add payment information when you want to purchase additional credits or upgrade to a paid plan."
        },
        {
          question: "Is Fusion AI compatible with OpenAI's API?",
          answer: "Yes! Fusion AI is designed as a drop-in replacement for OpenAI's API with enhanced features. You can switch your existing code with minimal changes."
        }
      ]
    },
    {
      title: "NeuroSwitch Technology",
      icon: Brain,
      color: "purple",
      faqs: [
        {
          question: "What is NeuroSwitch™?",
          answer: "NeuroSwitch™ is our proprietary routing engine that analyzes your prompt and automatically selects the best AI model for optimal results. It considers factors like prompt complexity, domain expertise, cost, and current model performance."
        },
        {
          question: "How does NeuroSwitch choose which model to use?",
          answer: "NeuroSwitch uses machine learning to analyze your prompt's characteristics (language, complexity, domain, task type) and routes to the model that performs best for similar requests. It also considers real-time factors like response speed and availability."
        },
        {
          question: "Can I see which model was used for my request?",
          answer: "Absolutely! Every response includes metadata showing which provider and model was used, along with the reasoning behind the routing decision. This transparency helps you understand and optimize your usage."
        },
        {
          question: "Can I override NeuroSwitch and choose a specific model?",
          answer: "Yes! While NeuroSwitch often provides the best results, you can specify a particular provider or model in your request parameters when you need specific behavior or consistency."
        }
      ]
    },
    {
      title: "Pricing & Credits",
      icon: DollarSign,
      color: "green",
      faqs: [
        {
          question: "How does pricing work?",
          answer: "Fusion AI uses a credit-based system. You purchase credits that are consumed based on token usage. NeuroSwitch routing is included at no extra cost and often reduces your overall costs by choosing the most efficient model."
        },
        {
          question: "What are tokens?",
          answer: "Tokens are units of text that AI models process. Roughly, 1 token ≈ 4 characters or ¾ of a word in English. Both your input (prompt) and output (response) consume tokens. Different models have different token costs."
        },
        {
          question: "Do I pay extra for NeuroSwitch routing?",
          answer: "No! NeuroSwitch routing is included at no additional cost. In fact, it often reduces your overall costs by selecting the most cost-effective model for each request while maintaining quality."
        },
        {
          question: "Can I use my own API keys (BYOAPI)?",
          answer: "Yes! Our BYOAPI feature lets you use your own API keys for direct billing while still benefiting from NeuroSwitch routing, failover protection, and our unified interface."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "red",
      faqs: [
        {
          question: "How secure is my data?",
          answer: "We take security seriously. All data is encrypted in transit and at rest. We use enterprise-grade security measures and comply with SOC 2 Type II standards. Your API keys are stored encrypted and never logged."
        },
        {
          question: "Do you store my prompts and responses?",
          answer: "By default, we temporarily cache some data for performance optimization, but we don't permanently store your prompts or responses unless you explicitly opt-in to data retention for features like conversation history."
        },
        {
          question: "Can I opt out of data logging?",
          answer: "Yes! You can configure your account to minimize data logging. Enterprise accounts can enable zero-logging mode where no request data is stored on our servers."
        },
        {
          question: "Where are your servers located?",
          answer: "Our infrastructure spans multiple regions including US, EU, and Asia-Pacific. You can specify region preferences for data processing compliance. Enterprise customers can request specific regional routing."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Clock,
      color: "yellow",
      faqs: [
        {
          question: "What are the rate limits?",
          answer: "Rate limits depend on your plan: Free tier (1,000 requests/hour), Pro tier (10,000 requests/hour), Enterprise (custom limits). Limits are enforced per API key and reset hourly."
        },
        {
          question: "What happens if a provider is down?",
          answer: "NeuroSwitch automatically detects provider outages and routes to alternative models. This failover is transparent to you - your request succeeds even if your preferred provider is temporarily unavailable."
        },
        {
          question: "Do you support streaming responses?",
          answer: "Yes! Set 'stream: true' in your request to receive real-time responses as they're generated. Streaming is supported across all providers through our unified interface."
        },
        {
          question: "Can I use Fusion AI for production applications?",
          answer: "Absolutely! Fusion AI is designed for production use with 99.9% uptime SLA, automatic failover, and enterprise-grade reliability. Many companies use us for their production AI workloads."
        }
      ]
    },
    {
      title: "API Keys & Authentication",
      icon: Key,
      color: "indigo",
      faqs: [
        {
          question: "How do I manage my API keys?",
          answer: "You can create, view, and manage your API keys in the dashboard. Each key can be named for easy identification, and you can deactivate keys that are no longer needed."
        },
        {
          question: "Can I have multiple API keys?",
          answer: "Yes! You can create multiple API keys for different applications or environments. Each key shares your account's credit balance and rate limits."
        },
        {
          question: "What should I do if my API key is compromised?",
          answer: "Immediately deactivate the compromised key in your dashboard and create a new one. Deactivated keys stop working immediately to prevent unauthorized usage."
        },
        {
          question: "Can I restrict API key permissions?",
          answer: "Enterprise accounts can set granular permissions on API keys, including allowed models, rate limits, and feature access. Contact support to enable advanced key management."
        }
      ]
    }
  ];

  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set(["Getting Started"]));
  const [expandedFAQs, setExpandedFAQs] = React.useState<Set<string>>(new Set());

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionTitle)) {
        newSet.delete(sectionTitle);
      } else {
        newSet.add(sectionTitle);
      }
      return newSet;
    });
  };

  const toggleFAQ = (faqKey: string) => {
    setExpandedFAQs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(faqKey)) {
        newSet.delete(faqKey);
      } else {
        newSet.add(faqKey);
      }
      return newSet;
    });
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      purple: "text-purple-600 bg-purple-50 border-purple-200",
      green: "text-green-600 bg-green-50 border-green-200",
      red: "text-red-600 bg-red-50 border-red-200",
      yellow: "text-yellow-600 bg-yellow-50 border-yellow-200",
      indigo: "text-indigo-600 bg-indigo-50 border-indigo-200"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about Fusion AI, NeuroSwitch, and our API.
        </p>
      </div>

      {/* Quick Links */}
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/docs/quickstart" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            🚀 Getting Started Guide
          </Link>
          <Link href="/docs/api" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            📤 API Reference
          </Link>
          <Link href="/docs/overview/neuroswitch" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            🧠 How NeuroSwitch Works
          </Link>
          <Link href="/docs/providers/byoapi" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            🔑 BYOAPI Setup
          </Link>
          <Link href="/docs/community/discord" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            💬 Join Discord
          </Link>
          <Link href="/docs/api/errors" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            🛠️ Troubleshooting
          </Link>
        </div>
      </section>

      {/* FAQ Sections */}
      <div className="space-y-4">
        {faqSections.map((section) => {
          const IconComponent = section.icon;
          const colorClasses = getColorClasses(section.color);
          const isExpanded = expandedSections.has(section.title);

          return (
            <div key={section.title} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <span className="text-sm text-gray-500">({section.faqs.length} questions)</span>
                  </div>
                  {isExpanded ? 
                    <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  }
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100">
                  {section.faqs.map((faq, index) => {
                    const faqKey = `${section.title}-${index}`;
                    const isFAQExpanded = expandedFAQs.has(faqKey);

                    return (
                      <div key={faqKey} className="border-b border-gray-50 last:border-b-0">
                        <button
                          onClick={() => toggleFAQ(faqKey)}
                          className="w-full px-6 py-4 text-left hover:bg-gray-25 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 pr-4">{faq.question}</h4>
                            {isFAQExpanded ? 
                              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : 
                              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            }
                          </div>
                        </button>

                        {isFAQExpanded && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Need Help */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? We're here to help you succeed with Fusion AI.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">💬 Join Discord</h3>
            <p className="text-gray-600 text-sm mb-3">
              Get help from our community and team in real-time.
            </p>
            <Link href="/docs/community/discord" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Join Discord →
            </Link>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">📧 Email Support</h3>
            <p className="text-gray-600 text-sm mb-3">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a href="mailto:support@mcp4.ai" className="text-green-600 hover:text-green-700 text-sm font-medium">
              support@mcp4.ai →
            </a>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Documentation</h3>
            <p className="text-gray-600 text-sm mb-3">
              Explore our comprehensive guides and API reference.
            </p>
            <Link href="/docs/api" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Browse Docs →
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">🚀 Getting Started</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/quickstart" className="text-blue-600 hover:text-blue-700 text-sm">
                  How to get your first API key
                </Link>
              </li>
              <li>
                <Link href="/docs/quickstart/first-call" className="text-blue-600 hover:text-blue-700 text-sm">
                  Making your first API call
                </Link>
              </li>
              <li>
                <Link href="/docs/quickstart/sdks" className="text-blue-600 hover:text-blue-700 text-sm">
                  Using SDKs and libraries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">🧠 NeuroSwitch</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/overview/neuroswitch" className="text-blue-600 hover:text-blue-700 text-sm">
                  How NeuroSwitch routing works
                </Link>
              </li>
              <li>
                <Link href="/docs/routing/examples" className="text-blue-600 hover:text-blue-700 text-sm">
                  Routing examples and patterns
                </Link>
              </li>
              <li>
                <Link href="/docs/models" className="text-blue-600 hover:text-blue-700 text-sm">
                  Available models and capabilities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">🔑 API Keys & Security</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/providers/byoapi" className="text-blue-600 hover:text-blue-700 text-sm">
                  Setting up BYOAPI keys
                </Link>
              </li>
              <li>
                <Link href="/docs/privacy/logging" className="text-blue-600 hover:text-blue-700 text-sm">
                  Privacy and data logging
                </Link>
              </li>
              <li>
                <Link href="/docs/api/auth" className="text-blue-600 hover:text-blue-700 text-sm">
                  Authentication and security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">⚡ Advanced Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/features/streaming" className="text-blue-600 hover:text-blue-700 text-sm">
                  Streaming responses
                </Link>
              </li>
              <li>
                <Link href="/docs/features/tools" className="text-blue-600 hover:text-blue-700 text-sm">
                  Function calling and tools
                </Link>
              </li>
              <li>
                <Link href="/docs/features/multimedia" className="text-blue-600 hover:text-blue-700 text-sm">
                  Image and PDF processing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 