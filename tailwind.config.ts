import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    theme: {
        extend: {
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
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
} satisfies Config;
