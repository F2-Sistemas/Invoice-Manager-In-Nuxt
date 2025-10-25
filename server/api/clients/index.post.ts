import { z } from 'zod'

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  try {
    const body = await readBody(event)
    const data = clientSchema.parse(body)

    const client = await prisma.client.create({
      data: {
        ...data,
        email: data.email || null,
        phone: data.phone || null,
        city: data.city || null,
        state: data.state || null,
        zipCode: data.zipCode || null,
      },
    })

    return client
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message || 'Invalid request',
    })
  }
})
