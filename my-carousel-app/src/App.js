import React from 'react';
import Carousel from './Carousel';
import './Carousel.css'; // CSS 연결

function App() {
  // 보여줄 데이터를 반드시 정의해야 합니다!
  const data = [
    { id: 1, title: "여행 1", description: "첫 번째 여행지", content: <div>이미지나 내용</div> },
    { id: 2, title: "여행 2", description: "두 번째 여행지", content: <div>이미지나 내용</div> },
  ];

  return (
    <div style={{ height: '600px', width: '100%', position: 'relative' }}>
      <Carousel items={data} baseWidth={330} round={true} />
    </div>
  );
}
export default App;