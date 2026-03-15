/**
 * Get an optimized Cloudinary URL for an image.
 * This is client-safe as it doesn't use the 'cloudinary' server-side SDK.
 */
export function getOptimizedImageUrl(publicId: string, options: { width?: number; height?: number; crop?: string } = {}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  // Default fallback image if no publicId is provided
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80";

  if (!publicId) return FALLBACK_IMAGE;
  if (!cloudName) return publicId;
  
  // If it's a local path or a full URL
  if (publicId.startsWith('/') || publicId.startsWith('http')) {
    return publicId;
  }
  
  // Construct the transformation string
  const transformations = [];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  transformations.push('f_auto');
  transformations.push('q_auto');
  
  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`;
}
