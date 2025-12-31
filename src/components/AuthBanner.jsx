import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const AuthBanner = ({ onSignUpClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
      padding: '0.75rem 1rem',
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          margin: 0,
          textAlign: 'center'
        }}>
          <span style={{ fontWeight: '600' }}>Track your progress across devices!</span>
          {' '}
          <button
            onClick={onSignUpClick}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline',
              fontSize: '0.875rem',
              padding: 0
            }}
          >
            Sign up for free
          </button>
          {' '}to sync your data.
        </p>
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
            transition: 'all 0.2s',
            marginLeft: 'auto'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(139, 92, 246, 0.2)';
            e.target.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--text-muted)';
          }}
          title="Dismiss (will reappear on reload)"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AuthBanner;
