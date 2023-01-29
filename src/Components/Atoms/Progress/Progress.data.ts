export default class Particle {
  targetImg: HTMLImageElement;
  pos: { x: number; y: number } = { x: 0, y: 0 };
  canvasSize: { width: number; height: number };

  alpha = 1;
  scale = 0;
  velocity = 0;

  constructor(targetImg: HTMLImageElement, canvasSize: { width: number; height: number }) {
    this.targetImg = targetImg;
    this.canvasSize = canvasSize;
    this.init();
  }

  private init() {
    this.pos.x = Math.random() * this.canvasSize.width;
    this.pos.y = this.canvasSize.height + 50;
    this.scale = Math.random() * 30 + 10;
    this.alpha = Math.random() * 0.3 + 0.1;
    this.velocity = Math.random() * 1.5;
  }

  draw(offCtx: CanvasRenderingContext2D | null) {
    if (!offCtx) return;
    if (this.scale <= 0) {
      this.init();
    }
    this.pos.y -= this.velocity;
    if (this.pos.y < -this.scale) {
      this.pos.x = Math.random() * this.canvasSize.width;
      this.pos.y = this.canvasSize.height;
    }

    offCtx.drawImage(this.targetImg, this.pos.x, this.pos.y, this.scale, this.scale);
  }
}
