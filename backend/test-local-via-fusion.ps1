$headers = @{
    'Authorization' = 'ApiKey sk-fusion-a24fc0c852513dd0964c5ea19ada4f98bac9bc630a80c100b3531398'
    'Content-Type' = 'application/json'
}

$body = @{
    prompt = "5+5"
    provider = "openai"
    model = "gpt-4o-mini"
    tools = @(
        @{
            type = "function"
            function = @{
                name = "calculator"
                description = "Math calculator"
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

Write-Host "🧪 Testing LOCAL NeuroSwitch via Fusion API..."
Write-Host "=" * 50

try {
    $response = Invoke-RestMethod -Uri 'https://api.mcp4.ai/api/chat' -Method POST -Headers $headers -Body ($body | ConvertTo-Json -Depth 10)
    
    Write-Host "✅ LOCAL NeuroSwitch Results:"
    Write-Host "Response text: '$($response.response.text)'"
    Write-Host "Tool calls: $($response.tool_calls)"
    Write-Host "Tool name: $($response.tool_name)"
    Write-Host "Provider: $($response.provider)"
    Write-Host "Model: $($response.model)"
    
    Write-Host "`n📋 Full Response:"
    $response | ConvertTo-Json -Depth 10
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)"
}
