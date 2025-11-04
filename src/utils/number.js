export function toNumber(brNumber) {
  if (!brNumber && brNumber !== 0) return 0
  if (typeof brNumber === 'number') return brNumber
  // expected format: '22.000,00' or '18000' etc
  const cleaned = String(brNumber).replace(/\./g, '').replace(/,/g, '.')
  const n = parseFloat(cleaned)
  return Number.isFinite(n) ? n : 0
}
export default toNumber
