import React from 'react';
import styled from 'styled-components';
import font from 'lib/styles/font';
import palette from 'lib/styles/palette';
import arrange from 'lib/styles/arrage';
import 'statics/css/icon.css';
import CustomButton from 'lib/CustomButton';
import { InputSpan, InputContainer } from 'lib/styles/inputStyle';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useCallback } from 'react';
import { adminLogin } from 'modules/stores/utils';

const LoginFormContainer = () => {
  const dispatch = useDispatch();

  const useInput = (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const setter = useCallback(
      e => {
        setValue(e.target.value);
      },
      [value],
    );
    return [value, setter];
  };

  const [id, setId] = useInput('');
  const [password, setPassword] = useInput('');
  const { loginResult } = useSelector(({ utils }) => ({
    loginResult: utils.loginResult,
  }));

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(adminLogin({ id, password }));
    },
    [dispatch, id, password],
  );

  return (
    <>
      <FormWrap>
        <FormTitle>Admin Login</FormTitle>
        <form>
          <InputContainer>
            <InputSpan
              type="text"
              name="id"
              placeholder="ID"
              value={id}
              onChange={setId}
            />
            <i className="fas fa-heading input-icon"></i>
          </InputContainer>
          <InputContainer>
            <InputSpan
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={password}
              onChange={setPassword}
            />
            <i className="fas fa-comment-alt input-icon"></i>
          </InputContainer>
          <StyledCustomButton
            color="lightGray"
            size="medium"
            onClick={onSubmit}
          >
            Send
          </StyledCustomButton>
        </form>
      </FormWrap>
    </>
  );
};

export default LoginFormContainer;

const FormWrap = styled.div`
  ${arrange.center}
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: ${palette.gray2};
`;

const FormTitle = styled.div`
  ${font.normalFont}
  font-size : 2rem;
  margin-bottom 3rem;
`;

const StyledCustomButton = styled(CustomButton)`
  float: right;
  border-color : ${palette.gray4}
  color : ${palette.gray6}
  &:hover {
    border-color : ${palette.gray7}
    color : ${palette.gray8}
    transform : scale(1.1)
  }
`;
