import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import './ThemeCustomizer.css';

export default function ThemeCustomizer() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'darkveil' | 'liquidether' | 'uicolors'>('darkveil');
    const { currentTheme, updateDarkVeilConfig, updateLiquidEtherConfig, updateUIColor, resetTheme, applyPreset, presets } = useTheme();

    const dv = currentTheme.darkVeil;
    const le = currentTheme.liquidEther;

    const handleColorChange = (index: number, color: string) => {
        const newColors = [...le.colors];
        newColors[index] = color;
        updateLiquidEtherConfig('colors', newColors);
    };

    const addColor = () => {
        updateLiquidEtherConfig('colors', [...le.colors, '#FFFFFF']);
    };

    const removeColor = (index: number) => {
        if (le.colors.length > 1) {
            const newColors = le.colors.filter((_, i) => i !== index);
            updateLiquidEtherConfig('colors', newColors);
        }
    };

    return (
        <>
            <button
                className={`theme-customizer-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Theme Customizer"
            >
                {isOpen ? '✕' : '🎨'}
            </button>

            <div className={`theme-customizer ${!isOpen ? 'collapsed' : ''}`}>
                <div className="theme-customizer-content">
                    <div className="customizer-header">
                        <h2 className="customizer-title">Theme Studio</h2>
                        <div className="customizer-actions">
                            <button className="btn-icon" onClick={resetTheme} title="Reset to default">
                                ↺
                            </button>
                        </div>
                    </div>

                    <div className="preset-section">
                        <div className="section-title">🎭 Preset Themes</div>
                        <div className="preset-buttons">
                            {presets.map(preset => (
                                <button
                                    key={preset.name}
                                    className={`preset-btn ${currentTheme.name === preset.name ? 'active' : ''}`}
                                    onClick={() => applyPreset(preset.name)}
                                    title={preset.description}
                                >
                                    <span>{preset.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'darkveil' ? 'active' : ''}`}
                            onClick={() => setActiveTab('darkveil')}
                        >
                            Background
                        </button>
                        <button
                            className={`tab ${activeTab === 'liquidether' ? 'active' : ''}`}
                            onClick={() => setActiveTab('liquidether')}
                        >
                            Liquid
                        </button>
                        <button
                            className={`tab ${activeTab === 'uicolors' ? 'active' : ''}`}
                            onClick={() => setActiveTab('uicolors')}
                        >
                            Colors
                        </button>
                    </div>

                    {activeTab === 'darkveil' && (
                        <div className="controls-section">
                            <div className="section-title">DarkVeil Properties</div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Hue Shift</span>
                                    <span className="control-value">{dv.hueShift.toFixed(0)}°</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="360"
                                    step="1"
                                    value={dv.hueShift}
                                    onChange={e => updateDarkVeilConfig('hueShift', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Noise Intensity</span>
                                    <span className="control-value">{dv.noiseIntensity.toFixed(3)}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="0.2"
                                    step="0.001"
                                    value={dv.noiseIntensity}
                                    onChange={e => updateDarkVeilConfig('noiseIntensity', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Scanline Intensity</span>
                                    <span className="control-value">{dv.scanlineIntensity.toFixed(2)}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={dv.scanlineIntensity}
                                    onChange={e => updateDarkVeilConfig('scanlineIntensity', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Speed</span>
                                    <span className="control-value">{dv.speed.toFixed(2)}x</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="3"
                                    step="0.1"
                                    value={dv.speed}
                                    onChange={e => updateDarkVeilConfig('speed', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Scanline Frequency</span>
                                    <span className="control-value">{dv.scanlineFrequency.toFixed(2)}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="2"
                                    step="0.05"
                                    value={dv.scanlineFrequency}
                                    onChange={e => updateDarkVeilConfig('scanlineFrequency', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Warp Amount</span>
                                    <span className="control-value">{dv.warpAmount.toFixed(2)}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={dv.warpAmount}
                                    onChange={e => updateDarkVeilConfig('warpAmount', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Resolution Scale</span>
                                    <span className="control-value">{dv.resolutionScale.toFixed(2)}x</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0.3"
                                    max="2"
                                    step="0.1"
                                    value={dv.resolutionScale}
                                    onChange={e => updateDarkVeilConfig('resolutionScale', parseFloat(e.target.value))}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'liquidether' && (
                        <div className="controls-section">
                            <div className="section-title">LiquidEther Properties</div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Mouse Force</span>
                                    <span className="control-value">{le.mouseForce.toFixed(0)}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="5"
                                    max="100"
                                    step="1"
                                    value={le.mouseForce}
                                    onChange={e => updateLiquidEtherConfig('mouseForce', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Cursor Size</span>
                                    <span className="control-value">{le.cursorSize.toFixed(0)}px</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="20"
                                    max="300"
                                    step="10"
                                    value={le.cursorSize}
                                    onChange={e => updateLiquidEtherConfig('cursorSize', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Resolution</span>
                                    <span className="control-value">{le.resolution.toFixed(2)}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0.2"
                                    max="1"
                                    step="0.05"
                                    value={le.resolution}
                                    onChange={e => updateLiquidEtherConfig('resolution', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="isViscous"
                                    className="checkbox"
                                    checked={le.isViscous}
                                    onChange={e => updateLiquidEtherConfig('isViscous', e.target.checked)}
                                />
                                <label htmlFor="isViscous" className="checkbox-label">Enable Viscosity</label>
                            </div>

                            {le.isViscous && (
                                <div className="control-group">
                                    <label className="control-label">
                                        <span>Viscosity</span>
                                        <span className="control-value">{le.viscous.toFixed(0)}</span>
                                    </label>
                                    <input
                                        type="range"
                                        className="slider"
                                        min="10"
                                        max="100"
                                        step="5"
                                        value={le.viscous}
                                        onChange={e => updateLiquidEtherConfig('viscous', parseFloat(e.target.value))}
                                    />
                                </div>
                            )}

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Poisson Iterations</span>
                                    <span className="control-value">{le.iterationsPoisson}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="16"
                                    max="64"
                                    step="4"
                                    value={le.iterationsPoisson}
                                    onChange={e => updateLiquidEtherConfig('iterationsPoisson', parseInt(e.target.value))}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Delta Time</span>
                                    <span className="control-value">{le.dt.toFixed(4)}</span>
                                </label>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0.005"
                                    max="0.03"
                                    step="0.001"
                                    value={le.dt}
                                    onChange={e => updateLiquidEtherConfig('dt', parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="BFECC"
                                    className="checkbox"
                                    checked={le.BFECC}
                                    onChange={e => updateLiquidEtherConfig('BFECC', e.target.checked)}
                                />
                                <label htmlFor="BFECC" className="checkbox-label">Enable BFECC</label>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="isBounce"
                                    className="checkbox"
                                    checked={le.isBounce}
                                    onChange={e => updateLiquidEtherConfig('isBounce', e.target.checked)}
                                />
                                <label htmlFor="isBounce" className="checkbox-label">Enable Bounce</label>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="autoDemo"
                                    className="checkbox"
                                    checked={le.autoDemo}
                                    onChange={e => updateLiquidEtherConfig('autoDemo', e.target.checked)}
                                />
                                <label htmlFor="autoDemo" className="checkbox-label">Auto Demo</label>
                            </div>

                            {le.autoDemo && (
                                <>
                                    <div className="control-group">
                                        <label className="control-label">
                                            <span>Auto Speed</span>
                                            <span className="control-value">{le.autoSpeed.toFixed(2)}</span>
                                        </label>
                                        <input
                                            type="range"
                                            className="slider"
                                            min="0.1"
                                            max="2"
                                            step="0.1"
                                            value={le.autoSpeed}
                                            onChange={e => updateLiquidEtherConfig('autoSpeed', parseFloat(e.target.value))}
                                        />
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label">
                                            <span>Auto Intensity</span>
                                            <span className="control-value">{le.autoIntensity.toFixed(2)}</span>
                                        </label>
                                        <input
                                            type="range"
                                            className="slider"
                                            min="0.5"
                                            max="5"
                                            step="0.1"
                                            value={le.autoIntensity}
                                            onChange={e => updateLiquidEtherConfig('autoIntensity', parseFloat(e.target.value))}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="control-group">
                                <div className="section-title" style={{ marginTop: '12px' }}>Colors</div>
                                <div className="color-inputs">
                                    {le.colors.map((color, index) => (
                                        <div key={index} className="color-input-wrapper">
                                            <input
                                                type="color"
                                                className="color-input"
                                                value={color}
                                                onChange={e => handleColorChange(index, e.target.value)}
                                                title={`Color ${index + 1}`}
                                            />
                                            {le.colors.length > 1 && (
                                                <button
                                                    onClick={() => removeColor(index)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-6px',
                                                        right: '-6px',
                                                        width: '18px',
                                                        height: '18px',
                                                        borderRadius: '50%',
                                                        background: '#ff3f6c',
                                                        border: 'none',
                                                        color: 'white',
                                                        fontSize: '12px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {le.colors.length < 8 && (
                                        <button className="add-color-btn" onClick={addColor} title="Add color">
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'uicolors' && (
                        <div className="controls-section">
                            <div className="section-title">🎨 UI Color Palette</div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Primary Color</span>
                                    <span className="control-value">{currentTheme.uiColors.primary}</span>
                                </label>
                                <input
                                    type="color"
                                    className="color-input"
                                    value={currentTheme.uiColors.primary}
                                    onChange={e => updateUIColor('primary', e.target.value)}
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Secondary Color</span>
                                    <span className="control-value">{currentTheme.uiColors.secondary}</span>
                                </label>
                                <input
                                    type="color"
                                    className="color-input"
                                    value={currentTheme.uiColors.secondary}
                                    onChange={e => updateUIColor('secondary', e.target.value)}
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Accent Color</span>
                                    <span className="control-value">{currentTheme.uiColors.accent}</span>
                                </label>
                                <input
                                    type="color"
                                    className="color-input"
                                    value={currentTheme.uiColors.accent}
                                    onChange={e => updateUIColor('accent', e.target.value)}
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Text Color</span>
                                    <span className="control-value">{currentTheme.uiColors.text}</span>
                                </label>
                                <input
                                    type="color"
                                    className="color-input"
                                    value={currentTheme.uiColors.text}
                                    onChange={e => updateUIColor('text', e.target.value)}
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Success Color</span>
                                    <span className="control-value">{currentTheme.uiColors.success}</span>
                                </label>
                                <input
                                    type="color"
                                    className="color-input"
                                    value={currentTheme.uiColors.success}
                                    onChange={e => updateUIColor('success', e.target.value)}
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Warning Color</span>
                                    <span className="control-value">{currentTheme.uiColors.warning}</span>
                                </label>
                                <input
                                    type="color"
                                    className="color-input"
                                    value={currentTheme.uiColors.warning}
                                    onChange={e => updateUIColor('warning', e.target.value)}
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">
                                    <span>Error Color</span>
                                    <span className="control-value">{currentTheme.uiColors.error}</span>
                                </label>
                                <input
                                    type="color"
                                    className="color-input"
                                    value={currentTheme.uiColors.error}
                                    onChange={e => updateUIColor('error', e.target.value)}
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
