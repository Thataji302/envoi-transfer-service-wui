import HeroSection from "../components/hero-section.jsx";
import FeatureShowcase from "../components/feature-showcase.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureShowcase />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
            <span className="text-xl font-bold">PacSend</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            © 2025 Pacgenesis. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-support">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
