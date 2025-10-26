<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

definePageMeta({
    middleware: ['auth'],
});

const toast = useToast();
const filters = reactive({
    clientId: '',
    status: '',
    dateFrom: '',
    dateTo: '',
});

const {
    data: invoices,
    refresh,
    status: loadingStatus,
} = await useFetch('/api/invoices', {
    query: filters,
});

const { data: clients } = await useFetch('/api/clients');

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        draft: 'warning',
        sent: 'info',
        paid: 'success',
        cancelled: 'error',
    };
    return colors[status] || 'neutral';
};

const clientOptions = computed(() => [
    { label: 'All Clients', value: '' },
    ...(clients.value || []).map((c: any) => ({ label: c.name, value: c.id.toString() })),
]);

const statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Draft', value: 'draft' },
    { label: 'Sent', value: 'sent' },
    { label: 'Paid', value: 'paid' },
    { label: 'Cancelled', value: 'cancelled' },
];

const deleteInvoice = async (id: number) => {
    try {
        await $fetch(`/api/invoices/${id}`, { method: 'DELETE' });
        await refresh();
        toast.add({
            title: 'Invoice deleted',
            description: 'The invoice has been deleted successfully.',
            color: 'success',
        });
    } catch (error: any) {
        toast.add({
            title: 'Error',
            description: error.data?.message || 'Failed to delete invoice',
            color: 'error',
        });
    }
};

function getRowItems(row: any) {
    return [
        {
            type: 'label',
            label: 'Actions',
        },
        {
            label: 'View invoice',
            icon: 'i-lucide-eye',
            to: `/invoices/${row.id}`,
        },
        {
            type: 'separator',
        },
        {
            label: 'Delete invoice',
            icon: 'i-lucide-trash',
            color: 'error',
            onSelect() {
                deleteInvoice(row.id);
            },
        },
    ];
}
</script>

<template>
    <UDashboardPanel id="invoices">
        <template #header>
            <UDashboardNavbar title="Invoices">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UButton icon="i-lucide-plus" to="/invoices/new" size="md" class="rounded-full" />
                </template>
            </UDashboardNavbar>

            <UDashboardToolbar>
                <UInput
                    v-model="filters.clientId"
                    icon="i-lucide-search"
                    placeholder="Filter by client..."
                    class="max-w-sm"
                />

                <USelect v-model="filters.status" :items="statusOptions" placeholder="Filter by status" />

                <UInput v-model="filters.dateFrom" type="date" placeholder="From date" />

                <UInput v-model="filters.dateTo" type="date" placeholder="To date" />
            </UDashboardToolbar>
        </template>

        <template #body>
            <UTable
                :rows="invoices || []"
                :columns="[
                    { key: 'id', label: 'Invoice #', id: 'id' },
                    { key: 'client.name', label: 'Client', id: 'clientName' },
                    { key: 'total', label: 'Amount', id: 'total' },
                    { key: 'status', label: 'Status', id: 'status' },
                    { key: 'issueDate', label: 'Issue Date', id: 'issueDate' },
                    { key: 'dueDate', label: 'Due Date', id: 'dueDate' },
                    { key: 'actions', label: 'Actions', id: 'actions' },
                ]"
                :loading="loadingStatus === 'pending'"
                :ui="{
                    base: 'table-fixed border-separate border-spacing-0',
                    thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
                    tbody: '[&>tr]:last:[&>td]:border-b-0',
                    th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
                    td: 'border-b border-default',
                    separator: 'h-0',
                }"
            >
                <template #id-data="{ row }">
                    <NuxtLink :to="`/invoices/${row.id}`" class="font-mono text-primary-500 hover:underline">
                        C{{ row.clientId }}-{{ row.sequentialNumber }}
                    </NuxtLink>
                </template>

                <template #total-data="{ row }">
                    {{ formatCurrency(Number(row.total)) }}
                </template>

                <template #status-data="{ row }">
                    <UBadge :color="getStatusColor(row.status)" variant="subtle" class="capitalize">
                        {{ row.status }}
                    </UBadge>
                </template>

                <template #issueDate-data="{ row }">
                    {{ formatDate(row.issueDate) }}
                </template>

                <template #dueDate-data="{ row }">
                    {{ formatDate(row.dueDate) }}
                </template>

                <template #actions-data="{ row }">
                    <div class="text-right">
                        <UDropdownMenu
                            :items="getRowItems(row)"
                            :content="{
                                align: 'end',
                            }"
                        >
                            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
                        </UDropdownMenu>
                    </div>
                </template>
            </UTable>
        </template>
    </UDashboardPanel>
</template>
