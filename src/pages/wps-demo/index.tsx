import React from 'react';
import UtilDemo from '@/component/UtilDemo';
import { Divider, Typography } from 'antd';
const { Title } = Typography;
const WpsDemo = () => {
  return <Typography>
    <Title>组件demo</Title>
    <Divider/>
    <UtilDemo/>
  </Typography>;
};

export default WpsDemo;
