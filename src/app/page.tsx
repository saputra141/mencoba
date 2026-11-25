"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Terminal, 
  Zap, 
  Layers, 
  RefreshCw, 
  Wifi, 
  Database,
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/Header';
import { usePortingEngine } from '@/hooks/usePortingEngine';
import { useSwitchBridge } from '@/hooks/useSwitchBridge';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const { state, startPorting, reset } = usePortingEngine();
  const { bridge, toggleConnection } = useSwitchBridge();

  return (
    <main className="min-h-screen bg-switch-dark text-white font-sans selection:bg-switch-cyan/30">
      <Header />
      
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Porting Control */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-switch-card border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers size={160} />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Engine Controller</h2>
                  <p className="text-white/50 text-sm">Convert and optimize assets for target hardware architecture.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => startPorting("Project_Alpha_v1.0")}
                    disabled={state.status === 'processing'}
                    className="flex items-center gap-2 bg-switch-cyan text-black px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {state.status === 'processing' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                    {state.status === 'processing' ? 'PORTING...' : 'START ENGINE'}
                  </button>
                </div>
              </div>

              {/* Progress UI */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-mono text-switch-cyan uppercase tracking-wider">{state.currentTask}</span>
                  <span className="text-2xl font-mono font-bold italic">{state.progress}%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${state.progress}%` }}
                    className="h-full bg-gradient-to-r from-switch-cyan to-blue-500 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  />
                </div>
              </div>

              {/* Terminal Output */}
              <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-[12px] h-48 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-2 text-white/30 mb-2 border-b border-white/5 pb-2">
                  <Terminal size={14} />
                  <span>PROCESS_LOGS_SYSTEM_v4.0</span>
                </div>
                <AnimatePresence initial={false}>
                  {state.logs.length === 0 && <div className="text-white/20 italic">Waiting for process initialization...</div>}
                  {state.logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "py-0.5",
                        log.startsWith('Error') ? "text-switch-red" : "text-white/70"
                      )}
                    >
                      <span className="text-white/20 mr-2">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Status & Bridge */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Connection Status */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-switch-card border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  bridge.isConnected ? "bg-switch-cyan/20 text-switch-cyan" : "bg-white/5 text-white/40"
                )}>
                  <Wifi size={20} />
                </div>
                <h3 className="font-bold">Switch Bridge</h3>
              </div>
              <button 
                onClick={toggleConnection}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  bridge.isConnected 
                    ? "bg-switch-red/10 border-switch-red/20 text-switch-red hover:bg-switch-red/20" 
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                )}
              >
                {bridge.isConnected ? 'DISCONNECT' : 'CONNECT'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-white/50">Device Name</span>
                <span className="text-sm font-medium">{bridge.deviceName}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-white/50">Transfer Rate</span>
                <span className={cn(
                  "text-sm font-mono font-bold",
                  bridge.activeTransfer ? "text-switch-cyan" : "text-white/30"
                )}>
                  {bridge.transferRate}
                </span>
              </div>
            </div>

            {bridge.activeTransfer && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-white/5"
              >
                <div className="flex items-center gap-3 text-switch-cyan animate-pulse">
                  <RefreshCw size={14} className="animate-spin" />
                  <span className="text-[11px] font-bold uppercase tracking-tighter">Synchronizing file clusters...</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <QuickActionCard 
              icon={<Database size={20} />} 
              title="Asset Manager" 
              desc="View local files"
              delay={0.2}
            />
            <QuickActionCard 
              icon={<ArrowRightLeft size={20} />} 
              title="File Bridge" 
              desc="P2P Transfer"
              delay={0.3}
            />
          </div>
          
          {/* Stats */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <Zap className="text-yellow-500/20" size={48} />
             </div>
             <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Engine Performance</h4>
             <div className="flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tighter">12.4</span>
                <span className="text-lg text-white/40 mb-1">GFLOPS</span>
             </div>
             <div className="mt-4 flex gap-1">
                {[40, 70, 45, 90, 65, 80, 35, 60, 50, 75].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/10 rounded-t-sm h-8 relative">
                    <div className="absolute bottom-0 left-0 right-0 bg-switch-cyan/40 rounded-t-sm" style={{ height: `${h}%` }} />
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function QuickActionCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-switch-card border border-white/10 p-5 rounded-2xl text-left hover:border-switch-cyan/50 hover:bg-white/5 transition-all group"
    >
      <div className="mb-4 text-white/40 group-hover:text-switch-cyan transition-colors">{icon}</div>
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-[11px] text-white/40">{desc}</p>
    </motion.button>
  );
}
