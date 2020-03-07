import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import Container from '~/components/Container';
import Table from '~/components/Table';
import Tag from '~/components/Tag';
import Popover from '~/components/Popover';

import { Action } from './styles';

export default function Orders() {
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState('');

  const searchWord = useSelector(state => state.search.searchWord);

  const columns = [
    {
      title: 'Entregador',
      dataIndex: 'entregador',
      key: 'entregador',
      rowKey: 'entregador',
    },
    {
      title: 'Cidade',
      dataIndex: 'cidade',
      key: 'cidade',
      rowKey: 'cidade',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      rowKey: 'estado',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      rowKey: 'status',
      render: status => (
        <span>
          <Tag status={status} />
        </span>
      ),
    },
    {
      title: 'Ação',
      key: 'action',
      width: 5,
      rowKey: 'action',
      render: dataRender => (
        <div>
          <Action type="button" onClick={() => setCurrentRow(dataRender.id)}>
            ...
          </Action>

          <Popover
            visible={currentRow === dataRender.id}
            handleVisibleChange={visible => setCurrentRow(visible)}
          />
        </div>
      ),
    },
  ];

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

  useEffect(() => {
    const filteredData = data.filter(element => {
      return element.destinatario
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (filteredData.length > 0 && searchWord !== '') {
      setData(filteredData);
    } else {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container title="Gerenciando Encomenda">
      <Table key={data.id} data={data} columns={columns} />
    </Container>
  );
}
