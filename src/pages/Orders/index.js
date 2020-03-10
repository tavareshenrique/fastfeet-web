/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Modal from 'react-responsive-modal';

import api from '~/services/api';

import Container from '~/components/Container';
import Table from '~/components/Table';
import Tag from '~/components/Tag';
import Popover from '~/components/Popover';
import Action from '~/components/Action';

import { Signature } from './styles';

export default function Orders() {
  const [data, setData] = useState([]);
  const [dataRow, setDataRow] = useState([]);
  const [currentRow, setCurrentRow] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const searchWord = useSelector(state => state.search.searchWord);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      rowKey: 'id',
    },
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
          <Action onClick={() => setCurrentRow(dataRender.id)} />

          <Popover
            visible={currentRow === dataRender.id}
            handleVisibleChange={visible => setCurrentRow(visible)}
            handleViewClick={() => {
              if (!openModal) {
                setOpenModal(!openModal);
                setCurrentRow(false);
                setDataRow(dataRender);
              }
            }}
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

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get('/orders');

      const ordersData = response.data.map(order => {
        return {
          id: order.id,
          destinatario: order.recipient.name,
          entregador: order.deliveryman.name,
          cidade: order.recipient.city,
          rua: order.recipient.street,
          estado: order.recipient.state,
          cep: order.recipient.zipcode,
          status: orderStatus(order),
          retirada: order.start_date
            ? format(new Date(order.start_date), 'dd/MM/yyyy', {
                locale: pt,
              })
            : 'Pendente',
          entrega: order.end_date
            ? format(new Date(order.end_date), 'dd/MM/yyyy', {
                locale: pt,
              })
            : 'Pendente',
          assinatura: order.signature,
        };
      });

      setData(ordersData);
    }

    const filteredData = data.filter(element => {
      return (
        element.destinatario.toLowerCase().includes(searchWord.toLowerCase()) ||
        element.entregador.toLowerCase().includes(searchWord.toLowerCase()) ||
        element.cidade.toLowerCase().includes(searchWord.toLowerCase()) ||
        element.estado.toLowerCase().includes(searchWord.toLowerCase()) ||
        element.status.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (filteredData.length > 0 && searchWord !== '') {
      setData(filteredData);
    } else {
      fetchOrders();
    }
  }, [searchWord]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get('/orders');

      const ordersData = response.data.map(order => {
        return {
          id: order.id,
          destinatario: order.recipient.name,
          entregador: order.deliveryman.name,
          cidade: order.recipient.city,
          rua: order.recipient.street,
          estado: order.recipient.state,
          cep: order.recipient.zipcode,
          status: orderStatus(order),
          retirada: order.start_date
            ? format(new Date(order.start_date), 'dd/MM/yyyy', {
                locale: pt,
              })
            : 'Pendente',
          entrega: order.end_date
            ? format(new Date(order.end_date), 'dd/MM/yyyy', {
                locale: pt,
              })
            : 'Pendente',
          assinatura: order.signature,
        };
      });

      setData(ordersData);
    }

    fetchOrders();
  }, []);

  return (
    <>
      <Container title="Gerenciando Encomenda">
        <Table key={data.id} data={data} columns={columns} />
      </Container>

      <Modal open={openModal} center onClose={() => setOpenModal(!openModal)}>
        <h3>Informações da Encomenda</h3>
        <p>{dataRow.rua}</p>
        <p>
          {dataRow.cidade} - {dataRow.estado}
        </p>
        <p>{dataRow.cep}</p>

        <hr />

        <h3>Datas</h3>

        <p>
          <b>Retirada: </b>
          {dataRow.retirada}
        </p>

        <p>
          <b>Entrega: </b>
          {dataRow.entrega}
        </p>

        <hr />

        <h3>Assinatura do Destinatário</h3>
        {dataRow.assinatura && (
          <Signature>
            <img src={dataRow.assinatura.url} alt="Signature" />
          </Signature>
        )}
      </Modal>
    </>
  );
}
