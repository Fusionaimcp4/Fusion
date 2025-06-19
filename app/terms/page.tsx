import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Fusion AI',
  description: 'Terms of Service for Fusion AI',
}

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last Updated: May 27, 2025</p>

      <p className="mb-4">
        Welcome, and thank you for your interest in Fusion AI, operated by
        Fusion Systems LLC ("Fusion AI," "we," or "us"). These Terms of
        Service ("Terms") govern your access to and use of our services
        including our websites, applications, APIs, and related services
        (collectively, the "Service").
      </p>

      <p className="mb-6">
        PLEASE READ THESE TERMS CAREFULLY. BY USING THE SERVICE, YOU AGREE TO BE
        BOUND BY THESE TERMS. IF YOU DO NOT AGREE, YOU MAY NOT USE THE SERVICE.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        1. Overview of Fusion AI Services
      </h2>
      <p className="mb-6">
        Fusion AI provides a unified interface and routing engine (NeuroSwitch)
        for accessing third-party large language models (LLMs), including but
        not limited to OpenAI, Anthropic (Claude), and Google Gemini. Users can
        route queries via NeuroSwitch or directly to providers, monitor usage,
        and manage billing through the Fusion AI dashboard.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
      <p className="mb-6">
        You must be at least 13 years of age to use the Service. If under 18,
        parental or guardian consent is required. If you are using the Service
        on behalf of an organization, you represent you have the authority to
        bind that entity to these Terms.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        3. Accounts and Registration
      </h2>
      <p className="mb-6">
        You must create an account to access most services. You agree to provide
        accurate, up-to-date information and maintain the security of your
        account credentials. You are responsible for all activity under your
        account.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        4. Payments and Credits
      </h2>
      <h3 className="text-xl font-semibold mb-2">4.1</h3>
      <p className="mb-4">
        Users pre-purchase credits for use with the Service. Credit purchases
        are subject to Stripe or BTCPay (Bitcoin/Lightning) terms. Refunds are
        not guaranteed but may be granted at our discretion within 24 hours of
        purchase, excluding cryptocurrency payments which are non-refundable.
      </p>
      <h3 className="text-xl font-semibold mb-2">4.2</h3>
      <p className="mb-4">
        Fusion AI may expire unused credits after 365 days. Optional
        auto-top-up functionality is available and governed by your settings.
      </p>
      <h3 className="text-xl font-semibold mb-2">4.3</h3>
      <p className="mb-6">
        Fusion AI prices are subject to change. You will be notified of major
        pricing updates.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
      <h3 className="text-xl font-semibold mb-2">5.1</h3>
      <p className="mb-4">
        You retain rights to your Inputs and Outputs ("User Content"). Output
        use rights are governed by the terms of each AI provider. We do not use
        your content for training unless explicitly stated.
      </p>
      <h3 className="text-xl font-semibold mb-2">5.2</h3>
      <p className="mb-6">
        If you opt-in to logging features, you grant Fusion AI a royalty-free
        license to use, store, and process your content to improve service
        quality, including debugging and analytics. Logs may be anonymized and
        used for statistical reporting.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Prohibited Conduct</h2>
      <p className="mb-2">You may not:</p>
      <ul className="list-disc list-inside mb-6 ml-4">
        <li>Use the Service for unlawful purposes;</li>
        <li>Violate intellectual property rights;</li>
        <li>Upload malicious code;</li>
        <li>Attempt to access others' accounts;</li>
        <li>Resell or redistribute Service access;</li>
        <li>Bypass security or usage restrictions;</li>
        <li>Abuse the Service in a manner inconsistent with AI Model terms.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
      <p className="mb-6">
        Fusion AI may suspend or terminate your access at any time for
        violations of these Terms. Unused credits may be forfeited if your
        account is terminated due to a breach.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. Privacy Policy</h2>
      <p className="mb-6">
        Please refer to the Fusion AI Privacy Policy, which is incorporated by
        reference.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        9. Modification of Terms
      </h2>
      <p className="mb-6">
        We may modify these Terms. Material changes will be announced with 30
        days' notice. Continued use constitutes acceptance of the revised Terms.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        10. Intellectual Property
      </h2>
      <p className="mb-6">
        All content, interfaces, and code on the Service are the property of
        Fusion AI or its licensors. You may not reproduce, distribute, or
        create derivative works without permission.
      </p>

      <h2 className="text-2xl font-semibold mb-4">11. Feedback</h2>
      <p className="mb-6">
        Suggestions you provide may be used by Fusion AI without compensation.
      </p>

      <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
      <p className="mb-6">
        You agree to indemnify and hold Fusion AI harmless from any claims
        related to your use of the Service.
      </p>

      <h2 className="text-2xl font-semibold mb-4">13. Disclaimers</h2>
      <p className="mb-6">
        THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. FUSION
        AI DISCLAIMS ALL IMPLIED WARRANTIES INCLUDING MERCHANTABILITY AND FITNESS
        FOR A PARTICULAR PURPOSE.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        14. Limitation of Liability
      </h2>
      <p className="mb-6">
        IN NO EVENT SHALL FUSION AI BE LIABLE FOR INDIRECT OR CONSEQUENTIAL
        DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE
        12 MONTHS PRIOR TO THE CLAIM OR \$100, WHICHEVER IS GREATER.
      </p>

      <h2 className="text-2xl font-semibold mb-4">15. Governing Law</h2>
      <p className="mb-6">
        These Terms are governed by the laws of the State of Delaware. Venue for
        legal proceedings shall be in Wilmington, Delaware.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        16. Dispute Resolution
      </h2>
      <p className="mb-6">
        Disputes will be resolved via binding arbitration under AAA Rules,
        except small claims or IP disputes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        17. Electronic Communication
      </h2>
      <p className="mb-6">
        You agree to receive notices electronically. This satisfies legal
        requirements for written communication.
      </p>

      <h2 className="text-2xl font-semibold mb-4">18. Contact</h2>
      <p className="mb-2">
        Fusion AI is operated by Fusion Systems LLC. Contact us at:
      </p>
      <p className="mb-4">
        <Link href="mailto:support@fusionai.app" className="text-blue-600 hover:underline">
          support@fusionai.app
        </Link>
      </p>
    </div>
  )
}

export default TermsPage


