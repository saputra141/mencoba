"use client";

import React from 'react';
import { Cpu, Github, Activity, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="border-b border-white/10 bg-switch-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="bg-switch-cyan/20 p-2 rounded-lg">
            <Cpu className="w-6 h-6 text-switch-cyan" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-lg leading-none">SWITCHCORE</h1>
            <p className="text-white/40 text-[10px] font-mono mt-1 uppercase tracking-widest">Advanced Porting Engine</p>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-white/60 hover:text-switch-cyan transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-switch-cyan transition-colors">Porting Kit</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-switch-cyan transition-colors">Bridge</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-switch-cyan transition-colors">Settings</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-mono text-white/70 uppercase">Engine Online</span>
          </div>
          <button className="text-white/60 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
