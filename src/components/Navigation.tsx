import React from 'react';
import { Home, Settings, Terminal, Shield } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 px-6 py-3">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <NavButton icon={<Home size={20} />} active />
        <NavButton icon={<Terminal size={20} />} />
        <NavButton icon={<Shield size={20} />} />
        <NavButton icon={<Settings size={20} />} />
      </div>
    </nav>
  );
};

const NavButton = ({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) => (
  <button className={`p-2 rounded-xl transition-colors ${active ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon}
  </button>
);
