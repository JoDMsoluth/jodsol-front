import React, { useRef, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { useDispatch } from 'react-redux';
import WritePostOps from './WritePostOps';
import { changeInput, uploadThumbnail } from '../../modules/stores/write';
import { center } from '../../lib/styles/arrage';
import { useRouteMatch } from 'react-router-dom';
import CustomButton from '../../lib/CustomButton';
import WriteSeriesOps from './WriteSeriesOps';

export default function WriteOpsPanel({
  onSubmit,
  toggleOps,
  setToggleOps,
  coverImg,
  tags,
  desc,
}) {
  const imageInput = useRef();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { filter } = match.params;

  useEffect(() => {
    if (toggleOps) {
      window.addEventListener('keydown', escapeKey);
    } else {
      window.removeEventListener('keydown', escapeKey);
    }
    return () => {};
  }, [toggleOps]);

  const escapeKey = e => {
    if (e.key === 'Escape') {
      setToggleOps(false);
    }
  };

  const onChangeInput = useCallback(
    (name, value) => dispatch(changeInput({ name, value })),
    [dispatch],
  );
  const onChangehandle = useCallback(e => {
    onChangeInput(e.target.name, e.target.value);
  });

  const onChangeImage = useCallback(
    e => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, f => {
        imageFormData.append('image', f);
        // 'image'는 서버에서도 같은 네이밍을 씀 / 키-벨류 / ajax에서 사용
      });
      console.log(imageFormData.getAll('image'));
      dispatch(uploadThumbnail({ imageFormData }));
    },
    [coverImg, dispatch],
  );

  const onClickImageUpload = useCallback(
    e => {
      imageInput.current.click();
    },
    [coverImg],
  );
  const onCloseHandle = useCallback(e => {
    setToggleOps(false);
  });
  const WriteOps =
    filter === 'post' ? (
      <WritePostOps tags={tags} onChangeInput={onChangeInput} />
    ) : filter === 'series' ? (
      <WriteSeriesOps />
    ) : filter === 'project' ? (
      // eslint-disable-next-line react/jsx-no-undef
      <WriteProjectOps />
    ) : null;

  return (
    <>
      <WriteOpsWrap encType="multipart/form-data" toggleOps={toggleOps}>
        <FilterWrap>
          <FilterList activeFilter={filter === 'post'}>Post</FilterList>
          <FilterList activeFilter={filter === 'series'}>Series</FilterList>
          <FilterList activeFilter={filter === 'project'}>Project</FilterList>
        </FilterWrap>
        <CommonDesc>
          <ImageWrap onClick={onClickImageUpload}>
            <input
              id="image"
              type="file"
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeImage}
            />
            {coverImg && (
              <Thumbnail
                coverImg={`${process.env.REACT_APP_SERVER_URL}/${coverImg}`}
              />
            )}
            <span>Upload</span>
          </ImageWrap>
          <DescWrap>
            <textarea
              name="desc"
              value={desc}
              rows="5"
              onChange={onChangehandle}
              maxLength="250"
            ></textarea>
          </DescWrap>
        </CommonDesc>
        {WriteOps}
        <ButtonWrap>
          <CloseButton color="lightGray" size="medium" onClick={onCloseHandle}>
            Close
          </CloseButton>
          <PostButton color="lightGray" size="medium" onClick={onSubmit}>
            Post
          </PostButton>
        </ButtonWrap>
      </WriteOpsWrap>
    </>
  );
}

const WriteOpsWrap = styled.form`
position: absolute;
overflow:hidden
  top: 0;
  right: 0;
  background: ${palette.gray2};
  width: 20rem;
  height: 0rem;
  transition: all .5s ease-in;
  border : 2px solid ${palette.gray7}
    ${props =>
      props.toggleOps &&
      css`
        padding: 2rem 1rem;
        height: 25rem;
      `};
`;

const FilterWrap = styled.div`
  height: 2.5rem;
  display: flex;
  background: ${palette.gray2};
  border-left : 1px solid ${palette.gray7}
  color: #495057;
  margin-bottom: 1rem;
  text-align: center;
`;

const FilterList = styled.div`
  border: 1px solid ${palette.gray7};
  border-left: none;
  flex: 1;
  ${center}
  ${props =>
    props.activeFilter &&
    css`
      background: ${palette.gray8};
      color: ${palette.gray2};
    `}
`;
const CommonDesc = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-evenly;
`;

const ImageWrap = styled.div`
  border: 1px dashed ${palette.gray6};
  margin-right: 1rem;
  width: 50%;
  flex: 1;
  position: relative;
  overflow: hidden;
  & > span {
    position: absolute;
    top: 150%;
    right: 50%;
    transform: translateX(50%);
  }
  &:hover {
    border: 2px dashed ${palette.gray7};
    color: ${palette.gray7};
    cursor: pointer;
  }
  &:hover > span {
    top: 50%;
    right: 50%;
    transform: translate(50%, -52%);
    transition: all 0.3s ease-in;
  }
`;
const DescWrap = styled.div`
  flex: 1;
  width: 50%;
  & > textarea {
    width: 100%;
    height: 100%;
    outline: ${palette.gray8};
    outline-style: inset;
  }
`;

const ButtonWrap = styled.div`
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0.2rem;
  height: 2rem;
  font-size: 1rem;
  width: 6rem;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  padding-top: 0.1rem;
  font-weight: 600;
  outline:0;
  border:2px solid ${palette.gray7};
  border-radius:50px;
  transition: all 0.3s ease-in;
  background: ${palette.gray2}
  color: ${palette.gray7}
  &:hover { 
    color : ${palette.gray3}
    background : ${palette.gray7}
  }
`;

const PostButton = styled(CustomButton)`
  position: absolute;
  top: 1.5rem;
  right: 0.2rem;
  width: 6rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover { 
    color : ${palette.gray2}
    background : ${palette.gray8}
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  background: url(${props => props.coverImg});
  background-position: 50% 50%;
  background-size: cover;
`;
