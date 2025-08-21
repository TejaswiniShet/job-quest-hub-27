import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Search, Users, Briefcase, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { User } from "@/types";

interface IndexProps {
  user: User | null;
}

const Index = ({ user }: IndexProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Find Your Dream Job Today
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Connect with top employers and discover opportunities that match your skills. 
                Whether you're hiring or job hunting, we've got you covered.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login?role=job_seeker">
                  <Button size="lg" className="btn-hero w-full sm:w-auto">
                    <Search className="mr-2 h-5 w-5" />
                    Find Jobs
                  </Button>
                </Link>
                <Link to="/login?role=employer">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto">
                    <Users className="mr-2 h-5 w-5" />
                    Hire Talent
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <img 
                src={heroImage} 
                alt="Professional team collaborating in modern office" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose JobBoard?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We connect the right talent with the right opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="job-card text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Job Search</h3>
              <p className="text-muted-foreground">
                Advanced filters and search functionality to find jobs that perfectly match your skills and preferences.
              </p>
            </div>

            <div className="job-card text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Top Companies</h3>
              <p className="text-muted-foreground">
                Connect with leading companies and startups looking for talented professionals like you.
              </p>
            </div>

            <div className="job-card text-center">
              <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Matches</h3>
              <p className="text-muted-foreground">
                Our smart matching algorithm ensures you see the most relevant opportunities for your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect job match through our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="btn-hero">
                Create Account
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;