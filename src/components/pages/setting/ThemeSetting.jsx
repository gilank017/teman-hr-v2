'use client'

import React, { useState } from 'react'
import { useMantineColorScheme, Select } from '@mantine/core'
import { useTranslation } from 'react-i18next'

const ThemeSetting = () => {
  const { t } = useTranslation('translation')
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  })

  const defaultThemeColor = [
    {
      value: 'light',
      label: t('setting.label.themeLight')
    },
    {
      value: 'dark',
      label: t('setting.label.themeDark')
    },
  ]

  const handleChangeTheme = (value) => {
    setColorScheme(value)
    localStorage.setItem('hris-tandeem-theme', value)
  }

  return (
    <Select
      size='xs'
      value={colorScheme}
      onChange={(val) => handleChangeTheme(val)}
      data={defaultThemeColor}
      allowDeselect={false}
    />
  )
}

export default ThemeSetting