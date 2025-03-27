// clock.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './clock.css';
import clockImg from './images/clock.png';
import { Link, useNavigate } from 'react-router-dom';

const ClockPlot = () => {
  const [input, setInput] = useState('');
  const [timeSeries, setTimeSeries] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = () => {
    const values = input
      .split(',')
      .map(val => parseFloat(val.trim()))
      .filter(n => !isNaN(n));

    if (values.length < 2) {
      alert('⏰ 2개 이상의 숫자 데이터를 입력해주세요.');
      return;
    }

    setTimeSeries(values);
    calculateSummary(values);
  };

  const calculateSummary = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const avg = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
    const range = max - min;
    const maxIndex = data.indexOf(max);
    const minIndex = data.indexOf(min);

    setSummary({ max, min, avg, range, maxIndex, minIndex });
  };

  const movingAverage = (data, windowSize = 3) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (i < windowSize - 1) {
        result.push(null);
      } else {
        const avg = data.slice(i - windowSize + 1, i + 1).reduce((a, b) => a + b, 0) / windowSize;
        result.push(avg);
      }
    }
    return result;
  };

  const fillExample = () => {
    setInput('3,5,8,10,9,7,6,4,3,5,6');
  };

  return (
    <div className="clock-container">
      <h1 className="clock-title">⏰ 시계열(Time Series) 플롯</h1>

      <p className="clock-description">
        시계열 플롯은 <strong>시간에 따른 값의 변동</strong>을 선으로 표현한 시각화 방식입니다.<br />
        공정에서 수집되는 센서 데이터의 흐름, 패턴, 이상 여부를 파악하는 데 유용합니다.
      </p>

      <div className="clock-example">
        <img src={clockImg} alt="시계열 플롯 예시" className="clock-img" />
        <p className="clock-caption">예시: 시간에 따른 센서 데이터</p>
      </div>

      <div className="clock-input-section">
        <h3>📥 데이터 입력 (쉼표로 구분된 숫자)</h3>
        <textarea
          className="input-area"
          rows="3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 3,5,8,10,9,7,6"
        />
        <div style={{ marginTop: '10px' }}>
          <button className="visualize-button" onClick={handleGenerate}>📊 시각화</button>
          <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
        </div>
      </div>

      {timeSeries.length > 0 && (
        <div className="clock-plot-section">
          <Plot
            data={[
              {
                x: timeSeries.map((_, i) => i + 1),
                y: timeSeries,
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: '#3b82f6' },
                marker: { color: '#1d4ed8' },
                name: '시계열 데이터'
              },
              {
                x: timeSeries.map((_, i) => i + 1),
                y: movingAverage(timeSeries),
                type: 'scatter',
                mode: 'lines',
                line: { color: 'orange', dash: 'dot' },
                name: '이동 평균 (3개)'
              }
            ]}
            layout={{
              width: 650,
              height: 400,
              title: '시계열 데이터 시각화 결과',
              xaxis: { title: '시간(Time)' },
              yaxis: { title: '값(Value)' },
              shapes: [
                {
                  type: 'line',
                  x0: 1,
                  x1: timeSeries.length,
                  y0: 9,
                  y1: 9,
                  line: { color: 'red', width: 2, dash: 'dash' },
                },
              ],
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
            }}
          />

          {summary && (
            <div className="clock-summary">
              <h3>📋 요약 통계</h3>
              <p>🔺 <strong>최댓값</strong>: {summary.max} (시간 {summary.maxIndex + 1})</p>
              <p>🔻 <strong>최솟값</strong>: {summary.min} (시간 {summary.minIndex + 1})</p>
              <p>📊 <strong>평균</strong>: {summary.avg} | <strong>범위</strong>: {summary.range}</p>
            </div>
          )}
        </div>
      )}
      <div className="clock-guide-wrapper">
        <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
          {showGuide ? '📘 시계열 해석 가이드 닫기 ▲' : '📘 시계열 해석 가이드 열기 ▼'}
        </button>
        {showGuide && (
          <div className="clock-guide">
            <h2>📘 시계열 플롯 해석 가이드</h2>
            <ul>
              <li><strong>데이터 흐름 파악</strong>: 완만한 상승/하락 → 추세(Trend) 의미</li>
              <li><strong>급변 구간</strong>: 튀거나 급격한 하강 → 이상치나 이벤트 발생</li>
              <li><strong>이동 평균선</strong>: 노이즈 제거 후 흐름 확인에 적합</li>
              <li><strong>이상 탐지 기준선</strong>: 기준선을 넘는 값은 주의 요망</li>
              <li><strong>활용</strong>: 품질 예측, 고장 진단, AI 학습 데이터로 사용 가능</li>
            </ul>
          </div>
        )}
      </div>

      <div className="clock-key-points">
        <h2>✅ 시계열 플롯 활용 포인트</h2>
        <ul>
          <li>📌 <strong>공정 센서 값의 시간 흐름</strong> 추적</li>
          <li>📌 <strong>비정상 패턴, 급변 시점</strong> 감지</li>
          <li>📌 예지 정비(PdM) 및 <strong>알고리즘 학습용</strong> 데이터 구성</li>
          <li>📌 <strong>계절성, 주기성</strong> 있는 데이터 흐름 분석</li>
        </ul>
      </div>

      <div className="clock-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default ClockPlot;