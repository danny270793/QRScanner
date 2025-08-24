import { useEffect, useRef, useState, type FC, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QRModal } from '../components/QRModal'
import jsQR from 'jsqr'

export const QRScannerPage: FC = (): ReactNode => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [qrContent, setQrContent] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const processing = useRef<boolean>(false)
  const streamRef = useRef<MediaStream | null>(null)

  const handleBack = (): void => {
    navigate('/')
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
    setQrContent('')
  }

  const stopCamera = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      streamRef.current = null
    }
    processing.current = false
    setIsScanning(false)
  }

  const resetScan = (): void => {
    setError(null)
    stopCamera()
  }

  const handleStartScanningClick = (): void => {
    setError(null)
    setIsScanning(true)
  }

  const processFrame = (): void => {
    if (!processing.current || !videoRef.current || !canvasRef.current) return

    const video: HTMLVideoElement = videoRef.current
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      setTimeout(processFrame, 100)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData: ImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    )

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    })

    if (code) {
      const content: string = code.data
      setQrContent(content)
      setShowModal(true)
      stopCamera() // Stop scanning when QR is detected
      return
    }

    // Continue processing if no QR code found
    setTimeout(processFrame, 100)
  }

  const startCamera = async (): Promise<void> => {
    try {
      if (!videoRef.current) {
        setError(t('errors.videoNotAvailable'))
        return
      }

      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      streamRef.current = stream
      videoRef.current.srcObject = stream
      videoRef.current.play()

      videoRef.current.addEventListener('loadeddata', () => {
        if (!processing.current) {
          processing.current = true
          processFrame()
        }
      })
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError(t('errors.cameraAccess'))
    }
  }

  useEffect(() => {
    if (isScanning) {
      startCamera()
    }
  }, [isScanning])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="px-4 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('scanner.title')}
            </h1>
            <div className="w-11"></div> {/* Spacer for centering */}
          </div>

          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 4h5.01M4 20h5.01M20 4h.01M20 20h.01M12 8h.01M8 12h.01M12 16h.01M16 12h.01"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('scanner.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            {/* Camera View */}
            {!error && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6">
                <div className="relative bg-black aspect-square">
                  {isScanning && (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                        autoPlay
                        style={{ display: 'block' }}
                      />
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Scanning overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-2 border-white rounded-lg w-48 h-48 relative">
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                        </div>
                      </div>
                    </>
                  )}

                  {!isScanning && (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                      <svg
                        className="w-16 h-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-white text-center">
                        {t('scanner.cameraPlaceholder')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!isScanning && !error && (
              <div className="text-center mb-6">
                <button
                  onClick={handleStartScanningClick}
                  className="px-8 py-4 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {t('buttons.startCamera')}
                </button>
              </div>
            )}

            {isScanning && (
              <div className="text-center mb-6">
                <button
                  onClick={stopCamera}
                  className="px-8 py-4 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg bg-red-600 hover:bg-red-700"
                >
                  {t('buttons.stopCamera')}
                </button>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
                    {t('errors.error')}
                  </h3>
                  <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
                  <button
                    onClick={resetScan}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    {t('buttons.tryAgain')}
                  </button>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('scanner.instructions.title')}
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">1.</span>
                  {t('scanner.instructions.step1')}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">2.</span>
                  {t('scanner.instructions.step2')}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">3.</span>
                  {t('scanner.instructions.step3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* QR Result Modal */}
      <QRModal
        isOpen={showModal}
        onClose={handleCloseModal}
        qrContent={qrContent}
      />
    </>
  )
}
