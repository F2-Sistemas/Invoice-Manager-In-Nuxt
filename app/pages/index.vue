<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const { data: stats, refresh, error } = await useFetch('/api/dashboard/stats');

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
        pending: 'yellow',
        paid: 'green',
        overdue: 'red',
        cancelled: 'gray',
    };
    return colors[status] || 'gray';
};
</script>

<template>
    <div>
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p class="text-gray-500 mt-2">Overview of your invoices and clients</p>
        </div>

        <UAlert
            v-if="error"
            color="red"
            variant="soft"
            title="Failed to load dashboard data"
            :description="'Please refresh the page or try again later'"
            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'link' }"
            class="mb-6"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-500">Total Clients</span>
                        <UIcon name="i-heroicons-users" class="text-primary-500" />
                    </div>
                </template>
                <div class="text-2xl font-bold">{{ stats?.totalClients || 0 }}</div>
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-500">Total Invoices</span>
                        <UIcon name="i-heroicons-document-text" class="text-blue-500" />
                    </div>
                </template>
                <div class="text-2xl font-bold">{{ stats?.totalInvoices || 0 }}</div>
                <div class="text-sm text-gray-500 mt-2">
                    <span class="text-yellow-600">{{ stats?.pendingInvoices || 0 }} pending</span>
                    ·
                    <span class="text-green-600">{{ stats?.paidInvoices || 0 }} paid</span>
                </div>
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-500">Total Revenue</span>
                        <UIcon name="i-heroicons-currency-dollar" class="text-green-500" />
                    </div>
                </template>
                <div class="text-2xl font-bold">{{ formatCurrency(stats?.totalRevenue || 0) }}</div>
                <div class="text-sm text-green-600 mt-2">From paid invoices</div>
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-500">Pending Revenue</span>
                        <UIcon name="i-heroicons-clock" class="text-yellow-500" />
                    </div>
                </template>
                <div class="text-2xl font-bold">{{ formatCurrency(stats?.pendingRevenue || 0) }}</div>
                <div class="text-sm text-yellow-600 mt-2">Awaiting payment</div>
            </UCard>
        </div>

        <UCard>
            <template #header>
                <h2 class="text-lg font-semibold">Recent Invoices</h2>
            </template>

            <UTable
                v-if="stats?.recentInvoices && stats.recentInvoices.length > 0"
                :rows="stats.recentInvoices"
                :columns="[
                    { key: 'id', label: 'Invoice #' },
                    { key: 'client.name', label: 'Client' },
                    { key: 'total', label: 'Amount' },
                    { key: 'status', label: 'Status' },
                    { key: 'issueDate', label: 'Issue Date' },
                ]"
            >
                <template #id-data="{ row }">
                    <span class="font-mono">C{{ row.clientId }}-{{ row.sequentialNumber }}</span>
                </template>

                <template #total-data="{ row }">
                    {{ formatCurrency(Number(row.total)) }}
                </template>

                <template #status-data="{ row }">
                    <UBadge :color="getStatusColor(row.status)" variant="soft">
                        {{ row.status }}
                    </UBadge>
                </template>

                <template #issueDate-data="{ row }">
                    {{ formatDate(row.issueDate) }}
                </template>
            </UTable>
        </UCard>
    </div>
</template>
