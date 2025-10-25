export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const query = getQuery(event)
  const clientId = query.clientId ? parseInt(query.clientId as string) : undefined
  const status = query.status as string | undefined
  const dateFrom = query.dateFrom ? new Date(query.dateFrom as string) : undefined
  const dateTo = query.dateTo ? new Date(query.dateTo as string) : undefined

  const where: any = {}

  if (clientId) {
    where.clientId = clientId
  }

  if (status) {
    where.status = status
  }

  if (dateFrom || dateTo) {
    where.issueDate = {}
    if (dateFrom) {
      where.issueDate.gte = dateFrom
    }
    if (dateTo) {
      where.issueDate.lte = dateTo
    }
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      client: true,
      items: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return invoices
})
