"use client";
import { Gamepad2, Bell, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-white/10 py-4 px-6 flex justify-between items-center bg-switch-dark sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-switch-red p-2 rounded-lg">
          <Gamepad2 size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">SwitchNotify <span className="text-switch-blue">Bridge</span></h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Settings size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-switch-red to-switch-blue p-[2px]">
          <div className="w-full h-full rounded-full bg-switch-dark flex items-center justify-center">
             <span className="text-xs font-bold">USR</span>
          </div>
        </div>
      </div>
    </header>
  );
}
