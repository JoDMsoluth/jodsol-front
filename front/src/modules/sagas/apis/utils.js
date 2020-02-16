import client from './axiosSetting';

export const loadViewsApi = () => client.get(`api/views/load`);

export const sendMailApi = ({ name, from, subject, content }) =>
  client.post(`api/email/send`, { name, from, subject, content });

export const adminLoginApi = ({ id, password }) =>
  client.post(`api/user/admin/login`, { id, password });
