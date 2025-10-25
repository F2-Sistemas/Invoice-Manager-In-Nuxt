<script setup lang="ts">
const { user, clear } = useUserSession()

const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/login')
}

const links = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Clients',
    icon: 'i-heroicons-users',
    to: '/clients',
  },
  {
    label: 'Invoices',
    icon: 'i-heroicons-document-text',
    to: '/invoices',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              Invoice Manager
            </h1>
            <nav class="hidden md:flex space-x-4">
              <UButton
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                variant="ghost"
                :icon="link.icon"
              >
                {{ link.label }}
              </UButton>
            </nav>
          </div>

          <UDropdown
            :items="[
              [{
                label: user?.username || 'User',
                slot: 'account',
                disabled: true
              }],
              [{
                label: 'Sign out',
                icon: 'i-heroicons-arrow-right-on-rectangle',
                click: logout
              }]
            ]"
          >
            <UButton
              icon="i-heroicons-user-circle"
              variant="ghost"
              trailing-icon="i-heroicons-chevron-down"
            >
              {{ user?.username }}
            </UButton>
          </UDropdown>
        </div>
      </div>
    </header>

    <main class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>
