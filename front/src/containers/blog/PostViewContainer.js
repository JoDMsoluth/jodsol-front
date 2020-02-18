import React, { useEffect, useCallback } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import {
  loadPost,
  unloadPost,
  setToc,
  setActiveHeading,
  likePost,
  unlikePost,
} from '../../modules/stores/post';
import { useDispatch, useSelector } from 'react-redux';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import MarkdownRender from '../../components/common/markdown/MarkdownRender';
import PostToc from '../../components/blog/post/PostToc';
import thumbnail from '../../statics/images/kickVillageProject.PNG';
import PostHeader from '../../components/blog/post/PostHeader';

const PostViewContainer = () => {
  const match = useRouteMatch();
  const { id } = match.params;
  const dispatch = useDispatch();

  const { activeHeading, post, postError, loading, toc } = useSelector(
    ({ post, loading }) => ({
      post: post.post,
      postError: post.postError,
      toc: post.toc,
      loading: loading['LOAD_POST'],
      activeHeading: post.activeHeading,
    }),
  );

  const onSetToc = useCallback(toc => {
    dispatch(setToc(toc));
  });
  const onActiveHeading = throttle(id => {
    dispatch(setActiveHeading(id));
  }, 250);
  const onLike = useCallback(id => {
    dispatch(likePost(id));
  });
  const onUnlike = useCallback(id => {
    dispatch(unlikePost(id));
  });

  useEffect(() => {
    if (document.body && document.body.scrollTop) {
      document.body.scrollTop = 0;
    }
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }

    dispatch(loadPost(id));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, id]);

  if (postError) {
    console.log('post is not exist');
  }
  if (loading || !post) {
    return null;
  }

  const { title, markdown, tags, coverImg, createdAt, likes, category } = post;
  const setCoverImg = coverImg
    ? `${process.env.REACT_APP_SERVER_URL}/${coverImg}`
    : thumbnail;

  return (
    <>
      <PostViewWrap>
        <PostToc
          toc={toc}
          activeHeading={activeHeading}
          onActiveHeading={onActiveHeading}
        />
        <PostHeader
          onLike={onLike}
          onUnlike={onUnlike}
          title={title}
          likes={likes}
          createdAt={createdAt}
          thumbnail={setCoverImg}
        >
          {title}
        </PostHeader>
        <MarkdownRender
          markdown={markdown}
          onSetToc={onSetToc}
          onActiveHeading={onActiveHeading}
        />
        <PostViewTags>
          {tags.map((tag, i) => (
            <Link
              to={`/blog/${category}?tag=${tag.slice(1, tag.length)}&page=1`}
              // eslint-disable-next-line react/no-array-index-key
              key={`${tag}${i}`}
            >
              {`${tag} `}
            </Link>
          ))}
        </PostViewTags>
      </PostViewWrap>
    </>
  );
};

const PostViewWrap = styled.div`
  position: relative;
  flex: 1;
  padding: 2rem 15rem;
  font-size: 1.125rem;
`;
const PostViewTags = styled.div`
  font-size: 1rem;
  font-weight: 200;
  padding-top: 2rem;
  border-top: 1px solid ${palette.gray3};
  color: ${palette.teal8}
  & > a:hover {
      color: ${palette.teal6}
  }
`;

export default PostViewContainer;
