export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  model: Model;
}

export type Model = 
  | 'llama-3.3-70b-versatile'
  | 'llama-3.3-70b-specdec'
  | 'llama-3.2-90b-vision-preview'
  | 'llama-3.2-11b-vision-preview'
  | 'llama-3.2-3b-preview'
  | 'llama-3.2-1b-preview'
  | 'llama-3.1-8b-instant'
  | 'llama-guard-3-8b'
  | 'llama3-70b-8192'
  | 'llama3-8b-8192'
  | 'mixtral-8x7b-32768'
  | 'gemma2-9b-it'
  | 'deepseek-r1-distill-llama-70b';

export type Language = 'ko' | 'en';

export interface Settings {
  theme: 'system' | 'dark' | 'light';
  fontSize: 'sm' | 'base' | 'lg';
  enterToSend: boolean;
  language: Language;
  userProfileImage?: string;
  assistantProfileImage?: string;
}