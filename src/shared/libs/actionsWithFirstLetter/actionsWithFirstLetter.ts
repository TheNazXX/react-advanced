export function upperFirstLetter (str: string) {
  if (!str) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function lowerFirstLetter (str: string) {
  if (!str) {
    return str
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}
