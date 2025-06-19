# API Key System Test Script for Windows PowerShell
# Make sure your server is running on http://localhost:5000

Write-Host "🔑 API Key System Testing Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Configuration
$BASE_URL = "http://localhost:5000"
$JWT_TOKEN = ""  # You need to set this manually

# Function to make HTTP requests
function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Body = $null,
        [string]$Token = $JWT_TOKEN
    )
    
    $headers = @{
        "Authorization" = "Bearer $Token"
        "Content-Type" = "application/json"
    }
    
    $uri = "$BASE_URL$Endpoint"
    
    try {
        if ($Body) {
            $response = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $Body
        } else {
            $response = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers
        }
        return @{ Success = $true; Data = $response }
    } catch {
        $errorMessage = $_.Exception.Message
        if ($_.Exception.Response) {
            $errorMessage += " Status: $($_.Exception.Response.StatusCode)"
        }
        return @{ Success = $false; Error = $errorMessage }
    }
}

# Step 1: Test Authentication Endpoint
Write-Host "`n📧 Step 1: Authentication Test" -ForegroundColor Yellow
if (-not $JWT_TOKEN) {
    Write-Host "❌ JWT_TOKEN not set. Please update the script with your JWT token." -ForegroundColor Red
    Write-Host "Get your token by logging in through the frontend or using:" -ForegroundColor Gray
    Write-Host "POST $BASE_URL/api/auth/login" -ForegroundColor Gray
    exit 1
}

# Step 2: Test Internal API Keys
Write-Host "`n🔑 Step 2: Internal API Keys Test" -ForegroundColor Yellow

# Create an internal API key
Write-Host "Creating internal API key..."
$createKeyBody = @{
    name = "PowerShell Test Key"
} | ConvertTo-Json

$createResult = Invoke-ApiRequest -Method "POST" -Endpoint "/api/keys" -Body $createKeyBody

if ($createResult.Success) {
    Write-Host "✅ API Key created successfully!" -ForegroundColor Green
    $apiKey = $createResult.Data.api_key
    $keyId = $createResult.Data.id
    Write-Host "Key ID: $keyId" -ForegroundColor Gray
    Write-Host "API Key: $($apiKey.Substring(0,20))..." -ForegroundColor Gray
} else {
    Write-Host "❌ Failed to create API key: $($createResult.Error)" -ForegroundColor Red
    $apiKey = $null
    $keyId = $null
}

# List internal API keys
Write-Host "`nListing internal API keys..."
$listResult = Invoke-ApiRequest -Method "GET" -Endpoint "/api/keys"

if ($listResult.Success) {
    Write-Host "✅ Successfully retrieved API keys list" -ForegroundColor Green
    $listResult.Data | ForEach-Object {
        Write-Host "- $($_.name): $($_.api_key_masked)" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Failed to list API keys: $($listResult.Error)" -ForegroundColor Red
}

# Test using the API key (if created)
if ($apiKey) {
    Write-Host "`nTesting API key authentication..."
    $chatBody = @{
        prompt = "Hello from PowerShell test!"
        provider = "neuroswitch"
    } | ConvertTo-Json
    
    $chatResult = Invoke-ApiRequest -Method "POST" -Endpoint "/api/chat" -Body $chatBody -Token $apiKey
    
    if ($chatResult.Success) {
        Write-Host "✅ API key authentication works!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ API key test failed (expected if NeuroSwitch not configured): $($chatResult.Error)" -ForegroundColor Yellow
    }
}

# Step 3: Test External API Keys (BYOAPI)
Write-Host "`n🔗 Step 3: External API Keys (BYOAPI) Test" -ForegroundColor Yellow

# Add external API key
Write-Host "Adding external API key for OpenAI..."
$externalKeyBody = @{
    provider_name = "OpenAI"
    api_key = "sk-test-fake-key-for-testing-purposes-only"
    key_name = "PowerShell Test OpenAI Key"
} | ConvertTo-Json

$addExternalResult = Invoke-ApiRequest -Method "POST" -Endpoint "/api/external-keys" -Body $externalKeyBody

if ($addExternalResult.Success) {
    Write-Host "✅ External API key added successfully!" -ForegroundColor Green
    $externalKeyId = $addExternalResult.Data.id
    Write-Host "External Key ID: $externalKeyId" -ForegroundColor Gray
    Write-Host "Key Preview: $($addExternalResult.Data.key_preview)" -ForegroundColor Gray
} else {
    Write-Host "❌ Failed to add external API key: $($addExternalResult.Error)" -ForegroundColor Red
    $externalKeyId = $null
}

# List external API keys
Write-Host "`nListing external API keys..."
$listExternalResult = Invoke-ApiRequest -Method "GET" -Endpoint "/api/external-keys"

if ($listExternalResult.Success) {
    Write-Host "✅ Successfully retrieved external API keys list" -ForegroundColor Green
    $listExternalResult.Data | ForEach-Object {
        Write-Host "- $($_.provider_name): $($_.key_name) ($($_.key_preview))" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Failed to list external API keys: $($listExternalResult.Error)" -ForegroundColor Red
}

# Test duplicate key (should fail)
if ($externalKeyId) {
    Write-Host "`nTesting duplicate provider key prevention..."
    $duplicateKeyBody = @{
        provider_name = "OpenAI"
        api_key = "sk-test-another-fake-key"
        key_name = "Duplicate Key"
    } | ConvertTo-Json
    
    $duplicateResult = Invoke-ApiRequest -Method "POST" -Endpoint "/api/external-keys" -Body $duplicateKeyBody
    
    if (-not $duplicateResult.Success) {
        Write-Host "✅ Duplicate key prevention works!" -ForegroundColor Green
        Write-Host "Error: $($duplicateResult.Error)" -ForegroundColor Gray
    } else {
        Write-Host "❌ Duplicate key prevention failed - this should not succeed" -ForegroundColor Red
    }
}

# Step 4: Error Testing
Write-Host "`n❌ Step 4: Error Handling Tests" -ForegroundColor Yellow

# Test invalid provider
Write-Host "Testing invalid provider..."
$invalidProviderBody = @{
    provider_name = "InvalidProvider"
    api_key = "test-key"
    key_name = "Invalid Test"
} | ConvertTo-Json

$invalidProviderResult = Invoke-ApiRequest -Method "POST" -Endpoint "/api/external-keys" -Body $invalidProviderBody

if (-not $invalidProviderResult.Success) {
    Write-Host "✅ Invalid provider rejection works!" -ForegroundColor Green
} else {
    Write-Host "❌ Invalid provider was accepted - this should fail" -ForegroundColor Red
}

# Test missing fields
Write-Host "Testing missing required fields..."
$missingFieldsBody = @{
    provider_name = "OpenAI"
} | ConvertTo-Json

$missingFieldsResult = Invoke-ApiRequest -Method "POST" -Endpoint "/api/external-keys" -Body $missingFieldsBody

if (-not $missingFieldsResult.Success) {
    Write-Host "✅ Missing fields validation works!" -ForegroundColor Green
} else {
    Write-Host "❌ Missing fields validation failed" -ForegroundColor Red
}

# Test invalid JWT token
Write-Host "Testing invalid JWT token..."
$invalidTokenResult = Invoke-ApiRequest -Method "GET" -Endpoint "/api/keys" -Token "invalid-token"

if (-not $invalidTokenResult.Success) {
    Write-Host "✅ Invalid token rejection works!" -ForegroundColor Green
} else {
    Write-Host "❌ Invalid token was accepted - this should fail" -ForegroundColor Red
}

# Step 5: Cleanup
Write-Host "`n🧹 Step 5: Cleanup" -ForegroundColor Yellow

# Delete external key
if ($externalKeyId) {
    Write-Host "Deleting external API key..."
    $deleteExternalResult = Invoke-ApiRequest -Method "DELETE" -Endpoint "/api/external-keys/$externalKeyId"
    
    if ($deleteExternalResult.Success) {
        Write-Host "✅ External API key deleted successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to delete external API key: $($deleteExternalResult.Error)" -ForegroundColor Red
    }
}

# Delete internal key
if ($keyId) {
    Write-Host "Deleting internal API key..."
    $deleteInternalResult = Invoke-ApiRequest -Method "DELETE" -Endpoint "/api/keys/$keyId"
    
    if ($deleteInternalResult.Success) {
        Write-Host "✅ Internal API key deleted successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to delete internal API key: $($deleteInternalResult.Error)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Testing Complete!" -ForegroundColor Green
Write-Host "Remember to check your server logs for detailed information about the BYOAPI flow." -ForegroundColor Cyan 