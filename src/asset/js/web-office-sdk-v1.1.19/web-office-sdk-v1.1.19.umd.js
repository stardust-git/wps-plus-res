!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n(((e = e || self).WebOfficeSDK = {}));
})(this, function (e) {
  "use strict";
  var n = function () {
    return (n =
      Object.assign ||
      function (e) {
        for (var n, t = 1, r = arguments.length; t < r; t++)
          for (var i in (n = arguments[t])) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        return e;
      }).apply(this, arguments);
  };
  function t(e, n, t, r) {
    return new (t || (t = Promise))(function (i, o) {
      function a(e) {
        try {
          c(r.next(e));
        } catch (e) {
          o(e);
        }
      }
      function s(e) {
        try {
          c(r.throw(e));
        } catch (e) {
          o(e);
        }
      }
      function c(e) {
        var n;
        e.done
          ? i(e.value)
          : ((n = e.value),
            n instanceof t
              ? n
              : new t(function (e) {
                  e(n);
                })).then(a, s);
      }
      c((r = r.apply(e, n || [])).next());
    });
  }
  function r(e, n) {
    var t,
      r,
      i,
      o,
      a = {
        label: 0,
        sent: function () {
          if (1 & i[0]) throw i[1];
          return i[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (o = { next: s(0), throw: s(1), return: s(2) }),
      "function" == typeof Symbol &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function s(o) {
      return function (s) {
        return (function (o) {
          if (t) throw new TypeError("Generator is already executing.");
          for (; a; )
            try {
              if (
                ((t = 1),
                r &&
                  (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) &&
                  !(i = i.call(r, o[1])).done)
              )
                return i;
              switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                case 0:
                case 1:
                  i = o;
                  break;
                case 4:
                  return a.label++, { value: o[1], done: !1 };
                case 5:
                  a.label++, (r = o[1]), (o = [0]);
                  continue;
                case 7:
                  (o = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                    a = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                    a.label = o[1];
                    break;
                  }
                  if (6 === o[0] && a.label < i[1]) {
                    (a.label = i[1]), (i = o);
                    break;
                  }
                  if (i && a.label < i[2]) {
                    (a.label = i[2]), a.ops.push(o);
                    break;
                  }
                  i[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              o = n.call(e, a);
            } catch (e) {
              (o = [6, e]), (r = 0);
            } finally {
              t = i = 0;
            }
          if (5 & o[0]) throw o[1];
          return { value: o[0] ? o[1] : void 0, done: !0 };
        })([o, s]);
      };
    }
  }
  var i = (function () {
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
  function o(e) {
    return "[object Function]" === {}.toString.call(e);
  }
  var a,
    s,
    c,
    u,
    l = { origin: "" };
  function d(e, n) {
    l[e] = n;
  }
  function f(e) {
    return l[e];
  }
  function p(e) {
    var n = f("origin");
    return (
      !!(function (e, n) {
        return (
          e !== n &&
          (e.replace(/www\./i, "").toLowerCase() !== n.replace(/www\./i, "").toLowerCase() ||
            (e.match("www.") ? void 0 : (d("origin", n), !1)))
        );
      })(n, e.origin) && (console.warn("postMessage 域名检查不通过", { safeOrigin: n, eventOrigin: e.origin }), !0)
    );
  }
  !(function (e) {
    (e.unknown = "unknown"), (e.spreadsheet = "s"), (e.writer = "w"), (e.presentation = "p"), (e.pdf = "f");
  })(a || (a = {})),
    (function (e) {
      (e.wps = "w"), (e.et = "s"), (e.presentation = "p"), (e.pdf = "f");
    })(s || (s = {})),
    (function (e) {
      (e.nomal = "nomal"), (e.simple = "simple");
    })(c || (c = {})),
    (function (e) {
      (e[(e.requestFullscreen = 1)] = "requestFullscreen"), (e[(e.exitFullscreen = 0)] = "exitFullscreen");
    })(u || (u = {}));
  var v,
    b,
    h,
    m =
      ((v = 0),
      function () {
        return (v += 1);
      }),
    g = function (e, n, t) {
      void 0 === t && (t = !0);
      var r = n;
      if (!b) {
        var i = function e(n) {
          var t = n.clientHeight;
          var r = n.clientWidth;
          0 !== t || 0 !== r || h
            ? (0 === t && 0 === r) || !h || (h.disconnect(), (h = null))
            : window.ResizeObserver &&
              (h = new ResizeObserver(function (t) {
                e(n);
              })).observe(n);
          b.style.cssText += "height: " + t + "px; width: " + r + "px";
        }.bind(null, r);
        (b = document.createElement("iframe")).classList.add("web-office-iframe");
        var o = {
          id: "office-iframe",
          src: e,
          scrolling: "no",
          frameborder: "0",
          allowfullscreen: "allowfullscreen",
          webkitallowfullscreen: "true",
          mozallowfullscreen: "true",
          allow: "clipboard-read; clipboard-write",
        };
        for (var a in (r
          ? ((o.style = "width: " + r.clientWidth + "px; height: " + r.clientHeight + "px;"),
            t && window.addEventListener("resize", i))
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
            (o.style = "position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;")),
        o))
          b.setAttribute(a, o[a]);
        r.appendChild(b),
          (b.destroy = function () {
            b.parentNode.removeChild(b),
              (b = null),
              window.removeEventListener("resize", i),
              h && (h.disconnect(), (h = null));
          });
      }
      return b;
    };
  var w = function (e) {
    g().contentWindow && g().contentWindow.postMessage(JSON.stringify(e), f("origin"));
  };
  function y(e, n, t) {
    return new Promise(function (r) {
      var o = m(),
        a = function (e) {
          if (!p(e)) {
            var n = i.parse(e.data);
            n.eventName === t && n.msgId === o && (r(n.data), i.remove(a));
          }
        };
      i.add(a), w({ data: e, msgId: o, eventName: n });
    });
  }
  var k = function (e) {
      return y(e, "wps.jssdk.api", "wps.api.reply");
    },
    j = function (e) {
      return y(e, "api.basic", "api.basic.reply");
    },
    O = { idMap: {} };
  function I(e) {
    return t(this, void 0, void 0, function () {
      var n, t, o, a, s, c, u, l, d, f;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return p(e)
              ? [2]
              : ((n = i.parse(e.data)),
                (t = n.eventName),
                (o = n.callbackId),
                (a = n.data),
                o && (s = O.idMap[o])
                  ? ((c = s.split(":")),
                    (u = c[0]),
                    (l = c[1]),
                    "api.callback" === t && O[u] && O[u][l] ? [4, (f = O[u][l]).callback.apply(f, a.args)] : [3, 2])
                  : [3, 2]);
          case 1:
            (d = r.sent()), w({ result: d, callbackId: o, eventName: "api.callback.reply" }), (r.label = 2);
          case 2:
            return [2];
        }
      });
    });
  }
  var E = function (e) {
      return t(void 0, void 0, void 0, function () {
        function n() {
          return Object.keys(O.idMap).find(function (e) {
            return O.idMap[e] === o + ":" + t;
          });
        }
        var t, o, a, s, c, u, l, d, f;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return (t = e.prop), (o = e.parentObjId), [4, _([(a = e.value)])];
            case 1:
              return (
                (s = r.sent()),
                (c = s[0]),
                (u = s[1]),
                (e.value = c[0]),
                (l = Object.keys(u)[0]),
                (d = O[o]),
                null === a &&
                  d &&
                  d[t] &&
                  ((f = n()) && delete O.idMap[f],
                  delete d[t],
                  Object.keys(d).length || delete O[o],
                  Object.keys(O.idMap).length || i.remove(I)),
                l &&
                  (Object.keys(O.idMap).length || i.add(I),
                  O[o] || (O[o] = {}),
                  (O[o][t] = { callbackId: l, callback: u[l] }),
                  (f = n()) && delete O.idMap[f],
                  (O.idMap[l] = o + ":" + t)),
                [2]
              );
          }
        });
      });
    },
    x = function (e, o, a, s) {
      return t(void 0, void 0, void 0, function () {
        var c, u, l, d, f, v, b, h;
        return r(this, function (g) {
          switch (g.label) {
            case 0:
              return (
                (c = m()),
                (d = new Promise(function (e, n) {
                  (u = e), (l = n);
                })),
                (f = {}),
                o.args ? [4, _(o.args)] : [3, 2]
              );
            case 1:
              (v = g.sent()), (b = v[0]), (h = v[1]), (o.args = b), (f = h), (g.label = 2);
            case 2:
              return "api.setter" !== e ? [3, 4] : [4, E(o)];
            case 3:
              g.sent(), (g.label = 4);
            case 4:
              return (
                (function (e) {
                  var t = e[0],
                    r = e[1];
                  "function" == typeof (t = n({}, t)).data && (t.data = t.data());
                  r(), w(t);
                })([
                  { eventName: e, data: o, msgId: c },
                  function () {
                    var n = this,
                      o = function (d) {
                        return t(n, void 0, void 0, function () {
                          var n, t, v;
                          return r(this, function (r) {
                            switch (r.label) {
                              case 0:
                                return p(d)
                                  ? [2]
                                  : "api.callback" === (n = i.parse(d.data)).eventName &&
                                    n.callbackId &&
                                    f[n.callbackId]
                                  ? [4, f[n.callbackId].apply(f, n.data.args)]
                                  : [3, 2];
                              case 1:
                                (t = r.sent()),
                                  w({ result: t, eventName: "api.callback.reply", callbackId: n.callbackId }),
                                  (r.label = 2);
                              case 2:
                                return (
                                  n.eventName === e + ".reply" &&
                                    n.msgId === c &&
                                    (n.error
                                      ? (((v = new Error("")).stack = n.error + "\n" + a), s && s(), l(v))
                                      : u(n.result),
                                    i.remove(o)),
                                  [2]
                                );
                            }
                          });
                        });
                      };
                    return i.add(o), d;
                  },
                ]),
                [2, d]
              );
          }
        });
      });
    };
  function _(e) {
    return t(this, void 0, void 0, function () {
      var n, t, i, o, a, s, c, u, l, d, f;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            (n = {}), (t = []), (i = e.slice(0)), (r.label = 1);
          case 1:
            return i.length ? ((o = void 0), [4, i.shift()]) : [3, 13];
          case 2:
            return (a = r.sent()) && a.done ? [4, a.done()] : [3, 4];
          case 3:
            r.sent(), (r.label = 4);
          case 4:
            if (
              !(function (e) {
                if (!e) return !1;
                for (var n = e; null !== Object.getPrototypeOf(n); ) n = Object.getPrototypeOf(n);
                return Object.getPrototypeOf(e) === n;
              })(o)
            )
              return [3, 11];
            for (c in ((o = {}), (s = []), a)) s.push(c);
            (u = 0), (r.label = 5);
          case 5:
            return u < s.length
              ? ((l = s[u]), (d = a[l]), /^[A-Z]/.test(l) ? (d && d.done ? [4, d.done()] : [3, 7]) : [3, 8])
              : [3, 10];
          case 6:
            r.sent(), (r.label = 7);
          case 7:
            d && d.objId
              ? (d = { objId: d.objId })
              : "function" == typeof d && ((f = m()), (n[f] = d), (d = { callbackId: f })),
              (r.label = 8);
          case 8:
            (o[l] = d), (r.label = 9);
          case 9:
            return u++, [3, 5];
          case 10:
            return [3, 12];
          case 11:
            a && a.objId
              ? (o = { objId: a.objId })
              : "function" == typeof a && void 0 === a.objId
              ? ((f = m()), (n[f] = a), (o = { callbackId: f }))
              : (o = a),
              (r.label = 12);
          case 12:
            return t.push(o), [3, 1];
          case 13:
            return [2, [t, n]];
        }
      });
    });
  }
  var C = function (e, t) {
      void 0 === t && (t = !0);
      var r = n({}, e),
        i = r.headers,
        o = void 0 === i ? {} : i,
        a = r.subscriptions,
        s = void 0 === a ? {} : a,
        u = r.mode,
        l = void 0 === u ? c.nomal : u,
        d = r.commonOptions,
        f = o.backBtn,
        p = void 0 === f ? {} : f,
        v = o.shareBtn,
        b = void 0 === v ? {} : v,
        h = o.otherMenuBtn,
        m = void 0 === h ? {} : h,
        g = function (e, n) {
          e.subscribe &&
            "function" == typeof e.subscribe &&
            ((e.callback = n), (s[n] = e.subscribe), t && delete e.subscribe);
        };
      if (
        (g(p, "wpsconfig_back_btn"),
        g(b, "wpsconfig_share_btn"),
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
          w.length && (T || L) && (m.items = w);
      }
      r.url = r.url || r.wpsUrl;
      var y = [];
      if (
        ((l === c.simple || (d && !1 === d.isShowTopArea)) && y.push("simple", "hidecmb"),
        r.debug && y.push("debugger"),
        r.url && y.length && (r.url = r.url + (r.url.indexOf("?") >= 0 ? "&" : "?") + y.join("&")),
        d &&
          (d.isParentFullscreen || d.isBrowserViewFullscreen) &&
          (document.addEventListener("fullscreenchange", P),
          document.addEventListener("webkitfullscreenchange", P),
          document.addEventListener("mozfullscreenchange", P)),
        r.wordOptions && (r.wpsOptions = r.wordOptions),
        r.excelOptions && (r.etOptions = r.excelOptions),
        r.pptOptions && (r.wppOptions = r.pptOptions),
        "object" == typeof s.print)
      ) {
        var k = "wpsconfig_print";
        "function" == typeof s.print.subscribe &&
          ((s[k] = s.print.subscribe),
          (r.print = { callback: k }),
          void 0 !== s.print.custom && (r.print.custom = s.print.custom)),
          delete s.print;
      }
      "function" == typeof s.exportPdf &&
        ((s[(k = "wpsconfig_export_pdf")] = s.exportPdf), (r.exportPdf = { callback: k }), delete s.exportPdf);
      return r.commandBars && A(r.commandBars, !1), n(n({}, r), { subscriptions: s });
    },
    S = function (e) {
      void 0 === e && (e = "");
      var n = "";
      if (!n && e) {
        var t = e.toLowerCase();
        -1 !== t.indexOf("/office/s/") && (n = a.spreadsheet),
          -1 !== t.indexOf("/office/w/") && (n = a.writer),
          -1 !== t.indexOf("/office/p/") && (n = a.presentation),
          -1 !== t.indexOf("/office/f/") && (n = a.pdf);
      }
      if (!n) {
        var r = e.match(/[\?&]type=([a-z]+)/) || [];
        n = s[r[1]] || "";
      }
      return n;
    };
  function A(e, n) {
    void 0 === n && (n = !0);
    var t = e.map(function (e) {
      var n = e.attributes;
      if (!Array.isArray(n)) {
        var t = [];
        for (var r in n)
          if (n.hasOwnProperty(r)) {
            var i = { name: r, value: n[r] };
            t.push(i);
          }
        e.attributes = t;
      }
      return e;
    });
    return n && w({ data: t, eventName: "setCommandBars" }), t;
  }
  var N = window.navigator.userAgent.toLowerCase(),
    T = /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(N),
    L = (function () {
      try {
        return -1 !== window._parent.location.search.indexOf("from=wxminiprogram");
      } catch (e) {
        return !1;
      }
    })();
  function P() {
    var e = { status: u.requestFullscreen },
      n = document,
      t = n.fullscreenElement || n.webkitFullscreenElement || n.mozFullScreenElement;
    (e.status = t ? u.requestFullscreen : u.exitFullscreen), w({ data: e, eventName: "fullscreenchange" });
  }
  var F = function () {
    O.idMap = {};
  };
  function D() {
    console.group("JSSDK 事件机制调整说明"),
      console.warn("jssdk.on、jssdk.off 和 jssdk.Application.Sub 将在后续版本中被弃用，建议使用改进后的 ApiEvent"),
      console.warn("具体请参考：https://wwo.wps.cn/docs/front-end/basic-usage/events/intro/"),
      console.groupEnd();
  }
  var B = 0,
    V = new Set();
  function R(e) {
    return (
      (B += 1),
      !e &&
        (function (e) {
          V.forEach(function (n) {
            return n(e);
          });
        })(B),
      B
    );
  }
  function H() {
    var e = new Error("");
    return (e.stack || e.message || "").split("\n").slice(2).join("\n");
  }
  function M(e, o) {
    var s,
      c = this,
      u = o.Events,
      l = o.Enum,
      d = o.Props,
      f = d[0],
      v = d[1],
      b = { objId: B };
    switch (
      ((function e(t, r, i) {
        var o = r.slice(0);
        var a = function () {
          var r = o.shift();
          !r.alias && ~W.indexOf(r.prop) && o.push(n(n({}, r), { alias: r.prop + "Async" })),
            Object.defineProperty(t, r.alias || r.prop, {
              get: function () {
                var o = this,
                  a = 1 === r.cache,
                  s = a && this["__" + r.prop + "CacheValue"];
                if (!s) {
                  var c = H(),
                    u = R(a),
                    l = function () {
                      for (var e, o = [], a = 0; a < arguments.length; a++) o[a] = arguments[a];
                      void 0 !== r.caller
                        ? (function e(t, r, i) {
                            var o = r.slice(0);
                            var a = function () {
                              var r = o.shift();
                              !r.alias && ~W.indexOf(r.prop) && o.push(n(n({}, r), { alias: r.prop + "Async" })),
                                Object.defineProperty(t, r.alias || r.prop, {
                                  get: function () {
                                    var n = this,
                                      o = 1 === r.cache,
                                      a = o && this["__" + r.prop + "CacheValue"];
                                    if (!a) {
                                      var s = H(),
                                        c = R(o),
                                        u = function () {
                                          for (var n, o = [], a = 0; a < arguments.length; a++) o[a] = arguments[a];
                                          void 0 !== r.caller ? e((n = { objId: R() }), i[r.caller], i) : (n = {});
                                          return (
                                            q(
                                              u,
                                              n,
                                              "api.caller",
                                              { obj: u, args: o, parentObjId: t.objId, objId: n.objId, prop: r.prop },
                                              s
                                            ),
                                            n
                                          );
                                        };
                                      return (
                                        (u.objId = -1),
                                        void 0 !== r.getter && ((u.objId = c), e(u, i[r.getter], i)),
                                        q(
                                          t,
                                          u,
                                          "api.getter",
                                          { parentObjId: t.objId, objId: u.objId, prop: r.prop },
                                          s,
                                          function () {
                                            delete n["__" + r.prop + "CacheValue"];
                                          }
                                        ),
                                        o && (this["__" + r.prop + "CacheValue"] = u),
                                        u
                                      );
                                    }
                                    return a;
                                  },
                                  set: function (e) {
                                    var n = H();
                                    return q(
                                      t,
                                      {},
                                      "api.setter",
                                      { value: e, parentObjId: t.objId, objId: -1, prop: r.prop },
                                      n
                                    );
                                  },
                                });
                            };
                            for (; o.length; ) a();
                          })((e = { objId: R() }), i[r.caller], i)
                        : (e = {});
                      return (
                        q(
                          l,
                          e,
                          "api.caller",
                          { obj: l, args: o, parentObjId: t.objId, objId: e.objId, prop: r.prop },
                          c
                        ),
                        e
                      );
                    };
                  return (
                    (l.objId = -1),
                    void 0 !== r.getter && ((l.objId = u), e(l, i[r.getter], i)),
                    q(t, l, "api.getter", { parentObjId: t.objId, objId: l.objId, prop: r.prop }, c, function () {
                      delete o["__" + r.prop + "CacheValue"];
                    }),
                    a && (this["__" + r.prop + "CacheValue"] = l),
                    l
                  );
                }
                return s;
              },
              set: function (e) {
                var n = H();
                return q(t, {}, "api.setter", { value: e, parentObjId: t.objId, objId: -1, prop: r.prop }, n);
              },
            });
        };
        for (; o.length; ) a();
      })(b, f, v),
      (b.Events = u),
      (b.Enum = l),
      (e.Enum = b.Enum),
      (e.Events = b.Events),
      (e.Props = d),
      S(e.url))
    ) {
      case a.writer:
        e.WordApplication = e.WpsApplication = function () {
          return b;
        };
        break;
      case a.spreadsheet:
        e.ExcelApplication = e.EtApplication = function () {
          return b;
        };
        break;
      case a.presentation:
        e.PPTApplication = e.WppApplication = function () {
          return b;
        };
        break;
      case a.pdf:
        e.PDFApplication = function () {
          return b;
        };
    }
    (e.Application = b),
      (e.Free = function (e) {
        return x("api.free", { objId: e }, "");
      }),
      (e.Stack = b.Stack =
        ((s = function (n) {
          e && e.Free(n);
        }),
        function () {
          var e = [],
            n = function (n) {
              e.push(n);
            };
          return (
            V.add(n),
            {
              End: function () {
                s(e), V.delete(n);
              },
            }
          );
        }));
    var h = {};
    i.add(function (e) {
      return t(c, void 0, void 0, function () {
        var n, t, o, a, s;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return p(e)
                ? [2]
                : "api.event" === (n = i.parse(e.data)).eventName && n.data
                ? ((t = n.data), (o = t.eventName), (a = t.data), (s = h[o]) ? [4, s(a)] : [3, 2])
                : [3, 2];
            case 1:
              r.sent(), (r.label = 2);
            case 2:
              return [2];
          }
        });
      });
    }),
      (b.Sub = {});
    var m = function (e) {
      var n = u[e];
      Object.defineProperty(b.Sub, n, {
        set: function (e) {
          D(),
            (h[n] = e),
            w({ eventName: "api.event.register", data: { eventName: n, register: !!e, objId: (B += 1) } });
        },
      });
    };
    for (var g in u) m(g);
  }
  var W = [
    "ExportAsFixedFormat",
    "GetOperatorsInfo",
    "ImportDataIntoFields",
    "ReplaceText",
    "ReplaceBookmark",
    "GetBookmarkText",
    "GetComments",
  ];
  function z(e, t, r) {
    var i = t.slice(0);
    var o = function () {
      var t = i.shift();
      if (!t.alias && ~W.indexOf(t.prop)) {
        i.push(n(n({}, t), { alias: t.prop + "Async" }));
      }
      Object.defineProperty(e, t.alias || t.prop, {
        get: function () {
          var n = this;
          var i = t.cache === 1;
          var o = i && this["__" + t.prop + "CacheValue"];
          if (!o) {
            var a = H();
            var s = R(i);
            var c = function () {
              for (var n = [], i = 0, o; i < arguments.length; i++) {
                n[i] = arguments[i];
              }
              if (t.caller !== undefined) {
                o = { objId: R() };
                z(o, r[t.caller], r);
              } else {
                o = {};
              }
              return (
                q(u, o, "api.caller", { obj: u, args: n, parentObjId: e.objId, objId: o.objId, prop: t.prop }, a), o
              );
            };
            var u = c;
            u.objId = -1;
            if (t.getter !== undefined) {
              u.objId = s;
              z(u, r[t.getter], r);
            }
            q(e, u, "api.getter", { parentObjId: e.objId, objId: u.objId, prop: t.prop }, a, function () {
              delete n["__" + t.prop + "CacheValue"];
            });
            if (i) {
              this["__" + t.prop + "CacheValue"] = u;
            }
            return u;
          }
          return o;
        },
        set: function (n) {
          var r = H();
          return q(e, {}, "api.setter", { value: n, parentObjId: e.objId, objId: -1, prop: t.prop }, r);
        },
      });
    };
    while (i.length) {
      o();
    }
  }
  function q(e, n, t, r, i, o) {
    var a,
      s = (e.done ? e.done() : Promise.resolve()).then(function () {
        return a || (a = x(t, r, i, o)), a;
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
        return x("api.free", { objId: n.objId }, "");
      });
  }
  var K = {};
  var G = null,
    J = {
      fileOpen: "fileOpen",
      tabSwitch: "tabSwitch",
      fileSaved: "fileSaved",
      fileStatus: "fileStatus",
      fullscreenChange: "fullscreenChange",
      error: "error",
      stage: "stage",
    },
    U = {
      getToken: "api.getToken",
      onToast: "event.toast",
      onHyperLinkOpen: "event.hyperLinkOpen",
      getClipboardData: "api.getClipboardData",
    };
  function Z(e, o, a, s, c, u, l) {
    var d = this;
    void 0 === a && (a = {});
    i.add(function (f) {
      return t(d, void 0, void 0, function () {
        var t, d, v, b, h, m, g, y, k, j, O, I, E, x, _, C, S, A, N;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return p(f)
                ? [2]
                : ((t = i.parse(f.data)),
                  (d = t.eventName),
                  (v = void 0 === d ? "" : d),
                  (b = t.data),
                  (h = void 0 === b ? null : b),
                  (m = t.url),
                  (g = void 0 === m ? null : m),
                  -1 !== ["wps.jssdk.api"].indexOf(v)
                    ? [2]
                    : "ready" !== v
                    ? [3, 1]
                    : (c.apiReadySended &&
                        (function (e) {
                          var n = [];
                          Object.keys(K).forEach(function (t) {
                            K[t].forEach(function (r) {
                              var i = t;
                              e.off(i, r), n.push({ handle: r, eventName: i });
                            }),
                              delete K[t];
                          }),
                            n.forEach(function (e) {
                              var n = e.eventName,
                                t = e.handle;
                              null == G || G.ApiEvent.AddApiEventListener(n, t);
                            });
                        })(o),
                      w({ eventName: "setConfig", data: n(n({}, a), { version: e.version }) }),
                      e.tokenData && e.setToken(n(n({}, e.tokenData), { hasRefreshTokenConfig: !!a.refreshToken })),
                      (e.iframeReady = !0),
                      [3, 15]));
            case 1:
              return "error" !== v ? [3, 2] : (o.emit(J.error, h), [3, 15]);
            case 2:
              return "open.result" !== v
                ? [3, 3]
                : (void 0 !==
                    (null === (S = null == h ? void 0 : h.fileInfo) || void 0 === S ? void 0 : S.officeVersion) &&
                    ((e.mainVersion = h.fileInfo.officeVersion),
                    console.log("WebOfficeSDK Main Version: V" + e.mainVersion)),
                  o.emit(J.fileOpen, h),
                  [3, 15]);
            case 3:
              return "api.scroll" !== v ? [3, 4] : (window.scrollTo(h.x, h.y), [3, 15]);
            case 4:
              if (v !== U.getToken) return [3, 9];
              (y = { token: !1 }), (r.label = 5);
            case 5:
              return r.trys.push([5, 7, , 8]), [4, c.refreshToken()];
            case 6:
              return (y = r.sent()), [3, 8];
            case 7:
              return (k = r.sent()), console.error("refreshToken: " + (k || "fail to get")), [3, 8];
            case 8:
              return w({ eventName: U.getToken + ".reply", data: y }), [3, 15];
            case 9:
              if (v !== U.getClipboardData) return [3, 14];
              (j = { text: "", html: "" }), (r.label = 10);
            case 10:
              return r.trys.push([10, 12, , 13]), [4, c.getClipboardData()];
            case 11:
              return (j = r.sent()), [3, 13];
            case 12:
              return (O = r.sent()), console.error("getClipboardData: " + (O || "fail to get")), [3, 13];
            case 13:
              return w({ eventName: U.getClipboardData + ".reply", data: j }), [3, 15];
            case 14:
              v === U.onToast
                ? c.onToast(h)
                : v === U.onHyperLinkOpen
                ? c.onHyperLinkOpen(h)
                : "stage" === v
                ? o.emit(J.stage, h)
                : "event.callback" === v
                ? ((I = h.eventName),
                  (E = h.data),
                  (x = I),
                  "fullScreenChange" === I && (x = J.fullscreenChange),
                  "file.saved" === I && (x = J.fileStatus),
                  ((null === (A = a.commonOptions) || void 0 === A ? void 0 : A.isBrowserViewFullscreen) ||
                    (null === (N = a.commonOptions) || void 0 === N ? void 0 : N.isParentFullscreen)) &&
                    "fullscreenchange" === x &&
                    ((_ = E.status),
                    (C = E.isDispatchEvent),
                    a.commonOptions.isBrowserViewFullscreen
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
                      : a.commonOptions.isParentFullscreen &&
                        (function (e, n, t) {
                          var r = document.querySelector(t),
                            i = r && 1 === r.nodeType ? r : n;
                          if (0 === e) {
                            var o = document,
                              a =
                                o.exitFullscreen ||
                                o.mozCancelFullScreen ||
                                o.msExitFullscreen ||
                                o.webkitCancelFullScreen ||
                                o.webkitExitFullscreen;
                            a.call(document);
                          } else if (1 === e) {
                            var s =
                              i.requestFullscreen ||
                              i.mozRequestFullScreen ||
                              i.msRequestFullscreen ||
                              i.webkitRequestFullscreen;
                            s.call(i);
                          }
                        })(_, u, a.commonOptions.isParentFullscreen)),
                  o.emit(x, E))
                : "api.ready" === v && M(e, h),
                (r.label = 15);
            case 15:
              return "function" == typeof s[v] && s[v](e, g || h), [2];
          }
        });
      });
    });
  }
  function Q(e) {
    return new Promise(function (n) {
      var t = function (r) {
        p(r) || (i.parse(r.data).eventName === e && (n(), i.remove(t)));
      };
      i.add(t);
    });
  }
  function X(e) {
    var n,
      a = this;
    void 0 === e && (e = {}), G && G.destroy();
    try {
      var s = C(e),
        c = s.subscriptions,
        u = void 0 === c ? {} : c,
        l = s.mount,
        f = void 0 === l ? null : l,
        p = s.url,
        v = s.refreshToken,
        b = s.onToast,
        h = s.onHyperLinkOpen,
        m = s.getClipboardData;
      d("origin", (p.match(/https*:\/\/[^\/]+/g) || [])[0]);
      var y = g(p, f),
        O = Q("ready"),
        I = Q("open.result"),
        E = Q("api.ready"),
        x = f ? { width: f.clientWidth + "px", height: f.clientHeight + "px" } : { width: "100vw", height: "100vh" };
      delete s.mount, p && delete s.url, delete s.subscriptions;
      var _ =
          ((n = n || Object.create(null)),
          {
            on: function (e, t) {
              (n[e] || (n[e] = [])).push(t);
            },
            off: function (e, t) {
              n[e] && n[e].splice(n[e].indexOf(t) >>> 0, 1);
            },
            emit: function (e, t) {
              (n[e] || []).slice().map(function (e) {
                e(t);
              }),
                (n["*"] || []).slice().map(function (n) {
                  n(e, t);
                });
            },
          }),
        S = { apiReadySended: !1 },
        N = function (e, n, i) {
          return t(a, void 0, void 0, function () {
            return r(this, function (t) {
              switch (t.label) {
                case 0:
                  return (function (e, n, t) {
                    if (K[e]) {
                      var r = !!K[e].find(function (e) {
                        return e === n;
                      });
                      return r && "off" === t
                        ? (_.off(e, n),
                          (K[e] = K[e].filter(function (e) {
                            return e !== n;
                          })),
                          !!K[e].length || ((K[e] = void 0), !1))
                        : (r || "on" !== t || (K[e].push(n), _.on(e, n)), !0);
                    }
                    return "on" === t ? ((K[e] = []), K[e].push(n), !1) : "off" === t || void 0;
                  })(e, n, i)
                    ? [3, 2]
                    : [4, O];
                case 1:
                  t.sent(),
                    (function (e, n) {
                      var t = e.eventName,
                        r = e.type,
                        i = e.handle;
                      "on" === n ? _.on(t, i) : _.off(t, i),
                        "base.event" === r && w({ eventName: "basic.event", data: { eventName: t, action: n } }),
                        D();
                    })(
                      (function (e, n) {
                        var t = e,
                          r = "base.event";
                        switch (t) {
                          case J.fileSaved:
                            console.warn("fileSaved事件监听即将弃用， 推荐使用fileStatus进行文件状态的监听"),
                              (t = "fileStatus");
                            break;
                          case J.fullscreenChange:
                            t = "fullscreenchange";
                            break;
                          case "error":
                          case "fileOpen":
                            r = "callback.event";
                        }
                        return { eventName: t, type: r, handle: n };
                      })(e, n),
                      i
                    ),
                    (t.label = 2);
                case 2:
                  return [2];
              }
            });
          });
        };
      return (
        (G = {
          url: p,
          iframe: y,
          version: "1.1.19",
          iframeReady: !1,
          tokenData: null,
          commandBars: null,
          tabs: {
            getTabs: function () {
              return t(this, void 0, void 0, function () {
                return r(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [4, O];
                    case 1:
                      return e.sent(), [2, j({ api: "tab.getTabs" })];
                  }
                });
              });
            },
            switchTab: function (e) {
              return t(this, void 0, void 0, function () {
                return r(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [4, O];
                    case 1:
                      return n.sent(), [2, j({ api: "tab.switchTab", args: { tabKey: e } })];
                  }
                });
              });
            },
          },
          setCooperUserColor: function (e) {
            return t(this, void 0, void 0, function () {
              return r(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, O];
                  case 1:
                    return n.sent(), [2, j({ api: "setCooperUserColor", args: e })];
                }
              });
            });
          },
          setToken: function (e) {
            return t(this, void 0, void 0, function () {
              return r(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, O];
                  case 1:
                    return n.sent(), (G.tokenData = e), w({ eventName: "setToken", data: e }), [2];
                }
              });
            });
          },
          ready: function () {
            return t(this, void 0, void 0, function () {
              return r(this, function (e) {
                switch (e.label) {
                  case 0:
                    return S.apiReadySended ? [3, 2] : [4, I];
                  case 1:
                    e.sent(), (S.apiReadySended = !0), w({ eventName: "api.ready" }), (e.label = 2);
                  case 2:
                    return [4, E];
                  case 3:
                    return (
                      e.sent(),
                      [
                        2,
                        new Promise(function (e) {
                          return setTimeout(function () {
                            return e(null == G ? void 0 : G.Application);
                          }, 0);
                        }),
                      ]
                    );
                }
              });
            });
          },
          destroy: function () {
            (K = {}),
              y.destroy(),
              i.empty(),
              (G = null),
              (V = new Set()),
              (B = 0),
              document.removeEventListener("fullscreenchange", P),
              F();
          },
          save: function () {
            return t(this, void 0, void 0, function () {
              return r(this, function (e) {
                switch (e.label) {
                  case 0:
                    return [4, O];
                  case 1:
                    return e.sent(), [2, k({ api: "save" })];
                }
              });
            });
          },
          setCommandBars: function (e) {
            return t(this, void 0, void 0, function () {
              return r(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, O];
                  case 1:
                    return n.sent(), A(e), [2];
                }
              });
            });
          },
          updateConfig: function (e) {
            return (
              void 0 === e && (e = {}),
              t(this, void 0, void 0, function () {
                return r(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [4, O];
                    case 1:
                      return (
                        n.sent(),
                        e.commandBars
                          ? (console.warn(
                              "Deprecated: `updateConfig()` 方法即将废弃，请使用`setCommandBars()`代替`updateConfig()`更新`commandBars`配置。"
                            ),
                            [4, A(e.commandBars)])
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
            return t(this, void 0, void 0, function () {
              return r(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, O];
                  case 1:
                    return n.sent(), A([{ cmbId: e, attributes: [{ name: "click", value: !0 }] }]), [2];
                }
              });
            });
          },
          on: function (e, n) {
            return t(this, void 0, void 0, function () {
              return r(this, function (t) {
                return [2, this.ApiEvent.AddApiEventListener(e, n)];
              });
            });
          },
          off: function (e, n) {
            return t(this, void 0, void 0, function () {
              return r(this, function (t) {
                return [2, this.ApiEvent.RemoveApiEventListener(e, n)];
              });
            });
          },
          ApiEvent: {
            AddApiEventListener: function (e, n) {
              return t(this, void 0, void 0, function () {
                return r(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, N(e, n, "on")];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            },
            RemoveApiEventListener: function (e, n) {
              return t(this, void 0, void 0, function () {
                return r(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, N(e, n, "off")];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            },
          },
        }),
        (function (e, n, t, r, i, a) {
          n && o(n) && ((i.refreshToken = n), (e.refreshToken = { eventName: U.getToken }));
          a && o(a) && ((i.getClipboardData = a), (e.getClipboardData = { eventName: U.getClipboardData }));
          t && o(t) && ((i.onToast = t), (e.onToast = { eventName: U.onToast }));
          r && o(r) && ((i.onHyperLinkOpen = r), (e.onHyperLinkOpen = { eventName: U.onHyperLinkOpen }));
        })(s, v, b, h, S, m),
        Z(G, _, s, u, S, y, x),
        G
      );
    } catch (e) {
      console.error(e);
    }
  }
  console.log("WebOfficeSDK JS-SDK V1.1.19");
  var Y = Object.freeze({ __proto__: null, listener: Z, config: X });
  window.WPS = Y;
  var $ = X,
    ee = { config: $ };
  (e.config = $), (e.default = ee), Object.defineProperty(e, "__esModule", { value: !0 });
});
