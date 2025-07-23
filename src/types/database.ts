export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string // UUID from Supabase Auth
          created_at: string // timestamptz
          email: string
        }
        Insert: {
          id: string
          created_at?: string
          email: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']
