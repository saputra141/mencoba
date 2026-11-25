'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Activity, Layers, Terminal as TerminalIcon, 
  Settings, Play, CheckCircle2, AlertTriangle, FileCode,
  Box, Cpu, HardDrive, Download
} from 'lucide-react';
import { Header } from '@/components/Header';
import { usePortingEngine } from '@/hooks/useSwitchBridge';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SwitchToAndroidEngine() {
  const { activeProject, setActiveProject, status, logs, report, startAnalysis, runNativeBuild } = usePortingEngine();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <main className="min-h-screen flex flex-col bg-dark-900 overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-white/5 bg-dark-800/30 flex flex-col p-4 gap-2">
          <SidebarItem icon={<Activity size={18}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<Upload size={18}/>} label="Import Project" active={activeTab === 'import'} onClick={() => setActiveTab('import')} />
          <SidebarItem icon={<Layers size={18}/>} label="Analyzer" active={activeTab === 'analyzer'} onClick={() => setActiveTab('analyzer')} />
          <SidebarItem icon={<FileCode size={18}/>} label="Source Explorer" active={activeTab === 'source'} onClick={() => setActiveTab('source')} />
          <SidebarItem icon={<Settings size={18}/>} label="Build Config" active={activeTab === 'config'} onClick={() => setActiveTab('config')} />
          <div className="mt-auto border-t border-white/5 pt-4">
            <div className="p-3 bg-android/5 rounded-xl border border-android/10">
              <p className="text-[10px] text-android font-bold uppercase mb-1">System Health</p>
              <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                <span>NDK R26B</span>
                <span className="text-green-500">Ready</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-full h-full bg-android" />
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 overflow-y-auto terminal-scrollbar flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <header>
                    <h2 className="text-2xl font-bold">Developer Workspace</h2>
                    <p className="text-zinc-500 text-sm mt-1">Manage native porting tasks and compilation pipelines.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard icon={<Cpu className="text-android"/>} label="Core Engine" value="ARM64 Native" />
                    <StatCard icon={<Box className="text-switch"/>} label="Project" value={activeProject?.name || 'None'} />
                    <StatCard icon={<Activity className="text-green-500"/>} label="Build Status" value={status.toUpperCase()} />
                  </div>

                  {!activeProject ? (
                    <div className="border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                        <Upload className="text-zinc-500" />
                      </div>
                      <h3 className="text-lg font-medium">No Project Detected</h3>
                      <p className="text-zinc-500 text-sm max-w-sm mt-2">
                        Upload an authorized Unity, Unreal, or Godot project folder to begin the native porting process.
                      </p>
                      <button 
                        onClick={() => setActiveTab('import')}
                        className="mt-6 px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-android transition-colors"
                      >
                        Start New Project
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Analysis Report */}
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-bold">Compatibility Report</h3>
                          <span className="text-2xl font-black text-android">{report?.compatibilityScore}%</span>
                        </div>
                        <div className="space-y-3">
                          {report?.components.map((comp, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                              <StatusIcon status={comp.status} />
                              <div className="flex-1">
                                <p className="text-xs font-bold">{comp.name}</p>
                                <p className="text-[10px] text-zinc-500">{comp.description}</p>
                              </div>
                              <span className="text-[9px] uppercase tracking-tighter px-2 py-0.5 bg-white/10 rounded-full">
                                {comp.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Build Controls */}
                      <div className="glass-panel rounded-2xl p-6 flex flex-col">
                        <h3 className="font-bold mb-6">Pipeline Control</h3>
                        <div className="space-y-4">
                          <button 
                            onClick={() => startAnalysis(activeProject)}
                            disabled={status !== 'idle'}
                            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-6 hover:bg-white/10 transition-all"
                          >
                            <div className="text-left">
                              <p className="text-sm font-bold">1. Run AI Analyzer</p>
                              <p className="text-[10px] text-zinc-500">Scan dependencies and code patterns</p>
                            </div>
                            <Activity size={20} className="text-android" />
                          </button>

                          <button 
                            onClick={runNativeBuild}
                            disabled={status !== 'idle' || !report}
                            className="w-full py-4 bg-android/10 border border-android/20 rounded-2xl flex items-center justify-between px-6 hover:bg-android/20 transition-all"
                          >
                            <div className="text-left">
                              <p className="text-sm font-bold text-android">2. Native Compilation</p>
                              <p className="text-[10px] text-android/60">Generate ARM64 libraries & APK</p>
                            </div>
                            <Play size={20} className="text-android fill-android" />
                          </button>
                        </div>

                        {status === 'success' && (
                          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-4">
                            <Download className="text-green-500" />
                            <div>
                              <p className="text-xs font-bold text-green-500">Build Artifact Ready</p>
                              <p className="text-[10px] text-green-500/60 font-mono">android_port_release_v1.apk (142MB)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'import' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto py-12"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Import Game Project</h2>
                    <p className="text-zinc-500 text-sm">Upload authorized source code or engine project folders.</p>
                  </div>
                  
                  <div 
                    className="group border-2 border-dashed border-white/10 hover:border-android/50 rounded-[40px] p-20 flex flex-col items-center justify-center transition-all cursor-pointer bg-white/0 hover:bg-android/5"
                    onClick={() => {
                      setActiveProject({
                        id: 'proj_1',
                        name: 'Project_Genesis_Native',
                        engine: 'Unity',
                        sourcePath: '/src/authorized_ports/',
                        lastModified: new Date(),
                        size: '2.4GB',
                        platformSource: 'Nintendo Switch'
                      });
                      setActiveTab('dashboard');
                    }}
                  >
                    <div className="w-20 h-20 bg-android/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Upload className="text-android" size={32} />
                    </div>
                    <p className="text-lg font-medium">Drag and drop folder</p>
                    <p className="text-zinc-500 text-sm mt-2 font-mono">Unity, Unreal, Godot, or CMake projects</p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                      <ShieldCheck size={20} className="text-android" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider">Integrity Check</p>
                        <p className="text-[9px] text-zinc-500">Auto-validates project files</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                      <HardDrive size={20} className="text-android" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider">Large File Support</p>
                        <p className="text-[9px] text-zinc-500">Up to 50GB project size</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Console / Terminal (Bottom Bar) */}
          <div className="h-64 border-t border-white/5 bg-black/50 p-4 font-mono overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-zinc-500" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Build Output Console</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[10px] text-android">CPU: 12%</span>
                <span className="text-[10px] text-android">MEM: 1.4GB</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto terminal-scrollbar space-y-1">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3 text-[11px] items-start animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-zinc-600 shrink-0">[{log.timestamp}]</span>
                  <span className={cn(
                    "shrink-0 px-1.5 rounded-[3px] font-bold",
                    log.level === 'info' && "bg-blue-500/10 text-blue-400",
                    log.level === 'error' && "bg-red-500/10 text-red-400",
                    log.level === 'success' && "bg-green-500/10 text-green-400",
                    log.level === 'warn' && "bg-yellow-500/10 text-yellow-400"
                  )}>{log.module}</span>
                  <span className={cn(
                    log.level === 'error' ? "text-red-400" : "text-zinc-300"
                  )}>{log.message}</span>
                </div>
              ))}
              {status === 'compiling' && (
                <div className="text-[11px] text-android flex items-center gap-2 animate-pulse">
                  <span className="shrink-0">➜</span>
                  <span>Executing NDK cross-compilation pipeline...</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// Components
function SidebarItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
        active 
          ? "bg-android/10 text-android border border-android/20" 
          : "text-zinc-500 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
      {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-android rounded-full shadow-[0_0_8px_#00e5ff]" />}
    </button>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="glass-panel p-5 rounded-2xl">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">{label}</span>
      </div>
      <p className="text-lg font-bold font-mono truncate">{value}</p>
    </div>
  );
}

function StatusIcon({ status }: { status: any }) {
  switch (status) {
    case 'compatible': return <CheckCircle2 size={16} className="text-green-500 shrink-0" />;
    case 'modification_required': return <Activity size={16} className="text-yellow-500 shrink-0" />;
    case 'replacement_required': return <AlertTriangle size={16} className="text-orange-500 shrink-0" />;
    default: return <AlertTriangle size={16} className="text-red-500 shrink-0" />;
  }
}

import { ShieldCheck } from 'lucide-react';
