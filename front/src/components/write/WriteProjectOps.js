import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import { useRouteMatch } from 'react-router-dom';

export default function WriteProjectOps({}) {
  const match = useRouteMatch();
  const { category } = match.params;

  return (
    <>
      <PostOpsWrap>
        <CategoryWrap>
          <div>Category</div>
          <div>
            <CategoryList activeCategory={category === 'co'}>Co .</CategoryList>
            <CategoryList activeCategory={category === 'team'}>
              Team
            </CategoryList>
            <CategoryList activeCategory={category === 'toy'}>Toy</CategoryList>
          </div>
        </CategoryWrap>
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
