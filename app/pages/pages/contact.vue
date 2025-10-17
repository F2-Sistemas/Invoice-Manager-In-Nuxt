<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-5xl font-bold mb-6">
                        {{ $t('contact.title') }}
                    </h1>
                    <p class="text-xl">
                        {{ $t('cta.description') }}
                    </p>
                </div>
            </UContainer>
        </section>

        <!-- Contact Form & Info -->
        <section class="py-16">
            <UContainer>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <!-- Contact Form -->
                    <div>
                        <h2 class="text-3xl font-bold mb-6">
                            {{ $t('contact.title') }}
                        </h2>
                        <UCard>
                            <UForm :schema="schema" :state="state" class="space-y-6" @submit="submitContact">
                                <UFormField :label="$t('contact.form.name')" name="name" required>
                                    <UInput
                                        v-model="state.name"
                                        type="text"
                                        size="lg"
                                        :class="['w-full']"
                                        placeholder="John Doe"
                                        icon="i-heroicons-user"
                                    />
                                </UFormField>

                                <UFormField :label="$t('contact.form.email')" name="email" required>
                                    <UInput
                                        v-model="state.email"
                                        type="email"
                                        size="lg"
                                        :class="['w-full']"
                                        placeholder="john@example.com"
                                        icon="i-heroicons-envelope"
                                    />
                                </UFormField>

                                <UFormField :label="$t('contact.form.phone')" name="phone">
                                    <UInput
                                        v-model="state.phone"
                                        type="tel"
                                        size="lg"
                                        :class="['w-full']"
                                        placeholder="+1 (555) 123-4567"
                                        icon="i-heroicons-phone"
                                    />
                                </UFormField>

                                <UFormField :label="$t('contact.form.message')" name="message" required>
                                    <UTextarea
                                        v-model="state.message"
                                        rows="6"
                                        size="lg"
                                        :class="['w-full']"
                                        placeholder="Tell us about your project..."
                                    />
                                </UFormField>

                                <UButton type="submit" size="lg" block :loading="isSubmitting">
                                    {{ $t('contact.form.send') }}
                                </UButton>
                            </UForm>
                        </UCard>
                    </div>

                    <!-- Contact Information -->
                    <div>
                        <h2 class="text-3xl font-bold mb-6">
                            {{ $t('cta.title') }}
                        </h2>

                        <div class="space-y-6">
                            <UCard>
                                <div class="flex items-start gap-4">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full flex-shrink-0"
                                    >
                                        <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-lg mb-1">Email</h3>
                                        <p class="text-gray-600">{{ siteConfig.contact.email }}</p>
                                    </div>
                                </div>
                            </UCard>

                            <UCard>
                                <div class="flex items-start gap-4">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full flex-shrink-0"
                                    >
                                        <UIcon name="i-heroicons-phone" class="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-lg mb-1">Phone</h3>
                                        <p class="text-gray-600">{{ siteConfig.contact.phone }}</p>
                                    </div>
                                </div>
                            </UCard>

                            <UCard>
                                <div class="flex items-start gap-4">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full flex-shrink-0"
                                    >
                                        <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-lg mb-1">Location</h3>
                                        <p class="text-gray-600">{{ siteConfig.contact.location }}</p>
                                    </div>
                                </div>
                            </UCard>

                            <!-- Why Choose Us -->
                            <UCard class="bg-primary-50 border-primary-200">
                                <h3 class="font-semibold text-lg mb-4">{{ $t('features.title') }}</h3>
                                <ul class="space-y-3">
                                    <li class="flex items-start gap-2">
                                        <UIcon
                                            name="i-heroicons-check-circle"
                                            class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                                        />
                                        <span class="text-gray-700">{{ $t('features.team.title') }}</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <UIcon
                                            name="i-heroicons-check-circle"
                                            class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                                        />
                                        <span class="text-gray-700">{{ $t('features.model.title') }}</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <UIcon
                                            name="i-heroicons-check-circle"
                                            class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                                        />
                                        <span class="text-gray-700">{{ $t('features.ready.title') }}</span>
                                    </li>
                                </ul>
                            </UCard>
                        </div>
                    </div>
                </div>
            </UContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

import type { FormSubmitEvent } from '@nuxt/ui';

const { t } = useI18n();
const toast = useToast();

const siteConfig = await import('~/data/site-config.json').then((m) => m.default);

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
    name: '',
    email: '',
    phone: '',
    message: '',
});

const isSubmitting = ref(false);

const submitContact = async (event: FormSubmitEvent<Schema>) => {
    isSubmitting.value = true;

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.add({
            title: 'Success!',
            description: 'Your message has been sent. We will get back to you soon.',
            color: 'success',
        });

        state.name = '';
        state.email = '';
        state.phone = '';
        state.message = '';
    } catch (error) {
        toast.add({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            color: 'error',
        });
    } finally {
        isSubmitting.value = false;
    }
};

useHead({
    title: `${t('contact.title')} - Creative Kibbutz`,
    meta: [{ name: 'description', content: t('cta.description') }],
});
</script>
