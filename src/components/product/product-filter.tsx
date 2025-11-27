import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

interface ProductFilterProps {
	onClickAll: () => void;
	onClickOrderByStock: (order: "up" | "down") => void;
	onClickOrderByPrice: (order: "up" | "down") => void;
}

const ProductFilter = (props: ProductFilterProps) => {
	const { onClickAll, onClickOrderByStock, onClickOrderByPrice } = props;

	const [selectedButton, setSelectedButton] = useState<number>(0);
	const [orderByStockArrow, setorderByStockArrow] = useState<"up" | "down">(
		"down"
	);
	const [orderByPriceArrow, setorderByPriceArrow] = useState<"up" | "down">(
		"down"
	);

	const onClickAllButton = () => {
		setSelectedButton(0);
		onClickAll();
	};
	const onClickOrderByStockButton = () => {
		const order = orderByStockArrow === "up" ? "down" : "up"
		setSelectedButton(1);
		setorderByStockArrow(order);
		onClickOrderByStock(order);
	};
	const onClickOrderByPriceButton = () => {
		const order = orderByPriceArrow === "up" ? "down" : "up"
		setSelectedButton(2);
		setorderByPriceArrow(order);
		onClickOrderByPrice(order);
	};

	const selectedStyle = (index: number) => {
		return selectedButton === index ? "default" : "outline";
	};

	const OrderByStockArrow =
		orderByStockArrow === "up" ? <ArrowUp /> : <ArrowDown />;

	const OrderByPriceArrow =
		orderByPriceArrow === "up" ? <ArrowUp /> : <ArrowDown />;

	return (
		<ScrollArea className='w-full whitespace-nowrap'>
			<div className='flex w-max gap-2 py-4'>
				<Button variant={selectedStyle(0)} onClick={onClickAllButton}>
					All
				</Button>
				<Button variant={selectedStyle(1)} onClick={onClickOrderByStockButton}>
					Order by stock {selectedButton === 1 && OrderByStockArrow}
				</Button>
				<Button variant={selectedStyle(2)} onClick={onClickOrderByPriceButton}>
					Order by price {selectedButton === 2 && OrderByPriceArrow}
				</Button>
			</div>
			<ScrollBar className='hidden' orientation='horizontal' />
		</ScrollArea>
	);
};

export default ProductFilter;
