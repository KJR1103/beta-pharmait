DROP TRIGGER IF EXISTS trg_sync_pharmacies_public ON public.pharmacies;
DROP FUNCTION IF EXISTS public.sync_pharmacies_public();
DROP VIEW IF EXISTS public.pharmacies_public;

CREATE TABLE public.pharmacies_public (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  description text,
  logo_url text,
  opening_hours text,
  latitude numeric,
  longitude numeric,
  active boolean NOT NULL DEFAULT true,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.pharmacies_public TO anon;
GRANT SELECT ON public.pharmacies_public TO authenticated;
GRANT ALL ON public.pharmacies_public TO service_role;

ALTER TABLE public.pharmacies_public ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active verified pharmacies"
ON public.pharmacies_public
FOR SELECT
TO anon, authenticated
USING (active = true AND verified = true);

CREATE POLICY "Service role manages public pharmacies"
ON public.pharmacies_public
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.sync_pharmacies_public()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.pharmacies_public WHERE id = OLD.id;
    RETURN OLD;
  END IF;

  IF NEW.active = true AND NEW.verified = true THEN
    INSERT INTO public.pharmacies_public (
      id, name, address, city, description, logo_url, opening_hours,
      latitude, longitude, active, verified, created_at
    ) VALUES (
      NEW.id, NEW.name, NEW.address, NEW.city, NEW.description, NEW.logo_url, NEW.opening_hours,
      NEW.latitude, NEW.longitude, NEW.active, NEW.verified, NEW.created_at
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      address = EXCLUDED.address,
      city = EXCLUDED.city,
      description = EXCLUDED.description,
      logo_url = EXCLUDED.logo_url,
      opening_hours = EXCLUDED.opening_hours,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude,
      active = EXCLUDED.active,
      verified = EXCLUDED.verified,
      created_at = EXCLUDED.created_at;
  ELSE
    DELETE FROM public.pharmacies_public WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.sync_pharmacies_public() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sync_pharmacies_public() TO service_role;

CREATE TRIGGER trg_sync_pharmacies_public
AFTER INSERT OR UPDATE OR DELETE ON public.pharmacies
FOR EACH ROW EXECUTE FUNCTION public.sync_pharmacies_public();

INSERT INTO public.pharmacies_public (
  id, name, address, city, description, logo_url, opening_hours,
  latitude, longitude, active, verified, created_at
)
SELECT id, name, address, city, description, logo_url, opening_hours,
       latitude, longitude, active, verified, created_at
FROM public.pharmacies
WHERE active = true AND verified = true
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  description = EXCLUDED.description,
  logo_url = EXCLUDED.logo_url,
  opening_hours = EXCLUDED.opening_hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  active = EXCLUDED.active,
  verified = EXCLUDED.verified,
  created_at = EXCLUDED.created_at;

DROP POLICY IF EXISTS "Public products from verified pharmacies" ON public.products;

CREATE POLICY "Public products from verified pharmacies"
ON public.products
FOR SELECT
TO anon, authenticated
USING (
  active = true
  AND EXISTS (
    SELECT 1
    FROM public.pharmacies_public pp
    WHERE pp.id = products.pharmacy_id
      AND pp.active = true
      AND pp.verified = true
  )
);