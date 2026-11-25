'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Terminal, 
  Battery, 
  Thermometer, 
  Layers, 
  Zap,
  Gamepad2,
  Clock
} from 'lucide-react';
import { Header } from '@/components/Header';
import { useSwitchBridge } from '@/hooks/useSwitchBridge';
import { usePortingEngine } from '@/hooks/usePortingEngine';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const { status, logs, addLog } = useSwitchBridge();
  const { stats } = usePortingEngine();

  return (
    <main className="min-h-screen bg-switch-dark text-white selection:bg-switch-cyan/30">
      <Header isConnected={status.isConnected} />
      
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stats & Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Card */}
          <div className="glass-panel p-5 rounded-xl space-y-4 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-tighter">System Health</p>
                <h2 className="text-xl font-bold italic">CONNECTED</h2>
              </div>
              <Activity className="text-switch-cyan w-5 h-5" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="w-3 h-3 text-orange-500" />
                  <span className="text-[10px] text-zinc-400 uppercase">Temp</span>
                </div>
                <p className="text-lg font-mono">{stats.temperature}°C</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <Battery className="w-3 h-3 text-green-500" />
                  <span className="text-[10px] text-zinc-400 uppercase">Battery</span>
                </div>
                <p className="text-lg font-mono">{stats.batteryLevel}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-mono text-zinc-500">
                <span>CPU Load</span>
                <span>{stats.cpuUsage}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.cpuUsage}%` }}
                  className="h-full bg-switch-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Connection Details */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-zinc-500 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Connection Details
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Latency', value: `${status.latency}ms`, color: 'text-green-500' },
                { label: 'Active Port', value: status.activePort, color: 'text-switch-cyan' },
                { label: 'Uptime', value: '04:12:09', color: 'text-white' },
                { label: 'Protocol', value: 'UDP/SwitchLink', color: 'text-white' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-zinc-400 font-mono">{item.label}</span>
                  <span className={cn("text-xs font-mono font-bold", item.color)}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Live Logs */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-160px)]">
          <div className="glass-panel flex-1 rounded-xl flex flex-col overflow-hidden border-switch-cyan/20">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-switch-cyan" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Live Bridge Output</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] terminal-scrollbar scanline relative">
              {logs.map((log) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={log.id} 
                  className="mb-1 flex gap-3"
                >
                  <span className="text-zinc-600">[{log.timestamp}]</span>
                  <span className={cn(
                    "font-bold min-w-[60px]",
                    log.level === 'success' && "text-green-500",
                    log.level === 'info' && "text-switch-cyan",
                    log.level === 'warn' && "text-yellow-500",
                    log.level === 'error' && "text-switch-red"
                  )}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-zinc-300">{log.message}</span>
                </motion.div>
              ))}
              {logs.length === 0 && (
                <div className="h-full flex items-center justify-center text-zinc-500 animate-pulse italic">
                  Waiting for data packets...
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-6 flex gap-4">
            <button 
              onClick={() => addLog('Manual sync triggered by operator', 'warn', 'USER')}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-switch-cyan" />
              <span className="text-xs font-bold uppercase tracking-wider">Sync Database</span>
            </button>
            <button className="flex-1 bg-switch-red/10 hover:bg-switch-red/20 border border-switch-red/20 py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 group">
              <Gamepad2 className="w-4 h-4 text-switch-red group-hover:animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-wider">Launch Manager</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative BG element */}
      <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-20">
        <Clock className="w-64 h-64 text-switch-cyan/10 rotate-12" />
      </div>
    </main>
  );
}
