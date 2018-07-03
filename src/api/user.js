import miment from 'miment';
import {request} from './request';

export const getInfo = () => request({url: '/user'});

export const getAvailable = () => request({url: '/user/number'});

export const getRecordList = async data => {
  const res = await request(data ? {url: '/user/receiving', method: 'POST', data} : {url: '/user/receiving'});
  return handleRecord(res);
};

export const getRecord = async id => {
  const res = await request({url: `/user/receiving/${id}`});
  return handleRecord(res);
};

function handleRecord(data) {
  if (!data) {
    return null;
  }
  const notArray = !Array.isArray(data);
  if (notArray) {
    data = [data];
  }
  data.forEach(item => {
    item._gmtModified = miment(item.gmtModified || item.gmtCreate).format('MM-DD hh:mm:ss');
    item._phone = item.phone.replace(/(\d{3})(\d{4})(\d{3})/, '$1****$3');
    item._price = item.price || 0;
    item._color = {0: '', 1: '#5bab60', 2: '#dd2323'}[
      !item.phone && /已领取到最佳前一个红包/.test(item.message) ? 1 : item.status
    ];
  });
  return notArray ? data[0] : data;
}
