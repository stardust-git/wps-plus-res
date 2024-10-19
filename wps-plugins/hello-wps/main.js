// 加载时会执行的方法，见ribbon.xml文件
function OnWPSWorkTabLoad(ribbonUI) {
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
}

/**
 * Action
 */
function OnAction() {
  // EtUtils.saveAsUrl();
  ComUtils.showDialog();
}

/**
 * 获取图片方法
 */
function GetImage() {
  return 'images/time.jpg';
}

/**
 *  web页面调用WPS加载项的方法入口
 */
function dispatcher(info) {
  if (!info) return;

  const fileName = info['fileName'] + '.xlsx';
  const existFile = ComUtils.getStore(fileName);
  if (existFile) {
    ComUtils.sendToWeb({status: 10, message: '该文档已经在WPS打开，请勿重复打开！'});
    return false;
  }
  EtUtils.openFromUrl(info.downloadPath);
  wps.EtApplication().UserName = info['userName'];// 设置当前文档对应的用户名

  //Office文档打开后，设置该文档属性：从服务端来的OA文档
  info.isOA = 1; //设置OA打开文档的标志

  const infoJSON = JSON.stringify(info);

  ComUtils.setStore(fileName, infoJSON);
  ComUtils.setStore('token', info['token']);

  ComUtils.refreshRibbon();
  setTimeout(() => ComUtils.activeTab('HelloWps'), 1000); // 激活页面必需要页签显示出来，所以做1秒延迟
  ComUtils.sendToWeb({status: 0, message: '文档打开成功！'});
  return true;
}
