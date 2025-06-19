import React from 'react';
import Link from 'next/link';
import { MessageSquare, Users, Zap, HelpCircle, Code, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Discord Community - Fusion AI Documentation',
  description: 'Join the Fusion AI Discord community for support, discussions, and updates.',
};

export default function DiscordCommunityPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Join Our Discord Community</h1>
        <p className="text-lg text-gray-600">
          Connect with other Fusion AI users, get support, share ideas, and stay updated on the latest developments.
        </p>
      </div>

      {/* Discord Overview */}
      <section className="mb-12">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-indigo-900">Fusion AI Discord Server</h2>
          </div>
          <p className="text-indigo-800 mb-4">
            Our Discord server is the heart of the Fusion AI community. Get real-time help, participate in discussions, 
            and be the first to know about new features and updates.
          </p>
          <div className="flex items-center space-x-4">
            <Link 
              href="https://discord.gg/KjJcytdfGR" 
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Join Discord Server
            </Link>
            <div className="text-sm text-indigo-700">
              <Users className="w-4 h-4 inline mr-1" />
               members
            </div>
          </div>
        </div>
      </section>

      {/* Channels Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Server Channels</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">#general-support</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Get help with API integration, troubleshoot issues, and ask questions about Fusion AI features.
            </p>
            <div className="text-xs text-gray-500">
              Avg response time: 15 minutes
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">#developers</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Share code snippets, discuss integrations, and collaborate on projects using Fusion AI.
            </p>
            <div className="text-xs text-gray-500">
              Active daily discussions
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">#neuroswitch-feedback</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Share feedback about NeuroSwitch™ routing decisions and help us improve the algorithm.
            </p>
            <div className="text-xs text-gray-500">
              Direct input to our ML team
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">#showcase</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Show off projects built with Fusion AI and get inspired by what others are creating.
            </p>
            <div className="text-xs text-gray-500">
              Weekly featured projects
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Guidelines</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-4">Our Community Values</h3>
          <div className="space-y-3 text-green-800">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <strong>Be helpful:</strong> Support fellow community members with patience and kindness
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <strong>Stay on topic:</strong> Keep discussions relevant to Fusion AI and AI development
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <strong>Search first:</strong> Check existing messages and docs before asking questions
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <strong>Share knowledge:</strong> Contribute your insights and experiences with the community
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <strong>No spam:</strong> Avoid self-promotion, advertising, or off-topic content
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started on Discord</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">1. Join the Server</h3>
            <p className="text-gray-600 mb-3">
              Click the Discord invite link and follow the prompts to join our server.
            </p>
            <Link 
              href="https://discord.gg/fusionai"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Join Now <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">2. Introduce Yourself</h3>
            <p className="text-gray-600 mb-3">
              Head to #introductions and tell us about yourself and what you're building with Fusion AI.
            </p>
            <div className="bg-gray-50 rounded p-3 text-sm">
              <strong>Example:</strong> "Hi! I'm Sarah, building a content generation tool for marketers using Fusion AI. 
              Excited to learn from everyone here!"
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">3. Get Your Roles</h3>
            <p className="text-gray-600 mb-3">
              React to messages in #role-selection to get appropriate roles and access to specialized channels.
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>🧑‍💻 Developer - Access to #developers and #api-beta</p>
              <p>🏢 Enterprise - Access to #enterprise-users</p>
              <p>🎓 Student - Access to #student-discount</p>
              <p>📝 Content Creator - Access to #content-creators</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">4. Explore and Engage</h3>
            <p className="text-gray-600">
              Browse the channels, join conversations, ask questions, and share your experiences. 
              The community is here to help you succeed!
            </p>
          </div>
        </div>
      </section>

      {/* Community Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Events</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">Weekly Office Hours</h3>
            <p className="text-purple-800 text-sm mb-3">
              Join our team every Wednesday for live Q&A, feature demos, and technical discussions.
            </p>
            <div className="text-xs text-purple-700">
              Wednesdays 2:00 PM PST in #voice-chat
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Monthly Hackathons</h3>
            <p className="text-blue-800 text-sm mb-3">
              Build creative projects using Fusion AI in our monthly community hackathons.
            </p>
            <div className="text-xs text-blue-700">
              First Saturday of each month
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-semibold text-orange-900 mb-3">Feature Previews</h3>
            <p className="text-orange-800 text-sm mb-3">
              Get early access to new features and provide feedback before public release.
            </p>
            <div className="text-xs text-orange-700">
              Beta channel announcements
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">Expert AMAs</h3>
            <p className="text-green-800 text-sm mb-3">
              Ask Me Anything sessions with AI researchers, engineers, and industry experts.
            </p>
            <div className="text-xs text-green-700">
              Monthly guest speakers
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Support */}
      <section className="mb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Prefer Other Support Channels?</h3>
          <p className="text-gray-600 mb-4">
            While Discord is great for community discussions, we also offer other support options:
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">
                <strong>Email Support:</strong> support.fusionai@mcp4.ai for direct assistance
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-gray-700">
                <strong>Documentation:</strong> Comprehensive guides and API reference
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">
                <strong>GitHub Issues:</strong> Bug reports and feature requests
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 pt-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ready to Join?</h2>
          <p className="text-gray-600 mb-6">
            Become part of our growing community and help shape the future of AI routing.
          </p>
          <Link 
            href="https://discord.gg/KjJcytdfGR"
            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Join Discord Now
          </Link>
        </div>
      </section>
    </div>
  );
} 