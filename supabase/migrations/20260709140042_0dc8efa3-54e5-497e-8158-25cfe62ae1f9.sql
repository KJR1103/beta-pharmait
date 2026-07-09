REVOKE EXECUTE ON FUNCTION public.is_pharmacy_public(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_pharmacy_public(uuid) TO service_role;

DROP POLICY IF EXISTS "Public products from verified pharmacies" ON public.products;

CREATE POLICY "Public products from verified pharmacies"
ON public.products
FOR SELECT
TO anon, authenticated
USING (
  active = true
  AND EXISTS (
    SELECT 1
    FROM public.pharmacies p
    WHERE p.id = products.pharmacy_id
      AND p.verified = true
      AND p.active = true
  )
);