module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
    },
    colors: {
      'white': '#FFFFFF',
      'emerald': '#B1FFF8',
      'emerald-2': '#0BEBD6',
      'total' : '#B1FFF8',
      'card': '#9854fe33',
      'nav': 'rgba(40, 38, 54, 0.2)',
    },
    fontFamily: {
     'saira': ['Saira'],
    },
    fontSize: {
      '16px': '16px',
      '18px': '18px',
      '20px': '20px',
      '24px': '24px',
      '28px': '28px',
      '30px': '30px',
      '32px': '32px',
      '36px': '36px',
      '45px': '45px',
      '48px': '48px',
      '68px': '68px',
      '72px': '72px',
    },
    lineHeight: {
      '28px': '28px',
      '37px': '37px',
      '40px': '40px',
      '50px': '50px',
      '55px': '55px',
    },
    backgroundImage: {
      'gradient-1': 'linear-gradient(99.92deg, #CD28E8 0%, #0BEBD6 100%)',
      'game-card' : 'linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);',
      'player': 'linear-gradient(176.17deg, rgba(205, 40, 232, 0.3) 31.31%, rgba(11, 235, 214, 0.3) 96.4%)',
    },
    borderRadius: {
      '8px' : '8px',
      '16px' : '16px',
      '20px' : '20px',
    },
    extend: {
      width: {
        '80px': '80px',
      },
      spacing: {
        '10px': '10px',
        '15px': '15px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '28px': '28px',
        '30px': '30px',
        '32px': '32px',
        '40px': '40px',
        '60px': '60px',
        '97px': '97px',
        '100px': '100px',
        '115px': '115px',
        '120px': '120px',
        '140px': '140px',
        '150px': '150px',
        '160px': '160px',
        '180px': '180px',
        '200px': '200px',
        '220px': '220px',
        '250px': '250px',
        '300px': '300px',
        '360px': '360px',
        '380px': '380px',
        '400px': '400px',
        '500px': '500px',
      },
      boxShadow: {
        'player': 'inset 0px 98px 100px -48px rgba(0, 161, 253, 0.3), inset 0px 4px 18px rgba(8, 59, 88, 0.3)',
      }
    },
    container: {
       padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '100px',
      },
      center: true,
      screens: {
        xs: '540px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  
  },
}
