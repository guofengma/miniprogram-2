import { request } from "./request";

export const getList = () => request({ url: "/rank" });
