import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/axios/inventoryAPI";
import type { SignInDto } from "@/interfaces/dto/sign-in.dto";
import type { SignInResponse } from "@/interfaces/responses/sign-in.response";
import { INVENTORY_API_ENDPOINTS } from "@/constants/endpoints";

export function useSignIn() {
	return useMutation({
		mutationFn: async (signInDto: SignInDto) : Promise<SignInResponse> => {
			const { data } = await api.post(INVENTORY_API_ENDPOINTS.signIn, signInDto);
			return data;
		},
	});
}
