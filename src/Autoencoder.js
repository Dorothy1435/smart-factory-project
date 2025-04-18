// Autoencoder.js
import React, { useState } from 'react';
import './Autoencoder.css';
import aeImg from './images/autoencoder.png';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';

Chart.register(BarElement, CategoryScale, LinearScale);

const Autoencoder = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('1.0, 0.9, 1.5, 0.95, 1.05');
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const handleReconstruct = () => {
    const numbers = input
      .split(',')
      .map(str => parseFloat(str.trim()))
      .filter(num => !isNaN(num));

    if (numbers.length < 3) {
      alert('📌 최소 3개의 숫자를 입력해주세요. 예: 1.0, 0.9, 1.1');
      return;
    }

    const reconstructed = numbers.map(n => parseFloat((n * 0.98).toFixed(2)));
    const mse = (
      numbers.reduce((acc, n, i) => acc + Math.pow(n - reconstructed[i], 2), 0) / numbers.length
    ).toFixed(4);

    const threshold = 0.03;
    const diffs = numbers.map((n, i) => Math.abs(n - reconstructed[i]));
    const highlightColors = diffs.map(diff => diff > threshold ? '#ef4444' : '#facc15');

    setOutput(reconstructed);
    setError(mse);

    setChartData({
      labels: numbers.map((_, i) => `x${i + 1}`),
      datasets: [
        {
          label: '입력값',
          data: numbers,
          backgroundColor: '#60a5fa'
        },
        {
          label: '복원값',
          data: reconstructed,
          backgroundColor: highlightColors
        }
      ]
    });
  };

  const fillExample = () => {
    setInput('1.0, 0.9, 2.2, 0.95, 1.05');
  };

  return (
    <div className="autoencoder-container">
      <h1 className="autoencoder-title">📊 Autoencoder 모델</h1>

      <p className="autoencoder-description">
        Autoencoder는 <strong>입력 데이터를 압축(Encoding)</strong>하고, <strong>복원(Decoding)</strong>하는 방식으로<br />
        <strong>특징 추출</strong> 및 <strong>이상 탐지</strong>에 활용되는 신경망입니다.
      </p>

      <div className="autoencoder-example">
        <img src={aeImg} alt="Autoencoder 구조" className="autoencoder-img" />
        <p className="autoencoder-caption">예시: 입력 데이터를 잠재 공간에서 압축한 후 복원하는 Autoencoder 구조</p>
      </div>

      <div className="autoencoder-visual">
        <h2>🛠 입력값 재구성 시뮬레이션</h2>
        <p>숫자를 쉼표로 입력하세요 (예: 1.0, 0.9, 1.1)</p>
        <input
          className="sim-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 1.0, 0.9, 1.1"
        />
        <div style={{ marginTop: '12px' }}>
          <button className="sim-button" onClick={handleReconstruct}>📊 시각화</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>

        {output && (
          <div className="sim-analysis">
            <p><strong>입력값:</strong> {input}</p>
            <p><strong>복원값:</strong> {output.join(', ')}</p>
            <p><strong>평균 제곱 오차(MSE):</strong> {error}</p>
          </div>
        )}

        {chartData && (
          <div className="ae-chart">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        )}

        {output && (
          <div className="sim-guide-toggle">
            <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
              {showGuide ? '📘 해석 가이드 닫기 ▲' : '📘 해석 가이드 열기 ▼'}
            </button>
            {showGuide && (
              <div className="ae-guide-box">
                <h3> 해석 가이드</h3>
                <ul>
                  <li><strong>Autoencoder</strong>는 입력을 스스로 복원하면서 중요한 특징만 추출합니다.</li>
                  <li>복원값이 입력값과 크게 다르면 <strong>이상치로 간주</strong>할 수 있습니다.</li>
                  <li>차이가 <strong>0.03 이상일 경우</strong> 해당 막대가 <span style={{color: '#ef4444'}}><strong>빨간색</strong></span>으로 표시됩니다.</li>
                  <li>이 방식은 제조 불량 감지, 이미지 노이즈 제거 등 다양한 분야에서 활용됩니다.</li>
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="ae-application">
  <h2>📊 Autoencoder 활용 사례</h2>
  <ul>
    <li>🔍 센서 데이터 기반 <strong>이상 탐지</strong></li>
    <li>🛠 <strong>제조 공정 불량 감지</strong> 및 품질 예측</li>
    <li>🧬 <strong>의료 이미지</strong>의 노이즈 제거 및 복원</li>
    <li>🎨 <strong>이미지 압축</strong> 및 차원 축소</li>
    <li>🧠 사용자 행동 기반 <strong>이상 탐지</strong> 시스템 구축</li>
    <li>📡 <strong>네트워크 트래픽 이상 탐지</strong> 및 보안 분석</li>
  </ul>
</div>
      </div>

      <div className="lstm-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default Autoencoder;
