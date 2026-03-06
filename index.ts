export type UserRole = 'user' | 'moderator' | 'admin';
export type UserStatus = 'active' | 'blocked' | 'hidden';
export type TradeStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type RatingType = 'trustworthy' | 'untrustworthy';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
  // Referral system
  referralCode: string;
  referredBy?: string; // ID do usuário que indicou
  referrals: string[]; // IDs dos usuários indicados (filhos)
  totalDescendants: number; // Total de filhos + netos + etc
  isFamily: boolean; // true se tiver mais de 3000 filhos
  familyName?: string; // Nome da família
  // Ratings
  ratings: Rating[];
  trustworthyCount: number;
  untrustworthyCount: number;
  // Items for trade
  items: TradeItem[];
}

export interface Rating {
  id: string;
  fromUserId: string;
  fromUsername: string;
  type: RatingType;
  comment?: string;
  createdAt: string;
}

export interface TradeItem {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  userRole: UserRole;
  userIsFamily?: boolean;
  title: string;
  description: string;
  images: string[];
  videos?: string[];
  lookingFor?: string;
  status: 'available' | 'trading' | 'traded';
  createdAt: string;
  views: number;
}

export interface Trade {
  id: string;
  item1Id: string;
  item2Id: string;
  user1Id: string;
  user2Id: string;
  user1Username: string;
  user2Username: string;
  status: TradeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  participant1Id: string;
  participant2Id: string;
  participant1Username: string;
  participant2Username: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderUsername: string;
  senderRole: UserRole;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface TimelineEvent {
  id: string;
  type: 'new_item' | 'new_user' | 'trade_completed' | 'rating' | 'new_family';
  userId: string;
  username: string;
  userRole: UserRole;
  userIsFamily?: boolean;
  data: any;
  createdAt: string;
}

// Admin constants
export const ADMIN_USERNAME = 'ADM';
export const ADMIN_PASSWORD = '1533';
export const MODERATOR_CONTACT = '11983602504';
export const FAMILY_THRESHOLD = 3000; // Número de filhos para virar família
