import React from 'react';
import styled from 'styled-components';
import LoginFormContainer from 'containers/login/LoginFormContainer';

const LoginPage = () => {
  return (
    <>
      <LoginLayoutWrap>
        <LoginFormContainer></LoginFormContainer>
      </LoginLayoutWrap>
    </>
  );
};

export default LoginPage;

const LoginLayoutWrap = styled.div``;
