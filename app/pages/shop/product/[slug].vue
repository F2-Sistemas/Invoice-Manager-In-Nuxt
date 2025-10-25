<template>
    <div v-if="product">
        <!-- Product Hero -->
        <section class="py-16">
            <UContainer>
                <UButton to="/shop" variant="ghost" icon="i-heroicons-arrow-left" class="mb-8">
                    {{ $t('shop.backToShop') }}
                </UButton>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Product Images -->
                    <div>
                        <div class="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
                            <UIcon name="i-heroicons-photo" class="w-32 h-32 text-gray-400" />
                        </div>

                        <div v-if="product.images.length > 1" class="grid grid-cols-4 gap-4">
                            <div
                                v-for="(image, index) in product.images.slice(1)"
                                :key="index"
                                class="aspect-square bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
                            >
                                <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div>
                        <UBadge v-if="product.featured" color="primary" size="lg" class="mb-4">
                            {{ $t('shop.featured') }}
                        </UBadge>

                        <h1 class="text-4xl font-bold mb-4">
                            {{ product.name[locale] }}
                        </h1>

                        <div class="flex items-center gap-4 mb-6">
                            <div class="text-4xl font-bold text-primary-600">${{ product.price }}</div>
                            <UBadge :color="product.inStock ? 'green' : 'red'" size="lg">
                                {{ product.inStock ? $t('shop.inStock') : $t('shop.outOfStock') }}
                            </UBadge>
                        </div>

                        <p class="text-lg text-gray-700 mb-8 whitespace-pre-line">
                            {{ product.description[locale] }}
                        </p>

                        <div class="flex gap-4 mb-8">
                            <UButton size="xl" block icon="i-heroicons-envelope" @click="scrollToContact">
                                {{ $t('hero.cta') }}
                            </UButton>
                        </div>

                        <!-- Tags -->
                        <div v-if="product.tags.length" class="flex flex-wrap gap-2">
                            <UBadge v-for="tag in product.tags" :key="tag" variant="soft">
                                {{ tag }}
                            </UBadge>
                        </div>
                    </div>
                </div>
            </UContainer>
        </section>

        <!-- Product Details -->
        <section class="py-16 bg-gray-50">
            <UContainer>
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-6">
                        {{ $t('shop.details') }}
                    </h2>

                    <UCard>
                        <div class="prose max-w-none">
                            <p class="whitespace-pre-line text-gray-700">
                                {{ product.fullDescription[locale] }}
                            </p>
                        </div>
                    </UCard>
                </div>
            </UContainer>
        </section>

        <!-- Contact Form -->
        <section ref="contactSection" class="py-16">
            <UContainer>
                <div class="max-w-2xl mx-auto">
                    <div class="text-center mb-8">
                        <h2 class="text-3xl font-bold mb-4">
                            {{ $t('case.scheduleContact.title') }}
                        </h2>
                        <p class="text-gray-600">
                            Interested in "{{ product.name[locale] }}"? Contact us for more information.
                        </p>
                    </div>

                    <UCard>
                        <UForm :state="contactForm" @submit="submitContact">
                            <div class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <UFormField
                                        :class="['w-full', 'md:col-span-2']"
                                        :label="$t('contact.form.name')"
                                        name="name"
                                        required
                                    >
                                        <UInput
                                            v-model="contactForm.name"
                                            icon="i-heroicons-user"
                                            size="lg"
                                            :class="['w-full']"
                                        />
                                    </UFormField>

                                    <UFormField :label="$t('contact.form.email')" name="email" required>
                                        <UInput
                                            v-model="contactForm.email"
                                            type="email"
                                            icon="i-heroicons-envelope"
                                            size="lg"
                                            :class="['w-full']"
                                        />
                                    </UFormField>

                                    <UFormField :label="$t('contact.form.phone')" name="phone">
                                        <UInput
                                            v-model="contactForm.phone"
                                            type="tel"
                                            icon="i-heroicons-phone"
                                            size="lg"
                                            :class="['w-full']"
                                        />
                                    </UFormField>
                                </div>

                                <UFormField :label="$t('contact.form.message')" name="message">
                                    <UTextarea v-model="contactForm.message" :rows="5" size="lg" :class="['w-full']" />
                                </UFormField>

                                <UButton type="submit" size="xl" block :loading="isSubmitting">
                                    {{ $t('contact.form.send') }}
                                </UButton>
                            </div>
                        </UForm>
                    </UCard>
                </div>
            </UContainer>
        </section>

        <!-- Related Products -->
        <section v-if="relatedProducts.length" class="py-16 bg-gray-50">
            <UContainer>
                <h2 class="text-3xl font-bold mb-8">
                    {{ $t('shop.related') }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductCard
                        v-for="relatedProduct in relatedProducts"
                        :key="relatedProduct.id"
                        :product="relatedProduct"
                    />
                </div>
            </UContainer>
        </section>
    </div>

    <!-- Product Not Found -->
    <div v-else class="py-20">
        <UContainer>
            <div class="text-center">
                <h1 class="text-3xl font-bold mb-4">Product not found</h1>
                <UButton to="/shop">
                    {{ $t('shop.backToShop') }}
                </UButton>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { locale, t } = useI18n();
const toast = useToast();

const products = await import('~/data/shop-products.json').then((m) => m.default);

const product = computed(() => {
    return products.find((p) => p.slug === route.params.slug);
});

const relatedProducts = computed(() => {
    if (!product.value) return [];
    return products
        .filter((p) => p.categorySlug === product.value.categorySlug && p.id !== product.value.id)
        .slice(0, 4);
});

const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in "${product.value?.name[locale.value]}". Please contact me with more information.`,
});

const isSubmitting = ref(false);
const contactSection = ref<HTMLElement | null>(null);

const scrollToContact = () => {
    contactSection.value?.scrollIntoView({ behavior: 'smooth' });
};

const submitContact = async () => {
    isSubmitting.value = true;

    try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.add({
            title: 'Success!',
            description: 'Your inquiry has been sent. We will contact you soon.',
            color: 'success',
            icon: 'i-heroicons-check-circle',
        });

        contactForm.value = {
            name: '',
            email: '',
            phone: '',
            message: '',
        };
    } catch (error) {
        toast.add({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            color: 'error',
        });
    } finally {
        isSubmitting.value = false;
    }
};

useHead({
    title: product.value
        ? `${product.value.name[locale.value]} - ${t('shop.title')} - Creative Kibbutz`
        : 'Product Not Found',
    meta: [{ name: 'description', content: product.value?.description[locale.value] || '' }],
});
</script>
