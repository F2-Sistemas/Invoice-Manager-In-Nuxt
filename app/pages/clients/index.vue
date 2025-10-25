<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const { data: clients, refresh } = await useFetch('/api/clients');
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
            client.country.toLowerCase().includes(searchLower)
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
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
        await $fetch(`/api/clients/${id}`, { method: 'DELETE' });
        await refresh();
    } catch (error: any) {
        alert(error.data?.message || 'Failed to delete client');
    }
};

const onSaved = () => {
    isOpen.value = false;
    refresh();
};
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
                <p class="text-gray-500 mt-2">Manage your clients</p>
            </div>
            <UButton icon="i-heroicons-plus" @click="openCreateDialog">New Client</UButton>
        </div>

        <UCard>
            <template #header>
                <UInput
                    v-model="search"
                    icon="i-heroicons-magnifying-glass"
                    placeholder="Search clients..."
                    class="max-w-md"
                />
            </template>

            <UTable
                :rows="filteredClients"
                :columns="[
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'country', label: 'Country' },
                    { key: '_count.invoices', label: 'Invoices' },
                    { key: 'actions', label: 'Actions', class: 'text-right' },
                ]"
            >
                <template #_count.invoices-data="{ row }">
                    {{ row._count.invoices }}
                </template>

                <template #actions-data="{ row }">
                    <div class="flex gap-2 justify-end">
                        <UButton icon="i-heroicons-pencil" variant="ghost" size="sm" @click="openEditDialog(row)" />
                        <UButton
                            icon="i-heroicons-trash"
                            variant="ghost"
                            size="sm"
                            color="red"
                            @click="deleteClient(row.id)"
                        />
                    </div>
                </template>
            </UTable>
        </UCard>

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
    </div>
</template>
