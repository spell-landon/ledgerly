-- Add return/refund tracking to expenses table
-- Run this in your Supabase SQL Editor

-- Add new columns
ALTER TABLE expenses
ADD COLUMN IF NOT EXISTS is_return BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS original_expense_id UUID REFERENCES expenses(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add comments for documentation
COMMENT ON COLUMN expenses.is_return IS 'Whether this expense is a return/refund';
COMMENT ON COLUMN expenses.original_expense_id IS 'Links to the original expense if this is a return';
COMMENT ON COLUMN expenses.notes IS 'Additional notes about the expense';

-- Create index for faster queries on linked expenses
CREATE INDEX IF NOT EXISTS idx_expenses_original_expense_id ON expenses(original_expense_id);
CREATE INDEX IF NOT EXISTS idx_expenses_is_return ON expenses(is_return);

-- No RLS policy changes needed - expenses already scoped to user_id
