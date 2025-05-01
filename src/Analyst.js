// 📁 Analyst.js (최종 수정본)
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Analyst.css';

function getRandomValue(min, max) {
  return (Math.random() * (max - min) + min).toFixed(3);
}

function isOutOfRange(value, min, max) {
  return parseFloat(value) < min || parseFloat(value) > max;
}

const downloadCSV = (logs) => {
  if (logs.length === 0) return;
  const header = '시간,내용\n';
  const csvContent = logs.map(log => log).join('\n');
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + header + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "anomaly_logs.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function Analyst() {
  const [ph, setPh] = useState(getRandomValue(5.5, 8.5));
  const [temp, setTemp] = useState(getRandomValue(38, 44));
  const [voltage, setVoltage] = useState(getRandomValue(14, 17.7));
  const [logs, setLogs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isRunning, setIsRunning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const newPh = getRandomValue(5, 8.5);
      const newTemp = getRandomValue(38, 44);
      const newVoltage = getRandomValue(14, 17.7);

      setPh(newPh);
      setTemp(newTemp);
      setVoltage(newVoltage);

      const now = new Date();
      const timestamp = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

      const newLogs = [];
      if (isOutOfRange(newPh, 6.2, 7.8)) newLogs.push(`${timestamp} pH 이상 (${newPh})`);
      if (isOutOfRange(newTemp, 38.5, 43)) newLogs.push(`${timestamp} 온도 이상 (${newTemp})`);
      if (isOutOfRange(newVoltage, 14.5, 17)) newLogs.push(`${timestamp} 전압 이상 (${newVoltage})`);

      if (newLogs.length > 0) setLogs(prev => [...prev, ...newLogs]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="analyst-wrapper">
      <h2 className="analyst-title">🔍 실시간 공정 데이터 분석</h2>
      <p className="current-time">⏰ 현재 시간: {currentTime}</p>
      <div className="normal-range">
        ✅ 정상 범위: pH 6.2 ~ 7.8 / 온도 38.5 ~ 43 ℃ / 전압 14.5 ~ 17 V
      </div>

      <div className="sensor-toggle-container">
        <button onClick={() => setIsRunning(prev => !prev)} className="sensor-toggle-btn">
          {isRunning ? '⏸ 일시정지' : '▶ 작동'}
        </button>
      </div>

      <div className="analyst-panel">
        <div className={`analyst-card ${isOutOfRange(ph, 6.2, 7.8) ? 'alert' : ''}`}>
          <h4>pH 값</h4>
          <p>{ph} pH</p>
        </div>
        <div className={`analyst-card ${isOutOfRange(temp, 38.5, 43) ? 'alert' : ''}`}>
          <h4>온도 (Temp)</h4>
          <p>{temp} ℃</p>
        </div>
        <div className={`analyst-card ${isOutOfRange(voltage, 14.5, 17) ? 'alert' : ''}`}>
          <h4>전압 (Voltage)</h4>
          <p>{voltage} V</p>
        </div>
      </div>

      <div className="log-section">
      <div className="log-header">
  <h3 className="log-title">📋 이상 로그 기록</h3>
  <div className="log-tools">
    <button className="clear-log-button" onClick={() => setLogs([])}>로그 초기화</button>
    <button className="export-log-button" onClick={() => downloadCSV(logs)}>CSV 다운로드</button>
  </div>
</div>
<div className="conclusion-button-group">
  <button
    className="export-log-button"
    onClick={() => {
      const formattedLogs = logs.map(log => {
        const match = log.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (.+) \((.+)\)/);
        if (match) {
          const [, time, type, value] = match;
          return { time, type, value };
        } else {
          return null;
        }
      }).filter(log => log !== null);
      navigate('/conclusion', { state: { logs: formattedLogs } });
    }}
  >
    📄 결론 페이지로 이동
  </button>
</div>
<ul className="log-list">
  {logs.map((log, index) => <li key={index}>{log}</li>)}
</ul>


      </div>
    </div>
  );
}

export default Analyst;
