import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { useDispatch } from 'react-redux';
import { changeInput } from '../../modules/stores/write';
import CustomButton from '../../lib/CustomButton';
import { useRouteMatch } from 'react-router-dom';

export default function WritePostOps({ tags }) {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const onChangeInput = useCallback(
    (name, value) => dispatch(changeInput({ name, value })),
    [dispatch],
  );

  const { category } = match.params;

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
          <div>
            <CategoryList activeCategory={category === 'study'}>
              Study
            </CategoryList>
            <CategoryList activeCategory={category === 'daily'}>
              Daily
            </CategoryList>
            <CategoryList activeCategory={category === 'game'}>
              Game
            </CategoryList>
          </div>
        </CategoryWrap>
        <TagsWrap>
          <div>Tags</div>
          <input
            name="tags"
            value={tags}
            placeholder="ex) #a #b #c ..."
            onChange={onChangehandle}
            maxLength="35"
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
  height: 7.4rem;
  background: ${palette.gray3};
  overflow: hidden;
`;

// tag, category, series
// category
const CategoryWrap = styled.div`
  border-bottom : 1px solid ${palette.gray1}
  padding: 0 1rem 0 0.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  background: ${palette.gray8};
  & > div:first-child {
    padding-right : 0.5rem
    font-size: 0.74rem;
    color: white;
    font-weight: 600;
    padding-bottom: 0.2rem;
  }
  & > div:nth-child(2) {
    font-size : 0.8rem
    display: flex;
    color: gray;
    background: white;
    flex: 1;
    text-align: center;
    font-weight: 700;
  }

`;

const CategoryList = styled.div`
  flex: 1;
  ${props =>
    props.activeCategory &&
    css`
  background : ${palette.gray8}
  color : ${palette.gray2}`}
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
    padding: 0 0.5rem;
  }
`;

const StyledCustomButtom = styled(CustomButton)`
  &:hover {
    background: ${palette.gray7};
    color: ${palette.gray3};
  }
`;
