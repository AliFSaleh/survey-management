export function getSkip (pageNumber: number, pageSize: number): number {
    return (pageNumber - 1) * pageSize;
}

export function getTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
}

export function getNextPage(pageNumber: number, totalPages: number): number {
    return pageNumber < totalPages ? pageNumber + 1 : -1;
}
  