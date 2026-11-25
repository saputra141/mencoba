"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Battery, Signal } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050506]/80 backdrop-blur-lg border-b border-white/5 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Mencoba Engine</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">System Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
            <Wifi size={14} className="text-green-500" />
            <span className="text-[10px] font-bold">5G</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
            <Battery size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold">88%</span>
          </div>
        </div>
      </div>
    </header>
  );
};
