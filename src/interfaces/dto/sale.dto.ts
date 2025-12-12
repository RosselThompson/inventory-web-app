import type { CURRENCY, SALE_STATUS } from "@/lib/types";

export interface SaleDto {
	saleDate: Date;
	saleNumber: string;
	subTotal: number;
	discountAmount: number;
	discountRate: number;
	taxAmount: number;
	taxRate: number;
	totalAmount: number;
	currency: CURRENCY;

	saleStatus: SALE_STATUS;

	customerName?: string;

	note?: string;
}
