<template>
    <div v-if="caseData">
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="max-w-4xl mx-auto">
                    <UBadge color="neutral" variant="soft" size="lg" class="mb-4">
                        {{ caseData.category[locale] }}
                    </UBadge>
                    <h1 class="text-5xl font-bold mb-6">
                        {{ caseData.title[locale] }}
                    </h1>
                    <p class="text-xl">
                        {{ caseData.description[locale] }}
                    </p>
                </div>
            </UContainer>
        </section>

        <!-- Case Image -->
        <section class="py-12 bg-gray-50">
            <!-- Back to Portfolio -->
            <section class="pb-8">
                <UContainer>
                    <div class="text-center">
                        <UButton to="/pages/portfolio" variant="ghost" icon="i-heroicons-arrow-left">
                            {{ $t('nav.portfolio') }}
                        </UButton>
                    </div>
                </UContainer>
            </section>

            <UContainer>
                <img
                    v-if="caseData?.image"
                    :src="caseData?.image"
                    :alt="caseData.title[locale]"
                    class="rounded-xl max-w-5xl mx-auto w-10/12"
                />
                <div
                    v-else
                    class="aspect-video bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden max-w-5xl mx-auto"
                >
                    <UIcon name="i-heroicons-photo" class="w-24 h-24 text-gray-400" />
                </div>
            </UContainer>
        </section>

        <!-- Case Details -->
        <section class="py-16">
            <UContainer>
                <div class="max-w-4xl mx-auto space-y-12">
                    <!-- About Client -->
                    <div class="mb-8">
                        <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                            <UIcon name="i-heroicons-building-office-2" class="text-primary-600" />
                            {{ $t('case.aboutClient') }}
                        </h2>
                        <UCard>
                            <p class="text-lg text-gray-700">
                                {{ caseData.aboutClient[locale] }}
                            </p>
                        </UCard>
                    </div>

                    <!-- Problem -->
                    <div class="mb-8">
                        <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                            <UIcon name="i-heroicons-exclamation-circle" class="text-primary-600" />
                            {{ $t('case.problem') }}
                        </h2>
                        <UCard>
                            <p class="text-lg text-gray-700">
                                {{ caseData.problem[locale] }}
                            </p>
                        </UCard>
                    </div>

                    <!-- Solution -->
                    <div class="mb-8">
                        <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                            <UIcon name="i-heroicons-light-bulb" class="text-primary-600" />
                            {{ $t('case.solution') }}
                        </h2>
                        <UCard>
                            <p class="text-lg text-gray-700">
                                {{ caseData.solution[locale] }}
                            </p>
                        </UCard>
                    </div>

                    <!-- Results -->
                    <div class="mb-8">
                        <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                            <UIcon name="i-heroicons-chart-bar" class="text-primary-600" />
                            {{ $t('case.results') }}
                        </h2>
                        <UCard class="bg-green-50 border-green-200">
                            <p class="text-lg text-gray-700">
                                {{ caseData.results[locale] }}
                            </p>
                        </UCard>
                    </div>

                    <!-- Feedback -->
                    <div class="mb-8">
                        <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                            <UIcon name="i-heroicons-chat-bubble-left-right" class="text-primary-600" />
                            {{ $t('case.feedback') }}
                        </h2>
                        <UCard class="bg-primary-50 border-primary-200">
                            <blockquote class="text-lg italic text-gray-700">
                                {{ caseData.feedback[locale] }}
                            </blockquote>
                        </UCard>
                    </div>
                </div>
            </UContainer>
        </section>

        <!-- Schedule Contact Form -->
        <section class="py-16 bg-gradient-to-b from-gray-50 to-white">
            <UContainer>
                <div class="max-w-5xl mx-auto">
                    <div class="text-center mb-12">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <UIcon name="i-heroicons-calendar-days" class="w-8 h-8 text-primary-600" />
                        </div>
                        <h2 class="text-4xl font-bold mb-4">
                            {{ $t('case.scheduleContact.title') }}
                        </h2>
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                            {{ $t('case.scheduleContact.description') }}
                        </p>
                    </div>

                    <UCard class="shadow-xl">
                        <UForm :state="scheduleForm" :schema="formSchema" @submit="submitSchedule">
                            <div class="space-y-6">
                                <!-- Personal Information -->
                                <div>
                                    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <UIcon name="i-heroicons-user-circle" class="text-primary-600" />
                                        Personal Information
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <UFormField :label="$t('contact.form.name')" name="name" required>
                                            <UInput
                                                v-model="scheduleForm.name"
                                                icon="i-heroicons-user"
                                                size="lg"
                                                :class="['w-full']"
                                                placeholder="John Doe"
                                            />
                                        </UFormField>

                                        <UFormField :label="$t('contact.form.email')" name="email" required>
                                            <UInput
                                                v-model="scheduleForm.email"
                                                type="email"
                                                icon="i-heroicons-envelope"
                                                size="lg"
                                                :class="['w-full']"
                                                placeholder="john@example.com"
                                            />
                                        </UFormField>

                                        <UFormField :label="$t('contact.form.phone')" name="phone">
                                            <UInput
                                                v-model="scheduleForm.phone"
                                                type="tel"
                                                icon="i-heroicons-phone"
                                                size="lg"
                                                :class="['w-full']"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </UFormField>

                                        <UFormField :label="$t('case.scheduleContact.service')" name="service" required>
                                            <USelectMenu
                                                v-model="scheduleForm.service"
                                                :options="serviceOptions"
                                                size="lg"
                                                :class="['w-full']"
                                                placeholder="Select a service"
                                            >
                                                <template #leading>
                                                    <UIcon name="i-heroicons-briefcase" />
                                                </template>
                                            </USelectMenu>
                                        </UFormField>
                                    </div>
                                </div>

                                <!-- Schedule Preferences -->
                                <div>
                                    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <UIcon name="i-heroicons-clock" class="text-primary-600" />
                                        Schedule Preferences
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <UFormField :label="$t('case.scheduleContact.date')" name="preferredDate">
                                            <UInput
                                                v-model="scheduleForm.preferredDate"
                                                type="date"
                                                icon="i-heroicons-calendar"
                                                size="lg"
                                                :class="['w-full']"
                                                :min="minDate"
                                            />
                                        </UFormField>

                                        <UFormField :label="$t('case.scheduleContact.time')" name="preferredTime">
                                            <USelectMenu
                                                v-model="scheduleForm.preferredTime"
                                                :options="timeSlots"
                                                size="lg"
                                                :class="['w-full']"
                                                placeholder="Select a time"
                                            >
                                                <template #leading>
                                                    <UIcon name="i-heroicons-clock" />
                                                </template>
                                            </USelectMenu>
                                        </UFormField>
                                    </div>
                                </div>

                                <!-- Additional Information -->
                                <div>
                                    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <UIcon name="i-heroicons-chat-bubble-left-right" class="text-primary-600" />
                                        Additional Information
                                    </h3>
                                    <UFormField :label="$t('contact.form.message')" name="message">
                                        <UTextarea
                                            v-model="scheduleForm.message"
                                            :rows="5"
                                            size="lg"
                                            :class="['w-full']"
                                            placeholder="Tell us more about your project..."
                                        />
                                    </UFormField>
                                </div>

                                <!-- Submit Button -->
                                <div class="flex items-center justify-center pt-4">
                                    <UButton
                                        type="submit"
                                        size="xl"
                                        :loading="isSubmitting"
                                        icon="i-heroicons-paper-airplane"
                                        class="px-12"
                                    >
                                        {{ $t('case.scheduleContact.submit') }}
                                    </UButton>
                                </div>
                            </div>
                        </UForm>
                    </UCard>

                    <!-- Trust Indicators -->
                    <div class="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-shield-check" class="text-green-600" />
                            <span>Secure & Private</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-clock" class="text-blue-600" />
                            <span>24h Response Time</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-check-badge" class="text-purple-600" />
                            <span>No Commitment Required</span>
                        </div>
                    </div>
                </div>
            </UContainer>
        </section>

        <!-- Back to Portfolio -->
        <section class="py-8">
            <UContainer>
                <div class="text-center">
                    <UButton to="/pages/portfolio" variant="ghost" icon="i-heroicons-arrow-left">
                        {{ $t('nav.portfolio') }}
                    </UButton>
                </div>
            </UContainer>
        </section>
    </div>
    <div v-else class="py-20">
        <UContainer>
            <div class="text-center">
                <h1 class="text-3xl font-bold mb-4">Case not found</h1>
                <UButton to="/pages/portfolio">
                    {{ $t('nav.portfolio') }}
                </UButton>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

const route = useRoute();
const { locale } = useI18n();
const { t } = useI18n();
const toast = useToast();

const casesData = await import('~/data/cases.json').then((m) => m.default);

const caseData = computed(() => {
    return casesData.find((c) => c.slug === route.params.slug);
});

// Form Schema with Zod validation
const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    service: z.string().min(1, 'Please select a service'),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    message: z.string().optional(),
});

const scheduleForm = ref({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
});

const isSubmitting = ref(false);

// Service options
const serviceOptions = [
    'Branding & Logo Design',
    'Marketing Campaign',
    'Social Media Management',
    'Print Design',
    'Event Marketing',
    'Apparel Design',
    'Web Design',
    'Video Production',
    'Consultation',
    'Other',
];

// Time slots
const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
];

// Min date (today)
const minDate = computed(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
});

const submitSchedule = async (event: any) => {
    isSubmitting.value = true;

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.add({
            title: t('case.scheduleContact.submit') + ' ✓',
            description: 'Your contact request has been received. We will get back to you within 24 hours.',
            color: 'success',
            icon: 'i-heroicons-check-circle',
            timeout: 5000,
        });

        // Reset form
        scheduleForm.value = {
            name: '',
            email: '',
            phone: '',
            service: '',
            preferredDate: '',
            preferredTime: '',
            message: '',
        };
    } catch (error) {
        toast.add({
            title: 'Error',
            description: 'Something went wrong. Please try again or contact us directly.',
            color: 'error',
            icon: 'i-heroicons-exclamation-circle',
        });
    } finally {
        isSubmitting.value = false;
    }
};

useHead({
    title: caseData.value ? `${caseData.value.title[locale.value]} - Creative Kibbutz` : 'Case Not Found',
    meta: [{ name: 'description', content: caseData.value?.description[locale.value] || '' }],
});
</script>
