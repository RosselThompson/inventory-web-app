import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/axios/inventory-api";
import { INVENTORY_API_ENDPOINTS } from "@/constants/endpoints.constant";
import type { ProductDto } from "@/interfaces/dto/product.dto";
import type { ProductResponse } from "@/interfaces/responses/product.response";

export function useProductUpdate(id?: string) {
	return useMutation({
		mutationFn: async (productDto: ProductDto) : Promise<ProductResponse> => {
			const { data } = await api.put(`${INVENTORY_API_ENDPOINTS.product}/${id}`, productDto);
			return data;
		},
	});
}
