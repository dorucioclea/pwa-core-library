export const trimHash = (hash: string, keep = 10) => {
  const start = hash.substring(0, keep)
  const end = hash.substring(hash.length - keep)
  return `${start}...${end}`
}

export const sanitizeAlphanumeric = (val: string) => val.replace(/[^a-z0-9]/gi, '')

export const capitalizeFirstLetter = (val: string) => (val ? val.charAt(0).toUpperCase() + val.slice(1) : '')

export const classNames = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')
