import { useEffect, useState } from "react";
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
import { formatGNF } from "@/lib/catalog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, Check, Smartphone, Banknote, MapPin, User, Phone, Loader2 } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [payment, setPayment] = useState("orange");
  const [city, setCity] = useState("Conakry");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/checkout");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("phone, city").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data?.phone) setPhone(data.phone);
      if (data?.city) setCity(data.city);
    });
  }, [user]);

  const shipping = city === "Conakry" ? 15000 : 35000;
  const total = subtotal + shipping;

  // Group items by pharmacy
  const groups = items.reduce<Record<string, typeof items>>((acc, it) => {
    (acc[it.product.pharmacy_id] ||= []).push(it);
    return acc;
  }, {});
  const pharmacyIds = Object.keys(groups);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <Link to="/products"><Button variant="hero">Explorer les produits</Button></Link>
        </main><Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!address || !phone || !neighborhood) return toast.error("Complétez l'adresse et le téléphone");
    setSaving(true);

    const paymentLabel = payment === "orange" ? "Orange Money" : payment === "momo" ? "MTN MoMo" : "Cash à la livraison";
    const createdOrders: string[] = [];

    try {
      for (const pid of pharmacyIds) {
        const its = groups[pid];
        const sub = its.reduce((s, i) => s + i.product.price * i.quantity, 0);
        const ship = pharmacyIds.length === 1 ? shipping : Math.round(shipping / pharmacyIds.length);
        const tot = sub + ship;

        const { data: order, error: e1 } = await supabase.from("orders").insert({
          customer_id: user.id,
          pharmacy_id: pid,
          subtotal: sub,
          delivery_fee: ship,
          total: tot,
          delivery_address: `${address}${neighborhood ? " — " + neighborhood : ""}`,
          city,
          phone,
          payment_method: paymentLabel,
          notes: notes || null,
          status: "pending",
        }).select().single();

        if (e1 || !order) throw e1 || new Error("order failed");

        const itemsPayload = its.map((it) => ({
          order_id: order.id,
          product_id: it.product.id,
          product_name: it.product.name,
          unit_price: it.product.price,
          quantity: it.quantity,
          subtotal: it.product.price * it.quantity,
        }));
        const { error: e2 } = await supabase.from("order_items").insert(itemsPayload);
        if (e2) throw e2;

        createdOrders.push(order.id);
      }

      toast.success(`Commande créée !`, {
        description: `${createdOrders.length} pharmacie(s) notifiée(s). Vous serez contacté pour la livraison.`,
      });
      clearCart();
      setTimeout(() => navigate("/dashboard/customer"), 1200);
    } catch (err: any) {
      toast.error(err?.message || "Erreur lors de la commande");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <Button variant="ghost" size="sm" className="mb-4 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" /> Retour au panier
        </Button>
        <h1 className="text-3xl font-bold mb-8 font-display">Validation de la commande</h1>

        {pharmacyIds.length > 1 && (
          <div className="mb-6 p-4 rounded-lg bg-info/10 border border-info/20 text-sm">
            Votre panier contient des produits de <strong>{pharmacyIds.length} pharmacies</strong> — une commande distincte sera créée pour chacune.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card variant="elevated">
              <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Contact</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+224 6XX XX XX XX" className="pl-10" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Adresse de livraison</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ville *</Label>
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-11 px-3 rounded-lg border border-input bg-background">
                      <option>Conakry</option><option>Kindia</option><option>Boké</option><option>Kankan</option>
                      <option>Labé</option><option>N'Zérékoré</option><option>Faranah</option><option>Mamou</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Quartier / Commune *</Label>
                    <Input required value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Ratoma, Kaloum..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Adresse détaillée *</Label>
                  <Textarea required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Repères, immeuble, rue..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Notes (optionnel)</Label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Instructions pour le livreur..." rows={2} />
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader><CardTitle>Mode de paiement</CardTitle></CardHeader>
              <CardContent>
                <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="orange" id="orange" />
                    <Smartphone className="w-5 h-5 text-accent" />
                    <div className="flex-1"><p className="font-medium">Orange Money</p><p className="text-xs text-muted-foreground">Paiement mobile sécurisé</p></div>
                    <Badge variant="secondary">Populaire</Badge>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="momo" id="momo" />
                    <Smartphone className="w-5 h-5 text-warning" />
                    <div className="flex-1"><p className="font-medium">MTN Mobile Money</p><p className="text-xs text-muted-foreground">MTN MoMo</p></div>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="cash" id="cash" />
                    <Banknote className="w-5 h-5 text-success" />
                    <div className="flex-1"><p className="font-medium">Paiement à la livraison</p><p className="text-xs text-muted-foreground">Espèces au livreur</p></div>
                  </label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card variant="elevated" className="sticky top-32">
              <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                        {item.product.image_url ? <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" /> : item.product.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.product.pharmacy_name} · Qté : {item.quantity}</p>
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
                <Button type="submit" variant="hero" size="lg" className="w-full gap-2" disabled={saving}>
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...</> : <><Check className="w-5 h-5" /> Confirmer la commande</>}
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
