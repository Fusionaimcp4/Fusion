# Tool Passthrough Implementation Test

## Overview
This document describes how to test the newly implemented tool-calling passthrough feature in Fusion backend.

## Prerequisites
- Fusion backend running on `http://localhost:3000` (or your configured port)
- NeuroSwitch running with `ENABLE_SAFE_TOOLS=True`
- Valid authentication token

## Test Cases

### Test 1: Tool Passthrough with Array of Tool Objects

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "prompt": "find CHEF'\''s board price using the knowledge base",
    "provider": "neuroswitch",
    "tools": [{"name": "RetrieveKnowledgeBaseContext"}],
    "enable_tools": true
  }'
```

**Expected Backend Logs:**
```
[API Chat] Received request on /api/chat. Provider: neuroswitch Model: undefined Prompt: Exists Tools: Provided
[API Chat] Payload to NeuroSwitch: {
  "message": "find CHEF's board price using the knowledge base",
  "history": [],
  "return_token_usage": true,
  "return_response_time": true,
  "user_context": { "user_id": 123 },
  "requested_provider": "neuroswitch",
  "tools": [{"name": "RetrieveKnowledgeBaseContext"}],
  "enable_tools": true
}
[API Chat] User 123 requested tools: [{"name": "RetrieveKnowledgeBaseContext"}]
```

**Expected NeuroSwitch Logs:**
```
Loaded tools: ['RetrieveKnowledgeBaseContext']
```

### Test 2: Backward Compatibility (No Tools)

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "prompt": "What is quantum computing?",
    "provider": "neuroswitch"
  }'
```

**Expected Behavior:**
- Request processes normally
- No tool-related logs appear
- Response contains standard chat completion

### Test 3: Validation - Invalid Tools Format

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "prompt": "test",
    "provider": "neuroswitch",
    "tools": "invalid_string"
  }'
```

**Expected Response:**
```json
{
  "error": "tools must be an array"
}
```
**Status Code:** 400

### Test 4: Enable Tools Boolean Only

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "prompt": "Create a Python script to analyze data",
    "provider": "neuroswitch",
    "enable_tools": true
  }'
```

**Expected Behavior:**
- `enable_tools: true` is forwarded to NeuroSwitch
- NeuroSwitch autonomously selects appropriate tools
- No validation errors

## Verification Checklist

- [ ] Tools array is forwarded to NeuroSwitch payload
- [ ] `enable_tools` boolean is forwarded when present
- [ ] Invalid tools format returns 400 error
- [ ] Requests without tools work normally (backward compatible)
- [ ] Backend logs show tool information when provided
- [ ] NeuroSwitch receives and processes tool specifications
- [ ] Response includes `tool_name` if tools were executed
- [ ] No changes to authentication, credit, or cost logic

## Security Verification

- [ ] Only authenticated requests can use tools
- [ ] Tools are NOT executed in Fusion (passthrough only)
- [ ] Invalid JSON is rejected before reaching NeuroSwitch
- [ ] Existing rate limiting and credit checks still apply
- [ ] User ID is logged with tool requests for audit trail

## Notes

- This implementation follows the OpenRouter pattern: gateway passes tools to provider without execution
- All tool execution happens in NeuroSwitch backend
- No new database changes required
- No breaking changes to existing API contracts

