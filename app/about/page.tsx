import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Fusion AI',
  description: 'We build AI agents that understand and serve your goals.',
  openGraph: {
    images: ['/content/images/fusion-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/content/images/fusion-logo.png'],
  }
}

const teamMembers = [
  {
    name: 'Kenneth F. Cavanagh',
    role: 'Founder & Principal',
    image: '/content/images/HEADSHOT1.png',
    bio: 'Industrial Psychologist and former SpaceX analytics lead applying systems thinking and behavioral science to AI architecture. Founder of Fusion AI and long-time builder of human-centered automation systems.',
    social: {
      url: 'https://www.linkedin.com/in/k3nneth/',
      label: 'LinkedIn →'
    }
  },
  {
    name: 'Saint',
    role: 'Research & Content',
    image: '/content/images/St_HEADSHOT.jpeg',
    bio: 'AI creator pushing the boundaries of agent personality and story-based UX. Founder of the Boo Kingdom RPG community and expert in interactive narrative systems.',
    social: {
      url: 'https://www.bootosh.ai/',
      label: 'Web →'
    }
  },
  {
    name: 'Rob Renn',
    role: 'Design Engineering',
    image: '/content/images/ROB_HEADSHOT.jpeg',
    bio: 'Product designer and full-stack systems architect. Brings experience from Stanford, Lockheed Skunkworks, and multiple AI/crypto ventures into user-first design for emerging tech.',
    social: {
      url: 'https://www.linkedin.com/in/future-rob/',
      label: 'LinkedIn →'
    }
  },
]

export default function About() {
  const desktopTeamMembers = [
    teamMembers[1], // Saint
    teamMembers[0], // Ken
    teamMembers[2], // Rob
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          {/* About Section */}
          <section className="mb-20">
            <h1 className="text-[42px] font-light leading-[1.1] mb-8">About</h1>
            <div className="prose prose-neutral max-w-none">
              <p className="text-[13px] font-light leading-relaxed mb-6">
                Fusion AI is a builder's lab for smart, human-aligned AI tools. We develop multi-model agent systems that bridge people and platforms through language, intent, and identity.
              </p>
              <p className="text-[13px] font-light leading-relaxed mb-6">
                From one-person startups to scaling teams, we empower creators and companies to build on top of foundational AI models—without needing to reinvent the wheel.
              </p>
              <p className="text-[13px] font-light leading-relaxed mb-6">
                Our platform fuses the best LLM providers (like OpenAI, Anthropic, and Gemini) with a configurable layer for switching, testing, and deploying custom logic agents.
              </p>
              <p className="text-[13px] font-light leading-relaxed">
                Whether you're shipping a chatbot, knowledge engine, or character interface, Fusion AI helps you go from idea to launch with adaptable tooling and deep support.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="font-mono text-[11px] tracking-wider mb-12">Our Team</h2>
            {/* Mobile View */}
            <div className="grid grid-cols-1 gap-12 md:hidden">
              {teamMembers.map((member) => (
                <div key={member.name} className="space-y-4">
                  <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-mono text-[11px] tracking-wider">{member.name}</h3>
                    <p className="text-[11px] text-neutral-500 mb-2">{member.role}</p>
                    <p className="text-[13px] font-light leading-relaxed">{member.bio}</p>
                    {member.social && (
                      <a
                        href={member.social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 font-mono text-[11px] tracking-wider text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        {member.social.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-3 gap-12">
              {desktopTeamMembers.map((member) => (
                <div key={member.name} className="space-y-4">
                  <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-mono text-[11px] tracking-wider">{member.name}</h3>
                    <p className="text-[11px] text-neutral-500 mb-2">{member.role}</p>
                    <p className="text-[13px] font-light leading-relaxed">{member.bio}</p>
                    {member.social && (
                      <a
                        href={member.social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 font-mono text-[11px] tracking-wider text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        {member.social.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
