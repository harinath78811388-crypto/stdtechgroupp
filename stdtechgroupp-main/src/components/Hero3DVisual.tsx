import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  pulse: number;
}

export default function Hero3DVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palette: Mint green (#059669, #10b981), Rose Pink (#db2777, #ec4899), Teal (#0d9488), Blue (#2563eb)
    const colors = ['#059669', '#10b981', '#db2777', '#ec4899', '#0d9488', '#2563eb'];
    const particleCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 0.9,
        y: (Math.random() - 0.5) * height * 0.9,
        z: Math.random() * 400 + 50,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;
      targetRotY = (clientX / width) * 0.3;
      targetRotX = -(clientY / height) * 0.3;
      mouseX = clientX;
      mouseY = clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 350;
      const cx = width / 2;
      const cy = height / 2;

      // Project 3D points
      const projected = particles.map((p) => {
        p.pulse += 0.03;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce within bounding volume
        const boundX = width * 0.45;
        const boundY = height * 0.45;
        if (Math.abs(p.x) > boundX) p.vx *= -1;
        if (Math.abs(p.y) > boundY) p.vy *= -1;
        if (p.z < 50 || p.z > 450) p.vz *= -1;

        // 3D rotation
        const cosY = Math.cos(rotY + 0.003);
        const sinY = Math.sin(rotY + 0.003);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;
        const pRadius = Math.max(1, p.radius * scale + Math.sin(p.pulse) * 0.8);
        const alpha = Math.min(1, Math.max(0.15, (scale - 0.3) * 1.4));

        return { px, py, scale, alpha, pRadius, color: p.color, z: z2 };
      });

      // Draw connection lines
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.28 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 1.2;
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.sort((a, b) => b.z - a.z);
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.pRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] lg:h-[480px] flex items-center justify-center overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-white/95 via-emerald-50/40 to-pink-50/50 shadow-xl shadow-emerald-900/5 backdrop-blur-xl">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

      {/* Floating 3D Core AI Badge */}
      <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-3 flex items-center justify-center">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400 via-pink-400 to-teal-400 opacity-40 blur-md animate-pulse" />
          <div className="relative h-16 w-16 rounded-2xl bg-white/95 border border-emerald-300 p-3 shadow-lg flex items-center justify-center">
            <svg
              className="h-10 w-10 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-emerald-300 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur-md mb-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>STDTech Digital Ecosystem • Founded 2026</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          AI & Cloud Intelligence Node
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xs font-medium">
          Interactive neural web powering software products, automated CAD utilities & predictive algorithms.
        </p>

        {/* Ambient telemetry chips */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center text-[11px] font-mono">
          <span className="px-3 py-1 rounded-lg bg-emerald-100/90 border border-emerald-300 text-emerald-800 font-semibold shadow-xs">
            SWAYNIS Engine
          </span>
          <span className="px-3 py-1 rounded-lg bg-pink-100/90 border border-pink-300 text-pink-800 font-semibold shadow-xs">
            Predictive ML Models
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-100/90 border border-blue-300 text-blue-800 font-semibold shadow-xs">
            STDTech Academy
          </span>
        </div>
      </div>
    </div>
  );
}
