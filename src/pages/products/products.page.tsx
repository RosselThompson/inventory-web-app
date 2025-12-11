import { useState, type ChangeEvent } from "react";
import {
	useProductList,
	type ProductSearchParam,
} from "@/api/hooks/queries/use-product-list";
import { StickyAddButton } from "@/components/common/buttons/sticky-button";
import SearchInput from "@/components/common/inputs/search-input";
import ProductCard from "@/components/product/product-card";
import ProductFilter from "@/components/product/product-filter";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import type { ProductResponse } from "@/interfaces/responses/product.response";
import CardSkeleton from "@/components/common/skeleton/card-skeleton";
import DropdownButton from "@/components/common/dropdown/dropdown-button";
import { SlidersVertical } from "lucide-react";
import { useNavigate } from "react-router";
import {
	PRODUCT_CREATION_PATH,
	PRODUCTS_PATH,
} from "@/constants/path.constant";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { UpdateProductStockDto } from "@/interfaces/dto/product.dto";
import ProductUpdateStockForm from "./product-update-stock-form";
import { useProductUpdateStock } from "@/api/hooks/mutations/use-product-update-stock";
import { toast } from "sonner";
const Products = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [searchParam, setSearchParam] = useState<ProductSearchParam>("name");
	const [isFiltered, setisFiltered] = useState(false);
	const [products, setProducts] = useState<ProductResponse[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>("");
	const { mutateAsync, isPending } = useProductUpdateStock(selectedId);

	const debouncedQuery = useDebounce(query, 600);
	const { data, isLoading, isError } = useProductList(
		searchParam,
		debouncedQuery
	);

	const sourceData = isFiltered ? products : data?.data || [];
	const searchParamItems = [
		{
			key: "name-param",
			text: "By Name",
			onClick: () => setSearchParam("name"),
		},
		{
			key: "sku-param",
			text: "By SKU",
			onClick: () => setSearchParam("sku"),
		},
	];

	const onClickFilterAll = () => setisFiltered(false);

	const onClickFilterOrderByStock = (order: "up" | "down") => {
		const originalProducts = data?.data || [];
		let sorteredProducts: ProductResponse[] = [];

		if (order === "up") {
			sorteredProducts = [...originalProducts].sort(
				(a, b) => a.stockQuantity - b.stockQuantity
			);
		}

		if (order === "down") {
			sorteredProducts = [...originalProducts].sort(
				(a, b) => b.stockQuantity - a.stockQuantity
			);
		}
		setProducts(sorteredProducts);
		setisFiltered(true);
	};

	const onClickFilterOrderByPrice = (order: "up" | "down") => {
		const originalProducts = data?.data || [];

		if (order === "up") {
			setProducts([...originalProducts].sort((a, b) => a.price - b.price));
		}
		if (order === "down") {
			setProducts([...originalProducts].sort((a, b) => b.price - a.price));
		}

		setisFiltered(true);
	};

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) =>
		setQuery(e.target.value);

	const handleSeachInputClean = () => setQuery("");

	const onClickProductCardDetails = (id: string) =>
		navigate(`${PRODUCTS_PATH}/${id}`);

	const onClickProductCardEdit = (id: string) =>
		navigate(`${PRODUCTS_PATH}/${id}/edit`);

	const onClickAddProductButton = () => navigate(PRODUCT_CREATION_PATH);

	const toggleStockDialog = () => {
		setIsDialogOpen(!isDialogOpen);
	};
	const onClickUpdateStockButton = (id: string) => {
		setSelectedId(id);
		toggleStockDialog();
	};

	const handleSubmitDialog = async (values: UpdateProductStockDto) => {
		console.log("update stock", values);
		try {
			const data = await mutateAsync(values);
			toast.success(`${data.name} - product was updated`);
			toggleStockDialog();
		} catch (err) {
			console.error(err);
			toast.error(`Product has not been updated`);
		}
	};

	if (isError) return <p>Error</p>;

	return (
		<div>
			<Dialog open={isDialogOpen} onOpenChange={toggleStockDialog}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Update Stock</DialogTitle>
						<DialogDescription>
							This change will create a new movement in your inventory
						</DialogDescription>
					</DialogHeader>
					<ProductUpdateStockForm
						handleSubmitForm={handleSubmitDialog}
						wrapButtonsComponent={DialogFooter}
						isLoading={isPending}
					/>
				</DialogContent>
			</Dialog>
			<div className='sticky top-0 z-10 bg-background py-2'>
				<div className='flex space-x-2'>
					<div className='relative w-full'>
						<SearchInput
							value={query}
							placeholder={`Search product by ${searchParam}`}
							onChange={handleSearchInputChange}
							onCleanText={handleSeachInputClean}
						/>
					</div>
					<DropdownButton icon={<SlidersVertical />} items={searchParamItems} />
				</div>
				<ProductFilter
					onClickAll={onClickFilterAll}
					onClickOrderByStock={onClickFilterOrderByStock}
					onClickOrderByPrice={onClickFilterOrderByPrice}
				/>
			</div>
			<div className='flex flex-col gap-2 py-2 px-2'>
				{isLoading ? (
					<CardSkeleton />
				) : (
					sourceData.map((product) => (
						<ProductCard
							key={product.sku}
							product={product}
							onClickViewDetail={onClickProductCardDetails}
							onClickEdit={onClickProductCardEdit}
							onClickUpdateStock={onClickUpdateStockButton}
						/>
					))
				)}
			</div>
			{data?.meta.hasNextPage && (
				<div className='w-full flex aligns-center justify-center mt-4'>
					<Button variant='ghost' onClick={() => {}}>
						Load more
					</Button>
				</div>
			)}
			<StickyAddButton label='Add Product' onClick={onClickAddProductButton} />
		</div>
	);
};

export default Products;
