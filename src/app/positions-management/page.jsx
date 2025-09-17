'use client'

import React, { useState, useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import classes from '@/assets/css/admin-layout.module.css'
import { useDispatch } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getListPositions } from '@/services/position'
import { Box, Text, Flex, Button, Pagination, Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import TableSkeleton from '@/components/ui/TableSkeleton'
import TablePosition from '@/components/pages/position/TablePosition'
import FormAdjustPosition from '@/components/pages/position/FormAdjustPosition'
import NoData from '@/components/ui/NoData'

const defaultParameter = {
  skip: 0,
  take: 10,
  search: '',
  orderBy: 'name',
  order: 'desc'
}

const OfficePositionPage = () => {
  const { access } = useSelector(state => state.permission)
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  const [loading, setLoading] = useState(true)
  const [positionList, setPositionList] = useState([])
  const [params, setParams] = useState(defaultParameter)
  const [count, setCount] = useState(0)
  const [openModalForm, setOpenModalForm] = useState(false)
  const [detailData, setDetailData] = useState(null)

  const mappingRoute = [
    {
      label: '/',
      route: null
    },
    {
      label: `${t('menu.officePosition')}`,
      route: null
    }
  ]

  const labelTable = [
    {
      label: 'No.',
      width: 30
    },
    {
      label: `${t('position.table.positionName')}`,
      width: 200
    },
    {
      label: `${t('position.table.positionLevel')}`,
      width: 'auto'
    },
    {
      label: `${t('position.table.action')}`,
      width: 65
    },
  ]


  const handleGetPositionList = async () => {
    setLoading(true)
    try {
      const response = await getListPositions(params)
      if (response.success) {
        const defaultLevelPosition = {
          1: `${t('position.level.director')}`,
          2: `${t('position.level.generalManager')}`,
          3: `${t('position.level.manager')}`,
          4: `${t('position.level.staff')}`,
          5: `${t('position.level.nonStaff')}`
        }
        const resData = response.data.data
        const remapData = resData.map((val) => {
          return {
            ...val,
            level: defaultLevelPosition[val.level]
          }
        })
        setPositionList(remapData)
        setCount(response.data.count)
      } else {
        setPositionList([])
        setCount(0)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(updateRoute({ 'data': mappingRoute }))
  }, [dispatch, t])

  useEffect(() => {
    handleGetPositionList()
  }, [params, t])

  const handleCreate = () => {
    const addPermission = access['position']
    const createdPermission = addPermission.find(val => val.alias === 'position.create')
    if (createdPermission !== undefined) {
      return (
        <Button size='xs' leftSection={<IconPlus size={14} />} onClick={() => setOpenModalForm(true)}>
          {t('actionButton.add')}
        </Button>
      )
    }
  }

  const actions = {
    edit: (val) => {
      setOpenModalForm(true)
      setDetailData(val)
    },
    delete: (val) => {
      console.log('delete', val)
    }
  }

  const handleAction = (val, type) => {
    return actions[type](val)
  }

  const onCloseModalForm = () => {
    setOpenModalForm(false)
    setDetailData(null)
  }

  const handleChangePage = (val) => {
    setParams((oldVal) => ({ ...oldVal, ['skip']: (val - 1) * 10 }))
  }

  return (
    <AuthLayout>
      <Box mr={12}>
        <Text className={classes.titleLayout} mb={10}>{t('position.title')}</Text>
        <Box>
          <Flex justify='flex-end' mb={40}>
            {access !== null ? handleCreate() : ''}
          </Flex>
          <Box my={20}>
            {loading ? <TableSkeleton total={3} /> : positionList.length > 0 ? <TablePosition label={labelTable} data={positionList} actionMethod={handleAction} /> : <NoData />}
          </Box>
        </Box>
        <Flex justify='end'>
          <Pagination size='sm' onChange={handleChangePage} total={Math.ceil(count / params.take) || 0} />
        </Flex>
      </Box>
      <Modal
        opened={openModalForm}
        onClose={onCloseModalForm}
        centered
        closeOnClickOutside={false}
        size='lg'
        title={<Text fw='Bold'>{detailData === null ? t('actionButton.add') : t('actionButton.edit')} {`${t('menu.officePosition')}`}</Text>}
        withCloseButton={false}>
        <FormAdjustPosition dataPosition={detailData} onCloseForm={onCloseModalForm} reloadList={handleGetPositionList} />
      </Modal>
    </AuthLayout>
  )
}

export default OfficePositionPage