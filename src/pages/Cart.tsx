import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Truck, 
  Shield,
  ArrowRight,
  Tag
} from "lucide-react";
import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "Doliprane 1000mg",
    description: "Comprimés - Boîte de 8",
    price: 3.99,
    quantity: 2,
    prescription: false,
    image: "💊"
  },
  {
    id: 2,
    name: "Vitamine D3",
    description: "1000 UI - 90 gélules",
    price: 12.90,
    quantity: 1,
    prescription: false,
    image: "🌟"
  },
  {
    id: 3,
    name: "Amoxicilline 500mg",
    description: "Gélules - Boîte de 12",
    price: 8.50,
    quantity: 1,
    prescription: true,
    image: "💉"
  },
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 49 ? 0 : 4.90;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 font-display">
          Mon panier ({items.length})
        </h1>

        {items.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Link to="/products">
                <Button variant="hero">Explorer les produits</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} variant="default">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center text-3xl shrink-0">
                        {item.image}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-foreground">{item.name}</h3>
                              {item.prescription && (
                                <Badge variant="prescription" className="text-xs">Ordonnance</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-muted-foreground hover:text-destructive shrink-0"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-lg font-bold text-foreground">
                            {(item.price * item.quantity).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Promo code */}
              <Card variant="default">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-3">
                    <div className="relative flex-grow">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Code promo" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">Appliquer</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-32">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="text-foreground">{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="text-foreground">
                        {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Livraison gratuite dès 49€ d'achat
                      </p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">{total.toFixed(2)} €</span>
                  </div>

                  <Button variant="hero" className="w-full gap-2" size="lg">
                    Passer commande
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>Livraison sous 24-48h</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Paiement 100% sécurisé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
