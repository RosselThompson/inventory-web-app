export interface InventoryApiErrorResponse {
	time: Date;
	path: string;
	error: {
		status: number;
		message: string;
	};
}
