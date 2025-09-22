import React from 'react'
import { Menu, ActionIcon, Tooltip } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconTrash, IconInfoCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const ActionMenuTablePosition = ({ actionMethod }) => {
  const { access } = useSelector(state => state.permission)
  const { t } = useTranslation('translation')

  const permissionState = access['position']
  const updatedPermission = permissionState.find(val => val.alias === 'position.update')
  const deletedPermission = permissionState.find(val => val.alias === 'position.delete')

  const permissionUpdate = (updatedPermission) => {
    if (updatedPermission !== undefined) {
      return (
        <Menu.Item
          leftSection={<IconPencil stroke={1.5} size={14} />}
          onClick={() => actionMethod('edit')}
          fw='600'
          fz={11}
        >
          {t('actionButton.edit')}
        </Menu.Item>
      )
    }
  }

  const permissionDelete = (deletePermission) => {
    if (deletePermission !== undefined) {
      return (
        <Menu.Item
          color='red'
          leftSection={<IconTrash stroke={1.5} size={14} />}
          onClick={() => actionMethod('delete')}
          fw='600'
          fz={11}
        >
          {t('actionButton.delete')}
        </Menu.Item>
      )
    }
  }

  if (updatedPermission === undefined && deletePermission === undefined) {
    return (
      <Tooltip label={t('warning.noAccess')}>
        <ActionIcon ml={10} mt={6} variant='transparent' size='xs'>
          <IconInfoCircle stroke={1.5}/>
        </ActionIcon>
      </Tooltip>
    )
  } else {
    return (
      <Menu width={140} position="bottom-end" withArrow arrowPosition="center">
        <Menu.Target>
          <ActionIcon ml={8} pt={6} variant='transparent' size='xs'>
            <IconDotsVertical stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {permissionUpdate(updatedPermission)}
          {permissionDelete(deletedPermission)}
        </Menu.Dropdown>
      </Menu>
    )
  }
}

export default ActionMenuTablePosition