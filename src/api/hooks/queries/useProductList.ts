import { api } from "@/api/axios/inventoryAPI";
import { INVENTORY_API_ENDPOINTS } from "@/constants/endpoints";
import type { PaginatedData } from "@/interfaces/responses/pagination.response";
import type { ProductInListResponse } from "@/interfaces/responses/product.response";
import { useQuery } from "@tanstack/react-query";

export function useProductList() {
	return useQuery({
		queryKey: ["productList"],
		queryFn: async (): Promise<PaginatedData<ProductInListResponse>> => {
			const { data } = await api.get(INVENTORY_API_ENDPOINTS.product);
			return data;
		},
		staleTime: 1000 * 60 * 5, // 5 MINUTES
	});
}
