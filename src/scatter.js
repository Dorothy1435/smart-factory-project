import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './scatter.css';
import scatterImg from './images/scatter.png';
import { Link, useNavigate } from 'react-router-dom';

const ScatterPlot = () => {
  const [inputX, setInputX] = useState('');
  const [inputY, setInputY] = useState('');
  const [data, setData] = useState([]);
  const [regressionLine, setRegressionLine] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = () => {
    const x = inputX.split(',').map(val => parseFloat(val.trim()));
    const y = inputY.split(',').map(val => parseFloat(val.trim()));

    if (x.length !== y.length || x.length < 2 || y.includes(NaN)) {
      alert('📌 X와 Y 값의 개수가 같고, 숫자만 포함되어야 합니다.');
      return;
    }

    setData([{ x, y }]);
    calculateRegression(x, y);
  };

  const calculateRegression = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
    const sumXX = x.reduce((acc, val) => acc + val * val, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const xMin = Math.min(...x);
    const xMax = Math.max(...x);
    const regressionX = [xMin, xMax];
    const regressionY = regressionX.map(val => slope * val + intercept);

    setRegressionLine({ x: regressionX, y: regressionY });
  };

  const fillExample = () => {
    setInputX('1,2,3,4,5,6,7');
    setInputY('2,4,5,4,5,7,8');
  };

  return (
    <div className="scatter-container">
      <h1 className="scatter-title">📡 산점도(Scatter Plot)</h1>

      <p className="scatter-description">
        산점도는 <strong>두 변수 간의 관계</strong>를 점으로 표현하는 시각화 방식입니다.<br />
        변수 간의 상관성, 패턴, 이상값 등을 쉽게 파악할 수 있습니다.
      </p>

      <div className="scatter-example">
        <img src={scatterImg} alt="산점도 예시" className="scatter-img" />
        <p className="scatter-caption">예시: X-Y 관계를 표현한 산점도</p>
      </div>

      <div className="scatter-input-section">
        <h3>📥 X, Y 데이터 입력 (쉼표로 구분된 숫자)</h3>
        <textarea
          className="input-area"
          rows="2"
          placeholder="X: 1,2,3,4"
          value={inputX}
          onChange={(e) => setInputX(e.target.value)}
        />
        <textarea
          className="input-area"
          rows="2"
          placeholder="Y: 2,4,3,5"
          value={inputY}
          onChange={(e) => setInputY(e.target.value)}
        />
        <div style={{ marginTop: '10px' }}>
          <button className="visualize-button" onClick={handleGenerate}>📊 시각화</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>
      </div>

      {data.length > 0 && (
        <div className="scatter-plot-section">
          <Plot
            data={[
              {
                ...data[0],
                type: 'scatter',
                mode: 'markers',
                marker: { color: '#3b82f6', size: 10 },
                name: '산점도'
              },
              regressionLine && {
                x: regressionLine.x,
                y: regressionLine.y,
                type: 'scatter',
                mode: 'lines',
                line: { color: 'red', width: 2, dash: 'dot' },
                name: '회귀선 (최소제곱)'
              }
            ].filter(Boolean)}
            layout={{
              width: 650,
              height: 400,
              title: '산점도 시각화 결과',
              xaxis: { title: 'X 값' },
              yaxis: { title: 'Y 값' },
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
              transition: {
                duration: 800,
                easing: 'cubic-in-out'
              }
            }}
          />
        </div>
      )}

      <div className="scatter-guide-wrapper">
        <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
          {showGuide ? '📘 산점도 해석 가이드 닫기 ▲' : '📘 산점도 해석 가이드 열기 ▼'}
        </button>
        {showGuide && (
          <div className="scatter-guide">
            <h2>📘 산점도 해석 가이드</h2>
            <ul>
              <li>🔗 점들이 대각선 방향 → <strong>양의 상관관계</strong></li>
              <li>📉 점들이 반대 방향 → <strong>음의 상관관계</strong></li>
              <li>🌀 뚜렷한 패턴이 없음 → <strong>무상관</strong> 가능성</li>
              <li>🎯 군집 외부에 있는 점 → <strong>이상값</strong> 가능성</li>
              <li>📊 산점도는 <strong>모델 학습 전 변수 간 관계 파악</strong>에 유용</li>
              <li>📈 회귀선은 <strong>변수 간 경향성을 요약</strong>한 선형 추세선입니다.</li>
            </ul>
          </div>
        )}
      </div>

      <div className="scatter-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default ScatterPlot;
