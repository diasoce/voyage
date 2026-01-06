import Carousel from './Carousel.jsx';
import './index.css';

function App() {
  return (
    <div style={{ 
      position: 'absolute',
      top: '70%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
      width: '600px',
      height: '830px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent', // 배경색을 지워야 뒤의 원들이 보입니다
      pointerEvents: 'none'
    }}>
      <div style={{ width: '600px', height: '830px', pointerEvents: 'auto' }}>
        <Carousel baseWidth={600} round loop={true} autoplay={true} />
      </div>
    </div>
  );
}
export default App;