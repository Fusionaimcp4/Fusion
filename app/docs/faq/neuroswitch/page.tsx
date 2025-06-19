import React from 'react';
import Link from 'next/link';
import { Brain, Zap, TrendingUp, CheckCircle, ArrowRight, AlertCircle, Info, Target, Shield, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'NeuroSwitch™ FAQ - Fusion AI Documentation',
  description: 'Frequently asked questions about NeuroSwitch™ intelligent routing technology and how it works.',
};

export default function NeuroSwitchFAQPage() {
  const basicQuestions = [
    {
      question: "What is NeuroSwitch?",
      answer: "NeuroSwitch is Fusion AI's intelligent routing system that automatically selects the best AI model for each request. It analyzes your prompt, considers factors like complexity, domain, cost, and performance to route your request to the optimal provider."
    },
    {
      question: "How does NeuroSwitch choose which model to use?",
      answer: "NeuroSwitch uses machine learning to analyze your prompt's characteristics - complexity, domain (code, creative writing, analysis, etc.), length, and context. It then matches these to the strengths of available models while considering your preferences for cost vs quality."
    },
    {
      question: "Can I still choose a specific model manually?",
      answer: "Yes! You can override NeuroSwitch by specifying a provider parameter like 'openai', 'claude', or 'gemini'. NeuroSwitch is used when you set provider to 'neuroswitch' or omit the provider parameter entirely."
    }
  ];

  const routingFactors = [
    {
      title: "Prompt Complexity",
      description: "Analyzes reasoning depth, multi-step tasks, and complexity requirements",
      icon: <Brain className="w-5 h-5" />,
      examples: ["Simple Q&A → GPT-3.5 Turbo", "Complex reasoning → Claude 3 Opus", "Math problems → GPT-4"]
    },
    {
      title: "Domain Classification",
      description: "Identifies the subject area and matches to model strengths",
      icon: <Target className="w-5 h-5" />,
      examples: ["Code generation → GPT-4", "Creative writing → Claude", "Data analysis → GPT-4"]
    },
    {
      title: "Cost Optimization",
      description: "Balances quality needs with cost efficiency",
      icon: <TrendingUp className="w-5 h-5" />,
      examples: ["Simple tasks → cheaper models", "Critical work → premium models", "Batch jobs → optimized routing"]
    }
  ];

  const advancedQuestions = [
    {
      question: "How accurate is NeuroSwitch routing?",
      answer: "NeuroSwitch achieves 92% accuracy in selecting the optimal model based on quality benchmarks and cost efficiency. It continuously learns from usage patterns and feedback to improve routing decisions."
    },
    {
      question: "Does NeuroSwitch consider my previous conversations?",
      answer: "Yes, NeuroSwitch maintains session context and will route follow-up messages in a conversation to the same model to maintain consistency, unless there's a significant change in requirements."
    },
    {
      question: "Can I provide hints to influence NeuroSwitch decisions?",
      answer: "You can use prompt prefixes like 'For creative writing:', 'Code generation:', or 'Complex analysis:' to help NeuroSwitch understand your intent and route accordingly."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">NeuroSwitch™ FAQ</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about our intelligent AI routing technology.
        </p>
      </div>

      {/* What is NeuroSwitch */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What is NeuroSwitch™?</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <Brain className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Intelligent AI Routing</h3>
              <p className="text-blue-800 mb-4">
                NeuroSwitch™ is our proprietary technology that automatically analyzes your request and routes it to the optimal AI model. 
                It considers factors like task complexity, content type, speed requirements, and cost to make the best choice for each query.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">How it helps:</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• 40-60% cost savings on average</li>
                    <li>• Faster responses for simple tasks</li>
                    <li>• Better quality for complex tasks</li>
                    <li>• No manual model selection needed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">What it analyzes:</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Query complexity and intent</li>
                    <li>• Content type (code, creative, analysis)</li>
                    <li>• Speed vs quality requirements</li>
                    <li>• Cost optimization preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How Does NeuroSwitch™ Work?</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">The Classification Process</h3>
                <p className="text-gray-600 mb-4">
                  NeuroSwitch™ uses a fine-tuned zero-shot classifier based on BART-large-mnli that runs locally on our servers. 
                  This means your prompts are classified for routing without being sent to external services.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Step-by-step process:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Analyze your request intent and complexity</li>
                    <li>Classify content type (creative, analytical, code, etc.)</li>
                    <li>Check your preferences and requirements</li>
                    <li>Select optimal model based on performance data</li>
                    <li>Route request to chosen model</li>
                    <li>Monitor performance and adjust future routing</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy & Security</h3>
                <p className="text-gray-600 mb-3">
                  Your privacy is protected throughout the routing process:
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Classification happens locally on our servers</li>
                  <li>• No prompts sent to external classification services</li>
                  <li>• Routing decisions are made in real-time</li>
                  <li>• No additional latency for privacy protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Can I override NeuroSwitch™ and choose my own model?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="mb-2">
                Yes! You have full control over model selection. You can:
              </p>
              <ul className="space-y-1">
                <li>• Specify a particular model in your API request</li>
                <li>• Set provider preferences (only OpenAI, only Claude, etc.)</li>
                <li>• Use NeuroSwitch™ as a fallback option</li>
                <li>• Configure routing rules in your dashboard</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              How accurate is NeuroSwitch™ at choosing the right model?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="mb-2">
                NeuroSwitch™ achieves 94% accuracy in optimal model selection based on our benchmarks:
              </p>
              <ul className="space-y-1">
                <li>• 96% accuracy for simple classification tasks</li>
                <li>• 93% accuracy for creative writing tasks</li>
                <li>• 92% accuracy for complex reasoning tasks</li>
                <li>• 95% accuracy for code generation tasks</li>
              </ul>
              <p className="mt-2">
                The system continuously learns and improves from usage patterns and feedback.
              </p>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Does NeuroSwitch™ add latency to my requests?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="mb-2">
                NeuroSwitch™ adds minimal latency - typically 10-50ms for classification:
              </p>
              <ul className="space-y-1">
                <li>• Classification happens in parallel with request processing</li>
                <li>• Local processing means no external API calls</li>
                <li>• Often saves time by choosing faster models for simple tasks</li>
                <li>• Net result is usually faster overall response times</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              What happens if NeuroSwitch™ chooses wrong?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="mb-2">
                We have several safeguards and recovery mechanisms:
              </p>
              <ul className="space-y-1">
                <li>• Automatic fallback to higher-capability models if initial response is inadequate</li>
                <li>• Feedback system to improve future routing decisions</li>
                <li>• Manual override options in your dashboard</li>
                <li>• Quality monitoring and automatic rebalancing</li>
                <li>• Option to always use premium models for critical applications</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Can I see which model NeuroSwitch™ chose for my request?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="mb-2">
                Yes! Full transparency is provided in every response:
              </p>
              <ul className="space-y-1">
                <li>• Model name in response headers</li>
                <li>• Routing reason in API response metadata</li>
                <li>• Cost breakdown by model in usage dashboard</li>
                <li>• Historical routing decisions in analytics</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Does NeuroSwitch™ work with BYOAPI (Bring Your Own API Keys)?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-200">
              <p className="mb-2">
                Absolutely! NeuroSwitch™ works seamlessly with your own API keys:
              </p>
              <ul className="space-y-1">
                <li>• Routes between your connected providers (OpenAI, Anthropic, Google)</li>
                <li>• Respects your provider preferences and rate limits</li>
                <li>• Optimizes costs using your direct provider pricing</li>
                <li>• Falls back gracefully if a provider is unavailable</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* Performance Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">NeuroSwitch™ in Action</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Speed Optimization</h3>
            </div>
            <p className="text-green-800 text-sm mb-3">
              "Translate 'hello' to French" → Claude 3 Haiku
            </p>
            <div className="space-y-1 text-xs text-green-700">
              <p>• Response time: 180ms</p>
              <p>• Cost: $0.0001</p>
              <p>• Quality: Perfect for simple tasks</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Quality Optimization</h3>
            </div>
            <p className="text-blue-800 text-sm mb-3">
              "Analyze market trends..." → GPT-4 Turbo
            </p>
            <div className="space-y-1 text-xs text-blue-700">
              <p>• Response time: 3.2s</p>
              <p>• Cost: $0.05</p>
              <p>• Quality: Deep analysis required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Learn More About NeuroSwitch™</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/docs/overview/neuroswitch" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Technical Deep Dive</h3>
            </div>
            <p className="text-gray-600 text-sm">Learn how NeuroSwitch™ technology works under the hood.</p>
          </Link>

          <Link href="/docs/routing/examples" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <ArrowRight className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Routing Examples</h3>
            </div>
            <p className="text-gray-600 text-sm">See real examples of how NeuroSwitch™ routes different types of requests.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 