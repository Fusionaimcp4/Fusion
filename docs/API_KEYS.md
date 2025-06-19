# Fusion AI - API Key System Documentation

## Overview

Fusion AI implements two types of API key systems:

1. **Internal API Keys** - For accessing the Fusion AI platform API
2. **External API Keys (BYOAPI)** - User-provided keys for AI providers (OpenAI, Claude, Gemini)

## Internal API Keys

Internal API keys provide programmatic access to the Fusion AI platform.

### Creating an API Key

**Endpoint:** `POST /api/keys`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "My Integration Key"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "My Integration Key",
  "api_key": "sk-fusion-abcd1234...",
  "created_at": "2024-01-01T00:00:00.000Z",
  "is_active": true,
  "message": "API Key created successfully. Please save this key securely. You will not be able to see it again."
}
```

> ⚠️ **Important:** The full API key is only shown once during creation. Save it securely.

### Listing API Keys

**Endpoint:** `GET /api/keys`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "My Integration Key",
    "api_key_masked": "sk-fusion-abcd...xyz",
    "created_at": "2024-01-01T00:00:00.000Z",
    "last_used_at": "2024-01-02T10:30:00.000Z",
    "is_active": true
  }
]
```

### Using Internal API Keys

Replace JWT token with API key in the Authorization header:

```bash
curl -X POST https://your-domain.com/api/chat \
  -H "Authorization: Bearer sk-fusion-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Hello, world!",
    "provider": "neuroswitch"
  }'
```

### Managing API Keys

**Delete an API Key:**
```
DELETE /api/keys/:id
Authorization: Bearer <your_jwt_token>
```

**Toggle API Key Status:**
```
PUT /api/keys/:id/status
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "isActive": false
}
```

## External API Keys (BYOAPI)

External API keys allow users to provide their own AI provider API keys for direct billing.

### Supported Providers

- **OpenAI** - GPT models
- **Anthropic** - Claude models  
- **Google** - Gemini models

### Adding an External API Key

**Endpoint:** `POST /api/external-keys`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "provider_name": "OpenAI",
  "api_key": "sk-proj-your-openai-key",
  "key_name": "My OpenAI Key"
}
```

**Response:**
```json
{
  "id": 1,
  "provider_id": 1,
  "provider_name": "OpenAI", 
  "key_name": "My OpenAI Key",
  "key_preview": "sk-p...key",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Listing External API Keys

**Endpoint:** `GET /api/external-keys`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "provider_id": 1,
    "provider_name": "OpenAI",
    "key_name": "My OpenAI Key", 
    "key_preview": "sk-p...key",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### How BYOAPI Keys Are Used

When making chat requests:

1. **Specific Provider Targeting:** If you select a specific provider (e.g., `"provider": "openai"`), the system uses your OpenAI key directly
2. **NeuroSwitch Routing:** If you use `"provider": "neuroswitch"`, your keys are passed to NeuroSwitch which routes to the optimal provider

**Example Chat Request with BYOAPI:**
```bash
curl -X POST https://your-domain.com/api/chat \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing",
    "provider": "openai",
    "model": "gpt-4"
  }'
```

The system will:
1. Look up your active OpenAI API key
2. Decrypt it securely
3. Pass it to NeuroSwitch via `X-OpenAI-API-Key` header
4. Make the request using your key (billed to your OpenAI account)

### Managing External API Keys

**Update Key Name:**
```
PUT /api/external-keys/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "key_name": "Updated Key Name"
}
```

**Toggle Key Status:**
```
PUT /api/external-keys/:id/status
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "isActive": false
}
```

**Delete Key:**
```
DELETE /api/external-keys/:id
Authorization: Bearer <your_jwt_token>
```

## Security & Storage

### External API Key Encryption

- **Algorithm:** AES-256-GCM
- **Key Storage:** Environment variable `ENCRYPTION_KEY` (32-byte hex string)
- **Format:** `IV:AuthTag:EncryptedData` (hex-encoded, colon-separated)
- **Database:** Only encrypted keys are stored, never plaintext

### Key Preview Generation

For security, only a preview is shown in the UI:
- Keys > 8 chars: `"sk-p...key"` (first 4 + last 4 characters)
- Keys ≤ 8 chars: `"sk-p..."` (first 4 characters only)

### Environment Variables Required

```bash
# Required for external API key encryption
ENCRYPTION_KEY=your-32-byte-hex-string

# Required for NeuroSwitch communication
NEUROSWITCH_API_URL=http://localhost:5001/chat
NEUROSWITCH_API_KEY=your-neuroswitch-key
```

## Database Schema

### Internal API Keys Table (`api_keys`)
```sql
CREATE TABLE api_keys (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) DEFAULT 'My API Key',
    api_key TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### External API Keys Table (`user_external_api_keys`)
```sql
CREATE TABLE user_external_api_keys (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_id INTEGER NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    key_name VARCHAR(255) NOT NULL,
    encrypted_api_key TEXT NOT NULL,
    key_preview VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, provider_id)
);
```

### Usage Tracking (`usage_logs`)
```sql
CREATE TABLE usage_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    api_key_id INTEGER REFERENCES user_external_api_keys(id) ON DELETE SET NULL,
    request_model VARCHAR(255) DEFAULT NULL,
    model VARCHAR(255),
    provider VARCHAR(255),
    prompt_tokens INTEGER DEFAULT 0,
    completion_tokens INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    cost NUMERIC(10,6) DEFAULT 0.000000,
    neuroswitch_fee NUMERIC(10,4) DEFAULT 0.0000,
    fallback_reason TEXT,
    response_time INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Error Handling

### Common Error Responses

**Invalid/Missing API Key:**
```json
{
  "error": "Invalid API key",
  "status": 401
}
```

**Provider Not Found:**
```json
{
  "error": "Provider 'InvalidProvider' not found or not supported.",
  "status": 400
}
```

**Duplicate Provider Key:**
```json
{
  "error": "An API key for provider 'OpenAI' already exists.",
  "status": 409
}
```

**Encryption Error:**
```json
{
  "error": "Server encryption configuration error. Please contact support.",
  "status": 500
}
```

## Key Rotation & Deletion

### Rotating External API Keys

1. Add a new key for the same provider (will fail due to unique constraint)
2. Delete the old key first: `DELETE /api/external-keys/:old_id`
3. Add the new key: `POST /api/external-keys`

### Secure Deletion

- Deleted keys are immediately removed from the database
- No soft deletion to prevent accidental exposure
- Usage logs retain the `api_key_id` reference for historical tracking

## Frontend Integration

The dashboard provides UI for key management:

- **Platform Keys:** `/dashboard/api-keys`
- **Provider Keys:** `/dashboard/provider-keys`

## Rate Limiting & Usage

- API key usage is tracked in `usage_logs` table
- When using BYOAPI keys, costs are billed directly to your provider account
- Internal platform usage may have rate limits based on user tier

## Troubleshooting

### Key Not Working

1. Verify key is active: `GET /api/external-keys`
2. Check provider name matches exactly (case-insensitive): "OpenAI", "Anthropic", "Google"
3. Ensure provider exists in `providers` table
4. Check server logs for decryption errors

### Encryption Issues

If you see "Encryption key is misconfigured":
1. Verify `ENCRYPTION_KEY` environment variable is set
2. Ensure it's a 64-character hex string (32 bytes)
3. Restart the server after changing the key

> ⚠️ **Warning:** Changing the encryption key will make existing encrypted API keys unusable. 