import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Explorez nos catégories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement ce dont vous avez besoin parmi nos catégories adaptées aux besoins de santé en Guinée.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link to={`/products?cat=${encodeURIComponent(category.name)}`} key={category.id}>
              <Card
                variant="product"
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4 text-2xl hover-scale`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{category.name}</h3>
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
