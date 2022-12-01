export const normalizeObject = (object: Record<string, unknown>) => {
  return Object.entries(object)
    .filter(([_, v]) => v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
};