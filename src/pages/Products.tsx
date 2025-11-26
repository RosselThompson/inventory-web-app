import { useProductList } from "@/api/hooks/queries/useProductList";

const Products = () => {
	const { data, isLoading, isError } = useProductList();

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (isError) {
		return <p>Error</p>;
	}
	return (
		<div>
			<h1>Products</h1>
			<pre>{JSON.stringify(data)}</pre>
		</div>
	);
};

export default Products;
