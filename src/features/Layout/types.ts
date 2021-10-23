import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export type NavigationItem = {
  text: string
  href: string
  as?: string
  icon?: IconDefinition
}
