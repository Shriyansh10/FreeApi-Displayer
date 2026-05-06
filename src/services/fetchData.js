export const fetchData = async (url, page, limit, method, controller) => {
  const query = page ? `?page=${page}&limit=${limit}` : "";
  let response;
  if (controller) {
    response = await fetch(`${url}${query}`, {
      method,
      headers: {
        accept: "application/json",
      },
      signal: controller.signal,
    });
  } else {
    response = await fetch(`${url}${query}`, {
      method,
      headers: {
        accept: "application/json",
      },
    });
  }
  const data = await response.json();
  return data;
};
