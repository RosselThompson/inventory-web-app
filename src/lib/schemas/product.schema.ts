import { z } from "zod";
import { CurrencyEnum, UnitOfMeasureEnum } from "../enums";

export const productSchema = z.object({
	name: z.string().min(1, "This field is required"),
	sku: z.string().min(1, "This field is required"),
	unitOfMeasure: z.enum(UnitOfMeasureEnum),
	currency: z.enum(CurrencyEnum),
	description: z.string().optional(),
	stockQuantity: z.number({
		error: () => "This field is required",
	}),
	price: z.number({
		error: () => "This field is required",
	}),
});

export const productDefaultValues = {
	name: "",
	sku: "",
	unitOfMeasure: UnitOfMeasureEnum.UND,
	price: 0,
	currency: CurrencyEnum.NIO,
	stockQuantity: 0,
	description: "",
};
