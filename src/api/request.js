import * as wxp from "../utils/wxp";
import store from "../store";

export const request = async ({
  url,
  method = "GET",
  data = {},
  header = {}
}) => {
  url = `https://mtdhb.z.xxooweb.com${url}`;
  header["X-User-Token"] = store.state.token;
  const { data: res = {} } = await wxp.request({ url, method, data, header });
  if (res.code === 10000) {
    await store.dispatch("goLogin");
    throw wxp.error("请重新扫码或者复制 token", res);
  }
  if (res.code !== 0) {
    throw wxp.error(res.message, res);
  }
  return res.data;
};
