import React, { useEffect, useState } from 'react';
import { LearningMode } from '../types';
import { SunIcon, MoonIcon } from './Icons';
import blackLogo from '/images/Julia-English-Logo-Black.png'; // Import black logo
import whiteLogo from '/images/Julia-English-Logo-White.png'; // Import white logo

interface LandingPageProps {
  onStartChat: (mode: LearningMode) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, theme, onToggleTheme }) => {
    const [selectedAge, setSelectedAge] = useState<string>('6-8');

    useEffect(() => {
        document.body.classList.add('landing-page-body-styles');

        const savedAge = localStorage.getItem('selectedAge');
        if (savedAge && ['3-5', '6-8', '9-12'].includes(savedAge)) {
            setSelectedAge(savedAge);
        } else {
            localStorage.setItem('selectedAge', '6-8');
        }

        const createStars = () => {
            const starsContainer = document.getElementById('stars');
            if (!starsContainer) return;
            starsContainer.innerHTML = '';
            const starCount = 50;
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.textContent = '✨';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 2}s`;
                star.style.fontSize = `${Math.random() * 10 + 10}px`;
                starsContainer.appendChild(star);
            }
        };
        createStars();

        const handleMouseMove = (e: MouseEvent) => {
            document.querySelectorAll<HTMLElement>('.bubble').forEach((bubble, index) => {
                const speed = (index + 1) * 0.01;
                const x = (e.clientX * speed);
                const y = (e.clientY * speed);
                bubble.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.classList.remove('landing-page-body-styles');
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleSelectAge = (age: string) => {
        setSelectedAge(age);
        localStorage.setItem('selectedAge', age);
    };

    const handleStartMode = (mode: LearningMode) => {
        localStorage.setItem('learningMode', mode);
        onStartChat(mode);
    };

    const startButtonClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Force 'dialogue' mode when this specific button is clicked
        handleStartMode('dialogue');
    }

    const modeButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>, mode: LearningMode) => {
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
            handleStartMode(mode);
        }, 150);
    }

    const ageCardClickHandler = (e: React.MouseEvent<HTMLDivElement>, age: string) => {
        handleSelectAge(age);
        const selectedCard = e.currentTarget;
        const allCards = selectedCard.parentElement?.querySelectorAll('.age-card');
        allCards?.forEach(card => card.removeAttribute('style'));

        selectedCard.style.transform = 'scale(1.1)';
        setTimeout(() => {
            selectedCard.style.transform = 'scale(1.05)';
        }, 300);
    }

    return (
        <>
            {/* Floating bubbles */}
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>

            {/* Star decoration */}
            <div className="stars" id="stars"></div>

            {/* Top Navigation */}
            <header className="header">
                <div className="logo">
                    <img
                        src={theme === 'light' ? blackLogo : whiteLogo}
                        alt="KID's TALK Logo"
                        className="h-10 w-auto rounded-md"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    <span className="logo-text rainbow-text">KID's TALK</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleTheme}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-white/30 dark:bg-slate-800/30 text-slate-800 dark:text-yellow-300 transition-colors hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
                    </button>
                    {/* Updated startButtonClickHandler to always start dialogue mode */}
                    <a href="#" onClick={startButtonClickHandler} className="start-btn">💬 立即開始學習</a>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <section className="hero">
                    <h1 className="hero-title">
                        🌈 <span className="rainbow-text">KID's TALK</span> 🌈
                    </h1>
                    <p className="hero-subtitle">
                        最好玩的英語學習夥伴！讓說中文的小孩愛上說英文 💕
                    </p>
                </section>

                <section className="stats">
                    <div className="stat-card"><div className="stat-number">50萬+</div><div className="stat-label">🎉 快樂小朋友</div></div>
                    <div className="stat-card"><div className="stat-number">95%</div><div className="stat-label">😊 家長滿意度</div></div>
                    <div className="stat-card"><div className="stat-number">1000+</div><div className="stat-label">🎭 有趣情境</div></div>
                    <div className="stat-card"><div className="stat-number">24/7</div><div className="stat-label">🤖 AI陪伴</div></div>
                </section>

                <section className="qmei-section">
                    <h2 className="qmei-title">
                        <span className="emoji">🎭</span> 認識你的超級AI英語老師 - <span className="rainbow-text">QMEI</span>
                    </h2>
                    <p className="qmei-subtitle">專為說中文小孩設計的最棒AI英語老師</p>
                    <div className="qmei-avatar">👩‍🏫</div>
                    <div className="features">
                        <div className="feature-card"><div className="feature-icon">🧠</div><h3 className="feature-title">智能適應學習</h3><p className="feature-desc">根據每個孩子的學習進度和興趣，動態調整教學內容和難度，讓學習更有效果！</p></div>
                        <div className="feature-card"><div className="feature-icon">💬</div><h3 className="feature-title">自然對話引導</h3><p className="feature-desc">透過生活化情境對話，讓孩子在輕鬆環境中自然開口說英文，不再害怕！</p></div>
                        <div className="feature-card"><div className="feature-icon">🎯</div><h3 className="feature-title">即時發音糾正</h3><p className="feature-desc">AI語音識別技術，即時糾正發音並給予鼓勵性回饋，讓發音越來越標準！</p></div>
                        <div className="feature-card"><div className="feature-icon">🌟</div><h3 className="feature-title">正向學習激勵</h3><p className="feature-desc">建立孩子說英文的自信心，將錯誤轉化為學習機會，每天都有進步！</p></div>
                        <div className="feature-card"><div className="feature-icon">🎮</div><h3 className="feature-title">遊戲化學習</h3><p className="feature-desc">把學習變成好玩的遊戲，收集徽章、解鎖成就，讓孩子主動想要學習！</p></div>
                        <div className="feature-card"><div className="feature-icon">🏆</div><h3 className="feature-title">個人化進度</h3><p className="feature-desc">詳細記錄學習歷程，家長可以清楚看到孩子的進步和需要加強的地方！</p></div>
                    </div>
                </section>

                <section className="learning-modes">
                    <h2 className="section-title">🎪 三大超好玩學習模式</h2>
                    <div className="modes-grid">
                        <div className="mode-card">
                            <span className="mode-icon">💬</span><h3 className="mode-title">情境對話練習</h3><p className="mode-desc">在真實生活情境中練習英文對話，提升實際應用能力</p>
                            <ul className="mode-features"><li>生活化對話情境</li><li>角色扮演遊戲</li><li>即時互動回饋</li><li>漸進式難度提升</li></ul>
                            <button className="mode-btn" onClick={(e) => modeButtonClickHandler(e, 'dialogue')}>🎭 開始對話冒險</button>
                        </div>
                        <div className="mode-card">
                            <span className="mode-icon">📝</span><h3 className="mode-title">單句生成練習</h3><p className="mode-desc">從關鍵字開始，逐步建構完整英文句子，培養語言邏輯思維</p>
                            <ul className="mode-features"><li>關鍵字引導</li><li>句型結構練習</li><li>語法邏輯訓練</li><li>創意表達鼓勵</li></ul>
                            <button className="mode-btn" onClick={(e) => modeButtonClickHandler(e, 'sentence')}>✏️ 開始造句遊戲</button>
                        </div>
                        <div className="mode-card">
                            <span className="mode-icon">🎤</span><h3 className="mode-title">短文演說練習</h3><p className="mode-desc">培養較長篇幅的英文表達能力，建立演說自信</p>
                            <ul className="mode-features"><li>主題式演說</li><li>表達技巧指導</li><li>自信心建立</li><li>創意思維培養</li></ul>
                            <button className="mode-btn" onClick={(e) => modeButtonClickHandler(e, 'speech')}>🎙️ 開始演說挑戰</button>
                        </div>
                    </div>
                </section>

                <section className="age-groups">
                    <h2 className="section-title">👶 選擇適合的年齡組</h2>
                    <div className="age-grid">
                        <div className={`age-card ${selectedAge === '3-5' ? 'selected' : ''}`} onClick={(e) => ageCardClickHandler(e, '3-5')}>
                            <span className="age-emoji">🌱</span><h3 className="age-title">啟蒙組 (3-5歲)</h3><p className="age-desc">英語啟蒙的黃金時期，培養語感和興趣</p>
                            <div className="age-topics"><span className="topic-tag">我的家庭</span><span className="topic-tag">動物朋友</span><span className="topic-tag">顏色世界</span><span className="topic-tag">數字遊戲</span><span className="topic-tag">日常用品</span></div>
                        </div>
                        <div className={`age-card ${selectedAge === '6-8' ? 'selected' : ''}`} onClick={(e) => ageCardClickHandler(e, '6-8')}>
                            <span className="age-emoji">🌿</span><h3 className="age-title">成長組 (6-8歲)</h3><p className="age-desc">建立基礎對話能力，培養學習習慣</p>
                            <div className="age-topics"><span className="topic-tag">學校生活</span><span className="topic-tag">我的朋友</span><span className="topic-tag">興趣愛好</span><span className="topic-tag">節日慶典</span><span className="topic-tag">戶外活動</span></div>
                        </div>
                        <div className={`age-card ${selectedAge === '9-12' ? 'selected' : ''}`} onClick={(e) => ageCardClickHandler(e, '9-12')}>
                            <span className="age-emoji">🌳</span><h3 className="age-title">進階組 (9-12歲)</h3><p className="age-desc">深化表達能力，培養批判思維</p>
                            <div className="age-topics"><span className="topic-tag">科學探索</span><span className="topic-tag">世界文化</span><span className="topic-tag">環保議題</span><span className="topic-tag">未來夢想</span><span className="topic-tag">創意思考</span></div>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2 className="cta-title">🚀 開始你的英語學習之旅</h2>
                    <p className="cta-subtitle">加入超過50萬個家庭的選擇，讓孩子愛上說英文！</p>
                    {/* Updated cta-btn to always start dialogue mode */}
                    <a href="#" onClick={startButtonClickHandler} className="cta-btn">
                        🌟 立即免費體驗 KID's TALK 🌟
                    </a>
                </section>
            </main>
        </>
    );
};

export default LandingPage;