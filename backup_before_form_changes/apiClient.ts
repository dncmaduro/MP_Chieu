export const apiClient = {
  get: async <T>(url: string): Promise<{ data: T }> => {
    const response = await fetch(url);
    const data = await response.json();
    return { data } as { data: T };
  },
  post: async <T>(url: string, body: unknown): Promise<{ data: T }> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { data } as { data: T };
  },
  patch: async <T>(url: string, body: unknown): Promise<{ data: T }> => {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { data } as { data: T };
  },
  delete: async <T>(url: string): Promise<{ data: T }> => {
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json();
    return { data } as { data: T };
  },
};