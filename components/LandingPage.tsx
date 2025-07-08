import React, { useEffect, useState } from 'react';
import { LearningMode } from '../types';
import { SunIcon, MoonIcon } from './Icons'; // Assuming Icons component is available
import blackLogo from '/images/Julia-English-Logo-Black.png'; // Import black logo
import whiteLogo from '/images/Julia-English-Logo-White.png'; // Import white logo

interface LandingPageProps {
  onStartChat: (mode: LearningMode) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, theme, onToggleTheme }) => {
  const [selectedAge, setSelectedAge] = useState<string>('6-8');
  const [showScrollTop, setShowScrollTop] = useState(false); // State for scroll-to-top button visibility

  useEffect(() => {
    // Apply body styles for background and overflow
    document.body.classList.add('bg-gradient-to-br', 'from-blue-100', 'to-purple-100', 'dark:from-gray-900', 'dark:to-indigo-950', 'min-h-screen', 'overflow-x-hidden', 'relative', 'font-inter');

    const savedAge = localStorage.getItem('selectedAge');
    if (savedAge && ['3-5', '6-8', '9-12'].includes(savedAge)) {
      setSelectedAge(savedAge);
    } else {
      localStorage.setItem('selectedAge', '6-8');
    }

    // Function to create stars for background effect
    const createStars = () => {
      const starsContainer = document.getElementById('stars');
      if (!starsContainer) return;
      starsContainer.innerHTML = ''; // Clear existing stars
      const starCount = 70; // Increased star count for more density
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'absolute text-yellow-300 opacity-70 animate-pulse'; // Tailwind classes for stars
        star.textContent = '✨';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`; // Longer delay for more varied twinkling
        star.style.fontSize = `${Math.random() * 8 + 8}px`; // Slightly larger stars
        starsContainer.appendChild(star);
      }
    };
    createStars();

    // Mouse movement effect for bubbles
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('.bubble').forEach((bubble, index) => {
        const speed = (index + 1) * 0.02; // Increased speed for more noticeable movement
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);
        bubble.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    // document.addEventListener('mousemove', handleMouseMove);

    // Scroll event listener for scroll-to-top button
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);


    // Cleanup function for useEffect
    return () => {
      document.body.classList.remove('bg-gradient-to-br', 'from-blue-100', 'to-purple-100', 'dark:from-gray-900', 'dark:to-indigo-950', 'min-h-screen', 'overflow-x-hidden', 'relative', 'font-inter');
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll); // Clean up scroll listener
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Handler for selecting age group
  const handleSelectAge = (age: string) => {
    setSelectedAge(age);
    localStorage.setItem('selectedAge', age);
  };

  // Handler for starting a learning mode
  const handleStartMode = (mode: LearningMode) => {
    localStorage.setItem('learningMode', mode);
    onStartChat(mode);
  };

  // Click handler for the main "Start Learning Now" button
  const startButtonClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Force 'dialogue' mode when this specific button is clicked
    handleStartMode('dialogue');
  }

  // Click handler for mode selection buttons with a slight scale animation
  const modeButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>, mode: LearningMode) => {
    const button = e.currentTarget;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
      handleStartMode(mode);
    }, 150);
  }

  // Click handler for age group cards with a scale animation
  const ageCardClickHandler = (e: React.MouseEvent<HTMLDivElement>, age: string) => {
    handleSelectAge(age);
    const selectedCard = e.currentTarget;
    const allCards = selectedCard.parentElement?.querySelectorAll('.age-card');
    allCards?.forEach(card => card.removeAttribute('style')); // Reset styles on other cards

    selectedCard.style.transform = 'scale(1.05)'; // Slightly larger scale on click
    setTimeout(() => {
      selectedCard.style.transform = 'scale(1)'; // Return to normal after a brief moment
    }, 300);
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll animation
    });
  };

  return (
    <>
      {/* Floating bubbles for background decoration */}
      {/* Each bubble has a unique size, position, and animation delay */}
      <div className="bubble absolute rounded-full bg-pink-300 opacity-30 animate-bubble" style={{ width: '60px', height: '60px', left: '10%', top: '20%', animationDelay: '0s' }}></div>
      <div className="bubble absolute rounded-full bg-blue-300 opacity-30 animate-bubble" style={{ width: '80px', height: '80px', left: '80%', top: '50%', animationDelay: '2s' }}></div>
      <div className="bubble absolute rounded-full bg-green-300 opacity-30 animate-bubble" style={{ width: '50px', height: '50px', left: '30%', top: '70%', animationDelay: '4s' }}></div>
      <div className="bubble absolute rounded-full bg-yellow-300 opacity-30 animate-bubble" style={{ width: '70px', height: '70px', left: '50%', top: '10%', animationDelay: '6s' }}></div>
      <div className="bubble absolute rounded-full bg-purple-300 opacity-30 animate-bubble" style={{ width: '90px', height: '90px', left: '20%', top: '90%', animationDelay: '8s' }}></div>
      <div className="bubble absolute rounded-full bg-red-300 opacity-30 animate-bubble" style={{ width: '40px', height: '40px', left: '90%', top: '30%', animationDelay: '10s' }}></div>

      <div className="bubble absolute rounded-full bg-pink-300 opacity-30 animate-bubble" style={{ width: '40px', height: '40px', left: '20%', top: '30%', animationDelay: '0s' }}></div>
      <div className="bubble absolute rounded-full bg-blue-300 opacity-30 animate-bubble" style={{ width: '60px', height: '60px', left: '60%', top: '60%', animationDelay: '2s' }}></div>
      <div className="bubble absolute rounded-full bg-green-300 opacity-30 animate-bubble" style={{ width: '90px', height: '90px', left: '40%', top: '80%', animationDelay: '4s' }}></div>
      <div className="bubble absolute rounded-full bg-yellow-300 opacity-30 animate-bubble" style={{ width: '50px', height: '50px', left: '80%', top: '5%', animationDelay: '6s' }}></div>
      <div className="bubble absolute rounded-full bg-purple-300 opacity-30 animate-bubble" style={{ width: '30px', height: '30px', left: '10%', top: '50%', animationDelay: '8s' }}></div>
      <div className="bubble absolute rounded-full bg-red-300 opacity-30 animate-bubble" style={{ width: '100px', height: '100px', left: '20%', top: '70%', animationDelay: '10s' }}></div>

      <div className="bubble absolute rounded-full bg-teal-300 opacity-30 animate-bubble" style={{ width: '75px', height: '75px', left: '70%', top: '25%', animationDelay: '3s' }}></div>
      <div className="bubble absolute rounded-full bg-indigo-300 opacity-30 animate-bubble" style={{ width: '65px', height: '65px', left: '35%', top: '15%', animationDelay: '5s' }}></div>
      <div className="bubble absolute rounded-full bg-pink-300 opacity-30 animate-bubble" style={{ width: '45px', height: '45px', left: '85%', top: '65%', animationDelay: '7s' }}></div>
      <div className="bubble absolute rounded-full bg-blue-300 opacity-30 animate-bubble" style={{ width: '85px', height: '85px', left: '25%', top: '85%', animationDelay: '9s' }}></div>
      <div className="bubble absolute rounded-full bg-green-300 opacity-30 animate-bubble" style={{ width: '35px', height: '35px', left: '45%', top: '35%', animationDelay: '11s' }}></div>
      <div className="bubble absolute rounded-full bg-yellow-300 opacity-30 animate-bubble" style={{ width: '95px', height: '95px', left: '65%', top: '75%', animationDelay: '12s' }}></div>
      <div className="bubble absolute rounded-full bg-purple-300 opacity-30 animate-bubble" style={{ width: '70px', height: '70px', left: '5%', top: '15%', animationDelay: '13s' }}></div>

      {/* Star decoration for background */}
      <div className="absolute inset-0 overflow-hidden" id="stars"></div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between p-4 md:p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-lg rounded-b-3xl mx-auto max-w-7xl mt-0">
        <div className="flex items-center gap-3">
          <img
            src={theme === 'light' ? blackLogo : whiteLogo}
            alt="KID's TALK Logo"
            className="h-12 w-auto rounded-lg" // Slightly larger logo with shadow
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 drop-shadow-md">
            KID's TALK
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/40 dark:bg-slate-700/40 text-slate-800 dark:text-yellow-300 transition-all duration-300 hover:scale-110 hover:bg-white/60 dark:hover:bg-slate-700/60 shadow-md"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="w-7 h-7"/> : <SunIcon className="w-7 h-7"/>}
          </button>
          <a
            href="#"
            onClick={startButtonClickHandler}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-lg"
          >
            💬 立即開始學習
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16 text-center">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white drop-shadow-lg">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">🌈 KID's TALK 🌈</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            最好玩的英語學習夥伴！讓說中文的小孩愛上說英文 💕
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 md:mb-24 max-w-5xl mx-auto">
          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50萬+</div>
            <div className="text-base md:text-lg text-gray-600 dark:text-gray-400">🎉 快樂小朋友</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
            <div className="text-base md:text-lg text-gray-600 dark:text-gray-400">😊 家長滿意度</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">1000+</div>
            <div className="text-base md:text-lg text-gray-600 dark:text-gray-400">🎭 有趣情境</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">24/7</div>
            <div className="text-base md:text-lg text-gray-600 dark:text-gray-400">🤖 AI陪伴</div>
          </div>
        </section>

        {/* QMEI Section */}
        <section className="mb-16 md:mb-24 bg-white/70 dark:bg-gray-800/70 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
            <span className="text-4xl md:text-6xl mr-2">🎭</span> 認識你的超級AI英語老師 - <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">QMEI</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">專為說中文小孩設計的最棒AI英語老師</p>
          <div className="text-6xl md:text-8xl mb-12 animate-bounce-slow">👩‍🏫</div> {/* Larger, slower bouncing avatar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/40 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">🧠</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">智能適應學習</h3><p className="text-gray-700 dark:text-gray-300">根據每個孩子的學習進度和興趣，動態調整教學內容和難度，讓學習更有效果！</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/40 p-6 rounded-xl shadow-lg border border-green-200 dark:border-green-800 transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">💬</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">自然對話引導</h3><p className="text-gray-700 dark:text-gray-300">透過生活化情境對話，讓孩子在輕鬆環境中自然開口說英文，不再害怕！</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/40 p-6 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800 transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">🎯</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">即時發音糾正</h3><p className="text-gray-700 dark:text-gray-300">AI語音識別技術，即時糾正發音並給予鼓勵性回饋，讓發音越來越標準！</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/40 p-6 rounded-xl shadow-lg border border-yellow-200 dark:border-yellow-800 transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">🌟</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">正向學習激勵</h3><p className="text-gray-700 dark:text-gray-300">建立孩子說英文的自信心，將錯誤轉化為學習機會，每天都有進步！</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/40 p-6 rounded-xl shadow-lg border border-red-200 dark:border-red-800 transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">🎮</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">遊戲化學習</h3><p className="text-gray-700 dark:text-gray-300">把學習變成好玩的遊戲，收集徽章、解鎖成就，讓孩子主動想要學習！</p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/40 p-6 rounded-xl shadow-lg border border-teal-200 dark:border-teal-800 transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">🏆</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">個人化進度</h3><p className="text-gray-700 dark:text-gray-300">詳細記錄學習歷程，家長可以清楚看到孩子的進步和需要加強的地方！</p>
            </div>
          </div>
        </section>

        {/* Learning Modes Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-gray-900 dark:text-white">
            <span className="text-4xl md:text-6xl mr-2">🎪</span> 三大超好玩學習模式
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-800/70 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="text-5xl mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-full shadow-inner">💬</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">情境對話練習</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">在真實生活情境中練習英文對話，提升實際應用能力</p>
              <ul className="text-left text-gray-600 dark:text-gray-400 list-disc list-inside mb-6 w-full">
                <li>生活化對話情境</li>
                <li>角色扮演遊戲</li>
                <li>即時互動回饋</li>
                <li>漸進式難度提升</li>
              </ul>
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-lg w-full"
                onClick={(e) => modeButtonClickHandler(e, 'dialogue')}
              >
                🎭 開始對話冒險
              </button>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="text-5xl mb-4 p-4 bg-green-100 dark:bg-green-900 rounded-full shadow-inner">📝</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">單句生成練習</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">從關鍵字開始，逐步建構完整英文句子，培養語言邏輯思維</p>
              <ul className="text-left text-gray-600 dark:text-gray-400 list-disc list-inside mb-6 w-full">
                <li>關鍵字引導</li>
                <li>句型結構練習</li>
                <li>語法邏輯訓練</li>
                <li>創意表達鼓勵</li>
              </ul>
              <button
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-full shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-lg w-full"
                onClick={(e) => modeButtonClickHandler(e, 'sentence')}
              >
                ✏️ 開始造句遊戲
              </button>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="text-5xl mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full shadow-inner">🎤</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">短文演說練習</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">培養較長篇幅的英文表達能力，建立演說自信</p>
              <ul className="text-left text-gray-600 dark:text-gray-400 list-disc list-inside mb-6 w-full">
                <li>主題式演說</li>
                <li>表達技巧指導</li>
                <li>自信心建立</li>
                <li>創意思維培養</li>
              </ul>
              <button
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-full shadow-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 text-lg w-full"
                onClick={(e) => modeButtonClickHandler(e, 'speech')}
              >
                🎙️ 開始演說挑戰
              </button>
            </div>
          </div>
        </section>

        {/* Age Groups Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-gray-900 dark:text-white">
            <span className="text-4xl md:text-6xl mr-2">👶</span> 選擇適合的年齡組
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              className={`age-card bg-white/70 dark:bg-gray-800/70 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${selectedAge === '3-5' ? 'ring-4 ring-blue-500 dark:ring-blue-400 scale-105 shadow-2xl' : ''}`}
              onClick={(e) => ageCardClickHandler(e, '3-5')}
            >
              <span className="text-5xl mb-4 p-4 bg-blue-50 dark:bg-blue-900/40 rounded-full shadow-inner">🌱</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">啟蒙組 (3-5歲)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">英語啟蒙的黃金時期，培養語感和興趣</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-700 dark:text-blue-100">我的家庭</span>
                <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-700 dark:text-blue-100">動物朋友</span>
                <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-700 dark:text-blue-100">顏色世界</span>
                <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-700 dark:text-blue-100">數字遊戲</span>
                <span className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-700 dark:text-blue-100">日常用品</span>
              </div>
            </div>
            <div
              className={`age-card bg-white/70 dark:bg-gray-800/70 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${selectedAge === '6-8' ? 'ring-4 ring-green-500 dark:ring-green-400 scale-105 shadow-2xl' : ''}`}
              onClick={(e) => ageCardClickHandler(e, '6-8')}
            >
              <span className="text-5xl mb-4 p-4 bg-green-50 dark:bg-green-900/40 rounded-full shadow-inner">🌿</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">成長組 (6-8歲)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">建立基礎對話能力，培養學習習慣</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-700 dark:text-green-100">學校生活</span>
                <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-700 dark:text-green-100">我的朋友</span>
                <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-700 dark:text-green-100">興趣愛好</span>
                <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-700 dark:text-green-100">節日慶典</span>
                <span className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-700 dark:text-green-100">戶外活動</span>
              </div>
            </div>
            <div
              className={`age-card bg-white/70 dark:bg-gray-800/70 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${selectedAge === '9-12' ? 'ring-4 ring-purple-500 dark:ring-purple-400 scale-105 shadow-2xl' : ''}`}
              onClick={(e) => ageCardClickHandler(e, '9-12')}
            >
              <span className="text-5xl mb-4 p-4 bg-purple-50 dark:bg-purple-900/40 rounded-full shadow-inner">🌳</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">進階組 (9-12歲)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">深化表達能力，培養批判思維</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-700 dark:text-purple-100">科學探索</span>
                <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-700 dark:text-purple-100">世界文化</span>
                <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-700 dark:text-purple-100">環保議題</span>
                <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-700 dark:text-purple-100">未來夢想</span>
                <span className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-700 dark:text-purple-100">創意思考</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-pink-500 to-red-600 dark:from-pink-700 dark:to-red-800 p-8 md:p-12 rounded-3xl shadow-2xl text-white mb-16 md:mb-24 max-w-4xl mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">🚀 開始你的英語學習之旅</h2>
          <p className="text-lg md:text-xl mb-8">加入超過50萬個家庭的選擇，讓孩子愛上說英文！</p>
          <a
            href="#"
            onClick={startButtonClickHandler}
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-pink-600 dark:text-red-700 font-extrabold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xl animate-pulse-once"
          >
            🌟 立即免費體驗 KID's TALK 🌟
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-8 px-4 md:px-6 rounded-t-3xl mx-auto max-w-7xl mb-0 shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-bold text-white mb-2">KID's TALK</p>
            <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">隱私政策</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">使用條款</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">聯繫我們</a>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50 animate-fade-in"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>
      )}

      {/* Tailwind CSS Customizations and Keyframes */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        /* Rainbow text effect */
        .rainbow-text {
          background: linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Bubble animation */
        @keyframes bubble {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.05);
            opacity: 0.4;
          }
          50% {
            transform: translateY(0) translateX(-10px) scale(1);
            opacity: 0.3;
          }
          75% {
            transform: translateY(20px) translateX(5px) scale(0.95);
            opacity: 0.2;
          }
        }
        .animate-bubble {
          animation: bubble 15s infinite ease-in-out;
        }

        /* Star twinkling animation */
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s infinite alternate;
        }

        /* Bounce animation for QMEI avatar */
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }

        /* Pulse animation for CTA button */
        @keyframes pulse-once {
          0% {
            transform: scale(1);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
        }
        .animate-pulse-once {
          animation: pulse-once 2s infinite ease-in-out;
        }

        /* Fade in animation for scroll-to-top button */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        `}
      </style>
    </>
  );
};

export default LandingPage;

// Placeholder for Icons component (assuming it exists in ./Icons)
// You would replace this with the actual content of your Icons.tsx file
// For demonstration, I'm including a basic structure for SunIcon and MoonIcon
// If you have a real Icons.tsx, ensure it's correctly imported and used.
/*
// Icons.tsx (example content)
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12H5.25m-.386-6.364l1.591 1.591M12 12a3 3 0 110-6 3 3 0 010 6z"
    />
  </svg>
);

export const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.567 0-10.124-4.388-10.451-9.939C1.588 6.81 6.22 2.25 12 2.25c2.613 0 5.109.988 6.935 2.744A6.742 6.742 0 0121.752 15.002z"
    />
  </svg>
);
*/
