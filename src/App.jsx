import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Code2, Github } from 'lucide-react';
import Stats from './components/Stats';
import PatternGroup from './components/PatternGroup';
import problemData from './data/index.js';

import confetti from 'canvas-confetti';
import celebrationSound from './assets/celebration.mp3';

function App() {
  // State for checkmarks
  const [completedIds, setCompletedIds] = useState(() => {
    const saved = localStorage.getItem('dsa-tracker-progress');
    return saved ? JSON.parse(saved) : [];
  });

  // State for search/filter
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('dsa-tracker-progress', JSON.stringify(completedIds));
  }, [completedIds]);

  // State for expanded groups
  const [expandedPatterns, setExpandedPatterns] = useState(() => {
    return [...new Set(problemData.map(p => p.pattern))];
  });

  const toggleGroup = (pattern) => {
    setExpandedPatterns(prev => 
      prev.includes(pattern) 
        ? prev.filter(p => p !== pattern) 
        : [...prev, pattern]
    );
  };

  // Auto-expand on search
  useEffect(() => {
      if (searchTerm) {
          const matchingPatterns = problemData
              .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.pattern.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(p => p.pattern);
          setExpandedPatterns(prev => [...new Set([...prev, ...matchingPatterns])]);
      }
  }, [searchTerm]);

  const toggleProblem = (id) => {
    setCompletedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(pid => pid !== id);
      } else {
        // Play sound
        const audio = new Audio(celebrationSound);
        audio.play().catch(() => {});

        // Fire from left
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.1, y: 0.8 },
          angle: 60
        });
        // Fire from right
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.9, y: 0.8 },
          angle: 120
        });
        return [...prev, id];
      }
    });
  };

  // Get the sequence number for a pattern by looking at the first problem in that pattern
  const getPatternSequence = (pattern) => {
    const problem = problemData.find(p => p.pattern === pattern);
    return problem ? problem.sequence : 999; // Put patterns without sequence at end
  };

  // Group problems by pattern
  // First filter the list based on search/filters
  const filteredProblems = useMemo(() => {
    return problemData.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.pattern.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
      // Simple platform matching (case insensitive partial match logic or exact)
      // The inferred platform in JSON is 'LeetCode', 'GeeksforGeeks', etc.
      const matchesPlatform = platformFilter === 'All' || p.platform === platformFilter;

      return matchesSearch && matchesDifficulty && matchesPlatform;
    });
  }, [searchTerm, difficultyFilter, platformFilter]);

  // Group filtered problems
  const groupedProblems = useMemo(() => {
    const groups = {};
    const allPatterns = [...new Set(problemData.map(p => p.pattern))];
    
    allPatterns.forEach(pattern => {
        groups[pattern] = [];
    });

    filteredProblems.forEach(p => {
        if (groups[p.pattern]) {
            groups[p.pattern].push(p);
        }
    });

    if (searchTerm || difficultyFilter !== 'All' || platformFilter !== 'All') {
        const activeGroups = {};
        Object.keys(groups).forEach(key => {
            if (groups[key].length > 0) activeGroups[key] = groups[key];
        });
        return activeGroups;
    }

    return groups;
  }, [filteredProblems, searchTerm, difficultyFilter, platformFilter]);

  // Expand only the currently visible (filtered) patterns
  const expandAll = () => {
    const visiblePatterns = Object.keys(groupedProblems);
    setExpandedPatterns(prev => {
      const newExpanded = [...new Set([...prev, ...visiblePatterns])];
      return newExpanded;
    });
  };

  // Collapse only the currently visible (filtered) patterns
  const collapseAll = () => {
    const visiblePatterns = Object.keys(groupedProblems);
    setExpandedPatterns(prev => prev.filter(p => !visiblePatterns.includes(p)));
  };

  // Check if all visible patterns are expanded
  const areAllVisibleExpanded = useMemo(() => {
    const visiblePatterns = Object.keys(groupedProblems);
    return visiblePatterns.length > 0 && 
           visiblePatterns.every(p => expandedPatterns.includes(p));
  }, [groupedProblems, expandedPatterns]);

  // Get sorted pattern keys by sequence
  const sortedPatternKeys = useMemo(() => {
    return Object.keys(groupedProblems).sort((a, b) => {
      return getPatternSequence(a) - getPatternSequence(b);
    });
  }, [groupedProblems]);

  const totalProblems = problemData.length;
  const completedCount = completedIds.length;

  return (
    <div className="app-wrapper">
      <header style={{ 
          background: 'rgba(24, 24, 27, 0.8)', 
          backdropFilter: 'blur(12px)', 
          borderBottom: '1px solid var(--border-color)', 
          position: 'sticky', 
          top: 0, 
          zIndex: 100,
          padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img 
                    src="/logo.png" 
                    alt="Sheet Tracker Logo" 
                    style={{ 
                        width: '42px', 
                        height: '42px', 
                        borderRadius: '8px',
                        objectFit: 'contain',
                        filter: 'invert(1)'
                    }} 
                />
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em', display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-secondary)', letterSpacing: '0.1em' }}>Ultimate</span>
                    <span>Sheet Tracker</span>
                </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <a 
                    href="https://youtube.com/playlist?list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&si=JNnnEBLVfrxXIpCj" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'var(--text-muted)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
                    className="nav-link"
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                   <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>Playlist</span>
                </a>
                
                <a 
                    href="https://docs.google.com/spreadsheets/d/1T5-nGsJ9WNwna44e9WWRD0jlZIT5KxVOGvylcvvVrY8/edit?gid=0#gid=0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'var(--text-muted)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
                    className="nav-link"
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                   <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>Sheet</span>
                </a>
                <a href="https://github.com/gauravk-io/sheetTracker" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
                   <Github size={24} />
                </a>
            </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 1rem', flex: 1 }}>
        <Stats total={totalProblems} completed={completedCount} />

        <div className="controls" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                    type="text" 
                    placeholder="Search problems or patterns..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                        width: '100%', 
                        padding: '0.75rem 1rem 0.75rem 2.75rem', 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-md)', 
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }} 
                />
            </div>

            {/* Difficulty Filter */}
            <div style={{ position: 'relative' }}>
                 <Filter size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select 
                    value={difficultyFilter} 
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    style={{ 
                        width: '100%', 
                        padding: '0.75rem 1rem 0.75rem 2.5rem', 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-md)', 
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        appearance: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                    <ChevronDownIcon />
                </div>
            </div>

            {/* Platform Filter */}
             <div style={{ position: 'relative' }}>
                 <Filter size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select 
                    value={platformFilter} 
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    style={{ 
                         width: '100%', 
                        padding: '0.75rem 1rem 0.75rem 2.5rem', 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-md)', 
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        appearance: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <option value="All">All Platforms</option>
                    <option value="LeetCode">LeetCode</option>
                    <option value="GeeksforGeeks">GeeksforGeeks</option>
                    <option value="Other">Other</option>
                </select>
                 <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                    <ChevronDownIcon />
                </div>
            </div>

            {/* Expand/Collapse Toggle */}
            <button 
                onClick={areAllVisibleExpanded ? collapseAll : expandAll} 
                className="btn" 
                style={{ 
                    background: 'var(--bg-secondary)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)', 
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    minWidth: '100px',
                    cursor: 'pointer'
                }}
            >
                {areAllVisibleExpanded ? 'Collapse All' : 'Expand All'}
            </button>
        </div>

        <div className="patterns-list">
            {sortedPatternKeys.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    No problems match your filters.
                </div>
            ) : (
                sortedPatternKeys.map(pattern => {
                    const sequence = getPatternSequence(pattern);
                    const displayName = `${sequence}. ${pattern}`;
                    return (
                        <PatternGroup 
                            key={pattern} 
                            pattern={displayName}
                            problems={groupedProblems[pattern]} 
                            completedIds={completedIds} 
                            onToggle={toggleProblem} 
                            isExpanded={expandedPatterns.includes(pattern)}
                            onToggleExpand={() => toggleGroup(pattern)}
                        />
                    );
                })
            )}
        </div>
      </main>
      
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        <p>Built with ❤️ for Algorithms</p>
      </footer>
    </div>
  );
}

// Simple Icon component for the selects
function ChevronDownIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    )
}

export default App;
