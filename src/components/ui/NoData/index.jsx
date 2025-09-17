import React from 'react'
import { Image, Text, Paper, ThemeIcon, Box } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

const LoadingData = () => {
  const { t } = useTranslation('translation')
  return (
    <Paper shadow="xs" radius="md" withBorder p="xl">
      <Box align='center' my={100}>
        <ThemeIcon variant="light" radius="xl" size={100}>
          <IconDatabaseOff style={{ width: '70%', height: '70%' }} />
        </ThemeIcon>
        <Text fz={16} mt={20} c='gray.5' fw={600}>{t('error.noDataFound')}</Text>
      </Box>
    </Paper>
  )
}

export default LoadingData