module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-color': '#1b323a',
				'second-color': '#699eb3',
				'third-color': '#f9a01b',
				'fourth-color': '#84bdcb',
				HNB: '#002b5c',
				SGH: '#98002E'
			},
			margin: {
				center: '0 auto'
			},
			maxWidth: {
				xxl: '1440px'
			},
			backgroundPosition: {
				middle: '50%'
			},
			backgroundImage: {
				'shadow-layer':
					'linear-gradient(90deg,#000 30%,transparent 52%),linear-gradient(0deg,#000 20%,transparent 35%)'
			},
			screens: {
				sm: '640px',
				// => @media (min-width: 640px) { ... }

				md: '768px',
				// => @media (min-width: 768px) { ... }

				lg: '1024px',
				// => @media (min-width: 1024px) { ... }

				xl: '1280px',
				// => @media (min-width: 1280px) { ... }

				'2xl': '1536px'
				// => @media (min-width: 1536px) { ... }
			}
		}
	},
	plugins: []
};
