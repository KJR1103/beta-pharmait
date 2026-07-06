import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, ShoppingCart, User, Menu, X, Pill, Heart, Phone, MapPin, LogOut, LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { itemCount } = useCart();
  const { user, roles, signOut } = useAuth();
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(search)}`);
  };

  const dashboardPath =
    roles.includes("pharmacy") ? "/dashboard/pharmacy" :
    roles.includes("courier") ? "/dashboard/courier" :
    "/dashboard/customer";

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="bg-primary text-primary-foreground py-2 text-xs sm:text-sm">
        <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>+224 622 00 00 00</span></div>
          <div className="hidden sm:flex items-center gap-2"><MapPin className="w-4 h-4" /><span>Livraison à Conakry et intérieur</span></div>
        </div>
      </div>

      <nav className="container py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-soft">
              <Pill className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-bold text-foreground font-display">PharmaConnect</span>
              <span className="hidden md:block text-[10px] text-muted-foreground uppercase tracking-wider">Guinée</span>
            </div>
          </Link>

          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un médicament..."
                className="pl-12 h-12 rounded-xl border-2 border-border focus:border-primary bg-secondary/50" />
            </div>
          </form>

          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex"><Heart className="w-5 h-5" /></Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center animate-scale-in">{itemCount}</span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="hidden md:flex"><User className="w-4 h-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(dashboardPath)}>
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Mon espace
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { signOut(); navigate("/"); }}>
                    <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="outline" className="gap-2"><User className="w-4 h-4" /><span>Connexion</span></Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        <form onSubmit={submitSearch} className="md:hidden mt-3">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
              className="pl-12 h-11 rounded-xl border-2 border-border focus:border-primary bg-secondary/50" />
          </div>
        </form>

        <div className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mt-4 md:mt-3 pt-4 md:pt-3 border-t border-border`}>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">Médicaments</Link>
          <Link to="/prescriptions" className="text-foreground hover:text-primary transition-colors font-medium">Ordonnances</Link>
          <Link to="/advice" className="text-foreground hover:text-primary transition-colors font-medium">Conseils Santé</Link>
          <Link to="/tracking" className="text-foreground hover:text-primary transition-colors font-medium">Suivi commande</Link>
          {user ? (
            <Link to={dashboardPath} className="text-primary hover:underline font-semibold md:ml-auto">Mon espace</Link>
          ) : (
            <Link to="/auth" className="text-primary hover:underline font-semibold md:ml-auto md:hidden">Connexion / Inscription</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
