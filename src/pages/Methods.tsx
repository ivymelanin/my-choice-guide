import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Heart, Zap } from "lucide-react";

const methods = [
  {
    id: 1,
    name: "Birth Control Pill",
    type: "Hormonal",
    effectiveness: "91%",
    duration: "Daily",
    description: "A daily oral contraceptive containing hormones that prevent ovulation.",
    pros: ["Highly effective", "Regulates periods", "May improve acne", "Easily reversible"],
    cons: ["Daily commitment", "May cause side effects", "Requires prescription"],
    icon: Heart,
    color: "bg-primary"
  },
  {
    id: 2,
    name: "IUD (Copper)",
    type: "Non-hormonal",
    effectiveness: "99%",
    duration: "10 years",
    description: "A small T-shaped device inserted into the uterus that prevents fertilization.",
    pros: ["Highly effective", "Long-lasting", "No daily maintenance", "Immediately reversible"],
    cons: ["May increase menstrual flow", "Insertion procedure required", "Initial cost"],
    icon: Shield,
    color: "bg-accent"
  },
  {
    id: 3,
    name: "IUD (Hormonal)",
    type: "Hormonal",
    effectiveness: "99%",
    duration: "3-7 years",
    description: "A small device that releases hormones locally to prevent pregnancy.",
    pros: ["Highly effective", "May reduce periods", "Long-lasting", "Low hormone dose"],
    cons: ["Insertion procedure", "Initial side effects possible", "Requires prescription"],
    icon: Shield,
    color: "bg-primary"
  },
  {
    id: 4,
    name: "Condoms",
    type: "Barrier",
    effectiveness: "85%",
    duration: "Per use",
    description: "A barrier method that also provides protection against STIs.",
    pros: ["STI protection", "No hormones", "Available over-the-counter", "Immediately reversible"],
    cons: ["Must use every time", "May interrupt spontaneity", "Lower effectiveness"],
    icon: Zap,
    color: "bg-secondary-accent"
  },
  {
    id: 5,
    name: "Birth Control Shot",
    type: "Hormonal",
    effectiveness: "94%",
    duration: "3 months",
    description: "An injection given every three months to prevent pregnancy.",
    pros: ["Long-acting", "Private", "May stop periods", "Doesn't require daily action"],
    cons: ["Requires regular appointments", "May cause weight gain", "Delayed return to fertility"],
    icon: Clock,
    color: "bg-primary"
  },
  {
    id: 6,
    name: "Birth Control Patch",
    type: "Hormonal",
    effectiveness: "91%",
    duration: "Weekly",
    description: "A patch worn on the skin that releases hormones through the skin.",
    pros: ["Weekly application", "Visible reminder", "Similar to pill benefits", "Easily reversible"],
    cons: ["May fall off", "Skin irritation possible", "Visible on skin", "Less effective for heavier women"],
    icon: Heart,
    color: "bg-primary"
  }
];

const Methods = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Contraceptive Methods
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn about different contraceptive options to make an informed choice that fits your lifestyle and needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.id} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${method.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary">{method.type}</Badge>
                </div>
                <CardTitle className="text-xl text-primary">{method.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>{method.effectiveness} effective</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{method.duration}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{method.description}</p>
                
                <div>
                  <h4 className="font-semibold text-accent mb-2">Pros</h4>
                  <ul className="text-sm space-y-1">
                    {method.pros.slice(0, 2).map((pro, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-warning mb-2">Considerations</h4>
                  <ul className="text-sm space-y-1">
                    {method.cons.slice(0, 2).map((con, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-gradient-secondary max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-secondary-foreground mb-4">
              Need Personalized Recommendations?
            </h3>
            <p className="text-secondary-foreground/80 mb-6">
              Take our comprehensive quiz to get method recommendations tailored to your lifestyle, health, and preferences.
            </p>
            <Button size="lg" className="bg-gradient-primary">
              Take the Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Methods;