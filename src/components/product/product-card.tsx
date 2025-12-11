import type { ProductResponse } from "@/interfaces/responses/product.response";
import { Button } from "../ui/button";
import { Eye, Pencil } from "lucide-react";

interface ProductCardProps {
	product: ProductResponse;
	onClickViewDetail: (id: string) => void;
	onClickEdit: (id: string) => void;
	onClickUpdateStock: (id: string) => void;
}

const ProductCard = (props: ProductCardProps) => {
	const { product, onClickViewDetail, onClickEdit, onClickUpdateStock } = props;
	return (
		<div className='rounded-md border border-muted bg-card'>
			<div
				key={product.sku}
				className='flex items-center gap-3 p-3 cursor-pointer'
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
			<div className='flex justify-end p-2 gap-2'>
				<Button
					size='sm'
					variant='secondary'
					onClick={() => onClickUpdateStock(product.id)}
				>
					Update Stock
				</Button>
				<Button
					size='sm'
					variant='secondary'
					onClick={() => onClickViewDetail(product.id)}
				>
					<Eye />
				</Button>
				<Button
					size='sm'
					variant='secondary'
					onClick={() => onClickEdit(product.id)}
				>
					<Pencil />
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;
