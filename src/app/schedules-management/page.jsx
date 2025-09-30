'use client'

import React, { useState, useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import classes from '@/assets/css/admin-layout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'
import { getListSchedules } from '@/services/schedule'
import { Box, Text, Flex, Button, Badge } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { useDebouncedCallback } from '@mantine/hooks'

const defaultParameter = {
  skip: 0,
  take: 10,
  search: '',
}

const SchedulePage = () => {
  const { access } = useSelector(state => state.permission)
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  const [loading, setLoading] = useState(true)
  const [schedulesList, setSchedulesList] = useState([])
  const [params, setParams] = useState(defaultParameter)
  const [count, setCount] = useState(0)

  const mappingRoute = [
    {
      label: '/',
      route: null
    },
    {
      label: `${t('menu.schedules')}`,
      route: null
    }
  ]

  const handleGetSchedulesList = useDebouncedCallback(async () => {
    setLoading(true)
    try {
      const response = await getListSchedules(params)
      if (response.success) {
        const resData = response.data.data
        const remapData = resData.map((val) => {
          return val
        })
        setSchedulesList(remapData)
        setCount(response.data.count)
      } else {
        setSchedulesList([])
        setCount(0)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, 300)

  useEffect(() => {
    dispatch(updateRoute({ 'data': mappingRoute }))
  }, [dispatch, t])

  useEffect(() => {
    handleGetSchedulesList()
  }, [params, t])

  const handleChangePage = (val) => {
    setParams((oldVal) => ({ ...oldVal, ['skip']: (val - 1) * 10 }))
  }

  const handleCreate = () => {
    const addPermission = access['schedule']
    const createdPermission = addPermission.find(val => val.alias === 'schedule.create')
    if (createdPermission !== undefined) {
      return (
        <Button size='xs' leftSection={<IconPlus size={14} />} onClick={() => console.log('add ')}>
          {t('actionButton.add')}
        </Button>
      )
    }
  }

  const dataColumn = [
    {
      accessor: 'index',
      title: 'No.',
      width: 10,
      render: (value) => {
        let number = 0
        const currentPage = (params.skip / params.take) + 1
        const indexPage = schedulesList.indexOf(value)
        number = (currentPage - 1) * params.take + indexPage + 1
        return number
      }
    },
    {
      accessor: 'name',
      width: 200,
      title: `${t('schedule.label.scheduleName')}`,
    },
    {
      accessor: 'isActive',
      width: 200,
      title: `${t('schedule.label.scheduleStatus')}`,
      render: (value) => {
        return (
          <Badge color={value.isActive ? 'green' : 'red'} size='xs' tt='capitalize' w={80}>
            {value.isActive ? t('schedule.active') : t('schedule.inactive')}
          </Badge>
        )
      }
    },
    {
      accessor: 'actions',
      title: `${t('schedule.label.action')}`,
      textAlign: 'right',
      width: 70,
      render: (value) => {
        return (
          'action'
        )
      }
    }
  ]

  return (
    <AuthLayout>
      <Box mr={12}>
        <Text className={classes.titleLayout} mb={10}>{t('schedule.title')}</Text>
        <Box>
          <Flex justify='flex-end' mb={40}>
            {access !== null ? handleCreate() : ''}
          </Flex>
          <Box my={20}>
            <DataTable
              height={530}
              scrollAreaProps={{ type: 'never' }}
              withTableBorder
              borderRadius="md"
              shadow="sm"
              striped
              highlightOnHover
              horizontalSpacing="xs"
              verticalSpacing="xs"
              fz="xs"
              records={schedulesList}
              noRecordsText={t('error.noDataFound')}
              columns={dataColumn}
              fetching={loading}
              loaderBackgroundBlur={3}
              totalRecords={count}
              recordsPerPage={params.take}
              page={(params.skip / params.take) + 1}
              onPageChange={(val) => handleChangePage(val)}
            />
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  )
}

export default SchedulePage