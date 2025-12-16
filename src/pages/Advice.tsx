import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  MessageCircle, 
  Send, 
  User, 
  Clock,
  Phone,
  Mail,
  FileText,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Comment bien prendre ses médicaments ?",
    excerpt: "Découvrez les bonnes pratiques pour une prise de médicaments efficace et sécurisée.",
    category: "Conseils généraux",
    readTime: "5 min",
    image: "💊"
  },
  {
    id: 2,
    title: "Renforcer son immunité naturellement",
    excerpt: "Les solutions naturelles et compléments pour booster vos défenses immunitaires.",
    category: "Bien-être",
    readTime: "7 min",
    image: "🛡️"
  },
  {
    id: 3,
    title: "Gérer le stress au quotidien",
    excerpt: "Techniques et produits pour mieux gérer votre stress et améliorer votre qualité de vie.",
    category: "Santé mentale",
    readTime: "6 min",
    image: "🧘"
  },
  {
    id: 4,
    title: "Les vitamines essentielles",
    excerpt: "Guide complet sur les vitamines dont votre corps a besoin et comment les obtenir.",
    category: "Nutrition",
    readTime: "8 min",
    image: "🌟"
  },
  {
    id: 5,
    title: "Prévenir les allergies saisonnières",
    excerpt: "Conseils et traitements pour mieux vivre avec les allergies au pollen.",
    category: "Allergies",
    readTime: "5 min",
    image: "🌸"
  },
  {
    id: 6,
    title: "Bien dormir : nos conseils",
    excerpt: "Améliorez la qualité de votre sommeil avec ces conseils d'experts.",
    category: "Sommeil",
    readTime: "6 min",
    image: "😴"
  },
];

const Advice = () => {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const handleSubmitQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez écrire votre question",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Question envoyée !",
      description: "Un pharmacien vous répondra sous 24h.",
    });
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            Conseils Santé
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Conseils & Assistance
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nos pharmaciens diplômés sont à votre disposition pour répondre à toutes vos questions sur vos traitements et votre santé.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Ask a question */}
          <div className="lg:col-span-1">
            <Card variant="feature" className="sticky top-32">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Poser une question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Posez votre question à nos pharmaciens. Réponse garantie sous 24h.
                </p>
                <Textarea 
                  placeholder="Décrivez votre question ou problème de santé..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={5}
                />
                <Button variant="hero" className="w-full gap-2" onClick={handleSubmitQuestion}>
                  <Send className="w-4 h-4" />
                  Envoyer ma question
                </Button>

                <div className="pt-4 border-t border-border space-y-3">
                  <p className="text-sm font-medium text-foreground">Besoin d'aide urgente ?</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>conseil@pharmaconnect.fr</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground font-display">
                Articles & Guides
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Card 
                  key={article.id} 
                  variant="product"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-3xl mb-4">
                      {article.image}
                    </div>
                    <Badge variant="secondary" className="mb-3">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Lire
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center font-display">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              { q: "Comment commander un médicament sur ordonnance ?", a: "Téléversez votre ordonnance via notre formulaire. Notre équipe la validera sous 2h et préparera votre commande." },
              { q: "Quels sont les délais de livraison ?", a: "La livraison standard est effectuée sous 24-48h partout en France métropolitaine. Livraison express disponible." },
              { q: "Comment puis-je parler à un pharmacien ?", a: "Vous pouvez nous contacter par téléphone, email ou via notre formulaire de question. Réponse garantie sous 24h." },
            ].map((faq, i) => (
              <Card key={i} variant="default">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Advice;
