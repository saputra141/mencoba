'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Github, 
  Cpu, 
  Activity, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  Terminal,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';
import { BuildStatus, PortingState } from '@/lib/types';
import Header from '@/components/Header';

export default function ReleaseDashboard() {
  const [state, setState] = useState<PortingState>({
    progress: 0,
    status: 'idle',
    logs: [],
    currentTask: 'Waiting for deployment signal...'
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs.slice(-50), `[${new Date().toLocaleTimeString()}] ${msg}`]
    }));
  };

  const startReleaseProcess = async () => {
    setState(prev => ({ ...prev, status: 'analyzing', progress: 5 }));
    addLog("Initializing build pipeline...");
    
    // Simulate Build Steps
    const steps: { status: BuildStatus; msg: string; p: number }[] = [
      { status: 'analyzing', msg: 'Analyzing repository structure...', p: 15 },
      { status: 'compiling', msg: 'Compiling assets for ARM64 architecture...', p: 45 },
      { status: 'signing', msg: 'Applying cryptographic signatures...', p: 75 },
      { status: 'uploading', msg: 'Pushing build to GitHub Releases...', p: 90 },
      { status: 'completed', msg: 'Release successfully published!', p: 100 },
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 1500));
      setState(prev => ({ 
        ...prev, 
        status: step.status, 
        progress: step.p,
        currentTask: step.msg
      }));
      addLog(step.msg);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.logs]);

  return (
    <main className="min-h-screen bg-[#050506] p-4 pb-24 md:p-8">
      <Header />
      
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Hero Section */}
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-panel p-8"
            >
              <div className="scanline" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-2 text-cyan-400">
                  <Cpu size={20} className="animate-pulse" />
                  <span className="text-sm font-bold tracking-widest uppercase">System Ready</span>
                </div>
                <h1 className="mb-4 text-4xl font-black md:text-6xl">
                  DEPLOY TO <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">RELEASES</span>
                </h1>
                <p className="mb-8 text-slate-400 max-w-md">
                  Otomatisasi porting engine dan publikasi langsung ke GitHub Releases dengan enkripsi end-to-end.
                </p>

                <button 
                  onClick={startReleaseProcess}
                  disabled={state.status !== 'idle' && state.status !== 'completed'}
                  className="cyber-button w-full md:w-auto px-12"
                >
                  <Rocket size={20} />
                  {state.status === 'idle' ? 'START NEW RELEASE' : 'RE-DEPLOY ENGINE'}
                </button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Uptime', value: '99.9%', icon: Activity },
                { label: 'Version', value: 'v2.4.0-prod', icon: Package }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="cyber-panel p-4 flex items-center gap-4"
                >
                  <div className="rounded-xl bg-white/5 p-3 text-cyan-400">
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-tighter">{stat.label}</p>
                    <p className="font-bold">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Console / Terminal Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-[400px] cyber-panel bg-black/40 border-cyan-500/20"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">Core_Engine_Logs</span>
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            
            <div 
              ref={scrollRef}
              className="h-[350px] overflow-y-auto p-4 font-mono text-[11px] leading-relaxed text-cyan-400/80 custom-scrollbar"
            >
              {state.logs.length === 0 && (
                <div className="flex h-full items-center justify-center text-slate-600 italic">
                  Systems idle. Awaiting instruction...
                </div>
              )}
              {state.logs.map((log, i) => (
                <div key={i} className="mb-1 border-l-2 border-cyan-500/20 pl-2">
                  <span className="text-cyan-600">{'>'}</span> {log}
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="border-t border-white/10 p-4 bg-black/40">
              <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>{state.currentTask}</span>
                <span className="text-cyan-400">{state.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${state.progress}%` }}
                  className="loading-gradient h-full bg-cyan-500"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Release Result */}
        <AnimatePresence>
          {state.status === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="cyber-panel border-green-500/30 bg-green-500/5 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-green-500/20 p-4 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Build Successful</h3>
                    <p className="text-sm text-slate-400">Release v1.0.4 is now live on GitHub Production.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 font-bold hover:bg-white/10 transition-colors">
                    <Github size={18} />
                    View on GitHub
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all">
                    <Download size={18} />
                    Get Assets
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
