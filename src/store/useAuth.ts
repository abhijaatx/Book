import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  provider: 'credentials' | 'google';
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (username: string, password: string) => boolean;
  loginWithGoogle: () => void;
  logout: (redirectPath?: string) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username, password) => {
        // Simple hardcoded admin credentials for prototype phase
        if (username === 'admin' && password === 'magic') {
          set({ 
            isAuthenticated: true, 
            user: { 
              name: 'Admin Kahaani', 
              email: 'admin@kahaani.studio', 
              provider: 'credentials' 
            } 
          });
          return true;
        }
        return false;
      },
      loginWithGoogle: () => {
        // Mock Google login flow
        set({ 
          isAuthenticated: true, 
          user: { 
            name: 'Google User', 
            email: 'user@gmail.com', 
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
            provider: 'google' 
          } 
        });
      },
      logout: (redirectPath?: string) => {
        set({ isAuthenticated: false, user: null });
        if (redirectPath) {
          window.location.href = redirectPath;
        } else {
          window.location.href = '/admin/login';
        }
      },
    }),
    {
      name: 'kahaani-auth-storage',
    }
  )
);
