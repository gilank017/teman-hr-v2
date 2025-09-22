'use client'

import React, { useState, useEffect } from 'react'
import { createTheme, MantineProvider, LoadingOverlay } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { readLocalStorageValue, useHotkeys } from '@mantine/hooks'
import { useDispatch } from 'react-redux'
import { sessionUser } from '@/lib/features/authLogin'
import { getPermission } from '@/lib/features/authPermission'

// // css mantine
// import '@mantine/core/styles.layer.css'
// import '@mantine/notifications/styles.css'
// import '@mantine/dates/styles.css'
// import 'mantine-datatable/styles.layer.css'
// import '@/assets/css/table-mantine.css'


const ProvideUI = ({ children }) => {
  const dispatch = useDispatch()
  const themeValue = readLocalStorageValue({ key: 'hris-tandeem-theme' })
  const [colorTheme, setColorTheme] = useState(themeValue ? themeValue : 'dark')

  useEffect(() => {
    dispatch(sessionUser())
    dispatch(getPermission())
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('hris-tandeem-theme', colorTheme)
  }, [])

  const styleUI = createTheme({
    // primaryColor: 'green',
    // colors: {
    //   'green': defaultPrimaryColor
    // },
  })

  const handleChangeTheme = (theme) => {
    const themes = theme === 'dark' ? 'light' : 'dark'
    setColorTheme((current) => current === 'dark' ? 'light' : 'dark')
    localStorage.setItem('hris-tandeem-theme', themes)
  }

  // shortcut hotkeys theme
  useHotkeys([
    ['mod+J', () => handleChangeTheme(colorTheme)]
  ])

  return (
    <MantineProvider defaultColorScheme={colorTheme} theme={styleUI} withGlobalStyles withNormalizeCSS>
      <LoadingOverlay visible={false} zIndex={1000} overlayProps={{ radius: "md", blur: 3 }} />
      <Notifications autoClose={4000} position="top-right" limit={5} />
      <ModalsProvider>
        {children}
      </ModalsProvider>
    </MantineProvider>
  )
}

export default ProvideUI