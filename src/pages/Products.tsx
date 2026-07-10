import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ShoppingCart, SlidersHorizontal, Eye, Store, Loader2 } from "lucide-react";
import { fetchCatalog, fetchPharmacies, formatGNF, type CatalogProduct, type PublicPharmacy } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(params.get("cat") || "Tous");
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>(params.get("pharmacy") || "Toutes");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "price-asc" | "price-desc" | "name">("recent");
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [pharmacies, setPharmacies] = useState<PublicPharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { canOrder } = useAuth();

  useEffect(() => {
    Promise.all([fetchCatalog(), fetchPharmacies()]).then(([p, ph]) => {
      setProducts(p); setPharmacies(ph); setLoading(false);
    });
  }, []);

  useEffect(() => {
    setSearchTerm(params.get("q") || "");
    setSelectedCategory(params.get("cat") || "Tous");
    setSelectedPharmacy(params.get("pharmacy") || "Toutes");
  }, [params]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean) as string[]);
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.pharmacy_name ?? "").toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "Tous" || p.category === selectedCategory;
      const matchesPharmacy = selectedPharmacy === "Toutes" || p.pharmacy_id === selectedPharmacy;
      const matchesPrescription = !showPrescriptionOnly || p.prescription;
      return matchesSearch && matchesCategory && matchesPharmacy && matchesPrescription;
    });
    switch (sortBy) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "name": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [products, searchTerm, selectedCategory, selectedPharmacy, showPrescriptionOnly, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-display">Catalogue produits</h1>
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> produits disponibles auprès de <span className="font-semibold text-foreground">{pharmacies.length}</span> pharmacies agréées
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-semibold flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Filtres</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Nom, description, pharmacie..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Pharmacie</p>
                  <select value={selectedPharmacy} onChange={(e) => setSelectedPharmacy(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm">
                    <option value="Toutes">Toutes les pharmacies</option>
                    {pharmacies.map((ph) => <option key={ph.id} value={ph.id}>{ph.name} — {ph.city}</option>)}
                  </select>
                </div>

                {categories.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Catégories</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={selectedCategory === "Tous" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory("Tous")}>Tous</Badge>
                      {categories.map((c) => (
                        <Badge key={c} variant={selectedCategory === c ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory(c)}>{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Trier par</p>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm">
                    <option value="recent">Plus récents</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="name">Nom (A-Z)</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={showPrescriptionOnly} onCheckedChange={(v) => setShowPrescriptionOnly(!!v)} />
                  Sur ordonnance uniquement
                </label>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : filtered.length === 0 ? (
              <Card><CardContent className="p-10 text-center text-muted-foreground">Aucun produit ne correspond à vos filtres.</CardContent></Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <Card key={p.id} variant="product" className="overflow-hidden group animate-fade-in">
                    <CardContent className="p-4">
                      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center text-6xl mb-3 overflow-hidden">
                        {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : p.image}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {p.category && <Badge variant="secondary" className="text-xs">{p.category}</Badge>}
                          {p.prescription && <Badge variant="prescription" className="text-xs">Ordonnance</Badge>}
                        </div>
                        <Link to={`/product/${p.id}`}><h3 className="font-semibold line-clamp-1 hover:text-primary">{p.name}</h3></Link>
                        <p className="text-xs text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Store className="w-3 h-3" /> {p.pharmacy_name}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-bold text-primary">{formatGNF(p.price)}</span>
                          <div className="flex gap-1">
                            <Link to={`/product/${p.id}`}><Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button></Link>
                            <Button size="sm" disabled={!canOrder || p.prescription || p.stock <= 0} onClick={() => { if (!canOrder) { toast.error("Seuls les comptes clients peuvent commander"); return; } addItem(p, 1); toast.success(`${p.name} ajouté`); }}>
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
