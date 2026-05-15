import { useCallback, useEffect, useRef, useState } from 'react'
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d'
import { SceneSpinner, SceneContainer } from './scene-loader'
import SplatControls, {
  DEFAULT_SPLAT_PARAMS,
  applySplatParams
} from './splat-controls'
import { setupTorsoOrbit } from '../lib/splat-orbit'

const SPLAT_PATH = '/iron_man_best.ksplat'

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
          showLoadingUI: false
        })

        if (cancelled) {
          await disposeViewer(viewer)
          pendingViewer = null
          return null
        }

        pendingViewer = null
        setupTorsoOrbit(viewer)
        applySplatParams(viewer, paramsRef.current)
        viewer.start()
        viewerRef.current = viewer
        setLoading(false)
        setReady(true)
        return viewer
      } catch (loadError) {
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

    const bootPromise = boot().then(viewer => {
      activeViewer = viewer
    })

    return () => {
      cancelled = true
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
    <SceneContainer>
      <div
        ref={refContainer}
        className="voxel-dog"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {ready && (
        <SplatControls params={params} onChange={handleParamsChange} />
      )}
      {loading && <SceneSpinner />}
      {error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.76rem',
            color: '#ff6b6b',
            zIndex: 4,
            pointerEvents: 'none'
          }}
        >
          failed to load iron_man_best.ksplat
        </div>
      )}
    </SceneContainer>
  )
}

export default Scene
