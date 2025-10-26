// components/pdf-viewer.tsx
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <div style={{ height: '750px' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={`${fileUrl}`}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </div>
  )
}

export default PdfViewer
