import React from 'react';
import { Award, Target, Zap } from 'lucide-react';

export default function Stats({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card animate-fade-in" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                   <p style={{ color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Progress</p>
                   <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0.25rem 0', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{percentage}%</h2>
                </div>
                <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '0.75rem', borderRadius: '1rem', color: 'var(--accent-primary)' }}>
                    <Target size={24} />
                </div>
            </div>
            
             <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--accent-gradient)', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}></div>
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {completed} of {total} problems solved
            </p>
        </div>

        <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.75rem', borderRadius: '1rem', color: 'var(--success)' }}>
                    <Award size={24} />
                </div>
                <div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Status</p>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                        {percentage === 100 ? 'Master' : percentage > 75 ? 'Expert' : percentage > 50 ? 'Intermediate' : percentage > 25 ? 'Beginner' : 'Novice'}
                    </h3>
                </div>
            </div>
        </div>
        
         <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.75rem', borderRadius: '1rem', color: 'var(--warning)' }}>
                    <Zap size={24} />
                </div>
                <div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Keep Going</p>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                        {total - completed} To Go
                    </h3>
                </div>
            </div>
        </div>
    </div>
  );
}
