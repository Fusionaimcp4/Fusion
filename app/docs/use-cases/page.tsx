import React from 'react';
import Link from 'next/link';
import { Users, Microscope, Rocket, Bot, Building, CheckCircle, ArrowRight, Code, Zap, Shield, Globe, Target, TrendingUp, Database } from 'lucide-react';

export const metadata = {
  title: 'Use Cases - Fusion AI Documentation',
  description: 'Discover how different audiences - researchers, startups, agents developers, and enterprises - leverage Fusion AI for their unique AI needs.',
};

export default function UseCasesPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Use Cases</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how teams across industries leverage Fusion AI's intelligent routing and multi-provider 
          architecture to build better AI applications faster.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <div className="flex items-start space-x-3 mb-6">
          <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Built for Every Team</h2>
            <p className="text-gray-700">
              From rapid research prototyping to enterprise-scale deployments, Fusion AI adapts to your workflow. 
              Our intelligent routing and comprehensive tooling support diverse use cases across all industries.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Microscope className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Researchers</h3>
            <p className="text-sm text-gray-600">Rapid experimentation</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Rocket className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Startups</h3>
            <p className="text-sm text-gray-600">Fast time-to-market</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Bot className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Agent Builders</h3>
            <p className="text-sm text-gray-600">Advanced tooling</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Building className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Enterprises</h3>
            <p className="text-sm text-gray-600">Scale & security</p>
          </div>
        </div>
      </section>

      {/* Researchers Section */}
      <section id="researchers" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Microscope className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">👩‍🔬 Researchers</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Accelerate your AI research with rapid prototyping across multiple models, reproducible experiments, 
          and powerful comparison tools. Perfect for academic research, model evaluation, and prompt engineering.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Capabilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Model Comparison:</span>
                    <span className="text-gray-600"> Test the same prompt across Claude, GPT-4, Gemini, and more</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Reproducible Experiments:</span>
                    <span className="text-gray-600"> Control conversation history and system instructions</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Behavioral Analysis:</span>
                    <span className="text-gray-600"> Test model behavior under various constraints</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Custom Tooling:</span>
                    <span className="text-gray-600"> Build specialized tools for research workflows</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Workflows</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🔬 Prompt Engineering</h4>
                  <p className="text-sm text-gray-600">
                    A/B test prompts across providers to find optimal formulations for specific tasks.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">📊 Model Evaluation</h4>
                  <p className="text-sm text-gray-600">
                    Compare model performance on benchmarks with consistent evaluation frameworks.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🧪 Hypothesis Testing</h4>
                  <p className="text-sm text-gray-600">
                    Test theories about model behavior with controlled experiments and data collection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Multi-Model Comparison</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Compare responses across models
import asyncio
from fusion_ai import FusionClient

async def compare_models(prompt):
    client = FusionClient(api_key="sk-fusion-...")
    
    models = ["gpt-4", "claude-3.5-sonnet", "gemini-pro"]
    tasks = []
    
    for model in models:
        task = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7  # Consistent params
        )
        tasks.append(task)
    
    responses = await asyncio.gather(*tasks)
    
    # Analyze and compare responses
    for i, response in enumerate(responses):
        print(f"{models[i]}: {response.choices[0].message.content}")

# Test hypothesis across providers
await compare_models("Explain quantum entanglement")`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              Run controlled experiments across multiple providers simultaneously.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4">Research-Focused Features</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Data Export</h5>
              <p className="text-sm text-gray-600">Export conversation data for analysis</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Controlled Testing</h5>
              <p className="text-sm text-gray-600">Reproducible experiments with fixed seeds</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Analytics</h5>
              <p className="text-sm text-gray-600">Track performance metrics across models</p>
            </div>
          </div>
        </div>
      </section>

      {/* Startups Section */}
      <section id="startups" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">🚀 Startups</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Launch AI-powered products faster with ready-to-use infrastructure. Build copilots, assistants, 
          and internal tools without the complexity of managing multiple LLM providers.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Startup Advantages</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Rapid MVP Development:</span>
                    <span className="text-gray-600"> Launch in days, not months</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Cost Optimization:</span>
                    <span className="text-gray-600"> Automatic routing to cheapest suitable provider</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">No Infrastructure Overhead:</span>
                    <span className="text-gray-600"> Focus on product, not LLM operations</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Built-in Reliability:</span>
                    <span className="text-gray-600"> Fallbacks and error handling included</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Startup Use Cases</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🤖 AI Copilots</h4>
                  <p className="text-sm text-gray-600">
                    Build coding assistants, writing copilots, or domain-specific AI helpers with custom tools.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">💬 Customer Support</h4>
                  <p className="text-sm text-gray-600">
                    Deploy intelligent chatbots with access to your knowledge base and business systems.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">📄 Content Generation</h4>
                  <p className="text-sm text-gray-600">
                    Power content platforms with AI writing, summarization, and creative generation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Quick Copilot Setup</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Build an AI copilot in minutes
curl -X POST https://api.mcp4.ai/v1/chat \\
  -H "Authorization: Bearer sk-fusion-..." \\
  -d '{
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful coding assistant. Use the provided tools to help users with programming tasks."
      },
      {
        "role": "user", 
        "content": "Help me optimize this SQL query"
      }
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "analyze_sql",
          "description": "Analyze SQL query performance",
          "parameters": {
            "type": "object",
            "properties": {
              "query": {"type": "string"}
            }
          }
        }
      }
    ],
    "provider": "neuroswitch"
  }'`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              Add custom tools and deploy production-ready AI assistants.
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-4">Startup Success Patterns</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">🎯 Go-to-Market Strategy</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Start with cost-optimized routing</li>
                <li>• Use BYOAPI for transparent pricing</li>
                <li>• Scale with multi-provider fallbacks</li>
                <li>• Monitor usage with built-in analytics</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">⚡ Development Velocity</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Leverage existing OpenAI-compatible APIs</li>
                <li>• Use tool calling for custom integrations</li>
                <li>• Implement streaming for real-time UX</li>
                <li>• Add prompt caching for cost efficiency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Agent & Tool Developers Section */}
      <section id="agents" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">🤖 Agent & Tool Developers</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Build sophisticated AI agents with advanced tool calling, multi-step reasoning chains, 
          and seamless integration with external services and databases.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Capabilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Function Calling:</span>
                    <span className="text-gray-600"> Connect LLMs to APIs and databases via JSON schemas</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Multi-Step Reasoning:</span>
                    <span className="text-gray-600"> Build complex planning and execution workflows</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Message Transforms:</span>
                    <span className="text-gray-600"> Custom processing logic for inputs and outputs</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Live Service Integration:</span>
                    <span className="text-gray-600"> Real-time data access and system control</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Agent Architectures</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🔄 ReAct Agents</h4>
                  <p className="text-sm text-gray-600">
                    Reasoning and Acting agents that plan, execute, and observe in iterative loops.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🌳 Tree-of-Thought</h4>
                  <p className="text-sm text-gray-600">
                    Explore multiple reasoning paths for complex problem-solving scenarios.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🤝 Multi-Agent Systems</h4>
                  <p className="text-sm text-gray-600">
                    Coordinate multiple specialized agents for complex, multi-faceted tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Agent Tool Definition</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Define custom agent tools
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "search_database",
        "description": "Search customer database",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Search query"
            },
            "filters": {
              "type": "object",
              "properties": {
                "date_range": {"type": "string"},
                "customer_type": {"type": "string"}
              }
            }
          },
          "required": ["query"]
        }
      }
    },
    {
      "type": "function", 
      "function": {
        "name": "update_ticket",
        "description": "Update support ticket status",
        "parameters": {
          "type": "object",
          "properties": {
            "ticket_id": {"type": "string"},
            "status": {"type": "string"},
            "resolution": {"type": "string"}
          },
          "required": ["ticket_id", "status"]
        }
      }
    }
  ]
}`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              Define complex tool schemas for sophisticated agent capabilities.
            </p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-4">Advanced Agent Features</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">🔧 Tool Ecosystem</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Custom function definitions</li>
                <li>• Structured data validation</li>
                <li>• Post-processing transforms</li>
                <li>• Error handling and retries</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">🧠 Reasoning Chains</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Multi-step planning workflows</li>
                <li>• State management across calls</li>
                <li>• Conditional execution logic</li>
                <li>• Memory and context preservation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">🔄 Integration Patterns</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Real-time API connections</li>
                <li>• Database query execution</li>
                <li>• Webhook and event handling</li>
                <li>• External service orchestration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprises Section */}
      <section id="enterprises" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">🏢 Enterprises</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Scale AI across your organization with enterprise-grade security, compliance, and governance. 
          Centralize multiple LLM providers behind one secure, auditable interface.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Centralized Control:</span>
                    <span className="text-gray-600"> Single interface for all AI providers and models</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Cost Management:</span>
                    <span className="text-gray-600"> Provider fallbacks and usage tracking</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Security & Compliance:</span>
                    <span className="text-gray-600"> SOC 2, HIPAA, GDPR compliance built-in</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Observability:</span>
                    <span className="text-gray-600"> Complete audit trails and monitoring</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Use Cases</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🏥 Healthcare AI</h4>
                  <p className="text-sm text-gray-600">
                    HIPAA-compliant AI for medical documentation, diagnosis assistance, and patient care.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">⚖️ Legal Tech</h4>
                  <p className="text-sm text-gray-600">
                    Document analysis, contract review, and legal research with strict privacy controls.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">🏦 Financial Services</h4>
                  <p className="text-sm text-gray-600">
                    Risk analysis, fraud detection, and customer service with regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Enterprise Configuration</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Enterprise-grade setup
curl -X POST https://api.mcp4.ai/v1/enterprise/config \\
  -H "Authorization: Bearer sk-fusion-enterprise-..." \\
  -d '{
    "organization": {
      "compliance_mode": "HIPAA",
      "data_residency": "US",
      "audit_logging": true
    },
    "routing": {
      "cost_optimization": true,
      "fallback_chains": {
        "primary": "byoapi-openai",
        "secondary": "byoapi-anthropic",
        "emergency": "fusion-native"
      }
    },
    "security": {
      "input_filtering": true,
      "output_sanitization": true,
      "pii_detection": true
    },
    "governance": {
      "usage_limits": {
        "monthly_tokens": 10000000,
        "rate_limit": "1000/minute"
      },
      "approval_workflows": true
    }
  }'`}
            </pre>
            <p className="text-gray-300 text-sm mt-4">
              Configure enterprise policies and compliance requirements.
            </p>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <h4 className="font-semibold text-gray-900 mb-4">Enterprise Success Framework</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">🛡️ Security & Compliance</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• SOC 2 Type II certified infrastructure</li>
                <li>• HIPAA and GDPR compliance options</li>
                <li>• Custom data processing agreements</li>
                <li>• Regular security audits and assessments</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">📊 Governance & Control</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Centralized usage monitoring and reporting</li>
                <li>• Team-based access controls and permissions</li>
                <li>• Budget management and cost allocation</li>
                <li>• Approval workflows for sensitive operations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started by Use Case */}
      <section className="bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started with Your Use Case</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Link 
              href="/docs/quickstart" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Rocket className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Quick Start Guide</h3>
                <p className="text-sm text-gray-600">Get your first AI application running in minutes</p>
              </div>
            </Link>
            
            <Link 
              href="/docs/features/tools" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Bot className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Tool Calling Guide</h3>
                <p className="text-sm text-gray-600">Build agents with custom function capabilities</p>
              </div>
            </Link>
            
            <Link 
              href="/docs/providers#byoapi" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Shield className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">BYOAPI Setup</h3>
                <p className="text-sm text-gray-600">Use your own API keys for enhanced control</p>
              </div>
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/docs/api" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Code className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">API Reference</h3>
                <p className="text-sm text-gray-600">Complete documentation for all endpoints</p>
              </div>
            </Link>
            
            <Link 
              href="/docs/privacy/logging" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Building className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Enterprise Features</h3>
                <p className="text-sm text-gray-600">Security, compliance, and governance options</p>
              </div>
            </Link>
            
            <Link 
              href="/docs/routing/examples" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Zap className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Routing Examples</h3>
                <p className="text-sm text-gray-600">Real-world configuration patterns</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 