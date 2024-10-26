if (typeof (window.wps) == "undefined") {
    window.wps = window;
}
var time=new Date().getTime() //添加时间戳，防止js文件使用浏览器缓存
document.write("<script language='javascript' src='../common/const.js?time="+time+"'></script>");
document.write("<script language='javascript' src='../common/util.js?time="+time+"'></script>");
document.write("<script language='javascript' src='main.js?time="+time+"'></script>");
