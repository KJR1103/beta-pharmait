import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatGNF } from "@/lib/catalog";
import { supabase } from "@/integrations/supabase/client";
import { Package, Truck, Check, Search, Phone, Store, Receipt } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Commande reçue" },
  { key: "confirmed", label: "Confirmée par la pharmacie" },
  { key: "preparing", label: "En préparation" },
  { key: "ready", label: "Prête pour livraison" },
  { key: "in_delivery", label: "En livraison" },
  { key: "delivered", label: "Livrée" },
];

const Tracking = () => {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("order") || "");
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (num: string) => {
    if (!num) return;
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*, pharmacies(name, city, address, phone), order_items(*)")
      .eq("order_number", num.trim())
      .maybeSingle();
    setOrder(data);
    setItems((data as any)?.order_items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (params.get("order")) search(params.get("order")!);
  }, []);

  const stepIndex = order ? STEPS.findIndex((s) => s.key === order.status) : -1;
  const subtotal = Number(order?.subtotal || 0);
  const shipping = Number(order?.delivery_fee || 0);
  const total = Number(order?.total || 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <Badge variant="info" className="mb-3">Suivi de commande</Badge>
            <h1 className="text-3xl font-bold font-display">Où en est ma commande ?</h1>
          </div>

          <Card>
            <CardContent className="p-4 flex gap-2">
              <Input placeholder="Numéro de commande (ex: PC-260707-abcdef)" value={q} onChange={(e) => setQ(e.target.value)} />
              <Button variant="hero" onClick={() => { setParams({ order: q }); search(q); }} disabled={loading}>
                <Search className="w-4 h-4" /> Suivre
              </Button>
            </CardContent>
          </Card>

          {order && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-base">{order.order_number}</span>
                    <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                      {STEPS.find((s) => s.key === order.status)?.label || order.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2"><Store className="w-4 h-4 text-primary mt-0.5" />
                      <div><p className="font-medium">{order.pharmacies?.name}</p><p className="text-muted-foreground">{order.pharmacies?.address}, {order.pharmacies?.city}</p></div>
                    </div>
                    <div className="flex items-start gap-2"><Phone className="w-4 h-4 text-primary mt-0.5" />
                      <div><p className="font-medium">Livraison</p><p className="text-muted-foreground">{order.delivery_address}, {order.city}</p></div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    {STEPS.map((s, i) => {
                      const done = i <= stepIndex && order.status !== "cancelled";
                      const current = i === stepIndex;
                      return (
                        <div key={s.key} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} ${current ? "ring-4 ring-primary/20" : ""}`}>
                            {done ? <Check className="w-4 h-4" /> : i === 4 ? <Truck className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                          </div>
                          <span className={`${current ? "font-semibold" : ""}`}>{s.label}</span>
                        </div>
                      );
                    })}
                    {order.status === "cancelled" && <Badge variant="destructive">Annulée</Badge>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Détails</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between">
                      <span>{it.product_name} × {it.quantity}</span>
                      <span className="font-medium">{formatGNF(Number(it.subtotal))}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-muted-foreground"><span>Sous-total</span><span>{formatGNF(subtotal)}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Livraison</span><span>{formatGNF(shipping)}</span></div>
                  <div className="flex justify-between font-bold text-base"><span>Total</span><span className="text-primary">{formatGNF(total)}</span></div>
                  {order.paid && (
                    <Link to={`/invoice/${order.id}`}>
                      <Button variant="outline" className="w-full gap-2 mt-2"><Receipt className="w-4 h-4" /> Voir la facture</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {q && !order && !loading && <Card><CardContent className="p-6 text-center text-muted-foreground">Aucune commande trouvée avec ce numéro.</CardContent></Card>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tracking;
