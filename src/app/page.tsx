'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  RefreshCw, 
  Network, 
  ChevronRight,
  Database,
  Radio
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { usePortingEngine } from '@/hooks/usePortingEngine';
import { useSwitchBridge } from '@/hooks/useSwitchBridge';

export default function Home() {
  const { isProcessing, progress, startPorting } = usePortingEngine();
  const { isConnected, toggleBridge } = useSwitchBridge();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen pb-32 pt-24 px-6 overflow-x-hidden">
      <Header />
      
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            Welcome Back, <span className="text-blue-500">Saputra</span>
          </motion.h2>
          <p className="text-gray-400 mt-1">System status is optimal. All bridges operational.</p>
        </section>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4"
        >
          <motion.div variants={itemVariants} className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Cpu size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">Engine</span>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tighter">98.2%</div>
              <p className="text-[10px] text-gray-500 font-mono">STABILITY CORE</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Network size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">Bridge</span>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tighter">12ms</div>
              <p className="text-[10px] text-gray-500 font-mono">NETWORK LATENCY</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Actions */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest px-1">Control Panel</h3>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 flex items-center justify-between group cursor-pointer overflow-hidden relative"
            onClick={startPorting}
          >
            {isProcessing && (
              <motion.div 
                className="absolute inset-0 bg-blue-600/10 origin-left"
                style={{ width: `${progress}%` }}
              />
            )}
            
            <div className="flex items-center gap-4 relative z-10">
              <div className={`p-3 rounded-xl ${isProcessing ? 'bg-blue-600 animate-spin' : 'bg-blue-600/20 text-blue-400'}`}>
                <RefreshCw size={24} />
              </div>
              <div>
                <h4 className="font-bold">{isProcessing ? 'Processing...' : 'Porting Engine'}</h4>
                <p className="text-xs text-gray-400">{isProcessing ? `Optimizing core ${progress}%` : 'Synchronize system protocols'}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 flex items-center justify-between group cursor-pointer"
            onClick={toggleBridge}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl transition-colors duration-500 ${isConnected ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-emerald-500/20 text-emerald-400'}`}>
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold">Switch Bridge</h4>
                <p className="text-xs text-gray-400">{isConnected ? 'Active Tunneling' : 'Connection Standby'}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${isConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
              {isConnected ? 'ON' : 'OFF'}
            </div>
          </motion.div>
        </section>

        {/* Activity Feed */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest px-1">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { label: 'System Kernel Updated', time: '2m ago', icon: Database, color: 'text-purple-400' },
              { label: 'Bridge Link Established', time: '14m ago', icon: Radio, color: 'text-orange-400' },
            ].map((activity, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white/5 ${activity.color}`}>
                    <activity.icon size={16} />
                  </div>
                  <span className="text-sm font-medium">{activity.label}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Navigation />
    </main>
  );
}
