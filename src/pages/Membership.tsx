import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Gift, 
  Star, 
  CheckCircle, 
  Calendar, 
  Bell, 
  Heart,
  Award,
  Percent,
  Phone
} from "lucide-react";

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const membershipPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "Free",
      period: "",
      description: "Essential features for your contraceptive journey",
      features: [
        "Basic contraceptive method information",
        "Simple quiz recommendations",
        "Basic appointment booking",
        "Email reminders"
      ],
      limitations: [
        "Limited quiz accuracy",
        "Basic customer support",
        "No vouchers or discounts"
      ],
      color: "border-muted",
      buttonVariant: "outline" as const
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99",
      period: "/month",
      description: "Enhanced features with personalized care",
      features: [
        "Advanced personalized recommendations",
        "Detailed health tracking",
        "Priority appointment booking",
        "SMS and app reminders",
        "Monthly vouchers worth $25",
        "24/7 chat support",
        "Exclusive health content"
      ],
      limitations: [],
      color: "border-primary",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      id: "elite",
      name: "Elite",
      price: "$19.99",
      period: "/month",
      description: "Premium care with exclusive benefits",
      features: [
        "Everything in Premium",
        "Personal health concierge",
        "Video consultations included (2/month)",
        "Express prescription delivery",
        "Monthly vouchers worth $50",
        "Exclusive member events",
        "Family planning consultation",
        "VIP customer support"
      ],
      limitations: [],
      color: "border-accent",
      buttonVariant: "default" as const,
      crown: true
    }
  ];

  const currentMember = {
    plan: "Premium",
    joinDate: "January 2024",
    pointsEarned: 750,
    vouchersUsed: 3,
    nextReward: 1000
  };

  const vouchers = [
    {
      id: 1,
      title: "$25 Off Consultation",
      description: "Valid for any healthcare consultation",
      expires: "Dec 31, 2024",
      code: "HEALTH25",
      status: "active"
    },
    {
      id: 2,
      title: "Free Prescription Delivery",
      description: "No delivery fees on your next order",
      expires: "Nov 30, 2024",
      code: "DELIVERY",
      status: "active"
    },
    {
      id: 3,
      title: "$15 Off Products",
      description: "Discount on contraceptive products",
      expires: "Oct 15, 2024",
      code: "PRODUCTS15",
      status: "used"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Membership & Benefits
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our community and unlock exclusive benefits, personalized care, and valuable rewards
        </p>
      </div>

      {/* Current Membership Status */}
      <Card className="mb-8 bg-gradient-primary text-primary-foreground">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8" />
              <div>
                <h3 className="text-2xl font-bold">{currentMember.plan} Member</h3>
                <p className="opacity-90">Member since {currentMember.joinDate}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Active
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{currentMember.pointsEarned}</div>
              <div className="opacity-90">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{currentMember.vouchersUsed}</div>
              <div className="opacity-90">Vouchers Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{currentMember.nextReward - currentMember.pointsEarned}</div>
              <div className="opacity-90">Points to Next Reward</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to next reward</span>
              <span>{currentMember.pointsEarned}/{currentMember.nextReward} points</span>
            </div>
            <Progress value={(currentMember.pointsEarned / currentMember.nextReward) * 100} className="bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Membership Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.color} ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              {plan.crown && (
                <Crown className="absolute -top-3 right-4 h-6 w-6 text-accent" />
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {plan.price}
                  <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full"
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.id === "basic" ? "Current Plan" : "Upgrade Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vouchers & Benefits */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Available Vouchers */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Gift className="h-6 w-6" />
            Your Vouchers
          </h3>
          <div className="space-y-4">
            {vouchers.map((voucher) => (
              <Card key={voucher.id} className={voucher.status === 'used' ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{voucher.title}</h4>
                    <Badge variant={voucher.status === 'active' ? 'default' : 'secondary'}>
                      {voucher.status === 'active' ? 'Available' : 'Used'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{voucher.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono bg-muted px-2 py-1 rounded">{voucher.code}</span>
                    <span className="text-muted-foreground">Expires: {voucher.expires}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Member Benefits */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Star className="h-6 w-6" />
            Member Benefits
          </h3>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Percent className="h-8 w-8 text-accent" />
                <div>
                  <h4 className="font-semibold">Monthly Vouchers</h4>
                  <p className="text-sm text-muted-foreground">Save up to $50 every month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Priority Booking</h4>
                  <p className="text-sm text-muted-foreground">Get the best appointment slots</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Phone className="h-8 w-8 text-accent" />
                <div>
                  <h4 className="font-semibold">24/7 Support</h4>
                  <p className="text-sm text-muted-foreground">Round-the-clock expert assistance</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Award className="h-8 w-8 text-warning" />
                <div>
                  <h4 className="font-semibold">Rewards Program</h4>
                  <p className="text-sm text-muted-foreground">Earn points for every interaction</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-secondary text-center">
        <CardContent className="p-8">
          <Heart className="h-12 w-12 mx-auto mb-4 text-secondary-accent" />
          <h3 className="text-2xl font-bold text-secondary-foreground mb-4">
            Ready to Upgrade Your Experience?
          </h3>
          <p className="text-secondary-foreground/80 mb-6 max-w-md mx-auto">
            Join thousands of women who trust us with their reproductive health journey
          </p>
          <Button size="lg" className="bg-gradient-primary">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Membership;