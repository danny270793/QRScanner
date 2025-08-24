import {
  useState,
  useRef,
  type FC,
  type ReactNode,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import QRCode from 'qrcode'
import {
  QRDataFormatter,
  validateQRData,
  type QRType,
  type QRData,
} from '../utils/qrFormatters'

export const QRGeneratorPage: FC = (): ReactNode => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [selectedType, setSelectedType] = useState<QRType>('text')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('')
  const [qrContent, setQrContent] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  const handleBack = (): void => {
    navigate('/')
  }

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newType = e.target.value as QRType
    setSelectedType(newType)
    setFormData({})
    setQrCodeDataURL('')
    setQrContent('')
    setError(null)
  }

  const handleInputChange =
    (field: string) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ): void => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value,
      }))
      setError(null)
    }

  const generateQRCode = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    // Validate form data
    const validationError = validateQRData(selectedType, formData)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Format data according to QR type
      const qrData = QRDataFormatter.formatData(
        selectedType,
        formData as unknown as QRData
      )
      setQrContent(qrData)

      // Generate QR code as data URL
      const dataURL: string = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })

      setQrCodeDataURL(dataURL)

      // Also draw on canvas for download functionality
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, qrData, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
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
      await navigator.clipboard.writeText(qrContent)
      alert(t('modal.copySuccess'))
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const clearForm = (): void => {
    setFormData({})
    setQrCodeDataURL('')
    setQrContent('')
    setError(null)
  }

  const renderTextForm = (): ReactNode => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
        {t('generator.fields.text')}
      </label>
      <textarea
        value={formData.text || ''}
        onChange={handleInputChange('text')}
        className="w-full h-24 px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl resize-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
        placeholder={t('generator.placeholders.text')}
        maxLength={1000}
      />
    </div>
  )

  const renderWebsiteForm = (): ReactNode => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
        {t('generator.fields.url')}
      </label>
      <input
        type="url"
        value={formData.url || ''}
        onChange={handleInputChange('url')}
        className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
        placeholder={t('generator.placeholders.url')}
      />
    </div>
  )

  const renderEmailForm = (): ReactNode => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.email')}
        </label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={handleInputChange('email')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.email')}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.subject')}
        </label>
        <input
          type="text"
          value={formData.subject || ''}
          onChange={handleInputChange('subject')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.subject')}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.message')}
        </label>
        <textarea
          value={formData.message || ''}
          onChange={handleInputChange('message')}
          className="w-full h-20 px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl resize-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.message')}
        />
      </div>
    </>
  )

  const renderContactForm = (): ReactNode => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.name')}
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={handleInputChange('name')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.name')}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.organization')}
        </label>
        <input
          type="text"
          value={formData.organization || ''}
          onChange={handleInputChange('organization')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.organization')}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.phone')}
        </label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={handleInputChange('phone')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.phone')}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.contactEmail')}
        </label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={handleInputChange('email')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.contactEmail')}
        />
      </div>
    </>
  )

  const renderWiFiForm = (): ReactNode => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.networkName')}
        </label>
        <input
          type="text"
          value={formData.networkName || ''}
          onChange={handleInputChange('networkName')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
          placeholder={t('generator.placeholders.networkName')}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
          {t('generator.fields.security')}
        </label>
        <select
          value={formData.security || 'WPA'}
          onChange={handleInputChange('security')}
          className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200"
        >
          <option value="WPA">{t('generator.fields.securityWPA')}</option>
          <option value="WEP">{t('generator.fields.securityWEP')}</option>
          <option value="nopass">{t('generator.fields.securityOpen')}</option>
        </select>
      </div>
      {formData.security !== 'nopass' && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
            {t('generator.fields.password')}
          </label>
          <input
            type="text"
            value={formData.password || ''}
            onChange={handleInputChange('password')}
            className="w-full px-4 py-3 bg-purple-50/30 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200 placeholder-purple-400 dark:placeholder-purple-500"
            placeholder={t('generator.placeholders.password')}
          />
        </div>
      )}
    </>
  )

  const renderFormByType = (): ReactNode => {
    switch (selectedType) {
      case 'text':
        return renderTextForm()
      case 'website':
        return renderWebsiteForm()
      case 'email':
        return renderEmailForm()
      case 'contact':
        return renderContactForm()
      case 'wifi':
        return renderWiFiForm()
      default:
        return renderTextForm()
    }
  }

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
                  {t('generator.title')}
                </h1>
                <p className="text-purple-700/70 dark:text-purple-300/70 text-base max-w-sm">
                  {t('generator.subtitle')}
                </p>
              </div>

              {/* Right Side - Decorative Element */}
              <div className="flex-shrink-0 ml-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl shadow-lg shadow-purple-500/25 transform rotate-12 flex items-center justify-center">
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
            {/* QR Type Selector */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 p-6 mb-6">
              <label className="block text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
                {t('generator.form.selectType')}
              </label>
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full px-4 py-3 bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white transition-all duration-200"
              >
                <option value="text">{t('generator.qrTypes.text')}</option>
                <option value="website">
                  {t('generator.qrTypes.website')}
                </option>
                <option value="email">{t('generator.qrTypes.email')}</option>
                <option value="contact">
                  {t('generator.qrTypes.contact')}
                </option>
                <option value="wifi">{t('generator.qrTypes.wifi')}</option>
              </select>
            </div>

            {/* Input Form */}
            <form onSubmit={generateQRCode} className="mb-6">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 p-6 mb-6">
                {renderFormByType()}

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-purple-100 dark:border-purple-500/20">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {Object.keys(formData).length > 0
                      ? 'Fields filled'
                      : 'Fill required fields'}
                  </span>
                  {Object.keys(formData).some(key => formData[key]?.trim()) && (
                    <button
                      type="button"
                      onClick={clearForm}
                      className="text-xs text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium transition-colors duration-200"
                    >
                      {t('buttons.clear')}
                    </button>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className={`w-full px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 shadow-xl ${
                  isGenerating
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95'
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
                  <span className="text-red-700 dark:text-red-300 text-sm">
                    {error}
                  </span>
                </div>
              </div>
            )}

            {/* Generated QR Code */}
            {qrCodeDataURL && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 p-8 mb-6">
                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-6 text-center">
                  {t('generator.result.title')}
                </h3>

                {/* QR Code Display */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-100 dark:border-purple-500/30">
                    <img
                      src={qrCodeDataURL}
                      alt="Generated QR Code"
                      className="w-64 h-64 rounded-xl"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={downloadQRCode}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105"
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
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105"
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
                <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-500/30">
                  <p className="text-sm text-purple-800 dark:text-purple-200 font-semibold mb-3">
                    {t('generator.result.encodedContent')}
                  </p>
                  <div className="bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl p-4 max-h-20 overflow-y-auto border border-purple-100 dark:border-purple-500/30">
                    <pre className="text-xs text-purple-900 dark:text-purple-100 whitespace-pre-wrap break-words">
                      {qrContent}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-xl shadow-purple-500/5 border border-purple-100/50 dark:border-purple-500/20 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
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
                  {t('generator.instructions.title')}
                </h4>
              </div>
              <ul className="space-y-4 text-purple-700 dark:text-purple-200">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-sm font-bold rounded-full mr-3 mt-0.5">
                    1
                  </span>
                  <span className="leading-relaxed">
                    {t('generator.instructions.step1')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-500 text-white text-sm font-bold rounded-full mr-3 mt-0.5">
                    2
                  </span>
                  <span className="leading-relaxed">
                    {t('generator.instructions.step2')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-500 text-white text-sm font-bold rounded-full mr-3 mt-0.5">
                    3
                  </span>
                  <span className="leading-relaxed">
                    {t('generator.instructions.step3')}
                  </span>
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
