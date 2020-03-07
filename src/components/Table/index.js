import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Table as TableAntd } from 'antd';

export default function Table({ data, columns }) {
  const dataTable = useMemo(
    () =>
      data.map(d => {
        return {
          ...d,
          id: `#${d.id}`,
        };
      }),
    [data]
  );

  return <TableAntd dataSource={dataTable} columns={columns} rowKey="id" />;
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
