import Carousel from './Carousel.jsx';
import './index.css';

function App() {
  return (
    <div style={{ 
      position: 'absolute',
      top: '68%',
      left: '51%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
      width: '430px',
      height: '700px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent', // 배경색을 지워야 뒤의 원들이 보입니다
      pointerEvents: 'none'
    }}>
      <div style={{ width: '430px', height: '700px', pointerEvents: 'auto' }}>
        <Carousel baseWidth={430} round loop={true} autoplay={true} />
      </div>
    </div>
  );
}
export default App;