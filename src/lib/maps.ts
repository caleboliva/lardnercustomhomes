/** Opens Google Maps in a new tab with a pin on the address. */
export function mapLinkUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/** The address pinned on a small map that can sit in the page. Needs no account or key. */
export function mapEmbedUrl(address: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
}
