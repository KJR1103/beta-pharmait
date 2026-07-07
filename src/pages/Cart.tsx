import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, ArrowRight, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatGNF } from "@/lib/catalog";

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const shipping = subtotal >= 200000 ? 0 : subtotal > 0 ? 15000 : 0;
  const total = subtotal + shipping;
  const hasPrescription = items.some((i) => i.product.prescription);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8 font-display">
          Mon panier {itemCount > 0 && <span className="text-muted-foreground">({itemCount})</span>}
        </h1>

        {items.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Link to="/products"><Button variant="hero">Explorer les produits</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {hasPrescription && (
                <Card variant="default" className="border-warning bg-warning/5">
                  <CardContent className="p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Certains produits nécessitent une ordonnance</p>
                      <p className="text-sm text-muted-foreground">Téléversez votre ordonnance pour valider la commande.</p>
                    </div>
                    <Link to="/prescriptions"><Button size="sm" variant="outline">Ordonnance</Button></Link>
                  </CardContent>
                </Card>
              )}

              {items.map((item) => (
                <Card key={item.product.id} className="animate-fade-in">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4">
                      <Link to={`/product/${item.product.id}`} className="shrink-0">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center text-4xl">
                          {item.product.image}
                        </div>
                      </Link>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <Link to={`/product/${item.product.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">
                                {item.product.name}
                              </Link>
                              {item.product.prescription && (
                                <Badge variant="prescription" className="text-xs">Ordonnance</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{item.product.shortDescription}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatGNF(item.product.price)} / unité</p>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive shrink-0" onClick={() => removeItem(item.product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock}>
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-lg font-bold text-foreground whitespace-nowrap">
                            {formatGNF(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-32">
                <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Sous-total ({itemCount} articles)</span><span>{formatGNF(subtotal)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span><span>{shipping === 0 ? "Gratuite" : formatGNF(shipping)}</span></div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">Livraison offerte dès {formatGNF(200000)}</p>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">{formatGNF(total)}</span>
                  </div>
                  <Link to="/checkout" className="block">
                    <Button variant="hero" className="w-full gap-2" size="lg">
                      Passer commande
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <div className="space-y-2 pt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /><span>Livraison 2-24h à Conakry</span></div>
                    <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /><span>Paiement sécurisé (Mobile Money)</span></div>
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
