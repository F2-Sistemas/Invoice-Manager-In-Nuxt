import { z } from 'zod';

const invoiceItemSchema = z.object({
    id: z.number().optional(),
    description: z.string().min(1, 'Description is required'),
    unity: z.string().min(1, 'Unity is required'),
    quantity: z.number().positive('Quantity must be positive'),
    unitPrice: z.number().positive('Unit price must be positive'),
});

const invoiceUpdateSchema = z.object({
    dueDate: z.string().optional(),
    currency: z.enum(['BRL', 'USD', 'CAD']).optional(),
    discountPercent: z.number().min(0).max(100).optional(),
    taxPercent: z.number().min(0).max(100).optional(),
    status: z.enum(['pending', 'paid', 'overdue', 'cancelled']).optional(),
    notes: z.string().optional(),
    items: z.array(invoiceItemSchema).min(1, 'At least one item is required').optional(),
});

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

    try {
        const body = await readBody(event);
        const data = invoiceUpdateSchema.parse(body);

        // Get current invoice
        const currentInvoice = await prisma.invoice.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!currentInvoice) {
            throw createError({
                statusCode: 404,
                message: 'Invoice not found',
            });
        }

        // Calculate new totals if items are provided
        let updateData: any = {};

        if (data.items) {
            const subtotal = data.items.reduce((sum, item) => {
                return sum + item.quantity * item.unitPrice;
            }, 0);

            const discountPercent = data.discountPercent ?? Number(currentInvoice.discountPercent ?? 0);
            const taxPercent = data.taxPercent ?? Number(currentInvoice.taxPercent ?? 0);

            const discount = (subtotal * discountPercent) / 100;
            const tax = ((subtotal - discount) * taxPercent) / 100;
            const total = subtotal - discount + tax;

            updateData = {
                subtotal,
                discount,
                discountPercent: discountPercent || null,
                tax,
                taxPercent: taxPercent || null,
                total,
            };

            // Delete old items and create new ones
            await prisma.invoiceItem.deleteMany({
                where: { invoiceId: id },
            });

            updateData.items = {
                create: data.items.map((item, index) => ({
                    description: item.description,
                    unity: item.unity,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    amount: item.quantity * item.unitPrice,
                    order: index + 1,
                })),
            };
        } else if (data.discountPercent !== undefined || data.taxPercent !== undefined) {
            // Recalculate totals with new discount/tax
            const subtotal = Number(currentInvoice.subtotal);
            const discountPercent = data.discountPercent ?? Number(currentInvoice.discountPercent ?? 0);
            const taxPercent = data.taxPercent ?? Number(currentInvoice.taxPercent ?? 0);

            const discount = (subtotal * discountPercent) / 100;
            const tax = ((subtotal - discount) * taxPercent) / 100;
            const total = subtotal - discount + tax;

            updateData = {
                discount,
                discountPercent: discountPercent || null,
                tax,
                taxPercent: taxPercent || null,
                total,
            };
        }

        if (data.dueDate) {
            updateData.dueDate = new Date(data.dueDate);
        }

        if (data.currency) {
            updateData.currency = data.currency;
        }

        if (data.status) {
            updateData.status = data.status;
        }

        if (data.notes !== undefined) {
            updateData.notes = data.notes || null;
        }

        const invoice = await prisma.invoice.update({
            where: { id },
            data: updateData,
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
        if (error.code === 'P2025') {
            throw createError({
                statusCode: 404,
                message: 'Invoice not found',
            });
        }

        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 400,
            message: error.message || 'Invalid request',
        });
    }
});
