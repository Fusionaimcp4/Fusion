#!/usr/bin/env node

const axios = require('axios');

async function testLocalNeuroSwitch() {
  console.log('🧪 Testing Local NeuroSwitch at http://192.168.1.186:5000/');
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
    console.log('📤 Sending payload:');
    console.log(JSON.stringify(testPayload, null, 2));
    console.log('\n' + '-'.repeat(40) + '\n');

    const response = await axios.post('http://192.168.1.186:5000/chat', testPayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEUROSWITCH_API_KEY || 'your-secret-key'}`
      },
      timeout: 30000
    });

    console.log('✅ LOCAL NeuroSwitch Response:');
    console.log('Status:', response.status);
    console.log('Response Fields:', Object.keys(response.data));
    console.log('Response Text:', response.data.response || 'EMPTY');
    console.log('Tool Calls:', response.data.tool_calls ? `${response.data.tool_calls.length} calls` : 'NONE');
    console.log('Tool Name:', response.data.tool_name || 'NONE');
    console.log('Provider:', response.data.provider_used || 'NONE');
    console.log('Model:', response.data.model_used || 'NONE');
    
    if (response.data.tool_calls && response.data.tool_calls.length > 0) {
      console.log('\n🔧 Tool Details:');
      response.data.tool_calls.forEach((tool, i) => {
        console.log(`   ${i+1}. ${tool.name}: ${JSON.stringify(tool.input)}`);
      });
    }
    
    console.log('\n📄 Full Response:');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.log('❌ LOCAL Error:', error.message);
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Data:', error.response.data);
    }
  }
}

testLocalNeuroSwitch();
