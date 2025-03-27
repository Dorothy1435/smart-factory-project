import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

const AnomalyArt = () => {
  const [anomalyRate, setAnomalyRate] = useState(0.1);
  const [points, setPoints] = useState([]);

  const generateData = () => {
    const totalPoints = 300;
    const anomalies = Math.floor(totalPoints * anomalyRate);
    const normal = totalPoints - anomalies;

    const normalPoints = Array.from({ length: normal }, () => ({
      x: Math.random() * 10,
      y: Math.random() * 10,
      label: 'normal'
    }));
    const anomalyPoints = Array.from({ length: anomalies }, () => ({
      x: Math.random() * 10,
      y: Math.random() * 10,
      label: 'anomaly'
    }));

    setPoints([...normalPoints, ...anomalyPoints]);
  };

  return (
    <div className="anomaly-art-section">
      <h3>🎨 이상치 시각화 아트</h3>
      <label>이상치 비율: {(anomalyRate * 100).toFixed(0)}%</label>
      <input
        type="range"
        min="0"
        max="0.5"
        step="0.01"
        value={anomalyRate}
        onChange={(e) => setAnomalyRate(parseFloat(e.target.value))}
      />
      <button onClick={generateData}>🖼️ 아트 생성</button>

      <Plot
        data={[
          {
            x: points.filter(p => p.label === 'normal').map(p => p.x),
            y: points.filter(p => p.label === 'normal').map(p => p.y),
            mode: 'markers',
            type: 'scatter',
            name: '정상',
            marker: { color: 'blue' }
          },
          {
            x: points.filter(p => p.label === 'anomaly').map(p => p.x),
            y: points.filter(p => p.label === 'anomaly').map(p => p.y),
            mode: 'markers',
            type: 'scatter',
            name: '이상치',
            marker: { color: 'red', size: 10 }
          }
        ]}
        layout={{ width: 600, height: 400, title: '이상 탐지 아트' }}
      />
    </div>
  );
};

export default AnomalyArt;
