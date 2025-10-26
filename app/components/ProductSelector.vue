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

defineProps<Props>();
defineEmits<Emits>();

const search = ref('');
const { data: products, status } = await useFetch('/api/products');

const filteredProducts = computed(() => {
    if (!search.value) return products.value || [];
    const searchLower = search.value.toLowerCase();
    return (products.value || []).filter(
        (product: Product) =>
            product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower)
    );
});

const selectProduct = (product: Product) => {
    emit('select', product);
    emit('update:modelValue', false);
};

const emit = defineEmits<Emits>();
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
                <UInput v-model="search" icon="i-lucide-search" placeholder="Search products/services..." autofocus />

                <div v-if="status === 'pending'" class="flex justify-center py-8">
                    <UIcon name="i-lucide-loader" class="animate-spin" />
                </div>

                <div
                    v-else-if="filteredProducts && filteredProducts.length > 0"
                    class="space-y-2 max-h-96 overflow-y-auto"
                >
                    <button
                        v-for="product in filteredProducts"
                        :key="product.id"
                        @click="selectProduct(product)"
                        class="w-full text-left p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
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

                <div v-else class="text-center py-8 text-neutral-500">No products found</div>
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <UButton variant="ghost" @click="emit('update:modelValue', false)">Cancel</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>
