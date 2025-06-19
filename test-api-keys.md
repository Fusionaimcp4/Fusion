# API Key System Manual Testing

## Prerequisites

1. Server running on `http://localhost:5000`
2. Valid JWT token for authentication
3. `curl` or similar HTTP client
4. Database access for verification

## Step 1: Get Authentication Token

First, you need a JWT token. Log in through the frontend or use the auth endpoint:

```bash
# Login to get JWT token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
```

Save the `token` from the response for use in subsequent requests.

## Step 2: Test Internal API Keys

### 2.1 Create Internal API Key

```bash
# Replace YOUR_JWT_TOKEN with actual token
export JWT_TOKEN="your-jwt-token-here"

curl -X POST http://localhost:5000/api/keys \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Integration Key"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "Test Integration Key",
  "api_key": "sk-fusion-[56-char-hex-string]",
  "created_at": "2024-01-01T00:00:00.000Z",
  "is_active": true,
  "message": "API Key created successfully. Please save this key securely. You will not be able to see it again."
}
```

**⚠️ Save the `api_key` value - you'll need it for testing!**

### 2.2 List Internal API Keys

```bash
curl -X GET http://localhost:5000/api/keys \
  -H "Authorization: Bearer $JWT_TOKEN"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Test Integration Key",
    "api_key_masked": "sk-fusion-abcd...xyz",
    "created_at": "2024-01-01T00:00:00.000Z",
    "last_used_at": null,
    "is_active": true
  }
]
```

### 2.3 Test Using Internal API Key

```bash
# Replace with your actual API key from step 2.1
export API_KEY="sk-fusion-your-key-here"

curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Hello, this is a test!",
    "provider": "neuroswitch"
  }'
```

**Expected:** Chat response or appropriate error if NeuroSwitch isn't configured

### 2.4 Toggle Internal API Key Status

```bash
# Disable the key
curl -X PUT http://localhost:5000/api/keys/1/status \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "isActive": false
  }'

# Test that disabled key doesn't work
curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "This should fail",
    "provider": "neuroswitch"
  }'
```

**Expected:** 401 Unauthorized error

### 2.5 Re-enable Internal API Key

```bash
curl -X PUT http://localhost:5000/api/keys/1/status \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "isActive": true
  }'
```

## Step 3: Test External API Keys (BYOAPI)

### 3.1 List Available Providers

First, check what providers are available:

```bash
# This may require admin access or a separate endpoint
# For now, we know: OpenAI, Anthropic (Claude), Google (Gemini)
```

### 3.2 Add External API Key

```bash
# Test with OpenAI (use a test/invalid key for safety)
curl -X POST http://localhost:5000/api/external-keys \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider_name": "OpenAI",
    "api_key": "sk-test-fake-key-for-testing-purposes-only",
    "key_name": "Test OpenAI Key"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "provider_id": 1,
  "provider_name": "OpenAI",
  "key_name": "Test OpenAI Key",
  "key_preview": "sk-t...only",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### 3.3 Test Duplicate Provider Key (Should Fail)

```bash
curl -X POST http://localhost:5000/api/external-keys \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider_name": "OpenAI",
    "api_key": "sk-test-another-fake-key",
    "key_name": "Duplicate OpenAI Key"
  }'
```

**Expected Response:**
```json
{
  "error": "An API key for provider 'OpenAI' already exists."
}
```
**Expected Status:** 409 Conflict

### 3.4 List External API Keys

```bash
curl -X GET http://localhost:5000/api/external-keys \
  -H "Authorization: Bearer $JWT_TOKEN"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "provider_id": 1,
    "provider_name": "OpenAI",
    "key_name": "Test OpenAI Key",
    "key_preview": "sk-t...only",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3.5 Update External API Key Name

```bash
curl -X PUT http://localhost:5000/api/external-keys/1 \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key_name": "Updated OpenAI Key Name"
  }'
```

### 3.6 Toggle External API Key Status

```bash
# Disable
curl -X PUT http://localhost:5000/api/external-keys/1/status \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "isActive": false
  }'

# Enable
curl -X PUT http://localhost:5000/api/external-keys/1/status \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "isActive": true
  }'
```

### 3.7 Test Chat with External API Key

```bash
# This will use your OpenAI key if configured properly
curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Test BYOAPI",
    "provider": "openai",
    "model": "gpt-3.5-turbo"
  }'
```

**Note:** This may fail if the test key is invalid, but should show BYOAPI flow in logs

### 3.8 Delete External API Key

```bash
curl -X DELETE http://localhost:5000/api/external-keys/1 \
  -H "Authorization: Bearer $JWT_TOKEN"
```

**Expected:** 204 No Content

## Step 4: Error Testing

### 4.1 Test Invalid Provider

```bash
curl -X POST http://localhost:5000/api/external-keys \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider_name": "InvalidProvider",
    "api_key": "test-key",
    "key_name": "Invalid Test"
  }'
```

**Expected:**
```json
{
  "error": "Provider 'InvalidProvider' not found or not supported."
}
```

### 4.2 Test Missing Required Fields

```bash
curl -X POST http://localhost:5000/api/external-keys \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider_name": "OpenAI"
  }'
```

**Expected:**
```json
{
  "error": "provider_name, api_key, and key_name are required"
}
```

### 4.3 Test Invalid JWT Token

```bash
curl -X GET http://localhost:5000/api/keys \
  -H "Authorization: Bearer invalid-token"
```

**Expected:** 401 Unauthorized

### 4.4 Test No Authorization Header

```bash
curl -X GET http://localhost:5000/api/keys
```

**Expected:** 401 Unauthorized

## Step 5: Database Verification

Connect to your PostgreSQL database and verify the data:

```sql
-- Check internal API keys
SELECT * FROM api_keys;

-- Check external API keys (encrypted)
SELECT id, user_id, provider_id, key_name, key_preview, is_active 
FROM user_external_api_keys;

-- Check providers
SELECT * FROM providers;

-- Check usage logs if any requests were made
SELECT * FROM usage_logs ORDER BY created_at DESC LIMIT 10;
```

## Step 6: Encryption Verification

Test the encryption/decryption functions work:

```bash
# In your backend directory, you can test the crypto functions
cd backend
node -e "
const { encrypt, decrypt } = require('./dist/utils/crypto.js');
const testKey = 'sk-test-1234567890abcdef';
console.log('Original:', testKey);
const encrypted = encrypt(testKey);
console.log('Encrypted:', encrypted);
const decrypted = decrypt(encrypted);
console.log('Decrypted:', decrypted);
console.log('Match:', testKey === decrypted);
"
```

**Expected:** All operations should succeed and match should be `true`

## Step 7: Load Testing (Optional)

### 7.1 Rapid Key Creation

```bash
# Test creating multiple keys rapidly
for i in {1..5}; do
  curl -X POST http://localhost:5000/api/keys \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Load Test Key $i\"}"
  echo ""
done
```

### 7.2 Concurrent Requests

```bash
# Test concurrent requests with same API key
for i in {1..3}; do
  (curl -X GET http://localhost:5000/api/keys \
    -H "Authorization: Bearer $JWT_TOKEN" &)
done
wait
```

## Verification Checklist

- [ ] ✅ Internal API key creation works
- [ ] ✅ Internal API key listing shows masked keys
- [ ] ✅ Internal API key authentication works
- [ ] ✅ Internal API key disable/enable works
- [ ] ✅ External API key creation works
- [ ] ✅ External API key encryption works
- [ ] ✅ External API key preview generation works
- [ ] ✅ Duplicate provider key prevention works
- [ ] ✅ External API key CRUD operations work
- [ ] ✅ BYOAPI flow integration works
- [ ] ✅ Error handling works correctly
- [ ] ✅ Database constraints enforced
- [ ] ✅ Usage logging works
- [ ] ✅ Security measures in place

## Common Issues & Solutions

### Issue: "Encryption key is misconfigured"
**Solution:** Set proper `ENCRYPTION_KEY` environment variable (64-char hex)

### Issue: Provider not found
**Solution:** Check providers table has OpenAI, Anthropic, Google entries

### Issue: 401 Unauthorized
**Solution:** Verify JWT token is valid and not expired

### Issue: Database connection errors
**Solution:** Ensure PostgreSQL is running and connection string is correct

### Issue: BYOAPI not working
**Solution:** Check NeuroSwitch service is running and `NEUROSWITCH_API_KEY` is set 