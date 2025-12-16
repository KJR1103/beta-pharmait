import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pill,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Shield,
  Truck
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Trust badges */}
      <div className="border-b border-background/10">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Livraison Rapide</p>
                <p className="text-sm text-background/70">Sous 24-48h partout en France</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">100% Authentique</p>
                <p className="text-sm text-background/70">Produits certifiés</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Paiement Sécurisé</p>
                <p className="text-sm text-background/70">CB, PayPal, virement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Pill className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-display">PharmaConnect</span>
            </Link>
            <p className="text-background/70 text-sm">
              Votre pharmacie en ligne de confiance. Commandez vos médicaments en toute sécurité avec conseils personnalisés.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-background/70 hover:text-primary transition-colors">Tous les produits</Link></li>
              <li><Link to="/categories" className="text-background/70 hover:text-primary transition-colors">Catégories</Link></li>
              <li><Link to="/prescriptions" className="text-background/70 hover:text-primary transition-colors">Mes ordonnances</Link></li>
              <li><Link to="/advice" className="text-background/70 hover:text-primary transition-colors">Conseils santé</Link></li>
              <li><Link to="/tracking" className="text-background/70 hover:text-primary transition-colors">Suivi commande</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pharmacy-signup" className="text-background/70 hover:text-primary transition-colors">Devenir partenaire</Link></li>
              <li><Link to="/help" className="text-background/70 hover:text-primary transition-colors">Aide & FAQ</Link></li>
              <li><Link to="/returns" className="text-background/70 hover:text-primary transition-colors">Retours & remboursements</Link></li>
              <li><Link to="/privacy" className="text-background/70 hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link to="/terms" className="text-background/70 hover:text-primary transition-colors">CGV</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4" />
                <span>contact@pharmaconnect.fr</span>
              </div>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Rue de la Santé<br />75014 Paris, France</span>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-sm mb-2">Newsletter</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Votre email" 
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button variant="accent" size="icon">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 py-6">
        <div className="container text-center text-sm text-background/60">
          <p>© 2024 PharmaConnect. Tous droits réservés. Pharmacie agréée par l'ARS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
