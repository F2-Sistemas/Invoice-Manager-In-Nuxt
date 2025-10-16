// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: ['@nuxt/ui', '@nuxtjs/i18n'],

    i18n: {
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
        lazy: true,
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
});
