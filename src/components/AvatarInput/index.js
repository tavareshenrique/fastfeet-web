import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import Avatar from '~/components/Avatar';

import api from '~/services/api';

import photoImg from '~/assets/addphoto.png';

import { Container } from './styles';

export default function AvatarInput({
  photo,
  randomAvatar,
  nameAvatar,
  changeAvatar,
}) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    changeAvatar();
  }

  const profilePhoto = useMemo(() => photo || photoImg, [photo]);

  return (
    <Container>
      <label htmlFor="avatar">
        {!randomAvatar ? (
          <img
            src={preview || profilePhoto}
            alt="Avatar"
            style={{ height: '50px', width: '50px' }}
          />
        ) : (
          <Avatar big name={nameAvatar} />
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

AvatarInput.defaultProps = {
  photo: '',
  randomAvatar: false,
  nameAvatar: '',
  changeAvatar: () => {},
};

AvatarInput.propTypes = {
  photo: PropTypes.string,
  randomAvatar: PropTypes.bool,
  nameAvatar: PropTypes.string,
  changeAvatar: PropTypes.func,
};
