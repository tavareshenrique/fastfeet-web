import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';

import { signOut } from '~/store/modules/auth/actions';

import Menu from '~/components/Menu';

import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Logo, Profile, ButtonLink } from './styles';

function Header({ location }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleSignOut() {
    confirmAlert({
      title: 'Deseja Sair?',
      message: 'Você realmente deseja sair do sistema?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => dispatch(signOut()),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <nav>
          <a href="/">
            <Logo src={logo} alt="FastFeet" />
          </a>
          <Menu
            page="/orders"
            pathname={location.pathname}
            label="ENCOMENDAS"
          />
          <Menu
            page="/deliverymen"
            pathname={location.pathname}
            label="ENTREGADORES"
          />
          <Menu
            page="/recipients"
            pathname={location.pathname}
            label="DESTINATÁRIOS"
          />
          <Menu
            page="/problems"
            pathname={location.pathname}
            label="PROBLEMAS"
          />
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <ButtonLink type="button" onClick={handleSignOut}>
                Sair
              </ButtonLink>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default withRouter(Header);

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
