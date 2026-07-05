import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, formatGNF, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Heart,
  Star,
  Shield,
  Truck,
  Check,
  Minus,
  Plus,
  ChevronRight,
  AlertTriangle,
  Pill,
  FlaskConical,
  Package,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Produit introuvable</h1>
          <Link to="/products">
            <Button variant="hero">Retour au catalogue</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty} × ${product.name} ajouté au panier`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6 md:py-10">
        {/* Breadcrumb */}
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
          {/* Image */}
          <Card variant="elevated" className="animate-fade-in overflow-hidden">
            <CardContent className="p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-secondary/50 via-primary/5 to-accent/10 min-h-[300px] md:min-h-[420px]">
              <div className="text-[10rem] md:text-[14rem] leading-none animate-scale-in">{product.image}</div>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="space-y-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{product.category}</Badge>
              {product.prescription ? (
                <Badge variant="prescription">Sur ordonnance</Badge>
              ) : (
                <Badge variant="success">Sans ordonnance</Badge>
              )}
              {product.stock > 0 ? (
                <Badge variant="success" className="gap-1">
                  <Check className="w-3 h-3" /> En stock
                </Badge>
              ) : (
                <Badge variant="destructive">Rupture</Badge>
              )}
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} avis)</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-muted-foreground">Lab. {product.laboratory}</span>
            </div>

            <p className="text-foreground/80 leading-relaxed">{product.description}</p>

            <Card variant="feature">
              <CardContent className="p-5">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    {formatGNF(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatGNF(product.originalPrice)}
                    </span>
                  )}
                </div>

                {product.prescription && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 text-warning-foreground mb-4">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      Ce médicament nécessite une ordonnance valide. Téléversez-la avant la commande.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 border rounded-lg">
                    <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.max(1, qty - 1))}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-10 text-center font-semibold">{qty}</span>
                    <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.min(product.stock, qty + 1))}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {product.prescription ? (
                    <Link to="/prescriptions" className="flex-1">
                      <Button variant="hero" size="lg" className="w-full gap-2">
                        Envoyer une ordonnance
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="hero" size="lg" className="flex-1 gap-2" onClick={handleAdd}>
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au panier
                    </Button>
                  )}
                  <Button variant="outline" size="icon" className="h-11 w-11">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" /> Livraison 2-24h Conakry
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" /> Médicament authentique
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-4 h-4 text-primary" /> Conseil pharmacien
              </div>
            </div>
          </div>
        </div>

        {/* Details tabs */}
        <Card variant="elevated" className="mb-12 animate-fade-in">
          <CardContent className="p-6 md:p-8">
            <Tabs defaultValue="posology">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
                <TabsTrigger value="posology">Posologie</TabsTrigger>
                <TabsTrigger value="composition">Composition</TabsTrigger>
                <TabsTrigger value="warnings">Précautions</TabsTrigger>
                <TabsTrigger value="storage">Conservation</TabsTrigger>
              </TabsList>

              <TabsContent value="posology" className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" /> Posologie & mode d'emploi
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="font-semibold text-sm text-muted-foreground mb-1">Adulte</p>
                    <p className="text-foreground">{product.posology.adult}</p>
                  </div>
                  {product.posology.child && (
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="font-semibold text-sm text-muted-foreground mb-1">Enfant</p>
                      <p className="text-foreground">{product.posology.child}</p>
                    </div>
                  )}
                  {product.posology.infant && (
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="font-semibold text-sm text-muted-foreground mb-1">Nourrisson</p>
                      <p className="text-foreground">{product.posology.infant}</p>
                    </div>
                  )}
                  {product.posology.duration && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="font-semibold text-sm text-primary mb-1">Durée du traitement</p>
                      <p className="text-foreground">{product.posology.duration}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold mb-2">Indications thérapeutiques</h4>
                  <ul className="space-y-2">
                    {product.indications.map((ind, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="composition" className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-primary" /> Composition
                </h3>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-foreground leading-relaxed">{product.composition}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Forme pharmaceutique</p>
                    <p className="font-medium">{product.form}</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Conditionnement</p>
                    <p className="font-medium">{product.packaging}</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Laboratoire</p>
                    <p className="font-medium">{product.laboratory}</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Stock disponible</p>
                    <p className="font-medium">{product.stock} unités</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="warnings" className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" /> Contre-indications
                  </h3>
                  <ul className="space-y-2">
                    {product.contraindications.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">Effets indésirables possibles</h3>
                  <ul className="space-y-2">
                    {product.sideEffects.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                  <p className="text-sm">
                    <strong>En cas de doute</strong>, contactez notre pharmacien via la page{" "}
                    <Link to="/advice" className="text-primary underline">Conseils</Link> ou au{" "}
                    <strong>+224 622 00 00 00</strong>.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="storage" className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Conservation
                </h3>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-foreground leading-relaxed">{product.storage}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground pt-2">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5" /> Conserver hors de portée des enfants.</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5" /> Ne pas utiliser après la date de péremption.</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5" /> Rapporter les médicaments non utilisés en pharmacie.</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Similar */}
        {similar.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 font-display">Produits similaires</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((p) => (
                <Link to={`/product/${p.id}`} key={p.id}>
                  <Card variant="product">
                    <CardContent className="p-4">
                      <div className="w-full aspect-square rounded-xl bg-secondary flex items-center justify-center text-5xl mb-3">
                        {p.image}
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{p.shortDescription}</p>
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
