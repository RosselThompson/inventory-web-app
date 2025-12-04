import { useProductCreation } from "@/api/hooks/mutations/use-product-creation";
import BackButton from "@/components/common/buttons/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { PRODUCTS_PATH } from "@/constants/path.constant";
import type { ProductDto } from "@/interfaces/dto/product.dto";
import { CurrencyArray, UnitOfMeasureArray } from "@/lib/enums";
import {
	productDefaultValues,
	productSchema,
} from "@/lib/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ProductCreation = () => {
	const navigate = useNavigate();
	const { mutateAsync, isPending } = useProductCreation();

	const form = useForm<ProductDto>({
		resolver: zodResolver(productSchema),
		defaultValues: productDefaultValues,
	});

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
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(handleAddProduct)}
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
														type='number'
														placeholder='Stock'
														value={field.value ?? ""}
														onChange={(e) => {
															const v = e.target.value;
															field.onChange(v === "" ? undefined : Number(v));
														}}
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
														type='number'
														placeholder='Price'
														value={field.value ?? ""}
														onChange={(e) => {
															const v = e.target.value;
															field.onChange(v === "" ? undefined : Number(v));
														}}
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
										disabled={isPending}
									>
										{isPending ? "Adding..." : "Add Product"}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ProductCreation;
