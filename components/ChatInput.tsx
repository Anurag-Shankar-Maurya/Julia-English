import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, MicrophoneIcon, StopIcon } from './Icons';
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent, LearningMode } from '../types';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onUseSuggestion: (text: string) => void;
  suggestions: string[];
  isLoading: boolean;
  currentMode: LearningMode;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onUseSuggestion, suggestions, isLoading, currentMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn('Speech recognition not supported in this browser.');
      setIsSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
    }
  }, []);

  const handleStartRecording = () => {
    if (recognitionRef.current && !isLoading && isSpeechSupported) {
      setInputValue('');
      setIsRecording(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsRecording(false);
      }
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Can throw if already stopped, this is fine.
      }
    }
    setIsRecording(false);
  };
  
  const toggleRecording = () => {
      if (isRecording) {
          handleStopRecording();
      } else {
          handleStartRecording();
      }
  }

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
      if (!isLoading) {
        onUseSuggestion(suggestion);
        setInputValue('');
      }
  }

  const getMicButtonTitle = () => {
    if (!isSpeechSupported) return "Speech recognition not supported in your browser";
    if (isLoading) return "Cannot record while AI is thinking";
    if (isRecording) return "Stop recording";
    return "Start recording";
  }

  return (
    <div className="p-6 border-t border-gray-200/80 dark:border-gray-700/60 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
        {currentMode === 'speech' && (
            <button
              onClick={toggleRecording}
              disabled={isLoading || !isSpeechSupported}
              aria-label={getMicButtonTitle()}
              title={getMicButtonTitle()}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 focus:outline-none disabled:bg-text-light disabled:cursor-not-allowed flex-shrink-0 ${
                isRecording ? 'bg-error-red animate-pulse' : 'bg-primary-green'
              }`}
            >
              {isRecording ? <StopIcon className="w-6 h-6" /> : <MicrophoneIcon className="w-6 h-6" />}
            </button>
        )}
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={currentMode === 'speech' ? "Click the mic to talk, or type..." : "Type your message..."}
            disabled={isLoading}
            className="w-full h-14 pl-5 pr-14 rounded-full border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-text-dark dark:text-gray-100 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all text-base font-sans disabled:bg-gray-100 dark:disabled:bg-gray-700"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center transition-all transform hover:scale-110 disabled:bg-text-light disabled:cursor-not-allowed"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap mt-4">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(s)}
            disabled={isLoading}
            className="bg-light-blue text-primary-blue px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none dark:bg-primary-blue/20 dark:text-blue-300 dark:hover:bg-primary-blue/30"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;