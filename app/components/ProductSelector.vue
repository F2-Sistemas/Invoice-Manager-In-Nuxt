<script setup lang="ts">
interface Product {
    id: number;
    name: string;
    description: string;
    unity: string;
    unitPrice: number;
    category: string;
}

interface Props {
    modelValue: boolean;
}

interface Emits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'select', product: Product): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const search = ref('');
const products = ref<Product[]>([]);
const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle');
const error = ref<string | null>(null);

const filteredProducts = computed(() => {
    if (!search.value) return products.value || [];
    const searchLower = search.value.toLowerCase();
    return (products.value || []).filter(
        (product: Product) =>
            product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower)
    );
});

const loadProducts = async () => {
    if (status.value === 'success' && products.value.length > 0) {
        return;
    }

    status.value = 'pending';
    error.value = null;

    try {
        const data = await $fetch<Product[]>('/api/products');
        products.value = data || [];
        status.value = 'success';
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to load products';
        status.value = 'error';
    }
};

const selectProduct = (product: Product) => {
    emit('select', product);
    emit('update:modelValue', false);
};

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            loadProducts();
        }
    }
);
</script>

<template>
    <UModal :model-value="modelValue" @update:model-value="(val) => emit('update:modelValue', val)">
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold">Select Product/Service</h3>
                </div>
            </template>

            <div class="space-y-4">
                <UInput
                    v-model="search"
                    icon="i-lucide-search"
                    placeholder="Search products/services..."
                    :disabled="status === 'pending'"
                    autofocus
                />

                <div v-if="status === 'pending'" class="flex justify-center py-8">
                    <div class="flex flex-col items-center gap-2">
                        <UIcon name="i-lucide-loader" class="animate-spin text-lg" />
                        <p class="text-sm text-neutral-500">Loading products...</p>
                    </div>
                </div>

                <div v-else-if="status === 'error'" class="py-8">
                    <UAlert color="error" title="Error loading products" :description="error" />
                </div>

                <div
                    v-else-if="filteredProducts && filteredProducts.length > 0"
                    class="space-y-2 max-h-96 overflow-y-auto"
                >
                    <button
                        v-for="product in filteredProducts"
                        :key="product.id"
                        @click="selectProduct(product)"
                        class="w-full text-left p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <p class="font-medium">{{ product.name }}</p>
                                <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ product.description }}</p>
                            </div>
                            <div class="text-right ml-4">
                                <p class="font-medium">{{ product.unitPrice.toFixed(2) }}</p>
                                <p class="text-xs text-neutral-500">per {{ product.unity }}</p>
                            </div>
                        </div>
                    </button>
                </div>

                <div v-else-if="status === 'success'" class="text-center py-8 text-neutral-500">No products found</div>

                <div v-else class="text-center py-8 text-neutral-500">Click to load products</div>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton variant="ghost" @click="emit('update:modelValue', false)">Cancel</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>
