import React from 'react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAI = message.sender === 'ai';
  const avatar = isAI ? '👩‍🏫' : '👦';
  const avatarBg = isAI ? 'bg-gradient-to-br from-primary-blue to-primary-green' : 'bg-primary-orange';
 
  const bubbleAlignment = isAI ? 'self-start' : 'self-end';
  const bubbleRadius = isAI ? '' : '';
  const bubbleContainerDirection = isAI ? 'flex-row' : 'flex-row-reverse';
  
  return (
    <div className={`flex gap-3 max-w-[85%] sm:max-w-[80%] ${bubbleAlignment} ${bubbleContainerDirection}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 text-white ${avatarBg}`}>
        {avatar}
      </div>
      <div 
        className={`p-4 shadow-sm ${isAI ? 'bg-light-blue dark:bg-gray-700' : 'bg-light-orange dark:bg-blue-800'}`}
        style={isAI ? {
          borderRadius: '0 16px 16px 16px'
        } : {
          borderRadius: '16px 0 16px 16px'
        }}
      >
        <p className="text-base text-text-dark dark:text-gray-200 leading-relaxed mb-2" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
        {message.translation && (
          <p className="text-sm text-text-medium dark:text-gray-400 italic border-t border-black/10 dark:border-white/10 pt-2 mt-2">
            {message.translation}
          </p>
        )}
        <p className="text-xs text-text-light dark:text-gray-500 text-right mt-1">{message.timestamp}</p>
      </div>
    </div>
  );
};

export default MessageBubble;