const KEY = "recently_viewed_products";

export function addRecentlyViewed(product) {
  const existing = JSON.parse(localStorage.getItem(KEY)) || [];

  // Remove if already exists
  const filtered = existing.filter((item) => item.id !== product.id);

  const updated = [product, ...filtered].slice(0, 6);

  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
