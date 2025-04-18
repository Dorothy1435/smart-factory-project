// IsolationForest.js
import React, { useState } from 'react';
import './IsolationForest.css';
import forestImg from './images/isolationforest.png';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';

Chart.register(BarElement, CategoryScale, LinearScale);

const IsolationForest = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('1.0, 0.9, 2.4, 0.95, 1.05');
  const [anomalies, setAnomalies] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const detectAnomalies = () => {
    const values = data
      .split(',')
      .map(str => parseFloat(str.trim()))
      .filter(num => !isNaN(num));

    if (values.length < 3) {
      alert('📌 최소 3개의 숫자를 입력해주세요. 예: 1.0, 0.9, 2.4');
      return;
    }

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
    const threshold = std * 1.5;
    const anomalyFlags = values.map(v => Math.abs(v - mean) > threshold);

    setAnomalies(anomalyFlags);

    const highlightColors = anomalyFlags.map(flag => flag ? '#ef4444' : '#60a5fa');

    setChartData({
      labels: values.map((_, i) => `x${i + 1}`),
      datasets: [
        {
          label: '데이터 포인트',
          data: values,
          backgroundColor: highlightColors
        }
      ]
    });
  };

  const fillExample = () => {
    setData('1.0, 0.9, 2.4, 0.95, 1.05');
  };

  return (
    <div className="forest-container">
      <h1 className="forest-title">🌲 Isolation Forest 모델</h1>
      <p className="forest-description">
        Isolation Forest는 <strong>이상치를 분리</strong>하는 방식으로 학습하는 <strong>비지도 학습 기반 이상 탐지 모델</strong>입니다.<br />
        고차원 데이터에서도 효과적이며, 계산 속도가 빠릅니다.
      </p>

      <div className="forest-example">
        <img src={forestImg} alt="Isolation Forest 구조" className="forest-img" />
        <p className="forest-caption">예시: Isolation Tree 구조를 통해 이상치를 빠르게 분리</p>
      </div>

      <div className="forest-visual">
        <h2>🛠 이상치 탐지 시뮬레이션</h2>
        <p>숫자를 쉼표로 입력하세요 (예: 1.0, 0.9, 2.4)</p>
        <input
          className="sim-input"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="예: 1.0, 0.9, 2.4"
        />
        <div style={{ marginTop: '12px' }}>
          <button className="sim-button" onClick={detectAnomalies}>🔍 이상치 탐지</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>

        {chartData && (
          <div className="forest-chart">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        )}

        {chartData && (
          <div className="sim-guide-toggle">
            <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
              {showGuide ? '📘 해석 가이드 닫기 ▲' : '📘 해석 가이드 열기 ▼'}
            </button>
            {showGuide && (
              <div className="forest-guide-box">
                <h3>해석 가이드</h3>
                <ul>
                  <li>평균과 표준편차를 기준으로 <strong>1.5배 이상 벗어난 값</strong>을 이상치로 간주합니다.</li>
                  <li><strong>빨간 막대</strong>로 표시된 값이 탐지된 이상치입니다.</li>
                  <li>Isolation Forest는 실제로는 트리 기반 분리 구조를 사용하여 보다 정밀한 탐지를 수행합니다.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="forest-application">
          <h2>🌲 Isolation Forest 활용 사례</h2>
          <ul>
            <li>💳 <strong>신용카드 이상 거래 탐지</strong></li>
            <li>🔒 <strong>사이버 보안 침입 탐지</strong></li>
            <li>🏭 <strong>공정 장비 상태 이상 감지</strong></li>
            <li>📈 <strong>이상 수익 분석 및 사용자 행동 분석</strong></li>
            <li>🚚 <strong>물류/배송 이상 상황 탐지</strong></li>
          </ul>
        </div>
      </div>

      <div className="forest-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default IsolationForest;
