import React from 'react';
import Link from 'next/link';
import { Image, FileText, Eye, Upload, CheckCircle, ArrowRight, Copy, Zap, Shield } from 'lucide-react';

export default function MultimediaPage() {
  const supportedFormats = [
    {
      type: 'Images',
      icon: <Image className="w-6 h-6" />,
      color: 'blue',
      formats: ['JPEG', 'PNG', 'WebP', 'GIF'],
      maxSize: '20MB',
      features: [
        'Visual analysis and description',
        'OCR text extraction',
        'Object and scene recognition',
        'Chart and diagram interpretation'
      ]
    },
    {
      type: 'Documents',
      icon: <FileText className="w-6 h-6" />,
      color: 'green',
      formats: ['PDF', 'Text', 'Markdown'],
      maxSize: '50MB',
      features: [
        'Full text extraction',
        'Document structure analysis',
        'Table and form recognition',
        'Multi-page processing'
      ]
    }
  ];

  const useCases = [
    {
      title: 'Document Analysis',
      description: 'Extract insights from PDFs, forms, and documents',
      icon: <Eye className="w-5 h-5" />,
      examples: [
        'Invoice processing and data extraction',
        'Contract review and summarization',
        'Research paper analysis',
        'Legal document review'
      ]
    },
    {
      title: 'Visual Understanding',
      description: 'Analyze images, charts, and visual content',
      icon: <Image className="w-5 h-5" />,
      examples: [
        'Chart and graph interpretation',
        'Medical image analysis',
        'Product photo descriptions',
        'Scene and object recognition'
      ]
    },
    {
      title: 'OCR & Text Extraction',
      description: 'Convert images and PDFs to searchable text',
      icon: <FileText className="w-5 h-5" />,
      examples: [
        'Scanned document digitization',
        'Handwritten text recognition',
        'Receipt and invoice parsing',
        'Sign and label reading'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Image & PDF Input</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Powerful multimedia processing capabilities that let AI models analyze images, 
          extract text from PDFs, and understand visual content with ease.
        </p>
      </div>

      {/* Supported Formats */}
      <section className="grid md:grid-cols-2 gap-6">
        {supportedFormats.map((format, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${getColorClasses(format.color)}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${getColorClasses(format.color).split(' ')[1]}`}>
              {React.cloneElement(format.icon, { 
                className: `w-8 h-8 ${getColorClasses(format.color).split(' ')[0]}` 
              })}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{format.type}</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Supported Formats</h4>
              <div className="flex flex-wrap gap-2">
                {format.formats.map((fmt, fmtIndex) => (
                  <span key={fmtIndex} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900">Max Size: {format.maxSize}</h4>
            </div>
            
            <div className="space-y-2">
              {format.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* How to Upload */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Upload Files</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Base64 Encoding</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "prompt": "Analyze this image",
  "provider": "neuroswitch",
  "files": [
    {
      "type": "image",
      "data": "data:image/jpeg;base64,/9j/4AAQ...",
      "filename": "chart.jpg"
    }
  ]
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">URL Reference</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "prompt": "Extract text from this PDF",
  "provider": "neuroswitch",
  "files": [
    {
      "type": "pdf",
      "url": "https://example.com/document.pdf",
      "filename": "contract.pdf"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Use Cases</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                {React.cloneElement(useCase.icon, { className: 'w-6 h-6 text-blue-600' })}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{useCase.title}</h3>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              
              <div className="space-y-2">
                {useCase.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="flex items-start text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {example}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Processing Examples */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Processing Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Analysis</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`curl -X POST https://api.mcp4.ai/chat \\
  -H "Authorization: Bearer sk-fusion-your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Describe what you see in this image and identify any text",
    "provider": "neuroswitch",
    "files": [
      {
        "type": "image", 
        "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        "filename": "screenshot.jpg"
      }
    ]
  }'`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">PDF Text Extraction</h3>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white p-1">
                <Copy className="w-4 h-4" />
              </button>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "prompt": "Extract all the key information from this invoice",
  "provider": "neuroswitch", 
  "files": [
    {
      "type": "pdf",
      "url": "https://storage.example.com/invoice-2024-001.pdf",
      "filename": "invoice.pdf"
    }
  ],
  "max_tokens": 1000
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Response Format */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Response Format</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <pre className="text-sm text-gray-700 overflow-x-auto">
{`{
  "response": "This image shows a bar chart displaying quarterly sales data...",
  "provider_used": "claude-3-opus",
  "file_analysis": {
    "files_processed": 1,
    "total_pages": 3,
    "extracted_text_length": 2847,
    "processing_time_ms": 1250
  },
  "tokens_used": 456,
  "cost": 0.00234
}`}
          </pre>
        </div>
      </section>

      {/* Provider Support */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Provider Support Matrix</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-purple-200">
            <thead>
              <tr className="bg-purple-100 border-b border-purple-200">
                <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                <th className="text-center p-4 font-semibold text-gray-900">GPT-4V</th>
                <th className="text-center p-4 font-semibold text-gray-900">Claude 3</th>
                <th className="text-center p-4 font-semibold text-gray-900">Gemini Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple-100">
                <td className="p-4 font-medium text-gray-900">Image Analysis</td>
                <td className="p-4 text-center">✅ Excellent</td>
                <td className="p-4 text-center">✅ Excellent</td>
                <td className="p-4 text-center">✅ Good</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-4 font-medium text-gray-900">PDF Processing</td>
                <td className="p-4 text-center">✅ Native</td>
                <td className="p-4 text-center">✅ Native</td>
                <td className="p-4 text-center">🔄 Converted</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-4 font-medium text-gray-900">OCR Accuracy</td>
                <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                <td className="p-4 text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900">Max File Size</td>
                <td className="p-4 text-center">20MB</td>
                <td className="p-4 text-center">20MB</td>
                <td className="p-4 text-center">20MB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Security & Privacy</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Files encrypted in transit and at rest</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Automatic file deletion after processing</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>No permanent storage of uploaded content</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>GDPR and SOC 2 compliant processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Optimization Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Use high-resolution images for better OCR accuracy</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Compress large files to reduce processing time</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Provide specific prompts for better analysis</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600">Use NeuroSwitch for optimal model selection</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Considerations</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Processing time increases with file size</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Complex documents may require multiple requests</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Handwritten text recognition has lower accuracy</span>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">Some providers have different strengths</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Integration Examples</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/docs/quickstart/first-call" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Quick Start</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Try multimedia processing with your first API call</p>
          </Link>
          
          <Link 
            href="/docs/features/tools" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Tool Calling</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Combine file processing with function calls</p>
          </Link>
          
          <Link 
            href="/docs/api/parameters" 
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Advanced Config</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm">Fine-tune processing parameters</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Processing Multimedia</h2>
        <p className="text-gray-600 mb-6">
          Upload images and PDFs to unlock powerful AI analysis capabilities. 
          Get started with your first multimedia request today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart/first-call" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Try It Now
            <Upload className="ml-2 w-4 h-4" />
          </Link>
          <Link 
            href="/docs/api/parameters" 
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            View API Reference
          </Link>
        </div>
      </section>
    </div>
  );
} 