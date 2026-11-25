"use client";

import { motion } from "framer-motion";
import { Menu, Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <span className="font-black text-black text-xl">M</span>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter leading-none">Version 2.0.4</p>
          <h2 className="font-bold text-sm">SAPUTRA</h2>
        </div>
      </motion.div>

      <div className="flex gap-2">
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform">
          <Bell size={18} className="text-gray-400" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform">
          <Menu size={18} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
