import React from 'react'
import { modals } from '@mantine/modals'
import { ActionIcon, Box, Text } from '@mantine/core'
import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { notificationSuccess, notificationError } from '../Notifications'
import { useTranslation } from 'react-i18next'


export const modalDeleteData = ( title, id, name, functionDelete, reloadData ) => {

  const handleDeleteData = async (id) => {
    try {
      const response = await functionDelete(id)
      if (response) {
        notificationSuccess(`Hapus ${title} berhasil`,  `Data ${title} berhasil dihapus`)
        reloadData()
        modals.closeAll()
      }
    } catch (error) {
      console.log(error)
      notificationError(`Hapus ${title} gagal`, `Data ${title} gagal dihapus`)
    }
  }

  return modals.openConfirmModal({
    centered: 'true',
    closeOnConfirm: false,
    children: (
      <Box>
        <Box ta='center'>
          <ActionIcon variant='transparent' color='red' size={120}>
            <IconAlertTriangleFilled stroke={1.5} size={120} />
          </ActionIcon>
          <Text fw={500} mb={4}>Apakah anda yakin ingin menghapus ? </Text>
          <Text fw='bold' mb={14}>"{name}"</Text>
          <Text fz='xs' c='gray.6' mb={20}>Tolong diperhatikan. data yang sudah di hapus tidak dapat di kembalikan lagi.</Text>
        </Box>
      </Box>
    ),
    labels: { confirm: 'Hapus', cancel: "Batal" },
    confirmProps: { color: 'red' },
    onConfirm: () => handleDeleteData(id),
  })
}
