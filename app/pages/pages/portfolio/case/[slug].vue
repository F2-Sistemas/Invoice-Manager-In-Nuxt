<template>
    <div v-if="caseData">
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="max-w-4xl mx-auto">
                    <UBadge color="white" variant="soft" size="lg" class="mb-4">
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
            <UContainer>
                <div
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
        <section class="py-16 bg-gray-50">
            <UContainer>
                <div class="max-w-4xl mx-auto">
                    <div class="text-center mb-8">
                        <h2 class="text-4xl font-bold mb-4">
                            {{ $t('case.scheduleContact.title') }}
                        </h2>
                        <p class="text-lg text-gray-600">
                            {{ $t('case.scheduleContact.description') }}
                        </p>
                    </div>

                    <UCard>
                        <form @submit.prevent="submitSchedule" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <UFormGroup :label="$t('contact.form.name')" required>
                                    <UInput v-model="scheduleForm.name" type="text" size="lg" required />
                                </UFormGroup>

                                <UFormGroup :label="$t('contact.form.email')" required>
                                    <UInput v-model="scheduleForm.email" type="email" size="lg" required />
                                </UFormGroup>

                                <UFormGroup :label="$t('contact.form.phone')">
                                    <UInput v-model="scheduleForm.phone" type="tel" size="lg" />
                                </UFormGroup>

                                <UFormGroup :label="$t('case.scheduleContact.service')" required>
                                    <UInput v-model="scheduleForm.service" type="text" size="lg" required />
                                </UFormGroup>

                                <UFormGroup :label="$t('case.scheduleContact.date')">
                                    <UInput v-model="scheduleForm.preferredDate" type="date" size="lg" />
                                </UFormGroup>

                                <UFormGroup :label="$t('case.scheduleContact.time')">
                                    <UInput v-model="scheduleForm.preferredTime" type="time" size="lg" />
                                </UFormGroup>
                            </div>

                            <UFormGroup :label="$t('contact.form.message')">
                                <UTextarea v-model="scheduleForm.message" rows="4" size="lg" />
                            </UFormGroup>

                            <div class="text-center">
                                <UButton type="submit" size="lg" :loading="isSubmitting">
                                    {{ $t('case.scheduleContact.submit') }}
                                </UButton>
                            </div>
                        </form>
                    </UCard>
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
const route = useRoute();
const { locale } = useI18n();
const { t } = useI18n();
const toast = useToast();

const casesData = await import('~/data/cases.json').then((m) => m.default);

const caseData = computed(() => {
    return casesData.find((c) => c.slug === route.params.slug);
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

const submitSchedule = async () => {
    isSubmitting.value = true;

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.add({
            title: 'Success!',
            description: 'Your contact request has been received. We will get back to you soon.',
            color: 'green',
        });

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
            description: 'Something went wrong. Please try again.',
            color: 'red',
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
