'use client';

import React from 'react';
import { Cpu, Wifi, Bell, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <header className="h-16 border-b border-white/5 bg-switch-dark/50 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-switch-red rounded-sm flex items-center justify-center transform -skew-x-12">
          <Shield className="text-white w-5 h-5 skew-x-12" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">SWITCH<span className="text-switch-cyan">NOTIFY</span></h1>
          <p className="text-[10px] text-zinc-500 font-mono leading-none tracking-widest">BRIDGE ENGINE V1.0.4</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-switch-cyan" />
            <span className="text-zinc-400">ENGINE:</span>
            <span className="text-green-500">ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-switch-cyan" />
            <span className="text-zinc-400">SIGNAL:</span>
            <span className="text-white">-42dBm</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'} animate-pulse`} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {isConnected ? 'Link Established' : 'Searching...'}
          </span>
        </div>
        
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-switch-red rounded-full" />
        </button>
      </div>
    </header>
  );
};
