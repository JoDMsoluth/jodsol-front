import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import PropTypes from 'prop-types';

export default function EditorPane({ title, markdown, onChangeInput }) {
  const editor = useRef();
  const codeMirror = useRef();

  const handleChangeMarkdown = useCallback(cm => {
    onChangeInput('markdown', cm.getValue());
  }, []);
  const onChangehandle = useCallback(e => {
    onChangeInput(e.target.name, e.target.value);
  });

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(editor.current, {
      mode: 'markdown',
      theme: 'monokai',
      placeholder: 'write here...',
      lineNumbers: true,
      lineWrapping: true,
    });
    codeMirror.current = cm;
    cm.focus();
    cm.on('change', handleChangeMarkdown);

    if (markdown) {
      cm.setValue(markdown);
    }
    return () => {
      cm.toTextArea();
    };
  }, []);

  return (
    <>
      <PaneWrap autocomplete="off">
        <TitleInput
          type="text"
          name="title"
          value={title}
          maxLength="30"
          onChange={onChangehandle}
          placeholder="title"
        />
        <CodeEditor ref={editor}></CodeEditor>
      </PaneWrap>
    </>
  );
}

EditorPane.propTypes = {
  desc: PropTypes.string,
  title: PropTypes.string,
  markdown: PropTypes.string,
  tags: PropTypes.string,
  onChangeInput: PropTypes.func,
};

const PaneWrap = styled.form`
  background: black;
  flex: 1;
  display: flex;
  flex-direction: column;

  .CodeMirror {
    flex: 1;
  }
  & input {
    border: none;
    outline: none;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9) !important;
    &::placeholder {
      color: rgba(255, 255, 255, 0.75);
    }
    background: ${palette.gray8} !important;
  }
`;
const TitleInput = styled.input`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`;
const CodeEditor = styled.textarea``;
