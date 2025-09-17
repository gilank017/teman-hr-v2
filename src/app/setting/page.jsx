'use client'

import React, { useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import { useDispatch } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'

const SettingPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')

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
  return (
    <AuthLayout>
      <div>Ini Halaman Setting</div>
    </AuthLayout>
  )
}

export default SettingPage