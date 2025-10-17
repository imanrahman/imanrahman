import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables are missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export type LeadRecord = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  position: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  linkedin: string | null;
  seniority: string | null;
  functions: string[] | null;
  org_name: string;
  org_website: string | null;
  org_linkedin: string | null;
  founded_year: number | null;
  industry: string | null;
  size: string | null;
  description: string | null;
  specialties: string[] | null;
  org_city: string | null;
  org_state: string | null;
  org_country: string | null;
};

export type LeadFilters = {
  search?: string;
  person?: {
    position?: string;
    seniority?: string[];
  };
  company?: {
    industry?: string[];
    size?: string[];
    founded_year?: { min?: number; max?: number };
  };
  contact?: {
    email?: boolean;
    phone?: boolean;
    linkedin?: boolean;
  };
};
