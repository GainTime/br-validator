function makeA(e) {
  e.addEventListener("click", function(t) {
    var o = e.href.split("/"),
    n = o[o.length - 1].split("#"),
    a = document.location.toString().split("/"),
    l = a[a.length - 1].split("#");
    if (f = n[1], void 0 != f && l[0] === n[0]) {
      t.preventDefault();
      var r = document.scrollingElement || document.documentElement,
      s = document.getElementById(f).offsetTop - 60;
      smoothScroll(r, s, 600)
    }
  })
}

var smoothScroll = function(e, t, o) {
  if (t = Math.round(t), o = Math.round(o), 0 > o) return Promise.reject("bad duration");
  if (0 === o) return e.scrollTop = t, Promise.resolve();
  var n = Date.now(),
  a = n + o,
  l = e.scrollTop,
  r = t - l,
  s = function(e, t, o) {
    if (e >= o) return 0;
    if (o >= t) return 1;
    var n = (o - e) / (t - e);
    return n * n * (3 - 2 * n)
  };
  return new Promise(function(t, o) {
    var i = e.scrollTop,
    c = function() {
      var o = Date.now(),
      d = s(n, a, o),
      u = Math.round(l + r * d);
      return e.scrollTop = u, o >= a ? void t() : e.scrollTop === i && e.scrollTop !== u ? void t() : (i = e.scrollTop, void setTimeout(c, 0))
    };
    setTimeout(c, 0)
  })
};

as = [].slice.call(document.getElementsByTagName("a"))
as.forEach(function(e) {
  makeA(e)
})
