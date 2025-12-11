import { useState } from "react";
import { useNavigate } from "react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ShoppingCart } from "lucide-react";
import { useSignIn } from "@/api/hooks/mutations/use-sign-in";
import type { SignInDto } from "@/interfaces/dto/sign-in.dto";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/schemas/sign-in.schema";
import { handleException } from "@/helpers/handle-exception";
import { DASHBOARD_PATH } from "@/constants/path.constant";
import { setAuthentication } from "@/helpers/auth";

const SignIn = () => {
	const navigate = useNavigate();
	const { mutateAsync, isPending } = useSignIn();
	const [error, setError] = useState<string | undefined>();

	const form = useForm<SignInDto>({
		resolver: zodResolver(signInSchema),
		defaultValues: { username: "", password: "" },
	});

	const handleSignIn = async (values: SignInDto) => {
		try {
			const data = await mutateAsync(values);
			setAuthentication(data.access_token);
			navigate(DASHBOARD_PATH);
		} catch (err) {
			const message = handleException(err);
			setError(message);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4'>
			<Card className='w-full max-w-md shadow-lg'>
				<CardHeader className='space-y-4 text-center'>
					<div className='flex justify-center'>
						<div className='rounded-full bg-slate-900 dark:bg-slate-100 p-3'>
							<ShoppingCart className='w-8 h-8 text-white dark:text-slate-900' />
						</div>
					</div>
					<div>
						<CardTitle className='text-2xl font-bold'>POS Express</CardTitle>
						<CardDescription className='text-base mt-2'>
							Sign in to manage sales and inventory
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant='destructive' className='bg-red-100 border-0 mb-8'>
							<AlertCircle className='h-4 w-4' />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSignIn)}
							className='space-y-6'
						>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder='Username' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder='Password'
												type='password'
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
								{isPending ? "Signing in..." : "Sign In"}
							</Button>
						</form>
					</Form>

					<div className='mt-6 text-center text-sm text-muted-foreground'>
						<p>Secure access to your business operations</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
