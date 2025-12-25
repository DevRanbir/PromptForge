/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./libs/**/*.{html,ts}",
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'color-mix(in srgb, var(--border) calc(<alpha-value> * 100%), transparent)',
                input: 'color-mix(in srgb, var(--input) calc(<alpha-value> * 100%), transparent)',
                ring: 'color-mix(in srgb, var(--ring) calc(<alpha-value> * 100%), transparent)',
                background: 'color-mix(in srgb, var(--background) calc(<alpha-value> * 100%), transparent)',
                foreground: 'color-mix(in srgb, var(--foreground) calc(<alpha-value> * 100%), transparent)',
                primary: {
                    DEFAULT: 'color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--primary-foreground) calc(<alpha-value> * 100%), transparent)',
                },
                secondary: {
                    DEFAULT: 'color-mix(in srgb, var(--secondary) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--secondary-foreground) calc(<alpha-value> * 100%), transparent)',
                },
                destructive: {
                    DEFAULT: 'color-mix(in srgb, var(--destructive) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--destructive-foreground) calc(<alpha-value> * 100%), transparent)',
                },
                muted: {
                    DEFAULT: 'color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--muted-foreground) calc(<alpha-value> * 100%), transparent)',
                },
                accent: {
                    DEFAULT: 'color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--accent-foreground) calc(<alpha-value> * 100%), transparent)',
                },
                popover: {
                    DEFAULT: 'color-mix(in srgb, var(--popover) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--popover-foreground) calc(<alpha-value> * 100%), transparent)',
                },
                card: {
                    DEFAULT: 'color-mix(in srgb, var(--card) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--card-foreground) calc(<alpha-value> * 100%), transparent)',
                },
                sidebar: {
                    DEFAULT: 'color-mix(in srgb, var(--sidebar) calc(<alpha-value> * 100%), transparent)',
                    foreground: 'color-mix(in srgb, var(--sidebar-foreground) calc(<alpha-value> * 100%), transparent)',
                    primary: 'color-mix(in srgb, var(--sidebar-primary) calc(<alpha-value> * 100%), transparent)',
                    'primary-foreground': 'color-mix(in srgb, var(--sidebar-primary-foreground) calc(<alpha-value> * 100%), transparent)',
                    accent: 'color-mix(in srgb, var(--sidebar-accent) calc(<alpha-value> * 100%), transparent)',
                    'accent-foreground': 'color-mix(in srgb, var(--sidebar-accent-foreground) calc(<alpha-value> * 100%), transparent)',
                    border: 'color-mix(in srgb, var(--sidebar-border) calc(<alpha-value> * 100%), transparent)',
                    ring: 'color-mix(in srgb, var(--sidebar-ring) calc(<alpha-value> * 100%), transparent)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                serif: ['var(--font-serif)', 'serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
            boxShadow: {
                '2xs': 'var(--shadow-2xs)',
                xs: 'var(--shadow-xs)',
                sm: 'var(--shadow-sm)',
                DEFAULT: 'var(--shadow)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
                '2xl': 'var(--shadow-2xl)',
            }
        },
    },
    plugins: [],
}
