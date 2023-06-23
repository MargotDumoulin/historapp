export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          created_at: string | null
          document: number[] | null
          id: number
          id_owner: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          document?: number[] | null
          id?: number
          id_owner: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          document?: number[] | null
          id?: number
          id_owner?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_id_owner_fkey"
            columns: ["id_owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_id_owner_fkey"
            columns: ["id_owner"]
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          }
        ]
      }
      documents_invitations: {
        Row: {
          accepted: boolean | null
          id: string
          id_document: number
          id_role: number
          id_user: string
        }
        Insert: {
          accepted?: boolean | null
          id?: string
          id_document: number
          id_role: number
          id_user: string
        }
        Update: {
          accepted?: boolean | null
          id?: string
          id_document?: number
          id_role?: number
          id_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_invitations_id_document_fkey"
            columns: ["id_document"]
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_invitations_id_document_fkey"
            columns: ["id_document"]
            referencedRelation: "authorized_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_invitations_id_document_fkey"
            columns: ["id_document"]
            referencedRelation: "document_and_role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_invitations_id_role_fkey"
            columns: ["id_role"]
            referencedRelation: "documents_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_invitations_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_invitations_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          }
        ]
      }
      documents_roles: {
        Row: {
          edit: boolean | null
          id: number
          name: string
          read: boolean | null
        }
        Insert: {
          edit?: boolean | null
          id?: number
          name?: string
          read?: boolean | null
        }
        Update: {
          edit?: boolean | null
          id?: number
          name?: string
          read?: boolean | null
        }
        Relationships: []
      }
      documents_security: {
        Row: {
          id_document: number
          id_role: number
          id_user: string
        }
        Insert: {
          id_document: number
          id_role: number
          id_user: string
        }
        Update: {
          id_document?: number
          id_role?: number
          id_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_security_id_document_fkey"
            columns: ["id_document"]
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_document_fkey"
            columns: ["id_document"]
            referencedRelation: "authorized_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_document_fkey"
            columns: ["id_document"]
            referencedRelation: "document_and_role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_role_fkey"
            columns: ["id_role"]
            referencedRelation: "documents_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
          uuid_auth_user: string
        }
        Insert: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          uuid_auth_user: string
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          uuid_auth_user?: string
        }
        Relationships: []
      }
    }
    Views: {
      auth_users: {
        Row: {
          aud: string | null
          banned_until: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          email_change: string | null
          email_change_confirm_status: number | null
          email_change_sent_at: string | null
          email_change_token_current: string | null
          email_change_token_new: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          id: string | null
          instance_id: string | null
          invited_at: string | null
          is_sso_user: boolean | null
          is_super_admin: boolean | null
          last_sign_in_at: string | null
          phone: string | null
          phone_change: string | null
          phone_change_sent_at: string | null
          phone_change_token: string | null
          phone_confirmed_at: string | null
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
          reauthentication_sent_at: string | null
          reauthentication_token: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string | null
          instance_id?: string | null
          invited_at?: string | null
          is_sso_user?: boolean | null
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string | null
          instance_id?: string | null
          invited_at?: string | null
          is_sso_user?: boolean | null
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      authorized_documents: {
        Row: {
          created_at: string | null
          document: number[] | null
          edit: boolean | null
          id: number | null
          id_owner: string | null
          id_user: string | null
          name: string | null
          read: boolean | null
          role_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_id_owner_fkey"
            columns: ["id_owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_id_owner_fkey"
            columns: ["id_owner"]
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          }
        ]
      }
      document_and_role: {
        Row: {
          created_at: string | null
          document: number[] | null
          edit: boolean | null
          id: number | null
          id_owner: string | null
          id_user: string | null
          name: string | null
          read: boolean | null
          role_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_id_owner_fkey"
            columns: ["id_owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_id_owner_fkey"
            columns: ["id_owner"]
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_security_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
