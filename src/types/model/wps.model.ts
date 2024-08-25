import { ClientType, WpsMsgStatus } from '@/types/enum/common.enum';

export interface WpsAddonModel {
  'name': string,
  'addonType': ClientType,
  'online': string,
  'url': string
}

export interface WpsMegModel {
  message?: string;
  response?: string;
  status?: WpsMsgStatus;
}