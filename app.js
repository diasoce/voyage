import Carousel from './Carousel' // 1. 방금 만든 기계를 불러와요

function App() {
  return (
    // 2. 배경 판을 깔아주고
    <div style={{ height: '600px', position: 'relative', backgroundColor: '#000' }}>
      {/* 3. 그 위에 회전목마를 올려요! */}
      <Carousel 
        width={330} 
        round // 동그란 모양으로 만들고 싶으면 이걸 써요
      />
    </div>
  );
}