'use client';
import React from 'react';
import { Cpu, Terminal, ShieldCheck, Box } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 border-b border-white/5 bg-dark-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-switch to-android rounded-lg flex items-center justify-center">
          <Cpu size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">SWITCH2ANDROID</h1>
          <p className="text-[10px] text-zinc-500 font-mono">NATIVE PORTING ENGINE v1.0.4</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        {['Workspace', 'Analyzers', 'NDK Config', 'Build Pipeline'].map((item) => (
          <button key={item} className="text-xs font-medium text-zinc-400 hover:text-android transition-colors">
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
          <ShieldCheck size={14} className="text-green-500" />
          <span className="text-[10px] font-medium text-green-500 uppercase tracking-wider">Authorized Only</span>
        </div>
      </div>
    </header>
  );
};
