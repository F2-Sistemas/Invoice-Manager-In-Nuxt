import en from './i18n/locales/en.json';
import pt from './i18n/locales/pt.json';

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => {
    return {
        legacy: false,
        locale: 'en',
        messages: {
            en,
            pt,
        },
    };
});
