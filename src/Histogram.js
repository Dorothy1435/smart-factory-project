import React, { useState } from 'react';
import './Histogram.css';
import histogramImg from './images/histogram.png';
import { Bar } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogram = () => {
  const [inputs, setInputs] = useState('');
  const [histogramData, setHistogramData] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputs(e.target.value);
  };

  const handleGenerate = () => {
    const numbers = inputs.split(',').map(Number).filter(n => !isNaN(n));
    const bins = [0, 10, 20, 30, 40, 50, 60];
    const counts = Array(bins.length - 1).fill(0);

    numbers.forEach(num => {
      for (let i = 0; i < bins.length - 1; i++) {
        if (num >= bins[i] && num < bins[i + 1]) {
          counts[i]++;
          break;
        }
      }
    });

    setHistogramData({
      labels: bins.slice(0, -1).map((b, i) => `${b}~${bins[i + 1]}`),
      datasets: [
        {
          label: '입력된 값의 분포',
          data: counts,
          backgroundColor: '#60A5FA',
        },
      ],
    });
  };

  const histogramOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: '사용자 입력 기반 히스토그램',
        font: { size: 18 }
      },
    },
  };
  const fillExample = () => {
    setInputs('1,4,17,20,23,25,28,32,36,40,45,48,50');
  };

  return (
    <div className="histogram-container">
      <h1 className="histogram-title">📈 히스토그램이란?</h1>

      <p className="histogram-description">
        히스토그램은 데이터를 구간별로 나누어 <strong>분포 형태</strong>를 파악하는 데 사용되는 시각화 기법입니다.<br />
        데이터가 특정 구간에 얼마나 집중되어 있는지,<br />
        <strong>정규성 여부</strong>나 <strong>왜도(Skewness)</strong>, <strong>첨도(Kurtosis)</strong> 등의<br />
        분포 특성을 시각적으로 파악할 수 있습니다.
      </p>

      <div className="histogram-example">
        <img src={histogramImg} alt="히스토그램 예시" className="histogram-img reduced-size" />
        <p className="histogram-caption">예시: Histogram</p>
      </div>

      <div className="histogram-user-input">
        <h2 className="chart-title">🧑‍💻 사용자 데이터 입력</h2>
        <p>숫자 데이터를 쉼표(,)로 구분해 입력하세요 (범위 0 ~ 60)</p>
        <textarea
          rows="3"
          value={inputs}
          onChange={handleInputChange}
          placeholder="10,20,22,25,30,35,40"
        />
        <button className="visualize-button" onClick={handleGenerate}>
  📊        시각화
        </button>
        <button className="example-button" onClick={fillExample}>💡 예시 입력</button>
      </div>

      {histogramData && (
        <div className="histogram-chart-section">
          <Bar data={histogramData} options={histogramOptions} className="histogram-bar-chart" />
        </div>
      )}

      <div className="histogram-key-points">
        <h2>✅ 히스토그램의 활용 포인트</h2>
        <ul>
          <li>📌 공정 온도, 전압 등의 <strong>정상 범위</strong> 탐색</li>
          <li>📌 <strong>이상 탐지 기준선</strong> 설정 시 기초 통계로 활용</li>
          <li>📌 시계열 이상 탐지 전 <strong>데이터 품질 진단</strong> 용도로도 활용</li>
          <li>📌 <strong>데이터 불균형</strong> 여부 및 <strong>극단값 존재 여부</strong> 판단에 도움</li>
          <li>📌 <strong>데이터 전처리</strong> 과정에서의 outlier 제거 기준 수립</li>
        </ul>
      </div>

      <div className="histogram-navigation">
        <button onClick={() => navigate(-1)} className="nav-button">← 이전 페이지로</button>
        <Link to="/" className="nav-button">🏠 홈페이지로</Link>
      </div>
    </div>
  );
};

export default Histogram;
