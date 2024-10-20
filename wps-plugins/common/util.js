window.KsoFileTypeEnum = {
  文档: 'wps',
  演示: 'wpp',
  表格: 'et',
};

// window.KsoFileUtilMap = {
//   [KsoFileTypeEnum.文档]: 'wps',
//   演示: 'wpp',
//   表格: 'et',
// };

window.ComUtils = (function () {

  /**
   * 处理Web端的文件
   * @param {Object} info
   * @param {string} info.fileName 文件名
   * @param {string} info.userName 用户名
   * @param {string} info.token 鉴权
   * @param {number} [info.isOA] oa文档类型
   * @param {string} info.downloadPath 下载链接
   * @param {string} addonName 触发的加载项名
   * @returns {boolean}
   */
  function handelWebFileInfo(addonName,info) {
    if (!info || !info.fileName || !info.downloadPath) return false;
    const existFile = ComUtils.getStore(info.fileName);
    if (existFile) {
      sendToWeb({status: 10, message: '该文档已经在WPS打开，请勿重复打开！'});
      return false;
    }
    const infoJSON = JSON.stringify(info);
    wps.Application.UserName = info['userName'];// 设置当前文档对应的用户名

    info.isOA = 1; //设置OA打开文档的标志：从服务端来的OA文档
    setStore(fileName, infoJSON);
    setStore('token', info['token']);
    refreshRibbon();
    setTimeout(() => ComUtils.activeTab('HelloWps'), 1000); // 激活页面必需要页签显示出来，所以做1秒延迟
    sendToWeb({status: 0, message: '文档打开成功！'});
    return true;
  }

  /**
   * 获取当前文件类型
   * @returns {string | void}
   */
  function getCurFileType() {
    if (wps.WpsApplication) {
      return KsoFileTypeEnum.文档;
    } else if (wps.EtApplication) {
      return KsoFileTypeEnum.表格;
    } else if (wps.WppApplication) {
      return KsoFileTypeEnum.演示;
    } else {
      return;
    }
  }

  /**
   * 激活插件Tab
   * @param {string} tabId ribbon中的tabId
   */
  function activeTab(tabId) {
    wps.ribbonUI.ActivateTab(tabId);
  }

  /**
   * 发送到Web中的消息
   * @param {Object} msg 消息信息
   * @param {number} msg.status 消息状态码
   * @param {string} msg.message 消息内容
   */
  function sendToWeb(msg) {
    wps.OAAssist.WebNotify(JSON.stringify(msg), true);
  }

  /**
   *  刷新Ribbon按钮的状态
   */
  function refreshRibbon() {
    wps.ribbonUI.Invalidate();
  }

  /**
   * 打开对话面板
   * @param {string} [url] webView 链接
   * @param {string} [title]
   * @param {number} [width]
   * @param {number} [height]
   * @param {boolean} [isModal]
   */
  function showDialog(url = 'http://localhost:6789/wps-demo', title, width, height, isModal) {
    wps.ShowDialog(url, title, width, height, isModal);
  }

  /**
   * 获取存储，可以在wps应用中共享
   * @param {string} key
   * @returns {string}
   */
  function getStore(key) {
    return wps.PluginStorage.getItem(key);
  }

  /**
   * 设置存储，可以在wps应用中共享
   * @param {string} key
   * @param {string | number | boolean} value
   */
  function setStore(key, value) {
    wps.PluginStorage.setItem(key, value);
  }

  return {
    activeTab,
    sendToWeb,
    refreshRibbon,
    showDialog,
    getStore,
    setStore,
    getCurFileType,
    handelWebFileInfo
  };
})();

window.EtUtils = (function () {
  /**
   * 从Url中打开
   * @param {string} [url] 服务端的Url
   * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
   * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
   */
  function openFromUrl(url = 'http://127.0.0.1:1024/upload/123.xlsx', success, fail) {
    wps.Workbooks.OpenFromUrl(url, success, fail);
  }

  /**
   * 将当前文件另存为到其他服务端Url上
   * @param {string} [url] 服务端的Url
   * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
   * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
   */
  function saveAsUrl(url = `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, success, fail) {
    const doc = wps.EtApplication().ActiveWorkbook;
    if (!doc) {
      alert('空文档不能保存！');
      return;
    }
    doc.SaveAsUrl(doc.Name, `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, 'file', success, fail);
  }

  return {
    openFromUrl,
    saveAsUrl,
  };
})();

window.WpsUtils = (function () {
  /**
   * 从Url中打开
   * @param {string} [url] 服务端的Url
   * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
   * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
   */
  function openFromUrl(url = 'http://127.0.0.1:1024/upload/123.xlsx', success, fail) {
    wps.Documents.OpenFromUrl(url, success, fail);
  }

  /**
   * 设置文档作者
   * @param name
   */
  function setUserName(name) {
  }
  return {
    openFromUrl
  };
})();

window.WppUtils = (function () {
  /**
   * 从Url中打开
   * @param {string} [url] 服务端的Url
   * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
   * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
   */
  function openFromUrl(url = 'http://127.0.0.1:1024/upload/123.xlsx', success, fail) {
    wps.Presentations.OpenFromUrl(url, success, fail);
  }
  return {
    openFromUrl
  };
})();



