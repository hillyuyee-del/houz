-- AetherHouz Database Schema
-- Run this in Supabase SQL Editor: https://ndhxnuycgkumrrkxbyrw.supabase.co → SQL Editor

-- ── PROFILES ──
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'curator', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── IMAGES ──
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  thumb_url TEXT,
  alt_text TEXT,
  width INT,
  height INT,
  source TEXT CHECK (source IN ('pexels', 'unsplash', 'user', 'ai')),
  source_url TEXT,
  photographer TEXT,
  avg_color TEXT,
  tags TEXT[],
  is_curated BOOLEAN DEFAULT FALSE,
  curated_by UUID REFERENCES profiles(id),
  curation_score REAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_images_tags ON images USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_images_curated ON images(is_curated) WHERE is_curated = TRUE;

-- ── STYLES ──
CREATE TABLE IF NOT EXISTS styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  origin TEXT,
  description TEXT,
  cover_image_url TEXT,
  color_palette TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── STYLE IMAGES ──
CREATE TABLE IF NOT EXISTS style_images (
  style_id UUID REFERENCES styles(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (style_id, image_id)
);

-- ── HOTELS ──
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  location TEXT,
  style_label TEXT,
  description TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── HOTEL IMAGES ──
CREATE TABLE IF NOT EXISTS hotel_images (
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  room_type TEXT,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (hotel_id, image_id)
);

-- ── COLOR PALETTES ──
CREATE TABLE IF NOT EXISTS color_palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  mood TEXT,
  description TEXT,
  colors TEXT[] NOT NULL,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── PALETTE IMAGES ──
CREATE TABLE IF NOT EXISTS palette_images (
  palette_id UUID REFERENCES color_palettes(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (palette_id, image_id)
);

-- ── BOARDS ──
CREATE TABLE IF NOT EXISTS boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_boards_user ON boards(user_id);

-- ── BOARD ITEMS ──
CREATE TABLE IF NOT EXISTS board_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE NOT NULL,
  image_id UUID REFERENCES images(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  note TEXT,
  sort_order INT DEFAULT 0,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(board_id, image_url)
);
CREATE INDEX IF NOT EXISTS idx_board_items_board ON board_items(board_id);

-- ── AI ANALYSES ──
CREATE TABLE IF NOT EXISTS ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  room_type TEXT,
  analysis_result JSONB NOT NULL,
  traffic_flow JSONB,
  furniture_suggestions JSONB,
  style_suggestions JSONB,
  model_used TEXT,
  processing_time_ms INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_user ON ai_analyses(user_id);

-- ── RLS POLICIES ──
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE style_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE palette_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Public profiles" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Images
CREATE POLICY "Public curated images" ON images FOR SELECT USING (is_curated = TRUE);
CREATE POLICY "Own images" ON images FOR ALL USING (auth.uid() = curated_by);

-- Content tables (public read)
CREATE POLICY "Public styles" ON styles FOR SELECT USING (TRUE);
CREATE POLICY "Public style images" ON style_images FOR SELECT USING (TRUE);
CREATE POLICY "Public hotels" ON hotels FOR SELECT USING (TRUE);
CREATE POLICY "Public hotel images" ON hotel_images FOR SELECT USING (TRUE);
CREATE POLICY "Public palettes" ON color_palettes FOR SELECT USING (TRUE);
CREATE POLICY "Public palette images" ON palette_images FOR SELECT USING (TRUE);

-- Boards
CREATE POLICY "CRUD own boards" ON boards FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "View public boards" ON boards FOR SELECT USING (is_public = TRUE);

-- Board items
CREATE POLICY "Items via board ownership" ON board_items FOR ALL USING (
  EXISTS (SELECT 1 FROM boards WHERE id = board_id AND user_id = auth.uid())
);

-- AI analyses
CREATE POLICY "CRUD own analyses" ON ai_analyses FOR ALL USING (auth.uid() = user_id);
