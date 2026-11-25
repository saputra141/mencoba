'use client';

import React from 'react';
import { Home, Cpu, Activity, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Cpu, label: 'Engine', active: false },
  { icon: Activity, label: 'Stats', active: false },
  { icon: User, label: 'Profile', active: false },
];

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 bg-gradient-to-t from-black via-black/90 to-transparent">
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-around p-2">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
              item.active ? "text-blue-500 bg-blue-500/10" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <item.icon size={22} strokeWidth={item.active ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
            {item.active && (
              <motion.div 
                layoutId="nav-indicator"
                className="w-1 h-1 bg-blue-500 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
