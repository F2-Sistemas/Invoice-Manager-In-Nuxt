<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const { data: stats } = await useFetch('/api/dashboard/stats');

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

const items = [
    [
        {
            label: 'New invoice',
            icon: 'i-lucide-file-plus',
            to: '/invoices/new',
        },
        {
            label: 'New client',
            icon: 'i-lucide-user-plus',
            to: '/clients',
        },
    ],
];
</script>

<template>
    <UDashboardPanel id="home">
        <template #header>
            <UDashboardNavbar title="Dashboard">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UDropdownMenu :items="items">
                        <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
                    </UDropdownMenu>
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <UCard class="col-span-1">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-semibold text-muted">Total Invoices</h3>
                            <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary" />
                        </div>
                    </template>
                    <div class="text-3xl font-bold">{{ stats?.totalInvoices || 0 }}</div>
                    <p class="text-sm text-muted mt-2">
                        <span class="text-warning">{{ stats?.pendingInvoices || 0 }} pending</span>
                        ·
                        <span class="text-success">{{ stats?.paidInvoices || 0 }} paid</span>
                    </p>
                </UCard>

                <UCard class="col-span-1">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-semibold text-muted">Total Revenue</h3>
                            <UIcon name="i-lucide-dollar-sign" class="w-5 h-5 text-success" />
                        </div>
                    </template>
                    <div class="text-3xl font-bold">{{ formatCurrency(stats?.totalRevenue || 0) }}</div>
                    <p class="text-sm text-success mt-2">From paid invoices</p>
                </UCard>

                <UCard class="col-span-1">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-semibold text-muted">Active Clients</h3>
                            <UIcon name="i-lucide-users" class="w-5 h-5 text-info" />
                        </div>
                    </template>
                    <div class="text-3xl font-bold">{{ stats?.totalClients || 0 }}</div>
                    <p class="text-sm text-muted mt-2">Registered clients</p>
                </UCard>

                <UCard class="col-span-1">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-semibold text-muted">Pending Revenue</h3>
                            <UIcon name="i-lucide-clock" class="w-5 h-5 text-warning" />
                        </div>
                    </template>
                    <div class="text-3xl font-bold">{{ formatCurrency(stats?.pendingRevenue || 0) }}</div>
                    <p class="text-sm text-warning mt-2">Awaiting payment</p>
                </UCard>
            </div>

            <UCard>
                <template #header>
                    <h3 class="font-semibold">Recent Invoices</h3>
                </template>

                <div
                    v-if="!stats?.recentInvoices || stats.recentInvoices.length === 0"
                    class="text-center py-8 text-muted"
                >
                    No recent invoices
                </div>

                <div v-else class="space-y-3">
                    <div
                        v-for="invoice in stats.recentInvoices"
                        :key="invoice.id"
                        class="flex items-center justify-between p-4 border border-default rounded-lg hover:bg-elevated/25 transition-colors"
                    >
                        <div>
                            <p class="font-mono font-semibold">
                                C{{ invoice.clientId }}-{{ invoice.sequentialNumber }}
                            </p>
                            <p class="text-sm text-muted">{{ invoice.client.name }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold">{{ formatCurrency(Number(invoice.total)) }}</p>
                            <div class="flex items-center gap-2 justify-end mt-1">
                                <UBadge :color="getStatusColor(invoice.status)" variant="subtle" class="capitalize">
                                    {{ invoice.status }}
                                </UBadge>
                                <span class="text-xs text-muted">{{ formatDate(invoice.issueDate) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>
        </template>
    </UDashboardPanel>
</template>
