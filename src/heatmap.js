//heatmap.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './heatmap.css';
import heatmapImg from './images/heatmap.png';
import { Link, useNavigate } from 'react-router-dom';

const Heatmap = () => {
  const [input, setInput] = useState('');
  const [matrix, setMatrix] = useState([]);
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);


  const handleGenerate = () => {
    const rows = input.trim().split('\n');
    const parsed = rows.map(row =>
      row.split(',').map(val => parseFloat(val.trim())).filter(n => !isNaN(n))
    );

    const valid = parsed.every(row => row.length === parsed[0].length);
    if (!valid || parsed.length < 2) {
      alert('📌 2행 이상, 열 수가 동일한 숫자 행렬을 입력해주세요.');
      return;
    }

    setMatrix(parsed);
    calculateSummary(parsed);
  };

  const calculateSummary = (data) => {
    let flat = data.flat();
    const sorted = [...flat].sort((a, b) => a - b);
    const q1 = percentile(sorted, 25);
    const q3 = percentile(sorted, 75);
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
  
    let max = -Infinity, min = Infinity, sum = 0;
    let maxPos = [0, 0], minPos = [0, 0];
    let outliers = [];
  
    data.forEach((row, i) => {
      row.forEach((val, j) => {
        sum += val;
        if (val > max) {
          max = val;
          maxPos = [i, j];
        }
        if (val < min) {
          min = val;
          minPos = [i, j];
        }
        if (val < lowerBound || val > upperBound) {
          outliers.push({ value: val, row: i + 1, col: j + 1 });
        }
      });
    });
  
    const avg = (sum / flat.length).toFixed(2);
    setSummary({
      max,
      min,
      avg,
      maxPos,
      minPos,
      outliers,
      outlierCount: outliers.length
    });
  };

  // 사분위수 계산
const percentile = (arr, p) => {
  const index = (p / 100) * (arr.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  return lower === upper ? arr[lower]
    : arr[lower] + (arr[upper] - arr[lower]) * (index - lower);
};

  const fillExample = () => {
    setInput("1,8,3,4\n4,5,11,6\n7,8,15,9\n4,18,14,2");
  };

  return (
    <div className="heatmap-container">
      <h1 className="heatmap-title">🔥 히트맵(Heatmap) 시각화</h1>

      <p className="heatmap-description">
        히트맵은 <strong>두 변수 간의 관계</strong> 또는 <strong>값의 크기</strong>를 <strong>색상</strong>으로 표현하는 시각화 기법입니다.<br />
        예를 들어, 열별 온도, 센서 데이터 밀도 등을 시각적으로 쉽게 확인할 수 있습니다.
      </p>

      <div className="heatmap-example">
        <img src={heatmapImg} alt="히트맵 예시" className="heatmap-img" />
        <p className="heatmap-caption">예시: 공정 단계별 온도 분포 히트맵</p>
      </div>

      <div className="heatmap-input-section">
        <h3>📥 데이터 입력 (2차원 행렬, 쉼표로 구분)</h3>
        <textarea
          className="input-area"
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 1,2,3\n4,5,6\n7,8,9"
        />
        <div style={{ marginTop: '10px' }}>
          <button className="visualize-button" onClick={handleGenerate}>📊 시각화</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>
      </div>

      {matrix.length > 0 && (
        <div className="heatmap-plot-section">
          <Plot
            data={[{
              z: matrix,
              type: 'heatmap',
              colorscale: 'YlOrRd',
            }]}
            layout={{
              width: 600,
              height: 400,
              title: 'Heatmap 시각화 결과',
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
            }}
          />

          {/* 🔍 히트맵 해석 결과 */}
          {summary && (
            <div className="heatmap-summary">
              <h3>📋 데이터 요약 분석</h3>
              <p>🔺 <strong>최댓값</strong>: {summary.max} (행 {summary.maxPos[0] + 1}, 열 {summary.maxPos[1] + 1})</p>
              <p>🔻 <strong>최솟값</strong>: {summary.min} (행 {summary.minPos[0] + 1}, 열 {summary.minPos[1] + 1})</p>
              <p>📊 <strong>전체 평균</strong>: {summary.avg}</p>

              {summary.outlierCount > 0 ? (
      <div className="heatmap-warning">
        ⚠️ <strong>이상치 {summary.outlierCount}개</strong> 발견됨  
        <ul>
          {summary.outliers.map((o, idx) => (
            <li key={idx}>행 {o.row}, 열 {o.col} → 값: {o.value}</li>
          ))}
        </ul>
      </div>
    ) : (
      <p style={{ color: 'green' }}>✅ 이상치는 발견되지 않았습니다.</p>
    )}
            </div>
          )}
        </div>
      )}
      <div className="heatmap-guide-wrapper">
  <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
    {showGuide ? '📘 히트맵 해석 가이드 닫기 ▲' : '📘 히트맵 해석 가이드 열기 ▼'}
  </button>
  {showGuide && (
    <div className="heatmap-guide">
      <h3>🧠 히트맵 해석 가이드</h3>
      <ul style={{ textAlign: 'left', display: 'inline-block', lineHeight: '1.8' }}>
        <li>🎨 색상은 값의 크기를 나타냅니다. <strong>밝은 노랑</strong>은 높은 값, <strong>진한 빨강</strong>은 낮은 값을 의미합니다.</li>
        <li>🧱 각 셀은 <strong>(행, 열)</strong> 위치의 데이터를 나타냅니다.</li>
        <li>📍 데이터의 <strong>분포 패턴</strong>을 쉽게 시각화할 수 있습니다.</li>
        <li>🚨 색이 유난히 밝거나 어두운 셀은 <strong>이상값(outlier)</strong>일 가능성이 높습니다.</li>
        <li>📊 전체 평균, 최댓값/최솟값 위치, 이상치 경고는 자동 분석됩니다.</li>
      </ul>
    </div>
  )}
</div>

      <div className="heatmap-key-points">
        <h2>✅ 히트맵의 활용 포인트</h2>
        <ul>
          <li>📌 <strong>두 변수 간 상관성</strong> 분석</li>
          <li>📌 <strong>이상값 집중 영역</strong> 탐색</li>
          <li>📌 <strong>열별/행별 패턴</strong> 탐지</li>
          <li>📌 <strong>센서 신호 이상 모니터링</strong></li>
        </ul>
      </div>

      <div className="heatmap-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default Heatmap;
