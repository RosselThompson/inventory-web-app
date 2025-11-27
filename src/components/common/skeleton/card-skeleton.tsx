import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
	return (
		<>
			<div className='flex items-center space-x-4 mb-4'>
				<Skeleton className='h-12 w-12 rounded-xl' />
				<div className='space-y-2 w-full'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
				</div>
			</div>
			<div className='flex items-center space-x-4 mb-4'>
				<Skeleton className='h-12 w-12 rounded-xl' />
				<div className='space-y-2 w-full'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
				</div>
			</div>
			<div className='flex items-center space-x-4 mb-4'>
				<Skeleton className='h-12 w-12 rounded-xl' />
				<div className='space-y-2 w-full'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
				</div>
			</div>
		</>
	);
};

export default CardSkeleton;
