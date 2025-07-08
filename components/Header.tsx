import React from 'react';
import { BackArrowIcon, MenuIcon, SunIcon, MoonIcon } from './Icons';
import blackLogo from '/images/Julia-English-Logo-Black.png'
import whiteLogo from '/images/Julia-English-Logo-White.png'

interface HeaderProps {
    onToggleSidebar: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    onGoHome: () => void; // Added onGoHome prop
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, theme, onToggleTheme, onGoHome }) => {
  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg p-4 sm:px-6 shadow-light border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="lg:hidden text-text-dark dark:text-gray-300">
            <MenuIcon className="w-6 h-6" />
          </button>
          <img 
            src={theme === 'light' ? blackLogo : whiteLogo} 
            alt="Julia English Logo" 
            className="h-10 w-auto rounded-md"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary-blue to-primary-green text-transparent bg-clip-text leading-tight">
              KID's TALK
            </h1>
            <p className="text-xs text-text-medium dark:text-gray-400 font-semibold">與QMEI老師練習英文對話</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={onToggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-gray dark:bg-gray-700 text-text-dark dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600">
            {theme === 'light' ? <MoonIcon className="w-5 h-5"/> : <SunIcon className="w-5 h-5"/>}
          </button>
          {/* Changed <a> to <button> and added onClick for onGoHome */}
          <button onClick={onGoHome} className="bg-neutral-gray dark:bg-gray-700 text-text-dark dark:text-gray-200 px-3 sm:px-4 py-2 rounded-full font-semibold text-sm transition-all hover:bg-primary-blue hover:text-white dark:hover:bg-primary-blue flex items-center gap-1">
            <BackArrowIcon className="w-4 h-4" />
            <span className="hidden sm:inline">返回首頁</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;