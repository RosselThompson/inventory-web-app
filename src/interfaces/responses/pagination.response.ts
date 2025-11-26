interface PageMeta {
    page: number;
    size: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface PaginatedData<T> {
	data: T[];
	meta: PageMeta;
}
