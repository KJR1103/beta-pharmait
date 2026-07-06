import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, AppRole } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Pill, Store, Bike, User as UserIcon, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const roleTargets: Record<AppRole, string> = {
  pharmacy: "/dashboard/pharmacy",
  courier: "/dashboard/courier",
  customer: "/dashboard/customer",
  admin: "/",
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, roles, loading } = useAuth();
  const [busy, setBusy] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regRole, setRegRole] = useState<AppRole>("customer");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  useEffect(() => {
    if (!loading && user && roles.length) {
      const target =
        (location.state as { from?: string })?.from ||
        roleTargets[roles[0]] ||
        "/";
      navigate(target, { replace: true });
    }
  }, [user, roles, loading, navigate, location.state]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Connexion réussie");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: regName,
          phone: regPhone,
          city: regCity,
          role: regRole,
        },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Compte créé — bienvenue !");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary/20 to-background">
      <Navbar />
      <main className="flex-1 container py-10 md:py-16 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 justify-center mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-medium">
                <Pill className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Espace PharmaConnect</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Particuliers, pharmacies, livreurs — un compte unique.
            </p>
          </div>

          <Card variant="elevated">
            <CardContent className="p-4 md:p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Créer un compte</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="pt-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Mot de passe</Label>
                      <Input id="login-password" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Se connecter"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="pt-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Je suis</Label>
                      <RadioGroup
                        value={regRole}
                        onValueChange={(v) => setRegRole(v as AppRole)}
                        className="grid grid-cols-3 gap-2"
                      >
                        {[
                          { v: "customer", label: "Particulier", Icon: UserIcon },
                          { v: "pharmacy", label: "Pharmacie", Icon: Store },
                          { v: "courier", label: "Livreur", Icon: Bike },
                        ].map(({ v, label, Icon }) => (
                          <label
                            key={v}
                            htmlFor={`role-${v}`}
                            className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 cursor-pointer transition-all ${
                              regRole === v ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem id={`role-${v}`} value={v} className="sr-only" />
                            <Icon className="w-5 h-5 text-primary" />
                            <span className="text-xs font-medium">{label}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">
                          {regRole === "pharmacy" ? "Nom du responsable" : "Nom complet"}
                        </Label>
                        <Input id="reg-name" required value={regName} onChange={(e) => setRegName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-phone">Téléphone</Label>
                        <Input id="reg-phone" required placeholder="+224 ..." value={regPhone} onChange={(e) => setRegPhone(e.target.value)} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-city">Ville</Label>
                      <Input id="reg-city" required placeholder="Conakry, Kindia, Labé..." value={regCity} onChange={(e) => setRegCity(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Mot de passe (8+ caractères)</Label>
                      <Input id="reg-password" type="password" required minLength={8} value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer mon compte"}
                    </Button>

                    {regRole === "pharmacy" && (
                      <p className="text-xs text-muted-foreground text-center">
                        Après inscription, complétez votre agrément ministériel pour être vérifié.
                      </p>
                    )}
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-4">
            <Link to="/" className="hover:text-primary">← Retour à l'accueil</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
