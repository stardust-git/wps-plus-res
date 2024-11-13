const comUtils = new ComUtils(WpsClientTypeEnum.表格, 'HelloWps');

/**
 * wps加载时事件
 */
window.OnWPSWorkTabLoad = (ribbonUI) => {
  return comUtils.dealWpsWorkTabLoad(ribbonUI);
};

/**
 * Action事件
 */
window.OnAction = (control) => {
  return comUtils.dealAction(control);
};

/**
 * 获取图片方法
 */
window.OnGetImage = (control) => {
  return comUtils.getRibbonImage(control);
};

/**
 * 启用按钮
 */
window.OnGetEnabled = (control) => {
  return comUtils.getRibbonEnabled(control);
};

/**
 * 可视按钮
 */
window.OnGetVisible = (control) => {
  return comUtils.getRibbonVisible(control);
};

window.OnGetLabel = (control) => {
  return comUtils.getRibbonLabel(control);
};

/**
 * 处理Web端的文件
 * @param {Parameters<HandleWebFileInfoFunc>[0]} info
 */
window.dispatcher = (info) => {
  comUtils.handleWebFileInfo(info);
};
