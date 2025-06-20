import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN: (user, builder) => {
    builder.can('manage', 'all')

    // Um admin não pode transferir uma organização para outro usuário, a não ser que o usuário seja o dono da organização.
    builder.cannot(['transfer_ownership', 'update'], 'Organization')
    builder.can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER: (user, builder) => {
    builder.can('get', 'User')
    builder.can(['create', 'get'], 'Project')
    builder.can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING: (_, builder) => {
    builder.can('manage', 'Billing')
  },
}
