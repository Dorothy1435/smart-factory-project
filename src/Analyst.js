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
  const header = '시간,내용,값,이유\n';
  const csvContent = logs.map((log) => {
    const timeMatch = log.match(/\[(.*?)\]/);
    const time = timeMatch ? timeMatch[1] : '';
    let type = '', value = '', reason = '';
    if (log.includes('pH')) {
      type = 'pH 이상';
      const rawValue = log.match(/pH 이상: ([\d.]+)/)?.[1] || '';
      value = rawValue + 'pH';
      const num = parseFloat(rawValue);
      reason = num < 6.2 ? '낮음' : '높음';
    } else if (log.includes('온도')) {
      type = '온도 이상';
      value = log.match(/온도 이상: ([\d.]+)℃/)?.[1] + '℃' || '';
      const num = parseFloat(value);
      reason = num < 38.5 ? '낮음' : '높음';
    } else if (log.includes('전압')) {
      type = '전압 이상';
      value = log.match(/전압 이상: ([\d.]+)V/)?.[1] + 'V' || '';
      const num = parseFloat(value);
      reason = num < 14.5 ? '낮음' : '높음';
    }
    return `${time},${type},${value},${reason}`;
  }).join('\n');
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
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timeInterval);
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
      const now = new Date().toLocaleTimeString();
      const newLogs = [];
      if (isOutOfRange(newPh, 6.2, 7.8)) newLogs.push(`⚠ [${now}] pH 이상: ${newPh}pH`);
      if (isOutOfRange(newTemp, 38.5, 43)) newLogs.push(`⚠ [${now}] 온도 이상: ${newTemp}℃`);
      if (isOutOfRange(newVoltage, 14.5, 17)) newLogs.push(`⚠ [${now}] 전압 이상: ${newVoltage}V`);
      if (newLogs.length > 0) setLogs((prevLogs) => [...prevLogs, ...newLogs]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const clearLogs = () => setLogs([]);
  const toggleRunning = () => setIsRunning((prev) => !prev);

  return (
    <div className="analyst-wrapper">
      <h2 className="analyst-title">🔍 실시간 공정 데이터 분석</h2>
      <p className="current-time">⏰ 현재 시간: {currentTime}</p>
      <div className="normal-range">
        ✅ 정상 범위: pH 6.2 ~ 7.8 / 온도 38.5 ~ 43 ℃ / 전압 14.5 ~ 17 V
      </div>
      <div className="sensor-toggle-container">
        <button onClick={toggleRunning} className="sensor-toggle-btn">
          {isRunning ? '⏸ 일시정지' : '▶ 작동'}
        </button>
      </div>

      <div className="guide-section">
        <button className="accordion-toggle" onClick={() => setShowGuide(!showGuide)}>
          {showGuide ? '📘 이상치 해석 가이드 닫기 ▲' : '📘 이상치 해석 가이드 열기 ▼'}
        </button>
        {showGuide && (
          <div className="log-guide">
            <h3>📘 이상치 해석 가이드</h3>
            <ul>
              <li>🔹 <strong>pH 낮음</strong>: 알칼리 용액 주입 필요</li>
              <li>🔹 <strong>pH 높음</strong>: 산성 물질 투입량 조절</li>
              <li>🔹 <strong>온도 낮음</strong>: 히터 작동 확인 또는 공정 온도 조정</li>
              <li>🔹 <strong>온도 높음</strong>: 냉각 시스템 점검</li>
              <li>🔹 <strong>전압 낮음</strong>: 전원 공급 라인 점검</li>
              <li>🔹 <strong>전압 높음</strong>: 전력 부하 조정 필요</li>
            </ul>
          </div>
        )}
      </div>

      <div className="analyst-panel">
      <div className={`analyst-card ${isOutOfRange(ph, 6.2, 7.8) ? 'alert' : ''}`}>
  <h4>pH 값</h4>
  <p>{ph} pH</p>
  {isOutOfRange(ph, 6.2, 7.8) && (
    <span className={`status-label ${parseFloat(ph) < 6.2 ? 'status-low' : 'status-high'}`}>
      {parseFloat(ph) < 6.2 ? '🔽 낮음' : '🔼 높음'}
    </span>
  )}
</div>

<div className={`analyst-card ${isOutOfRange(temp, 38.5, 43) ? 'alert' : ''}`}>
  <h4>온도 (Temp)</h4>
  <p>{temp} ℃</p>
  {isOutOfRange(temp, 38.5, 43) && (
    <span className={`status-label ${parseFloat(temp) < 38.5 ? 'status-low' : 'status-high'}`}>
      {parseFloat(temp) < 38.5 ? '🔽 낮음' : '🔼 높음'}
    </span>
  )}
</div>

<div className={`analyst-card ${isOutOfRange(voltage, 14.5, 17) ? 'alert' : ''}`}>
  <h4>전압 (Voltage)</h4>
  <p>{voltage} V</p>
  {isOutOfRange(voltage, 14.5, 17) && (
    <span className={`status-label ${parseFloat(voltage) < 14.5 ? 'status-low' : 'status-high'}`}>
      {parseFloat(voltage) < 14.5 ? '🔽 낮음' : '🔼 높음'}
    </span>
  )}
</div>

      </div>

      <div className="log-section">
        <div className="log-header">
          <h3 className="log-title">📋 이상 로그 기록</h3>
          <div>
            <button className="clear-log-button" onClick={clearLogs}>초기화</button>
            <button className="export-log-button" onClick={() => downloadCSV(logs)}>CSV 다운로드</button>
          </div>
        </div>
        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Analyst;
