import { createContext, useState, ReactNode, useEffect } from 'react';
import { ThemeConfig, defaultTheme, presetThemes } from '../types/theme';

interface ThemeContextType {
    currentTheme: ThemeConfig;
    setTheme: (theme: ThemeConfig) => void;
    updateDarkVeilConfig: <K extends keyof ThemeConfig['darkVeil']>(
        key: K,
        value: ThemeConfig['darkVeil'][K]
    ) => void;
    updateLiquidEtherConfig: <K extends keyof ThemeConfig['liquidEther']>(
        key: K,
        value: ThemeConfig['liquidEther'][K]
    ) => void;
    updateUIColor: <K extends keyof ThemeConfig['uiColors']>(
        key: K,
        value: ThemeConfig['uiColors'][K]
    ) => void;
    resetTheme: () => void;
    applyPreset: (presetName: string) => void;
    presets: ThemeConfig[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultTheme);

    // Aplicar colores CSS cuando cambia el tema
    useEffect(() => {
        const root = document.documentElement;
        const colors = currentTheme.uiColors;

        root.style.setProperty('--theme-primary', colors.primary);
        root.style.setProperty('--theme-secondary', colors.secondary);
        root.style.setProperty('--theme-accent', colors.accent);
        root.style.setProperty('--theme-background', colors.background);
        root.style.setProperty('--theme-surface', colors.surface);
        root.style.setProperty('--theme-text', colors.text);
        root.style.setProperty('--theme-text-secondary', colors.textSecondary);
        root.style.setProperty('--theme-border', colors.border);
        root.style.setProperty('--theme-success', colors.success);
        root.style.setProperty('--theme-warning', colors.warning);
        root.style.setProperty('--theme-error', colors.error);
    }, [currentTheme.uiColors]);

    const updateDarkVeilConfig = <K extends keyof ThemeConfig['darkVeil']>(
        key: K,
        value: ThemeConfig['darkVeil'][K]
    ) => {
        setCurrentTheme(prev => ({
            ...prev,
            darkVeil: {
                ...prev.darkVeil,
                [key]: value
            }
        }));
    };

    const updateLiquidEtherConfig = <K extends keyof ThemeConfig['liquidEther']>(
        key: K,
        value: ThemeConfig['liquidEther'][K]
    ) => {
        setCurrentTheme(prev => ({
            ...prev,
            liquidEther: {
                ...prev.liquidEther,
                [key]: value
            }
        }));
    };

    const updateUIColor = <K extends keyof ThemeConfig['uiColors']>(
        key: K,
        value: ThemeConfig['uiColors'][K]
    ) => {
        setCurrentTheme(prev => ({
            ...prev,
            uiColors: {
                ...prev.uiColors,
                [key]: value
            }
        }));
    };

    const resetTheme = () => {
        setCurrentTheme(defaultTheme);
    };

    const applyPreset = (presetName: string) => {
        const preset = presetThemes.find(t => t.name === presetName);
        if (preset) {
            setCurrentTheme(preset);
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                setTheme: setCurrentTheme,
                updateDarkVeilConfig,
                updateLiquidEtherConfig,
                updateUIColor,
                resetTheme,
                applyPreset,
                presets: presetThemes
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
