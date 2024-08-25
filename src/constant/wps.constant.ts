import { WpsAddonModel } from '@/types/model/wps.model';
import { ClientType } from '@/types/enum/common.enum';

export const EtAddonTestLocal: WpsAddonModel = {
  addonType: ClientType.et,
  online: 'true',
  url: 'http://127.0.0.1:6789/wps-plugins/hello-wps/',
  name: 'wps测试_local'
};