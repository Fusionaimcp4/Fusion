'use client';

import React, { useState, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

interface StripeSetupFormProps {
  onSuccess: () => void; // Callback when payment method is successfully added
}

interface SetupIntentResponse {
  clientSecret: string;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeSetupForm: React.FC<StripeSetupFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe.js has not yet loaded.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found.");
      setProcessing(false);
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('Authentication token not found.');
      setProcessing(false);
      return;
    }

    try {
      // 1. Create a SetupIntent on your server
      const setupIntentResponse = await axios.post<SetupIntentResponse>(
        '/api/stripe/create-setup-intent',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const clientSecret = setupIntentResponse.data.clientSecret;

      if (!clientSecret) {
        setError('Failed to get setup client secret from server.');
        setProcessing(false);
        return;
      }

      // 2. Confirm the card setup with Stripe
      const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          // billing_details: { name: 'Cardholder Name' }, // Optional: collect billing details
        },
      });

      if (stripeError) {
        setError(stripeError.message || "An unknown error occurred with Stripe.");
        setProcessing(false);
        return;
      }

      if (setupIntent?.status === 'succeeded') {
        const paymentMethodId = setupIntent.payment_method;
        if (typeof paymentMethodId !== 'string') {
          setError('Failed to get payment method ID from Stripe.');
          setProcessing(false);
          return;
        }

        // 3. Send the PaymentMethod ID to your server to save it
        await axios.post(
          '/api/stripe/save-payment-method-details',
          { paymentMethodId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setProcessing(false);
        onSuccess(); // Trigger callback on successful setup and save
      } else {
        setError(`Card setup failed with status: ${setupIntent?.status}`);
        setProcessing(false);
      }
    } catch (err: any) {
      console.error('Error setting up payment method:', err);
      setError(err.response?.data?.error || 'An unexpected error occurred.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
          Card details
        </label>
        <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      </div>

      {error && (
        <div className="text-red-500 text-sm" role="alert">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || processing} 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Save Card'}
      </button>
    </form>
  );
};

export default StripeSetupForm; 