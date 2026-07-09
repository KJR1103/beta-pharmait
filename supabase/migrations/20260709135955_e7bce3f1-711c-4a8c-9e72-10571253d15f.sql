CREATE OR REPLACE FUNCTION public.auto_verify_pharmacy()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.agrement_number IS NOT NULL AND length(trim(NEW.agrement_number)) > 0 THEN
    NEW.verified := true;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.auto_verify_pharmacy() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.auto_verify_pharmacy() TO service_role;

DROP POLICY IF EXISTS "Courier sees assigned + available" ON public.orders;
DROP POLICY IF EXISTS "Courier updates its orders" ON public.orders;

CREATE POLICY "Courier sees assigned + available"
ON public.orders
FOR SELECT
TO authenticated
USING (
  courier_id = auth.uid()
  OR (
    courier_id IS NULL
    AND status IN ('pending', 'confirmed', 'preparing', 'ready')
    AND public.has_role(auth.uid(), 'courier')
  )
);

CREATE POLICY "Courier updates its orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  courier_id = auth.uid()
  OR (
    courier_id IS NULL
    AND status IN ('pending', 'confirmed', 'preparing', 'ready')
    AND public.has_role(auth.uid(), 'courier')
  )
)
WITH CHECK (
  courier_id = auth.uid()
  OR (
    courier_id IS NULL
    AND status IN ('pending', 'confirmed', 'preparing', 'ready')
    AND public.has_role(auth.uid(), 'courier')
  )
);