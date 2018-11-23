import miment from "miment";
import { request } from "./request";

export const addCookie = data =>
  request({ url: "/user/cookie", method: "POST", data });

export const getInfo = () => request({ url: "/user" });

export const getAvailable = () => request({ url: "/user/number" });

export const getRecordList = async () => {
  const res = await request({ url: "/user/receiving" });
  return handleRecord(res);
};

export const getHongbao = async data => {
  const res = await request({ url: "/user/receiving", method: "POST", data });
  return handleRecord(res);
};

export const getRecord = async id => {
  const res = await request({ url: `/user/receiving/${id}` });
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
    item._gmtModified = miment(item.gmtModified || item.gmtCreate).format(
      "MM-DD hh:mm:ss"
    );
    item._phone = item.phone.replace(/(\d{3})(\d{4})(\d{3})/, "$1****$3");
    item._price = item.price || 0;
    item._color = { 0: "", 1: "#5bab60", 2: "#dd2323" }[
      !item.phone && /已领取到最佳前一个红包/.test(item.message)
        ? 1
        : item.status
    ];
    let elemeType = "";
    if (item.application === 1 && item.type !== null) {
      elemeType = ["拼手气", "品质联盟"][item.type] || "";
    }
    elemeType = elemeType ? `-${elemeType}` : "";
    item._applicationName = `[${
      item.application === 0 ? "美" : "饿" + elemeType
    }]`;
  });
  return notArray ? data[0] : data;
}
