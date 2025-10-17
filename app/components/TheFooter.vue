<template>
    <footer class="bg-gray-900 text-white mt-auto">
        <UContainer class="py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Creative Kibbutz</h3>
                    <p class="text-gray-400">
                        {{ $t('hero.subtitle') }}
                    </p>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">{{ $t('nav.home') }}</h4>
                    <nav class="flex flex-col gap-2">
                        <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
                            {{ $t('nav.home') }}
                        </NuxtLink>
                        <NuxtLink to="/pages/portfolio" class="text-gray-400 hover:text-white transition-colors">
                            {{ $t('nav.portfolio') }}
                        </NuxtLink>
                        <NuxtLink to="/pages/contact" class="text-gray-400 hover:text-white transition-colors">
                            {{ $t('nav.contact') }}
                        </NuxtLink>
                    </nav>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">{{ $t('footer.newsletter') }}</h4>
                    <p class="text-gray-400 mb-4">
                        {{ $t('cta.description') }}
                    </p>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <div class="s">
                    <!-- <LanguageSwitcher /> -->
                    <LanguageSwitcherV1 />
                </div>
                <p>&copy; {{ new Date().getFullYear() }} Creative Kibbutz. All rights reserved.</p>
                <NuxtLink to="/privacy" class="hover:text-white transition-colors mt-2 inline-block">
                    {{ $t('footer.privacy') }}
                </NuxtLink>
            </div>
        </UContainer>
    </footer>
</template>

<script setup lang="ts"></script>
