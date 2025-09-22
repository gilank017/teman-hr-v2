'use client'

import React, { useState, useEffect } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import classes from '@/assets/css/admin-layout.module.css'
import { useDispatch } from 'react-redux'
import { updateRoute } from '@/lib/features/hookRoute'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getListPositions, deletePosition } from '@/services/position'
import { Box, Text, Flex, Button, Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import ActionMenuTablePosition from '@/components/pages/position/ActionMenuTablePosition'
import FormAdjustPosition from '@/components/pages/position/FormAdjustPosition'
import { modalDeleteData } from '@/components/ui/Prompt/modalDeleteData'
import { useDebouncedCallback } from '@mantine/hooks'

const defaultParameter = {
  skip: 0,
  take: 10,
  search: '',
  orderBy: 'name',
  order: 'desc'
}

const PositionPage = () => {
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

  const handleGetPositionList = useDebouncedCallback(async () => {
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
  }, 300)


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
      modalDeleteData(`${t('menu.officePosition')}`, val.id, val.name, deletePosition, handleGetPositionList)
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

  const dataColumn = [
    {
      accessor: 'index',
      title: 'No.',
      width: 50,
      render: (value) => positionList.indexOf(value) + 1
    },
    {
      accessor: 'name',
      width: 200,
      title: `${t('position.table.positionName')}`,
    },
    {
      accessor: 'level',
      title: `${t('position.table.positionLevel')}`,
    },
    {
      accessor: 'actions',
      title: `${t('position.table.action')}`,
      textAlign: 'center',
      width: 70,
      render: (value) => {
        return (
          <ActionMenuTablePosition
            actionMethod={(type) => handleAction(value, type)}
          />
        )
      }
    }
  ]

  return (
    <AuthLayout>
      <Box mr={12}>
        <Text className={classes.titleLayout} mb={10}>{t('position.title')}</Text>
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
              records={positionList}
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

export default PositionPage