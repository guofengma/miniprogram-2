import {request} from './request';

export const getList = async () => {
  const res = await request({url: '/notice.json'});
  return res.filter(notice => ['all', 'mp'].includes(notice.type)).map(notice => notice.content);
};
