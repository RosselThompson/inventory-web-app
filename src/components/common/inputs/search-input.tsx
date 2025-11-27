import type { ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
	value: string;
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onCleanText?: () => void;
}

const SearchInput = (props: SearchInputProps) => {
	const { placeholder, onChange, value, onCleanText } = props;
	return (
		<>
			<Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
			<Input
				type='text'
				placeholder={placeholder}
				className='pl-8 pr-8'
				value={value}
				onChange={onChange}
			/>
			{value && (
				<button
					type='button'
					onClick={onCleanText}
					className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
				>
					<X className='h-4 w-4' />
				</button>
			)}
		</>
	);
};

export default SearchInput;
