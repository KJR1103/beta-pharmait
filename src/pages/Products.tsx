import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart, 
  Star,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";
import { Link } from "react-router-dom";

const allProducts = [
  { id: 1, name: "Doliprane 1000mg", description: "Comprimés - Boîte de 8", price: 3.99, originalPrice: 4.99, rating: 4.8, reviews: 245, prescription: false, category: "Douleur & Fièvre", image: "💊" },
  { id: 2, name: "Vitamine D3", description: "1000 UI - 90 gélules", price: 12.90, rating: 4.9, reviews: 189, prescription: false, category: "Vitamines", image: "🌟" },
  { id: 3, name: "Amoxicilline 500mg", description: "Gélules - Boîte de 12", price: 8.50, rating: 4.7, reviews: 156, prescription: true, category: "Antibiotiques", image: "💉" },
  { id: 4, name: "Crème Cicatrisante", description: "Tube 50ml", price: 6.99, rating: 4.6, reviews: 98, prescription: false, category: "Soins", image: "🧴" },
  { id: 5, name: "Sérum Physiologique", description: "Pack 40 doses", price: 4.50, rating: 4.8, reviews: 312, prescription: false, category: "Bébé", image: "💧" },
  { id: 6, name: "Probiotiques Ultra", description: "30 gélules gastro-résistantes", price: 19.90, originalPrice: 24.90, rating: 4.7, reviews: 167, prescription: false, category: "Digestion", image: "🦠" },
  { id: 7, name: "Ibuprofène 400mg", description: "Comprimés - Boîte de 20", price: 5.49, rating: 4.6, reviews: 203, prescription: false, category: "Douleur & Fièvre", image: "💊" },
  { id: 8, name: "Magnésium Marin", description: "60 comprimés", price: 14.90, rating: 4.8, reviews: 142, prescription: false, category: "Vitamines", image: "🧪" },
  { id: 9, name: "Spray Nasal", description: "Flacon 15ml", price: 7.99, rating: 4.5, reviews: 89, prescription: false, category: "ORL", image: "👃" },
];

const categories = ["Tous", "Douleur & Fièvre", "Vitamines", "Antibiotiques", "Soins", "Bébé", "Digestion", "ORL"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
    const matchesPrescription = !showPrescriptionOnly || product.prescription;
    return matchesSearch && matchesCategory && matchesPrescription;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-display">
            Nos produits
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produits disponibles
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <aside className="lg:col-span-1">
            <Card variant="default" className="sticky top-32">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtres
                  </h3>
                  
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Catégories</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Badge 
                          key={cat}
                          variant={selectedCategory === cat ? "default" : "outline"}
                          className="cursor-pointer transition-colors"
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Prescription filter */}
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="prescription"
                    checked={showPrescriptionOnly}
                    onCheckedChange={(checked) => setShowPrescriptionOnly(checked as boolean)}
                  />
                  <label htmlFor="prescription" className="text-sm text-foreground cursor-pointer">
                    Sur ordonnance uniquement
                  </label>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products grid */}
          <div className="lg:col-span-3">
            {/* View toggle */}
            <div className="flex justify-end gap-2 mb-4">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <Card key={product.id} variant="product">
                  <CardContent className={viewMode === "grid" ? "p-6" : "p-4 flex gap-4"}>
                    <div className={viewMode === "grid" 
                      ? "flex justify-between items-start mb-4" 
                      : "w-20 h-20 shrink-0"
                    }>
                      <div className={`${viewMode === "grid" ? "w-16 h-16" : "w-full h-full"} rounded-2xl bg-secondary flex items-center justify-center text-3xl`}>
                        {product.image}
                      </div>
                      {viewMode === "grid" && (
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          <Heart className="w-5 h-5" />
                        </Button>
                      )}
                    </div>

                    <div className={viewMode === "list" ? "flex-grow" : ""}>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                        {product.prescription && (
                          <Badge variant="prescription" className="text-xs">Ordonnance</Badge>
                        )}
                      </div>

                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>

                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between">
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
                          {viewMode === "grid" ? "" : "Ajouter"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card className="text-center py-16">
                <CardContent>
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Aucun produit trouvé</p>
                  <p className="text-muted-foreground">Essayez de modifier vos filtres</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
