import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, Calendar, Pill, CheckCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Reminder {
  id: number;
  type: string;
  title: string;
  time: string;
  days: string[];
  active: boolean;
  nextDue: string;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    type: 'pill',
    time: '',
    selectedDays: [] as string[]
  });

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('contraceptive-reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      // Set default reminders if none exist
      const defaultReminders = [
        {
          id: 1,
          type: "pill",
          title: "Birth Control Pill",
          time: "08:00",
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          active: true,
          nextDue: "Today at 8:00 AM"
        },
        {
          id: 2,
          type: "appointment",
          title: "Follow-up Appointment",
          time: "14:30",
          days: ["Tue"],
          active: true,
          nextDue: "Tuesday at 2:30 PM"
        },
        {
          id: 3,
          type: "refill",
          title: "Prescription Refill",
          time: "09:00",
          days: ["Fri"],
          active: false,
          nextDue: "Friday at 9:00 AM"
        }
      ];
      setReminders(defaultReminders);
      localStorage.setItem('contraceptive-reminders', JSON.stringify(defaultReminders));
    }
  }, []);

  // Save reminders to localStorage whenever reminders change
  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('contraceptive-reminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }));
  };

  const formatNextDue = (time: string, days: string[]) => {
    if (days.length === 7) return `Daily at ${time}`;
    if (days.length === 1) return `${days[0]} at ${time}`;
    return `${days.join(', ')} at ${time}`;
  };

  const handleSaveReminder = () => {
    if (!formData.title || !formData.time || formData.selectedDays.length === 0) {
      toast.error("Please fill in all fields and select at least one day");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now(),
      type: formData.type,
      title: formData.title,
      time: formData.time,
      days: formData.selectedDays,
      active: true,
      nextDue: formatNextDue(formData.time, formData.selectedDays)
    };

    setReminders(prev => [...prev, newReminder]);
    setFormData({
      title: '',
      type: 'pill',
      time: '',
      selectedDays: []
    });
    setShowAddForm(false);
    toast.success("Reminder added successfully!");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pill':
        return <Pill className="h-5 w-5 text-primary" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-accent" />;
      case 'refill':
        return <Bell className="h-5 w-5 text-warning" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const reminderTypes = [
    { value: 'pill', label: 'Pill Reminder', icon: Pill },
    { value: 'appointment', label: 'Appointment', icon: Calendar },
    { value: 'refill', label: 'Prescription Refill', icon: Bell },
    { value: 'checkup', label: 'Health Checkup', icon: CheckCircle }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Reminders
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay on track with your contraceptive routine and appointments
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {reminders.filter(r => r.active).length}
            </div>
            <div className="text-muted-foreground">Active Reminders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {reminders.filter(r => r.type === 'pill' && r.active).length}
            </div>
            <div className="text-muted-foreground">Daily Pills</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {reminders.filter(r => r.type === 'appointment' && r.active).length}
            </div>
            <div className="text-muted-foreground">Upcoming Appointments</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle>Add New Reminder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reminderTitle">Reminder Title</Label>
                <Input 
                  id="reminderTitle" 
                  placeholder="e.g., Birth Control Pill"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                />
              </div>
              
              <div>
                <Label htmlFor="reminderType">Type</Label>
                <select 
                  className="w-full p-2 border rounded-md bg-background"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}
                >
                  {reminderTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="reminderTime">Time</Label>
                <Input 
                  id="reminderTime" 
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({...prev, time: e.target.value}))}
                />
              </div>
              
              <div>
                <Label>Days</Label>
                <div className="flex gap-2 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <Button 
                      key={day} 
                      variant={formData.selectedDays.includes(day) ? "default" : "outline"} 
                      size="sm" 
                      className="w-12"
                      onClick={() => toggleDay(day)}
                      type="button"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="bg-gradient-primary"
                onClick={handleSaveReminder}
                type="button"
              >
                Save Reminder
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Your Reminders</h2>
        
        {reminders.map((reminder) => (
          <Card key={reminder.id} className={`transition-all ${reminder.active ? 'border-primary/20' : 'opacity-60'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    {getIcon(reminder.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{reminder.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {reminder.time}
                      </span>
                      <span>Next: {reminder.nextDue}</span>
                    </div>
                    
                    <div className="flex gap-1 mt-2">
                      {reminder.days.map(day => (
                        <Badge key={day} variant="secondary" className="text-xs">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`switch-${reminder.id}`} className="text-sm">
                      {reminder.active ? 'On' : 'Off'}
                    </Label>
                    <Switch
                      id={`switch-${reminder.id}`}
                      checked={reminder.active}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <Card className="mt-8 bg-gradient-secondary">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">💡 Reminder Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-secondary-foreground">
          <ul className="space-y-2 text-sm">
            <li>• Set pill reminders at the same time each day for maximum effectiveness</li>
            <li>• Enable notifications on your device to ensure you don't miss reminders</li>
            <li>• Schedule appointment reminders a few days in advance</li>
            <li>• Set prescription refill reminders before you run out</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reminders;