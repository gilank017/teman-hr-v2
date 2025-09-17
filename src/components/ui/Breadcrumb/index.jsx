import React from 'react'
import { useSelector } from 'react-redux'
import { Breadcrumbs, Text, Box } from '@mantine/core'
import { IconChevronRight, IconHome } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const Breadcrumb = () => {
  const navigate = useRouter()
  const routeState = useSelector(state => state.route.data)
  if (routeState.length > 0) {
    const mappingRouteBreadcrumb = (data) => {
      const toPage = (route) => {
        if (route !== null) {
          navigate.push(route, undefined, { shallow: true })
        }
      }
      const remapRoute = data.map((val, index, row) => {
        return (
          <Box
            key={index}
            style={{ color: index ? '#3d3d3d' : ''  }}
            onClick={() => toPage(val.route)}
          >
            {
              val.label === '/' ? <IconHome stroke={1.5} size={18}/> :
              <Text
                fz={14}
                fw={index + 1 === row.length ? '550' : ''}
                c={index + 1 !== row.length ? 'gray.6' : ''}
                style={{
                  cursor: index + 1 === row.length ? 'default' : 'pointer',
                }}
              >
                {val.label}
              </Text>
            }
          </Box>
        )
      })
      return remapRoute
    }

    return (
      <Breadcrumbs separator={<IconChevronRight stroke={1.5} size={18} />} separatorMargin="xs">
        {mappingRouteBreadcrumb(routeState)}
      </Breadcrumbs>
    )
  }
}

export default Breadcrumb