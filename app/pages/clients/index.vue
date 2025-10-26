<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

definePageMeta({
    middleware: ['auth'],
});

const toast = useToast();

const { data: clients, refresh, status: loadingStatus } = await useFetch('/api/clients');
const search = ref('');
const isOpen = ref(false);
const editingClient = ref<any>(null);

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

const openCreateDialog = () => {
    editingClient.value = null;
    isOpen.value = true;
};

const openEditDialog = (client: any) => {
    editingClient.value = { ...client };
    isOpen.value = true;
};

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

const onSaved = () => {
    isOpen.value = false;
    refresh();
};

function getRowItems(row: any) {
    return [
        {
            type: 'label',
            label: 'Actions',
        },
        {
            label: 'Edit client',
            icon: 'i-lucide-pencil',
            onSelect() {
                openEditDialog(row);
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
                    <UButton icon="i-lucide-plus" @click="openCreateDialog" size="md" class="rounded-full" />
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

    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                <h3 class="text-lg font-semibold">
                    {{ editingClient ? 'Edit Client' : 'New Client' }}
                </h3>
            </template>

            <ClientForm :client="editingClient" @saved="onSaved" @cancel="isOpen = false" />
        </UCard>
    </UModal>
</template>
