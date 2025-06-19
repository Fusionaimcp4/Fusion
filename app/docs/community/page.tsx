import React from 'react';
import Link from 'next/link';
import { Users, FileText, Lightbulb, MessageSquare, Github, Heart, Star, GitPullRequest, CheckCircle, ArrowRight, Book, Trophy, Zap, Globe, Send, Code, PenTool, Rocket } from 'lucide-react';

export const metadata = {
  title: 'Community - Fusion AI Documentation',
  description: 'Join the Fusion AI community! Contribute to documentation, participate in research challenges, request features, and connect with other developers.',
};

export default function CommunityPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join thousands of developers, researchers, and AI enthusiasts building the future of intelligent routing. 
          Your contributions make Fusion AI better for everyone.
        </p>
      </div>

      {/* Overview */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
        <div className="flex items-start space-x-3 mb-6">
          <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Building Together</h2>
            <p className="text-gray-700">
              Our community thrives on collaboration, knowledge sharing, and innovation. Whether you're documenting features, 
              solving research challenges, or building the next breakthrough, we welcome your contributions.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Documentation</h3>
            <p className="text-sm text-gray-600">Improve & expand our docs</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Lightbulb className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Research</h3>
            <p className="text-sm text-gray-600">Tackle AI routing challenges</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Features</h3>
            <p className="text-sm text-gray-600">Shape our roadmap</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Discord</h3>
            <p className="text-sm text-gray-600">Connect with the community</p>
          </div>
        </div>
      </section>

      {/* Contribute Docs Section */}
      <section id="contribute" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Contribute Docs</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Help us build the most comprehensive AI routing documentation. From fixing typos to writing entire guides, 
          every contribution makes our docs better for developers worldwide.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Contribute</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Fork the Repository</h4>
                    <p className="text-sm text-gray-600">Start by forking our docs repository on GitHub</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Make Your Changes</h4>
                    <p className="text-sm text-gray-600">Edit files, add examples, fix errors, or write new content</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Submit a Pull Request</h4>
                    <p className="text-sm text-gray-600">Our team reviews and merges quality contributions</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Need</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Code Examples:</span>
                    <span className="text-gray-600"> Real-world implementation snippets</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Tutorials:</span>
                    <span className="text-gray-600"> Step-by-step guides for common tasks</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Error Fixes:</span>
                    <span className="text-gray-600"> Typos, broken links, and outdated info</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">Translations:</span>
                    <span className="text-gray-600"> Help make docs accessible globally</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Quick Start Guide</h3>
            <pre className="text-sm text-green-400 overflow-x-auto">
{`# Clone the docs repository
git clone https://github.com/fusionai/docs.git
cd docs

# Create a new branch
git checkout -b improve-routing-examples

# Make your changes
# Edit files in app/docs/

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Add routing examples for startups"
git push origin improve-routing-examples

# Open pull request on GitHub`}
            </pre>
            <div className="mt-4 flex space-x-3">
              <Link 
                href="https://github.com/fusionai/docs" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                View Repository
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4">Contributor Recognition</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Hall of Fame</h5>
              <p className="text-sm text-gray-600">Top contributors featured on our website</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Swag & Credits</h5>
              <p className="text-sm text-gray-600">Exclusive merch and API credits</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Early Access</h5>
              <p className="text-sm text-gray-600">Beta features and insider updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Challenges Section */}
      <section id="research" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Research Challenges</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Join cutting-edge research initiatives to advance AI routing technology. Collaborate with experts, 
          publish papers, and help solve the fundamental challenges in intelligent model selection.
        </p>

        <div className="space-y-8">
          {/* Active Challenges */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🏆 Active Challenges</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Multi-Modal Routing Optimization</h4>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">$50K Prize</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Develop algorithms to optimally route requests across text, image, and audio models 
                  based on content analysis and performance requirements.
                </p>
                <div className="text-xs text-gray-500">Deadline: March 31, 2024</div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Real-time Latency Prediction</h4>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">$25K Prize</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Build ML models to predict API response times for different providers 
                  considering prompt complexity, model load, and regional factors.
                </p>
                <div className="text-xs text-gray-500">Deadline: April 15, 2024</div>
              </div>
            </div>
          </div>

          {/* Research Areas */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔬 Research Areas</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Intelligent Routing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Prompt complexity analysis</li>
                  <li>• Model capability matching</li>
                  <li>• Cost-performance optimization</li>
                  <li>• Dynamic load balancing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Performance Prediction</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Latency forecasting</li>
                  <li>• Quality score estimation</li>
                  <li>• Resource usage prediction</li>
                  <li>• Failure probability modeling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">System Optimization</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Caching strategies</li>
                  <li>• Batch processing efficiency</li>
                  <li>• Regional optimization</li>
                  <li>• Provider selection algorithms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Participate */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Participate</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Getting Started</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Join our research Discord channel</li>
                  <li>Review challenge requirements and datasets</li>
                  <li>Form teams or participate individually</li>
                  <li>Submit your proposal for feedback</li>
                  <li>Develop and test your solution</li>
                  <li>Present results to the research committee</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Resources Available</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Access to anonymized routing data</li>
                  <li>• Free API credits for testing</li>
                  <li>• Mentorship from our research team</li>
                  <li>• Computing resources for training</li>
                  <li>• Publication opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Features Section */}
      <section id="features" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Request Features</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Help shape the future of Fusion AI! Your feature requests and feedback drive our roadmap. 
          From small improvements to major new capabilities, we want to hear your ideas.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Submit Requests</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Github className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-gray-900">GitHub Issues</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Create detailed feature requests with use cases and examples.
                  </p>
                  <Link 
                    href="https://github.com/fusionai/platform/issues/new?template=feature_request.md"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Submit Feature Request →
                  </Link>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-gray-900">Community Discussions</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Discuss ideas with the community before formal submission.
                  </p>
                  <Link 
                    href="https://github.com/fusionai/platform/discussions"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Join Discussions →
                  </Link>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Send className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-gray-900">Direct Feedback</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Email our product team for urgent or sensitive requests.
                  </p>
                  <Link 
                    href="mailto:product@fusionai.com"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    product@fusionai.com →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Roadmap</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-400 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">Q1 2024</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">In Progress</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Multi-modal routing (text + images)</li>
                    <li>• Advanced caching mechanisms</li>
                    <li>• Real-time usage analytics</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">Q2 2024</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Planned</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Custom model fine-tuning</li>
                    <li>• Team collaboration features</li>
                    <li>• Enhanced security controls</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-gray-400 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">Q3 2024</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Proposed</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Voice/audio model routing</li>
                    <li>• Workflow automation tools</li>
                    <li>• Enterprise SSO integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-4">Most Requested Features</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">🔥 High Demand</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>GraphQL API support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Webhook notifications</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Custom model hosting</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">📈 Growing Interest</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Video content analysis routing</li>
                <li>• Batch processing optimization</li>
                <li>• A/B testing frameworks</li>
                <li>• Cost prediction APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section id="discord" className="scroll-mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Discord Community</h2>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Connect with fellow developers, get real-time support, share your projects, and stay updated 
          on the latest developments. Our Discord is the heart of the Fusion AI community.
        </p>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 text-white mb-8">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Join 15,000+ Developers</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Get instant help, share knowledge, participate in events, and connect with the team 
              behind Fusion AI. Our community is active 24/7 across all timezones.
            </p>
            <Link 
              href="https://discord.gg/fusionai"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Join Discord Server
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">#general-help</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Get quick answers to API questions, implementation help, and troubleshooting support.
            </p>
            <div className="text-xs text-gray-500">Most active channel • Average response: 12 minutes</div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">#showcase</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Share your projects, get feedback, and discover amazing applications built with Fusion AI.
            </p>
            <div className="text-xs text-gray-500">Weekly featured projects • Community voting</div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">#research</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Discuss AI routing research, share papers, and collaborate on challenging problems.
            </p>
            <div className="text-xs text-gray-500">Academic discussions • Research collaboration</div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-4">Community Guidelines</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">✅ We Encourage</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Helpful and respectful communication</li>
                <li>• Sharing knowledge and resources</li>
                <li>• Constructive feedback and suggestions</li>
                <li>• Celebrating community achievements</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">❌ Please Avoid</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Spam or excessive self-promotion</li>
                <li>• Sharing proprietary API keys</li>
                <li>• Off-topic or inappropriate content</li>
                <li>• Harassment or discriminatory behavior</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Involved?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Whether you're here to contribute code, conduct research, request features, or just connect 
          with fellow developers, there's a place for you in our community.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="https://github.com/fusionai/docs"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            Contribute Docs
          </Link>
          
          <Link 
            href="https://discord.gg/fusionai"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Join Discord
          </Link>
          
          <Link 
            href="https://github.com/fusionai/platform/issues/new"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Star className="w-5 h-5 mr-2" />
            Request Feature
          </Link>
        </div>
      </section>
    </div>
  );
} 