import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const advices = [
  {
    id: 1,
    title: "Comment bien prendre ses médicaments ?",
    excerpt: "Découvrez les bonnes pratiques pour une prise de médicaments efficace et sécurisée.",
    category: "Conseils généraux",
    readTime: "5 min",
    author: "Dr. Martin",
    image: "💊"
  },
  {
    id: 2,
    title: "Renforcer son immunité naturellement",
    excerpt: "Les solutions naturelles et compléments pour booster vos défenses immunitaires.",
    category: "Bien-être",
    readTime: "7 min",
    author: "Dr. Dupont",
    image: "🛡️"
  },
  {
    id: 3,
    title: "Gérer le stress au quotidien",
    excerpt: "Techniques et produits pour mieux gérer votre stress et améliorer votre qualité de vie.",
    category: "Santé mentale",
    readTime: "6 min",
    author: "Dr. Lambert",
    image: "🧘"
  },
];

const AdviceSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Consultation CTA */}
          <div className="lg:col-span-1">
            <Card variant="feature" className="h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-display">
                  Besoin d'un conseil ?
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Nos pharmaciens diplômés sont disponibles pour répondre à toutes vos questions sur vos traitements et votre santé.
                </p>
                <div className="space-y-3">
                  <Button variant="hero" className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Démarrer une consultation
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Gratuit • Confidentiel • Réponse sous 24h
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles */}
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2 font-display">
                  Conseils santé
                </h2>
                <p className="text-muted-foreground">
                  Articles et guides rédigés par nos experts
                </p>
              </div>
              <Link to="/advice">
                <Button variant="ghost" className="gap-2">
                  Tous les articles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {advices.map((advice, index) => (
                <Link to={`/advice/${advice.id}`} key={advice.id}>
                  <Card 
                    variant="product" 
                    className="flex flex-col sm:flex-row"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-full sm:w-24 h-24 sm:h-auto bg-secondary rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none flex items-center justify-center text-4xl shrink-0">
                      {advice.image}
                    </div>
                    <CardContent className="p-5 flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {advice.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {advice.readTime}
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1 hover:text-primary transition-colors">
                        {advice.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {advice.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        {advice.author}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdviceSection;
