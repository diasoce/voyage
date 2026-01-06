// App.js 추천 코드
import Carousel from './Carousel';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100vw', // 너비 확실히 고정
      height: '100vh', // 높이 확실히 고정
      margin: 0,
      backgroundColor: '#060010',
      overflow: 'hidden' // 스크롤 방지
    }}>
      <div style={{ width: '330px', height: '600px', position: 'relative' }}>
        <Carousel baseWidth={330} round />
      </div>
    </div>
  );
}

export default App;