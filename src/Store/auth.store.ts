import {create} from "zustand"
import apiClient from "../apiClient";

interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: Boolean;
    login: (email:string, password:string) => Promise<void>
    logout: () => void;
}
interface LoginResponse {
    success: boolean; 
    message: string;
    data: {
      token: string;
      minutes_to_expire: number;
    };
  }

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
   
    login: async (email, password) => {
      const response = await apiClient.post<LoginResponse>('/login', { email, password });
      localStorage.setItem('token', response.data.data.token);
      set({ 
        token: response.data.data.token,
        isAuthenticated: true 
      });
    },
   
    logout: () => {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false});
    }
}));