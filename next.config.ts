import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Значок Next.js в углу экрана. Он виден только в режиме разработки
  // и в собранный сайт не попадает, но мешает смотреть вёрстку.
  devIndicators: false,

  images: {
    // Заглушки изображений — векторные. Оптимизатор Next.js по умолчанию
    // отказывается отдавать SVG, поэтому разрешаем их явно и запрещаем
    // выполнение скриптов внутри картинки. Когда заказчик заменит заглушки
    // растровыми фотографиями, оптимизация включится сама.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
  },
};

export default nextConfig;
