import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isCreator: boolean;
  isBrand: boolean;
  login: (email: string, role: 'creator' | 'brand', name?: string) => Promise<boolean>;
  register: (name: string, email: string, role: 'creator' | 'brand', companyOrSpec?: string) => Promise<boolean>;
  logout: () => void;
  loginAsDemoCreator: () => void;
  loginAsDemoBrand: () => void;
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CREATOR_USER: UserProfile = {
  id: "creator-1",
  email: "elena@creatorai.io",
  full_name: "Elena Rostova",
  role: "creator",
  headline: "Cinematic AI Video Director & Hyperrealistic Worldbuilder",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "Pioneering cinematic AI direction since 2022. I merge Runway Gen-3 Alpha, Kling AI, and custom ComfyUI diffusion workflows with DaVinci Resolve color grading.",
  location: "Berlin, Germany"
};

const DEMO_BRAND_USER: UserProfile = {
  id: "brand-1",
  email: "brand@apexvolt.com",
  full_name: "Marcus Vance",
  role: "brand",
  company_name: "Apex Volt Beverage Co.",
  headline: "Head of Creative Production & Brand Media",
  avatar_url: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=200&q=80",
  bio: "Leading consumer beverage marketing into generative broadcast media.",
  location: "New York, USA"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('creatorai_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default to demo brand user for frictionless hackathon exploration
    return DEMO_BRAND_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('creatorai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('creatorai_user');
    }
  }, [user]);

  const login = async (email: string, role: 'creator' | 'brand', name?: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      full_name: name || (role === 'creator' ? 'AI Artist' : 'Brand Director'),
      role,
      avatar_url: role === 'creator' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
      headline: role === 'creator' ? 'AI Creative Specialist' : 'Brand Marketing Lead',
      bio: 'CreatorAI platform member.'
    };
    setUser(newUser);
    return true;
  };

  const register = async (name: string, email: string, role: 'creator' | 'brand', companyOrSpec?: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      full_name: name,
      role,
      company_name: role === 'brand' ? companyOrSpec : undefined,
      headline: role === 'creator' ? (companyOrSpec || 'Generative AI Creator') : 'Brand & Agency Lead',
      avatar_url: role === 'creator'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
      bio: `Registered ${role} on CreatorAI.`
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const loginAsDemoCreator = () => {
    setUser(DEMO_CREATOR_USER);
  };

  const loginAsDemoBrand = () => {
    setUser(DEMO_BRAND_USER);
  };

  const updateCurrentUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const role: UserRole = user ? user.role : 'guest';
  const isAuthenticated = user !== null;
  const isCreator = user?.role === 'creator';
  const isBrand = user?.role === 'brand';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isCreator,
        isBrand,
        login,
        register,
        logout,
        loginAsDemoCreator,
        loginAsDemoBrand,
        updateCurrentUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
