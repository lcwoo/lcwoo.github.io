import * as THREE from 'three'

/** Y-up humanoid: pivot near chest / upper torso (0 = feet, 1 = head). */
export const DEFAULT_TORSO_HEIGHT = 0.55

export function computeTorsoPivot(bounds, heightRatio = DEFAULT_TORSO_HEIGHT) {
  const center = new THREE.Vector3()
  bounds.getCenter(center)
  const size = new THREE.Vector3()
  bounds.getSize(size)

  return new THREE.Vector3(
    center.x,
    bounds.min.y + size.y * heightRatio,
    center.z
  )
}

export function applyOrbitPivot(viewer, pivot, { cameraPosition } = {}) {
  if (!viewer?.camera) return

  const controls = [
    viewer.perspectiveControls,
    viewer.orthographicControls
  ].filter(Boolean)

  for (const ctrl of controls) {
    if (cameraPosition) {
      ctrl.target.copy(pivot)
      viewer.camera.position.copy(cameraPosition)
    } else {
      const offset = new THREE.Vector3().subVectors(
        viewer.camera.position,
        ctrl.target
      )
      ctrl.target.copy(pivot)
      viewer.camera.position.copy(pivot).add(offset)
    }
    ctrl.update()
  }

  viewer.initialCameraLookAt?.copy?.(pivot)
  viewer.camera.lookAt(pivot)
  viewer.forceRenderNextFrame?.()
}

/** Fit both body height and width, including narrow portrait viewports. */
export function getTorsoFrameDistance(bounds, pivot, fov, aspect) {
  const size = bounds.getSize(new THREE.Vector3())
  const verticalExtent = Math.max(
    bounds.max.y - pivot.y,
    pivot.y - bounds.min.y
  )
  const horizontalExtent = Math.max(
    bounds.max.x - pivot.x,
    pivot.x - bounds.min.x
  )
  const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(fov) / 2)
  const verticalDistance = verticalExtent / tanHalfFov
  const horizontalDistance =
    horizontalExtent / (tanHalfFov * Math.max(aspect, 0.1))
  return (Math.max(verticalDistance, horizontalDistance) + size.z / 2) * 1.15
}

export function frameTorsoCamera(viewer, pivot, bounds) {
  const size = new THREE.Vector3()
  bounds.getSize(size)
  const span = Math.max(size.x, size.y, size.z)
  const distance = getTorsoFrameDistance(
    bounds,
    pivot,
    viewer.camera.fov || 50,
    viewer.camera.aspect || 1
  )

  const cameraPosition = new THREE.Vector3(
    pivot.x,
    pivot.y + size.y * 0.1,
    pivot.z + distance
  )

  applyOrbitPivot(viewer, pivot, { cameraPosition })

  const radius = span * 0.5
  for (const ctrl of [
    viewer.perspectiveControls,
    viewer.orthographicControls
  ].filter(Boolean)) {
    ctrl.minDistance = radius * 0.35
    ctrl.maxDistance = Math.max(radius * 3.2, distance * 1.5)
    ctrl.enablePan = true
    ctrl.update()
  }
}

/**
 * Orbit around torso: compute bounds, set controls.target, frame camera.
 * @returns {THREE.Box3} cached bounds for pivot-height tweaks
 */
export function setupTorsoOrbit(viewer, heightRatio = DEFAULT_TORSO_HEIGHT) {
  const bounds = viewer.splatMesh.computeBoundingBox()
  const pivot = computeTorsoPivot(bounds, heightRatio)
  frameTorsoCamera(viewer, pivot, bounds)
  return bounds
}

export function updateTorsoPivot(viewer, bounds, heightRatio) {
  const pivot = computeTorsoPivot(bounds, heightRatio)
  applyOrbitPivot(viewer, pivot)
}
