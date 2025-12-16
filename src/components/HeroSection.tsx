import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, MessageCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 slide-up">
            <div className="space-y-4">
              <Badge variant="prescription" className="text-sm">
                🏥 Pharmacie en ligne agréée
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-display">
                Votre santé,{" "}
                <span className="gradient-text">notre priorité</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Commandez vos médicaments en ligne, téléversez votre ordonnance et bénéficiez de conseils pharmaceutiques personnalisés.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl" className="gap-2">
                  Explorer les produits
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/prescriptions">
                <Button variant="outline" size="xl" className="gap-2">
                  <Upload className="w-5 h-5" />
                  Envoyer une ordonnance
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">10k+</p>
                <p className="text-sm text-muted-foreground">Produits disponibles</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Support disponible</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Clients satisfaits</p>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6 hover-lift" style={{ animationDelay: "0.1s" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Ordonnance en ligne</h3>
                <p className="text-sm text-muted-foreground">Téléversez votre ordonnance et recevez vos médicaments.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 hover-lift sm:translate-y-8" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Conseils personnalisés</h3>
                <p className="text-sm text-muted-foreground">Nos pharmaciens vous accompagnent à tout moment.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 hover-lift" style={{ animationDelay: "0.3s" }}>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Livraison rapide</h3>
                <p className="text-sm text-muted-foreground">Livraison sous 24-48h partout en France.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 hover-lift sm:translate-y-8 pulse-glow" style={{ animationDelay: "0.4s" }}>
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">100% Sécurisé</h3>
                <p className="text-sm text-muted-foreground">Données protégées et paiement sécurisé.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
