import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Women's Health Specialist",
      location: "Downtown Clinic",
      rating: 4.9,
      nextAvailable: "Tomorrow"
    },
    {
      id: 2,
      name: "Dr. Maria Rodriguez",
      specialty: "Reproductive Health",
      location: "Central Medical Center",
      rating: 4.8,
      nextAvailable: "Today"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "Family Planning",
      location: "Westside Health Hub",
      rating: 4.9,
      nextAvailable: "In 2 days"
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const consultationTypes = [
    {
      type: "Initial Consultation",
      duration: "45 minutes",
      price: "$150",
      description: "Comprehensive discussion about contraceptive options"
    },
    {
      type: "Follow-up Visit",
      duration: "20 minutes", 
      price: "$75",
      description: "Check-in and adjustment of current method"
    },
    {
      type: "Emergency Consultation",
      duration: "30 minutes",
      price: "$120",
      description: "Urgent contraceptive concerns or side effects"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Book Your Consultation
        </h1>
        <p className="text-lg text-muted-foreground">
          Schedule an appointment with our healthcare professionals
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Booking Form */}
        <div className="space-y-6">
          {/* Consultation Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Select Consultation Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {consultationTypes.map((consultation, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{consultation.type}</h4>
                    <span className="font-bold text-primary">{consultation.price}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {consultation.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{consultation.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Provider Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Choose Healthcare Provider
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedProvider === provider.id.toString() ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedProvider(provider.id.toString())}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{provider.name}</h4>
                    <span className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded">
                      ★ {provider.rating}
                    </span>
                  </div>
                  <p className="text-sm text-primary mb-1">{provider.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {provider.location}
                    </span>
                    <span className="text-accent">Next: {provider.nextAvailable}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" />
              </div>
              
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific concerns or questions you'd like to discuss..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card className="bg-gradient-secondary">
            <CardHeader>
              <CardTitle className="text-secondary-foreground">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-secondary-foreground">
              <div className="flex justify-between">
                <span>Consultation:</span>
                <span className="font-semibold">Initial Consultation</span>
              </div>
              <div className="flex justify-between">
                <span>Provider:</span>
                <span className="font-semibold">Dr. Sarah Johnson</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-semibold">{selectedDate || "Select date"}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-semibold">{selectedTime || "Select time"}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>$150</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full mt-4 bg-gradient-primary"
                disabled={!selectedDate || !selectedTime}
              >
                Confirm Booking
              </Button>
              
              <p className="text-sm text-secondary-foreground/70 text-center">
                You'll receive a confirmation email within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;