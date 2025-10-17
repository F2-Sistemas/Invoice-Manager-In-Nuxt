<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
            <UContainer>
                <div class="max-w-3xl mx-auto text-center">
                    <h1 class="text-5xl font-bold mb-6">
                        {{ $t('hero.title') }}
                    </h1>
                    <p class="text-2xl mb-4">
                        {{ $t('hero.subtitle') }}
                    </p>
                    <p class="text-lg mb-8 text-primary-100">
                        {{ $t('hero.description') }}
                    </p>
                    <UButton to="/pages/contact" size="xl" color="info" variant="solid">
                        {{ $t('hero.cta') }}
                    </UButton>
                </div>
            </UContainer>
        </section>

        <!-- Features Section -->
        <section class="py-20">
            <UContainer>
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">
                        {{ $t('features.title') }}
                    </h2>
                    <p class="text-xl text-gray-600">
                        {{ $t('features.description') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <UCard>
                        <template #header>
                            <div class="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <UIcon name="i-heroicons-users" class="w-8 h-8 text-primary-600" />
                            </div>
                        </template>
                        <h3 class="text-xl font-semibold mb-2">
                            {{ $t('features.team.title') }}
                        </h3>
                        <p class="text-gray-600">
                            {{ $t('features.team.description') }}
                        </p>
                    </UCard>

                    <UCard>
                        <template #header>
                            <div class="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-primary-600" />
                            </div>
                        </template>
                        <h3 class="text-xl font-semibold mb-2">
                            {{ $t('features.model.title') }}
                        </h3>
                        <p class="text-gray-600">
                            {{ $t('features.model.description') }}
                        </p>
                    </UCard>

                    <UCard>
                        <template #header>
                            <div class="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <UIcon name="i-heroicons-rocket-launch" class="w-8 h-8 text-primary-600" />
                            </div>
                        </template>
                        <h3 class="text-xl font-semibold mb-2">
                            {{ $t('features.ready.title') }}
                        </h3>
                        <p class="text-gray-600">
                            {{ $t('features.ready.description') }}
                        </p>
                    </UCard>
                </div>
            </UContainer>
        </section>

        <!-- Portfolio Preview -->
        <section class="bg-gray-50 py-20">
            <UContainer>
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">
                        {{ $t('portfolio.title') }}
                    </h2>
                    <p class="text-xl text-gray-600">
                        {{ $t('portfolio.description') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div v-for="caseItem in featuredCases" :key="caseItem.id" class="group cursor-pointer">
                        <UCard class="h-full transition-transform group-hover:scale-105">
                            <div class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-400" />
                            </div>
                            <UBadge color="primary" variant="soft" class="mb-2">
                                {{ caseItem.category[locale] }}
                            </UBadge>
                            <h3 class="text-lg font-semibold mb-2">
                                {{ caseItem.title[locale] }}
                            </h3>
                            <p class="text-gray-600 mb-4">
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

                <div class="text-center">
                    <UButton to="/pages/portfolio" size="lg" variant="outline">
                        {{ $t('nav.portfolio') }}
                    </UButton>
                </div>
            </UContainer>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-primary-600 text-white">
            <UContainer>
                <div class="text-center max-w-2xl mx-auto">
                    <h2 class="text-4xl font-bold mb-4">
                        {{ $t('cta.title') }}
                    </h2>
                    <p class="text-xl mb-8">
                        {{ $t('cta.description') }}
                    </p>
                    <UButton to="/pages/contact" size="xl" color="info" variant="solid">
                        {{ $t('hero.cta') }}
                    </UButton>
                </div>
            </UContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const casesData = await import('~/data/cases.json').then((m) => m.default);

const featuredCases = computed(() => casesData.slice(0, 3));
</script>
