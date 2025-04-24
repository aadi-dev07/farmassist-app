
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CloudRain, Sun, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Alerts: React.FC = () => {
  const alerts = [
    {
      type: 'High Risk',
      disease: 'Late Blight',
      crops: ['Potato', 'Tomato'],
      location: 'Midwest Region',
      date: '2025-04-23',
      details: 'Wet conditions and moderate temperatures are creating ideal environment for Late Blight development. Monitor your crops closely.',
      prevention: [
        'Apply preventive fungicides',
        'Ensure proper air circulation',
        'Remove infected plants immediately'
      ],
      severity: 'high'
    },
    {
      type: 'Medium Risk',
      disease: 'Powdery Mildew',
      crops: ['Cucumber', 'Squash', 'Melon'],
      location: 'Northeast Region',
      date: '2025-04-22',
      details: 'Rising humidity levels increase risk of Powdery Mildew. Be vigilant with crop inspection.',
      prevention: [
        'Maintain plant spacing',
        'Water at the base of plants',
        'Apply sulfur-based fungicides if necessary'
      ],
      severity: 'medium'
    },
    {
      type: 'Advisory',
      disease: 'Aphid Infestation',
      crops: ['Lettuce', 'Kale', 'Cabbage'],
      location: 'Pacific Northwest',
      date: '2025-04-21',
      details: 'Aphid populations are increasing with warmer weather. Consider preventative measures.',
      prevention: [
        'Introduce beneficial insects',
        'Apply neem oil spray',
        'Monitor plants regularly'
      ],
      severity: 'low'
    }
  ];

  const weatherForecast = [
    { day: 'Today', temp: '72°F', condition: 'Sunny', icon: <Sun className="h-6 w-6" /> },
    { day: 'Tomorrow', temp: '68°F', condition: 'Partly Cloudy', icon: <Sun className="h-6 w-6" /> },
    { day: 'Saturday', temp: '65°F', condition: 'Rain', icon: <CloudRain className="h-6 w-6" /> },
  ];

  return (
    <section id="alerts" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Disease Outbreak <span className="text-farm-green-600">Alerts</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Stay informed about potential threats to your crops with real-time alerts and weather forecasts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-8">
          {weatherForecast.map((item, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">{item.day}</h3>
                <div className="flex justify-center mb-2">
                  {item.icon}
                </div>
                <p className="text-3xl font-bold mb-1">{item.temp}</p>
                <p className="text-muted-foreground">{item.condition}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          {alerts.map((alert, index) => (
            <Card key={index} className={`border-l-4 ${
              alert.severity === 'high' ? 'border-l-red-500' : 
              alert.severity === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'
            }`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className={`h-5 w-5 ${
                        alert.severity === 'high' ? 'text-red-500' : 
                        alert.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
                      }`} />
                      <Badge variant={
                        alert.severity === 'high' ? 'destructive' : 
                        alert.severity === 'medium' ? 'default' : 'secondary'
                      }>
                        {alert.type}
                      </Badge>
                    </div>
                    <CardTitle>{alert.disease}</CardTitle>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center justify-end">
                      <MapPin className="h-3 w-3 mr-1" />
                      {alert.location}
                    </div>
                    <span>{new Date(alert.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium">Affected Crops:</p>
                  <div className="flex flex-wrap gap-2">
                    {alert.crops.map((crop, i) => (
                      <Badge key={i} variant="outline">{crop}</Badge>
                    ))}
                  </div>
                </div>
                
                <p className="mb-4">{alert.details}</p>
                
                <div>
                  <p className="mb-2 text-sm font-medium">Prevention Steps:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {alert.prevention.map((step, i) => (
                      <li key={i} className="text-sm">{step}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alerts;
