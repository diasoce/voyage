import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel'; // Carousel 컴포넌트를 불러옵니다.

// 기본 아이템 설정
const items = [
  {
    title: 'Text Animations',
    description: 'Cool text animations for your projects.',
    id: 1,
    icon: <FiFileText className="carousel-icon" />
  },
  {
    title: 'Animations',
    description: 'Smooth animations for your projects.',
    id: 2,
    icon: <FiCircle className="carousel-icon" />
  },
  {
    title: 'Components',
    description: 'Reusable components for your projects.',
    id: 3,
    icon: <FiLayers className="carousel-icon" />
  },
  {
    title: 'Backgrounds',
    description: 'Beautiful backgrounds and patterns for your projects.',
    id: 4,
    icon: <FiLayout className="carousel-icon" />
  },
  {
    title: 'Common UI',
    description: 'Common UI components are coming soon!',
    id: 5,
    icon: <FiCode className="carousel-icon" />
  }
];

ReactDOM.render(
  <React.StrictMode>
    <Carousel items={items} />
  </React.StrictMode>,
  document.getElementById('root') // 'root' 아이디를 가진 div에 렌더링합니다.
);
