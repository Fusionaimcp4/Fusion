'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Define the section types for type safety
type SectionName = 'infrastructure' | 'aiProviders' | 'testing' | 'frontend'

// Main roadmap page component
export default function RoadmapPage() {
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    infrastructure: true,
    aiProviders: true,
    testing: true,
    frontend: true
  })

  const toggleSection = (section: SectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero/Header */}
      <section className="pt-16 md:pt-24 pb-12 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            Product <span className="font-normal">Roadmap</span>
          </h1>
          <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto">
            Our development journey and future plans for Fusion AI
          </p>
        </div>
      </section>

      {/* What You've Done (So Far) Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light mb-8 flex items-center">
            <span className="text-orange-500 mr-2">✅</span> What You've Done (So Far)
          </h2>

          {/* Infrastructure & Backend */}
          <div className="mb-8 border border-neutral-200 rounded-lg overflow-hidden">
            <div 
              className="p-4 bg-neutral-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('infrastructure')}
            >
              <h3 className="font-mono text-[14px] tracking-wider flex items-center">
                <span className="text-xl mr-2">🔧</span> INFRASTRUCTURE & BACKEND
              </h3>
              <span className="text-lg">{expandedSections.infrastructure ? '−' : '+'}</span>
            </div>
            
            {expandedSections.infrastructure && (
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Deployed Fusion AI backend with Flask for orchestration.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Implemented local zero-shot classification via facebook/bart-large-mnli using Hugging Face Transformers.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Removed dependency on external HF API → improved latency + privacy.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Set up NeuroSwitch classifier for AI provider routing.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Built robust logging/debug system during zero-shot inference and request routing.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Added provider fallback logic (default = Claude).
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* AI Providers */}
          <div className="mb-8 border border-neutral-200 rounded-lg overflow-hidden">
            <div 
              className="p-4 bg-neutral-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('aiProviders')}
            >
              <h3 className="font-mono text-[14px] tracking-wider flex items-center">
                <span className="text-xl mr-2">🧠</span> AI PROVIDERS
              </h3>
              <span className="text-lg">{expandedSections.aiProviders ? '−' : '+'}</span>
            </div>
            
            {expandedSections.aiProviders && (
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Integrated OpenAI, Claude (Anthropic), and Gemini with individual provider files.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Handled partial context compatibility between Claude ↔ OpenAI ↔ Gemini.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Began planning context sanitization (to fix Gemini throwing tantrums).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Set up provider switching based on labels (LABEL_PROVIDER_MAP).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Implemented conversational continuity across AI models using shared conversation_history.
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Testing & Tools */}
          <div className="mb-8 border border-neutral-200 rounded-lg overflow-hidden">
            <div 
              className="p-4 bg-neutral-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('testing')}
            >
              <h3 className="font-mono text-[14px] tracking-wider flex items-center">
                <span className="text-xl mr-2">🧪</span> TESTING & TOOLS
              </h3>
              <span className="text-lg">{expandedSections.testing ? '−' : '+'}</span>
            </div>
            
            {expandedSections.testing && (
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Ran live continuity tests between models (e.g., blog post from Gemini ideas → OpenAI writeup).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Integrated file editing tools (diffeditortool, fileedittool).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Conducted real-world context conflict tests.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Used Claude and OpenAI to collaboratively write and edit the same HTML file (yes, that worked).
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Frontend & Auth */}
          <div className="mb-8 border border-neutral-200 rounded-lg overflow-hidden">
            <div 
              className="p-4 bg-neutral-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('frontend')}
            >
              <h3 className="font-mono text-[14px] tracking-wider flex items-center">
                <span className="text-xl mr-2">🧱</span> FRONTEND & AUTH
              </h3>
              <span className="text-lg">{expandedSections.frontend ? '−' : '+'}</span>
            </div>
            
            {expandedSections.frontend && (
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Created marketing-ready landing page (Fusion AI branding, logos, sections).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Login system with email + social auth (Google, Apple, etc.).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Post-login dashboard routing to chat interface.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <p className="font-light text-[14px] leading-relaxed">
                      Chat UI wired to NeuroSwitch for smart routing.
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What You're Working On Now Section */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light mb-8 flex items-center">
            <span className="text-orange-500 mr-2">📌</span> What You're Working On Now
          </h2>

          <div className="bg-white p-8 border border-neutral-200 rounded-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">☑️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Build context_sanitizer.py for model-specific history preprocessing.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-1">🔄</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Routing logic for sub-models.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-300 mr-2 mt-1">⬜️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Add real-time dynamic model scoring using llm-stats.com or equivalent.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-300 mr-2 mt-1">⬜️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Add price-based routing weight into task assignment logic.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-300 mr-2 mt-1">⬜️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Add slider UI: user-defined priority (cost ↔ accuracy).
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-300 mr-2 mt-1">⬜️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Deploy backend API endpoint (/neuroswitch/api) for external access.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-300 mr-2 mt-1">⬜️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Protect backend using Cloudflare Tunnel + domain + login.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-300 mr-2 mt-1">⬜️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Add "Coming Soon" roadmap section to frontend.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-neutral-300 mr-2 mt-1">⬜️</span>
                <p className="font-light text-[14px] leading-relaxed">
                  Add roadmap to database or markdown + display to user (optional).
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap (Next) Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light mb-8 flex items-center">
            <span className="text-orange-500 mr-2">🧭</span> Roadmap (Next)
          </h2>

          {/* Short-Term Goals */}
          <div className="mb-12">
            <h3 className="font-mono text-[16px] tracking-wider mb-6 flex items-center">
              <span className="text-xl mr-2">🧪</span> SHORT-TERM GOALS (v1.5-v2)
            </h3>
            
            <div className="bg-neutral-50 p-8 border border-neutral-200 rounded-lg">
              <ul className="space-y-4">
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Auto-correct classification misfires with user feedback (supervised training).
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Improve routing accuracy based on user correction patterns
                  </div>
                </li>
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Let user pick between top-2 model answers.
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Enhanced user control over responses
                  </div>
                </li>
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Track per-query cost and score → adaptive routing weight.
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Cost optimization based on usage patterns
                  </div>
                </li>
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Add user preferences to remember last selected model per provider.
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Personalized model selection persistence
                  </div>
                </li>
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Enable "automatic fallback" with logs explaining reroutes.
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Transparent routing decisions for users
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Mid-Term Goals */}
          <div className="mb-12">
            <h3 className="font-mono text-[16px] tracking-wider mb-6 flex items-center">
              <span className="text-xl mr-2">🚀</span> MID-TERM GOALS (v2-v3)
            </h3>
            
            <div className="bg-neutral-50 p-8 border border-neutral-200 rounded-lg">
              <ul className="space-y-4">
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Add fine-tuning pipeline for the local classifier (with labeled data).
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Continuously improve routing accuracy
                  </div>
                </li>
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Track user performance → score models for personalization.
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    User-specific model preferences
                  </div>
                </li>
                <li className="flex items-start group relative">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Add more model providers: Meta, Mistral, xAI, Qwen, DeepSeek.
                  </p>
                  <div className="absolute left-0 -top-2 w-64 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Expand the AI ecosystem
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Deployment Plan */}
          <div>
            <h3 className="font-mono text-[16px] tracking-wider mb-6 flex items-center">
              <span className="text-xl mr-2">🔐</span> DEPLOYMENT PLAN
            </h3>
            
            <div className="bg-neutral-50 p-8 border border-neutral-200 rounded-lg">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">🌐</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Host frontend publicly.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">🛡️</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Expose backend securely via domain tunnel.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">🔒</span>
                  <p className="font-light text-[14px] leading-relaxed">
                    Use Flask rate-limiting + domain header check for security.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-light mb-6">
            Want to contribute or suggest features?
          </h2>
          <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-md mx-auto mb-8">
            We're constantly improving Fusion AI based on user feedback
          </p>
          <Link
            href="/signup"
            className="inline-block bg-black text-white font-mono text-[11px] tracking-wider px-6 py-3 hover:bg-orange-500 transition-colors"
          >
            GET STARTED →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-[11px] tracking-wider">
              © 2024 Fusion AI
            </div>
            <div className="flex gap-8">
              <Link href="/privacy" className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors">
                PRIVACY
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 