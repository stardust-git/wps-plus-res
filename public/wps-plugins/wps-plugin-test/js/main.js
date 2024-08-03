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

// 激活数管家插件
function activeTab(tabId) {
	wps.ribbonUI.ActivateTab(tabId);
}

function saveFile() {
	const token = wps.PluginStorage.getItem('token');
	var doc = wps.EtApplication().ActiveWorkbook;
	if (!doc) {
		alert('空文档不能保存！');
		return;
	}
	try {
		//调用不落地上传方法
		doc.SaveAsUrl(doc.Name, `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, 'file');
		// precheckAfterSaveIsFileOnline(doc);
	} catch (err) {
		alert('上传文档失败！请检查系统上传参数及网络环境，重新上传。');
	}
}

/**
 * Action
 */
function OnAction() {
	saveFile();
}

/**
 * 获取图片方法
 */
function GetImage() {
	return 'images/1.svg';
}

/**
 *  web页面调用WPS加载项的方法入口
 */
function dispatcher(info) {
	if (!info) return;

	var fileName = info['fileName'] + '.xlsx';
	var existFile = wps.PluginStorage.getItem(fileName);
	if (existFile) {
		alert('该文档已经在WPS打开，请勿重复打开！');
		return false;
	}

	wps.EtApplication().Workbooks.OpenFromUrl(info.downloadPath);
	wps.EtApplication().UserName = info['userName'];// 设置当前文档对应的用户名

	//Office文档打开后，设置该文档属性：从服务端来的OA文档
	info.isOA = 1; //设置OA打开文档的标志

	var infoJSON = JSON.stringify(info);

	var doc = wps.EtApplication().ActiveWorkbook;
	wps.PluginStorage.setItem(doc.Name, infoJSON);
	wps.PluginStorage.setItem('token', info['token']);

	wps.ribbonUI.Invalidate(); // 刷新Ribbon自定义按钮的状态

	setTimeout(() => activeTab('wpsAddinTab'), 1000); // 激活页面必须要页签显示出来，所以做1秒延迟

	return {message: 'ok', app: wps.Application.Name};
}
