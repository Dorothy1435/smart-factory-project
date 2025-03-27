// ChartPreview.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const chartItems = [
  { title: '히스토그램', path: '/histogram', img: '/images/histogram.png' },
  { title: '박스플롯', path: '/boxplot', img: '/images/boxplot.png' },
  { title: '히트맵', path: '/heatmap', img: '/images/heatmap.png' },
  { title: '시계열 플롯', path: '/clock', img: '/images/clock.png' },
  { title: '산점도', path: '/scatter', img: '/images/scatter.png' }
];

const ChartPreview = () => {
  return (
    <section className="chart-preview">
      <h3 className="chart-title">📊 시각화 미리보기</h3>
      <div className="chart-grid">
        {chartItems.map((chart, idx) => (
          <Link to={chart.path} className="chart-card" key={idx}>
            <img src={chart.img} alt={chart.title} className="chart-img" />
            <p>{chart.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ChartPreview;
