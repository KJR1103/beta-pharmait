import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ShoppingCart, Star, SlidersHorizontal, Eye } from "lucide-react";
import { products, formatGNF, categories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(params.get("cat") || "Tous");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "name">("popular");
  const { addItem } = useCart();

  useEffect(() => {
    setSearchTerm(params.get("q") || "");
    setSelectedCategory(params.get("cat") || "Tous");
  }, [params]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Tous" || p.category === selectedCategory;
      const matchesPrescription = !showPrescriptionOnly || p.prescription;
      return matchesSearch && matchesCategory && matchesPrescription;
    });

    switch (sortBy) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "name": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [searchTerm, selectedCategory, showPrescriptionOnly, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-display">
            Catalogue produits
          </h1>
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> produits disponibles avec posologie et conseil pharmaceutique
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filtres
                </h3>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Catégories</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedCategory === "Tous" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("Tous")}
                    >Tous</Badge>
                    {categories.map((c) => (
                      <Badge
                        key={c.id}
                        variant={selectedCategory === c.name ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(c.name)}
                      >{c.icon} {c.name}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Trier par</p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                  >
                    <option value="popular">Plus populaires</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="name">Ordre alphabétique</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="prescription"
                    checked={showPrescriptionOnly}
                    onCheckedChange={(v) => setShowPrescriptionOnly(v as boolean)}
                  />
                  <label htmlFor="prescription" className="text-sm cursor-pointer">
                    Sur ordonnance uniquement
                  </label>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Aucun produit trouvé</p>
                  <p className="text-muted-foreground">Essayez de modifier vos filtres</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <Card
                    key={product.id}
                    variant="product"
                    className="group animate-fade-in overflow-hidden"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <CardContent className="p-5 flex flex-col h-full">
                      <Link to={`/product/${product.id}`}>
                        <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-secondary via-primary/5 to-accent/10 flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300">
                          {product.image}
                        </div>
                      </Link>
                      <div className="flex items-center gap-1 flex-wrap mb-2">
                        <Badge variant="secondary" className="text-[10px]">{product.category}</Badge>
                        {product.prescription && <Badge variant="prescription" className="text-[10px]">Ordonnance</Badge>}
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{product.shortDescription}</p>
                      <div className="flex items-center gap-1 text-xs mb-3">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">{formatGNF(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">{formatGNF(product.originalPrice)}</span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Link to={`/product/${product.id}`}>
                            <Button variant="outline" size="icon" className="h-9 w-9"><Eye className="w-4 h-4" /></Button>
                          </Link>
                          <Button
                            variant="default"
                            size="icon"
                            className="h-9 w-9"
                            disabled={product.prescription}
                            onClick={() => { addItem(product, 1); toast.success(`${product.name} ajouté au panier`); }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
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
