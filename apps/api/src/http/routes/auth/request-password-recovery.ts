import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecovery(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recovery',
    {
      schema: {
        tags: ['auth'],
        summary: 'Get authenticated User profile',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        // We don't want people to know that the user doesn't exist
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          userId: userFromEmail.id,
          type: 'PASSWORD_RECOVER',
        },
      })

      // send e-mail with password recovery link (Not implemented)
      console.log('Recovery password token', code)

      return reply.status(201).send()
    },
  )
}
