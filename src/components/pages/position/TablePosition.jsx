import React from 'react'
import { Table, Badge, Menu, ActionIcon, Center } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const ActionMenu = ({ handleAction, detail }) => {
  const { t } = useTranslation('translation')
  return (
    <Menu width={140} position="bottom-end" withArrow arrowPosition="center">
      <Menu.Target>
        <ActionIcon ml={8} pt={6} variant='transparent' size='xs'>
          <IconDotsVertical stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconPencil stroke={1.5} size={14} />}
          onClick={() => handleAction('edit')}
          fw='600'
          fz={11}
        >
          {t('actionButton.edit')}
        </Menu.Item>
        <Menu.Item
          color='red'
          leftSection={<IconTrash stroke={1.5} size={14} />}
          onClick={() => handleAction('delete')}
          fw='600'
          fz={11}
        >
          {t('actionButton.delete')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

const TablePosition = ({ label, data, actionMethod }) => {
  const mappingTableHead = (data) => data.map((val, index) => {
    return (<Table.Th key={index} width={val.width !== 'auto' ? val.width : ''}>{val.label}</Table.Th>)
  })

  const mappingDataTable = (data) => data.map((val, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{val.name}</Table.Td>
        <Table.Td>{val.level}</Table.Td>
        <Table.Td><ActionMenu handleAction={(type) => actionMethod(val, type)} /></Table.Td>
      </Table.Tr>
    )
  })
  return (
    <Table.ScrollContainer minWidth={1366} type='native'>
      <Table highlightOnHover withTableBorder style={{ fontSize: '12px' }}>
        <Table.Thead>
          <Table.Tr>
            {mappingTableHead(label)}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody style={{ verticalAlign: 'top' }}>
          {mappingDataTable(data)}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default TablePosition