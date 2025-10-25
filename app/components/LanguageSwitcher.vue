<template>
    <DropdownMenu
        :ui="{
            content: 'w-48',
        }"
        :items="items"
        :popper="{ placement: 'bottom-end' }"
        v-model:open="open"
    >
        <UButton color="white" variant="ghost" trailing-icon="i-heroicons-chevron-down-20-solid">
            <UIcon name="i-heroicons-language" class="w-5 h-5" />
            <span class="ml-2">{{ currentLocaleName }}</span>
        </UButton>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>
            <UIcon
                v-if="item.code === locale"
                name="i-heroicons-check-20-solid"
                class="flex-shrink-0 h-5 w-5 text-primary-500"
            />
        </template>
    </DropdownMenu>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const open = ref(false);
const availableLocales = computed(() => {
    return locales.value as any[];
});

const currentLocaleName = computed(() => {
    const current = availableLocales.value.find((l) => l.code === locale.value);

    return current?.name || 'English';
});

const items = computed(() => [
    availableLocales.value.map((loc) => ({
        ...loc,
        label: loc.name,
        value: loc.code,
        code: loc.code,
        icon: locale.value === loc.code ? 'i-heroicons-check-circle' : undefined,
        async onSelect(e: Event) {
            e.preventDefault();
            console.log('onSelect loc', loc);
            await setLocale(loc.code);
            open.value = false;

            if (import.meta.client) {
                localStorage.setItem('preferred-locale', loc.code);
            }
        },
    })),
]);

onMounted(() => {
    if (import.meta.client) {
        const savedLocale = localStorage.getItem('preferred-locale');
        if (savedLocale && savedLocale !== locale.value) {
            setLocale(savedLocale);
        }
        console.log(items.value);
    }
});
</script>
