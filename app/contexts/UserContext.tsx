'use client'

import React, { createContext, useState, useEffect, useContext, useCallback, ReactNode } from 'react';
import apiClient from '../lib/apiClient'; // Import the centralized API client using relative path
import axios from 'axios'; // Added for axios import

// Define the shape of the user profile data
export interface UserProfile {
    id: number;
    email: string;
    displayName: string | null;
    avatarUrl: string | null;
    role?: string;
    // Add any other user-specific fields you might need globally
    // For example: role, createdAt, etc.
    // Based on backend/src/routes/userProfile.ts, it also returns createdAt
    createdAt?: string; 
}

// Define the shape of the context value
interface UserContextType {
    user: UserProfile | null;
    isLoadingUser: boolean;
    fetchUserProfile: () => Promise<void>;
    clearUser: () => void; // Added for logout or session expiry
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper to get auth token (assuming it's stored in localStorage)
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
};

// The API_BASE_URL is now handled by apiClient.ts

// Create the Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const fetchUserProfile = useCallback(async () => {
        setIsLoadingUser(true);
        const token = getAuthToken();

        if (!token) {
            setUser(null);
            setIsLoadingUser(false);
            return;
        }

        try {
            // Construct full URL for /user/profile using NEXT_PUBLIC_API_URL as it's not under /api
            const profileUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/user/profile`;
            
            // Need to use axios directly here or ensure apiClient can handle absolute URLs if different from its base
            // For simplicity, using axios directly with the token interceptor concept:
            const headers: Record<string, string> = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get<UserProfile>(profileUrl, { headers });
            setUser(response.data);
        } catch (error) {
            console.error("UserContext: Failed to fetch user profile:", error);
            setUser(null); // Clear user on error (e.g., token expired)
            // Potentially clear token from localStorage if it's invalid (401/403)
            const axiosError = error as any;
            if (axiosError.response && (axiosError.response.status === 401 || axiosError.response.status === 403)) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                }
            }
        } finally {
            setIsLoadingUser(false);
        }
    }, []);

    const clearUser = useCallback(() => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
        // Potentially redirect to login or home page
    }, []);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    return (
        <UserContext.Provider value={{ user, isLoadingUser, fetchUserProfile, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for easy context consumption
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 