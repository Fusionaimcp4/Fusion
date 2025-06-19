'use client'; // This page now uses client components for Stripe Elements

import React from 'react'
import BalanceCard from '@/app/components/credits/BalanceCard'
import PurchaseCard from '@/app/components/credits/PurchaseCard'
import AutoTopUpCard from '@/app/components/credits/AutoTopUpCard'
import TransactionTable from '@/app/components/credits/TransactionTable'
import { Metadata } from 'next'
import StripeElementsProvider from '@/app/components/StripeElementsProvider'

// Metadata should be exported from server components or defined in generateMetadata for client components
// For simplicity here, if this page becomes fully client, you might move metadata to a layout or use generateMetadata
// export const metadata: Metadata = { // Cannot export metadata from client component directly
//   title: 'Credits - Fusion',
//   description: 'Manage your credits and billing.',
// };

const CreditsPage: React.FC = () => {
  return (
    <StripeElementsProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Credits</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <BalanceCard />
            <PurchaseCard />
            <AutoTopUpCard />
          </div>
          <div className="md:col-span-1 hidden md:block"> {/* Placeholder for potential future content or ads, or adjust layout */}
          </div>
        </div>
        <div className="mt-8">
          <TransactionTable />
        </div>
      </div>
    </StripeElementsProvider>
  )
}

export default CreditsPage 