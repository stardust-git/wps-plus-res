import React from 'react';
import { Button } from 'antd';

const UtilDemo: React.FC = () => {

  return (
    <div>
      你好吗
      <Button onClick={() => {
        window.close();
      }}>关闭</Button>
    </div>
  );
};

export default UtilDemo;