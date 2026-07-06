
-- product-images: public read, pharmacy owners write in their folder (userId/*)
CREATE POLICY "product_images_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "product_images_pharmacy_write" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "product_images_pharmacy_update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "product_images_pharmacy_delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- agrements: private, only owner + admins
CREATE POLICY "agrements_owner_read" ON storage.objects FOR SELECT USING (
  bucket_id = 'agrements' AND (auth.uid()::text = (storage.foldername(name))[1] OR public.has_role(auth.uid(),'admin'))
);
CREATE POLICY "agrements_owner_write" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'agrements' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "agrements_owner_update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'agrements' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- prescriptions: customer uploads, visible to customer/pharmacy/courier via orders
CREATE POLICY "prescriptions_owner_read" ON storage.objects FOR SELECT USING (
  bucket_id = 'prescriptions' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "prescriptions_owner_write" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'prescriptions' AND auth.uid()::text = (storage.foldername(name))[1]
);
