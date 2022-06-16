/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{vue,html,js}"],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: '5%',
                    sm: '5%',
                    lg: '5%',
                    xl: '10%',
                    '2xl': '15%',
                },
            }
        },
    },
    purge: [
        './src/**/*.html',
        './src/**/*.vue'
    ],
    plugins: [require('@tailwindcss/typography'), require('daisyui'), require('autoprefixer')],
    daisyui: {
        themes: ["cupcake","night"],
        darkTheme: "night"
    }
}
