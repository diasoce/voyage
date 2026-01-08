import imgaft from './after.svg';
const ImageClickFix = () => {
  const handleClick = () => {
    console.log("클릭됨!"); // 브라우저 콘솔에서 작동 여부를 확인해 보세요.
    window.location.href = "/japen.html"; // 이동하려는 주소
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <img
        src={imgaft} // 사용 중인 이미지 변수
        alt="Click Me"
        onClick={handleClick}
        style={{
          // 1. 위치 및 크기 설정
          position: 'absolute',
          width: '700px',
          height: 'auto',
          top: '-30px',
          left: '-110px',
          
          // 2. 클릭 가능하게 만들기 (가장 중요)
          cursor: 'pointer',     // 마우스 포인터가 손가락 모양으로 변함
          zIndex: 9999,          // 다른 어떤 요소보다 위에 배치
          pointerEvents: 'auto', // 클릭 이벤트가 활성화되도록 강제
        }}
      />
    </div>
  );
};