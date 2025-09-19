import React from 'react'
import { Menu, ActionIcon } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const ActionMenuTablePosition = ({ actionMethod }) => {
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
          onClick={() => actionMethod('edit')}
          fw='600'
          fz={11}
        >
          {t('actionButton.edit')}
        </Menu.Item>
        <Menu.Item
          color='red'
          leftSection={<IconTrash stroke={1.5} size={14} />}
          onClick={() => actionMethod('delete')}
          fw='600'
          fz={11}
        >
          {t('actionButton.delete')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ActionMenuTablePosition