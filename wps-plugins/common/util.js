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

window.ConfigUtils = (function () {
  /**
   * 获取招乎文档配置目录
   * @return {string}
   */
  const getConfigDir = () => {
    let dirPath = '';
    try {
      // 取系统配置路径
      dirPath = wps.Env.GetAppDataPath();
    } catch (e) {
    }
    if (!dirPath) {
      // 取临时文件路径（兼容iOS）
      dirPath = wps.Env.GetTempPath();
    }
    return dirPath;
  };

  /**
   * 获取加载项配置路径
   */
  const getAddonConfigPath = () => {
    return CONFIG_ROOT_PATH_CONST + '/' + ADDON_CONFIG_FILE_NAME;
  };

  /**
   * 读取插件配置信息
   * @return {Object | null}
   */
  const readAddonConfig = () => {
    const dirPath = getConfigDir();
    if (!dirPath) {
      return null;
    }
    const filePath = dirPath + getAddonConfigPath();
    if (!wps.FileSystem.Exists(filePath)) {
      return null;
    }
    try {
      const fileString = wps.FileSystem.ReadFile(filePath);
      const configArr = fileString.split('\n');
      const result = {};
      let configGroupName = '';
      for (const configStr of configArr) {
        // 以[xxx]为配置组
        const matchInfo = configStr.match(/\[(.+?)\]/);
        if (matchInfo) {
          configGroupName = matchInfo[1];
          result[configGroupName] = {};
          continue;
        }
        // 以xxx=yyy为配置键值对
        const arr = configStr.split('=');
        if (configGroupName && arr.length === 2) {
          result[configGroupName][arr[0]] = arr[1];
        }
      }
      return result;
    } catch (e) {
      return null;
    }
  };

  /**
   * 配置对象转字符串
   */
  const configObjToString = (configObj) => {
    return Object.values(AddonConfigGroupEnum).reduce((res, group) => {
      const groupCnt = configObj[group];
      if (!groupCnt) {
        return res;
      }
      let config = `[${group}]\n`;
      Object.entries(groupCnt).forEach(([key, value]) => {
        config += `${key}=${value}\n`;
      });
      return res + config + '\n';
    }, '');
  };

  /**
   * 写加载项配置文件
   * @param {AddonConfigGroupEnum} configGroup
   * @param {string} key
   * @param {string} value
   */
  const writeAddonConfig = (configGroup, key, value) => {
    const dirPath = getConfigDir();
    if (!dirPath) {
      return false;
    }
    // 创建根路径
    if (!wps.FileSystem.Exists(dirPath + CONFIG_ROOT_PATH_CONST)) {
      wps.FileSystem.Mkdir(dirPath + CONFIG_ROOT_PATH_CONST);
    }
    const filePath = dirPath + getAddonConfigPath();

    if (!wps.FileSystem.Exists(filePath)) {
      const result = configObjToString({
        [configGroup]: {
          [key]: value,
        },
      });
      wps.FileSystem.WriteFile(filePath, result);
      return true;
    }
    const configObj = readAddonConfig();
    if (!configObj) {
      return false;
    }
    if (!configObj[configGroup]) {
      configObj[configGroup] = {};
    }
    configObj[configGroup][key] = value;
    wps.FileSystem.WriteFile(filePath, configObjToString(configObj));
    return true;
  };
  return {
    readAddonConfig,
    writeAddonConfig,
    configObjToString,
    getConfigDir,
    /**
     * 获取保存配置
     * @return {boolean}
     */
    getSaveTip() {
      const saveTip = readAddonConfig()?.[AddonConfigGroupEnum.通用]?.saveTip;
      if (saveTip && Number(saveTip)) {
        return true;
      }
      return false;
    },
    /**
     * 设置开启保存提示配置
     * @param {boolean} state
     */
    setSaveTip(state) {
      writeAddonConfig(AddonConfigGroupEnum.通用, 'saveTip', state ? 1 : 0);
    },
  };
})();

window.ComUtils = class ComUtils {
  clientType;
  mainTabId;
  loading = false;
  delFileList = [];

  /**
   * 清理临时目录文件
   * @param {string} tempDir
   */
  static clearTempDirFile(tempDir) {
    if (!wps.FileSystem.Exists(tempDir)) {
      return;
    }
    // 读取目录信息
    const dirInfo = wps.FileSystem.readdirSync(tempDir);
    // 目录下没有文件，不处理
    if (!dirInfo || !dirInfo.length) {
      return;
    }
    // 删除目录文件
    dirInfo.forEach(childFileName => {
      wps.FileSystem.Remove(tempDir + '/' + childFileName);
    });
  }

  /**
   * 深度清除临时文件，报错子文件
   * @param {string} tempDir
   */
  static deepClearTempDir(tempDir) {
    if (!wps.FileSystem.Exists(tempDir)) {
      return;
    }
    const delFile = (dirPath) => {
      const delResult = wps.FileSystem.Remove(dirPath);
      if (delResult) {
        return;
      }
      // 删除失败，说明是目录
      const dirInfo = wps.FileSystem.readdirSync(dirPath);
      // 目录下没有文件，直接删除文件
      if (!dirInfo || !dirInfo.length) {
        wps.FileSystem.rmdirSync(dirPath);
        return;
      }
      // 递归删除子文件
      dirInfo.forEach(childFileName => {
        delFile(dirPath + '/' + childFileName);
      });
      wps.FileSystem.rmdirSync(dirPath);
    };
    delFile(tempDir);
  };

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
   * 获取文档路径
   * @return {string}
   */
  static getDocumentPath() {
    return wps.Env.GetHomePath() + '/' + 'Documents';
  }

  /**
   * 得到不重复的文件名
   * @param {string} pathName
   * @return {string}
   */
  static getNotSameFileName(pathName) {
    if (!wps.FileSystem.Exists(pathName)) {
      return pathName;
    }
    const suffixIdx = pathName.lastIndexOf('.');
    const dirIdx = pathName.lastIndexOf('/');
    if (suffixIdx < dirIdx) {
      return this.getNotSameFileName(pathName);
    }
    return this.getNotSameFileName(pathName.slice(0, suffixIdx) + '(1)' + pathName.slice(suffixIdx));
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
   * @callback HandleWebFileInfoFunc
   * @param {Object} info
   * @param {string} info.fileName 文件名
   * @param {string} info.userName 用户名
   * @param {string} info.token 鉴权
   * @param {number} [info.isOA] oa文档类型
   * @param {string} info.downloadPath 下载链接
   * @returns {boolean}
   */
  handleWebFileInfo(info) {
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

  onBeforeClose(doc) {
    const fullNamePath = wps.FileSystem.absoluteFilePath(doc.FullName);
    if (fullNamePath.includes(wps.Env.GetTempPath() + ADDON_TEMP_DIR_CONST + '/' + TEMP_FILE_PREFIX_CONST)) {
      const res = confirm('当前文件是临时文件，是否保存到本地文档');
      if (res) {
        const newPath = ComUtils.getDocumentPath() + '/' + doc.Name;
        alert(newPath);
        if (wps.FileSystem.Exists(newPath)) {
          const res2 = confirm('文件名已存在，是否覆盖');
          if (res2) {
            this.getActionDto().SaveAs(newPath);
          } else {
            const newPath2 = ComUtils.getNotSameFileName(newPath);
            this.getActionDto().SaveAs(newPath2);
          }

        } else {
          this.getActionDto().SaveAs(newPath);
        }
        wps.FileSystem.Remove(fullNamePath);
      } else {
        this.delFileList.push(fullNamePath);
      }
    }
  }

  onApplicationQuit() {
    this.delFileList.forEach(filePath => {
      wps.FileSystem.Remove(filePath);
    });
  }

  /**
   * 处理wps加载项加载时操作
   * @param ribbonUI
   * @returns {boolean}
   */
  dealWpsWorkTabLoad(ribbonUI) {
    // wps.ribbonUI = ribbonUI;
    //挂载WPS的表格事件处理函数
    // wps.ApiEvent.AddApiEventListener("WindowActivate", OnWindowActivate);
    if (this.clientType === WpsClientTypeEnum.文档) {
      wps.ApiEvent.AddApiEventListener('DocumentBeforeClose', (doc) => this.onBeforeClose(doc));
      wps.ApiEvent.AddApiEventListener('ApplicationQuit', () => this.onApplicationQuit());
    }
    // wps.ApiEvent.AddApiEventListener("WorkbookBeforePrint", FileOutputDisable);
    // wps.ApiEvent.AddApiEventListener("WorkbookOpen", OnWorkbookOpen);
    // wps.ApiEvent.AddApiEventListener("NewWorkbook", OnWorkbookNew);
    // wps.ApiEvent.AddApiEventListener("DocumentBeforeCopy", OnDocumentBeforeCopy);
    // wps.ApiEvent.AddApiEventListener("DocumentBeforePaste", OnDocumentBeforePaste);
    // wps.ApiEvent.AddApiEventListener("DocumentRightsInfo", FileOutputDisable);
    // //"移动或复制工作表(&M)..."
    // wps.CommandBars.FindControl(null, 848).Enabled = false;
    // wps.CommandBars.FindControl(null, 848).Visible = false;

    // return true;

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

  getEnabledSystemTab = () => {
    return true;
  };
};