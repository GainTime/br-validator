export default function cnpj(u) {
  if (((u = u.replace(/[^\d]+/g, '')), '' == u)) return !1
  if (14 != u.length) return !1
  if (
    '00000000000000' == u ||
    '11111111111111' == u ||
    '22222222222222' == u ||
    '33333333333333' == u ||
    '44444444444444' == u ||
    '55555555555555' == u ||
    '66666666666666' == u ||
    '77777777777777' == u ||
    '88888888888888' == u ||
    '99999999999999' == u
  )
    return !1
  for (
    n = u.substring(0, 12), d = u.substring(12), t = 12, s = 0, p = 5, i = t;
    i >= 1;
    i--
  )
    (s += n.charAt(t - i) * p--), p < 2 && (p = 9)
  if (((r = s % 11 < 2 ? 0 : 11 - (s % 11)), r != d.charAt(0))) return !1
  for (n = u.substring(0, 13), t = 13, s = 0, p = 6, i = t; i >= 1; i--)
    (s += n.charAt(t - i) * p--), p < 2 && (p = 9)
  return (r = s % 11 < 2 ? 0 : 11 - (s % 11)), r != d.charAt(1) ? !1 : !0
}
