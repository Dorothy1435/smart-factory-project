// GANomaly.js
import React, { useState } from 'react';
import './GANomaly.css';
import ganImg from './images/ganomaly.png';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

const GANomaly = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('1.0, 0.95, 1.05, 0.9, 2.0');
  const [score, setScore] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const simulateAnomaly = () => {
    const values = data
      .split(',')
      .map(str => parseFloat(str.trim()))
      .filter(num => !isNaN(num));

    if (values.length < 3) {
      alert('📌 최소 3개의 숫자를 입력해주세요. 예: 1.0, 0.95, 2.0');
      return;
    }

    const reconstructed = values.map(v => parseFloat((v * 0.98).toFixed(2)));
    const anomalyScores = values.map((v, i) => Math.abs(v - reconstructed[i]));
    const colors = anomalyScores.map(score => score > 0.05 ? '#ef4444' : '#60a5fa');

    setScore(anomalyScores.map(s => s.toFixed(3)).join(', '));

    setChartData({
      labels: values.map((_, i) => `x${i + 1}`),
      datasets: [
        {
          label: '입력값',
          data: values,
          borderColor: '#3b82f6',
          backgroundColor: colors,
          tension: 0.4,
        },
        {
          label: '복원값',
          data: reconstructed,
          borderColor: '#facc15',
          borderDash: [5, 5],
          tension: 0.4,
        }
      ]
    });
  };

  const fillExample = () => {
    setData('1.0, 0.95, 1.05, 0.9, 2.0');
  };

  return (
    <div className="ganomaly-container">
      <h1 className="ganomaly-title">🧬 GANomaly 모델</h1>
      <p className="ganomaly-description">
        GANomaly는 <strong>생성 모델(GAN)</strong>을 활용하여 입력 데이터를 재구성하고,<br /> <strong>복원 오차 기반 이상 탐지</strong>를 수행하는 모델입니다.
      </p>

      <div className="ganomaly-example">
        <img src={ganImg} alt="GANomaly 구조" className="ganomaly-img" />
        <p className="ganomaly-caption">예시: 입력과 복원값의 차이를 기반으로 이상 여부를 판단</p>
      </div>

      <div className="ganomaly-visual">
        <h2>🛠 이상치 탐지 시뮬레이션</h2>
        <p>숫자를 쉼표로 입력하세요 (예: 1.0, 0.95, 2.0)</p>
        <input
          className="sim-input"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="예: 1.0, 0.95, 2.0"
        />
        <div style={{ marginTop: '12px' }}>
          <button className="sim-button" onClick={simulateAnomaly}>📊 시각화</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>

        {score && (
          <div className="sim-analysis">
            <p><strong>복원 오차:</strong> {score}</p>
            <p>오차가 클수록 <span style={{ color: '#ef4444' }}><strong>이상치일 가능성</strong></span>이 높습니다.</p>
          </div>
        )}

        {chartData && (
          <div className="ganomaly-chart">
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        )}

        {chartData && (
          <div className="sim-guide-toggle">
            <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
              {showGuide ? '📘 해석 가이드 닫기 ▲' : '📘 해석 가이드 열기 ▼'}
            </button>
            {showGuide && (
              <div className="ganomaly-guide-box">
                <h3>해석 가이드</h3>
                <ul>
                  <li><strong>GANomaly</strong>는 복원 오류를 기반으로 이상을 판단합니다.</li>
                  <li>입력값과 복원값의 차이가 <strong>0.05 이상</strong>이면 이상치로 간주합니다.</li>
                  <li>이상치는 <strong>붉은색 점</strong>으로 시각화됩니다.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="ganomaly-application">
          <h2>🧬 GANomaly 활용 사례</h2>
          <ul>
            <li>🧪 <strong>제조 결함 탐지</strong> (이미지/센서 기반)</li>
            <li>📷 <strong>의료 영상 이상 검출</strong></li>
            <li>💡 <strong>스마트 팩토리 이상 판단 시스템</strong></li>
            <li>🎨 <strong>이상 이미지 생성 검증</strong></li>
            <li>📈 <strong>시계열 이상 탐지</strong></li>
          </ul>
        </div>
      </div>

      <div className="ganomaly-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default GANomaly;
