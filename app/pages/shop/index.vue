<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-5xl font-bold mb-6">
                        {{ $t('shop.title') }}
                    </h1>
                    <p class="text-xl">
                        {{ $t('shop.allProducts') }}
                    </p>
                </div>
            </UContainer>
        </section>

        <!-- Categories Section -->
        <section class="py-16 bg-gray-50">
            <UContainer>
                <div class="mb-12">
                    <h2 class="text-3xl font-bold mb-2">{{ $t('shop.categories') }}</h2>
                    <p class="text-gray-600">{{ $t('shop.filterBy') }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
                </div>
            </UContainer>
        </section>

        <!-- Products Section -->
        <section class="py-16">
            <UContainer>
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">
                            {{
                                selectedCategory
                                    ? categories.find((c) => c.slug === selectedCategory)?.name[locale]
                                    : $t('shop.allProducts')
                            }}
                        </h2>
                        <p class="text-gray-600">
                            {{ $t('shop.showing', { count: filteredProducts.length }) }}
                        </p>
                    </div>

                    <USelect v-model="sortBy" :items="items" size="lg" class="w-64">
                        <template #leading>
                            <UIcon name="i-heroicons-adjustments-horizontal" />
                        </template>
                    </USelect>
                </div>

                <!-- Filters -->
                <div class="mb-8 flex flex-wrap gap-4">
                    <UButton :variant="selectedCategory === null ? 'solid' : 'soft'" @click="selectedCategory = null">
                        {{ $t('shop.allCategories') }}
                    </UButton>
                    <UButton
                        v-for="category in categories"
                        :key="category.id"
                        :variant="selectedCategory === category.slug ? 'solid' : 'soft'"
                        @click="selectedCategory = category.slug"
                    >
                        {{ category.name[locale] }}
                    </UButton>
                </div>

                <!-- Products Grid -->
                <div
                    v-if="filteredProducts.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
                </div>

                <!-- No Products -->
                <div v-else class="text-center py-16">
                    <UIcon name="i-heroicons-shopping-bag" class="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h3 class="text-2xl font-bold text-gray-600 mb-2">
                        {{ $t('shop.noProducts') }}
                    </h3>
                    <UButton @click="selectedCategory = null" variant="soft">
                        {{ $t('shop.allCategories') }}
                    </UButton>
                </div>
            </UContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';

const { locale, t } = useI18n();

const categories = await import('~/data/shop-categories.json').then((m) => m.default);
const products = await import('~/data/shop-products.json').then((m) => m.default);

const selectedCategory = ref<string | null>(null);
const sortBy = ref('featured');

const sortOptions = computed(() => [
    { label: t('shop.sort.featured'), value: 'featured' },
    { label: t('shop.sort.priceLow'), value: 'price-low' },
    { label: t('shop.sort.priceHigh'), value: 'price-high' },
    { label: t('shop.sort.nameAZ'), value: 'name-az' },
    { label: t('shop.sort.nameZA'), value: 'name-za' },
]);
const items = ref<SelectItem[]>([
    {
        label: 'Backlog',
        value: 'backlog',
    },
    {
        label: 'Todo',
        value: 'todo',
    },
    {
        label: 'In Progress',
        value: 'in_progress',
    },
    {
        label: 'Done',
        value: 'done',
    },
]);

const filteredProducts = computed(() => {
    if (!selectedCategory.value) {
        return products;
    }
    return products.filter((p) => p.categorySlug === selectedCategory.value);
});

const sortedProducts = computed(() => {
    const sorted = [...filteredProducts.value];

    switch (sortBy.value) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name-az':
            return sorted.sort((a, b) => a.name[locale.value].localeCompare(b.name[locale.value]));
        case 'name-za':
            return sorted.sort((a, b) => b.name[locale.value].localeCompare(a.name[locale.value]));
        case 'featured':
        default:
            return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
});

useHead({
    title: `${t('shop.title')} - Creative Kibbutz`,
    meta: [{ name: 'description', content: t('shop.allProducts') }],
});
</script>
