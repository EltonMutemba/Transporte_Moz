/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. PALETA DE CORES PROFISSIONAL
      colors: {
        brand: {
          primary: "#2563eb",   // Azul Safira (Ação principal)
          secondary: "#0f172a", // Navy/Slate 900 (Textos e Sidebar)
          accent: "#ef4444",    // Vermelho (Alertas e Destaques)
          success: "#10b981",   // Verde (Bilhetes/Pagos)
          surface: "#f8fafc",   // Slate 50 (Fundos de Dashboard)
          border: "#e2e8f0",    // Slate 200 (Linhas subtis)
        },
        // Escala para estados de componentes (opcional, mas ajuda)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },

      // 2. ARREDONDAMENTOS EQUILIBRADOS
      borderRadius: {
        'panel': '1rem',    // 16px - Ideal para cards e dashboards
        'button': '0.6rem', // 10px - Botões modernos, não muito redondos
        'full': '9999px',
      },

      // 3. TIPOGRAFIA (Prevenindo tamanhos gigantes no Mobile)
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // Reduzido de 3rem para ser mais profissional
      },

      // 4. ANIMAÇÕES SUAVES
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}