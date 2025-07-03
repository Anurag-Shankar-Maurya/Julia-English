import React, { useRef, useEffect } from 'react';
import { ChatMessage, TopicKey, LearningMode } from '../types';
import { TOPIC_CONFIG } from '../constants';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface ChatAreaProps {
  messages: ChatMessage[];
  isLoading: boolean;
  currentTopic: TopicKey;
  currentMode: LearningMode;
  suggestions: string[];
  onSendMessage: (text: string) => void;
  onUseSuggestion: (text: string) => void;
}

const TypingIndicator = () => (
    <div className="flex gap-3 max-w-[85%] sm:max-w-[80%] self-start flex-row">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 text-white bg-gradient-to-br from-primary-blue to-primary-green">
            👩‍🏫
        </div>
        <div className="p-4 rounded-2xl rounded-br-lg bg-light-blue dark:bg-gray-700 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-text-light dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-text-light dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-text-light dark:bg-gray-400 rounded-full animate-bounce"></div>
        </div>
    </div>
);


const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, currentTopic, currentMode, suggestions, onSendMessage, onUseSuggestion }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const topicDetails = TOPIC_CONFIG[currentTopic];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-medium flex flex-col overflow-hidden">
      <header className="bg-gradient-to-r from-primary-blue to-primary-green text-white p-5 flex items-center gap-4 flex-shrink-0">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
          👩‍🏫
        </div>
        <div>
          <h2 className="text-lg font-bold">QMEI 老師</h2>
          <p className="text-sm opacity-90">正在練習：{topicDetails.name}</p>
        </div>
      </header>
      
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={onSendMessage}
        onUseSuggestion={onUseSuggestion}
        suggestions={suggestions}
        isLoading={isLoading}
        currentMode={currentMode}
      />
    </main>
  );
};

export default ChatArea;