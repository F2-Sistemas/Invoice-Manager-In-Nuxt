<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-5xl font-bold mb-6">
                        {{ $t('portfolio.title') }}
                    </h1>
                    <p class="text-xl">
                        {{ $t('portfolio.description') }}
                    </p>
                </div>
            </UContainer>
        </section>

        <!-- Cases Grid -->
        <section class="py-16">
            <UContainer>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="caseItem in allCases" :key="caseItem.id" class="group cursor-pointer">
                        <UCard class="h-full transition-transform group-hover:scale-105">
                            <div
                                class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
                            >
                                <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-400" />
                            </div>
                            <UBadge color="primary" variant="soft" class="mb-3">
                                {{ caseItem.category[locale] }}
                            </UBadge>
                            <h3 class="text-xl font-semibold mb-3">
                                {{ caseItem.title[locale] }}
                            </h3>
                            <p class="text-gray-600 mb-4 line-clamp-3">
                                {{ caseItem.description[locale] }}
                            </p>
                            <NuxtLink
                                :to="`/pages/portfolio/case/${caseItem.slug}`"
                                class="text-primary-600 hover:text-primary-800 font-semibold inline-flex items-center gap-2"
                            >
                                {{ $t('portfolio.viewCase') }}
                                <UIcon name="i-heroicons-arrow-right" />
                            </NuxtLink>
                        </UCard>
                    </div>
                </div>
            </UContainer>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-gray-50">
            <UContainer>
                <div class="text-center max-w-2xl mx-auto">
                    <h2 class="text-3xl font-bold mb-4">
                        {{ $t('cta.title') }}
                    </h2>
                    <p class="text-lg text-gray-600 mb-8">
                        {{ $t('cta.description') }}
                    </p>
                    <UButton to="/pages/contact" size="lg" color="primary">
                        {{ $t('hero.cta') }}
                    </UButton>
                </div>
            </UContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const { t } = useI18n();

const casesData = await import('~/data/cases.json').then((m) => m.default);

const allCases = computed(() => casesData);

useHead({
    title: `${t('portfolio.title')} - Creative Kibbutz`,
    meta: [{ name: 'description', content: t('portfolio.description') }],
});
</script>
