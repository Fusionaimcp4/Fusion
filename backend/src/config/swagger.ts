// Conditional swagger setup - only load packages when needed
let swaggerJsdoc: any = null;
let swaggerUi: any = null;
let specs: any = null;

// Check if swagger should be enabled
const shouldEnableSwagger = process.env.NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER === 'true';

if (shouldEnableSwagger) {
  try {
    swaggerJsdoc = require('swagger-jsdoc');
    swaggerUi = require('swagger-ui-express');

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Fusion AI API Documentation',
          version: '1.0.0',
          description: 'Comprehensive API documentation for the Fusion AI platform - a unified AI orchestration system with NeuroSwitch™ technology',
          contact: {
            name: 'Fusion AI Support',
            email: 'support.fusionai@mcp4.ai'
          },
          license: {
            name: 'Private',
            url: 'https://mcp4.ai/privacy'
          }
        },
        servers: [
          {
            url: 'https://api.mcp4.ai',
            description: 'Production server'
          },
          {
            url: 'http://localhost:5000',
            description: 'Development server'
          }
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: 'JWT token obtained from user login. Use this for session-based access.'
            },
            apiKeyAuth: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: 'Platform API key authentication. Format: "ApiKey sk-fusion-..."'
            }
          },
          schemas: {
            Error: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message'
                },
                details: {
                  type: 'string',
                  description: 'Additional error details'
                }
              },
              required: ['error']
            },
            ApiKey: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  description: 'Unique identifier for the API key'
                },
                name: {
                  type: 'string',
                  description: 'Human-readable name for the API key'
                },
                api_key: {
                  type: 'string',
                  description: 'The actual API key (only shown on creation)'
                },
                api_key_masked: {
                  type: 'string',
                  description: 'Masked version of the API key for display'
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Creation timestamp'
                },
                last_used_at: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                  description: 'Last usage timestamp'
                },
                is_active: {
                  type: 'boolean',
                  description: 'Whether the API key is active'
                }
              }
            },
            ExternalApiKey: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  description: 'Unique identifier for the external API key'
                },
                provider_id: {
                  type: 'integer',
                  description: 'ID of the AI provider'
                },
                provider_name: {
                  type: 'string',
                  description: 'Name of the AI provider (OpenAI, Claude, Gemini)'
                },
                key_name: {
                  type: 'string',
                  description: 'User-defined name for the key'
                },
                key_preview: {
                  type: 'string',
                  description: 'Masked preview of the API key'
                },
                is_active: {
                  type: 'boolean',
                  description: 'Whether the key is active'
                },
                created_at: {
                  type: 'string',
                  format: 'date-time'
                },
                updated_at: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            },
            ChatRequest: {
              type: 'object',
              properties: {
                prompt: {
                  type: 'string',
                  description: 'The user message/prompt'
                },
                provider: {
                  type: 'string',
                  description: 'Target AI provider (neuroswitch, openai, claude, gemini)',
                  enum: ['neuroswitch', 'openai', 'claude', 'gemini']
                },
                model: {
                  type: 'string',
                  description: 'Specific model to use (optional)'
                },
                image: {
                  type: 'string',
                  description: 'Base64 encoded image for vision models (optional)'
                },
                mode: {
                  type: 'string',
                  description: 'Chat mode (optional)'
                },
                tools: {
                  type: 'array',
                  items: {
                    type: 'object'
                  },
                  description: 'Optional tool definitions to enable for this request'
                },
                enable_tools: {
                  type: 'boolean',
                  description: 'Enable automatic tool execution on NeuroSwitch (optional)'
                }
              },
              required: ['prompt']
            },
            ChatResponse: {
              type: 'object',
              properties: {
                prompt: {
                  type: 'string',
                  description: 'The original prompt'
                },
                response: {
                  type: 'object',
                  properties: {
                    text: {
                      type: 'string',
                      description: 'The AI response text'
                    }
                  }
                },
                provider: {
                  type: 'string',
                  description: 'Actual provider used'
                },
                model: {
                  type: 'string',
                  description: 'Actual model used'
                },
                tokens: {
                  type: 'object',
                  properties: {
                    total_tokens: {
                      type: 'integer'
                    },
                    input_tokens: {
                      type: 'integer'
                    },
                    output_tokens: {
                      type: 'integer'
                    },
                    runtime: {
                      type: 'number',
                      description: 'Processing runtime in milliseconds (if available)'
                    }
                  }
                },
                cost_charged_to_credits: {
                  type: 'number',
                  description: 'LLM cost charged to user credits for this request'
                },
                neuroswitch_fee_charged_to_credits: {
                  type: 'number',
                  description: 'NeuroSwitch classifier fee charged to credits (if applicable)'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time'
                },
                image_url: {
                  type: 'string',
                  nullable: true,
                  description: 'URL of uploaded/generated image (if any)'
                },
                file_url: {
                  type: 'string',
                  nullable: true,
                  description: 'URL of generated file (if any)'
                },
                file_name: {
                  type: 'string',
                  nullable: true
                },
                mime_type: {
                  type: 'string',
                  nullable: true
                }
              }
            },
            User: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer'
                },
                email: {
                  type: 'string',
                  format: 'email'
                },
                display_name: {
                  type: 'string'
                },
                role: {
                  type: 'string',
                  enum: ['user', 'admin', 'tester']
                },
                is_verified: {
                  type: 'boolean'
                },
                created_at: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          }
        },
        security: [
          { bearerAuth: [] },
          { apiKeyAuth: [] }
        ],
        tags: [
          {
            name: 'Authentication',
            description: 'User authentication and registration'
          },
          {
            name: 'API Keys',
            description: 'Internal platform API key management'
          },
          {
            name: 'External API Keys',
            description: 'BYOAPI - User-provided AI provider keys'
          },
          {
            name: 'Chat',
            description: 'AI chat interactions and NeuroSwitch routing'
          },
          {
            name: 'Models',
            description: 'Available AI models and providers'
          },
          {
            name: 'User Profile',
            description: 'User account and profile management'
          },
          {
            name: 'Credits',
            description: 'Credit balance and transactions'
          },
          {
            name: 'Chat History',
            description: 'Chat conversation management'
          }
        ]
      },
      apis: [
        './src/routes/*.ts',
        './src/server.ts'
      ],
    };

    specs = swaggerJsdoc(options);
    console.log('✅ Swagger documentation initialized successfully');
  } catch (error) {
    console.error('❌ Swagger setup failed:', error);
    console.log('Swagger documentation will not be available');
  }
} else {
  console.log('📚 Swagger documentation disabled in production mode');
}

export { specs, swaggerUi }; 