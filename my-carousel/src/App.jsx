import Carousel from './Carousel.jsx';
import './index.css';

function App() {
  return (
    <div style={{ 
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
      width: '330px',
      height: '600px'
    }}>
      <Carousel baseWidth={330} round loop={true} autoplay={true} />
    </div>
  );
}
export default App;