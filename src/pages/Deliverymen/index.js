/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import api from '~/services/api';

import Container from '~/components/Container';
import Table from '~/components/Table';
import Popover from '~/components/Popover';
import Action from '~/components/Action';
import Avatar from '~/components/Avatar';

import { Photo } from './styles';

export default function Deliverymen() {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState('');

  const searchWord = useSelector(state => state.search.searchWord);
  const dataRequest = useSelector(state => state.deliveryman.data);

  useEffect(() => {
    if (dataRequest.data) {
      const deliverymenData = dataRequest.data.map(deliveryman => {
        return {
          id: deliveryman.id,
          foto: deliveryman.avatar || { nameAvatar: deliveryman.name },
          name: deliveryman.name,
          email: deliveryman.email,
        };
      });

      setData(deliverymenData);
    }
  }, [dataRequest]);

  useEffect(() => {
    async function fetchDeliverymen() {
      const response = await api.get('/deliverymen');

      const deliverymenData = response.data.map(deliveryman => {
        return {
          id: deliveryman.id,
          foto: deliveryman.avatar || { nameAvatar: deliveryman.name },
          name: deliveryman.name,
          email: deliveryman.email,
        };
      });

      setData(deliverymenData);
    }

    const filteredData = data.filter(element => {
      return (
        element.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        element.email.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (filteredData.length > 0 && searchWord !== '') {
      setData(filteredData);
    } else {
      fetchDeliverymen();
    }
  }, [searchWord]);

  useEffect(() => {
    async function fetchDeliverymen() {
      const response = await api.get('/deliverymen');

      const deliverymenData = response.data.map(deliveryman => {
        return {
          id: deliveryman.id,
          foto: deliveryman.avatar || { nameAvatar: deliveryman.name },
          name: deliveryman.name,
          email: deliveryman.email,
        };
      });

      setData(deliverymenData);
    }

    fetchDeliverymen();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      rowKey: 'id',
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      rowKey: 'foto',
      render: dataRender => {
        if (!dataRender.nameAvatar) {
          return <Photo src={dataRender.url} alt="Deliveryman" />;
        }

        return <Avatar name={dataRender.nameAvatar} />;
      },
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      rowKey: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      rowKey: 'email',
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
            id={dataRender.id}
            urlParam="deliverymen"
            handleVisibleChange={visible => setCurrentRow(visible)}
            showView={false}
          />
        </div>
      ),
    },
  ];

  return (
    <Container
      title="Gerenciando Entregadores"
      handleAdd={() => history.push('/deliverymen/add')}
    >
      <Table key={data.id} data={data} columns={columns} />
    </Container>
  );
}
