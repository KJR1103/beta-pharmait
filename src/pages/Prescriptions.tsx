import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Upload, 
  FileText, 
  Check, 
  Camera,
  X,
  Clock,
  Shield,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Prescriptions = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins une ordonnance",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ordonnance envoyée !",
      description: "Notre équipe va traiter votre demande sous 2h.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="prescription" className="mb-4">
              Service Ordonnance
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              Envoyer mon ordonnance
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Téléversez votre ordonnance et notre équipe de pharmaciens la traitera sous 2h maximum.
            </p>
          </div>

          {/* Upload Card */}
          <Card variant="elevated" className="mb-8">
            <CardContent className="p-8">
              {/* Upload area */}
              <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer mb-6">
                <input 
                  type="file" 
                  id="prescription-upload" 
                  className="hidden" 
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleFileChange}
                />
                <label htmlFor="prescription-upload" className="cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Glissez votre ordonnance ici
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ou cliquez pour sélectionner un fichier
                  </p>
                  <div className="flex justify-center gap-3">
                    <Badge variant="outline" className="gap-1">
                      <Camera className="w-3 h-3" />
                      Photo
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <FileText className="w-3 h-3" />
                      PDF
                    </Badge>
                  </div>
                </label>
              </div>

              {/* Uploaded files */}
              {files.length > 0 && (
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-foreground">Fichiers ajoutés :</p>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm text-foreground truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-foreground">
                  Notes additionnelles (optionnel)
                </label>
                <Textarea 
                  placeholder="Précisez vos besoins, allergies connues, ou toute information utile pour le pharmacien..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button variant="hero" size="xl" className="w-full" onClick={handleSubmit}>
                <Check className="w-5 h-5 mr-2" />
                Envoyer mon ordonnance
              </Button>
            </CardContent>
          </Card>

          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card variant="glass">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Traitement rapide</h4>
                  <p className="text-sm text-muted-foreground">Validation sous 2h max</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">100% Sécurisé</h4>
                  <p className="text-sm text-muted-foreground">Données cryptées</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-info" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Conseils inclus</h4>
                  <p className="text-sm text-muted-foreground">Suivi pharmacien</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Prescriptions;
