import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type Identity = {
  url: string
  address: string
  username: string | null
  name: string | null
  bio: string | null
  profileImageUrl: string
  timezone: string | null
  rank: string
  shard: number
  txs: string
  connections: Record<SocialAccountPlatform, SocialAccount>
  professions: Profession[]
  balances: Record<'egld' | 'super', string>
  joined: string
}

export type SocialAccount = {
  username: string
  link: string
}

export type SocialAccountPlatform = 'freeiam' | 'twitter' | 'github'

export type SocialAccountProvider = {
  id: SocialAccountPlatform
  label: string
  icon: IconProp
  colorCode: string
  connectUrl: string
}

export type Profession = {
  slug: string
  name: string
}
