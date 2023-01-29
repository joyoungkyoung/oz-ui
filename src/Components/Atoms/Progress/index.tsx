import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircleImg from '@Assets/circle.svg';
import Particle from './Progress.data';

const PARTICLE_COUNT = 10;

const ProgressBar = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0 0 0 3px var(--primary-color) inset;
  border-radius: 2px;
`;

const ProgressInner = styled.canvas`
  width: 100%;
`;

interface ProgressProps {
  current: number;
  max: number;
  onLoaded: () => void;
}
const Progress = ({ current, max, onLoaded }: ProgressProps) => {
  const [percent, setPercent] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);

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
      ctx.strokeStyle = '#ff3ba5';
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
      offCtx.fillStyle = '#ff3ba5';
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
    <ProgressBar className="progress-bar">
      <ProgressInner id="progress-inner" width={300} height={30} />
    </ProgressBar>
  );
};

export default Progress;
