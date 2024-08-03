var e = function () {
  return (e =
    Object.assign ||
    function (e) {
      for (var n, t = 1, r = arguments.length; t < r; t++)
        for (var a in (n = arguments[t])) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
      return e;
    }).apply(this, arguments);
};
function n(e, n, t, r) {
  return new (t || (t = Promise))(function (a, i) {
    function o(e) {
      try {
        c(r.next(e));
      } catch (e) {
        i(e);
      }
    }
    function s(e) {
      try {
        c(r.throw(e));
      } catch (e) {
        i(e);
      }
    }
    function c(e) {
      var n;
      e.done
        ? a(e.value)
        : ((n = e.value),
          n instanceof t
            ? n
            : new t(function (e) {
                e(n);
              })).then(o, s);
    }
    c((r = r.apply(e, n || [])).next());
  });
}
function t(e, n) {
  var t,
    r,
    a,
    i,
    o = {
      label: 0,
      sent: function () {
        if (1 & a[0]) throw a[1];
        return a[1];
      },
      trys: [],
      ops: [],
    };
  return (
    (i = { next: s(0), throw: s(1), return: s(2) }),
    "function" == typeof Symbol &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function s(i) {
    return function (s) {
      return (function (i) {
        if (t) throw new TypeError("Generator is already executing.");
        for (; o; )
          try {
            if (
              ((t = 1),
              r &&
                (a = 2 & i[0] ? r.return : i[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) &&
                !(a = a.call(r, i[1])).done)
            )
              return a;
            switch (((r = 0), a && (i = [2 & i[0], a.value]), i[0])) {
              case 0:
              case 1:
                a = i;
                break;
              case 4:
                return o.label++, { value: i[1], done: !1 };
              case 5:
                o.label++, (r = i[1]), (i = [0]);
                continue;
              case 7:
                (i = o.ops.pop()), o.trys.pop();
                continue;
              default:
                if (!(a = (a = o.trys).length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
                  o = 0;
                  continue;
                }
                if (3 === i[0] && (!a || (i[1] > a[0] && i[1] < a[3]))) {
                  o.label = i[1];
                  break;
                }
                if (6 === i[0] && o.label < a[1]) {
                  (o.label = a[1]), (a = i);
                  break;
                }
                if (a && o.label < a[2]) {
                  (o.label = a[2]), o.ops.push(i);
                  break;
                }
                a[2] && o.ops.pop(), o.trys.pop();
                continue;
            }
            i = n.call(e, o);
          } catch (e) {
            (i = [6, e]), (r = 0);
          } finally {
            t = a = 0;
          }
        if (5 & i[0]) throw i[1];
        return { value: i[0] ? i[1] : void 0, done: !0 };
      })([i, s]);
    };
  }
}
var r = (function () {
  function e() {}
  return (
    (e.add = function (n) {
      e.HANDLE_LIST.push(n), window.addEventListener("message", n, !1);
    }),
    (e.remove = function (n) {
      var t = e.HANDLE_LIST.indexOf(n);
      t >= 0 && e.HANDLE_LIST.splice(t, 1), window.removeEventListener("message", n, !1);
    }),
    (e.empty = function () {
      for (; e.HANDLE_LIST.length; ) window.removeEventListener("message", e.HANDLE_LIST.shift(), !1);
    }),
    (e.parse = function (e) {
      try {
        return "object" == typeof e ? e : e ? JSON.parse(e) : e;
      } catch (n) {
        return console.log("Message.parse Error:", n), e;
      }
    }),
    (e.HANDLE_LIST = []),
    e
  );
})();
function a(e) {
  return "[object Function]" === {}.toString.call(e);
}
var i,
  o,
  s,
  c,
  u = { origin: "" };
function l(e, n) {
  u[e] = n;
}
function d(e) {
  return u[e];
}
function f(e) {
  var n = d("origin");
  return (
    !!(function (e, n) {
      return (
        e !== n &&
        (e.replace(/www\./i, "").toLowerCase() !== n.replace(/www\./i, "").toLowerCase() ||
          (e.match("www.") ? void 0 : (l("origin", n), !1)))
      );
    })(n, e.origin) && (console.warn("postMessage 域名检查不通过", { safeOrigin: n, eventOrigin: e.origin }), !0)
  );
}
!(function (e) {
  (e.unknown = "unknown"), (e.spreadsheet = "s"), (e.writer = "w"), (e.presentation = "p"), (e.pdf = "f");
})(i || (i = {})),
  (function (e) {
    (e.wps = "w"), (e.et = "s"), (e.presentation = "p"), (e.pdf = "f");
  })(o || (o = {})),
  (function (e) {
    (e.nomal = "nomal"), (e.simple = "simple");
  })(s || (s = {})),
  (function (e) {
    (e[(e.requestFullscreen = 1)] = "requestFullscreen"), (e[(e.exitFullscreen = 0)] = "exitFullscreen");
  })(c || (c = {}));
var p,
  v,
  h,
  b =
    ((p = 0),
    function () {
      return (p += 1);
    }),
  m = function (e, n, t) {
    void 0 === t && (t = !0);
    var r = n;
    if (!v) {
      var a = function e(n) {
        var t = n.clientHeight;
        var r = n.clientWidth;
        0 !== t || 0 !== r || h
          ? (0 === t && 0 === r) || !h || (h.disconnect(), (h = null))
          : window.ResizeObserver &&
            (h = new ResizeObserver(function (t) {
              e(n);
            })).observe(n);
        v.style.cssText += "height: " + t + "px; width: " + r + "px";
      }.bind(null, r);
      (v = document.createElement("iframe")).classList.add("web-office-iframe");
      var i = {
        id: "office-iframe",
        src: e,
        scrolling: "no",
        frameborder: "0",
        allowfullscreen: "allowfullscreen",
        webkitallowfullscreen: "true",
        mozallowfullscreen: "true",
        allow: "clipboard-read; clipboard-write",
      };
      for (var o in (r
        ? ((i.style = "width: " + r.clientWidth + "px; height: " + r.clientHeight + "px;"),
          t && window.addEventListener("resize", a))
        : ((r = document.createElement("div")).classList.add("web-office-default-container"),
          (function (e) {
            var n = document.createElement("style");
            document.head.appendChild(n);
            var t = n.sheet;
            t.insertRule(e, t.cssRules.length);
          })(
            ".web-office-default-container {position: absolute; padding: 0;  margin: 0; width: 100%; height: 100%; left: 0; top: 0;}"
          ),
          document.body.appendChild(r),
          (i.style = "position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;")),
      i))
        v.setAttribute(o, i[o]);
      r.appendChild(v),
        (v.destroy = function () {
          v.parentNode.removeChild(v),
            (v = null),
            window.removeEventListener("resize", a),
            h && (h.disconnect(), (h = null));
        });
    }
    return v;
  };
var g = function (e) {
  m().contentWindow && m().contentWindow.postMessage(JSON.stringify(e), d("origin"));
};
function w(e, n, t) {
  return new Promise(function (a) {
    var i = b(),
      o = function (e) {
        if (!f(e)) {
          var n = r.parse(e.data);
          n.eventName === t && n.msgId === i && (a(n.data), r.remove(o));
        }
      };
    r.add(o), g({ data: e, msgId: i, eventName: n });
  });
}
var y = function (e) {
    return w(e, "wps.jssdk.api", "wps.api.reply");
  },
  k = function (e) {
    return w(e, "api.basic", "api.basic.reply");
  },
  j = { idMap: {} };
function I(e) {
  return n(this, void 0, void 0, function () {
    var n, a, i, o, s, c, u, l, d, p;
    return t(this, function (t) {
      switch (t.label) {
        case 0:
          return f(e)
            ? [2]
            : ((n = r.parse(e.data)),
              (a = n.eventName),
              (i = n.callbackId),
              (o = n.data),
              i && (s = j.idMap[i])
                ? ((c = s.split(":")),
                  (u = c[0]),
                  (l = c[1]),
                  "api.callback" === a && j[u] && j[u][l] ? [4, (p = j[u][l]).callback.apply(p, o.args)] : [3, 2])
                : [3, 2]);
        case 1:
          (d = t.sent()), g({ result: d, callbackId: i, eventName: "api.callback.reply" }), (t.label = 2);
        case 2:
          return [2];
      }
    });
  });
}
var O = function (e) {
    return n(void 0, void 0, void 0, function () {
      function n() {
        return Object.keys(j.idMap).find(function (e) {
          return j.idMap[e] === i + ":" + a;
        });
      }
      var a, i, o, s, c, u, l, d, f;
      return t(this, function (t) {
        switch (t.label) {
          case 0:
            return (a = e.prop), (i = e.parentObjId), [4, x([(o = e.value)])];
          case 1:
            return (
              (s = t.sent()),
              (c = s[0]),
              (u = s[1]),
              (e.value = c[0]),
              (l = Object.keys(u)[0]),
              (d = j[i]),
              null === o &&
                d &&
                d[a] &&
                ((f = n()) && delete j.idMap[f],
                delete d[a],
                Object.keys(d).length || delete j[i],
                Object.keys(j.idMap).length || r.remove(I)),
              l &&
                (Object.keys(j.idMap).length || r.add(I),
                j[i] || (j[i] = {}),
                (j[i][a] = { callbackId: l, callback: u[l] }),
                (f = n()) && delete j.idMap[f],
                (j.idMap[l] = i + ":" + a)),
              [2]
            );
        }
      });
    });
  },
  E = function (a, i, o, s) {
    return n(void 0, void 0, void 0, function () {
      var c, u, l, d, p, v, h, m;
      return t(this, function (w) {
        switch (w.label) {
          case 0:
            return (
              (c = b()),
              (d = new Promise(function (e, n) {
                (u = e), (l = n);
              })),
              (p = {}),
              i.args ? [4, x(i.args)] : [3, 2]
            );
          case 1:
            (v = w.sent()), (h = v[0]), (m = v[1]), (i.args = h), (p = m), (w.label = 2);
          case 2:
            return "api.setter" !== a ? [3, 4] : [4, O(i)];
          case 3:
            w.sent(), (w.label = 4);
          case 4:
            return (
              (function (n) {
                var t = n[0],
                  r = n[1];
                "function" == typeof (t = e({}, t)).data && (t.data = t.data());
                r(), g(t);
              })([
                { eventName: a, data: i, msgId: c },
                function () {
                  var e = this,
                    i = function (d) {
                      return n(e, void 0, void 0, function () {
                        var e, n, v;
                        return t(this, function (t) {
                          switch (t.label) {
                            case 0:
                              return f(d)
                                ? [2]
                                : "api.callback" === (e = r.parse(d.data)).eventName && e.callbackId && p[e.callbackId]
                                ? [4, p[e.callbackId].apply(p, e.data.args)]
                                : [3, 2];
                            case 1:
                              (n = t.sent()),
                                g({ result: n, eventName: "api.callback.reply", callbackId: e.callbackId }),
                                (t.label = 2);
                            case 2:
                              return (
                                e.eventName === a + ".reply" &&
                                  e.msgId === c &&
                                  (e.error
                                    ? (((v = new Error("")).stack = e.error + "\n" + o), s && s(), l(v))
                                    : u(e.result),
                                  r.remove(i)),
                                [2]
                              );
                          }
                        });
                      });
                    };
                  return r.add(i), d;
                },
              ]),
              [2, d]
            );
        }
      });
    });
  };
function x(e) {
  return n(this, void 0, void 0, function () {
    var n, r, a, i, o, s, c, u, l, d, f;
    return t(this, function (t) {
      switch (t.label) {
        case 0:
          (n = {}), (r = []), (a = e.slice(0)), (t.label = 1);
        case 1:
          return a.length ? ((i = void 0), [4, a.shift()]) : [3, 13];
        case 2:
          return (o = t.sent()) && o.done ? [4, o.done()] : [3, 4];
        case 3:
          t.sent(), (t.label = 4);
        case 4:
          if (
            !(function (e) {
              if (!e) return !1;
              for (var n = e; null !== Object.getPrototypeOf(n); ) n = Object.getPrototypeOf(n);
              return Object.getPrototypeOf(e) === n;
            })(i)
          )
            return [3, 11];
          for (c in ((i = {}), (s = []), o)) s.push(c);
          (u = 0), (t.label = 5);
        case 5:
          return u < s.length
            ? ((l = s[u]), (d = o[l]), /^[A-Z]/.test(l) ? (d && d.done ? [4, d.done()] : [3, 7]) : [3, 8])
            : [3, 10];
        case 6:
          t.sent(), (t.label = 7);
        case 7:
          d && d.objId
            ? (d = { objId: d.objId })
            : "function" == typeof d && ((f = b()), (n[f] = d), (d = { callbackId: f })),
            (t.label = 8);
        case 8:
          (i[l] = d), (t.label = 9);
        case 9:
          return u++, [3, 5];
        case 10:
          return [3, 12];
        case 11:
          o && o.objId
            ? (i = { objId: o.objId })
            : "function" == typeof o && void 0 === o.objId
            ? ((f = b()), (n[f] = o), (i = { callbackId: f }))
            : (i = o),
            (t.label = 12);
        case 12:
          return r.push(i), [3, 1];
        case 13:
          return [2, [r, n]];
      }
    });
  });
}
var _ = function (n, t) {
    void 0 === t && (t = !0);
    var r = e({}, n),
      a = r.headers,
      i = void 0 === a ? {} : a,
      o = r.subscriptions,
      c = void 0 === o ? {} : o,
      u = r.mode,
      l = void 0 === u ? s.nomal : u,
      d = r.commonOptions,
      f = i.backBtn,
      p = void 0 === f ? {} : f,
      v = i.shareBtn,
      h = void 0 === v ? {} : v,
      b = i.otherMenuBtn,
      m = void 0 === b ? {} : b,
      g = function (e, n) {
        e.subscribe &&
          "function" == typeof e.subscribe &&
          ((e.callback = n), (c[n] = e.subscribe), t && delete e.subscribe);
      };
    if (
      (g(p, "wpsconfig_back_btn"),
      g(h, "wpsconfig_share_btn"),
      g(m, "wpsconfig_other_menu_btn"),
      m.items && Array.isArray(m.items))
    ) {
      var w = [];
      m.items.forEach(function (e, n) {
        switch ((void 0 === e && (e = {}), e.type)) {
          case "export_img":
            (e.type = 1), (e.callback = "export_img");
            break;
          case "export_pdf":
            (e.type = 1), (e.callback = "export_pdf");
            break;
          case "save_version":
            (e.type = 1), (e.callback = "save_version");
            break;
          case "about_wps":
            (e.type = 1), (e.callback = "about_wps");
            break;
          case "split_line":
            e.type = 2;
            break;
          case "custom":
            (e.type = 3), g(e, "wpsconfig_other_menu_btn_" + n), w.push(e);
        }
      }),
        w.length && (N || T) && (m.items = w);
    }
    r.url = r.url || r.wpsUrl;
    var y = [];
    if (
      ((l === s.simple || (d && !1 === d.isShowTopArea)) && y.push("simple", "hidecmb"),
      r.debug && y.push("debugger"),
      r.url && y.length && (r.url = r.url + (r.url.indexOf("?") >= 0 ? "&" : "?") + y.join("&")),
      d &&
        (d.isParentFullscreen || d.isBrowserViewFullscreen) &&
        (document.addEventListener("fullscreenchange", L),
        document.addEventListener("webkitfullscreenchange", L),
        document.addEventListener("mozfullscreenchange", L)),
      r.wordOptions && (r.wpsOptions = r.wordOptions),
      r.excelOptions && (r.etOptions = r.excelOptions),
      r.pptOptions && (r.wppOptions = r.pptOptions),
      "object" == typeof c.print)
    ) {
      var k = "wpsconfig_print";
      "function" == typeof c.print.subscribe &&
        ((c[k] = c.print.subscribe),
        (r.print = { callback: k }),
        void 0 !== c.print.custom && (r.print.custom = c.print.custom)),
        delete c.print;
    }
    "function" == typeof c.exportPdf &&
      ((c[(k = "wpsconfig_export_pdf")] = c.exportPdf), (r.exportPdf = { callback: k }), delete c.exportPdf);
    return r.commandBars && S(r.commandBars, !1), e(e({}, r), { subscriptions: c });
  },
  C = function (e) {
    void 0 === e && (e = "");
    var n = "";
    if (!n && e) {
      var t = e.toLowerCase();
      -1 !== t.indexOf("/office/s/") && (n = i.spreadsheet),
        -1 !== t.indexOf("/office/w/") && (n = i.writer),
        -1 !== t.indexOf("/office/p/") && (n = i.presentation),
        -1 !== t.indexOf("/office/f/") && (n = i.pdf);
    }
    if (!n) {
      var r = e.match(/[\?&]type=([a-z]+)/) || [];
      n = o[r[1]] || "";
    }
    return n;
  };
function S(e, n) {
  void 0 === n && (n = !0);
  var t = e.map(function (e) {
    var n = e.attributes;
    if (!Array.isArray(n)) {
      var t = [];
      for (var r in n)
        if (n.hasOwnProperty(r)) {
          var a = { name: r, value: n[r] };
          t.push(a);
        }
      e.attributes = t;
    }
    return e;
  });
  return n && g({ data: t, eventName: "setCommandBars" }), t;
}
var A = window.navigator.userAgent.toLowerCase(),
  N = /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(A),
  T = (function () {
    try {
      return -1 !== window._parent.location.search.indexOf("from=wxminiprogram");
    } catch (e) {
      return !1;
    }
  })();
function L() {
  var e = { status: c.requestFullscreen },
    n = document,
    t = n.fullscreenElement || n.webkitFullscreenElement || n.mozFullScreenElement;
  (e.status = t ? c.requestFullscreen : c.exitFullscreen), g({ data: e, eventName: "fullscreenchange" });
}
var P = function () {
  j.idMap = {};
};
function F() {
  console.group("JSSDK 事件机制调整说明"),
    console.warn("jssdk.on、jssdk.off 和 jssdk.Application.Sub 将在后续版本中被弃用，建议使用改进后的 ApiEvent"),
    console.warn("具体请参考：https://wwo.wps.cn/docs/front-end/basic-usage/events/intro/"),
    console.groupEnd();
}
var D = 0,
  B = new Set();
function V(e) {
  return (
    (D += 1),
    !e &&
      (function (e) {
        B.forEach(function (n) {
          return n(e);
        });
      })(D),
    D
  );
}
function R() {
  var e = new Error("");
  return (e.stack || e.message || "").split("\n").slice(2).join("\n");
}
function H(a, o) {
  var s,
    c = this,
    u = o.Events,
    l = o.Enum,
    d = o.Props,
    p = d[0],
    v = d[1],
    h = { objId: D };
  switch (
    ((function n(t, r, a) {
      var i = r.slice(0);
      var o = function () {
        var r = i.shift();
        !r.alias && ~M.indexOf(r.prop) && i.push(e(e({}, r), { alias: r.prop + "Async" })),
          Object.defineProperty(t, r.alias || r.prop, {
            get: function () {
              var i = this,
                o = 1 === r.cache,
                s = o && this["__" + r.prop + "CacheValue"];
              if (!s) {
                var c = R(),
                  u = V(o),
                  l = function () {
                    for (var n, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                    void 0 !== r.caller
                      ? (function n(t, r, a) {
                          var i = r.slice(0);
                          var o = function () {
                            var r = i.shift();
                            !r.alias && ~M.indexOf(r.prop) && i.push(e(e({}, r), { alias: r.prop + "Async" })),
                              Object.defineProperty(t, r.alias || r.prop, {
                                get: function () {
                                  var e = this,
                                    i = 1 === r.cache,
                                    o = i && this["__" + r.prop + "CacheValue"];
                                  if (!o) {
                                    var s = R(),
                                      c = V(i),
                                      u = function () {
                                        for (var e, i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                                        void 0 !== r.caller ? n((e = { objId: V() }), a[r.caller], a) : (e = {});
                                        return (
                                          W(
                                            u,
                                            e,
                                            "api.caller",
                                            { obj: u, args: i, parentObjId: t.objId, objId: e.objId, prop: r.prop },
                                            s
                                          ),
                                          e
                                        );
                                      };
                                    return (
                                      (u.objId = -1),
                                      void 0 !== r.getter && ((u.objId = c), n(u, a[r.getter], a)),
                                      W(
                                        t,
                                        u,
                                        "api.getter",
                                        { parentObjId: t.objId, objId: u.objId, prop: r.prop },
                                        s,
                                        function () {
                                          delete e["__" + r.prop + "CacheValue"];
                                        }
                                      ),
                                      i && (this["__" + r.prop + "CacheValue"] = u),
                                      u
                                    );
                                  }
                                  return o;
                                },
                                set: function (e) {
                                  var n = R();
                                  return W(
                                    t,
                                    {},
                                    "api.setter",
                                    { value: e, parentObjId: t.objId, objId: -1, prop: r.prop },
                                    n
                                  );
                                },
                              });
                          };
                          for (; i.length; ) o();
                        })((n = { objId: V() }), a[r.caller], a)
                      : (n = {});
                    return (
                      W(l, n, "api.caller", { obj: l, args: i, parentObjId: t.objId, objId: n.objId, prop: r.prop }, c),
                      n
                    );
                  };
                return (
                  (l.objId = -1),
                  void 0 !== r.getter && ((l.objId = u), n(l, a[r.getter], a)),
                  W(t, l, "api.getter", { parentObjId: t.objId, objId: l.objId, prop: r.prop }, c, function () {
                    delete i["__" + r.prop + "CacheValue"];
                  }),
                  o && (this["__" + r.prop + "CacheValue"] = l),
                  l
                );
              }
              return s;
            },
            set: function (e) {
              var n = R();
              return W(t, {}, "api.setter", { value: e, parentObjId: t.objId, objId: -1, prop: r.prop }, n);
            },
          });
      };
      for (; i.length; ) o();
    })(h, p, v),
    (h.Events = u),
    (h.Enum = l),
    (a.Enum = h.Enum),
    (a.Events = h.Events),
    (a.Props = d),
    C(a.url))
  ) {
    case i.writer:
      a.WordApplication = a.WpsApplication = function () {
        return h;
      };
      break;
    case i.spreadsheet:
      a.ExcelApplication = a.EtApplication = function () {
        return h;
      };
      break;
    case i.presentation:
      a.PPTApplication = a.WppApplication = function () {
        return h;
      };
      break;
    case i.pdf:
      a.PDFApplication = function () {
        return h;
      };
  }
  (a.Application = h),
    (a.Free = function (e) {
      return E("api.free", { objId: e }, "");
    }),
    (a.Stack = h.Stack =
      ((s = function (e) {
        a && a.Free(e);
      }),
      function () {
        var e = [],
          n = function (n) {
            e.push(n);
          };
        return (
          B.add(n),
          {
            End: function () {
              s(e), B.delete(n);
            },
          }
        );
      }));
  var b = {};
  r.add(function (e) {
    return n(c, void 0, void 0, function () {
      var n, a, i, o, s;
      return t(this, function (t) {
        switch (t.label) {
          case 0:
            return f(e)
              ? [2]
              : "api.event" === (n = r.parse(e.data)).eventName && n.data
              ? ((a = n.data), (i = a.eventName), (o = a.data), (s = b[i]) ? [4, s(o)] : [3, 2])
              : [3, 2];
          case 1:
            t.sent(), (t.label = 2);
          case 2:
            return [2];
        }
      });
    });
  }),
    (h.Sub = {});
  var m = function (e) {
    var n = u[e];
    Object.defineProperty(h.Sub, n, {
      set: function (e) {
        F(), (b[n] = e), g({ eventName: "api.event.register", data: { eventName: n, register: !!e, objId: (D += 1) } });
      },
    });
  };
  for (var w in u) m(w);
}
var M = [
  "ExportAsFixedFormat",
  "GetOperatorsInfo",
  "ImportDataIntoFields",
  "ReplaceText",
  "ReplaceBookmark",
  "GetBookmarkText",
  "GetComments",
];
function z(n, t, r) {
  var a = t.slice(0);
  var i = function () {
    var t = a.shift();
    if (!t.alias && ~M.indexOf(t.prop)) {
      a.push(e(e({}, t), { alias: t.prop + "Async" }));
    }
    Object.defineProperty(n, t.alias || t.prop, {
      get: function () {
        var e = this;
        var a = t.cache === 1;
        var i = a && this["__" + t.prop + "CacheValue"];
        if (!i) {
          var o = R();
          var s = V(a);
          var c = function () {
            for (var e = [], a = 0, i; a < arguments.length; a++) {
              e[a] = arguments[a];
            }
            if (t.caller !== undefined) {
              i = { objId: V() };
              z(i, r[t.caller], r);
            } else {
              i = {};
            }
            return W(u, i, "api.caller", { obj: u, args: e, parentObjId: n.objId, objId: i.objId, prop: t.prop }, o), i;
          };
          var u = c;
          u.objId = -1;
          if (t.getter !== undefined) {
            u.objId = s;
            z(u, r[t.getter], r);
          }
          W(n, u, "api.getter", { parentObjId: n.objId, objId: u.objId, prop: t.prop }, o, function () {
            delete e["__" + t.prop + "CacheValue"];
          });
          if (a) {
            this["__" + t.prop + "CacheValue"] = u;
          }
          return u;
        }
        return i;
      },
      set: function (e) {
        var r = R();
        return W(n, {}, "api.setter", { value: e, parentObjId: n.objId, objId: -1, prop: t.prop }, r);
      },
    });
  };
  while (a.length) {
    i();
  }
}
function W(e, n, t, r, a, i) {
  var o,
    s = (e.done ? e.done() : Promise.resolve()).then(function () {
      return o || (o = E(t, r, a, i)), o;
    });
  (n.done = function () {
    return s;
  }),
    (n.then = function (e, t) {
      return r.objId >= 0
        ? ((n.then = null),
          (n.catch = null),
          s
            .then(function () {
              e(n);
            })
            .catch(function (e) {
              return t(e);
            }))
        : s.then(e, t);
    }),
    (n.catch = function (e) {
      return s.catch(e);
    }),
    (n.Destroy = function () {
      return E("api.free", { objId: n.objId }, "");
    });
}
var q = {};
var K = null,
  G = {
    fileOpen: "fileOpen",
    tabSwitch: "tabSwitch",
    fileSaved: "fileSaved",
    fileStatus: "fileStatus",
    fullscreenChange: "fullscreenChange",
    error: "error",
    stage: "stage",
  },
  J = {
    getToken: "api.getToken",
    onToast: "event.toast",
    onHyperLinkOpen: "event.hyperLinkOpen",
    getClipboardData: "api.getClipboardData",
  };
function U(a, i, o, s, c, u, l) {
  var d = this;
  void 0 === o && (o = {});
  r.add(function (p) {
    return n(d, void 0, void 0, function () {
      var n, d, v, h, b, m, w, y, k, j, I, O, E, x, _, C, S, A, N;
      return t(this, function (t) {
        switch (t.label) {
          case 0:
            return f(p)
              ? [2]
              : ((n = r.parse(p.data)),
                (d = n.eventName),
                (v = void 0 === d ? "" : d),
                (h = n.data),
                (b = void 0 === h ? null : h),
                (m = n.url),
                (w = void 0 === m ? null : m),
                -1 !== ["wps.jssdk.api"].indexOf(v)
                  ? [2]
                  : "ready" !== v
                  ? [3, 1]
                  : (c.apiReadySended &&
                      (function (e) {
                        var n = [];
                        Object.keys(q).forEach(function (t) {
                          q[t].forEach(function (r) {
                            var a = t;
                            e.off(a, r), n.push({ handle: r, eventName: a });
                          }),
                            delete q[t];
                        }),
                          n.forEach(function (e) {
                            var n = e.eventName,
                              t = e.handle;
                            null == K || K.ApiEvent.AddApiEventListener(n, t);
                          });
                      })(i),
                    g({ eventName: "setConfig", data: e(e({}, o), { version: a.version }) }),
                    a.tokenData && a.setToken(e(e({}, a.tokenData), { hasRefreshTokenConfig: !!o.refreshToken })),
                    (a.iframeReady = !0),
                    [3, 15]));
          case 1:
            return "error" !== v ? [3, 2] : (i.emit(G.error, b), [3, 15]);
          case 2:
            return "open.result" !== v
              ? [3, 3]
              : (void 0 !==
                  (null === (S = null == b ? void 0 : b.fileInfo) || void 0 === S ? void 0 : S.officeVersion) &&
                  ((a.mainVersion = b.fileInfo.officeVersion),
                  console.log("WebOfficeSDK Main Version: V" + a.mainVersion)),
                i.emit(G.fileOpen, b),
                [3, 15]);
          case 3:
            return "api.scroll" !== v ? [3, 4] : (window.scrollTo(b.x, b.y), [3, 15]);
          case 4:
            if (v !== J.getToken) return [3, 9];
            (y = { token: !1 }), (t.label = 5);
          case 5:
            return t.trys.push([5, 7, , 8]), [4, c.refreshToken()];
          case 6:
            return (y = t.sent()), [3, 8];
          case 7:
            return (k = t.sent()), console.error("refreshToken: " + (k || "fail to get")), [3, 8];
          case 8:
            return g({ eventName: J.getToken + ".reply", data: y }), [3, 15];
          case 9:
            if (v !== J.getClipboardData) return [3, 14];
            (j = { text: "", html: "" }), (t.label = 10);
          case 10:
            return t.trys.push([10, 12, , 13]), [4, c.getClipboardData()];
          case 11:
            return (j = t.sent()), [3, 13];
          case 12:
            return (I = t.sent()), console.error("getClipboardData: " + (I || "fail to get")), [3, 13];
          case 13:
            return g({ eventName: J.getClipboardData + ".reply", data: j }), [3, 15];
          case 14:
            v === J.onToast
              ? c.onToast(b)
              : v === J.onHyperLinkOpen
              ? c.onHyperLinkOpen(b)
              : "stage" === v
              ? i.emit(G.stage, b)
              : "event.callback" === v
              ? ((O = b.eventName),
                (E = b.data),
                (x = O),
                "fullScreenChange" === O && (x = G.fullscreenChange),
                "file.saved" === O && (x = G.fileStatus),
                ((null === (A = o.commonOptions) || void 0 === A ? void 0 : A.isBrowserViewFullscreen) ||
                  (null === (N = o.commonOptions) || void 0 === N ? void 0 : N.isParentFullscreen)) &&
                  "fullscreenchange" === x &&
                  ((_ = E.status),
                  (C = E.isDispatchEvent),
                  o.commonOptions.isBrowserViewFullscreen
                    ? (function (e, n, t, r) {
                        0 === e
                          ? (n.style = "position: static; width: " + t.width + "; height: " + t.height)
                          : 1 === e && (n.style = "position: absolute; width: 100%; height: 100%"),
                          r &&
                            (function (e) {
                              ["fullscreen", "fullscreenElement"].forEach(function (n) {
                                Object.defineProperty(document, n, {
                                  get: function () {
                                    return !!e.status;
                                  },
                                  configurable: !0,
                                });
                              });
                              var n = new CustomEvent("fullscreenchange");
                              document.dispatchEvent(n);
                            })({ status: e });
                      })(_, u, l, C)
                    : o.commonOptions.isParentFullscreen &&
                      (function (e, n, t) {
                        var r = document.querySelector(t),
                          a = r && 1 === r.nodeType ? r : n;
                        if (0 === e) {
                          var i = document,
                            o =
                              i.exitFullscreen ||
                              i.mozCancelFullScreen ||
                              i.msExitFullscreen ||
                              i.webkitCancelFullScreen ||
                              i.webkitExitFullscreen;
                          o.call(document);
                        } else if (1 === e) {
                          var s =
                            a.requestFullscreen ||
                            a.mozRequestFullScreen ||
                            a.msRequestFullscreen ||
                            a.webkitRequestFullscreen;
                          s.call(a);
                        }
                      })(_, u, o.commonOptions.isParentFullscreen)),
                i.emit(x, E))
              : "api.ready" === v && H(a, b),
              (t.label = 15);
          case 15:
            return "function" == typeof s[v] && s[v](a, w || b), [2];
        }
      });
    });
  });
}
function Z(e) {
  return new Promise(function (n) {
    var t = function (a) {
      f(a) || (r.parse(a.data).eventName === e && (n(), r.remove(t)));
    };
    r.add(t);
  });
}
function Q(e) {
  var i,
    o = this;
  void 0 === e && (e = {}), K && K.destroy();
  try {
    var s = _(e),
      c = s.subscriptions,
      u = void 0 === c ? {} : c,
      d = s.mount,
      f = void 0 === d ? null : d,
      p = s.url,
      v = s.refreshToken,
      h = s.onToast,
      b = s.onHyperLinkOpen,
      w = s.getClipboardData;
    l("origin", (p.match(/https*:\/\/[^\/]+/g) || [])[0]);
    var j = m(p, f),
      I = Z("ready"),
      O = Z("open.result"),
      E = Z("api.ready"),
      x = f ? { width: f.clientWidth + "px", height: f.clientHeight + "px" } : { width: "100vw", height: "100vh" };
    delete s.mount, p && delete s.url, delete s.subscriptions;
    var C =
        ((i = i || Object.create(null)),
        {
          on: function (e, n) {
            (i[e] || (i[e] = [])).push(n);
          },
          off: function (e, n) {
            i[e] && i[e].splice(i[e].indexOf(n) >>> 0, 1);
          },
          emit: function (e, n) {
            (i[e] || []).slice().map(function (e) {
              e(n);
            }),
              (i["*"] || []).slice().map(function (t) {
                t(e, n);
              });
          },
        }),
      A = { apiReadySended: !1 },
      N = function (e, r, a) {
        return n(o, void 0, void 0, function () {
          return t(this, function (n) {
            switch (n.label) {
              case 0:
                return (function (e, n, t) {
                  if (q[e]) {
                    var r = !!q[e].find(function (e) {
                      return e === n;
                    });
                    return r && "off" === t
                      ? (C.off(e, n),
                        (q[e] = q[e].filter(function (e) {
                          return e !== n;
                        })),
                        !!q[e].length || ((q[e] = void 0), !1))
                      : (r || "on" !== t || (q[e].push(n), C.on(e, n)), !0);
                  }
                  return "on" === t ? ((q[e] = []), q[e].push(n), !1) : "off" === t || void 0;
                })(e, r, a)
                  ? [3, 2]
                  : [4, I];
              case 1:
                n.sent(),
                  (function (e, n) {
                    var t = e.eventName,
                      r = e.type,
                      a = e.handle;
                    "on" === n ? C.on(t, a) : C.off(t, a),
                      "base.event" === r && g({ eventName: "basic.event", data: { eventName: t, action: n } }),
                      F();
                  })(
                    (function (e, n) {
                      var t = e,
                        r = "base.event";
                      switch (t) {
                        case G.fileSaved:
                          console.warn("fileSaved事件监听即将弃用， 推荐使用fileStatus进行文件状态的监听"),
                            (t = "fileStatus");
                          break;
                        case G.fullscreenChange:
                          t = "fullscreenchange";
                          break;
                        case "error":
                        case "fileOpen":
                          r = "callback.event";
                      }
                      return { eventName: t, type: r, handle: n };
                    })(e, r),
                    a
                  ),
                  (n.label = 2);
              case 2:
                return [2];
            }
          });
        });
      };
    return (
      (K = {
        url: p,
        iframe: j,
        version: "1.1.19",
        iframeReady: !1,
        tokenData: null,
        commandBars: null,
        tabs: {
          getTabs: function () {
            return n(this, void 0, void 0, function () {
              return t(this, function (e) {
                switch (e.label) {
                  case 0:
                    return [4, I];
                  case 1:
                    return e.sent(), [2, k({ api: "tab.getTabs" })];
                }
              });
            });
          },
          switchTab: function (e) {
            return n(this, void 0, void 0, function () {
              return t(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, I];
                  case 1:
                    return n.sent(), [2, k({ api: "tab.switchTab", args: { tabKey: e } })];
                }
              });
            });
          },
        },
        setCooperUserColor: function (e) {
          return n(this, void 0, void 0, function () {
            return t(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, I];
                case 1:
                  return n.sent(), [2, k({ api: "setCooperUserColor", args: e })];
              }
            });
          });
        },
        setToken: function (e) {
          return n(this, void 0, void 0, function () {
            return t(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, I];
                case 1:
                  return n.sent(), (K.tokenData = e), g({ eventName: "setToken", data: e }), [2];
              }
            });
          });
        },
        ready: function () {
          return n(this, void 0, void 0, function () {
            return t(this, function (e) {
              switch (e.label) {
                case 0:
                  return A.apiReadySended ? [3, 2] : [4, O];
                case 1:
                  e.sent(), (A.apiReadySended = !0), g({ eventName: "api.ready" }), (e.label = 2);
                case 2:
                  return [4, E];
                case 3:
                  return (
                    e.sent(),
                    [
                      2,
                      new Promise(function (e) {
                        return setTimeout(function () {
                          return e(null == K ? void 0 : K.Application);
                        }, 0);
                      }),
                    ]
                  );
              }
            });
          });
        },
        destroy: function () {
          (q = {}),
            j.destroy(),
            r.empty(),
            (K = null),
            (B = new Set()),
            (D = 0),
            document.removeEventListener("fullscreenchange", L),
            P();
        },
        save: function () {
          return n(this, void 0, void 0, function () {
            return t(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, I];
                case 1:
                  return e.sent(), [2, y({ api: "save" })];
              }
            });
          });
        },
        setCommandBars: function (e) {
          return n(this, void 0, void 0, function () {
            return t(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, I];
                case 1:
                  return n.sent(), S(e), [2];
              }
            });
          });
        },
        updateConfig: function (e) {
          return (
            void 0 === e && (e = {}),
            n(this, void 0, void 0, function () {
              return t(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, I];
                  case 1:
                    return (
                      n.sent(),
                      e.commandBars
                        ? (console.warn(
                            "Deprecated: `updateConfig()` 方法即将废弃，请使用`setCommandBars()`代替`updateConfig()`更新`commandBars`配置。"
                          ),
                          [4, S(e.commandBars)])
                        : [3, 3]
                    );
                  case 2:
                    n.sent(), (n.label = 3);
                  case 3:
                    return [2];
                }
              });
            })
          );
        },
        executeCommandBar: function (e) {
          return n(this, void 0, void 0, function () {
            return t(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, I];
                case 1:
                  return n.sent(), S([{ cmbId: e, attributes: [{ name: "click", value: !0 }] }]), [2];
              }
            });
          });
        },
        on: function (e, r) {
          return n(this, void 0, void 0, function () {
            return t(this, function (n) {
              return [2, this.ApiEvent.AddApiEventListener(e, r)];
            });
          });
        },
        off: function (e, r) {
          return n(this, void 0, void 0, function () {
            return t(this, function (n) {
              return [2, this.ApiEvent.RemoveApiEventListener(e, r)];
            });
          });
        },
        ApiEvent: {
          AddApiEventListener: function (e, r) {
            return n(this, void 0, void 0, function () {
              return t(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, N(e, r, "on")];
                  case 1:
                    return [2, n.sent()];
                }
              });
            });
          },
          RemoveApiEventListener: function (e, r) {
            return n(this, void 0, void 0, function () {
              return t(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, N(e, r, "off")];
                  case 1:
                    return [2, n.sent()];
                }
              });
            });
          },
        },
      }),
      (function (e, n, t, r, i, o) {
        n && a(n) && ((i.refreshToken = n), (e.refreshToken = { eventName: J.getToken }));
        o && a(o) && ((i.getClipboardData = o), (e.getClipboardData = { eventName: J.getClipboardData }));
        t && a(t) && ((i.onToast = t), (e.onToast = { eventName: J.onToast }));
        r && a(r) && ((i.onHyperLinkOpen = r), (e.onHyperLinkOpen = { eventName: J.onHyperLinkOpen }));
      })(s, v, h, b, A, w),
      U(K, C, s, u, A, j, x),
      K
    );
  } catch (e) {
    console.error(e);
  }
}
console.log("WebOfficeSDK JS-SDK V1.1.19");
var X = Object.freeze({ __proto__: null, listener: U, config: Q });
window.WPS = X;
var Y = Q;
export default { config: Q };
export { Y as config };
