import React from 'react';
import Link from 'next/link';
import { CreditCard, Zap, Shield, CheckCircle, ArrowRight, DollarSign, Globe, Clock } from 'lucide-react';

export const metadata = {
  title: 'Payments - Fusion AI Documentation',
  description: 'Fusion AI supports both traditional and Bitcoin-native payment systems, offering flexibility, speed, and global reach.',
};

export default function PaymentsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payments</h1>
        <p className="text-lg text-gray-600">
          Fusion AI supports both traditional and Bitcoin-native payment systems, offering flexibility, speed, and global reach.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Flexible Payment Options</h2>
          <p className="text-blue-800 mb-4">
            We understand that different users have different payment preferences. Whether you prefer traditional 
            credit card payments or cutting-edge Bitcoin solutions, Fusion AI has you covered.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-blue-800">
              <CreditCard className="w-5 h-5" />
              <span>Traditional card payments via Stripe</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-800">
              <Zap className="w-5 h-5" />
              <span>Bitcoin & Lightning Network support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stripe Section */}
      <section className="mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Stripe</h2>
              <p className="text-gray-600">Credit & Debit Card Payments</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            We support credit/debit card payments via Stripe, allowing users to securely pay using fiat currencies. 
            Stripe handles all standard tax and compliance processing on our behalf.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Supported Cards</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Visa, Mastercard, American Express</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Debit cards with Visa/Mastercard logos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>International cards accepted</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>PCI DSS compliant security</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span>Global currency support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span>Automatic tax handling</span>
                </li>
              </ul>
            </div>
          </div>

          <Link 
            href="/docs/payments/stripe"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Learn more about Stripe integration
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* BTCPay Server Section */}
      <section className="mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">BTCPay Server</h2>
              <p className="text-gray-600">Bitcoin & Lightning Network</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            For users and organizations who prefer decentralized payments, Fusion AI is fully integrated with BTCPay Server. 
            You can pay in Bitcoin or use the Lightning Network for instant, low-fee transactions.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Dynamic Invoices</h3>
              <p className="text-sm text-gray-600">Invoices are generated dynamically</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Real-time Confirmation</h3>
              <p className="text-sm text-gray-600">Payments are confirmed in real-time</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Privacy</h3>
              <p className="text-sm text-gray-600">No intermediaries — you retain full control</p>
            </div>
          </div>

          <Link 
            href="/docs/payments/bitcoin"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Learn more about Bitcoin payments
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Supported Payment Methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Payment Methods</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Credit & Debit Cards</h3>
            <p className="text-gray-600 text-sm mb-3">via Stripe</p>
            <div className="text-xs text-gray-500">
              Instant processing, global support
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 font-bold text-lg">₿</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Bitcoin</h3>
            <p className="text-gray-600 text-sm mb-3">on-chain</p>
            <div className="text-xs text-gray-500">
              Decentralized, secure, global
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Network</h3>
            <p className="text-gray-600 text-sm mb-3">instant</p>
            <div className="text-xs text-gray-500">
              Low fees, instant settlement
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Designed for Everyone</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fusion AI's flexible payment options are designed to support both institutional clients and 
            privacy-conscious developers, without compromising on convenience.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Learn More</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/docs/payments/stripe" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Stripe Integration</h3>
            </div>
            <p className="text-gray-600 text-sm">Set up credit card payments and manage billing.</p>
          </Link>

          <Link href="/docs/payments/bitcoin" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Bitcoin & Lightning</h3>
            </div>
            <p className="text-gray-600 text-sm">Use Bitcoin and Lightning Network for payments.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 