import React from 'react';
import Link from 'next/link';
import { Receipt, Download, Calendar, CreditCard, AlertCircle, CheckCircle, ArrowRight, FileText, DollarSign, Clock } from 'lucide-react';

export const metadata = {
  title: 'Billing & Invoices - Fusion AI Documentation',
  description: 'Manage your billing, download invoices, view transaction history, and understand Fusion AI\'s billing cycles and payment processing.',
};

export default function BillingInvoicesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Billing & Invoices</h1>
        <p className="text-lg text-gray-600">
          Manage your billing, download invoices, view transaction history, and understand Fusion AI's billing cycles and payment processing.
        </p>
      </div>

      {/* Billing Model Overview */}
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-blue-900">Pay-as-You-Go Billing</h2>
          </div>
          <p className="text-blue-800 mb-4">
            Fusion AI uses a prepaid credit system. You purchase credits in advance and they're deducted as you use AI services. 
            This gives you full control over spending with no monthly minimums or surprise bills.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              <span>No subscription fees</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              <span>Credits never expire</span>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction History */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Credit Purchase Records</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            View all your credit purchases and transaction details directly in your dashboard. Each transaction includes 
            comprehensive information for accounting and expense tracking.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Transaction Details Include</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Transaction date and time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Payment amount in USD</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Payment method (Card/Bitcoin)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Transaction status</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Provider transaction ID</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Status Types</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                  <span className="text-gray-600 text-sm">Payment processed successfully</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                  <span className="text-gray-600 text-sm">Awaiting confirmation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Failed
                  </span>
                  <span className="text-gray-600 text-sm">Payment was unsuccessful</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Transaction Export</h4>
              <p className="text-gray-600 text-sm mt-1">
                You can view transaction history in your <Link href="/dashboard/credits" className="underline font-medium">credits dashboard</Link>. 
                For detailed invoices and receipts, use the billing portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Billing Portal Access */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Stripe Billing Portal</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Receipt className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Professional Invoice Management</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Access Stripe's customer billing portal for professional invoices, receipts, and comprehensive 
            payment management. Perfect for business expense reporting and tax documentation.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available Features</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-blue-500" />
                  <span>Download PDF invoices and receipts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>View complete payment history</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-orange-500" />
                  <span>Update payment methods</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  <span>Access tax documents</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">How to Access</h4>
              <ol className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Go to your <Link href="/dashboard/credits" className="underline">credits dashboard</Link></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>Click "Manage Billing" button</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>Access Stripe's secure portal</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                  <span>Download invoices and manage payments</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Usage Tracking */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Credit Usage & Balance</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Real-time Balance Tracking</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Monitor your credit balance and usage patterns to optimize your AI spending and ensure uninterrupted service.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Balance Information</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Current available balance</li>
                <li>• Real-time usage deductions</li>
                <li>• Balance refresh capabilities</li>
                <li>• Low balance notifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Cost Management</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Per-model pricing transparency</li>
                <li>• NeuroSwitch cost optimization</li>
                <li>• Auto top-up prevention of service interruption</li>
                <li>• Usage pattern analytics</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
            <div>
              <h4 className="font-medium text-amber-900">Processing Fees</h4>
              <p className="text-amber-800 text-sm mt-1">
                Credit purchases include a 5% processing fee + $0.35 to cover payment processor costs. 
                These fees are clearly shown during checkout and included in your invoices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auto Top-Up Billing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Auto Top-Up Billing</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Automated Billing Management</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Auto top-up creates automatic charges when your balance falls below your specified threshold, 
            ensuring continuous service without manual intervention.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Billing Behavior</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Automatic charges when threshold reached</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Email confirmations for each auto charge</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Full transaction records maintained</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Easy modification or cancellation</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Billing Records</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• All auto top-ups appear in transaction history</li>
                <li>• Same invoice access as manual purchases</li>
                <li>• Clear description: "Auto Top-up"</li>
                <li>• Same processing fees apply</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bitcoin Payment Billing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bitcoin Payment Records</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-orange-600 font-bold text-xl">₿</span>
            <h3 className="text-lg font-semibold text-gray-900">Cryptocurrency Transaction Records</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Bitcoin and Lightning Network payments are tracked with the same detail as traditional payments, 
            providing complete transaction records for all payment methods.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Bitcoin Records Include</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• USD amount and Bitcoin equivalent</li>
                <li>• BTCPay Server transaction ID</li>
                <li>• Payment method (On-chain/Lightning)</li>
                <li>• Confirmation timestamps</li>
                <li>• Transaction status tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Tax Considerations</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• All transactions recorded in USD</li>
                <li>• Business expense documentation available</li>
                <li>• Transaction export capabilities</li>
                <li>• Comprehensive audit trail</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing FAQ</h2>
        
        <div className="space-y-4">
          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              How do I get a receipt for my purchase?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="text-sm mb-2">
                For Stripe payments, access the billing portal from your credits dashboard. For Bitcoin payments, 
                your transaction history serves as the receipt, and you can access BTCPay Server records through 
                the provided transaction ID.
              </p>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Are there any monthly fees or minimums?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="text-sm mb-2">
                No. Fusion AI uses a pure pay-as-you-go model. You only pay for the credits you purchase and use. 
                There are no monthly fees, minimums, or hidden charges.
              </p>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Do credits expire?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="text-sm mb-2">
                No, credits never expire. Once purchased, they remain in your account until used, giving you 
                complete flexibility in how and when you use Fusion AI services.
              </p>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Can I get a refund for unused credits?
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p className="text-sm mb-2">
                Refund policies vary based on circumstances. For refund requests, please contact our support team 
                with your transaction details and reason for the refund request.
              </p>
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
              <Receipt className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">View Billing</h3>
            </div>
            <p className="text-gray-600 text-sm">Access your transaction history and billing portal.</p>
          </Link>

          <Link href="/docs/payments/stripe" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <ArrowRight className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Payment Methods</h3>
            </div>
            <p className="text-gray-600 text-sm">Learn about Stripe and Bitcoin payment options.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 