import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { formatGNF } from "@/lib/catalog";
import { Link } from "react-router-dom";
import { BadgeCheck, ShieldAlert, Package, Plus, Store, Upload, Trash2, Edit, ClipboardList, Receipt, TrendingUp } from "lucide-react";

type Pharmacy = {
  id: string;
  name: string;
  agrement_number: string;
  agrement_doc_url: string | null;
  city: string;
  address: string;
  phone: string;
  email: string | null;
  description: string | null;
  opening_hours: string | null;
  verified: boolean;
};

type Product = {
  id: string;
  pharmacy_id: string;
  name: string;
  category: string | null;
  price: number;
  stock: number;
  description: string | null;
  composition: string | null;
  posology: string | null;
  indications: string | null;
  contraindications: string | null;
  storage: string | null;
  image_url: string | null;
  requires_prescription: boolean;
  active: boolean;
};

type Order = {
  id: string;
  order_number: string;
  status: string;
  total: number;
  paid: boolean;
  city: string;
  phone: string;
  delivery_address: string;
  payment_method: string;
  created_at: string;
};

const emptyProduct: Partial<Product> = {
  name: "", category: "", price: 0, stock: 0, description: "",
  composition: "", posology: "", indications: "", contraindications: "",
  storage: "", requires_prescription: false, active: true,
};

const DashboardPharmacy = () => {
  const { user } = useAuth();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profileName, setProfileName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // form
  const [form, setForm] = useState({ name: "", agrement_number: "", city: "", address: "", phone: "", email: "", description: "", opening_hours: "" });
  const [agrementFile, setAgrementFile] = useState<File | null>(null);

  // product dialog
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data: pharm } = await supabase
      .from("pharmacies").select("*").eq("owner_id", user.id).maybeSingle();
    setPharmacy(pharm as any);
    if (pharm) {
      const [{ data: prods }, { data: ords }] = await Promise.all([
        supabase.from("products").select("*").eq("pharmacy_id", pharm.id).order("created_at", { ascending: false }),
        supabase.from("orders").select("*").eq("pharmacy_id", pharm.id).order("created_at", { ascending: false }),
      ]);
      setProducts((prods as any) ?? []);
      setOrders((ords as any) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]);

  const savePharmacy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    let doc_url = pharmacy?.agrement_doc_url ?? null;
    if (agrementFile) {
      const path = `${user.id}/${Date.now()}-${agrementFile.name}`;
      const { error: upErr } = await supabase.storage.from("agrements").upload(path, agrementFile);
      if (upErr) { toast.error("Upload agrément: " + upErr.message); setSaving(false); return; }
      doc_url = path;
    }
    const payload = { ...form, owner_id: user.id, agrement_doc_url: doc_url };
    const { error } = pharmacy
      ? await supabase.from("pharmacies").update(payload).eq("id", pharmacy.id)
      : await supabase.from("pharmacies").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(pharmacy ? "Pharmacie mise à jour" : "Pharmacie enregistrée — en attente de vérification");
    setAgrementFile(null);
    load();
  };

  useEffect(() => {
    if (pharmacy) setForm({
      name: pharmacy.name, agrement_number: pharmacy.agrement_number,
      city: pharmacy.city, address: pharmacy.address, phone: pharmacy.phone,
      email: pharmacy.email ?? "", description: pharmacy.description ?? "",
      opening_hours: pharmacy.opening_hours ?? "",
    });
  }, [pharmacy]);

  const saveProduct = async () => {
    if (!editing || !pharmacy || !user) return;
    setSaving(true);
    let image_url = editing.image_url ?? null;
    if (imgFile) {
      const path = `${user.id}/${Date.now()}-${imgFile.name}`;
      const { error: upErr } = await supabase.storage.from("product-images").upload(path, imgFile);
      if (upErr) { toast.error(upErr.message); setSaving(false); return; }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      image_url = data.publicUrl;
    }
    const payload: any = { ...editing, image_url, pharmacy_id: pharmacy.id };
    delete payload.id;
    const { error } = editing.id
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Produit enregistré");
    setEditing(null); setImgFile(null);
    load();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Supprimé");
    load();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status: status as any }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Statut mis à jour");
    load();
  };

  const markPaid = async (id: string) => {
    const { error } = await supabase.from("orders").update({ paid: true }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Paiement confirmé — facture générée");
    load();
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      <main className="flex-1 container py-6 md:py-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Espace Pharmacie</h1>
            <p className="text-muted-foreground text-sm">Gérez votre officine, catalogue et commandes.</p>
          </div>
          {pharmacy && (
            <Badge variant={pharmacy.verified ? "default" : "secondary"} className="gap-1">
              {pharmacy.verified ? <><BadgeCheck className="w-4 h-4" /> Vérifiée</> : <><ShieldAlert className="w-4 h-4" /> En attente</>}
            </Badge>
          )}
        </div>

        <Tabs defaultValue={pharmacy ? "products" : "pharmacy"} className="space-y-4">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="pharmacy" className="gap-2"><Store className="w-4 h-4" /> Ma pharmacie</TabsTrigger>
            <TabsTrigger value="products" disabled={!pharmacy} className="gap-2"><Package className="w-4 h-4" /> Produits ({products.length})</TabsTrigger>
            <TabsTrigger value="orders" disabled={!pharmacy} className="gap-2"><ClipboardList className="w-4 h-4" /> Commandes ({orders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pharmacy">
            <Card>
              <CardHeader><CardTitle>Informations & agrément</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={savePharmacy} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Nom de la pharmacie</Label>
                      <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Numéro d'agrément (Ministère de la Santé)</Label>
                      <Input required value={form.agrement_number} onChange={(e) => setForm({ ...form, agrement_number: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Ville</Label>
                      <Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Téléphone</Label>
                      <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                    <div className="space-y-2 sm:col-span-2"><Label>Adresse complète</Label>
                      <Input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Email de contact</Label>
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Horaires d'ouverture</Label>
                      <Input value={form.opening_hours} onChange={(e) => setForm({ ...form, opening_hours: e.target.value })} placeholder="Lun-Sam 8h-20h" /></div>
                    <div className="space-y-2 sm:col-span-2"><Label>Description</Label>
                      <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Document d'agrément (PDF ou image) — obligatoire pour la vérification</Label>
                    <div className="flex items-center gap-3">
                      <Input type="file" accept="image/*,.pdf" onChange={(e) => setAgrementFile(e.target.files?.[0] ?? null)} />
                      {pharmacy?.agrement_doc_url && <Badge variant="secondary" className="gap-1"><Upload className="w-3 h-3" /> déjà fourni</Badge>}
                    </div>
                  </div>
                  <Button type="submit" variant="hero" disabled={saving}>{saving ? "Enregistrement..." : pharmacy ? "Mettre à jour" : "Enregistrer ma pharmacie"}</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <div className="flex justify-end mb-4">
              <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
                <DialogTrigger asChild>
                  <Button variant="hero" onClick={() => setEditing({ ...emptyProduct })}><Plus className="w-4 h-4" /> Nouveau produit</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>{editing?.id ? "Modifier" : "Nouveau"} produit</DialogTitle></DialogHeader>
                  {editing && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div><Label>Nom</Label><Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
                        <div><Label>Catégorie</Label><Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Antalgique, Vitamine..." /></div>
                        <div><Label>Prix (GNF)</Label><Input type="number" value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} /></div>
                        <div><Label>Stock</Label><Input type="number" value={editing.stock ?? 0} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} /></div>
                      </div>
                      <div><Label>Description</Label><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
                      <div><Label>Composition</Label><Textarea value={editing.composition ?? ""} onChange={(e) => setEditing({ ...editing, composition: e.target.value })} /></div>
                      <div><Label>Posologie</Label><Textarea value={editing.posology ?? ""} onChange={(e) => setEditing({ ...editing, posology: e.target.value })} placeholder="Adulte: 1 cp/8h — Enfant: ..." /></div>
                      <div><Label>Indications</Label><Textarea value={editing.indications ?? ""} onChange={(e) => setEditing({ ...editing, indications: e.target.value })} /></div>
                      <div><Label>Contre-indications</Label><Textarea value={editing.contraindications ?? ""} onChange={(e) => setEditing({ ...editing, contraindications: e.target.value })} /></div>
                      <div><Label>Conservation</Label><Input value={editing.storage ?? ""} onChange={(e) => setEditing({ ...editing, storage: e.target.value })} /></div>
                      <div><Label>Image</Label><Input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files?.[0] ?? null)} /></div>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox checked={!!editing.requires_prescription} onCheckedChange={(v) => setEditing({ ...editing, requires_prescription: !!v })} />
                        Nécessite une ordonnance
                      </label>
                      <Button variant="hero" className="w-full" onClick={saveProduct} disabled={saving}>{saving ? "..." : "Enregistrer"}</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Ordonnance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Aucun produit encore</TableCell></TableRow>
                    )}
                    {products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.category || "-"}</TableCell>
                        <TableCell>{formatGNF(p.price)}</TableCell>
                        <TableCell><Badge variant={p.stock > 0 ? "secondary" : "destructive"}>{p.stock}</Badge></TableCell>
                        <TableCell>{p.requires_prescription ? "Oui" : "Non"}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button size="icon" variant="ghost" onClick={() => setEditing(p)}><Edit className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteProduct(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>N°</TableHead><TableHead>Client</TableHead>
                    <TableHead>Ville</TableHead><TableHead>Total</TableHead>
                    <TableHead>Paiement</TableHead><TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {orders.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Aucune commande</TableCell></TableRow>}
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                        <TableCell>{o.phone}</TableCell>
                        <TableCell>{o.city}</TableCell>
                        <TableCell>{formatGNF(Number(o.total))}</TableCell>
                        <TableCell>{o.paid ? <Badge>Payé</Badge> : <Badge variant="secondary">{o.payment_method}</Badge>}</TableCell>
                        <TableCell>
                          <Select value={o.status} onValueChange={(v) => updateOrderStatus(o.id, v)}>
                            <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {["pending","confirmed","preparing","ready","in_delivery","delivered","cancelled"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          {!o.paid && <Button size="sm" variant="outline" onClick={() => markPaid(o.id)}>Encaisser</Button>}
                          <Button size="sm" variant="ghost" asChild><a href={`/invoice/${o.id}`}>Facture</a></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPharmacy;
