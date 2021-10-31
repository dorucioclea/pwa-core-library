export type IntersectProps<T1, T2> = Omit<T1, keyof T2> & T2

export type AppSystemColor = 'primary' | 'black' | 'white' | 'gray' | 'red' | 'yellow' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink'
