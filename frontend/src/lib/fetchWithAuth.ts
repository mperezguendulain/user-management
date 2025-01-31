export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const token = localStorage.getItem("token");

  const headers = new Headers(init?.headers);
  if (token) {
    headers.append("Authorization", `Bearer ${token}`); // Adjuntar el token
  }

  const response = await fetch(input, {
    ...init,
    headers
  });

  return response;
}

export async function jsonFetchWithAuth(
  input: RequestInfo,
  body: Record<string, unknown>
): Promise<Response> {
  const token = localStorage.getItem("token");

  const headers = new Headers({ "Content-Type": "application/json" });

  if (token) {
    headers.append("Authorization", `Bearer ${token}`); // Adjuntar el token
  }

  const response = await fetch(input, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });

  return response;
}
