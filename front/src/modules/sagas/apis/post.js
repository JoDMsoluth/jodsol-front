import client from './axiosSetting';

export const addPostApi = ({
  title,
  markdown,
  tags,
  category,
  coverImg,
  id,
  desc,
}) =>
  client.post(`api/blog/post/add/${category}/${id}`, {
    title,
    markdown,
    tags,
    coverImg,
    desc,
  });

export const loadPostApi = id => client.get(`api/blog/post/load/${id}`);

export const updatePostApi = ({
  id,
  title,
  markdown,
  tags,
  category,
  series,
  desc,
  coverImg,
}) =>
  client.patch(`api/blog/post/update/${id}`, {
    title,
    markdown,
    tags,
    category,
    series,
    coverImg,
    desc,
  });

export const deletePostApi = id => client.delete(`api/blog/post/delete/${id}`);

export const likePostApi = id =>
  client.patch(`api/blog/post/like/${id}`, null, { withCredentials: true });
export const unlikePostApi = id =>
  client.patch(`api/blog/post/unlike/${id}`, null, { withCredentials: true });

export const uploadThumbnailApi = ({ imageFormData }) => {
  return client.post(`api/blog/post/thumbnail`, imageFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
