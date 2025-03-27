// NewsList.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';
import staticNews from './newsData';

const NewsList = () => {
  const navigate = useNavigate();

  return (
    <main className="main-intro-section">
      <h2 style={{ textAlign: 'left', marginBottom: '30px' }}>📰 전체 뉴스 모아보기</h2>
      
      <div className="news-section">
        {staticNews.map((news, index) => (
          <div key={index} className="news-card">
            <h4>📌 {news.title}</h4>
            <p>{news.description}</p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-link"
            >
              기사 원문 보기 →
            </a>
          </div>
        ))}
      </div>

      {/* 🔽 아래에 버튼 추가 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
        <button onClick={() => navigate(-1)} className="nav-button">
          ← 이전 페이지로
        </button>
        <Link to="/" className="nav-button">
          🏠 홈페이지로
        </Link>
      </div>
    </main>
  );
};

export default NewsList;
