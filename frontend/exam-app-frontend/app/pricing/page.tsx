"use client";

import React from 'react';
import { Check, Sparkles, Shield, Rocket } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for casual learners and testing.',
    features: ['3 AI Generations / month', 'PDF & Text Support', 'Basic Quiz Analytics', 'Community Support'],
    buttonText: 'Current Plan',
    highlight: false,
    icon: Shield,
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'Ideal for teachers and power users.',
    features: ['50 AI Generations / month', 'Priority Document Parsing', 'Docx Support', 'Interview Prep Mode', 'Detailed Result Export', 'Email Support'],
    buttonText: 'Upgrade to Pro',
    highlight: true,
    icon: Sparkles,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For schools and large organizations.',
    features: ['Unlimited AI Generations', 'Full API Access', 'Custom AI Templates', 'Bulk Document Upload', 'SSO & Advanced Security', '24/7 Priority Support'],
    buttonText: 'Contact Sales',
    highlight: false,
    icon: Rocket,
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-extrabold mb-6 bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto italic">
          Choose the plan that fits your needs. Scale as you grow from a student to an examiner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative p-8 rounded-4xl border ${tier.highlight ? 'border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/50' : 'border-white/10 bg-white/5'} flex flex-col transition-all hover:scale-[1.02]`}
          >
            {tier.highlight && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <div className={`w-12 h-12 rounded-2xl ${tier.highlight ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/10 text-gray-400'} flex items-center justify-center mb-6`}>
                <tier.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-gray-400">/month</span>}
              </div>
              <p className="text-gray-400 text-sm">{tier.description}</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className={`mt-1 p-0.5 rounded-full ${tier.highlight ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/10 text-gray-400'}`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-2xl font-bold transition-all ${tier.highlight ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/10 hover:bg-white/20 text-white hover:border-white/20 border border-transparent'}`}>
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <div className="inline-flex items-center gap-2 p-1 px-4 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400">
          <Shield className="w-4 h-4" />
          Secure payment processing via Stripe
        </div>
      </div>
    </div>
  );
}
