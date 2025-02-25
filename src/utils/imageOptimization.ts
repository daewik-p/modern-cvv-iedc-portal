
/**
 * Utility functions for image optimization
 */

/**
 * Determines optimal image size based on viewport width
 * @param baseWidth The base/maximum width of the image
 * @returns The optimal width for the current viewport
 */
export const getOptimalImageWidth = (baseWidth: number): number => {
  // Get viewport width
  const viewportWidth = window.innerWidth;
  
  // Define breakpoints and corresponding image sizes
  const breakpoints = [
    { width: 640, size: Math.min(baseWidth, 640) },   // sm
    { width: 768, size: Math.min(baseWidth, 768) },   // md
    { width: 1024, size: Math.min(baseWidth, 1024) }, // lg
    { width: 1280, size: Math.min(baseWidth, 1280) }, // xl
    { width: 1536, size: Math.min(baseWidth, 1536) }  // 2xl
  ];
  
  // Find the appropriate size based on viewport width
  for (const breakpoint of breakpoints) {
    if (viewportWidth <= breakpoint.width) {
      return breakpoint.size;
    }
  }
  
  // Default to base width if no breakpoint matches
  return baseWidth;
};

/**
 * Creates a srcset string for responsive images
 * @param baseSrc The base image URL without size parameters
 * @param sizes Array of sizes to include in the srcset
 * @returns Complete srcset string
 */
export const createSrcSet = (baseSrc: string, sizes: number[]): string => {
  return sizes
    .map(size => `${getImageUrlForSize(baseSrc, size)} ${size}w`)
    .join(', ');
};

/**
 * Gets the image URL for a specific size
 * @param baseSrc The base image URL
 * @param size Desired width in pixels
 * @returns Modified URL with size parameters
 */
export const getImageUrlForSize = (baseSrc: string, size: number): string => {
  // For CDN/image service URLs (like Cloudinary, Imgix, etc.)
  if (baseSrc.includes('unsplash.com') || baseSrc.includes('images.unsplash.com')) {
    return `${baseSrc}&w=${size}&q=80`;
  }
  
  // For local images, you might want to use a different approach
  // This is just a placeholder - you'd need server-side image processing
  return baseSrc;
};

/**
 * Preloads critical images
 * @param imageSources Array of image URLs to preload
 */
export const preloadCriticalImages = (imageSources: string[]): void => {
  imageSources.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

/**
 * Checks if an element is in the viewport
 * @param element DOM element to check
 * @param offset Optional offset to load images before they enter viewport
 * @returns Boolean indicating if element is in viewport
 */
export const isInViewport = (element: Element, offset = 200): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom >= -offset &&
    rect.right >= -offset &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
};
