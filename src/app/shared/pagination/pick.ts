/* eslint-disable @typescript-eslint/no-explicit-any */
export const pick = <T extends readonly string[]>(
  source: Record<string, any>,
  allowedFields: T
): Partial<Record<T[number], any>> => {
  const result: Partial<Record<T[number], any>> = {};
  for (const field of allowedFields) {
    const key = field as T[number];
    if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
};
