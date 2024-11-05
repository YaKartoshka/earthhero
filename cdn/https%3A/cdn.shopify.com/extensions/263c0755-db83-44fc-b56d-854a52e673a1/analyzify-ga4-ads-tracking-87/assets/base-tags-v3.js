if (
  (window.analyzify.properties.BING.tracking &&
    window.analyzify.properties.BING.id != undefined) &&
  window.analyzify.properties.BING.id != null &&
  window.analyzify.properties.BING.id != "null"
) {
  (function (w, d, t, r, u) {
    var f, n, i;
    (w[u] = w[u] || []),
      (f = function () {
        var o = {
          ti: window.analyzify.properties.BING.id,
          enableAutoSpaTracking: true,
        };
        (o.q = w[u]), (w[u] = new UET(o)), w[u].push("pageLoad");
      }),
      (n = d.createElement(t)),
      (n.src = r),
      (n.async = 1),
      (n.onload = n.onreadystatechange =
        function () {
          var s = this.readyState;
          (s && s !== "loaded" && s !== "complete") ||
            (f(), (n.onload = n.onreadystatechange = null));
        }),
      (i = d.getElementsByTagName(t)[0]),
      i.parentNode.insertBefore(n, i);
  })(window, document, "script", "//bat.bing.com/bat.js", "uetq");
}

if (
  (window.analyzify.properties.PINTEREST.tracking &&
    window.analyzify.properties.PINTEREST.id != "null") &&
  window.analyzify.properties.PINTEREST.id != null &&
  window.analyzify.properties.PINTEREST != undefined
) {
  !(function (e) {
    if (!window.pintrk) {
      window.pintrk = function () {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments));
      };
      var n = window.pintrk;
      (n.queue = []), (n.version = "3.0");
      var t = document.createElement("script");
      (t.async = !0), (t.src = e);
      var r = document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t, r);
    }
  })("https://s.pinimg.com/ct/core.js");
  pintrk("load", window.analyzify.properties.PINTEREST.id, {
    em: window.analyzify.shopify_customer.email,
  });
  pintrk("page");
  if (window.analyzify.shopify_template != "product") {
    pintrk("track", "PageVisit");
  }
}

if (
  (window.analyzify.properties.X.tracking &&
    (window.analyzify.properties.X.id != null) &&
  window.analyzify.properties.X.id != undefined &&
  window.analyzify.properties.X.id != "null")
) {
  !(function (e, t, n, s, u, a) {
    e.twq ||
      ((s = e.twq =
        function () {
          s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
        }),
      (s.version = "1.1"),
      (s.queue = []),
      (u = t.createElement(n)),
      (u.async = !0),
      (u.src = "https://static.ads-twitter.com/uwt.js"),
      (a = t.getElementsByTagName(n)[0]),
      a.parentNode.insertBefore(u, a));
  })(window, document, "script");
  twq("config", window.analyzify.properties.X.id);
  twq("event", analyzify.twitter_events.page_view_id, {});
}

if (
  (window.analyzify.properties.FACEBOOK.tracking &&
    window.analyzify.properties.FACEBOOK.id != null) &&
  window.analyzify.properties.FACEBOOK.id != "null" &&
  window.analyzify.properties.FACEBOOK.id != undefined
) {
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq("init", window.analyzify.properties.FACEBOOK.id);
  fbq("track", "PageView");
}

if (
  (window.analyzify.properties.CLARITY.tracking &&
    window.analyzify.properties.CLARITY.id != null) &&
  window.analyzify.properties.CLARITY.id != undefined &&
  window.analyzify.properties.CLARITY.id != "null"
) {
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(
    window,
    document,
    "clarity",
    "script",
    window.analyzify.properties.CLARITY.id
  );
}

if (
  (window.analyzify.properties.HOTJAR.tracking &&
    window.analyzify.properties.HOTJAR.id != null) &&
  window.analyzify.properties.HOTJAR.id != "null" &&
  window.analyzify.properties.HOTJAR.id != undefined
) {
  (function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: window.analyzify.properties.HOTJAR.id, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
}

if (
  (window.analyzify.properties.CRITEO.tracking &&
    window.analyzify.properties.CRITEO.id != null) &&
  window.analyzify.properties.CRITEO.id != "null" &&
  window.analyzify.properties.CRITEO.id != undefined
) {
  let script_criteo1 = document.createElement("script");
  script_criteo1.type = "text/javascript";
  script_criteo1.src = `//dynamic.criteo.com/js/ld/ld.js?a=${window.analyzify.properties.CRITEO.id}`;
  script_criteo1.async = true;

  window.criteo_q = window.criteo_q || [];
  var deviceType = /iPad/.test(navigator.userAgent)
    ? "t"
    : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(
        navigator.userAgent
      )
    ? "m"
    : "d";
  window.criteo_q.push(
    {
      event: "setAccount",
      account: window.analyzify.properties.CRITEO.id,
    },
    {
      event: "setEmail",
      email: window.analyzify.shopify_customer.email,
      hash_method: "sha256",
    },
    { event: "setSiteType", type: deviceType },
    { event: "viewPage" }
  );
  if (
    window.analyzify.shopify_template == "index" ||
    window.analyzify.shopify_template == "Index"
  ) {
    window.criteo_q.push({ event: "viewHome" });
  }
}

if (window.analyzify.properties.KLAVIYO.tracking && window.analyzify.properties.KLAVIYO.id != undefined && window.analyzify.properties.KLAVIYO.id != "null" && window.analyzify.properties.KLAVIYO.id != null) {
  let script_klaviyo1 = document.createElement("script");
  script_klaviyo1.async = true;
  script_klaviyo1.src = `//static.klaviyo.com/onsite/js/klaviyo.js?company_id=${window.analyzify.properties.KLAVIYO.id}`;
  var _learnq = _learnq || [];
    if (window.analyzify.shopify_customer.email) {
      _learnq.push(['identify', {
          '$email' : window.analyzify.shopify_customer.email
        }]);
      }
}
