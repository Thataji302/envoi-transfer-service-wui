import { Link, useLocation } from "wouter";
import { PlaneTakeoff } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-card border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center" data-testid="logo-link">
            <PlaneTakeoff className="text-primary text-xl mr-2" />
            <span className="text-xl font-bold">PacSend</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-muted-foreground hover:text-foreground transition-colors ${
                location === "/" ? "text-foreground" : ""
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link 
              href="/pricing" 
              className={`text-muted-foreground hover:text-foreground transition-colors ${
                location === "/pricing" ? "text-foreground" : ""
              }`}
              data-testid="nav-pricing"
            >
              Pricing
            </Link>
            <Link 
              href="/dashboard" 
              className={`text-muted-foreground hover:text-foreground transition-colors ${
                location === "/dashboard" ? "text-foreground" : ""
              }`}
              data-testid="nav-dashboard"
            >
              Dashboard
            </Link>
            <button 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              data-testid="button-signup"
            >
              Sign Up
            </button>
          </div>

          <div className="md:hidden">
            <button 
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
