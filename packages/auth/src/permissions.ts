import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { role } from './roles'

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<role, PermissionByRole> = {
  ADMIN: (_, builder) => {
    builder.can('manage', 'all')
  },
  MEMBER: (_, builder) => {
    // builder.can('invite', 'User')
    builder.can('manage', 'Project')
  },
  BELLING: () => {},
}
