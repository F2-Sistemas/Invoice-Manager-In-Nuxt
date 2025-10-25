export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    if (!session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }

    const id = parseInt(getRouterParam(event, 'id') || '');

    if (isNaN(id)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid ID',
        });
    }

    const invoice = await prisma.invoice.findUnique({
        where: { id },
        include: {
            client: true,
            items: {
                orderBy: {
                    order: 'asc',
                },
            },
        },
    });

    if (!invoice) {
        throw createError({
            statusCode: 404,
            message: 'Invoice not found',
        });
    }

    return invoice;
});
