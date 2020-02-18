import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import font from '../../../lib/styles/font';
import palette from '../../../lib/styles/palette';
import { InputSpan, InputContainer } from '../../../lib/styles/inputStyle';
import '../../../statics/css/icon.css';
import CustomButton from '../../../lib/CustomButton';
import arrange from '../../../lib/styles/arrage';
import { useDispatch } from 'react-redux';
import { sendMail } from '../../../modules/stores/utils';

export default function ContactForm({ mailResult }) {
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
  const dispatch = useDispatch();
  const [name, setName] = useInput('');
  const [from, setFrom] = useInput('');
  const [subject, setSubject] = useInput('');
  const [content, setContent] = useInput('');

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(sendMail({ name, from, subject, content }));
      console.log(name, 'Dsf');
    },
    [dispatch, name, from, subject, content],
  );

  return (
    <FormWrap>
      <FormTitle>Send me a mail</FormTitle>
      <form action="action_page.php">
        <InputContainer>
          <InputSpan
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={setName}
          />
          <i className="fas fa-user input-icon"></i>
        </InputContainer>
        <InputContainer>
          <InputSpan
            type="text"
            name="email"
            placeholder="Email address"
            value={from}
            onChange={setFrom}
          />
          <i className="fas fa-envelope input-icon"></i>
        </InputContainer>
        <InputContainer>
          <InputSpan
            type="text"
            name="subject"
            placeholder="Message title"
            value={subject}
            onChange={setSubject}
          />
          <i className="fas fa-heading input-icon"></i>
        </InputContainer>
        <InputContainer>
          <InputSpan
            type="text"
            name="content"
            placeholder="Write your message"
            value={content}
            onChange={setContent}
          />
          <i className="fas fa-comment-alt input-icon"></i>
        </InputContainer>
        <StyledCustomButton color="lightGray" size="medium" onClick={onSubmit}>
          Send
        </StyledCustomButton>
      </form>
    </FormWrap>
  );
}
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
