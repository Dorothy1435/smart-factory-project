// 📁 Conclusion.js (객체 전체 전송 + 시간, 값 출력 정상화)
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Conclusion.css';

function Conclusion() {
  const location = useLocation();
  const logs = location.state?.logs || [];
  const [detailedLogs, setDetailedLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!logs.length) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generate-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs }), // 🔥 객체 전체 전송
      });
      const data = await response.json();
      setDetailedLogs(data.detailed); // ✅ full object 기반
    } catch (err) {
      console.error('요약 생성 실패', err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityClass = (severity) => {
    if (severity === '심각') return 'severity-critical';
    if (severity === '주의') return 'severity-warning';
    return 'severity-normal';
  };
  

  const downloadPDF = async () => {
    if (!detailedLogs.length) return;
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/download-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: detailedLogs }),
      });
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'anomaly_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
    }
  };

  return (
    <div className="conclusion-container">
      <h2>🔍 이상 리포트 요약</h2>
      <div className="button-group">
  <button className="summary-btn" onClick={generateSummary}>
    {loading ? '생성 중...' : '📄 리포트 생성하기'}
  </button>
  {detailedLogs.length > 0 && (
    <button className="summary-btn download-btn" onClick={downloadPDF}>
      ⬇️ PDF 다운로드
    </button>
  )}
</div>

      <div className="log-summary-list">
        {detailedLogs.map((log, index) => (
          <div className="log-entry" key={index}>
            <div className="log-time">{log.time}</div>
            <div className="log-line">
              <span className="log-type">{log.type}</span>
              <span className="log-value"> ({log.value})</span>
              <span className={`log-severity ${getSeverityClass(log.severity)}`}> ({log.severity})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Conclusion;