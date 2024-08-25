import React from 'react';
import './index.less';
import { Outlet } from '@/.umi/exports';
import { wps } from '@/asset/js/wps-client';

const HeaderLayout: React.FC = (props) => {
  if (!wps) {
    return <div>没有wps对象</div>;
  }
  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default HeaderLayout;
