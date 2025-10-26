<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const route = useRoute();
const router = useRouter();
const toast = useToast();
const id = route.params.id;

const { data: client } = await useFetch(`/api/clients/${id}`);

const form = reactive({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: '',
    phone: '',
});

const loading = ref(false);
const error = ref('');

// Initialize form with client data
watch(
    client,
    (newClient) => {
        if (newClient) {
            form.name = newClient.name || '';
            form.address = newClient.address || '';
            form.city = newClient.city || '';
            form.state = newClient.state || '';
            form.zipCode = newClient.zipCode || '';
            form.country = newClient.country || '';
            form.email = newClient.email || '';
            form.phone = newClient.phone || '';
        }
    },
    { immediate: true }
);

const save = async () => {
    loading.value = true;
    error.value = '';

    try {
        await $fetch(`/api/clients/${id}`, {
            method: 'PUT',
            body: form,
        });

        toast.add({
            title: 'Client updated',
            description: 'The client has been updated successfully.',
            color: 'success',
        });

        await router.push('/clients');
    } catch (err: any) {
        error.value = err.data?.message || 'Failed to update client';
        toast.add({
            title: 'Error',
            description: error.value,
            color: 'error',
        });
    } finally {
        loading.value = false;
    }
};

const deleteClient = async () => {
    try {
        await $fetch(`/api/clients/${id}`, { method: 'DELETE' });
        toast.add({
            title: 'Client deleted',
            description: 'The client has been deleted successfully.',
            color: 'success',
        });
        await router.push('/clients');
    } catch (error: any) {
        toast.add({
            title: 'Error',
            description: error.data?.message || 'Failed to delete client',
            color: 'error',
        });
    }
};

const goBack = () => {
    router.back();
};
</script>

<template>
    <UDashboardPanel v-if="client" id="client">
        <template #header>
            <UDashboardNavbar :title="`Client: ${client.name}`">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UButton
                        variant="outline"
                        icon="i-lucide-trash"
                        color="error"
                        @click="deleteClient"
                        class="cursor-pointer"
                    >
                        Delete
                    </UButton>
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <form @submit.prevent="save" class="space-y-6 w-full md:w-2/3 lg:w-1/2 mx-auto">
                <UCard class="w-full">
                    <template #header>
                        <h3 class="font-semibold">Client Information</h3>
                    </template>

                    <div class="space-y-4">
                        <UFormField label="Name" required>
                            <UInput v-model="form.name" placeholder="Client name" />
                        </UFormField>

                        <UFormField label="Address" required>
                            <UInput v-model="form.address" placeholder="Street address" />
                        </UFormField>

                        <div class="grid grid-cols-2 gap-4">
                            <UFormField label="City">
                                <UInput v-model="form.city" placeholder="City" />
                            </UFormField>

                            <UFormField label="State">
                                <UInput v-model="form.state" placeholder="State" />
                            </UFormField>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <UFormField label="ZIP Code">
                                <UInput v-model="form.zipCode" placeholder="ZIP Code" />
                            </UFormField>

                            <UFormField label="Country" required>
                                <UInput v-model="form.country" placeholder="Country" />
                            </UFormField>
                        </div>

                        <UFormField label="Email">
                            <UInput v-model="form.email" type="email" placeholder="email@example.com" />
                        </UFormField>

                        <UFormField label="Phone">
                            <UInput v-model="form.phone" placeholder="Phone number" />
                        </UFormField>
                    </div>
                </UCard>

                <UCard v-if="client._count?.invoices" class="w-full">
                    <template #header>
                        <h3 class="font-semibold">Associated Invoices</h3>
                    </template>

                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                        This client has
                        <strong>{{ client._count.invoices }}</strong>
                        associated invoice(s).
                    </p>
                </UCard>

                <UAlert v-if="error" color="error" variant="soft" :title="error" />

                <div class="flex gap-2 justify-end">
                    <UButton type="button" variant="ghost" @click="goBack">Cancel</UButton>
                    <UButton type="submit" :loading="loading" :disabled="!form.name || !form.address || !form.country">
                        Update Client
                    </UButton>
                </div>
            </form>
        </template>
    </UDashboardPanel>
</template>
