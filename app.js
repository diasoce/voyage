// src/App.js
import React from 'react';
import Carousel from './Carousel';  // Carousel을 불러오기

function App() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <Carousel round={true} />  {/* Carousel 컴포넌트 사용 */}
    </div>
  );
}

export default App;
