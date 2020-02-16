import React from 'react';
import styled from 'styled-components';
import BlogContentList from './ContentList';

export default function BlogContent({ posts, postError, loading }) {
  if (postError) {
    console.log('post is not exist');
  }
  if (loading || !posts) {
    return null;
  }

  const postsLength = Math.ceil(posts.length / 3);
  return (
    <>
      <ContentContainer level={postsLength}>
        <BlogContentList posts={posts} />
      </ContentContainer>
    </>
  );
}

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: ${props =>
    props.level === 1
      ? '32rem'
      : props.level === 2
      ? '32rem 32rem'
      : props.level === 3
      ? '32rem 32rem 32rem'
      : '0rem'};
  width:100%
  padding: 1rem 3rem 1rem 5rem;
`;
