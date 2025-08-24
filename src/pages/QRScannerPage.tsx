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
      <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-50 to-indigo-100 dark:from-gray-800 dark:via-purple-900/20 dark:to-indigo-900/30">
        {/* Modern Header with Side Layout */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-purple-50/30 dark:bg-purple-900/10"></div>

          <div className="relative px-4 pt-6 pb-8">
            <div className="flex items-start justify-between">
              {/* Left Side - Title & Description */}
              <div className="flex-1">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-3 py-2 mb-4 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-500/10 hover:bg-purple-200/70 dark:hover:bg-purple-500/20 rounded-full transition-colors duration-200 border border-purple-200/50 dark:border-purple-500/20"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  {t('navigation.back')}
                </button>

                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                  {t('scanner.title')}
                </h1>
                <p className="text-purple-700/70 dark:text-purple-300/70 text-base max-w-sm">
                  {t('scanner.subtitle')}
                </p>
              </div>

              {/* Right Side - Decorative Element */}
              <div className="flex-shrink-0 ml-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-lg shadow-indigo-500/25 transform rotate-12 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
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
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Floating dots */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            {/* Camera View */}
            {!error && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 overflow-hidden mb-6">
                <div className="relative bg-black aspect-square">
                  {isScanning && (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover rounded-3xl"
                        playsInline
                        muted
                        autoPlay
                        style={{ display: 'block' }}
                      />
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Scanning overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-2 border-white rounded-2xl w-48 h-48 relative shadow-2xl shadow-purple-500/25">
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-400 rounded-tl-2xl"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-pink-400 rounded-tr-2xl"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-400 rounded-bl-2xl"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-400 rounded-br-2xl"></div>

                          {/* Animated scanning line */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </>
                  )}

                  {!isScanning && (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mb-4">
                        <svg
                          className="w-12 h-12 text-purple-300"
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
                      </div>
                      <p className="text-purple-200 text-center font-medium">
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
                  className="px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
                >
                  {t('buttons.startCamera')}
                </button>
              </div>
            )}

            {isScanning && (
              <div className="text-center mb-6">
                <button
                  onClick={stopCamera}
                  className="px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 shadow-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95"
                >
                  {t('buttons.stopCamera')}
                </button>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-pink-50/50 dark:bg-pink-900/10 backdrop-blur-sm border border-pink-200 dark:border-pink-500/30 rounded-3xl p-8 mb-6 shadow-lg shadow-pink-500/10">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-500/20 dark:to-rose-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg
                      className="w-10 h-10 text-pink-600 dark:text-pink-400"
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
                  <h3 className="text-2xl font-bold text-pink-900 dark:text-pink-100 mb-3">
                    {t('errors.error')}
                  </h3>
                  <p className="text-pink-700 dark:text-pink-300 mb-6 text-lg">
                    {error}
                  </p>
                  <button
                    onClick={resetScan}
                    className="px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105"
                  >
                    {t('buttons.tryAgain')}
                  </button>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-xl shadow-purple-500/5 border border-purple-100/50 dark:border-purple-500/20 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-purple-900 dark:text-purple-100">
                  {t('scanner.instructions.title')}
                </h4>
              </div>
              <ul className="space-y-4 text-purple-700 dark:text-purple-200">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-500 text-white text-sm font-bold rounded-full mr-3 mt-0.5">
                    1
                  </span>
                  <span className="leading-relaxed">
                    {t('scanner.instructions.step1')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-sm font-bold rounded-full mr-3 mt-0.5">
                    2
                  </span>
                  <span className="leading-relaxed">
                    {t('scanner.instructions.step2')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-500 text-white text-sm font-bold rounded-full mr-3 mt-0.5">
                    3
                  </span>
                  <span className="leading-relaxed">
                    {t('scanner.instructions.step3')}
                  </span>
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
