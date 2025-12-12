export const UnitOfMeasureEnum = {
	UND: "und",
	KG: "kg",
	LB: "lb",
	BOX: "box",
	PACK: "pack",
	DOZEN: "dozen",
} as const;

export type UnitOfMeasureEnum =
	(typeof UnitOfMeasureEnum)[keyof typeof UnitOfMeasureEnum];

export const UnitOfMeasureArray = Object.values(UnitOfMeasureEnum);

export const CurrencyEnum = {
	NIO: "NIO",
	USD: "USD",
} as const;

export type CurrencyEnum = (typeof CurrencyEnum)[keyof typeof CurrencyEnum];
export const CurrencyArray = Object.values(CurrencyEnum);

export const SalePaymentMethodEnum = {
	CASH: "CASH",
	CREDIT_CARD: "CREDIT_CARD",
	DEBIT_CARD: "DEBIT_CARD",
	MOBILE_PAYMENT: "MOBILE_PAYMENT",
	BANK_TRANSFER: "BANK_TRANSFER",
	CHECK: "CHECK",
	REFUND_CASH: "REFUND_CASH",
} as const;

export type SalePaymentMethodEnum =
	(typeof SalePaymentMethodEnum)[keyof typeof SalePaymentMethodEnum];

export const SalePaymentMethodArray = Object.values(SalePaymentMethodEnum);

export const SaleStatusEnum = {
	CREATED: "CREATED",
	PAID: "PAID",
	CANCELLED: "CANCELLED",
	PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
	REFUNDED: "REFUNDED",
} as const;

export type SaleStatusEnum =
	(typeof SaleStatusEnum)[keyof typeof SaleStatusEnum];

export const SaleStatusArray = Object.values(SalePaymentMethodEnum);
