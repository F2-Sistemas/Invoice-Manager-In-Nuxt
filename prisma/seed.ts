import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });
    console.log('✅ Admin user created:', adminUser.username);

    // Create sample clients
    const client1 = await prisma.client.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Acme Corporation',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
            email: 'contact@acme.com',
            phone: '+1 (555) 123-4567',
        },
    });
    console.log('✅ Sample client created:', client1.name);

    const client2 = await prisma.client.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'TechStart Inc.',
            address: '456 Innovation Drive',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94102',
            country: 'USA',
            email: 'billing@techstart.com',
            phone: '+1 (555) 987-6543',
        },
    });
    console.log('✅ Sample client created:', client2.name);

    const client3 = await prisma.client.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'Global Solutions Ltd.',
            address: 'Av. Paulista, 1000',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            country: 'Brazil',
            email: 'financeiro@globalsolutions.com.br',
            phone: '+55 (11) 3456-7890',
        },
    });
    console.log('✅ Sample client created:', client3.name);

    // Create sample invoices
    const dueDate1 = new Date();
    dueDate1.setDate(dueDate1.getDate() + 5);

    const invoice1 = await prisma.invoice.create({
        data: {
            clientId: client1.id,
            sequentialNumber: 1,
            issueDate: new Date(),
            dueDate: dueDate1,
            currency: 'USD',
            subtotal: 5000.0,
            discount: 0,
            discountPercent: 0,
            tax: 0,
            taxPercent: 0,
            total: 5000.0,
            status: 'pending',
            notes: 'Thank you for your business!',
            items: {
                create: [
                    {
                        description: 'Web Development',
                        unity: 'hour',
                        quantity: 40,
                        unitPrice: 125.0,
                        amount: 5000.0,
                        order: 1,
                    },
                ],
            },
        },
    });
    console.log('✅ Sample invoice created: C' + invoice1.clientId + '-' + invoice1.sequentialNumber);

    const dueDate2 = new Date();
    dueDate2.setDate(dueDate2.getDate() + 10);

    const invoice2 = await prisma.invoice.create({
        data: {
            clientId: client3.id,
            sequentialNumber: 1,
            issueDate: new Date(),
            dueDate: dueDate2,
            currency: 'BRL',
            subtotal: 6000.0,
            discount: 900.0,
            discountPercent: 15,
            tax: 0,
            taxPercent: 0,
            total: 5100.0,
            status: 'pending',
            notes: 'Obrigado pela parceria!',
            items: {
                create: [
                    {
                        description: 'Software Development',
                        unity: 'hour',
                        quantity: 50,
                        unitPrice: 120.0,
                        amount: 6000.0,
                        order: 1,
                    },
                ],
            },
        },
    });
    console.log('✅ Sample invoice created: C' + invoice2.clientId + '-' + invoice2.sequentialNumber);

    console.log('🎉 Seed completed successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Seed failed:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
