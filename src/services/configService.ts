import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ModelConfig {
    provider: string;
    model: string;
    apiKey: string;
}

class ConfigService {
    /**
     * Get user's model configuration from database
     */
    async getConfig(): Promise<ModelConfig | null> {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                throw new Error('No active session');
            }

            const response = await fetch(`${API_URL}/api/config`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const config = await response.json();
                return config;
            }

            if (response.status === 404) {
                return null; // No config exists yet
            }

            throw new Error('Failed to fetch configuration');
        } catch (error) {
            console.error('Error fetching config:', error);
            return null;
        }
    }

    /**
     * Save user's model configuration to database
     */
    async saveConfig(config: ModelConfig): Promise<boolean> {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                throw new Error('No active session');
            }

            const response = await fetch(`${API_URL}/api/config`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });

            if (!response.ok) {
                throw new Error('Failed to save configuration');
            }

            return true;
        } catch (error) {
            console.error('Error saving config:', error);
            return false;
        }
    }

    /**
     * Delete user's model configuration from database
     */
    async deleteConfig(): Promise<boolean> {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                throw new Error('No active session');
            }

            const response = await fetch(`${API_URL}/api/config`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete configuration');
            }

            return true;
        } catch (error) {
            console.error('Error deleting config:', error);
            return false;
        }
    }
}

export const configService = new ConfigService();
