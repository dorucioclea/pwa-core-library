import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type Identity = {
  url: string
  address: string
  username: string | null
  name: string | null
  bio: string | null
  image: {
    url: string
    nft: string | null
  }
  timezone: string | null
  rank: string
  shard: number
  txs: string
  connections: Record<SocialPlatform, SocialAccount>
  professions: Profession[]
  balances: Record<'egld' | 'super', string>
  joined: string
  meta: boolean
  power: number
  follow: boolean | null
  followers: number
  followings: number
  boosterUntil: string | null
}

export type SocialAccount = {
  username: string
  link: string
}

export type SocialPlatform = 'website' | 'freeiam' | 'twitter' | 'github' | 'discord' | 'telegram' | 'youtube'

export type SocialPlatformProvider = {
  id: SocialPlatform
  label: string
  icon: IconProp
  colorCode: string
  connectUrl: string
  disabled?: boolean
}

export type Profession = {
  slug: string
  name: string
  color: string
}
