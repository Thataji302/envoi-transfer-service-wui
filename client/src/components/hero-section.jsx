import { useLocation } from "wouter";
import CountdownTimer from "./countdown-timer.jsx";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
          <img 
            src="https://pixabay.com/get/g2991e3fbb532a957f2e5f1a6b1e3a7f70c92e49c89e6f580a4a5fd1f52573744b5a097a1cb4bc3a7ecb6b0ad3002c7f4449e06dabb7f17ad23526feebc492ad5_1280.jpg"
            alt="Abstract digital network background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
            Distribute Your Media Mind with
            <span className="text-primary"> PacSend</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="hero-description">
            Your next big thing starts with a single click. Secure, fast, and reliable file sharing for creators and professionals.
          </p>

          <CountdownTimer />

          <button 
            onClick={() => setLocation("/pricing")}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-get-started"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
