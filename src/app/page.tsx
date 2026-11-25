"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { useSwitchBridge } from '@/hooks/useSwitchBridge';
import { usePortingEngine } from '@/hooks/usePortingEngine';
import { Activity, Zap, Layers, RefreshCw } from 'lucide-react';

export default function Home() {
  const { bridges, toggleBridge } = useSwitchBridge();
  const { progress, isRunning, startPorting } = usePortingEngine();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      <Header />
      
      <div className="p-4 space-y-6">
        {/* Engine Status Card */}
        <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Porting Engine</h2>
              <p className="text-2xl font-bold mt-1">Core Processor</p>
            </div>
            <button 
              onClick={startPorting}
              disabled={isRunning}
              className={`p-3 rounded-xl transition-all ${isRunning ? 'bg-blue-500/20 text-blue-500 animate-spin' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            >
              <RefreshCw size={24} />
            </button>
          </div>

          <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-xs mt-2 font-mono text-blue-400">{progress}% COMPLETE</p>
        </section>

        {/* Bridge Grid */}
        <div className="grid grid-cols-2 gap-4">
          {bridges.map((bridge) => (
            <motion.button
              key={bridge.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleBridge(bridge.id)}
              className={`p-4 rounded-2xl border transition-all text-left ${
                bridge.status === 'active' 
                ? 'bg-emerald-500/10 border-emerald-500/30' 
                : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                bridge.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {bridge.id === '1' ? <Zap size={20} /> : <Layers size={20} />}
              </div>
              <h3 className="font-semibold text-sm">{bridge.name}</h3>
              <p className={`text-[10px] mt-1 ${bridge.status === 'active' ? 'text-emerald-400' : 'text-slate-500'}`}>
                {bridge.status.toUpperCase()} • {bridge.load}% LOAD
              </p>
            </motion.button>
          ))}
        </div>

        {/* System Activity */}
        <section className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <Activity size={16} className="text-blue-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Live Logs</h2>
          </div>
          <div className="p-4 font-mono text-[10px] space-y-2 h-40 overflow-y-auto bg-black/20">
            <p className="text-blue-400">[SYSTEM] Initializing bridge protocols...</p>
            <p className="text-slate-500">[INFO] Layer 7 handshake established.</p>
            <p className="text-emerald-400">[OK] Native bridge listener attached.</p>
            {isRunning && <p className="text-yellow-400 animate-pulse">[PROC] Syncing assets to /out directory...</p>}
            {progress === 100 && <p className="text-cyan-400">[SUCCESS] Export completed.</p>}
          </div>
        </section>
      </div>

      <Navigation />
    </main>
  );
}
