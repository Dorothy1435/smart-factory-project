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
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';



function App() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % staticNews.length);
    }, 7000);
    return () => clearInterval(interval);
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
            <Link to="/">Intro</Link>
            <Link to="/visualization">시각화</Link>
            <a href="#model">모델 성능</a>
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
                    <h3>🏭 실제 공정 현장</h3>
                    <img
                      src="/images/factory.jpg"
                      alt="공정 현장"
                      className="factory-image"
                    />
                    <p className="factory-caption">
                      스마트 센서를 통해 공정 데이터를 수집하고 있는 현장
                    </p>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
