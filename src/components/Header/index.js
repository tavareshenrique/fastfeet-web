import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          {/* <img src={logo} alt="GoBarber" /> */}
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Admin FastFeet</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
