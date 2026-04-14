-- ============================================
-- Life Star EMS — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================

-- Create the contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  read        BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (submit the form)
CREATE POLICY "Allow public insert"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only allow authenticated users (you) to SELECT/view submissions
CREATE POLICY "Allow authenticated read"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to mark as read
CREATE POLICY "Allow authenticated update"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================
-- Verify: after running, check the table
-- SELECT * FROM contact_submissions;
-- ============================================
