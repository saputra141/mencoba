'use client';

import React from 'react';
import { Bell, Settings, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between max-w-2xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">MENCОВА APP</h1>
            <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">System Active</span>
          </div>
        </motion.div>

        <div className="flex gap-3">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Bell size={20} className="text-gray-400" />
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
