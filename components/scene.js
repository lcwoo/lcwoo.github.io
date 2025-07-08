import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { SceneSpinner, SceneContainer } from './scene-loader'
import { useRouter } from 'next/router'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const Scene = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()
  const [scenePath, setScenePath] = useState('')
  const router = useRouter()

  useEffect(() => {
    setScenePath(`${router.basePath}/sponge-webp.glb`)
  }, [router.basePath])

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      renderer.setSize(scW, scH)
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (!container || !scenePath) return

    const scW = container.clientWidth
    const scH = container.clientHeight

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(scW, scH)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)
    refRenderer.current = renderer

    const scene = new THREE.Scene()

    const target = new THREE.Vector3(0, 3, 0)
    const initialCameraPosition = new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    )

    const scale = scH * 0.007 + 4.8
    const camera = new THREE.OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale,
      0.01,
      50000
    )
    camera.position.copy(initialCameraPosition)
    camera.lookAt(target)

    const ambientLight = new THREE.AmbientLight(0xffe0aa, 3.5)
    scene.add(ambientLight)

    // const spotLight = new THREE.SpotLight(0x64c7ff, 4)
    // spotLight.position.set(10, 20, 10)
    // spotLight.angle = Math.PI / 6
    // spotLight.penumbra = 0.2
    // spotLight.castShadow = true
    // scene.add(spotLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = true
    controls.target = target

    loadGLTFModel(scene, scenePath, {
      receiveShadow: false,
      castShadow: false,
    }).then(() => {
      animate()
      setLoading(false)
    })

    let req = null
    let frame = 0
    const animate = () => {
      req = requestAnimationFrame(animate)

      frame = frame <= 100 ? frame + 1 : frame

      if (frame <= 100) {
        const p = initialCameraPosition
        const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

        camera.position.y = 10
        camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
        camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
        camera.lookAt(target)
      } else {
        controls.update()
      }

      renderer.render(scene, camera)
    }

    return () => {
      cancelAnimationFrame(req)
      renderer.domElement.remove()
      renderer.dispose()
    }
  }, [scenePath])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  return (
    <SceneContainer ref={refContainer}>
      {loading && <SceneSpinner />}
    </SceneContainer>
  )
}

export default Scene
