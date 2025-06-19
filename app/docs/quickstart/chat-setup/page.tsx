import React from 'react';
import Link from 'next/link';
import { MessageSquare, Copy, CheckCircle, ArrowRight, Code, Zap, Brain, Clock } from 'lucide-react';

export default function ChatSetupPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Set Up Chat Sessions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to maintain conversation context across multiple requests, enabling natural 
          back-and-forth conversations with AI models through Fusion AI.
        </p>
      </div>

      {/* How Context Works */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How Conversation Context Works</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg border border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Send History</h3>
            <p className="text-sm text-gray-600">
              Include previous messages in your request to maintain context
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">NeuroSwitch Routing</h3>
            <p className="text-sm text-gray-600">
              Consistent routing ensures smooth conversation flow
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg border border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Context Preserved</h3>
            <p className="text-sm text-gray-600">
              AI remembers the conversation and responds appropriately
            </p>
          </div>
        </div>
      </section>

      {/* Basic Chat Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Chat Session</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 1: First Message</h3>
            <div className="bg-gray-900 rounded-lg p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-mono text-sm">First Request</span>
                </div>
                <button className="text-gray-400 hover:text-white p-1">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "prompt": "Hi! I'm planning a vacation to Japan. Can you help me?",
  "provider": "neuroswitch",
  "max_tokens": 300
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 2: Follow-up with History</h3>
            <div className="bg-gray-900 rounded-lg p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-mono text-sm">Second Request</span>
                </div>
                <button className="text-gray-400 hover:text-white p-1">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "messages": [
    {
      "role": "user",
      "content": "Hi! I'm planning a vacation to Japan. Can you help me?"
    },
    {
      "role": "assistant", 
      "content": "I'd be happy to help you plan your Japan vacation! Japan offers incredible experiences..."
    },
    {
      "role": "user",
      "content": "What's the best time of year to visit for cherry blossoms?"
    }
  ],
  "provider": "neuroswitch",
  "max_tokens": 300
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Message Format */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Message Format</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Single Prompt (Simple)</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-sm text-gray-700">
{`{
  "prompt": "Your message here",
  "provider": "neuroswitch"
}`}
              </pre>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Best for single questions without context
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages Array (Chat)</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-sm text-gray-700">
{`{
  "messages": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."},
    {"role": "user", "content": "..."}
  ],
  "provider": "neuroswitch"
}`}
              </pre>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Required for maintaining conversation context
            </p>
          </div>
        </div>
      </section>

      {/* JavaScript Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">JavaScript Chat Implementation</h2>
        
        <div className="bg-gray-900 rounded-lg p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-mono text-sm">JavaScript</span>
            </div>
            <button className="text-gray-400 hover:text-white p-1">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          
          <pre className="text-gray-300 text-sm overflow-x-auto">
{`class FusionChat {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.messages = [];
    this.apiUrl = 'https://api.mcp4.ai/chat';
  }

  async sendMessage(userMessage) {
    // Add user message to history
    this.messages.push({
      role: 'user',
      content: userMessage
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: this.messages,
          provider: 'neuroswitch',
          max_tokens: 500
        })
      });

      const data = await response.json();
      
      // Add AI response to history
      this.messages.push({
        role: 'assistant',
        content: data.response
      });

      return {
        response: data.response,
        provider: data.provider_used,
        cost: data.cost
      };
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  clearHistory() {
    this.messages = [];
  }
}

// Usage example
const chat = new FusionChat('sk-fusion-your-api-key');

const response1 = await chat.sendMessage("What's the capital of France?");
console.log(response1.response); // "The capital of France is Paris..."

const response2 = await chat.sendMessage("What's the population there?");
console.log(response2.response); // "Paris has a population of approximately 2.1 million..."`}
          </pre>
        </div>
      </section>

      {/* Python Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Python Chat Implementation</h2>
        
        <div className="bg-gray-900 rounded-lg p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-mono text-sm">Python</span>
            </div>
            <button className="text-gray-400 hover:text-white p-1">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          
          <pre className="text-gray-300 text-sm overflow-x-auto">
{`import requests

class FusionChat:
    def __init__(self, api_key):
        self.api_key = api_key
        self.messages = []
        self.api_url = 'https://api.mcp4.ai/chat'
    
    def send_message(self, user_message):
        # Add user message to history
        self.messages.append({
            'role': 'user',
            'content': user_message
        })
        
        try:
            response = requests.post(
                self.api_url,
                headers={
                    'Authorization': f'Bearer {self.api_key}',
                    'Content-Type': 'application/json'
                },
                json={
                    'messages': self.messages,
                    'provider': 'neuroswitch',
                    'max_tokens': 500
                }
            )
            
            data = response.json()
            
            # Add AI response to history
            self.messages.append({
                'role': 'assistant',
                'content': data['response']
            })
            
            return {
                'response': data['response'],
                'provider': data['provider_used'],
                'cost': data['cost']
            }
            
        except Exception as error:
            print(f'Chat error: {error}')
            raise error
    
    def clear_history(self):
        self.messages = []

# Usage example
chat = FusionChat('sk-fusion-your-api-key')

response1 = chat.send_message("Explain machine learning in simple terms")
print(response1['response'])

response2 = chat.send_message("Can you give me a practical example?")
print(response2['response'])  # Will reference the previous explanation`}
          </pre>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Chat Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Messages</h3>
            <p className="text-gray-600 mb-4">
              Set the AI's behavior and personality at the start of conversations.
            </p>
            <div className="bg-gray-50 rounded p-3 border">
              <pre className="text-xs text-gray-700">
{`{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful travel assistant specializing in Japan."
    },
    {
      "role": "user", 
      "content": "Plan my Tokyo itinerary"
    }
  ]
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Context Management</h3>
            <p className="text-gray-600 mb-4">
              Manage conversation length to stay within token limits.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Keep last 10-20 messages
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Summarize older context
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Monitor token usage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Do This</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Always include conversation history for multi-turn chats</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Use system messages to set AI behavior</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Monitor token usage to manage costs</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Use "neuroswitch" for consistent routing</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">❌ Avoid This</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Sending follow-up questions without context</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Mixing "prompt" and "messages" parameters</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Letting conversations grow too long</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Switching providers mid-conversation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Zap className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">First response: 1-3 seconds</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">Follow-ups: 0.5-1 second</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Brain className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">NeuroSwitch maintains session affinity</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">Context preserved across providers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Master Chat Sessions!</h2>
        <p className="text-gray-600 mb-6">
          You now know how to build conversational AI applications. Explore advanced features 
          to enhance your chat experience.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Link 
            href="/docs/features/streaming" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Enable Streaming</h3>
            <p className="text-gray-600 text-sm mb-3">Get real-time responses in your chat</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors mx-auto" />
          </Link>
          
          <Link 
            href="/docs/features/tools" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Add Tool Calling</h3>
            <p className="text-gray-600 text-sm mb-3">Let AI use tools and functions</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors mx-auto" />
          </Link>
          
          <Link 
            href="/docs/api/endpoints" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
            <p className="text-gray-600 text-sm mb-3">Explore all available parameters</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors mx-auto" />
          </Link>
        </div>
      </section>
    </div>
  );
} 