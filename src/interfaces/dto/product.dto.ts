import type { CURRENCY, UNIT_OF_MEASURE } from "@/lib/types";

export interface ProductDto {
	name: string;
	sku: string;
	unitOfMeasure: UNIT_OF_MEASURE;
	price: number;
	currency: CURRENCY;
	stockQuantity: number;
	description?: string;
}

export interface UpdateProductStockDto {
	stockQuantity: number;
}
