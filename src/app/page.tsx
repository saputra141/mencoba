"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Layers,
  ArrowUpRight
} from "lucide-react";
import Header from "@/components/Header";
import { useState } from "react";

export default function MobileDashboard() {
  const [activeTab, setActiveTab] = useState('bridge');

  return (
    <main className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full gap-6">
      <Header />

      {/* Hero Section - Mobile Optimized */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cpu size={120} strokeWidth={1} />
        </div>
        
        <div className="relative z-10">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
            System Status: Optimal
          </span>
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Mencoba Core
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            High-speed architecture for seamless cross-platform bridging.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="btn-primary flex items-center gap-2 text-sm">
            Initialize <Zap size={16} fill="currentColor" />
          </button>
          <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
            Config
          </button>
        </div>
      </motion.div>

      {/* Grid Features */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Smartphone, label: "Porting", color: "text-blue-400", desc: "Native Bridge" },
          { icon: ShieldCheck, label: "Secure", color: "text-emerald-400", desc: "AES-256" },
          { icon: Layers, label: "Assets", color: "text-purple-400", desc: "Optimization" },
          { icon: Zap, label: "Boost", color: "text-amber-400", desc: "Turbo Core" },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-4 flex flex-col gap-3 active:bg-white/10 transition-colors cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">{item.label}</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Monitor */}
      <div className="glass-card flex-1 p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Live Processing
          </h2>
          <ArrowUpRight size={16} className="text-gray-500" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="h-8 w-1 bg-cyan-500/50 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Thread #00{i}</span>
                  <span className="text-cyan-400">98%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_#00e5ff]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
