import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CurrencyArray, UnitOfMeasureArray } from "@/lib/enums";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ProductDto } from "@/interfaces/dto/product.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	productDefaultValues,
	productSchema,
} from "@/lib/schemas/product.schema";
import type { ProductResponse } from "@/interfaces/responses/product.response";

interface ProductFormProps {
	handleSubmitForm: (values: ProductDto) => void;
	isLoading: boolean;
	buttonText: string;
	loadingButtonText: string;
	initData?: ProductResponse;
	isEditing?: boolean;
}

const ProductForm = (props: ProductFormProps) => {
	const {
		handleSubmitForm,
		isLoading,
		buttonText,
		loadingButtonText,
		initData,
		isEditing,
	} = props;

	const form = useForm<ProductDto>({
		resolver: zodResolver(productSchema),
		defaultValues: initData || productDefaultValues,
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmitForm)}
				className='space-y-6'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product name</FormLabel>
							<FormControl>
								<Input placeholder='Name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='sku'
					render={({ field }) => (
						<FormItem>
							<FormLabel>SKU alternative code</FormLabel>
							<FormControl>
								<Input placeholder='SKU' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='unitOfMeasure'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unit of Measure</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a value' />
									</SelectTrigger>
									<SelectContent>
										{UnitOfMeasureArray.map((uom) => (
											<SelectItem key={`select-${uom}`} value={uom}>
												{uom}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='stockQuantity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stock Quantity</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={isEditing}
									type='number'
									placeholder='Stock'
									onChange={(e) => field.onChange(e.target.valueAsNumber)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='currency'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Currency</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a value' />
									</SelectTrigger>
									<SelectContent>
										{CurrencyArray.map((c) => (
											<SelectItem key={`select-${c}`} value={c}>
												{c}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='number'
									placeholder='Price'
									onChange={(e) => field.onChange(e.target.valueAsNumber)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									className='resize-none h-24'
									rows={5}
									placeholder='Add a brief description...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='w-full h-11 text-base'
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? loadingButtonText : buttonText}
				</Button>
			</form>
		</Form>
	);
};

export default ProductForm;
