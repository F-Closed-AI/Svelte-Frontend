/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				light: {
					btn: {
						primary: {
							color: '#ffffff',
							background: '#2F2F53',
							hover: '#585899'
						},
						secondary: {
							color: '#000000',
							background: '#ffffff',
							hover: '#EBEBEB'
						}
					},
					icon: {
						color: '#2F2F53',
						hover: '#585899'
					},
					notification: '#ffffff',
					background: '#ffffff',
					dashboard: {
						light: '#F5F5F5',
						dark: '#E4E4E4'
					},
					text: {
						primary: '#000000',
						secondary: '#B4B8C2',
						tertiary: '#ffffff',
						accent: '#3DD1F5',
						highlight: 'rgba(61,209,245, 0.1)'
					},
					gradient: {
						left: '#2F2F53',
						right: '#3DD1F5'
					}
				}
			},
			height: {
				line: '0.175rem'
			},
			backgroundColor: {
				light: {
					notification: '#F94341'
				}
			},
			outlineColor: {
				default: '#B4B8C2'
			},
			gradientColorStops: {
				skeleton: {
					primary: '#EEEEEE',
					secondary: '#DEDEDE'
				}
			},
			keyframes: {
				skeleton: {
					'0%': { 'background-position': '100% 0%' },
					'100%': { 'background-position': '-100% 0%' }
				}
			},
			fontFamily: {
				primary: ['Poppins', 'sans-serif'],
				secondary: ['DM Mono', 'sans-serif']
			}
		},
		animation: {
			skeleton: 'skeleton 1.5s linear infinite'
		},
		fontSize: {
			xs: 'clamp(0.25rem, 3.5vw, 0.5rem)',
			sm: 'clamp(1rem, 3.5vw, 1.25rem)',
			base: 'clamp(1.25rem, 3.5vw, 1.5rem)',
			lg: 'clamp(1.375rem, 4vw, 2rem)',
			xl: 'clamp(1.5rem, 4vw, 2.5rem)'
		},
		screens: {
			xs: { max: '576px' },
			sm: { max: '768px' },
			md: { max: '992px' },
			lg: { max: '1200px' },
			xl: { max: '1440px' },
			xxl: { max: '1600px' },
			xxxl: { max: '1800px' }
		}
	},
	plugins: []
};
