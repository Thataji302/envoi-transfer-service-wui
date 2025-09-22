import { useState } from "react";
import { Check } from "lucide-react";

export default function PricingPlans() {
  const [selectedStorage, setSelectedStorage] = useState("1tb");
  
  const storageOptions = [
    { value: "1tb", size: "1 TB", price: "$10" },
    { value: "10tb", size: "10 TB", price: "$100" },
    { value: "50tb", size: "50 TB", price: "$500" },
    { value: "100tb", size: "100 TB", price: "$1,000" },
    { value: "200tb", size: "200 TB", price: "$2,000" }
  ];

  const freeFeatures = [
    "100 GB Ad Supported",
    "No commitment, zero risk",
    "15 GB free every month, forever",
    "Pay as you go after 100 GB, no limits",
    "Pay only for egress",
    "5 days of free storage per file"
  ];

  const paidFeatures = [
    "Ad free",
    "No commitment, zero risk"
  ];

  const selectedOption = storageOptions.find(option => option.value === selectedStorage);

  return (
    <section className="pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-card border-2 border-primary rounded-lg p-8" data-testid="free-plan">
            <h3 className="text-2xl font-bold text-primary mb-2">Free</h3>
            <div className="text-3xl font-bold mb-6">$0.00</div>
            
            <div className="space-y-4 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center" data-testid={`free-feature-${index}`}>
                  <Check className="text-primary mr-3 w-4 h-4" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="button-select-free"
            >
              SELECT
            </button>
          </div>

          {/* Paid Plan */}
          <div className="bg-card border border-border rounded-lg p-8" data-testid="paid-plan">
            <h3 className="text-2xl font-bold mb-2">Paid</h3>
            <div className="text-lg text-muted-foreground mb-6">Select Your Plan</div>
            
            <div className="space-y-4 mb-8">
              {paidFeatures.map((feature, index) => (
                <div key={index} className="flex items-center" data-testid={`paid-feature-${index}`}>
                  <Check className="text-primary mr-3 w-4 h-4" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Storage Options */}
            <div className="space-y-3 mb-8">
              {storageOptions.map((option) => (
                <label 
                  key={option.value}
                  className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                  data-testid={`storage-option-${option.value}`}
                >
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="storage" 
                      value={option.value}
                      checked={selectedStorage === option.value}
                      onChange={(e) => setSelectedStorage(e.target.value)}
                      className="mr-3 text-primary"
                    />
                    <span>{option.size}</span>
                  </div>
                  <span className="font-semibold">{option.price}</span>
                </label>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold">Total Price</span>
              <span className="text-xl font-bold" data-testid="total-price">{selectedOption?.price}</span>
            </div>
            
            <button 
              className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors border border-border"
              data-testid="button-select-paid"
            >
              SELECT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
