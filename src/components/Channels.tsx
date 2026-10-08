// 'use client'

// import React, { useEffect, useRef, useState, useSyncExternalStore } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import * as THREE from "three"

// gsap.registerPlugin(ScrollTrigger)

// interface ChannelCard {
//   step: string
//   title: string
//   device: string
//   description: string
//   image: string
//   accent: string
//   focusX: number
//   focusY: number
// }

// const channelCards: ChannelCard[] = [
//   {
//     step: "01",
//     title: "Shareable Web link",
//     device: "Any browser",
//     description: "For buyers they see digital twin from their phone. Accessible instantly in any browser without app downloads.",
//     image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1600&auto=format&fit=crop&q=80",
//     accent: "#8a6a3a",
//     focusX: 0.55,
//     focusY: 0.5,
//   },
//   {
//     step: "02",
//     title: "Sales gallery",
//     device: "Touchscreen",
//     description: "Immersive touchscreen integration for sales centers, letting buyers navigate expansive towers with multi-touch ease.",
//     image: "https://images.unsplash.com/photo-1553101331-ce6281c677b9?w=1600&auto=format&fit=crop&q=80",
//     accent: "#5a5048",
//     focusX: 0.5,
//     focusY: 0.5,
//   },
//   {
//     step: "03",
//     title: "iPad on site",
//     device: "Tablet",
//     description: "Portable high-performance walkthroughs for site visits, meetings, and client pitches right on location.",
//     image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1600&auto=format&fit=crop&q=80",
//     accent: "#6b5a44",
//     focusX: 0.5,
//     focusY: 0.5,
//   },
//   {
//     step: "04",
//     title: "VR headset",
//     device: "Virtual reality",
//     description: "True stereoscopic scale immersion allowing clients to step directly inside balconies and living rooms in virtual reality.",
//     image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1600&auto=format&fit=crop&q=80",
//     accent: "#3e4a5c",
//     focusX: 0.5,
//     focusY: 0.45,
//   },
//   {
//     step: "05",
//     title: "Events & Launches",
//     device: "Projection / LED",
//     description: "High-impact projection mapping and LED wall integration for roadshows, global launches, and investor events.",
//     image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=80",
//     accent: "#5c3f2e",
//     focusX: 0.5,
//     focusY: 0.5,
//   },
//   {
//     step: "06",
//     title: "Renders, reels & 360s",
//     device: "Media exports",
//     description: "Multi-channel media exports generated straight from the master digital twin for social campaigns and marketing.",
//     image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&auto=format&fit=crop&q=80",
//     accent: "#7a6a52",
//     focusX: 0.5,
//     focusY: 0.5,
//   },
// ]

// // brand gold — kept consistent with the rest of the site (§08, §15)
// const GOLD = "#bf953f"
// const TOTAL = String(channelCards.length).padStart(2, "0")
// const PLATE_ASPECT = 1.25 // plate height / width (portrait)

// /**
//  * Where a plate sits relative to the current index (`rel` 0 = focused).
//  * cx/cy are fractions of the stage, s is scale, rot in degrees. Plates
//  * between slots are interpolated, so scrolling glides along the diagonal.
//  */
// interface Slot {
//   rel: number
//   cx: number
//   cy: number
//   s: number
//   rot: number
//   op: number
// }

// // wide screens: upcoming plates wait top-right, passed plates exit bottom-left,
// // leaving the top-left free for the heading and bottom-right for the caption
// const SLOTS_WIDE: Slot[] = [
//   { rel: -2, cx: 0.2, cy: 0.98, s: 0.4, rot: 12, op: 0 },
//   { rel: -1, cx: 0.31, cy: 0.78, s: 0.52, rot: 9, op: 1 },
//   { rel: 0, cx: 0.58, cy: 0.52, s: 1, rot: 0, op: 1 },
//   { rel: 1, cx: 0.84, cy: 0.3, s: 0.52, rot: -9, op: 1 },
//   { rel: 2, cx: 0.95, cy: 0.1, s: 0.4, rot: -12, op: 0 },
// ]

// // portrait screens: a loose stack, the focused plate in front
// const SLOTS_TALL: Slot[] = [
//   { rel: -2, cx: 0.24, cy: 1.25, s: 1, rot: -32, op: 0 },
//   { rel: -1, cx: 0.36, cy: 1.0, s: 1, rot: -20, op: 0.18 },
//   { rel: 0, cx: 0.5, cy: 0.58, s: 1, rot: 0, op: 1 },
//   { rel: 1, cx: 0.5, cy: 0.5, s: 0.88, rot: 9, op: 1 },
//   { rel: 2, cx: 0.5, cy: 0.45, s: 0.78, rot: -8, op: 0.9 },
//   { rel: 3, cx: 0.5, cy: 0.42, s: 0.7, rot: 5, op: 0 },
// ]

// const VERTEX = /* glsl */ `
// uniform float uTime, uHover, uTilt, uTiltDir, uEntr;
// uniform vec2  uHoverPt;
// varying vec2 vUv;
// void main() {
//   vUv = uv;
//   vec3 pos = position;
//   float t = uTime;
//   float hd = distance(uv, uHoverPt);
//   float local = smoothstep(0.4, 0.0, hd) * uHover;
//   pos.xy += (uv - uHoverPt) * sin(hd * 40.0 - t * 5.0) * local * 0.06;

//   if (uTilt > 0.0001) {
//     float ax = uTilt * 0.28, ay = uTilt * uTiltDir;
//     float cax = cos(ax), sax = sin(ax);
//     pos = vec3(pos.x, pos.y * cax - pos.z * sax, pos.y * sax + pos.z * cax);
//     float cay = cos(ay), say = sin(ay);
//     pos = vec3(pos.x * cay + pos.z * say, pos.y, -pos.x * say + pos.z * cay);
//     float persp = 1.0 / (1.0 - pos.z * (0.55 + uEntr * 0.3));
//     pos = vec3(pos.xy * persp, 0.0);
//   }
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }
// `

// const FRAGMENT = /* glsl */ `
// precision highp float;
// uniform sampler2D uTex;
// uniform float uTime, uHover, uOpacity, uRadius, uTexAspect, uBlur;
// uniform vec2  uSize, uHoverPt, uFocus;
// varying vec2 vUv;
// float sdRound(vec2 p, vec2 b, float r) {
//   vec2 q = abs(p) - b + r;
//   return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
// }
// void main() {
//   float planeAspect = uSize.x / uSize.y;
//   vec2 uv = vUv;
//   // object-fit: cover, biased toward the focus point
//   if (planeAspect > uTexAspect) {
//     float s = uTexAspect / planeAspect;
//     uv.y = (uv.y - 0.5) * s + clamp(uFocus.y, 0.5 * s, 1.0 - 0.5 * s);
//   } else {
//     float s = planeAspect / uTexAspect;
//     uv.x = (uv.x - 0.5) * s + clamp(uFocus.x, 0.5 * s, 1.0 - 0.5 * s);
//   }
//   float hd = distance(vUv, uHoverPt);
//   float localHover = smoothstep(0.4, 0.0, hd) * uHover;
//   vec2 flow = vec2(
//     sin(vUv.y * 22.0 + uTime * 2.2) + sin(vUv.y * 9.0 - uTime * 1.3),
//     cos(vUv.x * 20.0 - uTime * 1.9) + cos(vUv.x * 8.0 + uTime * 1.0)
//   );
//   uv += flow * localHover * 0.02;
//   vec3 col = texture2D(uTex, uv).rgb;
//   if (uBlur > 0.0006) {
//     for (int i = 0; i < 8; i++) {
//       float a = float(i) * 0.7853982;
//       vec2 d = vec2(cos(a), sin(a)) * uBlur;
//       col += texture2D(uTex, uv + d).rgb;
//       col += texture2D(uTex, uv + d * 0.5).rgb;
//     }
//     col /= 17.0;
//   }
//   vec2 p = (vUv - 0.5) * uSize;
//   float d = sdRound(p, uSize * 0.5, uRadius);
//   float aa = fwidth(d) + 1.0;
//   float alpha = 1.0 - smoothstep(-aa, aa, d);
//   float rim = smoothstep(-20.0, -1.0, d) - smoothstep(-1.0, 10.0, d);
//   col += rim * localHover * 0.6;
//   gl_FragColor = vec4(col, alpha * uOpacity);
// }
// `

// // soft moving light shafts behind the plates (gold light on the dark ground)
// const AMBIENT: React.CSSProperties[] = [
//   { background: "radial-gradient(closest-side, rgb(191 149 63 / 0.16), transparent)", filter: "blur(60px)", width: "66vw", height: "64vh", top: "-24%", left: "18%" },
//   { background: "radial-gradient(closest-side, rgb(0 0 0 / 0.5), transparent)", filter: "blur(54px)", width: "40vw", height: "58vh", top: "-12%", left: "31%" },
//   { background: "linear-gradient(90deg, rgb(0 0 0 / 0.55), transparent)", filter: "blur(46px)", width: "38vw", height: "130%", top: "-5%", left: "-16%" },
//   { background: "linear-gradient(270deg, rgb(0 0 0 / 0.55), transparent)", filter: "blur(46px)", width: "40vw", height: "130%", top: "-5%", right: "-16%" },
//   { background: "linear-gradient(90deg, transparent, rgb(0 0 0 / 0.4), transparent)", filter: "blur(42px)", width: "18vw", height: "130%", top: "-10%", left: "60%", transform: "skew(-10deg)" },
//   { background: "linear-gradient(90deg, transparent, rgb(191 149 63 / 0.1), transparent)", filter: "blur(34px)", width: "13vw", height: "130%", top: "-10%", left: "23%", transform: "skew(-10deg)" },
//   { background: "linear-gradient(90deg, transparent, rgb(191 149 63 / 0.08), transparent)", filter: "blur(34px)", width: "9vw", height: "130%", top: "-10%", left: "48%", transform: "skew(-10deg)" },
// ]

// const lerp = (a: number, b: number, t: number) => a + (b - a) * t
// const smoothstep = (t: number) => t * t * (3 - 2 * t)
// const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

// function sampleSlots(slots: Slot[], rel: number) {
//   const first = slots[0]
//   const last = slots[slots.length - 1]
//   if (rel <= first.rel) return first
//   if (rel >= last.rel) return last
//   for (let i = 0; i < slots.length - 1; i++) {
//     const a = slots[i]
//     const b = slots[i + 1]
//     if (rel >= a.rel && rel <= b.rel) {
//       const t = smoothstep((rel - a.rel) / (b.rel - a.rel))
//       return { rel, cx: lerp(a.cx, b.cx, t), cy: lerp(a.cy, b.cy, t), s: lerp(a.s, b.s, t), rot: lerp(a.rot, b.rot, t), op: lerp(a.op, b.op, t) }
//     }
//   }
//   return last
// }

// function plateWidth(W: number, H: number) {
//   const tall = H > W
//   const base = W < 760 ? 0.74 * W : tall ? 0.58 * W : Math.min(Math.max(0.3 * W, 300), 560)
//   return Math.min(base, ((tall ? 0.52 : 0.78) * H) / PLATE_ASPECT)
// }

// const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
// const subscribeReducedMotion = (cb: () => void) => {
//   const mq = window.matchMedia(REDUCED_MOTION)
//   mq.addEventListener("change", cb)
//   return () => mq.removeEventListener("change", cb)
// }
// const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches

// export default function Channels() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const titleRef = useRef<HTMLDivElement>(null)
//   const ambientRefs = useRef<(HTMLDivElement | null)[]>([])
//   const progressRef = useRef<HTMLSpanElement>(null)
//   const triggerRef = useRef<ScrollTrigger | null>(null)
//   const closeRef = useRef<(() => void) | null>(null)

//   const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
//   const [noWebGL, setNoWebGL] = useState(false)
//   const [active, setActive] = useState(0)
//   const [openIdx, setOpenIdx] = useState<number | null>(null)
//   const [captionOn, setCaptionOn] = useState(false)

//   const staticLayout = reducedMotion || noWebGL

//   // heading entrance
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       if (!titleRef.current) return
//       gsap.fromTo(
//         titleRef.current.querySelectorAll("[data-intro]"),
//         { opacity: 0, y: 40, filter: "blur(10px)" },
//         {
//           opacity: 1,
//           y: 0,
//           filter: "blur(0px)",
//           duration: 1.1,
//           stagger: 0.1,
//           ease: "power3.out",
//           scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
//         }
//       )
//     }, sectionRef)
//     return () => ctx.revert()
//   }, [staticLayout])

//   // WebGL fluid gallery
//   useEffect(() => {
//     const section = sectionRef.current
//     const canvas = canvasRef.current
//     if (staticLayout || !section || !canvas) return

//     let renderer: THREE.WebGLRenderer
//     try {
//       renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" })
//     } catch {
//       // fall back to the static grid on the next tick
//       queueMicrotask(() => setNoWebGL(true))
//       return
//     }

//     let W = section.clientWidth
//     let H = section.clientHeight
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
//     renderer.setSize(W, H, false)
//     renderer.setClearAlpha(0)

//     const scene = new THREE.Scene()
//     const camera = new THREE.OrthographicCamera(0, W, H, 0, 0.1, 1000)
//     camera.position.z = 10
//     const geometry = new THREE.PlaneGeometry(1, 1, 48, 48)

//     const n = channelCards.length
//     const plates = channelCards.map((card, idx) => {
//       const hex = parseInt(card.accent.slice(1), 16)
//       const placeholder = new THREE.DataTexture(new Uint8Array([(hex >> 16) & 255, (hex >> 8) & 255, hex & 255, 255]), 1, 1)
//       placeholder.needsUpdate = true
//       const mat = new THREE.ShaderMaterial({
//         vertexShader: VERTEX,
//         fragmentShader: FRAGMENT,
//         transparent: true,
//         depthTest: false,
//         depthWrite: false,
//         side: THREE.DoubleSide,
//         uniforms: {
//           uTex: { value: placeholder },
//           uTime: { value: 0 },
//           uHover: { value: 0 },
//           uTilt: { value: 0 },
//           uTiltDir: { value: idx % 2 ? -1 : 1 },
//           uEntr: { value: 0 },
//           uOpacity: { value: 0 },
//           uSize: { value: new THREE.Vector2(1, 1) },
//           uRadius: { value: 30 },
//           uTexAspect: { value: 1 },
//           uFocus: { value: new THREE.Vector2(card.focusX, card.focusY) },
//           uBlur: { value: 0 },
//           uHoverPt: { value: new THREE.Vector2(0.5, 0.5) },
//         },
//       })
//       const mesh = new THREE.Mesh(geometry, mat)
//       mesh.renderOrder = idx
//       scene.add(mesh)
//       return {
//         idx,
//         mesh,
//         mat,
//         placeholder,
//         tex: null as THREE.Texture | null,
//         ready: false,
//         revealT: 0,
//         morphT: 0,
//         hoverT: 0,
//         cx: 0,
//         cy: 0,
//         w: 1,
//         h: 1,
//         rot: 0,
//       }
//     })

//     let alive = true
//     let entered = false
//     let revealQueue = 0

//     const reveal = (p: (typeof plates)[number]) => {
//       if (!entered || !p.ready || p.revealT > 0) return
//       gsap.to(p, { revealT: 1, duration: 1.1, ease: "back.out(1.5)", delay: 0.09 * revealQueue++ })
//     }

//     plates.forEach((p) => {
//       const img = new Image()
//       img.crossOrigin = "anonymous"
//       img.src = channelCards[p.idx].image
//       img
//         .decode()
//         .then(() => {
//           if (!alive) return
//           const tex = new THREE.Texture(img)
//           tex.minFilter = THREE.LinearFilter
//           tex.magFilter = THREE.LinearFilter
//           tex.generateMipmaps = false
//           tex.needsUpdate = true
//           p.tex = tex
//           p.mat.uniforms.uTex.value = tex
//           p.mat.uniforms.uTexAspect.value = img.naturalWidth / img.naturalHeight
//         })
//         .catch(() => {})
//         .finally(() => {
//           if (!alive) return
//           p.ready = true
//           reveal(p)
//         })
//     })

//     // scroll position (P) → eased index (R)
//     let P = 0
//     let R = 0
//     let visible = false

//     // pointer, for hover ripple + parallax
//     const fine = window.matchMedia("(pointer: fine)").matches
//     const pointer = { x: W / 2, y: H / 2, inside: false }
//     let parX = 0
//     let parY = 0
//     let hovered = -1

//     const toLocal = (p: (typeof plates)[number], x: number, y: number) => {
//       const a = -(p.rot * Math.PI) / 180
//       const rx = x - p.cx
//       const ry = p.cy - y
//       const c = Math.cos(a)
//       const s = Math.sin(a)
//       return { lx: rx * c + ry * s, ly: -rx * s + ry * c }
//     }
//     const pick = (x: number, y: number) => {
//       let hit = -1
//       let top = -Infinity
//       for (const p of plates) {
//         if (p.mat.uniforms.uOpacity.value < 0.4) continue
//         const { lx, ly } = toLocal(p, x, y)
//         if (Math.abs(lx) <= p.w / 2 && Math.abs(ly) <= p.h / 2 && p.mesh.renderOrder >= top) {
//           top = p.mesh.renderOrder
//           hit = p.idx
//         }
//       }
//       return hit
//     }

//     let openI: number | null = null
//     let busy = false

//     const close = () => {
//       if (openI === null) return
//       const p = plates[openI]
//       openI = null
//       busy = true
//       p.mat.uniforms.uTiltDir.value = 1
//       setCaptionOn(false)
//       gsap.to(p, {
//         morphT: 0,
//         duration: 1,
//         ease: "power2.inOut",
//         onComplete: () => {
//           busy = false
//           setOpenIdx(null)
//         },
//       })
//     }
//     closeRef.current = close

//     const open = (i: number) => {
//       if (openI !== null || busy) return
//       const p = plates[i]
//       busy = true
//       openI = i
//       p.mat.uniforms.uTiltDir.value = -1
//       setOpenIdx(i)
//       gsap.to(p, {
//         morphT: 1,
//         duration: 1.15,
//         ease: "power2.inOut",
//         onComplete: () => {
//           busy = false
//           setCaptionOn(true)
//         },
//       })
//     }

//     const scrollToIndex = (i: number) => {
//       const st = triggerRef.current
//       if (!st) return
//       window.scrollTo({ top: st.start + ((st.end - st.start) * i) / (n - 1) + 1, behavior: "smooth" })
//     }

//     const localPoint = (e: { clientX: number; clientY: number }) => {
//       const r = section.getBoundingClientRect()
//       return { x: e.clientX - r.left, y: e.clientY - r.top }
//     }

//     const onClick = (e: MouseEvent) => {
//       if (openI !== null) return close()
//       if (busy) return
//       const { x, y } = localPoint(e)
//       const i = pick(x, y)
//       if (i < 0) return
//       if (i === Math.round(R)) open(i)
//       else scrollToIndex(i)
//     }
//     const onMove = (e: PointerEvent) => {
//       const { x, y } = localPoint(e)
//       pointer.x = x
//       pointer.y = y
//       pointer.inside = x >= 0 && y >= 0 && x <= W && y <= H
//     }
//     const onLeave = () => {
//       pointer.inside = false
//     }
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") close()
//     }
//     const onResize = () => {
//       W = section.clientWidth
//       H = section.clientHeight
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
//       renderer.setSize(W, H, false)
//       camera.right = W
//       camera.top = H
//       camera.updateProjectionMatrix()
//     }

//     canvas.addEventListener("click", onClick)
//     window.addEventListener("pointermove", onMove)
//     document.addEventListener("pointerleave", onLeave)
//     window.addEventListener("keydown", onKey)
//     window.addEventListener("resize", onResize)

//     let raf = 0
//     let last = 0
//     let time = 0
//     let shownActive = 0

//     const frame = () => {
//       raf = requestAnimationFrame(frame)
//       if (!visible || document.hidden) {
//         last = 0
//         return
//       }
//       const now = performance.now()
//       const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016
//       last = now
//       time += dt
//       R += (P - R) * 0.1

//       ambientRefs.current.forEach((el, i) => {
//         if (el) el.style.translate = `${1.6 * Math.sin(0.12 * time + 1.3 * i)}vw 0`
//       })

//       const tall = H > W
//       const slots = tall ? SLOTS_TALL : SLOTS_WIDE
//       const base = plateWidth(W, H)
//       const track = fine && openI === null && pointer.inside
//       parX += ((track ? pointer.x / W - 0.5 : 0) - parX) * 0.05
//       parY += ((track ? pointer.y / H - 0.5 : 0) - parY) * 0.05

//       for (const p of plates) {
//         p.hoverT += ((p.idx === hovered ? 1 : 0) - p.hoverT) * 0.09
//         const t = p.revealT
//         const pre = 1 - t
//         const m = p.morphT
//         const isOpen = p.idx === openI || m > 0.001
//         const rel = p.idx - R
//         const slot = sampleSlots(slots, rel)
//         const grow = lerp(0.6, 1, t)
//         let w = base * slot.s * grow
//         let h = base * PLATE_ASPECT * slot.s * grow
//         let x = slot.cx * W
//         let y = slot.cy * H + pre * H * 0.08
//         let rot = slot.rot
//         if (m > 0) {
//           x = lerp(x, W / 2, m)
//           y = lerp(y, H / 2, m)
//           w = lerp(w, W, m)
//           h = lerp(h, H, m)
//           rot = lerp(rot, 0, m)
//         }
//         const par = slot.s * (1 - m) * t
//         x -= 30 * parX * par
//         y -= 30 * parY * par
//         rot += 2.2 * parX * par

//         p.cx = x
//         p.cy = y
//         p.w = w
//         p.h = h
//         p.rot = rot
//         p.mesh.position.set(x, H - y, 0)
//         p.mesh.scale.set(w, h, 1)
//         p.mesh.rotation.z = (-rot * Math.PI) / 180
//         p.mesh.renderOrder = isOpen ? 100 : tall ? Math.round(-10 * rel) : 50 - Math.round(Math.abs(rel) * 10)

//         const passed = rel < -0.05 ? smoothstep(clamp01((Math.abs(rel) - 0.25) / 1)) : 0
//         const u = p.mat.uniforms
//         u.uTime.value = time
//         u.uHover.value = p.hoverT
//         u.uTilt.value = 1.25 * pre + 0.42 * Math.sin(m * Math.PI)
//         u.uEntr.value = pre
//         u.uSize.value.set(w, h)
//         u.uRadius.value = (1 - m * m * m) * Math.min(w, h) * 0.08
//         u.uBlur.value = 0.02 * passed * (1 - m) + 0.06 * pre
//         u.uOpacity.value = isOpen ? 1 : slot.op * t
//       }

//       hovered = fine && openI === null && pointer.inside ? pick(pointer.x, pointer.y) : -1
//       canvas.style.cursor = openI !== null ? "zoom-out" : hovered >= 0 ? (hovered === Math.round(R) ? "zoom-in" : "pointer") : ""
//       if (hovered >= 0) {
//         const p = plates[hovered]
//         const { lx, ly } = toLocal(p, pointer.x, pointer.y)
//         p.mat.uniforms.uHoverPt.value.set(lx / p.w + 0.5, ly / p.h + 0.5)
//       }

//       const nearest = Math.min(Math.max(Math.round(R), 0), n - 1)
//       if (nearest !== shownActive) {
//         shownActive = nearest
//         setActive(nearest)
//       }
//       if (progressRef.current) progressRef.current.style.transform = `scaleX(${(R + 1) / n})`

//       renderer.render(scene, camera)
//     }
//     raf = requestAnimationFrame(frame)

//     const ctx = gsap.context(() => {
//       triggerRef.current = ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         end: () => `+=${Math.max(window.innerHeight * (n - 1) * 0.7, 600)}`,
//         pin: true,
//         invalidateOnRefresh: true,
//         onUpdate: (self) => {
//           P = self.progress * (n - 1)
//           if (openI !== null && !busy) close()
//         },
//         onRefresh: onResize,
//       })
//       ScrollTrigger.create({
//         trigger: section,
//         start: "top bottom",
//         end: "bottom top",
//         onToggle: (self) => {
//           visible = self.isActive
//         },
//         onEnter: () => {
//           if (entered) return
//           entered = true
//           plates.forEach(reveal)
//         },
//       })
//     }, section)

//     return () => {
//       alive = false
//       cancelAnimationFrame(raf)
//       ctx.revert()
//       triggerRef.current = null
//       closeRef.current = null
//       canvas.removeEventListener("click", onClick)
//       window.removeEventListener("pointermove", onMove)
//       document.removeEventListener("pointerleave", onLeave)
//       window.removeEventListener("keydown", onKey)
//       window.removeEventListener("resize", onResize)
//       for (const p of plates) {
//         gsap.killTweensOf(p)
//         scene.remove(p.mesh)
//         p.mat.dispose()
//         p.placeholder.dispose()
//         p.tex?.dispose()
//       }
//       geometry.dispose()
//       renderer.dispose()
//     }
//   }, [staticLayout])

//   const goTo = (i: number) => {
//     const st = triggerRef.current
//     if (!st) return
//     window.scrollTo({ top: st.start + ((st.end - st.start) * i) / (channelCards.length - 1) + 1, behavior: "smooth" })
//   }

//   const heading = (
//     <div ref={titleRef}>
//       <span
//         data-intro
//         className="mb-6 inline-flex items-center gap-2 border border-foreground/15 px-3.5 py-2 font-mono text-xs uppercase tracking-[0.24em] text-foreground/70"
//       >
//         <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
//         Solutions
//       </span>
//       <h2
//         className="font-medium uppercase leading-[0.92] tracking-[-0.045em] text-foreground"
//         style={{ fontFamily: "var(--font-gilroy)", fontSize: "clamp(44px, min(4.4vw, 9vh), 96px)" }}
//       >
//         <span data-intro className="block">
//           Build it once.
//         </span>
//         <span data-intro className="block" style={{ color: GOLD }}>
//           Sell everywhere.
//         </span>
//       </h2>
//       <p data-intro className="mt-6 hidden max-w-md text-base font-light leading-relaxed text-foreground/70 md:block lg:text-lg">
//         Your Digital Twin is one master file. Every channel runs from it — so pricing, availability and the story stay identical from the website to the gallery.
//       </p>
//     </div>
//   )

//   if (staticLayout) {
//     return (
//       <section
//         ref={sectionRef}
//         id="channels-section"
//         className="relative z-20 w-full border-t border-foreground/10 bg-background px-6 py-20 text-foreground md:px-12"
//       >
//         <div className="mx-auto max-w-300">
//           {heading}
//           <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
//             {channelCards.map((item) => (
//               <div key={item.step} className="flex flex-col">
//                 <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
//                   <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
//                 </div>
//                 <span className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
//                   {item.step} — {item.device}
//                 </span>
//                 <h3 className="mt-2 text-2xl font-medium tracking-tight text-foreground">{item.title}</h3>
//                 <p className="mt-2 text-base font-light leading-relaxed text-foreground/65">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   const opened = openIdx === null ? null : channelCards[openIdx]
//   const current = channelCards[active]

//   return (
//     <section
//       ref={sectionRef}
//       id="channels-section"
//       aria-label="Solutions — one Digital Twin across every sales channel"
//       className="relative z-20 h-svh w-full overflow-hidden bg-background text-foreground selection:bg-[#bf953f]/30"
//     >
//       {/* ambient light shafts */}
//       <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         {AMBIENT.map((style, i) => (
//           <div
//             key={i}
//             ref={(el) => {
//               ambientRefs.current[i] = el
//             }}
//             className="absolute will-change-[translate]"
//             style={style}
//           />
//         ))}
//       </div>

//       <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full" />

//       {/* heading — top left */}
//       <div
//         className="pointer-events-none absolute left-6 right-6 top-[clamp(72px,11vh,130px)] z-20 transition-opacity duration-500 md:left-[clamp(28px,4.2vw,78px)] md:right-auto md:max-w-[40vw]"
//         style={{ opacity: openIdx === null ? 1 : 0 }}
//       >
//         {heading}
//         <div className="mt-5 hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.26em] text-foreground/45 md:flex">
//           <span className="h-px w-6 bg-current" />
//           Scroll to browse · Click to expand
//         </div>
//       </div>

//       {/* active channel — bottom right */}
//       <div
//         className="pointer-events-none absolute bottom-[clamp(24px,5vh,56px)] left-6 right-6 z-20 transition-opacity duration-500 md:left-auto md:right-[clamp(28px,4.2vw,78px)] md:w-[min(24vw,380px)]"
//         style={{ opacity: openIdx === null ? 1 : 0 }}
//       >
//         <div className="relative h-32 md:h-52">
//           {channelCards.map((item, i) => {
//             const on = i === active
//             return (
//               <div
//                 key={item.step}
//                 aria-hidden={!on}
//                 className="absolute inset-x-0 bottom-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
//                 style={{
//                   opacity: on ? 1 : 0,
//                   filter: on ? "blur(0px)" : "blur(8px)",
//                   transform: on ? "translateY(0)" : `translateY(${i < active ? -14 : 14}px)`,
//                 }}
//               >
//                 <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em]" style={{ color: GOLD }}>
//                   {item.device}
//                 </span>
//                 <h3 className="text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground md:text-4xl">{item.title}</h3>
//                 <p className="mt-3 hidden text-base font-light leading-relaxed text-foreground/65 md:block">{item.description}</p>
//               </div>
//             )
//           })}
//         </div>
//         <div className="pointer-events-auto mt-5 flex items-center gap-4">
//           <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
//             <span className="text-3xl text-foreground md:text-4xl">{current.step}</span>
//             <span className="text-sm text-foreground/40">/ {TOTAL}</span>
//           </div>
//           <span className="relative block h-px flex-1 bg-foreground/15">
//             <span
//               ref={progressRef}
//               className="absolute inset-0 origin-left"
//               style={{ backgroundColor: GOLD, transform: `scaleX(${1 / channelCards.length})` }}
//             />
//           </span>
//           <div className="flex gap-1.5">
//             {channelCards.map((item, i) => (
//               <button
//                 key={item.step}
//                 type="button"
//                 onClick={() => goTo(i)}
//                 aria-label={`Show ${item.title}`}
//                 aria-current={i === active}
//                 className="h-2 w-2 cursor-pointer rounded-full transition-all duration-500"
//                 style={{ backgroundColor: i === active ? GOLD : "color-mix(in oklab, var(--foreground) 25%, transparent)" }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* expanded plate caption */}
//       <div
//         className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[52%] transition-opacity duration-500"
//         style={{
//           background: "linear-gradient(to top, rgba(6,5,10,0.78), rgba(6,5,10,0.3) 42%, transparent)",
//           opacity: captionOn ? 1 : 0,
//         }}
//       />
//       <button
//         type="button"
//         aria-label="Close full-screen"
//         onClick={() => closeRef.current?.()}
//         className="absolute right-5 top-24 z-40 flex size-12 items-center justify-center rounded-full text-white transition-opacity duration-500 sm:right-8"
//         style={{
//           background: "rgba(12,10,16,0.35)",
//           border: "1px solid rgba(255,255,255,0.22)",
//           backdropFilter: "blur(12px)",
//           opacity: captionOn ? 1 : 0,
//           pointerEvents: captionOn ? "auto" : "none",
//         }}
//       >
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
//           <path d="M6 6l12 12" />
//           <path d="M18 6L6 18" />
//         </svg>
//       </button>
//       {opened && (
//         <div
//           className="pointer-events-none absolute bottom-10 left-6 z-40 max-w-xl sm:bottom-14 sm:left-12"
//           style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
//         >
//           {[
//             <div key="meta" className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em]">
//               <span style={{ color: GOLD }}>{opened.device}</span>
//               <span className="text-white/45">
//                 {opened.step} / {TOTAL}
//               </span>
//             </div>,
//             <h3 key="title" className="mt-3 text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
//               {opened.title}
//             </h3>,
//             <p key="desc" className="mt-4 max-w-md text-base font-light leading-relaxed text-white/80 md:text-lg">
//               {opened.description}
//             </p>,
//           ].map((node, i) => (
//             <div
//               key={i}
//               className="transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
//               style={{
//                 opacity: captionOn ? 1 : 0,
//                 transform: captionOn ? "translateY(0)" : "translateY(26px)",
//                 filter: captionOn ? "blur(0px)" : "blur(12px)",
//                 transitionDelay: captionOn ? `${i * 90}ms` : "0ms",
//               }}
//             >
//               {node}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   )
// }




'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ProjectTypeData {
    title: string
    subtitle: string
    imgSrc: string
}

const projectTypes: ProjectTypeData[] = [
    { title: 'Residential towers', subtitle: 'Full elevation and floor control.', imgSrc: 'https://framerusercontent.com/images/PIckQ7vs3QZXJ2eLyq91rmt3hLk.png?width=1399&height=670' },
    { title: 'Luxury residences', subtitle: 'Material, detail and atmosphere in every room.', imgSrc: 'https://framerusercontent.com/images/qWNssr2VW9pk5zkdisoIYcc0Uo.png?width=1367&height=790' },
    { title: 'Masterplans', subtitle: 'Navigate phases, amenities and the bigger picture.', imgSrc: 'https://framerusercontent.com/images/QSUDPXU7sOqM557B2LAeaCrKIhc.png?width=1316&height=791' },
    { title: 'Villas & plots', subtitle: 'Plots, boundaries and custom villa walkthroughs.', imgSrc: 'https://framerusercontent.com/images/eKrcvOMsf6CXnBH0uTpWJli2vY.png?scale-down-to=1024&width=1180&height=900' },
    { title: 'Commercial & retail', subtitle: 'Footfall, leasing layouts and retail possibilities.', imgSrc: 'https://framerusercontent.com/images/venMvyC03Nyji0T9rBpLlWjBjxo.png?width=1367&height=790' },
    { title: 'International launches', subtitle: 'Touchscreen-ready experiences for every market.', imgSrc: 'https://framerusercontent.com/images/oytc7a861tIZUl4y8BOlpxFck.png?width=1419&height=790' },
]

const INDEX_DURATION = 4.5
const HOLD = 0.4
const VELLUM = '#f7efdc'
const SCRUB_DURATION = 6

// Gallery tuning
const CARD_RATIO = 1.7 // card width divided by height
const SIDE_SCALE = 0.55 // size of the cards before and after the active one
const TILT = 10 // lean of the side cards, in degrees
const SIDE_DIM = 0.35 // how dark the side cards are
const LEAN = 5 // how much cards skew while moving, in degrees (0 turns it off)
const MAX_BLUR = 14 // strongest blur on leaving text, in px
const RADIUS = 22 // card corner radius, in px

const LAST = projectTypes.length - 1

export default function Applications() {
    const sectionRef = useRef<HTMLElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const copyRef = useRef<HTMLDivElement>(null)
    const detailsRef = useRef<HTMLDivElement>(null)
    const exploreRef = useRef<HTMLButtonElement>(null)
    const marksRef = useRef<HTMLDivElement>(null)
    const quoteRef = useRef<HTMLDivElement>(null)

    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const dimRefs = useRef<(HTMLDivElement | null)[]>([])
    const detailRefs = useRef<(HTMLDivElement | null)[]>([])

    const [activeIndex, setActiveIndex] = useState(0)
    const proxy = useRef({ value: 0, expand: 0 })
    const lastIndex = useRef(0)
    const draggedRef = useRef(false)
    const stRef = useRef<ScrollTrigger | null>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    const selectProject = (requestedIndex: number) => {
        const nextIndex = Math.max(0, Math.min(LAST, requestedIndex))
        const trigger = stRef.current
        const timeline = tlRef.current

        if (!trigger || !timeline) return

        const indexTime = (nextIndex / LAST) * INDEX_DURATION
        const timelineProgress = indexTime / timeline.totalDuration()
        const scrollTop = trigger.start + (trigger.end - trigger.start) * timelineProgress
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

        window.scrollTo({ top: scrollTop, behavior })
    }

    useEffect(() => {
        const section = sectionRef.current
        const stage = stageRef.current
        const copy = copyRef.current
        const details = detailsRef.current
        const explore = exploreRef.current
        const marks = marksRef.current
        const quote = quoteRef.current
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
        const dims = dimRefs.current.filter(Boolean) as HTMLDivElement[]
        const detailItems = detailRefs.current.filter(Boolean) as HTMLDivElement[]

        if (!section || !stage || !copy || !details || !explore || !marks || !quote || cards.length !== projectTypes.length) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                isDesktop: '(min-width: 768px)',
                isMobile: '(max-width: 767px)',
                reduceMotion: '(prefers-reduced-motion: reduce)',
            },
            (ctx) => {
                const { isDesktop, reduceMotion } = ctx.conditions as { isDesktop: boolean; reduceMotion: boolean }
                const clamp = gsap.utils.clamp
                const words = quote.querySelectorAll<HTMLElement>('.q-word')
                const state = proxy.current

                gsap.set(quote, { autoAlpha: 0 })
                gsap.set(words, { yPercent: 115 })

                // Card size, the active card's centre, and the step from one card to the next
                let sw = 0, sh = 0, W = 0, H = 0, CX = 0, CY = 0, DX = 0, DY = 0
                const measure = () => {
                    sw = stage.offsetWidth
                    sh = stage.offsetHeight
                    if (isDesktop) {
                        W = Math.min(sw * 0.44, sh * 0.6 * CARD_RATIO)
                        CX = sw * 0.6; CY = sh * 0.5; DX = sw * 0.17; DY = sh * 0.42
                    } else {
                        W = sw * 0.8
                        CX = sw * 0.5; CY = sh * 0.46; DX = sw * 0.3; DY = sh * 0.21
                    }
                    H = W / CARD_RATIO
                }

                let lean = 0

                // Places every card and text block for the current index (0 to 5) and expand amount (0 to 1)
                const render = () => {
                    const p = state.value
                    const e = state.expand

                    cards.forEach((card, i) => {
                        const d = i - p
                        const ad = Math.abs(d)
                        const isLast = i === LAST

                        gsap.set(detailItems[i], {
                            opacity: clamp(0, 1, 1 - ad * 2.4),
                            y: d * 22,
                            filter: reduceMotion || ad < 0.01 ? 'none' : `blur(${Math.min(ad * 16, MAX_BLUR)}px)`,
                        })

                        if (ad > 2.5) {
                            gsap.set(card, { autoAlpha: 0 })
                            return
                        }

                        let w = W, h = H
                        let cx = CX + d * DX, cy = CY + d * DY
                        let alpha = ad <= 1 ? 1 : clamp(0, 1, 1 - (ad - 1) * 0.8)
                        const scale = ad <= 1 ? 1 - (1 - SIDE_SCALE) * ad : Math.max(0.4, SIDE_SCALE - 0.12 * (ad - 1))

                        if (isLast) {
                            w = W + (sw - W) * e
                            h = H + (sh - H) * e
                            cx += (sw / 2 - cx) * e
                            cy += (sh / 2 - cy) * e
                        } else {
                            alpha *= clamp(0, 1, 1 - e * 3)
                        }

                        gsap.set(card, {
                            x: cx - w / 2,
                            y: cy - h / 2,
                            width: w,
                            height: h,
                            scale,
                            rotation: clamp(-1.5, 1.5, d) * TILT,
                            skewY: lean * LEAN * (1 - e),
                            autoAlpha: alpha,
                            zIndex: 20 - Math.round(ad * 4) + (isLast && e > 0 ? 10 : 0),
                            borderRadius: isLast ? RADIUS * (1 - e) : RADIUS,
                            filter: ad > 1 && !reduceMotion ? `blur(${(ad - 1) * 6}px)` : 'none',
                        })
                        gsap.set(dims[i], { opacity: isLast ? Math.max(Math.min(ad, 1) * SIDE_DIM, e * 0.78) : Math.min(ad, 1) * SIDE_DIM })
                    })

                    const next = Math.round(p)
                    if (next !== lastIndex.current) {
                        lastIndex.current = next
                        setActiveIndex(next)
                    }
                }

                // Cards lean with scroll speed and settle back when it stops
                let lastP = state.value
                const tick = () => {
                    const target = reduceMotion ? 0 : clamp(-1, 1, (state.value - lastP) * 14)
                    lastP = state.value
                    if (target === 0 && lean === 0) return
                    lean += (target - lean) * 0.14
                    if (Math.abs(lean) < 0.002) lean = 0
                    render()
                }
                gsap.ticker.add(tick)

                measure()
                render()

                // Scroll rests only on a card or on the finished quote
                let snapPoints: number[] = [0, 1]

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${window.innerHeight * SCRUB_DURATION}`,
                        scrub: 0.6,
                        pin: stage,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        snap: {
                            snapTo: (value) => gsap.utils.snap(snapPoints, value),
                            duration: reduceMotion ? 0.01 : { min: 0.25, max: 0.7 },
                            delay: 0.08,
                            ease: 'power2.out',
                        },
                        onRefresh: () => {
                            measure()
                            render()
                        },
                    },
                })

                tl.to(state, { value: LAST, ease: 'none', duration: INDEX_DURATION, onUpdate: render }, 0)

                const expand = gsap.timeline()

                expand.to(state, { expand: 1, duration: 2, ease: 'power3.inOut', onUpdate: render }, 0)
                expand.to([marks, explore], { autoAlpha: 0, duration: 0.5, ease: 'power1.out' }, 0)
                expand.to([copy, details], { opacity: 0, y: -30, duration: 0.8, ease: 'power2.out' }, 0)
                expand.to(quote, { autoAlpha: 1, duration: 0.3 }, 1)
                expand.to(
                    words,
                    { yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06 },
                    1.05
                )

                tl.add(expand, `>+=${HOLD}`)

                const total = tl.totalDuration()
                snapPoints = [...projectTypes.map((_, i) => ((i / LAST) * INDEX_DURATION) / total), 1]

                tlRef.current = tl
                stRef.current = tl.scrollTrigger ?? null

                // Press and drag with a mouse. Touch keeps native scrolling.
                let dragging = false
                let startY = 0
                let startScroll = 0

                const onPointerDown = (event: PointerEvent) => {
                    draggedRef.current = false
                    if (event.pointerType !== 'mouse' || event.button !== 0) return
                    if ((event.target as HTMLElement).closest('button')) return
                    dragging = true
                    startY = event.clientY
                    startScroll = window.scrollY
                }

                const onPointerMove = (event: PointerEvent) => {
                    const trigger = tl.scrollTrigger
                    if (!dragging || !trigger || !DY) return
                    const dy = event.clientY - startY
                    if (Math.abs(dy) > 6) {
                        draggedRef.current = true
                        stage.style.userSelect = 'none'
                    }
                    if (!draggedRef.current) return
                    const scrollPerCard = ((trigger.end - trigger.start) * (INDEX_DURATION / LAST)) / total
                    window.scrollTo(0, startScroll - dy * (scrollPerCard / DY))
                }

                const onPointerEnd = () => {
                    dragging = false
                    stage.style.userSelect = ''
                }

                stage.addEventListener('pointerdown', onPointerDown)
                window.addEventListener('pointermove', onPointerMove)
                window.addEventListener('pointerup', onPointerEnd)
                window.addEventListener('pointercancel', onPointerEnd)

                return () => {
                    gsap.ticker.remove(tick)
                    stage.removeEventListener('pointerdown', onPointerDown)
                    window.removeEventListener('pointermove', onPointerMove)
                    window.removeEventListener('pointerup', onPointerEnd)
                    window.removeEventListener('pointercancel', onPointerEnd)
                    stage.style.userSelect = ''
                    tlRef.current = null
                    stRef.current = null
                }
            }
        )

        return () => mm.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            aria-label="Project types"
            className="relative z-10 -mt-[100svh] w-full overflow-hidden bg-[#080a08]"
        >
            <div ref={stageRef} className="relative h-[100svh] min-h-[620px] w-full touch-pan-y overflow-hidden" style={{ color: VELLUM }}>
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(90% 80% at 50% 45%, rgba(77,91,71,0.2), transparent 72%), linear-gradient(135deg, #11140f 0%, #080a08 58%, #10120d 100%)',
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                />

                {/* The gallery: cards travel a diagonal path; the active one is large and upright */}
                {projectTypes.map((project, idx) => {
                    const active = idx === activeIndex
                    return (
                        <div
                            key={project.title}
                            ref={(el) => { cardRefs.current[idx] = el }}
                            aria-hidden={!active}
                            onClick={() => {
                                if (draggedRef.current || active) return
                                selectProject(idx)
                            }}
                            className={`invisible absolute left-0 top-0 overflow-hidden rounded-[22px] bg-[#10130f] shadow-[0_30px_80px_rgba(0,0,0,0.55)] will-change-transform ${active ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                        >
                            <img
                                src={project.imgSrc}
                                alt={active ? project.title : ''}
                                loading={idx < 2 ? 'eager' : 'lazy'}
                                decoding="async"
                                draggable={false}
                                className="absolute inset-0 h-full w-full select-none object-contain object-center"
                            />
                            <div ref={(el) => { dimRefs.current[idx] = el }} className="pointer-events-none absolute inset-0 bg-[#080a08] opacity-0" />
                        </div>
                    )
                })}

                <div
                    ref={copyRef}
                    className="pointer-events-none absolute left-[6vw] right-[6vw] top-[8svh] z-30 text-left text-[#f7efdc] md:left-[5vw] md:right-auto md:top-[17svh] md:w-[20vw]"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#d5bd87] sm:text-xs">
                        Virtuaze / Project applications
                    </span>
                    <h2
                        className="mt-2 max-w-[700px] text-3xl font-medium uppercase leading-[1.04] sm:text-4xl md:text-5xl"
                        style={{ fontFamily: 'var(--font-decart)' }}
                    >
                        One digital twin for every kind of project.
                    </h2>
                </div>

                <div
                    ref={detailsRef}
                    className="pointer-events-none absolute bottom-[15svh] left-[6vw] z-30 w-[88vw] text-[#f7efdc] md:bottom-[13svh] md:left-[5vw] md:w-[20vw]"
                >
                    {projectTypes.map((project, idx) => (
                        <div
                            key={project.title}
                            ref={(el) => { detailRefs.current[idx] = el }}
                            aria-hidden={idx !== activeIndex}
                            className={`absolute bottom-0 left-0 right-0 will-change-[transform,opacity,filter] ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#d5bd87] sm:text-xs md:mb-2 md:gap-3">
                                <span className="h-px w-7 bg-[#d5bd87]" />
                                <span>Project type</span>
                                <span className="text-white/55">{String(idx + 1).padStart(2, '0')} / {String(projectTypes.length).padStart(2, '0')}</span>
                            </div>
                            <h3 className="text-2xl uppercase leading-tight sm:text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-decart)' }}>
                                {project.title}
                            </h3>
                            <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-white/75 sm:text-base md:mt-3 md:text-sm">
                                {project.subtitle}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    ref={exploreRef}
                    type="button"
                    onClick={() => selectProject((activeIndex + 1) % projectTypes.length)}
                    className="group absolute bottom-[9svh] right-[6vw] z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/35 bg-black/30 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-[#d5bd87] hover:text-[#f5dfad] md:bottom-[13svh] md:right-[5vw] md:min-h-12 md:px-6 md:text-xs"
                    aria-label="Explore the next project type"
                >
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-4 md:w-4" />
                </button>

                <div ref={marksRef} className="pointer-events-none absolute inset-0 z-40">
                    <div className="pointer-events-auto absolute right-[2vw] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex">
                        <span className="text-[9px] tracking-[0.18em] text-white/65">01</span>
                        <span className="h-8 w-px bg-white/20" />
                        {projectTypes.map((project, idx) => (
                            <button
                                key={project.title}
                                type="button"
                                onClick={() => selectProject(idx)}
                                aria-label={`Show ${project.title}`}
                                aria-current={idx === activeIndex ? 'true' : undefined}
                                className={`group relative h-6 w-6 rounded-full transition-colors ${idx === activeIndex ? 'bg-white/10' : 'hover:bg-white/10'}`}
                            >
                                <span className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'scale-150 bg-[#d5bd87]' : 'bg-white/45 group-hover:bg-white'}`} />
                            </button>
                        ))}
                        <span className="h-8 w-px bg-white/20" />
                        <span className="text-[9px] tracking-[0.18em] text-white/65">06</span>
                    </div>

                    <div className="pointer-events-auto absolute bottom-[2svh] left-1/2 flex -translate-x-1/2 items-center gap-1 md:hidden">
                        {projectTypes.map((project, idx) => (
                            <button
                                key={project.title}
                                type="button"
                                onClick={() => selectProject(idx)}
                                aria-label={`Show ${project.title}`}
                                aria-current={idx === activeIndex ? 'true' : undefined}
                                className={`h-9 min-w-9 rounded-full px-2 text-[8px] tracking-[0.1em] transition-all ${idx === activeIndex ? 'bg-white/10 text-[#d5bd87]' : 'text-white/50'}`}
                            >
                                {String(idx + 1).padStart(2, '0')}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}