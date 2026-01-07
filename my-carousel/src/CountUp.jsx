import { useInView, useMotionValue, useSpring, motion } from 'motion/react'; // motion 추가
import { useCallback, useEffect, useRef } from 'react';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  // 숫자 포맷팅 로직 (기존과 동일)
  const getDecimalPlaces = num => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) return decimals.length;
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    latest => {
      const hasDecimals = maxDecimals > 0;
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };
      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);
      return (separator ? formattedNumber.replace(/,/g, separator) : formattedNumber) + '%';
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') onStart();

      // 숫자가 올라가는 타이밍을 조절 (떠오르는 애니메이션과 맞춤)
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, (delay + 0.5) * 1000); // 0.5초 정도 뒤에 숫자가 오르기 시작

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') onEnd();
        },
        (delay + 0.5) * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });
    return () => unsubscribe();
  }, [springValue, formatValue]);

  // --- 핵심: 텍스트가 떠오르는 애니메이션 추가 ---
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }} // 30px 아래에서 투명하게 시작
      animate={isInView ? { opacity: 1, y: 0 } : {}} // 뷰포트에 들어오면 나타남
      transition={{ duration: 0.8, ease: "easeOut", delay: delay }} // 이미지와 동일한 느낌의 트랜지션
      style={{ display: 'inline-block' }} // y축 이동을 위해 필요
    />
  );
}