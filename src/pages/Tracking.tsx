import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Package, 
  Truck, 
  Check, 
  Clock,
  MapPin,
  Search,
  ArrowRight
} from "lucide-react";

const orderStatuses = [
  { status: "confirmed", label: "Commande confirmée", date: "14 Dec 2024 - 10:30", completed: true },
  { status: "preparing", label: "En préparation", date: "14 Dec 2024 - 11:15", completed: true },
  { status: "shipped", label: "Expédiée", date: "14 Dec 2024 - 14:00", completed: true },
  { status: "delivery", label: "En livraison", date: "15 Dec 2024 - 09:00", completed: false, current: true },
  { status: "delivered", label: "Livrée", date: "-", completed: false },
];

const orderItems = [
  { name: "Doliprane 1000mg", quantity: 2, price: 3.99, image: "💊" },
  { name: "Vitamine D3", quantity: 1, price: 12.90, image: "🌟" },
];

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("PC-2024-78542");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="info" className="mb-4">
              Suivi de commande
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              Suivre ma commande
            </h1>
            <p className="text-muted-foreground">
              Entrez votre numéro de commande pour voir l'état de votre livraison
            </p>
          </div>

          {/* Search */}
          <Card variant="default" className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Numéro de commande (ex: PC-2024-XXXXX)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="default">Rechercher</Button>
              </div>
            </CardContent>
          </Card>

          {/* Order status */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Commande #{trackingNumber}
                </CardTitle>
                <Badge variant="success">En cours</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Timeline */}
              <div className="relative pl-8 space-y-8 mb-8">
                {orderStatuses.map((step, index) => (
                  <div key={step.status} className="relative">
                    {/* Line */}
                    {index < orderStatuses.length - 1 && (
                      <div className={`absolute left-[-20px] top-6 w-0.5 h-full ${step.completed ? "bg-primary" : "bg-border"}`} />
                    )}
                    
                    {/* Dot */}
                    <div className={`absolute left-[-26px] top-1 w-4 h-4 rounded-full border-2 ${
                      step.completed 
                        ? "bg-primary border-primary" 
                        : step.current 
                          ? "bg-background border-primary animate-pulse" 
                          : "bg-background border-border"
                    }`}>
                      {step.completed && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    
                    <div>
                      <p className={`font-semibold ${step.current ? "text-primary" : step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery info */}
              <Card variant="glass" className="mb-6">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adresse de livraison</p>
                    <p className="text-sm text-muted-foreground">
                      Jean Dupont<br />
                      123 Rue de la Santé<br />
                      75014 Paris, France
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-6" />

              {/* Order items */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Articles commandés</h4>
                <div className="space-y-3">
                  {orderItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qté: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card variant="feature">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Besoin d'aide ?</h4>
                <p className="text-sm text-muted-foreground">Contactez notre service client</p>
              </div>
              <Button variant="outline" className="gap-2">
                Nous contacter
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tracking;
