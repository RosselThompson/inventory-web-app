import { z } from "zod";
import { CurrencyEnum, UnitOfMeasureEnum } from "../enums";

export const productSchema = z.object({
	name: z.string().min(1, "This field is required"),
	sku: z.string().min(1, "This field is required"),
	unitOfMeasure: z.enum(UnitOfMeasureEnum),
	currency: z.enum(CurrencyEnum),
	description: z.string().optional(),
	stockQuantity: z
		.number({
			error: (issue) => {
				if (issue.input === "" || issue.input === undefined) {
					return "This field is required";
				}
				return "This field must be a number";
			},
		})
		.min(0, "Stock must be greater than or equal to 0"),
	price: z
		.number({
			error: (issue) => {
				if (issue.input === "" || issue.input === undefined) {
					return "This field is required";
				}
				return "This field must be a number";
			},
		})
		.min(0, "Price must be greater than or equal to 0"),
});

export const productDefaultValues = {
	name: "",
	sku: "",
	unitOfMeasure: UnitOfMeasureEnum.UND,
	price: undefined,
	currency: CurrencyEnum.NIO,
	stockQuantity: undefined,
	description: "",
};
