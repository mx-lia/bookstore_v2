export default function serverCall(
  endpoint,
  { body, header: method, ...customConfig } = {}
) {
  const headers = { "Content-Type": "application/json" };
  const token = sessionStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const config = {
    method: method ? method : body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return window.fetch(endpoint, config).then(async (response) => {
    if (response.ok) {
/*    const bearer = response.headers.get("authorization");
      if (bearer) {
        sessionStorage.setItem("token", bearer.replace("Bearer ", ""));
      } */
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        return data;
      }
    } else {
      const data = await response.json();
      throw new Error(data.Error);
    }
  });
}
