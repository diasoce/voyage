// src/App.jsx
import Carousel from './Carousel';
import './index.css';

function App() {
  return (
    <div style={{ 
      position: 'absolute', // .desktop 내부에서 자유롭게 배치
      top: '55%',           // 제목(여행 정리란) 아래쪽 적당한 위치
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10
    }}>
      <div style={{ width: '330px', height: '600px', position: 'relative' }}>
        <Carousel 
          baseWidth={330} 
          round 
          loop={true} 
          autoplay={true} 
        />
      </div>
    </div>
  );
}

export default App;