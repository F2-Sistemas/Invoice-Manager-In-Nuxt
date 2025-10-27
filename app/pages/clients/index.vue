<script setup lang="ts">
import type { DropdownMenuItem, SelectItem } from '@nuxt/ui';

definePageMeta({
    middleware: ['auth'],
});

const router = useRouter();
const toast = useToast();

const { data: clients, refresh, status: loadingStatus } = await useFetch('/api/clients');
const search = ref('');

const filteredClients = computed(() => {
    if (!search.value) return clients.value || [];
    const searchLower = search.value.toLowerCase();
    return (clients.value || []).filter(
        (client: any) =>
            client.name.toLowerCase().includes(searchLower) ||
            client.email?.toLowerCase().includes(searchLower) ||
            client.country?.toLowerCase().includes(searchLower)
    );
});

const deleteClient = async (id: number) => {
    try {
        await $fetch(`/api/clients/${id}`, { method: 'DELETE' });
        await refresh();
        toast.add({
            title: 'Client deleted',
            description: 'The client has been deleted successfully.',
            color: 'success',
        });
    } catch (error: any) {
        toast.add({
            title: 'Error',
            description: error.data?.message || 'Failed to delete client',
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
            label: 'View client',
            icon: 'i-lucide-eye',
            onSelect() {
                router.push(`/clients/${row.id}`);
            },
        },
        {
            type: 'separator',
        },
        {
            label: 'Delete client',
            icon: 'i-lucide-trash',
            color: 'error',
            onSelect() {
                deleteClient(row.id);
            },
        },
    ];
}
</script>

<template>
    <UDashboardPanel id="clients">
        <template #header>
            <UDashboardNavbar title="Clients">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UButton icon="i-lucide-plus" :to="'/clients/new'" size="md" class="rounded-full cursor-pointer" />
                </template>
            </UDashboardNavbar>

            <UDashboardToolbar>
                <UInput v-model="search" icon="i-lucide-search" placeholder="Search clients..." class="max-w-sm" />
            </UDashboardToolbar>
        </template>

        <template #body>
            <UTable
                :rows="filteredClients"
                :columns="[
                    { key: 'name', label: 'Name', id: 'name' },
                    { key: 'email', label: 'Email', id: 'email' },
                    { key: 'country', label: 'Country', id: 'country' },
                    { key: '_count.invoices', label: 'Invoices', id: 'invoicesCount' },
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
                <template #_count.invoices-data="{ row }">
                    <UBadge variant="subtle" color="neutral">
                        {{ row._count?.invoices || 0 }}
                    </UBadge>
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
