const createParams = (object: Record<string, unknown>) => {
  const params: URLSearchParams = new URLSearchParams();
  for (const key of Object.keys(object)) {
    if (object[key]) {
      if (Array.isArray(object[key])) {
        (object[key] as Array<unknown> || []).forEach((item) => {
          params.append(`${key.toString()}[]`, String(item));
        });
      } else {
        params.append(key.toString(), String(object[key]));
      }
    }
  }
  return params;
};

export default createParams;