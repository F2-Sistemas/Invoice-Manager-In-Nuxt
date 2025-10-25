<template>
    <div>
        <NuxtLayout>
            <NuxtPage
                :transition="{
                    name: 'my',
                    mode: 'out-in',
                }"
            />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Invoice Manager - F2 Sistemas',
    meta: [{ name: 'description', content: 'Invoice Management System' }],
    htmlAttrs: {
        lang: 'en',
    },
});
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
