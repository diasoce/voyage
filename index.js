import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18에서는 react-dom/client 사용
import Carousel from './Carousel'; // Carousel 컴포넌트 import

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

// React 18에서 사용하는 방식으로 수정
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Carousel items={items} />
  </React.StrictMode>
);
