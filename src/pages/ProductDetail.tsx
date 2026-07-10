import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById, fetchCatalog, formatGNF, type CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Shield, Truck, Check, Minus, Plus, ChevronRight, AlertTriangle, Pill, FlaskConical, Package, ArrowLeft, Store, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<CatalogProduct | null>(null);
  const [similar, setSimilar] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { canOrder } = useAuth();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const p = await fetchProductById(id);
      setProduct(p);
      if (p) {
        const all = await fetchCatalog({ limit: 20 });
        setSimilar(all.filter((x) => x.id !== p.id && (x.category === p.category || x.pharmacy_id === p.pharmacy_id)).slice(0, 4));
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background"><Navbar />
      <main className="flex-1 flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></main>
      <Footer />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-background"><Navbar />
      <main className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit introuvable</h1>
        <Link to="/products"><Button variant="hero">Retour au catalogue</Button></Link>
      </main><Footer />
    </div>
  );

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty} × ${product.name} ajouté au panier`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6 md:py-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-primary">Produits</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <Button variant="ghost" size="sm" className="mb-4 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" /> Retour
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card variant="elevated" className="animate-fade-in overflow-hidden">
            <CardContent className="p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-secondary/50 via-primary/5 to-accent/10 min-h-[300px] md:min-h-[420px]">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="max-h-96 object-contain" />
              ) : (
                <div className="text-[10rem] md:text-[14rem] leading-none">{product.image}</div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 flex-wrap">
              {product.category && <Badge variant="secondary">{product.category}</Badge>}
              {product.prescription ? <Badge variant="prescription">Sur ordonnance</Badge> : <Badge variant="success">Sans ordonnance</Badge>}
              {product.stock > 0 ? <Badge variant="success" className="gap-1"><Check className="w-3 h-3" /> En stock</Badge> : <Badge variant="destructive">Rupture</Badge>}
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            <Link to={`/products?pharmacy=${product.pharmacy_id}`} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <Store className="w-4 h-4" /> {product.pharmacy_name} — {product.pharmacy_city}
            </Link>

            {product.description && <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{product.description}</p>}

            <Card variant="feature">
              <CardContent className="p-5">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-primary">{formatGNF(product.price)}</span>
                </div>

                {product.prescription && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 mb-4">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm">Ce médicament nécessite une ordonnance valide. Téléversez-la avant la commande.</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 border rounded-lg">
                    <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="w-4 h-4" /></Button>
                    <span className="w-10 text-center font-semibold">{qty}</span>
                    <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.min(product.stock || 99, qty + 1))}><Plus className="w-4 h-4" /></Button>
                  </div>

                  {product.prescription ? (
                    <Link to="/prescriptions" className="flex-1">
                      <Button variant="hero" size="lg" className="w-full gap-2">Envoyer une ordonnance</Button>
                    </Link>
                  ) : (
                    <Button variant="hero" size="lg" className="flex-1 gap-2" onClick={handleAdd} disabled={product.stock <= 0}>
                      <ShoppingCart className="w-5 h-5" /> Ajouter au panier
                    </Button>
                  )}
                  <Button variant="outline" size="icon" className="h-11 w-11"><Heart className="w-5 h-5" /></Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Truck className="w-4 h-4 text-primary" /> Livraison 2-24h Conakry</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Shield className="w-4 h-4 text-primary" /> Médicament authentique</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Check className="w-4 h-4 text-primary" /> Conseil pharmacien</div>
            </div>
          </div>
        </div>

        <Card variant="elevated" className="mb-12 animate-fade-in">
          <CardContent className="p-6 md:p-8">
            <Tabs defaultValue="posology">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
                <TabsTrigger value="posology">Posologie</TabsTrigger>
                <TabsTrigger value="composition">Composition</TabsTrigger>
                <TabsTrigger value="warnings">Précautions</TabsTrigger>
                <TabsTrigger value="storage">Conservation</TabsTrigger>
              </TabsList>

              <TabsContent value="posology" className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Pill className="w-5 h-5 text-primary" /> Posologie & indications</h3>
                <div className="p-4 rounded-lg bg-secondary/50 whitespace-pre-line">{product.posology || "Se référer à l'avis du pharmacien."}</div>
                {product.indications && <div className="pt-2"><h4 className="font-semibold mb-2">Indications thérapeutiques</h4>
                  <p className="whitespace-pre-line text-sm">{product.indications}</p></div>}
              </TabsContent>

              <TabsContent value="composition" className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><FlaskConical className="w-5 h-5 text-primary" /> Composition</h3>
                <div className="p-4 rounded-lg bg-secondary/50 whitespace-pre-line">{product.composition || "-"}</div>
              </TabsContent>

              <TabsContent value="warnings" className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><AlertTriangle className="w-5 h-5 text-destructive" /> Contre-indications</h3>
                <p className="whitespace-pre-line text-sm">{product.contraindications || "-"}</p>
                <Separator />
                <div className="p-4 rounded-lg bg-info/10 border border-info/20 text-sm">
                  En cas de doute, contactez notre pharmacien via <Link to="/advice" className="text-primary underline">Conseils</Link>.
                </div>
              </TabsContent>

              <TabsContent value="storage" className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Conservation</h3>
                <div className="p-4 rounded-lg bg-secondary/50 whitespace-pre-line">{product.storage || "Conserver à l'abri de la chaleur et de l'humidité, hors de portée des enfants."}</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {similar.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 font-display">Produits similaires</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((p) => (
                <Link to={`/product/${p.id}`} key={p.id}>
                  <Card variant="product">
                    <CardContent className="p-4">
                      <div className="w-full aspect-square rounded-xl bg-secondary flex items-center justify-center text-5xl mb-3 overflow-hidden">
                        {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : p.image}
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{p.pharmacy_name}</p>
                      <p className="text-primary font-bold text-sm">{formatGNF(p.price)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
