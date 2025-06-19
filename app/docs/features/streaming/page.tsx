import React from 'react';
import Link from 'next/link';
import { Zap, Clock, Wifi, Monitor, Code, ArrowRight, CheckCircle, Play, Radio, Activity } from 'lucide-react';

export default function StreamingSupportPage() {
  const streamingBenefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Reduced Perceived Latency',
      description: 'Users see responses appear immediately as tokens are generated',
      color: 'blue'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Real-time Feedback',
      description: 'Immediate indication that the AI is processing and responding',
      color: 'green'
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: 'Better User Experience',
      description: 'Interactive, engaging interface similar to modern chat applications',
      color: 'purple'
    },
    {
      icon: <Radio className="w-6 h-6" />,
      title: 'Live Tool Execution',
      description: 'See tool calls and results as they happen in real-time',
      color: 'orange'
    }
  ];

  const streamingFlow = [
    {
      step: '1',
      title: 'Request Initiated',
      description: 'Client sends request with streaming enabled',
      technical: 'POST /api/chat with stream: true parameter'
    },
    {
      step: '2',
      title: 'Connection Established',
      description: 'Server establishes Server-Sent Events (SSE) connection',
      technical: 'HTTP response with Content-Type: text/event-stream'
    },
    {
      step: '3',
      title: 'Token Generation',
      description: 'AI model generates tokens progressively',
      technical: 'Model streams tokens as they are generated'
    },
    {
      step: '4',
      title: 'Real-time Delivery',
      description: 'Each token is immediately sent to the client',
      technical: 'data: {"token": "word", "done": false} events'
    }
  ];

  const supportedModels = [
    { name: 'GPT-4 Turbo', provider: 'OpenAI', streaming: true, performance: 'Fast' },
    { name: 'GPT-3.5 Turbo', provider: 'OpenAI', streaming: true, performance: 'Very Fast' },
    { name: 'Claude 3 Opus', provider: 'Anthropic', streaming: true, performance: 'Fast' },
    { name: 'Claude 3 Sonnet', provider: 'Anthropic', streaming: true, performance: 'Fast' },
    { name: 'Claude 3 Haiku', provider: 'Anthropic', streaming: true, performance: 'Very Fast' },
    { name: 'Gemini 1.5 Pro', provider: 'Google', streaming: true, performance: 'Fast' },
    { name: 'NeuroSwitch Mix', provider: 'Fusion', streaming: true, performance: 'Variable' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Streaming Support</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience real-time AI responses with token-by-token streaming. Reduce perceived latency 
          and create engaging, interactive experiences for your users.
        </p>
      </div>

      {/* Key Benefits */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {streamingBenefits.map((benefit) => (
          <div
            key={benefit.title}
            className={`p-6 rounded-lg border ${getColorClasses(benefit.color)}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${getColorClasses(benefit.color).split(' ')[1]}`}>
              {React.cloneElement(benefit.icon, { className: `w-6 h-6 ${getColorClasses(benefit.color).split(' ')[0]}` })}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
          </div>
        ))}
      </section>

      {/* How Streaming Works */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Streaming Works</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streamingFlow.map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-blue-600">{step.step}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{step.description}</p>
              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded block">
                {step.technical}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h4 className="font-medium text-gray-900 mb-3">🚀 Performance Impact</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium mb-1">Without Streaming:</p>
              <p>User waits 5-10 seconds → Complete response appears</p>
            </div>
            <div>
              <p className="font-medium mb-1">With Streaming:</p>
              <p>Response starts in &lt;1 second → Text appears progressively</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Implementation Examples</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">JavaScript/Fetch API</h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    message: "Explain quantum computing",
    model: "claude",
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      console.log('Token:', data.token);
      // Update UI with new token
      appendToResponse(data.token);
    }
  }
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">React Hook Implementation</h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`const useStreamingChat = () => {
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (message) => {
    setIsStreaming(true);
    setResponse('');
    
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-key'
      },
      body: JSON.stringify({ message, stream: true })
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          setResponse(prev => prev + data.token);
        }
      }
    }
    
    setIsStreaming(false);
  };

  return { response, isStreaming, sendMessage };
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Model Support */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Model Streaming Support</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Provider</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Streaming</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {supportedModels.map((model) => (
                <tr key={model.name} className="hover:bg-white">
                  <td className="py-3 px-4 font-medium text-gray-900">{model.name}</td>
                  <td className="py-3 px-4 text-gray-600">{model.provider}</td>
                  <td className="py-3 px-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      model.performance === 'Very Fast' ? 'bg-green-100 text-green-800' :
                      model.performance === 'Fast' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {model.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-gray-900 mb-2">NeuroSwitch Streaming</h4>
          <p className="text-gray-600 text-sm">
            When using NeuroSwitch, streaming performance depends on the routed model. 
            The intelligent routing system maintains streaming compatibility across all supported providers.
          </p>
        </div>
      </section>

      {/* Event Format */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Streaming Event Format</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Token Event</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
                <code>{`data: {
  "token": "Hello",
  "done": false,
  "model": "claude",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Execution Event</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
                <code>{`data: {
  "tool_name": "web_search",
  "tool_input": {"query": "latest AI news"},
  "tool_result": "Found 10 articles...",
  "token": "Based on the search results...",
  "done": false
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stream Completion</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
                <code>{`data: {
  "done": true,
  "total_tokens": 1250,
  "finish_reason": "stop",
  "response_time": 4.2
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Event</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
                <code>{`data: {
  "error": "Rate limit exceeded",
  "error_code": "RATE_LIMIT",
  "done": true,
  "retry_after": 60
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Streaming Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend Implementation</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-gray-900 mb-2">⚡ Performance</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Debounce UI updates for smooth rendering</li>
                  <li>• Use virtual scrolling for long responses</li>
                  <li>• Implement proper error boundaries</li>
                  <li>• Handle connection timeouts gracefully</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-gray-900 mb-2">🎨 User Experience</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Show typing indicators during streaming</li>
                  <li>• Provide stop/cancel functionality</li>
                  <li>• Display connection status clearly</li>
                  <li>• Handle reconnection scenarios</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend Considerations</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-gray-900 mb-2">🔧 Technical</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Set appropriate connection timeouts</li>
                  <li>• Implement proper SSE headers</li>
                  <li>• Handle client disconnections</li>
                  <li>• Monitor stream health and performance</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-gray-900 mb-2">📊 Monitoring</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Track streaming success rates</li>
                  <li>• Monitor token delivery latency</li>
                  <li>• Log connection drop patterns</li>
                  <li>• Measure user engagement metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Features</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/features/tools" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Tool Calling</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">See tool execution and results in real-time during streaming</p>
          </Link>
          
          <Link 
            href="/docs/features/caching" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Prompt Caching</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Combine caching with streaming for ultimate performance</p>
          </Link>
          
          <Link 
            href="/docs/features/transforms" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Message Transforms</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Process and sanitize streaming content in real-time</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Enable Streaming Today</h2>
        <p className="text-gray-600 mb-6">
          Transform your AI application's user experience with real-time streaming. 
          Just add <code className="bg-gray-100 px-2 py-1 rounded">stream: true</code> to your requests.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/api/endpoints" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            API Reference
          </Link>
        </div>
      </section>
    </div>
  );
} 