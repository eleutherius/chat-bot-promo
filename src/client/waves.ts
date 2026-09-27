interface WaveOptions {
  /** Number of lines in the field. */
  lines: number;
  /** Where the lines start, as a fraction of the canvas width. */
  start: number;
}

type RGB = readonly [number, number, number];
const COLORS: readonly RGB[] = [[139, 92, 246], [59, 130, 246], [34, 211, 238], [236, 72, 153]];

/** Interpolate along the COLORS ramp, p in [0, 1]. */
function ramp(p: number): RGB {
  const x = p * (COLORS.length - 1);
  const i = Math.min(Math.floor(x), COLORS.length - 2);
  const f = x - i;
  const a = COLORS[i]!, b = COLORS[i + 1]!;
  const mix = (k: 0 | 1 | 2) => Math.round(a[k] + (b[k] - a[k]) * f);
  return [mix(0), mix(1), mix(2)];
}

/** Animated field of gradient sine lines, echoing the pitch-deck artwork. */
export function waves(canvas: HTMLCanvasElement, { lines, start }: WaveOptions, animate: boolean): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let w = 0, h = 0;
  let visible = true;

  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  addEventListener("resize", size);
  new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; }).observe(canvas);

  const frame = (time: number) => {
    if (visible) {
      const tt = time * 0.00012;
      const x0 = w * start;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1);
        const alpha = 0.18 + 0.6 * Math.sin(p * Math.PI) ** 2;
        const grad = ctx.createLinearGradient(x0, 0, w, 0);
        [0, 0.35, 0.7, 1].forEach((stop, k) => {
          const [r, g, b] = ramp((p * 0.6 + stop * 0.8 + tt * 0.3) % 1);
          grad.addColorStop(stop, `rgba(${r},${g},${b},${k === 0 ? 0 : alpha})`);
        });
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = x0; x <= w + 10; x += 8) {
          const nx = (x - x0) / (w - x0 + 1);
          const y = h * (0.1 + p * 0.85)
            + Math.sin(nx * 5 + tt * 6 + p * 3) * h * 0.06 * (0.4 + nx)
            + Math.sin(nx * 11 - tt * 4 + p * 7) * h * 0.02
            + Math.cos(p * 4 + tt * 3) * h * 0.04 * nx;
          if (x === x0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    if (animate) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
