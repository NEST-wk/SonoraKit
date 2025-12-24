import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import './MinimalMenu.css';

interface MinimalMenuProps {
    onNavigateToProfile?: () => void;
    onNavigateToChat?: () => void;
    showProfileOption?: boolean;
    showChatOption?: boolean;
}

// Paleta de colores accesibles y modernos para surfaces
const surfaceColors = [
    { name: 'Gris Oscuro', value: 'rgb(20, 20, 35)' },
    { name: 'Gris Suave', value: 'rgb(32, 32, 42)' },
    { name: 'Azul Suave', value: 'rgb(20, 28, 45)' },
    { name: 'Verde Menta', value: 'rgb(20, 38, 35)' },
    { name: 'Lavanda', value: 'rgb(30, 25, 45)' },
    { name: 'Rosa Suave', value: 'rgb(40, 25, 35)' },
    { name: 'Ámbar', value: 'rgb(40, 32, 20)' },
    { name: 'Coral', value: 'rgb(42, 28, 28)' },
    { name: 'Turquesa', value: 'rgb(20, 35, 38)' },
    { name: 'Violeta', value: 'rgb(28, 22, 42)' },
];

export default function MinimalMenu({
    onNavigateToProfile,
    onNavigateToChat,
    showProfileOption = true,
    showChatOption = false
}: MinimalMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'themes' | 'customize'>('themes');
    const { currentTheme, applyPreset, presets, updateDarkVeilConfig, updateUIColor } = useTheme();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleThemeChange = (themeName: string) => {
        applyPreset(themeName);
    };

    return (
        <>
            {/* Botón del menú */}
            <button
                className="minimal-menu-trigger"
                onClick={toggleMenu}
                aria-label="Abrir menú"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="minimal-menu-overlay" onClick={toggleMenu} />
            )}

            {/* Panel del menú */}
            <div className={`minimal-menu-panel ${isOpen ? 'open' : ''}`}>
                <div className="minimal-menu-header">
                    <h3>Menú</h3>
                    <button
                        className="minimal-menu-close"
                        onClick={toggleMenu}
                        aria-label="Cerrar menú"
                    >
                        ×
                    </button>
                </div>

                <div className="minimal-menu-content">
                    {/* Navegación */}
                    {(showProfileOption || showChatOption) && (
                        <div className="minimal-menu-section">
                            <h4>Navegación</h4>
                            {showChatOption && onNavigateToChat && (
                                <button
                                    className="minimal-menu-item"
                                    onClick={() => {
                                        onNavigateToChat();
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className="menu-icon">💬</span>
                                    <span>Chat</span>
                                </button>
                            )}
                            {showProfileOption && onNavigateToProfile && (
                                <button
                                    className="minimal-menu-item"
                                    onClick={() => {
                                        onNavigateToProfile();
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className="menu-icon">👤</span>
                                    <span>Perfil</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="minimal-menu-tabs">
                        <button
                            className={`menu-tab ${activeTab === 'themes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('themes')}
                        >
                            🎨 Temas
                        </button>
                        <button
                            className={`menu-tab ${activeTab === 'customize' ? 'active' : ''}`}
                            onClick={() => setActiveTab('customize')}
                        >
                            ⚙️ Personalizar
                        </button>
                    </div>

                    {/* Contenido de Temas */}
                    {activeTab === 'themes' && (
                        <div className="minimal-menu-section">
                            <h4>Tema Preestablecido</h4>
                            <div className="minimal-menu-themes">
                                {presets.map((theme) => (
                                    <button
                                        key={theme.name}
                                        className={`minimal-menu-theme ${currentTheme.name === theme.name ? 'active' : ''}`}
                                        onClick={() => handleThemeChange(theme.name)}
                                        title={theme.description}
                                    >
                                        <div
                                            className="theme-preview"
                                            style={{
                                                background: `linear-gradient(135deg, ${theme.darkVeil.baseColor1}, ${theme.darkVeil.baseColor2})`
                                            }}
                                        />
                                        <span className="theme-name">{theme.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contenido de Personalización */}
                    {activeTab === 'customize' && (
                        <>
                            {/* Colores de Surface */}
                            <div className="minimal-menu-section">
                                <h4>Color de Superficie</h4>
                                <p className="section-description">Cambia el color de fondo de los paneles</p>
                                <div className="color-grid">
                                    {surfaceColors.map((color) => (
                                        <button
                                            key={color.name}
                                            className={`color-option ${currentTheme.uiColors.surface === color.value ? 'active' : ''}`}
                                            onClick={() => updateUIColor('surface', color.value)}
                                            title={color.name}
                                            style={{
                                                background: color.value,
                                                border: `2px solid ${color.value.replace('0.08', '0.3')}`
                                            }}
                                        >
                                            {currentTheme.uiColors.surface === color.value && '✓'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dark Veil Effects */}
                            <div className="minimal-menu-section">
                                <h4>Efectos de Fondo</h4>

                                <div className="control-group">
                                    <label>
                                        <span>Desplazamiento de Color</span>
                                        <span className="value">{currentTheme.darkVeil.hueShift}°</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        step="10"
                                        value={currentTheme.darkVeil.hueShift}
                                        onChange={(e) => updateDarkVeilConfig('hueShift', Number(e.target.value))}
                                    />
                                </div>

                                <div className="control-group">
                                    <label>
                                        <span>Intensidad de Ruido</span>
                                        <span className="value">{(currentTheme.darkVeil.noiseIntensity * 100).toFixed(0)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="0.1"
                                        step="0.01"
                                        value={currentTheme.darkVeil.noiseIntensity}
                                        onChange={(e) => updateDarkVeilConfig('noiseIntensity', Number(e.target.value))}
                                    />
                                </div>

                                <div className="control-group">
                                    <label>
                                        <span>Líneas de Escaneo</span>
                                        <span className="value">{(currentTheme.darkVeil.scanlineIntensity * 100).toFixed(0)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="0.3"
                                        step="0.01"
                                        value={currentTheme.darkVeil.scanlineIntensity}
                                        onChange={(e) => updateDarkVeilConfig('scanlineIntensity', Number(e.target.value))}
                                    />
                                </div>

                                <div className="control-group">
                                    <label>
                                        <span>Velocidad de Animación</span>
                                        <span className="value">{currentTheme.darkVeil.speed.toFixed(1)}x</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={currentTheme.darkVeil.speed}
                                        onChange={(e) => updateDarkVeilConfig('speed', Number(e.target.value))}
                                    />
                                </div>

                                <div className="control-group">
                                    <label>
                                        <span>Distorsión</span>
                                        <span className="value">{(currentTheme.darkVeil.warpAmount * 100).toFixed(0)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={currentTheme.darkVeil.warpAmount}
                                        onChange={(e) => updateDarkVeilConfig('warpAmount', Number(e.target.value))}
                                    />
                                </div>

                                <div className="control-group">
                                    <label>
                                        <span>Posición Vertical</span>
                                        <span className="value">{currentTheme.darkVeil.verticalPosition > 0 ? '+' : ''}{currentTheme.darkVeil.verticalPosition}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="-50"
                                        max="50"
                                        step="5"
                                        value={currentTheme.darkVeil.verticalPosition}
                                        onChange={(e) => updateDarkVeilConfig('verticalPosition', Number(e.target.value))}
                                    />
                                    <p className="control-hint">Ajusta la posición del efecto hacia arriba o abajo</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
