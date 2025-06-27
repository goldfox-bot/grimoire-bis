
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// D&D Theme colors
				dungeon: {
					50: '#fdf6e3',
					100: '#f7e6c1',
					200: '#efc47b',
					300: '#e6a335',
					400: '#d4841f',
					500: '#b8670f',
					600: '#9a4d0a',
					700: '#7c3607',
					800: '#5e2205',
					900: '#401404',
				},
				gold: {
					50: '#fefce8',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
				parchment: {
					50: '#fefdf9',
					100: '#fefbf3',
					200: '#fdf6e7',
					300: '#fbf0db',
					400: '#f8e9cf',
					500: '#f5e2c3',
					600: '#f2dbb7',
					700: '#efd4ab',
					800: '#eccd9f',
					900: '#e9c693',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'glow': {
					'0%, 100%': {
						textShadow: '0 0 5px #fcd34d, 0 0 10px #fcd34d, 0 0 15px #fcd34d'
					},
					'50%': {
						textShadow: '0 0 10px #fcd34d, 0 0 20px #fcd34d, 0 0 30px #fcd34d'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'glow': 'glow 2s ease-in-out infinite alternate'
			},
			fontFamily: {
				'medieval': ['Cinzel', 'serif'],
				'fantasy': ['Cinzel Decorative', 'serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
