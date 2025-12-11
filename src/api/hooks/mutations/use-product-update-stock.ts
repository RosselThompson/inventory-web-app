import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/axios/inventory-api";
import { INVENTORY_API_ENDPOINTS } from "@/constants/endpoints.constant";
import type { UpdateProductStockDto } from "@/interfaces/dto/product.dto";
import type { ProductResponse } from "@/interfaces/responses/product.response";

export function useProductUpdateStock(id?: string) {
	return useMutation({
		mutationFn: async (updateProductStock: UpdateProductStockDto) : Promise<ProductResponse> => {
			const { data } = await api.patch(`${INVENTORY_API_ENDPOINTS.product}/${id}/stock`, updateProductStock);
			return data;
		},
	});
}
