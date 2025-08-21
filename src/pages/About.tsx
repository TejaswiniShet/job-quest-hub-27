import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Users, Target, Award, Heart } from "lucide-react";
import { User } from "@/types";

interface AboutProps {
  user?: User | null;
}

const About = ({ user }: AboutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About JobBoard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're on a mission to connect talented professionals with amazing opportunities, 
              making the job search and hiring process better for everyone.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Job Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                  <p className="text-muted-foreground">
                    We prioritize quality over quantity, ensuring every job posting and candidate profile meets high standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                  <p className="text-muted-foreground">
                    Our platform is built around the needs of our community, constantly evolving based on user feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-warning/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in everything we do, from our technology to our customer service.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-destructive/10 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Human Centered</h3>
                  <p className="text-muted-foreground">
                    At the core of everything we do are real people with real career aspirations and business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-muted/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To revolutionize the way people find jobs and companies find talent by creating 
              a platform that truly understands both sides of the hiring equation. We believe 
              that when the right people connect with the right opportunities, amazing things happen.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;