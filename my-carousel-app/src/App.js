import React from 'react';
import Carousel from './Carousel';  // Carousel 컴포넌트 가져오기
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>여행 정리란</h1>  {/* 예시로 제목 추가 */}
        <div style={{ height: '600px', position: 'relative' }}>
          <Carousel
            baseWidth={330}  // width 대신 baseWidth 사용 (컴포넌트 props에 맞춤)
            round={true}     // round 활성화
          />
        </div>
      </header>
    </div>
  );
}

export default App;