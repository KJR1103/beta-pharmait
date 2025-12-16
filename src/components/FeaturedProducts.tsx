import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Doliprane 1000mg",
    description: "Comprimés - Boîte de 8",
    price: 3.99,
    originalPrice: 4.99,
    rating: 4.8,
    reviews: 245,
    prescription: false,
    category: "Douleur & Fièvre",
    image: "💊"
  },
  {
    id: 2,
    name: "Vitamine D3",
    description: "1000 UI - 90 gélules",
    price: 12.90,
    rating: 4.9,
    reviews: 189,
    prescription: false,
    category: "Vitamines",
    image: "🌟"
  },
  {
    id: 3,
    name: "Amoxicilline 500mg",
    description: "Gélules - Boîte de 12",
    price: 8.50,
    rating: 4.7,
    reviews: 156,
    prescription: true,
    category: "Antibiotiques",
    image: "💉"
  },
  {
    id: 4,
    name: "Crème Cicatrisante",
    description: "Tube 50ml",
    price: 6.99,
    rating: 4.6,
    reviews: 98,
    prescription: false,
    category: "Soins",
    image: "🧴"
  },
  {
    id: 5,
    name: "Sérum Physiologique",
    description: "Pack 40 doses",
    price: 4.50,
    rating: 4.8,
    reviews: 312,
    prescription: false,
    category: "Bébé",
    image: "💧"
  },
  {
    id: 6,
    name: "Probiotiques Ultra",
    description: "30 gélules gastro-résistantes",
    price: 19.90,
    originalPrice: 24.90,
    rating: 4.7,
    reviews: 167,
    prescription: false,
    category: "Digestion",
    image: "🦠"
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              Produits populaires
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Découvrez nos médicaments et produits de santé les plus demandés par nos clients.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">
              Voir tout le catalogue
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              variant="product"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl">
                    {product.image}
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    {product.prescription && (
                      <Badge variant="prescription" className="text-xs">
                        Ordonnance
                      </Badge>
                    )}
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.description}</p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-foreground">{product.price.toFixed(2)} €</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice.toFixed(2)} €
                    </span>
                  )}
                </div>
                <Button variant="default" size="sm" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
