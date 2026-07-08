
CREATE OR REPLACE FUNCTION public.auto_verify_pharmacy()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.agrement_doc_url IS NOT NULL AND NEW.agrement_number IS NOT NULL AND length(trim(NEW.agrement_number)) > 0 THEN
    NEW.verified := true;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_auto_verify_pharmacy ON public.pharmacies;
CREATE TRIGGER trg_auto_verify_pharmacy
BEFORE INSERT OR UPDATE ON public.pharmacies
FOR EACH ROW EXECUTE FUNCTION public.auto_verify_pharmacy();

UPDATE public.pharmacies
SET verified = true
WHERE agrement_doc_url IS NOT NULL
  AND agrement_number IS NOT NULL
  AND length(trim(agrement_number)) > 0
  AND verified = false;
