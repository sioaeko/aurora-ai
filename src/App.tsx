import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, PanelLeftClose, PanelLeft, Brain, Code, Zap, Database } from 'lucide-react';
import { Message, Chat, Model, Settings } from './types';
import { ChatMessage } from './components/ChatMessage';
import { Sidebar } from './components/Sidebar';
import { ModelSelect } from './components/ModelSelect';
import { ApiService } from './services/api';

function App() {
  const [chats, setChats] = useState<Chat[]>(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      // Date 객체 복원
      parsedChats.forEach((chat: Chat) => {
        chat.createdAt = new Date(chat.createdAt);
      });
      return parsedChats;
    }
    return [];
  });
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [model, setModel] = useState<Model>('llama-3.3-70b-versatile');
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('settings');
    const userProfileImage = localStorage.getItem('userProfileImage');
    const assistantProfileImage = localStorage.getItem('assistantProfileImage');
    
    return {
      theme: 'system',
      fontSize: 'base',
      enterToSend: true,
      language: 'ko',
      userProfileImage: userProfileImage || undefined,
      assistantProfileImage: assistantProfileImage || undefined,
      ...(savedSettings ? JSON.parse(savedSettings) : {})
    };
  });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const apiServiceRef = useRef<ApiService>(new ApiService(import.meta.env.VITE_GROQ_API_KEY));

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.style.fontSize = {
      sm: '14px',
      base: '16px',
      lg: '18px'
    }[settings.fontSize];

    root.setAttribute('data-language', settings.language);
    
    // Save settings to localStorage
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: settings.language === 'ko' ? '새로운 채팅' : 'New Chat',
      messages: [],
      createdAt: new Date(),
      model: model
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setInput('');
    setShowMobileSidebar(false);
    return newChat.id;
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        setCurrentChatId(null);
      }
    }
  };

  const clearChats = () => {
    setChats([]);
    setCurrentChatId(null);
    setShowMobileSidebar(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateChatTitle = (chatId: string, messages: Message[]) => {
    if (messages.length === 1) {
      const title = messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '');
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, title } : chat
      ));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    let chatId = currentChatId;
    if (!chatId) {
      chatId = createNewChat();
    }

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...(chats.find(c => c.id === chatId)?.messages || []), userMessage];
    
    setChats(prev => prev.map(c => 
      c.id === chatId ? { 
        ...c, 
        messages: [...updatedMessages, { role: 'assistant', content: '' }]
      } : c
    ));
    updateChatTitle(chatId, updatedMessages);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    try {
      await apiServiceRef.current.streamChat(
        updatedMessages,
        model,
        (chunk) => {
          setChats(prev => prev.map(c => 
            c.id === chatId ? {
              ...c,
              messages: [
                ...updatedMessages,
                { 
                  role: 'assistant', 
                  content: prev.find(chat => chat.id === chatId)?.messages.slice(-1)[0]?.content + chunk || chunk 
                }
              ]
            } : c
          ));
          scrollToBottom();
        },
        (error) => {
          const errorMessage = settings.language === 'ko' 
            ? `오류: API 연결 실패\n\n상세 내용: ${error.message}\n\n다음을 확인해주세요:\n1. API 키가 올바른지 확인\n2. 인터넷 연결 상태 확인\n3. API 요청 한도 확인` 
            : `Error: Failed to connect to API\n\nDetails: ${error.message}\n\nPlease check:\n1. Verify API key is correct\n2. Check internet connection\n3. Verify API rate limits`;

          setChats(prev => prev.map(c => 
            c.id === chatId ? {
              ...c,
              messages: [
                ...updatedMessages,
                { role: 'assistant', content: errorMessage }
              ]
            } : c
          ));
        }
      );
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && settings.enterToSend) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-900 via-gray-900/95 to-transparent pointer-events-none z-40 lg:hidden" />
      
      <div className={`fixed top-4 left-4 right-4 flex items-center gap-2 z-50 lg:hidden transition-opacity duration-200 ${
        showMobileSidebar ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}>
        <button
          title={settings.language === 'ko' ? '메뉴 열기' : 'Open menu'}
          onClick={() => setShowMobileSidebar(true)}
          className="p-2.5 rounded-lg bg-gray-800/50 backdrop-blur-sm text-gray-100 hover:bg-gray-700/50 transition-colors duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <ModelSelect model={model} onModelChange={setModel} />
        </div>
      </div>

      {showMobileSidebar && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          transition-all duration-300 ease-in-out
          ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${showSidebar ? 'w-[280px]' : 'w-0 lg:w-0'}
          overflow-hidden
        `}
      >
        <div className="w-[280px] h-full">
          <Sidebar
            chats={chats}
            currentChatId={currentChatId}
            onNewChat={createNewChat}
            onSelectChat={(id) => {
              setCurrentChatId(id);
              setShowMobileSidebar(false);
            }}
            onDeleteChat={deleteChat}
            onClearChats={clearChats}
            settings={settings}
            onUpdateSettings={setSettings}
          />
        </div>
      </div>
      
      <div className={`
        flex-1 flex flex-col relative
        transition-all duration-300 ease-in-out
      `}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        
        <div className="hidden lg:flex absolute top-4 left-4 right-4 z-30 items-center gap-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2.5 rounded-lg bg-gray-800/50 backdrop-blur-sm text-gray-100 hover:bg-gray-700/50 transition-colors duration-200"
          >
            {showSidebar ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1">
            <ModelSelect model={model} onModelChange={setModel} />
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-20">
          <div className="max-w-4xl mx-auto px-3 lg:px-4 w-full pt-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] flex-col px-4">
                <div className="relative mb-6 lg:mb-8">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0EA5E9] via-[#6366F1] to-[#A855F7] opacity-75 blur-lg animate-pulse-slow" />
                  <div className="relative bg-gray-900/50 backdrop-blur-sm px-6 lg:px-8 py-4 lg:py-5 rounded-2xl border border-white/10">
                    <div className="flex flex-col items-center">
                      <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-[#6366F1] to-[#A855F7] tracking-tight">
                        Aurora AI
                      </h1>
                      <span className="text-xs text-gray-400 mt-1">Powered by Groq</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-center mb-8 lg:mb-12 max-w-lg text-sm lg:text-base px-4">
                  {settings.language === 'ko' 
                    ? 'Aurora AI와 함께 더 빠르고 강력한 AI 경험을 시작하세요. Groq의 초고속 추론 엔진을 기반으로 한 Aurora AI는 자연어 처리, 코드 생성, 분석 및 창의적인 작업을 즉각적으로 처리합니다.'
                    : `Welcome to Aurora AI, powered by Groq's ultra-fast inference engine. Experience lightning-fast responses for natural language processing, code generation, analysis, and creative tasks.`}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 w-full max-w-2xl mx-auto px-4">
                  <div className="col-span-1 lg:col-span-2 text-center text-sm text-gray-400 mb-3">
                    {settings.language === 'ko' ? '주요 기능' : 'Key Features'}
                  </div>

                  {/* 자연어 처리 */}
                  <div className="group relative bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/5">
                    <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#6366F1] p-[1px]">
                        <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-[#0EA5E9]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-200 mb-2 text-sm lg:text-base">
                          {settings.language === 'ko' ? '자연어 처리' : 'Natural Language'}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                          {settings.language === 'ko' 
                            ? '고급 자연어 이해 및 생성 능력으로 자연스러운 대화와 텍스트 생성' 
                            : 'Advanced language understanding for natural conversations and text generation'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 코드 생성 */}
                  <div className="group relative bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/5">
                    <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#A855F7] p-[1px]">
                        <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                          <Code className="w-4 h-4 text-[#6366F1]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-200 mb-2 text-sm lg:text-base">
                          {settings.language === 'ko' ? '코드 생성' : 'Code Generation'}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                          {settings.language === 'ko'
                            ? '다양한 프로그래밍 언어에 대한 코드 작성 및 최적화 제안'
                            : 'Write, explain, and optimize code across multiple programming languages'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 문제 해결 */}
                  <div className="group relative bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/5">
                    <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#EC4899] p-[1px]">
                        <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-[#A855F7]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-200 mb-2 text-sm lg:text-base">
                          {settings.language === 'ko' ? '문제 해결' : 'Problem Solving'}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                          {settings.language === 'ko'
                            ? '복잡한 문제를 단계별로 분석하고 효율적인 해결책 제시'
                            : 'Analyze complex problems and provide step-by-step solutions'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 지식 베이스 */}
                  <div className="group relative bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/5">
                    <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#EC4899] to-[#0EA5E9] p-[1px]">
                        <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                          <Database className="w-4 h-4 text-[#EC4899]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-200 mb-2 text-sm lg:text-base">
                          {settings.language === 'ko' ? '지식 베이스' : 'Knowledge Base'}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                          {settings.language === 'ko'
                            ? '광범위한 분야의 최신 지식과 정보를 활용한 답변 제공'
                            : 'Leverage extensive knowledge across various domains for informed responses'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col pb-32">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    message={message} 
                    isThinking={index === messages.length - 1 && isThinking}
                    userProfileImage={settings.userProfileImage}
                    assistantProfileImage={settings.assistantProfileImage}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </main>

        <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent pt-16 lg:pt-20 pb-6 lg:pb-8">
          <div className="max-w-4xl mx-auto px-3 lg:px-4 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative flex">
                <div className="absolute -inset-1 rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-75 blur-lg" />
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={settings.language === 'ko' ? '메시지 보내기...' : 'Send a message...'}
                  className="relative w-full resize-none rounded-xl lg:rounded-2xl bg-gray-800/50 backdrop-blur-sm px-3 lg:px-4 py-3 lg:py-3.5 pr-10 lg:pr-12 text-sm lg:text-base text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50"
                  disabled={isLoading}
                />
                {isLoading ? (
                  <button
                    title={settings.language === 'ko' ? '생성 중지' : 'Stop generating'}
                    type="button"
                    onClick={() => apiServiceRef.current.abort()}
                    className="absolute right-2 lg:right-3 bottom-2.5 lg:bottom-3 rounded-lg p-1.5 text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="6" width="12" height="12" />
                    </svg>
                  </button>
                ) : (
                  <button
                    title={settings.language === 'ko' ? '메시지 전송' : 'Send message'}
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 lg:right-3 bottom-2.5 lg:bottom-3 rounded-lg p-1.5 text-gray-400 hover:text-gray-100 disabled:opacity-50 transition-colors duration-200"
                  >
                    <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                )}
              </div>
              <p className="text-[10px] lg:text-xs text-center text-gray-500">
                {settings.language === 'ko'
                  ? '무료 연구 프리뷰. AI는 사람, 장소 또는 사실에 대한 부정확한 정보를 생성할 수 있습니다.'
                  : 'Free Research Preview. AI may produce inaccurate information about people, places, or facts.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;