import { supabase } from './supabaseClient';

export const signIn = async (email: string, password: string) => {
  console.log('Attempting login with email:', email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('Login response:', data, error);

  if (error) {
    console.error('Login error:', error);
    throw error;
  }

  // On successful login, store the session in localStorage
  localStorage.setItem('session', JSON.stringify(data?.session));

  return data?.user;
};
