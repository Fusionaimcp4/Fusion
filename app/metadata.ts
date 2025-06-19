// Metadata configuration for the home page
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fusion AI - Multi-Model AI Assistant',
  description: 'Fusion AI is a next-gen assistant platform that connects OpenAI, Gemini, and Anthropic to power intelligent conversations. Choose your AI, plug in your API key, and start chatting securely.',
  openGraph: {
    images: ['/content/images/fusion-ai-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/content/images/fusion-ai-logo.png'],
  }
}
