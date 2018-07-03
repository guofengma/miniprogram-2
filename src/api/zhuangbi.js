import miment from 'miment';
import {request} from './request';

export const getList = async () => {
  const res = await request({url: '/zhuangbi'});
  res.forEach(item => (item._gmtModified = miment(item.gmtModified).format('hh:mm:ss')));
  return res;
};
