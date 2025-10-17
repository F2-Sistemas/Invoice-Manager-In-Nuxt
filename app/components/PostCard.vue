<template>
    <NuxtLink :to="`/blog/post/${post.slug}`" class="group">
        <UCard class="h-full transition-all hover:shadow-xl">
            <div class="space-y-4">
                <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
                </div>

                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <UBadge color="primary" variant="soft" size="sm">{{ post.categorySlug }}</UBadge>
                        <span class="text-xs text-gray-500">{{ post.readingTime }} min</span>
                    </div>
                    <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {{ post.title[locale] }}
                    </h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ post.excerpt[locale] }}</p>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span class="text-xs text-gray-500">{{ formatDate(post.publishedAt) }}</span>
                    <span class="text-primary-600 text-sm font-semibold">{{ $t('blog.readMore') }} →</span>
                </div>
            </div>
        </UCard>
    </NuxtLink>
</template>

<script setup lang="ts">
const { locale } = useI18n();

defineProps<{
    post: {
        id: number;
        slug: string;
        title: Record<string, string>;
        excerpt: Record<string, string>;
        categorySlug: string;
        tags: string[];
        publishedAt: string;
        readingTime: number;
    };
}>();

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale.value === 'pt' ? 'pt-BR' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
</script>
