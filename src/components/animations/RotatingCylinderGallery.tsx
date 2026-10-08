'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface RotatingCylinderGalleryProps {
  image?: string
  spins?: number
  className?: string
  height?: string
  background?: string
  tiltX?: number
  tiltZ?: number
}

export default function RotatingCylinderGallery({
  image = '/assets/images/cylinder/one.jpg',
  spins = 1,
  className = '',
  height = 'h-[100vh]',
  background = 'bg-white',
  tiltX = -8,
  tiltZ = 20,
}: RotatingCylinderGalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current || !wrapperRef.current) return

    const mount = mountRef.current

    // ---------------- SCENE ----------------
    const scene = new THREE.Scene()

    const width = Math.max(mount.clientWidth, 1)
    const height = Math.max(mount.clientHeight, 1)

    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    )

    camera.position.set(0, 0, 12)

    // ---------------- RENDERER ----------------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    renderer.setSize(width, height)

    renderer.outputColorSpace = THREE.SRGBColorSpace

    mount.appendChild(renderer.domElement)

    // ---------------- GROUP ----------------
    const group = new THREE.Group()

    group.rotation.x = THREE.MathUtils.degToRad(tiltX)
    group.rotation.z = THREE.MathUtils.degToRad(tiltZ)

    scene.add(group)

    // ---------------- CYLINDER ----------------

    // Change these two values to control the size
    const cylinderRadius = 3.2
    const cylinderHeight = 6.5

    const geometry = new THREE.CylinderGeometry(
      cylinderRadius,
      cylinderRadius,
      cylinderHeight,
      64,
      1,
      true
    )

    // ---------------- IMAGE ----------------

    const loader = new THREE.TextureLoader()

    const texture = loader.load(image)

    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const cylinder = new THREE.Mesh(
      geometry,
      material
    )

    group.add(cylinder)

    // ---------------- SCROLL ROTATION ----------------

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,

      start: 'top bottom',
      end: 'bottom top',

      scrub: 0.6,

      onUpdate: (self) => {
        cylinder.rotation.y =
          self.progress *
          Math.PI *
          2 *
          spins
      },
    })

    // ---------------- RENDER LOOP ----------------

    let frameId: number

    const renderFrame = () => {
      renderer.render(scene, camera)

      frameId = requestAnimationFrame(renderFrame)
    }

    renderFrame()

    // ---------------- RESIZE ----------------

    const handleResize = () => {
      if (!mount) return

      const nextWidth = Math.max(mount.clientWidth, 1)
      const nextHeight = Math.max(mount.clientHeight, 1)
      camera.aspect = nextWidth / nextHeight

      camera.updateProjectionMatrix()

      renderer.setSize(nextWidth, nextHeight)
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    // ---------------- CLEANUP ----------------

    return () => {
      cancelAnimationFrame(frameId)

      window.removeEventListener(
        'resize',
        handleResize
      )

      st.kill()

      geometry.dispose()
      material.dispose()
      texture.dispose()

      renderer.dispose()

      if (
        renderer.domElement.parentNode === mount
      ) {
        mount.removeChild(
          renderer.domElement
        )
      }
    }
  }, [
    image,
    spins,
    tiltX,
    tiltZ,
  ])

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${height} ${background} ${className}`}
    >
      <div
        ref={mountRef}
        className="w-full h-full"
      />
    </div>
  )
}