'use client'

import React, { useState, useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import classes from '@/assets/css/admin-layout.module.css'
import { useDispatch } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getListAnnouncementCategory } from '@/services/announcement-category'
import { Box, Text, Flex, Button, Badge } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { useDebouncedCallback } from '@mantine/hooks'

const defaultParameter = {
  skip: 0,
  take: 10,
  search: '',
  orderBy: 'name',
  order: 'desc'
}

const AnnouncementCategoryPage = () => {
  const { access } = useSelector(state => state.permission)
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  const [loading, setLoading] = useState(true)
  const [announcementCategoryList, setAnnouncementCategoryList] = useState([])
  const [params, setParams] = useState(defaultParameter)
  const [count, setCount] = useState(0)

  const mappingRoute = [
    {
      label: '/',
      route: null
    },
    {
      label: `${t('menu.announcementCategory')}`,
      route: null
    }
  ]

    const handleGetAnnouncementCategoryList = useDebouncedCallback(async () => {
    setLoading(true)
    try {
      const response = await getListAnnouncementCategory(params)
      if (response.success) {
        const resData = response.data.data
        const remapData = resData.map((val) => {
          return val
        })
        setAnnouncementCategoryList(remapData)
        setCount(response.data.count)
      } else {
        setAnnouncementCategoryList([])
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
    handleGetAnnouncementCategoryList()
  }, [params, t])

  const handleChangePage = (val) => {
    setParams((oldVal) => ({ ...oldVal, ['skip']: (val - 1) * 10 }))
  }

  const handleCreate = () => {
    const addPermission = access['announcement-category']
    const createdPermission = addPermission.find(val => val.alias === 'announcement-category.create')
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
      render: (value) => announcementCategoryList.indexOf(value) + 1
    },
    {
      accessor: 'name',
      width: 200,
      title: `${t('announcementCategory.table.categoryName')}`,
    },
    {
      accessor: 'isActive',
      width: 200,
      title: `${t('announcementCategory.table.categoryStatus')}`,
      render: (value) => {
        return (
          <Badge color={value ? 'green' : 'red'} size='xs' tt='capitalize'>
            {value ? t('announcementCategory.active') : t('announcementCategory.inactive')}
          </Badge>
        )
      }
    },
    {
      accessor: 'actions',
      title: `${t('announcementCategory.table.action')}`,
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
        <Text className={classes.titleLayout} mb={10}>{t('announcementCategory.title')}</Text>
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
              records={announcementCategoryList}
              noRecordsText={t('error.noDataFound')}
              columns={dataColumn}
              fetching={loading}
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

export default AnnouncementCategoryPage