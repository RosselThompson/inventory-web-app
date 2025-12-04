import { api } from "@/api/axios/inventory-api";
import { INVENTORY_API_ENDPOINTS } from "@/constants/endpoints.constant";
import type { ProductResponse } from "@/interfaces/responses/product.response";
import { useQuery } from "@tanstack/react-query";

export function useProductDetail(id?: string) {
	return useQuery({
		queryKey: ["productDetail", id],
		queryFn: async (): Promise<ProductResponse> => {
			const { data } = await api.get(
				`${INVENTORY_API_ENDPOINTS.product}/${id}`
			);
			return data;
		},
	});
}
