<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{
    collapsed?: boolean;
}>();

const companies = ref([
    {
        label: 'F2 Sistemas',
        avatar: {
            src: 'https://ui-avatars.com/api/?name=F2+Sistemas&background=0D8ABC&color=fff',
            alt: 'F2 Sistemas',
        },
    },
    {
        label: 'Main Company',
        avatar: {
            src: 'https://ui-avatars.com/api/?name=Main+Company&background=10B981&color=fff',
            alt: 'Main Company',
        },
    },
]);
const selectedCompany = ref(companies.value[0]);

const items = computed<DropdownMenuItem[][]>(() => {
    return [
        companies.value.map((company) => ({
            ...company,
            onSelect() {
                selectedCompany.value = company;
            },
        })),
        [
            {
                label: 'Create company',
                icon: 'i-lucide-circle-plus',
            },
            {
                label: 'Manage companies',
                icon: 'i-lucide-cog',
            },
        ],
    ];
});
</script>

<template>
    <UDropdownMenu
        :items="items"
        :content="{ align: 'center', collisionPadding: 12 }"
        :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
    >
        <UButton
            v-bind="{
                ...selectedCompany,
                label: collapsed ? undefined : selectedCompany?.label,
                trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
            }"
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            class="data-[state=open]:bg-elevated"
            :class="[!collapsed && 'py-2']"
            :ui="{
                trailingIcon: 'text-dimmed',
            }"
        />
    </UDropdownMenu>
</template>
