export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      contact_inquiries: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          company: string | null;
          role: string | null;
          track: string | null;
          budget: string | null;
          timeline: string | null;
          message: string | null;
          status: "pending" | "reviewed" | "contacted" | "archived";
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          company?: string | null;
          role?: string | null;
          track?: string | null;
          budget?: string | null;
          timeline?: string | null;
          message?: string | null;
          status?: "pending" | "reviewed" | "contacted" | "archived";
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          company?: string | null;
          role?: string | null;
          track?: string | null;
          budget?: string | null;
          timeline?: string | null;
          message?: string | null;
          status?: "pending" | "reviewed" | "contacted" | "archived";
          metadata?: Json | null;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          source: string | null;
          status: "active" | "unsubscribed";
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          source?: string | null;
          status?: "active" | "unsubscribed";
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          source?: string | null;
          status?: "active" | "unsubscribed";
          metadata?: Json | null;
        };
      };
      program_applications: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          program_slug: string;
          program_title: string;
          experience_level: string | null;
          goal: string | null;
          status: "submitted" | "under_review" | "accepted" | "waitlisted" | "rejected";
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          program_slug: string;
          program_title: string;
          experience_level?: string | null;
          goal?: string | null;
          status?: "submitted" | "under_review" | "accepted" | "waitlisted" | "rejected";
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          program_slug?: string;
          program_title?: string;
          experience_level?: string | null;
          goal?: string | null;
          status?: "submitted" | "under_review" | "accepted" | "waitlisted" | "rejected";
          metadata?: Json | null;
        };
      };
      case_studies: {
        Row: {
          id: string;
          created_at: string;
          tag: string;
          category: string;
          category_label: string;
          client: string;
          industry: string;
          problem: string;
          solution: string;
          technology: string[];
          implementation: string;
          results: Json;
          testimonial: Json | null;
          featured: boolean;
          status: "draft" | "published";
        };
        Insert: {
          id?: string;
          created_at?: string;
          tag: string;
          category: string;
          category_label: string;
          client: string;
          industry: string;
          problem: string;
          solution: string;
          technology: string[];
          implementation: string;
          results: Json;
          testimonial?: Json | null;
          featured?: boolean;
          status?: "draft" | "published";
        };
        Update: {
          id?: string;
          created_at?: string;
          tag?: string;
          category?: string;
          category_label?: string;
          client?: string;
          industry?: string;
          problem?: string;
          solution?: string;
          technology?: string[];
          implementation?: string;
          results?: Json;
          testimonial?: Json | null;
          featured?: boolean;
          status?: "draft" | "published";
        };
      };
      blogs: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          category: string;
          tags: string[];
          author_name: string;
          author_role: string;
          author_avatar: string | null;
          cover_image: string | null;
          read_time: string;
          featured: boolean;
          status: "draft" | "published";
          views: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          category: string;
          tags?: string[];
          author_name: string;
          author_role: string;
          author_avatar?: string | null;
          cover_image?: string | null;
          read_time?: string;
          featured?: boolean;
          status?: "draft" | "published";
          views?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          category?: string;
          tags?: string[];
          author_name?: string;
          author_role?: string;
          author_avatar?: string | null;
          cover_image?: string | null;
          read_time?: string;
          featured?: boolean;
          status?: "draft" | "published";
          views?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
