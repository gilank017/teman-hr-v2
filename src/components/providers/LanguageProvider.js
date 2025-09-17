'use client'
import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/plugins/i18n'
import { useLocalStorage, readLocalStorageValue } from '@mantine/hooks'


const LanguageProvider = ({ children }) => {
  const [localeApp, setLocaleApp] = useLocalStorage({
    key: 'hris-tandeem-language',
    defaultValue: readLocalStorageValue({ key: 'hris-tandeem-language' }) ? readLocalStorageValue({ key: 'hris-tandeem-language' }) : 'id'
  })

  const handleChangeLanguage = async (lang) => {
    if (lang && i18n.language !== lang) {
      await i18n.changeLanguage(lang)
      await setLocaleApp(lang)
    }
    return
  }

  useEffect(() => {
    // Any side effects related to language changes can be handled here
    handleChangeLanguage(localeApp)
  }, [localeApp])

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}

export default LanguageProvider