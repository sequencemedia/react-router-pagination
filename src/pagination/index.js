export const toInteger = (v) => isNaN(v) ? 0 : Math.round(Number(v))

export function calculateTotalPages (totalItemsInCollection, itemsPerPage) {
  const e = toInteger(totalItemsInCollection)
  const p = toInteger(itemsPerPage)
  const r = !!(e % p)
  const l = Math.floor(e / p)
  return (r) ? l + 1 : l
}

export function calculatePageNumber (pageNumber, totalPages) {
  const p = toInteger(pageNumber)
  const t = toInteger(totalPages)
  return Math.max(1, Math.min(p, t))
}
