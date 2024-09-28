export function parse(text = '') {
  if (text.startsWith('=')) {
    try {
      if (!eval(text.slice(1))) {
        return text
      }
      return eval(text.slice(1))
    } catch (error) {
      console.warn('Skipping eval error', error.message)
      return text
    }
  }
  return text
}
