import { useProductDetail } from "@/api/hooks/queries/use-product-detail";
import BackButton from "@/components/common/buttons/back-button";
import CardSkeleton from "@/components/common/skeleton/card-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Box, CircleDollarSign, Package, Ruler } from "lucide-react";
import { useParams } from "react-router";
import ErrorPage from "../error.page";

const ProductDetail = () => {
	const { id } = useParams();
	const { data, isLoading, isError } = useProductDetail(id);

	if (isLoading) {
		return <CardSkeleton />;
	}

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<>
			<BackButton />
			<div className='py-8'>
				<div className='flex justify-center'>
					<img
						src='/images/img-placeholder.png'
						alt={data?.name}
						className='h-40 w-40 object-cover rounded-md border'
					/>
				</div>

				<div className='px-4 py-6 space-y-6'>
					<div className='space-y-3'>
						<div className='flex items-start justify-between gap-3'>
							<h1 className='text-2xl font-bold leading-tight tracking-tight'>
								{data?.name}
							</h1>
						</div>
					</div>

					<Card className='border-neutral-200 shadow-sm'>
						<CardContent className='p-4 space-y-3'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2 text-neutral-600'>
									<Package className='h-4 w-4' />
									<span className='text-sm font-medium'>SKU</span>
								</div>
								<span className='text-sm font-mono text-neutral-900'>
									{data?.sku}
								</span>
							</div>
							<Separator />
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2 text-neutral-600'>
									<CircleDollarSign className='h-4 w-4' />
									<span className='text-sm font-medium'>Price</span>
								</div>
								<span className='text-sm text-neutral-900'>
									{data?.price} {data?.currency}
								</span>
							</div>

							<Separator />

							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2 text-neutral-600'>
									<Ruler className='h-4 w-4' />
									<span className='text-sm font-medium'>Unit</span>
								</div>
								<span className='text-sm text-neutral-900'>
									{data?.unitOfMeasure}
								</span>
							</div>

							<Separator />

							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2 text-neutral-600'>
									<Box className='h-4 w-4' />
									<span className='text-sm font-medium'>Stock Quantity</span>
								</div>
								<span className='text-sm font-medium'>
									{data?.stockQuantity}
								</span>
							</div>
						</CardContent>
					</Card>

					<div className='space-y-3'>
						<h2 className='text-lg font-semibold tracking-tight'>
							Description
						</h2>
						<p className='text-sm text-neutral-600 leading-relaxed'>
							{data?.description}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
