"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { usePortingEngine } from '@/hooks/usePortingEngine';
import { useSwitchBridge } from '@/hooks/useSwitchBridge';
import { cn } from '@/lib/utils';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Zap, 
  Smartphone,
  HardDrive
} from 'lucide-react';

export default function Dashboard() {
  const { projects, stats, startPorting } = usePortingEngine();
  const { connection, toggleConnection, isScanning } = useSwitchBridge();

  return (
    <main className="min-h-screen bg-[#050506] text-white pb-32 pt-24">
      <Header />
      
      <div className="px-6 space-y-8">
        {/* Connection Status Card */}
        <section>
          <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Bridge Connection</p>
                  <h2 className="text-2xl font-bold">{connection.deviceName}</h2>
                  <p className="text-gray-400 text-sm">{connection.ipAddress}</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                  connection.status === 'connected' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                  {connection.status}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Latency</p>
                  <p className="font-mono text-lg">{connection.latency}ms</p>
                </div>
                <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Status</p>
                  <p className="font-mono text-lg truncate">STABLE</p>
                </div>
              </div>

              <button 
                onClick={toggleConnection}
                disabled={isScanning}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2",
                  connection.status === 'connected' 
                    ? "bg-white/10 text-white hover:bg-white/20" 
                    : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                )}
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scanning...
                  </span>
                ) : (
                  <>
                    <Smartphone size={18} />
                    {connection.status === 'connected' ? 'Disconnect Bridge' : 'Connect Device'}
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
            <div className="bg-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
              <CheckCircle2 size={16} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold">{stats.completed}</p>
            <p className="text-xs text-gray-500 font-medium">Ported Successfully</p>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
            <div className="bg-amber-500/20 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
              <Clock size={16} className="text-amber-400" />
            </div>
            <p className="text-2xl font-bold">{stats.active}</p>
            <p className="text-xs text-gray-500 font-medium">In Progress</p>
          </div>
        </section>

        {/* Active Projects List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Active Projects</h3>
            <button className="text-indigo-400 text-xs font-bold uppercase tracking-wider">View All</button>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 group"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    project.status === 'completed' ? "bg-green-500/10 text-green-500" : 
                    project.status === 'processing' ? "bg-indigo-500/10 text-indigo-500" : "bg-gray-500/10 text-gray-500"
                  )}>
                    {project.status === 'completed' ? <CheckCircle2 size={24} /> : <HardDrive size={24} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{project.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-indigo-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">{Math.round(project.progress)}%</span>
                    </div>
                  </div>

                  {project.status === 'idle' && (
                    <button 
                      onClick={() => startPorting(project.id)}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-indigo-600 transition-colors"
                    >
                      <Play size={16} fill="currentColor" />
                    </button>
                  )}
                  
                  {project.status === 'completed' && (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>

      <Navigation />
    </main>
  );
}
