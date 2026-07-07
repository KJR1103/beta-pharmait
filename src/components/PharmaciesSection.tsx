import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchPharmacies, type PublicPharmacy } from "@/lib/catalog";
import { MapPin, Store, Clock, BadgeCheck, ArrowRight } from "lucide-react";

const PharmaciesSection = () => {
  const [pharmacies, setPharmacies] = useState<PublicPharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPharmacies().then((p) => { setPharmacies(p); setLoading(false); });
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="prescription" className="mb-3">Nos partenaires</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">Pharmacies agréées en Guinée</h2>
            <p className="text-muted-foreground max-w-xl">
              Toutes les pharmacies sont vérifiées par leur agrément du Ministère de la Santé. Choisissez votre officine et commandez en toute confiance.
            </p>
          </div>
          <Link to="/auth"><Button variant="outline" className="gap-2"><Store className="w-4 h-4" /> Inscrire ma pharmacie</Button></Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0,1,2].map((i) => <Card key={i} className="h-40 animate-pulse bg-muted/40" />)}
          </div>
        ) : pharmacies.length === 0 ? (
          <Card><CardContent className="p-10 text-center text-muted-foreground">
            Aucune pharmacie vérifiée pour le moment. Les officines qui s'inscrivent apparaîtront ici après vérification.
          </CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pharmacies.map((p) => (
              <Card key={p.id} variant="product" className="animate-fade-in group">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 overflow-hidden">
                      {p.logo_url ? <img src={p.logo_url} alt={p.name} className="w-full h-full object-cover" /> : <Store className="w-7 h-7 text-primary" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate">{p.name}</h3>
                      <Badge variant="success" className="gap-1 mt-1"><BadgeCheck className="w-3 h-3" /> Agréée</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {p.address}, {p.city}</p>
                    {p.opening_hours && <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {p.opening_hours}</p>}
                    {p.description && <p className="line-clamp-2 pt-1">{p.description}</p>}
                  </div>
                  <Link to={`/products?pharmacy=${p.id}`}>
                    <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Voir ses produits <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PharmaciesSection;
