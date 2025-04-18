// DBSCAN.js
import React, { useState } from 'react';
import './DBSCAN.css';
import dbscanImg from './images/dbscan.png';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';

Chart.register(BarElement, CategoryScale, LinearScale);

const DBSCAN = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('1.0, 0.9, 2.4, 2.5, 3.0, 10.0');
  const [clusters, setClusters] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const clusterPoints = () => {
    const values = data
      .split(',')
      .map(str => parseFloat(str.trim()))
      .filter(num => !isNaN(num));

    if (values.length < 3) {
      alert('📌 최소 3개의 숫자를 입력해주세요. 예: 1.0, 2.5, 10.0');
      return;
    }

    // 간단한 거리 기반 클러스터링 시뮬레이션 (DBSCAN 유사)
    const eps = 1.0;
    const labels = Array(values.length).fill(-1);
    let currentLabel = 0;

    for (let i = 0; i < values.length; i++) {
      if (labels[i] !== -1) continue;

      const neighbors = values
        .map((v, j) => Math.abs(v - values[i]) <= eps ? j : -1)
        .filter(j => j !== -1);

      if (neighbors.length >= 2) {
        neighbors.forEach(j => labels[j] = currentLabel);
        currentLabel++;
      }
    }

    setClusters(labels);

    const colors = ['#60a5fa', '#34d399', '#facc15', '#f87171'];
    const highlightColors = labels.map(label =>
      label === -1 ? '#ef4444' : colors[label % colors.length]
    );

    setChartData({
      labels: values.map((_, i) => `x${i + 1}`),
      datasets: [
        {
          label: 'DBSCAN 결과',
          data: values,
          backgroundColor: highlightColors
        }
      ]
    });
  };

  const fillExample = () => {
    setData('1.0, 0.9, 2.4, 2.5, 3.0, 10.0');
  };

  return (
    <div className="dbscan-container">
      <h1 className="dbscan-title">🌐 DBSCAN 모델</h1>
      <p className="dbscan-description">
        DBSCAN은 <strong>밀도 기반 클러스터링</strong> 알고리즘으로,<br />
        밀도가 낮은 데이터는 <strong>이상치(Outlier)</strong>로 탐지합니다.
      </p>

      <div className="dbscan-example">
        <img src={dbscanImg} alt="DBSCAN 구조" className="dbscan-img" />
        <p className="dbscan-caption">예시: 고밀도 지역은 클러스터로, 나머지는 이상치로 분류</p>
      </div>

      <div className="dbscan-visual">
        <h2>🛠 클러스터링 시뮬레이션</h2>
        <p>숫자를 쉼표로 입력하세요 (예: 1.0, 2.5, 10.0)</p>
        <input
          className="sim-input"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="예: 1.0, 2.5, 10.0"
        />
        <div style={{ marginTop: '12px' }}>
          <button className="sim-button" onClick={clusterPoints}>📊 클러스터 시각화</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>

        {chartData && (
          <div className="dbscan-chart">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        )}

        {chartData && (
          <div className="sim-guide-toggle">
            <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
              {showGuide ? '📘 해석 가이드 닫기 ▲' : '📘 해석 가이드 열기 ▼'}
            </button>
            {showGuide && (
              <div className="dbscan-guide-box">
                <h3>해석 가이드</h3>
                <ul>
                  <li><strong>DBSCAN</strong>은 밀도 기반으로 클러스터를 구분합니다.</li>
                  <li><strong>이웃 수가 부족하거나 밀도에서 벗어난 점</strong>은 빨간색으로 표시됩니다.</li>
                  <li>고차원 및 시계열 데이터에도 확장 가능한 유연한 이상 탐지 기법입니다.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="dbscan-application">
          <h2>🌐 DBSCAN 활용 사례</h2>
          <ul>
            <li>📌 이상치 탐지 및 밀도 기반 군집 분류</li>
            <li>📍 지리 정보 기반 위치 클러스터링</li>
            <li>📈 시계열 이상 탐지 및 분산된 사용자 행동 분석</li>
            <li>🧪 데이터 노이즈 필터링 및 전처리 자동화</li>
            <li>🏭 산업 데이터 기반 클러스터 기반 예측</li>
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

export default DBSCAN;
