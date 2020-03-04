import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Table as TableAntd } from 'antd';

export default function Table({ children, data }) {
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

  return <TableAntd dataSource={dataTable}>{children}</TableAntd>;
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};
