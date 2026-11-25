'use client';

import { motion } from 'framer-motion';
import { Box, Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <nav className="nav-blur mb-10 px-6 py-4 mx-auto max-w-6xl rounded-3xl border border-white/5 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 animate-pulse-slow" />
            <Box className="relative text-cyan-400" size={28} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">
            Mencoba <span className="text-cyan-400">OS</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Dashboard', 'Builds', 'Logs', 'Settings'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10">
            <Bell size={20} />
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px]">
            <div className="h-full w-full rounded-full bg-[#050506] flex items-center justify-center">
              <User size={20} className="text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
