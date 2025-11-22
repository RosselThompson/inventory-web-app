const TOKEN_KEY = "access_token";

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem(TOKEN_KEY);
	return !!token;
};

export const setAuthentication = (token: string) => {
	localStorage.setItem(TOKEN_KEY, token);
};
