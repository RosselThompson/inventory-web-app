import { TOKEN_KEY } from "@/constants/auth";

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem(TOKEN_KEY);
	return !!token;
};

export const setAuthentication = (token: string) => {
	localStorage.setItem(TOKEN_KEY, token);
};
