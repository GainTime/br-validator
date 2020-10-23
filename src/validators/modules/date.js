export default function date(raw) {
  const cleaned = raw.replace(/\D/g, '')

  const day = parseInt(cleaned.substring(0, 2))
  const month = parseInt(cleaned.substring(2, 4))
  const year = parseInt(cleaned.substring(4))
  const d30 = [4, 6, 9, 11]

  if (day > 30 && d30.includes(month)) {
    return false
  }

  if (month === 2) {
    if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
      if (day > 29) {
        return false
      }
    } else if (day > 28) {
      return falses
    }
  }

  return !(cleaned.length < 5 || month > 12 || day > 31 || day < 1)
}
