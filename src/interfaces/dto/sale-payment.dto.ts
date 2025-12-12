import type { CURRENCY, SALE_PAYMENT_METHOD } from "@/lib/types";

export interface SalePaymentDto {
	paymentMethod: SALE_PAYMENT_METHOD;
	currency: CURRENCY;
	amountPaid: number;
	referenceNumber?: string;
	fileId?: string;
}
