<template>
    <UCard class="h-full transition-all hover:shadow-xl group">
        <template #header>
            <NuxtLink :to="`/shop/product/${product.slug}`" class="block">
                <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
                    <UIcon
                        name="i-heroicons-photo"
                        class="w-16 h-16 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    <UBadge v-if="product.featured" color="primary" class="absolute top-2 left-2">
                        {{ $t('shop.featured') }}
                    </UBadge>
                    <UBadge v-if="!product.inStock" color="red" class="absolute top-2 right-2">
                        {{ $t('shop.outOfStock') }}
                    </UBadge>
                </div>
            </NuxtLink>
        </template>

        <div class="flex flex-col h-full">
            <div class="flex-1">
                <NuxtLink :to="`/shop/product/${product.slug}`">
                    <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {{ product.name[locale] }}
                    </h3>
                </NuxtLink>

                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    {{ product.description[locale] }}
                </p>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <div class="text-2xl font-bold text-primary-600">${{ product.price }}</div>
                <UButton
                    :to="`/shop/product/${product.slug}`"
                    color="primary"
                    variant="soft"
                    icon="i-heroicons-arrow-right"
                    trailing
                >
                    {{ $t('shop.viewProduct') }}
                </UButton>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const { locale } = useI18n();

defineProps<{
    product: {
        id: number;
        slug: string;
        name: Record<string, string>;
        description: Record<string, string>;
        price: number;
        currency: string;
        categoryId: number;
        categorySlug: string;
        images: string[];
        featured: boolean;
        inStock: boolean;
        tags: string[];
    };
}>();
</script>
