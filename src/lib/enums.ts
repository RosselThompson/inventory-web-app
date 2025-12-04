export const UnitOfMeasureEnum = {
	UND: "und",
	KG: "kg",
	LB: "lb",
	BOX: "box",
	PACK: "pack",
	DOZEN: "dozen",
} as const;

export type UnitOfMeasureEnum = typeof UnitOfMeasureEnum[keyof typeof UnitOfMeasureEnum];

export const CurrencyEnum = {
    NIO: "NIO",
	USD: "USD",
} as const;

export type CurrencyEnum = typeof CurrencyEnum[keyof typeof CurrencyEnum];

export const UnitOfMeasureArray = Object.values(UnitOfMeasureEnum)
export const CurrencyArray = Object.values(CurrencyEnum)
