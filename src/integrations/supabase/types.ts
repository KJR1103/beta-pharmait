export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      invoices: {
        Row: {
          id: string
          invoice_number: string
          issued_at: string
          order_id: string
          total: number
        }
        Insert: {
          id?: string
          invoice_number?: string
          issued_at?: string
          order_id: string
          total: number
        }
        Update: {
          id?: string
          invoice_number?: string
          issued_at?: string
          order_id?: string
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          subtotal: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string
          product_name?: string
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          city: string
          courier_id: string | null
          created_at: string
          customer_id: string
          delivery_address: string
          delivery_fee: number
          id: string
          notes: string | null
          order_number: string
          paid: boolean
          payment_method: string
          pharmacy_id: string
          phone: string
          prescription_url: string | null
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          updated_at: string
        }
        Insert: {
          city: string
          courier_id?: string | null
          created_at?: string
          customer_id: string
          delivery_address: string
          delivery_fee?: number
          id?: string
          notes?: string | null
          order_number?: string
          paid?: boolean
          payment_method: string
          pharmacy_id: string
          phone: string
          prescription_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Update: {
          city?: string
          courier_id?: string | null
          created_at?: string
          customer_id?: string
          delivery_address?: string
          delivery_fee?: number
          id?: string
          notes?: string | null
          order_number?: string
          paid?: boolean
          payment_method?: string
          pharmacy_id?: string
          phone?: string
          prescription_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies_public"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacies: {
        Row: {
          active: boolean
          address: string
          agrement_doc_url: string | null
          agrement_number: string
          city: string
          created_at: string
          description: string | null
          email: string | null
          id: string
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          opening_hours: string | null
          owner_id: string
          phone: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          active?: boolean
          address: string
          agrement_doc_url?: string | null
          agrement_number: string
          city: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          opening_hours?: string | null
          owner_id: string
          phone: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          active?: boolean
          address?: string
          agrement_doc_url?: string | null
          agrement_number?: string
          city?: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          opening_hours?: string | null
          owner_id?: string
          phone?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean
          category: string | null
          composition: string | null
          contraindications: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          indications: string | null
          name: string
          pharmacy_id: string
          posology: string | null
          price: number
          requires_prescription: boolean
          stock: number
          storage: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          composition?: string | null
          contraindications?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          indications?: string | null
          name: string
          pharmacy_id: string
          posology?: string | null
          price: number
          requires_prescription?: boolean
          stock?: number
          storage?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string | null
          composition?: string | null
          contraindications?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          indications?: string | null
          name?: string
          pharmacy_id?: string
          posology?: string | null
          price?: number
          requires_prescription?: boolean
          stock?: number
          storage?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies_public"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      pharmacies_public: {
        Row: {
          active: boolean | null
          address: string | null
          city: string | null
          created_at: string | null
          description: string | null
          id: string | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string | null
          opening_hours: string | null
          verified: boolean | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string | null
          opening_hours?: string | null
          verified?: boolean | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string | null
          opening_hours?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "pharmacy" | "courier" | "admin"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready"
        | "in_delivery"
        | "delivered"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "pharmacy", "courier", "admin"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "in_delivery",
        "delivered",
        "cancelled",
      ],
    },
  },
} as const
