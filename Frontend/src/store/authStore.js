import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true; // cookies sent with every response header

export const useAuthStore = create((set)=>({
    user: null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:false,

    signup: async (email,password,name) => {
        set({isLoading:true,error:null});
        try {
            const response  = await axios.post(`${import.meta.env.VITE_API_URL}/signup`,{email,password,name})
            set({user:response.data.user, isAuthenticated:true, isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error signing up", isLoading:false})
            throw error;
        }
    },

    
}))
