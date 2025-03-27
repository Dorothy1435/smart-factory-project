//boxplot.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './boxplot.css';
import { Link, useNavigate } from 'react-router-dom';
import boxplotImg from './images/boxplot.png';

const Boxplot = () => {
  const [input, setInput] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();

  const parseInput = () => {
    const nums = input
      .split(',')
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (nums.length < 5) {
      alert('📌 최소 5개의 숫자를 입력해주세요.');
      return;
    }

    setDataArray(nums);
  };
  const fillExample = () => {
    setInput('4,5,6,7,8,9,10');
  };

  return (
    <div className="boxplot-container">
      <h1 className="boxplot-title">📦 박스플롯(Box Plot) 시각화</h1>

      <p className="boxplot-description">
        박스플롯은 <strong>중앙값</strong>, <strong>사분위수</strong>, <strong>최댓값</strong>, <strong>최솟값</strong> 및 <strong>이상치</strong>를 시각적으로 확인할 수 있는 그래프입니다.<br/>
        데이터 분포의 <strong>범위와 밀집도</strong>를 쉽게 파악할 수 있으며,<br/>
        <strong>정상값과 이상값</strong>을 구분하는 데 효과적으로 활용됩니다.
      </p>

      <div className="boxplot-example">
        <img src={boxplotImg} alt="박스플롯 예시" className="boxplot-img" />
        <p className="boxplot-caption">예시: Boxplot</p>
      </div>

      <p className="boxplot-description">
        아래 입력창에 데이터를 넣으면 자동으로 박스플롯이 생성됩니다.
      </p>

      <textarea
        className="input-area"
        placeholder="예: 4, 5, 6, 7, 8, 9, 10"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button className="visualize-button" onClick={parseInput}>
        📊 시각화
      </button>
      <button className="example-button" onClick={fillExample}>💡 예시 입력</button>

      {dataArray.length > 0 && (
        <div className="boxplot-chart">
          <Plot
            data={[
              {
                y: dataArray,
                type: 'box',
                name: '입력 데이터',
                boxpoints: 'outliers',
                marker: {
                  color: '#3b82f6',
                  outliercolor: '#ef4444',
                },
                line: {
                  color: '#1d4ed8',
                },
              },
            ]}
            layout={{
              width: 700,
              height: 400,
              title: '사용자 데이터 기반 박스플롯',
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
              font: {
                family: 'Arial, sans-serif',
                size: 14,
              },
            }}
          />
        </div>
      )}
      <div className="boxplot-key-points">
        <h2>✅ 박스플롯의 활용 포인트</h2>
        <ul>
          <li>📌 센서 측정값의 <strong>이상치 탐지</strong>에 활용</li>
          <li>📌 정상 범위 기준을 <strong>Q1, Q3, IQR</strong>로 설정</li>
          <li>📌 <strong>공정 품질 이상 여부</strong>를 빠르게 식별</li>
          <li>📌 데이터 비교 시 여러 그룹의 <strong>분포 차이</strong> 시각화</li>
        </ul>
      </div>

      <div className="boxplot-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default Boxplot;
