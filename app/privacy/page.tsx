import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Fusion AI',
  description: 'Privacy policy and data protection information for Fusion AI',
}

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last Updated: May 27, 2025</p>

      <p className="mb-4">
        Fusion Systems LLC ("Fusion AI," "we," "us," or "our") is committed to
        protecting your privacy. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your personal data when you use our
        websites, applications, and services ("Service"). Capitalized terms used
        but not defined in this Privacy Policy have the meanings given in our
        Terms of Service.
      </p>

      <p className="mb-6">
        By accessing or using the Service, you agree to this Privacy Policy. If
        you do not agree, do not use our Service.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Scope</h2>
      <p className="mb-2">This Privacy Policy applies to:</p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>The Fusion AI website and all subdomains;</li>
        <li>Applications or tools with links to this Privacy Policy;</li>
        <li>All user interactions involving our Service.</li>
      </ul>
      <p className="mb-6">
        We may update this policy. Material changes will be notified by email
        or dashboard alert. Please review it regularly.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        2. Information We Collect
      </h2>
      <p className="mb-4">
        We collect personal data in the following categories:
      </p>

      <h3 className="text-xl font-semibold mb-2">
        2.1 Information You Provide Directly:
      </h3>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>Account registration: name, email, authentication credentials.</li>
        <li>
          Billing data: purchase history, payment method (via Stripe or
          BTCPay).
        </li>
        <li>Messages and inputs sent to our chat interface.</li>
        <li>Support requests, feedback, and other communications.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">
        2.2 Information Collected Automatically:
      </h3>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>IP address, device type, OS, browser version.</li>
        <li>
          Usage logs: model usage, tokens, latency, cost, fallback reason.
        </li>
        <li>Session analytics (e.g., via PostHog, Google Analytics).</li>
        <li>Cookies (see section below).</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">
        2.3 Cookies and Tracking:
      </h3>
      <p className="mb-2">We use cookies and web beacons to:</p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>Enable core platform functionality;</li>
        <li>Personalize your experience;</li>
        <li>Monitor performance and errors;</li>
        <li>Track user behavior anonymously for analytics.</li>
      </ul>
      <p className="mb-6">
        You can adjust cookie preferences in your browser settings. Blocking
        cookies may impair functionality.
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
      <p className="mb-2">We use your data to:</p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>Operate and maintain the Service;</li>
        <li>Process payments and track usage;</li>
        <li>Provide customer support;</li>
        <li>Send system alerts and service-related emails;</li>
        <li>Improve Service quality, reliability, and features;</li>
        <li>Comply with legal obligations;</li>
        <li>Enforce Terms of Service and prevent fraud.</li>
      </ul>
      <p className="mb-6">
        If you opt in, we may also use your anonymized inputs/outputs for
        debugging and service improvement.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        4. Sharing of Personal Data
      </h2>
      <p className="mb-2">We share your data only when necessary:</p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>
          Service providers (e.g., Stripe, BTCPay, analytics tools);
        </li>
        <li>Affiliates and internal use across Fusion AI systems;</li>
        <li>
          Legal authorities if required by law or to prevent harm;
        </li>
        <li>During business transfers (e.g., acquisition);</li>
        <li>With consent for additional use cases.</li>
      </ul>
      <p className="mb-6">We do not sell your data.</p>

      <h2 className="text-2xl font-semibold mb-4">
        5. User Rights and Controls
      </h2>
      <p className="mb-2">
        Depending on your jurisdiction, you may have the right to:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>Access or correct your personal data;</li>
        <li>Request deletion of your account and associated data;</li>
        <li>Opt out of marketing emails;</li>
        <li>Withdraw consent where applicable.</li>
      </ul>
      <p className="mb-6">
        You can manage most of these settings through your Fusion AI account
        dashboard or by emailing{' '}
        <Link href="mailto:support@fusionai.app" className="text-blue-600 hover:underline">
          support@fusionai.app
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
      <p className="mb-2">
        Fusion AI implements industry-standard protections:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>Encrypted data storage;</li>
        <li>Access controls and role-based permissioning;</li>
        <li>TLS for data transmission;</li>
        <li>Regular audits and monitoring.</li>
      </ul>
      <p className="mb-6">
        Despite safeguards, no system is 100% secure. You are responsible for
        maintaining the confidentiality of your password and account
        credentials.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
      <p className="mb-2">
        We retain your data only as long as necessary:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>For active use and billing;</li>
        <li>For legal compliance and dispute resolution;</li>
        <li>
          To improve performance or security (anonymized where possible).
        </li>
      </ul>
      <p className="mb-6">
        Inactive accounts and logs may be purged after 12 months.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        8. International Data Transfers
      </h2>
      <p className="mb-6">
        Fusion AI is based in the U.S. Your data may be transferred to or
        stored in countries outside your jurisdiction, including the United
        States. We use standard contractual clauses and other safeguards where
        required by law.
      </p>

      <h2 className="text-2xl font-semibold mb-4">9. Children</h2>
      <p className="mb-6">
        Fusion AI is not intended for users under 13. We do not knowingly
        collect data from minors. If you are a parent or guardian and believe
        we have collected information from a child, contact us immediately.
      </p>

      <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
      <p className="mb-2">
        If you have questions or requests regarding this Privacy Policy, please
        contact:
      </p>
      <p className="mb-4">
        <Link href="mailto:support@fusionai.app" className="text-blue-600 hover:underline">
          support@fusionai.app
        </Link>
      </p>

      <p className="font-semibold">Fusion Systems LLC</p>
      <p>Wilmington, Delaware</p>
    </div>
  )
}

export default PrivacyPage


