import React from 'react';
import { Cpu, Signal } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white">
      <div className="flex items-center gap-2">
        <Cpu className="text-blue-500 w-6 h-6" />
        <h1 className="font-bold text-lg tracking-tight">PORTING_CORE v1.0</h1>
      </div>
      <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
        <Signal size={12} />
        <span>SYSTEM ONLINE</span>
      </div>
    </header>
  );
};
