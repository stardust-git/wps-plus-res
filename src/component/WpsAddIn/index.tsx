import React from "react";
import { Button } from "antd";

const WpsAddIn = () => {
  const open1 = () => {
    wps.ShowDialog(
      "https://oa.paas.cmbchina.com/enterprise/portal?id=212577774522269696&enterpriseDomain=cmb",
      "这是一个对话框网页",
      400 * window.devicePixelRatio,
      400 * window.devicePixelRatio,
      false
    );
  };

  const open2 = () => {
    wps.Range("A3").Value2 = "=A1+A2";
  };

  const open3 = () => {
    alert(wps.Range("A3").Value());
  };

  const open4 = () => {
    let path = Application.ActiveWorkbook.FullName;
    function binStringToArrayBuffer(bin) {
      const length = bin.length;
      const buf = new ArrayBuffer(length);
      const arr = new Uint8Array(buf);
      for (let i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
      }
      return buf;
    }

    // 将二进制字符串数据转换为 Blob 文件流
    function binStringToBlob(bin, type) {
      const buffer = binStringToArrayBuffer(bin);
      return new Blob([buffer], { type: type });
    }

    console.log(binStringToBlob(Application.FileSystem.readAsBinaryString(path), "txt"));
  };

  const open5 = () => {
    wps.ActiveSheet.Copy(); //复制工作表，如果Copy方法没有参数则默认新建一个工作簿
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      wps加载项ApiDemo
      <Button onClick={open1}>弹出弹框</Button>
      <Button onClick={open2}>写入Wps单元格</Button>
      <Button onClick={open3}>读取Wps单元格</Button>
      <Button onClick={open4}>获取Wps文件</Button>
      <Button onClick={open4}>新建一片文字</Button>
    </div>
  );
};

export default WpsAddIn;
