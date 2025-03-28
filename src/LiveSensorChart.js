import React, { useState, useEffect, useRef } from 'react';
import './Intro.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const generateSensorData = () => Math.floor(Math.random() * 100);

const LiveSensorChart = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const newVal = generateSensorData();
        const currentTime = new Date();
        const label = `${currentTime.getHours()}시 ${currentTime.getMinutes()}분 ${currentTime.getSeconds()}초`;

        setDataPoints((prev) => [...prev.slice(-9), newVal]);
        setLabels((prev) => [...prev.slice(-9), label]);
      }, 2000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: '센서값 (온도)',
        data: dataPoints,
        borderColor: '#3b82f6',
        backgroundColor: (ctx) => (ctx.raw > 80 ? '#ef4444' : '#3b82f6'),
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const time = context.label;
            return `시간: ${time} / 센서값: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="intro-simulate">
      <h3>🌡 실시간 센서 시뮬레이션</h3>
      <p>센서값이 실시간으로 변하며 80 이상이면 이상치로 표시됩니다.</p>
      
      <button onClick={toggleRunning} className="sensor-toggle-btn">
        {isRunning ? '⏸ 일시정지' : '▶ 작동'}
      </button>

      <div style={{ width: '100%', maxWidth: '1000px', height: '400px', margin: '20px auto' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LiveSensorChart;
