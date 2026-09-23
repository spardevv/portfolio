"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAGMENT_SHADER = `precision highp float;uniform vec2 res;uniform float t;uniform vec2 m;
vec3 env(vec3 d){float top=smoothstep(.45,.95,d.y);float bar=smoothstep(.86,.99,sin(d.x*5.+1.3+d.y*2.))*smoothstep(-.3,.5,d.y);float side=smoothstep(.55,1.,-d.x)*.9;float side2=smoothstep(.7,1.,d.x)*.6;vec3 b=mix(vec3(.5),vec3(.82),d.y*.5+.5);return b+vec3(top*1.1+bar*.7+side+side2);}
void main(){vec2 uv=(gl_FragCoord.xy*2.-res)/min(res.x,res.y);float asp=res.x/res.y;vec2 p=uv-vec2(m.x*.12,-.62+m.y*.08);
float R=min(.98,max(.62*asp+.25,.78));p+=.055*vec2(sin(2.9*p.y+t*.8+1.),cos(2.4*p.x+t*.65));p+=.03*vec2(sin(5.1*p.y-t*1.1),cos(4.3*p.x+t*.9));
float d=length(p);float aa=3./min(res.x,res.y);float mask=1.-smoothstep(R-aa,R+aa,d);
vec3 bg=vec3(.902);if(mask<=0.){gl_FragColor=vec4(bg,1.);return;}
float z=sqrt(max(R*R-d*d,.0001));vec3 n=normalize(vec3(p,z));vec3 I=vec3(0.,0.,-1.);
vec3 col;vec3 iors=vec3(.68,.655,.63);
col.r=env(refract(I,n,iors.r)).r;col.g=env(refract(I,n,iors.g)).g;col.b=env(refract(I,n,iors.b)).b;
float f=pow(1.-n.z,2.2);vec3 refl=env(reflect(I,n));
float th=f*3.2+t*.05+n.x*.6;vec3 film=.5+.5*cos(6.2832*(th+vec3(0.,.33,.67)));
col=mix(col*.86,refl,f*.75);col+=film*pow(f,1.4)*.9;col=mix(bg*.97,col,.92);
gl_FragColor=vec4(mix(bg,col,mask),1.);}`;

/** Esfera de vidro do hero, fiel ao shader do guia de marca (identidade-visual/index.html). */
export function HeroGlassBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    } catch {
      gl = null;
    }
    if (!gl) return;
    const ctx = gl;

    function compile(type: number, source: string) {
      const shader = ctx.createShader(type)!;
      ctx.shaderSource(shader, source);
      ctx.compileShader(shader);
      return shader;
    }

    const program = ctx.createProgram()!;
    ctx.attachShader(program, compile(ctx.VERTEX_SHADER, VERTEX_SHADER));
    ctx.attachShader(program, compile(ctx.FRAGMENT_SHADER, FRAGMENT_SHADER));
    ctx.linkProgram(program);
    if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) return;

    ctx.useProgram(program);
    const buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW);
    const posLoc = ctx.getAttribLocation(program, "p");
    ctx.enableVertexAttribArray(posLoc);
    ctx.vertexAttribPointer(posLoc, 2, ctx.FLOAT, false, 0, 0);

    const resLoc = ctx.getUniformLocation(program, "res");
    const tLoc = ctx.getUniformLocation(program, "t");
    const mLoc = ctx.getUniformLocation(program, "m");

    let time = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let visible = true;
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    function size() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(1.6, window.devicePixelRatio || 1);
      canvas!.width = Math.max(2, Math.round(rect.width * dpr));
      canvas!.height = Math.max(2, Math.round(rect.height * dpr));
      ctx.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function frame() {
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      ctx.uniform2f(resLoc, canvas!.width, canvas!.height);
      ctx.uniform1f(tLoc, time);
      ctx.uniform2f(mLoc, mx, my);
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        size();
        frame();
      }, 120);
    }

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(canvas);

    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    size();
    frame();

    function loop() {
      if (visible) {
        time += 0.012;
        frame();
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      ctx.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full [background:radial-gradient(circle_at_50%_120%,#cfcfcf_0%,#d9d9d9_40%,transparent_41%)]"
    />
  );
}
