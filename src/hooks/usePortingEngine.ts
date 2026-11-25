import { useState, useCallback, useEffect } from 'react';
import { EngineStatus, PortingProject } from '@/lib/types';

export const usePortingEngine = () => {
  const [projects, setProjects] = useState<PortingProject[]>([
    { id: '1', name: 'Legacy Engine Alpha', progress: 100, status: 'completed', lastUpdated: '2024-03-20' },
    { id: '2', name: 'Project Catalyst', progress: 45, status: 'processing', lastUpdated: '2024-03-21' },
    { id: '3', name: 'Nintendo Switch Port V2', progress: 0, status: 'idle', lastUpdated: '2024-03-21' },
  ]);

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const startPorting = useCallback((id: string) => {
    setActiveProjectId(id);
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'processing' as EngineStatus } : p
    ));
  }, []);

  // Simulasi progress untuk demo produksi
  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prev => prev.map(p => {
        if (p.status === 'processing' && p.progress < 100) {
          const nextProgress = Math.min(p.progress + Math.random() * 5, 100);
          return { 
            ...p, 
            progress: nextProgress, 
            status: nextProgress === 100 ? 'completed' : 'processing' 
          };
        }
        return p;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    projects,
    activeProjectId,
    startPorting,
    stats: {
      total: projects.length,
      completed: projects.filter(p => p.status === 'completed').length,
      active: projects.filter(p => p.status === 'processing').length
    }
  };
};
