import { api } from "@/api/axios/inventory-api";
import { INVENTORY_API_ENDPOINTS } from "@/constants/endpoints.constant";
import type { PaginatedData } from "@/interfaces/responses/pagination.response";
import type { ProductResponse } from "@/interfaces/responses/product.response";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type ProductSearchParam = "name" | "sku";

export function useProductList(param?: ProductSearchParam, value?: string) {
	return useQuery({
		queryKey: ["productList", value],
		queryFn: async (): Promise<PaginatedData<ProductResponse>> => {
			const { data } = await api.get(INVENTORY_API_ENDPOINTS.product, {
				params: {
					...(param === "name" ? { s_name: value } : {}),
					...(param === "sku" ? { s_sku: value } : {}),
				},
			});
			return data;
		},
		staleTime: 1000 * 60 * 5, // 5 MINUTES
		placeholderData: keepPreviousData,
	});
}
