import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, MessageCircle, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-success/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative py-14 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge variant="prescription" className="text-sm gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Pharmacie en ligne agréée · Guinée 🇬🇳
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-display text-balance">
              Vos médicaments,{" "}
              <span className="gradient-text">livrés à Conakry</span> et partout en Guinée
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Commandez vos médicaments authentiques, téléversez votre ordonnance et bénéficiez de conseils pharmaceutiques personnalisés. Paiement Orange Money & MTN MoMo.
            </p>

            <div className="flex flex-wrap gap-3">
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

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
                <p className="text-xs text-muted-foreground">Médicaments certifiés</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">2-24h</p>
                <p className="text-xs text-muted-foreground">Livraison à Conakry</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground">Conseil pharmacien</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Ordonnance en ligne</h3>
                <p className="text-sm text-muted-foreground">Photo ou PDF, validation sous 2h.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 hover-lift sm:translate-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Conseil pharmacien</h3>
                <p className="text-sm text-muted-foreground">Posez vos questions à un pro.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 hover-lift animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Livraison rapide</h3>
                <p className="text-sm text-muted-foreground">Conakry 2-24h · Régions 24-72h.</p>
              </div>

              <div className="glass-card rounded-2xl p-6 hover-lift sm:translate-y-8 pulse-glow animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-info" />
                </div>
                <h3 className="font-semibold mb-2">Médicaments authentiques</h3>
                <p className="text-sm text-muted-foreground">Contrôlés & certifiés.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
