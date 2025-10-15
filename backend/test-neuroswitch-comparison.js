#!/usr/bin/env node

const axios = require('axios');

async function testNeuroSwitch(location, url) {
  console.log(`\n🧪 Testing ${location} NeuroSwitch at ${url}`);
  console.log('='.repeat(60));
  
  const testPayload = {
    message: "5+5",
    history: [],
    return_token_usage: true,
    return_response_time: true,
    user_context: { user_id: 1 },
    tools: [
      {
        type: "function",
        function: {
          name: "calculator",
          description: "Useful for getting the result of a math expression.",
          parameters: {
            type: "object",
            properties: {
              input: { type: "string" }
            }
          }
        }
      }
    ],
    enable_tools: true,
    requested_provider: "openai",
    model: "gpt-4o-mini"
  };

  try {
    const response = await axios.post(url, testPayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEUROSWITCH_API_KEY || 'your-secret-key'}`
      },
      timeout: 30000
    });

    console.log(`✅ ${location} Response Status:`, response.status);
    console.log(`📋 Response Fields:`, Object.keys(response.data));
    console.log(`📝 Response Text:`, response.data.response || 'EMPTY');
    console.log(`🛠️ Tool Calls:`, response.data.tool_calls ? `${response.data.tool_calls.length} calls` : 'NONE');
    console.log(`🏷️ Tool Name:`, response.data.tool_name || 'NONE');
    console.log(`🤖 Provider:`, response.data.provider_used || 'NONE');
    console.log(`📊 Model:`, response.data.model_used || 'NONE');
    
    if (response.data.tool_calls && response.data.tool_calls.length > 0) {
      console.log(`🔧 Tool Details:`);
      response.data.tool_calls.forEach((tool, i) => {
        console.log(`   ${i+1}. ${tool.name}: ${JSON.stringify(tool.input)}`);
      });
    }
    
    console.log(`\n📄 Full Response:`);
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.log(`❌ ${location} Error:`, error.message);
    if (error.response) {
      console.log(`   Status:`, error.response.status);
      console.log(`   Data:`, error.response.data);
    }
  }
}

async function runTests() {
  console.log('🔍 Comparing Local vs Server NeuroSwitch Tool Handling');
  console.log('='.repeat(60));
  
  // Test local NeuroSwitch
  await testNeuroSwitch('LOCAL', 'http://localhost:5001/chat');
  
  // Test server NeuroSwitch (if you have the URL)
  // await testNeuroSwitch('SERVER', 'https://your-neuroswitch-server.com/chat');
  
  console.log('\n🏁 Test Complete');
}

runTests();
