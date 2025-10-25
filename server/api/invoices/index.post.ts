import { z } from 'zod';

const invoiceItemSchema = z.object({
    description: z.string().min(1, 'Description is required'),
    unity: z.string().min(1, 'Unity is required'),
    quantity: z.number().positive('Quantity must be positive'),
    unitPrice: z.number().positive('Unit price must be positive'),
});

const invoiceSchema = z.object({
    clientId: z.number().int().positive('Client ID is required'),
    dueDate: z.string().optional(),
    currency: z.enum(['BRL', 'USD', 'CAD']).default('BRL'),
    discountPercent: z.number().min(0).max(100).optional(),
    taxPercent: z.number().min(0).max(100).optional(),
    status: z.enum(['pending', 'paid', 'overdue', 'cancelled']).default('pending'),
    notes: z.string().optional(),
    items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
});

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    if (!session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }

    try {
        const body = await readBody(event);
        const data = invoiceSchema.parse(body);

        // Verify client exists
        const client = await prisma.client.findUnique({
            where: { id: data.clientId },
        });

        if (!client) {
            throw createError({
                statusCode: 404,
                message: 'Client not found',
            });
        }

        // Get the next sequential number for this client
        const lastInvoice = await prisma.invoice.findFirst({
            where: { clientId: data.clientId },
            orderBy: { sequentialNumber: 'desc' },
        });

        const sequentialNumber = lastInvoice ? lastInvoice.sequentialNumber + 1 : 1;

        // Calculate totals
        const subtotal = data.items.reduce((sum, item) => {
            return sum + item.quantity * item.unitPrice;
        }, 0);

        const discount = data.discountPercent ? (subtotal * data.discountPercent) / 100 : 0;
        const tax = data.taxPercent ? ((subtotal - discount) * data.taxPercent) / 100 : 0;
        const total = subtotal - discount + tax;

        // Set default due date (5 days from now)
        const dueDate = data.dueDate ? new Date(data.dueDate) : new Date();
        if (!data.dueDate) {
            dueDate.setDate(dueDate.getDate() + 5);
        }

        // Create invoice with items
        const invoice = await prisma.invoice.create({
            data: {
                clientId: data.clientId,
                sequentialNumber,
                dueDate,
                currency: data.currency,
                subtotal,
                discount,
                discountPercent: data.discountPercent || null,
                tax,
                taxPercent: data.taxPercent || null,
                total,
                status: data.status,
                notes: data.notes || null,
                items: {
                    create: data.items.map((item, index) => ({
                        description: item.description,
                        unity: item.unity,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        amount: item.quantity * item.unitPrice,
                        order: index + 1,
                    })),
                },
            },
            include: {
                client: true,
                items: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });

        return invoice;
    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 400,
            message: error.message || 'Invalid request',
        });
    }
});
