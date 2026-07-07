import { supabase } from "@/integrations/supabase/client";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string; // emoji fallback
  image_url?: string | null;
  stock: number;
  prescription: boolean;
  shortDescription: string;
  pharmacy_id: string;
  pharmacy_name?: string;
  pharmacy_city?: string;
  category?: string | null;
};

export type CatalogProduct = CartProduct & {
  description: string | null;
  composition: string | null;
  posology: string | null;
  indications: string | null;
  contraindications: string | null;
  storage: string | null;
};

export const formatGNF = (n: number) =>
  Number(n || 0).toLocaleString("fr-FR").replace(/,/g, " ") + " GNF";

const emojiForCategory = (c?: string | null) => {
  const s = (c || "").toLowerCase();
  if (s.includes("vitamin")) return "🍊";
  if (s.includes("douleur") || s.includes("antalg") || s.includes("fièvre")) return "💊";
  if (s.includes("antibio")) return "🧪";
  if (s.includes("sirop")) return "🧴";
  if (s.includes("bébé") || s.includes("enfant")) return "🍼";
  if (s.includes("hygiène") || s.includes("hygiene")) return "🧼";
  if (s.includes("beauté") || s.includes("cosm")) return "💄";
  if (s.includes("diab")) return "🩸";
  return "💊";
};

const toCatalog = (row: any): CatalogProduct => ({
  id: row.id,
  name: row.name,
  price: Number(row.price),
  image: emojiForCategory(row.category),
  image_url: row.image_url,
  stock: row.stock ?? 0,
  prescription: !!row.requires_prescription,
  shortDescription: (row.description || row.category || "").toString().split("\n")[0].slice(0, 90),
  pharmacy_id: row.pharmacy_id,
  pharmacy_name: row.pharmacy?.name || row.pharmacies?.name,
  pharmacy_city: row.pharmacy?.city || row.pharmacies?.city,
  category: row.category,
  description: row.description,
  composition: row.composition,
  posology: row.posology,
  indications: row.indications,
  contraindications: row.contraindications,
  storage: row.storage,
});

export async function fetchCatalog(opts?: { pharmacyId?: string; limit?: number }): Promise<CatalogProduct[]> {
  let q = supabase
    .from("products")
    .select("*, pharmacies!inner(id, name, city, verified, active)")
    .eq("active", true)
    .eq("pharmacies.verified", true)
    .eq("pharmacies.active", true)
    .order("created_at", { ascending: false });
  if (opts?.pharmacyId) q = q.eq("pharmacy_id", opts.pharmacyId);
  if (opts?.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) { console.error(error); return []; }
  return (data ?? []).map(toCatalog);
}

export async function fetchProductById(id: string): Promise<CatalogProduct | null> {
  const { data } = await supabase
    .from("products")
    .select("*, pharmacies!inner(id, name, city, verified, active, address, phone)")
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  return toCatalog(data);
}

export type PublicPharmacy = {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string | null;
  logo_url: string | null;
  opening_hours: string | null;
};

export async function fetchPharmacies(): Promise<PublicPharmacy[]> {
  const { data, error } = await supabase
    .from("pharmacies_public")
    .select("id, name, city, address, description, logo_url, opening_hours")
    .eq("active", true)
    .eq("verified", true)
    .order("name");
  if (error) { console.error(error); return []; }
  return (data ?? []) as any;
}
