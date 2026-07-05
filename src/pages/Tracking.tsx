import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatGNF } from "@/data/products";
import { Package, Truck, Check, MapPin, Search, ArrowRight, Phone, MessageCircle } from "lucide-react";

const orderStatuses = [
  { label: "Commande confirmée", date: "Aujourd'hui · 10:30", completed: true },
  { label: "Validation pharmacien", date: "Aujourd'hui · 11:15", completed: true },
  { label: "En préparation", date: "Aujourd'hui · 12:00", completed: true },
  { label: "Expédiée", date: "Aujourd'hui · 14:00", completed: true },
  { label: "En livraison", date: "Bientôt", completed: false, current: true },
  { label: "Livrée", date: "-", completed: false },
];

const orderItems = [
  { name: "Paracétamol 500 mg", quantity: 2, price: 8000, image: "💊" },
  { name: "Vitamine C 1000 mg", quantity: 1, price: 25000, image: "🍊" },
  { name: "SRO (Sels de Réhydratation)", quantity: 1, price: 12000, image: "💧" },
];

const Tracking = () => {
  const [params] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(params.get("order") || "PC-78542021");
  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 15000;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="info" className="mb-4">Suivi de commande</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Suivre ma commande</h1>
            <p className="text-muted-foreground">Entrez votre numéro de commande pour voir l'état de la livraison</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Numéro de commande (ex: PC-XXXXXXXX)" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className="pl-10" />
                </div>
                <Button variant="default">Rechercher</Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Commande #{trackingNumber}</CardTitle>
                <Badge variant="success">En cours de livraison</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 space-y-6 mb-8">
                {orderStatuses.map((step, index) => (
                  <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.06}s` }}>
                    {index < orderStatuses.length - 1 && (
                      <div className={`absolute left-[-20px] top-6 w-0.5 h-full ${step.completed ? "bg-primary" : "bg-border"}`} />
                    )}
                    <div className={`absolute left-[-26px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${step.completed ? "bg-primary border-primary" : step.current ? "bg-background border-primary animate-pulse" : "bg-background border-border"}`}>
                      {step.completed && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div>
                      <p className={`font-semibold ${step.current ? "text-primary" : step.completed ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card variant="glass" className="mb-6">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Adresse de livraison</p>
                    <p className="text-sm text-muted-foreground">
                      Aïssatou Diallo<br />
                      Quartier Ratoma, à côté de la station Total<br />
                      Conakry, Guinée<br />
                      Tél : +224 622 XX XX XX
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-1"><Phone className="w-3 h-3" /> Livreur</Button>
                    <Button variant="ghost" size="sm" className="gap-1"><MessageCircle className="w-3 h-3" /> Chat</Button>
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold mb-4">Articles commandés</h4>
                <div className="space-y-3">
                  {orderItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qté : {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">{formatGNF(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span>{formatGNF(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span><span>{formatGNF(shipping)}</span></div>
                  <div className="flex justify-between font-bold text-base pt-2"><span>Total</span><span className="text-primary">{formatGNF(subtotal + shipping)}</span></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="feature">
            <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h4 className="font-semibold mb-1">Besoin d'aide ?</h4>
                <p className="text-sm text-muted-foreground">Contactez notre service client au +224 622 00 00 00</p>
              </div>
              <Button variant="outline" className="gap-2">Nous contacter<ArrowRight className="w-4 h-4" /></Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tracking;
