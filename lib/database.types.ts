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
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          assigned_to: string | null
          closed_at: string | null
          company_id: string
          created_at: string
          description: string | null
          entity_id: string | null
          entity_table: string | null
          id: string
          severity: string
          status: string
          title: string
          type: string
        }
        Insert: {
          assigned_to?: string | null
          closed_at?: string | null
          company_id: string
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          severity?: string
          status?: string
          title: string
          type: string
        }
        Update: {
          assigned_to?: string | null
          closed_at?: string | null
          company_id?: string
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          severity?: string
          status?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      app_modules: {
        Row: {
          key: string
          name: string
          order_index: number
        }
        Insert: {
          key: string
          name: string
          order_index?: number
        }
        Update: {
          key?: string
          name?: string
          order_index?: number
        }
        Relationships: []
      }
      approval_steps: {
        Row: {
          approver_role_id: string | null
          approver_user_id: string | null
          comment: string | null
          company_id: string
          created_at: string
          decided_at: string | null
          entity_id: string
          entity_table: string
          id: string
          status: string
          step_order: number
        }
        Insert: {
          approver_role_id?: string | null
          approver_user_id?: string | null
          comment?: string | null
          company_id: string
          created_at?: string
          decided_at?: string | null
          entity_id: string
          entity_table: string
          id?: string
          status?: string
          step_order?: number
        }
        Update: {
          approver_role_id?: string | null
          approver_user_id?: string | null
          comment?: string | null
          company_id?: string
          created_at?: string
          decided_at?: string | null
          entity_id?: string
          entity_table?: string
          id?: string
          status?: string
          step_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "approval_steps_approver_role_id_fkey"
            columns: ["approver_role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_steps_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          after_data: Json | null
          before_data: Json | null
          company_id: string | null
          created_at: string
          entity_id: string | null
          entity_table: string | null
          id: string
          module: string | null
          reason: string | null
          risk_level: string
          user_id: string | null
        }
        Insert: {
          action: string
          after_data?: Json | null
          before_data?: Json | null
          company_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          module?: string | null
          reason?: string | null
          risk_level?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          after_data?: Json | null
          before_data?: Json | null
          company_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          module?: string | null
          reason?: string | null
          risk_level?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      client_categories: {
        Row: {
          company_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          category_id: string | null
          city: string | null
          client_type: string
          code: string | null
          company_id: string
          contact_name: string | null
          created_at: string
          created_by: string | null
          custom_fields: Json
          email: string | null
          id: string
          loyalty_level: string | null
          name: string
          notes: string | null
          phone: string | null
          relationship_start_date: string | null
          risk_level: string
          sales_rep_id: string | null
          sector_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          category_id?: string | null
          city?: string | null
          client_type?: string
          code?: string | null
          company_id: string
          contact_name?: string | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          email?: string | null
          id?: string
          loyalty_level?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          relationship_start_date?: string | null
          risk_level?: string
          sales_rep_id?: string | null
          sector_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          category_id?: string | null
          city?: string | null
          client_type?: string
          code?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          email?: string | null
          id?: string
          loyalty_level?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          relationship_start_date?: string | null
          risk_level?: string
          sales_rep_id?: string | null
          sector_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "client_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          body: string
          company_id: string
          created_at: string
          entity_id: string
          entity_table: string
          id: string
          mentions: string[]
        }
        Insert: {
          author_id: string
          body: string
          company_id: string
          created_at?: string
          entity_id: string
          entity_table: string
          id?: string
          mentions?: string[]
        }
        Update: {
          author_id?: string
          body?: string
          company_id?: string
          created_at?: string
          entity_id?: string
          entity_table?: string
          id?: string
          mentions?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "comments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          activity_description: string | null
          address: string | null
          city: string | null
          contacts: Json
          country: string | null
          created_at: string
          created_by: string | null
          currency: string
          employees_count_declared: number | null
          fiscal_year_start_month: number
          founded_date: string | null
          id: string
          language: string
          legal_form: string | null
          logo_url: string | null
          name: string
          sites_count_declared: number | null
          size_estimate: string | null
          status: string
          timezone: string
          trade_name: string | null
          updated_at: string
        }
        Insert: {
          activity_description?: string | null
          address?: string | null
          city?: string | null
          contacts?: Json
          country?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          employees_count_declared?: number | null
          fiscal_year_start_month?: number
          founded_date?: string | null
          id?: string
          language?: string
          legal_form?: string | null
          logo_url?: string | null
          name: string
          sites_count_declared?: number | null
          size_estimate?: string | null
          status?: string
          timezone?: string
          trade_name?: string | null
          updated_at?: string
        }
        Update: {
          activity_description?: string | null
          address?: string | null
          city?: string | null
          contacts?: Json
          country?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          employees_count_declared?: number | null
          fiscal_year_start_month?: number
          founded_date?: string | null
          id?: string
          language?: string
          legal_form?: string | null
          logo_url?: string | null
          name?: string
          sites_count_declared?: number | null
          size_estimate?: string | null
          status?: string
          timezone?: string
          trade_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      company_diagnostics: {
        Row: {
          answers: Json
          company_id: string
          completed_at: string | null
          created_at: string
          id: string
          recommended_modules: string[]
          status: string
          updated_at: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          answers?: Json
          company_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          recommended_modules?: string[]
          status?: string
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          answers?: Json
          company_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          recommended_modules?: string[]
          status?: string
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_diagnostics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_model_selections: {
        Row: {
          company_id: string
          created_at: string
          customizations: Json
          id: string
          process_key: string
          status: string
          submitted_by: string | null
          template_id: string | null
          updated_at: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          customizations?: Json
          id?: string
          process_key: string
          status?: string
          submitted_by?: string | null
          template_id?: string | null
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          customizations?: Json
          id?: string
          process_key?: string
          status?: string
          submitted_by?: string | null
          template_id?: string | null
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_model_selections_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_model_selections_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "model_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      company_sectors: {
        Row: {
          company_id: string
          is_primary: boolean
          sector_id: string
        }
        Insert: {
          company_id: string
          is_primary?: boolean
          sector_id: string
        }
        Update: {
          company_id?: string
          is_primary?: boolean
          sector_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_sectors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_sectors_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      company_users: {
        Row: {
          company_id: string
          id: string
          invited_by: string | null
          joined_at: string
          org_unit_id: string | null
          role_id: string
          scope_level: string
          site_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          company_id: string
          id?: string
          invited_by?: string | null
          joined_at?: string
          org_unit_id?: string | null
          role_id: string
          scope_level?: string
          site_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          company_id?: string
          id?: string
          invited_by?: string | null
          joined_at?: string
          org_unit_id?: string | null
          role_id?: string
          scope_level?: string
          site_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_users_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_users_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_users_user_id_profiles_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          assigned_to: string | null
          client_id: string | null
          closed_at: string | null
          company_id: string
          created_at: string
          deadline: string | null
          id: string
          priority: string
          response: string | null
          root_cause: string | null
          status: string
          subject: string
        }
        Insert: {
          assigned_to?: string | null
          client_id?: string | null
          closed_at?: string | null
          company_id: string
          created_at?: string
          deadline?: string | null
          id?: string
          priority?: string
          response?: string | null
          root_cause?: string | null
          status?: string
          subject: string
        }
        Update: {
          assigned_to?: string | null
          client_id?: string | null
          closed_at?: string | null
          company_id?: string
          created_at?: string
          deadline?: string | null
          id?: string
          priority?: string
          response?: string | null
          root_cause?: string | null
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_records: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          data: Json
          deleted_at: string | null
          entity_id: string
          id: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          data?: Json
          deleted_at?: string | null
          entity_id: string
          id?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          data?: Json
          deleted_at?: string | null
          entity_id?: string
          id?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_records_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_records_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entity_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboards: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          key: string
          layout: Json
          name: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          key: string
          layout?: Json
          name: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          key?: string
          layout?: Json
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dashboards_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      document_versions: {
        Row: {
          created_at: string
          document_id: string
          file_name: string
          file_path: string
          id: string
          replaced_by: string | null
          version: number
        }
        Insert: {
          created_at?: string
          document_id: string
          file_name: string
          file_path: string
          id?: string
          replaced_by?: string | null
          version: number
        }
        Update: {
          created_at?: string
          document_id?: string
          file_name?: string
          file_path?: string
          id?: string
          replaced_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          company_id: string
          confidentiality: string
          created_at: string
          entity_id: string
          entity_table: string
          expires_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_by: string | null
          version: number
        }
        Insert: {
          category?: string | null
          company_id: string
          confidentiality?: string
          created_at?: string
          entity_id: string
          entity_table: string
          expires_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
          version?: number
        }
        Update: {
          category?: string | null
          company_id?: string
          confidentiality?: string
          created_at?: string
          entity_id?: string
          entity_table?: string
          expires_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_assignment_history: {
        Row: {
          created_at: string
          created_by: string | null
          effective_date: string
          employee_id: string
          id: string
          org_unit_id: string | null
          position_id: string | null
          reason: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          effective_date: string
          employee_id: string
          id?: string
          org_unit_id?: string | null
          position_id?: string | null
          reason?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          effective_date?: string
          employee_id?: string
          id?: string
          org_unit_id?: string | null
          position_id?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_assignment_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignment_history_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_assignment_history_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: string | null
          base_salary: number | null
          birth_date: string | null
          commission_rule: Json
          company_id: string
          company_user_id: string | null
          contract_type: string | null
          created_at: string
          created_by: string | null
          custom_fields: Json
          departure_date: string | null
          email: string | null
          first_name: string
          function_title: string | null
          gender: string | null
          hire_date: string | null
          id: string
          last_name: string
          manager_company_user_id: string | null
          matricule: string | null
          org_unit_id: string | null
          phone: string | null
          position_id: string | null
          site_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          base_salary?: number | null
          birth_date?: string | null
          commission_rule?: Json
          company_id: string
          company_user_id?: string | null
          contract_type?: string | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          departure_date?: string | null
          email?: string | null
          first_name: string
          function_title?: string | null
          gender?: string | null
          hire_date?: string | null
          id?: string
          last_name: string
          manager_company_user_id?: string | null
          matricule?: string | null
          org_unit_id?: string | null
          phone?: string | null
          position_id?: string | null
          site_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          base_salary?: number | null
          birth_date?: string | null
          commission_rule?: Json
          company_id?: string
          company_user_id?: string | null
          contract_type?: string | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          departure_date?: string | null
          email?: string | null
          first_name?: string
          function_title?: string | null
          gender?: string | null
          hire_date?: string | null
          id?: string
          last_name?: string
          manager_company_user_id?: string | null
          matricule?: string | null
          org_unit_id?: string | null
          phone?: string | null
          position_id?: string | null
          site_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_company_user_id_fkey"
            columns: ["company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_manager_company_user_id_fkey"
            columns: ["manager_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_definitions: {
        Row: {
          code: string | null
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          key: string
          module_key: string | null
          name: string
          plural_name: string
          process_id: string | null
          responsible_company_user_id: string | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          key: string
          module_key?: string | null
          name: string
          plural_name: string
          process_id?: string | null
          responsible_company_user_id?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          key?: string
          module_key?: string | null
          name?: string
          plural_name?: string
          process_id?: string | null
          responsible_company_user_id?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_definitions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_definitions_module_key_fkey"
            columns: ["module_key"]
            isOneToOne: false
            referencedRelation: "app_modules"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "entity_definitions_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_definitions_responsible_company_user_id_fkey"
            columns: ["responsible_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_relations: {
        Row: {
          company_id: string
          created_at: string
          field_key: string
          from_entity_id: string
          id: string
          relation_type: string
          to_entity_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          field_key: string
          from_entity_id: string
          id?: string
          relation_type?: string
          to_entity_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          field_key?: string
          from_entity_id?: string
          id?: string
          relation_type?: string
          to_entity_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_relations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relations_from_entity_id_fkey"
            columns: ["from_entity_id"]
            isOneToOne: false
            referencedRelation: "entity_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relations_to_entity_id_fkey"
            columns: ["to_entity_id"]
            isOneToOne: false
            referencedRelation: "entity_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          company_id: string
          created_at: string
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          beneficiary: string | null
          category_id: string | null
          company_id: string
          created_at: string
          created_by: string | null
          custom_fields: Json
          expense_date: string
          id: string
          justification_document_id: string | null
          notes: string | null
          org_unit_id: string | null
          payment_method: string | null
          project_id: string | null
          reference: string
          related_sale_id: string | null
          sales_rep_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          beneficiary?: string | null
          category_id?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          expense_date?: string
          id?: string
          justification_document_id?: string | null
          notes?: string | null
          org_unit_id?: string | null
          payment_method?: string | null
          project_id?: string | null
          reference: string
          related_sale_id?: string | null
          sales_rep_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          beneficiary?: string | null
          category_id?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          expense_date?: string
          id?: string
          justification_document_id?: string | null
          notes?: string | null
          org_unit_id?: string | null
          payment_method?: string | null
          project_id?: string | null
          reference?: string
          related_sale_id?: string | null
          sales_rep_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_project_fk"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_related_sale_id_fkey"
            columns: ["related_sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      field_definitions: {
        Row: {
          created_at: string
          default_value: Json | null
          entity_id: string
          field_type: Database["public"]["Enums"]["field_type"]
          help_text: string | null
          id: string
          is_required: boolean
          is_unique: boolean
          key: string
          label: string
          options: Json
          order_index: number
          section: string | null
          status: string
          updated_at: string
          validation: Json
        }
        Insert: {
          created_at?: string
          default_value?: Json | null
          entity_id: string
          field_type: Database["public"]["Enums"]["field_type"]
          help_text?: string | null
          id?: string
          is_required?: boolean
          is_unique?: boolean
          key: string
          label: string
          options?: Json
          order_index?: number
          section?: string | null
          status?: string
          updated_at?: string
          validation?: Json
        }
        Update: {
          created_at?: string
          default_value?: Json | null
          entity_id?: string
          field_type?: Database["public"]["Enums"]["field_type"]
          help_text?: string | null
          id?: string
          is_required?: boolean
          is_unique?: boolean
          key?: string
          label?: string
          options?: Json
          order_index?: number
          section?: string | null
          status?: string
          updated_at?: string
          validation?: Json
        }
        Relationships: [
          {
            foreignKeyName: "field_definitions_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entity_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      forecast_actuals_manual: {
        Row: {
          actual_value: number
          forecast_id: string
          id: string
          recorded_at: string
          recorded_by: string | null
        }
        Insert: {
          actual_value: number
          forecast_id: string
          id?: string
          recorded_at?: string
          recorded_by?: string | null
        }
        Update: {
          actual_value?: number
          forecast_id?: string
          id?: string
          recorded_at?: string
          recorded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forecast_actuals_manual_forecast_id_fkey"
            columns: ["forecast_id"]
            isOneToOne: false
            referencedRelation: "forecasts"
            referencedColumns: ["id"]
          },
        ]
      }
      forecasts: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          period_end: string
          period_start: string
          period_type: string
          scope_id: string | null
          scope_type: string
          subject: string
          target_value: number
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          period_end: string
          period_start: string
          period_type?: string
          scope_id?: string | null
          scope_type?: string
          subject: string
          target_value: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          period_end?: string
          period_start?: string
          period_type?: string
          scope_id?: string | null
          scope_type?: string
          subject?: string
          target_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forecasts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      import_jobs: {
        Row: {
          column_mapping: Json
          company_id: string
          completed_at: string | null
          created_at: string
          created_by: string | null
          entity_key: string
          error_report: Json
          error_rows: number
          file_name: string
          id: string
          status: string
          success_rows: number
          total_rows: number
          undone_at: string | null
        }
        Insert: {
          column_mapping?: Json
          company_id: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          entity_key: string
          error_report?: Json
          error_rows?: number
          file_name: string
          id?: string
          status?: string
          success_rows?: number
          total_rows?: number
          undone_at?: string | null
        }
        Update: {
          column_mapping?: Json
          company_id?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          entity_key?: string
          error_report?: Json
          error_rows?: number
          file_name?: string
          id?: string
          status?: string
          success_rows?: number
          total_rows?: number
          undone_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      indicators: {
        Row: {
          alert_threshold: number | null
          calculation_method: Json
          company_id: string
          created_at: string
          display_mode: string
          id: string
          name: string
          objective: string | null
          period_type: string
          responsible_company_user_id: string | null
          source: string
          target_value: number | null
          updated_at: string
        }
        Insert: {
          alert_threshold?: number | null
          calculation_method?: Json
          company_id: string
          created_at?: string
          display_mode?: string
          id?: string
          name: string
          objective?: string | null
          period_type?: string
          responsible_company_user_id?: string | null
          source: string
          target_value?: number | null
          updated_at?: string
        }
        Update: {
          alert_threshold?: number | null
          calculation_method?: Json
          company_id?: string
          created_at?: string
          display_mode?: string
          id?: string
          name?: string
          objective?: string | null
          period_type?: string
          responsible_company_user_id?: string | null
          source?: string
          target_value?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "indicators_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "indicators_responsible_company_user_id_fkey"
            columns: ["responsible_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      interactions: {
        Row: {
          company_id: string
          created_by: string | null
          id: string
          interaction_type: string
          notes: string | null
          occurred_at: string
          subject_id: string
          subject_type: string
        }
        Insert: {
          company_id: string
          created_by?: string | null
          id?: string
          interaction_type: string
          notes?: string | null
          occurred_at?: string
          subject_id: string
          subject_type: string
        }
        Update: {
          company_id?: string
          created_by?: string | null
          id?: string
          interaction_type?: string
          notes?: string | null
          occurred_at?: string
          subject_id?: string
          subject_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      inventories: {
        Row: {
          closed_at: string | null
          company_id: string
          created_at: string
          id: string
          performed_by: string | null
          started_at: string
          status: string
          warehouse_id: string
        }
        Insert: {
          closed_at?: string | null
          company_id: string
          created_at?: string
          id?: string
          performed_by?: string | null
          started_at?: string
          status?: string
          warehouse_id: string
        }
        Update: {
          closed_at?: string | null
          company_id?: string
          created_at?: string
          id?: string
          performed_by?: string | null
          started_at?: string
          status?: string
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventories_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_lines: {
        Row: {
          counted_quantity: number | null
          expected_quantity: number
          id: string
          inventory_id: string
          lot_number: string | null
          product_id: string
          variance_reason: string | null
        }
        Insert: {
          counted_quantity?: number | null
          expected_quantity?: number
          id?: string
          inventory_id: string
          lot_number?: string | null
          product_id: string
          variance_reason?: string | null
        }
        Update: {
          counted_quantity?: number | null
          expected_quantity?: number
          id?: string
          inventory_id?: string
          lot_number?: string | null
          product_id?: string
          variance_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_lines_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "inventories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_lines_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      model_templates: {
        Row: {
          advantages: string | null
          created_at: string
          created_by: string | null
          definition: Json
          description: string | null
          id: string
          level: number
          limitations: string | null
          name: string
          process_key: string
          sector_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          advantages?: string | null
          created_at?: string
          created_by?: string | null
          definition?: Json
          description?: string | null
          id?: string
          level: number
          limitations?: string | null
          name: string
          process_key: string
          sector_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          advantages?: string | null
          created_at?: string
          created_by?: string | null
          definition?: Json
          description?: string | null
          id?: string
          level?: number
          limitations?: string | null
          name?: string
          process_key?: string
          sector_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_templates_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          company_id: string
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          company_id: string
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          company_id?: string
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      objectives: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          metric: string
          period_end: string
          period_start: string
          subject_id: string | null
          subject_type: string
          target_value: number
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          metric?: string
          period_end: string
          period_start: string
          subject_id?: string | null
          subject_type: string
          target_value: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          metric?: string
          period_end?: string
          period_start?: string
          subject_id?: string | null
          subject_type?: string
          target_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "objectives_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          company_id: string
          created_at: string
          estimated_value: number | null
          expected_date: string | null
          id: string
          need: string | null
          probability: number | null
          result: string | null
          sales_rep_id: string | null
          stage: string
          subject_id: string
          subject_type: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          estimated_value?: number | null
          expected_date?: string | null
          id?: string
          need?: string | null
          probability?: number | null
          result?: string | null
          sales_rep_id?: string | null
          stage?: string
          subject_id: string
          subject_type: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          estimated_value?: number | null
          expected_date?: string | null
          id?: string
          need?: string | null
          probability?: number | null
          result?: string | null
          sales_rep_id?: string | null
          stage?: string
          subject_id?: string
          subject_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      org_units: {
        Row: {
          code: string | null
          company_id: string
          created_at: string
          functions: string | null
          id: string
          indicators: Json
          mission: string | null
          name: string
          objectives: string | null
          parent_id: string | null
          responsible_company_user_id: string | null
          site_id: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          company_id: string
          created_at?: string
          functions?: string | null
          id?: string
          indicators?: Json
          mission?: string | null
          name: string
          objectives?: string | null
          parent_id?: string | null
          responsible_company_user_id?: string | null
          site_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          company_id?: string
          created_at?: string
          functions?: string | null
          id?: string
          indicators?: Json
          mission?: string | null
          name?: string
          objectives?: string | null
          parent_id?: string | null
          responsible_company_user_id?: string | null
          site_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_units_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_units_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_units_responsible_fk"
            columns: ["responsible_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_units_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_admins: {
        Row: {
          created_at: string
          granted_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          granted_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          granted_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      positions: {
        Row: {
          company_id: string
          created_at: string
          expected_skills: string | null
          headcount: number
          id: string
          level: string | null
          mission: string | null
          org_unit_id: string | null
          responsibilities: string | null
          title: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          expected_skills?: string | null
          headcount?: number
          id?: string
          level?: string | null
          mission?: string | null
          org_unit_id?: string | null
          responsibilities?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          expected_skills?: string | null
          headcount?: number
          id?: string
          level?: string | null
          mission?: string | null
          org_unit_id?: string | null
          responsibilities?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
        ]
      }
      process_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          comment: string | null
          from_status: string | null
          id: string
          process_id: string
          to_status: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          comment?: string | null
          from_status?: string | null
          id?: string
          process_id: string
          to_status: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          comment?: string | null
          from_status?: string | null
          id?: string
          process_id?: string
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_status_history_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
        ]
      }
      processes: {
        Row: {
          actors: Json
          company_id: string
          created_at: string
          created_by: string | null
          cycle: string
          documents_used: string | null
          expected_result: string | null
          frequency: string | null
          id: string
          indicators: Json
          information_collected: string | null
          name: string
          objective: string | null
          org_unit_id: string | null
          responsible_company_user_id: string | null
          risks: string | null
          starting_point: string | null
          status: string
          steps: Json
          updated_at: string
          validations_required: string | null
        }
        Insert: {
          actors?: Json
          company_id: string
          created_at?: string
          created_by?: string | null
          cycle: string
          documents_used?: string | null
          expected_result?: string | null
          frequency?: string | null
          id?: string
          indicators?: Json
          information_collected?: string | null
          name: string
          objective?: string | null
          org_unit_id?: string | null
          responsible_company_user_id?: string | null
          risks?: string | null
          starting_point?: string | null
          status?: string
          steps?: Json
          updated_at?: string
          validations_required?: string | null
        }
        Update: {
          actors?: Json
          company_id?: string
          created_at?: string
          created_by?: string | null
          cycle?: string
          documents_used?: string | null
          expected_result?: string | null
          frequency?: string | null
          id?: string
          indicators?: Json
          information_collected?: string | null
          name?: string
          objective?: string | null
          org_unit_id?: string | null
          responsible_company_user_id?: string | null
          risks?: string | null
          starting_point?: string | null
          status?: string
          steps?: Json
          updated_at?: string
          validations_required?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "processes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "processes_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "processes_responsible_company_user_id_fkey"
            columns: ["responsible_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          code: string | null
          company_id: string
          created_at: string
          id: string
          kind: string
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          code?: string | null
          company_id: string
          created_at?: string
          id?: string
          kind?: string
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          code?: string | null
          company_id?: string
          created_at?: string
          id?: string
          kind?: string
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_prices: {
        Row: {
          client_category: string | null
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          price: number
          price_type: string
          product_id: string
          site_id: string | null
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          client_category?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          price: number
          price_type?: string
          product_id: string
          site_id?: string | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          client_category?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          price?: number
          price_type?: string
          product_id?: string
          site_id?: string | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_prices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_prices_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          code: string | null
          company_id: string
          cost: number | null
          created_at: string
          created_by: string | null
          custom_fields: Json
          description: string | null
          id: string
          image_url: string | null
          kind: string
          name: string
          primary_supplier_id: string | null
          purchase_price: number | null
          sale_price: number | null
          status: string
          tax_rate: number
          unit_id: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          code?: string | null
          company_id: string
          cost?: number | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          description?: string | null
          id?: string
          image_url?: string | null
          kind?: string
          name: string
          primary_supplier_id?: string | null
          purchase_price?: number | null
          sale_price?: number | null
          status?: string
          tax_rate?: number
          unit_id?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          code?: string | null
          company_id?: string
          cost?: number | null
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          description?: string | null
          id?: string
          image_url?: string | null
          kind?: string
          name?: string
          primary_supplier_id?: string | null
          purchase_price?: number | null
          sale_price?: number | null
          status?: string
          tax_rate?: number
          unit_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_primary_supplier_id_fkey"
            columns: ["primary_supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units_of_measure"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          locale: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_deliverables: {
        Row: {
          document_id: string | null
          due_date: string | null
          id: string
          name: string
          project_id: string
          status: string
        }
        Insert: {
          document_id?: string | null
          due_date?: string | null
          id?: string
          name: string
          project_id: string
          status?: string
        }
        Update: {
          document_id?: string | null
          due_date?: string | null
          id?: string
          name?: string
          project_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_deliverables_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_revenues: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          project_id: string
          revenue_date: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          project_id: string
          revenue_date?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          project_id?: string
          revenue_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_revenues_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          blocked_reason: string | null
          created_at: string
          due_date: string | null
          id: string
          progress: number
          project_id: string
          responsible_company_user_id: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          blocked_reason?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          progress?: number
          project_id: string
          responsible_company_user_id?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          blocked_reason?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          progress?: number
          project_id?: string
          responsible_company_user_id?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tasks_responsible_company_user_id_fkey"
            columns: ["responsible_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          client_id: string | null
          code: string | null
          company_id: string
          created_at: string
          custom_fields: Json
          end_date: string | null
          id: string
          objectives: string | null
          responsible_company_user_id: string | null
          start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          client_id?: string | null
          code?: string | null
          company_id: string
          created_at?: string
          custom_fields?: Json
          end_date?: string | null
          id?: string
          objectives?: string | null
          responsible_company_user_id?: string | null
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          client_id?: string | null
          code?: string | null
          company_id?: string
          created_at?: string
          custom_fields?: Json
          end_date?: string | null
          id?: string
          objectives?: string | null
          responsible_company_user_id?: string | null
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_responsible_company_user_id_fkey"
            columns: ["responsible_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      prospects: {
        Row: {
          company_id: string
          converted_client_id: string | null
          created_at: string
          id: string
          name: string
          needs: string | null
          next_action: string | null
          next_action_date: string | null
          origin: string | null
          potential: string | null
          responsible_company_user_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company_id: string
          converted_client_id?: string | null
          created_at?: string
          id?: string
          name: string
          needs?: string | null
          next_action?: string | null
          next_action_date?: string | null
          origin?: string | null
          potential?: string | null
          responsible_company_user_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          converted_client_id?: string | null
          created_at?: string
          id?: string
          name?: string
          needs?: string | null
          next_action?: string | null
          next_action_date?: string | null
          origin?: string | null
          potential?: string | null
          responsible_company_user_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prospects_converted_client_id_fkey"
            columns: ["converted_client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prospects_responsible_company_user_id_fkey"
            columns: ["responsible_company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_lines: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          quantity?: number
          unit_price?: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_lines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_lines_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          company_id: string
          conditions: string | null
          created_at: string
          created_by: string | null
          delivery_site_id: string | null
          id: string
          reference: string
          request_id: string | null
          status: string
          supplier_id: string
          total: number
          updated_at: string
        }
        Insert: {
          company_id: string
          conditions?: string | null
          created_at?: string
          created_by?: string | null
          delivery_site_id?: string | null
          id?: string
          reference: string
          request_id?: string | null
          status?: string
          supplier_id: string
          total?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          conditions?: string | null
          created_at?: string
          created_by?: string | null
          delivery_site_id?: string | null
          id?: string
          reference?: string
          request_id?: string | null
          status?: string
          supplier_id?: string
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_delivery_site_id_fkey"
            columns: ["delivery_site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_request_lines: {
        Row: {
          id: string
          need_description: string | null
          product_id: string | null
          quantity: number
          request_id: string
        }
        Insert: {
          id?: string
          need_description?: string | null
          product_id?: string | null
          quantity?: number
          request_id: string
        }
        Update: {
          id?: string
          need_description?: string | null
          product_id?: string | null
          quantity?: number
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_request_lines_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_request_lines_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_requests: {
        Row: {
          company_id: string
          created_at: string
          id: string
          needed_date: string | null
          org_unit_id: string | null
          project_id: string | null
          reference: string
          requested_by: string | null
          status: string
          updated_at: string
          urgency: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          needed_date?: string | null
          org_unit_id?: string | null
          project_id?: string | null
          reference: string
          requested_by?: string | null
          status?: string
          updated_at?: string
          urgency?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          needed_date?: string | null
          org_unit_id?: string | null
          project_id?: string | null
          reference?: string
          requested_by?: string | null
          status?: string
          updated_at?: string
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_project_fk"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      reception_lines: {
        Row: {
          id: string
          notes: string | null
          order_line_id: string
          quantity_damaged: number
          quantity_missing: number
          quantity_received: number
          reception_id: string
        }
        Insert: {
          id?: string
          notes?: string | null
          order_line_id: string
          quantity_damaged?: number
          quantity_missing?: number
          quantity_received?: number
          reception_id: string
        }
        Update: {
          id?: string
          notes?: string | null
          order_line_id?: string
          quantity_damaged?: number
          quantity_missing?: number
          quantity_received?: number
          reception_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reception_lines_order_line_id_fkey"
            columns: ["order_line_id"]
            isOneToOne: false
            referencedRelation: "purchase_order_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reception_lines_reception_id_fkey"
            columns: ["reception_id"]
            isOneToOne: false
            referencedRelation: "receptions"
            referencedColumns: ["id"]
          },
        ]
      }
      receptions: {
        Row: {
          company_id: string
          created_at: string
          id: string
          notes: string | null
          order_id: string
          received_by: string | null
          reception_date: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          notes?: string | null
          order_id: string
          received_by?: string | null
          reception_date?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          order_id?: string
          received_by?: string | null
          reception_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "receptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receptions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      report_definitions: {
        Row: {
          company_id: string
          config: Json
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_standard: boolean
          name: string
          source: string
          updated_at: string
        }
        Insert: {
          company_id: string
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_standard?: boolean
          name: string
          source: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_standard?: boolean
          name?: string
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_definitions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      report_schedules: {
        Row: {
          created_at: string
          frequency: string
          id: string
          is_active: boolean
          next_run_at: string | null
          recipients: string[]
          report_id: string
        }
        Insert: {
          created_at?: string
          frequency: string
          id?: string
          is_active?: boolean
          next_run_at?: string | null
          recipients?: string[]
          report_id: string
        }
        Update: {
          created_at?: string
          frequency?: string
          id?: string
          is_active?: boolean
          next_run_at?: string | null
          recipients?: string[]
          report_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_schedules_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "report_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          action: Database["public"]["Enums"]["permission_action"]
          module_key: string
          role_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["permission_action"]
          module_key: string
          role_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["permission_action"]
          module_key?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_module_key_fkey"
            columns: ["module_key"]
            isOneToOne: false
            referencedRelation: "app_modules"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          id: string
          is_system: boolean
          key: string
          name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_system?: boolean
          key: string
          name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_system?: boolean
          key?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      salary_entries: {
        Row: {
          base_salary: number
          bonuses: number
          commissions: number
          company_id: string
          created_at: string
          created_by: string | null
          deductions: number
          employee_id: string
          id: string
          justification_document_id: string | null
          net_total: number | null
          period_end: string
          period_start: string
          status: string
          updated_at: string
        }
        Insert: {
          base_salary?: number
          bonuses?: number
          commissions?: number
          company_id: string
          created_at?: string
          created_by?: string | null
          deductions?: number
          employee_id: string
          id?: string
          justification_document_id?: string | null
          net_total?: number | null
          period_end: string
          period_start: string
          status?: string
          updated_at?: string
        }
        Update: {
          base_salary?: number
          bonuses?: number
          commissions?: number
          company_id?: string
          created_at?: string
          created_by?: string | null
          deductions?: number
          employee_id?: string
          id?: string
          justification_document_id?: string | null
          net_total?: number | null
          period_end?: string
          period_start?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "salary_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salary_entries_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_lines: {
        Row: {
          created_at: string
          discount: number
          id: string
          line_total: number
          product_id: string | null
          quantity: number
          sale_id: string
          tax_rate: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          discount?: number
          id?: string
          line_total?: number
          product_id?: string | null
          quantity?: number
          sale_id: string
          tax_rate?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          discount?: number
          id?: string
          line_total?: number
          product_id?: string | null
          quantity?: number
          sale_id?: string
          tax_rate?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_lines_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_lines_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          from_status: string | null
          id: string
          reason: string | null
          sale_id: string
          to_status: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          reason?: string | null
          sale_id: string
          to_status: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          reason?: string | null
          sale_id?: string
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_status_history_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          cancel_reason: string | null
          client_id: string | null
          company_id: string
          created_at: string
          created_by: string | null
          custom_fields: Json
          discount_total: number
          id: string
          notes: string | null
          reference: string
          sale_date: string
          sales_rep_id: string | null
          site_id: string | null
          status: string
          subtotal: number
          tax_total: number
          total: number
          updated_at: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          cancel_reason?: string | null
          client_id?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          discount_total?: number
          id?: string
          notes?: string | null
          reference: string
          sale_date?: string
          sales_rep_id?: string | null
          site_id?: string | null
          status?: string
          subtotal?: number
          tax_total?: number
          total?: number
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          cancel_reason?: string | null
          client_id?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json
          discount_total?: number
          id?: string
          notes?: string | null
          reference?: string
          sale_date?: string
          sales_rep_id?: string | null
          site_id?: string | null
          status?: string
          subtotal?: number
          tax_total?: number
          total?: number
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_rep_assignments: {
        Row: {
          assignment_type: string
          company_user_id: string
          created_at: string
          id: string
          label: string | null
          period_end: string | null
          period_start: string | null
          reference_id: string | null
        }
        Insert: {
          assignment_type: string
          company_user_id: string
          created_at?: string
          id?: string
          label?: string | null
          period_end?: string | null
          period_start?: string | null
          reference_id?: string | null
        }
        Update: {
          assignment_type?: string
          company_user_id?: string
          created_at?: string
          id?: string
          label?: string | null
          period_end?: string | null
          period_start?: string | null
          reference_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_rep_assignments_company_user_id_fkey"
            columns: ["company_user_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_rep_profiles: {
        Row: {
          company_user_id: string
          created_at: string
          product_category_ids: string[]
          status: string
          zone: string | null
        }
        Insert: {
          company_user_id: string
          created_at?: string
          product_category_ids?: string[]
          status?: string
          zone?: string | null
        }
        Update: {
          company_user_id?: string
          created_at?: string
          product_category_ids?: string[]
          status?: string
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_rep_profiles_company_user_id_fkey"
            columns: ["company_user_id"]
            isOneToOne: true
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_queries: {
        Row: {
          company_id: string
          config: Json
          created_at: string
          id: string
          is_shared: boolean
          name: string
          owner_id: string
          query_type: string
          updated_at: string
        }
        Insert: {
          company_id: string
          config?: Json
          created_at?: string
          id?: string
          is_shared?: boolean
          name: string
          owner_id: string
          query_type?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          config?: Json
          created_at?: string
          id?: string
          is_shared?: boolean
          name?: string
          owner_id?: string
          query_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_queries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          key: string
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          key: string
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          key?: string
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sectors_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          actual_date: string | null
          carrier: string | null
          company_id: string
          created_at: string
          destination: string | null
          driver: string | null
          goods_description: string | null
          id: string
          incidents: string | null
          origin: string | null
          planned_date: string | null
          quantity: number | null
          reference: string
          status: string
          updated_at: string
          vehicle: string | null
        }
        Insert: {
          actual_date?: string | null
          carrier?: string | null
          company_id: string
          created_at?: string
          destination?: string | null
          driver?: string | null
          goods_description?: string | null
          id?: string
          incidents?: string | null
          origin?: string | null
          planned_date?: string | null
          quantity?: number | null
          reference: string
          status?: string
          updated_at?: string
          vehicle?: string | null
        }
        Update: {
          actual_date?: string | null
          carrier?: string | null
          company_id?: string
          created_at?: string
          destination?: string | null
          driver?: string | null
          goods_description?: string | null
          id?: string
          incidents?: string | null
          origin?: string | null
          planned_date?: string | null
          quantity?: number | null
          reference?: string
          status?: string
          updated_at?: string
          vehicle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          address: string | null
          city: string | null
          code: string | null
          company_id: string
          country: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          code?: string | null
          company_id: string
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          type?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string | null
          company_id?: string
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sites_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_movements: {
        Row: {
          company_id: string
          expiry_date: string | null
          id: string
          lot_number: string | null
          moved_at: string
          movement_type: string
          notes: string | null
          performed_by: string | null
          product_id: string
          quantity: number
          reference_id: string | null
          reference_table: string | null
          warehouse_id: string
        }
        Insert: {
          company_id: string
          expiry_date?: string | null
          id?: string
          lot_number?: string | null
          moved_at?: string
          movement_type: string
          notes?: string | null
          performed_by?: string | null
          product_id: string
          quantity: number
          reference_id?: string | null
          reference_table?: string | null
          warehouse_id: string
        }
        Update: {
          company_id?: string
          expiry_date?: string | null
          id?: string
          lot_number?: string | null
          moved_at?: string
          movement_type?: string
          notes?: string | null
          performed_by?: string | null
          product_id?: string
          quantity?: number
          reference_id?: string | null
          reference_table?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_thresholds: {
        Row: {
          company_id: string
          id: string
          max_quantity: number | null
          min_quantity: number | null
          product_id: string
          warehouse_id: string | null
        }
        Insert: {
          company_id: string
          id?: string
          max_quantity?: number | null
          min_quantity?: number | null
          product_id: string
          warehouse_id?: string | null
        }
        Update: {
          company_id?: string
          id?: string
          max_quantity?: number | null
          min_quantity?: number | null
          product_id?: string
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_thresholds_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_thresholds_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_thresholds_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          code: string | null
          company_id: string
          conditions: string | null
          contacts: Json
          created_at: string
          custom_fields: Json
          id: string
          lead_time_days: number | null
          name: string
          products_supplied: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          code?: string | null
          company_id: string
          conditions?: string | null
          contacts?: Json
          created_at?: string
          custom_fields?: Json
          id?: string
          lead_time_days?: number | null
          name: string
          products_supplied?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          code?: string | null
          company_id?: string
          conditions?: string | null
          contacts?: Json
          created_at?: string
          custom_fields?: Json
          id?: string
          lead_time_days?: number | null
          name?: string
          products_supplied?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string | null
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          entity_id: string | null
          entity_table: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      units_of_measure: {
        Row: {
          company_id: string
          created_at: string
          id: string
          name: string
          symbol: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          name: string
          symbol: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          name?: string
          symbol?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_of_measure_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      variance_comments: {
        Row: {
          cause: string | null
          comment: string | null
          corrective_action: string | null
          created_at: string
          created_by: string | null
          due_date: string | null
          forecast_id: string
          id: string
          responsible_id: string | null
          status: string
        }
        Insert: {
          cause?: string | null
          comment?: string | null
          corrective_action?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          forecast_id: string
          id?: string
          responsible_id?: string | null
          status?: string
        }
        Update: {
          cause?: string | null
          comment?: string | null
          corrective_action?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          forecast_id?: string
          id?: string
          responsible_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "variance_comments_forecast_id_fkey"
            columns: ["forecast_id"]
            isOneToOne: false
            referencedRelation: "forecasts"
            referencedColumns: ["id"]
          },
        ]
      }
      warehouses: {
        Row: {
          company_id: string
          created_at: string
          id: string
          name: string
          site_id: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          name: string
          site_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          name?: string
          site_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "warehouses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warehouses_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      stock_levels: {
        Row: {
          company_id: string | null
          lot_number: string | null
          nearest_expiry: string | null
          product_id: string | null
          quantity_on_hand: number | null
          warehouse_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      apply_child_tenant_policies: {
        Args: {
          p_child: string
          p_fk: string
          p_module: string
          p_parent: string
        }
        Returns: undefined
      }
      apply_standard_tenant_policies: {
        Args: {
          p_module: string
          p_select_action?: Database["public"]["Enums"]["permission_action"]
          p_table: string
        }
        Returns: undefined
      }
      create_default_roles: {
        Args: { p_company_id: string }
        Returns: undefined
      }
      has_permission: {
        Args: {
          p_action: Database["public"]["Enums"]["permission_action"]
          p_company_id: string
          p_module: string
        }
        Returns: boolean
      }
      invite_user_by_email: {
        Args: {
          p_company_id: string
          p_email: string
          p_org_unit_id?: string
          p_role_key: string
          p_scope_level?: string
        }
        Returns: string
      }
      is_company_member: { Args: { p_company_id: string }; Returns: boolean }
      is_platform_admin: { Args: never; Returns: boolean }
      my_company_ids: { Args: never; Returns: string[] }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      user_org_scope_ids: { Args: { p_company_id: string }; Returns: string[] }
      write_audit_log: {
        Args: {
          p_action: string
          p_after: Json
          p_before: Json
          p_company_id: string
          p_entity_id: string
          p_entity_table: string
          p_module: string
          p_reason?: string
          p_risk_level?: string
        }
        Returns: string
      }
    }
    Enums: {
      field_type:
        | "short_text"
        | "long_text"
        | "integer"
        | "decimal"
        | "amount"
        | "percentage"
        | "date"
        | "time"
        | "datetime"
        | "boolean"
        | "single_choice"
        | "multiple_choice"
        | "auto_code"
        | "reference_number"
        | "address"
        | "phone"
        | "email"
        | "attachment"
        | "photo"
        | "signature"
        | "status"
        | "relation"
        | "formula"
      permission_action:
        | "view"
        | "add"
        | "edit"
        | "delete"
        | "archive"
        | "validate"
        | "reject"
        | "import"
        | "export"
        | "print"
        | "share"
        | "view_history"
        | "view_amounts"
        | "view_salaries"
        | "administer"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      field_type: [
        "short_text",
        "long_text",
        "integer",
        "decimal",
        "amount",
        "percentage",
        "date",
        "time",
        "datetime",
        "boolean",
        "single_choice",
        "multiple_choice",
        "auto_code",
        "reference_number",
        "address",
        "phone",
        "email",
        "attachment",
        "photo",
        "signature",
        "status",
        "relation",
        "formula",
      ],
      permission_action: [
        "view",
        "add",
        "edit",
        "delete",
        "archive",
        "validate",
        "reject",
        "import",
        "export",
        "print",
        "share",
        "view_history",
        "view_amounts",
        "view_salaries",
        "administer",
      ],
    },
  },
} as const
