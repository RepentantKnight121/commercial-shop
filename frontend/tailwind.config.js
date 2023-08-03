/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{html,tsx}", "./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors:{
        'blue-light' : '#AEE2FF',
        'grey-light' : '#EEEEEE',
        'coffee' : '#CBB279'
      }
    },
    fontFamily: {
      'barlow': ['Barlow']
    
    }
  },
  plugins: [],
}

