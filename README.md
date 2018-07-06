# mp

[![GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

微信小程序 “一键最佳”（AppID: wx55fe519139f48efe）

<img width="200" src="miniprogram.jpg" />

自己申请小程序搭建本项目的，需要在微信小程序后台设置 request 域名 `https://mtdhb.z.xxooweb.com`

## 环境

Node.js 9.x

```bash
npm i yarn -g
```

## 开发

```bash
yarn
yarn dev
```

使用微信开发者工具打开 `dist/` 目录

## 生产

上线之前执行以下命令压缩代码，再上传腾讯审核

```bash
yarn build
```
