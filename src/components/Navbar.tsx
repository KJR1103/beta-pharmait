import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Pill,
  Heart,
  Phone
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <div className="container flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          <span>Besoin d'aide ? Appelez-nous au <strong>01 23 45 67 89</strong></span>
        </div>
      </div>
      
      {/* Main navbar */}
      <nav className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Pill className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-display">PharmaConnect</span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un médicament, une pharmacie..."
                className="pl-12 h-12 rounded-xl border-2 border-border focus:border-primary bg-secondary/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/account" className="hidden md:block">
              <Button variant="outline" className="gap-2">
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Search bar - mobile */}
        <div className="md:hidden mt-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Rechercher..."
              className="pl-12 h-11 rounded-xl border-2 border-border focus:border-primary bg-secondary/50"
            />
          </div>
        </div>

        {/* Navigation links */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mt-4 md:mt-3 pt-4 md:pt-3 border-t md:border-t border-border`}>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
            Médicaments
          </Link>
          <Link to="/categories" className="text-foreground hover:text-primary transition-colors font-medium">
            Catégories
          </Link>
          <Link to="/prescriptions" className="text-foreground hover:text-primary transition-colors font-medium">
            Ordonnances
          </Link>
          <Link to="/advice" className="text-foreground hover:text-primary transition-colors font-medium">
            Conseils Santé
          </Link>
          <Link to="/pharmacies" className="text-foreground hover:text-primary transition-colors font-medium">
            Nos Pharmacies
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
