import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0;
    let ringX = 0, ringY = 0;
    let frame: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      ringX += (x - ringX) * 0.12;
      ringY += (y - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      frame = requestAnimationFrame(loop);
    };

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '50px';
        ringRef.current.style.height = '50px';
        ringRef.current.style.borderColor = 'rgba(168, 85, 247, 0.8)';
        ringRef.current.style.background = 'rgba(168, 85, 247, 0.08)';
      }
    };
    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.borderColor = 'rgba(56, 189, 248, 0.6)';
        ringRef.current.style.background = 'transparent';
      }
    };

    window.addEventListener('mousemove', onMove);
    frame = requestAnimationFrame(loop);

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};
