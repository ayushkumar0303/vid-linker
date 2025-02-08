import React from "react";
import { Link } from "react-router";
import { Badge, Button, Card, List } from "flowbite-react";

function Pricing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold md:text-5xl">💰 Choose Your Plan</h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          🚀 Pick the perfect plan to manage your video uploads seamlessly.
        </p>
      </section>
      {/* Pricing Cards */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <Card className="text-center p-6 shadow-md border border-gray-200">
          <Badge color="gray" className="text-sm">
            FREE
          </Badge>
          <h3 className="text-2xl font-semibold mt-4">Starter</h3>
          <p className="text-gray-500">Best for beginners</p>
          <h2 className="text-4xl font-bold mt-4">₹0</h2>
          <ul className="mt-4 text-gray-600 text-sm space-y-2">
            <li>✅ Upload 5 videos per month</li>
            <li>✅ Basic YouTube Integration</li>
            <li>❌ No priority support</li>
          </ul>
          <Button gradientDuoTone="greenToBlue" className="mt-6">
            Get Started
          </Button>
        </Card>

        {/* Pro Plan */}
        <Card className="text-center p-6 shadow-lg border border-green-500">
          <Badge color="green" className="text-sm">
            MOST POPULAR
          </Badge>
          <h3 className="text-2xl font-semibold mt-4">Pro</h3>
          <p className="text-gray-500">For regular users</p>
          <h2 className="text-4xl font-bold mt-4">₹999/mo</h2>
          <ul className="mt-4 text-gray-600 text-sm space-y-2">
            <li>✅ Upload 50 videos per month</li>
            <li>✅ Advanced YouTube Integration</li>
            <li>✅ Email support</li>
          </ul>
          <Button gradientDuoTone="greenToBlue" className="mt-6">
            Get Pro
          </Button>
        </Card>

        {/* Business Plan */}
        <Card className="text-center p-6 shadow-md border border-gray-200">
          <Badge color="blue" className="text-sm">
            BEST VALUE
          </Badge>
          <h3 className="text-2xl font-semibold mt-4">Business</h3>
          <p className="text-gray-500">For high-volume users</p>
          <h2 className="text-4xl font-bold mt-4">₹2,499/mo</h2>
          <ul className="mt-4 text-gray-600 text-sm space-y-2">
            <li>✅ Unlimited video uploads</li>
            <li>✅ Dedicated YouTube API access</li>
            <li>✅ 24/7 priority support</li>
          </ul>
          <Button gradientDuoTone="greenToBlue" className="mt-6">
            Get Business
          </Button>
        </Card>
      </section>
      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold">🚀 Get Started Today!</h2>
        <p className="text-gray-500 mt-2">Upgrade anytime, cancel anytime.</p>
        <div className="flex justify-center">
          <Button gradientDuoTone="greenToBlue" className="mt-6">
            Choose a Plan
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
