export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number; // GNF
  originalPrice?: number;
  rating: number;
  reviews: number;
  prescription: boolean;
  category: string;
  laboratory: string;
  form: string; // Comprimé, sirop, gélule...
  packaging: string;
  composition: string;
  indications: string[];
  posology: {
    adult: string;
    child?: string;
    infant?: string;
    duration?: string;
  };
  contraindications: string[];
  sideEffects: string[];
  storage: string;
  stock: number;
  image: string; // emoji fallback
};

export const formatGNF = (n: number) =>
  n.toLocaleString("fr-FR").replace(/,/g, " ") + " GNF";

export const products: Product[] = [
  {
    id: "paracetamol-500",
    name: "Paracétamol 500 mg",
    shortDescription: "Comprimés - Boîte de 20",
    description:
      "Antalgique et antipyrétique utilisé pour soulager les douleurs légères à modérées et faire baisser la fièvre. Convient à l'adulte et à l'enfant.",
    price: 8000,
    originalPrice: 12000,
    rating: 4.8,
    reviews: 245,
    prescription: false,
    category: "Douleur & Fièvre",
    laboratory: "Sanofi Aventis",
    form: "Comprimé sécable",
    packaging: "Boîte de 20 comprimés",
    composition: "Paracétamol 500 mg par comprimé. Excipients : amidon de maïs, povidone, stéarate de magnésium.",
    indications: [
      "Douleurs d'intensité légère à modérée (maux de tête, courbatures, règles douloureuses)",
      "États fébriles",
      "Douleurs dentaires",
    ],
    posology: {
      adult: "1 à 2 comprimés, 3 à 4 fois par jour, en respectant un intervalle de 4 à 6 heures. Ne pas dépasser 3 g par jour.",
      child: "Enfant de plus de 27 kg : 1 comprimé toutes les 6 heures. Maximum 3 g par 24h.",
      duration: "Ne pas dépasser 3 jours de traitement sans avis médical.",
    },
    contraindications: [
      "Hypersensibilité au paracétamol",
      "Insuffisance hépatique sévère",
      "Ne pas associer à d'autres médicaments contenant du paracétamol",
    ],
    sideEffects: [
      "Réactions allergiques cutanées (rares)",
      "Atteinte hépatique en cas de surdosage",
    ],
    storage: "À conserver à une température inférieure à 30°C, à l'abri de l'humidité.",
    stock: 120,
    image: "💊",
  },
  {
    id: "artemether-lumefantrine",
    name: "Artéméther/Luméfantrine 20/120 mg",
    shortDescription: "Antipaludique - Boîte de 24",
    description:
      "Association antipaludique de première ligne pour le traitement du paludisme non compliqué à Plasmodium falciparum. Traitement de référence recommandé par l'OMS.",
    price: 45000,
    rating: 4.9,
    reviews: 189,
    prescription: true,
    category: "Antipaludiques",
    laboratory: "Novartis",
    form: "Comprimé pelliculé",
    packaging: "Boîte de 24 comprimés",
    composition: "Artéméther 20 mg + Luméfantrine 120 mg par comprimé.",
    indications: [
      "Traitement du paludisme non compliqué à Plasmodium falciparum",
      "Adulte et enfant à partir de 5 kg",
    ],
    posology: {
      adult: "Adulte (>35 kg) : 4 comprimés à H0, H8, H24, H36, H48 et H60 (soit 24 comprimés sur 3 jours). À prendre avec un repas gras.",
      child: "Selon poids : 15-25 kg : 2 cp / 25-35 kg : 3 cp par prise, sur 3 jours (6 prises).",
      duration: "3 jours, sans interruption. Ne pas modifier la posologie.",
    },
    contraindications: [
      "Hypersensibilité aux dérivés de l'artémisinine",
      "Premier trimestre de grossesse",
      "Antécédents d'arythmie cardiaque",
      "Enfant de moins de 5 kg",
    ],
    sideEffects: [
      "Céphalées, vertiges",
      "Nausées, vomissements",
      "Palpitations",
      "Éruption cutanée",
    ],
    storage: "À conserver à moins de 30°C, dans l'emballage d'origine.",
    stock: 45,
    image: "🦟",
  },
  {
    id: "amoxicilline-500",
    name: "Amoxicilline 500 mg",
    shortDescription: "Antibiotique - Boîte de 12 gélules",
    description:
      "Antibiotique de la famille des bêta-lactamines (pénicillines) actif sur de nombreuses bactéries. Utilisé dans les infections ORL, respiratoires, urinaires et dentaires.",
    price: 18000,
    rating: 4.7,
    reviews: 156,
    prescription: true,
    category: "Antibiotiques",
    laboratory: "GSK",
    form: "Gélule",
    packaging: "Boîte de 12 gélules",
    composition: "Amoxicilline (sous forme de trihydrate) 500 mg par gélule.",
    indications: [
      "Angines documentées à streptocoque",
      "Sinusites, otites moyennes aiguës",
      "Infections respiratoires basses",
      "Infections urinaires basses",
      "Infections stomatologiques",
    ],
    posology: {
      adult: "1 gélule 3 fois par jour, soit 1,5 g par jour. Possibilité de 2 g/j en 2 prises selon prescription.",
      child: "25 à 50 mg/kg/jour en 2 à 3 prises, sans dépasser la dose adulte.",
      duration: "En général 6 à 10 jours. Respecter impérativement la durée prescrite.",
    },
    contraindications: [
      "Allergie aux pénicillines ou céphalosporines",
      "Mononucléose infectieuse",
    ],
    sideEffects: [
      "Diarrhée, nausées",
      "Éruptions cutanées",
      "Candidoses",
      "Réactions allergiques graves (rares)",
    ],
    storage: "À conserver à température ambiante, à l'abri de l'humidité.",
    stock: 60,
    image: "💉",
  },
  {
    id: "srao-oms",
    name: "Sels de Réhydratation Orale (SRO)",
    shortDescription: "Sachets - Boîte de 10 sachets",
    description:
      "Solution de réhydratation orale conforme aux recommandations OMS. Essentielle pour prévenir et traiter la déshydratation en cas de diarrhée, particulièrement chez l'enfant.",
    price: 12000,
    rating: 4.9,
    reviews: 412,
    prescription: false,
    category: "Digestion",
    laboratory: "UNICEF/OMS",
    form: "Poudre pour solution buvable",
    packaging: "Boîte de 10 sachets de 20,5 g",
    composition: "Chlorure de sodium, chlorure de potassium, citrate trisodique, glucose anhydre.",
    indications: [
      "Réhydratation en cas de diarrhée aiguë",
      "Prévention de la déshydratation",
      "Vomissements répétés",
    ],
    posology: {
      adult: "Dissoudre 1 sachet dans 1 litre d'eau potable. Boire par petites gorgées selon la soif.",
      child: "50 à 100 ml/kg sur 4 à 6 heures, puis 10 ml/kg après chaque selle liquide.",
      infant: "Nourrisson : proposer 5 ml toutes les 1 à 2 minutes à la cuillère ou à la seringue.",
      duration: "Jusqu'à arrêt de la diarrhée. Consulter si symptômes > 24h chez l'enfant.",
    },
    contraindications: [
      "Occlusion intestinale",
      "Vomissements incoercibles",
      "Anurie",
    ],
    sideEffects: ["Aucun effet indésirable notable si utilisé correctement."],
    storage: "À conserver au sec, à température ambiante. Solution reconstituée : 24h max.",
    stock: 200,
    image: "💧",
  },
  {
    id: "vitamine-c-1000",
    name: "Vitamine C 1000 mg",
    shortDescription: "Comprimés effervescents - Tube de 20",
    description:
      "Complément en vitamine C (acide ascorbique) pour renforcer le système immunitaire, lutter contre la fatigue et favoriser l'absorption du fer.",
    price: 25000,
    originalPrice: 32000,
    rating: 4.6,
    reviews: 178,
    prescription: false,
    category: "Vitamines",
    laboratory: "Bayer",
    form: "Comprimé effervescent",
    packaging: "Tube de 20 comprimés",
    composition: "Acide ascorbique 1000 mg. Arôme orange naturel.",
    indications: [
      "États de fatigue passagère",
      "Renforcement des défenses immunitaires",
      "Complément alimentaire",
    ],
    posology: {
      adult: "1 comprimé par jour, à dissoudre dans un verre d'eau. À prendre de préférence le matin.",
      child: "Enfant de plus de 15 ans : 1 comprimé par jour.",
      duration: "Cure de 1 mois renouvelable.",
    },
    contraindications: [
      "Antécédents de calculs urinaires oxaliques",
      "Hyperoxalurie",
      "Surcharge en fer",
    ],
    sideEffects: [
      "Troubles digestifs à fortes doses",
      "Insomnie si prise le soir",
    ],
    storage: "À conserver au sec, tube bien refermé.",
    stock: 85,
    image: "🍊",
  },
  {
    id: "ibuprofene-400",
    name: "Ibuprofène 400 mg",
    shortDescription: "Anti-inflammatoire - Boîte de 30",
    description:
      "Anti-inflammatoire non stéroïdien (AINS) indiqué contre la douleur et l'inflammation. Efficace sur les douleurs musculaires, articulaires et menstruelles.",
    price: 15000,
    rating: 4.7,
    reviews: 203,
    prescription: false,
    category: "Douleur & Fièvre",
    laboratory: "Reckitt Benckiser",
    form: "Comprimé pelliculé",
    packaging: "Boîte de 30 comprimés",
    composition: "Ibuprofène 400 mg par comprimé.",
    indications: [
      "Douleurs modérées",
      "Fièvre",
      "Règles douloureuses",
      "Inflammations",
    ],
    posology: {
      adult: "1 comprimé toutes les 6 heures. Maximum 3 comprimés (1200 mg) par jour. À prendre au cours d'un repas.",
      child: "Non recommandé chez l'enfant de moins de 12 ans à ce dosage.",
      duration: "Ne pas dépasser 5 jours sans avis médical.",
    },
    contraindications: [
      "Ulcère gastro-duodénal évolutif",
      "Insuffisance cardiaque, hépatique ou rénale sévère",
      "Grossesse (3ème trimestre)",
      "Allergie aux AINS",
    ],
    sideEffects: [
      "Troubles digestifs (nausées, brûlures)",
      "Vertiges",
      "Réactions allergiques",
      "Risque hémorragique",
    ],
    storage: "À conserver à température ambiante, à l'abri de la lumière.",
    stock: 90,
    image: "💊",
  },
  {
    id: "serum-physiologique",
    name: "Sérum Physiologique",
    shortDescription: "Unidoses stériles - Boîte de 40 x 5 ml",
    description:
      "Solution isotonique stérile de chlorure de sodium 0,9 %. Pour l'hygiène quotidienne du nez et des yeux du bébé et de l'adulte.",
    price: 20000,
    rating: 4.8,
    reviews: 312,
    prescription: false,
    category: "Bébé & Maman",
    laboratory: "Gilbert Laboratoires",
    form: "Solution stérile en unidose",
    packaging: "Boîte de 40 unidoses de 5 ml",
    composition: "Chlorure de sodium 0,9 %, eau purifiée pour préparation injectable.",
    indications: [
      "Hygiène nasale du nourrisson et de l'adulte",
      "Lavage oculaire",
      "Nettoyage de plaies superficielles",
    ],
    posology: {
      adult: "1 à 2 unidoses par narine, plusieurs fois par jour selon besoin.",
      child: "Enfant : 1 unidose par narine, 2 à 3 fois par jour.",
      infant: "Nourrisson : allongé sur le côté, instiller une demi-unidose dans chaque narine.",
    },
    contraindications: ["Aucune contre-indication connue."],
    sideEffects: ["Aucun effet indésirable connu."],
    storage: "À conserver à température ambiante. Unidose à usage unique.",
    stock: 150,
    image: "💧",
  },
  {
    id: "chloroquine-100",
    name: "Chloroquine 100 mg",
    shortDescription: "Comprimés - Boîte de 20",
    description:
      "Antipaludique utilisé en prophylaxie et traitement du paludisme dans certaines régions. À utiliser strictement selon prescription médicale.",
    price: 22000,
    rating: 4.4,
    reviews: 94,
    prescription: true,
    category: "Antipaludiques",
    laboratory: "Pharma5",
    form: "Comprimé sécable",
    packaging: "Boîte de 20 comprimés",
    composition: "Chloroquine (sulfate) 100 mg par comprimé.",
    indications: [
      "Prophylaxie du paludisme dans zones sensibles",
      "Traitement d'appoint selon prescription",
    ],
    posology: {
      adult: "Prophylaxie : 2 comprimés par semaine, le même jour. Débuter 1 semaine avant l'exposition.",
      child: "1,5 mg/kg/jour ou 2,5 mg/kg/semaine selon protocole.",
      duration: "Poursuivre 4 semaines après le retour de la zone d'endémie.",
    },
    contraindications: [
      "Rétinopathie",
      "Antécédents de troubles psychiatriques",
      "Association avec l'amiodarone",
    ],
    sideEffects: [
      "Troubles visuels",
      "Nausées, prurit",
      "Troubles du sommeil",
    ],
    storage: "À conserver à l'abri de la lumière et hors de portée des enfants.",
    stock: 55,
    image: "🦟",
  },
  {
    id: "creme-cicatrisante",
    name: "Crème Cicatrisante",
    shortDescription: "Réparatrice - Tube 50 ml",
    description:
      "Crème apaisante et réparatrice pour peaux irritées, brûlures superficielles, coups de soleil et zones de frottement. Riche en panthénol.",
    price: 28000,
    rating: 4.6,
    reviews: 98,
    prescription: false,
    category: "Soins & Beauté",
    laboratory: "Bepanthen",
    form: "Crème",
    packaging: "Tube de 50 ml",
    composition: "Dexpanthénol 5 %, lanoline, glycérol, cire d'abeille.",
    indications: [
      "Irritations cutanées",
      "Brûlures superficielles",
      "Érythèmes fessiers du nourrisson",
      "Crevasses (mamelons, mains)",
    ],
    posology: {
      adult: "Appliquer 1 à plusieurs fois par jour sur la zone à traiter, en couche fine.",
      child: "Utilisation identique. Adapté au nourrisson.",
    },
    contraindications: ["Hypersensibilité à l'un des composants."],
    sideEffects: ["Réactions allergiques cutanées rares."],
    storage: "À conserver à moins de 25°C.",
    stock: 70,
    image: "🧴",
  },
  {
    id: "fer-acide-folique",
    name: "Fer + Acide Folique",
    shortDescription: "Prévention anémie - 30 comprimés",
    description:
      "Association de fer et d'acide folique recommandée pendant la grossesse et en cas de carence. Prévention de l'anémie ferriprive.",
    price: 18000,
    rating: 4.7,
    reviews: 142,
    prescription: false,
    category: "Bébé & Maman",
    laboratory: "Cipla",
    form: "Comprimé pelliculé",
    packaging: "Boîte de 30 comprimés",
    composition: "Sulfate de fer 200 mg (équivalent à 60 mg de fer élément) + Acide folique 400 µg.",
    indications: [
      "Prévention et traitement de l'anémie ferriprive",
      "Supplémentation pendant la grossesse",
      "Post-partum",
    ],
    posology: {
      adult: "1 comprimé par jour, à jeun ou entre les repas, avec un verre d'eau ou de jus d'orange.",
      duration: "Grossesse : dès le début et pendant toute la durée. Anémie : 3 mois minimum.",
    },
    contraindications: [
      "Surcharge en fer (hémochromatose)",
      "Anémie non ferriprive",
    ],
    sideEffects: [
      "Coloration noire des selles (normale)",
      "Constipation ou diarrhée",
      "Nausées",
    ],
    storage: "À conserver à température ambiante.",
    stock: 100,
    image: "🌸",
  },
  {
    id: "sirop-toux",
    name: "Sirop antitussif au miel",
    shortDescription: "Toux sèche - Flacon 125 ml",
    description:
      "Sirop apaisant à base de miel et de plantes pour calmer la toux sèche irritative. Convient à l'adulte et à l'enfant à partir de 2 ans.",
    price: 22000,
    rating: 4.5,
    reviews: 89,
    prescription: false,
    category: "ORL",
    laboratory: "Pierre Fabre",
    form: "Sirop",
    packaging: "Flacon de 125 ml avec gobelet doseur",
    composition: "Miel, extraits de thym, de lierre grimpant, glycérol.",
    indications: ["Toux sèche d'irritation", "Adjuvant dans les affections ORL"],
    posology: {
      adult: "1 cuillère à soupe (15 ml), 3 à 4 fois par jour.",
      child: "Enfant 6-12 ans : 1 cuillère à café, 3 fois/j. 2-6 ans : 1/2 cuillère à café, 3 fois/j.",
      duration: "5 à 7 jours maximum. Consulter si toux persistante.",
    },
    contraindications: [
      "Enfant de moins de 2 ans",
      "Allergie au miel ou aux composants",
      "Diabète non équilibré",
    ],
    sideEffects: ["Réactions allergiques possibles."],
    storage: "Après ouverture : conserver au réfrigérateur, à consommer sous 1 mois.",
    stock: 65,
    image: "🍯",
  },
  {
    id: "probiotiques",
    name: "Probiotiques Ultra",
    shortDescription: "Flore intestinale - 30 gélules",
    description:
      "Complément alimentaire à base de ferments lactiques vivants. Aide à rééquilibrer la flore intestinale, notamment après un traitement antibiotique.",
    price: 55000,
    originalPrice: 68000,
    rating: 4.7,
    reviews: 167,
    prescription: false,
    category: "Digestion",
    laboratory: "Lactibiane",
    form: "Gélule gastro-résistante",
    packaging: "Boîte de 30 gélules",
    composition: "8 milliards UFC : Lactobacillus, Bifidobacterium, FOS.",
    indications: [
      "Après traitement antibiotique",
      "Troubles du transit",
      "Renforcement de la flore intestinale",
    ],
    posology: {
      adult: "1 à 2 gélules par jour, le matin à jeun avec un verre d'eau.",
      duration: "Cure de 1 mois, renouvelable.",
    },
    contraindications: [
      "Immunodépression sévère",
      "Cathéter veineux central",
    ],
    sideEffects: ["Ballonnements en début de cure (transitoires)."],
    storage: "À conserver au frais (< 25°C), à l'abri de l'humidité.",
    stock: 40,
    image: "🦠",
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const categories = [
  { id: "douleur", name: "Douleur & Fièvre", icon: "💊", color: "bg-primary/10 text-primary" },
  { id: "antipaludiques", name: "Antipaludiques", icon: "🦟", color: "bg-destructive/10 text-destructive" },
  { id: "antibiotiques", name: "Antibiotiques", icon: "💉", color: "bg-info/10 text-info" },
  { id: "vitamines", name: "Vitamines", icon: "🍊", color: "bg-warning/10 text-warning" },
  { id: "bebe", name: "Bébé & Maman", icon: "🌸", color: "bg-accent/10 text-accent" },
  { id: "digestion", name: "Digestion", icon: "🦠", color: "bg-success/10 text-success" },
  { id: "orl", name: "ORL", icon: "🍯", color: "bg-primary/10 text-primary" },
  { id: "soins", name: "Soins & Beauté", icon: "🧴", color: "bg-info/10 text-info" },
];
