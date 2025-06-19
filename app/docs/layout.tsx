'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, Book, Menu, X, ChevronDown, ChevronRight, Rocket, HelpCircle, 
  Scale, Cpu, Zap, Lock, Shuffle, GitBranch, Code, Lightbulb, Users, CreditCard
} from 'lucide-react';

interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  {
    title: 'Overview',
    icon: Book,
    children: [
      { title: 'What is Fusion AI?', href: '/docs' },
      { title: 'Key Benefits', href: '/docs/overview/benefits' },
      { title: 'How NeuroSwitch Works', href: '/docs/overview/neuroswitch' },
      { title: 'Data Flow', href: '/docs/overview/data-flow' }
    ]
  },
  {
    title: 'Quickstart',
    icon: Rocket,
    children: [
      { title: 'Get Your API Key', href: '/docs/quickstart' },
      { title: 'Test Your First Call', href: '/docs/quickstart/first-call' },
      { title: 'SDKs and Postman', href: '/docs/quickstart/sdks' },
      { title: 'Set Up Chat Session', href: '/docs/quickstart/chat-setup' }
    ]
  },
  {
    title: 'FAQ',
    icon: HelpCircle,
    children: [
      { title: 'Common Questions', href: '/docs/faq' },
      { title: 'Token Usage', href: '/docs/faq/tokens' },
      { title: 'What is NeuroSwitch?', href: '/docs/faq/neuroswitch' },
      { title: 'Troubleshooting', href: '/docs/faq/troubleshooting' }
    ]
  },
  {
    title: 'Principles',
    icon: Scale,
    children: [
      { title: 'Privacy First', href: '/docs/principles#privacy' },
      { title: 'Model Agnostic', href: '/docs/principles#agnostic' },
      { title: 'Transparent Routing', href: '/docs/principles#transparent' },
      { title: 'Extensible & Future-Ready', href: '/docs/principles#extensible' }
    ]
  },
  {
    title: 'Models',
    icon: Cpu,
    children: [
      { title: 'Supported Models', href: '/docs/models' },
      { title: 'Fusion-Native Models', href: '/docs/models/fusion-native' },
      { title: 'Model Capabilities', href: '/docs/models/capabilities' },
      { title: 'Model Comparison', href: '/docs/models/comparison' }
    ]
  },
  {
    title: 'Features',
    icon: Zap,
    children: [
      { title: 'Overview', href: '/docs/features' },
      { title: 'Prompt Caching', href: '/docs/features/caching' },
      { title: 'Tool Calling', href: '/docs/features/tools' },
      { title: 'Message Transforms', href: '/docs/features/transforms' },
      { title: 'Streaming Support', href: '/docs/features/streaming' },
      { title: 'Image & PDF Input', href: '/docs/features/multimedia' },
      { title: 'Web Search Integration', href: '/docs/features/web-search' }
    ]
  },
  {
    title: 'Payments',
    icon: CreditCard,
    children: [
      { title: 'Payment Methods', href: '/docs/payments' },
      { title: 'Stripe Integration', href: '/docs/payments/stripe' },
      { title: 'Bitcoin & Lightning', href: '/docs/payments/bitcoin' },
      { title: 'Billing & Invoices', href: '/docs/payments/billing' }
    ]
  },
  {
    title: 'Privacy and Logging',
    icon: Lock,
    children: [
      { title: 'What We Log', href: '/docs/privacy/logging' },
      { title: 'What We Don\'t Log', href: '/docs/privacy/no-logging' },
      { title: 'Opt-out Policies', href: '/docs/privacy/opt-out' },
      { title: 'Region-aware Logging', href: '/docs/privacy/regions' }
    ]
  },
  {
    title: 'Model Routing',
    icon: Shuffle,
    children: [
      { title: 'How NeuroSwitch Routes', href: '/docs/routing#neuroswitch' },
      { title: 'Provider Failover', href: '/docs/routing#failover' },
      { title: 'Routing Examples', href: '/docs/routing/examples' }
    ]
  },
  {
    title: 'Provider Routing',
    icon: GitBranch,
    children: [
      { title: 'Bring Your Own API Key', href: '/docs/providers/byoapi' },
      { title: 'Fallback Rules', href: '/docs/providers#fallback' },
      { title: 'Multi-provider Logic', href: '/docs/providers#multi-provider' }
    ]
  },
  {
    title: 'API Reference',
    icon: Code,
    children: [
      { title: 'Overview', href: '/docs/api' },
      { title: 'Authentication', href: '/docs/api/auth' },
      { title: 'Endpoints', href: '/docs/api/endpoints' },
      { title: 'Parameters', href: '/docs/api/parameters' },
      { title: 'Errors', href: '/docs/api/errors' },
      { title: 'Rate Limits', href: '/docs/api/limits' }
    ]
  },
  {
    title: 'Use Cases',
    icon: Lightbulb,
    children: [
      { title: 'Researchers', href: '/docs/use-cases#researchers' },
      { title: 'Startups', href: '/docs/use-cases#startups' },
      { title: 'Agents/Tool Developers', href: '/docs/use-cases#agents' },
      { title: 'Enterprises', href: '/docs/use-cases#enterprises' }
    ]
  },
  {
    title: 'Community',
    icon: Users,
    children: [
      { title: 'Contribute Docs', href: '/docs/community#contribute' },
      { title: 'Research Challenges', href: '/docs/community#research' },
      { title: 'Request Features', href: '/docs/community#features' },
      { title: 'Discord', href: '/docs/community/discord' }
    ]
  }
];

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Overview']));
  const pathname = usePathname();

  // Auto-expand section based on current path
  useEffect(() => {
    navigation.forEach(section => {
      if (section.children?.some(child => child.href === pathname)) {
        setExpandedSections(prev => new Set([...Array.from(prev), section.title]));
      }
    });
  }, [pathname]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionTitle)) {
        newSet.delete(sectionTitle);
      } else {
        newSet.add(sectionTitle);
      }
      return newSet;
    });
  };

  const filteredNavigation = navigation.map(section => ({
    ...section,
    children: section.children?.filter(child =>
      child.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => 
    section.children && section.children.length > 0 || 
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-3 left-2 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50"
          aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/docs" className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
  <img
    src="/neuroswitch.png"
    alt="Fusion AI Logo"
    className="w-6 h-6 object-contain rounded"
  />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Fusion AI</h1>
                <p className="text-sm text-gray-500">Documentation</p>
              </div>
            </Link>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search or ask AI a question"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search documentation"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredNavigation.map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    aria-expanded={expandedSections.has(section.title)}
                    aria-label={`Toggle ${section.title} section`}
                  >
                    <div className="flex items-center space-x-3">
                      {IconComponent && <IconComponent className="w-5 h-5 text-gray-700" />}
                      <span className="font-medium text-gray-900">{section.title}</span>
                    </div>
                    {expandedSections.has(section.title) ? 
                      <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    }
                  </button>
                  
                  {expandedSections.has(section.title) && section.children && (
                    <div className="ml-8 mt-1 space-y-1">
                      {section.children.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href || '#'}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            pathname === item.href
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-80">
        {/* Top navigation bar for mobile */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-start px-4 space-x-4">
  

  <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
    ← Back to Fusion AI
  </Link>
</div>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 