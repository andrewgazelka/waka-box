module.exports = (function(e, t) {
  "use strict";
  var r = {};
  function __webpack_require__(t) {
    if (r[t]) {
      return r[t].exports;
    }
    var n = (r[t] = { i: t, l: false, exports: {} });
    e[t].call(n.exports, n, n.exports, __webpack_require__);
    n.l = true;
    return n.exports;
  }
  __webpack_require__.ab = __dirname + "/";
  function startup() {
    return __webpack_require__(104);
  }
  return startup();
})({
  0: function(e, t, r) {
    const n = r(316);
    const i = [r(372), r(19), r(190), r(148), r(248), r(586), r(430), r(850)];
    e.exports = n.plugin(i);
  },
  8: function(e, t, r) {
    e.exports = iterator;
    const n = r(301);
    function iterator(e, t) {
      const r = t.headers;
      let i = e.request.endpoint(t).url;
      return {
        [Symbol.asyncIterator]: () => ({
          next() {
            if (!i) {
              return Promise.resolve({ done: true });
            }
            return e.request({ url: i, headers: r }).then(t => {
              n(e, i, t);
              i = ((t.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) ||
                [])[1];
              return { value: t };
            });
          }
        })
      };
    }
  },
  11: function(e) {
    e.exports = wrappy;
    function wrappy(e, t) {
      if (e && t) return wrappy(e)(t);
      if (typeof e !== "function") throw new TypeError("need wrapper function");
      Object.keys(e).forEach(function(t) {
        wrapper[t] = e[t];
      });
      return wrapper;
      function wrapper() {
        var t = new Array(arguments.length);
        for (var r = 0; r < t.length; r++) {
          t[r] = arguments[r];
        }
        var n = e.apply(this, t);
        var i = t[t.length - 1];
        if (typeof n === "function" && n !== i) {
          Object.keys(i).forEach(function(e) {
            n[e] = i[e];
          });
        }
        return n;
      }
    }
  },
  18: function() {
    eval("require")("encoding");
  },
  19: function(e, t, r) {
    e.exports = authenticationPlugin;
    const { Deprecation: n } = r(692);
    const i = r(49);
    const s = i((e, t) => e.warn(t));
    const o = r(674);
    const a = r(471);
    const u = r(349);
    function authenticationPlugin(e, t) {
      if (t.auth) {
        e.authenticate = () => {
          s(
            e.log,
            new n(
              '[@octokit/rest] octokit.authenticate() is deprecated and has no effect when "auth" option is set on Octokit constructor'
            )
          );
        };
        return;
      }
      const r = { octokit: e, auth: false };
      e.authenticate = o.bind(null, r);
      e.hook.before("request", a.bind(null, r));
      e.hook.error("request", u.bind(null, r));
    }
  },
  25: function(e, t, r) {
    t = e.exports = createDebug.debug = createDebug["default"] = createDebug;
    t.coerce = coerce;
    t.disable = disable;
    t.enable = enable;
    t.enabled = enabled;
    t.humanize = r(761);
    t.instances = [];
    t.names = [];
    t.skips = [];
    t.formatters = {};
    function selectColor(e) {
      var r = 0,
        n;
      for (n in e) {
        r = (r << 5) - r + e.charCodeAt(n);
        r |= 0;
      }
      return t.colors[Math.abs(r) % t.colors.length];
    }
    function createDebug(e) {
      var r;
      function debug() {
        if (!debug.enabled) return;
        var e = debug;
        var n = +new Date();
        var i = n - (r || n);
        e.diff = i;
        e.prev = r;
        e.curr = n;
        r = n;
        var s = new Array(arguments.length);
        for (var o = 0; o < s.length; o++) {
          s[o] = arguments[o];
        }
        s[0] = t.coerce(s[0]);
        if ("string" !== typeof s[0]) {
          s.unshift("%O");
        }
        var a = 0;
        s[0] = s[0].replace(/%([a-zA-Z%])/g, function(r, n) {
          if (r === "%%") return r;
          a++;
          var i = t.formatters[n];
          if ("function" === typeof i) {
            var o = s[a];
            r = i.call(e, o);
            s.splice(a, 1);
            a--;
          }
          return r;
        });
        t.formatArgs.call(e, s);
        var u = debug.log || t.log || console.log.bind(console);
        u.apply(e, s);
      }
      debug.namespace = e;
      debug.enabled = t.enabled(e);
      debug.useColors = t.useColors();
      debug.color = selectColor(e);
      debug.destroy = destroy;
      if ("function" === typeof t.init) {
        t.init(debug);
      }
      t.instances.push(debug);
      return debug;
    }
    function destroy() {
      var e = t.instances.indexOf(this);
      if (e !== -1) {
        t.instances.splice(e, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(e) {
      t.save(e);
      t.names = [];
      t.skips = [];
      var r;
      var n = (typeof e === "string" ? e : "").split(/[\s,]+/);
      var i = n.length;
      for (r = 0; r < i; r++) {
        if (!n[r]) continue;
        e = n[r].replace(/\*/g, ".*?");
        if (e[0] === "-") {
          t.skips.push(new RegExp("^" + e.substr(1) + "$"));
        } else {
          t.names.push(new RegExp("^" + e + "$"));
        }
      }
      for (r = 0; r < t.instances.length; r++) {
        var s = t.instances[r];
        s.enabled = t.enabled(s.namespace);
      }
    }
    function disable() {
      t.enable("");
    }
    function enabled(e) {
      if (e[e.length - 1] === "*") {
        return true;
      }
      var r, n;
      for (r = 0, n = t.skips.length; r < n; r++) {
        if (t.skips[r].test(e)) {
          return false;
        }
      }
      for (r = 0, n = t.names.length; r < n; r++) {
        if (t.names[r].test(e)) {
          return true;
        }
      }
      return false;
    }
    function coerce(e) {
      if (e instanceof Error) return e.stack || e.message;
      return e;
    }
  },
  26: function(e, t, r) {
    "use strict";
    var n = r(369);
    e.exports = function createError(e, t, r, i, s) {
      var o = new Error(e);
      return n(o, t, r, i, s);
    };
  },
  35: function(e, t, r) {
    "use strict";
    var n = r(727);
    var i = r(812);
    var s = Object.prototype.toString;
    function isArray(e) {
      return s.call(e) === "[object Array]";
    }
    function isArrayBuffer(e) {
      return s.call(e) === "[object ArrayBuffer]";
    }
    function isFormData(e) {
      return typeof FormData !== "undefined" && e instanceof FormData;
    }
    function isArrayBufferView(e) {
      var t;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        t = ArrayBuffer.isView(e);
      } else {
        t = e && e.buffer && e.buffer instanceof ArrayBuffer;
      }
      return t;
    }
    function isString(e) {
      return typeof e === "string";
    }
    function isNumber(e) {
      return typeof e === "number";
    }
    function isUndefined(e) {
      return typeof e === "undefined";
    }
    function isObject(e) {
      return e !== null && typeof e === "object";
    }
    function isDate(e) {
      return s.call(e) === "[object Date]";
    }
    function isFile(e) {
      return s.call(e) === "[object File]";
    }
    function isBlob(e) {
      return s.call(e) === "[object Blob]";
    }
    function isFunction(e) {
      return s.call(e) === "[object Function]";
    }
    function isStream(e) {
      return isObject(e) && isFunction(e.pipe);
    }
    function isURLSearchParams(e) {
      return (
        typeof URLSearchParams !== "undefined" && e instanceof URLSearchParams
      );
    }
    function trim(e) {
      return e.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (
        typeof navigator !== "undefined" &&
        (navigator.product === "ReactNative" ||
          navigator.product === "NativeScript" ||
          navigator.product === "NS")
      ) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(e, t) {
      if (e === null || typeof e === "undefined") {
        return;
      }
      if (typeof e !== "object") {
        e = [e];
      }
      if (isArray(e)) {
        for (var r = 0, n = e.length; r < n; r++) {
          t.call(null, e[r], r, e);
        }
      } else {
        for (var i in e) {
          if (Object.prototype.hasOwnProperty.call(e, i)) {
            t.call(null, e[i], i, e);
          }
        }
      }
    }
    function merge() {
      var e = {};
      function assignValue(t, r) {
        if (typeof e[r] === "object" && typeof t === "object") {
          e[r] = merge(e[r], t);
        } else {
          e[r] = t;
        }
      }
      for (var t = 0, r = arguments.length; t < r; t++) {
        forEach(arguments[t], assignValue);
      }
      return e;
    }
    function deepMerge() {
      var e = {};
      function assignValue(t, r) {
        if (typeof e[r] === "object" && typeof t === "object") {
          e[r] = deepMerge(e[r], t);
        } else if (typeof t === "object") {
          e[r] = deepMerge({}, t);
        } else {
          e[r] = t;
        }
      }
      for (var t = 0, r = arguments.length; t < r; t++) {
        forEach(arguments[t], assignValue);
      }
      return e;
    }
    function extend(e, t, r) {
      forEach(t, function assignValue(t, i) {
        if (r && typeof t === "function") {
          e[i] = n(t, r);
        } else {
          e[i] = t;
        }
      });
      return e;
    }
    e.exports = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: i,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isObject: isObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge,
      deepMerge: deepMerge,
      extend: extend,
      trim: trim
    };
  },
  47: function(e, t, r) {
    e.exports = factory;
    const n = r(402);
    const i = r(855);
    function factory(e) {
      const t = n.bind(null, e || []);
      t.plugin = i.bind(null, e || []);
      return t;
    }
  },
  49: function(e, t, r) {
    var n = r(11);
    e.exports = n(once);
    e.exports.strict = n(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(e) {
      var t = function() {
        if (t.called) return t.value;
        t.called = true;
        return (t.value = e.apply(this, arguments));
      };
      t.called = false;
      return t;
    }
    function onceStrict(e) {
      var t = function() {
        if (t.called) throw new Error(t.onceError);
        t.called = true;
        return (t.value = e.apply(this, arguments));
      };
      var r = e.name || "Function wrapped with `once`";
      t.onceError = r + " shouldn't be called more than once";
      t.called = false;
      return t;
    }
  },
  53: function(e, t, r) {
    e.exports = r(352);
  },
  63: function(e, t, r) {
    const n = r(747);
    const i = r(622);
    function log(e) {
      console.log(`[dotenv][DEBUG] ${e}`);
    }
    const s = "\n";
    const o = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
    const a = /\\n/g;
    const u = /\n|\r|\r\n/;
    function parse(e, t) {
      const r = Boolean(t && t.debug);
      const n = {};
      e.toString()
        .split(u)
        .forEach(function(e, t) {
          const i = e.match(o);
          if (i != null) {
            const e = i[1];
            let t = i[2] || "";
            const r = t.length - 1;
            const o = t[0] === '"' && t[r] === '"';
            const u = t[0] === "'" && t[r] === "'";
            if (u || o) {
              t = t.substring(1, r);
              if (o) {
                t = t.replace(a, s);
              }
            } else {
              t = t.trim();
            }
            n[e] = t;
          } else if (r) {
            log(`did not match key and value when parsing line ${t + 1}: ${e}`);
          }
        });
      return n;
    }
    function config(e) {
      let t = i.resolve(process.cwd(), ".env");
      let r = "utf8";
      let s = false;
      if (e) {
        if (e.path != null) {
          t = e.path;
        }
        if (e.encoding != null) {
          r = e.encoding;
        }
        if (e.debug != null) {
          s = true;
        }
      }
      try {
        const e = parse(n.readFileSync(t, { encoding: r }), { debug: s });
        Object.keys(e).forEach(function(t) {
          if (!Object.prototype.hasOwnProperty.call(process.env, t)) {
            process.env[t] = e[t];
          } else if (s) {
            log(
              `"${t}" is already defined in \`process.env\` and will not be overwritten`
            );
          }
        });
        return { parsed: e };
      } catch (e) {
        return { error: e };
      }
    }
    e.exports.config = config;
    e.exports.parse = parse;
  },
  81: function(e, t, r) {
    var n = r(867);
    var i = r(669);
    t = e.exports = r(25);
    t.init = init;
    t.log = log;
    t.formatArgs = formatArgs;
    t.save = save;
    t.load = load;
    t.useColors = useColors;
    t.colors = [6, 2, 3, 4, 5, 1];
    try {
      var s = r(247);
      if (s && s.level >= 2) {
        t.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (e) {}
    t.inspectOpts = Object.keys(process.env)
      .filter(function(e) {
        return /^debug_/i.test(e);
      })
      .reduce(function(e, t) {
        var r = t
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, function(e, t) {
            return t.toUpperCase();
          });
        var n = process.env[t];
        if (/^(yes|on|true|enabled)$/i.test(n)) n = true;
        else if (/^(no|off|false|disabled)$/i.test(n)) n = false;
        else if (n === "null") n = null;
        else n = Number(n);
        e[r] = n;
        return e;
      }, {});
    function useColors() {
      return "colors" in t.inspectOpts
        ? Boolean(t.inspectOpts.colors)
        : n.isatty(process.stderr.fd);
    }
    t.formatters.o = function(e) {
      this.inspectOpts.colors = this.useColors;
      return i
        .inspect(e, this.inspectOpts)
        .split("\n")
        .map(function(e) {
          return e.trim();
        })
        .join(" ");
    };
    t.formatters.O = function(e) {
      this.inspectOpts.colors = this.useColors;
      return i.inspect(e, this.inspectOpts);
    };
    function formatArgs(e) {
      var r = this.namespace;
      var n = this.useColors;
      if (n) {
        var i = this.color;
        var s = "[3" + (i < 8 ? i : "8;5;" + i);
        var o = "  " + s + ";1m" + r + " " + "[0m";
        e[0] = o + e[0].split("\n").join("\n" + o);
        e.push(s + "m+" + t.humanize(this.diff) + "[0m");
      } else {
        e[0] = getDate() + r + " " + e[0];
      }
    }
    function getDate() {
      if (t.inspectOpts.hideDate) {
        return "";
      } else {
        return new Date().toISOString() + " ";
      }
    }
    function log() {
      return process.stderr.write(i.format.apply(i, arguments) + "\n");
    }
    function save(e) {
      if (null == e) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = e;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(e) {
      e.inspectOpts = {};
      var r = Object.keys(t.inspectOpts);
      for (var n = 0; n < r.length; n++) {
        e.inspectOpts[r[n]] = t.inspectOpts[r[n]];
      }
    }
    t.enable(load());
  },
  87: function(e) {
    e.exports = require("os");
  },
  104: function(e, t, r) {
    r(63).config();
    const { WakaTimeClient: n, RANGE: i } = r(650);
    const s = r(0);
    const { GIST_ID: o, GH_TOKEN: a, WAKATIME_API_KEY: u } = process.env;
    const p = new n(u);
    const c = new s({ auth: `token ${a}` });
    async function main() {
      try {
        const e = await p.getMyStats({ range: i.LAST_7_DAYS });
      } catch (e) {
        console.error("Error getting wakatime stats: ", e);
        return;
      }
      await updateGist(stats);
    }
    function trimRightStr(e, t) {
      return e.length > t ? e.substring(0, t - 3) + "..." : e;
    }
    async function updateGist(e) {
      let t;
      try {
        t = await c.gists.get({ gist_id: o });
      } catch (e) {
        console.error(`Unable to get gist\n${e}`);
      }
      const r = [];
      const n = e.data.languages.filter(({ name: e }) => e != "TeX");
      const i = Math.min(n.length, 5);
      for (let e = 0; e < i; e++) {
        const t = n[e];
        const { name: i, percent: s, text: o } = t;
        console.log("language ", i);
        const a = [
          trimRightStr(i, 10).padEnd(10),
          o.padEnd(14),
          generateBarChart(s, 21),
          String(s.toFixed(1)).padStart(5) + "%"
        ];
        r.push(a.join(" "));
      }
      if (r.length === 0) return;
      try {
        const e = Object.keys(t.data.files)[0];
        await c.gists.update({
          gist_id: o,
          files: {
            [e]: {
              filename: `📊 Weekly development breakdown`,
              content: r.join("\n")
            }
          }
        });
      } catch (e) {
        console.error(`Unable to update gist\n${e}`);
      }
    }
    function generateBarChart(e, t) {
      const r = "░▏▎▍▌▋▊▉█";
      const n = Math.floor((t * 8 * e) / 100);
      const i = Math.floor(n / 8);
      if (i >= t) {
        return r.substring(8, 9).repeat(t);
      }
      const s = n % 8;
      return [r.substring(8, 9).repeat(i), r.substring(s, s + 1)]
        .join("")
        .padEnd(t, r.substring(0, 1));
    }
    (async () => {
      console.log("starting waka-box run");
      try {
        await main();
      } catch (e) {
        console.log("received error", e);
      }
    })();
  },
  126: function(e) {
    var t = 200;
    var r = "__lodash_hash_undefined__";
    var n = 1 / 0;
    var i = "[object Function]",
      s = "[object GeneratorFunction]";
    var o = /[\\^$.*+?()[\]{}|]/g;
    var a = /^\[object .+?Constructor\]$/;
    var u =
      typeof global == "object" && global && global.Object === Object && global;
    var p = typeof self == "object" && self && self.Object === Object && self;
    var c = u || p || Function("return this")();
    function arrayIncludes(e, t) {
      var r = e ? e.length : 0;
      return !!r && baseIndexOf(e, t, 0) > -1;
    }
    function arrayIncludesWith(e, t, r) {
      var n = -1,
        i = e ? e.length : 0;
      while (++n < i) {
        if (r(t, e[n])) {
          return true;
        }
      }
      return false;
    }
    function baseFindIndex(e, t, r, n) {
      var i = e.length,
        s = r + (n ? 1 : -1);
      while (n ? s-- : ++s < i) {
        if (t(e[s], s, e)) {
          return s;
        }
      }
      return -1;
    }
    function baseIndexOf(e, t, r) {
      if (t !== t) {
        return baseFindIndex(e, baseIsNaN, r);
      }
      var n = r - 1,
        i = e.length;
      while (++n < i) {
        if (e[n] === t) {
          return n;
        }
      }
      return -1;
    }
    function baseIsNaN(e) {
      return e !== e;
    }
    function cacheHas(e, t) {
      return e.has(t);
    }
    function getValue(e, t) {
      return e == null ? undefined : e[t];
    }
    function isHostObject(e) {
      var t = false;
      if (e != null && typeof e.toString != "function") {
        try {
          t = !!(e + "");
        } catch (e) {}
      }
      return t;
    }
    function setToArray(e) {
      var t = -1,
        r = Array(e.size);
      e.forEach(function(e) {
        r[++t] = e;
      });
      return r;
    }
    var d = Array.prototype,
      g = Function.prototype,
      l = Object.prototype;
    var m = c["__core-js_shared__"];
    var h = (function() {
      var e = /[^.]+$/.exec((m && m.keys && m.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })();
    var y = g.toString;
    var f = l.hasOwnProperty;
    var b = l.toString;
    var _ = RegExp(
      "^" +
        y
          .call(f)
          .replace(o, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
    var q = d.splice;
    var w = getNative(c, "Map"),
      v = getNative(c, "Set"),
      T = getNative(Object, "create");
    function Hash(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function hashClear() {
      this.__data__ = T ? T(null) : {};
    }
    function hashDelete(e) {
      return this.has(e) && delete this.__data__[e];
    }
    function hashGet(e) {
      var t = this.__data__;
      if (T) {
        var n = t[e];
        return n === r ? undefined : n;
      }
      return f.call(t, e) ? t[e] : undefined;
    }
    function hashHas(e) {
      var t = this.__data__;
      return T ? t[e] !== undefined : f.call(t, e);
    }
    function hashSet(e, t) {
      var n = this.__data__;
      n[e] = T && t === undefined ? r : t;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(e) {
      var t = this.__data__,
        r = assocIndexOf(t, e);
      if (r < 0) {
        return false;
      }
      var n = t.length - 1;
      if (r == n) {
        t.pop();
      } else {
        q.call(t, r, 1);
      }
      return true;
    }
    function listCacheGet(e) {
      var t = this.__data__,
        r = assocIndexOf(t, e);
      return r < 0 ? undefined : t[r][1];
    }
    function listCacheHas(e) {
      return assocIndexOf(this.__data__, e) > -1;
    }
    function listCacheSet(e, t) {
      var r = this.__data__,
        n = assocIndexOf(r, e);
      if (n < 0) {
        r.push([e, t]);
      } else {
        r[n][1] = t;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        hash: new Hash(),
        map: new (w || ListCache)(),
        string: new Hash()
      };
    }
    function mapCacheDelete(e) {
      return getMapData(this, e)["delete"](e);
    }
    function mapCacheGet(e) {
      return getMapData(this, e).get(e);
    }
    function mapCacheHas(e) {
      return getMapData(this, e).has(e);
    }
    function mapCacheSet(e, t) {
      getMapData(this, e).set(e, t);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.__data__ = new MapCache();
      while (++t < r) {
        this.add(e[t]);
      }
    }
    function setCacheAdd(e) {
      this.__data__.set(e, r);
      return this;
    }
    function setCacheHas(e) {
      return this.__data__.has(e);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function assocIndexOf(e, t) {
      var r = e.length;
      while (r--) {
        if (eq(e[r][0], t)) {
          return r;
        }
      }
      return -1;
    }
    function baseIsNative(e) {
      if (!isObject(e) || isMasked(e)) {
        return false;
      }
      var t = isFunction(e) || isHostObject(e) ? _ : a;
      return t.test(toSource(e));
    }
    function baseUniq(e, r, n) {
      var i = -1,
        s = arrayIncludes,
        o = e.length,
        a = true,
        u = [],
        p = u;
      if (n) {
        a = false;
        s = arrayIncludesWith;
      } else if (o >= t) {
        var c = r ? null : E(e);
        if (c) {
          return setToArray(c);
        }
        a = false;
        s = cacheHas;
        p = new SetCache();
      } else {
        p = r ? [] : u;
      }
      e: while (++i < o) {
        var d = e[i],
          g = r ? r(d) : d;
        d = n || d !== 0 ? d : 0;
        if (a && g === g) {
          var l = p.length;
          while (l--) {
            if (p[l] === g) {
              continue e;
            }
          }
          if (r) {
            p.push(g);
          }
          u.push(d);
        } else if (!s(p, g, n)) {
          if (p !== u) {
            p.push(g);
          }
          u.push(d);
        }
      }
      return u;
    }
    var E = !(v && 1 / setToArray(new v([, -0]))[1] == n)
      ? noop
      : function(e) {
          return new v(e);
        };
    function getMapData(e, t) {
      var r = e.__data__;
      return isKeyable(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function getNative(e, t) {
      var r = getValue(e, t);
      return baseIsNative(r) ? r : undefined;
    }
    function isKeyable(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    function isMasked(e) {
      return !!h && h in e;
    }
    function toSource(e) {
      if (e != null) {
        try {
          return y.call(e);
        } catch (e) {}
        try {
          return e + "";
        } catch (e) {}
      }
      return "";
    }
    function uniq(e) {
      return e && e.length ? baseUniq(e) : [];
    }
    function eq(e, t) {
      return e === t || (e !== e && t !== t);
    }
    function isFunction(e) {
      var t = isObject(e) ? b.call(e) : "";
      return t == i || t == s;
    }
    function isObject(e) {
      var t = typeof e;
      return !!e && (t == "object" || t == "function");
    }
    function noop() {}
    e.exports = uniq;
  },
  133: function(e, t, r) {
    "use strict";
    var n = r(35);
    function encode(e) {
      return encodeURIComponent(e)
        .replace(/%40/gi, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
    }
    e.exports = function buildURL(e, t, r) {
      if (!t) {
        return e;
      }
      var i;
      if (r) {
        i = r(t);
      } else if (n.isURLSearchParams(t)) {
        i = t.toString();
      } else {
        var s = [];
        n.forEach(t, function serialize(e, t) {
          if (e === null || typeof e === "undefined") {
            return;
          }
          if (n.isArray(e)) {
            t = t + "[]";
          } else {
            e = [e];
          }
          n.forEach(e, function parseValue(e) {
            if (n.isDate(e)) {
              e = e.toISOString();
            } else if (n.isObject(e)) {
              e = JSON.stringify(e);
            }
            s.push(encode(t) + "=" + encode(e));
          });
        });
        i = s.join("&");
      }
      if (i) {
        var o = e.indexOf("#");
        if (o !== -1) {
          e = e.slice(0, o);
        }
        e += (e.indexOf("?") === -1 ? "?" : "&") + i;
      }
      return e;
    };
  },
  137: function(e, t, r) {
    "use strict";
    var n = r(826);
    function CancelToken(e) {
      if (typeof e !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var t;
      this.promise = new Promise(function promiseExecutor(e) {
        t = e;
      });
      var r = this;
      e(function cancel(e) {
        if (r.reason) {
          return;
        }
        r.reason = new n(e);
        t(r.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var e;
      var t = new CancelToken(function executor(t) {
        e = t;
      });
      return { token: t, cancel: e };
    };
    e.exports = CancelToken;
  },
  143: function(e, t, r) {
    e.exports = withAuthorizationPrefix;
    const n = r(368);
    const i = /^[\w-]+:/;
    function withAuthorizationPrefix(e) {
      if (/^(basic|bearer|token) /i.test(e)) {
        return e;
      }
      try {
        if (i.test(n(e))) {
          return `basic ${e}`;
        }
      } catch (e) {}
      if (e.split(/\./).length === 3) {
        return `bearer ${e}`;
      }
      return `token ${e}`;
    }
  },
  148: function(e, t, r) {
    e.exports = paginatePlugin;
    const n = r(8);
    const i = r(807);
    function paginatePlugin(e) {
      e.paginate = i.bind(null, e);
      e.paginate.iterator = n.bind(null, e);
    }
  },
  190: function(e, t, r) {
    e.exports = authenticationPlugin;
    const n = r(863);
    const i = r(293);
    const s = r(489);
    function authenticationPlugin(e, t) {
      if (!t.auth) {
        return;
      }
      s(t.auth);
      const r = { octokit: e, auth: t.auth };
      e.hook.before("request", n.bind(null, r));
      e.hook.error("request", i.bind(null, r));
    }
  },
  211: function(e) {
    e.exports = require("https");
  },
  215: function(e) {
    e.exports = {
      name: "@octokit/rest",
      version: "16.36.0",
      publishConfig: { access: "public" },
      description: "GitHub REST API client for Node.js",
      keywords: ["octokit", "github", "rest", "api-client"],
      author: "Gregor Martynus (https://github.com/gr2m)",
      contributors: [
        { name: "Mike de Boer", email: "info@mikedeboer.nl" },
        { name: "Fabian Jakobs", email: "fabian@c9.io" },
        { name: "Joe Gallo", email: "joe@brassafrax.com" },
        { name: "Gregor Martynus", url: "https://github.com/gr2m" }
      ],
      repository: "https://github.com/octokit/rest.js",
      dependencies: {
        "@octokit/request": "^5.2.0",
        "@octokit/request-error": "^1.0.2",
        "atob-lite": "^2.0.0",
        "before-after-hook": "^2.0.0",
        "btoa-lite": "^1.0.0",
        deprecation: "^2.0.0",
        "lodash.get": "^4.4.2",
        "lodash.set": "^4.3.2",
        "lodash.uniq": "^4.5.0",
        "octokit-pagination-methods": "^1.1.0",
        once: "^1.4.0",
        "universal-user-agent": "^4.0.0"
      },
      devDependencies: {
        "@gimenete/type-writer": "^0.1.3",
        "@octokit/fixtures-server": "^5.0.6",
        "@octokit/graphql": "^4.2.0",
        "@types/node": "^13.1.0",
        bundlesize: "^0.18.0",
        chai: "^4.1.2",
        "compression-webpack-plugin": "^3.0.0",
        cypress: "^3.0.0",
        glob: "^7.1.2",
        "http-proxy-agent": "^3.0.0",
        "lodash.camelcase": "^4.3.0",
        "lodash.merge": "^4.6.1",
        "lodash.upperfirst": "^4.3.1",
        mkdirp: "^0.5.1",
        mocha: "^6.0.0",
        mustache: "^3.0.0",
        nock: "^11.3.3",
        "npm-run-all": "^4.1.2",
        nyc: "^15.0.0",
        prettier: "^1.14.2",
        proxy: "^1.0.0",
        "semantic-release": "^15.0.0",
        sinon: "^8.0.0",
        "sinon-chai": "^3.0.0",
        "sort-keys": "^4.0.0",
        "string-to-arraybuffer": "^1.0.0",
        "string-to-jsdoc-comment": "^1.0.0",
        typescript: "^3.3.1",
        webpack: "^4.0.0",
        "webpack-bundle-analyzer": "^3.0.0",
        "webpack-cli": "^3.0.0"
      },
      types: "index.d.ts",
      scripts: {
        coverage: "nyc report --reporter=html && open coverage/index.html",
        lint:
          "prettier --check '{lib,plugins,scripts,test}/**/*.{js,json,ts}' 'docs/*.{js,json}' 'docs/src/**/*' index.js README.md package.json",
        "lint:fix":
          "prettier --write '{lib,plugins,scripts,test}/**/*.{js,json,ts}' 'docs/*.{js,json}' 'docs/src/**/*' index.js README.md package.json",
        pretest: "npm run -s lint",
        test: 'nyc mocha test/mocha-node-setup.js "test/*/**/*-test.js"',
        "test:browser": "cypress run --browser chrome",
        build: "npm-run-all build:*",
        "build:ts": "npm run -s update-endpoints:typescript",
        "prebuild:browser": "mkdirp dist/",
        "build:browser": "npm-run-all build:browser:*",
        "build:browser:development":
          "webpack --mode development --entry . --output-library=Octokit --output=./dist/octokit-rest.js --profile --json > dist/bundle-stats.json",
        "build:browser:production":
          "webpack --mode production --entry . --plugin=compression-webpack-plugin --output-library=Octokit --output-path=./dist --output-filename=octokit-rest.min.js --devtool source-map",
        "generate-bundle-report":
          "webpack-bundle-analyzer dist/bundle-stats.json --mode=static --no-open --report dist/bundle-report.html",
        "update-endpoints": "npm-run-all update-endpoints:*",
        "update-endpoints:fetch-json":
          "node scripts/update-endpoints/fetch-json",
        "update-endpoints:code": "node scripts/update-endpoints/code",
        "update-endpoints:typescript":
          "node scripts/update-endpoints/typescript",
        "prevalidate:ts": "npm run -s build:ts",
        "validate:ts": "tsc --target es6 --noImplicitAny index.d.ts",
        "postvalidate:ts":
          "tsc --noEmit --target es6 test/typescript-validate.ts",
        "start-fixtures-server": "octokit-fixtures-server"
      },
      license: "MIT",
      files: ["index.js", "index.d.ts", "lib", "plugins"],
      nyc: { ignore: ["test"] },
      release: {
        publish: [
          "@semantic-release/npm",
          {
            path: "@semantic-release/github",
            assets: ["dist/*", "!dist/*.map.gz"]
          }
        ]
      },
      bundlesize: [{ path: "./dist/octokit-rest.min.js.gz", maxSize: "33 kB" }]
    };
  },
  219: function(e, t, r) {
    "use strict";
    var n = r(35);
    var i = r(564);
    var s = r(133);
    var o = r(631);
    var a = r(688);
    var u = r(26);
    e.exports = function xhrAdapter(e) {
      return new Promise(function dispatchXhrRequest(t, p) {
        var c = e.data;
        var d = e.headers;
        if (n.isFormData(c)) {
          delete d["Content-Type"];
        }
        var g = new XMLHttpRequest();
        if (e.auth) {
          var l = e.auth.username || "";
          var m = e.auth.password || "";
          d.Authorization = "Basic " + btoa(l + ":" + m);
        }
        g.open(
          e.method.toUpperCase(),
          s(e.url, e.params, e.paramsSerializer),
          true
        );
        g.timeout = e.timeout;
        g.onreadystatechange = function handleLoad() {
          if (!g || g.readyState !== 4) {
            return;
          }
          if (
            g.status === 0 &&
            !(g.responseURL && g.responseURL.indexOf("file:") === 0)
          ) {
            return;
          }
          var r =
            "getAllResponseHeaders" in g ? o(g.getAllResponseHeaders()) : null;
          var n =
            !e.responseType || e.responseType === "text"
              ? g.responseText
              : g.response;
          var s = {
            data: n,
            status: g.status,
            statusText: g.statusText,
            headers: r,
            config: e,
            request: g
          };
          i(t, p, s);
          g = null;
        };
        g.onabort = function handleAbort() {
          if (!g) {
            return;
          }
          p(u("Request aborted", e, "ECONNABORTED", g));
          g = null;
        };
        g.onerror = function handleError() {
          p(u("Network Error", e, null, g));
          g = null;
        };
        g.ontimeout = function handleTimeout() {
          p(u("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", g));
          g = null;
        };
        if (n.isStandardBrowserEnv()) {
          var h = r(864);
          var y =
            (e.withCredentials || a(e.url)) && e.xsrfCookieName
              ? h.read(e.xsrfCookieName)
              : undefined;
          if (y) {
            d[e.xsrfHeaderName] = y;
          }
        }
        if ("setRequestHeader" in g) {
          n.forEach(d, function setRequestHeader(e, t) {
            if (
              typeof c === "undefined" &&
              t.toLowerCase() === "content-type"
            ) {
              delete d[t];
            } else {
              g.setRequestHeader(t, e);
            }
          });
        }
        if (e.withCredentials) {
          g.withCredentials = true;
        }
        if (e.responseType) {
          try {
            g.responseType = e.responseType;
          } catch (t) {
            if (e.responseType !== "json") {
              throw t;
            }
          }
        }
        if (typeof e.onDownloadProgress === "function") {
          g.addEventListener("progress", e.onDownloadProgress);
        }
        if (typeof e.onUploadProgress === "function" && g.upload) {
          g.upload.addEventListener("progress", e.onUploadProgress);
        }
        if (e.cancelToken) {
          e.cancelToken.promise.then(function onCanceled(e) {
            if (!g) {
              return;
            }
            g.abort();
            p(e);
            g = null;
          });
        }
        if (c === undefined) {
          c = null;
        }
        g.send(c);
      });
    };
  },
  247: function(e, t, r) {
    "use strict";
    const n = r(87);
    const i = r(364);
    const s = process.env;
    let o;
    if (i("no-color") || i("no-colors") || i("color=false")) {
      o = false;
    } else if (
      i("color") ||
      i("colors") ||
      i("color=true") ||
      i("color=always")
    ) {
      o = true;
    }
    if ("FORCE_COLOR" in s) {
      o = s.FORCE_COLOR.length === 0 || parseInt(s.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(e) {
      if (e === 0) {
        return false;
      }
      return { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 };
    }
    function supportsColor(e) {
      if (o === false) {
        return 0;
      }
      if (i("color=16m") || i("color=full") || i("color=truecolor")) {
        return 3;
      }
      if (i("color=256")) {
        return 2;
      }
      if (e && !e.isTTY && o !== true) {
        return 0;
      }
      const t = o ? 1 : 0;
      if (process.platform === "win32") {
        const e = n.release().split(".");
        if (
          Number(process.versions.node.split(".")[0]) >= 8 &&
          Number(e[0]) >= 10 &&
          Number(e[2]) >= 10586
        ) {
          return Number(e[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in s) {
        if (
          ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(e => e in s) ||
          s.CI_NAME === "codeship"
        ) {
          return 1;
        }
        return t;
      }
      if ("TEAMCITY_VERSION" in s) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(s.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (s.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in s) {
        const e = parseInt((s.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (s.TERM_PROGRAM) {
          case "iTerm.app":
            return e >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(s.TERM)) {
        return 2;
      }
      if (
        /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          s.TERM
        )
      ) {
        return 1;
      }
      if ("COLORTERM" in s) {
        return 1;
      }
      if (s.TERM === "dumb") {
        return t;
      }
      return t;
    }
    function getSupportLevel(e) {
      const t = supportsColor(e);
      return translateLevel(t);
    }
    e.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  },
  248: function(e, t, r) {
    e.exports = octokitRegisterEndpoints;
    const n = r(899);
    function octokitRegisterEndpoints(e) {
      e.registerEndpoints = n.bind(null, e);
    }
  },
  265: function(e, t, r) {
    e.exports = getPage;
    const n = r(370);
    const i = r(577);
    const s = r(297);
    function getPage(e, t, r, o) {
      n(
        `octokit.get${r.charAt(0).toUpperCase() +
          r.slice(
            1
          )}Page() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`
      );
      const a = i(t)[r];
      if (!a) {
        const e = new s(`No ${r} page found`, 404);
        return Promise.reject(e);
      }
      const u = { url: a, headers: applyAcceptHeader(t, o) };
      const p = e.request(u);
      return p;
    }
    function applyAcceptHeader(e, t) {
      const r = e.headers && e.headers["x-github-media-type"];
      if (!r || (t && t.accept)) {
        return t;
      }
      t = t || {};
      t.accept =
        "application/vnd." +
        r.replace("; param=", ".").replace("; format=", "+");
      return t;
    }
  },
  280: function(e) {
    e.exports = register;
    function register(e, t, r, n) {
      if (typeof r !== "function") {
        throw new Error("method for before hook must be a function");
      }
      if (!n) {
        n = {};
      }
      if (Array.isArray(t)) {
        return t.reverse().reduce(function(t, r) {
          return register.bind(null, e, r, t, n);
        }, r)();
      }
      return Promise.resolve().then(function() {
        if (!e.registry[t]) {
          return r(n);
        }
        return e.registry[t].reduce(function(e, t) {
          return t.hook.bind(null, e, n);
        }, r)();
      });
    }
  },
  283: function(e, t, r) {
    "use strict";
    var n = r(35);
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(e, t) {
      this.handlers.push({ fulfilled: e, rejected: t });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(e) {
      if (this.handlers[e]) {
        this.handlers[e] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(e) {
      n.forEach(this.handlers, function forEachHandler(t) {
        if (t !== null) {
          e(t);
        }
      });
    };
    e.exports = InterceptorManager;
  },
  293: function(e, t, r) {
    e.exports = authenticationRequestError;
    const { RequestError: n } = r(463);
    function authenticationRequestError(e, t, r) {
      if (!t.headers) throw t;
      const i = /required/.test(t.headers["x-github-otp"] || "");
      if (t.status !== 401 || !i) {
        throw t;
      }
      if (
        t.status === 401 &&
        i &&
        t.request &&
        t.request.headers["x-github-otp"]
      ) {
        if (e.otp) {
          delete e.otp;
        } else {
          throw new n(
            "Invalid one-time password for two-factor authentication",
            401,
            { headers: t.headers, request: r }
          );
        }
      }
      if (typeof e.auth.on2fa !== "function") {
        throw new n(
          "2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication",
          401,
          { headers: t.headers, request: r }
        );
      }
      return Promise.resolve()
        .then(() => {
          return e.auth.on2fa();
        })
        .then(t => {
          const n = Object.assign(r, {
            headers: Object.assign(r.headers, { "x-github-otp": t })
          });
          return e.octokit.request(n).then(r => {
            e.otp = t;
            return r;
          });
        });
    }
  },
  294: function(e, t, r) {
    e.exports = parseOptions;
    const { Deprecation: n } = r(692);
    const { getUserAgent: i } = r(796);
    const s = r(49);
    const o = r(215);
    const a = s((e, t) => e.warn(t));
    const u = s((e, t) => e.warn(t));
    const p = s((e, t) => e.warn(t));
    function parseOptions(e, t, r) {
      if (e.headers) {
        e.headers = Object.keys(e.headers).reduce((t, r) => {
          t[r.toLowerCase()] = e.headers[r];
          return t;
        }, {});
      }
      const s = {
        headers: e.headers || {},
        request: e.request || {},
        mediaType: { previews: [], format: "" }
      };
      if (e.baseUrl) {
        s.baseUrl = e.baseUrl;
      }
      if (e.userAgent) {
        s.headers["user-agent"] = e.userAgent;
      }
      if (e.previews) {
        s.mediaType.previews = e.previews;
      }
      if (e.timeZone) {
        s.headers["time-zone"] = e.timeZone;
      }
      if (e.timeout) {
        a(
          t,
          new n(
            "[@octokit/rest] new Octokit({timeout}) is deprecated. Use {request: {timeout}} instead. See https://github.com/octokit/request.js#request"
          )
        );
        s.request.timeout = e.timeout;
      }
      if (e.agent) {
        u(
          t,
          new n(
            "[@octokit/rest] new Octokit({agent}) is deprecated. Use {request: {agent}} instead. See https://github.com/octokit/request.js#request"
          )
        );
        s.request.agent = e.agent;
      }
      if (e.headers) {
        p(
          t,
          new n(
            "[@octokit/rest] new Octokit({headers}) is deprecated. Use {userAgent, previews} instead. See https://github.com/octokit/request.js#request"
          )
        );
      }
      const c = s.headers["user-agent"];
      const d = `octokit.js/${o.version} ${i()}`;
      s.headers["user-agent"] = [c, d].filter(Boolean).join(" ");
      s.request.hook = r.bind(null, "request");
      return s;
    }
  },
  297: function(e) {
    e.exports = class HttpError extends Error {
      constructor(e, t, r) {
        super(e);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "HttpError";
        this.code = t;
        this.headers = r;
      }
    };
  },
  301: function(e, t, r) {
    e.exports = normalizePaginatedListResponse;
    const { Deprecation: n } = r(692);
    const i = r(49);
    const s = i((e, t) => e.warn(t));
    const o = i((e, t) => e.warn(t));
    const a = i((e, t) => e.warn(t));
    const u = /^\/search\//;
    const p = /^\/repos\/[^/]+\/[^/]+\/commits\/[^/]+\/(check-runs|check-suites)/;
    const c = /^\/installation\/repositories/;
    const d = /^\/user\/installations/;
    const g = /^\/orgs\/[^/]+\/installations/;
    function normalizePaginatedListResponse(e, t, r) {
      const i = t.replace(e.request.endpoint.DEFAULTS.baseUrl, "");
      if (!u.test(i) && !p.test(i) && !c.test(i) && !d.test(i) && !g.test(i)) {
        return;
      }
      const l = r.data.incomplete_results;
      const m = r.data.repository_selection;
      const h = r.data.total_count;
      delete r.data.incomplete_results;
      delete r.data.repository_selection;
      delete r.data.total_count;
      const y = Object.keys(r.data)[0];
      r.data = r.data[y];
      Object.defineProperty(r.data, y, {
        get() {
          a(
            e.log,
            new n(
              `[@octokit/rest] "result.data.${y}" is deprecated. Use "result.data" instead`
            )
          );
          return r.data;
        }
      });
      if (typeof l !== "undefined") {
        Object.defineProperty(r.data, "incomplete_results", {
          get() {
            s(
              e.log,
              new n(
                '[@octokit/rest] "result.data.incomplete_results" is deprecated.'
              )
            );
            return l;
          }
        });
      }
      if (typeof m !== "undefined") {
        Object.defineProperty(r.data, "repository_selection", {
          get() {
            o(
              e.log,
              new n(
                '[@octokit/rest] "result.data.repository_selection" is deprecated.'
              )
            );
            return m;
          }
        });
      }
      Object.defineProperty(r.data, "total_count", {
        get() {
          o(
            e.log,
            new n('[@octokit/rest] "result.data.total_count" is deprecated.')
          );
          return h;
        }
      });
    }
  },
  316: function(e, t, r) {
    const n = r(47);
    e.exports = n();
  },
  336: function(e, t, r) {
    e.exports = hasLastPage;
    const n = r(370);
    const i = r(577);
    function hasLastPage(e) {
      n(
        `octokit.hasLastPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`
      );
      return i(e).last;
    }
  },
  348: function(e, t, r) {
    "use strict";
    e.exports = validate;
    const { RequestError: n } = r(463);
    const i = r(854);
    const s = r(883);
    function validate(e, t) {
      if (!t.request.validate) {
        return;
      }
      const { validate: r } = t.request;
      Object.keys(r).forEach(e => {
        const o = i(r, e);
        const a = o.type;
        let u;
        let p;
        let c = true;
        let d = false;
        if (/\./.test(e)) {
          u = e.replace(/\.[^.]+$/, "");
          d = u.slice(-2) === "[]";
          if (d) {
            u = u.slice(0, -2);
          }
          p = i(t, u);
          c = u === "headers" || (typeof p === "object" && p !== null);
        }
        const g = d
          ? (i(t, u) || []).map(t => t[e.split(/\./).pop()])
          : [i(t, e)];
        g.forEach((r, i) => {
          const u = typeof r !== "undefined";
          const p = r === null;
          const g = d ? e.replace(/\[\]/, `[${i}]`) : e;
          if (!o.required && !u) {
            return;
          }
          if (!c) {
            return;
          }
          if (o.allowNull && p) {
            return;
          }
          if (!o.allowNull && p) {
            throw new n(`'${g}' cannot be null`, 400, { request: t });
          }
          if (o.required && !u) {
            throw new n(
              `Empty value for parameter '${g}': ${JSON.stringify(r)}`,
              400,
              { request: t }
            );
          }
          if (a === "integer") {
            const e = r;
            r = parseInt(r, 10);
            if (isNaN(r)) {
              throw new n(
                `Invalid value for parameter '${g}': ${JSON.stringify(
                  e
                )} is NaN`,
                400,
                { request: t }
              );
            }
          }
          if (o.enum && o.enum.indexOf(String(r)) === -1) {
            throw new n(
              `Invalid value for parameter '${g}': ${JSON.stringify(r)}`,
              400,
              { request: t }
            );
          }
          if (o.validation) {
            const e = new RegExp(o.validation);
            if (!e.test(r)) {
              throw new n(
                `Invalid value for parameter '${g}': ${JSON.stringify(r)}`,
                400,
                { request: t }
              );
            }
          }
          if (a === "object" && typeof r === "string") {
            try {
              r = JSON.parse(r);
            } catch (e) {
              throw new n(
                `JSON parse error of value for parameter '${g}': ${JSON.stringify(
                  r
                )}`,
                400,
                { request: t }
              );
            }
          }
          s(t, o.mapTo || g, r);
        });
      });
      return t;
    }
  },
  349: function(e, t, r) {
    e.exports = authenticationRequestError;
    const { RequestError: n } = r(463);
    function authenticationRequestError(e, t, r) {
      if (!t.headers) throw t;
      const i = /required/.test(t.headers["x-github-otp"] || "");
      if (t.status !== 401 || !i) {
        throw t;
      }
      if (
        t.status === 401 &&
        i &&
        t.request &&
        t.request.headers["x-github-otp"]
      ) {
        throw new n(
          "Invalid one-time password for two-factor authentication",
          401,
          { headers: t.headers, request: r }
        );
      }
      if (typeof e.auth.on2fa !== "function") {
        throw new n(
          "2FA required, but options.on2fa is not a function. See https://github.com/octokit/rest.js#authentication",
          401,
          { headers: t.headers, request: r }
        );
      }
      return Promise.resolve()
        .then(() => {
          return e.auth.on2fa();
        })
        .then(t => {
          const n = Object.assign(r, {
            headers: Object.assign({ "x-github-otp": t }, r.headers)
          });
          return e.octokit.request(n);
        });
    }
  },
  352: function(e, t, r) {
    "use strict";
    var n = r(35);
    var i = r(727);
    var s = r(779);
    var o = r(825);
    var a = r(529);
    function createInstance(e) {
      var t = new s(e);
      var r = i(s.prototype.request, t);
      n.extend(r, s.prototype, t);
      n.extend(r, t);
      return r;
    }
    var u = createInstance(a);
    u.Axios = s;
    u.create = function create(e) {
      return createInstance(o(u.defaults, e));
    };
    u.Cancel = r(826);
    u.CancelToken = r(137);
    u.isCancel = r(732);
    u.all = function all(e) {
      return Promise.all(e);
    };
    u.spread = r(879);
    e.exports = u;
    e.exports.default = u;
  },
  356: function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });
    function isObject(e) {
      return Object.prototype.toString.call(e) === "[object Object]";
    }
    function isPlainObject(e) {
      var t, r;
      if (isObject(e) === false) return false;
      t = e.constructor;
      if (t === undefined) return true;
      r = t.prototype;
      if (isObject(r) === false) return false;
      if (r.hasOwnProperty("isPrototypeOf") === false) {
        return false;
      }
      return true;
    }
    t.isPlainObject = isPlainObject;
  },
  357: function(e) {
    e.exports = require("assert");
  },
  361: function(e) {
    e.exports = {
      name: "axios",
      version: "0.19.0",
      description: "Promise based HTTP client for the browser and node.js",
      main: "index.js",
      scripts: {
        test: "grunt test && bundlesize",
        start: "node ./sandbox/server.js",
        build: "NODE_ENV=production grunt build",
        preversion: "npm test",
        version:
          "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
        postversion: "git push && git push --tags",
        examples: "node ./examples/server.js",
        coveralls:
          "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        fix: "eslint --fix lib/**/*.js"
      },
      repository: { type: "git", url: "https://github.com/axios/axios.git" },
      keywords: ["xhr", "http", "ajax", "promise", "node"],
      author: "Matt Zabriskie",
      license: "MIT",
      bugs: { url: "https://github.com/axios/axios/issues" },
      homepage: "https://github.com/axios/axios",
      devDependencies: {
        bundlesize: "^0.17.0",
        coveralls: "^3.0.0",
        "es6-promise": "^4.2.4",
        grunt: "^1.0.2",
        "grunt-banner": "^0.6.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-clean": "^1.1.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-eslint": "^20.1.0",
        "grunt-karma": "^2.0.0",
        "grunt-mocha-test": "^0.13.3",
        "grunt-ts": "^6.0.0-beta.19",
        "grunt-webpack": "^1.0.18",
        "istanbul-instrumenter-loader": "^1.0.0",
        "jasmine-core": "^2.4.1",
        karma: "^1.3.0",
        "karma-chrome-launcher": "^2.2.0",
        "karma-coverage": "^1.1.1",
        "karma-firefox-launcher": "^1.1.0",
        "karma-jasmine": "^1.1.1",
        "karma-jasmine-ajax": "^0.1.13",
        "karma-opera-launcher": "^1.0.0",
        "karma-safari-launcher": "^1.0.0",
        "karma-sauce-launcher": "^1.2.0",
        "karma-sinon": "^1.0.5",
        "karma-sourcemap-loader": "^0.3.7",
        "karma-webpack": "^1.7.0",
        "load-grunt-tasks": "^3.5.2",
        minimist: "^1.2.0",
        mocha: "^5.2.0",
        sinon: "^4.5.0",
        typescript: "^2.8.1",
        "url-search-params": "^0.10.0",
        webpack: "^1.13.1",
        "webpack-dev-server": "^1.14.1"
      },
      browser: { "./lib/adapters/http.js": "./lib/adapters/xhr.js" },
      typings: "./index.d.ts",
      dependencies: { "follow-redirects": "1.5.10", "is-buffer": "^2.0.2" },
      bundlesize: [{ path: "./dist/axios.min.js", threshold: "5kB" }]
    };
  },
  364: function(e) {
    "use strict";
    e.exports = (e, t) => {
      t = t || process.argv;
      const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--";
      const n = t.indexOf(r + e);
      const i = t.indexOf("--");
      return n !== -1 && (i === -1 ? true : n < i);
    };
  },
  368: function(e) {
    e.exports = function atob(e) {
      return Buffer.from(e, "base64").toString("binary");
    };
  },
  369: function(e) {
    "use strict";
    e.exports = function enhanceError(e, t, r, n, i) {
      e.config = t;
      if (r) {
        e.code = r;
      }
      e.request = n;
      e.response = i;
      e.isAxiosError = true;
      e.toJSON = function() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return e;
    };
  },
  370: function(e) {
    e.exports = deprecate;
    const t = {};
    function deprecate(e) {
      if (t[e]) {
        return;
      }
      console.warn(`DEPRECATED (@octokit/rest): ${e}`);
      t[e] = 1;
    }
  },
  372: function(e) {
    e.exports = octokitDebug;
    function octokitDebug(e) {
      e.hook.wrap("request", (t, r) => {
        e.log.debug("request", r);
        const n = Date.now();
        const i = e.request.endpoint.parse(r);
        const s = i.url.replace(r.baseUrl, "");
        return t(r)
          .then(t => {
            e.log.info(`${i.method} ${s} - ${t.status} in ${Date.now() - n}ms`);
            return t;
          })
          .catch(t => {
            e.log.info(`${i.method} ${s} - ${t.status} in ${Date.now() - n}ms`);
            throw t;
          });
      });
    }
  },
  385: function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });
    var n = r(356);
    var i = r(796);
    function lowercaseKeys(e) {
      if (!e) {
        return {};
      }
      return Object.keys(e).reduce((t, r) => {
        t[r.toLowerCase()] = e[r];
        return t;
      }, {});
    }
    function mergeDeep(e, t) {
      const r = Object.assign({}, e);
      Object.keys(t).forEach(i => {
        if (n.isPlainObject(t[i])) {
          if (!(i in e)) Object.assign(r, { [i]: t[i] });
          else r[i] = mergeDeep(e[i], t[i]);
        } else {
          Object.assign(r, { [i]: t[i] });
        }
      });
      return r;
    }
    function removeUndefinedProperties(e) {
      for (const t in e) {
        if (e[t] === undefined) {
          delete e[t];
        }
      }
      return e;
    }
    function merge(e, t, r) {
      if (typeof t === "string") {
        let [e, n] = t.split(" ");
        r = Object.assign(n ? { method: e, url: n } : { url: e }, r);
      } else {
        r = Object.assign({}, t);
      }
      r.headers = lowercaseKeys(r.headers);
      removeUndefinedProperties(r);
      removeUndefinedProperties(r.headers);
      const n = mergeDeep(e || {}, r);
      if (e && e.mediaType.previews.length) {
        n.mediaType.previews = e.mediaType.previews
          .filter(e => !n.mediaType.previews.includes(e))
          .concat(n.mediaType.previews);
      }
      n.mediaType.previews = n.mediaType.previews.map(e =>
        e.replace(/-preview/, "")
      );
      return n;
    }
    function addQueryParameters(e, t) {
      const r = /\?/.test(e) ? "&" : "?";
      const n = Object.keys(t);
      if (n.length === 0) {
        return e;
      }
      return (
        e +
        r +
        n
          .map(e => {
            if (e === "q") {
              return (
                "q=" +
                t.q
                  .split("+")
                  .map(encodeURIComponent)
                  .join("+")
              );
            }
            return `${e}=${encodeURIComponent(t[e])}`;
          })
          .join("&")
      );
    }
    const s = /\{[^}]+\}/g;
    function removeNonChars(e) {
      return e.replace(/^\W+|\W+$/g, "").split(/,/);
    }
    function extractUrlVariableNames(e) {
      const t = e.match(s);
      if (!t) {
        return [];
      }
      return t.map(removeNonChars).reduce((e, t) => e.concat(t), []);
    }
    function omit(e, t) {
      return Object.keys(e)
        .filter(e => !t.includes(e))
        .reduce((t, r) => {
          t[r] = e[r];
          return t;
        }, {});
    }
    function encodeReserved(e) {
      return e
        .split(/(%[0-9A-Fa-f]{2})/g)
        .map(function(e) {
          if (!/%[0-9A-Fa-f]/.test(e)) {
            e = encodeURI(e)
              .replace(/%5B/g, "[")
              .replace(/%5D/g, "]");
          }
          return e;
        })
        .join("");
    }
    function encodeUnreserved(e) {
      return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
        return (
          "%" +
          e
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()
        );
      });
    }
    function encodeValue(e, t, r) {
      t = e === "+" || e === "#" ? encodeReserved(t) : encodeUnreserved(t);
      if (r) {
        return encodeUnreserved(r) + "=" + t;
      } else {
        return t;
      }
    }
    function isDefined(e) {
      return e !== undefined && e !== null;
    }
    function isKeyOperator(e) {
      return e === ";" || e === "&" || e === "?";
    }
    function getValues(e, t, r, n) {
      var i = e[r],
        s = [];
      if (isDefined(i) && i !== "") {
        if (
          typeof i === "string" ||
          typeof i === "number" ||
          typeof i === "boolean"
        ) {
          i = i.toString();
          if (n && n !== "*") {
            i = i.substring(0, parseInt(n, 10));
          }
          s.push(encodeValue(t, i, isKeyOperator(t) ? r : ""));
        } else {
          if (n === "*") {
            if (Array.isArray(i)) {
              i.filter(isDefined).forEach(function(e) {
                s.push(encodeValue(t, e, isKeyOperator(t) ? r : ""));
              });
            } else {
              Object.keys(i).forEach(function(e) {
                if (isDefined(i[e])) {
                  s.push(encodeValue(t, i[e], e));
                }
              });
            }
          } else {
            const e = [];
            if (Array.isArray(i)) {
              i.filter(isDefined).forEach(function(r) {
                e.push(encodeValue(t, r));
              });
            } else {
              Object.keys(i).forEach(function(r) {
                if (isDefined(i[r])) {
                  e.push(encodeUnreserved(r));
                  e.push(encodeValue(t, i[r].toString()));
                }
              });
            }
            if (isKeyOperator(t)) {
              s.push(encodeUnreserved(r) + "=" + e.join(","));
            } else if (e.length !== 0) {
              s.push(e.join(","));
            }
          }
        }
      } else {
        if (t === ";") {
          if (isDefined(i)) {
            s.push(encodeUnreserved(r));
          }
        } else if (i === "" && (t === "&" || t === "?")) {
          s.push(encodeUnreserved(r) + "=");
        } else if (i === "") {
          s.push("");
        }
      }
      return s;
    }
    function parseUrl(e) {
      return { expand: expand.bind(null, e) };
    }
    function expand(e, t) {
      var r = ["+", "#", ".", "/", ";", "?", "&"];
      return e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(e, n, i) {
        if (n) {
          let e = "";
          const i = [];
          if (r.indexOf(n.charAt(0)) !== -1) {
            e = n.charAt(0);
            n = n.substr(1);
          }
          n.split(/,/g).forEach(function(r) {
            var n = /([^:\*]*)(?::(\d+)|(\*))?/.exec(r);
            i.push(getValues(t, e, n[1], n[2] || n[3]));
          });
          if (e && e !== "+") {
            var s = ",";
            if (e === "?") {
              s = "&";
            } else if (e !== "#") {
              s = e;
            }
            return (i.length !== 0 ? e : "") + i.join(s);
          } else {
            return i.join(",");
          }
        } else {
          return encodeReserved(i);
        }
      });
    }
    function parse(e) {
      let t = e.method.toUpperCase();
      let r = (e.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
      let n = Object.assign({}, e.headers);
      let i;
      let s = omit(e, [
        "method",
        "baseUrl",
        "url",
        "headers",
        "request",
        "mediaType"
      ]);
      const o = extractUrlVariableNames(r);
      r = parseUrl(r).expand(s);
      if (!/^http/.test(r)) {
        r = e.baseUrl + r;
      }
      const a = Object.keys(e)
        .filter(e => o.includes(e))
        .concat("baseUrl");
      const u = omit(s, a);
      const p = /application\/octet-stream/i.test(n.accept);
      if (!p) {
        if (e.mediaType.format) {
          n.accept = n.accept
            .split(/,/)
            .map(t =>
              t.replace(
                /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
                `application/vnd$1$2.${e.mediaType.format}`
              )
            )
            .join(",");
        }
        if (e.mediaType.previews.length) {
          const t = n.accept.match(/[\w-]+(?=-preview)/g) || [];
          n.accept = t
            .concat(e.mediaType.previews)
            .map(t => {
              const r = e.mediaType.format ? `.${e.mediaType.format}` : "+json";
              return `application/vnd.github.${t}-preview${r}`;
            })
            .join(",");
        }
      }
      if (["GET", "HEAD"].includes(t)) {
        r = addQueryParameters(r, u);
      } else {
        if ("data" in u) {
          i = u.data;
        } else {
          if (Object.keys(u).length) {
            i = u;
          } else {
            n["content-length"] = 0;
          }
        }
      }
      if (!n["content-type"] && typeof i !== "undefined") {
        n["content-type"] = "application/json; charset=utf-8";
      }
      if (["PATCH", "PUT"].includes(t) && typeof i === "undefined") {
        i = "";
      }
      return Object.assign(
        { method: t, url: r, headers: n },
        typeof i !== "undefined" ? { body: i } : null,
        e.request ? { request: e.request } : null
      );
    }
    function endpointWithDefaults(e, t, r) {
      return parse(merge(e, t, r));
    }
    function withDefaults(e, t) {
      const r = merge(e, t);
      const n = endpointWithDefaults.bind(null, r);
      return Object.assign(n, {
        DEFAULTS: r,
        defaults: withDefaults.bind(null, r),
        merge: merge.bind(null, r),
        parse: parse
      });
    }
    const o = "6.0.11";
    const a = `octokit-endpoint.js/${o} ${i.getUserAgent()}`;
    const u = {
      method: "GET",
      baseUrl: "https://api.github.com",
      headers: { accept: "application/vnd.github.v3+json", "user-agent": a },
      mediaType: { format: "", previews: [] }
    };
    const p = withDefaults(null, u);
    t.endpoint = p;
  },
  402: function(e, t, r) {
    e.exports = Octokit;
    const { request: n } = r(753);
    const i = r(523);
    const s = r(294);
    function Octokit(e, t) {
      t = t || {};
      const r = new i.Collection();
      const o = Object.assign(
        {
          debug: () => {},
          info: () => {},
          warn: console.warn,
          error: console.error
        },
        t && t.log
      );
      const a = { hook: r, log: o, request: n.defaults(s(t, o, r)) };
      e.forEach(e => e(a, t));
      return a;
    }
  },
  411: function(e, t, r) {
    "use strict";
    var n = r(35);
    e.exports = function normalizeHeaderName(e, t) {
      n.forEach(e, function processHeader(r, n) {
        if (n !== t && n.toUpperCase() === t.toUpperCase()) {
          e[t] = r;
          delete e[n];
        }
      });
    };
  },
  413: function(e) {
    e.exports = require("stream");
  },
  430: function(e, t, r) {
    e.exports = octokitValidate;
    const n = r(348);
    function octokitValidate(e) {
      e.hook.before("request", n.bind(null, e));
    }
  },
  454: function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });
    function _interopDefault(e) {
      return e && typeof e === "object" && "default" in e ? e["default"] : e;
    }
    var n = _interopDefault(r(413));
    var i = _interopDefault(r(605));
    var s = _interopDefault(r(835));
    var o = _interopDefault(r(211));
    var a = _interopDefault(r(903));
    const u = n.Readable;
    const p = Symbol("buffer");
    const c = Symbol("type");
    class Blob {
      constructor() {
        this[c] = "";
        const e = arguments[0];
        const t = arguments[1];
        const r = [];
        let n = 0;
        if (e) {
          const t = e;
          const i = Number(t.length);
          for (let e = 0; e < i; e++) {
            const i = t[e];
            let s;
            if (i instanceof Buffer) {
              s = i;
            } else if (ArrayBuffer.isView(i)) {
              s = Buffer.from(i.buffer, i.byteOffset, i.byteLength);
            } else if (i instanceof ArrayBuffer) {
              s = Buffer.from(i);
            } else if (i instanceof Blob) {
              s = i[p];
            } else {
              s = Buffer.from(typeof i === "string" ? i : String(i));
            }
            n += s.length;
            r.push(s);
          }
        }
        this[p] = Buffer.concat(r);
        let i = t && t.type !== undefined && String(t.type).toLowerCase();
        if (i && !/[^\u0020-\u007E]/.test(i)) {
          this[c] = i;
        }
      }
      get size() {
        return this[p].length;
      }
      get type() {
        return this[c];
      }
      text() {
        return Promise.resolve(this[p].toString());
      }
      arrayBuffer() {
        const e = this[p];
        const t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
        return Promise.resolve(t);
      }
      stream() {
        const e = new u();
        e._read = function() {};
        e.push(this[p]);
        e.push(null);
        return e;
      }
      toString() {
        return "[object Blob]";
      }
      slice() {
        const e = this.size;
        const t = arguments[0];
        const r = arguments[1];
        let n, i;
        if (t === undefined) {
          n = 0;
        } else if (t < 0) {
          n = Math.max(e + t, 0);
        } else {
          n = Math.min(t, e);
        }
        if (r === undefined) {
          i = e;
        } else if (r < 0) {
          i = Math.max(e + r, 0);
        } else {
          i = Math.min(r, e);
        }
        const s = Math.max(i - n, 0);
        const o = this[p];
        const a = o.slice(n, n + s);
        const u = new Blob([], { type: arguments[2] });
        u[p] = a;
        return u;
      }
    }
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
      value: "Blob",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function FetchError(e, t, r) {
      Error.call(this, e);
      this.message = e;
      this.type = t;
      if (r) {
        this.code = this.errno = r.code;
      }
      Error.captureStackTrace(this, this.constructor);
    }
    FetchError.prototype = Object.create(Error.prototype);
    FetchError.prototype.constructor = FetchError;
    FetchError.prototype.name = "FetchError";
    let d;
    try {
      d = r(18).convert;
    } catch (e) {}
    const g = Symbol("Body internals");
    const l = n.PassThrough;
    function Body(e) {
      var t = this;
      var r =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {},
        i = r.size;
      let s = i === undefined ? 0 : i;
      var o = r.timeout;
      let a = o === undefined ? 0 : o;
      if (e == null) {
        e = null;
      } else if (isURLSearchParams(e)) {
        e = Buffer.from(e.toString());
      } else if (isBlob(e));
      else if (Buffer.isBuffer(e));
      else if (Object.prototype.toString.call(e) === "[object ArrayBuffer]") {
        e = Buffer.from(e);
      } else if (ArrayBuffer.isView(e)) {
        e = Buffer.from(e.buffer, e.byteOffset, e.byteLength);
      } else if (e instanceof n);
      else {
        e = Buffer.from(String(e));
      }
      this[g] = { body: e, disturbed: false, error: null };
      this.size = s;
      this.timeout = a;
      if (e instanceof n) {
        e.on("error", function(e) {
          const r =
            e.name === "AbortError"
              ? e
              : new FetchError(
                  `Invalid response body while trying to fetch ${t.url}: ${e.message}`,
                  "system",
                  e
                );
          t[g].error = r;
        });
      }
    }
    Body.prototype = {
      get body() {
        return this[g].body;
      },
      get bodyUsed() {
        return this[g].disturbed;
      },
      arrayBuffer() {
        return consumeBody.call(this).then(function(e) {
          return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
        });
      },
      blob() {
        let e = (this.headers && this.headers.get("content-type")) || "";
        return consumeBody.call(this).then(function(t) {
          return Object.assign(new Blob([], { type: e.toLowerCase() }), {
            [p]: t
          });
        });
      },
      json() {
        var e = this;
        return consumeBody.call(this).then(function(t) {
          try {
            return JSON.parse(t.toString());
          } catch (t) {
            return Body.Promise.reject(
              new FetchError(
                `invalid json response body at ${e.url} reason: ${t.message}`,
                "invalid-json"
              )
            );
          }
        });
      },
      text() {
        return consumeBody.call(this).then(function(e) {
          return e.toString();
        });
      },
      buffer() {
        return consumeBody.call(this);
      },
      textConverted() {
        var e = this;
        return consumeBody.call(this).then(function(t) {
          return convertBody(t, e.headers);
        });
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    Body.mixIn = function(e) {
      for (const t of Object.getOwnPropertyNames(Body.prototype)) {
        if (!(t in e)) {
          const r = Object.getOwnPropertyDescriptor(Body.prototype, t);
          Object.defineProperty(e, t, r);
        }
      }
    };
    function consumeBody() {
      var e = this;
      if (this[g].disturbed) {
        return Body.Promise.reject(
          new TypeError(`body used already for: ${this.url}`)
        );
      }
      this[g].disturbed = true;
      if (this[g].error) {
        return Body.Promise.reject(this[g].error);
      }
      let t = this.body;
      if (t === null) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      if (isBlob(t)) {
        t = t.stream();
      }
      if (Buffer.isBuffer(t)) {
        return Body.Promise.resolve(t);
      }
      if (!(t instanceof n)) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      let r = [];
      let i = 0;
      let s = false;
      return new Body.Promise(function(n, o) {
        let a;
        if (e.timeout) {
          a = setTimeout(function() {
            s = true;
            o(
              new FetchError(
                `Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,
                "body-timeout"
              )
            );
          }, e.timeout);
        }
        t.on("error", function(t) {
          if (t.name === "AbortError") {
            s = true;
            o(t);
          } else {
            o(
              new FetchError(
                `Invalid response body while trying to fetch ${e.url}: ${t.message}`,
                "system",
                t
              )
            );
          }
        });
        t.on("data", function(t) {
          if (s || t === null) {
            return;
          }
          if (e.size && i + t.length > e.size) {
            s = true;
            o(
              new FetchError(
                `content size at ${e.url} over limit: ${e.size}`,
                "max-size"
              )
            );
            return;
          }
          i += t.length;
          r.push(t);
        });
        t.on("end", function() {
          if (s) {
            return;
          }
          clearTimeout(a);
          try {
            n(Buffer.concat(r, i));
          } catch (t) {
            o(
              new FetchError(
                `Could not create Buffer from response body for ${e.url}: ${t.message}`,
                "system",
                t
              )
            );
          }
        });
      });
    }
    function convertBody(e, t) {
      if (typeof d !== "function") {
        throw new Error(
          "The package `encoding` must be installed to use the textConverted() function"
        );
      }
      const r = t.get("content-type");
      let n = "utf-8";
      let i, s;
      if (r) {
        i = /charset=([^;]*)/i.exec(r);
      }
      s = e.slice(0, 1024).toString();
      if (!i && s) {
        i = /<meta.+?charset=(['"])(.+?)\1/i.exec(s);
      }
      if (!i && s) {
        i = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(
          s
        );
        if (!i) {
          i = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(
            s
          );
          if (i) {
            i.pop();
          }
        }
        if (i) {
          i = /charset=(.*)/i.exec(i.pop());
        }
      }
      if (!i && s) {
        i = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(s);
      }
      if (i) {
        n = i.pop();
        if (n === "gb2312" || n === "gbk") {
          n = "gb18030";
        }
      }
      return d(e, "UTF-8", n).toString();
    }
    function isURLSearchParams(e) {
      if (
        typeof e !== "object" ||
        typeof e.append !== "function" ||
        typeof e.delete !== "function" ||
        typeof e.get !== "function" ||
        typeof e.getAll !== "function" ||
        typeof e.has !== "function" ||
        typeof e.set !== "function"
      ) {
        return false;
      }
      return (
        e.constructor.name === "URLSearchParams" ||
        Object.prototype.toString.call(e) === "[object URLSearchParams]" ||
        typeof e.sort === "function"
      );
    }
    function isBlob(e) {
      return (
        typeof e === "object" &&
        typeof e.arrayBuffer === "function" &&
        typeof e.type === "string" &&
        typeof e.stream === "function" &&
        typeof e.constructor === "function" &&
        typeof e.constructor.name === "string" &&
        /^(Blob|File)$/.test(e.constructor.name) &&
        /^(Blob|File)$/.test(e[Symbol.toStringTag])
      );
    }
    function clone(e) {
      let t, r;
      let i = e.body;
      if (e.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (i instanceof n && typeof i.getBoundary !== "function") {
        t = new l();
        r = new l();
        i.pipe(t);
        i.pipe(r);
        e[g].body = t;
        i = r;
      }
      return i;
    }
    function extractContentType(e) {
      if (e === null) {
        return null;
      } else if (typeof e === "string") {
        return "text/plain;charset=UTF-8";
      } else if (isURLSearchParams(e)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isBlob(e)) {
        return e.type || null;
      } else if (Buffer.isBuffer(e)) {
        return null;
      } else if (Object.prototype.toString.call(e) === "[object ArrayBuffer]") {
        return null;
      } else if (ArrayBuffer.isView(e)) {
        return null;
      } else if (typeof e.getBoundary === "function") {
        return `multipart/form-data;boundary=${e.getBoundary()}`;
      } else if (e instanceof n) {
        return null;
      } else {
        return "text/plain;charset=UTF-8";
      }
    }
    function getTotalBytes(e) {
      const t = e.body;
      if (t === null) {
        return 0;
      } else if (isBlob(t)) {
        return t.size;
      } else if (Buffer.isBuffer(t)) {
        return t.length;
      } else if (t && typeof t.getLengthSync === "function") {
        if (
          (t._lengthRetrievers && t._lengthRetrievers.length == 0) ||
          (t.hasKnownLength && t.hasKnownLength())
        ) {
          return t.getLengthSync();
        }
        return null;
      } else {
        return null;
      }
    }
    function writeToStream(e, t) {
      const r = t.body;
      if (r === null) {
        e.end();
      } else if (isBlob(r)) {
        r.stream().pipe(e);
      } else if (Buffer.isBuffer(r)) {
        e.write(r);
        e.end();
      } else {
        r.pipe(e);
      }
    }
    Body.Promise = global.Promise;
    const m = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
    const h = /[^\t\x20-\x7e\x80-\xff]/;
    function validateName(e) {
      e = `${e}`;
      if (m.test(e) || e === "") {
        throw new TypeError(`${e} is not a legal HTTP header name`);
      }
    }
    function validateValue(e) {
      e = `${e}`;
      if (h.test(e)) {
        throw new TypeError(`${e} is not a legal HTTP header value`);
      }
    }
    function find(e, t) {
      t = t.toLowerCase();
      for (const r in e) {
        if (r.toLowerCase() === t) {
          return r;
        }
      }
      return undefined;
    }
    const y = Symbol("map");
    class Headers {
      constructor() {
        let e =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : undefined;
        this[y] = Object.create(null);
        if (e instanceof Headers) {
          const t = e.raw();
          const r = Object.keys(t);
          for (const e of r) {
            for (const r of t[e]) {
              this.append(e, r);
            }
          }
          return;
        }
        if (e == null);
        else if (typeof e === "object") {
          const t = e[Symbol.iterator];
          if (t != null) {
            if (typeof t !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            const r = [];
            for (const t of e) {
              if (
                typeof t !== "object" ||
                typeof t[Symbol.iterator] !== "function"
              ) {
                throw new TypeError("Each header pair must be iterable");
              }
              r.push(Array.from(t));
            }
            for (const e of r) {
              if (e.length !== 2) {
                throw new TypeError(
                  "Each header pair must be a name/value tuple"
                );
              }
              this.append(e[0], e[1]);
            }
          } else {
            for (const t of Object.keys(e)) {
              const r = e[t];
              this.append(t, r);
            }
          }
        } else {
          throw new TypeError("Provided initializer must be an object");
        }
      }
      get(e) {
        e = `${e}`;
        validateName(e);
        const t = find(this[y], e);
        if (t === undefined) {
          return null;
        }
        return this[y][t].join(", ");
      }
      forEach(e) {
        let t =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : undefined;
        let r = getHeaders(this);
        let n = 0;
        while (n < r.length) {
          var i = r[n];
          const s = i[0],
            o = i[1];
          e.call(t, o, s, this);
          r = getHeaders(this);
          n++;
        }
      }
      set(e, t) {
        e = `${e}`;
        t = `${t}`;
        validateName(e);
        validateValue(t);
        const r = find(this[y], e);
        this[y][r !== undefined ? r : e] = [t];
      }
      append(e, t) {
        e = `${e}`;
        t = `${t}`;
        validateName(e);
        validateValue(t);
        const r = find(this[y], e);
        if (r !== undefined) {
          this[y][r].push(t);
        } else {
          this[y][e] = [t];
        }
      }
      has(e) {
        e = `${e}`;
        validateName(e);
        return find(this[y], e) !== undefined;
      }
      delete(e) {
        e = `${e}`;
        validateName(e);
        const t = find(this[y], e);
        if (t !== undefined) {
          delete this[y][t];
        }
      }
      raw() {
        return this[y];
      }
      keys() {
        return createHeadersIterator(this, "key");
      }
      values() {
        return createHeadersIterator(this, "value");
      }
      [Symbol.iterator]() {
        return createHeadersIterator(this, "key+value");
      }
    }
    Headers.prototype.entries = Headers.prototype[Symbol.iterator];
    Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
      value: "Headers",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Headers.prototype, {
      get: { enumerable: true },
      forEach: { enumerable: true },
      set: { enumerable: true },
      append: { enumerable: true },
      has: { enumerable: true },
      delete: { enumerable: true },
      keys: { enumerable: true },
      values: { enumerable: true },
      entries: { enumerable: true }
    });
    function getHeaders(e) {
      let t =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : "key+value";
      const r = Object.keys(e[y]).sort();
      return r.map(
        t === "key"
          ? function(e) {
              return e.toLowerCase();
            }
          : t === "value"
          ? function(t) {
              return e[y][t].join(", ");
            }
          : function(t) {
              return [t.toLowerCase(), e[y][t].join(", ")];
            }
      );
    }
    const f = Symbol("internal");
    function createHeadersIterator(e, t) {
      const r = Object.create(b);
      r[f] = { target: e, kind: t, index: 0 };
      return r;
    }
    const b = Object.setPrototypeOf(
      {
        next() {
          if (!this || Object.getPrototypeOf(this) !== b) {
            throw new TypeError("Value of `this` is not a HeadersIterator");
          }
          var e = this[f];
          const t = e.target,
            r = e.kind,
            n = e.index;
          const i = getHeaders(t, r);
          const s = i.length;
          if (n >= s) {
            return { value: undefined, done: true };
          }
          this[f].index = n + 1;
          return { value: i[n], done: false };
        }
      },
      Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()))
    );
    Object.defineProperty(b, Symbol.toStringTag, {
      value: "HeadersIterator",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function exportNodeCompatibleHeaders(e) {
      const t = Object.assign({ __proto__: null }, e[y]);
      const r = find(e[y], "Host");
      if (r !== undefined) {
        t[r] = t[r][0];
      }
      return t;
    }
    function createHeadersLenient(e) {
      const t = new Headers();
      for (const r of Object.keys(e)) {
        if (m.test(r)) {
          continue;
        }
        if (Array.isArray(e[r])) {
          for (const n of e[r]) {
            if (h.test(n)) {
              continue;
            }
            if (t[y][r] === undefined) {
              t[y][r] = [n];
            } else {
              t[y][r].push(n);
            }
          }
        } else if (!h.test(e[r])) {
          t[y][r] = [e[r]];
        }
      }
      return t;
    }
    const _ = Symbol("Response internals");
    const q = i.STATUS_CODES;
    class Response {
      constructor() {
        let e =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : null;
        let t =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        Body.call(this, e, t);
        const r = t.status || 200;
        const n = new Headers(t.headers);
        if (e != null && !n.has("Content-Type")) {
          const t = extractContentType(e);
          if (t) {
            n.append("Content-Type", t);
          }
        }
        this[_] = {
          url: t.url,
          status: r,
          statusText: t.statusText || q[r],
          headers: n,
          counter: t.counter
        };
      }
      get url() {
        return this[_].url || "";
      }
      get status() {
        return this[_].status;
      }
      get ok() {
        return this[_].status >= 200 && this[_].status < 300;
      }
      get redirected() {
        return this[_].counter > 0;
      }
      get statusText() {
        return this[_].statusText;
      }
      get headers() {
        return this[_].headers;
      }
      clone() {
        return new Response(clone(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected
        });
      }
    }
    Body.mixIn(Response.prototype);
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    Object.defineProperty(Response.prototype, Symbol.toStringTag, {
      value: "Response",
      writable: false,
      enumerable: false,
      configurable: true
    });
    const w = Symbol("Request internals");
    const v = s.parse;
    const T = s.format;
    const E = "destroy" in n.Readable.prototype;
    function isRequest(e) {
      return typeof e === "object" && typeof e[w] === "object";
    }
    function isAbortSignal(e) {
      const t = e && typeof e === "object" && Object.getPrototypeOf(e);
      return !!(t && t.constructor.name === "AbortSignal");
    }
    class Request {
      constructor(e) {
        let t =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        let r;
        if (!isRequest(e)) {
          if (e && e.href) {
            r = v(e.href);
          } else {
            r = v(`${e}`);
          }
          e = {};
        } else {
          r = v(e.url);
        }
        let n = t.method || e.method || "GET";
        n = n.toUpperCase();
        if (
          (t.body != null || (isRequest(e) && e.body !== null)) &&
          (n === "GET" || n === "HEAD")
        ) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        let i =
          t.body != null
            ? t.body
            : isRequest(e) && e.body !== null
            ? clone(e)
            : null;
        Body.call(this, i, {
          timeout: t.timeout || e.timeout || 0,
          size: t.size || e.size || 0
        });
        const s = new Headers(t.headers || e.headers || {});
        if (i != null && !s.has("Content-Type")) {
          const e = extractContentType(i);
          if (e) {
            s.append("Content-Type", e);
          }
        }
        let o = isRequest(e) ? e.signal : null;
        if ("signal" in t) o = t.signal;
        if (o != null && !isAbortSignal(o)) {
          throw new TypeError(
            "Expected signal to be an instanceof AbortSignal"
          );
        }
        this[w] = {
          method: n,
          redirect: t.redirect || e.redirect || "follow",
          headers: s,
          parsedURL: r,
          signal: o
        };
        this.follow =
          t.follow !== undefined
            ? t.follow
            : e.follow !== undefined
            ? e.follow
            : 20;
        this.compress =
          t.compress !== undefined
            ? t.compress
            : e.compress !== undefined
            ? e.compress
            : true;
        this.counter = t.counter || e.counter || 0;
        this.agent = t.agent || e.agent;
      }
      get method() {
        return this[w].method;
      }
      get url() {
        return T(this[w].parsedURL);
      }
      get headers() {
        return this[w].headers;
      }
      get redirect() {
        return this[w].redirect;
      }
      get signal() {
        return this[w].signal;
      }
      clone() {
        return new Request(this);
      }
    }
    Body.mixIn(Request.prototype);
    Object.defineProperty(Request.prototype, Symbol.toStringTag, {
      value: "Request",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    function getNodeRequestOptions(e) {
      const t = e[w].parsedURL;
      const r = new Headers(e[w].headers);
      if (!r.has("Accept")) {
        r.set("Accept", "*/*");
      }
      if (!t.protocol || !t.hostname) {
        throw new TypeError("Only absolute URLs are supported");
      }
      if (!/^https?:$/.test(t.protocol)) {
        throw new TypeError("Only HTTP(S) protocols are supported");
      }
      if (e.signal && e.body instanceof n.Readable && !E) {
        throw new Error(
          "Cancellation of streamed requests with AbortSignal is not supported in node < 8"
        );
      }
      let i = null;
      if (e.body == null && /^(POST|PUT)$/i.test(e.method)) {
        i = "0";
      }
      if (e.body != null) {
        const t = getTotalBytes(e);
        if (typeof t === "number") {
          i = String(t);
        }
      }
      if (i) {
        r.set("Content-Length", i);
      }
      if (!r.has("User-Agent")) {
        r.set(
          "User-Agent",
          "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
        );
      }
      if (e.compress && !r.has("Accept-Encoding")) {
        r.set("Accept-Encoding", "gzip,deflate");
      }
      let s = e.agent;
      if (typeof s === "function") {
        s = s(t);
      }
      if (!r.has("Connection") && !s) {
        r.set("Connection", "close");
      }
      return Object.assign({}, t, {
        method: e.method,
        headers: exportNodeCompatibleHeaders(r),
        agent: s
      });
    }
    function AbortError(e) {
      Error.call(this, e);
      this.type = "aborted";
      this.message = e;
      Error.captureStackTrace(this, this.constructor);
    }
    AbortError.prototype = Object.create(Error.prototype);
    AbortError.prototype.constructor = AbortError;
    AbortError.prototype.name = "AbortError";
    const C = n.PassThrough;
    const j = s.resolve;
    function fetch(e, t) {
      if (!fetch.Promise) {
        throw new Error(
          "native promise missing, set fetch.Promise to your favorite alternative"
        );
      }
      Body.Promise = fetch.Promise;
      return new fetch.Promise(function(r, s) {
        const u = new Request(e, t);
        const p = getNodeRequestOptions(u);
        const c = (p.protocol === "https:" ? o : i).request;
        const d = u.signal;
        let g = null;
        const l = function abort() {
          let e = new AbortError("The user aborted a request.");
          s(e);
          if (u.body && u.body instanceof n.Readable) {
            u.body.destroy(e);
          }
          if (!g || !g.body) return;
          g.body.emit("error", e);
        };
        if (d && d.aborted) {
          l();
          return;
        }
        const m = function abortAndFinalize() {
          l();
          finalize();
        };
        const h = c(p);
        let y;
        if (d) {
          d.addEventListener("abort", m);
        }
        function finalize() {
          h.abort();
          if (d) d.removeEventListener("abort", m);
          clearTimeout(y);
        }
        if (u.timeout) {
          h.once("socket", function(e) {
            y = setTimeout(function() {
              s(
                new FetchError(
                  `network timeout at: ${u.url}`,
                  "request-timeout"
                )
              );
              finalize();
            }, u.timeout);
          });
        }
        h.on("error", function(e) {
          s(
            new FetchError(
              `request to ${u.url} failed, reason: ${e.message}`,
              "system",
              e
            )
          );
          finalize();
        });
        h.on("response", function(e) {
          clearTimeout(y);
          const t = createHeadersLenient(e.headers);
          if (fetch.isRedirect(e.statusCode)) {
            const n = t.get("Location");
            const i = n === null ? null : j(u.url, n);
            switch (u.redirect) {
              case "error":
                s(
                  new FetchError(
                    `uri requested responds with a redirect, redirect mode is set to error: ${u.url}`,
                    "no-redirect"
                  )
                );
                finalize();
                return;
              case "manual":
                if (i !== null) {
                  try {
                    t.set("Location", i);
                  } catch (e) {
                    s(e);
                  }
                }
                break;
              case "follow":
                if (i === null) {
                  break;
                }
                if (u.counter >= u.follow) {
                  s(
                    new FetchError(
                      `maximum redirect reached at: ${u.url}`,
                      "max-redirect"
                    )
                  );
                  finalize();
                  return;
                }
                const n = {
                  headers: new Headers(u.headers),
                  follow: u.follow,
                  counter: u.counter + 1,
                  agent: u.agent,
                  compress: u.compress,
                  method: u.method,
                  body: u.body,
                  signal: u.signal,
                  timeout: u.timeout,
                  size: u.size
                };
                if (
                  e.statusCode !== 303 &&
                  u.body &&
                  getTotalBytes(u) === null
                ) {
                  s(
                    new FetchError(
                      "Cannot follow redirect with body being a readable stream",
                      "unsupported-redirect"
                    )
                  );
                  finalize();
                  return;
                }
                if (
                  e.statusCode === 303 ||
                  ((e.statusCode === 301 || e.statusCode === 302) &&
                    u.method === "POST")
                ) {
                  n.method = "GET";
                  n.body = undefined;
                  n.headers.delete("content-length");
                }
                r(fetch(new Request(i, n)));
                finalize();
                return;
            }
          }
          e.once("end", function() {
            if (d) d.removeEventListener("abort", m);
          });
          let n = e.pipe(new C());
          const i = {
            url: u.url,
            status: e.statusCode,
            statusText: e.statusMessage,
            headers: t,
            size: u.size,
            timeout: u.timeout,
            counter: u.counter
          };
          const o = t.get("Content-Encoding");
          if (
            !u.compress ||
            u.method === "HEAD" ||
            o === null ||
            e.statusCode === 204 ||
            e.statusCode === 304
          ) {
            g = new Response(n, i);
            r(g);
            return;
          }
          const p = { flush: a.Z_SYNC_FLUSH, finishFlush: a.Z_SYNC_FLUSH };
          if (o == "gzip" || o == "x-gzip") {
            n = n.pipe(a.createGunzip(p));
            g = new Response(n, i);
            r(g);
            return;
          }
          if (o == "deflate" || o == "x-deflate") {
            const t = e.pipe(new C());
            t.once("data", function(e) {
              if ((e[0] & 15) === 8) {
                n = n.pipe(a.createInflate());
              } else {
                n = n.pipe(a.createInflateRaw());
              }
              g = new Response(n, i);
              r(g);
            });
            return;
          }
          if (o == "br" && typeof a.createBrotliDecompress === "function") {
            n = n.pipe(a.createBrotliDecompress());
            g = new Response(n, i);
            r(g);
            return;
          }
          g = new Response(n, i);
          r(g);
        });
        writeToStream(h, u);
      });
    }
    fetch.isRedirect = function(e) {
      return e === 301 || e === 302 || e === 303 || e === 307 || e === 308;
    };
    fetch.Promise = global.Promise;
    e.exports = t = fetch;
    Object.defineProperty(t, "__esModule", { value: true });
    t.default = t;
    t.Headers = Headers;
    t.Request = Request;
    t.Response = Response;
    t.FetchError = FetchError;
  },
  463: function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });
    function _interopDefault(e) {
      return e && typeof e === "object" && "default" in e ? e["default"] : e;
    }
    var n = r(692);
    var i = _interopDefault(r(49));
    const s = i(e => console.warn(e));
    class RequestError extends Error {
      constructor(e, t, r) {
        super(e);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "HttpError";
        this.status = t;
        Object.defineProperty(this, "code", {
          get() {
            s(
              new n.Deprecation(
                "[@octokit/request-error] `error.code` is deprecated, use `error.status`."
              )
            );
            return t;
          }
        });
        this.headers = r.headers || {};
        const i = Object.assign({}, r.request);
        if (r.request.headers.authorization) {
          i.headers = Object.assign({}, r.request.headers, {
            authorization: r.request.headers.authorization.replace(
              / .*$/,
              " [REDACTED]"
            )
          });
        }
        i.url = i.url
          .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]")
          .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
        this.request = i;
      }
    }
    t.RequestError = RequestError;
  },
  471: function(e, t, r) {
    e.exports = authenticationBeforeRequest;
    const n = r(675);
    const i = r(126);
    function authenticationBeforeRequest(e, t) {
      if (!e.auth.type) {
        return;
      }
      if (e.auth.type === "basic") {
        const r = n(`${e.auth.username}:${e.auth.password}`);
        t.headers.authorization = `Basic ${r}`;
        return;
      }
      if (e.auth.type === "token") {
        t.headers.authorization = `token ${e.auth.token}`;
        return;
      }
      if (e.auth.type === "app") {
        t.headers.authorization = `Bearer ${e.auth.token}`;
        const r = t.headers.accept
          .split(",")
          .concat("application/vnd.github.machine-man-preview+json");
        t.headers.accept = i(r)
          .filter(Boolean)
          .join(",");
        return;
      }
      t.url += t.url.indexOf("?") === -1 ? "?" : "&";
      if (e.auth.token) {
        t.url += `access_token=${encodeURIComponent(e.auth.token)}`;
        return;
      }
      const r = encodeURIComponent(e.auth.key);
      const s = encodeURIComponent(e.auth.secret);
      t.url += `client_id=${r}&client_secret=${s}`;
    }
  },
  489: function(e) {
    e.exports = validateAuth;
    function validateAuth(e) {
      if (typeof e === "string") {
        return;
      }
      if (typeof e === "function") {
        return;
      }
      if (e.username && e.password) {
        return;
      }
      if (e.clientId && e.clientSecret) {
        return;
      }
      throw new Error(`Invalid "auth" option: ${JSON.stringify(e)}`);
    }
  },
  510: function(e) {
    e.exports = addHook;
    function addHook(e, t, r, n) {
      var i = n;
      if (!e.registry[r]) {
        e.registry[r] = [];
      }
      if (t === "before") {
        n = function(e, t) {
          return Promise.resolve()
            .then(i.bind(null, t))
            .then(e.bind(null, t));
        };
      }
      if (t === "after") {
        n = function(e, t) {
          var r;
          return Promise.resolve()
            .then(e.bind(null, t))
            .then(function(e) {
              r = e;
              return i(r, t);
            })
            .then(function() {
              return r;
            });
        };
      }
      if (t === "error") {
        n = function(e, t) {
          return Promise.resolve()
            .then(e.bind(null, t))
            .catch(function(e) {
              return i(e, t);
            });
        };
      }
      e.registry[r].push({ hook: n, orig: i });
    }
  },
  523: function(e, t, r) {
    var n = r(280);
    var i = r(510);
    var s = r(866);
    var o = Function.bind;
    var a = o.bind(o);
    function bindApi(e, t, r) {
      var n = a(s, null).apply(null, r ? [t, r] : [t]);
      e.api = { remove: n };
      e.remove = n;
      ["before", "error", "after", "wrap"].forEach(function(n) {
        var s = r ? [t, n, r] : [t, n];
        e[n] = e.api[n] = a(i, null).apply(null, s);
      });
    }
    function HookSingular() {
      var e = "h";
      var t = { registry: {} };
      var r = n.bind(null, t, e);
      bindApi(r, t, e);
      return r;
    }
    function HookCollection() {
      var e = { registry: {} };
      var t = n.bind(null, e);
      bindApi(t, e);
      return t;
    }
    var u = false;
    function Hook() {
      if (!u) {
        console.warn(
          '[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'
        );
        u = true;
      }
      return HookCollection();
    }
    Hook.Singular = HookSingular.bind();
    Hook.Collection = HookCollection.bind();
    e.exports = Hook;
    e.exports.Hook = Hook;
    e.exports.Singular = Hook.Singular;
    e.exports.Collection = Hook.Collection;
  },
  529: function(e, t, r) {
    "use strict";
    var n = r(35);
    var i = r(411);
    var s = { "Content-Type": "application/x-www-form-urlencoded" };
    function setContentTypeIfUnset(e, t) {
      if (!n.isUndefined(e) && n.isUndefined(e["Content-Type"])) {
        e["Content-Type"] = t;
      }
    }
    function getDefaultAdapter() {
      var e;
      if (
        typeof process !== "undefined" &&
        Object.prototype.toString.call(process) === "[object process]"
      ) {
        e = r(670);
      } else if (typeof XMLHttpRequest !== "undefined") {
        e = r(219);
      }
      return e;
    }
    var o = {
      adapter: getDefaultAdapter(),
      transformRequest: [
        function transformRequest(e, t) {
          i(t, "Accept");
          i(t, "Content-Type");
          if (
            n.isFormData(e) ||
            n.isArrayBuffer(e) ||
            n.isBuffer(e) ||
            n.isStream(e) ||
            n.isFile(e) ||
            n.isBlob(e)
          ) {
            return e;
          }
          if (n.isArrayBufferView(e)) {
            return e.buffer;
          }
          if (n.isURLSearchParams(e)) {
            setContentTypeIfUnset(
              t,
              "application/x-www-form-urlencoded;charset=utf-8"
            );
            return e.toString();
          }
          if (n.isObject(e)) {
            setContentTypeIfUnset(t, "application/json;charset=utf-8");
            return JSON.stringify(e);
          }
          return e;
        }
      ],
      transformResponse: [
        function transformResponse(e) {
          if (typeof e === "string") {
            try {
              e = JSON.parse(e);
            } catch (e) {}
          }
          return e;
        }
      ],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      validateStatus: function validateStatus(e) {
        return e >= 200 && e < 300;
      }
    };
    o.headers = { common: { Accept: "application/json, text/plain, */*" } };
    n.forEach(["delete", "get", "head"], function forEachMethodNoData(e) {
      o.headers[e] = {};
    });
    n.forEach(["post", "put", "patch"], function forEachMethodWithData(e) {
      o.headers[e] = n.merge(s);
    });
    e.exports = o;
  },
  536: function(e, t, r) {
    e.exports = hasFirstPage;
    const n = r(370);
    const i = r(577);
    function hasFirstPage(e) {
      n(
        `octokit.hasFirstPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`
      );
      return i(e).first;
    }
  },
  549: function(e, t, r) {
    var n = r(835);
    var i = r(605);
    var s = r(211);
    var o = r(357);
    var a = r(413).Writable;
    var u = r(784)("follow-redirects");
    var p = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };
    var c = Object.create(null);
    ["abort", "aborted", "error", "socket", "timeout"].forEach(function(e) {
      c[e] = function(t) {
        this._redirectable.emit(e, t);
      };
    });
    function RedirectableRequest(e, t) {
      a.call(this);
      e.headers = e.headers || {};
      this._options = e;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (e.host) {
        if (!e.hostname) {
          e.hostname = e.host;
        }
        delete e.host;
      }
      if (t) {
        this.on("response", t);
      }
      var r = this;
      this._onNativeResponse = function(e) {
        r._processResponse(e);
      };
      if (!e.pathname && e.path) {
        var n = e.path.indexOf("?");
        if (n < 0) {
          e.pathname = e.path;
        } else {
          e.pathname = e.path.substring(0, n);
          e.search = e.path.substring(n);
        }
      }
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(a.prototype);
    RedirectableRequest.prototype.write = function(e, t, r) {
      if (
        !(typeof e === "string" || (typeof e === "object" && "length" in e))
      ) {
        throw new Error("data should be a string, Buffer or Uint8Array");
      }
      if (typeof t === "function") {
        r = t;
        t = null;
      }
      if (e.length === 0) {
        if (r) {
          r();
        }
        return;
      }
      if (this._requestBodyLength + e.length <= this._options.maxBodyLength) {
        this._requestBodyLength += e.length;
        this._requestBodyBuffers.push({ data: e, encoding: t });
        this._currentRequest.write(e, t, r);
      } else {
        this.emit(
          "error",
          new Error("Request body larger than maxBodyLength limit")
        );
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(e, t, r) {
      if (typeof e === "function") {
        r = e;
        e = t = null;
      } else if (typeof t === "function") {
        r = t;
        t = null;
      }
      var n = this._currentRequest;
      this.write(e || "", t, function() {
        n.end(null, null, r);
      });
    };
    RedirectableRequest.prototype.setHeader = function(e, t) {
      this._options.headers[e] = t;
      this._currentRequest.setHeader(e, t);
    };
    RedirectableRequest.prototype.removeHeader = function(e) {
      delete this._options.headers[e];
      this._currentRequest.removeHeader(e);
    };
    [
      "abort",
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive",
      "setTimeout"
    ].forEach(function(e) {
      RedirectableRequest.prototype[e] = function(t, r) {
        return this._currentRequest[e](t, r);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(e) {
      Object.defineProperty(RedirectableRequest.prototype, e, {
        get: function() {
          return this._currentRequest[e];
        }
      });
    });
    RedirectableRequest.prototype._performRequest = function() {
      var e = this._options.protocol;
      var t = this._options.nativeProtocols[e];
      if (!t) {
        this.emit("error", new Error("Unsupported protocol " + e));
        return;
      }
      if (this._options.agents) {
        var r = e.substr(0, e.length - 1);
        this._options.agent = this._options.agents[r];
      }
      var i = (this._currentRequest = t.request(
        this._options,
        this._onNativeResponse
      ));
      this._currentUrl = n.format(this._options);
      i._redirectable = this;
      for (var s in c) {
        if (s) {
          i.on(s, c[s]);
        }
      }
      if (this._isRedirect) {
        var o = 0;
        var a = this._requestBodyBuffers;
        (function writeNext() {
          if (o < a.length) {
            var e = a[o++];
            i.write(e.data, e.encoding, writeNext);
          } else {
            i.end();
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(e) {
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: e.headers,
          statusCode: e.statusCode
        });
      }
      var t = e.headers.location;
      if (
        t &&
        this._options.followRedirects !== false &&
        e.statusCode >= 300 &&
        e.statusCode < 400
      ) {
        if (++this._redirectCount > this._options.maxRedirects) {
          this.emit("error", new Error("Max redirects exceeded."));
          return;
        }
        var r;
        var i = this._options.headers;
        if (e.statusCode !== 307 && !(this._options.method in p)) {
          this._options.method = "GET";
          this._requestBodyBuffers = [];
          for (r in i) {
            if (/^content-/i.test(r)) {
              delete i[r];
            }
          }
        }
        if (!this._isRedirect) {
          for (r in i) {
            if (/^host$/i.test(r)) {
              delete i[r];
            }
          }
        }
        var s = n.resolve(this._currentUrl, t);
        u("redirecting to", s);
        Object.assign(this._options, n.parse(s));
        this._isRedirect = true;
        this._performRequest();
        e.destroy();
      } else {
        e.responseUrl = this._currentUrl;
        e.redirects = this._redirects;
        this.emit("response", e);
        this._requestBodyBuffers = [];
      }
    };
    function wrap(e) {
      var t = { maxRedirects: 21, maxBodyLength: 10 * 1024 * 1024 };
      var r = {};
      Object.keys(e).forEach(function(i) {
        var s = i + ":";
        var a = (r[s] = e[i]);
        var p = (t[i] = Object.create(a));
        p.request = function(e, i) {
          if (typeof e === "string") {
            e = n.parse(e);
            e.maxRedirects = t.maxRedirects;
          } else {
            e = Object.assign(
              {
                protocol: s,
                maxRedirects: t.maxRedirects,
                maxBodyLength: t.maxBodyLength
              },
              e
            );
          }
          e.nativeProtocols = r;
          o.equal(e.protocol, s, "protocol mismatch");
          u("options", e);
          return new RedirectableRequest(e, i);
        };
        p.get = function(e, t) {
          var r = p.request(e, t);
          r.end();
          return r;
        };
      });
      return t;
    }
    e.exports = wrap({ http: i, https: s });
    e.exports.wrap = wrap;
  },
  550: function(e, t, r) {
    e.exports = getNextPage;
    const n = r(265);
    function getNextPage(e, t, r) {
      return n(e, t, "next", r);
    }
  },
  558: function(e, t, r) {
    e.exports = hasPreviousPage;
    const n = r(370);
    const i = r(577);
    function hasPreviousPage(e) {
      n(
        `octokit.hasPreviousPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`
      );
      return i(e).prev;
    }
  },
  563: function(e, t, r) {
    e.exports = getPreviousPage;
    const n = r(265);
    function getPreviousPage(e, t, r) {
      return n(e, t, "prev", r);
    }
  },
  564: function(e, t, r) {
    "use strict";
    var n = r(26);
    e.exports = function settle(e, t, r) {
      var i = r.config.validateStatus;
      if (!i || i(r.status)) {
        e(r);
      } else {
        t(
          n(
            "Request failed with status code " + r.status,
            r.config,
            null,
            r.request,
            r
          )
        );
      }
    };
  },
  577: function(e) {
    e.exports = getPageLinks;
    function getPageLinks(e) {
      e = e.link || e.headers.link || "";
      const t = {};
      e.replace(/<([^>]*)>;\s*rel="([\w]*)"/g, (e, r, n) => {
        t[n] = r;
      });
      return t;
    }
  },
  586: function(e, t, r) {
    e.exports = octokitRestApiEndpoints;
    const n = r(705);
    function octokitRestApiEndpoints(e) {
      n.gitdata = n.git;
      n.authorization = n.oauthAuthorizations;
      n.pullRequests = n.pulls;
      e.registerEndpoints(n);
    }
  },
  589: function(e, t, r) {
    "use strict";
    var n = r(35);
    e.exports = function transformData(e, t, r) {
      n.forEach(r, function transform(r) {
        e = r(e, t);
      });
      return e;
    };
  },
  590: function(e) {
    "use strict";
    e.exports = function isAbsoluteURL(e) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
    };
  },
  605: function(e) {
    e.exports = require("http");
  },
  622: function(e) {
    e.exports = require("path");
  },
  631: function(e, t, r) {
    "use strict";
    var n = r(35);
    var i = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    e.exports = function parseHeaders(e) {
      var t = {};
      var r;
      var s;
      var o;
      if (!e) {
        return t;
      }
      n.forEach(e.split("\n"), function parser(e) {
        o = e.indexOf(":");
        r = n.trim(e.substr(0, o)).toLowerCase();
        s = n.trim(e.substr(o + 1));
        if (r) {
          if (t[r] && i.indexOf(r) >= 0) {
            return;
          }
          if (r === "set-cookie") {
            t[r] = (t[r] ? t[r] : []).concat([s]);
          } else {
            t[r] = t[r] ? t[r] + ", " + s : s;
          }
        }
      });
      return t;
    };
  },
  649: function(e, t, r) {
    e.exports = getLastPage;
    const n = r(265);
    function getLastPage(e, t, r) {
      return n(e, t, "last", r);
    }
  },
  650: function(t, r, n) {
    "use strict";
    function _interopDefault(e) {
      return e && "object" == typeof e && "default" in e ? e.default : e;
    }
    Object.defineProperty(r, "__esModule", { value: !0 });
    var i = _interopDefault(n(53));
    function _classCallCheck(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, t) {
      for (var r, n = 0; n < t.length; n++)
        ((r = t[n]).enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
    }
    function _createClass(e, t, r) {
      return (
        t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
      );
    }
    function _defineProperty(e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = r),
        e
      );
    }
    function _extends() {
      return (_extends =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }).apply(this, arguments);
    }
    function _objectWithoutPropertiesLoose(e, t) {
      if (null == e) return {};
      var r,
        n,
        i = {},
        s = Object.keys(e);
      for (n = 0; n < s.length; n++)
        (r = s[n]), 0 <= t.indexOf(r) || (i[r] = e[r]);
      return i;
    }
    function _objectWithoutProperties(e, t) {
      if (null == e) return {};
      var r,
        n,
        i = _objectWithoutPropertiesLoose(e, t);
      if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(e);
        for (n = 0; n < s.length; n++)
          (r = s[n]),
            !(0 <= t.indexOf(r)) &&
              Object.prototype.propertyIsEnumerable.call(e, r) &&
              (i[r] = e[r]);
      }
      return i;
    }
    var s,
      o = Object.freeze({
        LAST_7_DAYS: "LAST_7_DAYS",
        LAST_30_DAYS: "LAST_30_DAYS",
        LAST_6_MONTHS: "LAST_6_MONTHS",
        LAST_YEAR: "LAST_YEAR"
      }),
      a = function(e) {
        var t = e.dateRange,
          r = e.projectName,
          n = void 0 === r ? null : r,
          i = e.branchNames,
          s = void 0 === i ? [] : i;
        return {
          start: t.startDate,
          end: t.endDate,
          project: n,
          branches: s.join(",")
        };
      },
      u = function() {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.timeout,
          r = void 0 === t ? null : t,
          n = e.useWritesOnly,
          i = void 0 === n ? null : n,
          s = e.projectName;
        return { timeout: r, writes_only: i, project: void 0 === s ? null : s };
      },
      p = function(e) {
        var t = e.date,
          r = e.projectName,
          n = void 0 === r ? null : r,
          i = e.branchNames;
        return {
          date: t,
          project: n,
          branches: (void 0 === i ? [] : i).join(",")
        };
      },
      c = function() {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.authorUsername,
          r = void 0 === t ? null : t,
          n = e.pageNumber;
        return { author: r, page: void 0 === n ? null : n };
      },
      d = Object.freeze(
        (_defineProperty((s = {}), o.LAST_7_DAYS, "last_7_days"),
        _defineProperty(s, o.LAST_30_DAYS, "last_30_days"),
        _defineProperty(s, o.LAST_6_MONTHS, "last_6_months"),
        _defineProperty(s, o.LAST_YEAR, "last_year"),
        s)
      ),
      g = (function() {
        function e(t) {
          _classCallCheck(this, e),
            (this.apiKey = t),
            (this.axiosConfiguration = i.create({
              baseURL: "https://wakatime.com/api/v1/",
              headers: {
                Authorization: "Basic ".concat(
                  Buffer.from(this.apiKey).toString("base64")
                )
              }
            }));
        }
        return (
          _createClass(e, [
            {
              key: "getUser",
              value: function(e) {
                return this.axiosConfiguration
                  .get("users/".concat(e))
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMe",
              value: function() {
                return this.axiosConfiguration
                  .get("users/current")
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getTeams",
              value: function(e) {
                return this.axiosConfiguration
                  .get("users/".concat(e, "/teams"))
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyTeams",
              value: function() {
                return this.axiosConfiguration
                  .get("users/current/teams")
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getUserAgents",
              value: function(e) {
                return this.axiosConfiguration
                  .get("users/".concat(e, "/user_agents"))
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyUserAgents",
              value: function() {
                return this.axiosConfiguration
                  .get("users/current/user_agents")
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getTeamMembers",
              value: function(e) {
                var t = e.userId,
                  r = e.teamId;
                return this.axiosConfiguration
                  .get("users/".concat(t, "/teams/").concat(r, "/members"))
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyTeamMembers",
              value: function(e) {
                return this.axiosConfiguration
                  .get("users/current/teams/".concat(e, "/members"))
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getTeamMemberSummary",
              value: function(e) {
                var t = e.userId,
                  r = e.teamId,
                  n = e.teamMemberId,
                  i = _objectWithoutProperties(e, [
                    "userId",
                    "teamId",
                    "teamMemberId"
                  ]);
                return this.axiosConfiguration
                  .get(
                    "users/"
                      .concat(t, "/teams/")
                      .concat(r, "/members/")
                      .concat(n, "/summaries"),
                    { params: a(i) }
                  )
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyTeamMemberSummary",
              value: function(e) {
                var t = e.teamId,
                  r = e.teamMemberId,
                  n = _objectWithoutProperties(e, ["teamId", "teamMemberId"]);
                return this.axiosConfiguration
                  .get(
                    "users/current/teams/"
                      .concat(t, "/members/")
                      .concat(r, "/summaries"),
                    { params: a(n) }
                  )
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getUserSummary",
              value: function(e) {
                var t = e.userId,
                  r = _objectWithoutProperties(e, ["userId"]);
                return this.axiosConfiguration
                  .get("users/".concat(t, "/summaries"), { params: a(r) })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMySummary",
              value: function(e) {
                var t = _extends({}, e);
                return this.axiosConfiguration
                  .get("users/current/summaries", { params: a(t) })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getUserStats",
              value: function(e) {
                var t = e.userId,
                  r = e.range,
                  n = _objectWithoutProperties(e, ["userId", "range"]);
                return this.axiosConfiguration
                  .get("users/".concat(t, "/stats/").concat(d[r]), {
                    params: u(n)
                  })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyStats",
              value: function(e) {
                var t = e.range,
                  r = _objectWithoutProperties(e, ["range"]);
                return this.axiosConfiguration
                  .get("users/current/stats/".concat(d[t]), { params: u(r) })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getProjects",
              value: function(e) {
                return this.axiosConfiguration
                  .get("users/".concat(e, "/projects"))
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyProjects",
              value: function() {
                return this.axiosConfiguration
                  .get("users/current/projects")
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getLeaders",
              value: function() {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  t = e.language,
                  r = void 0 === t ? null : t,
                  n = e.pageNumber,
                  i = void 0 === n ? null : n;
                return this.axiosConfiguration
                  .get("leaders", { params: { language: r, page: i } })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getHeartbeats",
              value: function(e) {
                var t = e.userId,
                  r = e.date;
                return this.axiosConfiguration
                  .get("users/".concat(t, "/heartbeats"), {
                    params: { date: r }
                  })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyHeartbeats",
              value: function(e) {
                return this.axiosConfiguration
                  .get("users/current/heartbeats", { params: { date: e } })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getGoals",
              value: function(e) {
                return this.axiosConfiguration
                  .get("users/".concat(e, "/goals"))
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyGoals",
              value: function() {
                return this.axiosConfiguration
                  .get("users/current/goals")
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getDurations",
              value: function(e) {
                var t = e.userId,
                  r = _objectWithoutProperties(e, ["userId"]);
                return this.axiosConfiguration
                  .get("users/".concat(t, "/durations"), { params: p(r) })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyDurations",
              value: function(e) {
                var t = _extends({}, e);
                return this.axiosConfiguration
                  .get("users/current/durations", { params: p(t) })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getCommits",
              value: function(e) {
                var t = e.userId,
                  r = e.projectName,
                  n = _objectWithoutProperties(e, ["userId", "projectName"]);
                return this.axiosConfiguration
                  .get("users/".concat(t, "/projects/").concat(r, "/commits"), {
                    params: c(n)
                  })
                  .then(function(e) {
                    return e.data;
                  });
              }
            },
            {
              key: "getMyCommits",
              value: function(e) {
                var t = e.projectName,
                  r = _objectWithoutProperties(e, ["projectName"]);
                return this.axiosConfiguration
                  .get("users/current/projects/".concat(t, "/commits"), {
                    params: c(r)
                  })
                  .then(function(e) {
                    return e.data;
                  });
              }
            }
          ]),
          e
        );
      })();
    (r.RANGE = o), (r.WakaTimeClient = g);
  },
  669: function(e) {
    e.exports = require("util");
  },
  670: function(e, t, r) {
    "use strict";
    var n = r(35);
    var i = r(564);
    var s = r(133);
    var o = r(605);
    var a = r(211);
    var u = r(549).http;
    var p = r(549).https;
    var c = r(835);
    var d = r(903);
    var g = r(361);
    var l = r(26);
    var m = r(369);
    var h = /https:?/;
    e.exports = function httpAdapter(e) {
      return new Promise(function dispatchHttpRequest(t, r) {
        var y;
        var f = function resolve(e) {
          clearTimeout(y);
          t(e);
        };
        var b = function reject(e) {
          clearTimeout(y);
          r(e);
        };
        var _ = e.data;
        var q = e.headers;
        if (!q["User-Agent"] && !q["user-agent"]) {
          q["User-Agent"] = "axios/" + g.version;
        }
        if (_ && !n.isStream(_)) {
          if (Buffer.isBuffer(_)) {
          } else if (n.isArrayBuffer(_)) {
            _ = Buffer.from(new Uint8Array(_));
          } else if (n.isString(_)) {
            _ = Buffer.from(_, "utf-8");
          } else {
            return b(
              l(
                "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
                e
              )
            );
          }
          q["Content-Length"] = _.length;
        }
        var w = undefined;
        if (e.auth) {
          var v = e.auth.username || "";
          var T = e.auth.password || "";
          w = v + ":" + T;
        }
        var E = c.parse(e.url);
        var C = E.protocol || "http:";
        if (!w && E.auth) {
          var j = E.auth.split(":");
          var k = j[0] || "";
          var P = j[1] || "";
          w = k + ":" + P;
        }
        if (w) {
          delete q.Authorization;
        }
        var O = h.test(C);
        var S = O ? e.httpsAgent : e.httpAgent;
        var A = {
          path: s(E.path, e.params, e.paramsSerializer).replace(/^\?/, ""),
          method: e.method.toUpperCase(),
          headers: q,
          agent: S,
          auth: w
        };
        if (e.socketPath) {
          A.socketPath = e.socketPath;
        } else {
          A.hostname = E.hostname;
          A.port = E.port;
        }
        var x = e.proxy;
        if (!x && x !== false) {
          var R = C.slice(0, -1) + "_proxy";
          var G = process.env[R] || process.env[R.toUpperCase()];
          if (G) {
            var F = c.parse(G);
            var D = process.env.no_proxy || process.env.NO_PROXY;
            var B = true;
            if (D) {
              var L = D.split(",").map(function trim(e) {
                return e.trim();
              });
              B = !L.some(function proxyMatch(e) {
                if (!e) {
                  return false;
                }
                if (e === "*") {
                  return true;
                }
                if (
                  e[0] === "." &&
                  E.hostname.substr(E.hostname.length - e.length) === e &&
                  e.match(/\./g).length === E.hostname.match(/\./g).length
                ) {
                  return true;
                }
                return E.hostname === e;
              });
            }
            if (B) {
              x = { host: F.hostname, port: F.port };
              if (F.auth) {
                var U = F.auth.split(":");
                x.auth = { username: U[0], password: U[1] };
              }
            }
          }
        }
        if (x) {
          A.hostname = x.host;
          A.host = x.host;
          A.headers.host = E.hostname + (E.port ? ":" + E.port : "");
          A.port = x.port;
          A.path =
            C + "//" + E.hostname + (E.port ? ":" + E.port : "") + A.path;
          if (x.auth) {
            var H = Buffer.from(
              x.auth.username + ":" + x.auth.password,
              "utf8"
            ).toString("base64");
            A.headers["Proxy-Authorization"] = "Basic " + H;
          }
        }
        var z;
        var I = O && (x ? h.test(x.protocol) : true);
        if (e.transport) {
          z = e.transport;
        } else if (e.maxRedirects === 0) {
          z = I ? a : o;
        } else {
          if (e.maxRedirects) {
            A.maxRedirects = e.maxRedirects;
          }
          z = I ? p : u;
        }
        if (e.maxContentLength && e.maxContentLength > -1) {
          A.maxBodyLength = e.maxContentLength;
        }
        var M = z.request(A, function handleResponse(t) {
          if (M.aborted) return;
          var r = t;
          switch (t.headers["content-encoding"]) {
            case "gzip":
            case "compress":
            case "deflate":
              r = t.statusCode === 204 ? r : r.pipe(d.createUnzip());
              delete t.headers["content-encoding"];
              break;
          }
          var n = t.req || M;
          var s = {
            status: t.statusCode,
            statusText: t.statusMessage,
            headers: t.headers,
            config: e,
            request: n
          };
          if (e.responseType === "stream") {
            s.data = r;
            i(f, b, s);
          } else {
            var o = [];
            r.on("data", function handleStreamData(t) {
              o.push(t);
              if (
                e.maxContentLength > -1 &&
                Buffer.concat(o).length > e.maxContentLength
              ) {
                r.destroy();
                b(
                  l(
                    "maxContentLength size of " +
                      e.maxContentLength +
                      " exceeded",
                    e,
                    null,
                    n
                  )
                );
              }
            });
            r.on("error", function handleStreamError(t) {
              if (M.aborted) return;
              b(m(t, e, null, n));
            });
            r.on("end", function handleStreamEnd() {
              var t = Buffer.concat(o);
              if (e.responseType !== "arraybuffer") {
                t = t.toString(e.responseEncoding);
              }
              s.data = t;
              i(f, b, s);
            });
          }
        });
        M.on("error", function handleRequestError(t) {
          if (M.aborted) return;
          b(m(t, e, null, M));
        });
        if (e.timeout) {
          y = setTimeout(function handleRequestTimeout() {
            M.abort();
            b(
              l("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", M)
            );
          }, e.timeout);
        }
        if (e.cancelToken) {
          e.cancelToken.promise.then(function onCanceled(e) {
            if (M.aborted) return;
            M.abort();
            b(e);
          });
        }
        if (n.isStream(_)) {
          _.on("error", function handleStreamError(t) {
            b(m(t, e, null, M));
          }).pipe(M);
        } else {
          M.end(_);
        }
      });
    };
  },
  674: function(e, t, r) {
    e.exports = authenticate;
    const { Deprecation: n } = r(692);
    const i = r(49);
    const s = i((e, t) => e.warn(t));
    function authenticate(e, t) {
      s(
        e.octokit.log,
        new n(
          '[@octokit/rest] octokit.authenticate() is deprecated. Use "auth" constructor option instead.'
        )
      );
      if (!t) {
        e.auth = false;
        return;
      }
      switch (t.type) {
        case "basic":
          if (!t.username || !t.password) {
            throw new Error(
              "Basic authentication requires both a username and password to be set"
            );
          }
          break;
        case "oauth":
          if (!t.token && !(t.key && t.secret)) {
            throw new Error(
              "OAuth2 authentication requires a token or key & secret to be set"
            );
          }
          break;
        case "token":
        case "app":
          if (!t.token) {
            throw new Error("Token authentication requires a token to be set");
          }
          break;
        default:
          throw new Error(
            "Invalid authentication type, must be 'basic', 'oauth', 'token' or 'app'"
          );
      }
      e.auth = t;
    }
  },
  675: function(e) {
    e.exports = function btoa(e) {
      return new Buffer(e).toString("base64");
    };
  },
  688: function(e, t, r) {
    "use strict";
    var n = r(35);
    e.exports = n.isStandardBrowserEnv()
      ? (function standardBrowserEnv() {
          var e = /(msie|trident)/i.test(navigator.userAgent);
          var t = document.createElement("a");
          var r;
          function resolveURL(r) {
            var n = r;
            if (e) {
              t.setAttribute("href", n);
              n = t.href;
            }
            t.setAttribute("href", n);
            return {
              href: t.href,
              protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
              host: t.host,
              search: t.search ? t.search.replace(/^\?/, "") : "",
              hash: t.hash ? t.hash.replace(/^#/, "") : "",
              hostname: t.hostname,
              port: t.port,
              pathname:
                t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
            };
          }
          r = resolveURL(window.location.href);
          return function isURLSameOrigin(e) {
            var t = n.isString(e) ? resolveURL(e) : e;
            return t.protocol === r.protocol && t.host === r.host;
          };
        })()
      : (function nonStandardBrowserEnv() {
          return function isURLSameOrigin() {
            return true;
          };
        })();
  },
  692: function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });
    class Deprecation extends Error {
      constructor(e) {
        super(e);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "Deprecation";
      }
    }
    t.Deprecation = Deprecation;
  },
  705: function(e) {
    e.exports = {
      activity: {
        checkStarringRepo: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/user/starred/:owner/:repo"
        },
        deleteRepoSubscription: {
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/subscription"
        },
        deleteThreadSubscription: {
          method: "DELETE",
          params: { thread_id: { required: true, type: "integer" } },
          url: "/notifications/threads/:thread_id/subscription"
        },
        getRepoSubscription: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/subscription"
        },
        getThread: {
          method: "GET",
          params: { thread_id: { required: true, type: "integer" } },
          url: "/notifications/threads/:thread_id"
        },
        getThreadSubscription: {
          method: "GET",
          params: { thread_id: { required: true, type: "integer" } },
          url: "/notifications/threads/:thread_id/subscription"
        },
        listEventsForOrg: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/events/orgs/:org"
        },
        listEventsForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/events"
        },
        listFeeds: { method: "GET", params: {}, url: "/feeds" },
        listNotifications: {
          method: "GET",
          params: {
            all: { type: "boolean" },
            before: { type: "string" },
            page: { type: "integer" },
            participating: { type: "boolean" },
            per_page: { type: "integer" },
            since: { type: "string" }
          },
          url: "/notifications"
        },
        listNotificationsForRepo: {
          method: "GET",
          params: {
            all: { type: "boolean" },
            before: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            participating: { type: "boolean" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            since: { type: "string" }
          },
          url: "/repos/:owner/:repo/notifications"
        },
        listPublicEvents: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/events"
        },
        listPublicEventsForOrg: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/events"
        },
        listPublicEventsForRepoNetwork: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/networks/:owner/:repo/events"
        },
        listPublicEventsForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/events/public"
        },
        listReceivedEventsForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/received_events"
        },
        listReceivedPublicEventsForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/received_events/public"
        },
        listRepoEvents: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/events"
        },
        listReposStarredByAuthenticatedUser: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            sort: { enum: ["created", "updated"], type: "string" }
          },
          url: "/user/starred"
        },
        listReposStarredByUser: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            sort: { enum: ["created", "updated"], type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/starred"
        },
        listReposWatchedByUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/subscriptions"
        },
        listStargazersForRepo: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/stargazers"
        },
        listWatchedReposForAuthenticatedUser: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/subscriptions"
        },
        listWatchersForRepo: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/subscribers"
        },
        markAsRead: {
          method: "PUT",
          params: { last_read_at: { type: "string" } },
          url: "/notifications"
        },
        markNotificationsAsReadForRepo: {
          method: "PUT",
          params: {
            last_read_at: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/notifications"
        },
        markThreadAsRead: {
          method: "PATCH",
          params: { thread_id: { required: true, type: "integer" } },
          url: "/notifications/threads/:thread_id"
        },
        setRepoSubscription: {
          method: "PUT",
          params: {
            ignored: { type: "boolean" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            subscribed: { type: "boolean" }
          },
          url: "/repos/:owner/:repo/subscription"
        },
        setThreadSubscription: {
          method: "PUT",
          params: {
            ignored: { type: "boolean" },
            thread_id: { required: true, type: "integer" }
          },
          url: "/notifications/threads/:thread_id/subscription"
        },
        starRepo: {
          method: "PUT",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/user/starred/:owner/:repo"
        },
        unstarRepo: {
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/user/starred/:owner/:repo"
        }
      },
      apps: {
        addRepoToInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "PUT",
          params: {
            installation_id: { required: true, type: "integer" },
            repository_id: { required: true, type: "integer" }
          },
          url:
            "/user/installations/:installation_id/repositories/:repository_id"
        },
        checkAccountIsAssociatedWithAny: {
          method: "GET",
          params: {
            account_id: { required: true, type: "integer" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/marketplace_listing/accounts/:account_id"
        },
        checkAccountIsAssociatedWithAnyStubbed: {
          method: "GET",
          params: {
            account_id: { required: true, type: "integer" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/marketplace_listing/stubbed/accounts/:account_id"
        },
        checkAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.checkAuthorization() has been renamed to octokit.apps.checkAuthorization() (2019-11-05)",
          method: "GET",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        checkToken: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "POST",
          params: {
            access_token: { type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/token"
        },
        createContentAttachment: {
          headers: { accept: "application/vnd.github.corsair-preview+json" },
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            content_reference_id: { required: true, type: "integer" },
            title: { required: true, type: "string" }
          },
          url: "/content_references/:content_reference_id/attachments"
        },
        createFromManifest: {
          headers: { accept: "application/vnd.github.fury-preview+json" },
          method: "POST",
          params: { code: { required: true, type: "string" } },
          url: "/app-manifests/:code/conversions"
        },
        createInstallationToken: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "POST",
          params: {
            installation_id: { required: true, type: "integer" },
            permissions: { type: "object" },
            repository_ids: { type: "integer[]" }
          },
          url: "/app/installations/:installation_id/access_tokens"
        },
        deleteAuthorization: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "DELETE",
          params: {
            access_token: { type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/grant"
        },
        deleteInstallation: {
          headers: {
            accept:
              "application/vnd.github.gambit-preview+json,application/vnd.github.machine-man-preview+json"
          },
          method: "DELETE",
          params: { installation_id: { required: true, type: "integer" } },
          url: "/app/installations/:installation_id"
        },
        deleteToken: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "DELETE",
          params: {
            access_token: { type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/token"
        },
        findOrgInstallation: {
          deprecated:
            "octokit.apps.findOrgInstallation() has been renamed to octokit.apps.getOrgInstallation() (2019-04-10)",
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { org: { required: true, type: "string" } },
          url: "/orgs/:org/installation"
        },
        findRepoInstallation: {
          deprecated:
            "octokit.apps.findRepoInstallation() has been renamed to octokit.apps.getRepoInstallation() (2019-04-10)",
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/installation"
        },
        findUserInstallation: {
          deprecated:
            "octokit.apps.findUserInstallation() has been renamed to octokit.apps.getUserInstallation() (2019-04-10)",
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { username: { required: true, type: "string" } },
          url: "/users/:username/installation"
        },
        getAuthenticated: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {},
          url: "/app"
        },
        getBySlug: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { app_slug: { required: true, type: "string" } },
          url: "/apps/:app_slug"
        },
        getInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { installation_id: { required: true, type: "integer" } },
          url: "/app/installations/:installation_id"
        },
        getOrgInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { org: { required: true, type: "string" } },
          url: "/orgs/:org/installation"
        },
        getRepoInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/installation"
        },
        getUserInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { username: { required: true, type: "string" } },
          url: "/users/:username/installation"
        },
        listAccountsUserOrOrgOnPlan: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            plan_id: { required: true, type: "integer" },
            sort: { enum: ["created", "updated"], type: "string" }
          },
          url: "/marketplace_listing/plans/:plan_id/accounts"
        },
        listAccountsUserOrOrgOnPlanStubbed: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            plan_id: { required: true, type: "integer" },
            sort: { enum: ["created", "updated"], type: "string" }
          },
          url: "/marketplace_listing/stubbed/plans/:plan_id/accounts"
        },
        listInstallationReposForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            installation_id: { required: true, type: "integer" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/user/installations/:installation_id/repositories"
        },
        listInstallations: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/app/installations"
        },
        listInstallationsForAuthenticatedUser: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/installations"
        },
        listMarketplacePurchasesForAuthenticatedUser: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/marketplace_purchases"
        },
        listMarketplacePurchasesForAuthenticatedUserStubbed: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/marketplace_purchases/stubbed"
        },
        listPlans: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/marketplace_listing/plans"
        },
        listPlansStubbed: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/marketplace_listing/stubbed/plans"
        },
        listRepos: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/installation/repositories"
        },
        removeRepoFromInstallation: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "DELETE",
          params: {
            installation_id: { required: true, type: "integer" },
            repository_id: { required: true, type: "integer" }
          },
          url:
            "/user/installations/:installation_id/repositories/:repository_id"
        },
        resetAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.resetAuthorization() has been renamed to octokit.apps.resetAuthorization() (2019-11-05)",
          method: "POST",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        resetToken: {
          headers: {
            accept: "application/vnd.github.doctor-strange-preview+json"
          },
          method: "PATCH",
          params: {
            access_token: { type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/token"
        },
        revokeAuthorizationForApplication: {
          deprecated:
            "octokit.oauthAuthorizations.revokeAuthorizationForApplication() has been renamed to octokit.apps.revokeAuthorizationForApplication() (2019-11-05)",
          method: "DELETE",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        revokeGrantForApplication: {
          deprecated:
            "octokit.oauthAuthorizations.revokeGrantForApplication() has been renamed to octokit.apps.revokeGrantForApplication() (2019-11-05)",
          method: "DELETE",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/grants/:access_token"
        }
      },
      checks: {
        create: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "POST",
          params: {
            actions: { type: "object[]" },
            "actions[].description": { required: true, type: "string" },
            "actions[].identifier": { required: true, type: "string" },
            "actions[].label": { required: true, type: "string" },
            completed_at: { type: "string" },
            conclusion: {
              enum: [
                "success",
                "failure",
                "neutral",
                "cancelled",
                "timed_out",
                "action_required"
              ],
              type: "string"
            },
            details_url: { type: "string" },
            external_id: { type: "string" },
            head_sha: { required: true, type: "string" },
            name: { required: true, type: "string" },
            output: { type: "object" },
            "output.annotations": { type: "object[]" },
            "output.annotations[].annotation_level": {
              enum: ["notice", "warning", "failure"],
              required: true,
              type: "string"
            },
            "output.annotations[].end_column": { type: "integer" },
            "output.annotations[].end_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].message": { required: true, type: "string" },
            "output.annotations[].path": { required: true, type: "string" },
            "output.annotations[].raw_details": { type: "string" },
            "output.annotations[].start_column": { type: "integer" },
            "output.annotations[].start_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].title": { type: "string" },
            "output.images": { type: "object[]" },
            "output.images[].alt": { required: true, type: "string" },
            "output.images[].caption": { type: "string" },
            "output.images[].image_url": { required: true, type: "string" },
            "output.summary": { required: true, type: "string" },
            "output.text": { type: "string" },
            "output.title": { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            started_at: { type: "string" },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-runs"
        },
        createSuite: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "POST",
          params: {
            head_sha: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/check-suites"
        },
        get: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "GET",
          params: {
            check_run_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/check-runs/:check_run_id"
        },
        getSuite: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "GET",
          params: {
            check_suite_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/check-suites/:check_suite_id"
        },
        listAnnotations: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "GET",
          params: {
            check_run_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/check-runs/:check_run_id/annotations"
        },
        listForRef: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "GET",
          params: {
            check_name: { type: "string" },
            filter: { enum: ["latest", "all"], type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/commits/:ref/check-runs"
        },
        listForSuite: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "GET",
          params: {
            check_name: { type: "string" },
            check_suite_id: { required: true, type: "integer" },
            filter: { enum: ["latest", "all"], type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-suites/:check_suite_id/check-runs"
        },
        listSuitesForRef: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "GET",
          params: {
            app_id: { type: "integer" },
            check_name: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:ref/check-suites"
        },
        rerequestSuite: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "POST",
          params: {
            check_suite_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/check-suites/:check_suite_id/rerequest"
        },
        setSuitesPreferences: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "PATCH",
          params: {
            auto_trigger_checks: { type: "object[]" },
            "auto_trigger_checks[].app_id": { required: true, type: "integer" },
            "auto_trigger_checks[].setting": {
              required: true,
              type: "boolean"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/check-suites/preferences"
        },
        update: {
          headers: { accept: "application/vnd.github.antiope-preview+json" },
          method: "PATCH",
          params: {
            actions: { type: "object[]" },
            "actions[].description": { required: true, type: "string" },
            "actions[].identifier": { required: true, type: "string" },
            "actions[].label": { required: true, type: "string" },
            check_run_id: { required: true, type: "integer" },
            completed_at: { type: "string" },
            conclusion: {
              enum: [
                "success",
                "failure",
                "neutral",
                "cancelled",
                "timed_out",
                "action_required"
              ],
              type: "string"
            },
            details_url: { type: "string" },
            external_id: { type: "string" },
            name: { type: "string" },
            output: { type: "object" },
            "output.annotations": { type: "object[]" },
            "output.annotations[].annotation_level": {
              enum: ["notice", "warning", "failure"],
              required: true,
              type: "string"
            },
            "output.annotations[].end_column": { type: "integer" },
            "output.annotations[].end_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].message": { required: true, type: "string" },
            "output.annotations[].path": { required: true, type: "string" },
            "output.annotations[].raw_details": { type: "string" },
            "output.annotations[].start_column": { type: "integer" },
            "output.annotations[].start_line": {
              required: true,
              type: "integer"
            },
            "output.annotations[].title": { type: "string" },
            "output.images": { type: "object[]" },
            "output.images[].alt": { required: true, type: "string" },
            "output.images[].caption": { type: "string" },
            "output.images[].image_url": { required: true, type: "string" },
            "output.summary": { required: true, type: "string" },
            "output.text": { type: "string" },
            "output.title": { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            started_at: { type: "string" },
            status: {
              enum: ["queued", "in_progress", "completed"],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/check-runs/:check_run_id"
        }
      },
      codesOfConduct: {
        getConductCode: {
          headers: {
            accept: "application/vnd.github.scarlet-witch-preview+json"
          },
          method: "GET",
          params: { key: { required: true, type: "string" } },
          url: "/codes_of_conduct/:key"
        },
        getForRepo: {
          headers: {
            accept: "application/vnd.github.scarlet-witch-preview+json"
          },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/community/code_of_conduct"
        },
        listConductCodes: {
          headers: {
            accept: "application/vnd.github.scarlet-witch-preview+json"
          },
          method: "GET",
          params: {},
          url: "/codes_of_conduct"
        }
      },
      emojis: { get: { method: "GET", params: {}, url: "/emojis" } },
      gists: {
        checkIsStarred: {
          method: "GET",
          params: { gist_id: { required: true, type: "string" } },
          url: "/gists/:gist_id/star"
        },
        create: {
          method: "POST",
          params: {
            description: { type: "string" },
            files: { required: true, type: "object" },
            "files.content": { type: "string" },
            public: { type: "boolean" }
          },
          url: "/gists"
        },
        createComment: {
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            gist_id: { required: true, type: "string" }
          },
          url: "/gists/:gist_id/comments"
        },
        delete: {
          method: "DELETE",
          params: { gist_id: { required: true, type: "string" } },
          url: "/gists/:gist_id"
        },
        deleteComment: {
          method: "DELETE",
          params: {
            comment_id: { required: true, type: "integer" },
            gist_id: { required: true, type: "string" }
          },
          url: "/gists/:gist_id/comments/:comment_id"
        },
        fork: {
          method: "POST",
          params: { gist_id: { required: true, type: "string" } },
          url: "/gists/:gist_id/forks"
        },
        get: {
          method: "GET",
          params: { gist_id: { required: true, type: "string" } },
          url: "/gists/:gist_id"
        },
        getComment: {
          method: "GET",
          params: {
            comment_id: { required: true, type: "integer" },
            gist_id: { required: true, type: "string" }
          },
          url: "/gists/:gist_id/comments/:comment_id"
        },
        getRevision: {
          method: "GET",
          params: {
            gist_id: { required: true, type: "string" },
            sha: { required: true, type: "string" }
          },
          url: "/gists/:gist_id/:sha"
        },
        list: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" }
          },
          url: "/gists"
        },
        listComments: {
          method: "GET",
          params: {
            gist_id: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/gists/:gist_id/comments"
        },
        listCommits: {
          method: "GET",
          params: {
            gist_id: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/gists/:gist_id/commits"
        },
        listForks: {
          method: "GET",
          params: {
            gist_id: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/gists/:gist_id/forks"
        },
        listPublic: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" }
          },
          url: "/gists/public"
        },
        listPublicForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/gists"
        },
        listStarred: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" }
          },
          url: "/gists/starred"
        },
        star: {
          method: "PUT",
          params: { gist_id: { required: true, type: "string" } },
          url: "/gists/:gist_id/star"
        },
        unstar: {
          method: "DELETE",
          params: { gist_id: { required: true, type: "string" } },
          url: "/gists/:gist_id/star"
        },
        update: {
          method: "PATCH",
          params: {
            description: { type: "string" },
            files: { type: "object" },
            "files.content": { type: "string" },
            "files.filename": { type: "string" },
            gist_id: { required: true, type: "string" }
          },
          url: "/gists/:gist_id"
        },
        updateComment: {
          method: "PATCH",
          params: {
            body: { required: true, type: "string" },
            comment_id: { required: true, type: "integer" },
            gist_id: { required: true, type: "string" }
          },
          url: "/gists/:gist_id/comments/:comment_id"
        }
      },
      git: {
        createBlob: {
          method: "POST",
          params: {
            content: { required: true, type: "string" },
            encoding: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/blobs"
        },
        createCommit: {
          method: "POST",
          params: {
            author: { type: "object" },
            "author.date": { type: "string" },
            "author.email": { type: "string" },
            "author.name": { type: "string" },
            committer: { type: "object" },
            "committer.date": { type: "string" },
            "committer.email": { type: "string" },
            "committer.name": { type: "string" },
            message: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            parents: { required: true, type: "string[]" },
            repo: { required: true, type: "string" },
            signature: { type: "string" },
            tree: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/commits"
        },
        createRef: {
          method: "POST",
          params: {
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/refs"
        },
        createTag: {
          method: "POST",
          params: {
            message: { required: true, type: "string" },
            object: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            tag: { required: true, type: "string" },
            tagger: { type: "object" },
            "tagger.date": { type: "string" },
            "tagger.email": { type: "string" },
            "tagger.name": { type: "string" },
            type: {
              enum: ["commit", "tree", "blob"],
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/git/tags"
        },
        createTree: {
          method: "POST",
          params: {
            base_tree: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            tree: { required: true, type: "object[]" },
            "tree[].content": { type: "string" },
            "tree[].mode": {
              enum: ["100644", "100755", "040000", "160000", "120000"],
              type: "string"
            },
            "tree[].path": { type: "string" },
            "tree[].sha": { allowNull: true, type: "string" },
            "tree[].type": { enum: ["blob", "tree", "commit"], type: "string" }
          },
          url: "/repos/:owner/:repo/git/trees"
        },
        deleteRef: {
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/refs/:ref"
        },
        getBlob: {
          method: "GET",
          params: {
            file_sha: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/blobs/:file_sha"
        },
        getCommit: {
          method: "GET",
          params: {
            commit_sha: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/commits/:commit_sha"
        },
        getRef: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/ref/:ref"
        },
        getTag: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            tag_sha: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/tags/:tag_sha"
        },
        getTree: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            recursive: { enum: ["1"], type: "integer" },
            repo: { required: true, type: "string" },
            tree_sha: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/trees/:tree_sha"
        },
        listMatchingRefs: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/matching-refs/:ref"
        },
        listRefs: {
          method: "GET",
          params: {
            namespace: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/refs/:namespace"
        },
        updateRef: {
          method: "PATCH",
          params: {
            force: { type: "boolean" },
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/git/refs/:ref"
        }
      },
      gitignore: {
        getTemplate: {
          method: "GET",
          params: { name: { required: true, type: "string" } },
          url: "/gitignore/templates/:name"
        },
        listTemplates: {
          method: "GET",
          params: {},
          url: "/gitignore/templates"
        }
      },
      interactions: {
        addOrUpdateRestrictionsForOrg: {
          headers: { accept: "application/vnd.github.sombra-preview+json" },
          method: "PUT",
          params: {
            limit: {
              enum: [
                "existing_users",
                "contributors_only",
                "collaborators_only"
              ],
              required: true,
              type: "string"
            },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/interaction-limits"
        },
        addOrUpdateRestrictionsForRepo: {
          headers: { accept: "application/vnd.github.sombra-preview+json" },
          method: "PUT",
          params: {
            limit: {
              enum: [
                "existing_users",
                "contributors_only",
                "collaborators_only"
              ],
              required: true,
              type: "string"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/interaction-limits"
        },
        getRestrictionsForOrg: {
          headers: { accept: "application/vnd.github.sombra-preview+json" },
          method: "GET",
          params: { org: { required: true, type: "string" } },
          url: "/orgs/:org/interaction-limits"
        },
        getRestrictionsForRepo: {
          headers: { accept: "application/vnd.github.sombra-preview+json" },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/interaction-limits"
        },
        removeRestrictionsForOrg: {
          headers: { accept: "application/vnd.github.sombra-preview+json" },
          method: "DELETE",
          params: { org: { required: true, type: "string" } },
          url: "/orgs/:org/interaction-limits"
        },
        removeRestrictionsForRepo: {
          headers: { accept: "application/vnd.github.sombra-preview+json" },
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/interaction-limits"
        }
      },
      issues: {
        addAssignees: {
          method: "POST",
          params: {
            assignees: { type: "string[]" },
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/assignees"
        },
        addLabels: {
          method: "POST",
          params: {
            issue_number: { required: true, type: "integer" },
            labels: { required: true, type: "string[]" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        checkAssignee: {
          method: "GET",
          params: {
            assignee: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/assignees/:assignee"
        },
        create: {
          method: "POST",
          params: {
            assignee: { type: "string" },
            assignees: { type: "string[]" },
            body: { type: "string" },
            labels: { type: "string[]" },
            milestone: { type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            title: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues"
        },
        createComment: {
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/comments"
        },
        createLabel: {
          method: "POST",
          params: {
            color: { required: true, type: "string" },
            description: { type: "string" },
            name: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/labels"
        },
        createMilestone: {
          method: "POST",
          params: {
            description: { type: "string" },
            due_on: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            state: { enum: ["open", "closed"], type: "string" },
            title: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/milestones"
        },
        deleteComment: {
          method: "DELETE",
          params: {
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id"
        },
        deleteLabel: {
          method: "DELETE",
          params: {
            name: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/labels/:name"
        },
        deleteMilestone: {
          method: "DELETE",
          params: {
            milestone_number: { required: true, type: "integer" },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number"
        },
        get: {
          method: "GET",
          params: {
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number"
        },
        getComment: {
          method: "GET",
          params: {
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id"
        },
        getEvent: {
          method: "GET",
          params: {
            event_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/events/:event_id"
        },
        getLabel: {
          method: "GET",
          params: {
            name: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/labels/:name"
        },
        getMilestone: {
          method: "GET",
          params: {
            milestone_number: { required: true, type: "integer" },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number"
        },
        list: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            filter: {
              enum: ["assigned", "created", "mentioned", "subscribed", "all"],
              type: "string"
            },
            labels: { type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" },
            sort: { enum: ["created", "updated", "comments"], type: "string" },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/issues"
        },
        listAssignees: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/assignees"
        },
        listComments: {
          method: "GET",
          params: {
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            since: { type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/comments"
        },
        listCommentsForRepo: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            since: { type: "string" },
            sort: { enum: ["created", "updated"], type: "string" }
          },
          url: "/repos/:owner/:repo/issues/comments"
        },
        listEvents: {
          method: "GET",
          params: {
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/events"
        },
        listEventsForRepo: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/events"
        },
        listEventsForTimeline: {
          headers: {
            accept: "application/vnd.github.mockingbird-preview+json"
          },
          method: "GET",
          params: {
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/timeline"
        },
        listForAuthenticatedUser: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            filter: {
              enum: ["assigned", "created", "mentioned", "subscribed", "all"],
              type: "string"
            },
            labels: { type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" },
            sort: { enum: ["created", "updated", "comments"], type: "string" },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/user/issues"
        },
        listForOrg: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            filter: {
              enum: ["assigned", "created", "mentioned", "subscribed", "all"],
              type: "string"
            },
            labels: { type: "string" },
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" },
            sort: { enum: ["created", "updated", "comments"], type: "string" },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/orgs/:org/issues"
        },
        listForRepo: {
          method: "GET",
          params: {
            assignee: { type: "string" },
            creator: { type: "string" },
            direction: { enum: ["asc", "desc"], type: "string" },
            labels: { type: "string" },
            mentioned: { type: "string" },
            milestone: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            since: { type: "string" },
            sort: { enum: ["created", "updated", "comments"], type: "string" },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/repos/:owner/:repo/issues"
        },
        listLabelsForMilestone: {
          method: "GET",
          params: {
            milestone_number: { required: true, type: "integer" },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number/labels"
        },
        listLabelsForRepo: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/labels"
        },
        listLabelsOnIssue: {
          method: "GET",
          params: {
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        listMilestonesForRepo: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            sort: { enum: ["due_on", "completeness"], type: "string" },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/repos/:owner/:repo/milestones"
        },
        lock: {
          method: "PUT",
          params: {
            issue_number: { required: true, type: "integer" },
            lock_reason: {
              enum: ["off-topic", "too heated", "resolved", "spam"],
              type: "string"
            },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/lock"
        },
        removeAssignees: {
          method: "DELETE",
          params: {
            assignees: { type: "string[]" },
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/assignees"
        },
        removeLabel: {
          method: "DELETE",
          params: {
            issue_number: { required: true, type: "integer" },
            name: { required: true, type: "string" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels/:name"
        },
        removeLabels: {
          method: "DELETE",
          params: {
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        replaceLabels: {
          method: "PUT",
          params: {
            issue_number: { required: true, type: "integer" },
            labels: { type: "string[]" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/labels"
        },
        unlock: {
          method: "DELETE",
          params: {
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/lock"
        },
        update: {
          method: "PATCH",
          params: {
            assignee: { type: "string" },
            assignees: { type: "string[]" },
            body: { type: "string" },
            issue_number: { required: true, type: "integer" },
            labels: { type: "string[]" },
            milestone: { allowNull: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            state: { enum: ["open", "closed"], type: "string" },
            title: { type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number"
        },
        updateComment: {
          method: "PATCH",
          params: {
            body: { required: true, type: "string" },
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id"
        },
        updateLabel: {
          method: "PATCH",
          params: {
            color: { type: "string" },
            current_name: { required: true, type: "string" },
            description: { type: "string" },
            name: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/labels/:current_name"
        },
        updateMilestone: {
          method: "PATCH",
          params: {
            description: { type: "string" },
            due_on: { type: "string" },
            milestone_number: { required: true, type: "integer" },
            number: {
              alias: "milestone_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            state: { enum: ["open", "closed"], type: "string" },
            title: { type: "string" }
          },
          url: "/repos/:owner/:repo/milestones/:milestone_number"
        }
      },
      licenses: {
        get: {
          method: "GET",
          params: { license: { required: true, type: "string" } },
          url: "/licenses/:license"
        },
        getForRepo: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/license"
        },
        list: {
          deprecated:
            "octokit.licenses.list() has been renamed to octokit.licenses.listCommonlyUsed() (2019-03-05)",
          method: "GET",
          params: {},
          url: "/licenses"
        },
        listCommonlyUsed: { method: "GET", params: {}, url: "/licenses" }
      },
      markdown: {
        render: {
          method: "POST",
          params: {
            context: { type: "string" },
            mode: { enum: ["markdown", "gfm"], type: "string" },
            text: { required: true, type: "string" }
          },
          url: "/markdown"
        },
        renderRaw: {
          headers: { "content-type": "text/plain; charset=utf-8" },
          method: "POST",
          params: { data: { mapTo: "data", required: true, type: "string" } },
          url: "/markdown/raw"
        }
      },
      meta: { get: { method: "GET", params: {}, url: "/meta" } },
      migrations: {
        cancelImport: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/import"
        },
        deleteArchiveForAuthenticatedUser: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "DELETE",
          params: { migration_id: { required: true, type: "integer" } },
          url: "/user/migrations/:migration_id/archive"
        },
        deleteArchiveForOrg: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "DELETE",
          params: {
            migration_id: { required: true, type: "integer" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/migrations/:migration_id/archive"
        },
        getArchiveForAuthenticatedUser: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "GET",
          params: { migration_id: { required: true, type: "integer" } },
          url: "/user/migrations/:migration_id/archive"
        },
        getArchiveForOrg: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "GET",
          params: {
            migration_id: { required: true, type: "integer" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/migrations/:migration_id/archive"
        },
        getCommitAuthors: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            since: { type: "string" }
          },
          url: "/repos/:owner/:repo/import/authors"
        },
        getImportProgress: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/import"
        },
        getLargeFiles: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/import/large_files"
        },
        getStatusForAuthenticatedUser: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "GET",
          params: { migration_id: { required: true, type: "integer" } },
          url: "/user/migrations/:migration_id"
        },
        getStatusForOrg: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "GET",
          params: {
            migration_id: { required: true, type: "integer" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/migrations/:migration_id"
        },
        listForAuthenticatedUser: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/migrations"
        },
        listForOrg: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/migrations"
        },
        mapCommitAuthor: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "PATCH",
          params: {
            author_id: { required: true, type: "integer" },
            email: { type: "string" },
            name: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/import/authors/:author_id"
        },
        setLfsPreference: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "PATCH",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            use_lfs: {
              enum: ["opt_in", "opt_out"],
              required: true,
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/import/lfs"
        },
        startForAuthenticatedUser: {
          method: "POST",
          params: {
            exclude_attachments: { type: "boolean" },
            lock_repositories: { type: "boolean" },
            repositories: { required: true, type: "string[]" }
          },
          url: "/user/migrations"
        },
        startForOrg: {
          method: "POST",
          params: {
            exclude_attachments: { type: "boolean" },
            lock_repositories: { type: "boolean" },
            org: { required: true, type: "string" },
            repositories: { required: true, type: "string[]" }
          },
          url: "/orgs/:org/migrations"
        },
        startImport: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "PUT",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            tfvc_project: { type: "string" },
            vcs: {
              enum: ["subversion", "git", "mercurial", "tfvc"],
              type: "string"
            },
            vcs_password: { type: "string" },
            vcs_url: { required: true, type: "string" },
            vcs_username: { type: "string" }
          },
          url: "/repos/:owner/:repo/import"
        },
        unlockRepoForAuthenticatedUser: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "DELETE",
          params: {
            migration_id: { required: true, type: "integer" },
            repo_name: { required: true, type: "string" }
          },
          url: "/user/migrations/:migration_id/repos/:repo_name/lock"
        },
        unlockRepoForOrg: {
          headers: { accept: "application/vnd.github.wyandotte-preview+json" },
          method: "DELETE",
          params: {
            migration_id: { required: true, type: "integer" },
            org: { required: true, type: "string" },
            repo_name: { required: true, type: "string" }
          },
          url: "/orgs/:org/migrations/:migration_id/repos/:repo_name/lock"
        },
        updateImport: {
          headers: {
            accept: "application/vnd.github.barred-rock-preview+json"
          },
          method: "PATCH",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            vcs_password: { type: "string" },
            vcs_username: { type: "string" }
          },
          url: "/repos/:owner/:repo/import"
        }
      },
      oauthAuthorizations: {
        checkAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.checkAuthorization() has been renamed to octokit.apps.checkAuthorization() (2019-11-05)",
          method: "GET",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        createAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.createAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization",
          method: "POST",
          params: {
            client_id: { type: "string" },
            client_secret: { type: "string" },
            fingerprint: { type: "string" },
            note: { required: true, type: "string" },
            note_url: { type: "string" },
            scopes: { type: "string[]" }
          },
          url: "/authorizations"
        },
        deleteAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.deleteAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-an-authorization",
          method: "DELETE",
          params: { authorization_id: { required: true, type: "integer" } },
          url: "/authorizations/:authorization_id"
        },
        deleteGrant: {
          deprecated:
            "octokit.oauthAuthorizations.deleteGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#delete-a-grant",
          method: "DELETE",
          params: { grant_id: { required: true, type: "integer" } },
          url: "/applications/grants/:grant_id"
        },
        getAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.getAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-authorization",
          method: "GET",
          params: { authorization_id: { required: true, type: "integer" } },
          url: "/authorizations/:authorization_id"
        },
        getGrant: {
          deprecated:
            "octokit.oauthAuthorizations.getGrant() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-a-single-grant",
          method: "GET",
          params: { grant_id: { required: true, type: "integer" } },
          url: "/applications/grants/:grant_id"
        },
        getOrCreateAuthorizationForApp: {
          deprecated:
            "octokit.oauthAuthorizations.getOrCreateAuthorizationForApp() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app",
          method: "PUT",
          params: {
            client_id: { required: true, type: "string" },
            client_secret: { required: true, type: "string" },
            fingerprint: { type: "string" },
            note: { type: "string" },
            note_url: { type: "string" },
            scopes: { type: "string[]" }
          },
          url: "/authorizations/clients/:client_id"
        },
        getOrCreateAuthorizationForAppAndFingerprint: {
          deprecated:
            "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#get-or-create-an-authorization-for-a-specific-app-and-fingerprint",
          method: "PUT",
          params: {
            client_id: { required: true, type: "string" },
            client_secret: { required: true, type: "string" },
            fingerprint: { required: true, type: "string" },
            note: { type: "string" },
            note_url: { type: "string" },
            scopes: { type: "string[]" }
          },
          url: "/authorizations/clients/:client_id/:fingerprint"
        },
        getOrCreateAuthorizationForAppFingerprint: {
          deprecated:
            "octokit.oauthAuthorizations.getOrCreateAuthorizationForAppFingerprint() has been renamed to octokit.oauthAuthorizations.getOrCreateAuthorizationForAppAndFingerprint() (2018-12-27)",
          method: "PUT",
          params: {
            client_id: { required: true, type: "string" },
            client_secret: { required: true, type: "string" },
            fingerprint: { required: true, type: "string" },
            note: { type: "string" },
            note_url: { type: "string" },
            scopes: { type: "string[]" }
          },
          url: "/authorizations/clients/:client_id/:fingerprint"
        },
        listAuthorizations: {
          deprecated:
            "octokit.oauthAuthorizations.listAuthorizations() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-authorizations",
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/authorizations"
        },
        listGrants: {
          deprecated:
            "octokit.oauthAuthorizations.listGrants() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#list-your-grants",
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/applications/grants"
        },
        resetAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.resetAuthorization() has been renamed to octokit.apps.resetAuthorization() (2019-11-05)",
          method: "POST",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        revokeAuthorizationForApplication: {
          deprecated:
            "octokit.oauthAuthorizations.revokeAuthorizationForApplication() has been renamed to octokit.apps.revokeAuthorizationForApplication() (2019-11-05)",
          method: "DELETE",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/tokens/:access_token"
        },
        revokeGrantForApplication: {
          deprecated:
            "octokit.oauthAuthorizations.revokeGrantForApplication() has been renamed to octokit.apps.revokeGrantForApplication() (2019-11-05)",
          method: "DELETE",
          params: {
            access_token: { required: true, type: "string" },
            client_id: { required: true, type: "string" }
          },
          url: "/applications/:client_id/grants/:access_token"
        },
        updateAuthorization: {
          deprecated:
            "octokit.oauthAuthorizations.updateAuthorization() is deprecated, see https://developer.github.com/v3/oauth_authorizations/#update-an-existing-authorization",
          method: "PATCH",
          params: {
            add_scopes: { type: "string[]" },
            authorization_id: { required: true, type: "integer" },
            fingerprint: { type: "string" },
            note: { type: "string" },
            note_url: { type: "string" },
            remove_scopes: { type: "string[]" },
            scopes: { type: "string[]" }
          },
          url: "/authorizations/:authorization_id"
        }
      },
      orgs: {
        addOrUpdateMembership: {
          method: "PUT",
          params: {
            org: { required: true, type: "string" },
            role: { enum: ["admin", "member"], type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/memberships/:username"
        },
        blockUser: {
          method: "PUT",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/blocks/:username"
        },
        checkBlockedUser: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/blocks/:username"
        },
        checkMembership: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/members/:username"
        },
        checkPublicMembership: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/public_members/:username"
        },
        concealMembership: {
          method: "DELETE",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/public_members/:username"
        },
        convertMemberToOutsideCollaborator: {
          method: "PUT",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/outside_collaborators/:username"
        },
        createHook: {
          method: "POST",
          params: {
            active: { type: "boolean" },
            config: { required: true, type: "object" },
            "config.content_type": { type: "string" },
            "config.insecure_ssl": { type: "string" },
            "config.secret": { type: "string" },
            "config.url": { required: true, type: "string" },
            events: { type: "string[]" },
            name: { required: true, type: "string" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/hooks"
        },
        createInvitation: {
          method: "POST",
          params: {
            email: { type: "string" },
            invitee_id: { type: "integer" },
            org: { required: true, type: "string" },
            role: {
              enum: ["admin", "direct_member", "billing_manager"],
              type: "string"
            },
            team_ids: { type: "integer[]" }
          },
          url: "/orgs/:org/invitations"
        },
        deleteHook: {
          method: "DELETE",
          params: {
            hook_id: { required: true, type: "integer" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/hooks/:hook_id"
        },
        get: {
          method: "GET",
          params: { org: { required: true, type: "string" } },
          url: "/orgs/:org"
        },
        getHook: {
          method: "GET",
          params: {
            hook_id: { required: true, type: "integer" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/hooks/:hook_id"
        },
        getMembership: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/memberships/:username"
        },
        getMembershipForAuthenticatedUser: {
          method: "GET",
          params: { org: { required: true, type: "string" } },
          url: "/user/memberships/orgs/:org"
        },
        list: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" }
          },
          url: "/organizations"
        },
        listBlockedUsers: {
          method: "GET",
          params: { org: { required: true, type: "string" } },
          url: "/orgs/:org/blocks"
        },
        listForAuthenticatedUser: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/orgs"
        },
        listForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/orgs"
        },
        listHooks: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/hooks"
        },
        listInstallations: {
          headers: {
            accept: "application/vnd.github.machine-man-preview+json"
          },
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/installations"
        },
        listInvitationTeams: {
          method: "GET",
          params: {
            invitation_id: { required: true, type: "integer" },
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/invitations/:invitation_id/teams"
        },
        listMembers: {
          method: "GET",
          params: {
            filter: { enum: ["2fa_disabled", "all"], type: "string" },
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            role: { enum: ["all", "admin", "member"], type: "string" }
          },
          url: "/orgs/:org/members"
        },
        listMemberships: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            state: { enum: ["active", "pending"], type: "string" }
          },
          url: "/user/memberships/orgs"
        },
        listOutsideCollaborators: {
          method: "GET",
          params: {
            filter: { enum: ["2fa_disabled", "all"], type: "string" },
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/outside_collaborators"
        },
        listPendingInvitations: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/invitations"
        },
        listPublicMembers: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/public_members"
        },
        pingHook: {
          method: "POST",
          params: {
            hook_id: { required: true, type: "integer" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/hooks/:hook_id/pings"
        },
        publicizeMembership: {
          method: "PUT",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/public_members/:username"
        },
        removeMember: {
          method: "DELETE",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/members/:username"
        },
        removeMembership: {
          method: "DELETE",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/memberships/:username"
        },
        removeOutsideCollaborator: {
          method: "DELETE",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/outside_collaborators/:username"
        },
        unblockUser: {
          method: "DELETE",
          params: {
            org: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/orgs/:org/blocks/:username"
        },
        update: {
          method: "PATCH",
          params: {
            billing_email: { type: "string" },
            company: { type: "string" },
            default_repository_permission: {
              enum: ["read", "write", "admin", "none"],
              type: "string"
            },
            description: { type: "string" },
            email: { type: "string" },
            has_organization_projects: { type: "boolean" },
            has_repository_projects: { type: "boolean" },
            location: { type: "string" },
            members_allowed_repository_creation_type: {
              enum: ["all", "private", "none"],
              type: "string"
            },
            members_can_create_repositories: { type: "boolean" },
            name: { type: "string" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org"
        },
        updateHook: {
          method: "PATCH",
          params: {
            active: { type: "boolean" },
            config: { type: "object" },
            "config.content_type": { type: "string" },
            "config.insecure_ssl": { type: "string" },
            "config.secret": { type: "string" },
            "config.url": { required: true, type: "string" },
            events: { type: "string[]" },
            hook_id: { required: true, type: "integer" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/hooks/:hook_id"
        },
        updateMembership: {
          method: "PATCH",
          params: {
            org: { required: true, type: "string" },
            state: { enum: ["active"], required: true, type: "string" }
          },
          url: "/user/memberships/orgs/:org"
        }
      },
      projects: {
        addCollaborator: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "PUT",
          params: {
            permission: { enum: ["read", "write", "admin"], type: "string" },
            project_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/projects/:project_id/collaborators/:username"
        },
        createCard: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "POST",
          params: {
            column_id: { required: true, type: "integer" },
            content_id: { type: "integer" },
            content_type: { type: "string" },
            note: { type: "string" }
          },
          url: "/projects/columns/:column_id/cards"
        },
        createColumn: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "POST",
          params: {
            name: { required: true, type: "string" },
            project_id: { required: true, type: "integer" }
          },
          url: "/projects/:project_id/columns"
        },
        createForAuthenticatedUser: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "POST",
          params: {
            body: { type: "string" },
            name: { required: true, type: "string" }
          },
          url: "/user/projects"
        },
        createForOrg: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "POST",
          params: {
            body: { type: "string" },
            name: { required: true, type: "string" },
            org: { required: true, type: "string" }
          },
          url: "/orgs/:org/projects"
        },
        createForRepo: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "POST",
          params: {
            body: { type: "string" },
            name: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/projects"
        },
        delete: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "DELETE",
          params: { project_id: { required: true, type: "integer" } },
          url: "/projects/:project_id"
        },
        deleteCard: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "DELETE",
          params: { card_id: { required: true, type: "integer" } },
          url: "/projects/columns/cards/:card_id"
        },
        deleteColumn: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "DELETE",
          params: { column_id: { required: true, type: "integer" } },
          url: "/projects/columns/:column_id"
        },
        get: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            project_id: { required: true, type: "integer" }
          },
          url: "/projects/:project_id"
        },
        getCard: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: { card_id: { required: true, type: "integer" } },
          url: "/projects/columns/cards/:card_id"
        },
        getColumn: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: { column_id: { required: true, type: "integer" } },
          url: "/projects/columns/:column_id"
        },
        listCards: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            archived_state: {
              enum: ["all", "archived", "not_archived"],
              type: "string"
            },
            column_id: { required: true, type: "integer" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/projects/columns/:column_id/cards"
        },
        listCollaborators: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            affiliation: { enum: ["outside", "direct", "all"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            project_id: { required: true, type: "integer" }
          },
          url: "/projects/:project_id/collaborators"
        },
        listColumns: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            project_id: { required: true, type: "integer" }
          },
          url: "/projects/:project_id/columns"
        },
        listForOrg: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/orgs/:org/projects"
        },
        listForRepo: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/repos/:owner/:repo/projects"
        },
        listForUser: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            state: { enum: ["open", "closed", "all"], type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/projects"
        },
        moveCard: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "POST",
          params: {
            card_id: { required: true, type: "integer" },
            column_id: { type: "integer" },
            position: {
              required: true,
              type: "string",
              validation: "^(top|bottom|after:\\d+)$"
            }
          },
          url: "/projects/columns/cards/:card_id/moves"
        },
        moveColumn: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "POST",
          params: {
            column_id: { required: true, type: "integer" },
            position: {
              required: true,
              type: "string",
              validation: "^(first|last|after:\\d+)$"
            }
          },
          url: "/projects/columns/:column_id/moves"
        },
        removeCollaborator: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "DELETE",
          params: {
            project_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/projects/:project_id/collaborators/:username"
        },
        reviewUserPermissionLevel: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            project_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/projects/:project_id/collaborators/:username/permission"
        },
        update: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "PATCH",
          params: {
            body: { type: "string" },
            name: { type: "string" },
            organization_permission: { type: "string" },
            private: { type: "boolean" },
            project_id: { required: true, type: "integer" },
            state: { enum: ["open", "closed"], type: "string" }
          },
          url: "/projects/:project_id"
        },
        updateCard: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "PATCH",
          params: {
            archived: { type: "boolean" },
            card_id: { required: true, type: "integer" },
            note: { type: "string" }
          },
          url: "/projects/columns/cards/:card_id"
        },
        updateColumn: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "PATCH",
          params: {
            column_id: { required: true, type: "integer" },
            name: { required: true, type: "string" }
          },
          url: "/projects/columns/:column_id"
        }
      },
      pulls: {
        checkIfMerged: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/merge"
        },
        create: {
          method: "POST",
          params: {
            base: { required: true, type: "string" },
            body: { type: "string" },
            draft: { type: "boolean" },
            head: { required: true, type: "string" },
            maintainer_can_modify: { type: "boolean" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            title: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls"
        },
        createComment: {
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            commit_id: { required: true, type: "string" },
            in_reply_to: {
              deprecated: true,
              description:
                "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
              type: "integer"
            },
            line: { type: "integer" },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            path: { required: true, type: "string" },
            position: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            side: { enum: ["LEFT", "RIGHT"], type: "string" },
            start_line: { type: "integer" },
            start_side: { enum: ["LEFT", "RIGHT", "side"], type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/comments"
        },
        createCommentReply: {
          deprecated:
            "octokit.pulls.createCommentReply() has been renamed to octokit.pulls.createComment() (2019-09-09)",
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            commit_id: { required: true, type: "string" },
            in_reply_to: {
              deprecated: true,
              description:
                "The comment ID to reply to. **Note**: This must be the ID of a top-level comment, not a reply to that comment. Replies to replies are not supported.",
              type: "integer"
            },
            line: { type: "integer" },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            path: { required: true, type: "string" },
            position: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            side: { enum: ["LEFT", "RIGHT"], type: "string" },
            start_line: { type: "integer" },
            start_side: { enum: ["LEFT", "RIGHT", "side"], type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/comments"
        },
        createFromIssue: {
          deprecated:
            "octokit.pulls.createFromIssue() is deprecated, see https://developer.github.com/v3/pulls/#create-a-pull-request",
          method: "POST",
          params: {
            base: { required: true, type: "string" },
            draft: { type: "boolean" },
            head: { required: true, type: "string" },
            issue: { required: true, type: "integer" },
            maintainer_can_modify: { type: "boolean" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls"
        },
        createReview: {
          method: "POST",
          params: {
            body: { type: "string" },
            comments: { type: "object[]" },
            "comments[].body": { required: true, type: "string" },
            "comments[].path": { required: true, type: "string" },
            "comments[].position": { required: true, type: "integer" },
            commit_id: { type: "string" },
            event: {
              enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
              type: "string"
            },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews"
        },
        createReviewCommentReply: {
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/pulls/:pull_number/comments/:comment_id/replies"
        },
        createReviewRequest: {
          method: "POST",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            reviewers: { type: "string[]" },
            team_reviewers: { type: "string[]" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
        },
        deleteComment: {
          method: "DELETE",
          params: {
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id"
        },
        deletePendingReview: {
          method: "DELETE",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            review_id: { required: true, type: "integer" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
        },
        deleteReviewRequest: {
          method: "DELETE",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            reviewers: { type: "string[]" },
            team_reviewers: { type: "string[]" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
        },
        dismissReview: {
          method: "PUT",
          params: {
            message: { required: true, type: "string" },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            review_id: { required: true, type: "integer" }
          },
          url:
            "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/dismissals"
        },
        get: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number"
        },
        getComment: {
          method: "GET",
          params: {
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id"
        },
        getCommentsForReview: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            review_id: { required: true, type: "integer" }
          },
          url:
            "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/comments"
        },
        getReview: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            review_id: { required: true, type: "integer" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
        },
        list: {
          method: "GET",
          params: {
            base: { type: "string" },
            direction: { enum: ["asc", "desc"], type: "string" },
            head: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            sort: {
              enum: ["created", "updated", "popularity", "long-running"],
              type: "string"
            },
            state: { enum: ["open", "closed", "all"], type: "string" }
          },
          url: "/repos/:owner/:repo/pulls"
        },
        listComments: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            since: { type: "string" },
            sort: { enum: ["created", "updated"], type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/comments"
        },
        listCommentsForRepo: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            since: { type: "string" },
            sort: { enum: ["created", "updated"], type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/comments"
        },
        listCommits: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/commits"
        },
        listFiles: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/files"
        },
        listReviewRequests: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/requested_reviewers"
        },
        listReviews: {
          method: "GET",
          params: {
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews"
        },
        merge: {
          method: "PUT",
          params: {
            commit_message: { type: "string" },
            commit_title: { type: "string" },
            merge_method: {
              enum: ["merge", "squash", "rebase"],
              type: "string"
            },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            sha: { type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/merge"
        },
        submitReview: {
          method: "POST",
          params: {
            body: { type: "string" },
            event: {
              enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
              required: true,
              type: "string"
            },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            review_id: { required: true, type: "integer" }
          },
          url:
            "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id/events"
        },
        update: {
          method: "PATCH",
          params: {
            base: { type: "string" },
            body: { type: "string" },
            maintainer_can_modify: { type: "boolean" },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            state: { enum: ["open", "closed"], type: "string" },
            title: { type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number"
        },
        updateBranch: {
          headers: { accept: "application/vnd.github.lydian-preview+json" },
          method: "PUT",
          params: {
            expected_head_sha: { type: "string" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/update-branch"
        },
        updateComment: {
          method: "PATCH",
          params: {
            body: { required: true, type: "string" },
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id"
        },
        updateReview: {
          method: "PUT",
          params: {
            body: { required: true, type: "string" },
            number: { alias: "pull_number", deprecated: true, type: "integer" },
            owner: { required: true, type: "string" },
            pull_number: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            review_id: { required: true, type: "integer" }
          },
          url: "/repos/:owner/:repo/pulls/:pull_number/reviews/:review_id"
        }
      },
      rateLimit: { get: { method: "GET", params: {}, url: "/rate_limit" } },
      reactions: {
        createForCommitComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_id: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              required: true,
              type: "string"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/comments/:comment_id/reactions"
        },
        createForIssue: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              required: true,
              type: "string"
            },
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/reactions"
        },
        createForIssueComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_id: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              required: true,
              type: "string"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions"
        },
        createForPullRequestReviewComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_id: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              required: true,
              type: "string"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions"
        },
        createForTeamDiscussion: {
          headers: {
            accept:
              "application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              required: true,
              type: "string"
            },
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/discussions/:discussion_number/reactions"
        },
        createForTeamDiscussionComment: {
          headers: {
            accept:
              "application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json"
          },
          method: "POST",
          params: {
            comment_number: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              required: true,
              type: "string"
            },
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url:
            "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
        },
        delete: {
          headers: {
            accept:
              "application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json"
          },
          method: "DELETE",
          params: { reaction_id: { required: true, type: "integer" } },
          url: "/reactions/:reaction_id"
        },
        listForCommitComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_id: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              type: "string"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/comments/:comment_id/reactions"
        },
        listForIssue: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              type: "string"
            },
            issue_number: { required: true, type: "integer" },
            number: {
              alias: "issue_number",
              deprecated: true,
              type: "integer"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/:issue_number/reactions"
        },
        listForIssueComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_id: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              type: "string"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/issues/comments/:comment_id/reactions"
        },
        listForPullRequestReviewComment: {
          headers: {
            accept: "application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_id: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              type: "string"
            },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pulls/comments/:comment_id/reactions"
        },
        listForTeamDiscussion: {
          headers: {
            accept:
              "application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              type: "string"
            },
            discussion_number: { required: true, type: "integer" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/discussions/:discussion_number/reactions"
        },
        listForTeamDiscussionComment: {
          headers: {
            accept:
              "application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json"
          },
          method: "GET",
          params: {
            comment_number: { required: true, type: "integer" },
            content: {
              enum: [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "rocket",
                "eyes"
              ],
              type: "string"
            },
            discussion_number: { required: true, type: "integer" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url:
            "/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions"
        }
      },
      repos: {
        acceptInvitation: {
          method: "PATCH",
          params: { invitation_id: { required: true, type: "integer" } },
          url: "/user/repository_invitations/:invitation_id"
        },
        addCollaborator: {
          method: "PUT",
          params: {
            owner: { required: true, type: "string" },
            permission: { enum: ["pull", "push", "admin"], type: "string" },
            repo: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/collaborators/:username"
        },
        addDeployKey: {
          method: "POST",
          params: {
            key: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            read_only: { type: "boolean" },
            repo: { required: true, type: "string" },
            title: { type: "string" }
          },
          url: "/repos/:owner/:repo/keys"
        },
        addProtectedBranchAdminEnforcement: {
          method: "POST",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
        },
        addProtectedBranchAppRestrictions: {
          method: "POST",
          params: {
            apps: { mapTo: "data", required: true, type: "string[]" },
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        addProtectedBranchRequiredSignatures: {
          headers: { accept: "application/vnd.github.zzzax-preview+json" },
          method: "POST",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
        },
        addProtectedBranchRequiredStatusChecksContexts: {
          method: "POST",
          params: {
            branch: { required: true, type: "string" },
            contexts: { mapTo: "data", required: true, type: "string[]" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        addProtectedBranchTeamRestrictions: {
          method: "POST",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            teams: { mapTo: "data", required: true, type: "string[]" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        addProtectedBranchUserRestrictions: {
          method: "POST",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            users: { mapTo: "data", required: true, type: "string[]" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        checkCollaborator: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/collaborators/:username"
        },
        checkVulnerabilityAlerts: {
          headers: { accept: "application/vnd.github.dorian-preview+json" },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/vulnerability-alerts"
        },
        compareCommits: {
          method: "GET",
          params: {
            base: { required: true, type: "string" },
            head: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/compare/:base...:head"
        },
        createCommitComment: {
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            commit_sha: { required: true, type: "string" },
            line: { type: "integer" },
            owner: { required: true, type: "string" },
            path: { type: "string" },
            position: { type: "integer" },
            repo: { required: true, type: "string" },
            sha: { alias: "commit_sha", deprecated: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/comments"
        },
        createDeployment: {
          method: "POST",
          params: {
            auto_merge: { type: "boolean" },
            description: { type: "string" },
            environment: { type: "string" },
            owner: { required: true, type: "string" },
            payload: { type: "string" },
            production_environment: { type: "boolean" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            required_contexts: { type: "string[]" },
            task: { type: "string" },
            transient_environment: { type: "boolean" }
          },
          url: "/repos/:owner/:repo/deployments"
        },
        createDeploymentStatus: {
          method: "POST",
          params: {
            auto_inactive: { type: "boolean" },
            deployment_id: { required: true, type: "integer" },
            description: { type: "string" },
            environment: {
              enum: ["production", "staging", "qa"],
              type: "string"
            },
            environment_url: { type: "string" },
            log_url: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            state: {
              enum: [
                "error",
                "failure",
                "inactive",
                "in_progress",
                "queued",
                "pending",
                "success"
              ],
              required: true,
              type: "string"
            },
            target_url: { type: "string" }
          },
          url: "/repos/:owner/:repo/deployments/:deployment_id/statuses"
        },
        createDispatchEvent: {
          headers: { accept: "application/vnd.github.everest-preview+json" },
          method: "POST",
          params: {
            client_payload: { type: "object" },
            event_type: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/dispatches"
        },
        createFile: {
          deprecated:
            "octokit.repos.createFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
          method: "PUT",
          params: {
            author: { type: "object" },
            "author.email": { required: true, type: "string" },
            "author.name": { required: true, type: "string" },
            branch: { type: "string" },
            committer: { type: "object" },
            "committer.email": { required: true, type: "string" },
            "committer.name": { required: true, type: "string" },
            content: { required: true, type: "string" },
            message: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            path: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { type: "string" }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        createForAuthenticatedUser: {
          method: "POST",
          params: {
            allow_merge_commit: { type: "boolean" },
            allow_rebase_merge: { type: "boolean" },
            allow_squash_merge: { type: "boolean" },
            auto_init: { type: "boolean" },
            description: { type: "string" },
            gitignore_template: { type: "string" },
            has_issues: { type: "boolean" },
            has_projects: { type: "boolean" },
            has_wiki: { type: "boolean" },
            homepage: { type: "string" },
            is_template: { type: "boolean" },
            license_template: { type: "string" },
            name: { required: true, type: "string" },
            private: { type: "boolean" },
            team_id: { type: "integer" }
          },
          url: "/user/repos"
        },
        createFork: {
          method: "POST",
          params: {
            organization: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/forks"
        },
        createHook: {
          method: "POST",
          params: {
            active: { type: "boolean" },
            config: { required: true, type: "object" },
            "config.content_type": { type: "string" },
            "config.insecure_ssl": { type: "string" },
            "config.secret": { type: "string" },
            "config.url": { required: true, type: "string" },
            events: { type: "string[]" },
            name: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/hooks"
        },
        createInOrg: {
          method: "POST",
          params: {
            allow_merge_commit: { type: "boolean" },
            allow_rebase_merge: { type: "boolean" },
            allow_squash_merge: { type: "boolean" },
            auto_init: { type: "boolean" },
            description: { type: "string" },
            gitignore_template: { type: "string" },
            has_issues: { type: "boolean" },
            has_projects: { type: "boolean" },
            has_wiki: { type: "boolean" },
            homepage: { type: "string" },
            is_template: { type: "boolean" },
            license_template: { type: "string" },
            name: { required: true, type: "string" },
            org: { required: true, type: "string" },
            private: { type: "boolean" },
            team_id: { type: "integer" }
          },
          url: "/orgs/:org/repos"
        },
        createOrUpdateFile: {
          method: "PUT",
          params: {
            author: { type: "object" },
            "author.email": { required: true, type: "string" },
            "author.name": { required: true, type: "string" },
            branch: { type: "string" },
            committer: { type: "object" },
            "committer.email": { required: true, type: "string" },
            "committer.name": { required: true, type: "string" },
            content: { required: true, type: "string" },
            message: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            path: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { type: "string" }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        createRelease: {
          method: "POST",
          params: {
            body: { type: "string" },
            draft: { type: "boolean" },
            name: { type: "string" },
            owner: { required: true, type: "string" },
            prerelease: { type: "boolean" },
            repo: { required: true, type: "string" },
            tag_name: { required: true, type: "string" },
            target_commitish: { type: "string" }
          },
          url: "/repos/:owner/:repo/releases"
        },
        createStatus: {
          method: "POST",
          params: {
            context: { type: "string" },
            description: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { required: true, type: "string" },
            state: {
              enum: ["error", "failure", "pending", "success"],
              required: true,
              type: "string"
            },
            target_url: { type: "string" }
          },
          url: "/repos/:owner/:repo/statuses/:sha"
        },
        createUsingTemplate: {
          headers: { accept: "application/vnd.github.baptiste-preview+json" },
          method: "POST",
          params: {
            description: { type: "string" },
            name: { required: true, type: "string" },
            owner: { type: "string" },
            private: { type: "boolean" },
            template_owner: { required: true, type: "string" },
            template_repo: { required: true, type: "string" }
          },
          url: "/repos/:template_owner/:template_repo/generate"
        },
        declineInvitation: {
          method: "DELETE",
          params: { invitation_id: { required: true, type: "integer" } },
          url: "/user/repository_invitations/:invitation_id"
        },
        delete: {
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo"
        },
        deleteCommitComment: {
          method: "DELETE",
          params: {
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/comments/:comment_id"
        },
        deleteDownload: {
          method: "DELETE",
          params: {
            download_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/downloads/:download_id"
        },
        deleteFile: {
          method: "DELETE",
          params: {
            author: { type: "object" },
            "author.email": { type: "string" },
            "author.name": { type: "string" },
            branch: { type: "string" },
            committer: { type: "object" },
            "committer.email": { type: "string" },
            "committer.name": { type: "string" },
            message: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            path: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        deleteHook: {
          method: "DELETE",
          params: {
            hook_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id"
        },
        deleteInvitation: {
          method: "DELETE",
          params: {
            invitation_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/invitations/:invitation_id"
        },
        deleteRelease: {
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            release_id: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/:release_id"
        },
        deleteReleaseAsset: {
          method: "DELETE",
          params: {
            asset_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/assets/:asset_id"
        },
        disableAutomatedSecurityFixes: {
          headers: { accept: "application/vnd.github.london-preview+json" },
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/automated-security-fixes"
        },
        disablePagesSite: {
          headers: { accept: "application/vnd.github.switcheroo-preview+json" },
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pages"
        },
        disableVulnerabilityAlerts: {
          headers: { accept: "application/vnd.github.dorian-preview+json" },
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/vulnerability-alerts"
        },
        enableAutomatedSecurityFixes: {
          headers: { accept: "application/vnd.github.london-preview+json" },
          method: "PUT",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/automated-security-fixes"
        },
        enablePagesSite: {
          headers: { accept: "application/vnd.github.switcheroo-preview+json" },
          method: "POST",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            source: { type: "object" },
            "source.branch": { enum: ["master", "gh-pages"], type: "string" },
            "source.path": { type: "string" }
          },
          url: "/repos/:owner/:repo/pages"
        },
        enableVulnerabilityAlerts: {
          headers: { accept: "application/vnd.github.dorian-preview+json" },
          method: "PUT",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/vulnerability-alerts"
        },
        get: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo"
        },
        getAppsWithAccessToProtectedBranch: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        getArchiveLink: {
          method: "GET",
          params: {
            archive_format: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/:archive_format/:ref"
        },
        getBranch: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch"
        },
        getBranchProtection: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection"
        },
        getClones: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            per: { enum: ["day", "week"], type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/traffic/clones"
        },
        getCodeFrequencyStats: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/stats/code_frequency"
        },
        getCollaboratorPermissionLevel: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/collaborators/:username/permission"
        },
        getCombinedStatusForRef: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:ref/status"
        },
        getCommit: {
          method: "GET",
          params: {
            commit_sha: { alias: "ref", deprecated: true, type: "string" },
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { alias: "ref", deprecated: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:ref"
        },
        getCommitActivityStats: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/stats/commit_activity"
        },
        getCommitComment: {
          method: "GET",
          params: {
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/comments/:comment_id"
        },
        getCommitRefSha: {
          deprecated:
            "octokit.repos.getCommitRefSha() is deprecated, see https://developer.github.com/v3/repos/commits/#get-a-single-commit",
          headers: { accept: "application/vnd.github.v3.sha" },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:ref"
        },
        getContents: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            path: { required: true, type: "string" },
            ref: { type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        getContributorsStats: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/stats/contributors"
        },
        getDeployKey: {
          method: "GET",
          params: {
            key_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/keys/:key_id"
        },
        getDeployment: {
          method: "GET",
          params: {
            deployment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/deployments/:deployment_id"
        },
        getDeploymentStatus: {
          method: "GET",
          params: {
            deployment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            status_id: { required: true, type: "integer" }
          },
          url:
            "/repos/:owner/:repo/deployments/:deployment_id/statuses/:status_id"
        },
        getDownload: {
          method: "GET",
          params: {
            download_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/downloads/:download_id"
        },
        getHook: {
          method: "GET",
          params: {
            hook_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id"
        },
        getLatestPagesBuild: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pages/builds/latest"
        },
        getLatestRelease: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/latest"
        },
        getPages: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pages"
        },
        getPagesBuild: {
          method: "GET",
          params: {
            build_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pages/builds/:build_id"
        },
        getParticipationStats: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/stats/participation"
        },
        getProtectedBranchAdminEnforcement: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
        },
        getProtectedBranchPullRequestReviewEnforcement: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
        },
        getProtectedBranchRequiredSignatures: {
          headers: { accept: "application/vnd.github.zzzax-preview+json" },
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
        },
        getProtectedBranchRequiredStatusChecks: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
        },
        getProtectedBranchRestrictions: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions"
        },
        getPunchCardStats: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/stats/punch_card"
        },
        getReadme: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            ref: { type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/readme"
        },
        getRelease: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            release_id: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/:release_id"
        },
        getReleaseAsset: {
          method: "GET",
          params: {
            asset_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/assets/:asset_id"
        },
        getReleaseByTag: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            tag: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/tags/:tag"
        },
        getTeamsWithAccessToProtectedBranch: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        getTopPaths: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/traffic/popular/paths"
        },
        getTopReferrers: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/traffic/popular/referrers"
        },
        getUsersWithAccessToProtectedBranch: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        getViews: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            per: { enum: ["day", "week"], type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/traffic/views"
        },
        list: {
          method: "GET",
          params: {
            affiliation: { type: "string" },
            direction: { enum: ["asc", "desc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            sort: {
              enum: ["created", "updated", "pushed", "full_name"],
              type: "string"
            },
            type: {
              enum: ["all", "owner", "public", "private", "member"],
              type: "string"
            },
            visibility: { enum: ["all", "public", "private"], type: "string" }
          },
          url: "/user/repos"
        },
        listAppsWithAccessToProtectedBranch: {
          deprecated:
            "octokit.repos.listAppsWithAccessToProtectedBranch() has been renamed to octokit.repos.getAppsWithAccessToProtectedBranch() (2019-09-13)",
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        listAssetsForRelease: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            release_id: { required: true, type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/:release_id/assets"
        },
        listBranches: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            protected: { type: "boolean" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches"
        },
        listBranchesForHeadCommit: {
          headers: { accept: "application/vnd.github.groot-preview+json" },
          method: "GET",
          params: {
            commit_sha: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/branches-where-head"
        },
        listCollaborators: {
          method: "GET",
          params: {
            affiliation: { enum: ["outside", "direct", "all"], type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/collaborators"
        },
        listCommentsForCommit: {
          method: "GET",
          params: {
            commit_sha: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            ref: { alias: "commit_sha", deprecated: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/comments"
        },
        listCommitComments: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/comments"
        },
        listCommits: {
          method: "GET",
          params: {
            author: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            path: { type: "string" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            sha: { type: "string" },
            since: { type: "string" },
            until: { type: "string" }
          },
          url: "/repos/:owner/:repo/commits"
        },
        listContributors: {
          method: "GET",
          params: {
            anon: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/contributors"
        },
        listDeployKeys: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/keys"
        },
        listDeploymentStatuses: {
          method: "GET",
          params: {
            deployment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/deployments/:deployment_id/statuses"
        },
        listDeployments: {
          method: "GET",
          params: {
            environment: { type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            ref: { type: "string" },
            repo: { required: true, type: "string" },
            sha: { type: "string" },
            task: { type: "string" }
          },
          url: "/repos/:owner/:repo/deployments"
        },
        listDownloads: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/downloads"
        },
        listForOrg: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            sort: {
              enum: ["created", "updated", "pushed", "full_name"],
              type: "string"
            },
            type: {
              enum: ["all", "public", "private", "forks", "sources", "member"],
              type: "string"
            }
          },
          url: "/orgs/:org/repos"
        },
        listForUser: {
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            sort: {
              enum: ["created", "updated", "pushed", "full_name"],
              type: "string"
            },
            type: { enum: ["all", "owner", "member"], type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/repos"
        },
        listForks: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" },
            sort: { enum: ["newest", "oldest", "stargazers"], type: "string" }
          },
          url: "/repos/:owner/:repo/forks"
        },
        listHooks: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/hooks"
        },
        listInvitations: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/invitations"
        },
        listInvitationsForAuthenticatedUser: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/repository_invitations"
        },
        listLanguages: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/languages"
        },
        listPagesBuilds: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pages/builds"
        },
        listProtectedBranchRequiredStatusChecksContexts: {
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        listProtectedBranchTeamRestrictions: {
          deprecated:
            "octokit.repos.listProtectedBranchTeamRestrictions() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-09)",
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        listProtectedBranchUserRestrictions: {
          deprecated:
            "octokit.repos.listProtectedBranchUserRestrictions() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-09)",
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        listPublic: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" }
          },
          url: "/repositories"
        },
        listPullRequestsAssociatedWithCommit: {
          headers: { accept: "application/vnd.github.groot-preview+json" },
          method: "GET",
          params: {
            commit_sha: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:commit_sha/pulls"
        },
        listReleases: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases"
        },
        listStatusesForRef: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            ref: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/commits/:ref/statuses"
        },
        listTags: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/tags"
        },
        listTeams: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/teams"
        },
        listTeamsWithAccessToProtectedBranch: {
          deprecated:
            "octokit.repos.listTeamsWithAccessToProtectedBranch() has been renamed to octokit.repos.getTeamsWithAccessToProtectedBranch() (2019-09-13)",
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        listTopics: {
          headers: { accept: "application/vnd.github.mercy-preview+json" },
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/topics"
        },
        listUsersWithAccessToProtectedBranch: {
          deprecated:
            "octokit.repos.listUsersWithAccessToProtectedBranch() has been renamed to octokit.repos.getUsersWithAccessToProtectedBranch() (2019-09-13)",
          method: "GET",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        merge: {
          method: "POST",
          params: {
            base: { required: true, type: "string" },
            commit_message: { type: "string" },
            head: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/merges"
        },
        pingHook: {
          method: "POST",
          params: {
            hook_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id/pings"
        },
        removeBranchProtection: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection"
        },
        removeCollaborator: {
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/collaborators/:username"
        },
        removeDeployKey: {
          method: "DELETE",
          params: {
            key_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/keys/:key_id"
        },
        removeProtectedBranchAdminEnforcement: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/enforce_admins"
        },
        removeProtectedBranchAppRestrictions: {
          method: "DELETE",
          params: {
            apps: { mapTo: "data", required: true, type: "string[]" },
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        removeProtectedBranchPullRequestReviewEnforcement: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
        },
        removeProtectedBranchRequiredSignatures: {
          headers: { accept: "application/vnd.github.zzzax-preview+json" },
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_signatures"
        },
        removeProtectedBranchRequiredStatusChecks: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
        },
        removeProtectedBranchRequiredStatusChecksContexts: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            contexts: { mapTo: "data", required: true, type: "string[]" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        removeProtectedBranchRestrictions: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection/restrictions"
        },
        removeProtectedBranchTeamRestrictions: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            teams: { mapTo: "data", required: true, type: "string[]" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        removeProtectedBranchUserRestrictions: {
          method: "DELETE",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            users: { mapTo: "data", required: true, type: "string[]" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        replaceProtectedBranchAppRestrictions: {
          method: "PUT",
          params: {
            apps: { mapTo: "data", required: true, type: "string[]" },
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/apps"
        },
        replaceProtectedBranchRequiredStatusChecksContexts: {
          method: "PUT",
          params: {
            branch: { required: true, type: "string" },
            contexts: { mapTo: "data", required: true, type: "string[]" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts"
        },
        replaceProtectedBranchTeamRestrictions: {
          method: "PUT",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            teams: { mapTo: "data", required: true, type: "string[]" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/teams"
        },
        replaceProtectedBranchUserRestrictions: {
          method: "PUT",
          params: {
            branch: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            users: { mapTo: "data", required: true, type: "string[]" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/restrictions/users"
        },
        replaceTopics: {
          headers: { accept: "application/vnd.github.mercy-preview+json" },
          method: "PUT",
          params: {
            names: { required: true, type: "string[]" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/topics"
        },
        requestPageBuild: {
          method: "POST",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/pages/builds"
        },
        retrieveCommunityProfileMetrics: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/community/profile"
        },
        testPushHook: {
          method: "POST",
          params: {
            hook_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id/tests"
        },
        transfer: {
          headers: { accept: "application/vnd.github.nightshade-preview+json" },
          method: "POST",
          params: {
            new_owner: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            team_ids: { type: "integer[]" }
          },
          url: "/repos/:owner/:repo/transfer"
        },
        update: {
          method: "PATCH",
          params: {
            allow_merge_commit: { type: "boolean" },
            allow_rebase_merge: { type: "boolean" },
            allow_squash_merge: { type: "boolean" },
            archived: { type: "boolean" },
            default_branch: { type: "string" },
            description: { type: "string" },
            has_issues: { type: "boolean" },
            has_projects: { type: "boolean" },
            has_wiki: { type: "boolean" },
            homepage: { type: "string" },
            is_template: { type: "boolean" },
            name: { type: "string" },
            owner: { required: true, type: "string" },
            private: { type: "boolean" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo"
        },
        updateBranchProtection: {
          method: "PUT",
          params: {
            branch: { required: true, type: "string" },
            enforce_admins: {
              allowNull: true,
              required: true,
              type: "boolean"
            },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            required_pull_request_reviews: {
              allowNull: true,
              required: true,
              type: "object"
            },
            "required_pull_request_reviews.dismiss_stale_reviews": {
              type: "boolean"
            },
            "required_pull_request_reviews.dismissal_restrictions": {
              type: "object"
            },
            "required_pull_request_reviews.dismissal_restrictions.teams": {
              type: "string[]"
            },
            "required_pull_request_reviews.dismissal_restrictions.users": {
              type: "string[]"
            },
            "required_pull_request_reviews.require_code_owner_reviews": {
              type: "boolean"
            },
            "required_pull_request_reviews.required_approving_review_count": {
              type: "integer"
            },
            required_status_checks: {
              allowNull: true,
              required: true,
              type: "object"
            },
            "required_status_checks.contexts": {
              required: true,
              type: "string[]"
            },
            "required_status_checks.strict": {
              required: true,
              type: "boolean"
            },
            restrictions: { allowNull: true, required: true, type: "object" },
            "restrictions.apps": { type: "string[]" },
            "restrictions.teams": { required: true, type: "string[]" },
            "restrictions.users": { required: true, type: "string[]" }
          },
          url: "/repos/:owner/:repo/branches/:branch/protection"
        },
        updateCommitComment: {
          method: "PATCH",
          params: {
            body: { required: true, type: "string" },
            comment_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/comments/:comment_id"
        },
        updateFile: {
          deprecated:
            "octokit.repos.updateFile() has been renamed to octokit.repos.createOrUpdateFile() (2019-06-07)",
          method: "PUT",
          params: {
            author: { type: "object" },
            "author.email": { required: true, type: "string" },
            "author.name": { required: true, type: "string" },
            branch: { type: "string" },
            committer: { type: "object" },
            "committer.email": { required: true, type: "string" },
            "committer.name": { required: true, type: "string" },
            content: { required: true, type: "string" },
            message: { required: true, type: "string" },
            owner: { required: true, type: "string" },
            path: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            sha: { type: "string" }
          },
          url: "/repos/:owner/:repo/contents/:path"
        },
        updateHook: {
          method: "PATCH",
          params: {
            active: { type: "boolean" },
            add_events: { type: "string[]" },
            config: { type: "object" },
            "config.content_type": { type: "string" },
            "config.insecure_ssl": { type: "string" },
            "config.secret": { type: "string" },
            "config.url": { required: true, type: "string" },
            events: { type: "string[]" },
            hook_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            remove_events: { type: "string[]" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/hooks/:hook_id"
        },
        updateInformationAboutPagesSite: {
          method: "PUT",
          params: {
            cname: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            source: {
              enum: ['"gh-pages"', '"master"', '"master /docs"'],
              type: "string"
            }
          },
          url: "/repos/:owner/:repo/pages"
        },
        updateInvitation: {
          method: "PATCH",
          params: {
            invitation_id: { required: true, type: "integer" },
            owner: { required: true, type: "string" },
            permissions: { enum: ["read", "write", "admin"], type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/invitations/:invitation_id"
        },
        updateProtectedBranchPullRequestReviewEnforcement: {
          method: "PATCH",
          params: {
            branch: { required: true, type: "string" },
            dismiss_stale_reviews: { type: "boolean" },
            dismissal_restrictions: { type: "object" },
            "dismissal_restrictions.teams": { type: "string[]" },
            "dismissal_restrictions.users": { type: "string[]" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            require_code_owner_reviews: { type: "boolean" },
            required_approving_review_count: { type: "integer" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews"
        },
        updateProtectedBranchRequiredStatusChecks: {
          method: "PATCH",
          params: {
            branch: { required: true, type: "string" },
            contexts: { type: "string[]" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            strict: { type: "boolean" }
          },
          url:
            "/repos/:owner/:repo/branches/:branch/protection/required_status_checks"
        },
        updateRelease: {
          method: "PATCH",
          params: {
            body: { type: "string" },
            draft: { type: "boolean" },
            name: { type: "string" },
            owner: { required: true, type: "string" },
            prerelease: { type: "boolean" },
            release_id: { required: true, type: "integer" },
            repo: { required: true, type: "string" },
            tag_name: { type: "string" },
            target_commitish: { type: "string" }
          },
          url: "/repos/:owner/:repo/releases/:release_id"
        },
        updateReleaseAsset: {
          method: "PATCH",
          params: {
            asset_id: { required: true, type: "integer" },
            label: { type: "string" },
            name: { type: "string" },
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" }
          },
          url: "/repos/:owner/:repo/releases/assets/:asset_id"
        },
        uploadReleaseAsset: {
          method: "POST",
          params: {
            file: { mapTo: "data", required: true, type: "string | object" },
            headers: { required: true, type: "object" },
            "headers.content-length": { required: true, type: "integer" },
            "headers.content-type": { required: true, type: "string" },
            label: { type: "string" },
            name: { required: true, type: "string" },
            url: { required: true, type: "string" }
          },
          url: ":url"
        }
      },
      search: {
        code: {
          method: "GET",
          params: {
            order: { enum: ["desc", "asc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            q: { required: true, type: "string" },
            sort: { enum: ["indexed"], type: "string" }
          },
          url: "/search/code"
        },
        commits: {
          headers: { accept: "application/vnd.github.cloak-preview+json" },
          method: "GET",
          params: {
            order: { enum: ["desc", "asc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            q: { required: true, type: "string" },
            sort: { enum: ["author-date", "committer-date"], type: "string" }
          },
          url: "/search/commits"
        },
        issues: {
          deprecated:
            "octokit.search.issues() has been renamed to octokit.search.issuesAndPullRequests() (2018-12-27)",
          method: "GET",
          params: {
            order: { enum: ["desc", "asc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            q: { required: true, type: "string" },
            sort: {
              enum: [
                "comments",
                "reactions",
                "reactions-+1",
                "reactions--1",
                "reactions-smile",
                "reactions-thinking_face",
                "reactions-heart",
                "reactions-tada",
                "interactions",
                "created",
                "updated"
              ],
              type: "string"
            }
          },
          url: "/search/issues"
        },
        issuesAndPullRequests: {
          method: "GET",
          params: {
            order: { enum: ["desc", "asc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            q: { required: true, type: "string" },
            sort: {
              enum: [
                "comments",
                "reactions",
                "reactions-+1",
                "reactions--1",
                "reactions-smile",
                "reactions-thinking_face",
                "reactions-heart",
                "reactions-tada",
                "interactions",
                "created",
                "updated"
              ],
              type: "string"
            }
          },
          url: "/search/issues"
        },
        labels: {
          method: "GET",
          params: {
            order: { enum: ["desc", "asc"], type: "string" },
            q: { required: true, type: "string" },
            repository_id: { required: true, type: "integer" },
            sort: { enum: ["created", "updated"], type: "string" }
          },
          url: "/search/labels"
        },
        repos: {
          method: "GET",
          params: {
            order: { enum: ["desc", "asc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            q: { required: true, type: "string" },
            sort: {
              enum: ["stars", "forks", "help-wanted-issues", "updated"],
              type: "string"
            }
          },
          url: "/search/repositories"
        },
        topics: {
          method: "GET",
          params: { q: { required: true, type: "string" } },
          url: "/search/topics"
        },
        users: {
          method: "GET",
          params: {
            order: { enum: ["desc", "asc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            q: { required: true, type: "string" },
            sort: {
              enum: ["followers", "repositories", "joined"],
              type: "string"
            }
          },
          url: "/search/users"
        }
      },
      teams: {
        addMember: {
          deprecated:
            "octokit.teams.addMember() is deprecated, see https://developer.github.com/v3/teams/members/#add-team-member",
          method: "PUT",
          params: {
            team_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/teams/:team_id/members/:username"
        },
        addOrUpdateMembership: {
          method: "PUT",
          params: {
            role: { enum: ["member", "maintainer"], type: "string" },
            team_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        addOrUpdateProject: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "PUT",
          params: {
            permission: { enum: ["read", "write", "admin"], type: "string" },
            project_id: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        addOrUpdateRepo: {
          method: "PUT",
          params: {
            owner: { required: true, type: "string" },
            permission: { enum: ["pull", "push", "admin"], type: "string" },
            repo: { required: true, type: "string" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        checkManagesRepo: {
          method: "GET",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        create: {
          method: "POST",
          params: {
            description: { type: "string" },
            maintainers: { type: "string[]" },
            name: { required: true, type: "string" },
            org: { required: true, type: "string" },
            parent_team_id: { type: "integer" },
            permission: { enum: ["pull", "push", "admin"], type: "string" },
            privacy: { enum: ["secret", "closed"], type: "string" },
            repo_names: { type: "string[]" }
          },
          url: "/orgs/:org/teams"
        },
        createDiscussion: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            private: { type: "boolean" },
            team_id: { required: true, type: "integer" },
            title: { required: true, type: "string" }
          },
          url: "/teams/:team_id/discussions"
        },
        createDiscussionComment: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "POST",
          params: {
            body: { required: true, type: "string" },
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments"
        },
        delete: {
          method: "DELETE",
          params: { team_id: { required: true, type: "integer" } },
          url: "/teams/:team_id"
        },
        deleteDiscussion: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "DELETE",
          params: {
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        deleteDiscussionComment: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "DELETE",
          params: {
            comment_number: { required: true, type: "integer" },
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url:
            "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        get: {
          method: "GET",
          params: { team_id: { required: true, type: "integer" } },
          url: "/teams/:team_id"
        },
        getByName: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            team_slug: { required: true, type: "string" }
          },
          url: "/orgs/:org/teams/:team_slug"
        },
        getDiscussion: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "GET",
          params: {
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        getDiscussionComment: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "GET",
          params: {
            comment_number: { required: true, type: "integer" },
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url:
            "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        },
        getMember: {
          deprecated:
            "octokit.teams.getMember() is deprecated, see https://developer.github.com/v3/teams/members/#get-team-member",
          method: "GET",
          params: {
            team_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/teams/:team_id/members/:username"
        },
        getMembership: {
          method: "GET",
          params: {
            team_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        list: {
          method: "GET",
          params: {
            org: { required: true, type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" }
          },
          url: "/orgs/:org/teams"
        },
        listChild: {
          headers: { accept: "application/vnd.github.hellcat-preview+json" },
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/teams"
        },
        listDiscussionComments: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            discussion_number: { required: true, type: "integer" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/discussions/:discussion_number/comments"
        },
        listDiscussions: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "GET",
          params: {
            direction: { enum: ["asc", "desc"], type: "string" },
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/discussions"
        },
        listForAuthenticatedUser: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/teams"
        },
        listMembers: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            role: { enum: ["member", "maintainer", "all"], type: "string" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/members"
        },
        listPendingInvitations: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/invitations"
        },
        listProjects: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/projects"
        },
        listRepos: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/repos"
        },
        removeMember: {
          deprecated:
            "octokit.teams.removeMember() is deprecated, see https://developer.github.com/v3/teams/members/#remove-team-member",
          method: "DELETE",
          params: {
            team_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/teams/:team_id/members/:username"
        },
        removeMembership: {
          method: "DELETE",
          params: {
            team_id: { required: true, type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/teams/:team_id/memberships/:username"
        },
        removeProject: {
          method: "DELETE",
          params: {
            project_id: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        removeRepo: {
          method: "DELETE",
          params: {
            owner: { required: true, type: "string" },
            repo: { required: true, type: "string" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/repos/:owner/:repo"
        },
        reviewProject: {
          headers: { accept: "application/vnd.github.inertia-preview+json" },
          method: "GET",
          params: {
            project_id: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id/projects/:project_id"
        },
        update: {
          method: "PATCH",
          params: {
            description: { type: "string" },
            name: { required: true, type: "string" },
            parent_team_id: { type: "integer" },
            permission: { enum: ["pull", "push", "admin"], type: "string" },
            privacy: { enum: ["secret", "closed"], type: "string" },
            team_id: { required: true, type: "integer" }
          },
          url: "/teams/:team_id"
        },
        updateDiscussion: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "PATCH",
          params: {
            body: { type: "string" },
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" },
            title: { type: "string" }
          },
          url: "/teams/:team_id/discussions/:discussion_number"
        },
        updateDiscussionComment: {
          headers: { accept: "application/vnd.github.echo-preview+json" },
          method: "PATCH",
          params: {
            body: { required: true, type: "string" },
            comment_number: { required: true, type: "integer" },
            discussion_number: { required: true, type: "integer" },
            team_id: { required: true, type: "integer" }
          },
          url:
            "/teams/:team_id/discussions/:discussion_number/comments/:comment_number"
        }
      },
      users: {
        addEmails: {
          method: "POST",
          params: { emails: { required: true, type: "string[]" } },
          url: "/user/emails"
        },
        block: {
          method: "PUT",
          params: { username: { required: true, type: "string" } },
          url: "/user/blocks/:username"
        },
        checkBlocked: {
          method: "GET",
          params: { username: { required: true, type: "string" } },
          url: "/user/blocks/:username"
        },
        checkFollowing: {
          method: "GET",
          params: { username: { required: true, type: "string" } },
          url: "/user/following/:username"
        },
        checkFollowingForUser: {
          method: "GET",
          params: {
            target_user: { required: true, type: "string" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/following/:target_user"
        },
        createGpgKey: {
          method: "POST",
          params: { armored_public_key: { type: "string" } },
          url: "/user/gpg_keys"
        },
        createPublicKey: {
          method: "POST",
          params: { key: { type: "string" }, title: { type: "string" } },
          url: "/user/keys"
        },
        deleteEmails: {
          method: "DELETE",
          params: { emails: { required: true, type: "string[]" } },
          url: "/user/emails"
        },
        deleteGpgKey: {
          method: "DELETE",
          params: { gpg_key_id: { required: true, type: "integer" } },
          url: "/user/gpg_keys/:gpg_key_id"
        },
        deletePublicKey: {
          method: "DELETE",
          params: { key_id: { required: true, type: "integer" } },
          url: "/user/keys/:key_id"
        },
        follow: {
          method: "PUT",
          params: { username: { required: true, type: "string" } },
          url: "/user/following/:username"
        },
        getAuthenticated: { method: "GET", params: {}, url: "/user" },
        getByUsername: {
          method: "GET",
          params: { username: { required: true, type: "string" } },
          url: "/users/:username"
        },
        getContextForUser: {
          headers: { accept: "application/vnd.github.hagar-preview+json" },
          method: "GET",
          params: {
            subject_id: { type: "string" },
            subject_type: {
              enum: ["organization", "repository", "issue", "pull_request"],
              type: "string"
            },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/hovercard"
        },
        getGpgKey: {
          method: "GET",
          params: { gpg_key_id: { required: true, type: "integer" } },
          url: "/user/gpg_keys/:gpg_key_id"
        },
        getPublicKey: {
          method: "GET",
          params: { key_id: { required: true, type: "integer" } },
          url: "/user/keys/:key_id"
        },
        list: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            since: { type: "string" }
          },
          url: "/users"
        },
        listBlocked: { method: "GET", params: {}, url: "/user/blocks" },
        listEmails: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/emails"
        },
        listFollowersForAuthenticatedUser: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/followers"
        },
        listFollowersForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/followers"
        },
        listFollowingForAuthenticatedUser: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/following"
        },
        listFollowingForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/following"
        },
        listGpgKeys: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/gpg_keys"
        },
        listGpgKeysForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/gpg_keys"
        },
        listPublicEmails: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/public_emails"
        },
        listPublicKeys: {
          method: "GET",
          params: { page: { type: "integer" }, per_page: { type: "integer" } },
          url: "/user/keys"
        },
        listPublicKeysForUser: {
          method: "GET",
          params: {
            page: { type: "integer" },
            per_page: { type: "integer" },
            username: { required: true, type: "string" }
          },
          url: "/users/:username/keys"
        },
        togglePrimaryEmailVisibility: {
          method: "PATCH",
          params: {
            email: { required: true, type: "string" },
            visibility: { required: true, type: "string" }
          },
          url: "/user/email/visibility"
        },
        unblock: {
          method: "DELETE",
          params: { username: { required: true, type: "string" } },
          url: "/user/blocks/:username"
        },
        unfollow: {
          method: "DELETE",
          params: { username: { required: true, type: "string" } },
          url: "/user/following/:username"
        },
        updateAuthenticated: {
          method: "PATCH",
          params: {
            bio: { type: "string" },
            blog: { type: "string" },
            company: { type: "string" },
            email: { type: "string" },
            hireable: { type: "boolean" },
            location: { type: "string" },
            name: { type: "string" }
          },
          url: "/user"
        }
      }
    };
  },
  727: function(e) {
    "use strict";
    e.exports = function bind(e, t) {
      return function wrap() {
        var r = new Array(arguments.length);
        for (var n = 0; n < r.length; n++) {
          r[n] = arguments[n];
        }
        return e.apply(t, r);
      };
    };
  },
  732: function(e) {
    "use strict";
    e.exports = function isCancel(e) {
      return !!(e && e.__CANCEL__);
    };
  },
  747: function(e) {
    e.exports = require("fs");
  },
  753: function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });
    function _interopDefault(e) {
      return e && typeof e === "object" && "default" in e ? e["default"] : e;
    }
    var n = r(385);
    var i = r(796);
    var s = r(356);
    var o = _interopDefault(r(454));
    var a = r(463);
    const u = "5.4.14";
    function getBufferResponse(e) {
      return e.arrayBuffer();
    }
    function fetchWrapper(e) {
      if (s.isPlainObject(e.body) || Array.isArray(e.body)) {
        e.body = JSON.stringify(e.body);
      }
      let t = {};
      let r;
      let n;
      const i = (e.request && e.request.fetch) || o;
      return i(
        e.url,
        Object.assign(
          {
            method: e.method,
            body: e.body,
            headers: e.headers,
            redirect: e.redirect
          },
          e.request
        )
      )
        .then(i => {
          n = i.url;
          r = i.status;
          for (const e of i.headers) {
            t[e[0]] = e[1];
          }
          if (r === 204 || r === 205) {
            return;
          }
          if (e.method === "HEAD") {
            if (r < 400) {
              return;
            }
            throw new a.RequestError(i.statusText, r, {
              headers: t,
              request: e
            });
          }
          if (r === 304) {
            throw new a.RequestError("Not modified", r, {
              headers: t,
              request: e
            });
          }
          if (r >= 400) {
            return i.text().then(n => {
              const i = new a.RequestError(n, r, { headers: t, request: e });
              try {
                let e = JSON.parse(i.message);
                Object.assign(i, e);
                let t = e.errors;
                i.message = i.message + ": " + t.map(JSON.stringify).join(", ");
              } catch (e) {}
              throw i;
            });
          }
          const s = i.headers.get("content-type");
          if (/application\/json/.test(s)) {
            return i.json();
          }
          if (!s || /^text\/|charset=utf-8$/.test(s)) {
            return i.text();
          }
          return getBufferResponse(i);
        })
        .then(e => {
          return { status: r, url: n, headers: t, data: e };
        })
        .catch(r => {
          if (r instanceof a.RequestError) {
            throw r;
          }
          throw new a.RequestError(r.message, 500, { headers: t, request: e });
        });
    }
    function withDefaults(e, t) {
      const r = e.defaults(t);
      const n = function(e, t) {
        const n = r.merge(e, t);
        if (!n.request || !n.request.hook) {
          return fetchWrapper(r.parse(n));
        }
        const i = (e, t) => {
          return fetchWrapper(r.parse(r.merge(e, t)));
        };
        Object.assign(i, { endpoint: r, defaults: withDefaults.bind(null, r) });
        return n.request.hook(i, n);
      };
      return Object.assign(n, {
        endpoint: r,
        defaults: withDefaults.bind(null, r)
      });
    }
    const p = withDefaults(n.endpoint, {
      headers: { "user-agent": `octokit-request.js/${u} ${i.getUserAgent()}` }
    });
    t.request = p;
  },
  761: function(e) {
    var t = 1e3;
    var r = t * 60;
    var n = r * 60;
    var i = n * 24;
    var s = i * 365.25;
    e.exports = function(e, t) {
      t = t || {};
      var r = typeof e;
      if (r === "string" && e.length > 0) {
        return parse(e);
      } else if (r === "number" && isNaN(e) === false) {
        return t.long ? fmtLong(e) : fmtShort(e);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" +
          JSON.stringify(e)
      );
    };
    function parse(e) {
      e = String(e);
      if (e.length > 100) {
        return;
      }
      var o = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        e
      );
      if (!o) {
        return;
      }
      var a = parseFloat(o[1]);
      var u = (o[2] || "ms").toLowerCase();
      switch (u) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return a * s;
        case "days":
        case "day":
        case "d":
          return a * i;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return a * n;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return a * r;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return a * t;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return a;
        default:
          return undefined;
      }
    }
    function fmtShort(e) {
      if (e >= i) {
        return Math.round(e / i) + "d";
      }
      if (e >= n) {
        return Math.round(e / n) + "h";
      }
      if (e >= r) {
        return Math.round(e / r) + "m";
      }
      if (e >= t) {
        return Math.round(e / t) + "s";
      }
      return e + "ms";
    }
    function fmtLong(e) {
      return (
        plural(e, i, "day") ||
        plural(e, n, "hour") ||
        plural(e, r, "minute") ||
        plural(e, t, "second") ||
        e + " ms"
      );
    }
    function plural(e, t, r) {
      if (e < t) {
        return;
      }
      if (e < t * 1.5) {
        return Math.floor(e / t) + " " + r;
      }
      return Math.ceil(e / t) + " " + r + "s";
    }
  },
  777: function(e, t, r) {
    e.exports = getFirstPage;
    const n = r(265);
    function getFirstPage(e, t, r) {
      return n(e, t, "first", r);
    }
  },
  779: function(e, t, r) {
    "use strict";
    var n = r(35);
    var i = r(133);
    var s = r(283);
    var o = r(946);
    var a = r(825);
    function Axios(e) {
      this.defaults = e;
      this.interceptors = { request: new s(), response: new s() };
    }
    Axios.prototype.request = function request(e) {
      if (typeof e === "string") {
        e = arguments[1] || {};
        e.url = arguments[0];
      } else {
        e = e || {};
      }
      e = a(this.defaults, e);
      e.method = e.method ? e.method.toLowerCase() : "get";
      var t = [o, undefined];
      var r = Promise.resolve(e);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(e) {
        t.unshift(e.fulfilled, e.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(e) {
        t.push(e.fulfilled, e.rejected);
      });
      while (t.length) {
        r = r.then(t.shift(), t.shift());
      }
      return r;
    };
    Axios.prototype.getUri = function getUri(e) {
      e = a(this.defaults, e);
      return i(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");
    };
    n.forEach(
      ["delete", "get", "head", "options"],
      function forEachMethodNoData(e) {
        Axios.prototype[e] = function(t, r) {
          return this.request(n.merge(r || {}, { method: e, url: t }));
        };
      }
    );
    n.forEach(["post", "put", "patch"], function forEachMethodWithData(e) {
      Axios.prototype[e] = function(t, r, i) {
        return this.request(n.merge(i || {}, { method: e, url: t, data: r }));
      };
    });
    e.exports = Axios;
  },
  784: function(e, t, r) {
    if (typeof process === "undefined" || process.type === "renderer") {
      e.exports = r(794);
    } else {
      e.exports = r(81);
    }
  },
  794: function(e, t, r) {
    t = e.exports = r(25);
    t.log = log;
    t.formatArgs = formatArgs;
    t.save = save;
    t.load = load;
    t.useColors = useColors;
    t.storage =
      "undefined" != typeof chrome && "undefined" != typeof chrome.storage
        ? chrome.storage.local
        : localstorage();
    t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (
        typeof window !== "undefined" &&
        window.process &&
        window.process.type === "renderer"
      ) {
        return true;
      }
      if (
        typeof navigator !== "undefined" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ) {
        return false;
      }
      return (
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window !== "undefined" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }
    t.formatters.j = function(e) {
      try {
        return JSON.stringify(e);
      } catch (e) {
        return "[UnexpectedJSONParseError]: " + e.message;
      }
    };
    function formatArgs(e) {
      var r = this.useColors;
      e[0] =
        (r ? "%c" : "") +
        this.namespace +
        (r ? " %c" : " ") +
        e[0] +
        (r ? "%c " : " ") +
        "+" +
        t.humanize(this.diff);
      if (!r) return;
      var n = "color: " + this.color;
      e.splice(1, 0, n, "color: inherit");
      var i = 0;
      var s = 0;
      e[0].replace(/%[a-zA-Z%]/g, function(e) {
        if ("%%" === e) return;
        i++;
        if ("%c" === e) {
          s = i;
        }
      });
      e.splice(s, 0, n);
    }
    function log() {
      return (
        "object" === typeof console &&
        console.log &&
        Function.prototype.apply.call(console.log, console, arguments)
      );
    }
    function save(e) {
      try {
        if (null == e) {
          t.storage.removeItem("debug");
        } else {
          t.storage.debug = e;
        }
      } catch (e) {}
    }
    function load() {
      var e;
      try {
        e = t.storage.debug;
      } catch (e) {}
      if (!e && typeof process !== "undefined" && "env" in process) {
        e = process.env.DEBUG;
      }
      return e;
    }
    t.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {}
    }
  },
  796: function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });
    function getUserAgent() {
      if (typeof navigator === "object" && "userAgent" in navigator) {
        return navigator.userAgent;
      }
      if (typeof process === "object" && "version" in process) {
        return `Node.js/${process.version.substr(1)} (${process.platform}; ${
          process.arch
        })`;
      }
      return "<environment undetectable>";
    }
    t.getUserAgent = getUserAgent;
  },
  807: function(e, t, r) {
    e.exports = paginate;
    const n = r(8);
    function paginate(e, t, r, i) {
      if (typeof r === "function") {
        i = r;
        r = undefined;
      }
      r = e.request.endpoint.merge(t, r);
      return gather(e, [], n(e, r)[Symbol.asyncIterator](), i);
    }
    function gather(e, t, r, n) {
      return r.next().then(i => {
        if (i.done) {
          return t;
        }
        let s = false;
        function done() {
          s = true;
        }
        t = t.concat(n ? n(i.value, done) : i.value.data);
        if (s) {
          return t;
        }
        return gather(e, t, r, n);
      });
    }
  },
  812: function(e) {
    e.exports = function isBuffer(e) {
      return (
        e != null &&
        e.constructor != null &&
        typeof e.constructor.isBuffer === "function" &&
        e.constructor.isBuffer(e)
      );
    };
  },
  825: function(e, t, r) {
    "use strict";
    var n = r(35);
    e.exports = function mergeConfig(e, t) {
      t = t || {};
      var r = {};
      n.forEach(["url", "method", "params", "data"], function valueFromConfig2(
        e
      ) {
        if (typeof t[e] !== "undefined") {
          r[e] = t[e];
        }
      });
      n.forEach(["headers", "auth", "proxy"], function mergeDeepProperties(i) {
        if (n.isObject(t[i])) {
          r[i] = n.deepMerge(e[i], t[i]);
        } else if (typeof t[i] !== "undefined") {
          r[i] = t[i];
        } else if (n.isObject(e[i])) {
          r[i] = n.deepMerge(e[i]);
        } else if (typeof e[i] !== "undefined") {
          r[i] = e[i];
        }
      });
      n.forEach(
        [
          "baseURL",
          "transformRequest",
          "transformResponse",
          "paramsSerializer",
          "timeout",
          "withCredentials",
          "adapter",
          "responseType",
          "xsrfCookieName",
          "xsrfHeaderName",
          "onUploadProgress",
          "onDownloadProgress",
          "maxContentLength",
          "validateStatus",
          "maxRedirects",
          "httpAgent",
          "httpsAgent",
          "cancelToken",
          "socketPath"
        ],
        function defaultToConfig2(n) {
          if (typeof t[n] !== "undefined") {
            r[n] = t[n];
          } else if (typeof e[n] !== "undefined") {
            r[n] = e[n];
          }
        }
      );
      return r;
    };
  },
  826: function(e) {
    "use strict";
    function Cancel(e) {
      this.message = e;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    e.exports = Cancel;
  },
  835: function(e) {
    e.exports = require("url");
  },
  850: function(e, t, r) {
    e.exports = paginationMethodsPlugin;
    function paginationMethodsPlugin(e) {
      e.getFirstPage = r(777).bind(null, e);
      e.getLastPage = r(649).bind(null, e);
      e.getNextPage = r(550).bind(null, e);
      e.getPreviousPage = r(563).bind(null, e);
      e.hasFirstPage = r(536);
      e.hasLastPage = r(336);
      e.hasNextPage = r(929);
      e.hasPreviousPage = r(558);
    }
  },
  854: function(e) {
    var t = "Expected a function";
    var r = "__lodash_hash_undefined__";
    var n = 1 / 0;
    var i = "[object Function]",
      s = "[object GeneratorFunction]",
      o = "[object Symbol]";
    var a = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      u = /^\w*$/,
      p = /^\./,
      c = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var d = /[\\^$.*+?()[\]{}|]/g;
    var g = /\\(\\)?/g;
    var l = /^\[object .+?Constructor\]$/;
    var m =
      typeof global == "object" && global && global.Object === Object && global;
    var h = typeof self == "object" && self && self.Object === Object && self;
    var y = m || h || Function("return this")();
    function getValue(e, t) {
      return e == null ? undefined : e[t];
    }
    function isHostObject(e) {
      var t = false;
      if (e != null && typeof e.toString != "function") {
        try {
          t = !!(e + "");
        } catch (e) {}
      }
      return t;
    }
    var f = Array.prototype,
      b = Function.prototype,
      _ = Object.prototype;
    var q = y["__core-js_shared__"];
    var w = (function() {
      var e = /[^.]+$/.exec((q && q.keys && q.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })();
    var v = b.toString;
    var T = _.hasOwnProperty;
    var E = _.toString;
    var C = RegExp(
      "^" +
        v
          .call(T)
          .replace(d, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
    var j = y.Symbol,
      k = f.splice;
    var P = getNative(y, "Map"),
      O = getNative(Object, "create");
    var S = j ? j.prototype : undefined,
      A = S ? S.toString : undefined;
    function Hash(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function hashClear() {
      this.__data__ = O ? O(null) : {};
    }
    function hashDelete(e) {
      return this.has(e) && delete this.__data__[e];
    }
    function hashGet(e) {
      var t = this.__data__;
      if (O) {
        var n = t[e];
        return n === r ? undefined : n;
      }
      return T.call(t, e) ? t[e] : undefined;
    }
    function hashHas(e) {
      var t = this.__data__;
      return O ? t[e] !== undefined : T.call(t, e);
    }
    function hashSet(e, t) {
      var n = this.__data__;
      n[e] = O && t === undefined ? r : t;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(e) {
      var t = this.__data__,
        r = assocIndexOf(t, e);
      if (r < 0) {
        return false;
      }
      var n = t.length - 1;
      if (r == n) {
        t.pop();
      } else {
        k.call(t, r, 1);
      }
      return true;
    }
    function listCacheGet(e) {
      var t = this.__data__,
        r = assocIndexOf(t, e);
      return r < 0 ? undefined : t[r][1];
    }
    function listCacheHas(e) {
      return assocIndexOf(this.__data__, e) > -1;
    }
    function listCacheSet(e, t) {
      var r = this.__data__,
        n = assocIndexOf(r, e);
      if (n < 0) {
        r.push([e, t]);
      } else {
        r[n][1] = t;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        hash: new Hash(),
        map: new (P || ListCache)(),
        string: new Hash()
      };
    }
    function mapCacheDelete(e) {
      return getMapData(this, e)["delete"](e);
    }
    function mapCacheGet(e) {
      return getMapData(this, e).get(e);
    }
    function mapCacheHas(e) {
      return getMapData(this, e).has(e);
    }
    function mapCacheSet(e, t) {
      getMapData(this, e).set(e, t);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function assocIndexOf(e, t) {
      var r = e.length;
      while (r--) {
        if (eq(e[r][0], t)) {
          return r;
        }
      }
      return -1;
    }
    function baseGet(e, t) {
      t = isKey(t, e) ? [t] : castPath(t);
      var r = 0,
        n = t.length;
      while (e != null && r < n) {
        e = e[toKey(t[r++])];
      }
      return r && r == n ? e : undefined;
    }
    function baseIsNative(e) {
      if (!isObject(e) || isMasked(e)) {
        return false;
      }
      var t = isFunction(e) || isHostObject(e) ? C : l;
      return t.test(toSource(e));
    }
    function baseToString(e) {
      if (typeof e == "string") {
        return e;
      }
      if (isSymbol(e)) {
        return A ? A.call(e) : "";
      }
      var t = e + "";
      return t == "0" && 1 / e == -n ? "-0" : t;
    }
    function castPath(e) {
      return R(e) ? e : x(e);
    }
    function getMapData(e, t) {
      var r = e.__data__;
      return isKeyable(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function getNative(e, t) {
      var r = getValue(e, t);
      return baseIsNative(r) ? r : undefined;
    }
    function isKey(e, t) {
      if (R(e)) {
        return false;
      }
      var r = typeof e;
      if (
        r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        isSymbol(e)
      ) {
        return true;
      }
      return u.test(e) || !a.test(e) || (t != null && e in Object(t));
    }
    function isKeyable(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    function isMasked(e) {
      return !!w && w in e;
    }
    var x = memoize(function(e) {
      e = toString(e);
      var t = [];
      if (p.test(e)) {
        t.push("");
      }
      e.replace(c, function(e, r, n, i) {
        t.push(n ? i.replace(g, "$1") : r || e);
      });
      return t;
    });
    function toKey(e) {
      if (typeof e == "string" || isSymbol(e)) {
        return e;
      }
      var t = e + "";
      return t == "0" && 1 / e == -n ? "-0" : t;
    }
    function toSource(e) {
      if (e != null) {
        try {
          return v.call(e);
        } catch (e) {}
        try {
          return e + "";
        } catch (e) {}
      }
      return "";
    }
    function memoize(e, r) {
      if (typeof e != "function" || (r && typeof r != "function")) {
        throw new TypeError(t);
      }
      var n = function() {
        var t = arguments,
          i = r ? r.apply(this, t) : t[0],
          s = n.cache;
        if (s.has(i)) {
          return s.get(i);
        }
        var o = e.apply(this, t);
        n.cache = s.set(i, o);
        return o;
      };
      n.cache = new (memoize.Cache || MapCache)();
      return n;
    }
    memoize.Cache = MapCache;
    function eq(e, t) {
      return e === t || (e !== e && t !== t);
    }
    var R = Array.isArray;
    function isFunction(e) {
      var t = isObject(e) ? E.call(e) : "";
      return t == i || t == s;
    }
    function isObject(e) {
      var t = typeof e;
      return !!e && (t == "object" || t == "function");
    }
    function isObjectLike(e) {
      return !!e && typeof e == "object";
    }
    function isSymbol(e) {
      return typeof e == "symbol" || (isObjectLike(e) && E.call(e) == o);
    }
    function toString(e) {
      return e == null ? "" : baseToString(e);
    }
    function get(e, t, r) {
      var n = e == null ? undefined : baseGet(e, t);
      return n === undefined ? r : n;
    }
    e.exports = get;
  },
  855: function(e, t, r) {
    e.exports = registerPlugin;
    const n = r(47);
    function registerPlugin(e, t) {
      return n(e.includes(t) ? e : e.concat(t));
    }
  },
  863: function(e, t, r) {
    e.exports = authenticationBeforeRequest;
    const n = r(675);
    const i = r(143);
    function authenticationBeforeRequest(e, t) {
      if (typeof e.auth === "string") {
        t.headers.authorization = i(e.auth);
        if (/^bearer /i.test(e.auth) && !/machine-man/.test(t.headers.accept)) {
          const e = t.headers.accept
            .split(",")
            .concat("application/vnd.github.machine-man-preview+json");
          t.headers.accept = e.filter(Boolean).join(",");
        }
        return;
      }
      if (e.auth.username) {
        const r = n(`${e.auth.username}:${e.auth.password}`);
        t.headers.authorization = `Basic ${r}`;
        if (e.otp) {
          t.headers["x-github-otp"] = e.otp;
        }
        return;
      }
      if (e.auth.clientId) {
        if (/\/applications\/:?[\w_]+\/tokens\/:?[\w_]+($|\?)/.test(t.url)) {
          const r = n(`${e.auth.clientId}:${e.auth.clientSecret}`);
          t.headers.authorization = `Basic ${r}`;
          return;
        }
        t.url += t.url.indexOf("?") === -1 ? "?" : "&";
        t.url += `client_id=${e.auth.clientId}&client_secret=${e.auth.clientSecret}`;
        return;
      }
      return Promise.resolve()
        .then(() => {
          return e.auth();
        })
        .then(e => {
          t.headers.authorization = i(e);
        });
    }
  },
  864: function(e, t, r) {
    "use strict";
    var n = r(35);
    e.exports = n.isStandardBrowserEnv()
      ? (function standardBrowserEnv() {
          return {
            write: function write(e, t, r, i, s, o) {
              var a = [];
              a.push(e + "=" + encodeURIComponent(t));
              if (n.isNumber(r)) {
                a.push("expires=" + new Date(r).toGMTString());
              }
              if (n.isString(i)) {
                a.push("path=" + i);
              }
              if (n.isString(s)) {
                a.push("domain=" + s);
              }
              if (o === true) {
                a.push("secure");
              }
              document.cookie = a.join("; ");
            },
            read: function read(e) {
              var t = document.cookie.match(
                new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
              );
              return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function remove(e) {
              this.write(e, "", Date.now() - 864e5);
            }
          };
        })()
      : (function nonStandardBrowserEnv() {
          return {
            write: function write() {},
            read: function read() {
              return null;
            },
            remove: function remove() {}
          };
        })();
  },
  866: function(e) {
    e.exports = removeHook;
    function removeHook(e, t, r) {
      if (!e.registry[t]) {
        return;
      }
      var n = e.registry[t]
        .map(function(e) {
          return e.orig;
        })
        .indexOf(r);
      if (n === -1) {
        return;
      }
      e.registry[t].splice(n, 1);
    }
  },
  867: function(e) {
    e.exports = require("tty");
  },
  879: function(e) {
    "use strict";
    e.exports = function spread(e) {
      return function wrap(t) {
        return e.apply(null, t);
      };
    };
  },
  883: function(e) {
    var t = "Expected a function";
    var r = "__lodash_hash_undefined__";
    var n = 1 / 0,
      i = 9007199254740991;
    var s = "[object Function]",
      o = "[object GeneratorFunction]",
      a = "[object Symbol]";
    var u = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      p = /^\w*$/,
      c = /^\./,
      d = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var g = /[\\^$.*+?()[\]{}|]/g;
    var l = /\\(\\)?/g;
    var m = /^\[object .+?Constructor\]$/;
    var h = /^(?:0|[1-9]\d*)$/;
    var y =
      typeof global == "object" && global && global.Object === Object && global;
    var f = typeof self == "object" && self && self.Object === Object && self;
    var b = y || f || Function("return this")();
    function getValue(e, t) {
      return e == null ? undefined : e[t];
    }
    function isHostObject(e) {
      var t = false;
      if (e != null && typeof e.toString != "function") {
        try {
          t = !!(e + "");
        } catch (e) {}
      }
      return t;
    }
    var _ = Array.prototype,
      q = Function.prototype,
      w = Object.prototype;
    var v = b["__core-js_shared__"];
    var T = (function() {
      var e = /[^.]+$/.exec((v && v.keys && v.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })();
    var E = q.toString;
    var C = w.hasOwnProperty;
    var j = w.toString;
    var k = RegExp(
      "^" +
        E.call(C)
          .replace(g, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
    var P = b.Symbol,
      O = _.splice;
    var S = getNative(b, "Map"),
      A = getNative(Object, "create");
    var x = P ? P.prototype : undefined,
      R = x ? x.toString : undefined;
    function Hash(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function hashClear() {
      this.__data__ = A ? A(null) : {};
    }
    function hashDelete(e) {
      return this.has(e) && delete this.__data__[e];
    }
    function hashGet(e) {
      var t = this.__data__;
      if (A) {
        var n = t[e];
        return n === r ? undefined : n;
      }
      return C.call(t, e) ? t[e] : undefined;
    }
    function hashHas(e) {
      var t = this.__data__;
      return A ? t[e] !== undefined : C.call(t, e);
    }
    function hashSet(e, t) {
      var n = this.__data__;
      n[e] = A && t === undefined ? r : t;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(e) {
      var t = this.__data__,
        r = assocIndexOf(t, e);
      if (r < 0) {
        return false;
      }
      var n = t.length - 1;
      if (r == n) {
        t.pop();
      } else {
        O.call(t, r, 1);
      }
      return true;
    }
    function listCacheGet(e) {
      var t = this.__data__,
        r = assocIndexOf(t, e);
      return r < 0 ? undefined : t[r][1];
    }
    function listCacheHas(e) {
      return assocIndexOf(this.__data__, e) > -1;
    }
    function listCacheSet(e, t) {
      var r = this.__data__,
        n = assocIndexOf(r, e);
      if (n < 0) {
        r.push([e, t]);
      } else {
        r[n][1] = t;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(e) {
      var t = -1,
        r = e ? e.length : 0;
      this.clear();
      while (++t < r) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        hash: new Hash(),
        map: new (S || ListCache)(),
        string: new Hash()
      };
    }
    function mapCacheDelete(e) {
      return getMapData(this, e)["delete"](e);
    }
    function mapCacheGet(e) {
      return getMapData(this, e).get(e);
    }
    function mapCacheHas(e) {
      return getMapData(this, e).has(e);
    }
    function mapCacheSet(e, t) {
      getMapData(this, e).set(e, t);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function assignValue(e, t, r) {
      var n = e[t];
      if (!(C.call(e, t) && eq(n, r)) || (r === undefined && !(t in e))) {
        e[t] = r;
      }
    }
    function assocIndexOf(e, t) {
      var r = e.length;
      while (r--) {
        if (eq(e[r][0], t)) {
          return r;
        }
      }
      return -1;
    }
    function baseIsNative(e) {
      if (!isObject(e) || isMasked(e)) {
        return false;
      }
      var t = isFunction(e) || isHostObject(e) ? k : m;
      return t.test(toSource(e));
    }
    function baseSet(e, t, r, n) {
      if (!isObject(e)) {
        return e;
      }
      t = isKey(t, e) ? [t] : castPath(t);
      var i = -1,
        s = t.length,
        o = s - 1,
        a = e;
      while (a != null && ++i < s) {
        var u = toKey(t[i]),
          p = r;
        if (i != o) {
          var c = a[u];
          p = n ? n(c, u, a) : undefined;
          if (p === undefined) {
            p = isObject(c) ? c : isIndex(t[i + 1]) ? [] : {};
          }
        }
        assignValue(a, u, p);
        a = a[u];
      }
      return e;
    }
    function baseToString(e) {
      if (typeof e == "string") {
        return e;
      }
      if (isSymbol(e)) {
        return R ? R.call(e) : "";
      }
      var t = e + "";
      return t == "0" && 1 / e == -n ? "-0" : t;
    }
    function castPath(e) {
      return F(e) ? e : G(e);
    }
    function getMapData(e, t) {
      var r = e.__data__;
      return isKeyable(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function getNative(e, t) {
      var r = getValue(e, t);
      return baseIsNative(r) ? r : undefined;
    }
    function isIndex(e, t) {
      t = t == null ? i : t;
      return (
        !!t &&
        (typeof e == "number" || h.test(e)) &&
        e > -1 && e % 1 == 0 && e < t
      );
    }
    function isKey(e, t) {
      if (F(e)) {
        return false;
      }
      var r = typeof e;
      if (
        r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        isSymbol(e)
      ) {
        return true;
      }
      return p.test(e) || !u.test(e) || (t != null && e in Object(t));
    }
    function isKeyable(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    function isMasked(e) {
      return !!T && T in e;
    }
    var G = memoize(function(e) {
      e = toString(e);
      var t = [];
      if (c.test(e)) {
        t.push("");
      }
      e.replace(d, function(e, r, n, i) {
        t.push(n ? i.replace(l, "$1") : r || e);
      });
      return t;
    });
    function toKey(e) {
      if (typeof e == "string" || isSymbol(e)) {
        return e;
      }
      var t = e + "";
      return t == "0" && 1 / e == -n ? "-0" : t;
    }
    function toSource(e) {
      if (e != null) {
        try {
          return E.call(e);
        } catch (e) {}
        try {
          return e + "";
        } catch (e) {}
      }
      return "";
    }
    function memoize(e, r) {
      if (typeof e != "function" || (r && typeof r != "function")) {
        throw new TypeError(t);
      }
      var n = function() {
        var t = arguments,
          i = r ? r.apply(this, t) : t[0],
          s = n.cache;
        if (s.has(i)) {
          return s.get(i);
        }
        var o = e.apply(this, t);
        n.cache = s.set(i, o);
        return o;
      };
      n.cache = new (memoize.Cache || MapCache)();
      return n;
    }
    memoize.Cache = MapCache;
    function eq(e, t) {
      return e === t || (e !== e && t !== t);
    }
    var F = Array.isArray;
    function isFunction(e) {
      var t = isObject(e) ? j.call(e) : "";
      return t == s || t == o;
    }
    function isObject(e) {
      var t = typeof e;
      return !!e && (t == "object" || t == "function");
    }
    function isObjectLike(e) {
      return !!e && typeof e == "object";
    }
    function isSymbol(e) {
      return typeof e == "symbol" || (isObjectLike(e) && j.call(e) == a);
    }
    function toString(e) {
      return e == null ? "" : baseToString(e);
    }
    function set(e, t, r) {
      return e == null ? e : baseSet(e, t, r);
    }
    e.exports = set;
  },
  887: function(e) {
    "use strict";
    e.exports = function combineURLs(e, t) {
      return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
    };
  },
  899: function(e, t, r) {
    e.exports = registerEndpoints;
    const { Deprecation: n } = r(692);
    function registerEndpoints(e, t) {
      Object.keys(t).forEach(r => {
        if (!e[r]) {
          e[r] = {};
        }
        Object.keys(t[r]).forEach(i => {
          const s = t[r][i];
          const o = ["method", "url", "headers"].reduce((e, t) => {
            if (typeof s[t] !== "undefined") {
              e[t] = s[t];
            }
            return e;
          }, {});
          o.request = { validate: s.params };
          let a = e.request.defaults(o);
          const u = Object.keys(s.params || {}).find(
            e => s.params[e].deprecated
          );
          if (u) {
            const t = patchForDeprecation.bind(null, e, s);
            a = t(e.request.defaults(o), `.${r}.${i}()`);
            a.endpoint = t(a.endpoint, `.${r}.${i}.endpoint()`);
            a.endpoint.merge = t(
              a.endpoint.merge,
              `.${r}.${i}.endpoint.merge()`
            );
          }
          if (s.deprecated) {
            e[r][i] = function deprecatedEndpointMethod() {
              e.log.warn(new n(`[@octokit/rest] ${s.deprecated}`));
              e[r][i] = a;
              return a.apply(null, arguments);
            };
            return;
          }
          e[r][i] = a;
        });
      });
    }
    function patchForDeprecation(e, t, r, i) {
      const s = s => {
        s = Object.assign({}, s);
        Object.keys(s).forEach(r => {
          if (t.params[r] && t.params[r].deprecated) {
            const o = t.params[r].alias;
            e.log.warn(
              new n(
                `[@octokit/rest] "${r}" parameter is deprecated for "${i}". Use "${o}" instead`
              )
            );
            if (!(o in s)) {
              s[o] = s[r];
            }
            delete s[r];
          }
        });
        return r(s);
      };
      Object.keys(r).forEach(e => {
        s[e] = r[e];
      });
      return s;
    }
  },
  903: function(e) {
    e.exports = require("zlib");
  },
  929: function(e, t, r) {
    e.exports = hasNextPage;
    const n = r(370);
    const i = r(577);
    function hasNextPage(e) {
      n(
        `octokit.hasNextPage() – You can use octokit.paginate or async iterators instead: https://github.com/octokit/rest.js#pagination.`
      );
      return i(e).next;
    }
  },
  946: function(e, t, r) {
    "use strict";
    var n = r(35);
    var i = r(589);
    var s = r(732);
    var o = r(529);
    var a = r(590);
    var u = r(887);
    function throwIfCancellationRequested(e) {
      if (e.cancelToken) {
        e.cancelToken.throwIfRequested();
      }
    }
    e.exports = function dispatchRequest(e) {
      throwIfCancellationRequested(e);
      if (e.baseURL && !a(e.url)) {
        e.url = u(e.baseURL, e.url);
      }
      e.headers = e.headers || {};
      e.data = i(e.data, e.headers, e.transformRequest);
      e.headers = n.merge(
        e.headers.common || {},
        e.headers[e.method] || {},
        e.headers || {}
      );
      n.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(t) {
          delete e.headers[t];
        }
      );
      var t = e.adapter || o.adapter;
      return t(e).then(
        function onAdapterResolution(t) {
          throwIfCancellationRequested(e);
          t.data = i(t.data, t.headers, e.transformResponse);
          return t;
        },
        function onAdapterRejection(t) {
          if (!s(t)) {
            throwIfCancellationRequested(e);
            if (t && t.response) {
              t.response.data = i(
                t.response.data,
                t.response.headers,
                e.transformResponse
              );
            }
          }
          return Promise.reject(t);
        }
      );
    };
  }
});
