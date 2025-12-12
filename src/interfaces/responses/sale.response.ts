import type { BaseEntity } from "../common/base-entity.interface";
import type { SaleDto } from "../dto/sale.dto";
import type { SaleItemDto } from "../dto/sale-item.dto";
import type { SalePaymentDto } from "../dto/sale-payment.dto";

export interface SaleResponse extends BaseEntity {
	sale: SaleDto;
	items: SaleItemDto[];
	payments: SalePaymentDto[];
}
