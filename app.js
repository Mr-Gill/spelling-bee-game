var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = Symbol.for("react.element");
    var n = Symbol.for("react.portal");
    var p = Symbol.for("react.fragment");
    var q = Symbol.for("react.strict_mode");
    var r = Symbol.for("react.profiler");
    var t = Symbol.for("react.provider");
    var u = Symbol.for("react.context");
    var v = Symbol.for("react.forward_ref");
    var w = Symbol.for("react.suspense");
    var x = Symbol.for("react.memo");
    var y = Symbol.for("react.lazy");
    var z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a) return null;
      a = z && a[z] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var C = Object.assign;
    var D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray;
    var J = Object.prototype.hasOwnProperty;
    var K = { current: null };
    var L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k) a = null;
      var h = false;
      if (null === a) h = true;
      else switch (k) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l:
            case n:
              h = true;
          }
      }
      if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a)) for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = d + Q(k, g);
        h += R(k, b, e, f, c);
      }
      else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a) return a;
      var d = [], c = 0;
      R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U = { current: null };
    var V = { transition: null };
    var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    function X() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    exports.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G;
    exports.StrictMode = q;
    exports.Suspense = w;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.act = X;
    exports.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    exports.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = X;
    exports.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function() {
      return U.current.useId();
    };
    exports.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports.useState = function(a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function() {
      return U.current.useTransition();
    };
    exports.version = "18.3.1";
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module2) {
    "use strict";
    if (true) {
      module2.exports = require_react_production_min();
    } else {
      module2.exports = null;
    }
  }
});

// node_modules/scheduler/cjs/scheduler.production.min.js
var require_scheduler_production_min = __commonJS({
  "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
    "use strict";
    function f(a, b) {
      var c = a.length;
      a.push(b);
      a: for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
      }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k(a) {
      if (0 === a.length) return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
          var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
          if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
          else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
          else break a;
        }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    var l;
    var p;
    var q;
    var r = [];
    var t = [];
    var u = 1;
    var v = null;
    var y = 3;
    var z = false;
    var A = false;
    var B = false;
    var D = "function" === typeof setTimeout ? setTimeout : null;
    var E = "function" === typeof clearTimeout ? clearTimeout : null;
    var F = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G(a) {
      for (var b = h(t); null !== b; ) {
        if (null === b.callback) k(t);
        else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
        else break;
        b = h(t);
      }
    }
    function H(a) {
      B = false;
      G(a);
      if (!A) if (null !== h(r)) A = true, I(J);
      else {
        var b = h(t);
        null !== b && K(H, b.startTime - a);
      }
    }
    function J(a, b) {
      A = false;
      B && (B = false, E(L), L = -1);
      z = true;
      var c = y;
      try {
        G(b);
        for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
          var d = v.callback;
          if ("function" === typeof d) {
            v.callback = null;
            y = v.priorityLevel;
            var e = d(v.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v.callback = e : v === h(r) && k(r);
            G(b);
          } else k(r);
          v = h(r);
        }
        if (null !== v) var w = true;
        else {
          var m = h(t);
          null !== m && K(H, m.startTime - b);
          w = false;
        }
        return w;
      } finally {
        v = null, y = c, z = false;
      }
    }
    var N = false;
    var O = null;
    var L = -1;
    var P = 5;
    var Q = -1;
    function M() {
      return exports.unstable_now() - Q < P ? false : true;
    }
    function R() {
      if (null !== O) {
        var a = exports.unstable_now();
        Q = a;
        var b = true;
        try {
          b = O(true, a);
        } finally {
          b ? S() : (N = false, O = null);
        }
      } else N = false;
    }
    var S;
    if ("function" === typeof F) S = function() {
      F(R);
    };
    else if ("undefined" !== typeof MessageChannel) {
      T = new MessageChannel(), U = T.port2;
      T.port1.onmessage = R;
      S = function() {
        U.postMessage(null);
      };
    } else S = function() {
      D(R, 0);
    };
    var T;
    var U;
    function I(a) {
      O = a;
      N || (N = true, S());
    }
    function K(a, b) {
      L = D(function() {
        a(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A || z || (A = true, I(J));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r);
    };
    exports.unstable_next = function(a) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y;
      }
      var c = y;
      y = b;
      try {
        return a();
      } finally {
        y = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y;
      y = a;
      try {
        return b();
      } finally {
        y = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
      return a;
    };
    exports.unstable_shouldYield = M;
    exports.unstable_wrapCallback = function(a) {
      var b = y;
      return function() {
        var c = y;
        y = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y = c;
        }
      };
    };
  }
});

// node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "node_modules/scheduler/index.js"(exports, module2) {
    "use strict";
    if (true) {
      module2.exports = require_scheduler_production_min();
    } else {
      module2.exports = null;
    }
  }
});

// node_modules/react-dom/cjs/react-dom.production.min.js
var require_react_dom_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
    "use strict";
    var aa = require_react();
    var ca = require_scheduler();
    function p(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var da = /* @__PURE__ */ new Set();
    var ea = {};
    function fa(a, b) {
      ha(a, b);
      ha(a + "Capture", b);
    }
    function ha(a, b) {
      ea[a] = b;
      for (a = 0; a < b.length; a++) da.add(b[a]);
    }
    var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
    var ja = Object.prototype.hasOwnProperty;
    var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var la = {};
    var ma = {};
    function oa(a) {
      if (ja.call(ma, a)) return true;
      if (ja.call(la, a)) return false;
      if (ka.test(a)) return ma[a] = true;
      la[a] = true;
      return false;
    }
    function pa(a, b, c, d) {
      if (null !== c && 0 === c.type) return false;
      switch (typeof b) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d) return false;
          if (null !== c) return !c.acceptsBooleans;
          a = a.toLowerCase().slice(0, 5);
          return "data-" !== a && "aria-" !== a;
        default:
          return false;
      }
    }
    function qa(a, b, c, d) {
      if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
      if (d) return false;
      if (null !== c) switch (c.type) {
        case 3:
          return !b;
        case 4:
          return false === b;
        case 5:
          return isNaN(b);
        case 6:
          return isNaN(b) || 1 > b;
      }
      return false;
    }
    function v(a, b, c, d, e, f, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = e;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = f;
      this.removeEmptyString = g;
    }
    var z = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      z[a] = new v(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      z[b] = new v(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      z[a] = new v(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      z[a] = new v(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      z[a] = new v(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      z[a] = new v(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var ra = /[\-:]([a-z])/g;
    function sa(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ra,
        sa
      );
      z[b] = new v(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
    });
    z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
    });
    function ta(a, b, c, d) {
      var e = z.hasOwnProperty(b) ? z[b] : null;
      if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
    }
    var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var va = Symbol.for("react.element");
    var wa = Symbol.for("react.portal");
    var ya = Symbol.for("react.fragment");
    var za = Symbol.for("react.strict_mode");
    var Aa = Symbol.for("react.profiler");
    var Ba = Symbol.for("react.provider");
    var Ca = Symbol.for("react.context");
    var Da = Symbol.for("react.forward_ref");
    var Ea = Symbol.for("react.suspense");
    var Fa = Symbol.for("react.suspense_list");
    var Ga = Symbol.for("react.memo");
    var Ha = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    Symbol.for("react.debug_trace_mode");
    var Ia = Symbol.for("react.offscreen");
    Symbol.for("react.legacy_hidden");
    Symbol.for("react.cache");
    Symbol.for("react.tracing_marker");
    var Ja = Symbol.iterator;
    function Ka(a) {
      if (null === a || "object" !== typeof a) return null;
      a = Ja && a[Ja] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var A = Object.assign;
    var La;
    function Ma(a) {
      if (void 0 === La) try {
        throw Error();
      } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        La = b && b[1] || "";
      }
      return "\n" + La + a;
    }
    var Na = false;
    function Oa(a, b) {
      if (!a || Na) return "";
      Na = true;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b) if (b = function() {
          throw Error();
        }, Object.defineProperty(b.prototype, "props", { set: function() {
          throw Error();
        } }), "object" === typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(b, []);
          } catch (l) {
            var d = l;
          }
          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (l) {
            d = l;
          }
          a.call(b.prototype);
        }
        else {
          try {
            throw Error();
          } catch (l) {
            d = l;
          }
          a();
        }
      } catch (l) {
        if (l && d && "string" === typeof l.stack) {
          for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
          for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
            if (1 !== g || 1 !== h) {
              do
                if (g--, h--, 0 > h || e[g] !== f[h]) {
                  var k = "\n" + e[g].replace(" at new ", " at ");
                  a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                  return k;
                }
              while (1 <= g && 0 <= h);
            }
            break;
          }
        }
      } finally {
        Na = false, Error.prepareStackTrace = c;
      }
      return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
    }
    function Pa(a) {
      switch (a.tag) {
        case 5:
          return Ma(a.type);
        case 16:
          return Ma("Lazy");
        case 13:
          return Ma("Suspense");
        case 19:
          return Ma("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a = Oa(a.type, false), a;
        case 11:
          return a = Oa(a.type.render, false), a;
        case 1:
          return a = Oa(a.type, true), a;
        default:
          return "";
      }
    }
    function Qa(a) {
      if (null == a) return null;
      if ("function" === typeof a) return a.displayName || a.name || null;
      if ("string" === typeof a) return a;
      switch (a) {
        case ya:
          return "Fragment";
        case wa:
          return "Portal";
        case Aa:
          return "Profiler";
        case za:
          return "StrictMode";
        case Ea:
          return "Suspense";
        case Fa:
          return "SuspenseList";
      }
      if ("object" === typeof a) switch (a.$$typeof) {
        case Ca:
          return (a.displayName || "Context") + ".Consumer";
        case Ba:
          return (a._context.displayName || "Context") + ".Provider";
        case Da:
          var b = a.render;
          a = a.displayName;
          a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          return a;
        case Ga:
          return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
        case Ha:
          b = a._payload;
          a = a._init;
          try {
            return Qa(a(b));
          } catch (c) {
          }
      }
      return null;
    }
    function Ra(a) {
      var b = a.type;
      switch (a.tag) {
        case 24:
          return "Cache";
        case 9:
          return (b.displayName || "Context") + ".Consumer";
        case 10:
          return (b._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return b;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Qa(b);
        case 8:
          return b === za ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if ("function" === typeof b) return b.displayName || b.name || null;
          if ("string" === typeof b) return b;
      }
      return null;
    }
    function Sa(a) {
      switch (typeof a) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return a;
        case "object":
          return a;
        default:
          return "";
      }
    }
    function Ta(a) {
      var b = a.type;
      return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
    }
    function Ua(a) {
      var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
      if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
        var e = c.get, f = c.set;
        Object.defineProperty(a, b, { configurable: true, get: function() {
          return e.call(this);
        }, set: function(a2) {
          d = "" + a2;
          f.call(this, a2);
        } });
        Object.defineProperty(a, b, { enumerable: c.enumerable });
        return { getValue: function() {
          return d;
        }, setValue: function(a2) {
          d = "" + a2;
        }, stopTracking: function() {
          a._valueTracker = null;
          delete a[b];
        } };
      }
    }
    function Va(a) {
      a._valueTracker || (a._valueTracker = Ua(a));
    }
    function Wa(a) {
      if (!a) return false;
      var b = a._valueTracker;
      if (!b) return true;
      var c = b.getValue();
      var d = "";
      a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
      a = d;
      return a !== c ? (b.setValue(a), true) : false;
    }
    function Xa(a) {
      a = a || ("undefined" !== typeof document ? document : void 0);
      if ("undefined" === typeof a) return null;
      try {
        return a.activeElement || a.body;
      } catch (b) {
        return a.body;
      }
    }
    function Ya(a, b) {
      var c = b.checked;
      return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
    }
    function Za(a, b) {
      var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
      c = Sa(null != b.value ? b.value : c);
      a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
    }
    function ab(a, b) {
      b = b.checked;
      null != b && ta(a, "checked", b, false);
    }
    function bb(a, b) {
      ab(a, b);
      var c = Sa(b.value), d = b.type;
      if (null != c) if ("number" === d) {
        if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
      } else a.value !== "" + c && (a.value = "" + c);
      else if ("submit" === d || "reset" === d) {
        a.removeAttribute("value");
        return;
      }
      b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
      null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
    }
    function db(a, b, c) {
      if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
        var d = b.type;
        if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
        b = "" + a._wrapperState.initialValue;
        c || b === a.value || (a.value = b);
        a.defaultValue = b;
      }
      c = a.name;
      "" !== c && (a.name = "");
      a.defaultChecked = !!a._wrapperState.initialChecked;
      "" !== c && (a.name = c);
    }
    function cb(a, b, c) {
      if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
    }
    var eb = Array.isArray;
    function fb(a, b, c, d) {
      a = a.options;
      if (b) {
        b = {};
        for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
        for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
      } else {
        c = "" + Sa(c);
        b = null;
        for (e = 0; e < a.length; e++) {
          if (a[e].value === c) {
            a[e].selected = true;
            d && (a[e].defaultSelected = true);
            return;
          }
          null !== b || a[e].disabled || (b = a[e]);
        }
        null !== b && (b.selected = true);
      }
    }
    function gb(a, b) {
      if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
      return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
    }
    function hb(a, b) {
      var c = b.value;
      if (null == c) {
        c = b.children;
        b = b.defaultValue;
        if (null != c) {
          if (null != b) throw Error(p(92));
          if (eb(c)) {
            if (1 < c.length) throw Error(p(93));
            c = c[0];
          }
          b = c;
        }
        null == b && (b = "");
        c = b;
      }
      a._wrapperState = { initialValue: Sa(c) };
    }
    function ib(a, b) {
      var c = Sa(b.value), d = Sa(b.defaultValue);
      null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
      null != d && (a.defaultValue = "" + d);
    }
    function jb(a) {
      var b = a.textContent;
      b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
    }
    function kb(a) {
      switch (a) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function lb(a, b) {
      return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
    }
    var mb;
    var nb = (function(a) {
      return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
        MSApp.execUnsafeLocalFunction(function() {
          return a(b, c, d, e);
        });
      } : a;
    })(function(a, b) {
      if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
      else {
        mb = mb || document.createElement("div");
        mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
        for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
        for (; b.firstChild; ) a.appendChild(b.firstChild);
      }
    });
    function ob(a, b) {
      if (b) {
        var c = a.firstChild;
        if (c && c === a.lastChild && 3 === c.nodeType) {
          c.nodeValue = b;
          return;
        }
      }
      a.textContent = b;
    }
    var pb = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var qb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(pb).forEach(function(a) {
      qb.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        pb[b] = pb[a];
      });
    });
    function rb(a, b, c) {
      return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
    }
    function sb(a, b) {
      a = a.style;
      for (var c in b) if (b.hasOwnProperty(c)) {
        var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
        "float" === c && (c = "cssFloat");
        d ? a.setProperty(c, e) : a[c] = e;
      }
    }
    var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
    function ub(a, b) {
      if (b) {
        if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
        if (null != b.dangerouslySetInnerHTML) {
          if (null != b.children) throw Error(p(60));
          if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
        }
        if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
      }
    }
    function vb(a, b) {
      if (-1 === a.indexOf("-")) return "string" === typeof b.is;
      switch (a) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var wb = null;
    function xb(a) {
      a = a.target || a.srcElement || window;
      a.correspondingUseElement && (a = a.correspondingUseElement);
      return 3 === a.nodeType ? a.parentNode : a;
    }
    var yb = null;
    var zb = null;
    var Ab = null;
    function Bb(a) {
      if (a = Cb(a)) {
        if ("function" !== typeof yb) throw Error(p(280));
        var b = a.stateNode;
        b && (b = Db(b), yb(a.stateNode, a.type, b));
      }
    }
    function Eb(a) {
      zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
    }
    function Fb() {
      if (zb) {
        var a = zb, b = Ab;
        Ab = zb = null;
        Bb(a);
        if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
      }
    }
    function Gb(a, b) {
      return a(b);
    }
    function Hb() {
    }
    var Ib = false;
    function Jb(a, b, c) {
      if (Ib) return a(b, c);
      Ib = true;
      try {
        return Gb(a, b, c);
      } finally {
        if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
      }
    }
    function Kb(a, b) {
      var c = a.stateNode;
      if (null === c) return null;
      var d = Db(c);
      if (null === d) return null;
      c = d[b];
      a: switch (b) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
          a = !d;
          break a;
        default:
          a = false;
      }
      if (a) return null;
      if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
      return c;
    }
    var Lb = false;
    if (ia) try {
      Mb = {};
      Object.defineProperty(Mb, "passive", { get: function() {
        Lb = true;
      } });
      window.addEventListener("test", Mb, Mb);
      window.removeEventListener("test", Mb, Mb);
    } catch (a) {
      Lb = false;
    }
    var Mb;
    function Nb(a, b, c, d, e, f, g, h, k) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        b.apply(c, l);
      } catch (m) {
        this.onError(m);
      }
    }
    var Ob = false;
    var Pb = null;
    var Qb = false;
    var Rb = null;
    var Sb = { onError: function(a) {
      Ob = true;
      Pb = a;
    } };
    function Tb(a, b, c, d, e, f, g, h, k) {
      Ob = false;
      Pb = null;
      Nb.apply(Sb, arguments);
    }
    function Ub(a, b, c, d, e, f, g, h, k) {
      Tb.apply(this, arguments);
      if (Ob) {
        if (Ob) {
          var l = Pb;
          Ob = false;
          Pb = null;
        } else throw Error(p(198));
        Qb || (Qb = true, Rb = l);
      }
    }
    function Vb(a) {
      var b = a, c = a;
      if (a.alternate) for (; b.return; ) b = b.return;
      else {
        a = b;
        do
          b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
        while (a);
      }
      return 3 === b.tag ? c : null;
    }
    function Wb(a) {
      if (13 === a.tag) {
        var b = a.memoizedState;
        null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
        if (null !== b) return b.dehydrated;
      }
      return null;
    }
    function Xb(a) {
      if (Vb(a) !== a) throw Error(p(188));
    }
    function Yb(a) {
      var b = a.alternate;
      if (!b) {
        b = Vb(a);
        if (null === b) throw Error(p(188));
        return b !== a ? null : a;
      }
      for (var c = a, d = b; ; ) {
        var e = c.return;
        if (null === e) break;
        var f = e.alternate;
        if (null === f) {
          d = e.return;
          if (null !== d) {
            c = d;
            continue;
          }
          break;
        }
        if (e.child === f.child) {
          for (f = e.child; f; ) {
            if (f === c) return Xb(e), a;
            if (f === d) return Xb(e), b;
            f = f.sibling;
          }
          throw Error(p(188));
        }
        if (c.return !== d.return) c = e, d = f;
        else {
          for (var g = false, h = e.child; h; ) {
            if (h === c) {
              g = true;
              c = e;
              d = f;
              break;
            }
            if (h === d) {
              g = true;
              d = e;
              c = f;
              break;
            }
            h = h.sibling;
          }
          if (!g) {
            for (h = f.child; h; ) {
              if (h === c) {
                g = true;
                c = f;
                d = e;
                break;
              }
              if (h === d) {
                g = true;
                d = f;
                c = e;
                break;
              }
              h = h.sibling;
            }
            if (!g) throw Error(p(189));
          }
        }
        if (c.alternate !== d) throw Error(p(190));
      }
      if (3 !== c.tag) throw Error(p(188));
      return c.stateNode.current === c ? a : b;
    }
    function Zb(a) {
      a = Yb(a);
      return null !== a ? $b(a) : null;
    }
    function $b(a) {
      if (5 === a.tag || 6 === a.tag) return a;
      for (a = a.child; null !== a; ) {
        var b = $b(a);
        if (null !== b) return b;
        a = a.sibling;
      }
      return null;
    }
    var ac = ca.unstable_scheduleCallback;
    var bc = ca.unstable_cancelCallback;
    var cc = ca.unstable_shouldYield;
    var dc = ca.unstable_requestPaint;
    var B = ca.unstable_now;
    var ec = ca.unstable_getCurrentPriorityLevel;
    var fc = ca.unstable_ImmediatePriority;
    var gc = ca.unstable_UserBlockingPriority;
    var hc = ca.unstable_NormalPriority;
    var ic = ca.unstable_LowPriority;
    var jc = ca.unstable_IdlePriority;
    var kc = null;
    var lc = null;
    function mc(a) {
      if (lc && "function" === typeof lc.onCommitFiberRoot) try {
        lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
      } catch (b) {
      }
    }
    var oc = Math.clz32 ? Math.clz32 : nc;
    var pc = Math.log;
    var qc = Math.LN2;
    function nc(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
    }
    var rc = 64;
    var sc = 4194304;
    function tc(a) {
      switch (a & -a) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return a & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return a & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return a;
      }
    }
    function uc(a, b) {
      var c = a.pendingLanes;
      if (0 === c) return 0;
      var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
      if (0 !== g) {
        var h = g & ~e;
        0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
      } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
      if (0 === d) return 0;
      if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
      0 !== (d & 4) && (d |= c & 16);
      b = a.entangledLanes;
      if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
      return d;
    }
    function vc(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 4:
          return b + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return b + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function wc(a, b) {
      for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
        var g = 31 - oc(f), h = 1 << g, k = e[g];
        if (-1 === k) {
          if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
        } else k <= b && (a.expiredLanes |= h);
        f &= ~h;
      }
    }
    function xc(a) {
      a = a.pendingLanes & -1073741825;
      return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
    }
    function yc() {
      var a = rc;
      rc <<= 1;
      0 === (rc & 4194240) && (rc = 64);
      return a;
    }
    function zc(a) {
      for (var b = [], c = 0; 31 > c; c++) b.push(a);
      return b;
    }
    function Ac(a, b, c) {
      a.pendingLanes |= b;
      536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
      a = a.eventTimes;
      b = 31 - oc(b);
      a[b] = c;
    }
    function Bc(a, b) {
      var c = a.pendingLanes & ~b;
      a.pendingLanes = b;
      a.suspendedLanes = 0;
      a.pingedLanes = 0;
      a.expiredLanes &= b;
      a.mutableReadLanes &= b;
      a.entangledLanes &= b;
      b = a.entanglements;
      var d = a.eventTimes;
      for (a = a.expirationTimes; 0 < c; ) {
        var e = 31 - oc(c), f = 1 << e;
        b[e] = 0;
        d[e] = -1;
        a[e] = -1;
        c &= ~f;
      }
    }
    function Cc(a, b) {
      var c = a.entangledLanes |= b;
      for (a = a.entanglements; c; ) {
        var d = 31 - oc(c), e = 1 << d;
        e & b | a[d] & b && (a[d] |= b);
        c &= ~e;
      }
    }
    var C = 0;
    function Dc(a) {
      a &= -a;
      return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
    }
    var Ec;
    var Fc;
    var Gc;
    var Hc;
    var Ic;
    var Jc = false;
    var Kc = [];
    var Lc = null;
    var Mc = null;
    var Nc = null;
    var Oc = /* @__PURE__ */ new Map();
    var Pc = /* @__PURE__ */ new Map();
    var Qc = [];
    var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Sc(a, b) {
      switch (a) {
        case "focusin":
        case "focusout":
          Lc = null;
          break;
        case "dragenter":
        case "dragleave":
          Mc = null;
          break;
        case "mouseover":
        case "mouseout":
          Nc = null;
          break;
        case "pointerover":
        case "pointerout":
          Oc.delete(b.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Pc.delete(b.pointerId);
      }
    }
    function Tc(a, b, c, d, e, f) {
      if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
      a.eventSystemFlags |= d;
      b = a.targetContainers;
      null !== e && -1 === b.indexOf(e) && b.push(e);
      return a;
    }
    function Uc(a, b, c, d, e) {
      switch (b) {
        case "focusin":
          return Lc = Tc(Lc, a, b, c, d, e), true;
        case "dragenter":
          return Mc = Tc(Mc, a, b, c, d, e), true;
        case "mouseover":
          return Nc = Tc(Nc, a, b, c, d, e), true;
        case "pointerover":
          var f = e.pointerId;
          Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
          return true;
        case "gotpointercapture":
          return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
      }
      return false;
    }
    function Vc(a) {
      var b = Wc(a.target);
      if (null !== b) {
        var c = Vb(b);
        if (null !== c) {
          if (b = c.tag, 13 === b) {
            if (b = Wb(c), null !== b) {
              a.blockedOn = b;
              Ic(a.priority, function() {
                Gc(c);
              });
              return;
            }
          } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
            a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a.blockedOn = null;
    }
    function Xc(a) {
      if (null !== a.blockedOn) return false;
      for (var b = a.targetContainers; 0 < b.length; ) {
        var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
        if (null === c) {
          c = a.nativeEvent;
          var d = new c.constructor(c.type, c);
          wb = d;
          c.target.dispatchEvent(d);
          wb = null;
        } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
        b.shift();
      }
      return true;
    }
    function Zc(a, b, c) {
      Xc(a) && c.delete(b);
    }
    function $c() {
      Jc = false;
      null !== Lc && Xc(Lc) && (Lc = null);
      null !== Mc && Xc(Mc) && (Mc = null);
      null !== Nc && Xc(Nc) && (Nc = null);
      Oc.forEach(Zc);
      Pc.forEach(Zc);
    }
    function ad(a, b) {
      a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
    }
    function bd(a) {
      function b(b2) {
        return ad(b2, a);
      }
      if (0 < Kc.length) {
        ad(Kc[0], a);
        for (var c = 1; c < Kc.length; c++) {
          var d = Kc[c];
          d.blockedOn === a && (d.blockedOn = null);
        }
      }
      null !== Lc && ad(Lc, a);
      null !== Mc && ad(Mc, a);
      null !== Nc && ad(Nc, a);
      Oc.forEach(b);
      Pc.forEach(b);
      for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
      for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
    }
    var cd = ua.ReactCurrentBatchConfig;
    var dd = true;
    function ed(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 1, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function gd(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 4, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function fd(a, b, c, d) {
      if (dd) {
        var e = Yc(a, b, c, d);
        if (null === e) hd(a, b, d, id, c), Sc(a, d);
        else if (Uc(e, a, b, c, d)) d.stopPropagation();
        else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
          for (; null !== e; ) {
            var f = Cb(e);
            null !== f && Ec(f);
            f = Yc(a, b, c, d);
            null === f && hd(a, b, d, id, c);
            if (f === e) break;
            e = f;
          }
          null !== e && d.stopPropagation();
        } else hd(a, b, d, null, c);
      }
    }
    var id = null;
    function Yc(a, b, c, d) {
      id = null;
      a = xb(d);
      a = Wc(a);
      if (null !== a) if (b = Vb(a), null === b) a = null;
      else if (c = b.tag, 13 === c) {
        a = Wb(b);
        if (null !== a) return a;
        a = null;
      } else if (3 === c) {
        if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
        a = null;
      } else b !== a && (a = null);
      id = a;
      return null;
    }
    function jd(a) {
      switch (a) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (ec()) {
            case fc:
              return 1;
            case gc:
              return 4;
            case hc:
            case ic:
              return 16;
            case jc:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var kd = null;
    var ld = null;
    var md = null;
    function nd() {
      if (md) return md;
      var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
      for (a = 0; a < c && b[a] === e[a]; a++) ;
      var g = c - a;
      for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
      return md = e.slice(a, 1 < d ? 1 - d : void 0);
    }
    function od(a) {
      var b = a.keyCode;
      "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
      10 === a && (a = 13);
      return 32 <= a || 13 === a ? a : 0;
    }
    function pd() {
      return true;
    }
    function qd() {
      return false;
    }
    function rd(a) {
      function b(b2, d, e, f, g) {
        this._reactName = b2;
        this._targetInst = e;
        this.type = d;
        this.nativeEvent = f;
        this.target = g;
        this.currentTarget = null;
        for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
        this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
      }
      A(b.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var a2 = this.nativeEvent;
        a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a2 = this.nativeEvent;
        a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd });
      return b;
    }
    var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
      return a.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 };
    var td = rd(sd);
    var ud = A({}, sd, { view: 0, detail: 0 });
    var vd = rd(ud);
    var wd;
    var xd;
    var yd;
    var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
      return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    }, movementX: function(a) {
      if ("movementX" in a) return a.movementX;
      a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
      return wd;
    }, movementY: function(a) {
      return "movementY" in a ? a.movementY : xd;
    } });
    var Bd = rd(Ad);
    var Cd = A({}, Ad, { dataTransfer: 0 });
    var Dd = rd(Cd);
    var Ed = A({}, ud, { relatedTarget: 0 });
    var Fd = rd(Ed);
    var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
    var Hd = rd(Gd);
    var Id = A({}, sd, { clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    } });
    var Jd = rd(Id);
    var Kd = A({}, sd, { data: 0 });
    var Ld = rd(Kd);
    var Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    };
    var Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function Pd(a) {
      var b = this.nativeEvent;
      return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
    }
    function zd() {
      return Pd;
    }
    var Qd = A({}, ud, { key: function(a) {
      if (a.key) {
        var b = Md[a.key] || a.key;
        if ("Unidentified" !== b) return b;
      }
      return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
      return "keypress" === a.type ? od(a) : 0;
    }, keyCode: function(a) {
      return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    }, which: function(a) {
      return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    } });
    var Rd = rd(Qd);
    var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
    var Td = rd(Sd);
    var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
    var Vd = rd(Ud);
    var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
    var Xd = rd(Wd);
    var Yd = A({}, Ad, {
      deltaX: function(a) {
        return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
      },
      deltaY: function(a) {
        return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    });
    var Zd = rd(Yd);
    var $d = [9, 13, 27, 32];
    var ae = ia && "CompositionEvent" in window;
    var be = null;
    ia && "documentMode" in document && (be = document.documentMode);
    var ce = ia && "TextEvent" in window && !be;
    var de = ia && (!ae || be && 8 < be && 11 >= be);
    var ee = String.fromCharCode(32);
    var fe = false;
    function ge(a, b) {
      switch (a) {
        case "keyup":
          return -1 !== $d.indexOf(b.keyCode);
        case "keydown":
          return 229 !== b.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function he(a) {
      a = a.detail;
      return "object" === typeof a && "data" in a ? a.data : null;
    }
    var ie = false;
    function je(a, b) {
      switch (a) {
        case "compositionend":
          return he(b);
        case "keypress":
          if (32 !== b.which) return null;
          fe = true;
          return ee;
        case "textInput":
          return a = b.data, a === ee && fe ? null : a;
        default:
          return null;
      }
    }
    function ke(a, b) {
      if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
      switch (a) {
        case "paste":
          return null;
        case "keypress":
          if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
            if (b.char && 1 < b.char.length) return b.char;
            if (b.which) return String.fromCharCode(b.which);
          }
          return null;
        case "compositionend":
          return de && "ko" !== b.locale ? null : b.data;
        default:
          return null;
      }
    }
    var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function me(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
    }
    function ne(a, b, c, d) {
      Eb(d);
      b = oe(b, "onChange");
      0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
    }
    var pe = null;
    var qe = null;
    function re(a) {
      se(a, 0);
    }
    function te(a) {
      var b = ue(a);
      if (Wa(b)) return a;
    }
    function ve(a, b) {
      if ("change" === a) return b;
    }
    var we = false;
    if (ia) {
      if (ia) {
        ye = "oninput" in document;
        if (!ye) {
          ze = document.createElement("div");
          ze.setAttribute("oninput", "return;");
          ye = "function" === typeof ze.oninput;
        }
        xe = ye;
      } else xe = false;
      we = xe && (!document.documentMode || 9 < document.documentMode);
    }
    var xe;
    var ye;
    var ze;
    function Ae() {
      pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
    }
    function Be(a) {
      if ("value" === a.propertyName && te(qe)) {
        var b = [];
        ne(b, qe, a, xb(a));
        Jb(re, b);
      }
    }
    function Ce(a, b, c) {
      "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
    }
    function De(a) {
      if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
    }
    function Ee(a, b) {
      if ("click" === a) return te(b);
    }
    function Fe(a, b) {
      if ("input" === a || "change" === a) return te(b);
    }
    function Ge(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var He = "function" === typeof Object.is ? Object.is : Ge;
    function Ie(a, b) {
      if (He(a, b)) return true;
      if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
      var c = Object.keys(a), d = Object.keys(b);
      if (c.length !== d.length) return false;
      for (d = 0; d < c.length; d++) {
        var e = c[d];
        if (!ja.call(b, e) || !He(a[e], b[e])) return false;
      }
      return true;
    }
    function Je(a) {
      for (; a && a.firstChild; ) a = a.firstChild;
      return a;
    }
    function Ke(a, b) {
      var c = Je(a);
      a = 0;
      for (var d; c; ) {
        if (3 === c.nodeType) {
          d = a + c.textContent.length;
          if (a <= b && d >= b) return { node: c, offset: b - a };
          a = d;
        }
        a: {
          for (; c; ) {
            if (c.nextSibling) {
              c = c.nextSibling;
              break a;
            }
            c = c.parentNode;
          }
          c = void 0;
        }
        c = Je(c);
      }
    }
    function Le(a, b) {
      return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
    }
    function Me() {
      for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
        try {
          var c = "string" === typeof b.contentWindow.location.href;
        } catch (d) {
          c = false;
        }
        if (c) a = b.contentWindow;
        else break;
        b = Xa(a.document);
      }
      return b;
    }
    function Ne(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
    }
    function Oe(a) {
      var b = Me(), c = a.focusedElem, d = a.selectionRange;
      if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
        if (null !== d && Ne(c)) {
          if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
          else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
            a = a.getSelection();
            var e = c.textContent.length, f = Math.min(d.start, e);
            d = void 0 === d.end ? f : Math.min(d.end, e);
            !a.extend && f > d && (e = d, d = f, f = e);
            e = Ke(c, f);
            var g = Ke(
              c,
              d
            );
            e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
          }
        }
        b = [];
        for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
        "function" === typeof c.focus && c.focus();
        for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }
    var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
    var Qe = null;
    var Re = null;
    var Se = null;
    var Te = false;
    function Ue(a, b, c) {
      var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
      Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
    }
    function Ve(a, b) {
      var c = {};
      c[a.toLowerCase()] = b.toLowerCase();
      c["Webkit" + a] = "webkit" + b;
      c["Moz" + a] = "moz" + b;
      return c;
    }
    var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
    var Xe = {};
    var Ye = {};
    ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
    function Ze(a) {
      if (Xe[a]) return Xe[a];
      if (!We[a]) return a;
      var b = We[a], c;
      for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
      return a;
    }
    var $e = Ze("animationend");
    var af = Ze("animationiteration");
    var bf = Ze("animationstart");
    var cf = Ze("transitionend");
    var df = /* @__PURE__ */ new Map();
    var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ff(a, b) {
      df.set(a, b);
      fa(b, [a]);
    }
    for (gf = 0; gf < ef.length; gf++) {
      hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
      ff(jf, "on" + kf);
    }
    var hf;
    var jf;
    var kf;
    var gf;
    ff($e, "onAnimationEnd");
    ff(af, "onAnimationIteration");
    ff(bf, "onAnimationStart");
    ff("dblclick", "onDoubleClick");
    ff("focusin", "onFocus");
    ff("focusout", "onBlur");
    ff(cf, "onTransitionEnd");
    ha("onMouseEnter", ["mouseout", "mouseover"]);
    ha("onMouseLeave", ["mouseout", "mouseover"]);
    ha("onPointerEnter", ["pointerout", "pointerover"]);
    ha("onPointerLeave", ["pointerout", "pointerover"]);
    fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
    var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
    function nf(a, b, c) {
      var d = a.type || "unknown-event";
      a.currentTarget = c;
      Ub(d, b, void 0, a);
      a.currentTarget = null;
    }
    function se(a, b) {
      b = 0 !== (b & 4);
      for (var c = 0; c < a.length; c++) {
        var d = a[c], e = d.event;
        d = d.listeners;
        a: {
          var f = void 0;
          if (b) for (var g = d.length - 1; 0 <= g; g--) {
            var h = d[g], k = h.instance, l = h.currentTarget;
            h = h.listener;
            if (k !== f && e.isPropagationStopped()) break a;
            nf(e, h, l);
            f = k;
          }
          else for (g = 0; g < d.length; g++) {
            h = d[g];
            k = h.instance;
            l = h.currentTarget;
            h = h.listener;
            if (k !== f && e.isPropagationStopped()) break a;
            nf(e, h, l);
            f = k;
          }
        }
      }
      if (Qb) throw a = Rb, Qb = false, Rb = null, a;
    }
    function D(a, b) {
      var c = b[of];
      void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
      var d = a + "__bubble";
      c.has(d) || (pf(b, a, 2, false), c.add(d));
    }
    function qf(a, b, c) {
      var d = 0;
      b && (d |= 4);
      pf(c, a, d, b);
    }
    var rf = "_reactListening" + Math.random().toString(36).slice(2);
    function sf(a) {
      if (!a[rf]) {
        a[rf] = true;
        da.forEach(function(b2) {
          "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
        });
        var b = 9 === a.nodeType ? a : a.ownerDocument;
        null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
      }
    }
    function pf(a, b, c, d) {
      switch (jd(b)) {
        case 1:
          var e = ed;
          break;
        case 4:
          e = gd;
          break;
        default:
          e = fd;
      }
      c = e.bind(null, b, c, a);
      e = void 0;
      !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
      d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
    }
    function hd(a, b, c, d, e) {
      var f = d;
      if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
        if (null === d) return;
        var g = d.tag;
        if (3 === g || 4 === g) {
          var h = d.stateNode.containerInfo;
          if (h === e || 8 === h.nodeType && h.parentNode === e) break;
          if (4 === g) for (g = d.return; null !== g; ) {
            var k = g.tag;
            if (3 === k || 4 === k) {
              if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
            }
            g = g.return;
          }
          for (; null !== h; ) {
            g = Wc(h);
            if (null === g) return;
            k = g.tag;
            if (5 === k || 6 === k) {
              d = f = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
      Jb(function() {
        var d2 = f, e2 = xb(c), g2 = [];
        a: {
          var h2 = df.get(a);
          if (void 0 !== h2) {
            var k2 = td, n = a;
            switch (a) {
              case "keypress":
                if (0 === od(c)) break a;
              case "keydown":
              case "keyup":
                k2 = Rd;
                break;
              case "focusin":
                n = "focus";
                k2 = Fd;
                break;
              case "focusout":
                n = "blur";
                k2 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k2 = Fd;
                break;
              case "click":
                if (2 === c.button) break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k2 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k2 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k2 = Vd;
                break;
              case $e:
              case af:
              case bf:
                k2 = Hd;
                break;
              case cf:
                k2 = Xd;
                break;
              case "scroll":
                k2 = vd;
                break;
              case "wheel":
                k2 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k2 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k2 = Td;
            }
            var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
            t = [];
            for (var w = d2, u; null !== w; ) {
              u = w;
              var F = u.stateNode;
              5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
              if (J) break;
              w = w.return;
            }
            0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
          }
        }
        if (0 === (b & 7)) {
          a: {
            h2 = "mouseover" === a || "pointerover" === a;
            k2 = "mouseout" === a || "pointerout" === a;
            if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
            if (k2 || h2) {
              h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
              if (k2) {
                if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
              } else k2 = null, n = d2;
              if (k2 !== n) {
                t = Bd;
                F = "onMouseLeave";
                x = "onMouseEnter";
                w = "mouse";
                if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                J = null == k2 ? h2 : ue(k2);
                u = null == n ? h2 : ue(n);
                h2 = new t(F, w + "leave", k2, c, e2);
                h2.target = J;
                h2.relatedTarget = u;
                F = null;
                Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                J = F;
                if (k2 && n) b: {
                  t = k2;
                  x = n;
                  w = 0;
                  for (u = t; u; u = vf(u)) w++;
                  u = 0;
                  for (F = x; F; F = vf(F)) u++;
                  for (; 0 < w - u; ) t = vf(t), w--;
                  for (; 0 < u - w; ) x = vf(x), u--;
                  for (; w--; ) {
                    if (t === x || null !== x && t === x.alternate) break b;
                    t = vf(t);
                    x = vf(x);
                  }
                  t = null;
                }
                else t = null;
                null !== k2 && wf(g2, h2, k2, t, false);
                null !== n && null !== J && wf(g2, J, n, t, true);
              }
            }
          }
          a: {
            h2 = d2 ? ue(d2) : window;
            k2 = h2.nodeName && h2.nodeName.toLowerCase();
            if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
            else if (me(h2)) if (we) na = Fe;
            else {
              na = De;
              var xa = Ce;
            }
            else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
            if (na && (na = na(a, d2))) {
              ne(g2, na, c, e2);
              break a;
            }
            xa && xa(a, h2, d2);
            "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
          }
          xa = d2 ? ue(d2) : window;
          switch (a) {
            case "focusin":
              if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
              break;
            case "focusout":
              Se = Re = Qe = null;
              break;
            case "mousedown":
              Te = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te = false;
              Ue(g2, c, e2);
              break;
            case "selectionchange":
              if (Pe) break;
            case "keydown":
            case "keyup":
              Ue(g2, c, e2);
          }
          var $a;
          if (ae) b: {
            switch (a) {
              case "compositionstart":
                var ba = "onCompositionStart";
                break b;
              case "compositionend":
                ba = "onCompositionEnd";
                break b;
              case "compositionupdate":
                ba = "onCompositionUpdate";
                break b;
            }
            ba = void 0;
          }
          else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
          ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
          if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
        }
        se(g2, b);
      });
    }
    function tf(a, b, c) {
      return { instance: a, listener: b, currentTarget: c };
    }
    function oe(a, b) {
      for (var c = b + "Capture", d = []; null !== a; ) {
        var e = a, f = e.stateNode;
        5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
        a = a.return;
      }
      return d;
    }
    function vf(a) {
      if (null === a) return null;
      do
        a = a.return;
      while (a && 5 !== a.tag);
      return a ? a : null;
    }
    function wf(a, b, c, d, e) {
      for (var f = b._reactName, g = []; null !== c && c !== d; ) {
        var h = c, k = h.alternate, l = h.stateNode;
        if (null !== k && k === d) break;
        5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
        c = c.return;
      }
      0 !== g.length && a.push({ event: b, listeners: g });
    }
    var xf = /\r\n?/g;
    var yf = /\u0000|\uFFFD/g;
    function zf(a) {
      return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
    }
    function Af(a, b, c) {
      b = zf(b);
      if (zf(a) !== b && c) throw Error(p(425));
    }
    function Bf() {
    }
    var Cf = null;
    var Df = null;
    function Ef(a, b) {
      return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
    }
    var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
    var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
    var Hf = "function" === typeof Promise ? Promise : void 0;
    var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
      return Hf.resolve(null).then(a).catch(If);
    } : Ff;
    function If(a) {
      setTimeout(function() {
        throw a;
      });
    }
    function Kf(a, b) {
      var c = b, d = 0;
      do {
        var e = c.nextSibling;
        a.removeChild(c);
        if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
          if (0 === d) {
            a.removeChild(e);
            bd(b);
            return;
          }
          d--;
        } else "$" !== c && "$?" !== c && "$!" !== c || d++;
        c = e;
      } while (c);
      bd(b);
    }
    function Lf(a) {
      for (; null != a; a = a.nextSibling) {
        var b = a.nodeType;
        if (1 === b || 3 === b) break;
        if (8 === b) {
          b = a.data;
          if ("$" === b || "$!" === b || "$?" === b) break;
          if ("/$" === b) return null;
        }
      }
      return a;
    }
    function Mf(a) {
      a = a.previousSibling;
      for (var b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("$" === c || "$!" === c || "$?" === c) {
            if (0 === b) return a;
            b--;
          } else "/$" === c && b++;
        }
        a = a.previousSibling;
      }
      return null;
    }
    var Nf = Math.random().toString(36).slice(2);
    var Of = "__reactFiber$" + Nf;
    var Pf = "__reactProps$" + Nf;
    var uf = "__reactContainer$" + Nf;
    var of = "__reactEvents$" + Nf;
    var Qf = "__reactListeners$" + Nf;
    var Rf = "__reactHandles$" + Nf;
    function Wc(a) {
      var b = a[Of];
      if (b) return b;
      for (var c = a.parentNode; c; ) {
        if (b = c[uf] || c[Of]) {
          c = b.alternate;
          if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
            if (c = a[Of]) return c;
            a = Mf(a);
          }
          return b;
        }
        a = c;
        c = a.parentNode;
      }
      return null;
    }
    function Cb(a) {
      a = a[Of] || a[uf];
      return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
    }
    function ue(a) {
      if (5 === a.tag || 6 === a.tag) return a.stateNode;
      throw Error(p(33));
    }
    function Db(a) {
      return a[Pf] || null;
    }
    var Sf = [];
    var Tf = -1;
    function Uf(a) {
      return { current: a };
    }
    function E(a) {
      0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
    }
    function G(a, b) {
      Tf++;
      Sf[Tf] = a.current;
      a.current = b;
    }
    var Vf = {};
    var H = Uf(Vf);
    var Wf = Uf(false);
    var Xf = Vf;
    function Yf(a, b) {
      var c = a.type.contextTypes;
      if (!c) return Vf;
      var d = a.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
      var e = {}, f;
      for (f in c) e[f] = b[f];
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
      return e;
    }
    function Zf(a) {
      a = a.childContextTypes;
      return null !== a && void 0 !== a;
    }
    function $f() {
      E(Wf);
      E(H);
    }
    function ag(a, b, c) {
      if (H.current !== Vf) throw Error(p(168));
      G(H, b);
      G(Wf, c);
    }
    function bg(a, b, c) {
      var d = a.stateNode;
      b = b.childContextTypes;
      if ("function" !== typeof d.getChildContext) return c;
      d = d.getChildContext();
      for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
      return A({}, c, d);
    }
    function cg(a) {
      a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
      Xf = H.current;
      G(H, a);
      G(Wf, Wf.current);
      return true;
    }
    function dg(a, b, c) {
      var d = a.stateNode;
      if (!d) throw Error(p(169));
      c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
      G(Wf, c);
    }
    var eg = null;
    var fg = false;
    var gg = false;
    function hg(a) {
      null === eg ? eg = [a] : eg.push(a);
    }
    function ig(a) {
      fg = true;
      hg(a);
    }
    function jg() {
      if (!gg && null !== eg) {
        gg = true;
        var a = 0, b = C;
        try {
          var c = eg;
          for (C = 1; a < c.length; a++) {
            var d = c[a];
            do
              d = d(true);
            while (null !== d);
          }
          eg = null;
          fg = false;
        } catch (e) {
          throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
        } finally {
          C = b, gg = false;
        }
      }
      return null;
    }
    var kg = [];
    var lg = 0;
    var mg = null;
    var ng = 0;
    var og = [];
    var pg = 0;
    var qg = null;
    var rg = 1;
    var sg = "";
    function tg(a, b) {
      kg[lg++] = ng;
      kg[lg++] = mg;
      mg = a;
      ng = b;
    }
    function ug(a, b, c) {
      og[pg++] = rg;
      og[pg++] = sg;
      og[pg++] = qg;
      qg = a;
      var d = rg;
      a = sg;
      var e = 32 - oc(d) - 1;
      d &= ~(1 << e);
      c += 1;
      var f = 32 - oc(b) + e;
      if (30 < f) {
        var g = e - e % 5;
        f = (d & (1 << g) - 1).toString(32);
        d >>= g;
        e -= g;
        rg = 1 << 32 - oc(b) + e | c << e | d;
        sg = f + a;
      } else rg = 1 << f | c << e | d, sg = a;
    }
    function vg(a) {
      null !== a.return && (tg(a, 1), ug(a, 1, 0));
    }
    function wg(a) {
      for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
      for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
    }
    var xg = null;
    var yg = null;
    var I = false;
    var zg = null;
    function Ag(a, b) {
      var c = Bg(5, null, null, 0);
      c.elementType = "DELETED";
      c.stateNode = b;
      c.return = a;
      b = a.deletions;
      null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
    }
    function Cg(a, b) {
      switch (a.tag) {
        case 5:
          var c = a.type;
          b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
          return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
        case 6:
          return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
        case 13:
          return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
        default:
          return false;
      }
    }
    function Dg(a) {
      return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
    }
    function Eg(a) {
      if (I) {
        var b = yg;
        if (b) {
          var c = b;
          if (!Cg(a, b)) {
            if (Dg(a)) throw Error(p(418));
            b = Lf(c.nextSibling);
            var d = xg;
            b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
          }
        } else {
          if (Dg(a)) throw Error(p(418));
          a.flags = a.flags & -4097 | 2;
          I = false;
          xg = a;
        }
      }
    }
    function Fg(a) {
      for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
      xg = a;
    }
    function Gg(a) {
      if (a !== xg) return false;
      if (!I) return Fg(a), I = true, false;
      var b;
      (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
      if (b && (b = yg)) {
        if (Dg(a)) throw Hg(), Error(p(418));
        for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
      }
      Fg(a);
      if (13 === a.tag) {
        a = a.memoizedState;
        a = null !== a ? a.dehydrated : null;
        if (!a) throw Error(p(317));
        a: {
          a = a.nextSibling;
          for (b = 0; a; ) {
            if (8 === a.nodeType) {
              var c = a.data;
              if ("/$" === c) {
                if (0 === b) {
                  yg = Lf(a.nextSibling);
                  break a;
                }
                b--;
              } else "$" !== c && "$!" !== c && "$?" !== c || b++;
            }
            a = a.nextSibling;
          }
          yg = null;
        }
      } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
      return true;
    }
    function Hg() {
      for (var a = yg; a; ) a = Lf(a.nextSibling);
    }
    function Ig() {
      yg = xg = null;
      I = false;
    }
    function Jg(a) {
      null === zg ? zg = [a] : zg.push(a);
    }
    var Kg = ua.ReactCurrentBatchConfig;
    function Lg(a, b, c) {
      a = c.ref;
      if (null !== a && "function" !== typeof a && "object" !== typeof a) {
        if (c._owner) {
          c = c._owner;
          if (c) {
            if (1 !== c.tag) throw Error(p(309));
            var d = c.stateNode;
          }
          if (!d) throw Error(p(147, a));
          var e = d, f = "" + a;
          if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
          b = function(a2) {
            var b2 = e.refs;
            null === a2 ? delete b2[f] : b2[f] = a2;
          };
          b._stringRef = f;
          return b;
        }
        if ("string" !== typeof a) throw Error(p(284));
        if (!c._owner) throw Error(p(290, a));
      }
      return a;
    }
    function Mg(a, b) {
      a = Object.prototype.toString.call(b);
      throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
    }
    function Ng(a) {
      var b = a._init;
      return b(a._payload);
    }
    function Og(a) {
      function b(b2, c2) {
        if (a) {
          var d2 = b2.deletions;
          null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
        }
      }
      function c(c2, d2) {
        if (!a) return null;
        for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
        return null;
      }
      function d(a2, b2) {
        for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
        return a2;
      }
      function e(a2, b2) {
        a2 = Pg(a2, b2);
        a2.index = 0;
        a2.sibling = null;
        return a2;
      }
      function f(b2, c2, d2) {
        b2.index = d2;
        if (!a) return b2.flags |= 1048576, c2;
        d2 = b2.alternate;
        if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
        b2.flags |= 2;
        return c2;
      }
      function g(b2) {
        a && null === b2.alternate && (b2.flags |= 2);
        return b2;
      }
      function h(a2, b2, c2, d2) {
        if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function k(a2, b2, c2, d2) {
        var f2 = c2.type;
        if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
        if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
        d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
        d2.ref = Lg(a2, b2, c2);
        d2.return = a2;
        return d2;
      }
      function l(a2, b2, c2, d2) {
        if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2.children || []);
        b2.return = a2;
        return b2;
      }
      function m(a2, b2, c2, d2, f2) {
        if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function q(a2, b2, c2) {
        if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
        if ("object" === typeof b2 && null !== b2) {
          switch (b2.$$typeof) {
            case va:
              return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
            case wa:
              return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
            case Ha:
              var d2 = b2._init;
              return q(a2, d2(b2._payload), c2);
          }
          if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
          Mg(a2, b2);
        }
        return null;
      }
      function r(a2, b2, c2, d2) {
        var e2 = null !== b2 ? b2.key : null;
        if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
        if ("object" === typeof c2 && null !== c2) {
          switch (c2.$$typeof) {
            case va:
              return c2.key === e2 ? k(a2, b2, c2, d2) : null;
            case wa:
              return c2.key === e2 ? l(a2, b2, c2, d2) : null;
            case Ha:
              return e2 = c2._init, r(
                a2,
                b2,
                e2(c2._payload),
                d2
              );
          }
          if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
          Mg(a2, c2);
        }
        return null;
      }
      function y(a2, b2, c2, d2, e2) {
        if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
        if ("object" === typeof d2 && null !== d2) {
          switch (d2.$$typeof) {
            case va:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
            case wa:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
            case Ha:
              var f2 = d2._init;
              return y(a2, b2, c2, f2(d2._payload), e2);
          }
          if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
          Mg(b2, d2);
        }
        return null;
      }
      function n(e2, g2, h2, k2) {
        for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
          u.index > w ? (x = u, u = null) : x = u.sibling;
          var n2 = r(e2, u, h2[w], k2);
          if (null === n2) {
            null === u && (u = x);
            break;
          }
          a && u && null === n2.alternate && b(e2, u);
          g2 = f(n2, g2, w);
          null === m2 ? l2 = n2 : m2.sibling = n2;
          m2 = n2;
          u = x;
        }
        if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
        if (null === u) {
          for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
          I && tg(e2, w);
          return l2;
        }
        for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
        a && u.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w);
        return l2;
      }
      function t(e2, g2, h2, k2) {
        var l2 = Ka(h2);
        if ("function" !== typeof l2) throw Error(p(150));
        h2 = l2.call(h2);
        if (null == h2) throw Error(p(151));
        for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
          m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
          var t2 = r(e2, m2, n2.value, k2);
          if (null === t2) {
            null === m2 && (m2 = x);
            break;
          }
          a && m2 && null === t2.alternate && b(e2, m2);
          g2 = f(t2, g2, w);
          null === u ? l2 = t2 : u.sibling = t2;
          u = t2;
          m2 = x;
        }
        if (n2.done) return c(
          e2,
          m2
        ), I && tg(e2, w), l2;
        if (null === m2) {
          for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          I && tg(e2, w);
          return l2;
        }
        for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
        a && m2.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w);
        return l2;
      }
      function J(a2, d2, f2, h2) {
        "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
        if ("object" === typeof f2 && null !== f2) {
          switch (f2.$$typeof) {
            case va:
              a: {
                for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                  if (l2.key === k2) {
                    k2 = f2.type;
                    if (k2 === ya) {
                      if (7 === l2.tag) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props.children);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                    } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                      c(a2, l2.sibling);
                      d2 = e(l2, f2.props);
                      d2.ref = Lg(a2, l2, f2);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                    c(a2, l2);
                    break;
                  } else b(a2, l2);
                  l2 = l2.sibling;
                }
                f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
              }
              return g(a2);
            case wa:
              a: {
                for (l2 = f2.key; null !== d2; ) {
                  if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                    c(a2, d2.sibling);
                    d2 = e(d2, f2.children || []);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  } else {
                    c(a2, d2);
                    break;
                  }
                  else b(a2, d2);
                  d2 = d2.sibling;
                }
                d2 = Sg(f2, a2.mode, h2);
                d2.return = a2;
                a2 = d2;
              }
              return g(a2);
            case Ha:
              return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
          }
          if (eb(f2)) return n(a2, d2, f2, h2);
          if (Ka(f2)) return t(a2, d2, f2, h2);
          Mg(a2, f2);
        }
        return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
      }
      return J;
    }
    var Ug = Og(true);
    var Vg = Og(false);
    var Wg = Uf(null);
    var Xg = null;
    var Yg = null;
    var Zg = null;
    function $g() {
      Zg = Yg = Xg = null;
    }
    function ah(a) {
      var b = Wg.current;
      E(Wg);
      a._currentValue = b;
    }
    function bh(a, b, c) {
      for (; null !== a; ) {
        var d = a.alternate;
        (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
        if (a === c) break;
        a = a.return;
      }
    }
    function ch(a, b) {
      Xg = a;
      Zg = Yg = null;
      a = a.dependencies;
      null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
    }
    function eh(a) {
      var b = a._currentValue;
      if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
        if (null === Xg) throw Error(p(308));
        Yg = a;
        Xg.dependencies = { lanes: 0, firstContext: a };
      } else Yg = Yg.next = a;
      return b;
    }
    var fh = null;
    function gh(a) {
      null === fh ? fh = [a] : fh.push(a);
    }
    function hh(a, b, c, d) {
      var e = b.interleaved;
      null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
      b.interleaved = c;
      return ih(a, d);
    }
    function ih(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      null !== c && (c.lanes |= b);
      c = a;
      for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
      return 3 === c.tag ? c.stateNode : null;
    }
    var jh = false;
    function kh(a) {
      a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
    }
    function lh(a, b) {
      a = a.updateQueue;
      b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
    }
    function mh(a, b) {
      return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
    }
    function nh(a, b, c) {
      var d = a.updateQueue;
      if (null === d) return null;
      d = d.shared;
      if (0 !== (K & 2)) {
        var e = d.pending;
        null === e ? b.next = b : (b.next = e.next, e.next = b);
        d.pending = b;
        return ih(a, c);
      }
      e = d.interleaved;
      null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
      d.interleaved = b;
      return ih(a, c);
    }
    function oh(a, b, c) {
      b = b.updateQueue;
      if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    function ph(a, b) {
      var c = a.updateQueue, d = a.alternate;
      if (null !== d && (d = d.updateQueue, c === d)) {
        var e = null, f = null;
        c = c.firstBaseUpdate;
        if (null !== c) {
          do {
            var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
            null === f ? e = f = g : f = f.next = g;
            c = c.next;
          } while (null !== c);
          null === f ? e = f = b : f = f.next = b;
        } else e = f = b;
        c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
        a.updateQueue = c;
        return;
      }
      a = c.lastBaseUpdate;
      null === a ? c.firstBaseUpdate = b : a.next = b;
      c.lastBaseUpdate = b;
    }
    function qh(a, b, c, d) {
      var e = a.updateQueue;
      jh = false;
      var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
      if (null !== h) {
        e.shared.pending = null;
        var k = h, l = k.next;
        k.next = null;
        null === g ? f = l : g.next = l;
        g = k;
        var m = a.alternate;
        null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
      }
      if (null !== f) {
        var q = e.baseState;
        g = 0;
        m = l = k = null;
        h = f;
        do {
          var r = h.lane, y = h.eventTime;
          if ((d & r) === r) {
            null !== m && (m = m.next = {
              eventTime: y,
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            });
            a: {
              var n = a, t = h;
              r = b;
              y = c;
              switch (t.tag) {
                case 1:
                  n = t.payload;
                  if ("function" === typeof n) {
                    q = n.call(y, q, r);
                    break a;
                  }
                  q = n;
                  break a;
                case 3:
                  n.flags = n.flags & -65537 | 128;
                case 0:
                  n = t.payload;
                  r = "function" === typeof n ? n.call(y, q, r) : n;
                  if (null === r || void 0 === r) break a;
                  q = A({}, q, r);
                  break a;
                case 2:
                  jh = true;
              }
            }
            null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
          } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
          h = h.next;
          if (null === h) if (h = e.shared.pending, null === h) break;
          else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
        } while (1);
        null === m && (k = q);
        e.baseState = k;
        e.firstBaseUpdate = l;
        e.lastBaseUpdate = m;
        b = e.shared.interleaved;
        if (null !== b) {
          e = b;
          do
            g |= e.lane, e = e.next;
          while (e !== b);
        } else null === f && (e.shared.lanes = 0);
        rh |= g;
        a.lanes = g;
        a.memoizedState = q;
      }
    }
    function sh(a, b, c) {
      a = b.effects;
      b.effects = null;
      if (null !== a) for (b = 0; b < a.length; b++) {
        var d = a[b], e = d.callback;
        if (null !== e) {
          d.callback = null;
          d = c;
          if ("function" !== typeof e) throw Error(p(191, e));
          e.call(d);
        }
      }
    }
    var th = {};
    var uh = Uf(th);
    var vh = Uf(th);
    var wh = Uf(th);
    function xh(a) {
      if (a === th) throw Error(p(174));
      return a;
    }
    function yh(a, b) {
      G(wh, b);
      G(vh, a);
      G(uh, th);
      a = b.nodeType;
      switch (a) {
        case 9:
        case 11:
          b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
          break;
        default:
          a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
      }
      E(uh);
      G(uh, b);
    }
    function zh() {
      E(uh);
      E(vh);
      E(wh);
    }
    function Ah(a) {
      xh(wh.current);
      var b = xh(uh.current);
      var c = lb(b, a.type);
      b !== c && (G(vh, a), G(uh, c));
    }
    function Bh(a) {
      vh.current === a && (E(uh), E(vh));
    }
    var L = Uf(0);
    function Ch(a) {
      for (var b = a; null !== b; ) {
        if (13 === b.tag) {
          var c = b.memoizedState;
          if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
        } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
          if (0 !== (b.flags & 128)) return b;
        } else if (null !== b.child) {
          b.child.return = b;
          b = b.child;
          continue;
        }
        if (b === a) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a) return null;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
      return null;
    }
    var Dh = [];
    function Eh() {
      for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
      Dh.length = 0;
    }
    var Fh = ua.ReactCurrentDispatcher;
    var Gh = ua.ReactCurrentBatchConfig;
    var Hh = 0;
    var M = null;
    var N = null;
    var O = null;
    var Ih = false;
    var Jh = false;
    var Kh = 0;
    var Lh = 0;
    function P() {
      throw Error(p(321));
    }
    function Mh(a, b) {
      if (null === b) return false;
      for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
      return true;
    }
    function Nh(a, b, c, d, e, f) {
      Hh = f;
      M = b;
      b.memoizedState = null;
      b.updateQueue = null;
      b.lanes = 0;
      Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
      a = c(d, e);
      if (Jh) {
        f = 0;
        do {
          Jh = false;
          Kh = 0;
          if (25 <= f) throw Error(p(301));
          f += 1;
          O = N = null;
          b.updateQueue = null;
          Fh.current = Qh;
          a = c(d, e);
        } while (Jh);
      }
      Fh.current = Rh;
      b = null !== N && null !== N.next;
      Hh = 0;
      O = N = M = null;
      Ih = false;
      if (b) throw Error(p(300));
      return a;
    }
    function Sh() {
      var a = 0 !== Kh;
      Kh = 0;
      return a;
    }
    function Th() {
      var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
      return O;
    }
    function Uh() {
      if (null === N) {
        var a = M.alternate;
        a = null !== a ? a.memoizedState : null;
      } else a = N.next;
      var b = null === O ? M.memoizedState : O.next;
      if (null !== b) O = b, N = a;
      else {
        if (null === a) throw Error(p(310));
        N = a;
        a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
      }
      return O;
    }
    function Vh(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function Wh(a) {
      var b = Uh(), c = b.queue;
      if (null === c) throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = N, e = d.baseQueue, f = c.pending;
      if (null !== f) {
        if (null !== e) {
          var g = e.next;
          e.next = f.next;
          f.next = g;
        }
        d.baseQueue = e = f;
        c.pending = null;
      }
      if (null !== e) {
        f = e.next;
        d = d.baseState;
        var h = g = null, k = null, l = f;
        do {
          var m = l.lane;
          if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
          else {
            var q = {
              lane: m,
              action: l.action,
              hasEagerState: l.hasEagerState,
              eagerState: l.eagerState,
              next: null
            };
            null === k ? (h = k = q, g = d) : k = k.next = q;
            M.lanes |= m;
            rh |= m;
          }
          l = l.next;
        } while (null !== l && l !== f);
        null === k ? g = d : k.next = h;
        He(d, b.memoizedState) || (dh = true);
        b.memoizedState = d;
        b.baseState = g;
        b.baseQueue = k;
        c.lastRenderedState = d;
      }
      a = c.interleaved;
      if (null !== a) {
        e = a;
        do
          f = e.lane, M.lanes |= f, rh |= f, e = e.next;
        while (e !== a);
      } else null === e && (c.lanes = 0);
      return [b.memoizedState, c.dispatch];
    }
    function Xh(a) {
      var b = Uh(), c = b.queue;
      if (null === c) throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = c.dispatch, e = c.pending, f = b.memoizedState;
      if (null !== e) {
        c.pending = null;
        var g = e = e.next;
        do
          f = a(f, g.action), g = g.next;
        while (g !== e);
        He(f, b.memoizedState) || (dh = true);
        b.memoizedState = f;
        null === b.baseQueue && (b.baseState = f);
        c.lastRenderedState = f;
      }
      return [f, d];
    }
    function Yh() {
    }
    function Zh(a, b) {
      var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
      f && (d.memoizedState = e, dh = true);
      d = d.queue;
      $h(ai.bind(null, c, d, a), [a]);
      if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
        c.flags |= 2048;
        bi(9, ci.bind(null, c, d, e, b), void 0, null);
        if (null === Q) throw Error(p(349));
        0 !== (Hh & 30) || di(c, b, e);
      }
      return e;
    }
    function di(a, b, c) {
      a.flags |= 16384;
      a = { getSnapshot: b, value: c };
      b = M.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
    }
    function ci(a, b, c, d) {
      b.value = c;
      b.getSnapshot = d;
      ei(b) && fi(a);
    }
    function ai(a, b, c) {
      return c(function() {
        ei(b) && fi(a);
      });
    }
    function ei(a) {
      var b = a.getSnapshot;
      a = a.value;
      try {
        var c = b();
        return !He(a, c);
      } catch (d) {
        return true;
      }
    }
    function fi(a) {
      var b = ih(a, 1);
      null !== b && gi(b, a, 1, -1);
    }
    function hi(a) {
      var b = Th();
      "function" === typeof a && (a = a());
      b.memoizedState = b.baseState = a;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
      b.queue = a;
      a = a.dispatch = ii.bind(null, M, a);
      return [b.memoizedState, a];
    }
    function bi(a, b, c, d) {
      a = { tag: a, create: b, destroy: c, deps: d, next: null };
      b = M.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
      return a;
    }
    function ji() {
      return Uh().memoizedState;
    }
    function ki(a, b, c, d) {
      var e = Th();
      M.flags |= a;
      e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
    }
    function li(a, b, c, d) {
      var e = Uh();
      d = void 0 === d ? null : d;
      var f = void 0;
      if (null !== N) {
        var g = N.memoizedState;
        f = g.destroy;
        if (null !== d && Mh(d, g.deps)) {
          e.memoizedState = bi(b, c, f, d);
          return;
        }
      }
      M.flags |= a;
      e.memoizedState = bi(1 | b, c, f, d);
    }
    function mi(a, b) {
      return ki(8390656, 8, a, b);
    }
    function $h(a, b) {
      return li(2048, 8, a, b);
    }
    function ni(a, b) {
      return li(4, 2, a, b);
    }
    function oi(a, b) {
      return li(4, 4, a, b);
    }
    function pi(a, b) {
      if ("function" === typeof b) return a = a(), b(a), function() {
        b(null);
      };
      if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
        b.current = null;
      };
    }
    function qi(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return li(4, 4, pi.bind(null, b, a), c);
    }
    function ri() {
    }
    function si(a, b) {
      var c = Uh();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Mh(b, d[1])) return d[0];
      c.memoizedState = [a, b];
      return a;
    }
    function ti(a, b) {
      var c = Uh();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Mh(b, d[1])) return d[0];
      a = a();
      c.memoizedState = [a, b];
      return a;
    }
    function ui(a, b, c) {
      if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
      He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
      return b;
    }
    function vi(a, b) {
      var c = C;
      C = 0 !== c && 4 > c ? c : 4;
      a(true);
      var d = Gh.transition;
      Gh.transition = {};
      try {
        a(false), b();
      } finally {
        C = c, Gh.transition = d;
      }
    }
    function wi() {
      return Uh().memoizedState;
    }
    function xi(a, b, c) {
      var d = yi(a);
      c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (zi(a)) Ai(b, c);
      else if (c = hh(a, b, c, d), null !== c) {
        var e = R();
        gi(c, a, d, e);
        Bi(c, b, d);
      }
    }
    function ii(a, b, c) {
      var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (zi(a)) Ai(b, e);
      else {
        var f = a.alternate;
        if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
          var g = b.lastRenderedState, h = f(g, c);
          e.hasEagerState = true;
          e.eagerState = h;
          if (He(h, g)) {
            var k = b.interleaved;
            null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
            b.interleaved = e;
            return;
          }
        } catch (l) {
        } finally {
        }
        c = hh(a, b, e, d);
        null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
      }
    }
    function zi(a) {
      var b = a.alternate;
      return a === M || null !== b && b === M;
    }
    function Ai(a, b) {
      Jh = Ih = true;
      var c = a.pending;
      null === c ? b.next = b : (b.next = c.next, c.next = b);
      a.pending = b;
    }
    function Bi(a, b, c) {
      if (0 !== (c & 4194240)) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
    var Oh = { readContext: eh, useCallback: function(a, b) {
      Th().memoizedState = [a, void 0 === b ? null : b];
      return a;
    }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return ki(
        4194308,
        4,
        pi.bind(null, b, a),
        c
      );
    }, useLayoutEffect: function(a, b) {
      return ki(4194308, 4, a, b);
    }, useInsertionEffect: function(a, b) {
      return ki(4, 2, a, b);
    }, useMemo: function(a, b) {
      var c = Th();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    }, useReducer: function(a, b, c) {
      var d = Th();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
      d.queue = a;
      a = a.dispatch = xi.bind(null, M, a);
      return [d.memoizedState, a];
    }, useRef: function(a) {
      var b = Th();
      a = { current: a };
      return b.memoizedState = a;
    }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
      return Th().memoizedState = a;
    }, useTransition: function() {
      var a = hi(false), b = a[0];
      a = vi.bind(null, a[1]);
      Th().memoizedState = a;
      return [b, a];
    }, useMutableSource: function() {
    }, useSyncExternalStore: function(a, b, c) {
      var d = M, e = Th();
      if (I) {
        if (void 0 === c) throw Error(p(407));
        c = c();
      } else {
        c = b();
        if (null === Q) throw Error(p(349));
        0 !== (Hh & 30) || di(d, b, c);
      }
      e.memoizedState = c;
      var f = { value: c, getSnapshot: b };
      e.queue = f;
      mi(ai.bind(
        null,
        d,
        f,
        a
      ), [a]);
      d.flags |= 2048;
      bi(9, ci.bind(null, d, f, c, b), void 0, null);
      return c;
    }, useId: function() {
      var a = Th(), b = Q.identifierPrefix;
      if (I) {
        var c = sg;
        var d = rg;
        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
        b = ":" + b + "R" + c;
        c = Kh++;
        0 < c && (b += "H" + c.toString(32));
        b += ":";
      } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
      return a.memoizedState = b;
    }, unstable_isNewReconciler: false };
    var Ph = {
      readContext: eh,
      useCallback: si,
      useContext: eh,
      useEffect: $h,
      useImperativeHandle: qi,
      useInsertionEffect: ni,
      useLayoutEffect: oi,
      useMemo: ti,
      useReducer: Wh,
      useRef: ji,
      useState: function() {
        return Wh(Vh);
      },
      useDebugValue: ri,
      useDeferredValue: function(a) {
        var b = Uh();
        return ui(b, N.memoizedState, a);
      },
      useTransition: function() {
        var a = Wh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      },
      useMutableSource: Yh,
      useSyncExternalStore: Zh,
      useId: wi,
      unstable_isNewReconciler: false
    };
    var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
      return Xh(Vh);
    }, useDebugValue: ri, useDeferredValue: function(a) {
      var b = Uh();
      return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
    }, useTransition: function() {
      var a = Xh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
    function Ci(a, b) {
      if (a && a.defaultProps) {
        b = A({}, b);
        a = a.defaultProps;
        for (var c in a) void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Di(a, b, c, d) {
      b = a.memoizedState;
      c = c(d, b);
      c = null === c || void 0 === c ? b : A({}, b, c);
      a.memoizedState = c;
      0 === a.lanes && (a.updateQueue.baseState = c);
    }
    var Ei = { isMounted: function(a) {
      return (a = a._reactInternals) ? Vb(a) === a : false;
    }, enqueueSetState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f = mh(d, e);
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = nh(a, f, e);
      null !== b && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueReplaceState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f = mh(d, e);
      f.tag = 1;
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = nh(a, f, e);
      null !== b && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueForceUpdate: function(a, b) {
      a = a._reactInternals;
      var c = R(), d = yi(a), e = mh(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      b = nh(a, e, d);
      null !== b && (gi(b, a, d, c), oh(b, a, d));
    } };
    function Fi(a, b, c, d, e, f, g) {
      a = a.stateNode;
      return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
    }
    function Gi(a, b, c) {
      var d = false, e = Vf;
      var f = b.contextType;
      "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
      b = new b(c, f);
      a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
      b.updater = Ei;
      a.stateNode = b;
      b._reactInternals = a;
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
      return b;
    }
    function Hi(a, b, c, d) {
      a = b.state;
      "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
      "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
      b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
    }
    function Ii(a, b, c, d) {
      var e = a.stateNode;
      e.props = c;
      e.state = a.memoizedState;
      e.refs = {};
      kh(a);
      var f = b.contextType;
      "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
      e.state = a.memoizedState;
      f = b.getDerivedStateFromProps;
      "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
      "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
      "function" === typeof e.componentDidMount && (a.flags |= 4194308);
    }
    function Ji(a, b) {
      try {
        var c = "", d = b;
        do
          c += Pa(d), d = d.return;
        while (d);
        var e = c;
      } catch (f) {
        e = "\nError generating stack: " + f.message + "\n" + f.stack;
      }
      return { value: a, source: b, stack: e, digest: null };
    }
    function Ki(a, b, c) {
      return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
    }
    function Li(a, b) {
      try {
        console.error(b.value);
      } catch (c) {
        setTimeout(function() {
          throw c;
        });
      }
    }
    var Mi = "function" === typeof WeakMap ? WeakMap : Map;
    function Ni(a, b, c) {
      c = mh(-1, c);
      c.tag = 3;
      c.payload = { element: null };
      var d = b.value;
      c.callback = function() {
        Oi || (Oi = true, Pi = d);
        Li(a, b);
      };
      return c;
    }
    function Qi(a, b, c) {
      c = mh(-1, c);
      c.tag = 3;
      var d = a.type.getDerivedStateFromError;
      if ("function" === typeof d) {
        var e = b.value;
        c.payload = function() {
          return d(e);
        };
        c.callback = function() {
          Li(a, b);
        };
      }
      var f = a.stateNode;
      null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
        Li(a, b);
        "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
        var c2 = b.stack;
        this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
      });
      return c;
    }
    function Si(a, b, c) {
      var d = a.pingCache;
      if (null === d) {
        d = a.pingCache = new Mi();
        var e = /* @__PURE__ */ new Set();
        d.set(b, e);
      } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
      e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
    }
    function Ui(a) {
      do {
        var b;
        if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
        if (b) return a;
        a = a.return;
      } while (null !== a);
      return null;
    }
    function Vi(a, b, c, d, e) {
      if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
      a.flags |= 65536;
      a.lanes = e;
      return a;
    }
    var Wi = ua.ReactCurrentOwner;
    var dh = false;
    function Xi(a, b, c, d) {
      b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
    }
    function Yi(a, b, c, d, e) {
      c = c.render;
      var f = b.ref;
      ch(b, e);
      d = Nh(a, b, c, d, f, e);
      c = Sh();
      if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
      I && c && vg(b);
      b.flags |= 1;
      Xi(a, b, d, e);
      return b.child;
    }
    function $i(a, b, c, d, e) {
      if (null === a) {
        var f = c.type;
        if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
        a = Rg(c.type, null, d, b, b.mode, e);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      f = a.child;
      if (0 === (a.lanes & e)) {
        var g = f.memoizedProps;
        c = c.compare;
        c = null !== c ? c : Ie;
        if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
      }
      b.flags |= 1;
      a = Pg(f, d);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    function bj(a, b, c, d, e) {
      if (null !== a) {
        var f = a.memoizedProps;
        if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
        else return b.lanes = a.lanes, Zi(a, b, e);
      }
      return cj(a, b, c, d, e);
    }
    function dj(a, b, c) {
      var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
      if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
      else {
        if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
        b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
        d = null !== f ? f.baseLanes : c;
        G(ej, fj);
        fj |= d;
      }
      else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
      Xi(a, b, e, c);
      return b.child;
    }
    function gj(a, b) {
      var c = b.ref;
      if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
    }
    function cj(a, b, c, d, e) {
      var f = Zf(c) ? Xf : H.current;
      f = Yf(b, f);
      ch(b, e);
      c = Nh(a, b, c, d, f, e);
      d = Sh();
      if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
      I && d && vg(b);
      b.flags |= 1;
      Xi(a, b, c, e);
      return b.child;
    }
    function hj(a, b, c, d, e) {
      if (Zf(c)) {
        var f = true;
        cg(b);
      } else f = false;
      ch(b, e);
      if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
      else if (null === a) {
        var g = b.stateNode, h = b.memoizedProps;
        g.props = h;
        var k = g.context, l = c.contextType;
        "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
        var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
        q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
        jh = false;
        var r = b.memoizedState;
        g.state = r;
        qh(b, d, g, e);
        k = b.memoizedState;
        h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
      } else {
        g = b.stateNode;
        lh(a, b);
        h = b.memoizedProps;
        l = b.type === b.elementType ? h : Ci(b.type, h);
        g.props = l;
        q = b.pendingProps;
        r = g.context;
        k = c.contextType;
        "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
        var y = c.getDerivedStateFromProps;
        (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
        jh = false;
        r = b.memoizedState;
        g.state = r;
        qh(b, d, g, e);
        var n = b.memoizedState;
        h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
      }
      return jj(a, b, c, d, f, e);
    }
    function jj(a, b, c, d, e, f) {
      gj(a, b);
      var g = 0 !== (b.flags & 128);
      if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
      d = b.stateNode;
      Wi.current = b;
      var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
      b.flags |= 1;
      null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
      b.memoizedState = d.state;
      e && dg(b, c, true);
      return b.child;
    }
    function kj(a) {
      var b = a.stateNode;
      b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
      yh(a, b.containerInfo);
    }
    function lj(a, b, c, d, e) {
      Ig();
      Jg(e);
      b.flags |= 256;
      Xi(a, b, c, d);
      return b.child;
    }
    var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
    function nj(a) {
      return { baseLanes: a, cachePool: null, transitions: null };
    }
    function oj(a, b, c) {
      var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
      (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
      if (h) f = true, b.flags &= -129;
      else if (null === a || null !== a.memoizedState) e |= 1;
      G(L, e & 1);
      if (null === a) {
        Eg(b);
        a = b.memoizedState;
        if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
        g = d.children;
        a = d.fallback;
        return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
      }
      e = a.memoizedState;
      if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
      if (f) {
        f = d.fallback;
        g = b.mode;
        e = a.child;
        h = e.sibling;
        var k = { mode: "hidden", children: d.children };
        0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
        null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
        f.return = b;
        d.return = b;
        d.sibling = f;
        b.child = d;
        d = f;
        f = b.child;
        g = a.child.memoizedState;
        g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
        f.memoizedState = g;
        f.childLanes = a.childLanes & ~c;
        b.memoizedState = mj;
        return d;
      }
      f = a.child;
      a = f.sibling;
      d = Pg(f, { mode: "visible", children: d.children });
      0 === (b.mode & 1) && (d.lanes = c);
      d.return = b;
      d.sibling = null;
      null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
      b.child = d;
      b.memoizedState = null;
      return d;
    }
    function qj(a, b) {
      b = pj({ mode: "visible", children: b }, a.mode, 0, null);
      b.return = a;
      return a.child = b;
    }
    function sj(a, b, c, d) {
      null !== d && Jg(d);
      Ug(b, a.child, null, c);
      a = qj(b, b.pendingProps.children);
      a.flags |= 2;
      b.memoizedState = null;
      return a;
    }
    function rj(a, b, c, d, e, f, g) {
      if (c) {
        if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
        if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
        f = d.fallback;
        e = b.mode;
        d = pj({ mode: "visible", children: d.children }, e, 0, null);
        f = Tg(f, e, g, null);
        f.flags |= 2;
        d.return = b;
        f.return = b;
        d.sibling = f;
        b.child = d;
        0 !== (b.mode & 1) && Ug(b, a.child, null, g);
        b.child.memoizedState = nj(g);
        b.memoizedState = mj;
        return f;
      }
      if (0 === (b.mode & 1)) return sj(a, b, g, null);
      if ("$!" === e.data) {
        d = e.nextSibling && e.nextSibling.dataset;
        if (d) var h = d.dgst;
        d = h;
        f = Error(p(419));
        d = Ki(f, d, void 0);
        return sj(a, b, g, d);
      }
      h = 0 !== (g & a.childLanes);
      if (dh || h) {
        d = Q;
        if (null !== d) {
          switch (g & -g) {
            case 4:
              e = 2;
              break;
            case 16:
              e = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              e = 32;
              break;
            case 536870912:
              e = 268435456;
              break;
            default:
              e = 0;
          }
          e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
          0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
        }
        tj();
        d = Ki(Error(p(421)));
        return sj(a, b, g, d);
      }
      if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
      a = f.treeContext;
      yg = Lf(e.nextSibling);
      xg = b;
      I = true;
      zg = null;
      null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
      b = qj(b, d.children);
      b.flags |= 4096;
      return b;
    }
    function vj(a, b, c) {
      a.lanes |= b;
      var d = a.alternate;
      null !== d && (d.lanes |= b);
      bh(a.return, b, c);
    }
    function wj(a, b, c, d, e) {
      var f = a.memoizedState;
      null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
    }
    function xj(a, b, c) {
      var d = b.pendingProps, e = d.revealOrder, f = d.tail;
      Xi(a, b, d.children, c);
      d = L.current;
      if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
      else {
        if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
          if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
          else if (19 === a.tag) vj(a, c, b);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b) break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b) break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
        d &= 1;
      }
      G(L, d);
      if (0 === (b.mode & 1)) b.memoizedState = null;
      else switch (e) {
        case "forwards":
          c = b.child;
          for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
          c = e;
          null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
          wj(b, false, e, c, f);
          break;
        case "backwards":
          c = null;
          e = b.child;
          for (b.child = null; null !== e; ) {
            a = e.alternate;
            if (null !== a && null === Ch(a)) {
              b.child = e;
              break;
            }
            a = e.sibling;
            e.sibling = c;
            c = e;
            e = a;
          }
          wj(b, true, c, null, f);
          break;
        case "together":
          wj(b, false, null, null, void 0);
          break;
        default:
          b.memoizedState = null;
      }
      return b.child;
    }
    function ij(a, b) {
      0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
    }
    function Zi(a, b, c) {
      null !== a && (b.dependencies = a.dependencies);
      rh |= b.lanes;
      if (0 === (c & b.childLanes)) return null;
      if (null !== a && b.child !== a.child) throw Error(p(153));
      if (null !== b.child) {
        a = b.child;
        c = Pg(a, a.pendingProps);
        b.child = c;
        for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
        c.sibling = null;
      }
      return b.child;
    }
    function yj(a, b, c) {
      switch (b.tag) {
        case 3:
          kj(b);
          Ig();
          break;
        case 5:
          Ah(b);
          break;
        case 1:
          Zf(b.type) && cg(b);
          break;
        case 4:
          yh(b, b.stateNode.containerInfo);
          break;
        case 10:
          var d = b.type._context, e = b.memoizedProps.value;
          G(Wg, d._currentValue);
          d._currentValue = e;
          break;
        case 13:
          d = b.memoizedState;
          if (null !== d) {
            if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
            if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
            G(L, L.current & 1);
            a = Zi(a, b, c);
            return null !== a ? a.sibling : null;
          }
          G(L, L.current & 1);
          break;
        case 19:
          d = 0 !== (c & b.childLanes);
          if (0 !== (a.flags & 128)) {
            if (d) return xj(a, b, c);
            b.flags |= 128;
          }
          e = b.memoizedState;
          null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
          G(L, L.current);
          if (d) break;
          else return null;
        case 22:
        case 23:
          return b.lanes = 0, dj(a, b, c);
      }
      return Zi(a, b, c);
    }
    var zj;
    var Aj;
    var Bj;
    var Cj;
    zj = function(a, b) {
      for (var c = b.child; null !== c; ) {
        if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
        else if (4 !== c.tag && null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b) break;
        for (; null === c.sibling; ) {
          if (null === c.return || c.return === b) return;
          c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    };
    Aj = function() {
    };
    Bj = function(a, b, c, d) {
      var e = a.memoizedProps;
      if (e !== d) {
        a = b.stateNode;
        xh(uh.current);
        var f = null;
        switch (c) {
          case "input":
            e = Ya(a, e);
            d = Ya(a, d);
            f = [];
            break;
          case "select":
            e = A({}, e, { value: void 0 });
            d = A({}, d, { value: void 0 });
            f = [];
            break;
          case "textarea":
            e = gb(a, e);
            d = gb(a, d);
            f = [];
            break;
          default:
            "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
        }
        ub(c, d);
        var g;
        c = null;
        for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
          var h = e[l];
          for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
        } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
        for (l in d) {
          var k = d[l];
          h = null != e ? e[l] : void 0;
          if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
            for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
            for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
          } else c || (f || (f = []), f.push(
            l,
            c
          )), c = k;
          else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
        }
        c && (f = f || []).push("style", c);
        var l = f;
        if (b.updateQueue = l) b.flags |= 4;
      }
    };
    Cj = function(a, b, c, d) {
      c !== d && (b.flags |= 4);
    };
    function Dj(a, b) {
      if (!I) switch (a.tailMode) {
        case "hidden":
          b = a.tail;
          for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
          null === c ? a.tail = null : c.sibling = null;
          break;
        case "collapsed":
          c = a.tail;
          for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
          null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
    }
    function S(a) {
      var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
      if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
      else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
      a.subtreeFlags |= d;
      a.childLanes = c;
      return b;
    }
    function Ej(a, b, c) {
      var d = b.pendingProps;
      wg(b);
      switch (b.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return S(b), null;
        case 1:
          return Zf(b.type) && $f(), S(b), null;
        case 3:
          d = b.stateNode;
          zh();
          E(Wf);
          E(H);
          Eh();
          d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
          if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
          Aj(a, b);
          S(b);
          return null;
        case 5:
          Bh(b);
          var e = xh(wh.current);
          c = b.type;
          if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          else {
            if (!d) {
              if (null === b.stateNode) throw Error(p(166));
              S(b);
              return null;
            }
            a = xh(uh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.type;
              var f = b.memoizedProps;
              d[Of] = b;
              d[Pf] = f;
              a = 0 !== (b.mode & 1);
              switch (c) {
                case "dialog":
                  D("cancel", d);
                  D("close", d);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", d);
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], d);
                  break;
                case "source":
                  D("error", d);
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    d
                  );
                  D("load", d);
                  break;
                case "details":
                  D("toggle", d);
                  break;
                case "input":
                  Za(d, f);
                  D("invalid", d);
                  break;
                case "select":
                  d._wrapperState = { wasMultiple: !!f.multiple };
                  D("invalid", d);
                  break;
                case "textarea":
                  hb(d, f), D("invalid", d);
              }
              ub(c, f);
              e = null;
              for (var g in f) if (f.hasOwnProperty(g)) {
                var h = f[g];
                "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                  d.textContent,
                  h,
                  a
                ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
              }
              switch (c) {
                case "input":
                  Va(d);
                  db(d, f, true);
                  break;
                case "textarea":
                  Va(d);
                  jb(d);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  "function" === typeof f.onClick && (d.onclick = Bf);
              }
              d = e;
              b.updateQueue = d;
              null !== d && (b.flags |= 4);
            } else {
              g = 9 === e.nodeType ? e : e.ownerDocument;
              "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
              "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
              a[Of] = b;
              a[Pf] = d;
              zj(a, b, false, false);
              b.stateNode = a;
              a: {
                g = vb(c, d);
                switch (c) {
                  case "dialog":
                    D("cancel", a);
                    D("close", a);
                    e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", a);
                    e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], a);
                    e = d;
                    break;
                  case "source":
                    D("error", a);
                    e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      a
                    );
                    D("load", a);
                    e = d;
                    break;
                  case "details":
                    D("toggle", a);
                    e = d;
                    break;
                  case "input":
                    Za(a, d);
                    e = Ya(a, d);
                    D("invalid", a);
                    break;
                  case "option":
                    e = d;
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple };
                    e = A({}, d, { value: void 0 });
                    D("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d);
                    e = gb(a, d);
                    D("invalid", a);
                    break;
                  default:
                    e = d;
                }
                ub(c, e);
                h = e;
                for (f in h) if (h.hasOwnProperty(f)) {
                  var k = h[f];
                  "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                }
                switch (c) {
                  case "input":
                    Va(a);
                    db(a, d, false);
                    break;
                  case "textarea":
                    Va(a);
                    jb(a);
                    break;
                  case "option":
                    null != d.value && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple;
                    f = d.value;
                    null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                      a,
                      !!d.multiple,
                      d.defaultValue,
                      true
                    );
                    break;
                  default:
                    "function" === typeof e.onClick && (a.onclick = Bf);
                }
                switch (c) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    d = !!d.autoFocus;
                    break a;
                  case "img":
                    d = true;
                    break a;
                  default:
                    d = false;
                }
              }
              d && (b.flags |= 4);
            }
            null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          }
          S(b);
          return null;
        case 6:
          if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
          else {
            if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
            c = xh(wh.current);
            xh(uh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.memoizedProps;
              d[Of] = b;
              if (f = d.nodeValue !== c) {
                if (a = xg, null !== a) switch (a.tag) {
                  case 3:
                    Af(d.nodeValue, c, 0 !== (a.mode & 1));
                    break;
                  case 5:
                    true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                }
              }
              f && (b.flags |= 4);
            } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
          }
          S(b);
          return null;
        case 13:
          E(L);
          d = b.memoizedState;
          if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
            if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
            else if (f = Gg(b), null !== d && null !== d.dehydrated) {
              if (null === a) {
                if (!f) throw Error(p(318));
                f = b.memoizedState;
                f = null !== f ? f.dehydrated : null;
                if (!f) throw Error(p(317));
                f[Of] = b;
              } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
              S(b);
              f = false;
            } else null !== zg && (Fj(zg), zg = null), f = true;
            if (!f) return b.flags & 65536 ? b : null;
          }
          if (0 !== (b.flags & 128)) return b.lanes = c, b;
          d = null !== d;
          d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
          null !== b.updateQueue && (b.flags |= 4);
          S(b);
          return null;
        case 4:
          return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
        case 10:
          return ah(b.type._context), S(b), null;
        case 17:
          return Zf(b.type) && $f(), S(b), null;
        case 19:
          E(L);
          f = b.memoizedState;
          if (null === f) return S(b), null;
          d = 0 !== (b.flags & 128);
          g = f.rendering;
          if (null === g) if (d) Dj(f, false);
          else {
            if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
              g = Ch(a);
              if (null !== g) {
                b.flags |= 128;
                Dj(f, false);
                d = g.updateQueue;
                null !== d && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c;
                for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                G(L, L.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
            null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
          }
          else {
            if (!d) if (a = Ch(g), null !== a) {
              if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
            } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
          }
          if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
          S(b);
          return null;
        case 22:
        case 23:
          return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(p(156, b.tag));
    }
    function Ij(a, b) {
      wg(b);
      switch (b.tag) {
        case 1:
          return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 3:
          return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
        case 5:
          return Bh(b), null;
        case 13:
          E(L);
          a = b.memoizedState;
          if (null !== a && null !== a.dehydrated) {
            if (null === b.alternate) throw Error(p(340));
            Ig();
          }
          a = b.flags;
          return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 19:
          return E(L), null;
        case 4:
          return zh(), null;
        case 10:
          return ah(b.type._context), null;
        case 22:
        case 23:
          return Hj(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Jj = false;
    var U = false;
    var Kj = "function" === typeof WeakSet ? WeakSet : Set;
    var V = null;
    function Lj(a, b) {
      var c = a.ref;
      if (null !== c) if ("function" === typeof c) try {
        c(null);
      } catch (d) {
        W(a, b, d);
      }
      else c.current = null;
    }
    function Mj(a, b, c) {
      try {
        c();
      } catch (d) {
        W(a, b, d);
      }
    }
    var Nj = false;
    function Oj(a, b) {
      Cf = dd;
      a = Me();
      if (Ne(a)) {
        if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
        else a: {
          c = (c = a.ownerDocument) && c.defaultView || window;
          var d = c.getSelection && c.getSelection();
          if (d && 0 !== d.rangeCount) {
            c = d.anchorNode;
            var e = d.anchorOffset, f = d.focusNode;
            d = d.focusOffset;
            try {
              c.nodeType, f.nodeType;
            } catch (F) {
              c = null;
              break a;
            }
            var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
            b: for (; ; ) {
              for (var y; ; ) {
                q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                3 === q.nodeType && (g += q.nodeValue.length);
                if (null === (y = q.firstChild)) break;
                r = q;
                q = y;
              }
              for (; ; ) {
                if (q === a) break b;
                r === c && ++l === e && (h = g);
                r === f && ++m === d && (k = g);
                if (null !== (y = q.nextSibling)) break;
                q = r;
                r = q.parentNode;
              }
              q = y;
            }
            c = -1 === h || -1 === k ? null : { start: h, end: k };
          } else c = null;
        }
        c = c || { start: 0, end: 0 };
      } else c = null;
      Df = { focusedElem: a, selectionRange: c };
      dd = false;
      for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
      else for (; null !== V; ) {
        b = V;
        try {
          var n = b.alternate;
          if (0 !== (b.flags & 1024)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (null !== n) {
                var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                x.__reactInternalSnapshotBeforeUpdate = w;
              }
              break;
            case 3:
              var u = b.stateNode.containerInfo;
              1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(p(163));
          }
        } catch (F) {
          W(b, b.return, F);
        }
        a = b.sibling;
        if (null !== a) {
          a.return = b.return;
          V = a;
          break;
        }
        V = b.return;
      }
      n = Nj;
      Nj = false;
      return n;
    }
    function Pj(a, b, c) {
      var d = b.updateQueue;
      d = null !== d ? d.lastEffect : null;
      if (null !== d) {
        var e = d = d.next;
        do {
          if ((e.tag & a) === a) {
            var f = e.destroy;
            e.destroy = void 0;
            void 0 !== f && Mj(b, c, f);
          }
          e = e.next;
        } while (e !== d);
      }
    }
    function Qj(a, b) {
      b = b.updateQueue;
      b = null !== b ? b.lastEffect : null;
      if (null !== b) {
        var c = b = b.next;
        do {
          if ((c.tag & a) === a) {
            var d = c.create;
            c.destroy = d();
          }
          c = c.next;
        } while (c !== b);
      }
    }
    function Rj(a) {
      var b = a.ref;
      if (null !== b) {
        var c = a.stateNode;
        switch (a.tag) {
          case 5:
            a = c;
            break;
          default:
            a = c;
        }
        "function" === typeof b ? b(a) : b.current = a;
      }
    }
    function Sj(a) {
      var b = a.alternate;
      null !== b && (a.alternate = null, Sj(b));
      a.child = null;
      a.deletions = null;
      a.sibling = null;
      5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
      a.stateNode = null;
      a.return = null;
      a.dependencies = null;
      a.memoizedProps = null;
      a.memoizedState = null;
      a.pendingProps = null;
      a.stateNode = null;
      a.updateQueue = null;
    }
    function Tj(a) {
      return 5 === a.tag || 3 === a.tag || 4 === a.tag;
    }
    function Uj(a) {
      a: for (; ; ) {
        for (; null === a.sibling; ) {
          if (null === a.return || Tj(a.return)) return null;
          a = a.return;
        }
        a.sibling.return = a.return;
        for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
          if (a.flags & 2) continue a;
          if (null === a.child || 4 === a.tag) continue a;
          else a.child.return = a, a = a.child;
        }
        if (!(a.flags & 2)) return a.stateNode;
      }
    }
    function Vj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
      else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
    }
    function Wj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
      else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
    }
    var X = null;
    var Xj = false;
    function Yj(a, b, c) {
      for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
    }
    function Zj(a, b, c) {
      if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
        lc.onCommitFiberUnmount(kc, c);
      } catch (h) {
      }
      switch (c.tag) {
        case 5:
          U || Lj(c, b);
        case 6:
          var d = X, e = Xj;
          X = null;
          Yj(a, b, c);
          X = d;
          Xj = e;
          null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
          break;
        case 18:
          null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
          break;
        case 4:
          d = X;
          e = Xj;
          X = c.stateNode.containerInfo;
          Xj = true;
          Yj(a, b, c);
          X = d;
          Xj = e;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
            e = d = d.next;
            do {
              var f = e, g = f.destroy;
              f = f.tag;
              void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
              e = e.next;
            } while (e !== d);
          }
          Yj(a, b, c);
          break;
        case 1:
          if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
            d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
          } catch (h) {
            W(c, b, h);
          }
          Yj(a, b, c);
          break;
        case 21:
          Yj(a, b, c);
          break;
        case 22:
          c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
          break;
        default:
          Yj(a, b, c);
      }
    }
    function ak(a) {
      var b = a.updateQueue;
      if (null !== b) {
        a.updateQueue = null;
        var c = a.stateNode;
        null === c && (c = a.stateNode = new Kj());
        b.forEach(function(b2) {
          var d = bk.bind(null, a, b2);
          c.has(b2) || (c.add(b2), b2.then(d, d));
        });
      }
    }
    function ck(a, b) {
      var c = b.deletions;
      if (null !== c) for (var d = 0; d < c.length; d++) {
        var e = c[d];
        try {
          var f = a, g = b, h = g;
          a: for (; null !== h; ) {
            switch (h.tag) {
              case 5:
                X = h.stateNode;
                Xj = false;
                break a;
              case 3:
                X = h.stateNode.containerInfo;
                Xj = true;
                break a;
              case 4:
                X = h.stateNode.containerInfo;
                Xj = true;
                break a;
            }
            h = h.return;
          }
          if (null === X) throw Error(p(160));
          Zj(f, g, e);
          X = null;
          Xj = false;
          var k = e.alternate;
          null !== k && (k.return = null);
          e.return = null;
        } catch (l) {
          W(e, b, l);
        }
      }
      if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
    }
    function dk(a, b) {
      var c = a.alternate, d = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ck(b, a);
          ek(a);
          if (d & 4) {
            try {
              Pj(3, a, a.return), Qj(3, a);
            } catch (t) {
              W(a, a.return, t);
            }
            try {
              Pj(5, a, a.return);
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 1:
          ck(b, a);
          ek(a);
          d & 512 && null !== c && Lj(c, c.return);
          break;
        case 5:
          ck(b, a);
          ek(a);
          d & 512 && null !== c && Lj(c, c.return);
          if (a.flags & 32) {
            var e = a.stateNode;
            try {
              ob(e, "");
            } catch (t) {
              W(a, a.return, t);
            }
          }
          if (d & 4 && (e = a.stateNode, null != e)) {
            var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
            a.updateQueue = null;
            if (null !== k) try {
              "input" === h && "radio" === f.type && null != f.name && ab(e, f);
              vb(h, g);
              var l = vb(h, f);
              for (g = 0; g < k.length; g += 2) {
                var m = k[g], q = k[g + 1];
                "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
              }
              switch (h) {
                case "input":
                  bb(e, f);
                  break;
                case "textarea":
                  ib(e, f);
                  break;
                case "select":
                  var r = e._wrapperState.wasMultiple;
                  e._wrapperState.wasMultiple = !!f.multiple;
                  var y = f.value;
                  null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                    e,
                    !!f.multiple,
                    f.defaultValue,
                    true
                  ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
              }
              e[Pf] = f;
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 6:
          ck(b, a);
          ek(a);
          if (d & 4) {
            if (null === a.stateNode) throw Error(p(162));
            e = a.stateNode;
            f = a.memoizedProps;
            try {
              e.nodeValue = f;
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 3:
          ck(b, a);
          ek(a);
          if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
            bd(b.containerInfo);
          } catch (t) {
            W(a, a.return, t);
          }
          break;
        case 4:
          ck(b, a);
          ek(a);
          break;
        case 13:
          ck(b, a);
          ek(a);
          e = a.child;
          e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
          d & 4 && ak(a);
          break;
        case 22:
          m = null !== c && null !== c.memoizedState;
          a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
          ek(a);
          if (d & 8192) {
            l = null !== a.memoizedState;
            if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
              for (q = V = m; null !== V; ) {
                r = V;
                y = r.child;
                switch (r.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Pj(4, r, r.return);
                    break;
                  case 1:
                    Lj(r, r.return);
                    var n = r.stateNode;
                    if ("function" === typeof n.componentWillUnmount) {
                      d = r;
                      c = r.return;
                      try {
                        b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                      } catch (t) {
                        W(d, c, t);
                      }
                    }
                    break;
                  case 5:
                    Lj(r, r.return);
                    break;
                  case 22:
                    if (null !== r.memoizedState) {
                      gk(q);
                      continue;
                    }
                }
                null !== y ? (y.return = r, V = y) : gk(q);
              }
              m = m.sibling;
            }
            a: for (m = null, q = a; ; ) {
              if (5 === q.tag) {
                if (null === m) {
                  m = q;
                  try {
                    e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                  } catch (t) {
                    W(a, a.return, t);
                  }
                }
              } else if (6 === q.tag) {
                if (null === m) try {
                  q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                } catch (t) {
                  W(a, a.return, t);
                }
              } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                q.child.return = q;
                q = q.child;
                continue;
              }
              if (q === a) break a;
              for (; null === q.sibling; ) {
                if (null === q.return || q.return === a) break a;
                m === q && (m = null);
                q = q.return;
              }
              m === q && (m = null);
              q.sibling.return = q.return;
              q = q.sibling;
            }
          }
          break;
        case 19:
          ck(b, a);
          ek(a);
          d & 4 && ak(a);
          break;
        case 21:
          break;
        default:
          ck(
            b,
            a
          ), ek(a);
      }
    }
    function ek(a) {
      var b = a.flags;
      if (b & 2) {
        try {
          a: {
            for (var c = a.return; null !== c; ) {
              if (Tj(c)) {
                var d = c;
                break a;
              }
              c = c.return;
            }
            throw Error(p(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (ob(e, ""), d.flags &= -33);
              var f = Uj(a);
              Wj(a, f, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo, h = Uj(a);
              Vj(a, h, g);
              break;
            default:
              throw Error(p(161));
          }
        } catch (k) {
          W(a, a.return, k);
        }
        a.flags &= -3;
      }
      b & 4096 && (a.flags &= -4097);
    }
    function hk(a, b, c) {
      V = a;
      ik(a, b, c);
    }
    function ik(a, b, c) {
      for (var d = 0 !== (a.mode & 1); null !== V; ) {
        var e = V, f = e.child;
        if (22 === e.tag && d) {
          var g = null !== e.memoizedState || Jj;
          if (!g) {
            var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
            h = Jj;
            var l = U;
            Jj = g;
            if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
            for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
            V = e;
            Jj = h;
            U = l;
          }
          kk(a, b, c);
        } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
      }
    }
    function kk(a) {
      for (; null !== V; ) {
        var b = V;
        if (0 !== (b.flags & 8772)) {
          var c = b.alternate;
          try {
            if (0 !== (b.flags & 8772)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                U || Qj(5, b);
                break;
              case 1:
                var d = b.stateNode;
                if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                else {
                  var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                  d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
                var f = b.updateQueue;
                null !== f && sh(b, f, d);
                break;
              case 3:
                var g = b.updateQueue;
                if (null !== g) {
                  c = null;
                  if (null !== b.child) switch (b.child.tag) {
                    case 5:
                      c = b.child.stateNode;
                      break;
                    case 1:
                      c = b.child.stateNode;
                  }
                  sh(b, g, c);
                }
                break;
              case 5:
                var h = b.stateNode;
                if (null === c && b.flags & 4) {
                  c = h;
                  var k = b.memoizedProps;
                  switch (b.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      k.autoFocus && c.focus();
                      break;
                    case "img":
                      k.src && (c.src = k.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (null === b.memoizedState) {
                  var l = b.alternate;
                  if (null !== l) {
                    var m = l.memoizedState;
                    if (null !== m) {
                      var q = m.dehydrated;
                      null !== q && bd(q);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(p(163));
            }
            U || b.flags & 512 && Rj(b);
          } catch (r) {
            W(b, b.return, r);
          }
        }
        if (b === a) {
          V = null;
          break;
        }
        c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function gk(a) {
      for (; null !== V; ) {
        var b = V;
        if (b === a) {
          V = null;
          break;
        }
        var c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function jk(a) {
      for (; null !== V; ) {
        var b = V;
        try {
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              var c = b.return;
              try {
                Qj(4, b);
              } catch (k) {
                W(b, c, k);
              }
              break;
            case 1:
              var d = b.stateNode;
              if ("function" === typeof d.componentDidMount) {
                var e = b.return;
                try {
                  d.componentDidMount();
                } catch (k) {
                  W(b, e, k);
                }
              }
              var f = b.return;
              try {
                Rj(b);
              } catch (k) {
                W(b, f, k);
              }
              break;
            case 5:
              var g = b.return;
              try {
                Rj(b);
              } catch (k) {
                W(b, g, k);
              }
          }
        } catch (k) {
          W(b, b.return, k);
        }
        if (b === a) {
          V = null;
          break;
        }
        var h = b.sibling;
        if (null !== h) {
          h.return = b.return;
          V = h;
          break;
        }
        V = b.return;
      }
    }
    var lk = Math.ceil;
    var mk = ua.ReactCurrentDispatcher;
    var nk = ua.ReactCurrentOwner;
    var ok = ua.ReactCurrentBatchConfig;
    var K = 0;
    var Q = null;
    var Y = null;
    var Z = 0;
    var fj = 0;
    var ej = Uf(0);
    var T = 0;
    var pk = null;
    var rh = 0;
    var qk = 0;
    var rk = 0;
    var sk = null;
    var tk = null;
    var fk = 0;
    var Gj = Infinity;
    var uk = null;
    var Oi = false;
    var Pi = null;
    var Ri = null;
    var vk = false;
    var wk = null;
    var xk = 0;
    var yk = 0;
    var zk = null;
    var Ak = -1;
    var Bk = 0;
    function R() {
      return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
    }
    function yi(a) {
      if (0 === (a.mode & 1)) return 1;
      if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
      if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
      a = C;
      if (0 !== a) return a;
      a = window.event;
      a = void 0 === a ? 16 : jd(a.type);
      return a;
    }
    function gi(a, b, c, d) {
      if (50 < yk) throw yk = 0, zk = null, Error(p(185));
      Ac(a, c, d);
      if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
    }
    function Dk(a, b) {
      var c = a.callbackNode;
      wc(a, b);
      var d = uc(a, a === Q ? Z : 0);
      if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
      else if (b = d & -d, a.callbackPriority !== b) {
        null != c && bc(c);
        if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
          0 === (K & 6) && jg();
        }), c = null;
        else {
          switch (Dc(d)) {
            case 1:
              c = fc;
              break;
            case 4:
              c = gc;
              break;
            case 16:
              c = hc;
              break;
            case 536870912:
              c = jc;
              break;
            default:
              c = hc;
          }
          c = Fk(c, Gk.bind(null, a));
        }
        a.callbackPriority = b;
        a.callbackNode = c;
      }
    }
    function Gk(a, b) {
      Ak = -1;
      Bk = 0;
      if (0 !== (K & 6)) throw Error(p(327));
      var c = a.callbackNode;
      if (Hk() && a.callbackNode !== c) return null;
      var d = uc(a, a === Q ? Z : 0);
      if (0 === d) return null;
      if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
      else {
        b = d;
        var e = K;
        K |= 2;
        var f = Jk();
        if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
        do
          try {
            Lk();
            break;
          } catch (h) {
            Mk(a, h);
          }
        while (1);
        $g();
        mk.current = f;
        K = e;
        null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
      }
      if (0 !== b) {
        2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
        if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        if (6 === b) Ck(a, d);
        else {
          e = a.current.alternate;
          if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          a.finishedWork = e;
          a.finishedLanes = d;
          switch (b) {
            case 0:
            case 1:
              throw Error(p(345));
            case 2:
              Pk(a, tk, uk);
              break;
            case 3:
              Ck(a, d);
              if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                if (0 !== uc(a, 0)) break;
                e = a.suspendedLanes;
                if ((e & d) !== d) {
                  R();
                  a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 4:
              Ck(a, d);
              if ((d & 4194240) === d) break;
              b = a.eventTimes;
              for (e = -1; 0 < d; ) {
                var g = 31 - oc(d);
                f = 1 << g;
                g = b[g];
                g > e && (e = g);
                d &= ~f;
              }
              d = e;
              d = B() - d;
              d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
              if (10 < d) {
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 5:
              Pk(a, tk, uk);
              break;
            default:
              throw Error(p(329));
          }
        }
      }
      Dk(a, B());
      return a.callbackNode === c ? Gk.bind(null, a) : null;
    }
    function Nk(a, b) {
      var c = sk;
      a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
      a = Ik(a, b);
      2 !== a && (b = tk, tk = c, null !== b && Fj(b));
      return a;
    }
    function Fj(a) {
      null === tk ? tk = a : tk.push.apply(tk, a);
    }
    function Ok(a) {
      for (var b = a; ; ) {
        if (b.flags & 16384) {
          var c = b.updateQueue;
          if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
            var e = c[d], f = e.getSnapshot;
            e = e.value;
            try {
              if (!He(f(), e)) return false;
            } catch (g) {
              return false;
            }
          }
        }
        c = b.child;
        if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
        else {
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return true;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
      }
      return true;
    }
    function Ck(a, b) {
      b &= ~rk;
      b &= ~qk;
      a.suspendedLanes |= b;
      a.pingedLanes &= ~b;
      for (a = a.expirationTimes; 0 < b; ) {
        var c = 31 - oc(b), d = 1 << c;
        a[c] = -1;
        b &= ~d;
      }
    }
    function Ek(a) {
      if (0 !== (K & 6)) throw Error(p(327));
      Hk();
      var b = uc(a, 0);
      if (0 === (b & 1)) return Dk(a, B()), null;
      var c = Ik(a, b);
      if (0 !== a.tag && 2 === c) {
        var d = xc(a);
        0 !== d && (b = d, c = Nk(a, d));
      }
      if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
      if (6 === c) throw Error(p(345));
      a.finishedWork = a.current.alternate;
      a.finishedLanes = b;
      Pk(a, tk, uk);
      Dk(a, B());
      return null;
    }
    function Qk(a, b) {
      var c = K;
      K |= 1;
      try {
        return a(b);
      } finally {
        K = c, 0 === K && (Gj = B() + 500, fg && jg());
      }
    }
    function Rk(a) {
      null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
      var b = K;
      K |= 1;
      var c = ok.transition, d = C;
      try {
        if (ok.transition = null, C = 1, a) return a();
      } finally {
        C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
      }
    }
    function Hj() {
      fj = ej.current;
      E(ej);
    }
    function Kk(a, b) {
      a.finishedWork = null;
      a.finishedLanes = 0;
      var c = a.timeoutHandle;
      -1 !== c && (a.timeoutHandle = -1, Gf(c));
      if (null !== Y) for (c = Y.return; null !== c; ) {
        var d = c;
        wg(d);
        switch (d.tag) {
          case 1:
            d = d.type.childContextTypes;
            null !== d && void 0 !== d && $f();
            break;
          case 3:
            zh();
            E(Wf);
            E(H);
            Eh();
            break;
          case 5:
            Bh(d);
            break;
          case 4:
            zh();
            break;
          case 13:
            E(L);
            break;
          case 19:
            E(L);
            break;
          case 10:
            ah(d.type._context);
            break;
          case 22:
          case 23:
            Hj();
        }
        c = c.return;
      }
      Q = a;
      Y = a = Pg(a.current, null);
      Z = fj = b;
      T = 0;
      pk = null;
      rk = qk = rh = 0;
      tk = sk = null;
      if (null !== fh) {
        for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
          c.interleaved = null;
          var e = d.next, f = c.pending;
          if (null !== f) {
            var g = f.next;
            f.next = e;
            d.next = g;
          }
          c.pending = d;
        }
        fh = null;
      }
      return a;
    }
    function Mk(a, b) {
      do {
        var c = Y;
        try {
          $g();
          Fh.current = Rh;
          if (Ih) {
            for (var d = M.memoizedState; null !== d; ) {
              var e = d.queue;
              null !== e && (e.pending = null);
              d = d.next;
            }
            Ih = false;
          }
          Hh = 0;
          O = N = M = null;
          Jh = false;
          Kh = 0;
          nk.current = null;
          if (null === c || null === c.return) {
            T = 1;
            pk = b;
            Y = null;
            break;
          }
          a: {
            var f = a, g = c.return, h = c, k = b;
            b = Z;
            h.flags |= 32768;
            if (null !== k && "object" === typeof k && "function" === typeof k.then) {
              var l = k, m = h, q = m.tag;
              if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                var r = m.alternate;
                r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
              }
              var y = Ui(g);
              if (null !== y) {
                y.flags &= -257;
                Vi(y, g, h, f, b);
                y.mode & 1 && Si(f, l, b);
                b = y;
                k = l;
                var n = b.updateQueue;
                if (null === n) {
                  var t = /* @__PURE__ */ new Set();
                  t.add(k);
                  b.updateQueue = t;
                } else n.add(k);
                break a;
              } else {
                if (0 === (b & 1)) {
                  Si(f, l, b);
                  tj();
                  break a;
                }
                k = Error(p(426));
              }
            } else if (I && h.mode & 1) {
              var J = Ui(g);
              if (null !== J) {
                0 === (J.flags & 65536) && (J.flags |= 256);
                Vi(J, g, h, f, b);
                Jg(Ji(k, h));
                break a;
              }
            }
            f = k = Ji(k, h);
            4 !== T && (T = 2);
            null === sk ? sk = [f] : sk.push(f);
            f = g;
            do {
              switch (f.tag) {
                case 3:
                  f.flags |= 65536;
                  b &= -b;
                  f.lanes |= b;
                  var x = Ni(f, k, b);
                  ph(f, x);
                  break a;
                case 1:
                  h = k;
                  var w = f.type, u = f.stateNode;
                  if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var F = Qi(f, h, b);
                    ph(f, F);
                    break a;
                  }
              }
              f = f.return;
            } while (null !== f);
          }
          Sk(c);
        } catch (na) {
          b = na;
          Y === c && null !== c && (Y = c = c.return);
          continue;
        }
        break;
      } while (1);
    }
    function Jk() {
      var a = mk.current;
      mk.current = Rh;
      return null === a ? Rh : a;
    }
    function tj() {
      if (0 === T || 3 === T || 2 === T) T = 4;
      null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
    }
    function Ik(a, b) {
      var c = K;
      K |= 2;
      var d = Jk();
      if (Q !== a || Z !== b) uk = null, Kk(a, b);
      do
        try {
          Tk();
          break;
        } catch (e) {
          Mk(a, e);
        }
      while (1);
      $g();
      K = c;
      mk.current = d;
      if (null !== Y) throw Error(p(261));
      Q = null;
      Z = 0;
      return T;
    }
    function Tk() {
      for (; null !== Y; ) Uk(Y);
    }
    function Lk() {
      for (; null !== Y && !cc(); ) Uk(Y);
    }
    function Uk(a) {
      var b = Vk(a.alternate, a, fj);
      a.memoizedProps = a.pendingProps;
      null === b ? Sk(a) : Y = b;
      nk.current = null;
    }
    function Sk(a) {
      var b = a;
      do {
        var c = b.alternate;
        a = b.return;
        if (0 === (b.flags & 32768)) {
          if (c = Ej(c, b, fj), null !== c) {
            Y = c;
            return;
          }
        } else {
          c = Ij(c, b);
          if (null !== c) {
            c.flags &= 32767;
            Y = c;
            return;
          }
          if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
          else {
            T = 6;
            Y = null;
            return;
          }
        }
        b = b.sibling;
        if (null !== b) {
          Y = b;
          return;
        }
        Y = b = a;
      } while (null !== b);
      0 === T && (T = 5);
    }
    function Pk(a, b, c) {
      var d = C, e = ok.transition;
      try {
        ok.transition = null, C = 1, Wk(a, b, c, d);
      } finally {
        ok.transition = e, C = d;
      }
      return null;
    }
    function Wk(a, b, c, d) {
      do
        Hk();
      while (null !== wk);
      if (0 !== (K & 6)) throw Error(p(327));
      c = a.finishedWork;
      var e = a.finishedLanes;
      if (null === c) return null;
      a.finishedWork = null;
      a.finishedLanes = 0;
      if (c === a.current) throw Error(p(177));
      a.callbackNode = null;
      a.callbackPriority = 0;
      var f = c.lanes | c.childLanes;
      Bc(a, f);
      a === Q && (Y = Q = null, Z = 0);
      0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
        Hk();
        return null;
      }));
      f = 0 !== (c.flags & 15990);
      if (0 !== (c.subtreeFlags & 15990) || f) {
        f = ok.transition;
        ok.transition = null;
        var g = C;
        C = 1;
        var h = K;
        K |= 4;
        nk.current = null;
        Oj(a, c);
        dk(c, a);
        Oe(Df);
        dd = !!Cf;
        Df = Cf = null;
        a.current = c;
        hk(c, a, e);
        dc();
        K = h;
        C = g;
        ok.transition = f;
      } else a.current = c;
      vk && (vk = false, wk = a, xk = e);
      f = a.pendingLanes;
      0 === f && (Ri = null);
      mc(c.stateNode, d);
      Dk(a, B());
      if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
      if (Oi) throw Oi = false, a = Pi, Pi = null, a;
      0 !== (xk & 1) && 0 !== a.tag && Hk();
      f = a.pendingLanes;
      0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
      jg();
      return null;
    }
    function Hk() {
      if (null !== wk) {
        var a = Dc(xk), b = ok.transition, c = C;
        try {
          ok.transition = null;
          C = 16 > a ? 16 : a;
          if (null === wk) var d = false;
          else {
            a = wk;
            wk = null;
            xk = 0;
            if (0 !== (K & 6)) throw Error(p(331));
            var e = K;
            K |= 4;
            for (V = a.current; null !== V; ) {
              var f = V, g = f.child;
              if (0 !== (V.flags & 16)) {
                var h = f.deletions;
                if (null !== h) {
                  for (var k = 0; k < h.length; k++) {
                    var l = h[k];
                    for (V = l; null !== V; ) {
                      var m = V;
                      switch (m.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Pj(8, m, f);
                      }
                      var q = m.child;
                      if (null !== q) q.return = m, V = q;
                      else for (; null !== V; ) {
                        m = V;
                        var r = m.sibling, y = m.return;
                        Sj(m);
                        if (m === l) {
                          V = null;
                          break;
                        }
                        if (null !== r) {
                          r.return = y;
                          V = r;
                          break;
                        }
                        V = y;
                      }
                    }
                  }
                  var n = f.alternate;
                  if (null !== n) {
                    var t = n.child;
                    if (null !== t) {
                      n.child = null;
                      do {
                        var J = t.sibling;
                        t.sibling = null;
                        t = J;
                      } while (null !== t);
                    }
                  }
                  V = f;
                }
              }
              if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
              else b: for (; null !== V; ) {
                f = V;
                if (0 !== (f.flags & 2048)) switch (f.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Pj(9, f, f.return);
                }
                var x = f.sibling;
                if (null !== x) {
                  x.return = f.return;
                  V = x;
                  break b;
                }
                V = f.return;
              }
            }
            var w = a.current;
            for (V = w; null !== V; ) {
              g = V;
              var u = g.child;
              if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
              else b: for (g = w; null !== V; ) {
                h = V;
                if (0 !== (h.flags & 2048)) try {
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, h);
                  }
                } catch (na) {
                  W(h, h.return, na);
                }
                if (h === g) {
                  V = null;
                  break b;
                }
                var F = h.sibling;
                if (null !== F) {
                  F.return = h.return;
                  V = F;
                  break b;
                }
                V = h.return;
              }
            }
            K = e;
            jg();
            if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
              lc.onPostCommitFiberRoot(kc, a);
            } catch (na) {
            }
            d = true;
          }
          return d;
        } finally {
          C = c, ok.transition = b;
        }
      }
      return false;
    }
    function Xk(a, b, c) {
      b = Ji(c, b);
      b = Ni(a, b, 1);
      a = nh(a, b, 1);
      b = R();
      null !== a && (Ac(a, 1, b), Dk(a, b));
    }
    function W(a, b, c) {
      if (3 === a.tag) Xk(a, a, c);
      else for (; null !== b; ) {
        if (3 === b.tag) {
          Xk(b, a, c);
          break;
        } else if (1 === b.tag) {
          var d = b.stateNode;
          if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
            a = Ji(c, a);
            a = Qi(b, a, 1);
            b = nh(b, a, 1);
            a = R();
            null !== b && (Ac(b, 1, a), Dk(b, a));
            break;
          }
        }
        b = b.return;
      }
    }
    function Ti(a, b, c) {
      var d = a.pingCache;
      null !== d && d.delete(b);
      b = R();
      a.pingedLanes |= a.suspendedLanes & c;
      Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
      Dk(a, b);
    }
    function Yk(a, b) {
      0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
      var c = R();
      a = ih(a, b);
      null !== a && (Ac(a, b, c), Dk(a, c));
    }
    function uj(a) {
      var b = a.memoizedState, c = 0;
      null !== b && (c = b.retryLane);
      Yk(a, c);
    }
    function bk(a, b) {
      var c = 0;
      switch (a.tag) {
        case 13:
          var d = a.stateNode;
          var e = a.memoizedState;
          null !== e && (c = e.retryLane);
          break;
        case 19:
          d = a.stateNode;
          break;
        default:
          throw Error(p(314));
      }
      null !== d && d.delete(b);
      Yk(a, c);
    }
    var Vk;
    Vk = function(a, b, c) {
      if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
      else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
        dh = 0 !== (a.flags & 131072) ? true : false;
      }
      else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
      b.lanes = 0;
      switch (b.tag) {
        case 2:
          var d = b.type;
          ij(a, b);
          a = b.pendingProps;
          var e = Yf(b, H.current);
          ch(b, c);
          e = Nh(null, b, d, a, e, c);
          var f = Sh();
          b.flags |= 1;
          "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
          return b;
        case 16:
          d = b.elementType;
          a: {
            ij(a, b);
            a = b.pendingProps;
            e = d._init;
            d = e(d._payload);
            b.type = d;
            e = b.tag = Zk(d);
            a = Ci(d, a);
            switch (e) {
              case 0:
                b = cj(null, b, d, a, c);
                break a;
              case 1:
                b = hj(null, b, d, a, c);
                break a;
              case 11:
                b = Yi(null, b, d, a, c);
                break a;
              case 14:
                b = $i(null, b, d, Ci(d.type, a), c);
                break a;
            }
            throw Error(p(
              306,
              d,
              ""
            ));
          }
          return b;
        case 0:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
        case 1:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
        case 3:
          a: {
            kj(b);
            if (null === a) throw Error(p(387));
            d = b.pendingProps;
            f = b.memoizedState;
            e = f.element;
            lh(a, b);
            qh(b, d, null, c);
            var g = b.memoizedState;
            d = g.element;
            if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
              e = Ji(Error(p(423)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Ji(Error(p(424)), b);
              b = lj(a, b, d, c, e);
              break a;
            } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
            else {
              Ig();
              if (d === e) {
                b = Zi(a, b, c);
                break a;
              }
              Xi(a, b, d, c);
            }
            b = b.child;
          }
          return b;
        case 5:
          return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
        case 6:
          return null === a && Eg(b), null;
        case 13:
          return oj(a, b, c);
        case 4:
          return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
        case 11:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
        case 7:
          return Xi(a, b, b.pendingProps, c), b.child;
        case 8:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 12:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 10:
          a: {
            d = b.type._context;
            e = b.pendingProps;
            f = b.memoizedProps;
            g = e.value;
            G(Wg, d._currentValue);
            d._currentValue = g;
            if (null !== f) if (He(f.value, g)) {
              if (f.children === e.children && !Wf.current) {
                b = Zi(a, b, c);
                break a;
              }
            } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
              var h = f.dependencies;
              if (null !== h) {
                g = f.child;
                for (var k = h.firstContext; null !== k; ) {
                  if (k.context === d) {
                    if (1 === f.tag) {
                      k = mh(-1, c & -c);
                      k.tag = 2;
                      var l = f.updateQueue;
                      if (null !== l) {
                        l = l.shared;
                        var m = l.pending;
                        null === m ? k.next = k : (k.next = m.next, m.next = k);
                        l.pending = k;
                      }
                    }
                    f.lanes |= c;
                    k = f.alternate;
                    null !== k && (k.lanes |= c);
                    bh(
                      f.return,
                      c,
                      b
                    );
                    h.lanes |= c;
                    break;
                  }
                  k = k.next;
                }
              } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
              else if (18 === f.tag) {
                g = f.return;
                if (null === g) throw Error(p(341));
                g.lanes |= c;
                h = g.alternate;
                null !== h && (h.lanes |= c);
                bh(g, c, b);
                g = f.sibling;
              } else g = f.child;
              if (null !== g) g.return = f;
              else for (g = f; null !== g; ) {
                if (g === b) {
                  g = null;
                  break;
                }
                f = g.sibling;
                if (null !== f) {
                  f.return = g.return;
                  g = f;
                  break;
                }
                g = g.return;
              }
              f = g;
            }
            Xi(a, b, e.children, c);
            b = b.child;
          }
          return b;
        case 9:
          return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
        case 14:
          return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
        case 15:
          return bj(a, b, b.type, b.pendingProps, c);
        case 17:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
        case 19:
          return xj(a, b, c);
        case 22:
          return dj(a, b, c);
      }
      throw Error(p(156, b.tag));
    };
    function Fk(a, b) {
      return ac(a, b);
    }
    function $k(a, b, c, d) {
      this.tag = a;
      this.key = c;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function Bg(a, b, c, d) {
      return new $k(a, b, c, d);
    }
    function aj(a) {
      a = a.prototype;
      return !(!a || !a.isReactComponent);
    }
    function Zk(a) {
      if ("function" === typeof a) return aj(a) ? 1 : 0;
      if (void 0 !== a && null !== a) {
        a = a.$$typeof;
        if (a === Da) return 11;
        if (a === Ga) return 14;
      }
      return 2;
    }
    function Pg(a, b) {
      var c = a.alternate;
      null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
      c.flags = a.flags & 14680064;
      c.childLanes = a.childLanes;
      c.lanes = a.lanes;
      c.child = a.child;
      c.memoizedProps = a.memoizedProps;
      c.memoizedState = a.memoizedState;
      c.updateQueue = a.updateQueue;
      b = a.dependencies;
      c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
      c.sibling = a.sibling;
      c.index = a.index;
      c.ref = a.ref;
      return c;
    }
    function Rg(a, b, c, d, e, f) {
      var g = 2;
      d = a;
      if ("function" === typeof a) aj(a) && (g = 1);
      else if ("string" === typeof a) g = 5;
      else a: switch (a) {
        case ya:
          return Tg(c.children, e, f, b);
        case za:
          g = 8;
          e |= 8;
          break;
        case Aa:
          return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
        case Ea:
          return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
        case Fa:
          return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
        case Ia:
          return pj(c, e, f, b);
        default:
          if ("object" === typeof a && null !== a) switch (a.$$typeof) {
            case Ba:
              g = 10;
              break a;
            case Ca:
              g = 9;
              break a;
            case Da:
              g = 11;
              break a;
            case Ga:
              g = 14;
              break a;
            case Ha:
              g = 16;
              d = null;
              break a;
          }
          throw Error(p(130, null == a ? a : typeof a, ""));
      }
      b = Bg(g, c, b, e);
      b.elementType = a;
      b.type = d;
      b.lanes = f;
      return b;
    }
    function Tg(a, b, c, d) {
      a = Bg(7, a, d, b);
      a.lanes = c;
      return a;
    }
    function pj(a, b, c, d) {
      a = Bg(22, a, d, b);
      a.elementType = Ia;
      a.lanes = c;
      a.stateNode = { isHidden: false };
      return a;
    }
    function Qg(a, b, c) {
      a = Bg(6, a, null, b);
      a.lanes = c;
      return a;
    }
    function Sg(a, b, c) {
      b = Bg(4, null !== a.children ? a.children : [], a.key, b);
      b.lanes = c;
      b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
      return b;
    }
    function al(a, b, c, d, e) {
      this.tag = b;
      this.containerInfo = a;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.pendingContext = this.context = null;
      this.callbackPriority = 0;
      this.eventTimes = zc(0);
      this.expirationTimes = zc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = zc(0);
      this.identifierPrefix = d;
      this.onRecoverableError = e;
      this.mutableSourceEagerHydrationData = null;
    }
    function bl(a, b, c, d, e, f, g, h, k) {
      a = new al(a, b, c, h, k);
      1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
      f = Bg(3, null, null, b);
      a.current = f;
      f.stateNode = a;
      f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
      kh(f);
      return a;
    }
    function cl(a, b, c) {
      var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
    }
    function dl(a) {
      if (!a) return Vf;
      a = a._reactInternals;
      a: {
        if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
        var b = a;
        do {
          switch (b.tag) {
            case 3:
              b = b.stateNode.context;
              break a;
            case 1:
              if (Zf(b.type)) {
                b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          b = b.return;
        } while (null !== b);
        throw Error(p(171));
      }
      if (1 === a.tag) {
        var c = a.type;
        if (Zf(c)) return bg(a, c, b);
      }
      return b;
    }
    function el(a, b, c, d, e, f, g, h, k) {
      a = bl(c, d, true, a, e, f, g, h, k);
      a.context = dl(null);
      c = a.current;
      d = R();
      e = yi(c);
      f = mh(d, e);
      f.callback = void 0 !== b && null !== b ? b : null;
      nh(c, f, e);
      a.current.lanes = e;
      Ac(a, e, d);
      Dk(a, d);
      return a;
    }
    function fl(a, b, c, d) {
      var e = b.current, f = R(), g = yi(e);
      c = dl(c);
      null === b.context ? b.context = c : b.pendingContext = c;
      b = mh(f, g);
      b.payload = { element: a };
      d = void 0 === d ? null : d;
      null !== d && (b.callback = d);
      a = nh(e, b, g);
      null !== a && (gi(a, e, g, f), oh(a, e, g));
      return g;
    }
    function gl(a) {
      a = a.current;
      if (!a.child) return null;
      switch (a.child.tag) {
        case 5:
          return a.child.stateNode;
        default:
          return a.child.stateNode;
      }
    }
    function hl(a, b) {
      a = a.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        var c = a.retryLane;
        a.retryLane = 0 !== c && c < b ? c : b;
      }
    }
    function il(a, b) {
      hl(a, b);
      (a = a.alternate) && hl(a, b);
    }
    function jl() {
      return null;
    }
    var kl = "function" === typeof reportError ? reportError : function(a) {
      console.error(a);
    };
    function ll(a) {
      this._internalRoot = a;
    }
    ml.prototype.render = ll.prototype.render = function(a) {
      var b = this._internalRoot;
      if (null === b) throw Error(p(409));
      fl(a, b, null, null);
    };
    ml.prototype.unmount = ll.prototype.unmount = function() {
      var a = this._internalRoot;
      if (null !== a) {
        this._internalRoot = null;
        var b = a.containerInfo;
        Rk(function() {
          fl(null, a, null, null);
        });
        b[uf] = null;
      }
    };
    function ml(a) {
      this._internalRoot = a;
    }
    ml.prototype.unstable_scheduleHydration = function(a) {
      if (a) {
        var b = Hc();
        a = { blockedOn: null, target: a, priority: b };
        for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
        Qc.splice(c, 0, a);
        0 === c && Vc(a);
      }
    };
    function nl(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
    }
    function ol(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
    }
    function pl() {
    }
    function ql(a, b, c, d, e) {
      if (e) {
        if ("function" === typeof d) {
          var f = d;
          d = function() {
            var a2 = gl(g);
            f.call(a2);
          };
        }
        var g = el(b, d, a, 0, null, false, false, "", pl);
        a._reactRootContainer = g;
        a[uf] = g.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk();
        return g;
      }
      for (; e = a.lastChild; ) a.removeChild(e);
      if ("function" === typeof d) {
        var h = d;
        d = function() {
          var a2 = gl(k);
          h.call(a2);
        };
      }
      var k = bl(a, 0, false, null, null, false, false, "", pl);
      a._reactRootContainer = k;
      a[uf] = k.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk(function() {
        fl(b, k, c, d);
      });
      return k;
    }
    function rl(a, b, c, d, e) {
      var f = c._reactRootContainer;
      if (f) {
        var g = f;
        if ("function" === typeof e) {
          var h = e;
          e = function() {
            var a2 = gl(g);
            h.call(a2);
          };
        }
        fl(b, g, a, e);
      } else g = ql(c, b, a, e, d);
      return gl(g);
    }
    Ec = function(a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;
          if (b.current.memoizedState.isDehydrated) {
            var c = tc(b.pendingLanes);
            0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
          }
          break;
        case 13:
          Rk(function() {
            var b2 = ih(a, 1);
            if (null !== b2) {
              var c2 = R();
              gi(b2, a, 1, c2);
            }
          }), il(a, 1);
      }
    };
    Fc = function(a) {
      if (13 === a.tag) {
        var b = ih(a, 134217728);
        if (null !== b) {
          var c = R();
          gi(b, a, 134217728, c);
        }
        il(a, 134217728);
      }
    };
    Gc = function(a) {
      if (13 === a.tag) {
        var b = yi(a), c = ih(a, b);
        if (null !== c) {
          var d = R();
          gi(c, a, b, d);
        }
        il(a, b);
      }
    };
    Hc = function() {
      return C;
    };
    Ic = function(a, b) {
      var c = C;
      try {
        return C = a, b();
      } finally {
        C = c;
      }
    };
    yb = function(a, b, c) {
      switch (b) {
        case "input":
          bb(a, c);
          b = c.name;
          if ("radio" === c.type && null != b) {
            for (c = a; c.parentNode; ) c = c.parentNode;
            c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
            for (b = 0; b < c.length; b++) {
              var d = c[b];
              if (d !== a && d.form === a.form) {
                var e = Db(d);
                if (!e) throw Error(p(90));
                Wa(d);
                bb(d, e);
              }
            }
          }
          break;
        case "textarea":
          ib(a, c);
          break;
        case "select":
          b = c.value, null != b && fb(a, !!c.multiple, b, false);
      }
    };
    Gb = Qk;
    Hb = Rk;
    var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
    var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
    var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
      a = Zb(a);
      return null === a ? null : a.stateNode;
    }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!vl.isDisabled && vl.supportsFiber) try {
        kc = vl.inject(ul), lc = vl;
      } catch (a) {
      }
    }
    var vl;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
    exports.createPortal = function(a, b) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!nl(b)) throw Error(p(200));
      return cl(a, b, null, c);
    };
    exports.createRoot = function(a, b) {
      if (!nl(a)) throw Error(p(299));
      var c = false, d = "", e = kl;
      null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
      b = bl(a, 1, false, null, null, c, false, d, e);
      a[uf] = b.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      return new ll(b);
    };
    exports.findDOMNode = function(a) {
      if (null == a) return null;
      if (1 === a.nodeType) return a;
      var b = a._reactInternals;
      if (void 0 === b) {
        if ("function" === typeof a.render) throw Error(p(188));
        a = Object.keys(a).join(",");
        throw Error(p(268, a));
      }
      a = Zb(b);
      a = null === a ? null : a.stateNode;
      return a;
    };
    exports.flushSync = function(a) {
      return Rk(a);
    };
    exports.hydrate = function(a, b, c) {
      if (!ol(b)) throw Error(p(200));
      return rl(null, a, b, true, c);
    };
    exports.hydrateRoot = function(a, b, c) {
      if (!nl(a)) throw Error(p(405));
      var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
      null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
      b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
      a[uf] = b.current;
      sf(a);
      if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
        c,
        e
      );
      return new ml(b);
    };
    exports.render = function(a, b, c) {
      if (!ol(b)) throw Error(p(200));
      return rl(null, a, b, false, c);
    };
    exports.unmountComponentAtNode = function(a) {
      if (!ol(a)) throw Error(p(40));
      return a._reactRootContainer ? (Rk(function() {
        rl(null, null, a, false, function() {
          a._reactRootContainer = null;
          a[uf] = null;
        });
      }), true) : false;
    };
    exports.unstable_batchedUpdates = Qk;
    exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
      if (!ol(c)) throw Error(p(200));
      if (null == a || void 0 === a._reactInternals) throw Error(p(38));
      return rl(a, b, c, false, d);
    };
    exports.version = "18.3.1-next-f1338f8080-20240426";
  }
});

// node_modules/react-dom/index.js
var require_react_dom = __commonJS({
  "node_modules/react-dom/index.js"(exports, module2) {
    "use strict";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module2.exports = require_react_dom_production_min();
    } else {
      module2.exports = null;
    }
  }
});

// node_modules/react-dom/client.js
var require_client = __commonJS({
  "node_modules/react-dom/client.js"(exports) {
    "use strict";
    var m = require_react_dom();
    if (true) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});

// node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict";
    var f = require_react();
    var k = Symbol.for("react.element");
    var l = Symbol.for("react.fragment");
    var m = Object.prototype.hasOwnProperty;
    var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
    var p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    exports.Fragment = l;
    exports.jsx = q;
    exports.jsxs = q;
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module2) {
    "use strict";
    if (true) {
      module2.exports = require_react_jsx_runtime_production_min();
    } else {
      module2.exports = null;
    }
  }
});

// node_modules/canvas-confetti/dist/confetti.module.mjs
var confetti_module_exports = {};
__export(confetti_module_exports, {
  create: () => create,
  default: () => confetti_module_default
});
var module, confetti_module_default, create;
var init_confetti_module = __esm({
  "node_modules/canvas-confetti/dist/confetti.module.mjs"() {
    module = {};
    (function main(global2, module2, isWorker, workerSize) {
      var canUseWorker = !!(global2.Worker && global2.Blob && global2.Promise && global2.OffscreenCanvas && global2.OffscreenCanvasRenderingContext2D && global2.HTMLCanvasElement && global2.HTMLCanvasElement.prototype.transferControlToOffscreen && global2.URL && global2.URL.createObjectURL);
      var canUsePaths = typeof Path2D === "function" && typeof DOMMatrix === "function";
      var canDrawBitmap = (function() {
        if (!global2.OffscreenCanvas) {
          return false;
        }
        var canvas = new OffscreenCanvas(1, 1);
        var ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, 1, 1);
        var bitmap = canvas.transferToImageBitmap();
        try {
          ctx.createPattern(bitmap, "no-repeat");
        } catch (e) {
          return false;
        }
        return true;
      })();
      function noop() {
      }
      function promise(func) {
        var ModulePromise = module2.exports.Promise;
        var Prom = ModulePromise !== void 0 ? ModulePromise : global2.Promise;
        if (typeof Prom === "function") {
          return new Prom(func);
        }
        func(noop, noop);
        return null;
      }
      var bitmapMapper = /* @__PURE__ */ (function(skipTransform, map) {
        return {
          transform: function(bitmap) {
            if (skipTransform) {
              return bitmap;
            }
            if (map.has(bitmap)) {
              return map.get(bitmap);
            }
            var canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(bitmap, 0, 0);
            map.set(bitmap, canvas);
            return canvas;
          },
          clear: function() {
            map.clear();
          }
        };
      })(canDrawBitmap, /* @__PURE__ */ new Map());
      var raf = (function() {
        var TIME = Math.floor(1e3 / 60);
        var frame, cancel;
        var frames = {};
        var lastFrameTime = 0;
        if (typeof requestAnimationFrame === "function" && typeof cancelAnimationFrame === "function") {
          frame = function(cb) {
            var id = Math.random();
            frames[id] = requestAnimationFrame(function onFrame(time) {
              if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
                lastFrameTime = time;
                delete frames[id];
                cb();
              } else {
                frames[id] = requestAnimationFrame(onFrame);
              }
            });
            return id;
          };
          cancel = function(id) {
            if (frames[id]) {
              cancelAnimationFrame(frames[id]);
            }
          };
        } else {
          frame = function(cb) {
            return setTimeout(cb, TIME);
          };
          cancel = function(timer) {
            return clearTimeout(timer);
          };
        }
        return { frame, cancel };
      })();
      var getWorker = /* @__PURE__ */ (function() {
        var worker;
        var prom;
        var resolves = {};
        function decorate(worker2) {
          function execute(options, callback) {
            worker2.postMessage({ options: options || {}, callback });
          }
          worker2.init = function initWorker(canvas) {
            var offscreen = canvas.transferControlToOffscreen();
            worker2.postMessage({ canvas: offscreen }, [offscreen]);
          };
          worker2.fire = function fireWorker(options, size, done) {
            if (prom) {
              execute(options, null);
              return prom;
            }
            var id = Math.random().toString(36).slice(2);
            prom = promise(function(resolve) {
              function workerDone(msg) {
                if (msg.data.callback !== id) {
                  return;
                }
                delete resolves[id];
                worker2.removeEventListener("message", workerDone);
                prom = null;
                bitmapMapper.clear();
                done();
                resolve();
              }
              worker2.addEventListener("message", workerDone);
              execute(options, id);
              resolves[id] = workerDone.bind(null, { data: { callback: id } });
            });
            return prom;
          };
          worker2.reset = function resetWorker() {
            worker2.postMessage({ reset: true });
            for (var id in resolves) {
              resolves[id]();
              delete resolves[id];
            }
          };
        }
        return function() {
          if (worker) {
            return worker;
          }
          if (!isWorker && canUseWorker) {
            var code = [
              "var CONFETTI, SIZE = {}, module = {};",
              "(" + main.toString() + ")(this, module, true, SIZE);",
              "onmessage = function(msg) {",
              "  if (msg.data.options) {",
              "    CONFETTI(msg.data.options).then(function () {",
              "      if (msg.data.callback) {",
              "        postMessage({ callback: msg.data.callback });",
              "      }",
              "    });",
              "  } else if (msg.data.reset) {",
              "    CONFETTI && CONFETTI.reset();",
              "  } else if (msg.data.resize) {",
              "    SIZE.width = msg.data.resize.width;",
              "    SIZE.height = msg.data.resize.height;",
              "  } else if (msg.data.canvas) {",
              "    SIZE.width = msg.data.canvas.width;",
              "    SIZE.height = msg.data.canvas.height;",
              "    CONFETTI = module.exports.create(msg.data.canvas);",
              "  }",
              "}"
            ].join("\n");
            try {
              worker = new Worker(URL.createObjectURL(new Blob([code])));
            } catch (e) {
              typeof console !== void 0 && typeof console.warn === "function" ? console.warn("\u{1F38A} Could not load worker", e) : null;
              return null;
            }
            decorate(worker);
          }
          return worker;
        };
      })();
      var defaults = {
        particleCount: 50,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        x: 0.5,
        y: 0.5,
        shapes: ["square", "circle"],
        zIndex: 100,
        colors: [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff"
        ],
        // probably should be true, but back-compat
        disableForReducedMotion: false,
        scalar: 1
      };
      function convert(val, transform) {
        return transform ? transform(val) : val;
      }
      function isOk(val) {
        return !(val === null || val === void 0);
      }
      function prop(options, name, transform) {
        return convert(
          options && isOk(options[name]) ? options[name] : defaults[name],
          transform
        );
      }
      function onlyPositiveInt(number) {
        return number < 0 ? 0 : Math.floor(number);
      }
      function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      function toDecimal(str) {
        return parseInt(str, 16);
      }
      function colorsToRgb(colors) {
        return colors.map(hexToRgb);
      }
      function hexToRgb(str) {
        var val = String(str).replace(/[^0-9a-f]/gi, "");
        if (val.length < 6) {
          val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
        }
        return {
          r: toDecimal(val.substring(0, 2)),
          g: toDecimal(val.substring(2, 4)),
          b: toDecimal(val.substring(4, 6))
        };
      }
      function getOrigin(options) {
        var origin = prop(options, "origin", Object);
        origin.x = prop(origin, "x", Number);
        origin.y = prop(origin, "y", Number);
        return origin;
      }
      function setCanvasWindowSize(canvas) {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
      }
      function setCanvasRectSize(canvas) {
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      function getCanvas(zIndex) {
        var canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = zIndex;
        return canvas;
      }
      function ellipse(context, x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
        context.save();
        context.translate(x, y);
        context.rotate(rotation);
        context.scale(radiusX, radiusY);
        context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
        context.restore();
      }
      function randomPhysics(opts) {
        var radAngle = opts.angle * (Math.PI / 180);
        var radSpread = opts.spread * (Math.PI / 180);
        return {
          x: opts.x,
          y: opts.y,
          wobble: Math.random() * 10,
          wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
          velocity: opts.startVelocity * 0.5 + Math.random() * opts.startVelocity,
          angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
          tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
          color: opts.color,
          shape: opts.shape,
          tick: 0,
          totalTicks: opts.ticks,
          decay: opts.decay,
          drift: opts.drift,
          random: Math.random() + 2,
          tiltSin: 0,
          tiltCos: 0,
          wobbleX: 0,
          wobbleY: 0,
          gravity: opts.gravity * 3,
          ovalScalar: 0.6,
          scalar: opts.scalar,
          flat: opts.flat
        };
      }
      function updateFetti(context, fetti) {
        fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
        fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
        fetti.velocity *= fetti.decay;
        if (fetti.flat) {
          fetti.wobble = 0;
          fetti.wobbleX = fetti.x + 10 * fetti.scalar;
          fetti.wobbleY = fetti.y + 10 * fetti.scalar;
          fetti.tiltSin = 0;
          fetti.tiltCos = 0;
          fetti.random = 1;
        } else {
          fetti.wobble += fetti.wobbleSpeed;
          fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
          fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);
          fetti.tiltAngle += 0.1;
          fetti.tiltSin = Math.sin(fetti.tiltAngle);
          fetti.tiltCos = Math.cos(fetti.tiltAngle);
          fetti.random = Math.random() + 2;
        }
        var progress = fetti.tick++ / fetti.totalTicks;
        var x1 = fetti.x + fetti.random * fetti.tiltCos;
        var y1 = fetti.y + fetti.random * fetti.tiltSin;
        var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
        var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;
        context.fillStyle = "rgba(" + fetti.color.r + ", " + fetti.color.g + ", " + fetti.color.b + ", " + (1 - progress) + ")";
        context.beginPath();
        if (canUsePaths && fetti.shape.type === "path" && typeof fetti.shape.path === "string" && Array.isArray(fetti.shape.matrix)) {
          context.fill(transformPath2D(
            fetti.shape.path,
            fetti.shape.matrix,
            fetti.x,
            fetti.y,
            Math.abs(x2 - x1) * 0.1,
            Math.abs(y2 - y1) * 0.1,
            Math.PI / 10 * fetti.wobble
          ));
        } else if (fetti.shape.type === "bitmap") {
          var rotation = Math.PI / 10 * fetti.wobble;
          var scaleX = Math.abs(x2 - x1) * 0.1;
          var scaleY = Math.abs(y2 - y1) * 0.1;
          var width = fetti.shape.bitmap.width * fetti.scalar;
          var height = fetti.shape.bitmap.height * fetti.scalar;
          var matrix = new DOMMatrix([
            Math.cos(rotation) * scaleX,
            Math.sin(rotation) * scaleX,
            -Math.sin(rotation) * scaleY,
            Math.cos(rotation) * scaleY,
            fetti.x,
            fetti.y
          ]);
          matrix.multiplySelf(new DOMMatrix(fetti.shape.matrix));
          var pattern = context.createPattern(bitmapMapper.transform(fetti.shape.bitmap), "no-repeat");
          pattern.setTransform(matrix);
          context.globalAlpha = 1 - progress;
          context.fillStyle = pattern;
          context.fillRect(
            fetti.x - width / 2,
            fetti.y - height / 2,
            width,
            height
          );
          context.globalAlpha = 1;
        } else if (fetti.shape === "circle") {
          context.ellipse ? context.ellipse(fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI) : ellipse(context, fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI);
        } else if (fetti.shape === "star") {
          var rot = Math.PI / 2 * 3;
          var innerRadius = 4 * fetti.scalar;
          var outerRadius = 8 * fetti.scalar;
          var x = fetti.x;
          var y = fetti.y;
          var spikes = 5;
          var step = Math.PI / spikes;
          while (spikes--) {
            x = fetti.x + Math.cos(rot) * outerRadius;
            y = fetti.y + Math.sin(rot) * outerRadius;
            context.lineTo(x, y);
            rot += step;
            x = fetti.x + Math.cos(rot) * innerRadius;
            y = fetti.y + Math.sin(rot) * innerRadius;
            context.lineTo(x, y);
            rot += step;
          }
        } else {
          context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
          context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
          context.lineTo(Math.floor(x2), Math.floor(y2));
          context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
        }
        context.closePath();
        context.fill();
        return fetti.tick < fetti.totalTicks;
      }
      function animate(canvas, fettis, resizer, size, done) {
        var animatingFettis = fettis.slice();
        var context = canvas.getContext("2d");
        var animationFrame;
        var destroy;
        var prom = promise(function(resolve) {
          function onDone() {
            animationFrame = destroy = null;
            context.clearRect(0, 0, size.width, size.height);
            bitmapMapper.clear();
            done();
            resolve();
          }
          function update() {
            if (isWorker && !(size.width === workerSize.width && size.height === workerSize.height)) {
              size.width = canvas.width = workerSize.width;
              size.height = canvas.height = workerSize.height;
            }
            if (!size.width && !size.height) {
              resizer(canvas);
              size.width = canvas.width;
              size.height = canvas.height;
            }
            context.clearRect(0, 0, size.width, size.height);
            animatingFettis = animatingFettis.filter(function(fetti) {
              return updateFetti(context, fetti);
            });
            if (animatingFettis.length) {
              animationFrame = raf.frame(update);
            } else {
              onDone();
            }
          }
          animationFrame = raf.frame(update);
          destroy = onDone;
        });
        return {
          addFettis: function(fettis2) {
            animatingFettis = animatingFettis.concat(fettis2);
            return prom;
          },
          canvas,
          promise: prom,
          reset: function() {
            if (animationFrame) {
              raf.cancel(animationFrame);
            }
            if (destroy) {
              destroy();
            }
          }
        };
      }
      function confettiCannon(canvas, globalOpts) {
        var isLibCanvas = !canvas;
        var allowResize = !!prop(globalOpts || {}, "resize");
        var hasResizeEventRegistered = false;
        var globalDisableForReducedMotion = prop(globalOpts, "disableForReducedMotion", Boolean);
        var shouldUseWorker = canUseWorker && !!prop(globalOpts || {}, "useWorker");
        var worker = shouldUseWorker ? getWorker() : null;
        var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
        var initialized = canvas && worker ? !!canvas.__confetti_initialized : false;
        var preferLessMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion)").matches;
        var animationObj;
        function fireLocal(options, size, done) {
          var particleCount = prop(options, "particleCount", onlyPositiveInt);
          var angle = prop(options, "angle", Number);
          var spread = prop(options, "spread", Number);
          var startVelocity = prop(options, "startVelocity", Number);
          var decay = prop(options, "decay", Number);
          var gravity = prop(options, "gravity", Number);
          var drift = prop(options, "drift", Number);
          var colors = prop(options, "colors", colorsToRgb);
          var ticks = prop(options, "ticks", Number);
          var shapes = prop(options, "shapes");
          var scalar = prop(options, "scalar");
          var flat = !!prop(options, "flat");
          var origin = getOrigin(options);
          var temp = particleCount;
          var fettis = [];
          var startX = canvas.width * origin.x;
          var startY = canvas.height * origin.y;
          while (temp--) {
            fettis.push(
              randomPhysics({
                x: startX,
                y: startY,
                angle,
                spread,
                startVelocity,
                color: colors[temp % colors.length],
                shape: shapes[randomInt(0, shapes.length)],
                ticks,
                decay,
                gravity,
                drift,
                scalar,
                flat
              })
            );
          }
          if (animationObj) {
            return animationObj.addFettis(fettis);
          }
          animationObj = animate(canvas, fettis, resizer, size, done);
          return animationObj.promise;
        }
        function fire(options) {
          var disableForReducedMotion = globalDisableForReducedMotion || prop(options, "disableForReducedMotion", Boolean);
          var zIndex = prop(options, "zIndex", Number);
          if (disableForReducedMotion && preferLessMotion) {
            return promise(function(resolve) {
              resolve();
            });
          }
          if (isLibCanvas && animationObj) {
            canvas = animationObj.canvas;
          } else if (isLibCanvas && !canvas) {
            canvas = getCanvas(zIndex);
            document.body.appendChild(canvas);
          }
          if (allowResize && !initialized) {
            resizer(canvas);
          }
          var size = {
            width: canvas.width,
            height: canvas.height
          };
          if (worker && !initialized) {
            worker.init(canvas);
          }
          initialized = true;
          if (worker) {
            canvas.__confetti_initialized = true;
          }
          function onResize() {
            if (worker) {
              var obj = {
                getBoundingClientRect: function() {
                  if (!isLibCanvas) {
                    return canvas.getBoundingClientRect();
                  }
                }
              };
              resizer(obj);
              worker.postMessage({
                resize: {
                  width: obj.width,
                  height: obj.height
                }
              });
              return;
            }
            size.width = size.height = null;
          }
          function done() {
            animationObj = null;
            if (allowResize) {
              hasResizeEventRegistered = false;
              global2.removeEventListener("resize", onResize);
            }
            if (isLibCanvas && canvas) {
              if (document.body.contains(canvas)) {
                document.body.removeChild(canvas);
              }
              canvas = null;
              initialized = false;
            }
          }
          if (allowResize && !hasResizeEventRegistered) {
            hasResizeEventRegistered = true;
            global2.addEventListener("resize", onResize, false);
          }
          if (worker) {
            return worker.fire(options, size, done);
          }
          return fireLocal(options, size, done);
        }
        fire.reset = function() {
          if (worker) {
            worker.reset();
          }
          if (animationObj) {
            animationObj.reset();
          }
        };
        return fire;
      }
      var defaultFire;
      function getDefaultFire() {
        if (!defaultFire) {
          defaultFire = confettiCannon(null, { useWorker: true, resize: true });
        }
        return defaultFire;
      }
      function transformPath2D(pathString, pathMatrix, x, y, scaleX, scaleY, rotation) {
        var path2d = new Path2D(pathString);
        var t1 = new Path2D();
        t1.addPath(path2d, new DOMMatrix(pathMatrix));
        var t2 = new Path2D();
        t2.addPath(t1, new DOMMatrix([
          Math.cos(rotation) * scaleX,
          Math.sin(rotation) * scaleX,
          -Math.sin(rotation) * scaleY,
          Math.cos(rotation) * scaleY,
          x,
          y
        ]));
        return t2;
      }
      function shapeFromPath(pathData) {
        if (!canUsePaths) {
          throw new Error("path confetti are not supported in this browser");
        }
        var path, matrix;
        if (typeof pathData === "string") {
          path = pathData;
        } else {
          path = pathData.path;
          matrix = pathData.matrix;
        }
        var path2d = new Path2D(path);
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");
        if (!matrix) {
          var maxSize = 1e3;
          var minX = maxSize;
          var minY = maxSize;
          var maxX = 0;
          var maxY = 0;
          var width, height;
          for (var x = 0; x < maxSize; x += 2) {
            for (var y = 0; y < maxSize; y += 2) {
              if (tempCtx.isPointInPath(path2d, x, y, "nonzero")) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
              }
            }
          }
          width = maxX - minX;
          height = maxY - minY;
          var maxDesiredSize = 10;
          var scale = Math.min(maxDesiredSize / width, maxDesiredSize / height);
          matrix = [
            scale,
            0,
            0,
            scale,
            -Math.round(width / 2 + minX) * scale,
            -Math.round(height / 2 + minY) * scale
          ];
        }
        return {
          type: "path",
          path,
          matrix
        };
      }
      function shapeFromText(textData) {
        var text, scalar = 1, color = "#000000", fontFamily = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
        if (typeof textData === "string") {
          text = textData;
        } else {
          text = textData.text;
          scalar = "scalar" in textData ? textData.scalar : scalar;
          fontFamily = "fontFamily" in textData ? textData.fontFamily : fontFamily;
          color = "color" in textData ? textData.color : color;
        }
        var fontSize = 10 * scalar;
        var font = "" + fontSize + "px " + fontFamily;
        var canvas = new OffscreenCanvas(fontSize, fontSize);
        var ctx = canvas.getContext("2d");
        ctx.font = font;
        var size = ctx.measureText(text);
        var width = Math.ceil(size.actualBoundingBoxRight + size.actualBoundingBoxLeft);
        var height = Math.ceil(size.actualBoundingBoxAscent + size.actualBoundingBoxDescent);
        var padding = 2;
        var x = size.actualBoundingBoxLeft + padding;
        var y = size.actualBoundingBoxAscent + padding;
        width += padding + padding;
        height += padding + padding;
        canvas = new OffscreenCanvas(width, height);
        ctx = canvas.getContext("2d");
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        var scale = 1 / scalar;
        return {
          type: "bitmap",
          // TODO these probably need to be transfered for workers
          bitmap: canvas.transferToImageBitmap(),
          matrix: [scale, 0, 0, scale, -width * scale / 2, -height * scale / 2]
        };
      }
      module2.exports = function() {
        return getDefaultFire().apply(this, arguments);
      };
      module2.exports.reset = function() {
        getDefaultFire().reset();
      };
      module2.exports.create = confettiCannon;
      module2.exports.shapeFromPath = shapeFromPath;
      module2.exports.shapeFromText = shapeFromText;
    })((function() {
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof self !== "undefined") {
        return self;
      }
      return this || {};
    })(), module, false);
    confetti_module_default = module.exports;
    create = module.exports.create;
  }
});

// node_modules/howler/dist/howler.js
var require_howler = __commonJS({
  "node_modules/howler/dist/howler.js"(exports) {
    (function() {
      "use strict";
      var HowlerGlobal2 = function() {
        this.init();
      };
      HowlerGlobal2.prototype = {
        /**
         * Initialize the global Howler object.
         * @return {Howler}
         */
        init: function() {
          var self2 = this || Howler3;
          self2._counter = 1e3;
          self2._html5AudioPool = [];
          self2.html5PoolSize = 10;
          self2._codecs = {};
          self2._howls = [];
          self2._muted = false;
          self2._volume = 1;
          self2._canPlayEvent = "canplaythrough";
          self2._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
          self2.masterGain = null;
          self2.noAudio = false;
          self2.usingWebAudio = true;
          self2.autoSuspend = true;
          self2.ctx = null;
          self2.autoUnlock = true;
          self2._setup();
          return self2;
        },
        /**
         * Get/set the global volume for all sounds.
         * @param  {Float} vol Volume from 0.0 to 1.0.
         * @return {Howler/Float}     Returns self or current volume.
         */
        volume: function(vol) {
          var self2 = this || Howler3;
          vol = parseFloat(vol);
          if (!self2.ctx) {
            setupAudioContext();
          }
          if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
            self2._volume = vol;
            if (self2._muted) {
              return self2;
            }
            if (self2.usingWebAudio) {
              self2.masterGain.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (!self2._howls[i]._webAudio) {
                var ids = self2._howls[i]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound = self2._howls[i]._soundById(ids[j]);
                  if (sound && sound._node) {
                    sound._node.volume = sound._volume * vol;
                  }
                }
              }
            }
            return self2;
          }
          return self2._volume;
        },
        /**
         * Handle muting and unmuting globally.
         * @param  {Boolean} muted Is muted or not.
         */
        mute: function(muted) {
          var self2 = this || Howler3;
          if (!self2.ctx) {
            setupAudioContext();
          }
          self2._muted = muted;
          if (self2.usingWebAudio) {
            self2.masterGain.gain.setValueAtTime(muted ? 0 : self2._volume, Howler3.ctx.currentTime);
          }
          for (var i = 0; i < self2._howls.length; i++) {
            if (!self2._howls[i]._webAudio) {
              var ids = self2._howls[i]._getSoundIds();
              for (var j = 0; j < ids.length; j++) {
                var sound = self2._howls[i]._soundById(ids[j]);
                if (sound && sound._node) {
                  sound._node.muted = muted ? true : sound._muted;
                }
              }
            }
          }
          return self2;
        },
        /**
         * Handle stopping all sounds globally.
         */
        stop: function() {
          var self2 = this || Howler3;
          for (var i = 0; i < self2._howls.length; i++) {
            self2._howls[i].stop();
          }
          return self2;
        },
        /**
         * Unload and destroy all currently loaded Howl objects.
         * @return {Howler}
         */
        unload: function() {
          var self2 = this || Howler3;
          for (var i = self2._howls.length - 1; i >= 0; i--) {
            self2._howls[i].unload();
          }
          if (self2.usingWebAudio && self2.ctx && typeof self2.ctx.close !== "undefined") {
            self2.ctx.close();
            self2.ctx = null;
            setupAudioContext();
          }
          return self2;
        },
        /**
         * Check for codec support of specific extension.
         * @param  {String} ext Audio file extention.
         * @return {Boolean}
         */
        codecs: function(ext) {
          return (this || Howler3)._codecs[ext.replace(/^x-/, "")];
        },
        /**
         * Setup various state values for global tracking.
         * @return {Howler}
         */
        _setup: function() {
          var self2 = this || Howler3;
          self2.state = self2.ctx ? self2.ctx.state || "suspended" : "suspended";
          self2._autoSuspend();
          if (!self2.usingWebAudio) {
            if (typeof Audio !== "undefined") {
              try {
                var test = new Audio();
                if (typeof test.oncanplaythrough === "undefined") {
                  self2._canPlayEvent = "canplay";
                }
              } catch (e) {
                self2.noAudio = true;
              }
            } else {
              self2.noAudio = true;
            }
          }
          try {
            var test = new Audio();
            if (test.muted) {
              self2.noAudio = true;
            }
          } catch (e) {
          }
          if (!self2.noAudio) {
            self2._setupCodecs();
          }
          return self2;
        },
        /**
         * Check for browser support for various codecs and cache the results.
         * @return {Howler}
         */
        _setupCodecs: function() {
          var self2 = this || Howler3;
          var audioTest = null;
          try {
            audioTest = typeof Audio !== "undefined" ? new Audio() : null;
          } catch (err) {
            return self2;
          }
          if (!audioTest || typeof audioTest.canPlayType !== "function") {
            return self2;
          }
          var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
          var ua = self2._navigator ? self2._navigator.userAgent : "";
          var checkOpera = ua.match(/OPR\/(\d+)/g);
          var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
          var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
          var safariVersion = ua.match(/Version\/(.*?) /);
          var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
          self2._codecs = {
            mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
            mpeg: !!mpegTest,
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
            aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
            caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
            m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
            flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
          };
          return self2;
        },
        /**
         * Some browsers/devices will only allow audio to be played after a user interaction.
         * Attempt to automatically unlock audio on the first user interaction.
         * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
         * @return {Howler}
         */
        _unlockAudio: function() {
          var self2 = this || Howler3;
          if (self2._audioUnlocked || !self2.ctx) {
            return;
          }
          self2._audioUnlocked = false;
          self2.autoUnlock = false;
          if (!self2._mobileUnloaded && self2.ctx.sampleRate !== 44100) {
            self2._mobileUnloaded = true;
            self2.unload();
          }
          self2._scratchBuffer = self2.ctx.createBuffer(1, 1, 22050);
          var unlock = function(e) {
            while (self2._html5AudioPool.length < self2.html5PoolSize) {
              try {
                var audioNode = new Audio();
                audioNode._unlocked = true;
                self2._releaseHtml5Audio(audioNode);
              } catch (e2) {
                self2.noAudio = true;
                break;
              }
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (!self2._howls[i]._webAudio) {
                var ids = self2._howls[i]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound = self2._howls[i]._soundById(ids[j]);
                  if (sound && sound._node && !sound._node._unlocked) {
                    sound._node._unlocked = true;
                    sound._node.load();
                  }
                }
              }
            }
            self2._autoResume();
            var source = self2.ctx.createBufferSource();
            source.buffer = self2._scratchBuffer;
            source.connect(self2.ctx.destination);
            if (typeof source.start === "undefined") {
              source.noteOn(0);
            } else {
              source.start(0);
            }
            if (typeof self2.ctx.resume === "function") {
              self2.ctx.resume();
            }
            source.onended = function() {
              source.disconnect(0);
              self2._audioUnlocked = true;
              document.removeEventListener("touchstart", unlock, true);
              document.removeEventListener("touchend", unlock, true);
              document.removeEventListener("click", unlock, true);
              document.removeEventListener("keydown", unlock, true);
              for (var i2 = 0; i2 < self2._howls.length; i2++) {
                self2._howls[i2]._emit("unlock");
              }
            };
          };
          document.addEventListener("touchstart", unlock, true);
          document.addEventListener("touchend", unlock, true);
          document.addEventListener("click", unlock, true);
          document.addEventListener("keydown", unlock, true);
          return self2;
        },
        /**
         * Get an unlocked HTML5 Audio object from the pool. If none are left,
         * return a new Audio object and throw a warning.
         * @return {Audio} HTML5 Audio object.
         */
        _obtainHtml5Audio: function() {
          var self2 = this || Howler3;
          if (self2._html5AudioPool.length) {
            return self2._html5AudioPool.pop();
          }
          var testPlay = new Audio().play();
          if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
            testPlay.catch(function() {
              console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
            });
          }
          return new Audio();
        },
        /**
         * Return an activated HTML5 Audio object to the pool.
         * @return {Howler}
         */
        _releaseHtml5Audio: function(audio) {
          var self2 = this || Howler3;
          if (audio._unlocked) {
            self2._html5AudioPool.push(audio);
          }
          return self2;
        },
        /**
         * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
         * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
         * @return {Howler}
         */
        _autoSuspend: function() {
          var self2 = this;
          if (!self2.autoSuspend || !self2.ctx || typeof self2.ctx.suspend === "undefined" || !Howler3.usingWebAudio) {
            return;
          }
          for (var i = 0; i < self2._howls.length; i++) {
            if (self2._howls[i]._webAudio) {
              for (var j = 0; j < self2._howls[i]._sounds.length; j++) {
                if (!self2._howls[i]._sounds[j]._paused) {
                  return self2;
                }
              }
            }
          }
          if (self2._suspendTimer) {
            clearTimeout(self2._suspendTimer);
          }
          self2._suspendTimer = setTimeout(function() {
            if (!self2.autoSuspend) {
              return;
            }
            self2._suspendTimer = null;
            self2.state = "suspending";
            var handleSuspension = function() {
              self2.state = "suspended";
              if (self2._resumeAfterSuspend) {
                delete self2._resumeAfterSuspend;
                self2._autoResume();
              }
            };
            self2.ctx.suspend().then(handleSuspension, handleSuspension);
          }, 3e4);
          return self2;
        },
        /**
         * Automatically resume the Web Audio AudioContext when a new sound is played.
         * @return {Howler}
         */
        _autoResume: function() {
          var self2 = this;
          if (!self2.ctx || typeof self2.ctx.resume === "undefined" || !Howler3.usingWebAudio) {
            return;
          }
          if (self2.state === "running" && self2.ctx.state !== "interrupted" && self2._suspendTimer) {
            clearTimeout(self2._suspendTimer);
            self2._suspendTimer = null;
          } else if (self2.state === "suspended" || self2.state === "running" && self2.ctx.state === "interrupted") {
            self2.ctx.resume().then(function() {
              self2.state = "running";
              for (var i = 0; i < self2._howls.length; i++) {
                self2._howls[i]._emit("resume");
              }
            });
            if (self2._suspendTimer) {
              clearTimeout(self2._suspendTimer);
              self2._suspendTimer = null;
            }
          } else if (self2.state === "suspending") {
            self2._resumeAfterSuspend = true;
          }
          return self2;
        }
      };
      var Howler3 = new HowlerGlobal2();
      var Howl3 = function(o) {
        var self2 = this;
        if (!o.src || o.src.length === 0) {
          console.error("An array of source files must be passed with any new Howl.");
          return;
        }
        self2.init(o);
      };
      Howl3.prototype = {
        /**
         * Initialize a new Howl group object.
         * @param  {Object} o Passed in properties for this group.
         * @return {Howl}
         */
        init: function(o) {
          var self2 = this;
          if (!Howler3.ctx) {
            setupAudioContext();
          }
          self2._autoplay = o.autoplay || false;
          self2._format = typeof o.format !== "string" ? o.format : [o.format];
          self2._html5 = o.html5 || false;
          self2._muted = o.mute || false;
          self2._loop = o.loop || false;
          self2._pool = o.pool || 5;
          self2._preload = typeof o.preload === "boolean" || o.preload === "metadata" ? o.preload : true;
          self2._rate = o.rate || 1;
          self2._sprite = o.sprite || {};
          self2._src = typeof o.src !== "string" ? o.src : [o.src];
          self2._volume = o.volume !== void 0 ? o.volume : 1;
          self2._xhr = {
            method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
            headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
            withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
          };
          self2._duration = 0;
          self2._state = "unloaded";
          self2._sounds = [];
          self2._endTimers = {};
          self2._queue = [];
          self2._playLock = false;
          self2._onend = o.onend ? [{ fn: o.onend }] : [];
          self2._onfade = o.onfade ? [{ fn: o.onfade }] : [];
          self2._onload = o.onload ? [{ fn: o.onload }] : [];
          self2._onloaderror = o.onloaderror ? [{ fn: o.onloaderror }] : [];
          self2._onplayerror = o.onplayerror ? [{ fn: o.onplayerror }] : [];
          self2._onpause = o.onpause ? [{ fn: o.onpause }] : [];
          self2._onplay = o.onplay ? [{ fn: o.onplay }] : [];
          self2._onstop = o.onstop ? [{ fn: o.onstop }] : [];
          self2._onmute = o.onmute ? [{ fn: o.onmute }] : [];
          self2._onvolume = o.onvolume ? [{ fn: o.onvolume }] : [];
          self2._onrate = o.onrate ? [{ fn: o.onrate }] : [];
          self2._onseek = o.onseek ? [{ fn: o.onseek }] : [];
          self2._onunlock = o.onunlock ? [{ fn: o.onunlock }] : [];
          self2._onresume = [];
          self2._webAudio = Howler3.usingWebAudio && !self2._html5;
          if (typeof Howler3.ctx !== "undefined" && Howler3.ctx && Howler3.autoUnlock) {
            Howler3._unlockAudio();
          }
          Howler3._howls.push(self2);
          if (self2._autoplay) {
            self2._queue.push({
              event: "play",
              action: function() {
                self2.play();
              }
            });
          }
          if (self2._preload && self2._preload !== "none") {
            self2.load();
          }
          return self2;
        },
        /**
         * Load the audio file.
         * @return {Howler}
         */
        load: function() {
          var self2 = this;
          var url = null;
          if (Howler3.noAudio) {
            self2._emit("loaderror", null, "No audio support.");
            return;
          }
          if (typeof self2._src === "string") {
            self2._src = [self2._src];
          }
          for (var i = 0; i < self2._src.length; i++) {
            var ext, str;
            if (self2._format && self2._format[i]) {
              ext = self2._format[i];
            } else {
              str = self2._src[i];
              if (typeof str !== "string") {
                self2._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              ext = /^data:audio\/([^;,]+);/i.exec(str);
              if (!ext) {
                ext = /\.([^.]+)$/.exec(str.split("?", 1)[0]);
              }
              if (ext) {
                ext = ext[1].toLowerCase();
              }
            }
            if (!ext) {
              console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
            }
            if (ext && Howler3.codecs(ext)) {
              url = self2._src[i];
              break;
            }
          }
          if (!url) {
            self2._emit("loaderror", null, "No codec support for selected audio sources.");
            return;
          }
          self2._src = url;
          self2._state = "loading";
          if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
            self2._html5 = true;
            self2._webAudio = false;
          }
          new Sound2(self2);
          if (self2._webAudio) {
            loadBuffer(self2);
          }
          return self2;
        },
        /**
         * Play a sound or resume previous playback.
         * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Number}          Sound ID.
         */
        play: function(sprite, internal) {
          var self2 = this;
          var id = null;
          if (typeof sprite === "number") {
            id = sprite;
            sprite = null;
          } else if (typeof sprite === "string" && self2._state === "loaded" && !self2._sprite[sprite]) {
            return null;
          } else if (typeof sprite === "undefined") {
            sprite = "__default";
            if (!self2._playLock) {
              var num = 0;
              for (var i = 0; i < self2._sounds.length; i++) {
                if (self2._sounds[i]._paused && !self2._sounds[i]._ended) {
                  num++;
                  id = self2._sounds[i]._id;
                }
              }
              if (num === 1) {
                sprite = null;
              } else {
                id = null;
              }
            }
          }
          var sound = id ? self2._soundById(id) : self2._inactiveSound();
          if (!sound) {
            return null;
          }
          if (id && !sprite) {
            sprite = sound._sprite || "__default";
          }
          if (self2._state !== "loaded") {
            sound._sprite = sprite;
            sound._ended = false;
            var soundId = sound._id;
            self2._queue.push({
              event: "play",
              action: function() {
                self2.play(soundId);
              }
            });
            return soundId;
          }
          if (id && !sound._paused) {
            if (!internal) {
              self2._loadQueue("play");
            }
            return sound._id;
          }
          if (self2._webAudio) {
            Howler3._autoResume();
          }
          var seek = Math.max(0, sound._seek > 0 ? sound._seek : self2._sprite[sprite][0] / 1e3);
          var duration = Math.max(0, (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3 - seek);
          var timeout = duration * 1e3 / Math.abs(sound._rate);
          var start = self2._sprite[sprite][0] / 1e3;
          var stop = (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3;
          sound._sprite = sprite;
          sound._ended = false;
          var setParams = function() {
            sound._paused = false;
            sound._seek = seek;
            sound._start = start;
            sound._stop = stop;
            sound._loop = !!(sound._loop || self2._sprite[sprite][2]);
          };
          if (seek >= stop) {
            self2._ended(sound);
            return;
          }
          var node = sound._node;
          if (self2._webAudio) {
            var playWebAudio = function() {
              self2._playLock = false;
              setParams();
              self2._refreshBuffer(sound);
              var vol = sound._muted || self2._muted ? 0 : sound._volume;
              node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
              sound._playStart = Howler3.ctx.currentTime;
              if (typeof node.bufferSource.start === "undefined") {
                sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
              } else {
                sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
              }
              if (timeout !== Infinity) {
                self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
              }
              if (!internal) {
                setTimeout(function() {
                  self2._emit("play", sound._id);
                  self2._loadQueue();
                }, 0);
              }
            };
            if (Howler3.state === "running" && Howler3.ctx.state !== "interrupted") {
              playWebAudio();
            } else {
              self2._playLock = true;
              self2.once("resume", playWebAudio);
              self2._clearTimer(sound._id);
            }
          } else {
            var playHtml5 = function() {
              node.currentTime = seek;
              node.muted = sound._muted || self2._muted || Howler3._muted || node.muted;
              node.volume = sound._volume * Howler3.volume();
              node.playbackRate = sound._rate;
              try {
                var play = node.play();
                if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                  self2._playLock = true;
                  setParams();
                  play.then(function() {
                    self2._playLock = false;
                    node._unlocked = true;
                    if (!internal) {
                      self2._emit("play", sound._id);
                    } else {
                      self2._loadQueue();
                    }
                  }).catch(function() {
                    self2._playLock = false;
                    self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    sound._ended = true;
                    sound._paused = true;
                  });
                } else if (!internal) {
                  self2._playLock = false;
                  setParams();
                  self2._emit("play", sound._id);
                }
                node.playbackRate = sound._rate;
                if (node.paused) {
                  self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                  return;
                }
                if (sprite !== "__default" || sound._loop) {
                  self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
                } else {
                  self2._endTimers[sound._id] = function() {
                    self2._ended(sound);
                    node.removeEventListener("ended", self2._endTimers[sound._id], false);
                  };
                  node.addEventListener("ended", self2._endTimers[sound._id], false);
                }
              } catch (err) {
                self2._emit("playerror", sound._id, err);
              }
            };
            if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
              node.src = self2._src;
              node.load();
            }
            var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler3._navigator.isCocoonJS;
            if (node.readyState >= 3 || loadedNoReadyState) {
              playHtml5();
            } else {
              self2._playLock = true;
              self2._state = "loading";
              var listener = function() {
                self2._state = "loaded";
                playHtml5();
                node.removeEventListener(Howler3._canPlayEvent, listener, false);
              };
              node.addEventListener(Howler3._canPlayEvent, listener, false);
              self2._clearTimer(sound._id);
            }
          }
          return sound._id;
        },
        /**
         * Pause playback and save current position.
         * @param  {Number} id The sound ID (empty to pause all in group).
         * @return {Howl}
         */
        pause: function(id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "pause",
              action: function() {
                self2.pause(id);
              }
            });
            return self2;
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            self2._clearTimer(ids[i]);
            var sound = self2._soundById(ids[i]);
            if (sound && !sound._paused) {
              sound._seek = self2.seek(ids[i]);
              sound._rateSeek = 0;
              sound._paused = true;
              self2._stopFade(ids[i]);
              if (sound._node) {
                if (self2._webAudio) {
                  if (!sound._node.bufferSource) {
                    continue;
                  }
                  if (typeof sound._node.bufferSource.stop === "undefined") {
                    sound._node.bufferSource.noteOff(0);
                  } else {
                    sound._node.bufferSource.stop(0);
                  }
                  self2._cleanBuffer(sound._node);
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.pause();
                }
              }
            }
            if (!arguments[1]) {
              self2._emit("pause", sound ? sound._id : null);
            }
          }
          return self2;
        },
        /**
         * Stop playback and reset to start.
         * @param  {Number} id The sound ID (empty to stop all in group).
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Howl}
         */
        stop: function(id, internal) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "stop",
              action: function() {
                self2.stop(id);
              }
            });
            return self2;
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            self2._clearTimer(ids[i]);
            var sound = self2._soundById(ids[i]);
            if (sound) {
              sound._seek = sound._start || 0;
              sound._rateSeek = 0;
              sound._paused = true;
              sound._ended = true;
              self2._stopFade(ids[i]);
              if (sound._node) {
                if (self2._webAudio) {
                  if (sound._node.bufferSource) {
                    if (typeof sound._node.bufferSource.stop === "undefined") {
                      sound._node.bufferSource.noteOff(0);
                    } else {
                      sound._node.bufferSource.stop(0);
                    }
                    self2._cleanBuffer(sound._node);
                  }
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.currentTime = sound._start || 0;
                  sound._node.pause();
                  if (sound._node.duration === Infinity) {
                    self2._clearSound(sound._node);
                  }
                }
              }
              if (!internal) {
                self2._emit("stop", sound._id);
              }
            }
          }
          return self2;
        },
        /**
         * Mute/unmute a single sound or all sounds in this Howl group.
         * @param  {Boolean} muted Set to true to mute and false to unmute.
         * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
         * @return {Howl}
         */
        mute: function(muted, id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "mute",
              action: function() {
                self2.mute(muted, id);
              }
            });
            return self2;
          }
          if (typeof id === "undefined") {
            if (typeof muted === "boolean") {
              self2._muted = muted;
            } else {
              return self2._muted;
            }
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound = self2._soundById(ids[i]);
            if (sound) {
              sound._muted = muted;
              if (sound._interval) {
                self2._stopFade(sound._id);
              }
              if (self2._webAudio && sound._node) {
                sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler3.ctx.currentTime);
              } else if (sound._node) {
                sound._node.muted = Howler3._muted ? true : muted;
              }
              self2._emit("mute", sound._id);
            }
          }
          return self2;
        },
        /**
         * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
         *   volume() -> Returns the group's volume value.
         *   volume(id) -> Returns the sound id's current volume.
         *   volume(vol) -> Sets the volume of all sounds in this Howl group.
         *   volume(vol, id) -> Sets the volume of passed sound id.
         * @return {Howl/Number} Returns self or current volume.
         */
        volume: function() {
          var self2 = this;
          var args = arguments;
          var vol, id;
          if (args.length === 0) {
            return self2._volume;
          } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              vol = parseFloat(args[0]);
            }
          } else if (args.length >= 2) {
            vol = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          var sound;
          if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "volume",
                action: function() {
                  self2.volume.apply(self2, args);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              self2._volume = vol;
            }
            id = self2._getSoundIds(id);
            for (var i = 0; i < id.length; i++) {
              sound = self2._soundById(id[i]);
              if (sound) {
                sound._volume = vol;
                if (!args[2]) {
                  self2._stopFade(id[i]);
                }
                if (self2._webAudio && sound._node && !sound._muted) {
                  sound._node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
                } else if (sound._node && !sound._muted) {
                  sound._node.volume = vol * Howler3.volume();
                }
                self2._emit("volume", sound._id);
              }
            }
          } else {
            sound = id ? self2._soundById(id) : self2._sounds[0];
            return sound ? sound._volume : 0;
          }
          return self2;
        },
        /**
         * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id (omit to fade all sounds).
         * @return {Howl}
         */
        fade: function(from, to, len, id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "fade",
              action: function() {
                self2.fade(from, to, len, id);
              }
            });
            return self2;
          }
          from = Math.min(Math.max(0, parseFloat(from)), 1);
          to = Math.min(Math.max(0, parseFloat(to)), 1);
          len = parseFloat(len);
          self2.volume(from, id);
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound = self2._soundById(ids[i]);
            if (sound) {
              if (!id) {
                self2._stopFade(ids[i]);
              }
              if (self2._webAudio && !sound._muted) {
                var currentTime = Howler3.ctx.currentTime;
                var end = currentTime + len / 1e3;
                sound._volume = from;
                sound._node.gain.setValueAtTime(from, currentTime);
                sound._node.gain.linearRampToValueAtTime(to, end);
              }
              self2._startFadeInterval(sound, from, to, len, ids[i], typeof id === "undefined");
            }
          }
          return self2;
        },
        /**
         * Starts the internal interval to fade a sound.
         * @param  {Object} sound Reference to sound to fade.
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id to fade.
         * @param  {Boolean} isGroup   If true, set the volume on the group.
         */
        _startFadeInterval: function(sound, from, to, len, id, isGroup) {
          var self2 = this;
          var vol = from;
          var diff = to - from;
          var steps = Math.abs(diff / 0.01);
          var stepLen = Math.max(4, steps > 0 ? len / steps : len);
          var lastTick = Date.now();
          sound._fadeTo = to;
          sound._interval = setInterval(function() {
            var tick = (Date.now() - lastTick) / len;
            lastTick = Date.now();
            vol += diff * tick;
            vol = Math.round(vol * 100) / 100;
            if (diff < 0) {
              vol = Math.max(to, vol);
            } else {
              vol = Math.min(to, vol);
            }
            if (self2._webAudio) {
              sound._volume = vol;
            } else {
              self2.volume(vol, sound._id, true);
            }
            if (isGroup) {
              self2._volume = vol;
            }
            if (to < from && vol <= to || to > from && vol >= to) {
              clearInterval(sound._interval);
              sound._interval = null;
              sound._fadeTo = null;
              self2.volume(to, sound._id);
              self2._emit("fade", sound._id);
            }
          }, stepLen);
        },
        /**
         * Internal method that stops the currently playing fade when
         * a new fade starts, volume is changed or the sound is stopped.
         * @param  {Number} id The sound id.
         * @return {Howl}
         */
        _stopFade: function(id) {
          var self2 = this;
          var sound = self2._soundById(id);
          if (sound && sound._interval) {
            if (self2._webAudio) {
              sound._node.gain.cancelScheduledValues(Howler3.ctx.currentTime);
            }
            clearInterval(sound._interval);
            sound._interval = null;
            self2.volume(sound._fadeTo, id);
            sound._fadeTo = null;
            self2._emit("fade", id);
          }
          return self2;
        },
        /**
         * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
         *   loop() -> Returns the group's loop value.
         *   loop(id) -> Returns the sound id's loop value.
         *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
         *   loop(loop, id) -> Sets the loop value of passed sound id.
         * @return {Howl/Boolean} Returns self or current loop value.
         */
        loop: function() {
          var self2 = this;
          var args = arguments;
          var loop, id, sound;
          if (args.length === 0) {
            return self2._loop;
          } else if (args.length === 1) {
            if (typeof args[0] === "boolean") {
              loop = args[0];
              self2._loop = loop;
            } else {
              sound = self2._soundById(parseInt(args[0], 10));
              return sound ? sound._loop : false;
            }
          } else if (args.length === 2) {
            loop = args[0];
            id = parseInt(args[1], 10);
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            sound = self2._soundById(ids[i]);
            if (sound) {
              sound._loop = loop;
              if (self2._webAudio && sound._node && sound._node.bufferSource) {
                sound._node.bufferSource.loop = loop;
                if (loop) {
                  sound._node.bufferSource.loopStart = sound._start || 0;
                  sound._node.bufferSource.loopEnd = sound._stop;
                  if (self2.playing(ids[i])) {
                    self2.pause(ids[i], true);
                    self2.play(ids[i], true);
                  }
                }
              }
            }
          }
          return self2;
        },
        /**
         * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   rate() -> Returns the first sound node's current playback rate.
         *   rate(id) -> Returns the sound id's current playback rate.
         *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
         *   rate(rate, id) -> Sets the playback rate of passed sound id.
         * @return {Howl/Number} Returns self or the current playback rate.
         */
        rate: function() {
          var self2 = this;
          var args = arguments;
          var rate, id;
          if (args.length === 0) {
            id = self2._sounds[0]._id;
          } else if (args.length === 1) {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              rate = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            rate = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          var sound;
          if (typeof rate === "number") {
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "rate",
                action: function() {
                  self2.rate.apply(self2, args);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              self2._rate = rate;
            }
            id = self2._getSoundIds(id);
            for (var i = 0; i < id.length; i++) {
              sound = self2._soundById(id[i]);
              if (sound) {
                if (self2.playing(id[i])) {
                  sound._rateSeek = self2.seek(id[i]);
                  sound._playStart = self2._webAudio ? Howler3.ctx.currentTime : sound._playStart;
                }
                sound._rate = rate;
                if (self2._webAudio && sound._node && sound._node.bufferSource) {
                  sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler3.ctx.currentTime);
                } else if (sound._node) {
                  sound._node.playbackRate = rate;
                }
                var seek = self2.seek(id[i]);
                var duration = (self2._sprite[sound._sprite][0] + self2._sprite[sound._sprite][1]) / 1e3 - seek;
                var timeout = duration * 1e3 / Math.abs(sound._rate);
                if (self2._endTimers[id[i]] || !sound._paused) {
                  self2._clearTimer(id[i]);
                  self2._endTimers[id[i]] = setTimeout(self2._ended.bind(self2, sound), timeout);
                }
                self2._emit("rate", sound._id);
              }
            }
          } else {
            sound = self2._soundById(id);
            return sound ? sound._rate : self2._rate;
          }
          return self2;
        },
        /**
         * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   seek() -> Returns the first sound node's current seek position.
         *   seek(id) -> Returns the sound id's current seek position.
         *   seek(seek) -> Sets the seek position of the first sound node.
         *   seek(seek, id) -> Sets the seek position of passed sound id.
         * @return {Howl/Number} Returns self or the current seek position.
         */
        seek: function() {
          var self2 = this;
          var args = arguments;
          var seek, id;
          if (args.length === 0) {
            if (self2._sounds.length) {
              id = self2._sounds[0]._id;
            }
          } else if (args.length === 1) {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else if (self2._sounds.length) {
              id = self2._sounds[0]._id;
              seek = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            seek = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          if (typeof id === "undefined") {
            return 0;
          }
          if (typeof seek === "number" && (self2._state !== "loaded" || self2._playLock)) {
            self2._queue.push({
              event: "seek",
              action: function() {
                self2.seek.apply(self2, args);
              }
            });
            return self2;
          }
          var sound = self2._soundById(id);
          if (sound) {
            if (typeof seek === "number" && seek >= 0) {
              var playing = self2.playing(id);
              if (playing) {
                self2.pause(id, true);
              }
              sound._seek = seek;
              sound._ended = false;
              self2._clearTimer(id);
              if (!self2._webAudio && sound._node && !isNaN(sound._node.duration)) {
                sound._node.currentTime = seek;
              }
              var seekAndEmit = function() {
                if (playing) {
                  self2.play(id, true);
                }
                self2._emit("seek", id);
              };
              if (playing && !self2._webAudio) {
                var emitSeek = function() {
                  if (!self2._playLock) {
                    seekAndEmit();
                  } else {
                    setTimeout(emitSeek, 0);
                  }
                };
                setTimeout(emitSeek, 0);
              } else {
                seekAndEmit();
              }
            } else {
              if (self2._webAudio) {
                var realTime = self2.playing(id) ? Howler3.ctx.currentTime - sound._playStart : 0;
                var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
                return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
              } else {
                return sound._node.currentTime;
              }
            }
          }
          return self2;
        },
        /**
         * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
         * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
         * @return {Boolean} True if playing and false if not.
         */
        playing: function(id) {
          var self2 = this;
          if (typeof id === "number") {
            var sound = self2._soundById(id);
            return sound ? !sound._paused : false;
          }
          for (var i = 0; i < self2._sounds.length; i++) {
            if (!self2._sounds[i]._paused) {
              return true;
            }
          }
          return false;
        },
        /**
         * Get the duration of this sound. Passing a sound id will return the sprite duration.
         * @param  {Number} id The sound id to check. If none is passed, return full source duration.
         * @return {Number} Audio duration in seconds.
         */
        duration: function(id) {
          var self2 = this;
          var duration = self2._duration;
          var sound = self2._soundById(id);
          if (sound) {
            duration = self2._sprite[sound._sprite][1] / 1e3;
          }
          return duration;
        },
        /**
         * Returns the current loaded state of this Howl.
         * @return {String} 'unloaded', 'loading', 'loaded'
         */
        state: function() {
          return this._state;
        },
        /**
         * Unload and destroy the current Howl object.
         * This will immediately stop all sound instances attached to this group.
         */
        unload: function() {
          var self2 = this;
          var sounds = self2._sounds;
          for (var i = 0; i < sounds.length; i++) {
            if (!sounds[i]._paused) {
              self2.stop(sounds[i]._id);
            }
            if (!self2._webAudio) {
              self2._clearSound(sounds[i]._node);
              sounds[i]._node.removeEventListener("error", sounds[i]._errorFn, false);
              sounds[i]._node.removeEventListener(Howler3._canPlayEvent, sounds[i]._loadFn, false);
              sounds[i]._node.removeEventListener("ended", sounds[i]._endFn, false);
              Howler3._releaseHtml5Audio(sounds[i]._node);
            }
            delete sounds[i]._node;
            self2._clearTimer(sounds[i]._id);
          }
          var index = Howler3._howls.indexOf(self2);
          if (index >= 0) {
            Howler3._howls.splice(index, 1);
          }
          var remCache = true;
          for (i = 0; i < Howler3._howls.length; i++) {
            if (Howler3._howls[i]._src === self2._src || self2._src.indexOf(Howler3._howls[i]._src) >= 0) {
              remCache = false;
              break;
            }
          }
          if (cache && remCache) {
            delete cache[self2._src];
          }
          Howler3.noAudio = false;
          self2._state = "unloaded";
          self2._sounds = [];
          self2 = null;
          return null;
        },
        /**
         * Listen to a custom event.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
         * @return {Howl}
         */
        on: function(event, fn, id, once) {
          var self2 = this;
          var events = self2["_on" + event];
          if (typeof fn === "function") {
            events.push(once ? { id, fn, once } : { id, fn });
          }
          return self2;
        },
        /**
         * Remove a custom event. Call without parameters to remove all events.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to remove. Leave empty to remove all.
         * @param  {Number}   id    (optional) Only remove events for this sound.
         * @return {Howl}
         */
        off: function(event, fn, id) {
          var self2 = this;
          var events = self2["_on" + event];
          var i = 0;
          if (typeof fn === "number") {
            id = fn;
            fn = null;
          }
          if (fn || id) {
            for (i = 0; i < events.length; i++) {
              var isId = id === events[i].id;
              if (fn === events[i].fn && isId || !fn && isId) {
                events.splice(i, 1);
                break;
              }
            }
          } else if (event) {
            self2["_on" + event] = [];
          } else {
            var keys = Object.keys(self2);
            for (i = 0; i < keys.length; i++) {
              if (keys[i].indexOf("_on") === 0 && Array.isArray(self2[keys[i]])) {
                self2[keys[i]] = [];
              }
            }
          }
          return self2;
        },
        /**
         * Listen to a custom event and remove it once fired.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @return {Howl}
         */
        once: function(event, fn, id) {
          var self2 = this;
          self2.on(event, fn, id, 1);
          return self2;
        },
        /**
         * Emit all events of a specific type and pass the sound id.
         * @param  {String} event Event name.
         * @param  {Number} id    Sound ID.
         * @param  {Number} msg   Message to go with event.
         * @return {Howl}
         */
        _emit: function(event, id, msg) {
          var self2 = this;
          var events = self2["_on" + event];
          for (var i = events.length - 1; i >= 0; i--) {
            if (!events[i].id || events[i].id === id || event === "load") {
              setTimeout(function(fn) {
                fn.call(this, id, msg);
              }.bind(self2, events[i].fn), 0);
              if (events[i].once) {
                self2.off(event, events[i].fn, events[i].id);
              }
            }
          }
          self2._loadQueue(event);
          return self2;
        },
        /**
         * Queue of actions initiated before the sound has loaded.
         * These will be called in sequence, with the next only firing
         * after the previous has finished executing (even if async like play).
         * @return {Howl}
         */
        _loadQueue: function(event) {
          var self2 = this;
          if (self2._queue.length > 0) {
            var task = self2._queue[0];
            if (task.event === event) {
              self2._queue.shift();
              self2._loadQueue();
            }
            if (!event) {
              task.action();
            }
          }
          return self2;
        },
        /**
         * Fired when playback ends at the end of the duration.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _ended: function(sound) {
          var self2 = this;
          var sprite = sound._sprite;
          if (!self2._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
            setTimeout(self2._ended.bind(self2, sound), 100);
            return self2;
          }
          var loop = !!(sound._loop || self2._sprite[sprite][2]);
          self2._emit("end", sound._id);
          if (!self2._webAudio && loop) {
            self2.stop(sound._id, true).play(sound._id);
          }
          if (self2._webAudio && loop) {
            self2._emit("play", sound._id);
            sound._seek = sound._start || 0;
            sound._rateSeek = 0;
            sound._playStart = Howler3.ctx.currentTime;
            var timeout = (sound._stop - sound._start) * 1e3 / Math.abs(sound._rate);
            self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
          }
          if (self2._webAudio && !loop) {
            sound._paused = true;
            sound._ended = true;
            sound._seek = sound._start || 0;
            sound._rateSeek = 0;
            self2._clearTimer(sound._id);
            self2._cleanBuffer(sound._node);
            Howler3._autoSuspend();
          }
          if (!self2._webAudio && !loop) {
            self2.stop(sound._id, true);
          }
          return self2;
        },
        /**
         * Clear the end timer for a sound playback.
         * @param  {Number} id The sound ID.
         * @return {Howl}
         */
        _clearTimer: function(id) {
          var self2 = this;
          if (self2._endTimers[id]) {
            if (typeof self2._endTimers[id] !== "function") {
              clearTimeout(self2._endTimers[id]);
            } else {
              var sound = self2._soundById(id);
              if (sound && sound._node) {
                sound._node.removeEventListener("ended", self2._endTimers[id], false);
              }
            }
            delete self2._endTimers[id];
          }
          return self2;
        },
        /**
         * Return the sound identified by this ID, or return null.
         * @param  {Number} id Sound ID
         * @return {Object}    Sound object or null.
         */
        _soundById: function(id) {
          var self2 = this;
          for (var i = 0; i < self2._sounds.length; i++) {
            if (id === self2._sounds[i]._id) {
              return self2._sounds[i];
            }
          }
          return null;
        },
        /**
         * Return an inactive sound from the pool or create a new one.
         * @return {Sound} Sound playback object.
         */
        _inactiveSound: function() {
          var self2 = this;
          self2._drain();
          for (var i = 0; i < self2._sounds.length; i++) {
            if (self2._sounds[i]._ended) {
              return self2._sounds[i].reset();
            }
          }
          return new Sound2(self2);
        },
        /**
         * Drain excess inactive sounds from the pool.
         */
        _drain: function() {
          var self2 = this;
          var limit = self2._pool;
          var cnt = 0;
          var i = 0;
          if (self2._sounds.length < limit) {
            return;
          }
          for (i = 0; i < self2._sounds.length; i++) {
            if (self2._sounds[i]._ended) {
              cnt++;
            }
          }
          for (i = self2._sounds.length - 1; i >= 0; i--) {
            if (cnt <= limit) {
              return;
            }
            if (self2._sounds[i]._ended) {
              if (self2._webAudio && self2._sounds[i]._node) {
                self2._sounds[i]._node.disconnect(0);
              }
              self2._sounds.splice(i, 1);
              cnt--;
            }
          }
        },
        /**
         * Get all ID's from the sounds pool.
         * @param  {Number} id Only return one ID if one is passed.
         * @return {Array}    Array of IDs.
         */
        _getSoundIds: function(id) {
          var self2 = this;
          if (typeof id === "undefined") {
            var ids = [];
            for (var i = 0; i < self2._sounds.length; i++) {
              ids.push(self2._sounds[i]._id);
            }
            return ids;
          } else {
            return [id];
          }
        },
        /**
         * Load the sound back into the buffer source.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _refreshBuffer: function(sound) {
          var self2 = this;
          sound._node.bufferSource = Howler3.ctx.createBufferSource();
          sound._node.bufferSource.buffer = cache[self2._src];
          if (sound._panner) {
            sound._node.bufferSource.connect(sound._panner);
          } else {
            sound._node.bufferSource.connect(sound._node);
          }
          sound._node.bufferSource.loop = sound._loop;
          if (sound._loop) {
            sound._node.bufferSource.loopStart = sound._start || 0;
            sound._node.bufferSource.loopEnd = sound._stop || 0;
          }
          sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler3.ctx.currentTime);
          return self2;
        },
        /**
         * Prevent memory leaks by cleaning up the buffer source after playback.
         * @param  {Object} node Sound's audio node containing the buffer source.
         * @return {Howl}
         */
        _cleanBuffer: function(node) {
          var self2 = this;
          var isIOS = Howler3._navigator && Howler3._navigator.vendor.indexOf("Apple") >= 0;
          if (!node.bufferSource) {
            return self2;
          }
          if (Howler3._scratchBuffer && node.bufferSource) {
            node.bufferSource.onended = null;
            node.bufferSource.disconnect(0);
            if (isIOS) {
              try {
                node.bufferSource.buffer = Howler3._scratchBuffer;
              } catch (e) {
              }
            }
          }
          node.bufferSource = null;
          return self2;
        },
        /**
         * Set the source to a 0-second silence to stop any downloading (except in IE).
         * @param  {Object} node Audio node to clear.
         */
        _clearSound: function(node) {
          var checkIE = /MSIE |Trident\//.test(Howler3._navigator && Howler3._navigator.userAgent);
          if (!checkIE) {
            node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
          }
        }
      };
      var Sound2 = function(howl) {
        this._parent = howl;
        this.init();
      };
      Sound2.prototype = {
        /**
         * Initialize a new Sound object.
         * @return {Sound}
         */
        init: function() {
          var self2 = this;
          var parent = self2._parent;
          self2._muted = parent._muted;
          self2._loop = parent._loop;
          self2._volume = parent._volume;
          self2._rate = parent._rate;
          self2._seek = 0;
          self2._paused = true;
          self2._ended = true;
          self2._sprite = "__default";
          self2._id = ++Howler3._counter;
          parent._sounds.push(self2);
          self2.create();
          return self2;
        },
        /**
         * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
         * @return {Sound}
         */
        create: function() {
          var self2 = this;
          var parent = self2._parent;
          var volume = Howler3._muted || self2._muted || self2._parent._muted ? 0 : self2._volume;
          if (parent._webAudio) {
            self2._node = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
            self2._node.gain.setValueAtTime(volume, Howler3.ctx.currentTime);
            self2._node.paused = true;
            self2._node.connect(Howler3.masterGain);
          } else if (!Howler3.noAudio) {
            self2._node = Howler3._obtainHtml5Audio();
            self2._errorFn = self2._errorListener.bind(self2);
            self2._node.addEventListener("error", self2._errorFn, false);
            self2._loadFn = self2._loadListener.bind(self2);
            self2._node.addEventListener(Howler3._canPlayEvent, self2._loadFn, false);
            self2._endFn = self2._endListener.bind(self2);
            self2._node.addEventListener("ended", self2._endFn, false);
            self2._node.src = parent._src;
            self2._node.preload = parent._preload === true ? "auto" : parent._preload;
            self2._node.volume = volume * Howler3.volume();
            self2._node.load();
          }
          return self2;
        },
        /**
         * Reset the parameters of this sound to the original state (for recycle).
         * @return {Sound}
         */
        reset: function() {
          var self2 = this;
          var parent = self2._parent;
          self2._muted = parent._muted;
          self2._loop = parent._loop;
          self2._volume = parent._volume;
          self2._rate = parent._rate;
          self2._seek = 0;
          self2._rateSeek = 0;
          self2._paused = true;
          self2._ended = true;
          self2._sprite = "__default";
          self2._id = ++Howler3._counter;
          return self2;
        },
        /**
         * HTML5 Audio error listener callback.
         */
        _errorListener: function() {
          var self2 = this;
          self2._parent._emit("loaderror", self2._id, self2._node.error ? self2._node.error.code : 0);
          self2._node.removeEventListener("error", self2._errorFn, false);
        },
        /**
         * HTML5 Audio canplaythrough listener callback.
         */
        _loadListener: function() {
          var self2 = this;
          var parent = self2._parent;
          parent._duration = Math.ceil(self2._node.duration * 10) / 10;
          if (Object.keys(parent._sprite).length === 0) {
            parent._sprite = { __default: [0, parent._duration * 1e3] };
          }
          if (parent._state !== "loaded") {
            parent._state = "loaded";
            parent._emit("load");
            parent._loadQueue();
          }
          self2._node.removeEventListener(Howler3._canPlayEvent, self2._loadFn, false);
        },
        /**
         * HTML5 Audio ended listener callback.
         */
        _endListener: function() {
          var self2 = this;
          var parent = self2._parent;
          if (parent._duration === Infinity) {
            parent._duration = Math.ceil(self2._node.duration * 10) / 10;
            if (parent._sprite.__default[1] === Infinity) {
              parent._sprite.__default[1] = parent._duration * 1e3;
            }
            parent._ended(self2);
          }
          self2._node.removeEventListener("ended", self2._endFn, false);
        }
      };
      var cache = {};
      var loadBuffer = function(self2) {
        var url = self2._src;
        if (cache[url]) {
          self2._duration = cache[url].duration;
          loadSound(self2);
          return;
        }
        if (/^data:[^;]+;base64,/.test(url)) {
          var data = atob(url.split(",")[1]);
          var dataView = new Uint8Array(data.length);
          for (var i = 0; i < data.length; ++i) {
            dataView[i] = data.charCodeAt(i);
          }
          decodeAudioData(dataView.buffer, self2);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open(self2._xhr.method, url, true);
          xhr.withCredentials = self2._xhr.withCredentials;
          xhr.responseType = "arraybuffer";
          if (self2._xhr.headers) {
            Object.keys(self2._xhr.headers).forEach(function(key) {
              xhr.setRequestHeader(key, self2._xhr.headers[key]);
            });
          }
          xhr.onload = function() {
            var code = (xhr.status + "")[0];
            if (code !== "0" && code !== "2" && code !== "3") {
              self2._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
              return;
            }
            decodeAudioData(xhr.response, self2);
          };
          xhr.onerror = function() {
            if (self2._webAudio) {
              self2._html5 = true;
              self2._webAudio = false;
              self2._sounds = [];
              delete cache[url];
              self2.load();
            }
          };
          safeXhrSend(xhr);
        }
      };
      var safeXhrSend = function(xhr) {
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      };
      var decodeAudioData = function(arraybuffer, self2) {
        var error = function() {
          self2._emit("loaderror", null, "Decoding audio data failed.");
        };
        var success = function(buffer) {
          if (buffer && self2._sounds.length > 0) {
            cache[self2._src] = buffer;
            loadSound(self2, buffer);
          } else {
            error();
          }
        };
        if (typeof Promise !== "undefined" && Howler3.ctx.decodeAudioData.length === 1) {
          Howler3.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
        } else {
          Howler3.ctx.decodeAudioData(arraybuffer, success, error);
        }
      };
      var loadSound = function(self2, buffer) {
        if (buffer && !self2._duration) {
          self2._duration = buffer.duration;
        }
        if (Object.keys(self2._sprite).length === 0) {
          self2._sprite = { __default: [0, self2._duration * 1e3] };
        }
        if (self2._state !== "loaded") {
          self2._state = "loaded";
          self2._emit("load");
          self2._loadQueue();
        }
      };
      var setupAudioContext = function() {
        if (!Howler3.usingWebAudio) {
          return;
        }
        try {
          if (typeof AudioContext !== "undefined") {
            Howler3.ctx = new AudioContext();
          } else if (typeof webkitAudioContext !== "undefined") {
            Howler3.ctx = new webkitAudioContext();
          } else {
            Howler3.usingWebAudio = false;
          }
        } catch (e) {
          Howler3.usingWebAudio = false;
        }
        if (!Howler3.ctx) {
          Howler3.usingWebAudio = false;
        }
        var iOS = /iP(hone|od|ad)/.test(Howler3._navigator && Howler3._navigator.platform);
        var appVersion = Howler3._navigator && Howler3._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        var version = appVersion ? parseInt(appVersion[1], 10) : null;
        if (iOS && version && version < 9) {
          var safari = /safari/.test(Howler3._navigator && Howler3._navigator.userAgent.toLowerCase());
          if (Howler3._navigator && !safari) {
            Howler3.usingWebAudio = false;
          }
        }
        if (Howler3.usingWebAudio) {
          Howler3.masterGain = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
          Howler3.masterGain.gain.setValueAtTime(Howler3._muted ? 0 : Howler3._volume, Howler3.ctx.currentTime);
          Howler3.masterGain.connect(Howler3.ctx.destination);
        }
        Howler3._setup();
      };
      if (typeof define === "function" && define.amd) {
        define([], function() {
          return {
            Howler: Howler3,
            Howl: Howl3
          };
        });
      }
      if (typeof exports !== "undefined") {
        exports.Howler = Howler3;
        exports.Howl = Howl3;
      }
      if (typeof global !== "undefined") {
        global.HowlerGlobal = HowlerGlobal2;
        global.Howler = Howler3;
        global.Howl = Howl3;
        global.Sound = Sound2;
      } else if (typeof window !== "undefined") {
        window.HowlerGlobal = HowlerGlobal2;
        window.Howler = Howler3;
        window.Howl = Howl3;
        window.Sound = Sound2;
      }
    })();
    (function() {
      "use strict";
      HowlerGlobal.prototype._pos = [0, 0, 0];
      HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
      HowlerGlobal.prototype.stereo = function(pan) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        for (var i = self2._howls.length - 1; i >= 0; i--) {
          self2._howls[i].stereo(pan);
        }
        return self2;
      };
      HowlerGlobal.prototype.pos = function(x, y, z) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        y = typeof y !== "number" ? self2._pos[1] : y;
        z = typeof z !== "number" ? self2._pos[2] : z;
        if (typeof x === "number") {
          self2._pos = [x, y, z];
          if (typeof self2.ctx.listener.positionX !== "undefined") {
            self2.ctx.listener.positionX.setTargetAtTime(self2._pos[0], Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.positionY.setTargetAtTime(self2._pos[1], Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.positionZ.setTargetAtTime(self2._pos[2], Howler.ctx.currentTime, 0.1);
          } else {
            self2.ctx.listener.setPosition(self2._pos[0], self2._pos[1], self2._pos[2]);
          }
        } else {
          return self2._pos;
        }
        return self2;
      };
      HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        var or = self2._orientation;
        y = typeof y !== "number" ? or[1] : y;
        z = typeof z !== "number" ? or[2] : z;
        xUp = typeof xUp !== "number" ? or[3] : xUp;
        yUp = typeof yUp !== "number" ? or[4] : yUp;
        zUp = typeof zUp !== "number" ? or[5] : zUp;
        if (typeof x === "number") {
          self2._orientation = [x, y, z, xUp, yUp, zUp];
          if (typeof self2.ctx.listener.forwardX !== "undefined") {
            self2.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
          } else {
            self2.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
          }
        } else {
          return or;
        }
        return self2;
      };
      Howl.prototype.init = /* @__PURE__ */ (function(_super) {
        return function(o) {
          var self2 = this;
          self2._orientation = o.orientation || [1, 0, 0];
          self2._stereo = o.stereo || null;
          self2._pos = o.pos || null;
          self2._pannerAttr = {
            coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : 360,
            coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : 360,
            coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : 0,
            distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : "inverse",
            maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : 1e4,
            panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : "HRTF",
            refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : 1,
            rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : 1
          };
          self2._onstereo = o.onstereo ? [{ fn: o.onstereo }] : [];
          self2._onpos = o.onpos ? [{ fn: o.onpos }] : [];
          self2._onorientation = o.onorientation ? [{ fn: o.onorientation }] : [];
          return _super.call(this, o);
        };
      })(Howl.prototype.init);
      Howl.prototype.stereo = function(pan, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "stereo",
            action: function() {
              self2.stereo(pan, id);
            }
          });
          return self2;
        }
        var pannerType = typeof Howler.ctx.createStereoPanner === "undefined" ? "spatial" : "stereo";
        if (typeof id === "undefined") {
          if (typeof pan === "number") {
            self2._stereo = pan;
            self2._pos = [pan, 0, 0];
          } else {
            return self2._stereo;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          var sound = self2._soundById(ids[i]);
          if (sound) {
            if (typeof pan === "number") {
              sound._stereo = pan;
              sound._pos = [pan, 0, 0];
              if (sound._node) {
                sound._pannerAttr.panningModel = "equalpower";
                if (!sound._panner || !sound._panner.pan) {
                  setupPanner(sound, pannerType);
                }
                if (pannerType === "spatial") {
                  if (typeof sound._panner.positionX !== "undefined") {
                    sound._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                    sound._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                    sound._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                  } else {
                    sound._panner.setPosition(pan, 0, 0);
                  }
                } else {
                  sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                }
              }
              self2._emit("stereo", sound._id);
            } else {
              return sound._stereo;
            }
          }
        }
        return self2;
      };
      Howl.prototype.pos = function(x, y, z, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "pos",
            action: function() {
              self2.pos(x, y, z, id);
            }
          });
          return self2;
        }
        y = typeof y !== "number" ? 0 : y;
        z = typeof z !== "number" ? -0.5 : z;
        if (typeof id === "undefined") {
          if (typeof x === "number") {
            self2._pos = [x, y, z];
          } else {
            return self2._pos;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          var sound = self2._soundById(ids[i]);
          if (sound) {
            if (typeof x === "number") {
              sound._pos = [x, y, z];
              if (sound._node) {
                if (!sound._panner || sound._panner.pan) {
                  setupPanner(sound, "spatial");
                }
                if (typeof sound._panner.positionX !== "undefined") {
                  sound._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);
                  sound._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);
                  sound._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setPosition(x, y, z);
                }
              }
              self2._emit("pos", sound._id);
            } else {
              return sound._pos;
            }
          }
        }
        return self2;
      };
      Howl.prototype.orientation = function(x, y, z, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "orientation",
            action: function() {
              self2.orientation(x, y, z, id);
            }
          });
          return self2;
        }
        y = typeof y !== "number" ? self2._orientation[1] : y;
        z = typeof z !== "number" ? self2._orientation[2] : z;
        if (typeof id === "undefined") {
          if (typeof x === "number") {
            self2._orientation = [x, y, z];
          } else {
            return self2._orientation;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          var sound = self2._soundById(ids[i]);
          if (sound) {
            if (typeof x === "number") {
              sound._orientation = [x, y, z];
              if (sound._node) {
                if (!sound._panner) {
                  if (!sound._pos) {
                    sound._pos = self2._pos || [0, 0, -0.5];
                  }
                  setupPanner(sound, "spatial");
                }
                if (typeof sound._panner.orientationX !== "undefined") {
                  sound._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);
                  sound._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);
                  sound._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setOrientation(x, y, z);
                }
              }
              self2._emit("orientation", sound._id);
            } else {
              return sound._orientation;
            }
          }
        }
        return self2;
      };
      Howl.prototype.pannerAttr = function() {
        var self2 = this;
        var args = arguments;
        var o, id, sound;
        if (!self2._webAudio) {
          return self2;
        }
        if (args.length === 0) {
          return self2._pannerAttr;
        } else if (args.length === 1) {
          if (typeof args[0] === "object") {
            o = args[0];
            if (typeof id === "undefined") {
              if (!o.pannerAttr) {
                o.pannerAttr = {
                  coneInnerAngle: o.coneInnerAngle,
                  coneOuterAngle: o.coneOuterAngle,
                  coneOuterGain: o.coneOuterGain,
                  distanceModel: o.distanceModel,
                  maxDistance: o.maxDistance,
                  refDistance: o.refDistance,
                  rolloffFactor: o.rolloffFactor,
                  panningModel: o.panningModel
                };
              }
              self2._pannerAttr = {
                coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== "undefined" ? o.pannerAttr.coneInnerAngle : self2._coneInnerAngle,
                coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== "undefined" ? o.pannerAttr.coneOuterAngle : self2._coneOuterAngle,
                coneOuterGain: typeof o.pannerAttr.coneOuterGain !== "undefined" ? o.pannerAttr.coneOuterGain : self2._coneOuterGain,
                distanceModel: typeof o.pannerAttr.distanceModel !== "undefined" ? o.pannerAttr.distanceModel : self2._distanceModel,
                maxDistance: typeof o.pannerAttr.maxDistance !== "undefined" ? o.pannerAttr.maxDistance : self2._maxDistance,
                refDistance: typeof o.pannerAttr.refDistance !== "undefined" ? o.pannerAttr.refDistance : self2._refDistance,
                rolloffFactor: typeof o.pannerAttr.rolloffFactor !== "undefined" ? o.pannerAttr.rolloffFactor : self2._rolloffFactor,
                panningModel: typeof o.pannerAttr.panningModel !== "undefined" ? o.pannerAttr.panningModel : self2._panningModel
              };
            }
          } else {
            sound = self2._soundById(parseInt(args[0], 10));
            return sound ? sound._pannerAttr : self2._pannerAttr;
          }
        } else if (args.length === 2) {
          o = args[0];
          id = parseInt(args[1], 10);
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          sound = self2._soundById(ids[i]);
          if (sound) {
            var pa = sound._pannerAttr;
            pa = {
              coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : pa.coneInnerAngle,
              coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : pa.coneOuterAngle,
              coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : pa.coneOuterGain,
              distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : pa.distanceModel,
              maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : pa.maxDistance,
              refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : pa.refDistance,
              rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : pa.rolloffFactor,
              panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : pa.panningModel
            };
            var panner = sound._panner;
            if (!panner) {
              if (!sound._pos) {
                sound._pos = self2._pos || [0, 0, -0.5];
              }
              setupPanner(sound, "spatial");
              panner = sound._panner;
            }
            panner.coneInnerAngle = pa.coneInnerAngle;
            panner.coneOuterAngle = pa.coneOuterAngle;
            panner.coneOuterGain = pa.coneOuterGain;
            panner.distanceModel = pa.distanceModel;
            panner.maxDistance = pa.maxDistance;
            panner.refDistance = pa.refDistance;
            panner.rolloffFactor = pa.rolloffFactor;
            panner.panningModel = pa.panningModel;
          }
        }
        return self2;
      };
      Sound.prototype.init = /* @__PURE__ */ (function(_super) {
        return function() {
          var self2 = this;
          var parent = self2._parent;
          self2._orientation = parent._orientation;
          self2._stereo = parent._stereo;
          self2._pos = parent._pos;
          self2._pannerAttr = parent._pannerAttr;
          _super.call(this);
          if (self2._stereo) {
            parent.stereo(self2._stereo);
          } else if (self2._pos) {
            parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
          }
        };
      })(Sound.prototype.init);
      Sound.prototype.reset = /* @__PURE__ */ (function(_super) {
        return function() {
          var self2 = this;
          var parent = self2._parent;
          self2._orientation = parent._orientation;
          self2._stereo = parent._stereo;
          self2._pos = parent._pos;
          self2._pannerAttr = parent._pannerAttr;
          if (self2._stereo) {
            parent.stereo(self2._stereo);
          } else if (self2._pos) {
            parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
          } else if (self2._panner) {
            self2._panner.disconnect(0);
            self2._panner = void 0;
            parent._refreshBuffer(self2);
          }
          return _super.call(this);
        };
      })(Sound.prototype.reset);
      var setupPanner = function(sound, type) {
        type = type || "spatial";
        if (type === "spatial") {
          sound._panner = Howler.ctx.createPanner();
          sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
          sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
          sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
          sound._panner.distanceModel = sound._pannerAttr.distanceModel;
          sound._panner.maxDistance = sound._pannerAttr.maxDistance;
          sound._panner.refDistance = sound._pannerAttr.refDistance;
          sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
          sound._panner.panningModel = sound._pannerAttr.panningModel;
          if (typeof sound._panner.positionX !== "undefined") {
            sound._panner.positionX.setValueAtTime(sound._pos[0], Howler.ctx.currentTime);
            sound._panner.positionY.setValueAtTime(sound._pos[1], Howler.ctx.currentTime);
            sound._panner.positionZ.setValueAtTime(sound._pos[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
          }
          if (typeof sound._panner.orientationX !== "undefined") {
            sound._panner.orientationX.setValueAtTime(sound._orientation[0], Howler.ctx.currentTime);
            sound._panner.orientationY.setValueAtTime(sound._orientation[1], Howler.ctx.currentTime);
            sound._panner.orientationZ.setValueAtTime(sound._orientation[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
          }
        } else {
          sound._panner = Howler.ctx.createStereoPanner();
          sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
        }
        sound._panner.connect(sound._node);
        if (!sound._paused) {
          sound._parent.pause(sound._id, true).play(sound._id, true);
        }
      };
    })();
  }
});

// src/spelling-bee-game.tsx
var import_react27 = __toESM(require_react());
var import_client = __toESM(require_client());

// src/LeaderboardScreen.tsx
var import_react = __toESM(require_react());

// src/config.ts
var config = {
  publicUrl: "",
  baseUrl: "/spelling-bee-game/",
  githubToken: "",
  githubApiUrl: "https://api.github.com/models/gpt-4o-mini-instruct",
  elevenLabsApiKey: "",
  newsApiKey: "",
  openAiApiKey: "",
  isProduction: false
};

// src/LeaderboardScreen.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var LeaderboardScreen = ({ onBack }) => {
  const [entries, setEntries] = (0, import_react.useState)([]);
  const [error, setError] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    const storedData = localStorage.getItem("leaderboard");
    if (storedData) {
      const parsedEntries = JSON.parse(storedData);
      const sorted = parsedEntries.sort((a, b) => b.score - a.score).slice(0, 10);
      setEntries(sorted);
    } else {
      fetch("leaderboard.json").then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      }).then((data) => {
        const sorted = data.sort((a, b) => b.score - a.score).slice(0, 10);
        setEntries(sorted);
        setError("");
      }).catch((err) => {
        console.error("Could not load default leaderboard", err);
        setError("Failed to load leaderboard.");
      });
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (localStorage.getItem("teacherMode") === "true") {
      document.body.classList.add("teacher-mode");
    } else {
      document.body.classList.remove("teacher-mode");
    }
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "screen-container bg-gradient-to-br from-gray-700 to-gray-900 text-white text-center flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "screen-title text-yellow-300 mb-8", children: "\u{1F3C5} Leaderboard" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-white/10 p-8 rounded-lg w-full max-w-md scorecard", children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xl text-error", children: error }) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xl text-on-surface-variant", children: "No scores yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "text-lg space-y-3", children: entries.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex justify-between items-center py-2 px-3 rounded-lg bg-surface-container-low", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center font-medium", children: [
        index < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2 text-primary", children: ["\u{1F947}", "\u{1F948}", "\u{1F949}"][index] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "img",
          {
            src: `${config.baseUrl}img/avatars/${entry.name}.png`,
            alt: `${entry.name}'s avatar`,
            className: "w-8 h-8 rounded-full mr-3"
          }
        ),
        index + 1,
        ". ",
        entry.name
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-primary font-bold", children: entry.score })
    ] }, index)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: onBack,
        className: "mt-8 bg-blue-500 hover:bg-blue-600 btn-responsive font-bold block mx-auto rounded-xl",
        children: "Back"
      }
    )
  ] });
};
var LeaderboardScreen_default = LeaderboardScreen;

// src/SetupScreen.tsx
var import_react3 = __toESM(require_react());

// src/assets.ts
var assetUrl = (path) => {
  return path.startsWith("assets/") ? path : `assets/${path}`;
};
var AUDIO_ASSETS = {
  // Music tracks
  music: {
    victory: assetUrl("assets/audio/victory-music.mp3"),
    country: assetUrl("assets/audio/spelling-bee-country.mp3"),
    countryInstrumental: assetUrl("assets/audio/spelling-bee-country-instrumental.mp3"),
    deepBass: assetUrl("assets/audio/spelling-bee-deep-bass.mp3"),
    deepBassInstrumental: assetUrl("assets/audio/spelling-bee-deep-bass-instrumental.mp3"),
    funk: assetUrl("assets/audio/spelling-bee-funk.mp3"),
    funkInstrumental: assetUrl("assets/audio/spelling-bee-funk-instrumental.mp3"),
    latin: assetUrl("assets/audio/spelling-bee-latin.mp3"),
    latinInstrumental: assetUrl("assets/audio/spelling-bee-latin-instrumental.mp3"),
    rock: assetUrl("assets/audio/spelling-bee-rock.mp3"),
    rockInstrumental: assetUrl("assets/audio/spelling-bee-rock-instrumental.mp3"),
    spooky: assetUrl("assets/audio/spelling-bee-spooky.mp3"),
    spookyInstrumental: assetUrl("assets/audio/spelling-bee-spooky-instrumental.mp3"),
    techHouse: assetUrl("assets/audio/spelling-bee-tech-house.mp3"),
    techHouseInstrumental: assetUrl("assets/audio/spelling-bee-tech-house-instrumental.mp3")
  },
  // Sound effects
  sfx: {
    applause: assetUrl("assets/audio/applause.mp3"),
    buzzer: assetUrl("assets/audio/buzzer.mp3"),
    buzzer2: assetUrl("assets/audio/buzzer2.mp3"),
    cheer: assetUrl("assets/audio/cheer.mp3"),
    correct: assetUrl("assets/audio/correct.mp3"),
    wrong: assetUrl("assets/audio/wrong.mp3"),
    letterCorrect: assetUrl("assets/audio/letter-correct.mp3"),
    letterWrong: assetUrl("assets/audio/letter-wrong.mp3"),
    loseLife: assetUrl("assets/audio/lose-life.mp3"),
    shop: assetUrl("assets/audio/shop.mp3"),
    timeout: assetUrl("assets/audio/timeout.mp3"),
    davidGreatSpelling: assetUrl("assets/audio/david-great-spelling.mp3")
  }
};
var IMAGE_ASSETS = {
  // Main bee mascot images
  bee: {
    default: assetUrl("assets/img/default-bee.png"),
    help: assetUrl("assets/img/help-bee.png"),
    typing: assetUrl("assets/img/typing-bee.png"),
    celebratory: assetUrl("assets/img/celebratory-bee.png"),
    winning: assetUrl("assets/img/winning-bee.png"),
    wrongAnswer: assetUrl("assets/img/wrong-answer-bee.png"),
    flying: assetUrl("assets/img/flying-bee.png"),
    shopping: assetUrl("assets/img/shopping-bee.png"),
    timePressure: assetUrl("assets/img/time-pressure-bee.png")
  },
  // Avatar icons
  avatars: {
    bee: assetUrl("assets/img/avatars/bee.svg"),
    book: assetUrl("assets/img/avatars/book.svg"),
    trophy: assetUrl("assets/img/avatars/trophy.svg")
  },
  // Achievement icons
  achievements: {
    firstWin: assetUrl("assets/img/achievements/first-win.svg")
  },
  // App icon
  app: {
    icon: assetUrl("assets/img/app-icon.png")
  }
};

// src/utils/parseWordList.ts
var REQUIRED_FIELDS = ["word", "definition"];
var VALID_DIFFICULTIES = /* @__PURE__ */ new Set(["easy", "medium", "hard"]);
function cleanHeader(value) {
  return value.trim().replace(/^"|"$/g, "");
}
function parseDelimitedLine(line, delimiter) {
  const values = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];
    if (char === "\\" && next === '"') {
      current += '"';
      i++;
      continue;
    }
    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
        continue;
      }
      const following = line[i + 1];
      const isBoundary = following === delimiter || following === void 0 || following === "\r";
      if (!inQuotes || isBoundary) {
        inQuotes = !inQuotes;
      } else {
        current += char;
      }
      continue;
    }
    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current.trim());
  return values.map((value) => value.replace(/^"|"$/g, "").trim());
}
function parseSyllables(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) {
    if (value.startsWith("[")) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      } catch {
      }
    }
    return value.split(/[-·|]/).map((s) => s.trim()).filter(Boolean);
  }
  return null;
}
function normalizeDifficulty(value) {
  if (typeof value === "string") {
    const lower = value.toLowerCase();
    if (lower === "tricky") return "hard";
    if (VALID_DIFFICULTIES.has(lower)) return lower;
  }
  return void 0;
}
function validateWords(words) {
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    for (const field of REQUIRED_FIELDS) {
      if (!w[field]) {
        throw new Error(`Word at index ${i} is missing required field '${field}'`);
      }
    }
  }
}
function normalizeWord(raw) {
  return {
    word: String(raw.word ?? ""),
    definition: raw.definition != null ? String(raw.definition) : null,
    syllables: parseSyllables(raw.syllables),
    phonemes: Array.isArray(raw.phonemes) ? raw.phonemes : null,
    origin: raw.origin != null ? String(raw.origin) : null,
    example: raw.example != null ? String(raw.example) : null,
    prefix: raw.prefix != null ? String(raw.prefix) : void 0,
    suffix: raw.suffix != null ? String(raw.suffix) : void 0,
    prefixMeaning: raw.prefixMeaning != null ? String(raw.prefixMeaning) : void 0,
    suffixMeaning: raw.suffixMeaning != null ? String(raw.suffixMeaning) : void 0,
    pronunciation: raw.pronunciation != null ? String(raw.pronunciation) : void 0,
    source: raw.source != null ? String(raw.source) : void 0,
    difficulty: normalizeDifficulty(raw.difficulty)
  };
}
function parseWordList(content) {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      const words2 = parsed;
      validateWords(words2);
      return words2.map(normalizeWord);
    }
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const flat = [];
      for (const [category, items] of Object.entries(parsed)) {
        if (Array.isArray(items)) {
          for (const w of items) {
            if (w && typeof w === "object" && "word" in w) {
              flat.push({ ...w, difficulty: normalizeDifficulty(category) ?? normalizeDifficulty(w.difficulty) });
            }
          }
        }
      }
      if (flat.length > 0) {
        validateWords(flat);
        return flat.map(normalizeWord);
      }
    }
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      throw e;
    }
  }
  const lines = content.trim().split("\n").filter((line) => {
    const trimmed = line.trim();
    return trimmed && !trimmed.startsWith("#");
  });
  if (lines.length < 2) {
    throw new Error("Invalid word list format.");
  }
  const delimiter = lines[0].includes("	") ? "	" : ",";
  const headers = parseDelimitedLine(lines[0], delimiter).map(cleanHeader);
  const words = lines.slice(1).filter((line) => line.trim()).map((line) => {
    const values = parseDelimitedLine(line, delimiter);
    const wordObj = {};
    headers.forEach((header, idx) => {
      wordObj[header] = values[idx] ? values[idx].trim() : "";
    });
    return wordObj;
  });
  validateWords(words);
  return words.map(normalizeWord);
}

// src/utils/mascot.ts
function getMascotImage(context) {
  if (context.isWinning) return IMAGE_ASSETS.bee.winning;
  if (context.isCelebrating) return IMAGE_ASSETS.bee.celebratory;
  if (context.isWrong) return IMAGE_ASSETS.bee.wrongAnswer;
  if (context.isHelping) return IMAGE_ASSETS.bee.help;
  if (context.isTyping) return IMAGE_ASSETS.bee.typing;
  if (context.isUnderTimePressure) return IMAGE_ASSETS.bee.timePressure;
  if (context.isCorrect) return IMAGE_ASSETS.bee.celebratory;
  return IMAGE_ASSETS.bee.default;
}
function getContextualMascot(gameState) {
  const context = {};
  if (gameState.isCorrectAnswer) {
    context.isCelebrating = true;
  } else if (gameState.isWrongAnswer) {
    context.isWrong = true;
  } else if (gameState.isShowingHelp) {
    context.isHelping = true;
  } else if (gameState.isTyping) {
    context.isTyping = true;
  } else if (gameState.timeRemaining && gameState.maxTime && gameState.timeRemaining < gameState.maxTime * 0.2) {
    context.isUnderTimePressure = true;
  } else {
    context.isDefault = true;
  }
  return getMascotImage(context);
}

// src/utils/gameStateManager.ts
var GAME_STATE_KEY = "spelling_bee_saved_game";
function saveGameState(gameState) {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    console.log("Game state saved successfully");
  } catch (error) {
    console.error("Failed to save game state:", error);
    throw new Error("Failed to save game state");
  }
}
function loadGameState() {
  try {
    const savedData = localStorage.getItem(GAME_STATE_KEY);
    if (!savedData) {
      return null;
    }
    const gameState = JSON.parse(savedData);
    if (!gameState.gameConfig || !gameState.currentParticipants || !gameState.gameId) {
      console.warn("Invalid saved game state found, clearing it");
      clearSavedGame();
      return null;
    }
    return gameState;
  } catch (error) {
    console.error("Failed to load game state:", error);
    clearSavedGame();
    return null;
  }
}
function hasSavedGame() {
  return loadGameState() !== null;
}
function clearSavedGame() {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
    console.log("Saved game cleared successfully");
  } catch (error) {
    console.error("Failed to clear saved game:", error);
  }
}
function getSavedGameInfo() {
  const gameState = loadGameState();
  if (!gameState) {
    return null;
  }
  return {
    savedAt: gameState.savedAt,
    gameMode: gameState.gameConfig.gameMode,
    participantCount: gameState.currentParticipants.length
  };
}
function generateGameId() {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
var autoSaveTimeout = null;
function autoSaveGameState(gameState) {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }
  autoSaveTimeout = setTimeout(() => {
    try {
      saveGameState(gameState);
    } catch (error) {
      console.warn("Auto-save failed:", error);
    }
  }, 1e3);
}

// src/utils/theme.ts
var SUPPORTED_THEMES = ["light", "dark", "honeycomb"];
var BODY_THEMES = SUPPORTED_THEMES.map((theme) => `theme-${theme}`);
var applyThemeClass = (theme) => {
  if (typeof document === "undefined") {
    return "light";
  }
  const normalized = SUPPORTED_THEMES.includes(theme) ? theme : "light";
  const body = document.body;
  const root = document.documentElement;
  body.classList.remove(...BODY_THEMES);
  body.classList.add(`theme-${normalized}`);
  if (normalized === "dark") {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  }
  root.classList.toggle("theme-honeycomb", normalized === "honeycomb");
  return normalized;
};

// src/components/AccessibilitySettings.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var STORAGE_KEY = "accessibilitySettings";
var defaultSettings = {
  font: "default",
  textScale: 1,
  reduceMotion: false
};
var fontFamilies = {
  default: "",
  readable: '"All Inclusive Sans", Arial, sans-serif',
  dyslexic: "Verdana, Arial, sans-serif"
};
var fontOptions = [
  { value: "default", label: "Default", description: "Use the game font." },
  { value: "readable", label: "Readable", description: "A clear classroom-friendly font." },
  { value: "dyslexic", label: "Dyslexic friendly", description: "Wider letter shapes with familiar spacing." }
];
var textScaleOptions = [
  { value: 1, label: "100%" },
  { value: 1.1, label: "110%" },
  { value: 1.25, label: "125%" },
  { value: 1.4, label: "140%" }
];
var readSettings = () => {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return {
      font: parsed.font && parsed.font in fontFamilies ? parsed.font : defaultSettings.font,
      textScale: typeof parsed.textScale === "number" ? parsed.textScale : defaultSettings.textScale,
      reduceMotion: Boolean(parsed.reduceMotion)
    };
  } catch {
    return defaultSettings;
  }
};
var applyAccessibilitySettings = (settings = readSettings()) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const body = document.body;
  const fontFamily = fontFamilies[settings.font];
  root.style.setProperty("--accessibility-font-scale", String(settings.textScale));
  if (fontFamily) {
    root.style.setProperty("--accessibility-font-family", fontFamily);
  } else {
    root.style.removeProperty("--accessibility-font-family");
  }
  root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  body.dataset.accessibilityFont = settings.font;
};
var AccessibilitySettings = ({ onClose }) => {
  const [settings, setSettings] = import_react2.default.useState(() => readSettings());
  import_react2.default.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applyAccessibilitySettings(settings);
  }, [settings]);
  const updateSettings = (next) => {
    setSettings((current) => ({ ...current, ...next }));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: "w-full max-w-xl rounded-2xl bg-white p-6 text-gray-900 shadow-2xl dark:bg-gray-900 dark:text-white",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "accessibility-settings-title",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-6 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { id: "accessibility-settings-title", className: "text-2xl font-black text-gray-900 dark:text-white", children: "Accessibility Settings" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: "These settings are saved on this device." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "rounded-lg bg-gray-200 px-3 py-2 font-bold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
              "aria-label": "Close accessibility settings",
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "mb-3 text-lg font-bold text-gray-900 dark:text-white", children: "Font" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid gap-3", children: fontOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "label",
              {
                className: "flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-yellow-50 dark:border-gray-700 dark:hover:bg-gray-800",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "input",
                    {
                      type: "radio",
                      name: "accessibility-font",
                      value: option.value,
                      checked: settings.font === option.value,
                      onChange: () => updateSettings({ font: option.value }),
                      className: "mt-1 h-5 w-5"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block font-bold text-gray-900 dark:text-white", children: option.label }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block text-sm text-gray-600 dark:text-gray-300", children: option.description })
                  ] })
                ]
              },
              option.value
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "mb-3 text-lg font-bold text-gray-900 dark:text-white", children: "Text Size" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: textScaleOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                onClick: () => updateSettings({ textScale: option.value }),
                className: `rounded-xl border px-4 py-3 font-black transition ${settings.textScale === option.value ? "border-yellow-500 bg-yellow-300 text-black" : "border-gray-200 bg-white text-gray-900 hover:bg-yellow-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"}`,
                children: option.label
              },
              option.value
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block font-bold text-gray-900 dark:text-white", children: "Reduce Motion" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block text-sm text-gray-600 dark:text-gray-300", children: "Minimise animated effects." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                type: "checkbox",
                checked: settings.reduceMotion,
                onChange: (event) => updateSettings({ reduceMotion: event.target.checked }),
                className: "h-6 w-6"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
};
var AccessibilitySettings_default = AccessibilitySettings;

// src/utils/studentProgress.ts
var STORAGE_KEY2 = "spellingBeeStudentProgress";
var MIN_DIFFICULTY_LEVEL = 0;
var MAX_DIFFICULTY_LEVEL = 2;
var clampDifficultyLevel = (level) => {
  if (!Number.isFinite(level)) return MIN_DIFFICULTY_LEVEL;
  return Math.max(MIN_DIFFICULTY_LEVEL, Math.min(MAX_DIFFICULTY_LEVEL, level));
};
var normaliseStudentKey = (name) => name.trim().toLowerCase();
var loadStudentProgress = () => {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY2) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};
var getStudentDifficultyLevel = (name, fallbackLevel) => {
  const key = normaliseStudentKey(name);
  if (!key) return clampDifficultyLevel(fallbackLevel);
  const record = loadStudentProgress()[key];
  return clampDifficultyLevel(record?.difficultyLevel ?? fallbackLevel);
};
var saveStudentProgress = (participant) => {
  if (typeof window === "undefined") return;
  const key = normaliseStudentKey(participant.name);
  if (!key) return;
  const progress = loadStudentProgress();
  progress[key] = {
    difficultyLevel: clampDifficultyLevel(participant.difficultyLevel),
    wordsAttempted: participant.wordsAttempted,
    wordsCorrect: participant.wordsCorrect,
    lastPlayedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  window.localStorage.setItem(STORAGE_KEY2, JSON.stringify(progress));
};

// src/SetupScreen.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var musicStyles = ["Funk", "Country", "Deep Bass", "Rock", "Jazz", "Classical"];
var buildAIWordListPrompt = (topic, count) => `ROLE
Generate a CSV for an AU Years 7-8 spelling bee on TOPIC. Your voice is a witty, knowledgeable lexicographer making a fun but challenging list.

INPUT
TOPIC (string) and N (int). If N invalid/missing -> N=10.

OUTPUT (CSV ONLY)

One CSV. No preface, no code fences, no blank lines.

Header EXACTLY: "word","syllables","definition","origin","example","prefix","suffix","pronunciation"

Then exactly N rows.

ASCII only; straight quotes (").

Quote every field.

The syllables field is a JSON string of a string array.

CORRECT: "[\\"har\\",\\"mo\\",\\"ny\\"]"

INCORRECT: [""har"",""mo"",""ny""]

CONTENT

AU/UK spelling. At least 70% headwords clearly fit TOPIC (others closely related).

Difficulty: about 30% 1-2 syllables (foundational), about 50% 2-3 (core), about 20% 4+ (stretch).

Minima when N>=10: at least 3 one-syllable; at least 3 with 4+ syllables; at least 3 with prefixes; at least 3 with suffixes.

Definition: 10-18 words; witty, accurate, student-friendly. Define by job, ingredients, effect, or an unexpected sensation (not flowery/abstract).

Origin: Real and specific (e.g., Latin; Greek; Old French via Latin). No jokes or speculation.

Example: 12-25 words; exactly one sentence; vividly funny or gently surreal. Bee humour only in examples and in at most floor(N/2) rows.

Bee headwords: Bee words appear only in examples unless TOPIC is bees.

Prefix/Suffix: Include only productive, meaningful derivational affixes (e.g., "re-" in "remake", "-tion" in "creation").

Do not treat compounds as suffixes (e.g., laneway, skyline -> suffix="").

Do not invent prefixes from stems (e.g., federation != "fed-").

Only include a prefix if it carries its usual meaning in the headword (e.g., "im-" in "impossible").

Pronunciation: Hyphenated with PRIMARY stress in CAPS (e.g., par-muh-ZAN, mot-suh-REL-uh).

One-syllable exception: write the syllable in CAPS (e.g., TRAM).

Headwords: standard dictionary items; no brands or proper names (unless TOPIC explicitly requires them - then at most 1 such row).

VALIDATION (silent)
Before printing, fix any violations and output only the valid CSV. Per-row checks: non-empty fields; definition 10-18 words; example 12-25 words; syllables is a JSON string with backslash-escaped inner quotes; real origin; derivational prefix/suffix only; pronunciation format obeyed. After N rows: counts satisfied (one-syllable, 4+ syllables, prefixes, suffixes), at least 70% on-topic, bee examples at most floor(N/2), ASCII-only, no blank lines. If any check fails, regenerate offending rows and re-validate.

TOPIC: ${topic.trim() || "general classroom vocabulary"}
N: ${Number.isFinite(count) && count > 0 ? count : 10}`;
var PRESETS_STORAGE_KEY = "setupPresets";
var GITHUB_MODELS_ENDPOINT = "https://models.github.ai/inference/chat/completions";
var GITHUB_MODELS_MODEL = "openai/gpt-4.1";
var GITHUB_MODELS_API_VERSION = "2026-03-10";
var SetupScreen = ({ onStartGame, onAddCustomWords, onViewAchievements, onResumeGame, onViewHistory, onViewShop, onStartWarmup, wordListsReady }) => {
  const avatars2 = [IMAGE_ASSETS.avatars.bee, IMAGE_ASSETS.avatars.book, IMAGE_ASSETS.avatars.trophy, getMascotImage({ isDefault: true }), getMascotImage({ isCelebrating: true })];
  const getRandomAvatar = () => avatars2[Math.floor(Math.random() * avatars2.length)];
  const getDefaultTeams = () => [
    { name: "Team Alpha", lives: 10, difficultyLevel: 0, points: 5, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() },
    { name: "Team Beta", lives: 10, difficultyLevel: 0, points: 5, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() }
  ];
  const normaliseTeam = (team) => {
    const [name, rosterText] = team.name.split(/:\s(.+)/);
    const roster = team.roster || (rosterText ? rosterText.split(",").map((student) => student.trim()).filter(Boolean) : void 0);
    return {
      ...team,
      name: name.trim() || team.name,
      roster,
      avatar: team.avatar || getRandomAvatar()
    };
  };
  const [teams, setTeams] = (0, import_react3.useState)(getDefaultTeams());
  const [gameMode, setGameMode] = (0, import_react3.useState)("team");
  const [timerDuration, setTimerDuration] = (0, import_react3.useState)(30);
  const [sessionDurationMinutes, setSessionDurationMinutes] = (0, import_react3.useState)(20);
  const [customWordListText, setCustomWordListText] = (0, import_react3.useState)("");
  const [parsedCustomWords, setParsedCustomWords] = (0, import_react3.useState)([]);
  const [missedWordsCollection, setMissedWordsCollection] = (0, import_react3.useState)({});
  const [includeMissedWords, setIncludeMissedWords] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)("");
  const bundledWordLists = [
    { label: "Template CSV", file: "template.csv" },
    { label: "Template TSV", file: "template.tsv" },
    { label: "Template TXT", file: "template.txt" },
    { label: "Template JSON", file: "template.json" },
    { label: "Example JSON", file: "example.json" },
    { label: "Example CSV", file: "example.csv" },
    { label: "Example TSV", file: "example.tsv" }
  ];
  const downloadableTemplates = [
    { label: "CSV", file: "template.csv" },
    { label: "TSV", file: "template.tsv" },
    { label: "TXT", file: "template.txt" },
    { label: "JSON", file: "template.json" }
  ];
  const [selectedBundledList, setSelectedBundledList] = (0, import_react3.useState)("");
  const [students, setStudents] = (0, import_react3.useState)([]);
  const [studentName, setStudentName] = (0, import_react3.useState)("");
  const [bulkStudentText, setBulkStudentText] = (0, import_react3.useState)("");
  const [bulkStudentError, setBulkStudentError] = (0, import_react3.useState)("");
  const [randomTeamCount, setRandomTeamCount] = (0, import_react3.useState)(0);
  const [randomTeamSize, setRandomTeamSize] = (0, import_react3.useState)(0);
  const [randomizeError, setRandomizeError] = (0, import_react3.useState)("");
  const [skipPenaltyType, setSkipPenaltyType] = (0, import_react3.useState)("lives");
  const [skipPenaltyValue, setSkipPenaltyValue] = (0, import_react3.useState)(1);
  const [soundEnabled, setSoundEnabled] = (0, import_react3.useState)(() => localStorage.getItem("soundEnabled") !== "false");
  const [effectsEnabled, setEffectsEnabled] = (0, import_react3.useState)(true);
  const [musicStyle, setMusicStyle] = (0, import_react3.useState)(() => localStorage.getItem("musicStyle") ?? "Funk");
  const [musicVolume, setMusicVolume] = (0, import_react3.useState)(() => parseFloat(localStorage.getItem("musicVolume") ?? "1"));
  const [initialDifficulty, setInitialDifficulty] = (0, import_react3.useState)(0);
  const [progressionSpeed, setProgressionSpeed] = (0, import_react3.useState)(1);
  const [theme, setTheme] = (0, import_react3.useState)("light");
  const [teacherMode, setTeacherMode] = (0, import_react3.useState)(() => localStorage.getItem("teacherMode") === "true");
  const [hideNames, setHideNames] = (0, import_react3.useState)(() => localStorage.getItem("hideNames") === "true");
  const [showAccessibilitySettings, setShowAccessibilitySettings] = (0, import_react3.useState)(false);
  const [presets, setPresets] = (0, import_react3.useState)(() => {
    try {
      return JSON.parse(localStorage.getItem(PRESETS_STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [selectedPreset, setSelectedPreset] = (0, import_react3.useState)("");
  const [presetName, setPresetName] = (0, import_react3.useState)("");
  const [presetMessage, setPresetMessage] = (0, import_react3.useState)("");
  const [aiGrade, setAiGrade] = (0, import_react3.useState)(5);
  const [aiTopic, setAiTopic] = (0, import_react3.useState)("");
  const [aiCount, setAiCount] = (0, import_react3.useState)(10);
  const [aiLoading, setAiLoading] = (0, import_react3.useState)(false);
  const [aiError, setAiError] = (0, import_react3.useState)("");
  const [aiPrompt, setAiPrompt] = (0, import_react3.useState)("");
  const [aiToken, setAiToken] = (0, import_react3.useState)(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("githubModelsToken") || "";
  });
  const [savedGameAvailable, setSavedGameAvailable] = (0, import_react3.useState)(false);
  const [savedGameInfo, setSavedGameInfo] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    if (teacherMode) {
      document.body.classList.add("teacher-mode");
    } else {
      document.body.classList.remove("teacher-mode");
    }
    localStorage.setItem("teacherMode", String(teacherMode));
  }, [teacherMode]);
  (0, import_react3.useEffect)(() => {
    localStorage.setItem("hideNames", String(hideNames));
  }, [hideNames]);
  (0, import_react3.useEffect)(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) try {
      setTeams(JSON.parse(savedTeams).map((t) => normaliseTeam(t)));
    } catch {
    }
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) try {
      setStudents(JSON.parse(savedStudents).map((s) => ({ ...s, avatar: s.avatar || getRandomAvatar() })));
    } catch {
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const normalized = applyThemeClass(savedTheme);
      setTheme(normalized);
    } else {
      applyThemeClass(theme);
    }
  }, []);
  (0, import_react3.useEffect)(() => localStorage.setItem("soundEnabled", String(soundEnabled)), [soundEnabled]);
  (0, import_react3.useEffect)(() => localStorage.setItem("musicStyle", musicStyle), [musicStyle]);
  (0, import_react3.useEffect)(() => localStorage.setItem("musicVolume", String(musicVolume)), [musicVolume]);
  (0, import_react3.useEffect)(() => {
    const checkSavedGame = () => {
      setSavedGameAvailable(hasSavedGame());
      setSavedGameInfo(getSavedGameInfo());
    };
    checkSavedGame();
    const interval = setInterval(checkSavedGame, 1e3);
    return () => clearInterval(interval);
  }, []);
  const updateTeams = (newTeams) => {
    setTeams(newTeams);
    localStorage.setItem("teams", JSON.stringify(newTeams));
  };
  const updateStudents = (newStudents) => {
    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  };
  const clearRoster = () => {
    localStorage.removeItem("teams");
    localStorage.removeItem("students");
    setTeams(getDefaultTeams());
    setStudents([]);
  };
  const createParticipant = (name, difficulty) => ({
    name: name.trim(),
    lives: 5,
    points: 5,
    difficultyLevel: difficulty,
    streak: 0,
    attempted: 0,
    correct: 0,
    wordsAttempted: 0,
    wordsCorrect: 0,
    avatar: getRandomAvatar()
  });
  const addTeam = () => updateTeams([...teams, createParticipant("", 0)]);
  const removeTeam = (index) => updateTeams(teams.filter((_, i) => i !== index));
  const updateTeamName = (index, name) => {
    const newTeams = teams.map((team, i) => i === index ? { ...team, name } : team);
    updateTeams(newTeams);
  };
  const addStudent = () => {
    if (studentName.trim()) {
      updateStudents([...students, createParticipant(studentName, initialDifficulty)]);
      setStudentName("");
    }
  };
  const removeStudent = (index) => updateStudents(students.filter((_, i) => i !== index));
  const updateStudentName = (index, name) => {
    const newStudents = students.map((student, i) => i === index ? { ...student, name } : student);
    updateStudents(newStudents);
  };
  const parseStudentNames = (text) => text.split(/\r?\n/).flatMap((line) => line.split(",")).map((name) => name.trim()).filter((name) => name !== "");
  const addBulkStudents = () => {
    const names = parseStudentNames(bulkStudentText);
    const existing = new Set(students.map((s) => s.name));
    const uniqueNames = Array.from(new Set(names)).filter((name) => !existing.has(name));
    if (uniqueNames.length === 0) {
      setBulkStudentError("No new unique names detected.");
      return;
    }
    const newStudents = uniqueNames.map((name) => createParticipant(name, initialDifficulty));
    updateStudents([...students, ...newStudents]);
    setBulkStudentText("");
    setBulkStudentError("");
  };
  const randomizeTeams = () => {
    if (students.length < 2) {
      setRandomizeError("Add at least two students to create teams.");
      return;
    }
    let count = 0;
    if (randomTeamCount > 0) {
      count = randomTeamCount;
    } else if (randomTeamSize > 0) {
      count = Math.ceil(students.length / randomTeamSize);
    }
    if (count <= 0) {
      setRandomizeError("Specify number of teams or team size.");
      return;
    }
    const shuffled = [...students];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const groups = Array.from({ length: count }, () => []);
    shuffled.forEach((student, idx) => {
      groups[idx % count].push(student);
    });
    const newTeams = groups.filter((group) => group.length > 0).map((group, index) => {
      const teamName = `Team ${index + 1}`;
      const participant = createParticipant(teamName, initialDifficulty);
      participant.avatar = teams[index]?.avatar || participant.avatar;
      participant.roster = group.map((s) => s.name);
      return participant;
    });
    updateTeams(newTeams);
    setRandomizeError("");
  };
  const parseWordList2 = (content) => {
    try {
      const words = parseWordList(content);
      setParsedCustomWords(words);
      setError("");
    } catch (e) {
      setError(e.message || "Invalid word list format.");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setCustomWordListText(content);
      };
      reader.readAsText(file);
    }
  };
  const generateAIWords = async () => {
    setAiLoading(true);
    setAiError("");
    const wordCount = Math.min(Math.max(1, Number(aiCount) || 10), 50);
    const prompt = buildAIWordListPrompt(aiTopic, wordCount);
    setAiPrompt(prompt);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3e4);
      let content = "";
      const trimmedToken = aiToken.trim();
      if (trimmedToken) {
        sessionStorage.setItem("githubModelsToken", trimmedToken);
        const res = await fetch(`${GITHUB_MODELS_ENDPOINT}?api-version=${GITHUB_MODELS_API_VERSION}`, {
          method: "POST",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${trimmedToken}`,
            "Content-Type": "application/json",
            "X-GitHub-Api-Version": GITHUB_MODELS_API_VERSION
          },
          body: JSON.stringify({
            model: GITHUB_MODELS_MODEL,
            messages: [
              {
                role: "system",
                content: "You generate classroom spelling bee word lists. Return only the requested CSV text, with no markdown fences or commentary."
              },
              { role: "user", content: prompt }
            ],
            temperature: 0.8,
            top_p: 1,
            max_tokens: 3e3
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) {
          const errorText = await res.text();
          const trimmedError = (errorText || "").trim().slice(0, 500);
          throw new Error(`GITHUB_MODELS_${res.status}:${trimmedError}`);
        }
        const data = await res.json();
        content = String(data?.choices?.[0]?.message?.content || "");
      } else {
        const res = await fetch("http://localhost:3001/wordlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ grade: aiGrade, topic: aiTopic, count: wordCount, prompt }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Request failed");
        }
        const data = await res.json();
        content = String(data.wordList || data.csv || data.content || "");
      }
      const cleanContent = content.trim().replace(/^```(?:csv|json|tsv)?\s*/i, "").replace(/\s*```$/i, "").trim();
      const generatedWords = parseWordList(cleanContent);
      if (!Array.isArray(generatedWords) || generatedWords.length === 0) throw new Error("Invalid response");
      setParsedCustomWords((prev) => [...prev, ...generatedWords]);
      setCustomWordListText("");
      setAiError(`Generated ${generatedWords.length} words. Total words: ${parsedCustomWords.length + generatedWords.length}`);
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err || "");
      let directTokenHint = aiToken.trim() ? "The GitHub Models request failed." : "On GitHub Pages, paste a GitHub Models token for this session, or run the local AI server.";
      if (errMessage.startsWith("GITHUB_MODELS_401")) {
        directTokenHint = "GitHub Models returned 401 Unauthorized. Use a fresh token with models: read permission.";
      } else if (errMessage.startsWith("GITHUB_MODELS_403")) {
        directTokenHint = "GitHub Models returned 403 Forbidden. Enable Models in repository settings, and confirm org model policy allows the selected model.";
      } else if (errMessage.startsWith("GITHUB_MODELS_429")) {
        directTokenHint = "GitHub Models returned 429 rate limit. Wait and try again, or reduce requests.";
      } else if (errMessage.includes("Failed to fetch")) {
        directTokenHint = "Browser request failed. Check network, ad/privacy extensions, and that GitHub Models is reachable from this browser.";
      } else if (errMessage.includes("AbortError")) {
        directTokenHint = "Request timed out after 30 seconds. Try again or reduce requested word count.";
      }
      try {
        await navigator.clipboard?.writeText(prompt);
        setAiError(`${directTokenHint} I copied the exact word-list prompt so you can paste AI CSV output into the box above.`);
      } catch {
        setAiError(`${directTokenHint} Use the template prompt below, then paste AI CSV output into the box above.`);
      }
    } finally {
      setAiLoading(false);
    }
  };
  (0, import_react3.useEffect)(() => {
    if (selectedBundledList) {
      fetch(`wordlists/${selectedBundledList}`).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      }).then((text) => {
        setCustomWordListText(text);
        setError("");
      }).catch((err) => {
        console.error("Failed to load bundled word list", err);
        setError("Failed to load bundled word list.");
      });
    }
  }, [selectedBundledList]);
  (0, import_react3.useEffect)(() => {
    if (customWordListText) {
      parseWordList2(customWordListText);
    }
  }, [customWordListText]);
  (0, import_react3.useEffect)(() => {
    const stored = JSON.parse(localStorage.getItem("missedWordsCollection") || "{}");
    setMissedWordsCollection(stored);
  }, []);
  const missedWordCount = Object.values(missedWordsCollection).reduce((acc, arr) => acc + arr.length, 0);
  const handleResumeGame = () => {
    const savedState = loadGameState();
    if (savedState && onResumeGame) {
      onResumeGame(savedState);
    }
  };
  const handleDeleteSavedGame = () => {
    if (window.confirm("Are you sure you want to delete the saved game? This cannot be undone.")) {
      clearSavedGame();
      setSavedGameAvailable(false);
      setSavedGameInfo(null);
    }
  };
  const savePresets = (nextPresets) => {
    setPresets(nextPresets);
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(nextPresets));
  };
  const buildPreset = () => ({
    gameMode,
    teams,
    students,
    timerDuration,
    sessionDurationMinutes,
    skipPenaltyType,
    skipPenaltyValue,
    soundEnabled,
    effectsEnabled,
    musicStyle,
    musicVolume,
    initialDifficulty,
    progressionSpeed,
    theme,
    teacherMode,
    hideNames
  });
  const handleSavePreset = () => {
    const name = presetName.trim();
    if (!name) {
      setPresetMessage("Name the preset first.");
      return;
    }
    savePresets({ ...presets, [name]: buildPreset() });
    setSelectedPreset(name);
    setPresetMessage(`Saved "${name}".`);
  };
  const handleLoadPreset = (name = selectedPreset) => {
    const preset = presets[name];
    if (!preset) {
      setPresetMessage("Choose a preset to load.");
      return;
    }
    setGameMode(preset.gameMode);
    updateTeams(preset.teams?.length ? preset.teams : getDefaultTeams());
    updateStudents(preset.students || []);
    setTimerDuration(preset.timerDuration || 30);
    setSessionDurationMinutes(preset.sessionDurationMinutes || 20);
    setSkipPenaltyType(preset.skipPenaltyType || "lives");
    setSkipPenaltyValue(preset.skipPenaltyValue ?? 1);
    setSoundEnabled(preset.soundEnabled !== false);
    setEffectsEnabled(preset.effectsEnabled !== false);
    setMusicStyle(preset.musicStyle || "Funk");
    setMusicVolume(typeof preset.musicVolume === "number" ? preset.musicVolume : 1);
    setInitialDifficulty(preset.initialDifficulty || 0);
    setProgressionSpeed(preset.progressionSpeed || 1);
    const normalizedTheme = applyThemeClass(preset.theme || "light");
    setTheme(normalizedTheme);
    localStorage.setItem("theme", normalizedTheme);
    setTeacherMode(Boolean(preset.teacherMode));
    setHideNames(Boolean(preset.hideNames));
    setPresetName(name);
    setPresetMessage(`Loaded "${name}".`);
  };
  const handleDeletePreset = () => {
    if (!selectedPreset || !presets[selectedPreset]) {
      setPresetMessage("Choose a preset to delete.");
      return;
    }
    const nextPresets = { ...presets };
    delete nextPresets[selectedPreset];
    savePresets(nextPresets);
    setPresetMessage(`Deleted "${selectedPreset}".`);
    setSelectedPreset("");
  };
  const handleStart = async (isSessionChallenge = false) => {
    if (!isSessionChallenge && !wordListsReady) {
      setError("Word lists are still loading. Please try again in a moment.");
      return;
    }
    let challengeWords = [];
    if (isSessionChallenge) {
      try {
        const randomList = bundledWordLists[Math.floor(Math.random() * bundledWordLists.length)];
        const response = await fetch(`wordlists/${randomList.file}`);
        const text = await response.text();
        challengeWords = parseWordList(text);
      } catch (err) {
        console.error("Failed to load session challenge words", err);
        setError("Failed to load session challenge words.");
        return;
      }
    }
    let finalParticipants;
    if (gameMode === "team") {
      const trimmedTeams = teams.filter((team) => team.name.trim() !== "");
      if (trimmedTeams.length < 2) {
        setError("Please add at least two teams with names.");
        return;
      }
      finalParticipants = trimmedTeams.map((t) => ({ ...normaliseTeam(t), difficultyLevel: initialDifficulty }));
    } else {
      const trimmedStudents = students.filter((student) => student.name.trim() !== "");
      if (trimmedStudents.length < 1 && isSessionChallenge) {
        finalParticipants = [createParticipant("Player 1", initialDifficulty)];
      } else if (trimmedStudents.length < 2 && !isSessionChallenge) {
        setError("Please add at least two students for a custom game.");
        return;
      } else {
        finalParticipants = trimmedStudents.map((s) => ({
          ...s,
          difficultyLevel: getStudentDifficultyLevel(s.name, initialDifficulty)
        }));
      }
    }
    setError("");
    let finalWords = isSessionChallenge ? challengeWords : parsedCustomWords;
    if (includeMissedWords && !isSessionChallenge) {
      const extraWords = Object.values(missedWordsCollection).flat();
      finalWords = [...finalWords, ...extraWords];
    }
    onAddCustomWords(finalWords);
    const config2 = {
      participants: finalParticipants,
      hideNames,
      gameMode,
      timerDuration,
      sessionDuration: sessionDurationMinutes * 60,
      skipPenaltyType,
      skipPenaltyValue,
      soundEnabled,
      effectsEnabled,
      difficultyLevel: initialDifficulty,
      progressionSpeed,
      musicStyle,
      musicVolume
    };
    onStartGame(config2);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "screen-container text-white min-h-screen relative overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "floating-particle top-10 left-10 delay-100" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "floating-particle top-20 right-20 delay-200" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "floating-particle bottom-20 left-20 delay-300" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "floating-particle bottom-10 right-10 delay-400" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "floating-particle top-1/2 left-1/2 delay-500" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-center mb-12 animate-bounce-in", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-center gap-3 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: "icons/icon.svg", alt: "Bee mascot", className: "w-12 h-12 md:w-16 md:h-16 animate-wiggle" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { className: "screen-title excitement-glow animate-rainbow", children: "\u{1F3C6} SPELLING BEE CHAMPIONSHIP" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "screen-subtitle text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-kahoot-yellow-300 bg-clip-text text-transparent animate-sparkle", children: "Get ready to spell your way to victory!" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "game-card mb-8 animate-scale-in delay-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-3xl font-black mb-6 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-green-400 bg-clip-text text-transparent", children: "Setup Presets \u{1F4BE}" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto_auto] gap-3 items-end", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "preset-name", className: "block mb-2 font-bold", children: "Preset Name" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                id: "preset-name",
                type: "text",
                value: presetName,
                onChange: (e) => setPresetName(e.target.value),
                className: "p-2 rounded-md bg-white/20 text-white",
                placeholder: "Friday groups"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "preset-select", className: "block mb-2 font-bold", children: "Saved Presets" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "select",
              {
                id: "preset-select",
                value: selectedPreset,
                onChange: (e) => setSelectedPreset(e.target.value),
                className: "p-2 rounded-md bg-white/20 text-white",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "", children: "-- Select preset --" }),
                  Object.keys(presets).sort().map((name) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: name, children: name }, name))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: handleSavePreset, className: "bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg font-bold", children: "Save" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: () => handleLoadPreset(), disabled: !selectedPreset, className: "bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg font-bold disabled:opacity-50", children: "Load" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: handleDeletePreset, disabled: !selectedPreset, className: "bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg font-bold disabled:opacity-50", children: "Delete" })
        ] }),
        presetMessage && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mt-3 text-sm text-yellow-200", role: "status", children: presetMessage })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "game-card mb-8 animate-scale-in delay-200", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-3xl font-black mb-6 text-center bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-red-400 bg-clip-text text-transparent", children: "Select Game Mode \u{1F3AE}" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col md:flex-row justify-center gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: () => setGameMode("team"),
              className: `team-selector ${gameMode === "team" ? "game-mode-active" : ""} animate-glow`,
              children: "\u{1F465} TEAM BATTLE"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: () => setGameMode("individual"),
              className: `individual-selector ${gameMode === "individual" ? "game-mode-active" : ""} animate-glow`,
              children: "\u{1F9D1}\u200D\u{1F393} SOLO CHALLENGE"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "game-card mb-8 animate-scale-in delay-300", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-3xl font-black mb-6 bg-gradient-to-r from-kahoot-blue-400 to-kahoot-green-400 bg-clip-text text-transparent", children: gameMode === "team" ? "\u{1F465} TEAM ROSTER" : "\u{1F9D1}\u200D\u{1F393} STUDENT LINEUP" }),
        gameMode === "team" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
          teams.map((team, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-wrap items-center gap-4 mb-4 p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: team.avatar || avatars2[0], alt: "avatar", className: "w-12 h-12 rounded-full border-2 border-kahoot-yellow-400 shadow-lg animate-float" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                type: "text",
                value: team.name,
                onChange: (e) => updateTeamName(index, e.target.value),
                placeholder: `Team ${index + 1} Name`,
                className: "min-w-48 flex-grow p-3 rounded-xl bg-white/20 text-white placeholder-white/70 font-semibold text-lg border border-white/30 focus:border-kahoot-yellow-400 focus:ring-2 focus:ring-kahoot-yellow-300 transition-all duration-200"
              }
            ),
            teams.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                onClick: () => removeTeam(index),
                className: "px-4 py-2 bg-gradient-to-r from-kahoot-red-500 to-kahoot-red-600 hover:from-kahoot-red-600 hover:to-kahoot-red-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105",
                children: "Remove"
              }
            ),
            team.roster && team.roster.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "min-w-0 flex-1 text-sm text-white/75 md:max-w-md", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "truncate", children: team.roster.join(", ") }) })
          ] }, index)),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: addTeam,
              className: "mt-4 bg-gradient-to-r from-kahoot-green-500 to-kahoot-green-600 hover:from-kahoot-green-600 hover:to-kahoot-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg",
              children: "\u2795 Add Team"
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex gap-4 mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "text", value: studentName, onChange: (e) => setStudentName(e.target.value), className: "flex-grow p-2 rounded-md bg-white/20 text-white", placeholder: "Student name" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: addStudent, className: "bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold", children: "Add" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("textarea", { value: bulkStudentText, onChange: (e) => setBulkStudentText(e.target.value), className: "w-full p-2 rounded-md bg-white/20 text-white mb-2", placeholder: "Paste names, one per line or separated by commas", rows: 4 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: addBulkStudents, className: "bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold", children: "Add Names" }),
            bulkStudentError && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-red-300 mt-2", children: bulkStudentError })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-xl font-bold mb-2", children: "Randomize Teams" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "number", min: 1, value: randomTeamCount || "", onChange: (e) => {
                setRandomTeamCount(Number(e.target.value));
                setRandomTeamSize(0);
              }, placeholder: "Number of teams", className: "p-2 rounded-md bg-white/20 text-white flex-grow" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "or" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "number", min: 1, value: randomTeamSize || "", onChange: (e) => {
                setRandomTeamSize(Number(e.target.value));
                setRandomTeamCount(0);
              }, placeholder: "Team size", className: "p-2 rounded-md bg-white/20 text-white flex-grow" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: randomizeTeams, className: "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded", children: "Randomize" })
            ] }),
            randomizeError && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-red-300", children: randomizeError })
          ] }),
          students.map((student, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: student.avatar || avatars2[0], alt: "avatar", className: "w-8 h-8 rounded-full" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "text", value: student.name, onChange: (e) => updateStudentName(index, e.target.value), placeholder: "Student name", className: "flex-grow p-2 rounded-md bg-white/20 text-white" }),
            students.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: () => removeStudent(index), className: "px-2 py-1 bg-red-500 hover:bg-red-600 rounded", children: "Remove" })
          ] }, index))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: clearRoster, className: "mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded", children: "Clear Saved Roster" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Skip Penalty \u23ED\uFE0F" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { value: skipPenaltyType, onChange: (e) => setSkipPenaltyType(e.target.value), className: "p-2 rounded-md bg-white/20 text-white", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "lives", children: "Lives" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "points", children: "Points" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "number", min: 0, value: skipPenaltyValue, onChange: (e) => setSkipPenaltyValue(Number(e.target.value)), className: "p-2 rounded-md bg-white/20 text-white w-24" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Difficulty Settings \u{1F39A}\uFE0F" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "block mb-2", children: "Initial Difficulty" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { value: initialDifficulty, onChange: (e) => setInitialDifficulty(Number(e.target.value)), className: "p-2 rounded-md bg-white/20 text-white", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: 0, children: "Easy" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: 1, children: "Medium" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: 2, children: "Tricky" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "block mb-2", children: "Progression Speed" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "number", min: 1, value: progressionSpeed, onChange: (e) => setProgressionSpeed(Number(e.target.value)), className: "p-2 rounded-md bg-white/20 text-white w-24" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Session Timer \u23F3" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "session-duration", className: "block mb-2", children: "Session Length (minutes)" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              id: "session-duration",
              type: "number",
              min: 1,
              max: 120,
              value: sessionDurationMinutes,
              onChange: (e) => setSessionDurationMinutes(Math.max(1, Number(e.target.value) || 1)),
              className: "p-2 rounded-md bg-white/20 text-white w-28"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Audio & Effects \u{1F50A}\u2728" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center space-x-3 mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: soundEnabled, onChange: (e) => setSoundEnabled(e.target.checked) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Enable Sound" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: effectsEnabled, onChange: (e) => setEffectsEnabled(e.target.checked) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Enable Visual Effects" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Theme \u{1F3A8}" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { value: theme, onChange: (e) => {
            const normalized = applyThemeClass(e.target.value);
            setTheme(normalized);
            localStorage.setItem("theme", normalized);
          }, className: "p-2 rounded-md bg-white/20 text-white", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "light", children: "Light" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "dark", children: "Dark" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "honeycomb", children: "Honeycomb" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Teacher Mode \u{1F469}\u200D\u{1F3EB}" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: teacherMode, onChange: (e) => setTeacherMode(e.target.checked) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Enable larger fonts and spacing" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setShowAccessibilitySettings(true),
              className: "mt-4 w-full rounded-xl bg-yellow-300 px-4 py-3 font-black text-black transition hover:bg-yellow-400",
              children: "Accessibility Settings"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Privacy Display \u{1F648}" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: hideNames, onChange: (e) => setHideNames(e.target.checked) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Hide names on game and scoreboard displays" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Music \u{1F3B5}" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "block mb-2", children: "Style" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("select", { value: musicStyle, onChange: (e) => setMusicStyle(e.target.value), className: "p-2 rounded-md bg-white/20 text-white", children: musicStyles.map((style) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: style, children: style }, style)) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "block mb-2", children: [
              "Volume: ",
              Math.round(musicVolume * 100),
              "%"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "range", min: 0, max: 1, step: 0.01, value: musicVolume, onChange: (e) => setMusicVolume(parseFloat(e.target.value)), className: "w-full" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "bg-white/10 p-6 rounded-lg mb-8 mt-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Add Custom Word List \u{1F4DD}" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "bundled-list", className: "block text-lg font-medium mb-2", children: "Choose Bundled Word List" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { id: "bundled-list", value: selectedBundledList, onChange: (e) => setSelectedBundledList(e.target.value), className: "w-full p-2 rounded-md bg-white/20 text-white", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "", children: "-- Select a list --" }),
            bundledWordLists.map((list) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: list.file, children: list.label }, list.file))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "file-upload", className: "block text-lg font-medium mb-2", children: "Upload File" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-gray-300 mb-2", children: "Upload a CSV, TSV, TXT, or JSON word list." }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { id: "file-upload", type: "file", accept: ".json,.tsv,.txt,.csv", onChange: handleFileChange, className: "block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-300 file:text-black hover:file:bg-yellow-400" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "paste-area", className: "block text-lg font-medium mb-2", children: "Or Paste Word List Data" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-gray-300 mb-2", children: "Paste the AI CSV output or spreadsheet data here." }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("textarea", { id: "paste-area", rows: 4, value: customWordListText, onChange: (e) => setCustomWordListText(e.target.value), className: "w-full p-2 rounded-md bg-white/20 text-white", placeholder: '"word","syllables","definition","origin","example","prefix","suffix","pronunciation"' })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mt-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col md:flex-row gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "number", min: 1, value: aiGrade, onChange: (e) => setAiGrade(Number(e.target.value)), className: "p-2 rounded-md bg-white/20 text-white w-full md:w-24", placeholder: "Grade" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "text", value: aiTopic, onChange: (e) => setAiTopic(e.target.value), className: "p-2 rounded-md bg-white/20 text-white flex-1", placeholder: "Topic (optional)" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "number", min: 1, value: aiCount, onChange: (e) => setAiCount(Number(e.target.value)), className: "p-2 rounded-md bg-white/20 text-white w-full md:w-24", placeholder: "# Words" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: generateAIWords, disabled: aiLoading, className: "bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded w-full md:w-auto", children: aiLoading ? "Generating..." : "Generate with AI" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mt-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "github-models-token", className: "block text-sm font-bold text-gray-200", children: "GitHub Models Token for GitHub Pages" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                id: "github-models-token",
                type: "password",
                value: aiToken,
                onChange: (e) => setAiToken(e.target.value),
                className: "mt-1 w-full rounded-md bg-white/20 p-2 text-white placeholder-white/60",
                placeholder: "Optional. Used only in this browser session.",
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mt-1 text-xs text-gray-300", children: "Static GitHub Pages cannot store secrets. Leave this blank when using the local AI server." })
          ] }),
          aiError && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-yellow-200 mt-2", children: aiError }),
          aiPrompt && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("details", { className: "mt-3 rounded-xl bg-black/30 p-3 text-sm text-gray-100", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("summary", { className: "cursor-pointer font-bold", children: "AI prompt" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("textarea", { readOnly: true, value: aiPrompt, className: "mt-3 min-h-40 w-full rounded-lg bg-white/90 p-3 text-xs text-gray-900" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-4 text-sm text-gray-300", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Format:" }),
          ' use the exact CSV header: "word","syllables","definition","origin","example","prefix","suffix","pronunciation". Quote every field.'
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-2 flex flex-wrap gap-2", children: downloadableTemplates.map((template) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "a",
          {
            href: `wordlists/${template.file}`,
            download: true,
            className: "inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded",
            children: [
              "Download ",
              template.label,
              " Template"
            ]
          },
          template.file
        )) })
      ] }),
      missedWordCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bg-white/10 p-4 rounded-lg mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: includeMissedWords, onChange: (e) => setIncludeMissedWords(e.target.checked) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
          "Include ",
          missedWordCount,
          " missed words from previous sessions"
        ] })
      ] }) }),
      error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-red-300 text-center mb-4 animate-shake", children: error }),
      savedGameAvailable && savedGameInfo && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mt-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 animate-scale-in", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-black mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent", children: "\u{1F3AE} Resume Previous Game" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-center mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-white mb-2", children: [
            "You have a saved ",
            savedGameInfo.gameMode,
            " game with ",
            savedGameInfo.participantCount,
            " participants"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-gray-300 text-sm", children: [
            "Saved: ",
            new Date(savedGameInfo.savedAt).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col md:flex-row gap-4 justify-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: handleResumeGame,
              className: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105",
              children: "\u25B6\uFE0F Resume Game"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: handleDeleteSavedGame,
              className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl text-xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105",
              children: "\u{1F5D1}\uFE0F Delete Save"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col md:flex-row gap-6 mt-12 animate-scale-in delay-500", children: [
        onStartWarmup && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            onClick: onStartWarmup,
            disabled: !wordListsReady,
            className: "w-full bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white px-8 py-6 rounded-3xl text-3xl font-black shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-white/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
            children: "\u{1F41D} WARM-UP"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            onClick: () => handleStart(false),
            disabled: !wordListsReady,
            className: "w-full bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-600 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700 text-black px-8 py-6 rounded-3xl text-3xl font-black shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-white/20 excitement-glow animate-glow disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
            children: "\u{1F680} START CUSTOM GAME"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            onClick: () => handleStart(true),
            className: "w-full bg-gradient-to-r from-kahoot-red-400 to-kahoot-red-600 hover:from-kahoot-red-500 hover:to-kahoot-red-700 text-white px-8 py-6 rounded-3xl text-3xl font-black shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-white/20 animate-glow",
            children: "\u26A1 SESSION CHALLENGE"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-white/20 animate-scale-in delay-600", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-2xl font-black mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "\u{1F469}\u200D\u{1F3EB} Teacher Guide: How to Run the Game" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid md:grid-cols-2 gap-6 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-lg font-bold mb-2 text-yellow-300", children: "\u{1F3AF} Gameplay Flow" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ol", { className: "list-decimal list-inside space-y-1 text-gray-300", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Read the word aloud to the student/team" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Give definition, example sentence, or other context as needed" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Student/team spells the word using on-screen keyboard" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Click \u2705 when they submit their spelling" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Game automatically moves to next participant" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-lg font-bold mb-2 text-yellow-300", children: "\u{1F4A1} Help Shop Tips" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", { className: "list-disc list-inside space-y-1 text-gray-300", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Definition (-1 pt):" }),
                " Quick, affordable hint"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Origin (-1 pt):" }),
                " Word etymology and history"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Sentence (-2 pts):" }),
                " Context example"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Hangman (-5 pts):" }),
                " Reveals first & last letters"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Friend Sub (-4 pts):" }),
                " Tag in teammate (team mode)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-lg font-bold mb-2 text-yellow-300", children: "\u{1F3C6} Team Mode Features" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", { className: "list-disc list-inside space-y-1 text-gray-300", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Shared Lives:" }),
                " Teams have 10 lives total"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: '"Steal" Mechanic:' }),
                " If one team fails, next team can steal the word"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Strategic Hints:" }),
                " Teams must decide when to spend points"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Redemption Round:" }),
                " Failed words return later"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-lg font-bold mb-2 text-yellow-300", children: "\u{1F9D1}\u200D\u{1F393} Individual Mode" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", { className: "list-disc list-inside space-y-1 text-gray-300", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Personal Challenge:" }),
                " Each student has 5 lives"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Individual Progress:" }),
                " Students advance at their own pace"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Classic Format:" }),
                " Traditional spelling bee experience"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: "Achievement Tracking:" }),
                " Personal milestones and goals"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-8 text-center animate-bounce-in delay-700", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: onViewAchievements,
          className: "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-4 rounded-2xl font-black text-2xl shadow-xl transform transition-all duration-300 hover:scale-105 animate-sparkle",
          children: "\u{1F3C6} VIEW ACHIEVEMENTS"
        }
      ) })
    ] }),
    showAccessibilitySettings && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AccessibilitySettings_default, { onClose: () => setShowAccessibilitySettings(false) })
  ] });
};
var SetupScreen_default = SetupScreen;

// src/GameScreen.tsx
var import_react16 = __toESM(require_react());

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react5 = __toESM(require_react());

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/Icon.js
var import_react4 = __toESM(require_react());

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = (0, import_react4.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return (0, import_react4.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react4.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react5.forwardRef)(
    ({ className, ...props }, ref) => (0, import_react5.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/log-out.js
var LogOut = createLucideIcon("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);

// node_modules/lucide-react/dist/esm/icons/message-circle.js
var MessageCircle = createLucideIcon("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);

// node_modules/lucide-react/dist/esm/icons/pause.js
var Pause = createLucideIcon("Pause", [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
]);

// node_modules/lucide-react/dist/esm/icons/play.js
var Play = createLucideIcon("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);

// node_modules/lucide-react/dist/esm/icons/skip-forward.js
var SkipForward = createLucideIcon("SkipForward", [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
]);

// node_modules/lucide-react/dist/esm/icons/volume-2.js
var Volume2 = createLucideIcon("Volume2", [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
]);

// node_modules/lucide-react/dist/esm/icons/volume-x.js
var VolumeX = createLucideIcon("VolumeX", [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
]);

// src/types.ts
var defaultAchievements = [
  {
    id: "ten-words",
    name: "Novice Speller",
    description: "Get 10 words correct",
    icon: "\u{1F423}",
    threshold: 10
  },
  {
    id: "fifty-words",
    name: "Word Wizard",
    description: "Get 50 words correct",
    icon: "\u{1F9D9}",
    threshold: 50
  },
  {
    id: "hundred-words",
    name: "Master Speller",
    description: "Get 100 words correct",
    icon: "\u{1F3C6}",
    threshold: 100
  }
];

// src/audio/correct.mp3
var correct_default = "./correct-CDLB3FN7.mp3";

// src/audio/wrong.mp3
var wrong_default = "./wrong-6QW3YAUM.mp3";

// src/audio/letter-correct.mp3
var letter_correct_default = "./letter-correct-TNM22ZIU.mp3";

// src/audio/letter-wrong.mp3
var letter_wrong_default = "./letter-wrong-R6BJ3H3U.mp3";

// src/audio/shop.mp3
var shop_default = "./shop-VORVBPWL.mp3";

// src/audio/lose-life.mp3
var lose_life_default = "./lose-life-IZ47IOLH.mp3";

// src/utils/confetti.ts
var launchConfetti = async () => {
  if (typeof window === "undefined") return;
  const confetti = (await Promise.resolve().then(() => (init_confetti_module(), confetti_module_exports))).default;
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// src/utils/tts.ts
var speak = (text, options = {}) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  const { voice, rate, pitch } = options;
  if (voice) {
    utterance.voice = voice;
  } else {
    const savedVoice = localStorage.getItem("selectedVoice");
    if (savedVoice) {
      const voices = window.speechSynthesis.getVoices();
      const matched = voices.find((v) => v.voiceURI === savedVoice || v.name === savedVoice);
      if (matched) utterance.voice = matched;
    }
  }
  if (rate) utterance.rate = rate;
  if (pitch) utterance.pitch = pitch;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

// src/utils/useSound.ts
var import_react6 = __toESM(require_react());
function useSound(audioFile, enabled = true) {
  const audioRef = (0, import_react6.useRef)(null);
  if (!audioRef.current && audioFile) {
    audioRef.current = new Audio(audioFile);
    audioRef.current.preload = "auto";
  }
  const playSound = (0, import_react6.useCallback)(() => {
    if (!enabled || !audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.debug("Audio play failed:", error);
      });
    } catch (error) {
      console.debug("Audio play error:", error);
    }
  }, [enabled]);
  return playSound;
}

// src/utils/useTimer.ts
var import_react7 = __toESM(require_react());
var useTimer = (duration, onExpire) => {
  const [timeLeft, setTimeLeft] = (0, import_react7.useState)(duration);
  const [isPaused, setIsPaused] = (0, import_react7.useState)(false);
  const intervalRef = (0, import_react7.useRef)(null);
  const clear = () => clearInterval(intervalRef.current);
  const tick = (0, import_react7.useCallback)(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clear();
        onExpire();
        return 0;
      }
      return prev - 1;
    });
  }, [onExpire]);
  const start = (0, import_react7.useCallback)(() => {
    clear();
    setTimeLeft(duration);
    intervalRef.current = setInterval(tick, 1e3);
    setIsPaused(false);
  }, [duration, tick]);
  const pause = (0, import_react7.useCallback)(() => {
    clear();
    setIsPaused(true);
  }, []);
  const resume = (0, import_react7.useCallback)(() => {
    if (!isPaused) return;
    intervalRef.current = setInterval(tick, 1e3);
    setIsPaused(false);
  }, [isPaused, tick]);
  const reset = (0, import_react7.useCallback)(() => setTimeLeft(duration), [duration]);
  const stop = (0, import_react7.useCallback)(() => {
    clear();
  }, []);
  const addSeconds = (0, import_react7.useCallback)((seconds) => {
    setTimeLeft((prev) => prev + seconds);
  }, []);
  (0, import_react7.useEffect)(() => () => clear(), []);
  return { timeLeft, start, pause, resume, reset, stop, isPaused, addSeconds };
};
var useTimer_default = useTimer;

// src/audio/timeout.mp3
var timeout_default = "./timeout-D7RUQ2LC.mp3";

// src/hooks/useGameTimer.ts
var useGameTimer = (duration, soundEnabled, onExpire) => {
  const playTimeout = useSound(timeout_default, soundEnabled);
  return useTimer_default(duration, () => {
    playTimeout();
    onExpire();
  });
};
var useGameTimer_default = useGameTimer;

// src/hooks/useWordProgression.ts
var import_react9 = __toESM(require_react());

// src/utils/useWordSelection.ts
var import_react8 = __toESM(require_react());
var difficultyOrder = ["easy", "medium", "tricky", "review"];
var shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
var useWordSelection = (db) => {
  const [wordQueues, setWordQueues] = (0, import_react8.useState)({
    easy: shuffleArray(db.easy),
    medium: shuffleArray(db.medium),
    tricky: shuffleArray(db.tricky),
    review: []
  });
  const [currentWord, setCurrentWord] = (0, import_react8.useState)(null);
  const [currentDifficulty, setCurrentDifficulty] = (0, import_react8.useState)("easy");
  const selectNextWord = (0, import_react8.useCallback)(
    (level) => {
      let index = Math.min(level, difficultyOrder.length - 1);
      let nextWord = null;
      let nextDifficulty = difficultyOrder[index];
      while (index < difficultyOrder.length) {
        const diff = difficultyOrder[index];
        const queue = wordQueues[diff];
        if (queue.length > 0) {
          nextWord = queue[0];
          setWordQueues((prev) => ({ ...prev, [diff]: prev[diff].slice(1) }));
          nextDifficulty = diff;
          break;
        }
        index++;
      }
      setCurrentDifficulty(nextDifficulty);
      setCurrentWord(nextWord);
      return nextWord;
    },
    [wordQueues]
  );
  return { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWord, setCurrentWord };
};
var useWordSelection_default = useWordSelection;

// src/hooks/useWordProgression.ts
var useWordProgression = (wordDatabase) => {
  const { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWord } = useWordSelection_default(wordDatabase);
  const selectNextWordForLevel = import_react9.default.useCallback(
    (level) => {
      return selectNextWord(level);
    },
    [selectNextWord]
  );
  return { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWordForLevel };
};
var useWordProgression_default = useWordProgression;

// src/components/OnScreenKeyboard.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var letters = Array.from(
  { length: 26 },
  (_, i) => String.fromCharCode(65 + i)
);
var OnScreenKeyboard = ({
  onLetter,
  onBackspace,
  onSubmit,
  soundEnabled,
  usedLetters,
  currentWord,
  "aria-label": ariaLabel
}) => {
  const playLetterSound = useSound(letter_correct_default, soundEnabled);
  const handleLetterClick = (letter) => {
    playLetterSound();
    onLetter(letter);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-wrap justify-center gap-3 mt-8 px-4", children: [
    letters.map((letter) => {
      const lower = letter.toLowerCase();
      const isUsed = usedLetters?.has(lower) ?? false;
      const isDisabled = false;
      if (currentWord) {
        const targetLetter = currentWord[letters.indexOf(letter)]?.toLowerCase();
        const isHighlighted = lower === targetLetter;
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            onClick: () => handleLetterClick(lower),
            disabled: isUsed || isDisabled,
            className: `w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg ${isUsed ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50" : isDisabled ? "bg-gray-600 text-gray-800 cursor-not-allowed opacity-50" : isHighlighted ? "bg-gradient-to-br from-kahoot-blue-400 to-kahoot-blue-600 text-white hover:from-kahoot-blue-500 hover:to-kahoot-blue-700 animate-glow" : "bg-gradient-to-br from-kahoot-yellow-400 to-kahoot-yellow-600 text-black hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700"}`,
            children: letter
          },
          letter
        );
      } else {
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            onClick: () => handleLetterClick(lower),
            disabled: isUsed || isDisabled,
            className: `w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg ${isUsed ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50" : isDisabled ? "bg-gray-600 text-gray-800 cursor-not-allowed opacity-50" : "bg-gradient-to-br from-kahoot-yellow-400 to-kahoot-yellow-600 text-black hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700"}`,
            children: letter
          },
          letter
        );
      }
    }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        onClick: () => {
          handleLetterClick("");
          onBackspace();
        },
        className: "w-16 h-12 md:w-20 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg",
        "aria-label": "Backspace",
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { "aria-hidden": "true", children: "\u232B" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        onClick: () => {
          handleLetterClick("");
          onSubmit();
        },
        className: "w-16 h-12 md:w-20 md:h-16 bg-gradient-to-br from-kahoot-green-500 to-kahoot-green-600 hover:from-kahoot-green-600 hover:to-kahoot-green-700 text-white text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg animate-glow",
        "aria-label": "Submit",
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { "aria-hidden": "true", children: "\u2705" })
      }
    )
  ] });
};
var OnScreenKeyboard_default = OnScreenKeyboard;

// src/components/HintPanel.tsx
var import_react10 = __toESM(require_react());

// src/utils/battleProgression.ts
var BATTLE_POWERS = [
  // ── Available from the start of the game (unlockAt: 0) ──────────────────
  {
    id: "sentence",
    name: "Sentence Hint",
    description: "See the word used in a real sentence. Understanding the context helps you connect meaning to spelling.",
    icon: "\u{1F4DD}",
    cost: 1,
    unlockAt: 0
  },
  {
    id: "syllables",
    name: "Syllable Breakdown",
    description: "Break the word into smaller sound chunks. Spell one part at a time instead of guessing the whole word.",
    icon: "\u{1F9E9}",
    cost: 1,
    unlockAt: 0
  },
  {
    id: "wordLength",
    name: "Word Length Hint",
    description: "See how many letters are in the word. Knowing the length helps you plan your spelling from the start.",
    icon: "\u{1F522}",
    cost: 1,
    unlockAt: 0
  },
  // ── Unlock at 2 combined correct ─────────────────────────────────────────
  {
    id: "definition",
    name: "Definition Hint",
    description: "See what the word means. Understanding the meaning helps you connect it to how it's spelled.",
    icon: "\u{1F4D6}",
    cost: 1,
    unlockAt: 2
  },
  // ── Unlock at 4 combined correct ─────────────────────────────────────────
  {
    id: "extraTime",
    name: "Extra Time",
    description: "Add 15 seconds to the timer! Use this when your team needs more thinking time. Once per word.",
    icon: "\u23F1\uFE0F",
    cost: 2,
    unlockAt: 4
  },
  // ── Unlock at 6 combined correct ─────────────────────────────────────────
  {
    id: "soundItOut",
    name: "Sound It Out Hint",
    description: "Get the phonetic breakdown of the word. Hearing each sound helps your team spell it correctly.",
    icon: "\u{1F50A}",
    cost: 2,
    unlockAt: 6
  },
  // ── Unlock at 8 combined correct ─────────────────────────────────────────
  {
    id: "affixes",
    name: "Prefix / Suffix / Root Hint",
    description: "See the word broken into its parts \u2014 prefix, root, and suffix. Word structure reveals spelling patterns.",
    icon: "\u{1F520}",
    cost: 2,
    unlockAt: 8
  },
  // ── Unlock at 10 combined correct ────────────────────────────────────────
  {
    id: "spellingPattern",
    name: "Spelling Pattern Hint",
    description: "Get a clue about the word's spelling pattern \u2014 like a silent letter, double consonant, or special ending.",
    icon: "\u{1F9E0}",
    cost: 2,
    unlockAt: 10
  },
  // ── Unlock at 12 combined correct ────────────────────────────────────────
  {
    id: "origin",
    name: "Origin Hint",
    description: "Find out where the word comes from. A word's language of origin often explains why it's spelled the way it is.",
    icon: "\u{1F30D}",
    cost: 2,
    unlockAt: 12
  },
  // ── Unlock at 14 combined correct ────────────────────────────────────────
  {
    id: "multipleAttempts",
    name: "Multiple Attempts",
    description: "Get one extra chance to spell the word. Use it wisely \u2014 your team only gets one bonus attempt per word.",
    icon: "\u{1F3AF}",
    cost: 3,
    unlockAt: 14
  },
  // ── Unlock at 16 combined correct ────────────────────────────────────────
  {
    id: "vowels",
    name: "Vowel Reveal",
    description: "All vowels in the word are revealed! Use this to narrow down the spelling when the consonants are the hard part.",
    icon: "\u{1F524}",
    cost: 3,
    unlockAt: 16
  },
  // ── Unlock at 18 combined correct ────────────────────────────────────────
  {
    id: "hangman",
    name: "Hangman-Style Reveal",
    description: "One hidden letter is revealed at random. If vowels are already shown, a consonant will be chosen first.",
    icon: "\u{1F575}\uFE0F",
    cost: 3,
    unlockAt: 18
  },
  // ── Unlock at 20 combined correct ────────────────────────────────────────
  {
    id: "quickPeek",
    name: "Quick Peek",
    description: "The full word flashes on screen for 1.5 seconds! Your team must memorise it and spell it from memory. Once per word.",
    icon: "\u{1F50D}",
    cost: 4,
    unlockAt: 20
  },
  // ── Unlock at 22 combined correct ────────────────────────────────────────
  {
    id: "friendSub",
    name: "Friend Substitution",
    description: "Swap the current speller with a teammate. A fresh perspective can make all the difference!",
    icon: "\u{1F465}",
    cost: 4,
    unlockAt: 22
  },
  // ── Unlock at 24 combined correct ────────────────────────────────────────
  {
    id: "skipWord",
    name: "Skip Word",
    description: "Skip this word and move on \u2014 no life lost, but no points earned either. The word is saved for review.",
    icon: "\u23ED\uFE0F",
    cost: 5,
    unlockAt: 24
  }
];
function getNewlyUnlockedPowers(previousCount, newCount) {
  return BATTLE_POWERS.filter(
    (p) => p.unlockAt > previousCount && p.unlockAt <= newCount
  );
}
function getUnlockedPowerIds(totalCorrect) {
  return BATTLE_POWERS.filter((p) => p.unlockAt <= totalCorrect).map((p) => p.id);
}

// src/components/HintPanel.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var getPowerCost = (id) => BATTLE_POWERS.find((p) => p.id === id)?.cost ?? 0;
var ONCE_PER_WORD = /* @__PURE__ */ new Set(["extraTime", "multipleAttempts", "vowels", "quickPeek"]);
var MAX_HINTS_BEFORE_ATTEMPT = 2;
var QUICK_PEEK_DURATION_MS = 1500;
function getSpellingPattern(word) {
  const w = word.toLowerCase();
  if (w.includes("ph")) return 'This word uses "ph" for the /f/ sound.';
  if (/tion$/.test(w)) return 'This word ends with "-tion" (sounds like "shun").';
  if (/sion$/.test(w)) return 'This word ends with "-sion".';
  if (/ough/.test(w)) return 'This word contains "-ough", which can sound different ways.';
  if (/ight$/.test(w)) return 'This word ends with "-ight" \u2014 the "gh" is silent.';
  if (/ness$/.test(w)) return 'This word ends with "-ness".';
  if (/ment$/.test(w)) return 'This word ends with "-ment".';
  if (/able$/.test(w)) return 'This word ends with "-able".';
  if (/ible$/.test(w)) return 'This word ends with "-ible".';
  if (/ful$/.test(w)) return 'This word ends with "-ful".';
  const dc = /([bcdfghjklmnpqrstvwxyz])\1/i.exec(w);
  if (dc) return `This word has a double "${dc[1].toUpperCase()}".`;
  if (/[aeiou][^aeiou]e$/.test(w)) return "This word follows the silent-e pattern (vowel \u2192 consonant \u2192 silent e).";
  return null;
}
var HintPanel = ({
  word,
  participantPoints,
  participantIndex,
  spendPoints,
  onHintUsed,
  onExtraAttempt,
  unlockedPowers,
  hasAttemptedCurrentWord = false,
  onAddTime,
  onSkipWord
}) => {
  const [showSentence, setShowSentence] = (0, import_react10.useState)(false);
  const [showSyllables, setShowSyllables] = (0, import_react10.useState)(false);
  const [showWordLength, setShowWordLength] = (0, import_react10.useState)(false);
  const [showDefinition, setShowDefinition] = (0, import_react10.useState)(false);
  const [showSoundItOut, setShowSoundItOut] = (0, import_react10.useState)(false);
  const [showAffixes, setShowAffixes] = (0, import_react10.useState)(false);
  const [showSpellingPattern, setShowSpellingPattern] = (0, import_react10.useState)(false);
  const [showOrigin, setShowOrigin] = (0, import_react10.useState)(false);
  const [revealedLetters, setRevealedLetters] = (0, import_react10.useState)([]);
  const [quickPeekVisible, setQuickPeekVisible] = (0, import_react10.useState)(false);
  const quickPeekTimer = (0, import_react10.useRef)(null);
  const [hintsBeforeAttempt, setHintsBeforeAttempt] = (0, import_react10.useState)(0);
  const [usedOncePowers, setUsedOncePowers] = (0, import_react10.useState)(/* @__PURE__ */ new Set());
  const [validationMsg, setValidationMsg] = (0, import_react10.useState)("");
  const validationTimer = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    if (!word) return;
    setShowSentence(false);
    setShowSyllables(false);
    setShowWordLength(false);
    setShowDefinition(false);
    setShowSoundItOut(false);
    setShowAffixes(false);
    setShowSpellingPattern(false);
    setShowOrigin(false);
    setRevealedLetters(Array(word.word.length).fill(false));
    setQuickPeekVisible(false);
    setHintsBeforeAttempt(0);
    setUsedOncePowers(/* @__PURE__ */ new Set());
    setValidationMsg("");
    if (quickPeekTimer.current) clearTimeout(quickPeekTimer.current);
    if (validationTimer.current) clearTimeout(validationTimer.current);
  }, [word]);
  if (!word) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-5 w-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-yellow-700", children: "No word selected. Please wait for the next word." }) })
    ] }) });
  }
  const sentenceText = word.example || "";
  const syllableText = word.syllables?.join("-") || "";
  const wordLengthCount = word.word.replace(/[^a-zA-Z]/g, "").length;
  const wordLengthBlanks = word.word.split("").map((ch) => /[a-zA-Z]/.test(ch) ? "_" : ch).join(" ");
  const definitionText = word.definition || "";
  const soundItOutText = word.pronunciation || (word.phonemes?.join("-") ?? "");
  const originText = word.origin || "";
  const prefixText = word.prefix || "";
  const suffixText = word.suffix || "";
  const prefixMeaning = word.prefixMeaning || "";
  const suffixMeaning = word.suffixMeaning || "";
  const spellingPatternText = getSpellingPattern(word.word);
  const isPowerUnlocked = (id) => !unlockedPowers || unlockedPowers.includes(id);
  const showValidation = (msg) => {
    setValidationMsg(msg);
    if (validationTimer.current) clearTimeout(validationTimer.current);
    validationTimer.current = setTimeout(() => setValidationMsg(""), 4e3);
  };
  const tryUsePower = (powerId, countAsHint = true) => {
    const cost = getPowerCost(powerId);
    if (participantPoints < cost) {
      showValidation(
        `Not enough points \u2014 this hint costs ${cost} point${cost === 1 ? "" : "s"} and you have ${participantPoints}.`
      );
      return false;
    }
    if (ONCE_PER_WORD.has(powerId) && usedOncePowers.has(powerId)) {
      showValidation("You have already used this power for this word.");
      return false;
    }
    if (countAsHint && unlockedPowers && !hasAttemptedCurrentWord && hintsBeforeAttempt >= MAX_HINTS_BEFORE_ATTEMPT) {
      showValidation(
        `You can only use ${MAX_HINTS_BEFORE_ATTEMPT} hints before your first attempt. Make a spelling attempt first!`
      );
      return false;
    }
    spendPoints(participantIndex, cost);
    onHintUsed();
    if (countAsHint && unlockedPowers && !hasAttemptedCurrentWord) {
      setHintsBeforeAttempt((prev) => prev + 1);
    }
    if (ONCE_PER_WORD.has(powerId)) {
      setUsedOncePowers((prev) => new Set(prev).add(powerId));
    }
    return true;
  };
  const handleSentence = () => {
    if (!isPowerUnlocked("sentence") || showSentence) return;
    if (!tryUsePower("sentence")) return;
    setShowSentence(true);
  };
  const handleSyllables = () => {
    if (!isPowerUnlocked("syllables") || showSyllables) return;
    if (!tryUsePower("syllables")) return;
    setShowSyllables(true);
  };
  const handleWordLength = () => {
    if (!isPowerUnlocked("wordLength") || showWordLength) return;
    if (!tryUsePower("wordLength")) return;
    setShowWordLength(true);
  };
  const handleDefinition = () => {
    if (!isPowerUnlocked("definition") || showDefinition) return;
    if (!tryUsePower("definition")) return;
    setShowDefinition(true);
  };
  const handleExtraTime = () => {
    if (!isPowerUnlocked("extraTime")) return;
    if (!tryUsePower("extraTime")) return;
    onAddTime?.();
  };
  const handleSoundItOut = () => {
    if (!isPowerUnlocked("soundItOut") || showSoundItOut) return;
    if (!tryUsePower("soundItOut")) return;
    setShowSoundItOut(true);
  };
  const handleAffixes = () => {
    if (!isPowerUnlocked("affixes") || showAffixes) return;
    if (!prefixText && !suffixText) {
      showValidation("No prefix or suffix data is available for this word.");
      return;
    }
    if (!tryUsePower("affixes")) return;
    setShowAffixes(true);
  };
  const handleSpellingPattern = () => {
    if (!isPowerUnlocked("spellingPattern") || showSpellingPattern) return;
    if (!tryUsePower("spellingPattern")) return;
    setShowSpellingPattern(true);
  };
  const handleOrigin = () => {
    if (!isPowerUnlocked("origin") || showOrigin) return;
    if (!tryUsePower("origin")) return;
    setShowOrigin(true);
  };
  const handleMultipleAttempts = () => {
    if (!isPowerUnlocked("multipleAttempts")) return;
    if (!tryUsePower("multipleAttempts")) return;
    onExtraAttempt();
  };
  const handleVowelReveal = () => {
    if (!isPowerUnlocked("vowels")) return;
    if (!tryUsePower("vowels")) return;
    setRevealedLetters(word.word.split("").map((l, i) => revealedLetters[i] || "aeiouAEIOU".includes(l)));
  };
  const handleHangmanReveal = () => {
    if (!isPowerUnlocked("hangman")) return;
    const unrevealedLetterIndices = revealedLetters.map((r, i) => !r && /[a-zA-Z]/.test(word.word[i]) ? i : null).filter((i) => i !== null);
    if (unrevealedLetterIndices.length === 0) {
      showValidation("All letters are already revealed!");
      return;
    }
    if (!tryUsePower("hangman")) return;
    const pick = unrevealedLetterIndices[Math.floor(Math.random() * unrevealedLetterIndices.length)];
    setRevealedLetters((prev) => {
      const next = [...prev];
      next[pick] = true;
      return next;
    });
  };
  const handleQuickPeek = () => {
    if (!isPowerUnlocked("quickPeek")) return;
    if (!tryUsePower("quickPeek")) return;
    setQuickPeekVisible(true);
    if (quickPeekTimer.current) clearTimeout(quickPeekTimer.current);
    quickPeekTimer.current = setTimeout(() => setQuickPeekVisible(false), QUICK_PEEK_DURATION_MS);
  };
  const handleFriendSub = () => {
    if (!isPowerUnlocked("friendSub")) return;
    showValidation("Friend Substitution is not available yet.");
  };
  const handleSkipWord = () => {
    if (!isPowerUnlocked("skipWord")) return;
    if (!tryUsePower("skipWord", false)) return;
    onSkipWord?.();
  };
  const lockedPowers = unlockedPowers ? BATTLE_POWERS.filter((p) => !unlockedPowers.includes(p.id)) : [];
  const nextLockedPower = lockedPowers[0] ?? null;
  const btnBase = "flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all duration-200";
  const btnPrimary = `${btnBase} bg-yellow-300 hover:bg-yellow-400 text-black disabled:opacity-40`;
  const btnBlue = `${btnBase} bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-40`;
  const btnPurple = `${btnBase} bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-40`;
  const btnPink = `${btnBase} bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-40`;
  const btnOrange = `${btnBase} bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40`;
  const btnTeal = `${btnBase} bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-40`;
  const btnRed = `${btnBase} bg-red-500 hover:bg-red-600 text-white disabled:opacity-40`;
  const canAfford = (id) => participantPoints >= getPowerCost(id);
  const isOnceUsed = (id) => ONCE_PER_WORD.has(id) && usedOncePowers.has(id);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-white/10 p-4 rounded-xl mb-6 space-y-3", children: [
    quickPeekVisible && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        className: "fixed inset-0 bg-black/85 flex items-center justify-center z-[70] pointer-events-none",
        role: "status",
        "aria-live": "assertive",
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-white/60 text-sm mb-2 uppercase tracking-widest font-bold", children: "\u{1F50D} Quick Peek!" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-5xl font-black text-yellow-300 drop-shadow-2xl", children: word.word }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-white/50 text-xs mt-3", children: [
            "Memorize it \u2014 it disappears in ",
            QUICK_PEEK_DURATION_MS / 1e3,
            "s"
          ] })
        ] })
      }
    ),
    validationMsg && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-red-500/20 border border-red-400/50 rounded-lg px-3 py-2 text-sm text-red-200 font-medium", role: "alert", children: [
      "\u26A0\uFE0F ",
      validationMsg
    ] }),
    !hasAttemptedCurrentWord && unlockedPowers && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `text-xs text-center font-bold ${hintsBeforeAttempt >= MAX_HINTS_BEFORE_ATTEMPT ? "text-red-300" : "text-white/60"}`, children: hintsBeforeAttempt >= MAX_HINTS_BEFORE_ATTEMPT ? "\u{1F6AB} Hint limit reached \u2014 make a spelling attempt first!" : `\u{1F4A1} Hints used before attempt: ${hintsBeforeAttempt} / ${MAX_HINTS_BEFORE_ATTEMPT}` }),
    revealedLetters.some((r) => r) && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-3xl font-mono text-center tracking-widest py-1", children: word.word.split("").map((ch, i) => {
      if (!/[a-zA-Z]/.test(ch)) return ch;
      return revealedLetters[i] ? ch : "_";
    }).join(" ") }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-2", children: [
      showWordLength && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-blue-500/20 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-blue-200 font-bold text-sm", children: "\u{1F522} Word Length: " }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-white text-sm", children: [
          "This word has ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: wordLengthCount }),
          " letter",
          wordLengthCount === 1 ? "" : "s",
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-mono text-lg text-white/80 mt-1 tracking-widest", children: wordLengthBlanks })
      ] }),
      showSentence && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-green-500/20 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-green-200 font-bold text-sm", children: "\u{1F4DD} Sentence: " }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-white text-sm italic", children: [
          '"',
          sentenceText || "No sentence hint is available for this word.",
          '"'
        ] })
      ] }),
      showSyllables && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-yellow-500/20 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-yellow-200 font-bold text-sm", children: "\u{1F9E9} Syllables: " }),
        syllableText ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-white text-sm", children: word.syllables.map((syl, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            onClick: () => speak(syl),
            className: "inline-block mx-0.5 px-1.5 py-0.5 bg-yellow-300/30 hover:bg-yellow-300/50 text-yellow-100 rounded text-sm font-mono transition",
            title: "Click to hear this syllable",
            children: syl
          },
          i
        )) }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-white/70 text-sm italic", children: "No syllable breakdown is available for this word." })
      ] }),
      showDefinition && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-amber-500/20 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-amber-200 font-bold text-sm", children: "\u{1F4D6} Definition: " }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-white text-sm", children: definitionText || "No definition is available for this word." })
      ] }),
      showSoundItOut && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-cyan-500/20 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-cyan-200 font-bold text-sm", children: "\u{1F50A} Sound It Out: " }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-white text-sm font-mono", children: soundItOutText || "No sound-it-out hint is available for this word." })
      ] }),
      showAffixes && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-orange-500/20 rounded-lg px-3 py-2 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-orange-200 font-bold text-sm block", children: "\u{1F520} Word Parts:" }),
        prefixText ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-white text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "Prefix:" }),
          " ",
          prefixText,
          prefixMeaning && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-white/70", children: [
            ' \u2014 "',
            prefixMeaning,
            '"'
          ] })
        ] }) : null,
        suffixText ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-white text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "Suffix:" }),
          " ",
          suffixText,
          suffixMeaning && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-white/70", children: [
            ' \u2014 "',
            suffixMeaning,
            '"'
          ] })
        ] }) : null,
        !prefixText && !suffixText && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-white/70 text-sm italic", children: "No word-part hint is available for this word." })
      ] }),
      showSpellingPattern && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-violet-500/20 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-violet-200 font-bold text-sm", children: "\u{1F9E0} Spelling Pattern: " }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-white text-sm", children: spellingPatternText || "No spelling pattern hint is available for this word." })
      ] }),
      showOrigin && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-emerald-500/20 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-emerald-200 font-bold text-sm", children: "\u{1F30D} Origin: " }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-white text-sm", children: originText || "No origin hint is available for this word." })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-wrap gap-2 justify-center pt-1", children: [
      isPowerUnlocked("sentence") && !showSentence && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleSentence, disabled: !canAfford("sentence"), className: btnPrimary, children: [
        "\u{1F4DD} Sentence ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("sentence"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("syllables") && !showSyllables && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleSyllables, disabled: !canAfford("syllables"), className: btnPrimary, children: [
        "\u{1F9E9} Syllables ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("syllables"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("wordLength") && !showWordLength && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleWordLength, disabled: !canAfford("wordLength"), className: btnPrimary, children: [
        "\u{1F522} Word Length ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("wordLength"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("definition") && !showDefinition && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleDefinition, disabled: !canAfford("definition"), className: btnPrimary, children: [
        "\u{1F4D6} Definition ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("definition"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("extraTime") && !isOnceUsed("extraTime") && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleExtraTime, disabled: !canAfford("extraTime"), className: btnBlue, children: [
        "\u23F1\uFE0F +15s ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("extraTime"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("soundItOut") && !showSoundItOut && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleSoundItOut, disabled: !canAfford("soundItOut"), className: btnBlue, children: [
        "\u{1F50A} Sound It Out ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("soundItOut"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("affixes") && !showAffixes && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleAffixes, disabled: !canAfford("affixes"), className: btnOrange, children: [
        "\u{1F520} Word Parts ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("affixes"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("spellingPattern") && !showSpellingPattern && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleSpellingPattern, disabled: !canAfford("spellingPattern"), className: btnPurple, children: [
        "\u{1F9E0} Pattern ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("spellingPattern"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("origin") && !showOrigin && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleOrigin, disabled: !canAfford("origin"), className: btnTeal, children: [
        "\u{1F30D} Origin ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("origin"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("multipleAttempts") && !isOnceUsed("multipleAttempts") && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleMultipleAttempts, disabled: !canAfford("multipleAttempts"), className: btnPink, children: [
        "\u{1F3AF} Multiple Attempts ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("multipleAttempts"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("vowels") && !isOnceUsed("vowels") && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleVowelReveal, disabled: !canAfford("vowels"), className: btnPurple, children: [
        "\u{1F524} Vowel Reveal ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("vowels"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("hangman") && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleHangmanReveal, disabled: !canAfford("hangman"), className: btnBlue, children: [
        "\u{1F575}\uFE0F Reveal Letter ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("hangman"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("quickPeek") && !isOnceUsed("quickPeek") && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleQuickPeek, disabled: !canAfford("quickPeek"), className: btnOrange, children: [
        "\u{1F50D} Quick Peek ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("quickPeek"),
          ")"
        ] })
      ] }),
      isPowerUnlocked("friendSub") && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: handleFriendSub, className: btnPink, children: "\u{1F465} Friend Sub" }),
      isPowerUnlocked("skipWord") && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: handleSkipWord, disabled: !canAfford("skipWord"), className: btnRed, children: [
        "\u23ED\uFE0F Skip Word ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "opacity-70 text-xs", children: [
          "(-",
          getPowerCost("skipWord"),
          ")"
        ] })
      ] })
    ] }),
    unlockedPowers && lockedPowers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-4 border-t border-white/20 pt-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-white/50 text-xs text-center mb-2 font-bold uppercase tracking-wider", children: "\u{1F512} Coming up next\u2026" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-wrap justify-center gap-2", children: [
        lockedPowers.slice(0, 6).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "div",
          {
            className: "flex flex-col items-center gap-0.5 opacity-50 max-w-[60px]",
            "aria-label": `${p.name} \u2014 locked. Unlocks after ${p.unlockAt} correct answer${p.unlockAt === 1 ? "" : "s"}. Costs ${p.cost} point${p.cost === 1 ? "" : "s"}. ${p.description}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xl grayscale", "aria-hidden": "true", children: p.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-xs text-white/60 text-center leading-tight", children: [
                i === 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-yellow-300 font-bold block", "aria-hidden": "true", children: [
                  "@",
                  p.unlockAt,
                  "\u2713"
                ] }),
                p.name
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-xs text-white/40", children: [
                "-",
                p.cost,
                "pt"
              ] })
            ]
          },
          p.id
        )),
        lockedPowers.length > 6 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center gap-0.5 opacity-40", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xl", children: "\u2026" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-xs text-white/40", children: [
            lockedPowers.length - 6,
            " more"
          ] })
        ] })
      ] }),
      nextLockedPower && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "mt-2 text-white/40 text-xs text-center", children: [
        "Next: ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("strong", { className: "text-white/70", children: [
          nextLockedPower.icon,
          " ",
          nextLockedPower.name
        ] }),
        " ",
        "at ",
        nextLockedPower.unlockAt,
        " correct answer",
        nextLockedPower.unlockAt === 1 ? "" : "s",
        " \xB7 ",
        nextLockedPower.cost,
        "pt"
      ] })
    ] })
  ] });
};
var HintPanel_default = HintPanel;

// src/components/AvatarSelector.tsx
var import_react11 = __toESM(require_react());

// src/constants/avatars.ts
var avatars = {
  bee: { name: "Bee", icon: IMAGE_ASSETS.avatars.bee },
  book: { name: "Book", icon: IMAGE_ASSETS.avatars.book },
  trophy: { name: "Trophy", icon: IMAGE_ASSETS.avatars.trophy },
  wizard: { name: "Wizard", icon: IMAGE_ASSETS.avatars.bee },
  ninja: { name: "Ninja", icon: IMAGE_ASSETS.avatars.book }
};

// src/components/AvatarSelector.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
function AvatarSelector({
  currentAvatar,
  onSelect,
  availableAvatars,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy
}) {
  const avatarListRef = (0, import_react11.useRef)(null);
  const displayAvatars = availableAvatars && availableAvatars.length > 0 ? Object.fromEntries(
    availableAvatars.filter((key) => key in avatars).map((key) => [key, avatars[key]])
  ) : avatars;
  (0, import_react11.useEffect)(() => {
    const handleKeyDown = (e) => {
      if (!avatarListRef.current) return;
      const buttons = Array.from(
        avatarListRef.current.querySelectorAll('[role="radio"]')
      );
      if (!buttons.length) return;
      const currentIndex = buttons.findIndex(
        (button) => button.getAttribute("aria-checked") === "true"
      );
      let nextIndex = currentIndex;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIndex = (currentIndex + 1) % buttons.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
          break;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = buttons.length - 1;
          break;
        default:
          return;
      }
      buttons[nextIndex]?.focus();
    };
    const list = avatarListRef.current;
    list?.addEventListener("keydown", handleKeyDown);
    return () => {
      list?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "div",
    {
      ref: avatarListRef,
      role: "radiogroup",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      className: "avatar-selector flex flex-wrap gap-4 p-2",
      children: Object.entries(displayAvatars).map(([key, avatar]) => {
        const isSelected = currentAvatar === key;
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            role: "radio",
            "aria-checked": isSelected,
            tabIndex: isSelected ? 0 : -1,
            className: `avatar-option p-2 rounded-full transition-all ${isSelected ? "ring-4 ring-yellow-400 scale-110" : "hover:bg-white/20 focus:ring-2 focus:ring-yellow-400"}`,
            onClick: () => onSelect(key),
            "aria-label": `Select ${avatar.name} avatar`,
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "img",
              {
                src: avatar.icon,
                alt: "",
                className: "w-12 h-12",
                "aria-hidden": "true"
              }
            )
          },
          key
        );
      })
    }
  );
}

// src/components/PhonicsBreakdown.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var PhonicsBreakdown = ({ phonemes }) => {
  if (!phonemes.length) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "mb-3 text-xl font-black text-yellow-300", children: "Phonics Breakdown" }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-wrap justify-center gap-2", children: phonemes.map((symbol, idx) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "button",
      {
        type: "button",
        onClick: () => speak(symbol, { rate: 0.75 }),
        className: "rounded-xl bg-yellow-300 px-4 py-2 font-black text-black transition hover:bg-yellow-400",
        children: symbol
      },
      `${symbol}-${idx}`
    )) })
  ] });
};
var PhonicsBreakdown_default = PhonicsBreakdown;

// src/components/ScoreCard.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var levelLabels = ["Easy", "Medium", "Tricky"];
var ScoreCard = ({ participant, isActive, displayName, hideName }) => {
  const level = levelLabels[Math.max(0, Math.min(levelLabels.length - 1, participant.difficultyLevel || 0))];
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      className: `scorecard transition-transform text-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md ${isActive ? "border-yellow-300 shadow-lg scale-105" : "shadow-md"}`,
      children: [
        hideName ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [
          participant.avatar && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { src: participant.avatar, alt: "", className: "h-10 w-10 rounded-full border-2 border-yellow-300 bg-white/20 object-cover" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-xl font-bold text-white drop-shadow-sm", children: displayName })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "max-w-48 truncate text-2xl font-bold text-white drop-shadow-sm", title: participant.name, children: participant.name }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "div",
          {
            className: "mt-2 flex flex-wrap justify-center gap-1 text-4xl leading-none",
            "aria-label": `${participant.lives} lives`,
            children: Array.from({ length: participant.lives }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "font-bold text-yellow-300", children: "\u2764\uFE0F" }, index))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mt-2 text-xl font-bold text-green-300 drop-shadow-sm", children: [
          participant.points,
          " pts"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "mt-2 rounded-full bg-black/30 px-3 py-1 text-sm font-black uppercase tracking-wide text-yellow-200", children: level })
      ]
    }
  );
};
var ScoreCard_default = ScoreCard;

// src/components/ParticipantStats.tsx
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var ParticipantStats = ({ participants, currentIndex, hideNames = false, isTeamMode = false }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "absolute top-8 left-8 flex gap-6 items-center z-40", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: "img/avatars/bee.svg", alt: "Bee icon", className: "w-16 h-16 animate-wiggle" }),
    participants.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      ScoreCard_default,
      {
        participant: p,
        isActive: index === currentIndex,
        hideName: hideNames,
        displayName: isTeamMode ? `Team ${index + 1}` : `Player ${index + 1}`
      },
      index
    ))
  ] });
};
var ParticipantStats_default = ParticipantStats;

// src/contexts/HelpSystemContext.tsx
var import_react12 = __toESM(require_react());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var HelpSystemContext = (0, import_react12.createContext)(void 0);
var HelpSystemProvider = ({ children }) => {
  const [usedHelpItems, setUsedHelpItems] = (0, import_react12.useState)(/* @__PURE__ */ new Set());
  const revealLetter = (0, import_react12.useCallback)((word, revealedIndices) => {
    const hiddenIndices = [];
    for (let i = 0; i < word.length; i++) {
      if (!revealedIndices.has(i)) {
        hiddenIndices.push(i);
      }
    }
    if (hiddenIndices.length === 0) return null;
    const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
    return {
      letter: word[randomIndex],
      index: randomIndex
    };
  }, []);
  const getDefinition = (0, import_react12.useCallback)(async (word) => {
    try {
      return `The definition of "${word}" would appear here.`;
    } catch (error) {
      console.error("Error fetching definition:", error);
      return "Could not fetch definition. Please try again later.";
    }
  }, []);
  const addTime = (0, import_react12.useCallback)((seconds) => {
    window.dispatchEvent(new CustomEvent("addTime", { detail: { seconds } }));
  }, []);
  const skipWord = (0, import_react12.useCallback)(() => {
    window.dispatchEvent(new CustomEvent("skipWord"));
  }, []);
  const isHelpUsed = (0, import_react12.useCallback)((helpId) => {
    return usedHelpItems.has(helpId);
  }, [usedHelpItems]);
  const setHelpUsed = (0, import_react12.useCallback)((helpId) => {
    setUsedHelpItems((prev) => /* @__PURE__ */ new Set([...prev, helpId]));
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    HelpSystemContext.Provider,
    {
      value: {
        revealLetter,
        getDefinition,
        addTime,
        skipWord,
        isHelpUsed,
        setHelpUsed
      },
      children
    }
  );
};
var useHelpSystem = () => {
  const context = (0, import_react12.useContext)(HelpSystemContext);
  if (!context) {
    throw new Error("useHelpSystem must be used within a HelpSystemProvider");
  }
  return context;
};

// src/components/HelpShop.tsx
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var HelpShop = ({ onClose, coins, onPurchase }) => {
  const { isHelpUsed, setHelpUsed } = useHelpSystem();
  const handlePurchase = (item) => {
    if (coins >= item.cost) {
      onPurchase(item.cost);
      setHelpUsed(item.id);
    }
  };
  const helpItems = [
    {
      id: "reveal-letter",
      name: "Reveal Letter",
      description: "Reveals one random letter in the current word",
      cost: 10,
      icon: "\u{1F524}"
    },
    {
      id: "show-definition",
      name: "Show Definition",
      description: "Displays the definition of the current word",
      cost: 15,
      icon: "\u{1F4D6}"
    },
    {
      id: "add-time",
      name: "Add Time",
      description: "Adds 30 seconds to the timer",
      cost: 20,
      icon: "\u23F1\uFE0F"
    },
    {
      id: "skip-word",
      name: "Skip Word",
      description: "Skips to the next word",
      cost: 25,
      icon: "\u23ED\uFE0F"
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h2", { className: "text-2xl font-bold", children: "Help Shop" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "mr-2", children: "Your coins:" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "font-bold", children: coins })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "space-y-4", children: helpItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-2xl", children: item.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h3", { className: "font-medium", children: item.name }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-sm text-gray-500", children: item.description })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
        "button",
        {
          className: `px-3 py-1 rounded-md ${coins >= item.cost && !isHelpUsed(item.id) ? "bg-bee-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`,
          disabled: isHelpUsed(item.id) || coins < item.cost,
          onClick: () => handlePurchase(item),
          children: [
            item.cost,
            " pts"
          ]
        }
      )
    ] }, item.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "button",
      {
        onClick: onClose,
        className: "mt-6 w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-md",
        children: "Close"
      }
    )
  ] }) });
};

// src/components/EncouragementBanner.tsx
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var ENCOURAGEMENT_STORAGE_KEY = "encouragementPhrases";
var DEFAULT_ENCOURAGEMENT_PHRASES = [
  "Great spelling, {name}!",
  "That one landed beautifully.",
  "Sharp work. Keep going.",
  "Nice focus, {name}.",
  "You earned that one."
];
var normaliseEncouragementPhrases = (value) => value.split("\n").map((phrase) => phrase.trim()).filter(Boolean);
var loadEncouragementPhrases = () => {
  if (typeof window === "undefined") return DEFAULT_ENCOURAGEMENT_PHRASES;
  try {
    const stored = window.localStorage.getItem(ENCOURAGEMENT_STORAGE_KEY);
    if (!stored) return DEFAULT_ENCOURAGEMENT_PHRASES;
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return DEFAULT_ENCOURAGEMENT_PHRASES;
    const phrases = parsed.filter((phrase) => typeof phrase === "string" && phrase.trim().length > 0);
    return phrases.length > 0 ? phrases : DEFAULT_ENCOURAGEMENT_PHRASES;
  } catch {
    return DEFAULT_ENCOURAGEMENT_PHRASES;
  }
};
var saveEncouragementPhrases = (phrases) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ENCOURAGEMENT_STORAGE_KEY, JSON.stringify(phrases));
};
var pickEncouragementPhrase = (phrases, participantName) => {
  const fallbackPhrases = phrases.length > 0 ? phrases : DEFAULT_ENCOURAGEMENT_PHRASES;
  const phrase = fallbackPhrases[Math.floor(Math.random() * fallbackPhrases.length)];
  return phrase.replaceAll("{name}", participantName || "speller");
};
var EncouragementBanner = ({ message }) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "div",
  {
    className: "fixed left-1/2 top-[34%] z-50 -translate-x-1/2 rounded-2xl bg-white px-6 py-3 text-center text-xl font-black text-kahoot-purple-700 shadow-2xl ring-4 ring-kahoot-yellow-300 animate-bounce-in",
    role: "status",
    "aria-live": "polite",
    children: message
  }
);
var EncouragementBanner_default = EncouragementBanner;

// src/utils/reviewQueue.ts
var STORAGE_KEY3 = "reviewQueue";
var DAY = 24 * 60 * 60 * 1e3;
var normaliseWordKey = (word) => (typeof word === "string" ? word : word.word).trim().toLowerCase();
var loadQueue = () => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY3) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
var saveQueue = (queue) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY3, JSON.stringify(queue));
};
var addReviewWord = (word) => {
  const key = normaliseWordKey(word);
  if (!key) return;
  const queue = loadQueue();
  const now = Date.now();
  const existing = queue.find((item) => normaliseWordKey(item.word) === key);
  if (existing) {
    existing.word = word;
    existing.nextReview = now;
    existing.interval = DAY;
    existing.successCount = 0;
    existing.lastMissedAt = now;
  } else {
    queue.push({ word, nextReview: now, interval: DAY, successCount: 0, lastMissedAt: now });
  }
  saveQueue(queue);
};
var getDueReviewWords = () => {
  const now = Date.now();
  return loadQueue().filter((item) => item.nextReview <= now).sort((a, b) => a.lastMissedAt - b.lastMissedAt).map((item) => item.word);
};
var rescheduleReviewWord = (word, wasCorrect) => {
  const key = normaliseWordKey(word);
  const queue = loadQueue();
  const index = queue.findIndex((item2) => normaliseWordKey(item2.word) === key);
  if (index === -1) return;
  const item = queue[index];
  const now = Date.now();
  if (wasCorrect) {
    item.successCount += 1;
    if (item.successCount >= 3) {
      queue.splice(index, 1);
    } else {
      item.interval *= 2;
      item.nextReview = now + item.interval;
    }
  } else {
    item.successCount = 0;
    item.interval = DAY;
    item.nextReview = now;
    item.lastMissedAt = now;
  }
  saveQueue(queue);
};

// src/TeamDisplay.tsx
var import_react13 = __toESM(require_react());
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var CHANNEL_NAME = "spelling-bee-team-display";
var STORAGE_KEY4 = "teamDisplayWord";
var readStoredWord = () => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY4) || "";
};
var TeamDisplay = () => {
  const [word, setWord] = import_react13.default.useState(() => readStoredWord());
  import_react13.default.useEffect(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
    const channel = new BroadcastChannel(CHANNEL_NAME);
    const handleMessage = (event) => setWord(event.data);
    channel.addEventListener("message", handleMessage);
    return () => channel.close();
  }, []);
  import_react13.default.useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY4) setWord(event.newValue || "");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "min-h-screen bg-black p-8 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mb-6 text-lg font-bold uppercase tracking-wide text-yellow-300", children: "Team Display" }),
    word ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "max-w-5xl break-words text-6xl font-black uppercase md:text-8xl", children: word }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "text-3xl font-bold text-white/70", children: "Waiting for the next word..." })
  ] }) });
};
var publishTeamDisplayWord = (word) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY4, word);
  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage(word);
    channel.close();
  }
};
var TeamDisplay_default = TeamDisplay;

// src/ScoreboardScreen.tsx
var import_react14 = __toESM(require_react());
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var CHANNEL_NAME2 = "spelling-bee-scoreboard";
var STORAGE_KEY5 = "scoreboardParticipants";
var HIDE_NAMES_STORAGE_KEY = "scoreboardHideNames";
var readStoredParticipants = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY5) || "[]");
  } catch {
    return [];
  }
};
var ScoreboardScreen = () => {
  const [participants, setParticipants] = import_react14.default.useState(() => readStoredParticipants());
  const [hideNames, setHideNames] = import_react14.default.useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(HIDE_NAMES_STORAGE_KEY) === "true";
  });
  import_react14.default.useEffect(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
    const channel = new BroadcastChannel(CHANNEL_NAME2);
    const handleMessage = (event) => setParticipants(event.data || []);
    channel.addEventListener("message", handleMessage);
    return () => channel.close();
  }, []);
  import_react14.default.useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY5) setParticipants(readStoredParticipants());
      if (event.key === HIDE_NAMES_STORAGE_KEY) setHideNames(event.newValue === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "min-h-screen bg-black p-8 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mb-8 text-center text-lg font-bold uppercase tracking-wide text-yellow-300", children: "Live Scoreboard" }),
    participants.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "grid gap-5", children: participants.map((participant, index) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "rounded-3xl border border-white/20 bg-white/10 p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-4 text-4xl font-black", children: [
          hideNames && participant.avatar && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("img", { src: participant.avatar, alt: "", className: "h-14 w-14 rounded-full border-2 border-yellow-300 bg-white/10 object-cover" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: hideNames ? `Player ${index + 1}` : participant.name })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "text-4xl font-black text-green-300", children: [
          participant.points,
          " pts"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-4 text-3xl", "aria-label": `${participant.lives} lives`, children: "\u2764\uFE0F".repeat(Math.max(0, participant.lives)) })
    ] }, `${participant.name}-${index}`)) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "text-center text-3xl font-bold text-white/70", children: "Waiting for scores..." })
  ] }) });
};
var publishScoreboard = (participants, options) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY5, JSON.stringify(participants));
  window.localStorage.setItem(HIDE_NAMES_STORAGE_KEY, String(Boolean(options?.hideNames)));
  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel(CHANNEL_NAME2);
    channel.postMessage(participants);
    channel.close();
  }
};
var ScoreboardScreen_default = ScoreboardScreen;

// src/components/BattlePowerUnlock.tsx
var import_react15 = __toESM(require_react());
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var AUTO_DISMISS_DURATION_MS = 8e3;
var BattlePowerUnlock = ({ power, onDismiss }) => {
  const timeoutRef = import_react15.default.useRef(null);
  import_react15.default.useEffect(() => {
    timeoutRef.current = setTimeout(onDismiss, AUTO_DISMISS_DURATION_MS);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [onDismiss]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "div",
    {
      className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "power-unlock-title",
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "relative bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 rounded-3xl p-8 max-w-sm w-full mx-4 text-white shadow-2xl text-center animate-bounce-in", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "absolute -inset-1 rounded-3xl bg-gradient-to-r from-kahoot-yellow-400 via-kahoot-red-400 to-kahoot-yellow-400 opacity-60 blur-sm -z-10" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "text-xs font-black uppercase tracking-widest text-kahoot-yellow-300 mb-2", children: "\u{1F513} Power Unlocked!" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "text-7xl my-4 animate-wiggle select-none", children: power.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "h2",
          {
            id: "power-unlock-title",
            className: "text-2xl font-black mb-2 bg-gradient-to-r from-white to-kahoot-yellow-300 bg-clip-text text-transparent",
            children: power.name
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-white/90 text-base mb-2", children: power.description }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "text-kahoot-yellow-300 font-bold text-sm mb-6", children: [
          "Cost: ",
          power.cost,
          " ",
          power.cost === 1 ? "point" : "points",
          " to use"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "button",
          {
            onClick: onDismiss,
            className: "w-full py-3 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-500 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-600 text-black font-black text-lg rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105",
            autoFocus: true,
            children: "\u{1F680} Unlock!"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "h-full bg-kahoot-yellow-400 rounded-full animate-[shrink_8s_linear_forwards]" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "mt-1 text-white/50 text-xs", children: [
          "Auto-dismisses in ",
          AUTO_DISMISS_DURATION_MS / 1e3,
          " seconds"
        ] })
      ] })
    }
  );
};
var BattlePowerUnlock_default = BattlePowerUnlock;

// src/GameScreen.tsx
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var musicStyles2 = ["Funk", "Country", "Deep Bass", "Rock", "Jazz", "Classical"];
var MIN_DIFFICULTY_LEVEL2 = 0;
var MAX_DIFFICULTY_LEVEL2 = 2;
var clampDifficultyLevel2 = (level) => {
  if (!Number.isFinite(level)) return MIN_DIFFICULTY_LEVEL2;
  return Math.max(MIN_DIFFICULTY_LEVEL2, Math.min(MAX_DIFFICULTY_LEVEL2, level));
};
var GameScreen = ({
  config: config2,
  onEndGame,
  onExitGame,
  musicStyle,
  musicVolume,
  onMusicStyleChange,
  onMusicVolumeChange,
  soundEnabled,
  onSoundEnabledChange,
  isMusicPlaying,
  onToggleMusicPlaying,
  gameId,
  initialGameState
}) => {
  const [participants, setParticipants] = import_react16.default.useState(
    config2.participants.map((p) => ({
      ...p,
      difficultyLevel: clampDifficultyLevel2(p.difficultyLevel),
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0
    }))
  );
  const [currentParticipantIndex, setCurrentParticipantIndex] = import_react16.default.useState(0);
  const isTeamMode = config2.gameMode === "team";
  const [showWord, setShowWord] = import_react16.default.useState(false);
  const [showPhonics, setShowPhonics] = import_react16.default.useState(false);
  const [usedHint, setUsedHint] = import_react16.default.useState(false);
  const [letters2, setLetters] = import_react16.default.useState([]);
  const [feedback, setFeedback] = import_react16.default.useState({ message: "", type: "" });
  const [encouragementMessage, setEncouragementMessage] = import_react16.default.useState("");
  const [encouragementPhrases, setEncouragementPhrases] = import_react16.default.useState(loadEncouragementPhrases);
  const [showEncouragementSettings, setShowEncouragementSettings] = import_react16.default.useState(false);
  const [encouragementDraft, setEncouragementDraft] = import_react16.default.useState(() => loadEncouragementPhrases().join("\n"));
  const [encouragementSaveMessage, setEncouragementSaveMessage] = import_react16.default.useState("");
  const [extraAttempt, setExtraAttempt] = import_react16.default.useState(false);
  const [isHelpOpen, setIsHelpOpen] = import_react16.default.useState(false);
  const { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWordForLevel: selectNextWord } = useWordProgression_default(config2.wordDatabase);
  const [attemptedParticipants, setAttemptedParticipants] = import_react16.default.useState(/* @__PURE__ */ new Set());
  const [missedWords, setMissedWords] = import_react16.default.useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = import_react16.default.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("unlockedAchievements") || "[]");
    } catch {
      return [];
    }
  });
  const [toast, setToast] = import_react16.default.useState("");
  const hiddenInputRef = import_react16.default.useRef(null);
  const [startTime] = import_react16.default.useState(Date.now());
  const [currentAvatar, setCurrentAvatar] = import_react16.default.useState("");
  const [theme, setTheme] = import_react16.default.useState(() => localStorage.getItem("theme") || "light");
  const [currentGameId] = import_react16.default.useState(gameId || generateGameId());
  const [showExitConfirm, setShowExitConfirm] = import_react16.default.useState(false);
  const [showAccessibilitySettings, setShowAccessibilitySettings] = import_react16.default.useState(false);
  const [wordIndex, setWordIndex] = import_react16.default.useState(initialGameState?.currentWordIndex || 0);
  const [totalWordsUsed, setTotalWordsUsed] = import_react16.default.useState(initialGameState?.totalWordsUsed || 0);
  const shouldHideNames = Boolean(config2.hideNames);
  const [teamCorrectCount, setTeamCorrectCount] = import_react16.default.useState(0);
  const [unlockedPowers, setUnlockedPowers] = import_react16.default.useState(
    () => isTeamMode ? getUnlockedPowerIds(0) : []
  );
  const [pendingUnlocks, setPendingUnlocks] = import_react16.default.useState([]);
  const playCorrect = useSound(correct_default, soundEnabled);
  const playWrong = useSound(wrong_default, soundEnabled);
  const playLetterCorrect = useSound(letter_correct_default, soundEnabled);
  const playLetterWrong = useSound(letter_wrong_default, soundEnabled);
  const playShop = useSound(shop_default, soundEnabled);
  const playLoseLife = useSound(lose_life_default, soundEnabled);
  const {
    timeLeft,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    reset: resetTimer,
    stop: stopTimer,
    isPaused,
    addSeconds: addTimeToTimer
  } = useGameTimer_default(config2.timerDuration, soundEnabled, handleIncorrectAttempt);
  const {
    timeLeft: sessionTimeLeft,
    start: startSessionTimer,
    pause: pauseSessionTimer,
    resume: resumeSessionTimer,
    stop: stopSessionTimer
  } = useGameTimer_default(config2.sessionDuration || 20 * 60, soundEnabled, onEndGameWithMissedWords);
  const togglePause = () => {
    if (isPaused) {
      resumeTimer();
      resumeSessionTimer();
    } else {
      pauseTimer();
      pauseSessionTimer();
    }
  };
  import_react16.default.useEffect(() => {
    if (localStorage.getItem("teacherMode") === "true") {
      document.body.classList.add("teacher-mode");
    } else {
      document.body.classList.remove("teacher-mode");
    }
  }, []);
  import_react16.default.useEffect(() => {
    if (currentWord) {
      setLetters(Array.from({ length: currentWord.word.length }, () => ""));
      publishTeamDisplayWord(currentWord.word);
      setShowPhonics(false);
      setShowWord(false);
    }
  }, [currentWord]);
  import_react16.default.useEffect(() => {
    publishScoreboard(participants, { hideNames: shouldHideNames });
  }, [participants, shouldHideNames]);
  import_react16.default.useEffect(() => {
    if (config2.gameMode !== "individual") return;
    participants.forEach(saveStudentProgress);
  }, [participants, config2.gameMode]);
  import_react16.default.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentWord || isPaused) return;
      if (/^[a-zA-Z]$/.test(e.key)) {
        typeLetter(e.key);
      } else if (e.key === "Backspace") {
        handleVirtualBackspace();
      } else if (e.key === "Enter") {
        handleSpellingSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, isPaused, letters2]);
  import_react16.default.useEffect(() => {
    const normalized = applyThemeClass(theme);
    localStorage.setItem("theme", normalized);
  }, [theme]);
  import_react16.default.useEffect(() => {
    setEncouragementDraft(encouragementPhrases.join("\n"));
  }, [encouragementPhrases]);
  import_react16.default.useEffect(() => {
    if (currentWord && participants.length > 0) {
      const gameState = {
        gameConfig: config2,
        currentParticipants: participants,
        currentWordIndex: wordIndex,
        currentWord,
        currentParticipantIndex,
        gameStartTime: startTime,
        timeRemaining: timeLeft,
        totalWordsUsed,
        missedWords,
        currentInput: letters2.join(""),
        gamePhase: "spelling",
        difficulty: currentDifficulty,
        savedAt: (/* @__PURE__ */ new Date()).toISOString(),
        gameId: currentGameId
      };
      autoSaveGameState(gameState);
    }
  }, [participants, currentWord, currentParticipantIndex, timeLeft, letters2, wordIndex, totalWordsUsed, missedWords, currentDifficulty]);
  const advanceToWord = (level) => {
    const nextWord = selectNextWord(clampDifficultyLevel2(level));
    if (nextWord) {
      setAttemptedParticipants(/* @__PURE__ */ new Set());
      setExtraAttempt(false);
      setIsHelpOpen(false);
      setUsedHint(false);
      setShowWord(false);
      setLetters(Array(nextWord.word.length).fill(""));
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
      speak(nextWord.word);
      startTimer();
    } else {
      onEndGameWithMissedWords();
    }
  };
  const nextTurn = () => {
    setCurrentParticipantIndex((prevIndex) => (prevIndex + 1) % participants.length);
  };
  function handleIncorrectAttempt() {
    if (extraAttempt) {
      setFeedback({ message: "Incorrect. You still have one more attempt!", type: "error" });
      setExtraAttempt(false);
      if (currentWord) setLetters(Array(currentWord.word.length).fill(""));
      startTimer();
      return;
    }
    setFeedback({ message: "Incorrect. Try again next time!", type: "error" });
    if (currentWord) setMissedWords((prev) => [...prev, currentWord]);
    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        return {
          ...p,
          attempted: p.attempted + 1,
          wordsAttempted: p.wordsAttempted + 1,
          lives: p.lives - 1,
          streak: 0,
          difficultyLevel: clampDifficultyLevel2(p.difficultyLevel - config2.progressionSpeed)
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);
    playLoseLife();
    if (currentWord) setLetters(Array(currentWord.word.length).fill(""));
    const newAttempted = new Set(attemptedParticipants);
    newAttempted.add(currentParticipantIndex);
    setTimeout(() => {
      setFeedback({ message: "", type: "" });
      if (config2.gameMode === "team" && newAttempted.size < participants.length) {
        setAttemptedParticipants(newAttempted);
        setUsedHint(false);
        setFeedback({ message: "Next team can steal this word!", type: "info" });
        nextTurn();
        startTimer();
      } else if (config2.gameMode === "individual") {
        if (currentWord) {
          setWordQueues((prev) => ({ ...prev, review: [...prev.review, currentWord] }));
          addReviewWord(currentWord);
        }
        setAttemptedParticipants(/* @__PURE__ */ new Set());
        setUsedHint(false);
        const nextIndex = (currentParticipantIndex + 1) % participants.length;
        advanceToWord(updatedParticipants[nextIndex].difficultyLevel);
        nextTurn();
      } else if (newAttempted.size >= participants.length) {
        if (currentWord) {
          setWordQueues((prev) => ({ ...prev, review: [...prev.review, currentWord] }));
          addReviewWord(currentWord);
        }
        setAttemptedParticipants(/* @__PURE__ */ new Set());
        const nextIndex = (currentParticipantIndex + 1) % participants.length;
        advanceToWord(updatedParticipants[nextIndex].difficultyLevel);
        nextTurn();
      } else {
        setAttemptedParticipants(newAttempted);
        setUsedHint(false);
        nextTurn();
        startTimer();
      }
    }, 2e3);
  }
  const spendPoints = (participantIndex, cost) => {
    setParticipants(
      (prev) => prev.map((p, index) => {
        if (index === participantIndex) {
          return { ...p, points: p.points - cost };
        }
        return p;
      })
    );
    playShop();
  };
  const typeLetter = (letter) => {
    if (!currentWord) return;
    setLetters((prev) => {
      const index = prev.findIndex((l) => l === "");
      if (index === -1) return prev;
      const newLetters = [...prev];
      newLetters[index] = letter;
      const isCorrectLetter = currentWord.word[index].toLowerCase() === letter.toLowerCase();
      const play = isCorrectLetter ? playLetterCorrect : playLetterWrong;
      play();
      return newLetters;
    });
  };
  const handleVirtualLetter = (letter) => {
    typeLetter(letter);
  };
  const handleVirtualBackspace = () => {
    setLetters((prev) => {
      const reverseIndex = [...prev].reverse().findIndex((l) => l !== "");
      if (reverseIndex === -1) return prev;
      const index = prev.length - 1 - reverseIndex;
      const newLetters = [...prev];
      newLetters[index] = "";
      return newLetters;
    });
  };
  const handleSpellingSubmit = () => {
    if (!currentWord) return;
    stopTimer();
    const guess = letters2.join("").trim().toLowerCase();
    const isCorrect = guess === currentWord.word.toLowerCase();
    if (!isCorrect) {
      playWrong();
      handleIncorrectAttempt();
      return;
    }
    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        const multipliers = { easy: 1, medium: 2, tricky: 3 };
        const basePoints = 5;
        const multiplier = multipliers[currentDifficulty] || 1;
        const bonus = p.streak * 2;
        const pointsEarned = basePoints * multiplier + bonus;
        return {
          ...p,
          attempted: p.attempted + 1,
          correct: p.correct + 1,
          wordsAttempted: p.wordsAttempted + 1,
          wordsCorrect: p.wordsCorrect + 1,
          points: p.points + pointsEarned,
          streak: p.streak + 1,
          difficultyLevel: usedHint ? clampDifficultyLevel2(p.difficultyLevel) : clampDifficultyLevel2(p.difficultyLevel + config2.progressionSpeed)
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);
    const participant = updatedParticipants[currentParticipantIndex];
    const newlyUnlocked = defaultAchievements.filter(
      (ach) => participant.wordsCorrect >= ach.threshold && !unlockedAchievements.includes(ach.id)
    );
    if (newlyUnlocked.length > 0) {
      const updatedUnlocked = [...unlockedAchievements, ...newlyUnlocked.map((a) => a.id)];
      setUnlockedAchievements(updatedUnlocked);
      localStorage.setItem("unlockedAchievements", JSON.stringify(updatedUnlocked));
      const first = newlyUnlocked[0];
      setToast(`Achievement unlocked: ${first.icon} ${first.name}!`);
      setTimeout(() => setToast(""), 3e3);
    }
    if (isTeamMode) {
      const prevCount = teamCorrectCount;
      const newCount = prevCount + 1;
      setTeamCorrectCount(newCount);
      const newPowers = getNewlyUnlockedPowers(prevCount, newCount);
      if (newPowers.length > 0) {
        setUnlockedPowers(getUnlockedPowerIds(newCount));
        setPendingUnlocks((prev) => [...prev, ...newPowers]);
      }
    }
    playCorrect();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (config2.effectsEnabled && !prefersReducedMotion) {
      launchConfetti();
    }
    setFeedback({ message: "Correct! \u{1F389}", type: "success" });
    setEncouragementMessage(pickEncouragementPhrase(encouragementPhrases, participant.name));
    setTimeout(() => {
      const nextIndex = (currentParticipantIndex + 1) % updatedParticipants.length;
      const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
      setFeedback({ message: "", type: "" });
      setEncouragementMessage("");
      advanceToWord(nextDifficulty);
      nextTurn();
    }, 2e3);
  };
  const saveEncouragementSettings = () => {
    const phrases = normaliseEncouragementPhrases(encouragementDraft);
    const nextPhrases = phrases.length > 0 ? phrases : DEFAULT_ENCOURAGEMENT_PHRASES;
    setEncouragementPhrases(nextPhrases);
    saveEncouragementPhrases(nextPhrases);
    setEncouragementSaveMessage("Saved encouragement phrases.");
    setTimeout(() => setEncouragementSaveMessage(""), 2500);
  };
  const resetEncouragementSettings = () => {
    setEncouragementPhrases(DEFAULT_ENCOURAGEMENT_PHRASES);
    saveEncouragementPhrases(DEFAULT_ENCOURAGEMENT_PHRASES);
    setEncouragementSaveMessage("Restored default phrases.");
    setTimeout(() => setEncouragementSaveMessage(""), 2500);
  };
  const skipWord = () => {
    stopTimer();
    const isLivesPenalty = config2.skipPenaltyType === "lives";
    const deduction = isLivesPenalty ? `-${config2.skipPenaltyValue} life${config2.skipPenaltyValue > 1 ? "s" : ""}` : `-${config2.skipPenaltyValue} pts`;
    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        const updated = { ...p, streak: 0, wordsAttempted: p.wordsAttempted + 1 };
        return isLivesPenalty ? { ...updated, lives: p.lives - config2.skipPenaltyValue } : { ...updated, points: p.points - config2.skipPenaltyValue };
      }
      return p;
    });
    setParticipants(updatedParticipants);
    if (isLivesPenalty) {
      playLoseLife();
    }
    setFeedback({ message: `Word Skipped (${deduction})`, type: "info" });
    if (currentWord) {
      setWordQueues((prev) => ({ ...prev, review: [...prev.review, currentWord] }));
      addReviewWord(currentWord);
    }
    setAttemptedParticipants(/* @__PURE__ */ new Set());
    setTimeout(() => {
      const nextIndex = (currentParticipantIndex + 1) % updatedParticipants.length;
      const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
      setFeedback({ message: "", type: "" });
      if (currentWord) setLetters(Array(currentWord.word.length).fill(""));
      advanceToWord(nextDifficulty);
      nextTurn();
    }, 1500);
  };
  const skipWordFree = () => {
    stopTimer();
    if (currentWord) {
      setWordQueues((prev) => ({ ...prev, review: [...prev.review, currentWord] }));
      addReviewWord(currentWord);
    }
    setAttemptedParticipants(/* @__PURE__ */ new Set());
    setFeedback({ message: "Word Skipped \u23ED\uFE0F", type: "info" });
    setTimeout(() => {
      const nextIndex = (currentParticipantIndex + 1) % participants.length;
      const nextDifficulty = participants[nextIndex].difficultyLevel;
      setFeedback({ message: "", type: "" });
      if (currentWord) setLetters(Array(currentWord.word.length).fill(""));
      advanceToWord(nextDifficulty);
      nextTurn();
    }, 1500);
  };
  function onEndGameWithMissedWords() {
    stopSessionTimer();
    const lessonKey = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("missedWordsCollection") || "{}");
    const existing = stored[lessonKey] || [];
    stored[lessonKey] = [...existing, ...missedWords];
    localStorage.setItem("missedWordsCollection", JSON.stringify(stored));
    const activeParticipants = participants.filter((p) => p.lives > 0);
    const finalParticipants = participants.map((p) => ({
      ...p,
      accuracy: p.wordsAttempted > 0 ? p.wordsCorrect / p.wordsAttempted * 100 : 0
    }));
    onEndGame({
      winner: activeParticipants.length === 1 ? activeParticipants[0] : null,
      participants: finalParticipants,
      gameMode: config2.gameMode,
      duration: Math.round((Date.now() - startTime) / 1e3),
      missedWords
    });
  }
  import_react16.default.useEffect(() => {
    if (config2.participants.length > 0) {
      advanceToWord(config2.participants[0].difficultyLevel);
      startSessionTimer();
    }
  }, []);
  import_react16.default.useEffect(() => {
    if (!participants || participants.length === 0) return;
    const activeParticipants = participants.filter((p) => p.lives > 0);
    if (activeParticipants.length <= 1) {
      onEndGameWithMissedWords();
    }
  }, [participants]);
  const handleMuteToggle = () => {
    audioManager.toggleMute();
  };
  const handleExitGame = () => {
    setShowExitConfirm(true);
  };
  const confirmExitGame = () => {
    const gameState = {
      gameConfig: config2,
      currentParticipants: participants,
      currentWordIndex: wordIndex,
      currentWord,
      currentParticipantIndex,
      gameStartTime: startTime,
      timeRemaining: timeLeft,
      totalWordsUsed,
      missedWords,
      currentInput: letters2.join(""),
      gamePhase: "spelling",
      difficulty: currentDifficulty,
      savedAt: (/* @__PURE__ */ new Date()).toISOString(),
      gameId: currentGameId
    };
    try {
      saveGameState(gameState);
      console.log("Game state saved before exit");
    } catch (error) {
      console.error("Failed to save game state on exit:", error);
    }
    setShowExitConfirm(false);
    if (onExitGame) {
      onExitGame();
    }
  };
  const cancelExitGame = () => {
    setShowExitConfirm(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "relative screen-container bg-gradient-to-br from-indigo-600 to-purple-800 text-white flex flex-col items-center justify-center min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "floating-particle top-10 left-10 delay-100" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "floating-particle top-20 right-20 delay-200" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "floating-particle bottom-20 left-20 delay-300" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "floating-particle bottom-10 right-10 delay-400" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "floating-particle top-1/2 left-1/4 delay-500" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "floating-particle top-1/3 right-1/4 delay-600" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "input",
      {
        ref: hiddenInputRef,
        type: "text",
        className: "absolute opacity-0 pointer-events-none",
        tabIndex: -1,
        "aria-label": "Hidden input for keyboard capture"
      }
    ),
    toast && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "fixed top-4 right-4 bg-gradient-to-r from-kahoot-green-500 to-kahoot-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-bounce-in font-bold", children: [
      "\u{1F389} ",
      toast
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "absolute top-8 left-8 flex gap-6 items-center z-40", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "img",
        {
          src: getContextualMascot({
            isCorrectAnswer: feedback.type === "correct",
            isWrongAnswer: feedback.type === "incorrect",
            timeRemaining: timeLeft,
            maxTime: config2.timerDuration,
            isShowingHelp: isHelpOpen,
            isTyping: letters2.some((letter) => letter !== "")
          }),
          alt: "Mascot",
          className: "w-16 h-16 animate-wiggle"
        }
      ),
      participants.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        "div",
        {
          className: `text-center game-card p-4 min-w-[140px] transform transition-all duration-500 ${index === currentParticipantIndex ? "scale-110 ring-4 ring-kahoot-yellow-400 animate-glow" : ""}`,
          children: [
            shouldHideNames ? /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [
              p.avatar && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("img", { src: p.avatar, alt: "", className: "h-10 w-10 rounded-full border-2 border-kahoot-yellow-300 bg-white/20 object-cover" }),
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-lg font-black text-kahoot-yellow-200", children: isTeamMode ? `Team ${index + 1}` : `Player ${index + 1}` })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-xl font-black bg-gradient-to-r from-white to-kahoot-yellow-300 bg-clip-text text-transparent", children: p.name }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-3xl font-bold my-2", children: "\u2764\uFE0F".repeat(p.lives) }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "text-2xl font-black text-kahoot-green-400", children: [
              p.points,
              " pts"
            ] })
          ]
        },
        index
      ))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      ParticipantStats_default,
      {
        participants,
        currentIndex: currentParticipantIndex,
        hideNames: shouldHideNames,
        isTeamMode
      }
    ),
    feedback.message && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      "div",
      {
        className: `fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-black px-8 py-4 rounded-3xl z-50 animate-bounce-in shadow-2xl ${feedback.type === "success" ? "bg-gradient-to-r from-kahoot-green-500 to-kahoot-green-600 text-white" : feedback.type === "error" ? "bg-gradient-to-r from-kahoot-red-500 to-kahoot-red-600 text-white animate-shake" : "bg-gradient-to-r from-kahoot-blue-500 to-kahoot-blue-600 text-white"}`,
        children: [
          feedback.type === "success" ? "\u{1F389} " : feedback.type === "error" ? "\u{1F4A5} " : "\u{1F3AF} ",
          feedback.message
        ]
      }
    ),
    encouragementMessage && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(EncouragementBanner_default, { message: encouragementMessage }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "absolute top-8 right-8 text-center z-50 game-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: `text-6xl md:text-8xl font-black mb-2 transition-all duration-300 ${timeLeft <= 10 ? "text-kahoot-red-500 animate-pulse scale-110" : timeLeft <= 20 ? "text-kahoot-yellow-500 animate-bounce" : "text-kahoot-green-500"}`, children: timeLeft }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-lg font-bold", children: "seconds left" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "button",
        {
          onClick: togglePause,
          className: "mt-4 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-600 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700 text-black px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105",
          children: isPaused ? "\u25B6\uFE0F Resume" : "\u23F8\uFE0F Pause"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: `mt-3 rounded-xl bg-black/30 px-3 py-2 text-sm font-black ${sessionTimeLeft <= 120 ? "text-kahoot-red-400 animate-pulse" : "text-white"}`, children: [
        "Session ",
        Math.floor(sessionTimeLeft / 60),
        ":",
        String(sessionTimeLeft % 60).padStart(2, "0")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "button",
        {
          onClick: () => setShowAccessibilitySettings(true),
          className: "mt-3 bg-white/90 hover:bg-white text-black px-5 py-2 rounded-2xl font-black text-base shadow-lg transition-all duration-200 hover:scale-105",
          children: "Accessibility"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "absolute bottom-8 left-8 bg-black/50 p-4 rounded-lg z-50 flex flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: () => setIsHelpOpen(true),
            className: "bg-yellow-300 text-black p-2 rounded",
            "aria-label": "Open help shop",
            children: "\u2753"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: () => setShowEncouragementSettings(true),
            className: "bg-yellow-300 text-black p-2 rounded",
            "aria-label": "Edit encouragement phrases",
            title: "Edit encouragement phrases",
            children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(MessageCircle, { size: 16 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: onToggleMusicPlaying,
            className: "bg-yellow-300 text-black p-2 rounded",
            "aria-label": isMusicPlaying ? "Pause music" : "Play music",
            children: isMusicPlaying ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Pause, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Play, { size: 16 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: () => onSoundEnabledChange(!soundEnabled),
            className: "bg-yellow-300 text-black p-2 rounded",
            "aria-label": soundEnabled ? "Mute audio" : "Unmute audio",
            children: soundEnabled ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Volume2, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(VolumeX, { size: 16 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: handleExitGame,
            className: "bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors",
            "aria-label": "Exit game",
            title: "Exit and save game",
            children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(LogOut, { size: 16 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: () => window.open(`${window.location.pathname}?team=1`, "_blank", "noopener,noreferrer"),
            className: "bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors",
            "aria-label": "Open team display",
            title: "Open team display",
            children: "\u{1F4FA}"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: () => window.open(`${window.location.pathname}?scoreboard=1`, "_blank", "noopener,noreferrer"),
            className: "bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors",
            "aria-label": "Open scoreboard display",
            title: "Open scoreboard display",
            children: "\u{1F3C6}"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "input",
        {
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: musicVolume,
          onChange: (e) => onMusicVolumeChange(parseFloat(e.target.value)),
          className: "w-32"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "select",
        {
          value: musicStyle,
          onChange: (e) => onMusicStyleChange(e.target.value),
          className: "text-black rounded p-1",
          children: musicStyles2.map((style) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("option", { value: style, children: style }, style))
        }
      )
    ] }),
    isHelpOpen && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      HelpShop,
      {
        onClose: () => setIsHelpOpen(false),
        coins: participants[currentParticipantIndex].points,
        onPurchase: (cost) => spendPoints(currentParticipantIndex, cost)
      }
    ),
    pendingUnlocks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      BattlePowerUnlock_default,
      {
        power: pendingUnlocks[0],
        onDismiss: () => setPendingUnlocks((prev) => prev.slice(1))
      }
    ),
    showExitConfirm && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-6xl mb-4", children: "\u{1F6AA}" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Exit Game?" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-gray-600 mb-6", children: "Your progress will be saved and you can resume this game later. Are you sure you want to exit?" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex gap-3 justify-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: cancelExitGame,
            className: "px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
          "button",
          {
            onClick: confirmExitGame,
            className: "px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(LogOut, { size: 18 }),
              "Exit & Save"
            ]
          }
        )
      ] })
    ] }) }),
    showAccessibilitySettings && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(AccessibilitySettings_default, { onClose: () => setShowAccessibilitySettings(false) }),
    showEncouragementSettings && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "w-full max-w-lg rounded-2xl bg-white p-6 text-gray-900 shadow-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h2", { className: "mb-2 text-2xl font-black", children: "Encouragement phrases" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("p", { className: "mb-4 text-sm text-gray-600", children: [
        "One phrase per line. Use ",
        "{name}",
        " to include the current player or team."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("label", { htmlFor: "encouragement-phrases", className: "sr-only", children: "Encouragement phrases" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "textarea",
        {
          id: "encouragement-phrases",
          value: encouragementDraft,
          onChange: (event) => setEncouragementDraft(event.target.value),
          className: "min-h-48 w-full rounded-xl border-2 border-gray-300 p-3 text-base text-gray-900 focus:border-kahoot-purple-500 focus:outline-none"
        }
      ),
      encouragementSaveMessage && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "mt-3 rounded-lg bg-green-100 px-3 py-2 font-bold text-green-800", role: "status", children: encouragementSaveMessage }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "mt-5 flex flex-wrap justify-end gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: resetEncouragementSettings,
            className: "rounded-xl bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300",
            children: "Reset"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: () => setShowEncouragementSettings(false),
            className: "rounded-xl bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300",
            children: "Close"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "button",
          {
            onClick: saveEncouragementSettings,
            className: "rounded-xl bg-kahoot-purple-600 px-4 py-2 font-bold text-white hover:bg-kahoot-purple-700",
            children: "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      AvatarSelector,
      {
        currentAvatar,
        onSelect: (avatar) => setCurrentAvatar(avatar)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "button",
      {
        className: "theme-toggle",
        onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
        children: theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}"
      }
    ),
    currentWord && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "w-full max-w-6xl text-center z-30 animate-scale-in", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "img",
        {
          src: getContextualMascot({
            isHelping: true,
            isShowingHelp: showWord
          }),
          alt: "Teaching Bee",
          className: "w-16 h-16 mx-auto mb-6 animate-float"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("h2", { className: "text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-red-400 bg-clip-text text-transparent animate-sparkle", children: [
        "\u{1F3AF} WORD FOR ",
        isTeamMode ? "TEAM" : "STUDENT",
        ": ",
        shouldHideNames ? `${isTeamMode ? "TEAM" : "PLAYER"} ${currentParticipantIndex + 1}` : participants[currentParticipantIndex]?.name?.toUpperCase().slice(0, 32) || (isTeamMode ? "TEAM" : "STUDENT")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "relative mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "mb-6 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
            "button",
            {
              onClick: () => speak(currentWord.word),
              className: "bg-gradient-to-r from-kahoot-blue-500 to-kahoot-blue-600 hover:from-kahoot-blue-600 hover:to-kahoot-blue-700 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105",
              children: "\u{1F50A} Replay Word"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
            "button",
            {
              onClick: () => setShowWord(!showWord),
              className: "bg-gradient-to-r from-kahoot-yellow-500 to-kahoot-yellow-600 hover:from-kahoot-yellow-600 hover:to-kahoot-yellow-700 text-black px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105",
              children: showWord ? "\u{1F441}\uFE0F Hide Word" : "\u{1F441}\uFE0F Show Word"
            }
          )
        ] }),
        showWord && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "inline-block text-6xl md:text-8xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-sm px-8 py-6 rounded-3xl border-4 border-white/20 animate-bounce-in excitement-glow", children: [
          currentWord.word,
          currentWord.pronunciation && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "ml-6 text-4xl md:text-5xl text-kahoot-yellow-300 font-bold", children: currentWord.pronunciation })
        ] })
      ] }),
      currentWord.phonemes && currentWord.phonemes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "button",
        {
          type: "button",
          onClick: () => setShowPhonics((value) => !value),
          className: "rounded-2xl bg-yellow-300 px-6 py-3 text-lg font-black text-black transition hover:bg-yellow-400",
          children: showPhonics ? "Hide Phonics" : "Show Phonics"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        HintPanel_default,
        {
          word: currentWord,
          participantPoints: participants[currentParticipantIndex].points,
          participantIndex: currentParticipantIndex,
          spendPoints,
          isTeamMode,
          showWord,
          onHintUsed: () => setUsedHint(true),
          onExtraAttempt: () => setExtraAttempt(true),
          unlockedPowers: isTeamMode ? unlockedPowers : void 0,
          hasAttemptedCurrentWord: attemptedParticipants.has(currentParticipantIndex),
          onAddTime: () => addTimeToTimer(15),
          onSkipWord: skipWordFree
        }
      ),
      showPhonics && currentWord.phonemes && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PhonicsBreakdown_default, { phonemes: currentWord.phonemes }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "flex gap-3 justify-center mb-8 px-4", children: letters2.map((letter, idx) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "div",
        {
          className: `w-16 h-20 text-5xl font-black flex items-center justify-center rounded-2xl border-4 transition-all duration-300 transform ${letter ? letter.toLowerCase() === currentWord.word[idx].toLowerCase() ? "bg-gradient-to-br from-kahoot-green-400 to-kahoot-green-600 border-kahoot-green-300 text-white scale-110 animate-bounce shadow-2xl" : "bg-gradient-to-br from-kahoot-red-400 to-kahoot-red-600 border-kahoot-red-300 text-white animate-shake" : "bg-white/20 border-white/40 text-white hover:bg-white/30"}`,
          children: letter.toUpperCase()
        },
        idx
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        OnScreenKeyboard_default,
        {
          onLetter: handleVirtualLetter,
          onBackspace: handleVirtualBackspace,
          onSubmit: handleSpellingSubmit,
          soundEnabled
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      "button",
      {
        onClick: skipWord,
        className: "absolute bottom-8 right-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-6 rounded-3xl text-2xl font-black text-white shadow-2xl transform transition-all duration-200 hover:scale-105 animate-glow",
        title: "Skip Word",
        children: [
          "\u23ED\uFE0F ",
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(SkipForward, { size: 32 })
        ]
      }
    ),
    isPaused && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "text-center animate-scale-in", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-8xl md:text-9xl font-black text-white mb-4 animate-pulse", children: "\u23F8\uFE0F" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-6xl md:text-8xl font-black bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-red-400 bg-clip-text text-transparent", children: "PAUSED" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-2xl text-white/80 mt-4", children: "Game is paused. Click resume to continue!" })
    ] }) })
  ] });
};
var GameScreen_default = GameScreen;

// src/ResultsScreen.tsx
var import_react19 = __toESM(require_react());

// src/audio/applause.mp3
var applause_default = "./applause-I345E7HE.mp3";

// src/DailyChallenge.tsx
var import_react17 = __toESM(require_react());
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var DATE_KEY = "dailyChallengeDates";
var HIGH_KEY = "dailyChallengeHighest";
var computeCurrentStreak = (dates) => {
  const set = new Set(dates);
  let streak = 0;
  const date = /* @__PURE__ */ new Date();
  while (true) {
    const key = date.toISOString().split("T")[0];
    if (!set.has(key)) break;
    streak++;
    date.setDate(date.getDate() - 1);
  }
  return streak;
};
var computeHighestStreak = (dates) => {
  const sorted = Array.from(new Set(dates)).sort();
  let max = 0;
  let cur = 0;
  let prev = null;
  for (const d of sorted) {
    if (!prev) {
      cur = 1;
    } else {
      const diff = (new Date(d).getTime() - new Date(prev).getTime()) / (1e3 * 60 * 60 * 24);
      cur = diff === 1 ? cur + 1 : 1;
    }
    if (cur > max) max = cur;
    prev = d;
  }
  return max;
};
var getStreakInfo = () => {
  const dates = JSON.parse(localStorage.getItem(DATE_KEY) || "[]");
  return {
    currentStreak: computeCurrentStreak(dates),
    highestStreak: computeHighestStreak(dates)
  };
};
var recordDailyCompletion = () => {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const dates = JSON.parse(localStorage.getItem(DATE_KEY) || "[]");
  if (!dates.includes(today)) {
    dates.push(today);
    localStorage.setItem(DATE_KEY, JSON.stringify(dates));
  }
  const info = getStreakInfo();
  localStorage.setItem(HIGH_KEY, String(info.highestStreak));
  return info;
};

// src/components/MorphologyCard.tsx
var import_react18 = __toESM(require_react());
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var MorphologyCard = ({ word, database }) => {
  const allWords = (0, import_react18.useMemo)(
    () => Object.values(database).flat(),
    [database]
  );
  const prefixExamples = (0, import_react18.useMemo)(() => {
    if (!word.prefix) return [];
    return allWords.filter((w) => w.word !== word.word && w.prefix === word.prefix).map((w) => w.word).slice(0, 3);
  }, [allWords, word]);
  const suffixExamples = (0, import_react18.useMemo)(() => {
    if (!word.suffix) return [];
    return allWords.filter((w) => w.word !== word.word && w.suffix === word.suffix).map((w) => w.word).slice(0, 3);
  }, [allWords, word]);
  if (!word.prefix && !word.suffix) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "bg-white/10 p-3 rounded-md mt-2 text-sm", children: [
    word.prefix && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "font-bold", children: [
        "Prefix: ",
        word.prefix
      ] }),
      word.prefixMeaning && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "text-gray-200", children: word.prefixMeaning }),
      prefixExamples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "text-gray-300", children: [
        "Example words: ",
        prefixExamples.join(", ")
      ] })
    ] }),
    word.suffix && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "font-bold", children: [
        "Suffix: ",
        word.suffix
      ] }),
      word.suffixMeaning && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "text-gray-200", children: word.suffixMeaning }),
      suffixExamples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "text-gray-300", children: [
        "Example words: ",
        suffixExamples.join(", ")
      ] })
    ] })
  ] });
};
var MorphologyCard_default = MorphologyCard;

// src/utils/history.ts
var STORAGE_KEY6 = "sessionHistory";
function loadHistory() {
  try {
    return JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY6) || "[]");
  } catch {
    return [];
  }
}
function appendHistoryEntry(entry) {
  const history = loadHistory();
  const date = entry.date ?? (/* @__PURE__ */ new Date()).toISOString();
  history.push({
    date,
    score: entry.score,
    duration: entry.duration,
    comfort: entry.comfort
  });
  globalThis.localStorage?.setItem(STORAGE_KEY6, JSON.stringify(history));
  return date;
}
function updateHistoryComfort(date, comfort) {
  const history = loadHistory();
  const updated = history.map((entry) => entry.date === date ? { ...entry, comfort } : entry);
  globalThis.localStorage?.setItem(STORAGE_KEY6, JSON.stringify(updated));
}
function clearHistory() {
  globalThis.localStorage?.removeItem(STORAGE_KEY6);
}

// src/ResultsScreen.tsx
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var ResultsScreen = ({ results, onRestart, onViewLeaderboard }) => {
  const applauseAudio = (0, import_react19.useRef)(new Audio(applause_default));
  const totalScore = results.participants.reduce((sum, p) => sum + p.points, 0);
  const [bestClassScore, setBestClassScore] = (0, import_react19.useState)(0);
  const [isBestScore, setIsBestScore] = (0, import_react19.useState)(false);
  const [streakInfo, setStreakInfo] = (0, import_react19.useState)(null);
  const [bonus, setBonus] = (0, import_react19.useState)(0);
  const [showComfortModal, setShowComfortModal] = (0, import_react19.useState)(true);
  const historyEntryDateRef = (0, import_react19.useRef)(null);
  (0, import_react19.useEffect)(() => {
    if (config.dailyChallenge) {
      const info = recordDailyCompletion();
      setStreakInfo(info);
      setBonus(info.currentStreak > 1 ? (info.currentStreak - 1) * 10 : 0);
    }
  }, [config.dailyChallenge]);
  (0, import_react19.useEffect)(() => {
    if (localStorage.getItem("teacherMode") === "true") {
      document.body.classList.add("teacher-mode");
    } else {
      document.body.classList.remove("teacher-mode");
    }
  }, []);
  (0, import_react19.useEffect)(() => {
    const stored = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const newEntries = results.participants.map((p) => ({
      name: p.name,
      score: p.points + (config.dailyChallenge ? bonus : 0),
      date: (/* @__PURE__ */ new Date()).toISOString(),
      avatar: p.avatar
    }));
    const updated = [...stored, ...newEntries].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem("leaderboard", JSON.stringify(updated));
  }, [results, config.dailyChallenge, bonus]);
  (0, import_react19.useEffect)(() => {
    historyEntryDateRef.current = appendHistoryEntry({ score: totalScore, duration: results.duration || 0 });
    const storedBest = Number(localStorage.getItem("bestClassScore") || "0");
    if (totalScore > storedBest) {
      localStorage.setItem("bestClassScore", String(totalScore));
      setBestClassScore(totalScore);
      setIsBestScore(true);
    } else {
      setBestClassScore(storedBest);
    }
  }, [totalScore, results.duration]);
  const handleComfortSelect = (comfort) => {
    if (historyEntryDateRef.current) {
      updateHistoryComfort(historyEntryDateRef.current, comfort);
    }
    setShowComfortModal(false);
  };
  (0, import_react19.useEffect)(() => {
    if (results.winner) {
      if (config.soundEnabled) {
        applauseAudio.current.play();
      }
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (config.effectsEnabled && !prefersReducedMotion) {
        launchConfetti();
      }
    }
  }, [results.winner, config.soundEnabled, config.effectsEnabled]);
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const anchor = document.createElement("a");
    anchor.href = dataStr;
    anchor.download = "spelling-bee-results.json";
    anchor.click();
  };
  const handleExportMissedWords = () => {
    if (!results.missedWords || results.missedWords.length === 0) {
      alert("No missed words to export!");
      return;
    }
    const date = (/* @__PURE__ */ new Date()).toLocaleDateString();
    const gameMode = results.gameMode === "team" ? "Team Mode" : "Individual Mode";
    const duration = Math.floor(results.duration / 60);
    let csvContent = `Missed Words Report - ${date}
`;
    csvContent += `Game Mode: ${gameMode}
`;
    csvContent += `Duration: ${duration} minutes
`;
    csvContent += `Participants: ${results.participants.map((p) => p.name).join(", ")}

`;
    csvContent += "Word,Definition,Origin,Example,Prefix,Suffix,Pronunciation\n";
    results.missedWords.forEach((word) => {
      const row = [
        word.word || "",
        (word.definition || "").replace(/,/g, ";"),
        (word.origin || "").replace(/,/g, ";"),
        (word.example || "").replace(/,/g, ";"),
        word.prefix || "",
        word.suffix || "",
        word.pronunciation || ""
      ].join(",");
      csvContent += row + "\n";
    });
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const anchor = document.createElement("a");
    anchor.href = dataStr;
    anchor.download = `missed-words-${date}.csv`;
    anchor.click();
  };
  const getWinnerMessage = () => {
    const { winner, participants } = results;
    if (winner) {
      return `Winner: ${winner.name}`;
    }
    const activeParticipants = participants.filter((p) => p.lives > 0);
    if (activeParticipants.length > 1) {
      const names = activeParticipants.map((p) => p.name).join(" and ");
      return `It's a draw between ${names}!`;
    }
    return "No one wins this round!";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "min-h-screen bg-surface p-8 text-on-surface text-center flex flex-col items-center justify-center font-body", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h1", { className: "font-bold mb-4 text-primary uppercase font-sans", children: "\u{1F3C6} Game Over! \u{1F3C6}" }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h2", { className: "mb-8 uppercase font-sans", children: getWinnerMessage() }),
    results?.duration && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-xl mb-6", children: [
      "Game Duration: ",
      results.duration,
      " seconds"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-xl mb-4", children: [
      "Session Score: ",
      totalScore
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-xl mb-8", children: [
      "Best Class Score: ",
      bestClassScore,
      isBestScore && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "text-tertiary font-bold ml-2", children: "New High Score!" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "bg-surface-container-high p-6 rounded-xl w-full max-w-2xl shadow-elevation-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h3", { className: "font-bold mb-4 uppercase font-sans", children: "\u{1F4CA} Final Scores" }),
      results && results.participants.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-left mb-4 p-3 rounded-lg bg-surface-container-low", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            "img",
            {
              src: p === results.winner ? `${config.baseUrl}img/WinningBee.png` : p.points >= bestClassScore * 0.9 ? `${config.baseUrl}img/CelebratoryBee.png` : p.avatar || `${config.baseUrl}img/bee.png`,
              alt: `${p.name} avatar`,
              className: "w-8 h-8 rounded-full"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "font-bold text-lg", children: p.name })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-primary", children: [
          p.wordsCorrect,
          "/",
          p.wordsAttempted,
          " correct (",
          p.wordsAttempted > 0 ? Math.round(p.wordsCorrect / p.wordsAttempted * 100) : 0,
          "%) - ",
          p.lives,
          " lives remaining - ",
          p.points + (config.dailyChallenge ? bonus : 0),
          " points"
        ] })
      ] }, index))
    ] }),
    config.dailyChallenge && streakInfo && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "bg-surface-container-high p-4 rounded-xl w-full max-w-2xl mt-4 shadow-elevation-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-lg", children: [
        "\u{1F525} Streak: ",
        streakInfo.currentStreak,
        " day",
        streakInfo.currentStreak !== 1 ? "s" : "",
        " (Best ",
        streakInfo.highestStreak,
        ")"
      ] }),
      bonus > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-tertiary mt-2", children: [
        "Bonus Points: +",
        bonus
      ] })
    ] }),
    results.missedWords && results.missedWords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "bg-surface-container-high p-6 rounded-xl w-full max-w-2xl mt-8 shadow-elevation-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h3", { className: "font-bold mb-4 uppercase font-sans", children: "\u274C Missed Words" }),
      results.missedWords.map((w, index) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "text-left mb-3 p-3 rounded-lg bg-surface-container-low", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "font-bold", children: w.word }),
        " - ",
        w.definition,
        (w.prefix || w.suffix) && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(MorphologyCard_default, { word: w, database: config.wordDatabase })
      ] }, index))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex gap-4 mt-8 flex-wrap justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "button",
        {
          onClick: handleExport,
          className: "bg-tertiary-container text-on-tertiary-container px-6 py-3 rounded-full text-lg font-bold hover:shadow-elevation-1",
          children: "\u{1F4E4} Export Results"
        }
      ),
      results.missedWords && results.missedWords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "button",
        {
          onClick: handleExportMissedWords,
          className: "bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:shadow-elevation-1",
          children: "\u{1F4DD} Export Missed Words"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "button",
        {
          onClick: onViewLeaderboard,
          className: "bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full text-lg font-bold hover:shadow-elevation-1",
          children: "\u{1F4C8} View Leaderboard"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "button",
        {
          onClick: onRestart,
          className: "bg-primary text-on-primary px-8 py-3 rounded-full text-lg font-bold hover:shadow-elevation-2",
          children: "\u{1F504} Play Again"
        }
      )
    ] }),
    showComfortModal && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "w-full max-w-md rounded-2xl bg-white p-6 text-center text-gray-900 shadow-2xl", role: "dialog", "aria-modal": "true", "aria-labelledby": "comfort-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h3", { id: "comfort-heading", className: "mb-3 text-2xl font-black", children: "How did the session feel?" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "mb-5 text-sm text-gray-600", children: "This saves a simple class comfort check with the session history." }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("button", { onClick: () => handleComfortSelect("happy"), className: "rounded-xl bg-green-100 px-3 py-4 text-3xl font-black text-green-800 hover:bg-green-200", "aria-label": "Comfort happy", children: "\u{1F60A}" }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("button", { onClick: () => handleComfortSelect("okay"), className: "rounded-xl bg-yellow-100 px-3 py-4 text-3xl font-black text-yellow-800 hover:bg-yellow-200", "aria-label": "Comfort okay", children: "\u{1F610}" }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("button", { onClick: () => handleComfortSelect("tough"), className: "rounded-xl bg-blue-100 px-3 py-4 text-3xl font-black text-blue-800 hover:bg-blue-200", "aria-label": "Comfort tough", children: "\u{1F61F}" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("button", { onClick: () => setShowComfortModal(false), className: "mt-5 rounded-xl bg-gray-200 px-5 py-2 font-bold text-gray-800 hover:bg-gray-300", children: "Skip" })
    ] }) })
  ] });
};
var ResultsScreen_default = ResultsScreen;

// src/AchievementsScreen.tsx
var import_react20 = __toESM(require_react());

// src/constants/achievements.ts
var achievements = {
  firstWin: {
    title: "First Victory",
    description: "Win your first game",
    icon: "/spelling-bee-game/img/achievements/first-win.svg"
  },
  perfectGame: {
    title: "Perfect Game",
    description: "Complete a game with no mistakes",
    icon: "/spelling-bee-game/img/achievements/perfect-game.svg"
  },
  speedDemon: {
    title: "Speed Demon",
    description: "Complete a game in under 2 minutes",
    icon: "/spelling-bee-game/img/achievements/speed-demon.svg"
  },
  wordMaster: {
    title: "Word Master",
    description: "Spell 100 words correctly",
    icon: "/spelling-bee-game/img/achievements/word-master.svg"
  },
  dailyStreak: {
    title: "Daily Streak",
    description: "Complete daily challenges for 7 days in a row",
    icon: "/spelling-bee-game/img/achievements/daily-streak.svg"
  }
};

// src/AchievementsScreen.tsx
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var AchievementBadge = ({ unlocked, title, description, icon }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: `achievement ${unlocked ? "unlocked" : "locked"}`, children: [
  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("img", { src: icon, alt: title }),
  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("h3", { children: title }),
  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { children: description })
] });
var AchievementsScreen = ({ onBack }) => {
  const unlocked = (0, import_react20.useMemo)(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("unlockedAchievements") || "[]");
    } catch {
      return [];
    }
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "screen-container bg-gradient-to-br from-green-600 to-teal-800 text-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("h1", { className: "screen-title text-center mb-8", children: "Achievements" }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "achievements-grid max-w-xl mx-auto", children: Object.entries(achievements).map(([key, achievement]) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      AchievementBadge,
      {
        unlocked: unlocked.includes(key),
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon
      },
      key
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      "button",
      {
        onClick: onBack,
        className: "mt-8 block mx-auto bg-yellow-300 text-black btn-responsive font-bold",
        children: "Back"
      }
    )
  ] });
};
var AchievementsScreen_default = AchievementsScreen;

// src/HistoryScreen.tsx
var import_react21 = __toESM(require_react());
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var HistoryScreen = ({ onBack }) => {
  const [history, setHistory] = (0, import_react21.useState)([]);
  (0, import_react21.useEffect)(() => {
    setHistory(loadHistory());
  }, []);
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };
  const comfortCounts = history.reduce((counts, entry) => {
    if (entry.comfort) counts[entry.comfort] = (counts[entry.comfort] || 0) + 1;
    return counts;
  }, {});
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center font-body", children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("h1", { className: "font-bold mb-8 text-yellow-300 uppercase font-sans", children: "\u{1F4D8} Session History" }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "bg-white/10 p-8 rounded-lg w-full max-w-md", children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "text-xl", children: "No session history." }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "mb-5 grid grid-cols-3 gap-2 text-sm font-bold", children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "rounded-lg bg-green-500/20 p-2", children: [
          "\u{1F60A} ",
          comfortCounts.happy || 0
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "rounded-lg bg-yellow-500/20 p-2", children: [
          "\u{1F610} ",
          comfortCounts.okay || 0
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "rounded-lg bg-blue-500/20 p-2", children: [
          "\u{1F61F} ",
          comfortCounts.tough || 0
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("ul", { className: "text-xl space-y-2", children: history.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("li", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { children: new Date(entry.date).toLocaleString() }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("span", { className: "text-yellow-300", children: [
          entry.score,
          " pts",
          entry.duration !== void 0 && ` / ${entry.duration}s`,
          " ",
          entry.comfort === "happy" ? "\u{1F60A}" : entry.comfort === "okay" ? "\u{1F610}" : entry.comfort === "tough" ? "\u{1F61F}" : ""
        ] })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex gap-4 mt-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", { onClick: onBack, className: "bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-2xl font-bold", children: "Back" }),
      history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", { onClick: handleClearHistory, className: "bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl text-2xl font-bold", children: "Clear History" })
    ] })
  ] });
};
var HistoryScreen_default = HistoryScreen;

// src/ShopScreen.tsx
var import_react23 = __toESM(require_react());

// src/hooks/useFocusTrap.ts
var import_react22 = __toESM(require_react());
function useFocusTrap() {
  const ref = (0, import_react22.useRef)(null);
  (0, import_react22.useEffect)(() => {
    const element = ref.current;
    if (!element) return;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      if (focusableElements.length === 1) {
        e.preventDefault();
        firstElement.focus();
        return;
      }
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    element.addEventListener("keydown", handleKeyDown);
    if (firstElement) {
      firstElement.focus();
    }
    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return ref;
}

// src/ShopScreen.tsx
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var shopItems = [
  {
    id: "wizard",
    name: "Wizard Avatar",
    description: "A magical wizard avatar with special powers",
    icon: IMAGE_ASSETS.avatars.bee,
    price: 50,
    type: "avatar"
  },
  {
    id: "top-hat",
    name: "Top Hat",
    description: "A fancy top hat for your avatar",
    icon: IMAGE_ASSETS.avatars.book,
    price: 30,
    type: "accessory"
  },
  {
    id: "hint-letter",
    name: "Hint: Reveal a Letter",
    description: "Reveals one correct letter in the current word",
    icon: "?",
    price: 20,
    type: "help",
    cooldown: 60
  },
  {
    id: "hint-definition",
    name: "Hint: Show Definition",
    description: "Shows the definition of the current word",
    icon: "D",
    price: 15,
    type: "help",
    cooldown: 30
  },
  {
    id: "extra-time",
    name: "Extra Time",
    description: "Adds 30 seconds to the current round's timer",
    icon: "\u23F1\uFE0F",
    price: 25,
    type: "help",
    cooldown: 90
  },
  {
    id: "skip-word",
    name: "Skip Word",
    description: "Skip the current word without penalty",
    icon: "\u23ED\uFE0F",
    price: 40,
    type: "help",
    cooldown: 120
  }
];
var ShopScreen = ({ onBack }) => {
  const [cooldowns, setCooldowns] = import_react23.default.useState({});
  const [coins, setCoins] = import_react23.default.useState(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem("coins");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [ownedAvatars, setOwnedAvatars] = import_react23.default.useState(() => {
    if (typeof window === "undefined") return ["bee", "book", "trophy"];
    try {
      return JSON.parse(
        localStorage.getItem("ownedAvatars") || '["bee","book","trophy"]'
      );
    } catch {
      return ["bee", "book", "trophy"];
    }
  });
  const [ownedAccessories, setOwnedAccessories] = import_react23.default.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("ownedAccessories") || "[]");
    } catch {
      return [];
    }
  });
  const [currentAvatar, setCurrentAvatar] = import_react23.default.useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("equippedAvatar") || "";
  });
  import_react23.default.useEffect(() => {
    localStorage.setItem("equippedAvatar", currentAvatar);
  }, [currentAvatar]);
  import_react23.default.useEffect(() => {
    const timer = setInterval(() => {
      setCooldowns((prevCooldowns) => {
        const updated = { ...prevCooldowns };
        Object.keys(updated).forEach((key) => {
          if (updated[key] > 0) {
            updated[key]--;
            if (updated[key] <= 0) {
              delete updated[key];
            }
          }
        });
        return Object.keys(updated).length ? updated : {};
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const purchaseItem = (item) => {
    if (coins < item.price) {
      alert("Not enough coins!");
      return;
    }
    if (item.type === "help" && cooldowns[item.id]) {
      alert(`This item is on cooldown for ${cooldowns[item.id]} more seconds`);
      return;
    }
    const newCoins = coins - item.price;
    setCoins(newCoins);
    localStorage.setItem("coins", String(newCoins));
    if (item.type === "avatar" && !ownedAvatars.includes(item.id)) {
      const updated = [...ownedAvatars, item.id];
      setOwnedAvatars(updated);
      localStorage.setItem("ownedAvatars", JSON.stringify(updated));
    } else if (item.type === "accessory" && !ownedAccessories.includes(item.id)) {
      const updated = [...ownedAccessories, item.id];
      setOwnedAccessories(updated);
      localStorage.setItem("ownedAccessories", JSON.stringify(updated));
    } else if (item.type === "help") {
      if (item.effect) {
        item.effect();
      }
      if (item.cooldown) {
        setCooldowns((prev) => ({
          ...prev,
          [item.id]: item.cooldown
        }));
      }
      onBack();
      return;
    }
  };
  const isOwned = (item) => {
    if (item.type === "avatar") {
      return ownedAvatars.includes(item.id);
    } else if (item.type === "accessory") {
      return ownedAccessories.includes(item.id);
    }
    return false;
  };
  const isOnCooldown = (item) => {
    return item.type === "help" && cooldowns[item.id] > 0;
  };
  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const mainHeadingRef = (0, import_react23.useRef)(null);
  const backButtonRef = (0, import_react23.useRef)(null);
  const shopRef = useFocusTrap();
  (0, import_react23.useEffect)(() => {
    if (mainHeadingRef.current) {
      mainHeadingRef.current.focus();
    }
  }, []);
  const handleBackClick = () => {
    onBack();
    const lastFocused = document.activeElement;
    if (lastFocused) {
      lastFocused.focus();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "div",
    {
      ref: shopRef,
      className: "min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-8",
      role: "region",
      "aria-label": "Shop",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "button",
          {
            ref: backButtonRef,
            onClick: handleBackClick,
            className: "mb-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:outline-none",
            "aria-label": "Go back to previous screen",
            children: "Back"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "h1",
          {
            ref: mainHeadingRef,
            className: "text-3xl font-bold mb-4",
            tabIndex: -1,
            children: "Shop"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
          "div",
          {
            className: "mb-4 text-xl font-semibold",
            "aria-live": "polite",
            "aria-atomic": "true",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "sr-only", children: "You have" }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { "aria-hidden": "true", children: "\u{1FA99}" }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: "ml-2", children: [
                coins,
                " coins"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("section", { "aria-labelledby": "avatar-heading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            "h2",
            {
              id: "avatar-heading",
              className: "text-2xl font-bold mb-2",
              children: "Your Avatar"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            AvatarSelector,
            {
              currentAvatar,
              onSelect: setCurrentAvatar,
              availableAvatars: ownedAvatars,
              "aria-label": "Select your avatar"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("section", { "aria-labelledby": "items-heading", className: "mt-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            "h2",
            {
              id: "items-heading",
              className: "text-2xl font-bold mb-4",
              children: "Available Items"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              role: "list",
              "aria-label": "List of available items for purchase",
              children: shopItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                "div",
                {
                  className: `p-4 border rounded-lg mb-4 ${isOwned(item) ? "bg-green-50 border-green-200" : isOnCooldown(item) ? "bg-gray-50 opacity-75" : "bg-white hover:shadow-md"} transition-all`,
                  children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-start justify-between gap-4", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-start space-x-4 flex-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-lg", children: item.icon.startsWith("/") ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("img", { src: item.icon, alt: "", className: "w-8 h-8" }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-xl", children: item.icon }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("h3", { className: "font-medium text-gray-900", children: item.name }),
                        item.description && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "text-sm text-gray-600 mt-1", children: item.description }),
                        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "mt-2 flex items-center justify-between", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: "text-sm font-medium text-blue-700", children: [
                            item.price,
                            " coins"
                          ] }),
                          item.type === "help" && item.cooldown && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-xs text-gray-500", children: isOnCooldown(item) ? `Cooldown: ${formatCooldown(cooldowns[item.id])}` : `Cooldown: ${formatCooldown(item.cooldown)}` })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                      "button",
                      {
                        onClick: () => purchaseItem(item),
                        disabled: isOwned(item) || isOnCooldown(item),
                        className: `px-3 py-1.5 rounded text-sm font-medium ${isOwned(item) ? "bg-green-100 text-green-800 cursor-default" : isOnCooldown(item) ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
                        "aria-label": isOwned(item) ? "Already owned" : isOnCooldown(item) ? `On cooldown for ${formatCooldown(cooldowns[item.id])}` : `Buy ${item.name}`,
                        children: isOwned(item) ? "Owned" : isOnCooldown(item) ? "On Cooldown" : "Buy"
                      }
                    ) })
                  ] })
                },
                item.id
              ))
            }
          )
        ] })
      ]
    }
  );
};
var ShopScreen_default = ShopScreen;

// src/PracticeScreen.tsx
var import_react24 = __toESM(require_react());
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var pickWord = (words, previousWord) => {
  if (words.length === 0) return null;
  if (words.length === 1) return words[0];
  let next = words[Math.floor(Math.random() * words.length)];
  while (next.word === previousWord) {
    next = words[Math.floor(Math.random() * words.length)];
  }
  return next;
};
var PracticeScreen = ({ words, onBack, reviewWords = [] }) => {
  const practiceWords = import_react24.default.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    return [...reviewWords, ...words].filter((word) => {
      const key = word.word.trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [reviewWords, words]);
  const [currentWord, setCurrentWord] = import_react24.default.useState(() => pickWord(practiceWords));
  const [answer, setAnswer] = import_react24.default.useState("");
  const [feedback, setFeedback] = import_react24.default.useState("");
  const [correctCount, setCorrectCount] = import_react24.default.useState(0);
  const inputRef = import_react24.default.useRef(null);
  const moveToNextWord = import_react24.default.useCallback(() => {
    setCurrentWord((previous) => pickWord(practiceWords, previous?.word));
    setAnswer("");
    setFeedback("");
    inputRef.current?.focus();
  }, [practiceWords]);
  import_react24.default.useEffect(() => {
    setCurrentWord(pickWord(practiceWords));
  }, [practiceWords]);
  import_react24.default.useEffect(() => {
    if (currentWord) speak(currentWord.word);
  }, [currentWord]);
  const checkAnswer = (event) => {
    event.preventDefault();
    if (!currentWord) return;
    if (answer.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      rescheduleReviewWord(currentWord, true);
      setCorrectCount((count) => count + 1);
      setFeedback("Correct. Nice warm-up.");
      window.setTimeout(moveToNextWord, 700);
      return;
    }
    rescheduleReviewWord(currentWord, false);
    setFeedback("Not quite. Listen again and have another go.");
    speak(currentWord.word);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-emerald-700 via-sky-800 to-indigo-900 p-6 text-white font-body", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl flex-col items-center justify-center text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mb-8 w-full rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "mb-2 text-sm font-bold uppercase tracking-wide text-yellow-200", children: "Practice Mode" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h1", { className: "mb-4 text-4xl font-black md:text-6xl", children: "Warm-Up Practice" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "mx-auto max-w-2xl text-lg text-white/90", children: "Quick low-pressure spelling before the main game. Missed words appear first when they are due." })
    ] }),
    currentWord ? /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("form", { onSubmit: checkAnswer, className: "w-full max-w-2xl rounded-3xl border border-white/20 bg-black/30 p-6 shadow-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mb-6 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "button",
          {
            type: "button",
            onClick: () => speak(currentWord.word),
            className: "rounded-2xl bg-yellow-300 px-6 py-3 text-lg font-black text-black transition hover:bg-yellow-400",
            children: "Hear Word"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "button",
          {
            type: "button",
            onClick: moveToNextWord,
            className: "rounded-2xl bg-white/90 px-6 py-3 text-lg font-black text-black transition hover:bg-white",
            children: "Try Another"
          }
        )
      ] }),
      currentWord.definition && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("p", { className: "mb-5 rounded-2xl bg-white/10 p-4 text-left text-white/90", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "font-bold text-yellow-200", children: "Meaning:" }),
        " ",
        currentWord.definition
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("label", { htmlFor: "warmup-answer", className: "mb-2 block text-left text-lg font-bold", children: "Spell the word" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        "input",
        {
          id: "warmup-answer",
          ref: inputRef,
          value: answer,
          onChange: (event) => setAnswer(event.target.value),
          autoFocus: true,
          autoComplete: "off",
          className: "mb-4 w-full rounded-2xl border-4 border-white/30 bg-white px-5 py-4 text-2xl font-bold text-gray-900"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        "button",
        {
          type: "submit",
          className: "w-full rounded-2xl bg-emerald-400 px-6 py-4 text-2xl font-black text-black transition hover:bg-emerald-300",
          children: "Check"
        }
      ),
      feedback && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "mt-5 text-xl font-bold text-yellow-200", role: "status", children: feedback })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "w-full max-w-2xl rounded-3xl border border-white/20 bg-black/30 p-6 shadow-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "text-xl font-bold", children: "Words are still loading. Head back and try again in a moment." }) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mt-8 flex flex-col items-center gap-4 sm:flex-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "rounded-2xl bg-white/10 px-5 py-3 font-bold", children: [
        "Correct in warm-up: ",
        correctCount
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "rounded-2xl bg-white px-6 py-3 text-lg font-black text-gray-900 transition hover:bg-yellow-100",
          children: "Back to Setup"
        }
      )
    ] })
  ] }) });
};
var PracticeScreen_default = PracticeScreen;

// src/utils/useMusic.ts
var import_react25 = __toESM(require_react());

// src/utils/audioManager.ts
var import_howler = __toESM(require_howler());

// src/utils/logger.ts
var levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
var env = typeof process !== "undefined" && process.env || {};
var envLevel = (env.LOG_LEVEL || "").toLowerCase();
var defaultLevel = env.NODE_ENV === "production" ? "warn" : "info";
var currentLevel = levels[envLevel] !== void 0 ? envLevel : defaultLevel;
function shouldLog(level) {
  return levels[level] <= levels[currentLevel];
}
function log(level, ...args) {
  if (!shouldLog(level)) return;
  const method = level === "debug" ? console.debug : level === "info" ? console.log : level === "warn" ? console.warn : console.error;
  method(...args);
}
var logger = {
  debug: (...args) => log("debug", ...args),
  info: (...args) => log("info", ...args),
  warn: (...args) => log("warn", ...args),
  error: (...args) => log("error", ...args)
};
var logger_default = logger;

// src/utils/audioManager.ts
var ensureAudioContext = () => {
  if (!import_howler.Howler.ctx) {
    try {
      const silentSound = new import_howler.Howl({
        src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="],
        preload: true,
        volume: 0
      });
      silentSound.play();
      silentSound.stop();
    } catch (error) {
      logger_default.warn("Audio context warm-up skipped:", error);
    }
  }
  return import_howler.Howler.ctx;
};
var AudioManager = class {
  constructor() {
    this.audioContext = null;
    this.sounds = /* @__PURE__ */ new Map();
    this.music = /* @__PURE__ */ new Map();
    this.activeMusic = null;
    this.settings = {
      areSoundsMuted: false,
      isMusicMuted: false,
      sfxVolume: 0.7,
      musicVolume: 0.7,
      wordVolume: 1
    };
    ensureAudioContext();
  }
  /**
   * Load a sound effect
   * @param key Unique identifier for the sound
   * @param src Path to the audio file
   * @param options Sound options
   */
  loadSound(key, src, options = {}) {
    if (this.sounds.has(key)) {
      return;
    }
    const {
      loop = false,
      volume = this.settings.sfxVolume,
      onend,
      onerror,
      preload = true
    } = options;
    const sound = new import_howler.Howl({
      src: [src],
      loop,
      volume,
      preload,
      onload: () => {
        logger_default.info(`Sound loaded: ${key}`);
      },
      onloaderror: (_, error) => {
        logger_default.error(`Error loading sound ${key}:`, error);
        if (onerror) onerror(new Error(`Failed to load sound: ${key}`));
      },
      onend: () => {
        if (onend) onend();
      },
      onplayerror: () => {
        const error = new Error(`Failed to play sound: ${key}`);
        logger_default.error(error.message);
        if (onerror) onerror(error);
      }
    });
    this.sounds.set(key, { key, sound, path: src });
  }
  /**
   * Check if a sound is loaded
   * @param keyOrPath Sound key or path
   */
  isSoundLoaded(keyOrPath) {
    const sound = this.sounds.get(keyOrPath);
    if (sound) {
      return sound.sound.state() === "loaded";
    }
    for (const snd of this.sounds.values()) {
      if (snd.path === keyOrPath) {
        return snd.sound.state() === "loaded";
      }
    }
    return false;
  }
  /**
   * Get a sound by key
   * @param key Sound key
   */
  getSound(key) {
    return this.sounds.get(key)?.sound;
  }
  /**
   * Get a music track by key
   * @param key Music key
   */
  getMusic(key) {
    return this.music.get(key);
  }
  /**
   * Play a sound effect
   * @param keyOrPath Sound key or path
   * @param options Sound options
   * @returns Sound ID or null if failed
   */
  playSound(keyOrPath, options = {}) {
    if (this.settings.areSoundsMuted) {
      return null;
    }
    const {
      loop = false,
      volume = this.settings.sfxVolume,
      onend,
      onerror
    } = options;
    let sound = this.sounds.get(keyOrPath);
    if (!sound) {
      for (const [_, snd] of this.sounds) {
        if (snd.path === keyOrPath) {
          sound = snd;
          break;
        }
      }
      if (!sound) {
        this.loadSound(keyOrPath, keyOrPath, { ...options, preload: true });
        logger_default.warn(`Sound not preloaded: ${keyOrPath}, attempting to load...`);
        return null;
      }
    }
    sound.sound.volume(volume);
    sound.sound.loop(loop);
    if (onend) {
      sound.sound.off("end");
      sound.sound.on("end", onend);
    }
    if (onerror) {
      sound.sound.off("loaderror");
      sound.sound.on("loaderror", (_, error) => onerror(new Error(`Failed to load sound: ${error}`)));
      sound.sound.off("playerror");
      sound.sound.on("playerror", () => onerror(new Error("Failed to play sound")));
    }
    const soundId = sound.sound.play();
    return soundId;
  }
  /**
   * Stop a playing sound
   * @param keyOrId Sound key or Howl instance ID
   */
  stopSound(keyOrId) {
    if (typeof keyOrId === "number") {
      for (const sound of this.sounds.values()) {
        sound.sound.stop(keyOrId);
      }
    } else {
      const sound = this.sounds.get(keyOrId);
      if (sound) {
        sound.sound.stop();
      }
    }
  }
  /**
   * Load a music track
   * @param key Unique identifier for the music
   * @param src Path to the audio file
   * @param options Music options
   */
  loadMusic(key, src, options = {}) {
    if (this.music.has(key)) {
      return;
    }
    const { loop = true, onend, onerror, preload = true } = options;
    const music = new import_howler.Howl({
      src: [src],
      loop,
      volume: this.settings.musicVolume,
      preload,
      onload: () => {
        logger_default.info(`Music loaded: ${key}`);
      },
      onloaderror: (_, error) => {
        logger_default.error(`Error loading music ${key}:`, error);
        if (onerror) onerror(new Error(`Failed to load music: ${key}`));
      },
      onend: () => {
        if (onend) onend();
      },
      onplayerror: () => {
        const error = new Error(`Failed to play music: ${key}`);
        logger_default.error(error.message);
        if (onerror) onerror(error);
      }
    });
    this.music.set(key, music);
  }
  /**
   * Play a music track
   * @param key Music key
   * @param options Music options
   * @returns Sound ID or null if failed
   */
  playMusic(key, options = {}) {
    if (this.settings.isMusicMuted) {
      return null;
    }
    const { loop = true, onend, onerror } = options;
    const music = this.music.get(key);
    if (!music) {
      logger_default.error(`Music not found: ${key}`);
      if (onerror) onerror(new Error(`Music not found: ${key}`));
      return null;
    }
    this.stopMusic();
    music.loop(loop);
    music.volume(this.settings.musicVolume);
    if (onend) {
      music.off("end");
      music.on("end", onend);
    }
    if (onerror) {
      music.off("loaderror");
      music.on("loaderror", (_, error) => onerror(new Error(`Failed to load music: ${error}`)));
      music.off("playerror");
      music.on("playerror", () => onerror(new Error("Failed to play music")));
    }
    const musicId = music.play();
    this.activeMusic = { key, instance: music };
    return musicId;
  }
  /**
   * Stop the currently playing music
   */
  stopMusic() {
    if (this.activeMusic) {
      this.activeMusic.instance.stop();
      this.activeMusic = null;
    }
  }
  /**
   * Pause the currently playing music
   */
  pauseMusic() {
    if (this.activeMusic) {
      this.activeMusic.instance.pause();
    }
  }
  /**
   * Resume the currently paused music
   */
  resumeMusic() {
    if (this.activeMusic && !this.activeMusic.instance.playing()) {
      this.activeMusic.instance.play();
    }
  }
  /**
   * Set the volume for sound effects
   * @param volume Volume level (0.0 to 1.0)
   */
  setSfxVolume(volume) {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    import_howler.Howler.volume(this.settings.sfxVolume);
  }
  /**
   * Set the volume for music
   * @param volume Volume level (0.0 to 1.0)
   */
  setMusicVolume(volume) {
    this.settings.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.activeMusic) {
      this.activeMusic.instance.volume(this.settings.musicVolume);
    }
  }
  /**
   * Toggle mute state for sound effects
   * @param muted Whether to mute or unmute
   */
  toggleSounds(muted) {
    this.settings.areSoundsMuted = muted !== void 0 ? muted : !this.settings.areSoundsMuted;
    import_howler.Howler.mute(this.settings.areSoundsMuted);
  }
  /**
   * Toggle mute state for music
   * @param muted Whether to mute or unmute
   */
  toggleMusic(muted) {
    this.settings.isMusicMuted = muted !== void 0 ? muted : !this.settings.isMusicMuted;
    if (this.activeMusic) {
      this.activeMusic.instance.mute(this.settings.isMusicMuted);
    }
  }
  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const savedSettings = localStorage.getItem("audioSettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.settings = { ...this.settings, ...settings };
        this.setSfxVolume(this.settings.sfxVolume);
        this.setMusicVolume(this.settings.musicVolume);
        if (this.settings.areSoundsMuted) {
          import_howler.Howler.mute(true);
        }
      }
    } catch (error) {
      logger_default.error("Error loading audio settings:", error);
    }
  }
  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem("audioSettings", JSON.stringify(this.settings));
    } catch (error) {
      logger_default.error("Error saving audio settings:", error);
    }
  }
};
var audioManager2 = new AudioManager();
audioManager2.loadSettings();

// src/utils/audio.ts
var loadAudioAssets = () => {
  try {
    audioManager2.loadSound("ui_click", "/assets/audio/letter-correct.mp3");
    audioManager2.loadSound("correct", "/assets/audio/correct.mp3");
    audioManager2.loadSound("wrong", "/assets/audio/wrong.mp3");
  } catch (error) {
    console.error("Error loading audio assets:", error);
  }
};
if (typeof window !== "undefined") {
  loadAudioAssets();
}

// src/constants.ts
var musicFiles = {
  "victory": AUDIO_ASSETS.music.victory,
  "country": AUDIO_ASSETS.music.country,
  "country_instrumental": AUDIO_ASSETS.music.countryInstrumental,
  "deep_bass_instrumental": AUDIO_ASSETS.music.deepBassInstrumental,
  "deep_bass": AUDIO_ASSETS.music.deepBass,
  "funk_instrumental": AUDIO_ASSETS.music.funkInstrumental,
  "funk": AUDIO_ASSETS.music.funk,
  "latin_instrumental": AUDIO_ASSETS.music.latinInstrumental,
  "latin": AUDIO_ASSETS.music.latin,
  "rock_instrumental": AUDIO_ASSETS.music.rockInstrumental,
  "rock": AUDIO_ASSETS.music.rock,
  "spooky_instrumental": AUDIO_ASSETS.music.spookyInstrumental,
  "spooky": AUDIO_ASSETS.music.spooky,
  "tech_house_instrumental": AUDIO_ASSETS.music.techHouseInstrumental,
  "tech_house": AUDIO_ASSETS.music.techHouse
};
var DEFAULT_STYLE = "funk";

// src/utils/useMusic.ts
var validateVolume = (volume) => {
  return Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0.5;
};
var buildTrackKey = (style, variant) => {
  const normalizedStyle = style?.toLowerCase().replace(/\s+/g, "_") || DEFAULT_STYLE;
  const candidateKey = variant === "instrumental" ? `${normalizedStyle}_instrumental` : normalizedStyle;
  if (musicFiles[candidateKey]) {
    return candidateKey;
  }
  const fallback = variant === "instrumental" ? `${DEFAULT_STYLE}_instrumental` : DEFAULT_STYLE;
  return fallback;
};
var registerPlaybackListeners = (howl, onPlay, onStop) => {
  if (!howl) {
    return () => {
    };
  }
  howl.on("play", onPlay);
  howl.on("stop", onStop);
  howl.on("pause", onStop);
  howl.on("end", onStop);
  return () => {
    howl.off("play", onPlay);
    howl.off("stop", onStop);
    howl.off("pause", onStop);
    howl.off("end", onStop);
  };
};
var useMusic = (musicStyle = DEFAULT_STYLE, trackVariant = "vocal", musicVolume = 0.7, soundEnabled = true, screen = "menu", shouldPlay = true) => {
  const [isPlaying, setIsPlaying] = (0, import_react25.useState)(false);
  const [currentVolume, setCurrentVolume] = (0, import_react25.useState)(validateVolume(musicVolume));
  const [currentTrack, setCurrentTrack] = (0, import_react25.useState)("");
  const previousTrackKey = (0, import_react25.useRef)(null);
  const trackKey = (0, import_react25.useMemo)(
    () => buildTrackKey(musicStyle || DEFAULT_STYLE, trackVariant),
    [musicStyle, trackVariant]
  );
  (0, import_react25.useEffect)(() => {
    const validatedVolume = validateVolume(musicVolume);
    setCurrentVolume(validatedVolume);
    audioManager2.setMusicVolume(validatedVolume);
  }, [musicVolume]);
  (0, import_react25.useEffect)(() => {
    const trackSource = musicFiles[trackKey];
    if (!trackSource) {
      setIsPlaying(false);
      return;
    }
    setCurrentTrack(trackSource);
    if (!soundEnabled || !shouldPlay) {
      audioManager2.pauseMusic();
      setIsPlaying(false);
      return;
    }
    if (!audioManager2.getMusic(trackKey)) {
      audioManager2.loadMusic(trackKey, trackSource, { preload: true, loop: true });
    }
    const musicInstance = audioManager2.getMusic(trackKey);
    const cleanupListeners = registerPlaybackListeners(
      musicInstance,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
    if (previousTrackKey.current !== trackKey) {
      const id = audioManager2.playMusic(trackKey, { loop: true });
      setIsPlaying(id !== null);
      previousTrackKey.current = trackKey;
    } else if (musicInstance && !musicInstance.playing()) {
      audioManager2.resumeMusic();
    }
    return () => {
      cleanupListeners();
      if (screen === "menu") {
        audioManager2.stopMusic();
        previousTrackKey.current = null;
      }
    };
  }, [trackKey, soundEnabled, shouldPlay, screen]);
  return {
    isPlaying,
    currentTrack,
    volume: currentVolume
  };
};
var useMusic_default = useMusic;

// src/AudioContext.tsx
var import_react26 = __toESM(require_react());
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
var AudioContext2 = (0, import_react26.createContext)(void 0);
var AudioProvider = ({ children }) => {
  const [muted, setMuted] = (0, import_react26.useState)(false);
  const toggleMute = () => {
    setMuted(!muted);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(AudioContext2.Provider, { value: { muted, toggleMute }, children });
};

// src/services/wordlistService.ts
var DEFAULT_WORDLIST_PATH = "/wordlist.json";
var CUSTOM_WORDLISTS_KEY = "wordLists";
var cachedWordList = null;
var activeListId = null;
var FALLBACK_WORDS = [
  {
    word: "education",
    syllables: ["ed", "u", "ca", "tion"],
    definition: "The process of receiving or giving systematic instruction, especially at a school or university.",
    origin: 'Latin "educatio", from "educare" meaning "to bring up, rear, educate".',
    example: "The school is committed to providing quality education to all its students.",
    prefix: "",
    suffix: "-tion",
    pronunciation: "ej-oo-KAY-shun",
    difficulty: "medium"
  },
  {
    word: "spelling",
    syllables: ["spell", "ing"],
    definition: "The process of writing or naming the letters of a word.",
    origin: 'Old English "spellian" meaning "to tell, speak, utter".',
    example: "She won first place in the school spelling competition.",
    prefix: "",
    suffix: "-ing",
    pronunciation: "SPEL-ing",
    difficulty: "easy"
  }
];
function getActiveListId() {
  return activeListId || localStorage.getItem("activeWordListId");
}
function clearWordListCache() {
  cachedWordList = null;
}
async function getWordList() {
  if (cachedWordList) {
    return cachedWordList;
  }
  const activeListId2 = getActiveListId();
  if (activeListId2) {
    const customList = getCustomWordList(activeListId2);
    if (customList) {
      cachedWordList = customList;
      return cachedWordList;
    }
  }
  try {
    const response = await fetch(DEFAULT_WORDLIST_PATH);
    if (!response.ok) {
      throw new Error(`Failed to fetch word list: ${response.statusText}`);
    }
    const data = await response.json();
    cachedWordList = (Array.isArray(data) ? data : []).map((word) => ({
      ...word,
      id: `default-${word.word}`,
      listId: "default"
    }));
    if (!Array.isArray(cachedWordList) || cachedWordList.length === 0) {
      console.warn("Word list is empty or invalid, using fallback words");
      return FALLBACK_WORDS.map((word) => ({
        ...word,
        id: `fallback-${word.word}`,
        listId: "fallback"
      }));
    }
    return cachedWordList;
  } catch (error) {
    console.error("Error loading word list, using fallback words:", error);
    return FALLBACK_WORDS;
  }
}
function getCustomWordList(listId) {
  try {
    const lists = JSON.parse(localStorage.getItem(CUSTOM_WORDLISTS_KEY) || "[]");
    const list = lists.find((l) => l.id === listId);
    if (!list) return null;
    return list.words.map((word, index) => ({
      ...word,
      id: `${listId}-${index}`,
      listId,
      syllables: word.syllables || splitIntoSyllables(word.word),
      origin: word.origin || "",
      example: word.example || "",
      prefix: word.prefix || "",
      suffix: word.suffix || "",
      pronunciation: word.pronunciation || ""
    }));
  } catch (error) {
    console.error("Error loading custom word list:", error);
    return null;
  }
}
function splitIntoSyllables(word) {
  return word.split(/(?=[A-Z])|[-_]/).map((part) => part.toLowerCase());
}

// src/spelling-bee-game.tsx
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var SpellingBeeGame = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("team") === "1") {
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TeamDisplay_default, {});
    }
    if (params.get("scoreboard") === "1") {
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ScoreboardScreen_default, {});
    }
  }
  const [gameState, setGameState] = (0, import_react27.useState)("setup");
  const [gameConfig, setGameConfig] = (0, import_react27.useState)(null);
  const [gameResults, setGameResults] = (0, import_react27.useState)(null);
  const [customWords, setCustomWords] = (0, import_react27.useState)({ easy: [], medium: [], tricky: [] });
  const [wordDatabase, setWordDatabase] = (0, import_react27.useState)({ easy: [], medium: [], tricky: [] });
  const [musicStyle, setMusicStyle] = (0, import_react27.useState)("Funk");
  const [musicVolume, setMusicVolume] = (0, import_react27.useState)(0.5);
  const [soundEnabled, setSoundEnabled] = (0, import_react27.useState)(true);
  const [isMusicPlaying, setIsMusicPlaying] = (0, import_react27.useState)(true);
  const convertWord = (w) => ({
    word: w.word,
    syllables: w.syllables || null,
    phonemes: w.phonemes || Array.from(w.word.toUpperCase()),
    definition: w.definition || null,
    origin: w.origin || null,
    example: w.example || null,
    prefix: w.prefix || null,
    suffix: w.suffix || null,
    pronunciation: w.pronunciation || void 0,
    difficulty: w.difficulty
  });
  (0, import_react27.useEffect)(() => {
    const loadWordList = () => {
      getWordList().then((wordsFromService) => {
        const words = wordsFromService.map(convertWord);
        const wordDatabase2 = {
          easy: words.filter((w) => w.difficulty === "easy" || !w.difficulty),
          medium: words.filter((w) => w.difficulty === "medium"),
          tricky: words.filter((w) => w.difficulty === "hard")
        };
        if (wordDatabase2.easy.length === 0 && wordDatabase2.medium.length === 0 && wordDatabase2.tricky.length === 0) {
          wordDatabase2.easy = words.filter((w) => w.word.length <= 5);
          wordDatabase2.medium = words.filter((w) => w.word.length > 5 && w.word.length <= 8);
          wordDatabase2.tricky = words.filter((w) => w.word.length > 8);
        }
        setWordDatabase(wordDatabase2);
      }).catch((err) => console.error("Failed to load word list", err));
    };
    loadWordList();
  }, []);
  (0, import_react27.useEffect)(() => {
    if (gameState === "setup") {
      getWordList().then((wordsFromService) => {
        const words = wordsFromService.map(convertWord);
        const wordDatabase2 = {
          easy: words.filter((w) => w.difficulty === "easy" || !w.difficulty),
          medium: words.filter((w) => w.difficulty === "medium"),
          tricky: words.filter((w) => w.difficulty === "hard")
        };
        if (wordDatabase2.easy.length === 0 && wordDatabase2.medium.length === 0 && wordDatabase2.tricky.length === 0) {
          wordDatabase2.easy = words.filter((w) => w.word.length <= 5);
          wordDatabase2.medium = words.filter((w) => w.word.length > 5 && w.word.length <= 8);
          wordDatabase2.tricky = words.filter((w) => w.word.length > 8);
        }
        setWordDatabase(wordDatabase2);
      }).catch((err) => console.error("Failed to load word list", err));
    }
  }, [gameState]);
  const handleAddCustomWords = (newWords) => {
    const easy = newWords.filter((w) => w.difficulty === "easy" || !w.difficulty && w.word.length <= 5);
    const medium = newWords.filter((w) => w.difficulty === "medium" || !w.difficulty && w.word.length > 5 && w.word.length <= 8);
    const tricky = newWords.filter((w) => w.difficulty === "hard" || w.difficulty === "tricky" || !w.difficulty && w.word.length > 8);
    setCustomWords({ easy, medium, tricky });
  };
  const handleStartGame = (config2) => {
    let finalWordDatabase;
    if (config2.dailyChallenge) {
      finalWordDatabase = customWords;
    } else {
      finalWordDatabase = {
        easy: [...wordDatabase.easy, ...customWords.easy],
        medium: [...wordDatabase.medium, ...customWords.medium],
        tricky: [...wordDatabase.tricky, ...customWords.tricky]
      };
    }
    setGameConfig({ ...config2, wordDatabase: finalWordDatabase });
    setSoundEnabled(config2.soundEnabled);
    setMusicStyle(config2.musicStyle);
    setMusicVolume(config2.musicVolume);
    setIsMusicPlaying(true);
    setGameState("playing");
  };
  const handleEndGame = (results) => {
    setGameResults(results);
    setGameState("results");
  };
  const handleRestart = () => {
    setGameState("setup");
    setGameConfig(null);
    setGameResults(null);
    clearWordListCache();
  };
  const handleViewLeaderboard = () => {
    setGameState("leaderboard");
  };
  const handleViewAchievements = () => {
    setGameState("achievements");
  };
  const handleViewHistory = () => {
    setGameState("history");
  };
  const handleViewShop = () => {
    setGameState("shop");
  };
  const handleBackToSetup = () => {
    setGameState("setup");
    clearWordListCache();
  };
  const handleStartWarmup = () => {
    setGameState("warmup");
  };
  const handleQuitToSetup = () => {
    setGameState("setup");
    clearWordListCache();
  };
  const handleExitGame = () => {
    setGameState("setup");
    clearWordListCache();
  };
  const handleResumeGame = (savedState) => {
    setGameConfig(savedState.gameConfig);
    setGameState("playing");
  };
  (0, import_react27.useEffect)(() => {
    applyAccessibilitySettings();
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      applyThemeClass(savedTheme);
    }
  }, []);
  const screen = gameState === "playing" ? "game" : "menu";
  const trackVariant = screen === "game" ? "instrumental" : "vocal";
  useMusic_default(musicStyle, trackVariant, musicVolume, soundEnabled, screen, isMusicPlaying);
  const handleSoundEnabledChange = (enabled) => {
    setSoundEnabled(enabled);
    if (!enabled) {
      audioManager2.pauseMusic();
    } else if (isMusicPlaying) {
      audioManager2.resumeMusic();
    }
  };
  const handleToggleMusicPlaying = () => {
    setIsMusicPlaying((prev) => {
      const next = !prev;
      if (!next) {
        audioManager2.pauseMusic();
      } else if (soundEnabled) {
        audioManager2.resumeMusic();
      }
      return next;
    });
  };
  const wordListsReady = wordDatabase.easy.length + wordDatabase.medium.length + wordDatabase.tricky.length > 0;
  if (gameState === "setup") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      SetupScreen_default,
      {
        onStartGame: handleStartGame,
        onAddCustomWords: handleAddCustomWords,
        onViewAchievements: handleViewAchievements,
        onResumeGame: handleResumeGame,
        onViewHistory: handleViewHistory,
        onViewShop: () => handleViewShop(),
        onStartWarmup: handleStartWarmup,
        wordListsReady
      }
    );
  }
  if (gameState === "warmup") {
    const reviewWords = getDueReviewWords();
    const practiceWords = [
      ...wordDatabase.easy,
      ...wordDatabase.medium,
      ...wordDatabase.tricky,
      ...customWords.easy,
      ...customWords.medium,
      ...customWords.tricky
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(PracticeScreen_default, { words: practiceWords, reviewWords, onBack: handleBackToSetup });
  }
  if (gameState === "playing") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      GameScreen_default,
      {
        config: gameConfig,
        onEndGame: handleEndGame,
        onExitGame: handleExitGame,
        musicStyle,
        musicVolume,
        onMusicStyleChange: setMusicStyle,
        onMusicVolumeChange: setMusicVolume,
        soundEnabled,
        onSoundEnabledChange: handleSoundEnabledChange,
        isMusicPlaying,
        onToggleMusicPlaying: handleToggleMusicPlaying
      }
    );
  }
  if (gameState === "results") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      ResultsScreen_default,
      {
        results: gameResults,
        config: gameConfig,
        onRestart: handleRestart,
        onViewLeaderboard: handleViewLeaderboard
      }
    );
  }
  if (gameState === "leaderboard") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(LeaderboardScreen_default, { onBack: handleBackToSetup });
  }
  if (gameState === "achievements") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(AchievementsScreen_default, { onBack: handleBackToSetup });
  }
  if (gameState === "history") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(HistoryScreen_default, { onBack: handleBackToSetup });
  }
  if (gameState === "shop") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ShopScreen_default, { onBack: handleBackToSetup });
  }
  return null;
};
var container = document.getElementById("root");
if (container) {
  const root = import_client.default.createRoot(container);
  root.render(
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react27.default.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(AudioProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(HelpSystemProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SpellingBeeGame, {}) }) }) })
  );
}
var spelling_bee_game_default = SpellingBeeGame;
export {
  spelling_bee_game_default as default
};
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/log-out.js:
lucide-react/dist/esm/icons/message-circle.js:
lucide-react/dist/esm/icons/pause.js:
lucide-react/dist/esm/icons/play.js:
lucide-react/dist/esm/icons/skip-forward.js:
lucide-react/dist/esm/icons/volume-2.js:
lucide-react/dist/esm/icons/volume-x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.460.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
