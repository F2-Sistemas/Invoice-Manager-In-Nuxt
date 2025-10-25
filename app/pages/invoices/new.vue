<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const { data: clients } = await useFetch('/api/clients');

const form = reactive({
    clientId: null as number | null,
    dueDate: '',
    currency: 'BRL',
    discountPercent: 0,
    taxPercent: 0,
    status: 'pending',
    notes: '',
    items: [
        {
            description: '',
            unity: 'hour',
            quantity: 1,
            unitPrice: 0,
        },
    ],
});

const loading = ref(false);
const error = ref('');

const clientOptions = computed(() => (clients.value || []).map((c: any) => ({ label: c.name, value: c.id })));

const currencyOptions = [
    { label: 'BRL', value: 'BRL' },
    { label: 'USD', value: 'USD' },
    { label: 'CAD', value: 'CAD' },
];

const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Paid', value: 'paid' },
    { label: 'Overdue', value: 'overdue' },
    { label: 'Cancelled', value: 'cancelled' },
];

const addItem = () => {
    form.items.push({
        description: '',
        unity: 'hour',
        quantity: 1,
        unitPrice: 0,
    });
};

const removeItem = (index: number) => {
    form.items.splice(index, 1);
};

const subtotal = computed(() => {
    return form.items.reduce((sum, item) => {
        return sum + item.quantity * item.unitPrice;
    }, 0);
});

const discount = computed(() => {
    return (subtotal.value * form.discountPercent) / 100;
});

const tax = computed(() => {
    return ((subtotal.value - discount.value) * form.taxPercent) / 100;
});

const total = computed(() => {
    return subtotal.value - discount.value + tax.value;
});

const save = async () => {
    loading.value = true;
    error.value = '';

    try {
        await $fetch('/api/invoices', {
            method: 'POST',
            body: form,
        });

        await navigateTo('/invoices');
    } catch (err: any) {
        error.value = err.data?.message || 'Failed to create invoice';
    } finally {
        loading.value = false;
    }
};

// Set default due date (5 days from now)
onMounted(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    form.dueDate = date.toISOString().split('T')[0];
});
</script>

<template>
    <div>
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">New Invoice</h1>
            <p class="text-gray-500 mt-2">Create a new invoice</p>
        </div>

        <form @submit.prevent="save" class="space-y-6">
            <UCard>
                <template #header>
                    <h3 class="font-semibold">Invoice Information</h3>
                </template>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Client" required>
                        <USelect v-model="form.clientId" :options="clientOptions" />
                    </UFormField>

                    <UFormField label="Due Date" required>
                        <UInput v-model="form.dueDate" type="date" />
                    </UFormField>

                    <UFormField label="Currency">
                        <USelect v-model="form.currency" :options="currencyOptions" />
                    </UFormField>

                    <UFormField label="Status">
                        <USelect v-model="form.status" :options="statusOptions" />
                    </UFormField>

                    <UFormField label="Discount %">
                        <UInput v-model.number="form.discountPercent" type="number" min="0" max="100" />
                    </UFormField>

                    <UFormField label="Tax %">
                        <UInput v-model.number="form.taxPercent" type="number" min="0" max="100" />
                    </UFormField>
                </div>

                <UFormField label="Notes" class="mt-4">
                    <UTextarea v-model="form.notes" rows="3" />
                </UFormField>
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h3 class="font-semibold">Line Items</h3>
                        <UButton type="button" icon="i-heroicons-plus" size="sm" @click="addItem">Add Item</UButton>
                    </div>
                </template>

                <div class="space-y-4">
                    <div v-for="(item, index) in form.items" :key="index" class="p-4 border rounded-lg">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="font-medium">Item {{ index + 1 }}</h4>
                            <UButton
                                v-if="form.items.length > 1"
                                type="button"
                                icon="i-heroicons-trash"
                                size="xs"
                                color="red"
                                variant="ghost"
                                @click="removeItem(index)"
                            />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <UFormField label="Description" required class="md:col-span-2">
                                <UInput v-model="item.description" placeholder="Item description" />
                            </UFormField>

                            <UFormField label="Unity" required>
                                <UInput v-model="item.unity" placeholder="e.g., hour" />
                            </UFormField>

                            <UFormField label="Quantity" required>
                                <UInput v-model.number="item.quantity" type="number" min="0.01" step="0.01" />
                            </UFormField>

                            <UFormField label="Unit Price" required>
                                <UInput v-model.number="item.unitPrice" type="number" min="0" step="0.01" />
                            </UFormField>

                            <div class="flex items-end">
                                <UFormField label="Amount">
                                    <UInput :model-value="(item.quantity * item.unitPrice).toFixed(2)" disabled />
                                </UFormField>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex justify-end">
                    <div class="w-full max-w-md space-y-2">
                        <div class="flex justify-between py-2">
                            <span>Subtotal</span>
                            <span>{{ subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between py-2">
                            <span>Discount ({{ form.discountPercent }}%)</span>
                            <span>{{ discount.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between py-2">
                            <span>Tax ({{ form.taxPercent }}%)</span>
                            <span>{{ tax.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between py-3 font-bold text-lg border-t">
                            <span>Total</span>
                            <span>{{ total.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>
            </UCard>

            <UAlert v-if="error" color="red" variant="soft" :title="error" />

            <div class="flex gap-2 justify-end">
                <UButton type="button" variant="ghost" to="/invoices">Cancel</UButton>
                <UButton type="submit" :loading="loading" :disabled="!form.clientId || form.items.length === 0">
                    Create Invoice
                </UButton>
            </div>
        </form>
    </div>
</template>
