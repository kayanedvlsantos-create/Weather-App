export function setCache(key, data, ttl = 10 * 60 * 1000) {
  const item = {
    data,
    expiry: Date.now() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getCache(key) {
  const item = localStorage.getItem(key);

  if (!item) return null;

  const parsed = JSON.parse(item);

  if (Date.now() > parsed.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return parsed.data;
}