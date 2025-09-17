'use client'

import React, { useEffect } from 'react'
import { Box, AppShell, ScrollArea, Button } from '@mantine/core'
import { useViewportSize, useHeadroom, useDisclosure } from '@mantine/hooks'
import AppHeader from '@/components/ui/AppHeader'
import AppSidebar from '@/components/ui/AppSidebar'
import Breadcrumb from '@/components/ui/Breadcrumb'

const AuthLayout = ({ children }) => {
  const { width } = useViewportSize()
  const pinned = useHeadroom({ fixedAt: 120 })
  const [openSidebarDesktop, { toggle: toggleDesktop }] = useDisclosure(true)
  const [openSidebarMobile, { toggle: toggleMobile }] = useDisclosure(false)
  // const sizeHeader = width  850 ? true : false
  const sizeHeader = width > 850 ? 80 : 130

  return (
    <AppShell
      transitionDuration={700}
      transitionTimingFunction="ease"
      offsetScrollbars={false}
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !openSidebarMobile, desktop: !openSidebarDesktop }
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader mobileToggle={toggleMobile} desktopToggle={toggleDesktop} />
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea}>
          <AppSidebar />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main 
        // style={{ backgroundColor: themeValue !== 'dark' ? '#f7f0f0' : '#2e2e2e', borderRadius: '12px' }}
      >
        <Box my={8} ml={2}>
          <Breadcrumb />
        </Box>
        <Box
          py={12}
          ml={2}
          // style={{ backgroundColor: themeValue !== 'dark' ? '#ffffff' : '#242424', borderRadius: '12px' }}
        >
          { children }
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}

export default AuthLayout