export type IntersectProps<T1, T2> = Omit<T1, keyof T2> & T2

export type AppSystemColor = 'primary' | 'black' | 'white' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'

export type ScInfo = {
  address: string
  endpoint: string
  gasLimit?: number
  gasLimitCallExtra?: number
  abiUrl?: string
  abiName?: string
}
