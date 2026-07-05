import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { formatGNF } from "@/data/products";
import { toast } from "sonner";
import { ArrowLeft, Check, Smartphone, Banknote, MapPin, User, Phone } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("orange");
  const [city, setCity] = useState("Conakry");
  const shipping = city === "Conakry" ? 15000 : 35000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <Link to="/products"><Button variant="hero">Explorer les produits</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = "PC-" + Date.now().toString().slice(-8);
    toast.success("Commande confirmée !", {
      description: `Numéro : ${orderId}. Vous serez contacté pour la livraison.`,
    });
    clearCart();
    setTimeout(() => navigate("/tracking?order=" + orderId), 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <Button variant="ghost" size="sm" className="mb-4 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" /> Retour au panier
        </Button>
        <h1 className="text-3xl font-bold mb-8 font-display">Validation de la commande</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prénom *</Label>
                  <Input required placeholder="Aïssatou" />
                </div>
                <div className="space-y-2">
                  <Label>Nom *</Label>
                  <Input required placeholder="Diallo" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input required type="tel" placeholder="+224 6XX XX XX XX" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="votre@email.gn" />
                </div>
              </CardContent>
            </Card>

            {/* Delivery */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Adresse de livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ville *</Label>
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-input bg-background">
                      <option>Conakry</option>
                      <option>Kindia</option>
                      <option>Boké</option>
                      <option>Kankan</option>
                      <option>Labé</option>
                      <option>N'Zérékoré</option>
                      <option>Faranah</option>
                      <option>Mamou</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Quartier / Commune *</Label>
                    <Input required placeholder="Ratoma, Kaloum..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Adresse détaillée *</Label>
                  <Textarea required placeholder="Repères, immeuble, rue..." rows={3} />
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Mode de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="orange" id="orange" />
                    <Smartphone className="w-5 h-5 text-accent" />
                    <div className="flex-1">
                      <p className="font-medium">Orange Money</p>
                      <p className="text-xs text-muted-foreground">Paiement mobile sécurisé</p>
                    </div>
                    <Badge variant="secondary">Populaire</Badge>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="momo" id="momo" />
                    <Smartphone className="w-5 h-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-medium">MTN Mobile Money</p>
                      <p className="text-xs text-muted-foreground">Paiement mobile MTN MoMo</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <Banknote className="w-5 h-5 text-success" />
                    <div className="flex-1">
                      <p className="font-medium">Paiement à la livraison</p>
                      <p className="text-xs text-muted-foreground">Espèces au livreur</p>
                    </div>
                  </label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card variant="elevated" className="sticky top-32">
              <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl shrink-0">
                        {item.product.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qté : {item.quantity}</p>
                      </div>
                      <p className="font-semibold shrink-0">{formatGNF(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span>{formatGNF(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Livraison ({city})</span><span>{formatGNF(shipping)}</span></div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">{formatGNF(total)}</span>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
                  <Check className="w-5 h-5" /> Confirmer la commande
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  En confirmant, vous acceptez nos conditions générales de vente.
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
