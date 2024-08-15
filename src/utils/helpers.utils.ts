export function getAllEnumValues<T extends Record<string, string | number>>(
    e: T
  ): T[keyof T][] {
    return Object.values(e) as T[keyof T][];
  }
  