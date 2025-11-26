import type { CURRENCY, UNIT_OF_MEASURE } from "@/lib/types";
import type { BaseEntity } from "../common/base-entity.interface";

export interface ProductInListResponse extends BaseEntity {
	name: string;
	sku: string;
	unitOfMeasure: UNIT_OF_MEASURE;
	price: number;
	currency: CURRENCY;
	stockQuantity: number;
	description: string;
}
