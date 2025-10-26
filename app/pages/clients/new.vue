<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const router = useRouter();
const toast = useToast();

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

const save = async () => {
    loading.value = true;
    error.value = '';

    try {
        await $fetch('/api/clients', {
            method: 'POST',
            body: form,
        });

        toast.add({
            title: 'Client created',
            description: 'The client has been created successfully.',
            color: 'success',
        });

        await router.push('/clients');
    } catch (err: any) {
        error.value = err.data?.message || 'Failed to create client';
        toast.add({
            title: 'Error',
            description: error.value,
            color: 'error',
        });
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.back();
};
</script>

<template>
    <UDashboardPanel id="new-client">
        <template #header>
            <UDashboardNavbar title="New Client">
                <template #leading>
                    <UDashboardSidebarCollapse />
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

                <UAlert v-if="error" color="error" variant="soft" :title="error" />

                <div class="flex gap-2 justify-end">
                    <UButton type="button" variant="ghost" @click="goBack">Cancel</UButton>
                    <UButton type="submit" :loading="loading" :disabled="!form.name || !form.address || !form.country">
                        Create Client
                    </UButton>
                </div>
            </form>
        </template>
    </UDashboardPanel>
</template>
