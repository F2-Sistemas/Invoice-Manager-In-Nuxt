<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const open = ref(false);

const links = [
    [
        {
            label: 'Dashboard',
            icon: 'i-lucide-home',
            to: '/',
            onSelect: () => {
                open.value = false;
            },
        },
        {
            label: 'Invoices',
            icon: 'i-lucide-file-text',
            to: '/invoices',
            onSelect: () => {
                open.value = false;
            },
        },
        {
            label: 'Clients',
            icon: 'i-lucide-users',
            to: '/clients',
            onSelect: () => {
                open.value = false;
            },
        },
    ],
    [
        {
            label: 'Privacy Policy',
            icon: 'i-lucide-shield',
            to: '/privacy',
            onSelect: () => {
                open.value = false;
            },
        },
        {
            label: 'Help & Support',
            icon: 'i-lucide-info',
            to: 'https://github.com/nuxt-ui-templates/dashboard',
            target: '_blank',
        },
    ],
] satisfies NavigationMenuItem[][];

const groups = computed(() => [
    {
        id: 'links',
        label: 'Go to',
        items: links.flat(),
    },
]);
</script>

<template>
    <UDashboardGroup unit="rem">
        <UDashboardSidebar
            id="default"
            v-model:open="open"
            collapsible
            resizable
            class="bg-elevated/25"
            :ui="{ footer: 'lg:border-t lg:border-default' }"
        >
            <template #header="{ collapsed }">
                <TeamsMenu :collapsed="collapsed" />
            </template>

            <template #default="{ collapsed }">
                <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

                <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip popover />

                <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" class="mt-auto" />
            </template>

            <template #footer="{ collapsed }">
                <UserMenu :collapsed="collapsed" />
            </template>
        </UDashboardSidebar>

        <UDashboardSearch :groups="groups" />

        <slot />
    </UDashboardGroup>
</template>
