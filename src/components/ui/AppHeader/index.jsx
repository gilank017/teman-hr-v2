'use client'

import React from 'react'
import classes from './app-header.module.css'
import { Box, Burger, Flex, Group, Text, Avatar, Menu, Image } from '@mantine/core'

const AppHeader = ({ mobileToggle, desktopToggle }) => {
  return (
    <header className={classes.root}>
      <Box className={classes.sectionHeader}>
        <Group gap='xs' align='center'>
          <Burger onClick={mobileToggle} hiddenFrom='sm' color="blue.6" size='sm' />
          <Burger onClick={desktopToggle} visibleFrom='sm'color="blue.6" size={16} />
          <Image src='/assets/img/tandeem-logo.png' w='auto' h={20} fit='contain' />
        </Group>
        <Box>
          section untuk avatar
        </Box>
      </Box>
    </header>
  )
}

export default AppHeader