'use client'

import React, { useState, useEffect } from 'react'
import { Box, Center, Paper, Image, Flex, Text, TextInput, PasswordInput, Button, Anchor } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

const defaultVal = {
  email: '',
  password: ''
}

const formValidation = {
  email: {
    isError: false,
    message: ''
  },
  password: {
    isError: false,
    message: ''
  }
}

const LoginPage = () => {
  const [formData, setFormData] = useState(defaultVal)
  const [ validationForm, setValidationForm ] = useState(formValidation)
  const [hostname, setHostname] = useState('')
  const { width, height } = useViewportSize()
  const { t } = useTranslation('translation')
  const hrisId = '468a907d-b6c0-4dc8-881a-f24cd3e8d83d'
  // const inLmsId = '703c1ee1-2261-43ed-adb1-12359639a523'

  const handleSubmit = (e) => {
    e.preventDefault()
    console.warn('login submit')
  }

  const handleRouteLogin = (host) => {
    let url = ''
    if (host === 'localhost') {
      url = `http://localhost:3001/authentication/account/appId=${hrisId}`
    } else if (host.includes('hris.tandeem.co.id')) {
      url = `https://sso.tandeem.co.id/authentication/account/appId=${hrisId}`
    }
    return url
  }

  useEffect(() => {
    setHostname(window.location.hostname)
  }, [])
  
  const changeWidthCard = width > 768 ? 4.5 : 1

  const handleChangeForm = (name, val) => {
    setFormData((oldVal) => ({ ...oldVal, [name]: val}))
  }


  return (
    <Box>
      <Center maw={width} h={height}>
        <Paper withBorder miw={width / changeWidthCard} p="xl" radius="md" shadow="md">
          <Box ta='center'>
            <Flex justify='center' align='center' mb={8}>
              <Image src='/assets/img/logo-tandeem.png' w='auto' h={height / 10} fit='contain' mb="md" />
            </Flex>
            <Text fw='500' mb={30}>{t('login.title')}</Text>
          </Box>
          <Box mx='auto'>
            <form onSubmit={(e) => {handleSubmit(e)}}>
              <Box mb="md">
                <TextInput
                  name="email"
                  label={t('login.email')}
                  placeholder={t('login.enterEmail')}
                  error={validationForm.email.isError ? `${validationForm.email.message}` : ''}
                  onChange={(e) => handleChangeForm('email', e.target.value)}
                  withAsterisk
                  size='xs'
                />
              </Box>
              <Box mb="md">
                <PasswordInput
                  name="password"
                  label={t('login.password')}
                  placeholder={t('login.enterPassword')}
                  error={validationForm.password.isError ? `${validationForm.password.message}` : ''}
                  onChange={(e) => handleChangeForm('email', e.target.value)}
                  withAsterisk
                  size='xs'
                />
              </Box>
              <Box style={{ margin: '30px 0' }}>
                <Button fullWidth type="submit" size='xs'>{t('login.loginButton')}</Button>
              </Box>
            </form>
            <Box align="center" mt={20} mb={10}>
              <Anchor component="a" href={handleRouteLogin(hostname)} fz={12}>Login dengan SSO</Anchor>
            </Box>
          </Box>
          <Box mt={40} ta='center'>
            <Text fz={12}>Created By:</Text>
            <Box mt={12}>
              <Image src='/assets/img/tandeem-logo.png' h={20} mb={10} fit='contain' />
              <Text fw='500' fz={14}>"PT Teman Digital Bersama"</Text>
            </Box>
          </Box>
        </Paper>
      </Center>
    </Box>
  )
}

export default LoginPage