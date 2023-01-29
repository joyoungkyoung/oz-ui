import LogoWithProgress from '@components/Molecules/LogoWithProgress';
import React, { useState, useEffect } from 'react';
import './Main.scss';

function Main() {
  const [current, setCurrent] = useState<number>(0);
  let interval: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    interval = setInterval(() => {
      setCurrent(current + 0.1);
    }, 5);

    return () => clearInterval(interval);
  }, [current]);

  const handleLoaded = () => {
    console.log('로딩완료');
    clearInterval(interval);
  };

  return (
    <div className="main-container">
      <LogoWithProgress current={current} max={100} onLoaded={handleLoaded} />
    </div>
  );
}

export default Main;
