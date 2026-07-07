import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchCatalog, formatGNF, type CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalog({ limit: 6 }).then((p) => { setProducts(p); setLoading(false); });
  }, []);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="animate-fade-in">
            <Badge variant="prescription" className="mb-3">Sélection du moment</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
              Produits proposés par nos pharmacies
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Chaque produit provient d'une pharmacie agréée en Guinée. Posologie, composition et conseil inclus.
            </p>
          </div>
          <Link to="/products"><Button variant="outline">Voir tout le catalogue</Button></Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0,1,2,3,4,5].map(i => <Card key={i} className="h-72 animate-pulse bg-muted/40" />)}
          </div>
        ) : products.length === 0 ? (
          <Card><CardContent className="p-10 text-center text-muted-foreground">
            Aucun produit publié pour le moment. <Link to="/auth" className="text-primary underline">Enregistrez votre pharmacie</Link> pour en ajouter.
          </CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={product.id} variant="product" className="animate-fade-in group overflow-hidden" style={{ animationDelay: `${index * 0.08}s` }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform overflow-hidden">
                      {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : product.image}
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Heart className="w-5 h-5" /></Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.category && <Badge variant="secondary" className="text-xs">{product.category}</Badge>}
                      {product.prescription && <Badge variant="prescription" className="text-xs">Ordonnance</Badge>}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">{product.shortDescription}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Store className="w-3 h-3" /> {product.pharmacy_name} · {product.pharmacy_city}</p>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 flex items-center justify-between gap-2">
                  <span className="text-lg font-bold">{formatGNF(product.price)}</span>
                  <div className="flex gap-2">
                    <Link to={`/product/${product.id}`}><Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button></Link>
                    <Button variant="default" size="sm" disabled={product.prescription || product.stock <= 0} onClick={() => { addItem(product, 1); toast.success(`${product.name} ajouté au panier`); }}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
