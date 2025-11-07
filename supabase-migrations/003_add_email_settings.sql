-- Add email settings columns to business_settings table
ALTER TABLE public.business_settings
ADD COLUMN IF NOT EXISTS default_email_subject TEXT DEFAULT 'Invoice {invoice_number}',
ADD COLUMN IF NOT EXISTS default_email_message TEXT DEFAULT 'Please find attached your invoice. If you have any questions, feel free to reach out.',
ADD COLUMN IF NOT EXISTS email_signature TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.business_settings.default_email_subject IS 'Default subject line for invoice emails. Use {invoice_number} as placeholder.';
COMMENT ON COLUMN public.business_settings.default_email_message IS 'Default message body for invoice emails.';
COMMENT ON COLUMN public.business_settings.email_signature IS 'Email signature to append to invoice emails.';
