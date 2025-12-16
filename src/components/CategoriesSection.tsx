import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Pill, 
  Heart, 
  Baby, 
  Sparkles, 
  Leaf, 
  Eye,
  Activity,
  Thermometer
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Médicaments",
    icon: Pill,
    color: "bg-primary/10 text-primary",
    count: "2.5k+ produits"
  },
  {
    id: 2,
    name: "Cardiovasculaire",
    icon: Heart,
    color: "bg-destructive/10 text-destructive",
    count: "450+ produits"
  },
  {
    id: 3,
    name: "Bébé & Maman",
    icon: Baby,
    color: "bg-accent/10 text-accent",
    count: "800+ produits"
  },
  {
    id: 4,
    name: "Beauté & Soins",
    icon: Sparkles,
    color: "bg-info/10 text-info",
    count: "1.2k+ produits"
  },
  {
    id: 5,
    name: "Bio & Naturel",
    icon: Leaf,
    color: "bg-success/10 text-success",
    count: "600+ produits"
  },
  {
    id: 6,
    name: "Optique",
    icon: Eye,
    color: "bg-warning/10 text-warning",
    count: "350+ produits"
  },
  {
    id: 7,
    name: "Vitamines",
    icon: Activity,
    color: "bg-primary/10 text-primary",
    count: "500+ produits"
  },
  {
    id: 8,
    name: "Premiers secours",
    icon: Thermometer,
    color: "bg-destructive/10 text-destructive",
    count: "300+ produits"
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Explorez nos catégories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trouvez facilement ce dont vous avez besoin parmi nos milliers de produits de santé et bien-être.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <Card 
                variant="product" 
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
