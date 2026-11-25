/** @type {import('next').NextConfig} */
const nextConfig = {
  // Wajib untuk Capacitor: Menghasilkan folder 'out' statis
  output: 'export',
  // Menonaktifkan optimasi gambar karena tidak didukung di output statis tanpa server
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
