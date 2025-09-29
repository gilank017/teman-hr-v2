'use client'

import React, { useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import { Box, Paper, Flex, Text, Group } from '@mantine/core'
import classes from '@/assets/css/admin-layout.module.css'
import { useDispatch } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'
import { IconLanguage, IconPalette } from '@tabler/icons-react'
import LanguageSetting from '@/components/pages/setting/LanguageSetting'
import ThemeSetting from '@/components/pages/setting/ThemeSetting'

const SettingPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')

  const defaultMenuSetting = [
    {
      icon: IconLanguage,
      label: `${t('setting.language')}`,
      component: LanguageSetting,
      route: null
    },
    {
      icon: IconPalette,
      label: `${t('setting.theme')}`,
      component: ThemeSetting,
      route: null
    }
  ]

  const mappingRoute = [
    {
      label: '/',
      route: null
    },
    {
      label: `${t('menu.setting')}`,
      route: null
    }
  ]

  useEffect(() => {
    dispatch(updateRoute({ 'data': mappingRoute }))
  }, [dispatch, t])

  const mappingMenuSetting = (dataMenu) => {
    const remapMenu = dataMenu.map((val, index) => {
      return (
        <Paper shadow="sm" radius="md" withBorder mb='md' p='sm' key={index}>
          <Flex justify='space-between' align='center'>
            <Flex gap={10} align='center'>
              <val.icon size="1.3rem" stroke={1.5} />
              <Text fz={13} fw='bold'>{val.label}</Text>
            </Flex>
            <val.component />
          </Flex>
        </Paper>
      )
    })
    return remapMenu
  }
  return (
    <AuthLayout>
      <Box mr={12}>
        <Text className={classes.titleLayout} mb={25}>{t('setting.title')}</Text>
        <Box>
          {mappingMenuSetting(defaultMenuSetting)}
        </Box>
      </Box>
    </AuthLayout>
  )
}

export default SettingPage