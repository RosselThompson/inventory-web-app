import { useProductCreation } from "@/api/hooks/mutations/use-product-creation";
import BackButton from "@/components/common/buttons/back-button";
import ProductForm from "@/components/product/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCTS_PATH } from "@/constants/path.constant";
import type { ProductDto } from "@/interfaces/dto/product.dto";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ProductCreation = () => {
	const navigate = useNavigate();
	const { mutateAsync, isPending } = useProductCreation();

	const handleAddProduct = async (values: ProductDto) => {
		try {
			const data = await mutateAsync(values);
			toast.success(`${data.name} - product was created`);
			navigate(PRODUCTS_PATH);
		} catch (err) {
			console.error(err);
			toast.error(`Product has not been created`);
		}
	};

	return (
		<>
			<BackButton />
			<div className='px-4 py-6 space-y-6'>
				<div className='space-y-3'>
					<Card>
						<CardHeader>
							<CardTitle>New product</CardTitle>
						</CardHeader>
						<CardContent>
							<ProductForm
								handleSubmitForm={handleAddProduct}
								isLoading={isPending}
								buttonText='Add Product'
								loadingButtonText='Adding Product ...'
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ProductCreation;
