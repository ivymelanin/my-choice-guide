import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: "Personalized Recommendations",
      description: "Get contraceptive method suggestions tailored to your unique lifestyle and health needs."
    },
    {
      icon: Shield,
      title: "Expert Guidance",
      description: "Access medically-reviewed information and connect with healthcare professionals."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a supportive community of women making informed reproductive health choices."
    }
  ];

  const stats = [
    { value: "50,000+", label: "Women Helped" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" },
    { value: "15+", label: "Methods Covered" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose MyChoice?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive, personalized support for your contraceptive journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mx-auto p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to find your perfect contraceptive method
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Take the Quiz</h3>
                <p className="text-muted-foreground">Answer questions about your lifestyle, health, and preferences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
                <p className="text-muted-foreground">Receive personalized contraceptive method suggestions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Book Consultation</h3>
                <p className="text-muted-foreground">Schedule with our healthcare professionals for expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of women who have found their perfect contraceptive method with our guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="bg-gradient-primary text-lg px-8 py-6">
                Start Your Quiz Now
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/methods">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Explore Methods
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
