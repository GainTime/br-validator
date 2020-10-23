export default function cep(raw) {
  const cleaned = ('' + raw).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1,5})?[- ]??[\s]?(\d{1,3})?(.*)?$/)

  for (let i = 1; i <= 2; i++) {
    if (!match[i]) {
      match[i] = ''
    }
  }

  if (!match[1] || cleaned.length < 5) {
    return raw
  } else {
    return `${match[1]}-${match[2]}`
  }
}
