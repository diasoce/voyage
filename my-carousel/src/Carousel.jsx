import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';
import CountUp from './CountUp.jsx';
import imgcloud from './Component 1.svg';
import imgplane from './plane1.png';
import imgmem from './mem.svg';
import imgaft from './after.svg'
import './Carousel.css';

const DEFAULT_ITEMS = [
  { title: '동유럽', description: '2019. 12. 20 ~ 2019. 12. 29', id: 1, icon: <FiFileText className="carousel-icon" /> },
  { title: '스페인', description: '2024. 1. 4 ~ 2024. 1. 12', id: 2, icon: <FiCircle className="carousel-icon" /> },
  { title: '일본-1', description: '2025. 6. 20 ~ 2025. 6. 23', id: 3, icon: <FiLayers className="carousel-icon" /> },
  { title: '일본-2', description: '2026. 1. 27 ~ 2026. 1. 30', id: 4, icon: <FiLayout className="carousel-icon" /> },
  { title: '그 다음은?', description: 'coming soon!', id: 5, icon: <FiCode className="carousel-icon" /> }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

// 1. 개별 아이템 컴포넌트
function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition, onItemClick }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`carousel-item ${round ? 'round' : ''}`}
      onClick={onItemClick}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY: rotateY,
        cursor: 'pointer',
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      <div className={`carousel-item-header ${round ? 'round' : ''}`}>
        <span className="carousel-icon-container">{item.icon}</span>
      </div>
      <div className="carousel-item-content">
        <div className="carousel-item-title">{item.title}</div>
        <p className="carousel-item-description">{item.description}</p>
      </div>
    </motion.div>
  );
}

// 2. 메인 캐러셀 컴포넌트
export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const [isExiting, setIsExiting] = useState(false); 
  const [showImages, setShowImages] = useState(false); // 이미지 표시 상태 추가
  const [position, setPosition] = useState(loop ? 1 : 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const handleItemClick = (item) => {
    if (item.id === 4) {
      setIsExiting(true);
      // 캐러셀이 사라지기 시작하고 0.8초 뒤에 이미지가 떠오르기 시작함
      setTimeout(() => {
        setShowImages(true);
      }, 800);
    }
  };

  const handleAnimationStart = () => setIsAnimating(true);
  
  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    if (position === itemsForRender.length - 1) {
      setIsJumping(true);
      setPosition(1);
      x.set(-trackItemOffset);
      requestAnimationFrame(() => setIsJumping(false));
    } else if (position === 0) {
      setIsJumping(true);
      setPosition(items.length);
      x.set(-items.length * trackItemOffset);
      requestAnimationFrame(() => setIsJumping(false));
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction = offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1 : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1 : 0;
    if (direction === 0) return;
    setPosition(prev => Math.max(0, Math.min(prev + direction, itemsForRender.length - 1)));
  };

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1 || isExiting) return;
    if (pauseOnHover && isHovered) return;
    const timer = setInterval(() => {
      setPosition(prev => (prev + 1) % itemsForRender.length);
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length, isExiting]);

  const activeIndex = items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div style={{ position: 'relative', width: `${baseWidth}px` }}>
      {/* 1. 캐러셀 메인 영역 */}
      <div
        ref={containerRef}
        className={`carousel-container ${round ? 'round' : ''}`}
        style={{
          width: `${baseWidth}px`,
          ...(round && { height: `${baseWidth}px`, borderRadius: '50%' }),
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 1.5s ease-in-out',
          pointerEvents: isExiting ? 'none' : 'auto'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="carousel-track"
          drag={isAnimating || isExiting ? false : 'x'}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
            x
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackItemOffset) }}
          transition={isJumping ? { duration: 0 } : SPRING_OPTIONS}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((item, index) => (
            <CarouselItem
              key={`${item?.id ?? index}-${index}`}
              item={item}
              index={index}
              itemWidth={itemWidth}
              round={round}
              trackItemOffset={trackItemOffset}
              x={x}
              transition={SPRING_OPTIONS}
              onItemClick={() => handleItemClick(item)}
            />
          ))}
        </motion.div>

        <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
          <div className="carousel-indicators">
            {items.map((_, index) => (
              <motion.div
                key={index}
                className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
                animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                onClick={() => !isExiting && setPosition(loop ? index + 1 : index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. 클릭 시 나타날 병렬 이미지 레이어 */}
      {showImages && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none', // 뒤의 요소 클릭 방해 금지
          zIndex: 200
        }}>
          {/* 이미지 1 */}
          <motion.img 
            src={imgcloud} // 예시 이미지 1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: 'absolute', width: '700px', height: 'auto', top: '-30px', left: '-110px'
            }}
          />
          <motion.img
            src={imgaft}
            initial={{ opacity: 0, y: 100, display: 'none' }}
            animate={{ opacity: 1, y: 0 , display: 'block' }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.0, display: { delay: 1.0 } }}
            onTap={() => {
                window.location.href = "./japen.html"; // 같은 창에서 이동
              }}
            onClick={() => {
              window.location.href = "./japen.html"; // 터치가 안 먹힐 경우를 대비
              }}
            style={{
              position: 'absolute', width: '100px', height: 'auto', top: '155px', right: '-500px', pointerEvents: 'auto'
            }}/>
          {/* 이미지 2 */}
          <motion.img 
          src={imgplane}
          // 1. 초기 상태: 아래에서 투명하게 시작
          initial={{ opacity: 0, y: 100 }} 
          animate={{ 
            opacity: 1, 
            // y축: 처음 0으로 올라온 뒤, 0 → -15 → 0 범위를 무한 반복
            y: [0, -15, 0] 
          }}
          transition={{
            // 나타나는 효과 (페이드 인)
            opacity: { 
              duration: 1.5, 
              delay: 0.5, 
              ease: "easeInOut" 
            },
            // 위아래로 움직이는 효과 (무한 반복)
            y: {
              // 0으로 올라오는 첫 도입부 설정
              duration: 1.5,
              delay: 0.5,
              ease: "easeOut",
              
              // 나타난 이후의 무한 반복 설정
              repeat: Infinity,      // 무한 반복
              repeatType: "mirror",  // 0 -> -15 갔다가 다시 부드럽게 돌아옴
              repeatDelay: 0,
              duration: 2.5,         // 둥둥거리는 속도 (클수록 천천히)
              ease: "easeInOut"      // 움직임의 시작과 끝을 부드럽게
            }
          }}
          style={{
            position: 'absolute',
            width: '220px',
            height: 'auto',
            top: '70px',
            left: '100px',
            filter: 'drop-shadow(0px 15px 10px rgba(0,0,0,0.3))' // 입체감을 위한 그림자
          }}  
        />
          <motion.img 
            src={imgmem} // 예시 이미지 2
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }} // 0.3초 지연 효과
            style={{
              position: 'absolute', width: '350px', height: 'auto', top: '-60px', left: '35px'
            }}  
          />
        <div style={{
        fontFamily: "SlowGothic, Helvetica",
        fontWeight: 800,
        fontSize: "80px",
        color: "#FFFFFF",
        position: 'absolute',
        top: '350px',    // 위에서부터의 거리
        left: '50%',     // 가로 중앙 정렬 시작
        transform: 'translateX(-50%)', // 정확한 중앙 정렬
        textAlign: 'center'
        }}>
        <CountUp
          from={0}
          to={100}
          separator=","
          direction="up"
          delay={2}
          duration={7}
          className="count-up-text"
        />
      </div>
        </div>
      )}

      </div>
    );
  }