# Test Fusion API to see what NeuroSwitch returns
$headers = @{
    'Authorization' = 'ApiKey sk-fusion-a24fc0c852513dd0964c5ea19ada4f98bac9bc630a80c100b3531398'
    'Content-Type' = 'application/json'
}

Write-Host "🧪 Testing Fusion API with tools to see NeuroSwitch response..."
Write-Host "=" * 60

$body = @{
    prompt = "5+5"
    provider = "openai"
    model = "gpt-4o-mini"
    tools = @(
        @{
            type = "function"
            function = @{
                name = "calculator"
                description = "Useful for getting the result of a math expression."
                parameters = @{
                    type = "object"
                    properties = @{
                        input = @{
                            type = "string"
                        }
                    }
                }
            }
        }
    )
    enable_tools = $true
}

try {
    $response = Invoke-RestMethod -Uri 'https://api.mcp4.ai/api/chat' -Method POST -Headers $headers -Body ($body | ConvertTo-Json -Depth 10)
    
    Write-Host "📥 Fusion API Response Analysis:"
    Write-Host "Response text: '$($response.response.text)'"
    Write-Host "Provider: $($response.provider)"
    Write-Host "Model: $($response.model)"
    Write-Host "Tool calls field: $($response.tool_calls)"
    Write-Host "Tool name field: $($response.tool_name)"
    Write-Host "Tokens used: $($response.tokens.total_tokens)"
    
    Write-Host "`n🔍 Key Findings:"
    if ($response.response.text -eq "") {
        Write-Host "❌ Response text is EMPTY"
    } else {
        Write-Host "✅ Response text has content"
    }
    
    if ($response.tool_calls) {
        Write-Host "✅ Tool calls field is present"
    } else {
        Write-Host "❌ Tool calls field is MISSING"
    }
    
    if ($response.tool_name) {
        Write-Host "✅ Tool name field is present"
    } else {
        Write-Host "❌ Tool name field is MISSING"
    }
    
    Write-Host "`n📋 Full Response:"
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Response: $($_.Exception.Response)"
    }
}
