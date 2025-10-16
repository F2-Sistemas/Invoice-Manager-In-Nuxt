<template>
    <USelectMenu
        v-model="selectedLocale"
        :options="availableLocales"
        option-attribute="name"
        value-attribute="code"
        @update:model-value="changeLocale"
    >
        <template #leading>
            <UIcon name="i-heroicons-language" />
        </template>
    </USelectMenu>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() =>
    (locales.value as any[]).map((l) => ({
        code: l.code,
        name: l.name,
    }))
);

const selectedLocale = ref(locale.value);

const changeLocale = async (newLocale: string) => {
    await setLocale(newLocale);

    if (import.meta.client) {
        localStorage.setItem('preferred-locale', newLocale);
    }
};

onMounted(() => {
    if (import.meta.client) {
        const savedLocale = localStorage.getItem('preferred-locale');
        if (savedLocale && savedLocale !== locale.value) {
            setLocale(savedLocale);
            selectedLocale.value = savedLocale;
        }
    }
});
</script>
