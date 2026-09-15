/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Warm near-black neutrals (walnut/espresso)
        ink: {
          950: '#191410',
          900: '#221B15',
          800: '#2E261D',
          700: '#403529',
          600: '#57493A',
          500: '#6F6153',
          400: '#8C7E6F',
          300: '#AB9F91',
          200: '#CBC1B5',
          100: '#E5DED4',
          50: '#F3EFE9'
        },
        // Warm paper background/neutrals
        paper: {
          50: '#FBF9F5',
          100: '#F6F2EB',
          200: '#EFE9DF',
          300: '#E2D9CC',
          400: '#D3C7B7'
        },
        // Terracotta / clay accent (primary CTA)
        rust: {
          50: '#FBF3ED',
          100: '#F6E3D4',
          200: '#EEC9AA',
          300: '#E2A97D',
          400: '#D08555',
          500: '#BB6A3B',
          600: '#A8552C',
          700: '#8C4523',
          800: '#6F371D',
          900: '#572C19'
        },
        // Brass / aged-bronze detail
        brass: {
          50: '#FBF7EE',
          100: '#F5ECD7',
          200: '#EAD9AF',
          300: '#DCC287',
          400: '#C9A75E',
          500: '#B28B45',
          600: '#9A7234',
          700: '#7D5A2B',
          800: '#634723',
          900: '#4E381E'
        },
        // Muted moss (secondary / trust color)
        moss: {
          50: '#F3F5F0',
          100: '#E4E8DE',
          200: '#CBD3BF',
          300: '#AAB79A',
          400: '#8B9A7A',
          500: '#718064',
          600: '#5C6851',
          700: '#4A5441',
          800: '#3C4435',
          900: '#32392D'
        },
        // Backwards-compatible aliases so existing classes still harmonize
        brand: {
          50: '#FBF3ED',
          100: '#F6E3D4',
          200: '#EEC9AA',
          300: '#E2A97D',
          400: '#D08555',
          500: '#BB6A3B',
          600: '#A8552C',
          700: '#8C4523',
          800: '#6F371D',
          900: '#572C19'
        },
        navy: {
          50: '#F3F5F0',
          100: '#E4E8DE',
          200: '#CBD3BF',
          300: '#AAB79A',
          400: '#8B9A7A',
          500: '#718064',
          600: '#5C6851',
          700: '#4A5441',
          800: '#3C4435',
          900: '#32392D'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(34, 27, 21, 0.18)',
        lift: '0 24px 60px -24px rgba(34, 27, 21, 0.28)',
        card: '0 1px 2px rgba(34, 27, 21, 0.04)'
      },
      letterSpacing: {
        eyebrow: '0.22em'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: []
};