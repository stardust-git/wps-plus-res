window.EtUtils = (function () {
  return {
    type: WpsClientTypeEnum.表格,

    /**
     * @returns {Et.EtWorkbook}
     */
    getActiveDto() {
      return wps.ActiveWorkbook;
    },

    /**
     * @returns {Et.EtWorkbooks}
     */
    getWorkDtos() {
      return wps.EtApplication().Workbooks;
    },
  };
})();

window.WpsUtils = (function () {
  return {
    type: WpsClientTypeEnum.文档,

    /**
     * @returns {Wps.WpsDocument}
     */
    getActiveDto() {
      return wps.ActiveDocument;
    },

    /**
     * @returns {Wps.WpsDocuments}
     */
    getWorkDtos() {
      return wps.WpsApplication().Documents;
    },
  };
})();

window.WppUtils = (function () {
  return {
    type: WpsClientTypeEnum.演示,

    /**
     * @returns {Wpp.WppPresentation}
     */
    getActiveDto() {
      return wps.ActivePresentation;
    },

    /**
     * @returns {Wpp.WppPresentations}
     */
    getWorkDtos() {
      return wps.WppApplication().Presentations;
    },
  };
})();

window.WpsClientTypeMap = {
  [WpsClientTypeEnum.表格]: window.EtUtils,
  [WpsClientTypeEnum.文档]: window.WpsUtils,
  [WpsClientTypeEnum.演示]: window.WppUtils,
};

window.ServerUtils = (function () {
  /**
   * 网络请求工具
   * @param {string} url
   * @param {RequestInit} [options]
   * @return {Promise<Object>}
   */
  const server = (url, options = {}) => {
    const {headers, method = 'get', ...resOptions} = options;
    const authString = wps.PluginStorage.getItem(PluginStorageEnum.authorization);
    return fetch(url, {
      method,
      headers: {
        authorization: authString && JSON.parse(authString),
        ...headers,
      },
      ...resOptions,
    }).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }
      const newAuth = response.headers.get('authorization');
      if (newAuth) {
        wps.PluginStorage.setItem(PluginStorageEnum.authorization, JSON.stringify(newAuth));
      }
      return response.json();
    }).then((response) => {
      if (response.returnCode !== environment.successCode) {
        return Promise.reject(response.errorMsg);
      }
      return response.body;
    });
  };
  /**
   * 获取文章@param {string} docId
   */
  const getBizDoc = (docId) => {
    return server(`/document/biz/doc?docId=${docId}`);
  };

  /**
   * mock 接口
   * @return {Promise<void>}
   */
  const mockApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  return {
    server,
    getBizDoc,
    mockApi,
  };
})();

window.RibbonUtils = (function () {
  return {
    /**
     * 激活插件Tab
     * @param {string} tabId ribbon中的tabId
     */
    activeTab(tabId) {
      wps.ribbonUI.ActivateTab(tabId);
    },

    /**
     * 通知wps刷新以几个按饰的状态
     * @param {string} controlId
     */
    refreshControl(controlId) {
      wps.ribbonUI.InvalidateControl(controlId);
    },

    /**
     *  刷新整个Ribbon按钮的状态
     */
    refreshRibbon() {
      wps.ribbonUI.Invalidate();
    },

  };
})();

window.ComUtils = class ComUtils {
  clientType;
  mainTabId;
  loading = false;

  /**
   * 获取当前文件类型
   * @returns {string | void}
   */
  static getCurClientType() {
    if (wps.WpsApplication) {
      return WpsClientTypeEnum.文档;
    } else if (wps.EtApplication) {
      return WpsClientTypeEnum.表格;
    } else if (wps.WppApplication) {
      return WpsClientTypeEnum.演示;
    } else {
      return;
    }
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
   * 打开网页
   * @param {string} url
   */
  static openWebUrl(url) {
    wps.TabPages.OpenWebUrl(url);
    // wps.OAAssist.ShellExecute(url)
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
   * 关闭对话框
   */
  static closeShowDialog() {
    window.close();
  }

  /**
   * 初始化文件类型
   * @param {WpsClientTypeEnum} clientType
   * @param {string} [mainTabId] 主要的TabId
   */
  constructor(clientType, mainTabId) {
    const type = clientType || ComUtils.getCurClientType();
    if (!type) {
      throw new Error('当前客户端类型不存在');
    }
    this.clientType = type;
    this.mainTabId = mainTabId;
  }

  /**
   * 获取当前文档对象
   * @returns {EtWorkbook |  WpsDocument | WppPresentation}
   */
  getActionDto() {
    return WpsClientTypeMap[this.clientType].getActiveDto();
  }

  /**
   * 得到当前工作簿对象
   * @returns {EtWorkbooks |  WpsDocuments | WppPresentations}
   */
  getWorkDtos() {
    return WpsClientTypeMap[this.clientType].getWorkDtos();
  }

  /**
   * 添加自定义属性
   * @param {string} name 自定义属性名
   * @param {string} value 自定义属性值
   */
  addCustomProps(name, value) {
    const activeDto = this.getActionDto();
    if (activeDto) {
      activeDto.CustomDocumentProperties.Add({Name: name, Value: value, Type: 4});
      return true;
    }
    return false;
  }

  /**
   * 获取自定义属性
   * @param {string} name 自定义属性名
   */
  getCustomProps(name) {
    const activeDto = this.getActionDto();
    if (activeDto) {
      return wps.ActiveWorkbook.CustomDocumentProperties.Item(name);
    }
    return null;
  }

  /**
   * 获取当前文件
   * @returns {File}
   */
  getCurFile() {
    const path = this.saveCurFile();
    const arrayBuffer = wps.FileSystem.ReadFileAsArrayBuffer(path);
    const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
    return new File([blob], WpsClientTypeMap[this.clientType].getActiveDto().Name);
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

    WpsClientTypeMap[this.clientType].openFromUrl(info.downloadPath);

    info.isOA = 1; //设置OA打开文档的标志：从服务端来的OA文档
    ComUtils.setStore(fileName, infoJSON);
    ComUtils.setStore('token', info['token']);
    RibbonUtils.refreshRibbon();
    setTimeout(() => RibbonUtils.activeTab(this.mainTabId), 1000); // 激活页面必需要页签显示出来，所以做1秒延迟
    ComUtils.sendToWeb({status: 0, message: '文档打开成功！'});
    return true;
  }

  /**
   * 打开任务面板
   */
  openTaskPane() {
    const tsId = wps.PluginStorage.getItem('taskpane_id');
    if (!tsId) {
      const tskpane = wps.CreateTaskPane(environment.directorySelector);
      const id = tskpane.ID;
      wps.PluginStorage.setItem('taskpane_id', id);
      tskpane.Visible = true;
    } else {
      const tskpane = wps.GetTaskPane(tsId);
      tskpane.Visible = !tskpane.Visible;
    }
  }

  /**
   * 处理wps加载项加载时操作
   * @param ribbonUI
   * @returns {boolean}
   */
  dealWpsWorkTabLoad(ribbonUI) {
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
   * 上传操作
   */
  uploadOption() {
    this.loading = true;
    RibbonUtils.refreshRibbon(RibbonControlEnum.testBtn);
    ServerUtils.mockApi().then(() => {
      alert('上传成功');
    }).finally(() => {
      this.loading = false;
      RibbonUtils.refreshRibbon(RibbonControlEnum.testBtn);
    });
  }

  /**
   * 处理wps Action事件
   * @param control
   * @returns {boolean}
   */
  dealAction(control) {
    const eleId = control.Id;
    switch (eleId) {
      case RibbonControlEnum.testBtn:
        this.uploadOption();
        break;
      default:
        break;
    }
    return true;
  }

  /**
   * 得到Ribbon的图片
   * @param control
   */
  getRibbonImage(control) {
    const eleId = control.Id;
    switch (eleId) {
      case RibbonControlEnum.testBtn:
        return '../common/images/time.jpg';
      default:
        return '';
    }
  }

  /**
   * 获取Ribbon是否启用
   * @param control
   * @returns {boolean}
   */
  getRibbonEnabled(control) {
    return !this.loading;
  }

  /**
   * 获取Ribbon是否显示
   * @param control
   * @returns {boolean}
   */
  getRibbonVisible(control) {
    return true;
  }

  /**
   * 获取Ribbon标签名
   * @param control
   * @returns {string}
   */
  getRibbonLabel(control) {
    return this.loading ? '更新中...' : '点击测试';
  }

  /***
   * 保存文件，并返回当前路径
   * @returns {string}
   */
  saveCurFile() {
    const activeDto = this.getActionDto();
    activeDto.Save();
    return activeDto.FullName.toString();
  }

  /**
   * 从Url中打开
   * @param {string} [url] 服务端的Url
   * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
   * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
   */
  openFromUrl(url = 'http://127.0.0.1:1024/upload/123.xlsx', success, fail) {
    const workDtos = this.getWorkDtos();
    workDtos.OpenFromUrl(url, success, fail);
  }

  /**
   * 将当前文件另存为到其他服务端Url上
   * @callback SaveAsWpsUrl
   * @param {string} [url] 服务端的Url
   * @param {string | Function} [success] 成功的回调，回调为注册在window中的方法名或函数
   * @param {string} [fail] 失败的回调，回调为注册在window中的方法名或函数
   */
  saveAsUrl(url = `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, success, fail) {
    const doc = this.getActionDto();
    doc.SaveAsUrl(doc.Name, `http://127.0.0.1:1024/file/upload?token=123456&filename=test`, 'file', success, fail);
  }
};