/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Wajib untuk Capacitor/Mobile build
  images: {
    unoptimized: true, // Wajib untuk static export
  },
  // Memastikan aplikasi berjalan lancar di lingkungan file:// (Android)
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
};

export default nextConfig;
