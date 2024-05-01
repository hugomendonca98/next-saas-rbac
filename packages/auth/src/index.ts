import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'

import { User } from './models/user'
import { permissions } from './permissions'
import { ProjectsSubsject } from './subjects/project'
import { UserSubsject } from './subjects/user'

type AppAbilities = UserSubsject | ProjectsSubsject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAnilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role: ${user.role} not found`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()
  return ability
}
