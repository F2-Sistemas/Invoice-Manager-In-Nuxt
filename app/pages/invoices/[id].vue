<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const route = useRoute();
const id = route.params.id;

const { data: invoice } = await useFetch(`/api/invoices/${id}`);

const formatCurrency = (value: number, currency: string = 'BRL') => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
    }).format(value);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'yellow',
        paid: 'green',
        overdue: 'red',
        cancelled: 'gray',
    };
    return colors[status] || 'gray';
};

const print = () => {
    window.print();
};

const downloadPDF = () => {
    // For now, just print to PDF
    window.print();
};
</script>

<template>
    <div v-if="invoice">
        <div class="flex justify-between items-center mb-8 print:hidden">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Invoice #C{{ invoice.clientId }}-{{ invoice.sequentialNumber }}
                </h1>
                <UBadge :color="getStatusColor(invoice.status)" variant="soft" class="mt-2">
                    {{ invoice.status }}
                </UBadge>
            </div>
            <div class="flex gap-2">
                <UButton variant="outline" icon="i-heroicons-printer" @click="print">Print</UButton>
                <UButton variant="outline" icon="i-heroicons-arrow-down-tray" @click="downloadPDF">
                    Download PDF
                </UButton>
                <UButton icon="i-heroicons-pencil" :to="`/invoices/${id}/edit`">Edit</UButton>
            </div>
        </div>

        <UCard class="invoice-content">
            <div class="space-y-8">
                <!-- Header -->
                <div>
                    <h1 class="text-3xl font-bold">INVOICE #C{{ invoice.clientId }}-{{ invoice.sequentialNumber }}</h1>
                </div>

                <!-- Issuer and Client Info -->
                <div class="grid grid-cols-2 gap-8">
                    <div>
                        <h3 class="font-semibold mb-2">Issued by</h3>
                        <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded">
F2 Sistemas Ltda.
Rua Eduardo Pinto da Rocha, 3199 Ganchinho
Curitiba - PR
81935-000
Brazil
            </pre
                        >
                    </div>

                    <div>
                        <h3 class="font-semibold mb-2">Bill To:</h3>
                        <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded"
                            >{{ invoice.client.name }}
{{ invoice.client.address }}
{{ invoice.client.city }}{{ invoice.client.state ? ', ' + invoice.client.state : '' }}
{{ invoice.client.zipCode }}
{{ invoice.client.country }}
{{ invoice.client.email }}
{{ invoice.client.phone }}
            </pre
                        >
                    </div>
                </div>

                <!-- Invoice Details -->
                <div>
                    <h3 class="font-semibold mb-4">Invoice Details</h3>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="font-medium">Invoice Number:</span>
                            {{ invoice.sequentialNumber }}
                        </div>
                        <div>
                            <span class="font-medium">Date:</span>
                            {{ formatDate(invoice.issueDate) }}
                        </div>
                        <div>
                            <span class="font-medium">Due Date:</span>
                            {{ formatDate(invoice.dueDate) }}
                        </div>
                        <div>
                            <span class="font-medium">Currency:</span>
                            {{ invoice.currency }}
                        </div>
                    </div>
                </div>

                <!-- Line Items -->
                <div>
                    <h3 class="font-semibold mb-4">Line Items</h3>
                    <UTable
                        :rows="invoice.items"
                        :columns="[
                            { key: 'order', label: 'Item', id: 'order' },
                            { key: 'description', label: 'Description', id: 'description' },
                            { key: 'unity', label: 'Unity', id: 'unity' },
                            { key: 'quantity', label: 'Quantity', id: 'quantity' },
                            { key: 'unitPrice', label: `Unit Price (${invoice.currency})`, id: 'unitPrice' },
                            { key: 'amount', label: `Amount (${invoice.currency})`, id: 'amount' },
                        ]"
                    >
                        <template #quantity-data="{ row }">
                            {{ Number(row.quantity) }}
                        </template>
                        <template #unitPrice-data="{ row }">
                            {{ formatCurrency(Number(row.unitPrice), invoice.currency) }}
                        </template>
                        <template #amount-data="{ row }">
                            {{ formatCurrency(Number(row.amount), invoice.currency) }}
                        </template>
                    </UTable>
                </div>

                <!-- Totals -->
                <div class="flex justify-end">
                    <div class="w-full max-w-md space-y-2">
                        <div class="flex justify-between py-2 border-b">
                            <span>Subtotal</span>
                            <span>{{ formatCurrency(Number(invoice.subtotal), invoice.currency) }}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b">
                            <span>Discount{{ invoice.discountPercent ? ` (${invoice.discountPercent}%)` : '' }}</span>
                            <span>{{ formatCurrency(Number(invoice.discount), invoice.currency) }}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b">
                            <span>Tax{{ invoice.taxPercent ? ` (${invoice.taxPercent}%)` : '' }}</span>
                            <span>{{ formatCurrency(Number(invoice.tax), invoice.currency) }}</span>
                        </div>
                        <div class="flex justify-between py-3 font-bold text-lg border-t-2">
                            <span>Total Due</span>
                            <span>{{ formatCurrency(Number(invoice.total), invoice.currency) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Payment Details -->
                <div>
                    <h3 class="font-semibold mb-4">Payment Details</h3>
                    <div class="text-sm space-y-2">
                        <p><strong>Pix keys (BR):</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>inter@tiagofranca.com</li>
                            <li>41984402684</li>
                        </ul>
                        <p class="mt-4"><strong>Bank Details (BR):</strong></p>
                        <pre class="bg-gray-50 dark:bg-gray-800 p-4 rounded mt-2">
Banco Inter (077)
AG 0001
CC 721686-6
Tiago França Fernandes
CPF: 01512932424
            </pre
                        >
                    </div>
                </div>

                <!-- Notes -->
                <div v-if="invoice.notes">
                    <h3 class="font-semibold mb-4">Notes</h3>
                    <p class="text-sm">{{ invoice.notes }}</p>
                </div>
            </div>
        </UCard>
    </div>
</template>

<style>
@media print {
    body {
        background: white !important;
    }

    .invoice-content {
        box-shadow: none !important;
        border: none !important;
    }
}
</style>
