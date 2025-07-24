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
      companies: {
        Row: {
          id: string // UUID
          name: string
          logo_url: string | null
          created_at: string // timestamptz
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          created_at?: string
        }
      }
      jobs: {
        Row: {
          id: string // UUID
          user_id: string // FK to users.id
          company_id: string // FK to companies.id
          title: string
          description: string
          location: string
          type: 'Full-Time' | 'Part-Time' | 'Contract'
          status: 'active' | 'inactive'
          created_at: string // timestamptz
        }
        Insert: {
          id?: string
          user_id: string
          company_id: string
          title: string
          description: string
          location: string
          type: 'Full-Time' | 'Part-Time' | 'Contract'
          status?: 'active' | 'inactive'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_id?: string
          title?: string
          description?: string
          location?: string
          type?: 'Full-Time' | 'Part-Time' | 'Contract'
          status?: 'active' | 'inactive'
          created_at?: string
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Company = Database['public']['Tables']['companies']['Row']
export type CompanyInsert = Database['public']['Tables']['companies']['Insert']
export type CompanyUpdate = Database['public']['Tables']['companies']['Update']

export type Job = Database['public']['Tables']['jobs']['Row']
export type JobInsert = Database['public']['Tables']['jobs']['Insert']
export type JobUpdate = Database['public']['Tables']['jobs']['Update']
