import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './locales/en.json'
import esTranslations from './locales/es.json'

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('es') ? 'es' : 'en', // Auto-detect Spanish or default to English
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'], // Supported languages
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })

export default i18n
