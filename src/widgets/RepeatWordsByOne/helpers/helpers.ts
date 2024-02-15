export const correctTranslate = (length: number) => {
  if (length <= 1) {
    return 'Option'
  }

  if (length > 1 && length <= 4) {
    return 'Options'
  }

  if (length > 4) {
    return 'OptionsForUa'
  }

  return ''
}
