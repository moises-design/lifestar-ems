-- Long Distance Transport Requests
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS long_distance_requests (
  id               BIGSERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  phone            TEXT,
  email            TEXT NOT NULL,
  pickup_city      TEXT DEFAULT 'McAllen/RGV',
  destination_city TEXT,
  travel_date      DATE,
  patient_needs    TEXT,
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE long_distance_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert"
  ON long_distance_requests FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read"
  ON long_distance_requests FOR SELECT TO authenticated
  USING (true);
