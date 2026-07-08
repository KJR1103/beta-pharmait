
-- Security definer helper: is this pharmacy publicly listed?
CREATE OR REPLACE FUNCTION public.is_pharmacy_public(_pharmacy_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.pharmacies
    WHERE id = _pharmacy_id AND verified = true AND active = true
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_pharmacy_public(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_pharmacy_public(uuid) TO anon, authenticated;

-- Rewrite products SELECT policy to not depend on pharmacies row visibility
DROP POLICY IF EXISTS "Public products from verified pharmacies" ON public.products;
CREATE POLICY "Public products from verified pharmacies"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (active = true AND public.is_pharmacy_public(pharmacy_id));

-- Grants for Data API access
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

GRANT SELECT ON public.pharmacies_public TO anon, authenticated;
GRANT ALL ON public.pharmacies_public TO service_role;

GRANT SELECT, INSERT, UPDATE ON public.pharmacies TO authenticated;
GRANT ALL ON public.pharmacies TO service_role;
