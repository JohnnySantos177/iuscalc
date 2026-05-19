export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      calculos: {
        Row: {
          calculo_id: string
          created_at: string | null
          detalhes: Json | null
          tipo_calculo: string
          updated_at: string | null
          user_id: string | null
          valor_calculo: number
        }
        Insert: {
          calculo_id?: string
          created_at?: string | null
          detalhes?: Json | null
          tipo_calculo: string
          updated_at?: string | null
          user_id?: string | null
          valor_calculo: number
        }
        Update: {
          calculo_id?: string
          created_at?: string | null
          detalhes?: Json | null
          tipo_calculo?: string
          updated_at?: string | null
          user_id?: string | null
          valor_calculo?: number
        }
        Relationships: [
          {
            foreignKeyName: "calculos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["user_id"]
          },
        ]
      }
      calculos_salvos: {
        Row: {
          adicionais: Json
          created_at: string
          dados_contrato: Json | null
          id: string
          nome: string
          resultados: string | null
          timestamp: string
          total_geral: number
          updated_at: string
          user_id: string
          verbas_rescisorias: Json
        }
        Insert: {
          adicionais: Json
          created_at?: string
          dados_contrato?: Json | null
          id?: string
          nome: string
          resultados?: string | null
          timestamp?: string
          total_geral: number
          updated_at?: string
          user_id: string
          verbas_rescisorias: Json
        }
        Update: {
          adicionais?: Json
          created_at?: string
          dados_contrato?: Json | null
          id?: string
          nome?: string
          resultados?: string | null
          timestamp?: string
          total_geral?: number
          updated_at?: string
          user_id?: string
          verbas_rescisorias?: Json
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          created_at: string | null
          post_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          can_view_panels: boolean | null
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          is_premium: boolean | null
          is_super_admin: boolean | null
          logo_url: string | null
          nome: string | null
          nome_escritorio: string | null
          tipo_plano: string | null
          tipo_usuario: string | null
          trial_end_date: string | null
          updated_at: string | null
        }
        Insert: {
          can_view_panels?: boolean | null
          created_at?: string | null
          email?: string | null
          id: string
          is_admin?: boolean | null
          is_premium?: boolean | null
          is_super_admin?: boolean | null
          logo_url?: string | null
          nome?: string | null
          nome_escritorio?: string | null
          tipo_plano?: string | null
          tipo_usuario?: string | null
          trial_end_date?: string | null
          updated_at?: string | null
        }
        Update: {
          can_view_panels?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          is_premium?: boolean | null
          is_super_admin?: boolean | null
          logo_url?: string | null
          nome?: string | null
          nome_escritorio?: string | null
          tipo_plano?: string | null
          tipo_usuario?: string | null
          trial_end_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          plan_name: string | null
          price_id: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_name?: string | null
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_name?: string | null
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          password: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          password: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          password?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      all_profiles: {
        Row: {
          can_view_panels: boolean | null
          created_at: string | null
          email: string | null
          id: string | null
          is_admin: boolean | null
          is_premium: boolean | null
          logo_url: string | null
          nome: string | null
          tipo_plano: string | null
          tipo_usuario: string | null
          updated_at: string | null
        }
        Insert: {
          can_view_panels?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          is_admin?: boolean | null
          is_premium?: boolean | null
          logo_url?: string | null
          nome?: string | null
          tipo_plano?: string | null
          tipo_usuario?: string | null
          updated_at?: string | null
        }
        Update: {
          can_view_panels?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          is_admin?: boolean | null
          is_premium?: boolean | null
          logo_url?: string | null
          nome?: string | null
          tipo_plano?: string | null
          tipo_usuario?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_all_profiles: {
        Args: Record<PropertyKey, never>
        Returns: {
          can_view_panels: boolean | null
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          is_premium: boolean | null
          is_super_admin: boolean | null
          logo_url: string | null
          nome: string | null
          tipo_plano: string | null
          tipo_usuario: string | null
          updated_at: string | null
        }[]
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
