'use client';

import { Box } from '@mantine/core';
import { DataTable, useDataTableColumns } from 'mantine-datatable';

const DataTableTest = () => {

  const column = [
    {
      accessor: 'id',
    },
    {
      accessor: 'name',
    },
  ]

  return (
    <DataTable
      // provide data
      records={[
        { id: 1, name: 'Joe Biden'},
        // more records...
      ]}
      // define columns
      columns={column}
    />
  );
}

export default DataTableTest