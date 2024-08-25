import React from 'react';
import { Button } from 'antd';
import { sendToNewWps, sendToWps, showToFront, wpsClientState } from '@/utils/wps-oa.util';
import { WpsMsgStatus } from '@/types/enum/common.enum';

const WpsOaDemo = () => {

  const openNew = () => sendToNewWps({
    info: {
      fileName: 'wps测试',
      userName: '郎云松',
      token: '123456',
      downloadPath: 'http://localhost:1024/assets/file/test.xlsx'
    }
  });

  const openDefault = () => sendToWps({
    info: {
      fileName: 'wps测试',
      userName: '郎云松',
      token: '123456',
      downloadPath: 'http://localhost:1024/assets/file/test.xlsx',
    },
    addonUrl: 'http://127.0.0.1:6789/wps-plugins/hello-wps/',
    handleOaMessage: (res) => {
      console.log(res, 'handleOaMessage');
      if (JSON.parse(res).status === WpsMsgStatus.文档已存在) {
        openNew();
      } else {
        showToFront();
      }
    }
  });

  return (
    <div>
      <Button onClick={openDefault}>用WPS打开</Button>
      <Button onClick={openNew}>多线程打开</Button>
      <Button onClick={() => wpsClientState()}>客户端状态</Button>
      <Button onClick={() => showToFront()}>置顶客户端</Button>
    </div>
  );
};

export default WpsOaDemo;