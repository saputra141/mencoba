"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import { useSwitchBridge } from '@/hooks/useSwitchBridge';
import { Share2, Clock, Circle, ShieldAlert } from 'lucide-react';

export default function Dashboard() {
  const { games, notifications, permission, requestPermission } = useSwitchBridge();

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Header />
      
      <main className="p-6 space-y-8">
        {/* Permission Banner */}
        {permission !== 'granted' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-switch-blue/20 border border-switch-blue/40 p-4 rounded-xl flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-switch-blue" />
              <p className="text-sm font-medium">Aktifkan notifikasi browser untuk menerima update real-time dari Switch Anda.</p>
            </div>
            <button 
              onClick={requestPermission}
              className="bg-switch-blue hover:bg-switch-blue/80 text-black px-4 py-2 rounded-lg font-bold text-xs transition-all"
            >
              ENABLE NOTIFICATIONS
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Games List (Left & Center) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-switch-red rounded-full" />
              CONNECTED GAMES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map((game) => (
                <motion.div 
                  key={game.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-switch-gray/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col"
                >
                  <img src={game.imageUrl} alt={game.title} className="h-40 object-cover w-full opacity-80" />
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm leading-tight max-w-[70%]">{game.title}</h3>
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold ${
                        game.status === 'Online' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'
                      }`}>
                        <Circle size={8} fill="currentColor" />
                        {game.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-white/50">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {game.playTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 size={12} />
                        Sync Active
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity/Notification Feed (Right) */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-switch-blue rounded-full" />
              LIVE FEED
            </h2>
            <div className="bg-switch-gray/20 rounded-2xl border border-white/5 p-4 h-[600px] overflow-y-auto space-y-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-2">
                    <Bell size={48} strokeWidth={1} />
                    <p className="text-sm italic">Waiting for console activity...</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 p-3 rounded-xl border-l-2 border-switch-red"
                    >
                      <p className="text-[10px] font-bold text-switch-blue uppercase tracking-wider mb-1">
                        {notif.gameTitle}
                      </p>
                      <p className="text-sm text-white/90">{notif.message}</p>
                      <p className="text-[10px] text-white/30 mt-2">
                        {notif.timestamp.toLocaleTimeString()}
                      </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>

      {/* Decorative Switch Elements */}
      <div className="fixed bottom-4 right-4 flex gap-2">
         <div className="w-1.5 h-12 bg-switch-red rounded-full opacity-50 shadow-[0_0_15px_rgba(255,69,84,0.5)]" />
         <div className="w-1.5 h-12 bg-switch-blue rounded-full opacity-50 shadow-[0_0_15px_rgba(0,195,227,0.5)]" />
      </div>
    </div>
  );
}
