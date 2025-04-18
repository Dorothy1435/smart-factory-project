// modelExplainer.js
import React from 'react';
import './modelExplainer.css';
import { Activity, SwitchCamera, Trees, ActivitySquare, SearchCode } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ModelCard = ({ icon, title, description, bgColor, iconColor }) => (
  <div className="model-card" style={{ backgroundColor: bgColor }}>
    <div
      className="model-icon"
      style={{ color: iconColor, filter: `drop-shadow(0 0 4px ${iconColor})` }}
    >
      {icon}
    </div>
    <h2 className="model-title">{title}</h2>
    <p className="model-description">{description}</p>
  </div>
);

const ModelExplainer = () => {
  const navigate = useNavigate();

  return (
    <div className="model-container">
      <h1 className="model-page-title">🧠 이상 탐지 모델 설명</h1>

      <div className="card-grid top">
        <Link to="/lstm" style={{ textDecoration: 'none' }}>
        <ModelCard
          icon={<Activity />}
          title="LSTM"
          description="시계열 패턴 학습에 특화된 이상 탐지 모델"
          bgColor="#FEF9C3"
          iconColor="#F59E0B"
          className="fade-up"
        />
        </Link> 
        <Link to="/autoencoder" style={{ textDecoration: 'none' }}>
        <ModelCard
          icon={<SwitchCamera />}
          title="Autoencoder"
          description="데이터를 압축·복원하여 재구성 오류로 이상 감지"
          bgColor="#E0F2FE"
          iconColor="#3B82F6"
          className="fade-up"
        />
        </Link> 
        <Link to="/isolationforest" style={{ textDecoration: 'none' }}>
        <ModelCard
          icon={<Trees />}
          title="Isolation Forest"
          description="랜덤 트리 기반으로 데이터를 격리하여 이상 탐지"
          bgColor="#FEE2E2"
          iconColor="#EF4444"
          className="fade-up"
        />
        </Link>
      </div>

      <div className="card-grid bottom">
        <Link to="/DBSCAN" style={{ textDecoration: 'none' }}>
        <ModelCard
          icon={<ActivitySquare />}
          title="DBSCAN"
          description="밀도 기반 클러스터링으로 군집 외 데이터를 이상치로 분류"
          bgColor="#DCFCE7"
          iconColor="#22C55E"
          className="fade-up"
        />
        </Link>
        <Link to="/GANomaly" style={{ textDecoration: 'none' }}>
        <ModelCard
          icon={<SearchCode />}
          title="GANomaly"
          description="GAN 기반으로 학습된 재구성 오류를 활용한 이상 탐지"
          bgColor="#FFE4E6"
          iconColor="#E11D48"
          className="fade-up"
        />
        </Link>
      </div>

      <div className="model-footer">
        📌 각 모델은 데이터 특성과 목적에 따라 <strong>선택적으로 적용하거나 조합</strong>하여 사용 가능합니다.
      </div>

      <div className="model-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default ModelExplainer;
