<template>
    <div v-if="category">
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="max-w-4xl mx-auto">
                    <UButton to="/shop" variant="soft" color="white" icon="i-heroicons-arrow-left" class="mb-6">
                        {{ $t('shop.backToShop') }}
                    </UButton>

                    <h1 class="text-5xl font-bold mb-6">
                        {{ category.name[locale] }}
                    </h1>
                    <p class="text-xl">
                        {{ category.description[locale] }}
                    </p>
                </div>
            </UContainer>
        </section>

        <!-- Products Section -->
        <section class="py-16">
            <UContainer>
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-bold">
                            {{ $t('shop.showing', { count: sortedProducts.length }) }}
                        </h2>
                    </div>

                    <USelectMenu v-model="sortBy" :items="sortOptions" size="lg" class="w-64">
                        <template #leading>
                            <UIcon name="i-heroicons-adjustments-horizontal" />
                        </template>
                    </USelectMenu>
                </div>

                <!-- Products Grid -->
                <div
                    v-if="categoryProducts.length > 0"
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
                    <UButton to="/shop" variant="soft">
                        {{ $t('shop.backToShop') }}
                    </UButton>
                </div>
            </UContainer>
        </section>
    </div>

    <!-- Category Not Found -->
    <div v-else class="py-20">
        <UContainer>
            <div class="text-center">
                <h1 class="text-3xl font-bold mb-4">Category not found</h1>
                <UButton to="/shop">
                    {{ $t('shop.backToShop') }}
                </UButton>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';

const route = useRoute();
const { locale, t } = useI18n();

const categories = await import('~/data/shop-categories.json').then((m) => m.default);
const products = await import('~/data/shop-products.json').then((m) => m.default);

const category = computed(() => {
    return categories.find((c) => c.slug === route.params.slug);
});

const categoryProducts = computed(() => {
    return products.filter((p) => p.categorySlug === route.params.slug);
});

const sortBy = ref('featured');

const sortOptions = computed<SelectItem[]>(() => [
    { label: t('shop.sort.featured'), value: 'featured' },
    { label: t('shop.sort.priceLow'), value: 'price-low' },
    { label: t('shop.sort.priceHigh'), value: 'price-high' },
    { label: t('shop.sort.nameAZ'), value: 'name-az' },
    { label: t('shop.sort.nameZA'), value: 'name-za' },
]);

const sortedProducts = computed(() => {
    const sorted = [...categoryProducts.value];

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
    title: category.value
        ? `${category.value.name[locale.value]} - ${t('shop.title')} - Creative Kibbutz`
        : 'Category Not Found',
    meta: [{ name: 'description', content: category.value?.description[locale.value] || '' }],
});
</script>
