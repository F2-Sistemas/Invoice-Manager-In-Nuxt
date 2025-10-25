<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: ['auth'],
});

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const login = async () => {
    error.value = '';
    loading.value = true;

    try {
        const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                username: username.value,
                password: password.value,
            },
        });

        if (response.success) {
            // Refresh user session after successful login
            const { refresh } = useUserSession();
            await refresh();
            // Navigate to dashboard
            await navigateTo('/');
        }
    } catch (err: any) {
        error.value = err.data?.message || 'Invalid credentials';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <UCard class="w-full max-w-md">
            <template #header>
                <div class="text-center">
                    <h1 class="text-2xl font-bold">Invoice Manager</h1>
                    <p class="text-gray-500 mt-2">Sign in to your account</p>
                </div>
            </template>

            <form @submit.prevent="login" class="space-y-4">
                <UFormGroup label="Username" required>
                    <UInput
                        v-model="username"
                        type="text"
                        placeholder="Enter your username"
                        size="lg"
                        :disabled="loading"
                    />
                </UFormGroup>

                <UFormGroup label="Password" required>
                    <UInput
                        v-model="password"
                        type="password"
                        placeholder="Enter your password"
                        size="lg"
                        :disabled="loading"
                    />
                </UFormGroup>

                <UAlert
                    v-if="error"
                    color="red"
                    variant="soft"
                    :title="error"
                    :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'link' }"
                    @close="error = ''"
                />

                <UButton type="submit" block size="lg" :loading="loading" :disabled="!username || !password">
                    Sign In
                </UButton>
            </form>

            <template #footer>
                <div class="text-center text-sm text-gray-500">
                    <p>Default credentials: admin / admin123</p>
                </div>
            </template>
        </UCard>
    </div>
</template>
