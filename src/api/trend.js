import {request} from './request';

export const getList = async () => {
  const res = await request({url: '/trend'});
  [...res.meituan, ...res.ele].forEach(item => (item._avg = (item.totalPrice / item.count).toFixed(1)));
  return res;
};
