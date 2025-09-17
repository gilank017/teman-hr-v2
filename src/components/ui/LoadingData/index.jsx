import React from 'react'
import { Center, Loader } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'

const LoadingData = () => {
  const { height } = useViewportSize()
  return (
    <Center h={height / 1.25}>
      <Loader size='sm' type='bars' />
    </Center>
  )
}

export default LoadingData