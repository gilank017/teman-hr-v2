import React from 'react'
import { Table, Skeleton } from '@mantine/core'

const TableSkeleton = ({ total }) => {
  const mappingTotalTableHead = (number) => Array.from({ length: number }, (_, i) => {
    return (<Table.Th key={i}><Skeleton h={14}/> </Table.Th>)
  })

  const mappingTotalColumn = (number) => Array.from({ length: number }, (_, i) => {
    return (<Table.Td key={i}><Skeleton h={10}/> </Table.Td>)
  })

  const mappingTotalTableBody = (number) => Array.from({ length: number }, (_,i) => {
    return (
      <Table.Tr key={i}>
        {mappingTotalColumn(total)}
      </Table.Tr>
    )
  })
  return (
    <Table.ScrollContainer minWidth={768}>
      <Table horizontalSpacing='md' verticalSpacing='sm' withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {mappingTotalTableHead(total)}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mappingTotalTableBody(10)}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default TableSkeleton