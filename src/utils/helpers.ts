export function loadJSON(key: string, fallback: any, version = 1) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && 'v' in parsed && 'data' in parsed) {
      if (parsed.v !== version) return fallback;
      return parsed.data;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, data: any, version = 1) {
  const env = { v: version, data };
  localStorage.setItem(key, JSON.stringify(env));
}

export function normalizePhoneBR(value: string) {
  return value.replace(/\D/g, '');
}

export function suggestCategoryByAge(age: number) {
  if (age <= 11) return 'sub11';
  if (age <= 13) return 'sub13';
  if (age <= 15) return 'sub15';
  return 'sub17';
}
