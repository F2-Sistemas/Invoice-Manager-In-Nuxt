<template>
    <div v-if="post">
        <!-- Back Button -->
        <section class="py-6 border-b border-gray-200">
            <UContainer>
                <NuxtLink to="/blog" class="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                    <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
                    {{ $t('blog.backToBlog') }}
                </NuxtLink>
            </UContainer>
        </section>

        <!-- Hero Section -->
        <section class="py-12 border-b border-gray-200">
            <UContainer>
                <div class="max-w-3xl mx-auto">
                    <!-- Category and Tags -->
                    <div class="flex flex-wrap items-center gap-2 mb-4">
                        <NuxtLink :to="`/blog/category/${post.categorySlug}`">
                            <UBadge color="primary" variant="soft">{{ post.categorySlug }}</UBadge>
                        </NuxtLink>
                        <NuxtLink v-for="tag in post.tags" :key="tag" :to="`/blog/tag/${tag}`">
                            <UBadge variant="outline" size="sm">{{ tag }}</UBadge>
                        </NuxtLink>
                    </div>

                    <!-- Title -->
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{{ post.title[locale] }}</h1>

                    <!-- Meta Information -->
                    <div class="flex flex-wrap items-center gap-6 text-gray-600">
                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-calendar-days" class="w-5 h-5" />
                            <span>{{ formatDate(post.publishedAt) }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-user" class="w-5 h-5" />
                            <span>{{ post.author }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                            <span>{{ post.readingTime }} min read</span>
                        </div>
                    </div>
                </div>
            </UContainer>
        </section>

        <!-- Featured Image -->
        <section v-if="post.image" class="py-8">
            <UContainer>
                <div class="max-w-3xl mx-auto">
                    <img :src="post.image" :alt="post.title[locale]" class="w-full rounded-lg" />
                </div>
            </UContainer>
        </section>

        <!-- Main Content -->
        <section class="py-12 border-b border-gray-200">
            <UContainer>
                <div class="max-w-3xl mx-auto prose prose-gray max-w-none">
                    <div v-html="parseMarkdown(post.content[locale])" class="text-gray-700 leading-relaxed space-y-4" />
                </div>
            </UContainer>
        </section>

        <!-- Related Posts -->
        <section v-if="relatedPosts.length > 0" class="py-12 border-b border-gray-200 bg-gray-50">
            <UContainer>
                <h2 class="text-3xl font-bold text-gray-900 mb-8">{{ $t('blog.relatedPosts') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PostCard v-for="relatedPost in relatedPosts" :key="relatedPost.id" :post="relatedPost" />
                </div>
            </UContainer>
        </section>

        <!-- Contact CTA Section -->
        <section class="py-12">
            <UContainer>
                <div class="max-w-2xl mx-auto">
                    <UCard class="bg-gradient-to-r from-primary-50 to-primary-100">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-gray-900 mb-2">
                                {{ $t('blog.title') }} | {{ $t('contact.title') }}
                            </h2>
                            <p class="text-gray-600">
                                Interested in learning more about this topic? Get in touch with our team.
                            </p>
                        </div>

                        <form @submit.prevent="submitContactForm" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <UFormGroup label="Name" name="name">
                                    <UInput v-model="contactForm.name" placeholder="Your name" />
                                </UFormGroup>
                                <UFormGroup label="Email" name="email">
                                    <UInput v-model="contactForm.email" type="email" placeholder="your@email.com" />
                                </UFormGroup>
                            </div>

                            <UFormGroup label="Phone" name="phone">
                                <UInput v-model="contactForm.phone" placeholder="+1 (555) 000-0000" />
                            </UFormGroup>

                            <UFormGroup label="Message" name="message">
                                <UTextarea v-model="contactForm.message" placeholder="Your message..." rows="5" />
                            </UFormGroup>

                            <div>
                                <UButton type="submit" color="primary" size="lg" class="w-full">
                                    {{ $t('contact.form.send') }}
                                </UButton>
                            </div>
                        </form>
                    </UCard>
                </div>
            </UContainer>
        </section>
    </div>
    <div v-else class="py-12">
        <UContainer>
            <div class="text-center">
                <p class="text-xl text-gray-600">{{ $t('blog.noPosts') }}</p>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();

const post = ref(null);
const allPosts = ref([]);
const relatedPosts = ref([]);

const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in the blog post: "${''}"`,
});

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale.value === 'pt' ? 'pt-BR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const parseMarkdown = (text: string) => {
    if (!text) return '';

    // Simple markdown parsing for basic formatting
    let html = text
        .replace(/#{2,3} (.*?)\n/g, '<h2 class="text-2xl font-bold mt-6 mb-4">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/_(.*?)_/g, '<em class="italic">$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br />');

    return `<p>${html}</p>`;
};

const submitContactForm = async () => {
    // In a real app, this would send the form to a backend API
    console.log('Contact form submitted:', contactForm.value);
    alert('Thank you for your interest! We will contact you soon.');
    contactForm.value = {
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in the blog post: "${post.value.title[locale.value]}"`,
    };
};

onMounted(async () => {
    const slug = route.params.slug as string;

    const blogPosts = await import('@/data/blog-posts.json');
    allPosts.value = blogPosts.default;

    post.value = allPosts.value.find((p) => p.slug === slug);

    if (!post.value) {
        throw createError({ statusCode: 404, statusMessage: 'Post not found' });
    }

    // Update contact form message
    contactForm.value.message = `I'm interested in the blog post: "${post.value.title[locale.value]}"`;

    // Get related posts by category
    relatedPosts.value = allPosts.value
        .filter((p) => p.categorySlug === post.value.categorySlug && p.slug !== slug)
        .slice(0, 3);

    // If not enough related posts by category, add by tags
    if (relatedPosts.value.length < 3) {
        const postsByTags = allPosts.value.filter(
            (p) =>
                p.slug !== slug &&
                p.tags.some((tag) => post.value.tags.includes(tag)) &&
                !relatedPosts.value.find((rp) => rp.id === p.id)
        );
        relatedPosts.value = [...relatedPosts.value, ...postsByTags].slice(0, 3);
    }
});
</script>
