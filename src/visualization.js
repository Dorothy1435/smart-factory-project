//visualization.js
import React from 'react';
import './visualization.css';
import { BarChart4, Box, Flame, Clock} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Card = ({ icon, title, text, bgColor, iconColor, className = '', style }) => {
  return (
    <div
      className={`custom-card ${className}`}
      style={{ backgroundColor: bgColor, ...style }}
    >
      <div
        className="card-icon"
        style={{ color: iconColor, filter: `drop-shadow(0 0 4px ${iconColor})` }}
      >
        {icon}
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-text">{text}</p>
    </div>
  );
};


const VisualizationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="visualization-container">
      <h1 className="visualization-title">📊 시각화 기법 설명</h1>

      <div className="card-grid top">
        <Link to="/histogram" style={{ textDecoration: 'none' }}>
          <Card
            icon={<BarChart4 />}
            title="히스토그램"
            text="데이터 분포를 통해 정규성, 왜도 등을 분석합니다."
            bgColor="#E0E7FF"
            iconColor="#6366F1"
            className="fade-up"
          />
        </Link>
        <Link to="/boxplot" style={{ textDecoration: 'none' }}>
          <Card
            icon={<Box />}
            title="박스플롯"
            text="중앙값, 사분위수, 이상치를 시각적으로 확인합니다."
            bgColor="#D1FAE5"
            iconColor="#10B981"
            className="fade-up"
          />
        </Link>
        <Link to="/heatmap" style={{ textDecoration: 'none' }}>
          <Card
            icon={<Flame />}
            title="히트맵"
            text="두 변수 조합에 따른 이상률을 색으로 표현합니다."
            bgColor="#FEE2E2"
            iconColor="#EF4444"
            className="fade-up"
          />
        </Link>
      </div>

      <div className="card-grid bottom">
        <Link to="/clock" style={{ textDecoration: 'none' }}>
          <Card
            icon={<Clock />}
            title="시계열 플롯"
            text="시간 흐름에 따라 탐지 결과를 시각화합니다."
            bgColor="#FEF3C7"
            iconColor="#F59E0B"
            className="fade-up"
          />
        </Link>
        <Link to="/scatter" style={{ textDecoration: 'none' }}>
          <Card
            icon={<Sparkles />}
            title="산점도"
            text="두 변수 간 관계 및 이상치를 점으로 시각화합니다."
            bgColor="#E0F2FE"
            iconColor="#3B82F6"
            className="fade-up"
          />
        </Link>
      </div>

      <div className="footer-note">
        📌 본 시스템은 공정 품질 관리에 실시간 이상 탐지를 활용하여, <strong>불량률을 줄이고 효율적인 생산</strong>을 유도합니다.
      </div>

      <div className="histogram-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default VisualizationPage;
