<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-50 to-primary-100 py-16">
            <UContainer>
                <div class="flex items-center gap-4 mb-4">
                    <NuxtLink to="/blog" class="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
                        {{ $t('blog.backToBlog') }}
                    </NuxtLink>
                </div>
                <div class="flex items-center gap-4">
                    <UIcon name="i-heroicons-tag" class="w-8 h-8 text-primary-600" />
                    <h1 class="text-4xl font-bold text-gray-900">{{ tag?.name }}</h1>
                </div>
                <p class="text-lg text-gray-600 mt-4">{{ $t('blog.showing', { count: posts.length }) }}</p>
            </UContainer>
        </section>

        <!-- Posts Grid -->
        <section class="py-12">
            <UContainer>
                <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PostCard v-for="post in posts" :key="post.id" :post="post" />
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

const tag = ref(null);
const posts = ref([]);

onMounted(async () => {
    const slug = route.params.slug as string;

    const blogTags = await import('@/data/blog-tags.json');
    const blogPosts = await import('@/data/blog-posts.json');

    tag.value = blogTags.default.find((t) => t.slug === slug);
    posts.value = blogPosts.default.filter((post) => post.tags.includes(slug));

    if (!tag.value) {
        throw createError({ statusCode: 404, statusMessage: 'Tag not found' });
    }

    // Sort by newest first
    posts.value.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
});
</script>
