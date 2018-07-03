import qs from 'qs';

const ERROR_MESSAGE = '网络繁忙，请稍后重试';

export const timeout = delay => new Promise(resolve => setTimeout(resolve, delay));

export const error = (message = ERROR_MESSAGE, data = {}) => {
  const error = new Error(message);
  error.data = data;
  return error;
};

export const promisify = (method, context) => (options = {}) =>
  new Promise((resolve, reject) => {
    options.success = resolve;
    options.fail = (err = {}) => reject(error(/request:fail/i.test(err.errMsg) ? ERROR_MESSAGE : err.errMsg, err));
    method.call(context, options);
  });

export const scanCode = promisify(wx.scanCode);
export const getStorage = promisify(wx.getStorage);
export const setStorage = promisify(wx.setStorage);
export const removeStorage = promisify(wx.removeStorage);
export const getLocation = promisify(wx.getLocation);
export const showModal = promisify(wx.showModal);
export const showActionSheet = promisify(wx.showActionSheet);
export const setClipboardData = promisify(wx.setClipboardData);
export const getClipboardData = promisify(wx.getClipboardData);

const _request = promisify(wx.request);
const _uploadFile = promisify(wx.uploadFile);
export const request = (options = {}) => {
  options.header = options.header || {};
  if (options.method === 'POST' && !('content-type' in options.header)) {
    options.header['content-type'] = 'application/x-www-form-urlencoded';
  }
  if (options.name && options.filePath) {
    return _uploadFile(options);
  }
  options.data = qs.stringify(options.data);
  return _request(options);
};
