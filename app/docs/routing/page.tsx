import React from 'react';
import Link from 'next/link';
import { Route, Brain, Shield, Zap, CheckCircle, AlertTriangle, Code, ArrowRight, RefreshCcw, Target, TrendingUp, Clock, Globe } from 'lucide-react';

export const metadata = {
  title: 'Model Routing - Fusion AI Documentation',
  description: 'Learn how NeuroSwitch intelligently routes requests, handles provider failover, and see real-world routing examples and configurations.',
};

export default function RoutingPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Routing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how NeuroSwitch's intelligent routing engine selects the optimal AI provider 
          for each request, with built-in failover and sophisticated routing strategies.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-200">
        <div className="flex items-start space-x-3 mb-6">
          <Brain className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Request Routing</h2>
            <p className="text-gray-700">
              NeuroSwitch analyzes every request in real-time, considering prompt complexity, model capabilities, 
              cost constraints, and performance requirements to route to the optimal provider automatically.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Smart Analysis</h3>
            <p className="text-sm text-gray-600">Prompt classification & routing</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Automatic Failover</h3>
            <p className="text-sm text-gray-600">99.9% uptime guarantee</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Custom Rules</h3>
            <p className="text-sm text-gray-600">Flexible routing strategies</p>
          </div>
        </div>
      </section>

      {/* How NeuroSwitch Routes Section */}
      <section id="neuroswitch" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">How NeuroSwitch Routes</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          NeuroSwitch uses advanced AI to analyze your prompts and automatically select the best provider based on 
          content type, complexity, cost considerations, and real-time performance metrics.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Routing Decision Factors</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Prompt Classification:</span>
                    <span className="text-gray-600"> Code, creative, analytical, conversational, or technical</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Complexity Analysis:</span>
                    <span className="text-gray-600"> Token length, reasoning requirements, context window needs</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Model Capabilities:</span>
                    <span className="text-gray-600"> Strengths in specific domains and task types</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Performance Metrics:</span>
                    <span className="text-gray-600"> Real-time latency, success rates, and quality scores</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Cost Optimization:</span>
                    <span className="text-gray-600"> Provider pricing and user-defined cost preferences</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Routing Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Prompt Analysis</h4>
                    <p className="text-sm text-gray-600">NeuroSwitch analyzes prompt content, length, and complexity in milliseconds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Provider Scoring</h4>
                    <p className="text-sm text-gray-600">Each available provider receives a score based on suitability and constraints</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Optimal Selection</h4>
                    <p className="text-sm text-gray-600">Highest-scoring provider is selected and request is routed instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">NeuroSwitch in Action</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# NeuroSwitch automatically routes based on content
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Write a Python function to sort a list"
      }
    ],
    "provider": "neuroswitch"
  }'

# Response includes routing information
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "model": "gpt-4",
  "routing": {
    "selected_provider": "openai",
    "reason": "Code generation task, high accuracy required",
    "confidence": 0.94,
    "alternatives": ["anthropic", "google"],
    "processing_time_ms": 23
  },
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "def sort_list(arr):\\n    return sorted(arr)"
      }
    }
  ]
}`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              NeuroSwitch selected OpenAI for this coding task based on optimization for accuracy.
            </p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-4">Model Specialization Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 font-medium text-gray-900">Task Type</th>
                  <th className="text-center py-2 font-medium text-gray-900">GPT-4</th>
                  <th className="text-center py-2 font-medium text-gray-900">Claude 3.5</th>
                  <th className="text-center py-2 font-medium text-gray-900">Gemini Pro</th>
                  <th className="text-center py-2 font-medium text-gray-900">Cost Ranking</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="py-2">Code Generation</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">🟡 Good</td>
                  <td className="text-center py-2">🟡 Good</td>
                  <td className="text-center py-2">$$</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Creative Writing</td>
                  <td className="text-center py-2">🟡 Good</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">🟡 Good</td>
                  <td className="text-center py-2">$$$</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Data Analysis</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">🟡 Good</td>
                  <td className="text-center py-2">$$</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Summarization</td>
                  <td className="text-center py-2">🟡 Good</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">$</td>
                </tr>
                <tr>
                  <td className="py-2">Conversation</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">🟢 Excellent</td>
                  <td className="text-center py-2">🟡 Good</td>
                  <td className="text-center py-2">$</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            NeuroSwitch uses this knowledge to automatically select the best provider for each task type.
          </p>
        </div>
      </section>

      {/* Provider Failover Section */}
      <section id="failover" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <RefreshCcw className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Provider Failover</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Ensure maximum uptime with intelligent failover mechanisms that automatically detect issues 
          and route to backup providers without interrupting your application flow.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Failover Triggers</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Service Outages:</span>
                    <span className="text-gray-600"> Complete provider API unavailability</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Rate Limiting:</span>
                    <span className="text-gray-600"> API quota exceeded or temporary limits</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Timeout Errors:</span>
                    <span className="text-gray-600"> Requests exceeding response time thresholds</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Error Rates:</span>
                    <span className="text-gray-600"> High frequency of 4xx/5xx response codes</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Model Unavailable:</span>
                    <span className="text-gray-600"> Specific model temporarily offline</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Failover Strategy</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🎯 Smart Backup Selection</h4>
                  <p className="text-sm text-gray-600">
                    NeuroSwitch automatically selects the next best provider based on task compatibility and performance.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🔄 Context Preservation</h4>
                  <p className="text-sm text-gray-600">
                    Full conversation history and system prompts are maintained across provider switches.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">⚡ Instant Recovery</h4>
                  <p className="text-sm text-gray-600">
                    Failover happens in under 200ms with no user-visible interruption.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Failover Response</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Request with automatic failover
{
  "id": "chatcmpl-xyz789",
  "object": "chat.completion",
  "model": "claude-3.5-sonnet",
  "routing": {
    "selected_provider": "anthropic",
    "reason": "Primary provider (OpenAI) rate limited",
    "failover_chain": [
      {
        "provider": "openai",
        "status": "rate_limited",
        "attempted_at": "2024-01-15T10:30:15Z"
      },
      {
        "provider": "anthropic", 
        "status": "success",
        "selected_at": "2024-01-15T10:30:15.180Z"
      }
    ],
    "total_failover_time_ms": 180
  },
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "I'll help you with that task..."
      }
    }
  ]
}`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              Transparent failover with detailed routing information included in response.
            </p>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <h4 className="font-semibold text-gray-900 mb-4">Failover Performance Metrics</h4>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">&lt; 200ms</h5>
              <p className="text-sm text-gray-600">Average failover time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">99.99%</h5>
              <p className="text-sm text-gray-600">Success rate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">3-5</h5>
              <p className="text-sm text-gray-600">Backup providers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCcw className="w-6 h-6 text-purple-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Auto</h5>
              <p className="text-sm text-gray-600">Recovery detection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Routing Examples Section */}
      <section id="examples" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Routing Examples</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Explore real-world routing configurations and examples showing how to customize NeuroSwitch 
          behavior for different use cases and requirements.
        </p>

        <div className="space-y-8">
          {/* Cost-Optimized Routing */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 Cost-Optimized Routing</h3>
            <p className="text-gray-600 mb-4">
              Route to the cheapest available provider that meets quality requirements.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-4 text-white">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Configuration</h4>
                <pre className="text-xs text-green-400 overflow-x-auto">
{`{
  "routing_strategy": "cost_optimized",
  "constraints": {
    "max_cost_per_1k_tokens": 0.01,
    "min_quality_score": 0.8
  },
  "provider_preferences": [
    {
      "provider": "google",
      "weight": 1.0,
      "cost_multiplier": 0.5
    },
    {
      "provider": "anthropic", 
      "weight": 0.8,
      "cost_multiplier": 1.0
    },
    {
      "provider": "openai",
      "weight": 0.6, 
      "cost_multiplier": 1.5
    }
  ]
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Use Cases</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High-volume content generation</li>
                  <li>• Basic summarization tasks</li>
                  <li>• Simple Q&A applications</li>
                  <li>• Development and testing environments</li>
                </ul>
                <h4 className="font-medium text-gray-900 mb-3 mt-4">Expected Behavior</h4>
                <p className="text-sm text-gray-600">
                  NeuroSwitch will prefer Google's Gemini for most tasks due to lower cost, 
                  falling back to Anthropic or OpenAI only when quality requirements demand it.
                </p>
              </div>
            </div>
          </div>

          {/* Performance-First Routing */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Performance-First Routing</h3>
            <p className="text-gray-600 mb-4">
              Prioritize speed and low latency for real-time applications.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-4 text-white">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Configuration</h4>
                <pre className="text-xs text-green-400 overflow-x-auto">
{`{
  "routing_strategy": "performance_first",
  "constraints": {
    "max_latency_ms": 1500,
    "min_tokens_per_second": 50
  },
  "performance_weights": {
    "latency": 0.6,
    "throughput": 0.3,
    "availability": 0.1
  },
  "regional_preferences": {
    "primary_region": "us-east-1",
    "fallback_regions": ["us-west-2", "eu-west-1"]
  }
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Use Cases</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time chat applications</li>
                  <li>• Live coding assistants</li>
                  <li>• Interactive gaming NPCs</li>
                  <li>• Streaming content generation</li>
                </ul>
                <h4 className="font-medium text-gray-900 mb-3 mt-4">Expected Behavior</h4>
                <p className="text-sm text-gray-600">
                  Routes to geographically closest providers with best latency metrics, 
                  automatically switching if performance degrades.
                </p>
              </div>
            </div>
          </div>

          {/* Quality-Focused Routing */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Quality-Focused Routing</h3>
            <p className="text-gray-600 mb-4">
              Route to providers with highest accuracy for specific domains.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-4 text-white">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Configuration</h4>
                <pre className="text-xs text-green-400 overflow-x-auto">
{`{
  "routing_strategy": "quality_focused",
  "domain_routing": {
    "code_generation": {
      "primary": "openai",
      "fallback": ["anthropic", "google"]
    },
    "creative_writing": {
      "primary": "anthropic", 
      "fallback": ["openai", "google"]
    },
    "data_analysis": {
      "primary": "openai",
      "fallback": ["anthropic"]
    }
  },
  "quality_thresholds": {
    "min_confidence": 0.9,
    "max_error_rate": 0.05
  }
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Use Cases</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Professional content creation</li>
                  <li>• Code review and generation</li>
                  <li>• Technical documentation</li>
                  <li>• Research and analysis</li>
                </ul>
                <h4 className="font-medium text-gray-900 mb-3 mt-4">Expected Behavior</h4>
                <p className="text-sm text-gray-600">
                  Automatically detects content type and routes to the provider with best 
                  performance for that specific domain.
                </p>
              </div>
            </div>
          </div>

          {/* Custom Weighted Routing */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚖️ Custom Weighted Routing</h3>
            <p className="text-gray-600 mb-4">
              Balance multiple factors with custom weights for your specific needs.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-4 text-white">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Configuration</h4>
                <pre className="text-xs text-green-400 overflow-x-auto">
{`{
  "routing_strategy": "weighted",
  "scoring_weights": {
    "quality": 0.4,
    "cost": 0.3, 
    "speed": 0.2,
    "availability": 0.1
  },
  "providers": {
    "openai": {
      "quality_score": 0.95,
      "cost_score": 0.6,
      "speed_score": 0.8,
      "availability_score": 0.99
    },
    "anthropic": {
      "quality_score": 0.92,
      "cost_score": 0.7,
      "speed_score": 0.85,
      "availability_score": 0.98  
    }
  }
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Use Cases</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Enterprise applications</li>
                  <li>• Multi-tenant platforms</li>
                  <li>• Custom SLA requirements</li>
                  <li>• Complex business logic</li>
                </ul>
                <h4 className="font-medium text-gray-900 mb-3 mt-4">Expected Behavior</h4>
                <p className="text-sm text-gray-600">
                  Calculates weighted scores for each provider based on your criteria and 
                  selects the highest-scoring option for each request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Guide */}
      <section className="bg-blue-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Routing Configuration</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
            <div className="bg-gray-900 rounded-lg p-4 text-white">
              <pre className="text-sm text-green-400 overflow-x-auto">
{`# Set custom routing strategy
curl -X POST https://api.mcp4.ai/v1/routing/config \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -d '{
    "default_strategy": "cost_optimized",
    "fallback_strategy": "performance_first",
    "override_rules": [
      {
        "condition": "prompt_length > 1000",
        "strategy": "quality_focused"
      },
      {
        "condition": "domain == code",
        "preferred_provider": "openai"
      }
    ]
  }'`}
              </pre>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Settings</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Configure routing strategies through web interface
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Set budget limits and cost controls
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Monitor routing performance and costs
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                A/B test different routing configurations
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                href="/dashboard/routing" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Configure Routing Settings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/docs/overview/neuroswitch" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Brain className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">NeuroSwitch Technology</h3>
              <p className="text-sm text-gray-600">Deep dive into routing algorithms</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/providers#fallback" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <RefreshCcw className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Provider Fallback Rules</h3>
              <p className="text-sm text-gray-600">Configure custom fallback chains</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/api/parameters" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Code className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">API Parameters</h3>
              <p className="text-sm text-gray-600">Routing-related API options</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/models/comparison" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Target className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Model Comparison</h3>
              <p className="text-sm text-gray-600">Compare provider capabilities</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/features/caching" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Zap className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Performance Optimization</h3>
              <p className="text-sm text-gray-600">Caching and speed improvements</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/privacy/logging" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Globe className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Regional Routing</h3>
              <p className="text-sm text-gray-600">Data residency and compliance</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
} 