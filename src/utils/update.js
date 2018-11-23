if (wx.canIUse("getUpdateManager")) {
  const updateManager = wx.getUpdateManager();
  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启小程序？",
      success({ confirm }) {
        if (confirm) {
          updateManager.applyUpdate();
        }
      }
    });
  });
}
