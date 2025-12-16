import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Check, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Téléversez votre ordonnance",
    description: "Prenez en photo ou scannez votre ordonnance et téléversez-la en toute sécurité.",
    icon: Upload
  },
  {
    number: "02",
    title: "Validation par un pharmacien",
    description: "Notre équipe vérifie votre ordonnance sous 2h et prépare votre commande.",
    icon: FileText
  },
  {
    number: "03",
    title: "Livraison à domicile",
    description: "Recevez vos médicaments sous 24-48h à l'adresse de votre choix.",
    icon: Check
  },
];

const PrescriptionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 via-primary/10 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="prescription" className="mb-4">
            Service Ordonnance
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Commander avec ordonnance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simplifiez vos commandes de médicaments sur ordonnance en quelques clics. Notre processus est rapide, sécurisé et conforme à la réglementation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              variant="glass" 
              className="relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-8">
                <span className="absolute top-4 right-4 text-6xl font-bold text-primary/10 font-display">
                  {step.number}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/prescriptions">
            <Button variant="hero" size="xl" className="gap-2">
              <Upload className="w-5 h-5" />
              Envoyer mon ordonnance
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Traitement sous 2h en moyenne</span>
          </div>
        </div>

        {/* Trust info */}
        <div className="mt-12 pt-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Confidentiel</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">ARS</p>
              <p className="text-sm text-muted-foreground">Pharmacie agréée</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">2h</p>
              <p className="text-sm text-muted-foreground">Temps de validation</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">24/48h</p>
              <p className="text-sm text-muted-foreground">Livraison</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionSection;
