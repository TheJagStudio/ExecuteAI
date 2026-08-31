const jsonHeaders = { "Content-Type": "application/json" };

async function handle(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function apiGet(path) {
  return fetch(`/api${path}`).then(handle);
}

export function apiSend(path, method, body) {
  return fetch(`/api${path}`, {
    method,
    headers: jsonHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  }).then(handle);
}

export function apiPost(path, body) {
  return apiSend(path, "POST", body);
}

export function apiPatch(path, body) {
  return apiSend(path, "PATCH", body);
}

export function apiDelete(path) {
  return apiSend(path, "DELETE");
}

export const SOURCE_META = {
  zoom: { color: "text-blue-600 bg-blue-50", icon: "video" },
  outlook: { color: "text-blue-500 bg-blue-50", icon: "mail" },
  slack: { color: "text-purple-500 bg-purple-50", icon: "message" },
  gmail: { color: "text-red-500 bg-red-50", icon: "mail" },
};

export function statusClass(status = "") {
  const value = status.toLowerCase();
  if (value.includes("complete")) return "bg-green-100 text-green-800";
  if (value.includes("draft") || value.includes("progress")) return "bg-amber-100 text-amber-800";
  if (value.includes("pending") || value.includes("review")) return "bg-blue-100 text-blue-800";
  return "bg-slate-100 text-slate-800";
}
