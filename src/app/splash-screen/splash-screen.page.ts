import {
  Component, OnInit, AfterViewInit, OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2, NgZone
} from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  color: string;
}

@Component({
  standalone: true,
  imports: [IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit, AfterViewInit, OnDestroy {

  private navTimer: any;
  private animFrameId: any;
  private particles: Particle[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;

  // Neon palette for constellation
  private readonly COLORS = ['#00ff88', '#00e5cc', '#4ade80', '#00ffcc', '#39ff14'];

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.navTimer = setTimeout(() => {
      this.router.navigate(['/onbording'], { replaceUrl: true });
    }, 6000);
  }

  ngAfterViewInit() {
    // Run outside Angular zone for max performance
    this.zone.runOutsideAngular(() => {
      this.initConstellation();
      this.initTouchBurst();
    });
  }

  ngOnDestroy() {
    if (this.navTimer)    clearTimeout(this.navTimer);
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  // ── Constellation Canvas ─────────────────────────────────────────────────

  private initConstellation() {
    const host = this.el.nativeElement as HTMLElement;
    this.canvas = host.querySelector('#constellationCanvas') as HTMLCanvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d')!;
    this.resize();

    window.addEventListener('resize', () => this.resize());
    this.spawnParticles();
    this.loop();
  }

  private resize() {
    const host = this.el.nativeElement as HTMLElement;
    this.W = this.canvas.width  = host.offsetWidth  || window.innerWidth;
    this.H = this.canvas.height = host.offsetHeight || window.innerHeight;
  }

  private spawnParticles() {
    this.particles = [];
    const count = Math.floor((this.W * this.H) / 10000);
    for (let i = 0; i < Math.max(count, 40); i++) {
      this.particles.push(this.makeParticle());
    }
  }

  private makeParticle(x?: number, y?: number): Particle {
    const angle  = Math.random() * Math.PI * 2;
    const speed  = 0.15 + Math.random() * 0.3;
    return {
      x:      x ?? Math.random() * this.W,
      y:      y ?? Math.random() * this.H,
      vx:     Math.cos(angle) * speed,
      vy:     Math.sin(angle) * speed,
      radius: 1 + Math.random() * 2.5,
      alpha:  0.3 + Math.random() * 0.6,
      color:  this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
    };
  }

  private loop() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.drawParticles();
    this.animFrameId = requestAnimationFrame(() => this.loop());
  }

  private drawParticles() {
    const pts = this.particles;
    const maxDist = 100;

    // Update positions
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = this.W;
      if (p.x > this.W) p.x = 0;
      if (p.y < 0) p.y = this.H;
      if (p.y > this.H) p.y = 0;
    }

    // Draw connecting lines
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(pts[i].x, pts[i].y);
          this.ctx.lineTo(pts[j].x, pts[j].y);
          this.ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    // Draw dots with glow
    for (const p of pts) {
      // Glow halo
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      grad.addColorStop(0,   `rgba(0, 255, 136, ${p.alpha})`);
      grad.addColorStop(1,   'rgba(0, 255, 136, 0)');
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Solid core
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  }

  // ── Touch / Click Particle Burst ─────────────────────────────────────────

  private initTouchBurst() {
    const host = this.el.nativeElement as HTMLElement;

    const burst = (x: number, y: number) => {
      const BURST_COUNT = 14;
      for (let i = 0; i < BURST_COUNT; i++) {
        const angle  = (i / BURST_COUNT) * Math.PI * 2;
        const dist   = 60 + Math.random() * 80;
        const bx     = Math.cos(angle) * dist;
        const by     = Math.sin(angle) * dist;
        const size   = 4 + Math.random() * 8;
        const colors = ['#00ff88', '#00e5cc', '#4ade80', '#ffffff', '#39ff14'];
        const color  = colors[Math.floor(Math.random() * colors.length)];

        const dot = this.renderer.createElement('div') as HTMLElement;
        this.renderer.addClass(dot, 'burst-particle');
        this.renderer.setStyle(dot, 'left', `${x}px`);
        this.renderer.setStyle(dot, 'top',  `${y}px`);
        this.renderer.setStyle(dot, '--bx', `${bx}px`);
        this.renderer.setStyle(dot, '--by', `${by}px`);
        this.renderer.setStyle(dot, 'width',  `${size}px`);
        this.renderer.setStyle(dot, 'height', `${size}px`);
        this.renderer.setStyle(dot, 'background', color);
        this.renderer.setStyle(dot, 'box-shadow', `0 0 ${size * 2}px ${color}`);
        this.renderer.setStyle(dot, 'animation-delay', `${Math.random() * 0.1}s`);
        this.renderer.appendChild(host, dot);
        setTimeout(() => dot.remove(), 900);
      }

      // Ripple ring on burst center
      const ring = this.renderer.createElement('div') as HTMLElement;
      this.renderer.setStyle(ring, 'position', 'absolute');
      this.renderer.setStyle(ring, 'left', `${x}px`);
      this.renderer.setStyle(ring, 'top',  `${y}px`);
      this.renderer.setStyle(ring, 'width',  '10px');
      this.renderer.setStyle(ring, 'height', '10px');
      this.renderer.setStyle(ring, 'border-radius', '50%');
      this.renderer.setStyle(ring, 'border', '2px solid #00ff88');
      this.renderer.setStyle(ring, 'pointer-events', 'none');
      this.renderer.setStyle(ring, 'z-index', '24');
      this.renderer.setStyle(ring, 'transform', 'translate(-50%,-50%) scale(0)');
      this.renderer.setStyle(ring, 'transition', 'transform 0.6s ease, opacity 0.6s ease');
      this.renderer.setStyle(ring, 'box-shadow', '0 0 10px #00ff88, 0 0 25px rgba(0,255,136,0.5)');
      this.renderer.appendChild(host, ring);

      setTimeout(() => {
        this.renderer.setStyle(ring, 'transform', 'translate(-50%,-50%) scale(12)');
        this.renderer.setStyle(ring, 'opacity', '0');
      }, 30);
      setTimeout(() => ring.remove(), 700);
    };

    this.renderer.listen(host, 'touchstart', (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect  = host.getBoundingClientRect();
      burst(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    this.renderer.listen(host, 'click', (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      burst(e.clientX - rect.left, e.clientY - rect.top);
    });
  }
}