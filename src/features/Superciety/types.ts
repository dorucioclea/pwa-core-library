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
  connections: Record<SocialAccountPlatform, SocialAccount>
  balances: Record<'egld' | 'super', string>
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
