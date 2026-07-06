import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatGNF } from "@/data/products";
import { Receipt, Package, MapPin } from "lucide-react";

const statusLabel: Record<string, string> = {
  pending: "En attente", confirmed: "Confirmée", preparing: "En préparation",
  ready: "Prête", in_delivery: "En livraison", delivered: "Livrée", cancelled: "Annulée",
};

const DashboardCustomer = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: prof }, { data: ords }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("orders").select("*, pharmacies(name, city)").eq("customer_id", user.id).order("created_at", { ascending: false }),
      ]);
      setProfile(prof);
      setOrders(ords ?? []);
    })();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      <main className="flex-1 container py-6 md:py-10 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Bonjour {profile?.full_name || "cher client"} 👋</h1>
          <p className="text-muted-foreground text-sm">Vos commandes, factures et suivis en un coup d'œil.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="feature"><CardContent className="p-5"><div className="flex items-center gap-3"><Package className="w-8 h-8 text-primary" /><div><div className="text-2xl font-bold">{orders.length}</div><div className="text-xs text-muted-foreground">Commandes</div></div></div></CardContent></Card>
          <Card variant="feature"><CardContent className="p-5"><div className="flex items-center gap-3"><Receipt className="w-8 h-8 text-primary" /><div><div className="text-2xl font-bold">{orders.filter((o) => o.paid).length}</div><div className="text-xs text-muted-foreground">Factures</div></div></div></CardContent></Card>
          <Card variant="feature"><CardContent className="p-5"><div className="flex items-center gap-3"><MapPin className="w-8 h-8 text-primary" /><div><div className="text-lg font-bold">{profile?.city || "-"}</div><div className="text-xs text-muted-foreground">Ma ville</div></div></div></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Historique des commandes</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>N°</TableHead><TableHead>Pharmacie</TableHead>
                <TableHead>Date</TableHead><TableHead>Total</TableHead>
                <TableHead>Statut</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {orders.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Aucune commande — <Link to="/products" className="text-primary underline">explorer le catalogue</Link></TableCell></TableRow>}
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                    <TableCell>{o.pharmacies?.name}</TableCell>
                    <TableCell>{new Date(o.created_at).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{formatGNF(Number(o.total))}</TableCell>
                    <TableCell><Badge variant={o.status === "delivered" ? "default" : "secondary"}>{statusLabel[o.status]}</Badge></TableCell>
                    <TableCell className="text-right">
                      {o.paid && <Button size="sm" variant="outline" asChild><Link to={`/invoice/${o.id}`}>Facture</Link></Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardCustomer;
