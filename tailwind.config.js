/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Add explicit dark mode
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1F2937',
            a: {
              color: '#1877F2',
              '&:hover': {
                color: '#1558B3',
              },
            },
            table: {
              borderCollapse: 'collapse',
              width: '100%',
              margin: '2rem 0',
            },
            'thead th': {
              backgroundColor: '#F9FAFB',
              borderBottom: '2px solid #E5E7EB',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#4B5563',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            'tbody td': {
              padding: '0.75rem 1rem',
              borderBottom: '1px solid #E5E7EB',
              fontSize: '0.875rem',
              color: '#4B5563',
            },
            'tbody tr:last-child td': {
              borderBottom: 'none',
            },
            'tbody tr:hover': {
              backgroundColor: '#F9FAFB',
            },
            'h1, h2, h3': {
              color: '#1F2937',
              'font-weight': '600',
              'scroll-margin-top': '5rem',
              'dark:color': '#E4E5E7',
            },
            pre: {
              'background-color': '#1E293B',
              'color': '#E4E5E7',
              padding: '1rem',
              'border-radius': '0.5rem',
              'overflow-x': 'auto',
            },
            code: {
              backgroundColor: '#F3F4F6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            },
            blockquote: {
              borderLeftColor: '#1877F2',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: '#4B5563',
              margin: '1.5rem 0',
            },
          },
        },
      },
      textDirection: {
        rtl: 'rtl',
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0F172A',      // Darker background
          surface: '#1E293B', // Refined surface color
          text: '#E4E5E7',    // Enhanced readability
          border: '#2C3E50',  // Better contrast
          accent: '#3B82F6'   // Primary accent
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};