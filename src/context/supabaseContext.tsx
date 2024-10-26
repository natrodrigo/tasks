import React, { createContext, useContext, ReactNode } from 'react';
import { supabase } from '../utils/supabaseConfig';
import { SupabaseClient } from '@supabase/supabase-js';

const SupabaseContext = createContext<SupabaseClient | null>(null);

interface SupabaseProviderProps {
  children: ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => (
  <SupabaseContext.Provider value={supabase}>
    {children}
  </SupabaseContext.Provider>
);

export const useSupabase = () => {
  return useContext(SupabaseContext);
};