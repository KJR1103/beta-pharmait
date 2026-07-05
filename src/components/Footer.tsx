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
  Truck,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="border-b border-background/10">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Livraison Conakry & intérieur</p>
                <p className="text-sm text-background/70">Sous 2-24h à Conakry, 24-72h en province</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Médicaments certifiés</p>
                <p className="text-sm text-background/70">Agréés par la Direction Nationale de la Pharmacie</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Paiement à la livraison</p>
                <p className="text-sm text-background/70">Espèces, Orange Money, MTN MoMo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Pill className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-display">PharmaConnect</span>
            </Link>
            <p className="text-background/70 text-sm">
              Votre pharmacie en ligne de confiance en Guinée. Médicaments authentiques, conseils pharmaceutiques et livraison rapide à Conakry et dans toutes les régions.
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

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-background/70 hover:text-primary transition-colors">Tous les produits</Link></li>
              <li><Link to="/products" className="text-background/70 hover:text-primary transition-colors">Catégories</Link></li>
              <li><Link to="/prescriptions" className="text-background/70 hover:text-primary transition-colors">Mes ordonnances</Link></li>
              <li><Link to="/advice" className="text-background/70 hover:text-primary transition-colors">Conseils santé</Link></li>
              <li><Link to="/tracking" className="text-background/70 hover:text-primary transition-colors">Suivi commande</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-background/70 hover:text-primary transition-colors">Devenir pharmacie partenaire</Link></li>
              <li><Link to="/advice" className="text-background/70 hover:text-primary transition-colors">Aide & FAQ</Link></li>
              <li><Link to="/" className="text-background/70 hover:text-primary transition-colors">Retours & remboursements</Link></li>
              <li><Link to="/" className="text-background/70 hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link to="/" className="text-background/70 hover:text-primary transition-colors">CGV</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4" />
                <span>+224 622 00 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4" />
                <span>contact@pharmaconnect.gn</span>
              </div>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Immeuble Kaloum Centre<br />Boulevard du Commerce<br />Conakry, Guinée</span>
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

      <div className="border-t border-background/10 py-6">
        <div className="container text-center text-sm text-background/60">
          <p>© 2026 PharmaConnect Guinée. Tous droits réservés. Pharmacie agréée par la Direction Nationale de la Pharmacie et du Médicament.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
