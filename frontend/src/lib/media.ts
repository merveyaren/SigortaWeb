const DEFAULT_MEDIA_BASE = 'https://insucomstorage.blob.core.windows.net/medya';

export function getMediaBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || DEFAULT_MEDIA_BASE).replace(/\/$/, '');
}

/**
 * Statik tema görselleri ve API'den gelen göreli yollar için tam Azure Blob URL üretir.
 * Zaten https:// ile başlıyorsa olduğu gibi döner.
 */
export function mediaUrl(path?: string | null): string {
  if (!path) return '';

  const trimmed = path.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  let filename = trimmed;
  if (filename.startsWith('./')) filename = filename.slice(2);
  if (filename.startsWith('/assets/img/')) filename = filename.slice('/assets/img/'.length);
  else if (filename.startsWith('assets/img/')) filename = filename.slice('assets/img/'.length);
  filename = filename.replace(/^\/+/, '');

  if (!filename) return '';

  const encoded = filename.split('/').map((part) => encodeURIComponent(part)).join('/');
  return `${getMediaBaseUrl()}/${encoded}`;
}
