import { useSaleCreate } from "@/api/hooks/mutations/use-sale-create";
import CashPayment from "@/components/billing/cash-payment";
import TransferPayment from "@/components/billing/transfer-payment";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { exchangeRate } from "@/constants/sale.constant";
import type { CreateSaleDto } from "@/interfaces/dto/create-sale.dto";
import type { SalePaymentDto } from "@/interfaces/dto/sale-payment.dto";
import { CurrencyEnum, SaleStatusEnum } from "@/lib/enums";
import { MinusCircle, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Billing = () => {
	const product = {
		id: "93B0433E-F36B-1410-8826-00FFB7553945",
		_createdAt: "2025-12-10T01:43:22.653Z",
		_updatedAt: "2025-12-11T21:27:39.633Z",
		_deletedAt: null,
		name: "Libro - El Jardin de Lucia",
		sku: "L-EJDL",
		unitOfMeasure: "und",
		price: 280,
		currency: "NIO",
		stockQuantity: 25,
		description: "Libro el jardín de lucía, editado",
	};
	const PRICE_IN_DOLLAR = 8;

	const [quantity, setQuantity] = useState<number>(1);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [payments, setPayments] = useState<SalePaymentDto[]>([]);
	const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(
		CurrencyEnum.NIO
	);
	const { mutateAsync, isPending } = useSaleCreate();
	const unitPrice =
		selectedCurrency === CurrencyEnum.USD ? PRICE_IN_DOLLAR : product.price;

	const reset = () => {
		setQuantity(1);
		setPayments([]);
	};

	const handleAddSale = async () => {
		const payload: CreateSaleDto = {
			sale: {
				saleDate: new Date(),
				saleNumber: "Sale01",
				subTotal: unitPrice * quantity,
				discountAmount: 0,
				discountRate: 0,
				taxAmount: 0,
				taxRate: 0,
				totalAmount: unitPrice * quantity,
				currency: selectedCurrency,
				saleStatus: SaleStatusEnum.PAID,
			},
			items: [
				{
					quantity: quantity,
					unitPrice: unitPrice,
					discountAmount: 0,
					discountRate: 0,
					total: unitPrice * quantity,
					productId: product.id,
				},
			],

			payments,
		};
		try {
			const data = await mutateAsync(payload);
			console.log(data);
			toast.success(`sale was created`);
			reset();
		} catch (err) {
			console.error(err);
			toast.error(`Product has not been created`);
		}
	};

	const handleMinusButton = () => setQuantity(quantity - 1);
	const handlePlusButton = () => setQuantity(quantity + 1);

	const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

	const handleSubmitPayment = (values: SalePaymentDto) => {
		setPayments((current) => [...current, values]);
		toggleDialog();
	};

	const handleRemovePayment = (i: number) => {
		const newArray = [...payments];
		newArray.splice(i, 1);
		setPayments(newArray);
	};

	const total = unitPrice * quantity;
	const paid = payments.reduce((acc, payment) => acc + payment.amountPaid, 0);
	const diff = total - paid;

	return (
		<div className='flex flex-col gap-2'>
			<Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Add Payment Method</DialogTitle>
					</DialogHeader>
					<Tabs defaultValue='cash'>
						<TabsList>
							<TabsTrigger value='cash'>Cash</TabsTrigger>
							<TabsTrigger value='transfer'>Transfer</TabsTrigger>
						</TabsList>
						<TabsContent value='cash'>
							<CashPayment handleSubmitForm={handleSubmitPayment} />
						</TabsContent>
						<TabsContent value='transfer'>
							<TransferPayment handleSubmitForm={handleSubmitPayment} />
						</TabsContent>
					</Tabs>
				</DialogContent>
			</Dialog>

			<div className='p-2 mb-2'>
				<div className='flex w-full justify-between mb-4'>
					<p className='flex-start text-base font-medium text-muted-foreground'>
						Items
					</p>
					<Button variant='secondary' size='sm'>
						Add Item
					</Button>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='rounded-md border border-muted bg-card'>
						<div className='flex items-center gap-3 p-3'>
							<img
								src='/images/img-placeholder.png' // PRODUCT IMAGE FROM S3
								alt={product.name}
								className='h-12 w-12 rounded object-cover'
							/>

							<div className='flex-1'>
								<div className='flex justify-between items-center'>
									<h3 className='text-sm font-semibold'>{product.name}</h3>
									<Button size='icon' variant='ghost' onClick={() => {}}>
										<X />
									</Button>
								</div>
								<p className='text-xs text-muted-foreground'>{product.sku}</p>
								<p className='text-xs text-muted-foreground mt-1'>
									Stock Quantity: {product.stockQuantity}
								</p>
								<div className='flex justify-between items-center mt-2'>
									<span className='text-sm font-medium'>
										Total: {total.toFixed(2)} {selectedCurrency}
									</span>
									<div className='flex gap-2 items-center'>
										<Button
											size='icon'
											variant='ghost'
											disabled={quantity === 1}
											onClick={handleMinusButton}
										>
											<MinusCircle />
										</Button>
										<p className='text-sm'>{quantity}</p>
										<Button
											size='icon'
											variant='ghost'
											onClick={handlePlusButton}
										>
											<PlusCircle />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ButtonGroup className='mb-2'>
				<Button
					type='button'
					variant={
						selectedCurrency === CurrencyEnum.NIO ? "default" : "secondary"
					}
					size='sm'
					onClick={() => setSelectedCurrency(CurrencyEnum.NIO)}
				>
					{CurrencyEnum.NIO}
				</Button>
				<ButtonGroupSeparator />
				<Button
					type='button'
					variant={
						selectedCurrency === CurrencyEnum.USD ? "default" : "secondary"
					}
					size='sm'
					onClick={() => setSelectedCurrency(CurrencyEnum.USD)}
				>
					{CurrencyEnum.USD}
				</Button>
			</ButtonGroup>

			<div className='p-2'>
				<div className='flex w-full justify-between mb-4'>
					<p className='flex-start text-base font-medium text-muted-foreground'>
						Payment methods
					</p>
					<Button variant='secondary' size='sm' onClick={toggleDialog}>
						Add Payment
					</Button>
				</div>
				<div className='flex flex-col gap-2'>
					{payments.map((p, index) => (
						<div
							className='rounded-md border border-muted bg-card'
							key={`payment-card${index}`}
						>
							<div className='flex items-center justify-between gap-3 p-3'>
								<p className='flex-1'>{p.paymentMethod}</p>
								<div className='flex items-center'>
									<p>
										{selectedCurrency} {p.amountPaid.toFixed(2)}
									</p>
									<Button
										className='ml-4'
										size='icon'
										variant='ghost'
										onClick={() => handleRemovePayment(index)}
									>
										<X />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='p-2'>
				<p className='flex-start text-base font-medium text-muted-foreground mb-2'>
					Pay
				</p>
				<div className='rounded-md border border-muted bg-card w-full p-3'>
					<div className='flex justify-between mb-2'>
						<p> Total a pagar:</p>
						<p>{total.toFixed(2)}</p>
					</div>
					<div className='flex justify-between mb-2'>
						<p>Pagado</p>
						<p>{paid.toFixed(2)}</p>
					</div>
					<div className='flex justify-between'>
						<p>Restante</p>
						<p className={diff > 0 ? "text-red-500" : ""}>{diff.toFixed(2)}</p>
					</div>
					{selectedCurrency === CurrencyEnum.USD && (
						<div className='flex justify-between'>
							<p>Restante NIO</p>
							<p className={diff > 0 ? "text-red-500" : ""}>
								{(diff * exchangeRate).toFixed(2)}
							</p>
						</div>
					)}
				</div>
			</div>

			<Button className='mt-8' disabled={isPending || payments.length === 0} onClick={handleAddSale}>
				{isPending ? "Saving..." : "Save"}
			</Button>
		</div>
	);
};

export default Billing;
