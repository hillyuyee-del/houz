// Supabase Database types — extend as tables are created
// Generated placeholder; replace with `npx supabase gen types typescript` output

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          bio: string | null;
          role: "user" | "curator" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          role?: "user" | "curator" | "admin";
        };
        Update: {
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          role?: "user" | "curator" | "admin";
          updated_at?: string;
        };
      };
      images: {
        Row: {
          id: string;
          url: string;
          thumb_url: string | null;
          alt_text: string | null;
          width: number | null;
          height: number | null;
          source: "pexels" | "unsplash" | "user" | "ai";
          source_url: string | null;
          photographer: string | null;
          avg_color: string | null;
          tags: string[] | null;
          is_curated: boolean;
          curated_by: string | null;
          curation_score: number;
          created_at: string;
        };
        Insert: {
          url: string;
          thumb_url?: string | null;
          alt_text?: string | null;
          width?: number | null;
          height?: number | null;
          source?: "pexels" | "unsplash" | "user" | "ai";
          source_url?: string | null;
          photographer?: string | null;
          avg_color?: string | null;
          tags?: string[] | null;
          is_curated?: boolean;
          curated_by?: string | null;
        };
        Update: {
          tags?: string[] | null;
          is_curated?: boolean;
          curation_score?: number;
        };
      };
      boards: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          cover_image_url: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          description?: string | null;
          cover_image_url?: string | null;
          is_public?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          cover_image_url?: string | null;
          is_public?: boolean;
          updated_at?: string;
        };
      };
      board_items: {
        Row: {
          id: string;
          board_id: string;
          image_id: string | null;
          image_url: string;
          note: string | null;
          sort_order: number;
          added_at: string;
        };
        Insert: {
          board_id: string;
          image_id?: string | null;
          image_url: string;
          note?: string | null;
          sort_order?: number;
        };
        Update: {
          note?: string | null;
          sort_order?: number;
        };
      };
      ai_analyses: {
        Row: {
          id: string;
          user_id: string;
          image_url: string;
          thumbnail_url: string | null;
          room_type: string | null;
          analysis_result: Json;
          traffic_flow: Json | null;
          furniture_suggestions: Json | null;
          style_suggestions: Json | null;
          model_used: string | null;
          processing_time_ms: number | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          image_url: string;
          thumbnail_url?: string | null;
          room_type?: string | null;
          analysis_result: Json;
          traffic_flow?: Json | null;
          furniture_suggestions?: Json | null;
          style_suggestions?: Json | null;
          model_used?: string | null;
          processing_time_ms?: number | null;
        };
        Update: {};
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
