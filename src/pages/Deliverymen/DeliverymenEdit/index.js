import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Row, Col } from 'antd';
import { Form } from '@unform/web';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';

import { deliverymanUpdate } from '~/store/modules/deliveryman/actions';

import api from '~/services/api';

import Input from '~/components/Input';
import AvatarInput from '~/components/AvatarInput';

import {
  Container,
  Content,
  HeaderBar,
  ButtonContainer,
  ButtonText,
  AvatarContainer,
} from './styles';

export default function DeliverymenEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const loading = useSelector(state => state.order.loading);

  const [data, setData] = useState([]);

  const [urlAvatar, setUrlAvatar] = useState('');
  const [isRadomAvatar, setIsRandomAvatar] = useState(false);
  const [nameAvatar, setNameAvatar] = useState('');

  useEffect(() => {
    async function fectDeliveryman() {
      const response = await api.get('/deliverymen', {
        params: {
          id,
        },
      });

      response.data.forEach(deliveryman => {
        setData({
          id: deliveryman.id,
          name: deliveryman.name,
          email: deliveryman.email,
          avatar_id: deliveryman.avatar_id,
          avatar: deliveryman.avatar ? deliveryman.avatar : null,
        });
      });
    }

    fectDeliveryman();
  }, [id]);

  useEffect(() => {
    function showAvatar() {
      if (data.avatar) {
        setUrlAvatar(data.avatar.url);
        setIsRandomAvatar(false);
        setNameAvatar('');
      } else {
        setUrlAvatar('');
        setIsRandomAvatar(true);
        setNameAvatar(data.name);
      }
    }

    showAvatar();
  }, [data]);

  function handleSubmit({ name, email, avatar_id }) {
    let avatarId;

    if (!avatar_id && !data.avatar_id) {
      avatarId = null;
    } else if (avatar_id && !data.avatar_id) {
      avatarId = avatar_id;
    } else if (!avatar_id && data.avatar_id) {
      avatarId = data.avatar_id;
    } else if (avatar_id && data.avatar_id) {
      avatarId = avatar_id;
    }

    dispatch(
      deliverymanUpdate(id, {
        name,
        email,
        avatar_id: avatarId,
      })
    );
  }

  function handleAvatar() {
    setUrlAvatar('');
    setIsRandomAvatar(false);
    setNameAvatar('');
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} initialData={data}>
          <HeaderBar>
            <h1>Alteração de Entregador</h1>

            <ButtonContainer>
              <button
                type="button"
                onClick={() => history.push('/deliverymen')}
              >
                <FaChevronLeft color="#FFF" size={15} /> Voltar
              </button>

              <button type="submit">
                {loading ? (
                  <ButtonText>
                    <BounceLoader size={25} color="#FFF" loading={loading} />
                  </ButtonText>
                ) : (
                  <ButtonText>
                    <FaCheck color="#FFF" size={15} />
                    Salvar
                  </ButtonText>
                )}
              </button>
            </ButtonContainer>
          </HeaderBar>

          <Row>
            <Col span={24}>
              <AvatarContainer>
                <AvatarInput
                  name="avatar_id"
                  nameAvatar={nameAvatar}
                  photo={urlAvatar}
                  randomAvatar={isRadomAvatar}
                  changeAvatar={handleAvatar}
                />
              </AvatarContainer>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Input
                label="Nome"
                name="name"
                type="text"
                placeholder="Ex.: Henrique Tavares"
              />
            </Col>

            <Col span={24}>
              <Input
                label="Email"
                name="email"
                type="text"
                placeholder="Ex.: henrique@gmail.com"
              />
            </Col>
          </Row>
        </Form>
      </Content>
    </Container>
  );
}
