import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { ChatMessage, LearningMode, TopicKey } from './types';
import { TOPIC_CONFIG } from './constants';
import { generateAiResponse } from './services/geminiService';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<TopicKey>('family');
  const [currentMode, setCurrentMode] = useState<LearningMode>('dialogue');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistoryForApi, setChatHistoryForApi] = useState<ChatMessage[]>([]);
  const [theme, setTheme] = useState<Theme>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || 'light';
    setTheme(initialTheme);
    
    if (initialTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        const root = window.document.documentElement;
        root.classList.toggle('dark', newTheme === 'dark');
        return newTheme;
    });
  };

  const initializeChat = useCallback(() => {
    const topicDetails = TOPIC_CONFIG[currentTopic];
    const initialMessage: ChatMessage = {
      id: `initial-${currentTopic}-${Date.now()}`,
      sender: 'ai',
      text: topicDetails.welcome,
      translation: topicDetails.welcomeTranslation,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMessage]);
    setSuggestions(topicDetails.suggestions);
    setChatHistoryForApi([initialMessage]);
  }, [currentTopic]);

  useEffect(() => {
    initializeChat();
  }, [currentTopic, initializeChat]);

  const handleTopicChange = (topic: TopicKey) => {
    setCurrentTopic(topic);
    setIsSidebarOpen(false);
  };

  const handleModeChange = (mode: LearningMode) => {
    setCurrentMode(mode);
    const modeChangeMessage: ChatMessage = {
      id: `mode-change-${mode}-${Date.now()}`,
      sender: 'ai',
      text: `Great! We've switched to ${mode} mode. Let's continue our chat about ${TOPIC_CONFIG[currentTopic].name}!`,
      translation: `太棒了！我們已切換到${mode}模式。讓我們繼續聊聊${TOPIC_CONFIG[currentTopic].name}吧！`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, modeChangeMessage]);
    setChatHistoryForApi(prev => [...prev, modeChangeMessage]);
    setIsSidebarOpen(false);
  };
  
  const sendMessage = useCallback(async (text: string) => {
    if (!text) return;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    const historyForApi = [...chatHistoryForApi, userMessage];

    const aiResult = await generateAiResponse(historyForApi, currentMode, TOPIC_CONFIG[currentTopic]);

    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: aiResult.english,
      translation: aiResult.chinese,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, aiMessage]);
    setChatHistoryForApi([...historyForApi, aiMessage]);
    setSuggestions(aiResult.suggestions);
    setIsLoading(false);

  }, [chatHistoryForApi, currentMode, currentTopic]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black font-sans flex flex-col overflow-hidden">
      <Header onToggleSidebar={() => setIsSidebarOpen(o => !o)} theme={theme} onToggleTheme={toggleTheme} />
      <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-medium overflow-y-auto p-6 custom-scrollbar">
          <Sidebar
            currentMode={currentMode}
            currentTopic={currentTopic}
            onModeChange={handleModeChange}
            onTopicChange={handleTopicChange}
          />
        </div>

        {/* Mobile Sidebar */}
        <div
            className={`fixed inset-0 z-20 transition-opacity lg:hidden ${
                isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsSidebarOpen(false)}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <aside
                className={`absolute top-0 left-0 h-full w-80 bg-white/95 dark:bg-gray-800/95 shadow-xl transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
                    <Sidebar
                        currentMode={currentMode}
                        currentTopic={currentTopic}
                        onModeChange={handleModeChange}
                        onTopicChange={handleTopicChange}
                    />
                </div>
            </aside>
        </div>
        
        <div className="flex flex-col min-h-0">
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            currentTopic={currentTopic}
            currentMode={currentMode}
            suggestions={suggestions}
            onSendMessage={sendMessage}
            onUseSuggestion={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;