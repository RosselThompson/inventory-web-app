import type { SaleItemDto } from "./sale-item.dto";
import type { SalePaymentDto } from "./sale-payment.dto";
import type { SaleDto } from "./sale.dto";

export interface CreateSaleDto {
  sale: SaleDto;
  items: SaleItemDto[];
  payments: SalePaymentDto[];
}
