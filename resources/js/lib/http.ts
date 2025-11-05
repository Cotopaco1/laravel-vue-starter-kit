// resources/js/lib/http.ts
import axios, { AxiosError, type AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? window.location.origin;

const http: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true, // cookies de sesión / XSRF
    headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

let csrfReady: Promise<void> | null = null;
function ensureCsrfCookie(): Promise<void> {
    if (!csrfReady) {
        csrfReady = http.get('/sanctum/csrf-cookie').then(() => undefined).finally(() => {
            csrfReady = null; // permitir refrescar más tarde si expira
        });
    }
    return csrfReady;
}
const needsCsrf = (method?: string) =>
    !!method && !['get', 'head', 'options'].includes(method.toLowerCase());

http.interceptors.request.use(async (config) => {
    if (needsCsrf(config.method)) {
        // si no hay cookie XSRF, obténla (Laravel Sanctum)
        if (!document.cookie.includes('XSRF-TOKEN=')) {
            await ensureCsrfCookie();
        }
    }
    return config;
});

http.interceptors.response.use(
    (r) => r,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const cfg: any = error.config || {};
        // Reintenta una vez si es 419 (CSRF expirada)
        if (status === 419 && !cfg._retry) {
            cfg._retry = true;
            await ensureCsrfCookie();
            return http.request(cfg);
        }
        // Opcional: redirigir login si 401 (sin sesión)
        // if (status === 401) window.location.href = '/login';
        return Promise.reject(error);
    }
);

export default http;

// helper para type-guard en catch
export function isApiError(e: unknown): e is AxiosError {
    return axios.isAxiosError(e);
}
