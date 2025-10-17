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
                <!-- Filters -->
                <div class="mb-3 flex flex-wrap gap-4">
                    <UInput
                        icon="i-lucide-search"
                        size="md"
                        variant="outline"
                        placeholder="Search..."
                        v-model="caseFilter.search"
                    />
                </div>

                <div class="mb-8 flex flex-wrap gap-4">
                    <UButton :variant="!selectedCategory ? 'solid' : 'soft'" @click="caseFilter.category = null">
                        {{ $t('shop.allCategories') }}
                    </UButton>

                    <UButton
                        v-for="(category, categoryIndex) in categories"
                        :key="categoryIndex"
                        :variant="selectedCategory && selectedCategory === category ? 'solid' : 'soft'"
                        @click="caseFilter.category = category"
                    >
                        {{ category }}
                    </UButton>
                </div>
            </UContainer>

            <UContainer>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-if="hasFilter && !casesToShow?.length" class="col-span-3 w-full">
                        <UContainer>
                            <div class="text-center max-w-2xl mx-auto">
                                <h2 class="text-2xl font-bold mb-4">
                                    {{ $t('shop.nothingFound') }}
                                </h2>
                                <p class="text-lg text-gray-600 line-clamp-3 mb-2">
                                    {{ $t('shop.nothingFound') }}
                                </p>
                                <UButton @click="clearFilters">
                                    {{ $t('shop.clearFilters') }}
                                </UButton>
                            </div>
                        </UContainer>
                    </div>

                    <template v-else>
                        <div
                            v-for="(caseItem, caseItemIndex) in casesToShow"
                            :key="caseItemIndex"
                            class="group cursor-pointer"
                        >
                            <UCard class="h-full transition-transform group-hover:scale-105">
                                <NuxtLink :to="`/pages/portfolio/case/${caseItem.slug}`">
                                    <img
                                        v-if="caseItem?.image"
                                        :src="caseItem?.image"
                                        :alt="caseItem.title[locale]"
                                        class="rounded-xl max-w-5xl mx-auto w-10/12"
                                    />
                                    <div
                                        v-else
                                        class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
                                    >
                                        <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-400" />
                                    </div>
                                </NuxtLink>

                                <UBadge color="primary" variant="soft" class="mb-3">
                                    {{ caseItem.category[locale] }}
                                </UBadge>
                                <NuxtLink :to="`/pages/portfolio/case/${caseItem.slug}`">
                                    <h3 class="text-xl font-semibold mb-3">
                                        {{ caseItem.title[locale] }}
                                    </h3>
                                </NuxtLink>
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

                        <div class="flex col-span-3 w-full gap-4">
                            <div class="flex w-10/12">
                                <p class="text-gray-600 line-clamp-3 pt-2">
                                    <span>Showing {{ casesToShow?.length }} of {{ casesData?.length }} items</span>
                                </p>
                            </div>

                            <div v-if="!selectedCategory && casesData?.length > casesToShow?.length" class="w-full">
                                <UButton
                                    type="button"
                                    @click.stop.prevent="increaseCasesLimit"
                                    size="lg"
                                    color="primary"
                                    :class="['cursor-pointer px-4 text-center pl-5']"
                                >
                                    Show more...
                                </UButton>
                            </div>
                        </div>
                    </template>
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
import { useState } from 'nuxt/app';

const { locale, t } = useI18n();

const casesData = await import('~/data/cases.json').then((m) => m.default);

const caseFilter = reactive({
    search: '',
    category: '',
    tags: [],
});

const casesLimit = ref<number | null>(9);

const increaseCasesLimit = () => {
    let _casesLimit = Number(casesLimit.value || 9);

    if (_casesLimit < 9 || isNaN(_casesLimit)) {
        _casesLimit = 9;
    }

    casesLimit.value = _casesLimit + 6;
};

const clearFilters = () => {
    casesLimit.value = 9;
    caseFilter = {
        ...caseFilter,
        search: '',
        category: '',
        tags: [],
    };
};

const selectedCategory = computed<string | null>(() => caseFilter?.category || null);

const categories = computed<string[]>(() => {
    return [...new Set(casesData.map((c: any) => c.category['en'] ?? c.category[locale] ?? null).filter(Boolean))];
});

if (import.meta.client && !import.meta.env.SSR) {
    console.log('casesData', casesData);
}

const clearedSearchTerm = function (value: any) {
    value = typeof value === 'string' ? value : '';

    return value
        .replaceAll(/(^"|"$)/g, '')
        .toLowerCase()
        .trim();
};

const hasFilter = computed(() => {
    let _category = clearedSearchTerm(selectedCategory.value);
    let _search = clearedSearchTerm(JSON.stringify(caseFilter?.search || ''));

    return Boolean(_category || _search);
});

const casesToShow = computed(() => {
    let _category = clearedSearchTerm(selectedCategory.value);
    let _search = clearedSearchTerm(JSON.stringify(caseFilter?.search || ''));
    let _casesLimit = _category ? 100 : Number(casesLimit.value || 9);

    if (_casesLimit < 9 || isNaN(_casesLimit)) {
        _casesLimit = 9;
    }

    return casesData
        .filter((p: any) => {
            let _result = true;

            if (_result && _category) {
                _result = JSON.stringify(p.category).toLowerCase().includes(_category);
            }

            if (_result && _search) {
                _result = JSON.stringify(p).toLowerCase().includes(_search);
            }

            return _result;
        })
        .slice(0, _casesLimit);
});

useHead({
    title: `${t('portfolio.title')} - Creative Kibbutz`,
    meta: [{ name: 'description', content: t('portfolio.description') }],
});
</script>
