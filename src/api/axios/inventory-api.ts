import { TOKEN_KEY } from "@/constants/auth.constant";
import { SIGN_IN_PATH } from "@/constants/path.constant";
import axios, { AxiosError } from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(TOKEN_KEY);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			localStorage.removeItem(TOKEN_KEY);
			window.location.href = SIGN_IN_PATH;
		}

		return Promise.reject(error);
	}
);
