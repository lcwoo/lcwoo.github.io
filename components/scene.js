import { useCallback, useEffect, useRef, useState } from 'react'
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d'
import { SceneSpinner, SceneContainer } from './scene-loader'
import SplatControls, {
  DEFAULT_SPLAT_PARAMS,
  applySplatParams
} from './splat-controls'
import {
  setupTorsoOrbit,
  frameTorsoCamera,
  computeTorsoPivot
} from '../lib/splat-orbit'

// SH degree 0 only (the viewer renders at degree 0), ~3.8 MB.
const SPLAT_PATH = '/iron_man.ksplat'

/** Serialize dispose so Strict Mode remount does not stack viewers on one node. */
let disposeChain = Promise.resolve()

async function disposeViewer(viewer) {
  if (!viewer) return
  try {
    viewer.stop?.()
    await viewer.dispose?.()
  } catch (error) {
    if (error?.name !== 'NotFoundError') {
      console.warn('Failed to dispose Gaussian splat viewer:', error)
    }
  }
}

const Scene = () => {
  const refContainer = useRef(null)
  const viewerRef = useRef(null)
  const paramsRef = useRef(DEFAULT_SPLAT_PARAMS)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(false)
  const [ready, setReady] = useState(false)
  const [params, setParams] = useState(DEFAULT_SPLAT_PARAMS)

  paramsRef.current = params

  const handleParamsChange = useCallback(next => {
    setParams(next)
    if (viewerRef.current) {
      applySplatParams(viewerRef.current, next)
    }
  }, [])

  useEffect(() => {
    if (!refContainer.current) return undefined

    let cancelled = false
    let activeViewer = null
    let pendingViewer = null
    let resizeObserver = null
    let resizeFrame = null
    let lastAspect = null

    const boot = async () => {
      await disposeChain

      if (cancelled || !refContainer.current) return null

      const viewer = new GaussianSplats3D.Viewer({
        rootElement: refContainer.current,
        cameraUp: [0, 1, 0],
        initialCameraPosition: [0, 0.55, 2.15],
        initialCameraLookAt: [0, 0.35, 0],
        sphericalHarmonicsDegree: 0,
        sharedMemoryForWorkers: false,
        selfDrivenMode: true,
        useBuiltInControls: true,
        antialiased: true,
        enableOptionalEffects: true
      })

      pendingViewer = viewer

      if (cancelled) {
        await disposeViewer(viewer)
        pendingViewer = null
        return null
      }

      try {
        await viewer.addSplatScene(SPLAT_PATH, {
          progressiveLoad: false,
          showLoadingUI: false,
          onProgress: (percent, _label, status) => {
            if (cancelled) return
            // The library does not export LoaderStatus; 0 = downloading.
            setProgress(
              status === 0
                ? `Loading ${Math.round(percent)}%`
                : 'Preparing scene...'
            )
          }
        })

        if (cancelled) {
          await disposeViewer(viewer)
          pendingViewer = null
          return null
        }

        pendingViewer = null
        const bounds = setupTorsoOrbit(viewer)
        const mount = refContainer.current
        const fitToViewport = () => {
          if (cancelled || !mount || !viewer.camera) return
          const { width, height } = mount.getBoundingClientRect()
          if (!width || !height) return
          const aspect = width / height
          if (lastAspect !== null && Math.abs(aspect - lastAspect) < 0.01)
            return
          lastAspect = aspect
          viewer.camera.aspect = aspect
          viewer.camera.updateProjectionMatrix()
          frameTorsoCamera(viewer, computeTorsoPivot(bounds), bounds)
        }
        fitToViewport()
        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(() => {
            if (resizeFrame !== null) cancelAnimationFrame(resizeFrame)
            resizeFrame = requestAnimationFrame(fitToViewport)
          })
          resizeObserver.observe(mount)
        }
        applySplatParams(viewer, paramsRef.current)
        viewer.start()
        viewerRef.current = viewer
        setLoading(false)
        setReady(true)
        return viewer
      } catch (loadError) {
        resizeObserver?.disconnect()
        if (resizeFrame !== null) cancelAnimationFrame(resizeFrame)
        console.error('Failed to load Gaussian splat scene:', loadError)
        await disposeViewer(viewer)
        pendingViewer = null
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
        return null
      }
    }

    const bootPromise = boot()
      .then(viewer => {
        activeViewer = viewer
      })
      .catch(bootError => {
        console.error('Failed to initialize Gaussian splat viewer:', bootError)
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame)
      setReady(false)
      viewerRef.current = null
      disposeChain = Promise.all([disposeChain, bootPromise])
        .then(async () => {
          const viewer = activeViewer || pendingViewer
          pendingViewer = null
          activeViewer = null
          if (viewer) {
            await disposeViewer(viewer)
          }
        })
        .catch(() => {})
    }
  }, [])

  return (
    <SceneContainer
      controls={
        ready ? (
          <SplatControls params={params} onChange={handleParamsChange} />
        ) : null
      }
    >
      <div
        ref={refContainer}
        className="voxel-dog"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />
      {loading && <SceneSpinner label={progress} />}
      {error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8125rem',
            padding: '24px',
            textAlign: 'center',
            color: '#ff6b6b',
            zIndex: 4,
            pointerEvents: 'none'
          }}
        >
          The 3D scene could not be loaded. Please refresh and try again.
        </div>
      )}
    </SceneContainer>
  )
}

export default Scene
