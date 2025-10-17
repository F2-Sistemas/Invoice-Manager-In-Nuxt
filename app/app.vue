<template>
    <div>
        <NuxtLayout>
            <NuxtPage
                :transition="{
                    name: 'my',
                    mode: 'out-in',
                    onBeforeEnter,
                }"
            />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Creative Kibbutz - Your Partner in Community Success',
    meta: [{ name: 'description', content: 'Marketing, Design, and Web Services for Jewish Organizations' }],
    htmlAttrs: {
        lang: 'en',
    },
});

const { finalizePendingLocaleChange } = useI18n();

const onBeforeEnter = async () => {
    await finalizePendingLocaleChange();
};
</script>

<style>
.my-enter-active,
.my-leave-active {
    transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
    opacity: 0;
}
</style>
