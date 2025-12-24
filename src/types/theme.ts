// Theme configuration types for SonoraKit
export interface DarkVeilConfig {
    baseColor1: string;
    baseColor2: string;
    hueShift: number;
    noiseIntensity: number;
    scanlineIntensity: number;
    speed: number;
    scanlineFrequency: number;
    warpAmount: number;
    resolutionScale: number;
    verticalPosition: number; // -100 a 100, 0 es centro
}

export interface LiquidEtherConfig {
    mouseForce: number;
    cursorSize: number;
    isViscous: boolean;
    viscous: number;
    iterationsViscous: number;
    iterationsPoisson: number;
    dt: number;
    BFECC: boolean;
    resolution: number;
    isBounce: boolean;
    colors: string[];
    autoDemo: boolean;
    autoSpeed: number;
    autoIntensity: number;
    takeoverDuration: number;
    autoResumeDelay: number;
    autoRampDuration: number;
}

export interface UIColorsConfig {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
}

export interface ThemeConfig {
    name: string;
    description: string;
    darkVeil: DarkVeilConfig;
    liquidEther: LiquidEtherConfig;
    uiColors: UIColorsConfig;
}

export const defaultTheme: ThemeConfig = {
    name: 'Default',
    description: 'Tema clásico de SonoraKit con tonos púrpura y rosa',
    darkVeil: {
        baseColor1: '#5227FF',
        baseColor2: '#FF9FFC',
        hueShift: 0,
        noiseIntensity: 0,
        scanlineIntensity: 0,
        speed: 0.5,
        scanlineFrequency: 0,
        warpAmount: 0,
        resolutionScale: 1,
        verticalPosition: 0
    },
    liquidEther: {
        mouseForce: 20,
        cursorSize: 100,
        isViscous: false,
        viscous: 30,
        iterationsViscous: 32,
        iterationsPoisson: 32,
        dt: 0.014,
        BFECC: true,
        resolution: 0.5,
        isBounce: false,
        colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
        autoDemo: true,
        autoSpeed: 0.5,
        autoIntensity: 2.2,
        takeoverDuration: 0.25,
        autoResumeDelay: 1000,
        autoRampDuration: 0.6
    },
    uiColors: {
        primary: '#5227FF',
        secondary: '#FF9FFC',
        accent: '#B19EEF',
        background: 'rgba(15, 15, 25, 0.95)',
        surface: 'rgba(255, 255, 255, 0.05)',
        text: '#ffffff',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(255, 255, 255, 0.1)',
        success: '#4ade80',
        warning: '#fbbf24',
        error: '#ef4444'
    }
};

export const presetThemes: ThemeConfig[] = [
    defaultTheme,
    {
        name: 'Ocean Deep',
        description: 'Profundidades marinas con tonos azules y verdes tranquilos',
        darkVeil: {
            baseColor1: '#0077BE',
            baseColor2: '#48CAE4',
            hueShift: 180,
            noiseIntensity: 0.02,
            scanlineIntensity: 0.1,
            speed: 0.4,
            scanlineFrequency: 0.2,
            warpAmount: 0.6,
            resolutionScale: 1,
            verticalPosition: 0
        },
        liquidEther: {
            mouseForce: 18,
            cursorSize: 90,
            isViscous: true,
            viscous: 35,
            iterationsViscous: 28,
            iterationsPoisson: 30,
            dt: 0.012,
            BFECC: true,
            resolution: 0.6,
            isBounce: false,
            colors: ['#0077BE', '#00B4D8', '#48CAE4'],
            autoDemo: true,
            autoSpeed: 0.35,
            autoIntensity: 1.8,
            takeoverDuration: 0.35,
            autoResumeDelay: 1500,
            autoRampDuration: 0.7
        },
        uiColors: {
            primary: '#0077BE',
            secondary: '#00B4D8',
            accent: '#48CAE4',
            background: 'rgba(5, 15, 25, 0.95)',
            surface: 'rgba(0, 180, 216, 0.06)',
            text: '#e0f7ff',
            textSecondary: 'rgba(72, 202, 228, 0.8)',
            border: 'rgba(0, 119, 190, 0.2)',
            success: '#06d6a0',
            warning: '#ffd60a',
            error: '#ef233c'
        }
    },
    {
        name: 'Royal Purple',
        description: 'Elegancia real con púrpuras profundos y detalles dorados',
        darkVeil: {
            baseColor1: '#5A189A',
            baseColor2: '#E0AAFF',
            hueShift: 270,
            noiseIntensity: 0.03,
            scanlineIntensity: 0.12,
            speed: 0.7,
            scanlineFrequency: 0.3,
            warpAmount: 0.4,
            resolutionScale: 1,
            verticalPosition: 0
        },
        liquidEther: {
            mouseForce: 25,
            cursorSize: 105,
            isViscous: true,
            viscous: 32,
            iterationsViscous: 30,
            iterationsPoisson: 32,
            dt: 0.014,
            BFECC: true,
            resolution: 0.58,
            isBounce: false,
            colors: ['#5A189A', '#9D4EDD', '#E0AAFF'],
            autoDemo: true,
            autoSpeed: 0.55,
            autoIntensity: 2.3,
            takeoverDuration: 0.28,
            autoResumeDelay: 1100,
            autoRampDuration: 0.6
        },
        uiColors: {
            primary: '#9D4EDD',
            secondary: '#E0AAFF',
            accent: '#FFD60A',
            background: 'rgba(15, 10, 25, 0.95)',
            surface: 'rgba(157, 78, 221, 0.07)',
            text: '#f3e5f5',
            textSecondary: 'rgba(224, 170, 255, 0.85)',
            border: 'rgba(157, 78, 221, 0.25)',
            success: '#10b981',
            warning: '#FFD60A',
            error: '#f72585'
        }
    }
];
