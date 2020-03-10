/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import Container from '~/components/Container';
import Table from '~/components/Table';
import Popover from '~/components/Popover';
import Action from '~/components/Action';

export default function Recipients() {
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState('');

  const searchWord = useSelector(state => state.search.searchWord);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      rowKey: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      rowKey: 'nome',
    },
    {
      title: 'Endereço',
      dataIndex: 'endereco',
      key: 'endereco',
      rowKey: 'endereco',
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
            showView={false}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function fetchRecipients() {
      const response = await api.get('/recipients');

      const recipientsData = response.data.map(recipient => {
        return {
          id: recipient.id,
          nome: recipient.name,
          endereco: recipient.street,
        };
      });

      setData(recipientsData);
    }

    const filteredData = data.filter(element => {
      return (
        element.nome.toLowerCase().includes(searchWord.toLowerCase()) ||
        element.endereco.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (filteredData.length > 0 && searchWord !== '') {
      setData(filteredData);
    } else {
      fetchRecipients();
    }
  }, [searchWord]);

  useEffect(() => {
    async function fetchRecipients() {
      const response = await api.get('/recipients');

      const recipientsData = response.data.map(recipient => {
        return {
          id: recipient.id,
          nome: recipient.name,
          endereco: recipient.street,
        };
      });

      setData(recipientsData);
    }

    fetchRecipients();
  }, []);

  return (
    <Container title="Gerenciando Destinatários">
      <Table key={data.id} data={data} columns={columns} />
    </Container>
  );
}
