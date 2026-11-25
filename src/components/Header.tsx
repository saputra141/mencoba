"use client";
import React from 'react';
import { Share2, Settings, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="border-b border-white/5 bg-switch-dark/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-3 h-8 bg-switch-red rounded-l-sm" />
            <div className="w-3 h-8 bg-switch-cyan rounded-r-sm" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter">
            SWITCH<span className="text-switch-cyan">NOTIFY</span>
            <span className="text-xs ml-2 text-white/40 font-mono">v1.0.0-PROD</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-switch-cyan transition-colors flex items-center gap-2">
            <Activity size={16} /> Monitoring
          </a>
          <a href="#" className="hover:text-switch-cyan transition-colors flex items-center gap-2">
            <ShieldCheck size={16} /> Security
          </a>
          <a href="#" className="hover:text-switch-cyan transition-colors flex items-center gap-2">
            <Settings size={16} /> Config
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-green-500">ENGINE_ONLINE</span>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
