import type { Config } from "tailwindcss";

const config: Config = {
        darkMode: ["class"],
        content: [
                "./pages/**/*.{js,ts,jsx,tsx,mdx}",
                "./components/**/*.{js,ts,jsx,tsx,mdx}",
                "./app/**/*.{js,ts,jsx,tsx,mdx}",
        ],
        theme: {
                patterns: {
                        opacities: {
                                100: "1",
                                80: ".80",
                                60: ".60",
                                40: ".40",
                                20: ".20",
                                10: ".10",
                                5: ".05",
                        },
                        sizes: {
                                1: "0.25rem",
                                2: "0.5rem",
                                4: "1rem",
                                6: "1.5rem",
                                8: "2rem",
                                16: "4rem",
                                20: "5rem",
                                24: "6rem",
                                32: "8rem",
                        }
                },
                screens: {
                        xs: '375px',
                        sm: '640px',
                        md: '768px',
                        lg: '1024px'
                },
                extend: {
                        colors: {
                                background: 'hsl(var(--background))',
                                foreground: 'hsl(var(--foreground))',
                                card: {
                                        DEFAULT: 'hsl(var(--card))',
                                        foreground: 'hsl(var(--card-foreground))'
                                },
                                popover: {
                                        DEFAULT: 'hsl(var(--popover))',
                                        foreground: 'hsl(var(--popover-foreground))'
                                },
                                primary: {
                                        DEFAULT: 'hsl(var(--primary))',
                                        foreground: 'hsl(var(--primary-foreground))'
                                },
                                secondary: {
                                        DEFAULT: 'hsl(var(--secondary))',
                                        foreground: 'hsl(var(--secondary-foreground))'
                                },
                                muted: {
                                        DEFAULT: 'hsl(var(--muted))',
                                        foreground: 'hsl(var(--muted-foreground))'
                                },
                                accent: {
                                        DEFAULT: 'hsl(var(--accent))',
                                        foreground: 'hsl(var(--accent-foreground))'
                                },
                                destructive: {
                                        DEFAULT: 'hsl(var(--destructive))',
                                        foreground: 'hsl(var(--destructive-foreground))'
                                },
                                border: 'hsl(var(--border))',
                                input: 'hsl(var(--input))',
                                ring: 'hsl(var(--ring))',
                                chart: {
                                        '1': 'hsl(var(--chart-1))',
                                        '2': 'hsl(var(--chart-2))',
                                        '3': 'hsl(var(--chart-3))',
                                        '4': 'hsl(var(--chart-4))',
                                        '5': 'hsl(var(--chart-5))'
                                },
                                sidebar: {
                                        DEFAULT: 'hsl(var(--sidebar-background))',
                                        foreground: 'hsl(var(--sidebar-foreground))',
                                        primary: 'hsl(var(--sidebar-primary))',
                                        'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                                        accent: 'hsl(var(--sidebar-accent))',
                                        'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                                        border: 'hsl(var(--sidebar-border))',
                                        ring: 'hsl(var(--sidebar-ring))'
                                }
                        },
                        borderRadius: {
                                lg: 'var(--radius)',
                                md: 'calc(var(--radius) - 2px)',
                                sm: 'calc(var(--radius) - 4px)'
                        }
                }
        },
        plugins: [require("tailwindcss-animate"), require('tailwindcss-bg-patterns')],
};
export default config;