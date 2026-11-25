import { useState, useEffect, useCallback } from 'react';
import { SwitchGame, GameNotification } from '@/lib/types';

const MOCK_GAMES: SwitchGame[] = [
  { id: '1', title: 'The Legend of Zelda: Tears of the Kingdom', imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lfill,w_600,f_auto,q_auto/v1/ncom/en_US/games/switch/t/the-legend-of-zelda-tears-of-the-kingdom-switch/hero', status: 'Online', playTime: '120h+', lastPlayed: 'Just now' },
  { id: '2', title: 'Super Mario Odyssey', imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lfill,w_600,f_auto,q_auto/v1/ncom/en_US/games/switch/s/super-mario-odyssey-switch/hero', status: 'Offline', playTime: '45h', lastPlayed: '2 days ago' },
  { id: '3', title: 'Animal Crossing: New Horizons', imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lfill,w_600,f_auto,q_auto/v1/ncom/en_US/games/switch/a/animal-crossing-new-horizons-switch/hero', status: 'Away', playTime: '300h+', lastPlayed: '5 hours ago' }
];

export const useSwitchBridge = () => {
  const [games, setGames] = useState<SwitchGame[]>(MOCK_GAMES);
  const [notifications, setNotifications] = useState<GameNotification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const sendBrowserNotification = useCallback((title: string, body: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/switch-icon.png' // Pastikan file ini ada di folder public
      });
    }
  }, []);

  const triggerEvent = (gameTitle: string, message: string, type: GameNotification['type']) => {
    const newNotif: GameNotification = {
      id: Math.random().toString(36).substr(2, 9),
      gameTitle,
      message,
      timestamp: new Date(),
      type
    };
    
    setNotifications(prev => [newNotif, ...prev]);
    sendBrowserNotification(gameTitle, message);
  };

  // Simulasi Update Real-time dari Konsol
  useEffect(() => {
    const interval = setInterval(() => {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const events = [
        "is now online!",
        "just unlocked a new achievement: 'Master Explorer'",
        "has been playing for 2 hours straight.",
        "friend 'Link' is now playing this game."
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      
      triggerEvent(randomGame.title, randomEvent, 'status');
    }, 15000); // Simulasi setiap 15 detik

    return () => clearInterval(interval);
  }, [games, sendBrowserNotification]);

  return { games, notifications, permission, requestPermission, triggerEvent };
};
