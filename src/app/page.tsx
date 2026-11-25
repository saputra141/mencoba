'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Zap, 
  Smartphone, 
  ArrowRight, 
  Github,
  ShieldCheck,
  Rocket
} from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020203]">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      
      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-medium tracking-widest uppercase text-cyan-400/80">System Online: v2.0.4</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white"
          >
            FUTURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">MOBILE</span> ARCH
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-slate-400 text-lg md:text-xl leading-relaxed"
          >
            Eksperimen porting Next.js ke aplikasi Native Android menggunakan Capacitor dengan arsitektur hybrid modern.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button className="cyber-button group">
              Unduh APK <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-all">
              <Github className="w-5 h-5" /> Repository
            </button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          {[
            { 
              icon: <Cpu className="w-8 h-8 text-cyan-400" />, 
              title: "Engine Porting", 
              desc: "Optimasi runtime JavaScript untuk performa maksimal di perangkat mobile." 
            },
            { 
              icon: <Layers className="w-8 h-8 text-purple-400" />, 
              title: "Hybrid Bridge", 
              desc: "Komunikasi seamless antara lapisan Web dan modul Native Android." 
            },
            { 
              icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />, 
              title: "Secure Build", 
              desc: "Automated CI/CD pipeline dengan enkripsi artifact build." 
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card group hover:border-cyan-500/30 transition-all"
            >
              <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Status Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-8 cyber-panel relative group"
        >
          <div className="scanline" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">GitHub Action Status</h2>
              <p className="text-slate-400">Pipeline otomatis sedang mengonfigurasi build Android...</p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-cyan-400">98%</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-purple-400">~4m</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Build Time</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
    </main>
  );
}
