import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
}

export const getCoverImage = (url?: string) => {
  // If no URL is provided, return the default placeholder
  if (!url) {
    return '/placeholder.jpg';
  }
  
  // If it's already a valid URL (absolute or relative starting with /), use it
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  
  // Otherwise return the default placeholder
  return '/placeholder.jpg';
};

export const getImageUrl = (url?: string) => {
  if (!url) {
    return '/placeholder.jpg';
  }

  // If it's already an absolute URL, use it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If it's a relative URL starting with /uploads/, make it absolute
  if (url.startsWith('/uploads/')) {
    return `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}${url}`;
  }

  // If it's any other relative URL, use it as is
  if (url.startsWith('/')) {
    return url;
  }

  // Otherwise return the default placeholder
  return '/placeholder.jpg';
};
