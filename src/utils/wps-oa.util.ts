import { WpsInvoke } from '@/asset/js/wps-oa-sdk/wps_sdk.js';
import { ClientType, WpsMsgStatus } from '@/types/enum/common.enum';
import { EtAddonTestLocal } from '@/constant/wps.constant';
import { WpsMegModel } from '@/types/model/wps.model';

export const openInWps = (options: {
  clientType?: ClientType;
  addonName?: string;
  info?: Object;
  entry?: string;
} = {}) => {
  const { clientType = ClientType.et, addonName = EtAddonTestLocal.name, info = {}, entry = 'dispatcher' } = options;
  return new Promise((resolve, reject) => {
    WpsInvoke.InvokeAsHttp(
      clientType, // 组件类型
      clientType, // 插件名，与wps客户端加载的加载的插件名对应
      entry, // 插件方法入口，与wps客户端加载的加载的插件代码对应，详细见插件代码
      info, // 传递给插件的数据
      function (result: WpsMegModel) {
        // 调用回调，status为0为成功，其他是错误
        if (result.status === WpsMsgStatus.失败) {
          resolve(result);
        } else {
          reject(result);
        }
      },
    );
  });
};