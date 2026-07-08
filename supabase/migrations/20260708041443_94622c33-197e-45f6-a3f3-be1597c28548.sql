
ALTER FUNCTION public.auto_verify_pharmacy() SECURITY INVOKER;
REVOKE EXECUTE ON FUNCTION public.auto_verify_pharmacy() FROM PUBLIC, anon, authenticated;
