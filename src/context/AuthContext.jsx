import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 1. Get initial session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user || null;
      setCurrentUser(user);
      
      if (user) {
        // Simple admin check: if email is yours, you are admin
        // Or check a custom claim if you have set it up
        setIsAdmin(user.email === 'amanr.p0puhwg@gmail.com' || user.email?.includes('admin'));
      }
      
      setLoading(false);
    };

    checkUser();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      setIsAdmin(user?.email === 'amanr.p0puhwg@gmail.com' || user?.email?.includes('admin'));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Signup
  async function signup(email, password, displayName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        }
      }
    });
    if (error) throw error;
    return data;
  }

  // Login
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  // Logout
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // Update profile
  async function updateProfileInfo(updates) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });
    if (error) throw error;
    return data;
  }

  const value = {
    user: currentUser,
    profile: currentUser ? {
      full_name: currentUser.user_metadata?.display_name || currentUser.email.split('@')[0],
      email: currentUser.email
    } : null,
    isAdmin,
    login,
    signup,
    logout,
    updateProfileInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

