import axios from "axios";
import { API_BASE_URL } from "./config";
import { getSession } from "next-auth/react";

// Axios instance for client-side requests (with interceptors)
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add token to requests from NextAuth session
apiClient.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  } catch (error) {
    console.warn("Failed to get session for auth token:", error);
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Fetch API wrapper for Server Components (SSR)
const buildUrl = (path) => {
  if (!path) return API_BASE_URL;
  return path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export async function apiRequest(
  path,
  { method = "GET", data, headers, cache } = {}
) {
  const url = buildUrl(path);
  const init = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  };

  if (cache) {
    init.cache = cache;
  }

  if (data && method !== "GET") {
    init.body = JSON.stringify(data);
  }

  if (method === "GET" && data && Object.keys(data).length) {
    const query = new URLSearchParams(data).toString();
    const nextPath = query
      ? `${path}${path.includes("?") ? "&" : "?"}${query}`
      : path;
    return apiRequest(nextPath, { headers, cache });
  }

  const response = await fetch(url, init);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Request failed");
  }
  return response.json();
}

export async function getPublicItems(params = {}) {
  try {
    return await apiRequest("/items", {
      data: params,
      method: "GET",
      cache: "no-store",
    });
  } catch (error) {
    console.error("Failed to fetch items from server", error.message);
    throw error;
  }
}

export async function getItemById(id) {
  if (!id) throw new Error("Missing item id");

  try {
    return await apiRequest(`/items/${id}`, { cache: "no-store" });
  } catch (error) {
    console.error("Failed to fetch item from server", error.message);
    throw error;
  }
}

// Client-side functions using axios (for use in client components)
export async function clientGetItems(params = {}) {
  try {
    const response = await apiClient.get("/items", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch items", error.message);
    throw error;
  }
}

export async function clientGetItemById(id) {
  if (!id) throw new Error("Missing item id");
  try {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch item", error.message);
    throw error;
  }
}

export async function clientCreateProduct(productData) {
  try {
    const response = await apiClient.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Failed to create product", error.message);
    throw error;
  }
}

export async function clientDeleteProduct(id) {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete product", error.message);
    throw error;
  }
}

export async function clientGetMyProducts() {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my products", error.message);
    throw error;
  }
}

export async function clientUpdateProduct(id, productData) {
  try {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Failed to update product", error.message);
    throw error;
  }
}
