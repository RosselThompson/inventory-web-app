import { useProductUpdate } from "@/api/hooks/mutations/use-product-update";
import BackButton from "@/components/common/buttons/back-button";
import CardSkeleton from "@/components/common/skeleton/card-skeleton";
import ProductForm from "@/components/product/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCTS_PATH } from "@/constants/path.constant";
import type { ProductDto } from "@/interfaces/dto/product.dto";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import ErrorPage from "../error.page";
import { useProductDetail } from "@/api/hooks/queries/use-product-detail";

const ProductUpdate = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data, isLoading, isError } = useProductDetail(id);
	const { mutateAsync, isPending } = useProductUpdate(id);

	const handleUpdateProduct = async (values: ProductDto) => {
		try {
			const data = await mutateAsync(values);
			toast.success(`${data.name} - product was updated`);
			navigate(PRODUCTS_PATH);
		} catch (err) {
			console.error(err);
			toast.error(`Product has not been updated`);
		}
	};

	if (isLoading) {
		return <CardSkeleton />;
	}

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<>
			<BackButton />
			<div className='px-4 py-6 space-y-6'>
				<div className='space-y-3'>
					<Card>
						<CardHeader>
							<CardTitle>Update product</CardTitle>
						</CardHeader>
						<CardContent>
							<ProductForm
								handleSubmitForm={handleUpdateProduct}
								isLoading={isPending}
								buttonText='Update Product'
								loadingButtonText='Updating Product ...'
								initData={data}
								isEditing
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ProductUpdate;
