"use client";
import React from 'react';
import { Header } from '@/components/Header';
import { useSwitchBridge } from '@/hooks/useSwitchBridge';
import { usePortingEngine } from '@/hooks/usePortingEngine';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Wifi, 
  Battery, 
  Gamepad2, 
  Terminal as TerminalIcon, 
  Zap,
  Activity,
  AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const { status, logs, connect, disconnect } = useSwitchBridge();
  const { state, progress, startStreaming, stopStreaming } = usePortingEngine();

  return (
    <main className="min-h-screen bg-switch-dark text-white selection:bg-switch-cyan/30">
      <div className="scanline fixed inset-0 pointer-events-none z-50" />
      <Header />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Device Status */}
        <div className="lg:col-span-4 space-y-6">
          <section className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-sm font-mono text-white/40 uppercase tracking-widest">Core Status</h2>
                <p className="text-2xl font-bold mt-1">Console Bridge</p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold border",
                status.isConnected ? "bg-green-500/10 border-green-500 text-green-500" : "bg-red-500/10 border-red-500 text-red-500"
              )}>
                {status.isConnected ? "CONNECTED" : "DISCONNECTED"}
              </div>
            </div>

            <div className="space-y-4">
              <StatusItem 
                icon={<Cpu size={18} />} 
                label="Device" 
                value={status.deviceName || "None Detected"} 
                color="cyan" 
              />
              <StatusItem 
                icon={<Battery size={18} />} 
                label="Power" 
                value={status.isConnected ? `${status.batteryLevel}%` : "---"} 
                color="red" 
              />
              <StatusItem 
                icon={<Wifi size={18} />} 
                label="Address" 
                value={status.ipAddress || "0.0.0.0"} 
                color="cyan" 
              />
              <StatusItem 
                icon={<Zap size={18} />} 
                label="Latency" 
                value={status.isConnected ? `${status.latency}ms` : "---"} 
                color="red" 
              />
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              {!status.isConnected ? (
                <button 
                  onClick={connect}
                  className="w-full bg-switch-cyan text-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  <Activity size={18} /> INITIALIZE BRIDGE
                </button>
              ) : (
                <button 
                  onClick={disconnect}
                  className="w-full bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  TERMINATE CONNECTION
                </button>
              )}
            </div>
          </section>

          <section className="glass-panel p-6 rounded-2xl">
            <h2 className="text-sm font-mono text-white/40 mb-4 uppercase tracking-widest">Active Process</h2>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="w-12 h-12 bg-switch-red/20 rounded-lg flex items-center justify-center text-switch-red">
                <Gamepad2 size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/40 font-mono truncate uppercase">Now Playing</p>
                <p className="font-bold truncate text-sm">
                  {status.activeGame || "No Active Content"}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Logs & Engine */}
        <div className="lg:col-span-8 space-y-6">
          <section className="glass-panel rounded-2xl flex flex-col h-[500px]">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TerminalIcon size={16} className="text-switch-cyan" />
                <span className="text-xs font-mono font-bold uppercase tracking-tighter">System Data Stream</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm terminal-scrollbar space-y-2">
              <AnimatePresence initial={false}>
                {logs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-white/20 italic">
                    Waiting for data stream...
                  </div>
                )}
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-white/20 whitespace-nowrap">[{log.timestamp}]</span>
                    <span className={cn(
                      "font-bold px-1 rounded text-[10px]",
                      log.source === 'SWITCH' ? "text-switch-red bg-switch-red/10" : 
                      log.source === 'BRIDGE' ? "text-switch-cyan bg-switch-cyan/10" : "text-white/40 bg-white/5"
                    )}>
                      {log.source}
                    </span>
                    <span className={cn(
                      log.level === 'error' ? "text-red-500" :
                      log.level === 'success' ? "text-green-400" :
                      log.level === 'warn' ? "text-yellow-500" : "text-white/70"
                    )}>
                      {log.message}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="glass-panel p-6 rounded-2xl relative overflow-hidden">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-switch-cyan/10 rounded-lg text-switch-cyan">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Notification Relay</h3>
                    <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Engine Status: {state}</p>
                  </div>
                </div>
                {state === 'idle' ? (
                  <button 
                    onClick={startStreaming}
                    className="px-6 py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-switch-cyan transition-colors"
                  >
                    START ENGINE
                  </button>
                ) : (
                  <button 
                    onClick={stopStreaming}
                    className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-xs rounded-lg hover:bg-red-500/20"
                  >
                    STOP RELAY
                  </button>
                )}
             </div>

             <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-switch-cyan shadow-[0_0_10px_#00e5ff]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
             </div>
             
             <div className="mt-4 flex justify-between text-[10px] font-mono text-white/30 uppercase">
                <span>Relay Latency: {status.isConnected ? '0.4ms' : '---'}</span>
                <span>Buffer: {Math.floor(progress)}%</span>
                <span>Encrypted: AES-256</span>
             </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatusItem({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: 'cyan' | 'red' }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3 text-white/60">
        <div className={cn(
          "transition-colors",
          color === 'cyan' ? "group-hover:text-switch-cyan" : "group-hover:text-switch-red"
        )}>
          {icon}
        </div>
        <span className="text-xs font-mono uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-mono text-sm font-bold">{value}</span>
    </div>
  );
}
