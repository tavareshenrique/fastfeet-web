/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Modal from 'react-responsive-modal';

import api from '~/services/api';

import Container from '~/components/Container';
import Table from '~/components/Table';
import Popover from '~/components/Popover';
import Action from '~/components/Action';

export default function Problems() {
  const [data, setData] = useState([]);
  const [dataRow, setDataRow] = useState([]);
  const [currentRow, setCurrentRow] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const searchWord = useSelector(state => state.search.searchWord);
  const dataRequest = useSelector(state => state.deliveryproblem.data);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      rowKey: 'id',
    },
    {
      title: 'Problema',
      dataIndex: 'problema',
      key: 'problema',
      rowKey: 'problema',
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
            showEdit={false}
            urlParam="problems"
            labelDelete="Cancelar Encomenda"
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

  useEffect(() => {
    if (dataRequest.data) {
      const problemsData = dataRequest.data.map(problem => {
        return {
          id: problem.id,
          problema: problem.description,
        };
      });

      setData(problemsData);
    }
  }, [dataRequest]);

  useEffect(() => {
    async function fetchProblems() {
      const response = await api.get('/delivery/problems');

      const problemsData = response.data.map(problem => {
        return {
          id: problem.id,
          problema: problem.description,
        };
      });

      setData(problemsData);
    }

    const filteredData = data.filter(element => {
      return element.problema.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (filteredData.length > 0 && searchWord !== '') {
      setData(filteredData);
    } else {
      fetchProblems();
    }
  }, [searchWord]);

  useEffect(() => {
    async function fetchProblems() {
      const response = await api.get('/delivery/problems');

      const problemsData = response.data.map(problem => {
        return {
          id: problem.id,
          problema: problem.description,
        };
      });

      setData(problemsData);
    }

    fetchProblems();
  }, []);

  return (
    <>
      <Container title="Problemas na Entrega" showButton={false}>
        <Table key={data.id} data={data} columns={columns} />
      </Container>

      <Modal open={openModal} center onClose={() => setOpenModal(!openModal)}>
        <h3>VISUALIZAR PROBLEMA</h3>
        <p>{dataRow.problema}</p>
      </Modal>
    </>
  );
}
