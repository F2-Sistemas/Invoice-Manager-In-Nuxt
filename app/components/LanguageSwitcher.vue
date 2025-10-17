<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
    return locales.value.map((i) => ({
        ...i,
        // label: i.name,
        label: i.code,
        value: i.code,
        isCurrent: i.code === locale.value,
    }));
    // .filter((i) => i.code !== locale.value)
});

const value = ref(
    locale.value || {
        code: 'en',
        name: 'English',
        language: '',
    }
);

const changed = (ev: any) => {
    switchLocalePath(value.value?.code || 'en');
};
</script>

<template>
    <USelect v-model="value" :items="availableLocales" @change="changed" />
</template>
