"use client";

import { useEffect, useRef } from "react";

/* ─── Shaders ────────────────────────────────────────────────────────────── */

const VERT = /* glsl */ `
uniform float uTime;
varying vec3  vNormal;
varying float vElevation;

/* ── Value noise (hash3 → smooth noise → FBM) ── */
float hash3(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash3(i);
  float b = hash3(i + vec3(1,0,0));
  float c = hash3(i + vec3(0,1,0));
  float d = hash3(i + vec3(1,1,0));
  float e = hash3(i + vec3(0,0,1));
  float ff= hash3(i + vec3(1,0,1));
  float g = hash3(i + vec3(0,1,1));
  float h = hash3(i + vec3(1,1,1));
  return mix(
    mix(mix(a,b,f.x), mix(c,d,f.x), f.y),
    mix(mix(e,ff,f.x), mix(g,h,f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * (vnoise(p) * 2.0 - 1.0);
    p  = p * 2.1 + vec3(1.7, 9.2, 3.4);
    a *= 0.5;
  }
  return v;
}

float elev(vec2 xy, float t) {
  return fbm(vec3(xy * 0.52, t * 0.09)) * 0.44;
}

void main() {
  float e = elev(position.xy, uTime);
  vElevation = e;

  /* Numerical normal ─ 4 neighbour samples */
  float eps = 0.025;
  float eL = elev(position.xy + vec2(-eps, 0.0), uTime);
  float eR = elev(position.xy + vec2( eps, 0.0), uTime);
  float eD = elev(position.xy + vec2(0.0,-eps), uTime);
  float eU = elev(position.xy + vec2(0.0, eps), uTime);
  vec3 sn = normalize(vec3(eL - eR, eD - eU, 2.0 * eps));
  vNormal = normalize(normalMatrix * sn);

  gl_Position = projectionMatrix * modelViewMatrix
    * vec4(position.x, position.y, position.z + e, 1.0);
}
`;

const FRAG = /* glsl */ `
uniform float uTime;
varying vec3  vNormal;
varying float vElevation;

void main() {
  /* Deep black-violet base */
  vec3 col = vec3(0.004, 0.002, 0.010);

  vec3 N = normalize(vNormal);
  vec3 V = normalize(vec3(0.0, 0.08, 1.0));   /* viewer */

  /* Three light sources for varied highlight shapes */
  vec3 L1 = normalize(vec3( 0.5,  0.9, 1.0));
  vec3 L2 = normalize(vec3(-0.8,  0.3, 0.85));
  vec3 L3 = normalize(vec3( 0.1, -0.6, 1.0));

  float s1 = pow(max(dot(N, normalize(L1 + V)), 0.0),  80.0);
  float s2 = pow(max(dot(N, normalize(L2 + V)), 0.0), 120.0);
  float s3 = pow(max(dot(N, normalize(L3 + V)), 0.0),  50.0);

  /* Colour oscillation: violet ↔ magenta ↔ neon‑pink */
  float ct  = sin(uTime * 0.17) * 0.5 + 0.5;
  float ct2 = cos(uTime * 0.11 + 1.4) * 0.5 + 0.5;

  vec3 violet  = vec3(0.50, 0.02, 1.00);
  vec3 magenta = vec3(0.90, 0.02, 0.72);
  vec3 pink    = vec3(1.00, 0.04, 0.55);

  col += s1 * 1.8 * mix(violet,  magenta, ct);
  col += s2 * 1.3 * mix(magenta, pink,    ct2);
  col += s3 * 0.7 * mix(violet,  pink,    ct * ct2);

  /* Soft crest glow */
  col += clamp(vElevation * 2.5, 0.0, 1.0) * 0.045 * violet;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function MeshGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;
    let cleanupFn: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (!mounted || !container) return;

      /* Renderer */
      const renderer = new THREE.WebGLRenderer({ antialias: false });
      renderer.setClearColor(0x000000, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);

      /* Scene */
      const scene = new THREE.Scene();

      /* Camera */
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 10);
      camera.position.set(0, 0, 2.3);

      /* Mesh */
      const geo = new THREE.PlaneGeometry(10, 10, 110, 110);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { uTime: { value: 0 } },
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -0.18;   /* slight downward tilt for 3D depth */
      scene.add(mesh);

      /* Animation — very slow tick (organic feel) */
      let t = 0;
      let rafId: number;
      const tick = () => {
        rafId = requestAnimationFrame(tick);
        t += 0.007;
        mat.uniforms.uTime.value = t;
        renderer.render(scene, camera);
      };
      tick();

      /* Resize */
      const ro = new ResizeObserver(() => {
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      });
      ro.observe(container);

      cleanupFn = () => {
        cancelAnimationFrame(rafId);
        ro.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      mounted = false;
      cleanupFn?.();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 bg-black" />;
}
