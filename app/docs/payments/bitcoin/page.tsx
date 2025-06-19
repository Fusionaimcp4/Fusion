import React from 'react';
import Link from 'next/link';
import { Zap, Shield, Clock, CheckCircle, AlertTriangle, ArrowRight, Globe, Wallet, Lock, QrCode } from 'lucide-react';

export const metadata = {
  title: 'Bitcoin & Lightning Network - Fusion AI Documentation',
  description: 'Pay for Fusion AI credits using Bitcoin on-chain transactions or Lightning Network for instant, low-fee payments via BTCPay Server.',
};

export default function BitcoinPaymentsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bitcoin & Lightning Network</h1>
        <p className="text-lg text-gray-600">
          Pay for Fusion AI credits using Bitcoin on-chain transactions or Lightning Network for instant, low-fee payments via BTCPay Server.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">₿</span>
            <h2 className="text-xl font-semibold text-orange-900">Decentralized Payments</h2>
          </div>
          <p className="text-orange-800 mb-4">
            For users and organizations who prefer decentralized payments, Fusion AI is fully integrated with BTCPay Server. 
            You can pay in Bitcoin or use the Lightning Network for instant, low-fee transactions.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-orange-800">
              <CheckCircle className="w-4 h-4" />
              <span>No intermediaries</span>
            </div>
            <div className="flex items-center space-x-2 text-orange-800">
              <CheckCircle className="w-4 h-4" />
              <span>Full custody retained</span>
            </div>
            <div className="flex items-center space-x-2 text-orange-800">
              <CheckCircle className="w-4 h-4" />
              <span>Global accessibility</span>
            </div>
          </div>
        </div>
      </section>

      {/* BTCPay Server Integration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">BTCPay Server Integration</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Self-Sovereign Payment Processing</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            BTCPay Server is an open-source, self-hosted payment processor that allows Fusion AI to accept Bitcoin 
            payments without relying on third-party payment processors or KYC requirements.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Dynamic Invoices</h4>
              <p className="text-sm text-gray-600">Invoices are generated dynamically for each payment</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Real-time Confirmation</h4>
              <p className="text-sm text-gray-600">Payments are confirmed and processed in real-time</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Full Privacy</h4>
              <p className="text-sm text-gray-600">No intermediaries — you retain full control</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bitcoin On-Chain */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bitcoin On-Chain Payments</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-orange-600 font-bold text-xl">₿</span>
            <h3 className="text-lg font-semibold text-gray-900">Traditional Bitcoin Transactions</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Pay using standard Bitcoin on-chain transactions. Perfect for larger amounts or when you prefer 
            the security of blockchain settlement.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">How It Works</h4>
              <ol className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Select "Use BTC" toggle in the credits purchase page</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>Enter the amount you want to purchase</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>Get redirected to BTCPay Server invoice</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                  <span>Send Bitcoin to the provided address</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">5</span>
                  <span>Credits added after confirmation</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Characteristics</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>High security with blockchain settlement</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No payment amount limits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Network fees apply (varies by congestion)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Confirmation time: 10-60 minutes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Works with any Bitcoin wallet</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <QrCode className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900">QR Code Support</h4>
              <p className="text-blue-800 text-sm mt-1">
                BTCPay Server provides QR codes for easy scanning with mobile wallets. Simply scan and send!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightning Network */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lightning Network Payments</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Instant Bitcoin Payments</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Lightning Network enables instant Bitcoin transactions with minimal fees. Perfect for smaller 
            amounts and when you need immediate credit availability.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Advantages</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Instant settlement (seconds)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Extremely low fees (often &lt;1 cent)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Enhanced privacy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span>Perfect for microtransactions</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-blue-500" />
                  <span>Lightning-enabled wallet required</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Sufficient channel liquidity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Payment amount limits (varies by wallet)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Internet connection required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-medium text-yellow-900">Popular Lightning Wallets</h4>
              <p className="text-yellow-800 text-sm mt-1">
                Phoenix, Breez, BlueWallet, Wallet of Satoshi, Muun, and Zeus are popular Lightning Network wallets 
                that work seamlessly with BTCPay Server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Process</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Step-by-Step Payment Flow</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Choose Bitcoin Payment</h4>
                <p className="text-gray-600 text-sm mt-1">
                  In the credits purchase page, toggle to "Use BTC" and enter your desired amount.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">BTCPay Invoice Generation</h4>
                <p className="text-gray-600 text-sm mt-1">
                  You'll be redirected to a BTCPay Server invoice page with payment options for both 
                  on-chain and Lightning Network.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Payment Method Selection</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Choose between Bitcoin on-chain (for larger amounts) or Lightning Network (for instant payments).
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">4</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Send Payment</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Use your Bitcoin wallet to scan the QR code or copy the payment address/invoice.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-sm font-bold">5</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Automatic Credit Addition</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Credits are automatically added to your account once the payment is confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security & Privacy</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Security Features</h3>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Self-hosted BTCPay Server (no third parties)</li>
              <li>• Open-source payment processing</li>
              <li>• Non-custodial architecture</li>
              <li>• Multi-signature support available</li>
              <li>• Regular security audits</li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Privacy Benefits</h3>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• No KYC requirements</li>
              <li>• No payment processor tracking</li>
              <li>• Lightning Network enhanced privacy</li>
              <li>• Direct peer-to-peer transactions</li>
              <li>• Minimal data collection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
        
        <div className="space-y-4">
          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Lightning payment failed
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="space-y-2 text-sm">
                <li>• Check your Lightning wallet's channel liquidity</li>
                <li>• Ensure payment amount is within wallet limits</li>
                <li>• Try using Bitcoin on-chain instead</li>
                <li>• Verify your wallet is connected to the internet</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Bitcoin transaction taking too long
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="space-y-2 text-sm">
                <li>• Check the current Bitcoin network congestion</li>
                <li>• Verify you used adequate transaction fees</li>
                <li>• Most transactions confirm within 1 hour</li>
                <li>• Contact support if more than 24 hours pass</li>
              </ul>
            </div>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              BTCPay invoice expired
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="space-y-2 text-sm">
                <li>• Invoices typically expire after 15 minutes</li>
                <li>• Return to credits page and create a new payment</li>
                <li>• Complete payment before the timer expires</li>
                <li>• Contact support if payment was sent to expired invoice</li>
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
              <span className="text-orange-600 font-bold text-lg">₿</span>
              <h3 className="font-semibold text-gray-900">Purchase with Bitcoin</h3>
            </div>
            <p className="text-gray-600 text-sm">Start using Bitcoin or Lightning Network payments.</p>
          </Link>

          <Link href="/docs/payments" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center space-x-3 mb-2">
              <ArrowRight className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">All Payment Methods</h3>
            </div>
            <p className="text-gray-600 text-sm">Compare all available payment options.</p>
          </Link>
        </div>
      </section>
    </div>
  );
} 