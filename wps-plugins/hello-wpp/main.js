// 加载时会执行的方法，见ribbon.xml文件
window.OnWPSWorkTabLoad = (ribbonUI) => {
  wps.ribbonUI = ribbonUI;
  //挂载WPS的表格事件处理函数
  // wps.ApiEvent.AddApiEventListener("WindowActivate", OnWindowActivate);
  // wps.ApiEvent.AddApiEventListener("WorkbookBeforeClose", OnWorkbookBeforeClose);
  // wps.ApiEvent.AddApiEventListener("WorkbookBeforeSave", FileOutputDisable);
  // wps.ApiEvent.AddApiEventListener("WorkbookBeforePrint", FileOutputDisable);
  // wps.ApiEvent.AddApiEventListener("WorkbookOpen", OnWorkbookOpen);
  // wps.ApiEvent.AddApiEventListener("NewWorkbook", OnWorkbookNew);
  // wps.ApiEvent.AddApiEventListener("DocumentBeforeCopy", OnDocumentBeforeCopy);
  // wps.ApiEvent.AddApiEventListener("DocumentBeforePaste", OnDocumentBeforePaste);
  // wps.ApiEvent.AddApiEventListener("DocumentRightsInfo", FileOutputDisable);
  // //"移动或复制工作表(&M)..."
  // wps.CommandBars.FindControl(null, 848).Enabled = false;
  // wps.CommandBars.FindControl(null, 848).Visible = false;

  return true;
};

/**
 * Action
 */
window.OnAction = () => {
  // EtUtils.saveAsUrl();
  ComUtils.showDialog();
};

/**
 * 获取图片方法
 */
window.GetImage = () => {
  return '../common/images/time.jpg';
};

/**
 * 处理Web端的文件
 * @param {Parameters<ComUtils.handelWebFileInfo>[1]} info
 * @returns {boolean}
 */
window.dispatcher = (info) => {
  if (!ComUtils.handelWebFileInfo('HelloWps', info)) {
    return false;
  }
  WppUtils.openFromUrl(info.downloadPath);
  ComUtils.sendToWeb({status: 0, message: '文档打开成功！'});
  return true;
};