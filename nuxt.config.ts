import nuxtUiVite from '@nuxt/ui/vite';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    modules: [
        '@nuxt/ui',
        '@nuxtjs/i18n',
        //
    ],

    i18n: {
        // vueI18n: './nuxt-i18n.js',
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en.json',
            },
            {
                code: 'pt',
                name: 'Português',
                file: 'pt.json',
            },
        ],
        langDir: 'locales',
        defaultLocale: 'en',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            alwaysRedirect: false,
            fallbackLocale: 'en',
            cookieSecure: false,
            cookieCrossOrigin: false,
        },
    },

    colorMode: {
        preference: 'light',
    },
    vite: {
        plugins: [
            tailwindcss(),
            nuxtUiVite(),
            //
        ],
    },
});
