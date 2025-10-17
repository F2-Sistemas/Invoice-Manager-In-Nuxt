import nuxtUiVite from '@nuxt/ui/vite';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    runtimeConfig: {
        public: {
            shopEnabled: true, // Set to false to disable shop
            blogEnabled: true, // Set to false to disable blog
        },
    },

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
        langDir: 'locales', // inside /i18n directory
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

    ui: {
        theme: {
            colors: {
                primary: {
                    50: '#f3f4fb',
                    100: '#e8e9f7',
                    200: '#d4d6f0',
                    300: '#b5bae5',
                    400: '#9198d6',
                    500: '#6b72c3',
                    600: '#5157ad',
                    700: '#434bac',
                    800: '#3a418b',
                    900: '#313872',
                    950: '#1f2348',
                },
            },
        },
    },

    vite: {
        plugins: [
            tailwindcss(),
            nuxtUiVite(),
            //
        ],
    },
});
