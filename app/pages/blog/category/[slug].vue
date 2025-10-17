<template>
    <div>
        <!-- Hero Section -->
        <section
            v-if="category"
            class="py-16"
            :style="{ backgroundColor: category.color + '10', borderBottom: `4px solid ${category.color}` }"
        >
            <UContainer>
                <div class="flex items-center gap-4 mb-4">
                    <NuxtLink to="/blog" class="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
                        {{ $t('blog.backToBlog') }}
                    </NuxtLink>
                </div>
                <div
                    class="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                    :style="{ backgroundColor: category.color, color: 'white' }"
                >
                    <UIcon name="i-heroicons-folder" class="w-8 h-8" />
                </div>
                <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ category.name[locale] }}</h1>
                <p class="text-lg text-gray-600">{{ category.description[locale] }}</p>
            </UContainer>
        </section>

        <!-- Posts Grid -->
        <section class="py-12">
            <UContainer>
                <div v-if="posts.length > 0">
                    <p class="text-sm text-gray-600 mb-8">{{ $t('blog.showing', { count: posts.length }) }}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <PostCard v-for="post in posts" :key="post.id" :post="post" />
                    </div>
                </div>
                <div v-else class="text-center py-16">
                    <UIcon name="i-heroicons-document" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p class="text-xl text-gray-600">{{ $t('blog.noPosts') }}</p>
                </div>
            </UContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();

const category = ref(null);
const posts = ref([]);

onMounted(async () => {
    const slug = route.params.slug as string;

    const blogCategories = await import('@/data/blog-categories.json');
    const blogPosts = await import('@/data/blog-posts.json');

    category.value = blogCategories.default.find((cat) => cat.slug === slug);
    posts.value = blogPosts.default.filter((post) => post.categorySlug === slug);

    if (!category.value) {
        throw createError({ statusCode: 404, statusMessage: 'Category not found' });
    }

    // Sort by newest first
    posts.value.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
});
</script>
