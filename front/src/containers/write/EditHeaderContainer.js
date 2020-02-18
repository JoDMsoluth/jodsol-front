import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditorHeader from '../../components/write/EditorHeader';
import { withRouter } from 'react-router-dom';
import { addPost } from '../../modules/stores/post';
import { addSeries } from '../../modules/stores/series';
import { addProejct } from '../../modules/stores/project';

const EditorHeaderContainer = ({ history, match }) => {
  const { title, tags, markdown, desc, coverImg } = useSelector(
    ({ write }) => write,
  );
  const { category, id, filter } = match.params;
  const dispatch = useDispatch();

  const onGoBack = () => history.goBack();
  const onSubmit = e => {
    e.preventDefault();
    if (filter === 'post') {
      dispatch(
        addPost({ title, markdown, tags, category, desc, coverImg, id }),
      );
    } else if (filter === 'project') {
      dispatch(addProejct({ title, desc, markdown, category, coverImg }));
    } else if (filter === 'series') {
      dispatch(addSeries({ title, markdown, desc, category, coverImg }));
    }
  };

  return (
    <EditorHeader
      onGoBack={onGoBack}
      onSubmit={onSubmit}
      coverImg={coverImg}
      tags={tags}
      desc={desc}
    />
  );
};

export default withRouter(EditorHeaderContainer);
