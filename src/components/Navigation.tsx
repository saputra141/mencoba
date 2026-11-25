"use client";
import React from 'react';
import { LayoutGrid, Layers, Share2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutGrid, label: 'Dash', active: true },
  { icon: Layers, label: 'Projects', active: false },
  { icon: Share2, label: 'Bridge', active: false },
  { icon: Settings, label: 'Config', active: false },
];

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#050506] border-t border-white/5 px-6 pb-8 pt-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              item.active ? "text-indigo-500" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <item.icon size={24} strokeWidth={item.active ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            {item.active && (
              <div className="w-1 h-1 bg-indigo-500 rounded-full mt-1" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
