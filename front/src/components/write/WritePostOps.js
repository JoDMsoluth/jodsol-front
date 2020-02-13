import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import { useDispatch } from 'react-redux';
import { changeInput } from 'modules/stores/write';
import CustomButton from 'lib/CustomButton';
import { useState } from 'react';
import { useEffect } from 'react';

export default function WritePostOps({ tags }) {
  const dispatch = useDispatch();
  const onChangeInput = useCallback(
    (name, value) => dispatch(changeInput({ name, value })),
    [dispatch],
  );
  useEffect(() => {
    setHashTags(tags.match(/#[^\s]+/g));
    return () => {
      setHashTags(null);
    };
  }, [tags]);
  const [hashtags, setHashTags] = useState(null);
  const onChangehandle = useCallback(
    e => {
      onChangeInput(e.target.name, e.target.value);
    },
    [tags],
  );

  return (
    <>
      <PostOpsWrap>
        <CategoryWrap>
          <div>Category</div>
          <div>Study</div>
          <div>Daily</div>
          <div>Game</div>
        </CategoryWrap>
        <TagsWrap>
          <div>Tags</div>
          <input
            name="tags"
            value={tags}
            placeholder="태그를 입력하세요"
            onChange={onChangehandle}
          />
        </TagsWrap>
        {Array.isArray(hashtags) &&
          hashtags.map((tag, i) => (
            <StyledCustomButtom
              key={`${tag}${i}`}
              color="lightGray"
              size="middle"
              inline
              disabled
            >
              {tag}
            </StyledCustomButtom>
          ))}
      </PostOpsWrap>
    </>
  );
}

const PostOpsWrap = styled.div`
  height: 7rem;
  background: ${palette.gray3};
`;

// tag, category, series
// category
const CategoryWrap = styled.div`
  padding: 0 1rem;
  height: 2rem;
  display: flex;
  align-items: center;
  background: ${palette.gray8};
  & > div {
    font-size: 1rem;
    color: white;
    font-weight: 600;
    margin-right: 1rem;
    padding-bottom: 0.2rem;
  }
  & > input {
    flex: 1;
  }
`;

const TagsWrap = styled.div`
  padding: 0 1rem;
  height: 2rem;
  display: flex;
  align-items: center;
  background: ${palette.gray8};
  & > div {
    font-size: 1rem;
    color: white;
    font-weight: 600;
    margin-right: 1rem;
    padding-bottom: 0.2rem;
  }
  & > input {
    flex: 1;
  }
`;

const StyledCustomButtom = styled(CustomButton)`
  &:hover {
    background: ${palette.gray7};
    color: ${palette.gray3};
  }
`;
