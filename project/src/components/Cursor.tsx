import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    let hue = 0;
    const updateCursorColor = () => {
      hue = (hue + 1) % 360;
      const color = `hsla(${hue}, 100%, 50%, 20)`;
      cursor.style.borderColor = color;
      cursorDot.style.backgroundColor = color;
    };

    const colorInterval = setInterval(updateCursorColor, 50);

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power3.out',
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power3.out',
      });

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.getAttribute('role') === 'button' ||
        target.closest('a') ||
        target.closest('button');

      if (isInteractive) {
        cursor.classList.add('scale-150');
        cursorDot.classList.add('scale-150');
      } else {
        cursor.classList.remove('scale-150');
        cursorDot.classList.remove('scale-150');
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });

      const explosion = document.createElement('div');
      explosion.className = 'cursor-explosion';
      explosion.style.left = e.clientX + 'px';
      explosion.style.top = e.clientY + 'px';
      document.body.appendChild(explosion);

      gsap.fromTo(
        explosion,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 3,
          opacity: 1,
          duration: 0.3,
          onComplete: () => explosion.remove(),
        }
      );
    };

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default Cursor;
