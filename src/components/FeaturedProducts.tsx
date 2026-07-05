import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { products, formatGNF } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const featured = products.slice(0, 6);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="animate-fade-in">
            <Badge variant="prescription" className="mb-3">Sélection du moment</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
              Produits populaires en Guinée
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Médicaments et produits de santé les plus demandés, avec posologie et conseil pharmaceutique inclus.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">Voir tout le catalogue</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, index) => (
            <Card
              key={product.id}
              variant="product"
              className="animate-fade-in group overflow-hidden"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                    {product.prescription && (
                      <Badge variant="prescription" className="text-xs">Ordonnance</Badge>
                    )}
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-1">{product.shortDescription}</p>
                  <p className="text-xs text-muted-foreground">Lab. {product.laboratory}</p>

                  <div className="flex items-center gap-2 pt-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-foreground">{formatGNF(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatGNF(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link to={`/product/${product.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2"
                    disabled={product.prescription}
                    onClick={() => {
                      addItem(product, 1);
                      toast.success(`${product.name} ajouté au panier`);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
