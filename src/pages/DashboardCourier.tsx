import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { formatGNF } from "@/lib/catalog";
import { Bike, CheckCircle, Receipt } from "lucide-react";

const DashboardCourier = () => {
  const { user } = useAuth();
  const [available, setAvailable] = useState<any[]>([]);
  const [mine, setMine] = useState<any[]>([]);
  const [profileName, setProfileName] = useState<string>("");

  const load = async () => {
    if (!user) return;
    const [{ data: av }, { data: mn }, { data: prof }] = await Promise.all([
      supabase.from("orders").select("*, pharmacies(name, city, address)")
        .is("courier_id", null).in("status", ["ready", "preparing"])
        .order("created_at", { ascending: false }),
      supabase.from("orders").select("*, pharmacies(name, city, address)")
        .eq("courier_id", user.id).order("created_at", { ascending: false }),
      supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    ]);
    setAvailable(av ?? []);
    setMine(mn ?? []);
    setProfileName(prof?.full_name || "");
  };
  useEffect(() => { load(); }, [user]);

  const accept = async (id: string) => {
    const { error } = await supabase.from("orders").update({ courier_id: user!.id, status: "in_delivery" as any }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Course acceptée");
    load();
  };
  const deliver = async (id: string) => {
    const { error } = await supabase.from("orders").update({ status: "delivered" as any }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Livrée !");
    load();
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      <main className="flex-1 container py-6 md:py-10 space-y-6">
        <div className="flex items-center gap-3">
          <Bike className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Espace Livreur</h1>
            <p className="text-muted-foreground text-sm">Acceptez et suivez vos courses.</p>
          </div>
        </div>

        <Tabs defaultValue="available">
          <TabsList>
            <TabsTrigger value="available">Disponibles ({available.length})</TabsTrigger>
            <TabsTrigger value="mine">Mes courses ({mine.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <Card><CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>N°</TableHead><TableHead>Pharmacie</TableHead><TableHead>Livraison</TableHead>
                  <TableHead>Ville</TableHead><TableHead>Total</TableHead><TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {available.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Aucune course disponible</TableCell></TableRow>}
                  {available.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                      <TableCell>{o.pharmacies?.name} <span className="text-muted-foreground text-xs">({o.pharmacies?.city})</span></TableCell>
                      <TableCell className="max-w-[220px] truncate">{o.delivery_address}</TableCell>
                      <TableCell>{o.city}</TableCell>
                      <TableCell>{formatGNF(Number(o.total))}</TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="hero" onClick={() => accept(o.id)}>Accepter</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="mine">
            <Card><CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>N°</TableHead><TableHead>Pharmacie</TableHead><TableHead>Livraison</TableHead>
                  <TableHead>Statut</TableHead><TableHead>Total</TableHead><TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {mine.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Pas encore de course</TableCell></TableRow>}
                  {mine.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                      <TableCell>{o.pharmacies?.name}</TableCell>
                      <TableCell className="max-w-[220px] truncate">{o.delivery_address}, {o.city}</TableCell>
                      <TableCell><Badge>{o.status}</Badge></TableCell>
                      <TableCell>{formatGNF(Number(o.total))}</TableCell>
                      <TableCell className="text-right">
                        {o.status !== "delivered" && <Button size="sm" variant="success" onClick={() => deliver(o.id)}><CheckCircle className="w-4 h-4" /> Livrée</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardCourier;
