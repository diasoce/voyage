import Carousel from './Carousel';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100vw',
      height: '100vh', 
      backgroundColor: '#060010' 
    }}>
      <div style={{ width: '330px', height: '600px', position: 'relative' }}>
        <Carousel baseWidth={330} round />
      </div>
    </div>
  );
}

export default App;