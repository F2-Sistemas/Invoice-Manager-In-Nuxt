<template>
    <NuxtLink :to="`/shop/category/${category.slug}`">
        <UCard class="h-full transition-all hover:shadow-xl group cursor-pointer">
            <template #header>
                <div
                    class="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                    <UIcon name="i-heroicons-squares-2x2" class="w-16 h-16 text-white opacity-20 absolute" />
                    <h3 class="text-2xl font-bold text-white z-10 text-center px-4">
                        {{ category.name[locale] }}
                    </h3>
                </div>
            </template>

            <p class="text-gray-600 line-clamp-3 mb-4">
                {{ category.description[locale] }}
            </p>

            <div class="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                <span>{{ $t('shop.viewCategory') }}</span>
                <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
        </UCard>
    </NuxtLink>
</template>

<script setup lang="ts">
const { locale } = useI18n();

defineProps<{
    category: {
        id: number;
        slug: string;
        name: Record<string, string>;
        description: Record<string, string>;
        image: string;
    };
}>();
</script>
