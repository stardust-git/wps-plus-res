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

function OnAction() {
    let tsId = wps.PluginStorage.getItem("taskpane_id")
    if (!tsId) {
        let tskpane = wps.CreateTaskPane('https://fanyi.youdao.com/#/')
        let id = tskpane.ID
        wps.PluginStorage.setItem("taskpane_id", id)
        tskpane.Visible = true
    } else {
        let tskpane = wps.GetTaskPane(tsId)
        tskpane.Visible = !tskpane.Visible
    }
}


function GetImage() {
    return 'images/1.svg'
}
