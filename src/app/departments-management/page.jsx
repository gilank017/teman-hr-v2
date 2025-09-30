'use client'

import React, { useState, useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import classes from '@/assets/css/admin-layout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'
import { getListDepartments } from '@/services/department'
import { Box, Text, Flex, Button } from '@mantine/core'
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

const DepartmentPage = () => {
  const { access } = useSelector(state => state.permission)
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  const [loading, setLoading] = useState(true)
  const [departmentList, setDepartmentList] = useState([])
  const [params, setParams] = useState(defaultParameter)
  const [count, setCount] = useState(0)

  const mappingRoute = [
    {
      label: '/',
      route: null
    },
    {
      label: `${t('menu.department')}`,
      route: null
    }
  ]

  const handleGetDepartmentList = useDebouncedCallback(async () => {
    setLoading(true)
    try {
      const response = await getListDepartments(params)
      if (response.success) {
        const resData = response.data.data
        const remapData = resData.map((val) => {
          return val
        })
        setDepartmentList(remapData)
        setCount(response.data.count)
      } else {
        setDepartmentList([])
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
    handleGetDepartmentList()
  }, [params, t])

  const handleChangePage = (val) => {
    setParams((oldVal) => ({ ...oldVal, ['skip']: (val - 1) * 10 }))
  }

  const handleCreate = () => {
    const addPermission = access['department']
    const createdPermission = addPermission.find(val => val.alias === 'department.create')
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
        const indexPage = departmentList.indexOf(value)
        number = (currentPage - 1) * params.take + indexPage + 1
        return number
      }
    },
    {
      accessor: 'name',
      width: 200,
      title: `${t('department.label.departmentName')}`,
    },
    {
      accessor: 'leader',
      width: 200,
      title: `${t('department.label.departmentLeader')}`,
      render: (value) => value.leader !== null ? value.leader.fullName : '-',
    },
    {
      accessor: 'actions',
      title: `${t('department.label.action')}`,
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
        <Text className={classes.titleLayout} mb={10}>{t('department.title')}</Text>
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
              records={departmentList}
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

export default DepartmentPage