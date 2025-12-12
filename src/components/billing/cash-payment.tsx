import { useForm } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import type { SalePaymentDto } from "@/interfaces/dto/sale-payment.dto";
import { CurrencyEnum, SalePaymentMethodEnum } from "@/lib/enums";
import { Input } from "../ui/input";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";
import { Button } from "../ui/button";
import { useState } from "react";
import { exchangeRate } from "@/constants/sale.constant";

interface CashPaymentProps {
	handleSubmitForm: (values: SalePaymentDto) => void;
}

const CashPayment = (props: CashPaymentProps) => {
	const { handleSubmitForm } = props;
	const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(
		CurrencyEnum.NIO
	);
	const [amount, setAmount] = useState<number>(0);

	const form = useForm<SalePaymentDto>({
		defaultValues: {
			paymentMethod: SalePaymentMethodEnum.CASH,
			currency: CurrencyEnum.NIO,
			amountPaid: undefined,
		},
	});
	
	const isLoading = false;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Cash Payment</CardTitle>
				<CardDescription>Add cash payment method</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						handleSubmitForm({
							...values,
							currency: selectedCurrency,
						})
					)}
				>
					<CardContent className='grid gap-6'>
						<ButtonGroup className='mb-2'>
							<Button
								type='button'
								variant={
									selectedCurrency === CurrencyEnum.NIO
										? "default"
										: "secondary"
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
									selectedCurrency === CurrencyEnum.USD
										? "default"
										: "secondary"
								}
								size='sm'
								onClick={() => setSelectedCurrency(CurrencyEnum.USD)}
							>
								{CurrencyEnum.USD}
							</Button>
						</ButtonGroup>
						<FormField
							control={form.control}
							name='amountPaid'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount Paid</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											placeholder='Amount Paid'
											onChange={(e) => {
												setAmount(e.target.valueAsNumber);
												field.onChange(e.target.valueAsNumber);
											}}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						{selectedCurrency === CurrencyEnum.USD && (
							<div>
								<p className='mb-1 text-sm text-muted-foreground'>
									exchange rate: {exchangeRate}
								</p>
								<p>NIO: {(amount * exchangeRate).toFixed(2)}</p>
							</div>
						)}
						<CardFooter>
							<Button className='w-full' type='submit' disabled={isLoading}>
								{isLoading ? "Saving..." : "Save Payment"}
							</Button>
						</CardFooter>
					</CardContent>
				</form>
			</Form>
		</Card>
	);
};

export default CashPayment;
