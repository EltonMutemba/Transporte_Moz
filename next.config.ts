import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. SUPORTE A IMAGENS (Supabase Storage) */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  /* 2. RIGOR TÉCNICO */
  typescript: {
    // Mantemos o rigor. Se houver erro de tipo, o build avisa.
    ignoreBuildErrors: false, 
  },

  /* 3. SEGURANÇA */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;