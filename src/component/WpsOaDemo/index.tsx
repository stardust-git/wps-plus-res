import React from 'react';
import { Button } from 'antd';
import { openInWps } from '@/utils/wps-oa.util';

const WpsOaDemo = () => {
  return (
    <div>
      <Button onClick={() => openInWps()}>用WPS打开</Button>
    </div>
  );
};

export default WpsOaDemo;