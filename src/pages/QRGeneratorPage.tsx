import { useState, useRef, type FC, type ReactNode, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import QRCode from 'qrcode'

export const QRGeneratorPage: FC = (): ReactNode => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const [inputText, setInputText] = useState<string>('')
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  const handleBack = (): void => {
    navigate('/')
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(e.target.value)
    setError(null)
  }

  const generateQRCode = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    if (!inputText.trim()) {
      setError(t('generator.form.validationError'))
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generate QR code as data URL
      const dataURL: string = await QRCode.toDataURL(inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      setQrCodeDataURL(dataURL)

      // Also draw on canvas for download functionality
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, inputText, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
      }
    } catch (err) {
      console.error('Error generating QR code:', err)
      setError(t('generator.form.generationError'))
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = (): void => {
    if (canvasRef.current && downloadLinkRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current
      const dataURL: string = canvas.toDataURL('image/png')
      
      downloadLinkRef.current.href = dataURL
      downloadLinkRef.current.download = 'qrcode.png'
      downloadLinkRef.current.click()
    }
  }

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(inputText)
      alert(t('modal.copySuccess'))
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const clearForm = (): void => {
    setInputText('')
    setQrCodeDataURL('')
    setError(null)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              {t('generator.title')}
            </h1>

            <div className="w-11"></div> {/* Spacer for centering */}
          </div>

          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('generator.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            {/* Input Form */}
            <form onSubmit={generateQRCode} className="mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-4">
                <label 
                  htmlFor="qr-input"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('generator.form.label')}
                </label>
                <textarea
                  id="qr-input"
                  value={inputText}
                  onChange={handleInputChange}
                  className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t('generator.form.placeholder')}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {inputText.length}/1000 {t('generator.form.characterCount')}
                  </span>
                  {inputText && (
                    <button
                      type="button"
                      onClick={clearForm}
                      className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      {t('buttons.clear')}
                    </button>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isGenerating}
                className={`w-full px-8 py-4 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                  !inputText.trim() || isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105'
                }`}
              >
                {isGenerating ? t('buttons.generating') : t('buttons.generate')}
              </button>
            </form>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
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
                  <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Generated QR Code */}
            {qrCodeDataURL && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {t('generator.result.title')}
                </h3>
                
                {/* QR Code Display */}
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-4 rounded-xl shadow-inner">
                    <img 
                      src={qrCodeDataURL} 
                      alt="Generated QR Code"
                      className="w-64 h-64"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={downloadQRCode}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t('buttons.download')}
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {t('buttons.copyText')}
                  </button>
                </div>

                {/* Text Preview */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {t('generator.result.encodedContent')}
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 max-h-20 overflow-y-auto">
                    <pre className="text-xs text-gray-900 dark:text-white whitespace-pre-wrap break-words">
                      {inputText}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('generator.instructions.title')}
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">1.</span>
                  {t('generator.instructions.step1')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">2.</span>
                  {t('generator.instructions.step2')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">3.</span>
                  {t('generator.instructions.step3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden elements for functionality */}
      <canvas ref={canvasRef} className="hidden" />
      <a ref={downloadLinkRef} className="hidden" />
    </>
  )
}
