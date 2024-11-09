/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
		colors: {
			'l-blue': '#E6F1FF'
		},
		backgroundColor: {
			'l-blue': '#E6F1FF'
		},
		fontSize: {
			'h1': '30px',
			'h2': '18px',
			'h3': '16px',
			'p': '15px',
			's': '12px'
		},
		spacing: {
			's' : '5px'
		}
	},
  },
  plugins: [],
};
