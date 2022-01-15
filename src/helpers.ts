export const trimHash = (hash: string, keep = 10) => {
  const start = hash.substring(0, keep)
  const end = hash.substring(hash.length - keep)
  return `${start}...${end}`
}

export const sanitizeAlphanumeric = (val: string) => val.replace(/[^a-z0-9]/gi, '')

export const sanitizeNumeric = (val: string) => +val.replace(/[^0-9]/gi, '')

export const capitalizeFirstLetter = (val: string) => (val ? val.charAt(0).toUpperCase() + val.slice(1) : '')

export const classNames = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export const isFileFormatImage = (filename: string) =>
  filename.endsWith('png') || filename.endsWith('jpeg') || filename.endsWith('jpg') || filename.endsWith('gif')

export const isFileFormatVideo = (filename: string) =>
  filename.endsWith('mov') || filename.endsWith('quicktime') || filename.endsWith('mp4') || filename.endsWith('webm')

export const isFileFormatAudio = (filename: string) =>
  filename.endsWith('acc') || filename.endsWith('flac') || filename.endsWith('m4a') || filename.endsWith('mp3') || filename.endsWith('wav')
