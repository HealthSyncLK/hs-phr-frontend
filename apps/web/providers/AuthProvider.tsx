'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';
import { User } from '../app/types/user';
import { authService } from '../app/services/authService';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: any;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // SWR now uses our clean service function for fetching.
    const { data: user, error, isLoading } = useSWR<User>(
        '/api/auth/me', // The key for SWR
        authService.getCurrentUser // The fetcher function
    );

    const isAuthenticated = !isLoading && !error && !!user;

    return (
        <AuthContext.Provider value={{ user: user || null, isLoading, error, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
