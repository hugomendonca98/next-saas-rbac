import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { PrismaClient } from 'prisma/prisma-client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('Teste*123', 1)

  const user = await prisma.user.create({
    data: {
      name: 'Hugo Mendonça',
      email: 'hugo@gmail.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/47926683?v=4',
      passwordHash,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  const user3 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Admin)',
      slug: 'acme-admin',
      domain: 'acme.com',
      avatarUrl: faker.image.avatarGitHub(),
      sholdAttachUsersByDomain: true,
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: user.id, role: 'ADMIN' },
            { userId: user2.id, role: 'MEMBER' },
            { userId: user3.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Member)',
      slug: 'acme-member',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: user.id, role: 'MEMBER' },
            { userId: user2.id, role: 'ADMIN' },
            { userId: user3.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Billing)',
      slug: 'acme-billing',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, user.id, user2.id]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: user.id, role: 'BILLING' },
            { userId: user2.id, role: 'ADMIN' },
            { userId: user3.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
})
