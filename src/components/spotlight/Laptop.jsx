'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/laptop.glb'

/**
 * Plays all 5 baked clips (lid open + 4 screen tiles) scrubbed against
 * scroll. `onReady` hands back a `setMechProgress(t)` function (t: 0–1)
 * that the parent drives from a ScrollTrigger as the laptop moves through
 * the viewport.
 */
export function Laptop({ onReady, ...props }) {
  const group = useRef(null)

  const { scene, animations } = useGLTF(MODEL_PATH, '/draco/', true)

  const mixer = useMemo(
    () => new THREE.AnimationMixer(scene),
    [scene]
  )

  const actions = useMemo(
    () => animations.map((clip) => mixer.clipAction(clip)),
    [animations, mixer]
  )

  useEffect(() => {
    // Normalize model size and center it
    scene.updateMatrixWorld(true)

    const bounds = new THREE.Box3().setFromObject(scene)
    const center = bounds.getCenter(new THREE.Vector3())
    const size = bounds.getSize(new THREE.Vector3())
    const largestDimension = Math.max(size.x, size.y, size.z)

    if (largestDimension > 0) {
      scene.position.sub(center)
      scene.scale.multiplyScalar(2.8 / largestDimension)
    }

    // Make meshes visible
    scene.traverse((object) => {
      object.visible = true

      if (object instanceof THREE.Mesh) {
        object.frustumCulled = false
      }
    })

    // Prepare all clips for manual scrubbing, starting closed/collapsed.
    actions.forEach((action) => {
      action.reset()
      action.play()
      action.paused = true
      action.time = 0
    })

    mixer.update(0)

    const setMechProgress = (t) => {
      const clamped = THREE.MathUtils.clamp(t, 0, 1)

      actions.forEach((action) => {
        action.time = clamped * action.getClip().duration
      })

      mixer.update(0)
    }

    onReady?.({
      group: group.current,
      setMechProgress,
    })

    return () => {
      actions.forEach((action) => action.stop())
    }
  }, [actions, mixer, scene, onReady])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH, '/draco/', true)