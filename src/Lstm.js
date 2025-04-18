// Lstm.js
import React, { useState } from 'react';
import './lstm.css';
import lstmImg from './images/lstm.png';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

const Lstm = () => {
  const navigate = useNavigate();
  const [sequence, setSequence] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const handlePrediction = () => {
    const numbers = sequence
      .split(',')
      .map(str => parseFloat(str.trim()))
      .filter(num => !isNaN(num));

    if (numbers.length < 3) {
      alert('📌 최소 3개의 숫자를 입력해주세요. 예: 1,2,3');
      return;
    }

    const avg = (numbers.slice(-3).reduce((a, b) => a + b, 0) / 3).toFixed(2);
    setPrediction(avg);

    setChartData({
      labels: [...numbers.map((_, i) => `t${i + 1}`), `t${numbers.length + 1}`],
      datasets: [
        {
          label: '입력 시계열 + 예측',
          data: [...numbers, avg],
          fill: false,
          borderColor: '#3b82f6',
          tension: 0.3,
        }
      ]
    });
  };

  const fillExample = () => {
    setSequence('10, 15, 11, 22, 26');
  };

  return (
    <div className="lstm-container">
      <h1 className="lstm-title">📉 LSTM(Long Short-Term Memory) 모델</h1>

      <p className="lstm-description">
        LSTM은 <strong>시간 순서 데이터</strong>의 패턴을 학습하여 <strong>예측 및 이상 탐지</strong>에 특화된 RNN 기반 모델입니다.<br />
        공정 데이터, 센서 신호, 시계열 패턴 분석에 탁월한 성능을 보입니다.
      </p>

      <div className="lstm-example">
        <img src={lstmImg} alt="LSTM 예시" className="lstm-img" />
        <p className="lstm-caption">예시: 시계열 입력을 처리하고 기억 셀(C<sub>t</sub>)로 전달하는 LSTM 내부 구조</p>
      </div>

      <div className="lstm-simulator">
        <h2>🧪 LSTM 예측 시뮬레이터</h2>
        <p>숫자를 쉼표로 구분하여 입력하세요 (예: 1, 2, 3)</p>
        <input
          className="sim-input"
          type="text"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="예: 10, 12, 14"
        />
        <div style={{ marginTop: '12px' }}>
          <button className="sim-button" onClick={handlePrediction}>📊 시각화</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>

        {prediction && (
  <div className="sim-result">
    🔮 <strong>예측된 다음 값:</strong> {prediction}
    <div className="sim-analysis">
      현재 입력된 시계열은 <strong>{sequence}</strong>입니다.<br />
      마지막 3개의 값: <strong>{sequence.split(',').slice(-3).join(', ')}</strong><br />
      → 이를 기반으로 평균값 <strong>{prediction}</strong>을 다음 시점의 값으로 예측하였습니다.
    </div>
    <div className="sim-guide">
      ➕ 최근 3개 값의 평균을 기준으로 예측하였습니다.<br />
      LSTM 모델은 이보다 훨씬 복잡한 방식으로 <strong>장기 의존성</strong>을 학습합니다.
    </div>
  </div>
)}

        {chartData && (
          <div className="sim-chart">
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        )}

        {prediction && (
          <div className="sim-guide-toggle">
            <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
              {showGuide ? '📘 해석 가이드 닫기 ▲' : '📘 해석 가이드 열기 ▼'}
            </button>
            {showGuide && (
              <div className="sim-guide-box">
              <h3>🧠 해석 가이드</h3>
              <ul>
                <li>📊 <strong>입력 데이터</strong>는 시계열(time-series)이며, 시간에 따라 변화하는 값을 의미합니다.</li>
                <li>📈 시각화 그래프에서 <strong>파란 선</strong>은 입력 값이며, 마지막 점은 예측 결과입니다.</li>
                <li>🧠 <strong>LSTM은</strong> 단순히 평균을 내는 것이 아니라, 과거 입력 흐름을 기억하여 패턴을 학습합니다.</li>
                <li>🧪 이 시뮬레이터는 <strong>최근 3개 값의 단순 평균</strong>을 기반으로 동작하며 실제 모델을 단순화한 것입니다.</li>
                <li>🔍 예측이 실제값과 크게 다르면, 더 복잡한 LSTM 구조가 필요할 수 있습니다.</li>
              </ul>
            </div>
            )}
          </div>
        )}
        <div className="lstm-application">
  <h2>📉 LSTM 활용 사례</h2>
  <ul>
    <li>📡 공정 센서 데이터 기반 <strong>장비 이상 감지</strong></li>
    <li>💓 헬스케어 시계열에서 <strong>심박수, 혈압 예측</strong></li>
    <li>📈 주식/환율 등 <strong>시계열 예측 모델</strong></li>
    <li>📦 물류 수요 예측 및 재고 최적화</li>
    <li>🧪 시계열 기반 <strong>예지 정비(PdM)</strong> 분석</li>
    <li>📊 <strong>고객 이탈 예측</strong>과 사용자 행동 시계열 분석</li>
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

export default Lstm;
