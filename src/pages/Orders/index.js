import React, { useState, useEffect } from 'react';

import { Table as TableAntd } from 'antd';

import api from '~/services/api';

import Container from '~/components/Container';
import Table from '~/components/Table';
import Tag from '~/components/Tag';

const { Column } = TableAntd;

export default function Orders() {
  const [data, setData] = useState([]);

  function orderStatus(order) {
    if (order.canceled_at) {
      return 'CANCELADA';
    }

    if (order.end_date) {
      return 'ENTREGUE';
    }

    if (order.start_date) {
      return 'RETIRADA';
    }

    return 'PENDENTE';
  }

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get('/orders');

      const ordersData = response.data.map(order => {
        return {
          id: order.id,
          destinatario: order.recipient.name,
          entregador: order.deliveryman.name,
          cidade: order.recipient.street,
          estado: order.recipient.state,
          status: orderStatus(order),
        };
      });

      setData(ordersData);
    }

    fetchOrders();
  }, []);

  return (
    <Container title="Gerenciando Encomenda">
      <Table data={data}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Destinatário"
          dataIndex="destinatario"
          key="destinatario"
        />
        <Column title="Entregador" dataIndex="entregador" key="entregador" />
        <Column title="Cidade" dataIndex="cidade" key="cidade" />
        <Column title="Estado" dataIndex="estado" key="estado" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={status => (
            <span>
              <Tag status={status} />
            </span>
          )}
        />
      </Table>
    </Container>
  );
}
