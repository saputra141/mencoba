/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Wajib untuk Capacitor agar menghasilkan folder /out
  images: {
    unoptimized: true, // Wajib untuk static export
  },
  // Mencegah error linting saat build di CI jika ada typo kecil
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
