import { supabase } from './supabase';

export interface AuthUser {
    id: string;
    email: string;
    username: string;
}

export const authService = {
    /**
     * Register a new user
     */
    async register(email: string, password: string, username: string): Promise<{ success: boolean; user?: AuthUser; message: string }> {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username
                    }
                }
            });

            if (error) {
                return {
                    success: false,
                    message: error.message
                };
            }

            if (data.user) {
                return {
                    success: true,
                    user: {
                        id: data.user.id,
                        email: data.user.email!,
                        username: data.user.user_metadata?.username || username
                    },
                    message: 'Registration successful'
                };
            }

            return {
                success: false,
                message: 'Registration failed'
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    },

    /**
     * Login with email and password
     */
    async login(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; message: string }> {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return {
                    success: false,
                    message: error.message
                };
            }

            if (data.user) {
                return {
                    success: true,
                    user: {
                        id: data.user.id,
                        email: data.user.email!,
                        username: data.user.user_metadata?.username || email.split('@')[0]
                    },
                    message: 'Login successful'
                };
            }

            return {
                success: false,
                message: 'Invalid credentials'
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    },

    /**
     * Logout current user
     */
    async logout(): Promise<void> {
        await supabase.auth.signOut();
    },

    /**
     * Get current user
     */
    async getCurrentUser(): Promise<AuthUser | null> {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            return {
                id: user.id,
                email: user.email!,
                username: user.user_metadata?.username || user.email!.split('@')[0]
            };
        }

        return null;
    }
};
