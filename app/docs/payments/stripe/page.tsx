import React from 'react';
import Link from 'next/link';
import { CreditCard, Shield, RefreshCcw, Settings, CheckCircle, AlertTriangle, ArrowRight, Globe, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Stripe Integration - Fusion AI Documentation',
  description: 'Complete guide to using Stripe for credit card payments, auto top-up, and billing management in Fusion AI.',
};

export default function StripeIntegrationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stripe Integration</h1>
        <p className="text-lg text-gray-600">
          Fusion AI uses Stripe for secure credit card processing, auto top-up functionality, and comprehensive billing management.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-green-900">Enterprise-Grade Security</h2>
          </div>
          <p className="text-green-800 mb-4">
            All payments are processed securely by Stripe. We do not store your credit card information on our servers. 
            Stripe is PCI DSS Level 1 certified, ensuring the highest level of security for your payment data.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span>PCI DSS Level 1 compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span>End-to-end encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Purchase */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchasing Credits</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How Credit Purchases Work</h3>
          <p className="text-gray-600 mb-4">
            You can purchase credits in any amount starting from $1.00. Credits are added to your account immediately 
            after successful payment processing.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Enter Amount</h4>
                <p className="text-gray-600 text-sm">Specify the amount you want to purchase (minimum $1.00)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Secure Checkout</h4>
                <p className="text-gray-600 text-sm">Redirect to Stripe's secure checkout page</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Instant Credit</h4>
                <p className="text-gray-600 text-sm">Credits are added to your account immediately</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-amber-600" />
            <h4 className="font-medium text-amber-900">Processing Fees</h4>
          </div>
          <p className="text-amber-800 text-sm mt-2">
            Credit purchases include a 5% processing fee + $0.35 to cover Stripe's transaction costs.
          </p>
        </div>
      </section>

      {/* Auto Top-Up */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Auto Top-Up</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <RefreshCcw className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Automatic Balance Management</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Set up auto top-up to automatically add credits when your balance falls below a specified threshold. 
            This ensures uninterrupted service for your AI applications.
          </p>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Setup Requirements</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Save a payment method in your account</li>
                  <li>• Set a balance threshold (e.g., $10.00)</li>
                  <li>• Define auto top-up amount (e.g., $20.00)</li>
                  <li>• Enable auto top-up in settings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How It Works</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• System monitors your balance continuously</li>
                  <li>• When balance drops below threshold, auto-charge triggers</li>
                  <li>• Credits are added using saved payment method</li>
                  <li>• You receive email confirmation of the transaction</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Settings className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900">Managing Auto Top-Up</h4>
              <p className="text-blue-800 text-sm mt-1">
                You can modify threshold amounts, top-up amounts, or disable auto top-up at any time in your 
                <Link href="/dashboard/credits" className="underline font-medium"> credits dashboard</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Billing Portal */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Management</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Stripe Billing Portal</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Access Stripe's customer portal directly from your Fusion AI dashboard to manage all billing-related activities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available Actions</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">View payment history</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Download invoices and receipts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Update payment methods</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Manage saved cards</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Security Features</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Secure authentication required</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">No card details stored locally</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Session expires automatically</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Audit trail maintained</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Payment Methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Payment Methods</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Credit Cards</h3>
            <p className="text-gray-600 text-sm mb-3">Visa, Mastercard, American Express</p>
            <div className="text-xs text-gray-500">Global acceptance</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Debit Cards</h3>
            <p className="text-gray-600 text-sm mb-3">With Visa/Mastercard logos</p>
            <div className="text-xs text-gray-500">Direct bank account</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">International</h3>
            <p className="text-gray-600 text-sm mb-3">Multi-currency support</p>
            <div className="text-xs text-gray-500">Automatic conversion</div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
        
        <div className="space-y-4">
          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Payment failed or was declined
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="space-y-2 text-sm">
                <li>• Check that your card has sufficient funds</li>
                <li>• Verify that your card supports online/international transactions</li>
                <li>• Contact your bank if the issue persists</li>
                <li>• Try a different payment method</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Auto top-up not working
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="space-y-2 text-sm">
                <li>• Ensure auto top-up is enabled in your settings</li>
                <li>• Check that your saved payment method is still valid</li>
                <li>• Verify your threshold and top-up amounts are set correctly</li>
                <li>• Contact support if charges continue to fail</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Can't access billing portal
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="space-y-2 text-sm">
                <li>• Make sure you're logged into your Fusion AI account</li>
                <li>• Clear your browser cache and cookies</li>
                <li>• Try accessing from a different browser</li>
                <li>• Contact support if the issue persists</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* Next Steps */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/dashboard/credits" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Manage Credits</h3>
            </div>
            <p className="text-gray-600 text-sm">Purchase credits and set up auto top-up.</p>
          </Link>

          <Link href="/docs/payments/billing" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <ArrowRight className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Billing & Invoices</h3>
            </div>
            <p className="text-gray-600 text-sm">Learn about billing cycles and invoice management.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 