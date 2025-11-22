import type { InventoryApiErrorResponse } from "@/interfaces/responses/error.response";
import { AxiosError } from "axios";

const DEFAULT_ERROR_MESSAGE = "An error occurred";

export const handleException = (err: unknown): string => {
	console.error("Error:", err);
	if (err instanceof AxiosError) {
		const typedError = err as AxiosError<InventoryApiErrorResponse>
		return typedError.response?.data?.error?.message || DEFAULT_ERROR_MESSAGE;
	}

	return DEFAULT_ERROR_MESSAGE;
};
