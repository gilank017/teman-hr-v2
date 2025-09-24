'use client'
import React from 'react'
import { Box, NavLink, ThemeIcon, Text } from '@mantine/core'
import { useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import { readLocalStorageValue } from '@mantine/hooks'
import LoadingData from '@/components/ui/LoadingData'
import { useTranslation } from 'react-i18next'
import {
  IconGauge,
  IconFileDollar,
  IconAlignBoxCenterTop,
  IconUsersGroup,
  IconBriefcase,
  IconMapDollar,
  IconFolderDollar,
  IconSettings,
} from "@tabler/icons-react"



const AppSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation('translation')
  const { isLoadingPermission, access } = useSelector(state => state.permission)
  const themeValue = readLocalStorageValue({ key: 'hris-tandeem-theme' })


  const menuSidebar = [
    {
      href:'/dashboard',
      label:'dashboard',
      title:`${t('menu.dashboard')}`,
      type: 'route',
      icon: <IconGauge stroke={1.5} size={18} />
    },
    {
      href: null,
      label: 'company',
      title: `${t('menu.company')}`,
      type: 'title',
      icon: null
    },
    {
      href: '/expenditure-types',
      label: 'expend-type',
      title: `${t('menu.expendType')}`,
      type: 'route',
      icon: <IconFileDollar stroke={1.5} size={18} />,
    },
    {
      href: '/announcement-category',
      label: 'announcement-category',
      title: `${t('menu.announcementCategory')}`,
      type: 'route',
      icon: <IconAlignBoxCenterTop stroke={1.5} size={18} />,
    },
    {
      href: '/departments-management',
      label: 'department',
      title: `${t('menu.department')}`,
      type: 'route',
      icon: <IconUsersGroup stroke={1.5} size={18} />,
    },
    {
      href: '/positions-management',
      label: 'position',
      title: `${t('menu.officePosition')}`,
      type: 'route',
      icon: <IconBriefcase stroke={1.5} size={18} />,
    },
    {
      href: null,
      label: 'business-trip',
      title: `${t('menu.businessTrip')}`,
      type: 'title',
      icon: null
    },
    {
      href: '/business-trip-purpose',
      label: 'business-trip-purpose',
      title: `${t('menu.businessTripPurpose')}`,
      type: 'route',
      icon: <IconFolderDollar stroke={1.5} size={18} />,
    },
    {
      href: '/business-trip-cost',
      label: 'business-trip-cost',
      title: `${t('menu.businessTripCost')}`,
      type: 'route',
      icon: <IconMapDollar stroke={1.5} size={18} />,
    },
    {
      href: null,
      label: 'config',
      title: `${t('menu.config')}`,
      type: 'title',
      icon: null
    },
    {
      href: '/setting',
      label: 'setting',
      title: `${t('menu.setting')}`,
      type: 'route',
      icon: <IconSettings stroke={1.5} size={18} />
    }
  ]

  const handleRouteUpdate = (url) => {
    router.push(url, undefined, { shallow: true })
  };

  const mappingMenuSidebar = (menuPermission) => {
    if (menuPermission !== null) {
      const dataRoute = menuSidebar
      const renderMenu = dataRoute.map(({ href, label, title, type, icon }, index) => {
        let returnRender = null
        const dataPermission = Object.keys(menuPermission)
        dataPermission.push('dashboard')
        dataPermission.push('setting')
        dataPermission.push('company')
        dataPermission.push('business-trip')
        dataPermission.push('config')

        const isAllowed = dataPermission.includes(label)
        if (type === 'route') {
          returnRender = (
            <NavLink
              key={index}
              label={
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: '13px',
                    color: href === pathname ? '' : 'rgb(174, 176, 179)', 
                    fontWeight: href === pathname ? '600' : '',
                  }}
                >
                  {title}
                </span>
              }
              leftSection={<ThemeIcon color={href === pathname ? '' : 'gray.5'} variant='light' radius="md" size="md">{icon}</ThemeIcon>}
              active={href === pathname || undefined}
              mb={8}
              onClick={() => handleRouteUpdate(href)}
              style={{ fontWeight: href === pathname ? '500' : '' }}
              color={themeValue === 'dark' ? 'gray' : 'blue'}
            />
          )
        } else if (type === 'title') {
          returnRender = (
            <Text fz='xs' fw='bold' c='gray.5' tt='uppercase' ml={14} my={12} key={index} >{title}</Text>
          )
        }

        if (label) {
          if (isAllowed) {
            return returnRender
          } else {
            return null
          }
        }
      })

      return renderMenu
    }
  }

  return (
    <Box p='lg'>
      {isLoadingPermission ? <LoadingData /> : mappingMenuSidebar(access) }
    </Box>
  )
}

export default AppSidebar