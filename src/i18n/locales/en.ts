import type { Translation } from '../types'

export const en: Translation = {
  app: {
    title: 'QR Scanner',
    subtitle: 'Scan QR codes instantly with your camera',
  },
  navigation: {
    back: 'Back',
    home: 'Home',
  },
  buttons: {
    startScanning: 'Start Scanning',
    generateQrCode: 'Generate QR Code',
    startCamera: 'Start Camera',
    stopCamera: 'Stop Camera',
    tryAgain: 'Try Again',
    generate: 'Generate QR Code',
    generating: 'Generating...',
    download: 'Download',
    copy: 'Copy',
    copyText: 'Copy Text',
    openUrl: 'Open URL',
    clear: 'Clear',
    close: 'Close',
  },
  scanner: {
    title: 'QR Scanner',
    subtitle: 'Point your camera at a QR code to scan',
    instructions: {
      title: 'How to Scan',
      step1: 'Tap "Start Camera" to activate your device\'s camera',
      step2: 'Point your camera at the QR code',
      step3: 'Hold steady until the QR code is detected automatically',
    },
    cameraPlaceholder: 'Tap "Start Camera" to begin scanning',
  },
  generator: {
    title: 'QR Generator',
    subtitle: 'Enter text or URL to generate QR code',
    form: {
      label: 'Text or URL to encode:',
      placeholder: 'Enter text, URL, phone number, email...',
      characterCount: 'characters',
      validationError: 'Please enter some text to generate QR code',
      generationError: 'Failed to generate QR code. Please try again.',
    },
    result: {
      title: 'Generated QR Code',
      encodedContent: 'Encoded content:',
    },
    instructions: {
      title: 'How to Use',
      step1: 'Enter the text, URL, or data you want to encode',
      step2: 'Click "Generate QR Code" to create the code',
      step3: 'Download the image or copy the text as needed',
    },
  },
  modal: {
    title: 'QR Code Content',
    scannedContent: 'Scanned Content:',
    copySuccess: 'Content copied to clipboard!',
  },
  features: {
    instantDetection: {
      title: 'Instant Detection',
      description: 'Quickly scan and decode any QR code with your camera',
    },
    securePrivate: {
      title: 'Secure & Private',
      description: 'All scanning happens locally on your device',
    },
    copyShare: {
      title: 'Copy & Share',
      description: 'Easily copy content or open URLs from QR codes',
    },
  },
  errors: {
    error: 'Error',
    cameraAccess:
      'Unable to access camera. Please make sure you have given camera permissions.',
    videoNotAvailable: 'Video element not available',
    copyFailed: 'Failed to copy to clipboard',
  },
}
