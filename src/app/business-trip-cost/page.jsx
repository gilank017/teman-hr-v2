'use client'

import React, { useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import classes from '@/assets/css/admin-layout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'

const BusinessTripCostPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')

  const mappingRoute = [
    {
      label: '/',
      route: null
    },
    {
      label: `${t('businessTripCost.menu')}`,
      route: null
    }
  ]

  useEffect(() => {
    dispatch(updateRoute({ 'data': mappingRoute }))
  }, [dispatch, t])
  return (
    <AuthLayout>
      <div>BusinessTripCostPage</div>
    </AuthLayout>
  )
}

export default BusinessTripCostPage