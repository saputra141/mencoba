"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Cpu, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Layers,
  Terminal
} from 'lucide-react';
import { useNativeBridge } from '@/hooks/useNativeBridge';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { info, isNative, triggerHaptic, platform } = useNativeBridge();

  const cards = [
    { 
      title: "Platform", 
      value: platform.toUpperCase(), 
      icon: <Smartphone className="w-5 h-5 text-blue-400" />,
      desc: "Current running environment"
    },
    { 
      title: "Engine", 
      value: isNative ? "Capacitor Native" : "Web Browser", 
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      desc: "Runtime bridge status"
    },
    { 
      title: "System", 
      value: info?.model || "Generic Device", 
      icon: <Activity className="w-5 h-5 text-green-400" />,
      desc: info?.operatingSystem || "Standard OS"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white p-6 font-sans">
      {/* Header Section */}
      <header className="mb-10 flex justify-between items-start">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
          >
            Native Dashboard
          </motion.h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> CLI-Driven Development Ready
          </p>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-mono border",
          isNative ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" : "border-amber-500/50 text-amber-400 bg-amber-500/10"
        )}>
          {isNative ? "● NATIVE_MODE" : "○ WEB_MODE"}
        </div>
      </header>

      {/* Grid Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#16161a] border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/5 rounded-lg">{card.icon}</div>
              <span className="text-sm font-medium text-gray-400">{card.title}</span>
            </div>
            <div className="text-xl font-semibold mb-1">{card.value}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wider">{card.desc}</div>
          </motion.div>
        ))}
      </section>

      {/* Action Center */}
      <section className="bg-[#16161a] border border-white/5 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Interaction Bridge
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={triggerHaptic}
              className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 flex items-center gap-2"
            >
              <Layers className="w-4 h-4" /> Trigger Haptics
            </button>
            
            <button
              onClick={() => alert(`SDK Version: ${info?.osVersion || 'N/A'}`)}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" /> System Info
            </button>
          </div>
        </div>
        
        {/* Decorative Background Blur */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px]" />
      </section>

      {/* Terminal View (Simulated) */}
      <footer className="mt-auto">
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-500">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="ml-2 text-[10px] text-gray-600 uppercase tracking-widest">Debug Console</span>
          </div>
          <p>{`> npx cap sync android`}</p>
          <p className="text-emerald-500">{`> build successful: ${new Date().toLocaleTimeString()}`}</p>
          <p>{`> watching for native bridges...`}</p>
        </div>
      </footer>
    </main>
  );
}
