import React from 'react';
import { LearningMode, TopicKey } from '../types';
import { LEARNING_MODES, TOPICS } from '../constants';

interface SidebarProps {
  currentMode: LearningMode;
  currentTopic: TopicKey;
  onModeChange: (mode: LearningMode) => void;
  onTopicChange: (topic: TopicKey) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, currentTopic, onModeChange, onTopicChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center p-5 bg-light-blue dark:bg-gray-700/50 rounded-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-primary-green rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-pulse">
          👩‍🏫
        </div>
        <h2 className="text-xl font-bold text-text-dark dark:text-gray-100 mb-1">QMEI 老師</h2>
        <p className="text-sm text-green-500 font-semibold">● 線上中</p>
      </div>
      
      <div>
        <h3 className="text-base font-bold text-text-dark dark:text-gray-200 mb-3 px-1">學習模式</h3>
        <div className="flex flex-col gap-3">
          {LEARNING_MODES.map(mode => (
            <button
              key={mode.key}
              onClick={() => onModeChange(mode.key)}
              className={`w-full text-left p-3 rounded-xl font-semibold text-sm transition-all border-2 ${
                currentMode === mode.key
                  ? 'bg-light-blue border-primary-blue text-primary-blue dark:bg-primary-blue/20 dark:border-primary-blue/70 dark:text-blue-300'
                  : 'bg-neutral-gray border-transparent text-text-medium dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:border-primary-blue/30 hover:bg-light-blue hover:border-primary-blue/50'
              }`}
            >
              {mode.icon} {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-text-dark dark:text-gray-200 mb-3 px-1">學習主題</h3>
        <div className="flex flex-col gap-3">
          {TOPICS.map(topic => (
            <button
              key={topic.key}
              onClick={() => onTopicChange(topic.key)}
              className={`w-full text-left p-2.5 rounded-lg font-semibold text-sm transition-all border-2 ${
                currentTopic === topic.key
                  ? 'bg-light-green border-primary-green text-green-600 dark:bg-primary-green/20 dark:border-primary-green/70 dark:text-green-300'
                  : 'bg-neutral-gray border-transparent text-text-medium dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:border-primary-green/30 hover:bg-light-green hover:border-primary-green/50'
              }`}
            >
             {topic.icon} {topic.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
