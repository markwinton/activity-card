export function generateToken() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return array.reduce((token, i) => token + i.toString(16).padStart(2, '0'), '')
}
