
-- 1) has_role: switch to SECURITY INVOKER (all callers pass auth.uid(); user_roles RLS allows self-read)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- 2) user_roles: restrict self-insert to 'customer' only (elevated roles must be assigned via SECURITY DEFINER trigger or admin)
DROP POLICY IF EXISTS "Users can insert own role on signup" ON public.user_roles;
CREATE POLICY "Users can insert own customer role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND role = 'customer'::app_role);

-- 3) pharmacies: restrict SELECT to owner/admin only; expose safe columns via a public view
DROP POLICY IF EXISTS "Verified pharmacies are public" ON public.pharmacies;

CREATE POLICY "Owners and admins read pharmacies"
ON public.pharmacies
FOR SELECT
TO authenticated
USING (owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE VIEW public.pharmacies_public
WITH (security_invoker = true)
AS
SELECT id, name, address, city, description, logo_url, opening_hours, latitude, longitude, active, verified, created_at
FROM public.pharmacies
WHERE verified = true AND active = true;

GRANT SELECT ON public.pharmacies_public TO anon, authenticated;

-- 4) prescriptions storage: allow pharmacy owners to read prescriptions attached to their orders
CREATE POLICY "prescriptions_pharmacy_read"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'prescriptions'
  AND EXISTS (
    SELECT 1
    FROM public.orders o
    JOIN public.pharmacies p ON p.id = o.pharmacy_id
    WHERE p.owner_id = auth.uid()
      AND o.prescription_url IS NOT NULL
      AND (o.prescription_url = storage.objects.name OR o.prescription_url LIKE '%' || storage.objects.name)
  )
);
