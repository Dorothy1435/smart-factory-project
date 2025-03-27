import React from 'react';
import './Intro.css';

const Intro = () => {
  return (
    <div className="intro-wrapper">
      <section className="intro-hero">
        <h2>📊 스마트 팩토리 이상치 탐지 프로젝트</h2>
        <p>
          본 프로젝트는 <strong>스마트 공정 데이터</strong>를 분석하여 <strong>이상치를 탐지</strong>하고, <br />
          이를 시각화함으로써 생산 공정의 효율성과 품질을 높이기 위한 목적을 가지고 있습니다.
        </p>
      </section>

      <section className="intro-content">
        <h3>🚀 주요 키워드</h3>
        <ul>
          <li><strong>스마트 팩토리</strong> – 실시간 센서 데이터 수집 및 AI 기반 분석</li>
          <li><strong>이상치 탐지</strong> – 정상/비정상 공정 흐름을 파악하여 품질 이슈 조기 탐지</li>
          <li><strong>협동 로봇</strong> – 인간과 함께 작업하며 공정 유연성을 극대화</li>
          <li><strong>AI 알고리즘</strong> – 머신러닝 기반 이상 탐지 및 자동 알림</li>
        </ul>
      </section>

      <section className="intro-highlight">
        <h3>💡 공정 데이터를 활용한 이상치 탐지의 중요성</h3>
        <p>
          제조 공정에서 발생하는 <strong>비정상적인 패턴</strong>을 조기에 탐지하면,
          불량률을 낮추고 생산 품질을 향상시킬 수 있습니다.<br /> 본 시스템은 다양한 시각화 기법을 활용하여
          공정 데이터를 직관적으로 이해할 수 있도록 설계되었습니다.
        </p>
      </section>
    </div>
  );
};

export default Intro;
