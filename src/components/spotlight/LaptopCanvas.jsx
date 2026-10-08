'use client'

import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Laptop } from './Laptop'

/**
 * debug=true swaps in OrbitControls + a wider FOV so you can find the exact
 * camera position / laptop rotation you want, then bake those numbers back
 * into the defaults below and turn debug off.
 *
 * The laptop mounts directly at its final pose (position/rotation/scale
 * below) and stays there — there's no scroll-driven settle/turn/scale
 * animation anymore, matching the reference where the laptop is simply
 * revealed at a fixed angle as the page scrolls past it.
 *
 * NOTE: <Environment preset="city" /> is intentionally left out. On
 * constrained/sandboxed GPUs its HDRI + PMREM generation was enough to
 * trigger "THREE.WebGLRenderer: Context Lost." right after the model
 * finished loading. If you want environment lighting back, reintroduce it
 * carefully:
 *   <Environment preset="city" resolution={64} background={false} />
 * and re-test on the lowest-spec machine you support before shipping it.
 *
 * GPU safety: the browser blocks WebGL for a page after repeated context
 * losses ("Web page caused context loss and was blocked"). So the canvas is
 * only created once the stage is near the viewport, stops rendering while
 * off-screen, caps the pixel ratio, and skips itself entirely (instead of
 * throwing) when WebGL isn't available.
 */
export function LaptopCanvas({ onReady, debug = false }) {
  const wrapRef = useRef(null)
  const [webgl, setWebgl] = useState(null) // null = not checked yet
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setMounted(true)
          setWebgl((prev) => (prev === null ? isWebGLAvailable() : prev))
        }
      },
      { rootMargin: '100% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      {mounted && webgl ? (
        <CanvasErrorBoundary>
          <Canvas
            dpr={[1, 1.5]}
            frameloop={visible ? 'always' : 'never'}
            gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
            camera={{ position: [0, 0.35, 4.0], fov: 28 }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 5, 4]} intensity={1.5} />
            <directionalLight position={[-4, 2, -3]} intensity={0.35} />

            <Suspense fallback={null}>
              <ResponsiveLaptop onReady={onReady} />
            </Suspense>

            <ContactShadows
              position={[0, -1.05, 0]}
              opacity={0.45}
              blur={2.6}
              far={2.2}
              scale={6}
              resolution={256}
            />

            {debug ? <OrbitControls makeDefault /> : null}
          </Canvas>
        </CanvasErrorBoundary>
      ) : null}
    </div>
  )
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}

// If the renderer still fails to start, drop the laptop instead of taking
// the rest of the page down with it.
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('[LaptopCanvas] 3D laptop disabled:', error?.message ?? error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function ResponsiveLaptop({ onReady }) {
  const { size } = useThree()
  const isPhone = size.width < 640

  return (
    <Laptop
      onReady={onReady}
      position={[0, 0, -4]}
      rotation={[0.05, 0, 0]}
      scale={isPhone ? 0.57 : 1.57}
    />
  )
}
