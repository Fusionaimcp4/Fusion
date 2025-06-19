import React from 'react';
import Link from 'next/link';
import { Brain, Zap, Target, BarChart3, ArrowRight, CheckCircle, Layers } from 'lucide-react';

export default function NeuroSwitchPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How NeuroSwitch™ Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the intelligent routing technology that automatically selects the best AI model for your specific needs.
        </p>
      </div>

      {/* What is NeuroSwitch */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <div className="flex items-center mb-6">
          <Brain className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">What is NeuroSwitch™?</h2>
        </div>
        
        <p className="text-lg text-gray-600 mb-6">
          NeuroSwitch is our proprietary AI routing engine that analyzes your prompts in real-time and automatically 
          selects the most suitable model from our network of AI providers. Think of it as an intelligent traffic 
          controller for AI requests.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <Target className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Smart Analysis</h3>
            <p className="text-gray-600 text-sm">Analyzes prompt characteristics, complexity, and domain</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <Zap className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Instant Routing</h3>
            <p className="text-gray-600 text-sm">Routes to optimal model in milliseconds</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Continuous Learning</h3>
            <p className="text-gray-600 text-sm">Improves routing decisions based on performance data</p>
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">The NeuroSwitch Process</h2>
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prompt Analysis</h3>
            <p className="text-gray-600 text-sm">
              NeuroSwitch analyzes your prompt's language, complexity, domain, task type, and intent using advanced NLP techniques.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Model Scoring</h3>
            <p className="text-gray-600 text-sm">
              Each available model is scored based on its strengths for your specific request type, considering accuracy and performance metrics.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Routing</h3>
            <p className="text-gray-600 text-sm">
              The highest-scoring model is selected, factoring in real-time availability, cost efficiency, and response speed.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Delivery</h3>
            <p className="text-gray-600 text-sm">
              Your request is processed by the optimal model and returned with full transparency about the routing decision.
            </p>
          </div>
        </div>
      </section>

      {/* Routing Factors */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What NeuroSwitch Considers</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Prompt Characteristics</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Task Type:</span>
                  <span className="text-gray-600 ml-2">Coding, writing, analysis, math, etc.</span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Complexity:</span>
                  <span className="text-gray-600 ml-2">Simple questions vs. complex reasoning</span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Domain:</span>
                  <span className="text-gray-600 ml-2">Technical, creative, academic, conversational</span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Length:</span>
                  <span className="text-gray-600 ml-2">Short queries vs. long documents</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Model Performance</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Capability Match:</span>
                  <span className="text-gray-600 ml-2">Model strengths for specific tasks</span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Response Speed:</span>
                  <span className="text-gray-600 ml-2">Real-time latency measurements</span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Availability:</span>
                  <span className="text-gray-600 ml-2">Current provider status and load</span>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Cost Efficiency:</span>
                  <span className="text-gray-600 ml-2">Token usage and pricing optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Session Continuity Example */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Session Continuity in Action</h2>
        
        <p className="text-gray-600 mb-6">
          What makes NeuroSwitch truly powerful is that continuity is preserved across providers. It doesn't matter which AI answers the question—the system maintains context seamlessly. Each model responds as if it's part of one unified intelligence.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Real Conversation Example</h3>
          <div className="space-y-4 text-sm">
            
            {/* User Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium text-xs">You</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800">"I just summarized the privacy policy and it's insane—my smart fridge can sue me"</p>
              </div>
            </div>

            {/* Claude Response */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-medium text-xs">Claude</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 italic">Based on my research, your concern about the smart fridge's privacy policy is well-founded. Modern smart refrigerators collect significant amounts of data and often come with complex legal terms that can include mandatory arbitration clauses...</p>
                <p className="text-xs text-gray-500 mt-2">• Provided detailed legal analysis of smart appliance privacy issues</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium text-xs">You</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800">"What should I cook to impress my new AI overlord houseguest?"</p>
              </div>
            </div>

            {/* Gemini Response */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-medium text-xs">Gemini</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 italic">Since you're aiming to impress an AI overlord, you'll want to showcase something that reflects both sophistication and efficiency. Here are a few ideas: perfectly seared scallops with lemon-butter sauce, pan-seared salmon with roasted vegetables...</p>
                <p className="text-xs text-gray-500 mt-2">• Switched context to cooking while maintaining the playful "AI overlord" theme</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium text-xs">You</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800">"Write a blog post about the night I cooked for my AI overlord. Make it sound edgy and dramatic, like a cyberpunk dinner party—but keep the recipes and mood Gemini suggested"</p>
              </div>
            </div>

            {/* OpenAI Response */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-medium text-xs">GPT-4</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 italic">"Title: The Night I Dined with My AI Overlord: A Cyberpunk Culinary Adventure... In the neon-lit sprawl of the city, where skyscrapers pierce the smog-laden sky..."</p>
                <p className="text-xs text-gray-500 mt-2">• Referenced Gemini's specific suggestions while creating dramatic cyberpunk narrative</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-medium text-xs">You</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800">"Can you summarize everything we've discussed so far in two sentences?"</p>
              </div>
            </div>

            {/* Claude Response Again */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-medium text-xs">Claude</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 italic">"In our whimsical exchange, we first discussed your concerns about a rather dystopian smart fridge privacy policy that apparently gives your appliance legal rights against you, and then pivoted to an imaginative scenario about cooking for an AI overlord houseguest..."</p>
                <p className="text-xs text-gray-500 mt-2">• Perfectly summarized the entire multi-provider conversation despite not handling the middle parts</p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-2">What Makes This Remarkable</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2 mt-1">•</span>
              <span><strong>4 different AI models</strong> handled this conversation seamlessly</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2 mt-1">•</span>
              <span><strong>Perfect context preservation</strong> across provider switches</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2 mt-1">•</span>
              <span><strong>Models don't know</strong> which provider handled previous messages</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2 mt-1">•</span>
              <span><strong>Feels like one unified intelligence</strong> rather than separate systems</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2 mt-1">•</span>
              <span><strong>Works like a mini-AGI:</strong> collaborative, context-aware, and intelligent across boundaries</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Routing Examples */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Routing Examples</h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Code Questions</h3>
            <div className="bg-gray-50 rounded p-3 mb-3">
              <p className="text-sm text-gray-700 italic">"Write a Python function to sort a list"</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Likely routes to:</strong> Claude 3 Sonnet
            </p>
            <p className="text-xs text-gray-500">
              Reason: Claude excels at code generation and follows best practices
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Creative Writing</h3>
            <div className="bg-gray-50 rounded p-3 mb-3">
              <p className="text-sm text-gray-700 italic">"Write a short story about time travel"</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Likely routes to:</strong> GPT-4 Turbo
            </p>
            <p className="text-xs text-gray-500">
              Reason: GPT-4 demonstrates superior creative writing abilities
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Math Problems</h3>
            <div className="bg-gray-50 rounded p-3 mb-3">
              <p className="text-sm text-gray-700 italic">"Solve this calculus equation: ∫x²dx"</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Likely routes to:</strong> Gemini 1.5 Pro
            </p>
            <p className="text-xs text-gray-500">
              Reason: Gemini shows strong mathematical reasoning capabilities
            </p>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Architecture</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Classifier Technology</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Layers className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Fine-tuned Neural Network</p>
                  <p className="text-gray-600 text-sm">Trained on millions of prompt-model performance pairs</p>
                </div>
              </div>
              <div className="flex items-start">
                <Layers className="w-5 h-5 text-green-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Real-time Features</p>
                  <p className="text-gray-600 text-sm">Considers current model availability and response times</p>
                </div>
              </div>
              <div className="flex items-start">
                <Layers className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Continuous Learning</p>
                  <p className="text-gray-600 text-sm">Updates routing decisions based on actual performance</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Routing Accuracy</span>
                <span className="font-medium text-green-600">96.3%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Average Decision Time</span>
                <span className="font-medium text-blue-600">&lt;50ms</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Cost Optimization</span>
                <span className="font-medium text-purple-600">23% savings</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Model Coverage</span>
                <span className="font-medium text-orange-600">15+ models</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why NeuroSwitch Matters</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </span>
              For Users
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-sm">No need to research which model works best</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-sm">Optimal results for every type of request</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-sm">Automatic cost optimization</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-sm">Transparent routing decisions</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </span>
              For Developers
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm">Single API endpoint for all AI models</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm">Automatic failover and load balancing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm">Performance analytics and insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-sm">Future-proof against model changes</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience NeuroSwitch in Action</h2>
        <p className="text-gray-600 mb-6">
          Try NeuroSwitch today and see how intelligent routing can improve your AI experience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Try NeuroSwitch
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/quickstart/first-call" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            See Examples
          </Link>
        </div>
      </section>
    </div>
  );
} 