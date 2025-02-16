import React, { useState } from 'react';
import { Plus, MessageSquare, Settings, Trash2, ChevronDown, ChevronUp, Type, Languages, Trash, Upload } from 'lucide-react';
import { Chat, Settings as SettingsType, Language } from '../types';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onClearChats: () => void;
  settings: SettingsType;
  onUpdateSettings: (settings: SettingsType) => void;
}

export function Sidebar({ 
  chats, 
  currentChatId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  onClearChats,
  settings,
  onUpdateSettings 
}: SidebarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showChats, setShowChats] = useState(true);

  const handleImageUpload = (role: 'user' | 'assistant') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (role === 'user') {
          onUpdateSettings({ ...settings, userProfileImage: base64String });
          localStorage.setItem('userProfileImage', base64String);
        } else {
          onUpdateSettings({ ...settings, assistantProfileImage: base64String });
          localStorage.setItem('assistantProfileImage', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const chatDate = new Date(date);

    if (today.toDateString() === chatDate.toDateString()) {
      return settings.language === 'ko' ? '오늘' : 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === chatDate.toDateString()) {
      return settings.language === 'ko' ? '어제' : 'Yesterday';
    }

    return chatDate.toLocaleDateString(settings.language === 'ko' ? 'ko-KR' : 'en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: today.getFullYear() !== chatDate.getFullYear() ? 'numeric' : undefined 
    });
  };

  const groupChatsByDate = () => {
    const groups: { [key: string]: Chat[] } = {};
    chats.forEach(chat => {
      const date = formatDate(chat.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(chat);
    });
    return groups;
  };

  const chatGroups = groupChatsByDate();

  const languageOptions: { value: Language; label: string }[] = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: 'English' }
  ];

  return (
    <div className="flex h-full w-[280px] flex-col bg-gray-900/50 backdrop-blur-sm border-r border-gray-800/30">
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-3 rounded-xl bg-violet-500/10 p-3 text-sm hover:bg-violet-500/20 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 text-violet-400" />
            <span className="font-medium">
              {settings.language === 'ko' ? '새로운 채팅' : 'New chat'}
            </span>
          </button>
        </div>

        <div className="px-3 py-2">
          <button
            onClick={() => setShowChats(!showChats)}
            className="flex w-full items-center justify-between p-2 text-sm text-gray-400 hover:text-gray-300"
          >
            <span className="font-medium">
              {settings.language === 'ko' ? '채팅 기록' : 'Chat history'}
            </span>
            {showChats ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showChats && (
            <div className="mt-2 space-y-4">
              {Object.entries(chatGroups).map(([date, dateChats]) => (
                <div key={date}>
                  <div className="px-2 py-1 text-xs font-medium text-gray-500">{date}</div>
                  <div className="space-y-1">
                    {dateChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group relative flex items-center gap-3 rounded-xl p-3 text-sm transition-all duration-200 hover:bg-gray-800/50 ${
                          currentChatId === chat.id ? 'bg-gray-800/50 shadow-lg' : ''
                        }`}
                      >
                        <button
                          onClick={() => onSelectChat(chat.id)}
                          className="flex flex-1 items-center gap-3 overflow-hidden"
                        >
                          <MessageSquare className="w-5 h-5 shrink-0 text-gray-400" />
                          <span className="line-clamp-1 text-left flex-1">{chat.title}</span>
                        </button>
                        <button
                          onClick={() => onDeleteChat(chat.id)}
                          title={settings.language === 'ko' ? '채팅 삭제' : 'Delete chat'}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {chats.length > 0 && (
                <button
                  onClick={onClearChats}
                  className="flex w-full items-center gap-2 rounded-lg p-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                >
                  <Trash className="w-4 h-4" />
                  <span>{settings.language === 'ko' ? '모든 채팅 삭제' : 'Clear all chats'}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-gray-800/30">
        <button 
          onClick={() => setShowSettings(!showSettings)} 
          className="flex w-full items-center justify-between rounded-xl p-3 text-sm hover:bg-gray-800/50 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="font-medium">
              {settings.language === 'ko' ? '설정' : 'Settings'}
            </span>
          </div>
          {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showSettings && (
          <div className="mt-2 space-y-4 rounded-xl bg-gray-800/30 p-4">
            <div className="space-y-3">
              <div className="text-xs font-medium text-gray-400">
                {settings.language === 'ko' ? '프로필 이미지' : 'Profile Images'}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="flex flex-col items-center gap-2 p-3 rounded-lg border border-dashed border-gray-700 hover:border-violet-500/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-violet-500/20 flex items-center justify-center">
                      {settings.userProfileImage ? (
                        <img src={settings.userProfileImage} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="w-5 h-5 text-violet-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {settings.language === 'ko' ? '사용자' : 'User'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload('user')}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <label className="flex flex-col items-center gap-2 p-3 rounded-lg border border-dashed border-gray-700 hover:border-violet-500/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-teal-500/20 flex items-center justify-center">
                      {settings.assistantProfileImage ? (
                        <img src={settings.assistantProfileImage} alt="Assistant" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="w-5 h-5 text-teal-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {settings.language === 'ko' ? 'AI' : 'Assistant'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload('assistant')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-medium text-gray-400">
                {settings.language === 'ko' ? '글자 크기' : 'Font size'}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateSettings({ ...settings, fontSize: 'sm' })}
                  className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                    settings.fontSize === 'sm'
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'hover:bg-gray-700/30 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  {settings.language === 'ko' ? '작게' : 'Small'}
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, fontSize: 'base' })}
                  className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                    settings.fontSize === 'base'
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'hover:bg-gray-700/30 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  {settings.language === 'ko' ? '중간' : 'Medium'}
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, fontSize: 'lg' })}
                  className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                    settings.fontSize === 'lg'
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'hover:bg-gray-700/30 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  {settings.language === 'ko' ? '크게' : 'Large'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-medium text-gray-400">
                {settings.language === 'ko' ? '언어' : 'Language'}
              </div>
              <div className="flex gap-2">
                {languageOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => onUpdateSettings({ ...settings, language: option.value })}
                    className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                      settings.language === option.value
                        ? 'bg-violet-500/20 text-violet-400'
                        : 'hover:bg-gray-700/30 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Languages className="w-4 h-4" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-gray-400">
                  {settings.language === 'ko' ? 'Enter로 전송' : 'Press Enter to send'}
                </div>
                <button
                  onClick={() => onUpdateSettings({ ...settings, enterToSend: !settings.enterToSend })}
                  title={settings.language === 'ko' ? 'Enter로 전송 토글' : 'Toggle Enter to send'}
                  className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
                    settings.enterToSend ? 'bg-violet-500' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      settings.enterToSend ? 'translate-x-4' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}