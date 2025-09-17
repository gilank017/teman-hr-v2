'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import { readLocalStorageValue } from '@mantine/hooks'

const languageValue = readLocalStorageValue({ key: 'hris-tandeem-language' })

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: languageValue ? languageValue : 'en',
    fallbackLng: languageValue ? languageValue : 'en',
    supportedLngs: ['en', 'id'],
    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // Detection settings
    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Cache language
      caches: ['localStorage'],
      // Optional: exclude certain detection methods
      excludeCacheFor: ['cimode'],
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n