import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatGNF } from "@/data/products";
import { Printer, Pill, ArrowLeft, BadgeCheck, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

const Invoice = () => {
  const { orderId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;
    (async () => {
      const { data: order } = await supabase.from("orders")
        .select("*, pharmacies(*), order_items(*), invoices(*), profiles!orders_customer_id_fkey(full_name, phone)")
        .eq("id", orderId).maybeSingle();
      setData(order);
    })();
  }, [orderId]);

  if (!data) return (
    <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1 container py-10">Chargement...</main><Footer /></div>
  );

  const invoice = data.invoices?.[0];

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20 print:bg-white">
      <div className="print:hidden"><Navbar /></div>
      <main className="flex-1 container py-6 md:py-10 max-w-3xl">
        <div className="flex items-center justify-between mb-4 print:hidden">
          <Button variant="ghost" asChild><Link to="/dashboard/customer"><ArrowLeft className="w-4 h-4" /> Retour</Link></Button>
          <Button variant="hero" onClick={() => window.print()}><Printer className="w-4 h-4" /> Imprimer / PDF</Button>
        </div>

        <Card className="print:shadow-none print:border-0">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-start justify-between border-b pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"><Pill className="w-5 h-5 text-primary-foreground" /></div>
                  <div><div className="font-bold text-lg">PharmaConnect Guinée</div><div className="text-xs text-muted-foreground">Plateforme e-pharmacie</div></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase">Facture</div>
                <div className="font-mono font-bold text-lg">{invoice?.invoice_number || "En attente"}</div>
                <div className="text-xs text-muted-foreground mt-1">Commande {data.order_number}</div>
                {data.paid ? <Badge className="mt-2 gap-1"><BadgeCheck className="w-3 h-3" /> Payée</Badge> : <Badge variant="secondary" className="mt-2">Non payée</Badge>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-semibold text-muted-foreground text-xs uppercase mb-2">Pharmacie</div>
                <div className="font-bold">{data.pharmacies?.name}</div>
                <div>{data.pharmacies?.address}</div>
                <div>{data.pharmacies?.city}</div>
                <div>{data.pharmacies?.phone}</div>
                <div className="text-xs text-muted-foreground mt-1">Agrément: {data.pharmacies?.agrement_number}</div>
              </div>
              <div>
                <div className="font-semibold text-muted-foreground text-xs uppercase mb-2">Client</div>
                <div className="font-bold">{data.profiles?.full_name || "Client"}</div>
                <div>{data.delivery_address}</div>
                <div>{data.city}</div>
                <div>{data.phone}</div>
              </div>
            </div>

            <div>
              <table className="w-full text-sm">
                <thead className="border-b"><tr>
                  <th className="text-left py-2">Produit</th>
                  <th className="text-right py-2">Qté</th>
                  <th className="text-right py-2">P.U.</th>
                  <th className="text-right py-2">Total</th>
                </tr></thead>
                <tbody>
                  {(data.order_items ?? []).map((it: any) => (
                    <tr key={it.id} className="border-b">
                      <td className="py-2">{it.product_name}</td>
                      <td className="text-right">{it.quantity}</td>
                      <td className="text-right">{formatGNF(Number(it.unit_price))}</td>
                      <td className="text-right font-medium">{formatGNF(Number(it.subtotal))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ml-auto w-full sm:w-64 space-y-2 text-sm">
              <div className="flex justify-between"><span>Sous-total</span><span>{formatGNF(Number(data.subtotal))}</span></div>
              <div className="flex justify-between"><span>Livraison</span><span>{formatGNF(Number(data.delivery_fee))}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span>{formatGNF(Number(data.total))}</span></div>
              <div className="text-xs text-muted-foreground pt-1">Paiement: {data.payment_method}</div>
            </div>

            <div className="text-xs text-muted-foreground text-center pt-6 border-t">
              Merci pour votre confiance. PharmaConnect — Conakry, Guinée.
            </div>
          </CardContent>
        </Card>
      </main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
};

export default Invoice;
