import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ShoppingCart } from 'lucide-react';

const SignIn = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleSignIn = () => {
		setLoading(true);
		setError(null);
	}

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
					<form onSubmit={handleSignIn} className='space-y-4'>
						{error && (
							<Alert variant='destructive' className="bg-red-100 border-0">
								<AlertCircle className='h-4 w-4' />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className='space-y-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								placeholder='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								disabled={loading}
								className='h-11'
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='••••••••'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={loading}
								className='h-11'
							/>
						</div>

						<Button
							type='submit'
							className='w-full h-11 text-base'
							disabled={loading}
						>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>

					<div className='mt-6 text-center text-sm text-muted-foreground'>
						<p>Secure access to your business operations</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
