export interface TranslationKeys {
  app: {
    title: string
    subtitle: string
  }
  navigation: {
    back: string
    home: string
  }
  buttons: {
    startScanning: string
    generateQrCode: string
    startCamera: string
    stopCamera: string
    tryAgain: string
    generate: string
    generating: string
    download: string
    copy: string
    copyText: string
    openUrl: string
    clear: string
    close: string
  }
  scanner: {
    title: string
    subtitle: string
    instructions: {
      title: string
      step1: string
      step2: string
      step3: string
    }
    cameraPlaceholder: string
  }
  generator: {
    title: string
    subtitle: string
    qrTypes: {
      text: string
      website: string
      email: string
      contact: string
      wifi: string
    }
    form: {
      label: string
      placeholder: string
      characterCount: string
      validationError: string
      generationError: string
      selectType: string
    }
    fields: {
      // Text fields
      text: string
      // Website fields
      url: string
      // Email fields
      email: string
      subject: string
      message: string
      // Contact fields
      name: string
      organization: string
      phone: string
      contactEmail: string
      // WiFi fields
      networkName: string
      password: string
      security: string
      securityWPA: string
      securityWEP: string
      securityOpen: string
    }
    placeholders: {
      text: string
      url: string
      email: string
      subject: string
      message: string
      name: string
      organization: string
      phone: string
      contactEmail: string
      networkName: string
      password: string
    }
    result: {
      title: string
      encodedContent: string
    }
    instructions: {
      title: string
      step1: string
      step2: string
      step3: string
    }
  }
  modal: {
    title: string
    scannedContent: string
    copySuccess: string
  }
  features: {
    instantDetection: {
      title: string
      description: string
    }
    securePrivate: {
      title: string
      description: string
    }
    copyShare: {
      title: string
      description: string
    }
  }
  errors: {
    error: string
    cameraAccess: string
    videoNotAvailable: string
    copyFailed: string
  }
}

export type Translation = TranslationKeys
