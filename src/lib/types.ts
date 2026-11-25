export interface SwitchGame {
  id: string;
  title: string;
  imageUrl: string;
  status: 'Online' | 'Offline' | 'Away';
  playTime: string;
  lastPlayed: string;
}

export interface GameNotification {
  id: string;
  gameTitle: string;
  message: string;
  timestamp: Date;
  type: 'achievement' | 'status' | 'friend';
}
