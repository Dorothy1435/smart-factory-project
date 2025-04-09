import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VisualizationPage from './visualization';
import Histogram from './Histogram';
import Boxplot from './boxplot';
import Heatmap from './heatmap';
import Clock from './clock';
import Scatter from './scatter';
import staticNews from './newsData';
import NewsList from './NewsList';
import ChartPreview from './ChartPreview';
import AnomalyArt from './AnomalyArt';
import Intro from './Intro';
import Analyst from './Analyst';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const factoryImages = [
  { src: '/images/factory1.png' },
  { src: '/images/factory2.png' },
  { src: '/images/factory3.png' },
  { src: '/images/factory4.jpg' },
  { src: '/images/factory5.jpg' },
  { src: '/images/factory6.png' },
  { src: '/images/factory7.png'},
  { src: '/images/factory8.png'},
  { src: '/images/factory9.png' }
];

function App() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentFactoryIndex, setCurrentFactoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };
  

  useEffect(() => {
    if (isPaused) return;

    const imgInterval = setInterval(() => {
      setCurrentFactoryIndex((prev) => (prev + 1) % factoryImages.length);
    }, 8000); // ✅ 8초 정도 여유롭게
    return () => clearInterval(imgInterval);
  }, [isPaused]); // ✅ 상태 변화 감지

  const handleFactoryPrev = () => {
    setCurrentFactoryIndex((prev) =>
      prev === 0 ? factoryImages.length - 1 : prev - 1
    );
  };

  const handleFactoryNext = () => {
    setCurrentFactoryIndex((prev) => (prev + 1) % factoryImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % staticNews.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const imgInterval = setInterval(() => {
      setCurrentFactoryIndex((prev) => (prev + 1) % factoryImages.length);
    }, 8000);
    return () => clearInterval(imgInterval);
  }, []);



  const handlePrev = () => {
    setCurrentNewsIndex((prevIndex) =>
      prevIndex === 0 ? staticNews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % staticNews.length);
  };

  return (
    <Router>
      <div className="App">
        <div className="app-title-wrapper">
          <Link to="/" className="logo-link">
            <h1 className="logo-title">이상 탐지 분석 대시보드</h1>
          </Link>
        </div>

        <header className="navbar">
          <nav className="menu">
            <Link to="/Intro">Intro</Link>
            <Link to="/visualization">시각화</Link>
            <Link to="/analyst">분석</Link>
            <a href="#conclusion">결론</a>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <main className="main-intro-section">
                <motion.div
                  className="intro-container"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <section className="factory-section">
                  <h3 className="section-title">⚙ 스마트 팩토리 현장</h3>
                    <div className="factory-slideshow-wrapper">
                      <button onClick={handleFactoryPrev} className="factory-nav-button">←</button>
                      <AnimatePresence mode="wait">
  <motion.img
    key={factoryImages[currentFactoryIndex].src}
    src={factoryImages[currentFactoryIndex].src}
    alt="공정 이미지"
    className="factory-image"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.6 }}
  />
</AnimatePresence>
                      <button onClick={handleFactoryNext} className="factory-nav-button">→</button>
                    </div>
                    <p className="factory-caption">{factoryImages[currentFactoryIndex].caption}</p>
                    <div style={{ marginTop: '12px' }}>
        <div className="factory-pause-wrapper">
  <button onClick={togglePause} className="news-nav-button">
    {isPaused ? '▶ 재생' : '⏸ 일시정지'}
  </button>
</div>
      </div>
                  </section>

                  <section className="news-section">
                  <div className="news-header">
    <h3>📰 관련 뉴스</h3>
  </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentNewsIndex}
                        className="news-card"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4>📌 {staticNews[currentNewsIndex].title}</h4>
                        <p>{staticNews[currentNewsIndex].description}</p>
                        <a
                          href={staticNews[currentNewsIndex].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="news-link"
                        >
                          기사 원문 보기 →
                        </a>
                      </motion.div>
                    </AnimatePresence>
                    <div style={{ textAlign: 'right', marginTop: '12px' }}>
                    <div className="news-controls">
      <button onClick={handlePrev} className="news-nav-button">← 이전</button>
      <button onClick={handleNext} className="news-nav-button">다음 →</button>
    </div>
  <Link to="/news" className="news-link">+ 더보기</Link>
</div>
                  </section>
                  <section className="anomaly-art-wrapper">
          <AnomalyArt />
        </section>

                  <ChartPreview />
                  <div className="intro-tags">
                    <span>📍 이상 탐지</span>
                    <span>📈 시각화</span>
                    <span>🤖 AI 모델링</span>
                    <span>⚙ 스마트 공정</span>
                  </div>
                </motion.div>
              </main>
            }
          />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="/histogram" element={<Histogram />} />
          <Route path="/boxplot" element={<Boxplot />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/scatter" element={<Scatter />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/analyst" element={<Analyst />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
