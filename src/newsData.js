// src/newsData.js
const staticNews = [
    {
      title: '삼성SDI, AI로 배터리 불량 줄인다',
      description: '삼성SDI가 데이터IT센터를 신설하여 AI·데이터 기반 사업을 확장하고 스마트팩토리 시스템을 생산라인 전반에 적용하고 있습니다.',
      url: 'https://news.nate.com/view/20250326n22201'
    },
    {
        title: 'LG전자, 66년 노하우에 AI 결합한 스마트팩토리 솔루션 출시',
        description: 'LG전자가 제조·생산 데이터와 노하우에 AI를 접목한 스마트팩토리 솔루션 사업에 속도를 내고 있습니다.',
        url: 'https://live.lge.co.kr/2407-lg-smartfactory/'
      },
      {
        title: 'AI 리테일 솔루션, 스마트팩토리 기술과 손잡다',
        description: 'AI 기반 리테일 솔루션 기업 딥핑소스가 스마트팩토리 솔루션 기업 시즐과 전략적 업무협약을 체결하여 새로운 시장 창출에 나섭니다.',
        url: 'https://news.nate.com/view/20250325n44173'
      },
      {
        title: 'LG전자, 협력사와 스마트팩토리 우수 사례 공유',
        description: 'LG전자가 인도네시아에서 협력사들과 함께 생산성 우수 사례를 공유하며 스마트팩토리 적용 현황을 설명했습니다.',
        url: 'https://www.mk.co.kr/news/business/11060872'
      },
      {
        title: '스마트팩토리에서 소프트웨어의 역할',
        description: '스마트공장 기술 중 소프트웨어 요소 기술로써 CPS는 모델링 및 시뮬레이션을 제공하여 공장 최적의 운영 방법을 지원합니다.',
        url: 'https://spri.kr/posts/view/21884?board_type=industry_trend&code=data_all&study_type='
      },
      {
        title: '“스마트공정 AI 적용으로 불량률 30% 감소”',
        description: 'AI 기반 이상 탐지 시스템이 제조 공정에 도입되며 큰 성과를 내고 있습니다. 실시간 센서 분석으로 즉각적 대응이 가능해졌습니다.',
        url: 'https://example-news.com/factory-ai'
      },
      {
        title: '“데이터 기반 제조, 스마트팩토리로 혁신 가속”',
        description: '스마트센서와 머신러닝 알고리즘이 결합된 새로운 공정 자동화 방식이 주목받고 있습니다.',
        url: 'https://example-news.com/smart-manufacturing'
      },
      {
        title: '“산업용 IoT, 공정 안정성과 효율 향상에 기여”',
        description: 'IoT 센서 데이터를 통해 공정 내 온도, 진동, 습도 등 다양한 변수들을 모니터링하며 이상 징후를 사전에 감지할 수 있게 되었습니다.',
        url: 'https://example-news.com/industrial-iot'
      },
      {
        title: '“제조공정의 혁신적인 변화 \'스마트 팩토리\'”',
        description: '스마트 팩토리를 통해 제조 공정이 자동화되고 효율성이 향상되고 있습니다.',
        url: 'https://www.jbnews.com/news/articleView.html?idxno=1401919'
      },
      {
        title: '“LG전자, AI 결합한 스마트팩토리 솔루션 사업 강화”',
        description: 'LG전자가 AI와 디지털 전환 기술을 접목한 스마트팩토리 솔루션 사업에 속도를 내고 있습니다.',
        url: 'https://live.lge.co.kr/2407-lg-smartfactory/'
      },
      {
        title: '“국내 공장의 스마트화 수준 37점, 개선 필요”',
        description: '국내 공장의 스마트화 수준이 37점으로 평가되며, 향후 개선이 필요합니다.',
        url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=35416'
      },
      {
        title: '“성장 탄력 붙은 스마트 팩토리, 국내 기업들 공략 본격화”',
        description: '스마트 팩토리 시장이 성장하며 국내 기업들의 적극적인 공략이 이루어지고 있습니다.',
        url: 'https://www.epnc.co.kr/news/articleView.html?idxno=240515'
      },
      {
        title: '“4차 산업혁명 기술 총결집… 스마트 팩토리, 한국의 산업체질 바꾼다”',
        description: '스마트 팩토리가 4차 산업혁명 기술을 총집결하여 한국의 산업 구조를 변화시키고 있습니다.',
        url: 'https://news.chosun.com/svc/bulletin/cs_bulletin_art.html?contid=2024062100103&sname=news'
      },
      {
        title: '“스마트공정 AI 적용으로 불량률 30% 감소”',
        description: 'AI 기반 이상 탐지 시스템이 제조 공정에 도입되며 큰 성과를 내고 있습니다. 실시간 센서 분석으로 즉각적 대응이 가능해졌습니다.',
        url: 'https://example-news.com/factory-ai'
      },
      {
        title: '“데이터 기반 제조, 스마트팩토리로 혁신 가속”',
        description: '스마트센서와 머신러닝 알고리즘이 결합된 새로운 공정 자동화 방식이 주목받고 있습니다.',
        url: 'https://example-news.com/smart-manufacturing'
      },
      {
        title: '“산업용 IoT, 공정 안정성과 효율 향상에 기여”',
        description: 'IoT 센서 데이터를 통해 공정 내 온도, 진동, 습도 등 다양한 변수들을 모니터링하며 이상 징후를 사전에 감지할 수 있게 되었습니다.',
        url: 'https://example-news.com/industrial-iot'
      },
      {
        title: '“메르세데스-벤츠, 로봇 제조사 Apptronik에 투자 및 공장 내 로봇 테스트”',
        description: '메르세데스-벤츠가 텍사스 기반 로봇 제조사 Apptronik에 투자하고, 제조 공정에서 휴머노이드 로봇을 테스트하고 있습니다.',
        url: 'https://www.reuters.com/business/autos-transportation/mercedes-benz-takes-stake-robotics-maker-apptronik-tests-robots-factories-2025-03-18/'
      },
      {
        title: '“중국, 로봇 산업에서 주도권을 잡기 위한 노력”',
        description: '중국이 로봇 산업에서 주도권을 잡기 위해 노력하고 있으며, 자동화를 통해 노동력 부족 문제를 해결하려 하고 있습니다.',
        url: 'https://www.reuters.com/breakingviews/china-has-shaky-upper-hand-battle-robots-2025-03-26/'
      },
      {
        title: '“에어버스와 보잉, 차세대 항공기 생산을 위한 플라스틱 소재 도입 검토”',
        description: '에어버스와 보잉이 차세대 항공기 생산 속도를 높이기 위해 플라스틱 소재와 로봇 조립을 도입하는 방안을 검토하고 있습니다.',
        url: 'https://www.reuters.com/business/aerospace-defense/airbus-boeing-eye-fast-output-plastics-loom-future-jets-2025-03-24/'
      },
      {
        title: '“미국 제조업, 2025년 긍정적인 시작”',
        description: '미국 제조업 기술 주문이 2025년 긍정적인 시작을 보이며, 공급망 문제를 극복하고 있습니다.',
        url: 'https://metrology.news/u-s-manufacturing-technology-orders-start-2025-on-positive-note/'
      },
      {
        title: '“스마트 제조 주간 2025: 공장 바닥의 혁신과 미래 트렌드”',
        description: '스마트 제조 주간 2025에서 최신 제조 기술과 미래 트렌드가 소개되었습니다.',
        url: 'https://pwemag.co.uk/news/fullstory.php/aid/6170/From_factory_floor_hacks_to_future_trends%3A_Smart_Manufacturing_Week_2025.html'
      },
      {
        title: '“미국 제조업, AI와 자동화로 경쟁력 유지”',
        description: '미국 제조업이 AI와 자동화를 통해 경쟁력을 유지하고 있으며, 소규모 제조업체들도 이러한 변화를 수용하고 있습니다.',
        url: 'https://www.nist.gov/blogs/manufacturing-innovation-blog/whats-coming-us-manufacturing-2025'
      },
      {
        title: '“한화, 2025년 제조업 트렌드 발표”',
        description: '한화가 2025년 제조업 트렌드로 AI 통합, 산업 자동화, 지역화된 공급망 등을 발표했습니다.',
        url: 'https://www.hanwha.com/newsroom/news/feature-stories/manufacturing-trends-for-2025-ai-automation-supply-chains-and-energy.do'
      },
      {
        title: 'LG전자, AI로 \'품질 예측 시간\' 99% 줄였다…공정 신기술 개발',
        description: 'LG전자가 AI를 활용하여 품질 예측 시간을 99% 단축하는 공정 신기술을 개발하였습니다.',
        url: 'https://news.nate.com/view/20250327n10573'
      },
      {
        title: '스마트팩토리 불량 유출 최소화를 위한 AI기술 및 적용사례',
        description: 'LG에너지솔루션이 스마트팩토리에서 AI를 활용하여 불량 유출을 최소화한 사례를 소개합니다.',
        url: 'https://inside.lgensol.com/2023/04/스마트팩토리-불량-유출-최소화를-위한-ai기술-및-적용/'
      },
      {
        title: '마키나락스, 스마트팩토리·산업자동화전시에 참가…AI에이전트 선보여',
        description: '마키나락스가 스마트팩토리 및 산업자동화 전시회에서 AI 에이전트를 선보였습니다.',
        url: 'https://www.aitimes.com/news/articleView.html?idxno=168311'
      },
      {
        title: '스마트팩토리 구축부터 \'일대일 컨설팅\'까지…AI 기술 도입 가속화로 제조 혁신',
        description: '포항시가 제조기업의 AI 기술 도입을 가속화하기 위해 스마트팩토리 구축과 일대일 컨설팅을 지원합니다.',
        url: 'https://news.nate.com/view/20250327n02149'
      },
      {
        title: 'GM, 엔비디아 AI 칩과 소프트웨어로 차량 및 공장 자동화 추진',
        description: '제너럴 모터스(GM)가 엔비디아와 협력하여 AI 칩과 소프트웨어를 활용한 자율 주행 기술 개발 및 공장 워크플로우 개선을 추진하고 있습니다.',
        url: 'https://www.reuters.com/technology/artificial-intelligence/gm-use-nvidia-ai-chips-software-automate-vehicles-factories-2025-03-18/'
      },
      {
        title: '중국, 완전 자동화된 \'다크 팩토리\' 공개',
        description: '샤오미가 인간의 개입 없이 24시간 운영되는 AI 기반의 완전 자동화 제조 시설인 \'다크 팩토리\'를 공개하였습니다.',
        url: 'https://www.news.com.au/finance/business/manufacturing/chinese-companys-dark-factory-will-no-human-workers-soon-be-the-norm/news-story/9468c5bc380108deba4e55a95d6c28d4'
      },
      {
        title: '미국 로봇 기업들, 국가 전략 수립 촉구',
        description: '테슬라, 보스턴 다이내믹스 등 미국 로봇 기업들이 중국과의 경쟁에서 우위를 점하기 위해 국가 로봇 전략 수립을 촉구하고 있습니다.',
        url: 'https://apnews.com/article/702796f1584fe1920e5fd86f15a99b4f'
      },
      {
        title: 'AI, 제조업 혁신 주도',
        description: 'AI는 제조업에서 비용 절감, 생산성 향상, 새로운 기능 제공 등 혁신을 주도하고 있습니다.',
        url: 'https://www.forbes.com/councils/forbestechcouncil/2025/02/12/the-impact-of-artificial-intelligence-in-manufacturing/'
      },
      {
        title: '스마트 팩토리 예측 2025: AI와 클라우드의 부상',
        description: '2025년에는 생성형 AI와 클라우드 컴퓨팅이 스마트 팩토리의 핵심 요소로 부상할 것으로 예측됩니다.',
        url: 'https://pwemag.co.uk/news/fullstory.php/aid/6053/Smart_factory_predictions_for_2025_.html'
      },
      {
        title: '한국, 스마트 팩토리 및 자동화 산업 전시회 개최',
        description: '서울 코엑스에서 스마트 팩토리 및 자동화 산업 전시회가 개최되어 AI와 로봇 기술의 혁신을 선보였습니다.',
        url: 'https://www.businesskorea.co.kr/news/articleView.html?idxno=237175'
      },
      {
        title: '인도, 스마트 팩토리 기술로 제조업 르네상스 점화',
        description: '인도가 스마트 팩토리 기술을 도입하여 제조업의 혁신과 성장을 촉진하고 있습니다.',
        url: 'https://manufacturing.economictimes.indiatimes.com/news/industry/igniting-indias-manufacturing-renaissance-with-smart-factory-technologies/119481234?utm_medium=homepage&utm_source=latest_news'
      },
      {
        title: '포토네오, 서울에서 3D 비전 기술 선보여',
        description: '포토네오가 서울에서 열린 자동화 월드 및 스마트 팩토리 2025에서 첨단 3D 비전 기술을 선보였습니다.',
        url: 'https://www.photoneo.com/photoneo-3d-vision-shines-at-automation-world-and-smart-factory-2025-in-seoul/'
      },
      {
        title: 'AWS, 하노버 메세 2025에서 산업 AI의 미래 선보여',
        description: 'AWS가 하노버 메세 2025에서 e-바이크 스마트 팩토리 데모를 통해 산업 AI의 미래를 선보였습니다.',
        url: 'https://aws.amazon.com/blogs/industries/aws-at-hannover-messe-2025/'
      },
      {
        title: 'MSI, 오토메이트 2025에서 AI 기반 AMR 솔루션 공개',
        description: 'MSI가 오토메이트 2025에서 NVIDIA 가속 컴퓨팅과 생성형 AI를 활용한 첨단 자율 이동 로봇(AMR) 솔루션을 공개하였습니다.',
        url: 'https://www.automate.org/news/msi-unveils-ai-powered-amr-solutions-for-smart-factories-at-automate-2025-msi'
      }
  ];
  
  export default staticNews;
  