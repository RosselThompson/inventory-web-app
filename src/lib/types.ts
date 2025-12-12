export type UNIT_OF_MEASURE = "und" | "kg" | "lb" | "box" | "pack" | "dozen";
export type CURRENCY = "USD" | "NIO";

export type SALE_PAYMENT_METHOD =
	| "CASH"
	| "CREDIT_CARD"
	| "DEBIT_CARD"
	| "MOBILE_PAYMENT"
	| "BANK_TRANSFER"
	| "CHECK"
	| "REFUND_CASH";

export type SALE_STATUS =
	| "CREATED"
	| "PAID"
	| "CANCELLED"
	| "PARTIALLY_REFUNDED"
	| "REFUNDED";
