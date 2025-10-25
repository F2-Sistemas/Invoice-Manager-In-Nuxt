export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    if (!session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }

    // Get total clients
    const totalClients = await prisma.client.count();

    // Get total invoices
    const totalInvoices = await prisma.invoice.count();

    // Get invoices by status
    const pendingInvoices = await prisma.invoice.count({
        where: { status: 'pending' },
    });

    const paidInvoices = await prisma.invoice.count({
        where: { status: 'paid' },
    });

    const overdueInvoices = await prisma.invoice.count({
        where: { status: 'overdue' },
    });

    // Get total revenue (sum of all paid invoices)
    const revenueResult = await prisma.invoice.aggregate({
        where: { status: 'paid' },
        _sum: {
            total: true,
        },
    });

    const totalRevenue = Number(revenueResult._sum.total || 0);

    // Get pending revenue (sum of all pending invoices)
    const pendingRevenueResult = await prisma.invoice.aggregate({
        where: { status: 'pending' },
        _sum: {
            total: true,
        },
    });

    const pendingRevenue = Number(pendingRevenueResult._sum.total || 0);

    // Get recent invoices
    const recentInvoices = await prisma.invoice.findMany({
        take: 5,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            client: true,
        },
    });

    return {
        totalClients,
        totalInvoices,
        pendingInvoices,
        paidInvoices,
        overdueInvoices,
        totalRevenue,
        pendingRevenue,
        recentInvoices,
    };
});
