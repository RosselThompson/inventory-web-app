import type { ProductResponse } from "@/interfaces/responses/product.response";

interface ProductCardProps {
	product: ProductResponse;
	onClick: (id: string) => void;
}

const ProductCard = (props: ProductCardProps) => {
	const { product, onClick } = props;
	return (
		<div
			key={product.sku}
			className='flex items-center gap-3 rounded-md border border-muted bg-card p-3 cursor-pointer'
			onClick={() => onClick(product.id)}
		>
			<img
				src='/images/img-placeholder.png' // PRODUCT IMAGE FROM S3
				alt={product.name}
				className='h-12 w-12 rounded object-cover'
			/>

			<div className='flex-1'>
				<div className='flex justify-between items-center'>
					<h3 className='text-sm font-semibold'>{product.name}</h3>
					<span className='text-xs text-muted-foreground'>
						{product.unitOfMeasure}
					</span>
				</div>
				<p className='text-xs text-muted-foreground'>SKU: {product.sku}</p>
				<div className='flex justify-between mt-1'>
					<span className='text-sm font-medium'>
						{product.price.toFixed(2)} {product.currency}
					</span>
					<span className='text-xs font-medium text-muted-foreground'>
						Stock: {product.stockQuantity}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
