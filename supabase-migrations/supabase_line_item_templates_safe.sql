-- Create line_item_templates table (safe version)
-- This script can be run multiple times without errors

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own templates" ON line_item_templates;
DROP POLICY IF EXISTS "Users can create their own templates" ON line_item_templates;
DROP POLICY IF EXISTS "Users can update their own templates" ON line_item_templates;
DROP POLICY IF EXISTS "Users can delete their own templates" ON line_item_templates;

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS line_item_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  rate DECIMAL(10, 2) NOT NULL DEFAULT 0,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE line_item_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own templates"
  ON line_item_templates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates"
  ON line_item_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
  ON line_item_templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON line_item_templates FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries (drop first if exists)
DROP INDEX IF EXISTS line_item_templates_user_id_idx;
CREATE INDEX line_item_templates_user_id_idx ON line_item_templates(user_id);
