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
  connections: Record<SocialAccountPlatform, SocialAccount>
  professions: Profession[]
  balances: Record<'egld' | 'super', string>
  joined: string
  meta: boolean
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
  color: string
}
