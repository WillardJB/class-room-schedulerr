// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const supabaseUrl = 'https://oknkjorlxxlbhzulymeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rbmtqb3JseHhsYmh6dWx5bWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTMxMDMsImV4cCI6MjA2MTIyOTEwM30.PRooU-gvREkHymo_4Y2fpMfnJ7Mwtwl_kiabCel28Gw';

export const supabase = createClient(supabaseUrl, supabaseKey);
