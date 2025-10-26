<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-50 to-primary-100 py-16">
            <UContainer>
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('blog.title') }}</h1>
                    <p class="text-lg text-gray-600">{{ $t('blog.latestPosts') }}</p>
                </div>
            </UContainer>
        </section>

        <!-- Categories Section -->
        <section class="py-12 border-b border-gray-200">
            <UContainer>
                <h2 class="text-2xl font-bold text-gray-900 mb-8">{{ $t('blog.categories') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <NuxtLink
                        v-for="category in categories"
                        :key="category.slug"
                        :to="`/blog/category/${category.slug}`"
                        class="group"
                    >
                        <UCard class="h-full hover:shadow-lg transition-shadow">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3
                                        class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors"
                                    >
                                        {{ category.name[locale] }}
                                    </h3>
                                    <p class="text-sm text-gray-600">
                                        {{ getPostCountByCategory(category.slug) }} {{ $t('blog.allPosts') }}
                                    </p>
                                </div>
                                <div
                                    class="w-12 h-12 rounded-lg flex items-center justify-center"
                                    :style="{ backgroundColor: category.color + '20', color: category.color }"
                                >
                                    <UIcon name="i-heroicons-folder" class="w-6 h-6" />
                                </div>
                            </div>
                        </UCard>
                    </NuxtLink>
                </div>
            </UContainer>
        </section>

        <!-- Filters and Sorting -->
        <section class="py-8 border-b border-gray-200">
            <UContainer>
                <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div class="flex gap-4 w-full md:w-auto">
                        <USelect
                            v-model="selectedCategory"
                            :items="categoryOptions"
                            option-attribute="label"
                            size="md"
                            class="flex-1 md:w-48"
                        />
                        <USelect
                            v-model="selectedTag"
                            :items="tagOptions"
                            option-attribute="label"
                            size="md"
                            class="flex-1 md:w-48"
                        />
                    </div>
                    <USelect
                        v-model="sortBy"
                        :items="sortOptions"
                        option-attribute="label"
                        size="md"
                        class="w-full md:w-48"
                    />
                </div>
            </UContainer>
        </section>

        <!-- Posts Grid -->
        <section class="py-12">
            <UContainer>
                <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
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
const { locale } = useI18n();
const router = useRouter();

const allPosts = ref([]);
const categories = ref([]);
const tags = ref([]);

const selectedCategory = ref('');
const selectedTag = ref('');
const sortBy = ref('newest');

const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Title: A-Z', value: 'titleAZ' },
    { label: 'Title: Z-A', value: 'titleZA' },
];

const categoryOptions = computed(() => [
    { label: $t('blog.allCategories'), value: '' },
    ...categories.value.map((cat) => ({
        label: cat.name[locale.value],
        value: cat.slug,
    })),
]);

const tagOptions = computed(() => [
    { label: $t('blog.allTags'), value: '' },
    ...tags.value.map((tag) => ({
        label: tag.name,
        value: tag.slug,
    })),
]);

const filteredPosts = computed(() => {
    let filtered = [...allPosts.value];

    if (selectedCategory.value) {
        filtered = filtered.filter((post) => post.categorySlug === selectedCategory.value);
    }

    if (selectedTag.value) {
        filtered = filtered.filter((post) => post.tags.includes(selectedTag.value));
    }

    // Sort
    switch (sortBy.value) {
        case 'newest':
            filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
            break;
        case 'oldest':
            filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
            break;
        case 'titleAZ':
            filtered.sort((a, b) => a.title[locale.value].localeCompare(b.title[locale.value]));
            break;
        case 'titleZA':
            filtered.sort((a, b) => b.title[locale.value].localeCompare(a.title[locale.value]));
            break;
        case 'featured':
        default:
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
    }

    return filtered;
});

const getPostCountByCategory = (categorySlug: string) => {
    return allPosts.value.filter((post) => post.categorySlug === categorySlug).length;
};

onMounted(async () => {
    const blogPosts = await import('@/data/blog-posts.json');
    const blogCategories = await import('@/data/blog-categories.json');
    const blogTags = await import('@/data/blog-tags.json');

    allPosts.value = blogPosts.default;
    categories.value = blogCategories.default;
    tags.value = blogTags.default;
});
</script>
