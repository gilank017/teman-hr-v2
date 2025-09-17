export const encodedText = (text) => {
  return window.btoa(text)
}

export const decodeText = (text) => {
  return window.atob(text)
}

export const checkEncryptText = (text) => {
  return text.length % 4 === 0 && /^[A-Za-z0-9+/]+[=]{0,2}$/.test(text)
}