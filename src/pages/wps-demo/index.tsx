import React from "react";
import WpsAddIn from "@/component/WpsAddIn";

const WpsDemo = () => {
  return window.wps ? <WpsAddIn /> : "没有Wps实例";
};

export default WpsDemo;
