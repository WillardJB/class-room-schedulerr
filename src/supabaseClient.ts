import { createClient } from '@supabase/supabase-js';

// Replace these with your own Supabase URL and Anon Key
const supabaseUrl = 'https://oknkjorlxxlbhzulymeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rbmtqb3JseHhsYmh6dWx5bWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTMxMDMsImV4cCI6MjA2MTIyOTEwM30.PRooU-gvREkHymo_4Y2fpMfnJ7Mwtwl_kiabCel28Gw'; // Use your real anon key here

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Listen for changes in auth state
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth State Changed:', event, session); // Log state changes to debug

  if (event === 'SIGNED_IN') {
    // Store the session in localStorage to keep track of user authentication
    localStorage.setItem('session', JSON.stringify(session));
  } else if (event === 'SIGNED_OUT') {
    // Clear session from localStorage on sign-out
    localStorage.removeItem('session');
  }
});

// You can also check session directly in your code:
export const getSession = () => {
  const session = localStorage.getItem('session');
  return session ? JSON.parse(session) : null;
};
