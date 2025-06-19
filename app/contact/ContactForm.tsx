'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xnnvndao");
  
  if (state.succeeded) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-green-900 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-800 mb-4">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John"
          />
          <ValidationError 
            prefix="First Name" 
            field="firstName"
            errors={state.errors}
            className="mt-1 text-sm text-red-600"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Doe"
          />
          <ValidationError 
            prefix="Last Name" 
            field="lastName"
            errors={state.errors}
            className="mt-1 text-sm text-red-600"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@company.com"
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="mt-1 text-sm text-red-600"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Acme Corp"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a topic</option>
          <option value="technical-support">Technical Support</option>
          <option value="sales-enterprise">Sales & Enterprise</option>
          <option value="partnerships">Partnerships</option>
          <option value="billing">Billing & Accounts</option>
          <option value="feature-request">Feature Request</option>
          <option value="general">General Inquiry</option>
          <option value="media">Media & Press</option>
        </select>
        <ValidationError 
          prefix="Subject" 
          field="subject"
          errors={state.errors}
          className="mt-1 text-sm text-red-600"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell us how we can help you..."
        ></textarea>
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
          className="mt-1 text-sm text-red-600"
        />
      </div>

      {/* General form errors */}
      <ValidationError 
        errors={state.errors}
        className="mb-4 text-sm text-red-600"
      />

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          * Required fields
        </div>
        <button
          type="submit"
          disabled={state.submitting}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 mr-2" />
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
} 