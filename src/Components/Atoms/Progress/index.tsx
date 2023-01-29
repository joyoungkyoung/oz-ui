import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import CircleImg from '@assets/images/circle.svg';
import { COLORS } from '@assets/styles/variable';
import Particle from './Progress.data';

const PARTICLE_COUNT = 10;

const ProgressAtom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0 0 0 3px var(--primary-color) inset;
  border-radius: 2px;
  &.load {
    animation: FadeOut 500ms;
    animation-fill-mode: forwards;
    @keyframes FadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;

const ProgressInner = styled.canvas`
  width: 100%;
`;

const ProgressMessage = styled.div`
  position: absolute;
  visibility: hidden;
  height: 30px;
  font-family: 'GmarketSansMedium';
  font-size: 30px;
  &.load {
    visibility: visible;
    opacity: 0;
    animation: FadeIn 500ms 500ms;
    animation-fill-mode: forwards;
    @keyframes FadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

interface ProgressProps {
  current: number;
  max: number;
  onLoaded: () => void;
}
const Progress = ({ current, max, onLoaded }: ProgressProps) => {
  const [percent, setPercent] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const canvas = document.getElementById('progress-inner') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // progress split lines
    const splitCount = 25;

    for (let loop = 0; loop < splitCount; loop++) {
      const piece = canvas.width / splitCount;

      ctx.beginPath();
      ctx.moveTo(loop * piece, 0);
      ctx.lineTo(loop * piece, canvas.height);
      ctx.closePath();
      ctx.strokeStyle = COLORS.primaryColor;
      ctx.lineWidth = 0.2;
      ctx.stroke();
    }

    // progress particles
    const circle = new Image();

    circle.src = CircleImg;
    circle.onload = () => {
      const newParticles: Particle[] = [];

      for (let loop = 0; loop < PARTICLE_COUNT; loop++) {
        const p = new Particle(circle, { width: canvas.width, height: canvas.height });

        newParticles.push(p);
      }
      setParticles([...newParticles]);
    };
  }, []);

  // percent check handling
  useEffect(() => {
    if (percent >= 100) {
      setLoaded(true);
      onLoaded();
    }
  }, [percent]);

  // progress animate handling
  useEffect(() => {
    const canvas = document.getElementById('progress-inner') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const per = (current / max) * 100;
    const offCanvas = document.createElement('canvas');

    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;

    const offCtx = offCanvas.getContext('2d');

    if (ctx && offCtx) {
      offCtx.clearRect(0, 0, canvas.width, canvas.height);
      offCtx.fillStyle = COLORS.primaryColor;
      offCtx.fillRect(0, 0, (canvas.width * per) / 100, canvas.height);
      const clipPath = new Path2D();

      clipPath.rect(0, 0, (canvas.width * per) / 100, canvas.height);
      offCtx.clip(clipPath);
      particles.forEach((p) => p.draw(offCtx));
      ctx.drawImage(offCanvas, 0, 0);
    }

    // update percent
    setPercent(per >= 100 ? 100 : per);
  }, [current]);

  return (
    <ProgressAtom className="progress-atom">
      <ProgressBar className={classNames('progress-bar', { load: isLoaded })}>
        <ProgressInner id="progress-inner" width={300} height={30} />
      </ProgressBar>
      <ProgressMessage className={classNames('message', { load: isLoaded })}>Welcome!</ProgressMessage>
    </ProgressAtom>
  );
};

export default Progress;
