'use client';

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';

// Make sure to replace the placeholder with your actual publishable key
// It's best to use an environment variable for this in a real application
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51MgU3qBdlY5aZYk7ampxuEYjz0szrSRIVFo8qZ7hXUeOpLYf0ZMUhdGnd6UkKTFzzyDARTNWylK0suHUpIgWkXDL009q8kQAwV');

interface StripeElementsProviderProps {
  children: React.ReactNode;
}

const StripeElementsProvider: React.FC<StripeElementsProviderProps> = ({ children }) => {
  // You can customize options for Elements here if needed
  const options: StripeElementsOptions = {
    locale: 'en',
    // appearance: { theme: 'stripe' },
  };

  return (
    <Elements stripe={stripePromise} options={options} >
      {children}
    </Elements>
  );
};

export default StripeElementsProvider; 