import type { Translation } from '../types'

export const es: Translation = {
  app: {
    title: 'Escáner QR',
    subtitle: 'Escanea códigos QR instantáneamente con tu cámara',
  },
  navigation: {
    back: 'Atrás',
    home: 'Inicio',
  },
  buttons: {
    startScanning: 'Comenzar Escaneo',
    generateQrCode: 'Generar Código QR',
    startCamera: 'Iniciar Cámara',
    stopCamera: 'Detener Cámara',
    tryAgain: 'Intentar de Nuevo',
    generate: 'Generar Código QR',
    generating: 'Generando...',
    download: 'Descargar',
    copy: 'Copiar',
    copyText: 'Copiar Texto',
    openUrl: 'Abrir URL',
    clear: 'Limpiar',
    close: 'Cerrar',
  },
  scanner: {
    title: 'Escáner QR',
    subtitle: 'Apunta tu cámara hacia un código QR para escanearlo',
    instructions: {
      title: 'Cómo Escanear',
      step1: 'Toca "Iniciar Cámara" para activar la cámara de tu dispositivo',
      step2: 'Apunta tu cámara hacia el código QR',
      step3:
        'Mantén firme hasta que el código QR sea detectado automáticamente',
    },
    cameraPlaceholder: 'Toca "Iniciar Cámara" para comenzar a escanear',
  },
  generator: {
    title: 'Generador QR',
    subtitle:
      'Selecciona el tipo e ingresa la información para generar código QR',
    qrTypes: {
      text: 'Texto Simple',
      website: 'URL de Sitio Web',
      email: 'Correo Electrónico',
      contact: 'Tarjeta de Contacto',
      wifi: 'Red WiFi',
    },
    form: {
      label: 'Información a codificar:',
      placeholder: 'Ingresa la información...',
      characterCount: 'caracteres',
      validationError:
        'Por favor ingresa la información requerida para generar el código QR',
      generationError:
        'Error al generar el código QR. Por favor intenta de nuevo.',
      selectType: 'Selecciona el Tipo de Código QR:',
    },
    fields: {
      text: 'Contenido de Texto',
      url: 'URL del Sitio Web',
      email: 'Dirección de Correo',
      subject: 'Asunto del Correo',
      message: 'Mensaje del Correo',
      name: 'Nombre Completo',
      organization: 'Organización',
      phone: 'Número de Teléfono',
      contactEmail: 'Dirección de Correo',
      networkName: 'Nombre de Red (SSID)',
      password: 'Contraseña',
      security: 'Tipo de Seguridad',
      securityWPA: 'WPA/WPA2',
      securityWEP: 'WEP',
      securityOpen: 'Abierta (Sin Contraseña)',
    },
    placeholders: {
      text: 'Ingresa tu contenido de texto...',
      url: 'https://ejemplo.com',
      email: 'usuario@ejemplo.com',
      subject: 'Asunto del correo (opcional)',
      message: 'Mensaje del correo (opcional)',
      name: 'Juan Pérez',
      organization: 'Nombre de la empresa (opcional)',
      phone: '+1234567890',
      contactEmail: 'contacto@ejemplo.com',
      networkName: 'MiRedWiFi',
      password: 'ContraseñaRed',
    },
    result: {
      title: 'Código QR Generado',
      encodedContent: 'Contenido codificado:',
    },
    instructions: {
      title: 'Cómo Usar',
      step1: 'Selecciona el tipo de código QR que quieres crear',
      step2: 'Completa la información requerida para el tipo seleccionado',
      step3:
        'Haz clic en "Generar Código QR" y descarga o comparte tu código QR',
    },
  },
  modal: {
    title: 'Contenido del Código QR',
    scannedContent: 'Contenido Escaneado:',
    copySuccess: '¡Contenido copiado al portapapeles!',
  },
  features: {
    instantDetection: {
      title: 'Detección Instantánea',
      description:
        'Escanea y decodifica rápidamente cualquier código QR con tu cámara',
    },
    securePrivate: {
      title: 'Seguro y Privado',
      description: 'Todo el escaneo ocurre localmente en tu dispositivo',
    },
    copyShare: {
      title: 'Copiar y Compartir',
      description: 'Copia fácilmente el contenido o abre URLs desde códigos QR',
    },
  },
  errors: {
    error: 'Error',
    cameraAccess:
      'No se puede acceder a la cámara. Por favor asegúrate de haber otorgado permisos de cámara.',
    videoNotAvailable: 'Elemento de video no disponible',
    copyFailed: 'Error al copiar al portapapeles',
  },
}
