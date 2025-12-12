import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UpdateProductStockDto } from "@/interfaces/dto/product.dto";
import React from "react";
import { useForm } from "react-hook-form";

interface ProductUpdateStockFormProps {
	handleSubmitForm: (values: UpdateProductStockDto) => void;
	wrapButtonsComponent?: React.ComponentType<{ children: React.ReactNode }>;
    isLoading?: boolean;
}

const ProductUpdateStockForm = (props: ProductUpdateStockFormProps) => {
	const { handleSubmitForm, wrapButtonsComponent: wrapComponent, isLoading } = props;
	const form = useForm<UpdateProductStockDto>({
		defaultValues: { stockQuantity: 0 },
	});

	const WrapFooterComponent = wrapComponent || React.Fragment;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmitForm)}>
				<div className='mb-4'>
					<FormField
						control={form.control}
						name='stockQuantity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Stock Quantity</FormLabel>
								<FormControl>
									<Input
										{...field}
										id='stockQuantity'
										type='number'
										placeholder='Stock'
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<WrapFooterComponent>
					<Button variant='outline'>Cancel</Button>
					<Button type='submit' disabled={isLoading}>{isLoading ? "Updating..." : "Update Stock"}</Button>
				</WrapFooterComponent>
			</form>
		</Form>
	);
};

export default ProductUpdateStockForm;
