import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie D.",
    role: "Cliente depuis 2 ans",
    content: "Service impeccable ! L'envoi d'ordonnance en ligne est vraiment pratique et les conseils des pharmaciens sont toujours pertinents.",
    rating: 5,
    avatar: "👩"
  },
  {
    id: 2,
    name: "Pierre L.",
    role: "Client régulier",
    content: "Livraison rapide et produits authentiques. Je recommande PharmaConnect à tous ceux qui cherchent une pharmacie de confiance en ligne.",
    rating: 5,
    avatar: "👨"
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Maman de 3 enfants",
    content: "Parfait pour les parents débordés ! Je commande les médicaments pour toute la famille et tout arrive rapidement.",
    rating: 5,
    avatar: "👩‍👧"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="success" className="mb-4">
            Avis clients
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              variant="elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                
                <p className="text-foreground mb-6">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg border-2 border-card">👩</span>
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg border-2 border-card">👨</span>
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg border-2 border-card">👩‍🦰</span>
            </div>
            <p className="text-sm">
              <span className="font-semibold text-foreground">+15 000</span>
              <span className="text-muted-foreground"> clients satisfaits</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
