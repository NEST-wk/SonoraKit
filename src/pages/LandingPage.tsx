import React from 'react';
import LiquidEther from '../components/LiquidEther';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-container">
            <LiquidEther
                className="landing-background"
                colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
            />

            <div className="landing-content">
                <h1 className="landing-title">SonoraKit</h1>
                <p className="landing-subtitle">
                    Tu asistente de IA personalizable. Usa cualquier modelo de lenguaje con tu propia API key.
                </p>

                <div className="landing-actions">
                    <button className="btn btn-primary" onClick={() => console.log('Navigate to Register')}>
                        Comenzar
                    </button>
                    <button className="btn btn-secondary" onClick={() => console.log('Navigate to Login')}>
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
