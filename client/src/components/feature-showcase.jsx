import { Shield, Zap, Eye, Users } from "lucide-react";

export default function FeatureShowcase() {
  const features = [
    {
      icon: Shield,
      title: "Security",
      description: "End-to-end encryption with enterprise-grade security protocols."
    },
    {
      icon: Zap,
      title: "Speed",
      description: "Lightning-fast uploads and downloads with global CDN support."
    },
    {
      icon: Eye,
      title: "Preview",
      description: "Advanced media preview and streaming capabilities."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Seamless team collaboration with permission controls."
    }
  ];

  const stats = [
    { value: "78K+", label: "Active Users" },
    { value: "180", label: "Countries" },
    { value: "59.7", label: "Petabytes Transferred" }
  ];

  const devices = [
    { icon: "💻", name: "Desktop" },
    { icon: "💻", name: "Laptop" },
    { icon: "📱", name: "Tablet" },
    { icon: "📱", name: "Mobile" }
  ];

  return (
    <>
      {/* Core Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" data-testid="features-title">Core Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage, share, and distribute your digital content securely and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-lg border border-border" data-testid={`feature-card-${index}`}>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary text-xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="stats-title">Let's Check The Numbers!</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} data-testid={`stat-${index}`}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="devices-title">Available On Your Favourite Devices</h2>
          <div className="flex justify-center space-x-12 mt-12">
            {devices.map((device, index) => (
              <div key={index} className="text-center" data-testid={`device-${index}`}>
                <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl">
                  {device.icon}
                </div>
                <span className="text-sm text-muted-foreground">{device.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
