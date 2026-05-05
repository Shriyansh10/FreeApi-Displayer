export const fetchData = async (url, page, limit, method, controller) => {
  const query = page ? `?page=${page}&limit=${limit}` : "";
  const response = await fetch(`${url}${query}`, {
    method,
    headers: {
      accept: "application/json",
    },
    signal: controller.signal,
  });
  const data = await response.json();
  return data;
};
