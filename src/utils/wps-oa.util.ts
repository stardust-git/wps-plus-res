import { WpsClient, WpsInvoke } from '@/asset/js/wps-oa-sdk/wps_sdk.js';
import { ClientType, WpsMsgStatus } from '@/types/enum/common.enum';
import { EtAddonTestLocal } from '@/constant/wps.constant';
import { WpsMegModel } from '@/types/model/wps.model';

/**
 * 客户端状态
 * @param clientType
 */
export const wpsClientState = (clientType = ClientType.et) => {
  WpsInvoke.IsClientRunning(clientType, function (status) {
    console.log(status, 'status');
  });
};

/**
 * 显示到客户端顶部
 */
export const showToFront = (clientType = ClientType.et, addonName = EtAddonTestLocal.name,) => {
  WpsInvoke.ShowToFront(clientType, addonName, function (status) {
    console.log(status, 'ShowToFront');
  });
};

/**
 * 发送到wps
 * @param options
 */
export const sendToWps = (options: {
  clientType?: ClientType;
  addonName?: string;
  info?: Object;
  entry?: string;
  addonUrl?: string;
  handleOaMessage?: (res: string) => void;
} = {}): Promise<WpsMegModel> => {
  const {
    clientType = ClientType.et,
    addonName = EtAddonTestLocal.name,
    info = {},
    entry = 'dispatcher',
    handleOaMessage = (res: string) => {
      console.log(res, 'clientMsg');
    }
  } = options;
  return new Promise((resolve, reject) => {
    WpsInvoke.InvokeAsHttp(
      clientType, // 组件类型
      addonName, // 插件名，与wps客户端加载的加载的插件名对应
      entry, // 插件方法入口，与wps客户端加载的加载的插件代码对应，详细见插件代码
      info, // 传递给插件的数据
      function (result: WpsMegModel) {
        console.log(result, 'wps-client-callback');
        // 调用回调，status为0为成功，其他是错误
        if (result.status === WpsMsgStatus.成功) {
          resolve(result);
        } else {
          reject(result);
        }
      },
      false,
      null,
      false,
    );
    /**
     * 接受WPS加载项发送的消息
     */
    WpsInvoke.RegWebNotify(
      clientType,
      addonName,
      handleOaMessage
    );
  });
};

/**
 * 发送到新wps
 */
  export const sendToNewWps = (options: {
    clientType?: ClientType;
    addonName?: string;
    info?: Object;
    entry?: string;
    onMessage?: (res: WpsMegModel) => void;
  } = {}) => {
    const {
      clientType = ClientType.et,
      addonName = EtAddonTestLocal.name,
      info = {},
      entry = 'dispatcher',
      onMessage = (res) => {
        console.log(res, 'onMessage');
      }
    } = options;
    const wpsClient = new WpsClient(clientType); //初始化一个多进程对象，多进程时才需要
    console.log(wpsClient, 'wpsClient');

    return new Promise((resolve, reject) => {
      wpsClient.InvokeAsHttp(
        addonName, // 插件名，与wps客户端加载的加载的插件名对应
        entry, // 插件方法入口，与wps客户端加载的加载的插件代码对应，详细见插件代码
        info, // 传递给插件的数据
        function (result: WpsMegModel) {
          // 调用回调，status为0为成功，其他是错误
          if (result.status === WpsMsgStatus.成功) {
            resolve(result);
          } else {
            reject(result);
          }
        },
      );
      wpsClient.onMessage = onMessage;
    });
  };