import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Link2, Star, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-background font-baloo min-h-screen">
      {/* Hero Section */}
      <div className="container-responsive py-12 sm:py-16 lg:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-6 animate-fade-in">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center animate-glow">
              <Link2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          
          <h1 className="responsive-title font-bold glow-text mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Link Hub
          </h1>
          
          <p className="responsive-text text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            The ultimate solution for organizing, managing, and sharing your favorite links. 
            Clean, fast, and beautifully designed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button asChild variant="gradient" size="lg" className="font-semibold">
              <Link to="/" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/preview">View Demo</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card className="p-6 card-glow hover-lift animate-fade-in group" style={{ animationDelay: '0.8s' }}>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-all">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 glow-text">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm">
              Instant search and navigation through your links with keyboard shortcuts.
            </p>
          </Card>

          <Card className="p-6 card-glow hover-lift animate-fade-in group" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-all">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2 glow-text-accent">Smart Organization</h3>
            <p className="text-muted-foreground text-sm">
              Automatically categorize and tag your links for perfect organization.
            </p>
          </Card>

          <Card className="p-6 card-glow hover-lift animate-fade-in group sm:col-span-2 lg:col-span-1" style={{ animationDelay: '1.2s' }}>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-all">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 glow-text">Easy Sharing</h3>
            <p className="text-muted-foreground text-sm">
              Share your curated collections with anyone, anywhere.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <h2 className="responsive-heading font-bold glow-text mb-4">
            Ready to organize your digital life?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who have transformed their link management experience.
          </p>
          <Button asChild variant="gradient" size="lg" className="font-semibold">
            <Link to="/" className="flex items-center gap-2">
              Start Now - It's Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}