import React from 'react';
import Carousel from './Carousel';  // 올바른 경로로 수정

function App() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <Carousel baseWidth={330} round={true} />  {/* 하나로 통합, props 추가 */}
    </div>
  );
}

export default App;