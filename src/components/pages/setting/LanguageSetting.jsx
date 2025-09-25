'use client'

import React from 'react'
import { Box, Select, Group, Avatar } from '@mantine/core'
import { useLocalStorage, readLocalStorageValue } from '@mantine/hooks'
import { IconCheck } from '@tabler/icons-react'


const LanguageSetting = () => {
  const defaultLanguage = readLocalStorageValue({ key: 'hris-tandeem-language' })
  const [systemLanguage, setSystemLanguage] = useLocalStorage({
    key: 'hris-tandeem-language',
    defaultValue: defaultLanguage,
  })

  const dataLanguage = [
    {
      value: 'id',
      label: 'Indonesia',
      icon: '/assets/img/logo-indo.png'
    },
    {
      value: 'en',
      label: 'English',
      icon: '/assets/img/logo-english.png'
    },
  ]

  const renderDataOption = ({ option, checked }) => {
    return (
      <Group flex='1' gap='sm'>
        {<Avatar size={20} radius="sm" src={option.icon} />}
        {option.label}
        {checked && <IconCheck size="1.3rem" stroke={1.5} style={{ marginInlineStart: 'auto' }} />}
      </Group>
    )
  }

  return (
    <Select
      size='xs'
      value={systemLanguage}
      onChange={setSystemLanguage}
      data={dataLanguage}
      allowDeselect={false}
      renderOption={renderDataOption}
    />
  )
}

export default LanguageSetting