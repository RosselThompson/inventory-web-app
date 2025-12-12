import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/axios/inventory-api";
import { INVENTORY_API_ENDPOINTS } from "@/constants/endpoints.constant";
import type { SaleResponse } from "@/interfaces/responses/sale.response";
import type { CreateSaleDto } from "@/interfaces/dto/create-sale.dto";

export function useSaleCreate() {
	return useMutation({
		mutationFn: async (sale: CreateSaleDto) : Promise<SaleResponse> => {
			const { data } = await api.post(INVENTORY_API_ENDPOINTS.sale, sale);
			return data;
		},
	});
}
