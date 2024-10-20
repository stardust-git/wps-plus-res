window.WpsFileTypeEnum = {
  文档: 'wps',
  演示: 'wpp',
  表格: 'et',
};

window.EtUtils = (function () {
  return {
    type: WpsFileTypeEnum.表格,
    activeDto() {
      return wps.ActiveWorkbook;
    },
    /***
     * 保存文件，并返回当前路径
     * @callback SaveWpsFile
     * @returns {string}
     */
    save: () => {
      wps.ActiveWorkbook.Save();
      return wps.ActiveWorkbook.FullName.toString();
    },
    /**
     * 从Url中打开
     * @callback OpenWpsFromUrl
     * @param {string} [url] 服务端的Url
     * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
     * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
     */
    openFromUrl: (url = 'http://127.0.0.1:1024/upload/123.xlsx', success, fail) => {
      wps.Workbooks.OpenFromUrl(url, success, fail);
    },
    /**
     * 将当前文件另存为到其他服务端Url上
     * @callback SaveAsWpsUrl
     * @param {string} [url] 服务端的Url
     * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
     * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
     */
    saveAsUrl: (url = `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, success, fail) => {
      const doc = wps.ActiveWorkbook;
      if (!doc) {
        alert('空文档不能保存！');
        return;
      }
      doc.SaveAsUrl(doc.Name, `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, 'file', success, fail);
    },
  };
})();

window.WpsUtils = (function () {
  return {
    type: WpsFileTypeEnum.文档,
    activeDto() {
      return wps.ActiveDocument;
    },
    /***
     * @type SaveWpsFile
     */
    save: () => {
      wps.ActiveDocument.Save();
      return wps.ActiveDocument.FullName.toString();
    },
    /**
     * @type OpenWpsFromUrl
     */
    openFromUrl: (url = 'http://127.0.0.1:1024/upload/123.xlsx', success, fail) => {
      wps.Documents.OpenFromUrl(url, success, fail);
    },
    /**
     * @type {SaveAsWpsUrl}
     */
    saveAsUrl: (url = `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, success, fail) => {
      const doc = wps.ActiveDocument;
      if (!doc) {
        alert('空文档不能保存！');
        return;
      }
      doc.SaveAsUrl(doc.Name, `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, 'file', success, fail);
    },
  };
})();

window.WppUtils = (function () {
  return {
    type: WpsFileTypeEnum.演示,
    activeDto() {
      return wps.ActivePresentation;
    },
    /**
     * @type {SaveWpsFile}
     */
    save: () => {
      wps.ActivePresentation.Save();
      return wps.ActivePresentation.FullName.toString();
    },
    /**
     * @type {OpenWpsFromUrl}
     */
    openFromUrl: (url = 'http://127.0.0.1:1024/upload/123.xlsx', success, fail) => {
      wps.Presentations.OpenFromUrl(url, success, fail);
    },
    /**
     * @type {SaveAsWpsUrl}
     */
    saveAsUrl: (url = `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, success, fail) => {
      const doc = wps.ActivePresentation;
      if (!doc) {
        alert('空文档不能保存！');
        return;
      }
      doc.SaveAsUrl(doc.Name, `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, 'file', success, fail);
    },
  };
})();

window.WpsFileTypeMap = {
  [WpsFileTypeEnum.表格]: window.EtUtils,
  [WpsFileTypeEnum.文档]: window.WpsUtils,
  [WpsFileTypeEnum.演示]: window.WppUtils,
};

window.ComUtils = class ComUtils {
  fileType;
  mainTabId;

  /**
   * 初始化文件类型
   * @param {WpsFileTypeEnum} fileType
   * @param {string} [mainTabId] 主要的TabId
   */
  constructor(fileType, mainTabId) {
    const type = fileType || ComUtils.getCurFileType();
    if (!type) {
      throw new Error('当前客户端类型不存在');
    }
    this.fileType = type;
    this.mainTabId = mainTabId;
  }

  /**
   * 处理Web端的文件
   * @callback HandelWebFileInfoFunc
   * @param {Object} info
   * @param {string} info.fileName 文件名
   * @param {string} info.userName 用户名
   * @param {string} info.token 鉴权
   * @param {number} [info.isOA] oa文档类型
   * @param {string} info.downloadPath 下载链接
   * @returns {boolean}
   */
  handelWebFileInfo(info) {
    if (!info || !info.fileName || !info.downloadPath) return false;
    const existFile = ComUtils.getStore(info.fileName);
    if (existFile) {
      ComUtils.sendToWeb({status: 10, message: '该文档已经在WPS打开，请勿重复打开！'});
      return false;
    }
    const infoJSON = JSON.stringify(info);
    wps.Application.UserName = info['userName'];// 设置当前文档对应的用户名

    WpsFileTypeMap[this.fileType].openFromUrl(info.downloadPath);

    info.isOA = 1; //设置OA打开文档的标志：从服务端来的OA文档
    ComUtils.setStore(fileName, infoJSON);
    ComUtils.setStore('token', info['token']);
    ComUtils.refreshRibbon();
    setTimeout(() => ComUtils.activeTab(this.mainTabId), 1000); // 激活页面必需要页签显示出来，所以做1秒延迟
    ComUtils.sendToWeb({status: 0, message: '文档打开成功！'});
    return true;
  }

  /**
   * 获取当前文件类型
   * @returns {string | void}
   */
  static getCurFileType() {
    if (wps.WpsApplication) {
      return WpsFileTypeEnum.文档;
    } else if (wps.EtApplication) {
      return WpsFileTypeEnum.表格;
    } else if (wps.WppApplication) {
      return WpsFileTypeEnum.演示;
    } else {
      return;
    }
  }

  /**
   * 激活插件Tab
   * @param {string} tabId ribbon中的tabId
   */
  static activeTab(tabId) {
    wps.ribbonUI.ActivateTab(tabId);
  }

  /**
   * 发送到Web中的消息
   * @param {Object} msg 消息信息
   * @param {number} msg.status 消息状态码
   * @param {string} msg.message 消息内容
   */
  static sendToWeb(msg) {
    wps.OAAssist.WebNotify(JSON.stringify(msg), true);
  }

  /**
   *  刷新Ribbon按钮的状态
   */
  static refreshRibbon() {
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
  static showDialog(url = 'http://localhost:6789/wps-demo', title, width, height, isModal) {
    wps.ShowDialog(url, title, width, height, isModal);
  }

  /**
   * 获取存储，可以在wps应用中共享
   * @param {string} key
   * @returns {string}
   */
  static getStore(key) {
    return wps.PluginStorage.getItem(key);
  }

  /**
   * 设置存储，可以在wps应用中共享
   * @param {string} key
   * @param {string | number | boolean} value
   */
  static setStore(key, value) {
    wps.PluginStorage.setItem(key, value);
  }

  /**
   * 获取当前文件
   * @returns {File}
   */
  getCurFile() {
    const path = WpsFileTypeMap[this.fileType].save();
    const arrayBuffer = wps.FileSystem.ReadFileAsArrayBuffer(path);
    const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
    return new File([blob], WpsFileTypeMap[this.fileType].activeDto().Name);
  }

  /**
   * 手动上传文件
   * @param {string} [url]
   */
  uploadCurFile(url = 'http://127.0.0.1:1024/file/upload?token=123456&filename=test') {
    const file = this.getCurFile();
    const formData = new FormData();
    formData.append('file', file);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          alert('上传成功');
          return;
        }
        alert('上传失败');
      });
  }
};