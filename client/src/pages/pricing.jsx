import { CheckCircle } from "lucide-react";
import PricingPlans from "../components/pricing-plans.jsx";

export default function Pricing() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4" data-testid="pricing-title">Choose a plan</h1>
          <p className="text-muted-foreground text-lg mb-8">Your next big thing starts with a single click</p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-semibold">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="ml-2 text-sm">Sign Up</span>
            </div>
            <div className="w-12 h-0.5 bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-semibold text-white">
                2
              </div>
              <span className="ml-2 text-sm">Choose Plan</span>
            </div>
            <div className="w-12 h-0.5 bg-border"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Checkout</span>
            </div>
          </div>
        </div>
      </section>

      <PricingPlans />
    </div>
  );
}
