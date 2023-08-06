export function toInteger (v: number | string): number {
  const n = Number(v)

  return isNaN(n) ? 0 : Math.round(n)
}

export function calculateTotalPages (totalItemsInCollection: number | string, itemsPerPage: number | string): number {
  const e = toInteger(totalItemsInCollection)
  const p = toInteger(itemsPerPage)
  const r = Boolean(e % p) // !!(e % p)
  const l = Math.floor(e / p)
  return (r) ? l + 1 : l
}

export function calculatePageNumber (pageNumber: number | string, totalPages: number | string): number {
  const p = toInteger(pageNumber)
  const t = toInteger(totalPages)
  return Math.max(1, Math.min(p, t))
}
